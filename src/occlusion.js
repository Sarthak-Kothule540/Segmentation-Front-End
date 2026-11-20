import * as THREE from "three";

// ---------------- Occlusion: how close each tooth comes to the teeth of the other jaw ----------------
//
// For every vertex of a tooth we find the nearest point on the teeth of the opposing jaw.
// Vertices closer than OCCLUSION_MAX_MM get a color from purple/blue (touching) to red (1.2 mm);
// the rest keep the normal tooth color. No extra library is needed: the opposing teeth are put
// into a 3D grid so each vertex only checks the triangles near it.

export const OCCLUSION_MAX_MM = 1.2; // farther than this = normal tooth color

// legend ticks shown on the right side bar
export const OCCLUSION_TICKS = [1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0.0];

// hue goes from 270° (purple, 0 mm) through blue, cyan, green, yellow, orange to 0° (red, 1.2 mm)
const HUE_AT_ZERO = 270;

function hueFor(d) {
  const t = Math.min(Math.max(d / OCCLUSION_MAX_MM, 0), 1);
  return HUE_AT_ZERO * (1 - t);
}

// color of one distance (in mm) as a THREE.Color
export function distanceToColor(d, target = new THREE.Color()) {
  return target.setHSL(hueFor(d) / 360, 0.9, 0.55);
}

// the same scale as a CSS gradient, for the legend bar (top = 1.2 mm, bottom = 0 mm)
export function occlusionGradientCss() {
  const stops = [];
  for (let i = 0; i <= 12; i++) {
    const d = OCCLUSION_MAX_MM * (1 - i / 12);
    stops.push(`hsl(${hueFor(d).toFixed(0)}, 90%, 55%) ${((i / 12) * 100).toFixed(1)}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

// ---- helpers ----

// triangle corner indices of a geometry (works for indexed and non-indexed geometries)
function triangleIndex(geo) {
  if (geo.index) return geo.index.array;
  const n = geo.attributes.position.count;
  const idx = new Uint32Array(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  return idx;
}

// puts all triangles of the given geometries into a grid of cells of size `cell`
function buildTriangleGrid(geos, cell) {
  // collect every triangle as 9 numbers
  let triCount = 0;
  for (const g of geos) triCount += triangleIndex(g).length / 3;
  const tris = new Float32Array(triCount * 9);
  const box = new THREE.Box3();
  let t = 0;
  for (const g of geos) {
    const pos = g.attributes.position.array;
    const idx = triangleIndex(g);
    for (let i = 0; i < idx.length; i++) {
      const v = idx[i] * 3;
      tris[t++] = pos[v];
      tris[t++] = pos[v + 1];
      tris[t++] = pos[v + 2];
    }
    if (!g.boundingBox) g.computeBoundingBox();
    box.union(g.boundingBox);
  }

  const min = box.min.clone().subScalar(cell);
  const size = box.getSize(new THREE.Vector3()).addScalar(2 * cell);
  const nx = Math.max(1, Math.ceil(size.x / cell));
  const ny = Math.max(1, Math.ceil(size.y / cell));
  const nz = Math.max(1, Math.ceil(size.z / cell));
  const cellCount = nx * ny * nz;

  const cellOf = (x, y, z) => {
    const ix = Math.min(nx - 1, Math.max(0, Math.floor((x - min.x) / cell)));
    const iy = Math.min(ny - 1, Math.max(0, Math.floor((y - min.y) / cell)));
    const iz = Math.min(nz - 1, Math.max(0, Math.floor((z - min.z) / cell)));
    return [ix, iy, iz];
  };

  // every triangle goes into each cell its own bounding box touches (two passes: count, then fill)
  const counts = new Uint32Array(cellCount + 1);
  const ranges = new Int32Array(triCount * 6);
  for (let i = 0; i < triCount; i++) {
    const o = i * 9;
    const a = cellOf(
      Math.min(tris[o], tris[o + 3], tris[o + 6]),
      Math.min(tris[o + 1], tris[o + 4], tris[o + 7]),
      Math.min(tris[o + 2], tris[o + 5], tris[o + 8])
    );
    const b = cellOf(
      Math.max(tris[o], tris[o + 3], tris[o + 6]),
      Math.max(tris[o + 1], tris[o + 4], tris[o + 7]),
      Math.max(tris[o + 2], tris[o + 5], tris[o + 8])
    );
    ranges.set([a[0], a[1], a[2], b[0], b[1], b[2]], i * 6);
    for (let x = a[0]; x <= b[0]; x++)
      for (let y = a[1]; y <= b[1]; y++)
        for (let z = a[2]; z <= b[2]; z++) counts[x + nx * (y + ny * z) + 1]++;
  }
  for (let c = 0; c < cellCount; c++) counts[c + 1] += counts[c];
  const fill = counts.slice(0, cellCount);
  const items = new Uint32Array(counts[cellCount]);
  for (let i = 0; i < triCount; i++) {
    const r = i * 6;
    for (let x = ranges[r]; x <= ranges[r + 3]; x++)
      for (let y = ranges[r + 1]; y <= ranges[r + 4]; y++)
        for (let z = ranges[r + 2]; z <= ranges[r + 5]; z++) items[fill[x + nx * (y + ny * z)]++] = i;
  }

  return { tris, min, cell, nx, ny, nz, starts: counts, items, box };
}

const _tri = new THREE.Triangle();
const _p = new THREE.Vector3();
const _c = new THREE.Vector3();
const _n = new THREE.Vector3();

// signed distance from (x, y, z) to the nearest opposing triangle within maxDist
// (negative = the point is inside the opposing tooth); null when nothing is that close
function signedDistance(grid, x, y, z, maxDist) {
  const { tris, min, cell, nx, ny, nz, starts, items } = grid;
  const ix = Math.floor((x - min.x) / cell);
  const iy = Math.floor((y - min.y) / cell);
  const iz = Math.floor((z - min.z) / cell);
  if (ix < -1 || iy < -1 || iz < -1 || ix > nx || iy > ny || iz > nz) return null;

  _p.set(x, y, z);
  let best = maxDist * maxDist;
  let bestTri = -1;
  let bx = 0, by = 0, bz = 0;
  for (let dx = -1; dx <= 1; dx++) {
    const cx = ix + dx;
    if (cx < 0 || cx >= nx) continue;
    for (let dy = -1; dy <= 1; dy++) {
      const cy = iy + dy;
      if (cy < 0 || cy >= ny) continue;
      for (let dz = -1; dz <= 1; dz++) {
        const cz = iz + dz;
        if (cz < 0 || cz >= nz) continue;
        const c = cx + nx * (cy + ny * cz);
        for (let k = starts[c]; k < starts[c + 1]; k++) {
          const o = items[k] * 9;
          _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
          _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
          _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
          _tri.closestPointToPoint(_p, _c);
          const d2 = _c.distanceToSquared(_p);
          if (d2 < best) {
            best = d2;
            bestTri = items[k];
            bx = _c.x; by = _c.y; bz = _c.z;
          }
        }
      }
    }
  }
  if (bestTri < 0) return null;

  // inside or outside: compare with the normal of the nearest triangle
  const o = bestTri * 9;
  _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
  _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
  _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
  _tri.getNormal(_n);
  const side = (x - bx) * _n.x + (y - by) * _n.y + (z - bz) * _n.z;
  const d = Math.sqrt(best);
  return side < 0 ? -d : d;
}

// distances of every vertex of `teeth` to the opposing teeth
function measureJaw(teeth, opposingGrid, maxDist) {
  const result = {};
  const labels = [];
  const reach = opposingGrid.box.clone().expandByScalar(maxDist);

  for (const part of teeth) {
    const pos = part.geo.attributes.position.array;
    const n = pos.length / 3;
    const dist = new Float32Array(n).fill(Infinity);
    let minD = Infinity;
    let minIdx = -1;
    for (let i = 0; i < n; i++) {
      const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
      if (x < reach.min.x || y < reach.min.y || z < reach.min.z || x > reach.max.x || y > reach.max.y || z > reach.max.z) continue;
      const d = signedDistance(opposingGrid, x, y, z, maxDist);
      if (d === null) continue;
      dist[i] = d;
      if (d < minD) {
        minD = d;
        minIdx = i;
      }
    }
    result[part.name] = dist;
    if (minIdx >= 0) {
      labels.push({
        name: part.name,
        min: minD,
        point: new THREE.Vector3(pos[minIdx * 3], pos[minIdx * 3 + 1], pos[minIdx * 3 + 2]),
      });
    }
  }
  return { distances: result, labels };
}

// places each label bubble a little outside the arch, away from the other jaw
function placeBubbles(labels, teeth, up) {
  const center = new THREE.Box3();
  for (const p of teeth) {
    if (!p.geo.boundingBox) p.geo.computeBoundingBox();
    center.union(p.geo.boundingBox);
  }
  const c = center.getCenter(new THREE.Vector3());
  for (const l of labels) {
    const out = new THREE.Vector3(l.point.x - c.x, l.point.y - c.y, 0);
    if (out.lengthSq() < 1e-6) out.set(0, -1, 0);
    out.normalize().multiplyScalar(8);
    l.bubble = l.point.clone().add(out).add(new THREE.Vector3(0, 0, 3 * up));
  }
  return labels;
}

/**
 * Measures the occlusion between the upper and lower teeth.
 * upperTeeth / lowerTeeth: [{ name, geo }] (teeth only, no gum).
 * Returns { upper: { distances: { [name]: Float32Array }, labels: [...] }, lower: {...} }
 * where a distance of Infinity means "farther than OCCLUSION_MAX_MM".
 */
export function computeOcclusion(upperTeeth, lowerTeeth, maxDist = OCCLUSION_MAX_MM) {
  if (!upperTeeth?.length || !lowerTeeth?.length) return null;
  const upperGrid = buildTriangleGrid(upperTeeth.map((p) => p.geo), maxDist);
  const lowerGrid = buildTriangleGrid(lowerTeeth.map((p) => p.geo), maxDist);

  const upper = measureJaw(upperTeeth, lowerGrid, maxDist);
  const lower = measureJaw(lowerTeeth, upperGrid, maxDist);

  // Z is up in the scans: upper labels go up, lower labels go down
  placeBubbles(upper.labels, upperTeeth, 1);
  placeBubbles(lower.labels, lowerTeeth, -1);
  return { upper, lower };
}

/**
 * A copy of a tooth geometry with vertex colors: the occlusion color where a vertex is
 * close to the other jaw, and baseColor everywhere else. Shares the position/normal data.
 */
export function makeOcclusionGeometry(geo, distances, baseColor) {
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", geo.attributes.position);
  if (geo.attributes.normal) out.setAttribute("normal", geo.attributes.normal);
  if (geo.index) out.setIndex(geo.index);
  if (geo.boundingBox) out.boundingBox = geo.boundingBox.clone();
  if (geo.boundingSphere) out.boundingSphere = geo.boundingSphere.clone();

  const base = new THREE.Color(baseColor);
  const col = new THREE.Color();
  const n = geo.attributes.position.count;
  const colors = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const d = distances[i];
    const c = d <= OCCLUSION_MAX_MM ? distanceToColor(Math.max(d, 0), col) : base;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  out.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return out;
}
