import * as THREE from "three";

// How far (mm) from a tooth surface the gum still follows that tooth.
// Bigger = smoother but the gum also drags neighbouring areas.
const RADIUS = 5;
// Use every n-th tooth vertex as a sample (speed). 1 = all vertices.
const SAMPLE_STEP = 8;

// Moves the vertices of the gum so that it follows the moved teeth.
//   gumGeo      gum geometry (teeth already cut out)
//   origTeeth   [{ name, geo }]  teeth before Automatic Setup (Segment result)
//   movedTeeth  [{ name, geo }]  teeth after Automatic Setup
// Returns a new geometry, or null if nothing could be matched.
export function deformGum(gumGeo, origTeeth, movedTeeth) {
  if (!gumGeo || !origTeeth || !movedTeeth) return null;

  // 1. samples: a position on an original tooth and how far that point moved
  const samples = [];
  for (const moved of movedTeeth) {
    const orig = origTeeth.find((t) => t.name.toLowerCase() === moved.name.toLowerCase());
    if (!orig) continue;

    const po = orig.geo.attributes.position;
    const pm = moved.geo.attributes.position;

    if (po.count === pm.count) {
      // same vertex order: every vertex has its own movement (handles rotation too)
      for (let i = 0; i < po.count; i += SAMPLE_STEP) {
        samples.push({
          x: po.getX(i), y: po.getY(i), z: po.getZ(i),
          dx: pm.getX(i) - po.getX(i),
          dy: pm.getY(i) - po.getY(i),
          dz: pm.getZ(i) - po.getZ(i),
        });
      }
    } else {
      // different vertex order: only the movement of the tooth center is known
      orig.geo.computeBoundingBox();
      moved.geo.computeBoundingBox();
      const co = orig.geo.boundingBox.getCenter(new THREE.Vector3());
      const cm = moved.geo.boundingBox.getCenter(new THREE.Vector3());
      const d = cm.sub(co);
      for (let i = 0; i < po.count; i += SAMPLE_STEP) {
        samples.push({ x: po.getX(i), y: po.getY(i), z: po.getZ(i), dx: d.x, dy: d.y, dz: d.z });
      }
    }
  }
  if (samples.length === 0) return null;

  // 2. grid, so a gum vertex only looks at samples near it
  const cell = RADIUS;
  const key = (ix, iy, iz) => `${ix},${iy},${iz}`;
  const grid = new Map();
  for (const s of samples) {
    const k = key(Math.floor(s.x / cell), Math.floor(s.y / cell), Math.floor(s.z / cell));
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(s);
  }

  // 3. move every gum vertex
  const geo = gumGeo.clone();
  const pos = geo.attributes.position;
  const R2 = RADIUS * RADIUS;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);

    let sumW = 0, maxW = 0, mx = 0, my = 0, mz = 0;
    for (let a = -1; a <= 1; a++)
      for (let b = -1; b <= 1; b++)
        for (let c = -1; c <= 1; c++) {
          const list = grid.get(key(cx + a, cy + b, cz + c));
          if (!list) continue;
          for (const s of list) {
            const d2 = (s.x - x) ** 2 + (s.y - y) ** 2 + (s.z - z) ** 2;
            if (d2 >= R2) continue;
            const w = (1 - Math.sqrt(d2) / RADIUS) ** 2;
            sumW += w;
            if (w > maxW) maxW = w;
            mx += w * s.dx; my += w * s.dy; mz += w * s.dz;
          }
        }

    if (sumW > 0) {
      // average movement of the nearby tooth points, fading out with distance
      pos.setXYZ(i, x + (mx / sumW) * maxW, y + (my / sumW) * maxW, z + (mz / sumW) * maxW);
    }
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}