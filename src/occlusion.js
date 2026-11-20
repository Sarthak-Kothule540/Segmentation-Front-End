// // // import * as THREE from "three";

// // // // ---------------- Occlusion: how close each tooth comes to the teeth of the other jaw ----------------
// // // //
// // // // For every vertex of a tooth we find the nearest point on the teeth of the opposing jaw.
// // // // Vertices closer than OCCLUSION_MAX_MM get a color from purple/blue (touching) to red (1.2 mm);
// // // // the rest keep the normal tooth color. No extra library is needed: the opposing teeth are put
// // // // into a 3D grid so each vertex only checks the triangles near it.

// // // export const OCCLUSION_MAX_MM = 1.2; // farther than this = normal tooth color

// // // // legend ticks shown on the right side bar
// // // export const OCCLUSION_TICKS = [1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0.0];

// // // // hue goes from 270° (purple, 0 mm) through blue, cyan, green, yellow, orange to 0° (red, 1.2 mm)
// // // const HUE_AT_ZERO = 270;

// // // function hueFor(d) {
// // //   const t = Math.min(Math.max(d / OCCLUSION_MAX_MM, 0), 1);
// // //   return HUE_AT_ZERO * (1 - t);
// // // }

// // // // color of one distance (in mm) as a THREE.Color
// // // export function distanceToColor(d, target = new THREE.Color()) {
// // //   return target.setHSL(hueFor(d) / 360, 0.9, 0.55);
// // // }

// // // // the same scale as a CSS gradient, for the legend bar (top = 1.2 mm, bottom = 0 mm)
// // // export function occlusionGradientCss() {
// // //   const stops = [];
// // //   for (let i = 0; i <= 12; i++) {
// // //     const d = OCCLUSION_MAX_MM * (1 - i / 12);
// // //     stops.push(`hsl(${hueFor(d).toFixed(0)}, 90%, 55%) ${((i / 12) * 100).toFixed(1)}%`);
// // //   }
// // //   return `linear-gradient(to bottom, ${stops.join(", ")})`;
// // // }

// // // // ---- helpers ----

// // // // triangle corner indices of a geometry (works for indexed and non-indexed geometries)
// // // function triangleIndex(geo) {
// // //   if (geo.index) return geo.index.array;
// // //   const n = geo.attributes.position.count;
// // //   const idx = new Uint32Array(n);
// // //   for (let i = 0; i < n; i++) idx[i] = i;
// // //   return idx;
// // // }

// // // // puts all triangles of the given geometries into a grid of cells of size `cell`
// // // function buildTriangleGrid(geos, cell) {
// // //   // collect every triangle as 9 numbers
// // //   let triCount = 0;
// // //   for (const g of geos) triCount += triangleIndex(g).length / 3;
// // //   const tris = new Float32Array(triCount * 9);
// // //   const box = new THREE.Box3();
// // //   let t = 0;
// // //   for (const g of geos) {
// // //     const pos = g.attributes.position.array;
// // //     const idx = triangleIndex(g);
// // //     for (let i = 0; i < idx.length; i++) {
// // //       const v = idx[i] * 3;
// // //       tris[t++] = pos[v];
// // //       tris[t++] = pos[v + 1];
// // //       tris[t++] = pos[v + 2];
// // //     }
// // //     if (!g.boundingBox) g.computeBoundingBox();
// // //     box.union(g.boundingBox);
// // //   }

// // //   const min = box.min.clone().subScalar(cell);
// // //   const size = box.getSize(new THREE.Vector3()).addScalar(2 * cell);
// // //   const nx = Math.max(1, Math.ceil(size.x / cell));
// // //   const ny = Math.max(1, Math.ceil(size.y / cell));
// // //   const nz = Math.max(1, Math.ceil(size.z / cell));
// // //   const cellCount = nx * ny * nz;

// // //   const cellOf = (x, y, z) => {
// // //     const ix = Math.min(nx - 1, Math.max(0, Math.floor((x - min.x) / cell)));
// // //     const iy = Math.min(ny - 1, Math.max(0, Math.floor((y - min.y) / cell)));
// // //     const iz = Math.min(nz - 1, Math.max(0, Math.floor((z - min.z) / cell)));
// // //     return [ix, iy, iz];
// // //   };

// // //   // every triangle goes into each cell its own bounding box touches (two passes: count, then fill)
// // //   const counts = new Uint32Array(cellCount + 1);
// // //   const ranges = new Int32Array(triCount * 6);
// // //   for (let i = 0; i < triCount; i++) {
// // //     const o = i * 9;
// // //     const a = cellOf(
// // //       Math.min(tris[o], tris[o + 3], tris[o + 6]),
// // //       Math.min(tris[o + 1], tris[o + 4], tris[o + 7]),
// // //       Math.min(tris[o + 2], tris[o + 5], tris[o + 8])
// // //     );
// // //     const b = cellOf(
// // //       Math.max(tris[o], tris[o + 3], tris[o + 6]),
// // //       Math.max(tris[o + 1], tris[o + 4], tris[o + 7]),
// // //       Math.max(tris[o + 2], tris[o + 5], tris[o + 8])
// // //     );
// // //     ranges.set([a[0], a[1], a[2], b[0], b[1], b[2]], i * 6);
// // //     for (let x = a[0]; x <= b[0]; x++)
// // //       for (let y = a[1]; y <= b[1]; y++)
// // //         for (let z = a[2]; z <= b[2]; z++) counts[x + nx * (y + ny * z) + 1]++;
// // //   }
// // //   for (let c = 0; c < cellCount; c++) counts[c + 1] += counts[c];
// // //   const fill = counts.slice(0, cellCount);
// // //   const items = new Uint32Array(counts[cellCount]);
// // //   for (let i = 0; i < triCount; i++) {
// // //     const r = i * 6;
// // //     for (let x = ranges[r]; x <= ranges[r + 3]; x++)
// // //       for (let y = ranges[r + 1]; y <= ranges[r + 4]; y++)
// // //         for (let z = ranges[r + 2]; z <= ranges[r + 5]; z++) items[fill[x + nx * (y + ny * z)]++] = i;
// // //   }

// // //   return { tris, min, cell, nx, ny, nz, starts: counts, items, box };
// // // }

// // // const _tri = new THREE.Triangle();
// // // const _p = new THREE.Vector3();
// // // const _c = new THREE.Vector3();
// // // const _n = new THREE.Vector3();

// // // // signed distance from (x, y, z) to the nearest opposing triangle within maxDist
// // // // (negative = the point is inside the opposing tooth); null when nothing is that close
// // // function signedDistance(grid, x, y, z, maxDist) {
// // //   const { tris, min, cell, nx, ny, nz, starts, items } = grid;
// // //   const ix = Math.floor((x - min.x) / cell);
// // //   const iy = Math.floor((y - min.y) / cell);
// // //   const iz = Math.floor((z - min.z) / cell);
// // //   if (ix < -1 || iy < -1 || iz < -1 || ix > nx || iy > ny || iz > nz) return null;

// // //   _p.set(x, y, z);
// // //   let best = maxDist * maxDist;
// // //   let bestTri = -1;
// // //   let bx = 0, by = 0, bz = 0;
// // //   for (let dx = -1; dx <= 1; dx++) {
// // //     const cx = ix + dx;
// // //     if (cx < 0 || cx >= nx) continue;
// // //     for (let dy = -1; dy <= 1; dy++) {
// // //       const cy = iy + dy;
// // //       if (cy < 0 || cy >= ny) continue;
// // //       for (let dz = -1; dz <= 1; dz++) {
// // //         const cz = iz + dz;
// // //         if (cz < 0 || cz >= nz) continue;
// // //         const c = cx + nx * (cy + ny * cz);
// // //         for (let k = starts[c]; k < starts[c + 1]; k++) {
// // //           const o = items[k] * 9;
// // //           _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
// // //           _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
// // //           _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
// // //           _tri.closestPointToPoint(_p, _c);
// // //           const d2 = _c.distanceToSquared(_p);
// // //           if (d2 < best) {
// // //             best = d2;
// // //             bestTri = items[k];
// // //             bx = _c.x; by = _c.y; bz = _c.z;
// // //           }
// // //         }
// // //       }
// // //     }
// // //   }
// // //   if (bestTri < 0) return null;

// // //   // inside or outside: compare with the normal of the nearest triangle
// // //   const o = bestTri * 9;
// // //   _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
// // //   _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
// // //   _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
// // //   _tri.getNormal(_n);
// // //   const side = (x - bx) * _n.x + (y - by) * _n.y + (z - bz) * _n.z;
// // //   const d = Math.sqrt(best);
// // //   return side < 0 ? -d : d;
// // // }

// // // // distances of every vertex of `teeth` to the opposing teeth
// // // function measureJaw(teeth, opposingGrid, maxDist) {
// // //   const result = {};
// // //   const labels = [];
// // //   const reach = opposingGrid.box.clone().expandByScalar(maxDist);

// // //   for (const part of teeth) {
// // //     const pos = part.geo.attributes.position.array;
// // //     const n = pos.length / 3;
// // //     const dist = new Float32Array(n).fill(Infinity);
// // //     let minD = Infinity;
// // //     let minIdx = -1;
// // //     for (let i = 0; i < n; i++) {
// // //       const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
// // //       if (x < reach.min.x || y < reach.min.y || z < reach.min.z || x > reach.max.x || y > reach.max.y || z > reach.max.z) continue;
// // //       const d = signedDistance(opposingGrid, x, y, z, maxDist);
// // //       if (d === null) continue;
// // //       dist[i] = d;
// // //       if (d < minD) {
// // //         minD = d;
// // //         minIdx = i;
// // //       }
// // //     }
// // //     result[part.name] = dist;
// // //     if (minIdx >= 0) {
// // //       labels.push({
// // //         name: part.name,
// // //         min: minD,
// // //         point: new THREE.Vector3(pos[minIdx * 3], pos[minIdx * 3 + 1], pos[minIdx * 3 + 2]),
// // //       });
// // //     }
// // //   }
// // //   return { distances: result, labels };
// // // }

// // // // places each label bubble a little outside the arch, away from the other jaw
// // // function placeBubbles(labels, teeth, up) {
// // //   const center = new THREE.Box3();
// // //   for (const p of teeth) {
// // //     if (!p.geo.boundingBox) p.geo.computeBoundingBox();
// // //     center.union(p.geo.boundingBox);
// // //   }
// // //   const c = center.getCenter(new THREE.Vector3());
// // //   for (const l of labels) {
// // //     const out = new THREE.Vector3(l.point.x - c.x, l.point.y - c.y, 0);
// // //     if (out.lengthSq() < 1e-6) out.set(0, -1, 0);
// // //     out.normalize().multiplyScalar(8);
// // //     l.bubble = l.point.clone().add(out).add(new THREE.Vector3(0, 0, 3 * up));
// // //   }
// // //   return labels;
// // // }

// // // /**
// // //  * Measures the occlusion between the upper and lower teeth.
// // //  * upperTeeth / lowerTeeth: [{ name, geo }] (teeth only, no gum).
// // //  * Returns { upper: { distances: { [name]: Float32Array }, labels: [...] }, lower: {...} }
// // //  * where a distance of Infinity means "farther than OCCLUSION_MAX_MM".
// // //  */
// // // export function computeOcclusion(upperTeeth, lowerTeeth, maxDist = OCCLUSION_MAX_MM) {
// // //   if (!upperTeeth?.length || !lowerTeeth?.length) return null;
// // //   const upperGrid = buildTriangleGrid(upperTeeth.map((p) => p.geo), maxDist);
// // //   const lowerGrid = buildTriangleGrid(lowerTeeth.map((p) => p.geo), maxDist);

// // //   const upper = measureJaw(upperTeeth, lowerGrid, maxDist);
// // //   const lower = measureJaw(lowerTeeth, upperGrid, maxDist);

// // //   // Z is up in the scans: upper labels go up, lower labels go down
// // //   placeBubbles(upper.labels, upperTeeth, 1);
// // //   placeBubbles(lower.labels, lowerTeeth, -1);
// // //   return { upper, lower };
// // // }

// // // /**
// // //  * A copy of a tooth geometry with vertex colors: the occlusion color where a vertex is
// // //  * close to the other jaw, and baseColor everywhere else. Shares the position/normal data.
// // //  */
// // // export function makeOcclusionGeometry(geo, distances, baseColor) {
// // //   const out = new THREE.BufferGeometry();
// // //   out.setAttribute("position", geo.attributes.position);
// // //   if (geo.attributes.normal) out.setAttribute("normal", geo.attributes.normal);
// // //   if (geo.index) out.setIndex(geo.index);
// // //   if (geo.boundingBox) out.boundingBox = geo.boundingBox.clone();
// // //   if (geo.boundingSphere) out.boundingSphere = geo.boundingSphere.clone();

// // //   const base = new THREE.Color(baseColor);
// // //   const col = new THREE.Color();
// // //   const n = geo.attributes.position.count;
// // //   const colors = new Float32Array(n * 3);
// // //   for (let i = 0; i < n; i++) {
// // //     const d = distances[i];
// // //     const c = d <= OCCLUSION_MAX_MM ? distanceToColor(Math.max(d, 0), col) : base;
// // //     colors[i * 3] = c.r;
// // //     colors[i * 3 + 1] = c.g;
// // //     colors[i * 3 + 2] = c.b;
// // //   }
// // //   out.setAttribute("color", new THREE.BufferAttribute(colors, 3));
// // //   return out;
// // // }





// // import * as THREE from "three";

// // // ---------------- Occlusion: how close each tooth comes to the teeth of the other jaw ----------------
// // //
// // // For every vertex of a tooth we find the nearest point on the teeth of the opposing jaw.
// // // Only the places where the teeth TOUCH or OVERLAP are colored:
// // //   - touching (gap of CONTACT_TOLERANCE_MM or less): blue
// // //   - overlapping (the tooth goes into the other tooth): blue -> purple -> red, by how deep
// // // Everything else keeps the normal tooth color. No extra library is needed: the opposing teeth
// // // are put into a 3D grid so each vertex only checks the triangles near it.

// // export const CONTACT_TOLERANCE_MM = 0.05; // a gap this small or smaller counts as "touching"
// // export const MAX_OVERLAP_MM = 0.3; // overlaps this deep or deeper are full red
// // export const OCCLUSION_MAX_MM = 1.2; // how far we search (also finds overlaps up to this deep)

// // // legend ticks shown on the right side bar (overlap depth in mm, top = deepest)
// // export const OCCLUSION_TICKS = [0.3, 0.2, 0.1, 0.0];

// // // hue goes from 220° (blue, just touching) through purple to 360° (red, MAX_OVERLAP_MM deep)
// // function hueForOverlap(depth) {
// //   const t = Math.min(Math.max(depth / MAX_OVERLAP_MM, 0), 1);
// //   return 220 + 140 * t;
// // }

// // // true when a vertex at this signed distance (negative = overlap) is a contact
// // export const isContact = (d) => d <= CONTACT_TOLERANCE_MM;

// // // color of one contact vertex (d = signed distance in mm) as a THREE.Color
// // export function distanceToColor(d, target = new THREE.Color()) {
// //   return target.setHSL((hueForOverlap(-d) % 360) / 360, 0.9, 0.5);
// // }

// // // the same scale as a CSS gradient, for the legend bar (top = deepest overlap, bottom = touching)
// // export function occlusionGradientCss() {
// //   const stops = [];
// //   for (let i = 0; i <= 12; i++) {
// //     const depth = MAX_OVERLAP_MM * (1 - i / 12);
// //     stops.push(`hsl(${hueForOverlap(depth).toFixed(0)}, 90%, 50%) ${((i / 12) * 100).toFixed(1)}%`);
// //   }
// //   return `linear-gradient(to bottom, ${stops.join(", ")})`;
// // }

// // // ---- helpers ----

// // // triangle corner indices of a geometry (works for indexed and non-indexed geometries)
// // function triangleIndex(geo) {
// //   if (geo.index) return geo.index.array;
// //   const n = geo.attributes.position.count;
// //   const idx = new Uint32Array(n);
// //   for (let i = 0; i < n; i++) idx[i] = i;
// //   return idx;
// // }

// // // puts all triangles of the given geometries into a grid of cells of size `cell`
// // function buildTriangleGrid(geos, cell) {
// //   // collect every triangle as 9 numbers
// //   let triCount = 0;
// //   for (const g of geos) triCount += triangleIndex(g).length / 3;
// //   const tris = new Float32Array(triCount * 9);
// //   const box = new THREE.Box3();
// //   let t = 0;
// //   for (const g of geos) {
// //     const pos = g.attributes.position.array;
// //     const idx = triangleIndex(g);
// //     for (let i = 0; i < idx.length; i++) {
// //       const v = idx[i] * 3;
// //       tris[t++] = pos[v];
// //       tris[t++] = pos[v + 1];
// //       tris[t++] = pos[v + 2];
// //     }
// //     if (!g.boundingBox) g.computeBoundingBox();
// //     box.union(g.boundingBox);
// //   }

// //   const min = box.min.clone().subScalar(cell);
// //   const size = box.getSize(new THREE.Vector3()).addScalar(2 * cell);
// //   const nx = Math.max(1, Math.ceil(size.x / cell));
// //   const ny = Math.max(1, Math.ceil(size.y / cell));
// //   const nz = Math.max(1, Math.ceil(size.z / cell));
// //   const cellCount = nx * ny * nz;

// //   const cellOf = (x, y, z) => {
// //     const ix = Math.min(nx - 1, Math.max(0, Math.floor((x - min.x) / cell)));
// //     const iy = Math.min(ny - 1, Math.max(0, Math.floor((y - min.y) / cell)));
// //     const iz = Math.min(nz - 1, Math.max(0, Math.floor((z - min.z) / cell)));
// //     return [ix, iy, iz];
// //   };

// //   // every triangle goes into each cell its own bounding box touches (two passes: count, then fill)
// //   const counts = new Uint32Array(cellCount + 1);
// //   const ranges = new Int32Array(triCount * 6);
// //   for (let i = 0; i < triCount; i++) {
// //     const o = i * 9;
// //     const a = cellOf(
// //       Math.min(tris[o], tris[o + 3], tris[o + 6]),
// //       Math.min(tris[o + 1], tris[o + 4], tris[o + 7]),
// //       Math.min(tris[o + 2], tris[o + 5], tris[o + 8])
// //     );
// //     const b = cellOf(
// //       Math.max(tris[o], tris[o + 3], tris[o + 6]),
// //       Math.max(tris[o + 1], tris[o + 4], tris[o + 7]),
// //       Math.max(tris[o + 2], tris[o + 5], tris[o + 8])
// //     );
// //     ranges.set([a[0], a[1], a[2], b[0], b[1], b[2]], i * 6);
// //     for (let x = a[0]; x <= b[0]; x++)
// //       for (let y = a[1]; y <= b[1]; y++)
// //         for (let z = a[2]; z <= b[2]; z++) counts[x + nx * (y + ny * z) + 1]++;
// //   }
// //   for (let c = 0; c < cellCount; c++) counts[c + 1] += counts[c];
// //   const fill = counts.slice(0, cellCount);
// //   const items = new Uint32Array(counts[cellCount]);
// //   for (let i = 0; i < triCount; i++) {
// //     const r = i * 6;
// //     for (let x = ranges[r]; x <= ranges[r + 3]; x++)
// //       for (let y = ranges[r + 1]; y <= ranges[r + 4]; y++)
// //         for (let z = ranges[r + 2]; z <= ranges[r + 5]; z++) items[fill[x + nx * (y + ny * z)]++] = i;
// //   }

// //   return { tris, min, cell, nx, ny, nz, starts: counts, items, box };
// // }

// // const _tri = new THREE.Triangle();
// // const _p = new THREE.Vector3();
// // const _c = new THREE.Vector3();
// // const _n = new THREE.Vector3();

// // // signed distance from (x, y, z) to the nearest opposing triangle within maxDist
// // // (negative = the point is inside the opposing tooth); null when nothing is that close
// // function signedDistance(grid, x, y, z, maxDist) {
// //   const { tris, min, cell, nx, ny, nz, starts, items } = grid;
// //   const ix = Math.floor((x - min.x) / cell);
// //   const iy = Math.floor((y - min.y) / cell);
// //   const iz = Math.floor((z - min.z) / cell);
// //   if (ix < -1 || iy < -1 || iz < -1 || ix > nx || iy > ny || iz > nz) return null;

// //   _p.set(x, y, z);
// //   let best = maxDist * maxDist;
// //   let bestTri = -1;
// //   let bx = 0, by = 0, bz = 0;
// //   for (let dx = -1; dx <= 1; dx++) {
// //     const cx = ix + dx;
// //     if (cx < 0 || cx >= nx) continue;
// //     for (let dy = -1; dy <= 1; dy++) {
// //       const cy = iy + dy;
// //       if (cy < 0 || cy >= ny) continue;
// //       for (let dz = -1; dz <= 1; dz++) {
// //         const cz = iz + dz;
// //         if (cz < 0 || cz >= nz) continue;
// //         const c = cx + nx * (cy + ny * cz);
// //         for (let k = starts[c]; k < starts[c + 1]; k++) {
// //           const o = items[k] * 9;
// //           _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
// //           _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
// //           _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
// //           _tri.closestPointToPoint(_p, _c);
// //           const d2 = _c.distanceToSquared(_p);
// //           if (d2 < best) {
// //             best = d2;
// //             bestTri = items[k];
// //             bx = _c.x; by = _c.y; bz = _c.z;
// //           }
// //         }
// //       }
// //     }
// //   }
// //   if (bestTri < 0) return null;

// //   // inside or outside: compare with the normal of the nearest triangle
// //   const o = bestTri * 9;
// //   _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
// //   _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
// //   _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
// //   _tri.getNormal(_n);
// //   const side = (x - bx) * _n.x + (y - by) * _n.y + (z - bz) * _n.z;
// //   const d = Math.sqrt(best);
// //   return side < 0 ? -d : d;
// // }

// // // distances of every vertex of `teeth` to the opposing teeth
// // function measureJaw(teeth, opposingGrid, maxDist) {
// //   const result = {};
// //   const labels = [];
// //   const reach = opposingGrid.box.clone().expandByScalar(maxDist);

// //   for (const part of teeth) {
// //     const pos = part.geo.attributes.position.array;
// //     const n = pos.length / 3;
// //     const dist = new Float32Array(n).fill(Infinity);
// //     let minD = Infinity;
// //     let minIdx = -1;
// //     for (let i = 0; i < n; i++) {
// //       const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
// //       if (x < reach.min.x || y < reach.min.y || z < reach.min.z || x > reach.max.x || y > reach.max.y || z > reach.max.z) continue;
// //       const d = signedDistance(opposingGrid, x, y, z, maxDist);
// //       if (d === null) continue;
// //       dist[i] = d;
// //       if (d < minD) {
// //         minD = d;
// //         minIdx = i;
// //       }
// //     }
// //     result[part.name] = dist;
// //     // a label only for teeth that really touch the other jaw
// //     if (minIdx >= 0 && isContact(minD)) {
// //       labels.push({
// //         name: part.name,
// //         min: minD,
// //         point: new THREE.Vector3(pos[minIdx * 3], pos[minIdx * 3 + 1], pos[minIdx * 3 + 2]),
// //       });
// //     }
// //   }
// //   return { distances: result, labels };
// // }

// // // places each label bubble a little outside the arch, away from the other jaw
// // function placeBubbles(labels, teeth, up) {
// //   const center = new THREE.Box3();
// //   for (const p of teeth) {
// //     if (!p.geo.boundingBox) p.geo.computeBoundingBox();
// //     center.union(p.geo.boundingBox);
// //   }
// //   const c = center.getCenter(new THREE.Vector3());
// //   for (const l of labels) {
// //     const out = new THREE.Vector3(l.point.x - c.x, l.point.y - c.y, 0);
// //     if (out.lengthSq() < 1e-6) out.set(0, -1, 0);
// //     out.normalize().multiplyScalar(8);
// //     l.bubble = l.point.clone().add(out).add(new THREE.Vector3(0, 0, 3 * up));
// //   }
// //   return labels;
// // }

// // /**
// //  * Measures the occlusion between the upper and lower teeth.
// //  * upperTeeth / lowerTeeth: [{ name, geo }] (teeth only, no gum).
// //  * Returns { upper: { distances: { [name]: Float32Array }, labels: [...] }, lower: {...} }
// //  * where a distance of Infinity means "farther than OCCLUSION_MAX_MM" and a negative distance
// //  * means overlap. Labels are only made for teeth that touch (min distance <= CONTACT_TOLERANCE_MM).
// //  */
// // export function computeOcclusion(upperTeeth, lowerTeeth, maxDist = OCCLUSION_MAX_MM) {
// //   if (!upperTeeth?.length || !lowerTeeth?.length) return null;
// //   const upperGrid = buildTriangleGrid(upperTeeth.map((p) => p.geo), maxDist);
// //   const lowerGrid = buildTriangleGrid(lowerTeeth.map((p) => p.geo), maxDist);

// //   const upper = measureJaw(upperTeeth, lowerGrid, maxDist);
// //   const lower = measureJaw(lowerTeeth, upperGrid, maxDist);

// //   // Z is up in the scans: upper labels go up, lower labels go down
// //   placeBubbles(upper.labels, upperTeeth, 1);
// //   placeBubbles(lower.labels, lowerTeeth, -1);
// //   return { upper, lower };
// // }

// // /**
// //  * A copy of a tooth geometry with vertex colors: the contact color where a vertex touches or
// //  * goes into the other jaw, and baseColor everywhere else. Shares the position/normal data.
// //  */
// // export function makeOcclusionGeometry(geo, distances, baseColor) {
// //   const out = new THREE.BufferGeometry();
// //   out.setAttribute("position", geo.attributes.position);
// //   if (geo.attributes.normal) out.setAttribute("normal", geo.attributes.normal);
// //   if (geo.index) out.setIndex(geo.index);
// //   if (geo.boundingBox) out.boundingBox = geo.boundingBox.clone();
// //   if (geo.boundingSphere) out.boundingSphere = geo.boundingSphere.clone();

// //   const base = new THREE.Color(baseColor);
// //   const col = new THREE.Color();
// //   const n = geo.attributes.position.count;
// //   const colors = new Float32Array(n * 3);
// //   for (let i = 0; i < n; i++) {
// //     const d = distances[i];
// //     const c = isContact(d) ? distanceToColor(d, col) : base;
// //     colors[i * 3] = c.r;
// //     colors[i * 3 + 1] = c.g;
// //     colors[i * 3 + 2] = c.b;
// //   }
// //   out.setAttribute("color", new THREE.BufferAttribute(colors, 3));
// //   return out;
// // }




// import * as THREE from "three";

// // ---------------- Occlusion: how close each tooth comes to the teeth of the other jaw ----------------
// //
// // For every vertex of a tooth we find the nearest point on the teeth of the opposing jaw.
// // Places within OCCLUSION_RANGE_MM (0.80 mm) of the other jaw get a rainbow color, one color
// // band every 0.20 mm:
// //   0.00 purple, 0.20 blue, 0.40 cyan/green, 0.60 yellow, 0.80 red
// // Places where the teeth overlap count as 0.00 (purple). Everything farther than 0.80 mm keeps
// // the normal tooth color. No extra library is needed: the opposing teeth are put into a 3D grid
// // so each vertex only checks the triangles near it.

// export const OCCLUSION_RANGE_MM = 0.8; // farther than this = normal tooth color
// export const CONTACT_TOLERANCE_MM = OCCLUSION_RANGE_MM; // everything up to here is colored and labeled
// export const OCCLUSION_MAX_MM = 1.2; // how far we search (also finds overlaps up to this deep)

// // legend ticks shown on the right side bar (top = 0.80 mm, bottom = 0.00 mm)
// export const OCCLUSION_TICKS = [0.8, 0.6, 0.4, 0.2, 0.0];

// // hue goes from 270° (purple, 0 mm) through blue, cyan, green, yellow, orange to 0° (red, 0.80 mm)
// const HUE_AT_ZERO = 270;

// function hueFor(d) {
//   const t = Math.min(Math.max(d / OCCLUSION_RANGE_MM, 0), 1);
//   return HUE_AT_ZERO * (1 - t);
// }

// // true when a vertex at this signed distance (negative = overlap) gets a color
// export const isContact = (d) => d <= CONTACT_TOLERANCE_MM;

// // color of one distance (in mm, negative = overlap, shown as 0) as a THREE.Color
// export function distanceToColor(d, target = new THREE.Color()) {
//   return target.setHSL(hueFor(Math.max(d, 0)) / 360, 0.9, 0.55);
// }

// // the same scale as a CSS gradient, for the legend bar (top = 0.80 mm, bottom = 0 mm)
// export function occlusionGradientCss() {
//   const stops = [];
//   for (let i = 0; i <= 16; i++) {
//     const d = OCCLUSION_RANGE_MM * (1 - i / 16);
//     stops.push(`hsl(${hueFor(d).toFixed(0)}, 90%, 55%) ${((i / 16) * 100).toFixed(1)}%`);
//   }
//   return `linear-gradient(to bottom, ${stops.join(", ")})`;
// }

// // ---- helpers ----

// // triangle corner indices of a geometry (works for indexed and non-indexed geometries)
// function triangleIndex(geo) {
//   if (geo.index) return geo.index.array;
//   const n = geo.attributes.position.count;
//   const idx = new Uint32Array(n);
//   for (let i = 0; i < n; i++) idx[i] = i;
//   return idx;
// }

// // puts all triangles of the given geometries into a grid of cells of size `cell`
// function buildTriangleGrid(geos, cell) {
//   // collect every triangle as 9 numbers
//   let triCount = 0;
//   for (const g of geos) triCount += triangleIndex(g).length / 3;
//   const tris = new Float32Array(triCount * 9);
//   const box = new THREE.Box3();
//   let t = 0;
//   for (const g of geos) {
//     const pos = g.attributes.position.array;
//     const idx = triangleIndex(g);
//     for (let i = 0; i < idx.length; i++) {
//       const v = idx[i] * 3;
//       tris[t++] = pos[v];
//       tris[t++] = pos[v + 1];
//       tris[t++] = pos[v + 2];
//     }
//     if (!g.boundingBox) g.computeBoundingBox();
//     box.union(g.boundingBox);
//   }

//   const min = box.min.clone().subScalar(cell);
//   const size = box.getSize(new THREE.Vector3()).addScalar(2 * cell);
//   const nx = Math.max(1, Math.ceil(size.x / cell));
//   const ny = Math.max(1, Math.ceil(size.y / cell));
//   const nz = Math.max(1, Math.ceil(size.z / cell));
//   const cellCount = nx * ny * nz;

//   const cellOf = (x, y, z) => {
//     const ix = Math.min(nx - 1, Math.max(0, Math.floor((x - min.x) / cell)));
//     const iy = Math.min(ny - 1, Math.max(0, Math.floor((y - min.y) / cell)));
//     const iz = Math.min(nz - 1, Math.max(0, Math.floor((z - min.z) / cell)));
//     return [ix, iy, iz];
//   };

//   // every triangle goes into each cell its own bounding box touches (two passes: count, then fill)
//   const counts = new Uint32Array(cellCount + 1);
//   const ranges = new Int32Array(triCount * 6);
//   for (let i = 0; i < triCount; i++) {
//     const o = i * 9;
//     const a = cellOf(
//       Math.min(tris[o], tris[o + 3], tris[o + 6]),
//       Math.min(tris[o + 1], tris[o + 4], tris[o + 7]),
//       Math.min(tris[o + 2], tris[o + 5], tris[o + 8])
//     );
//     const b = cellOf(
//       Math.max(tris[o], tris[o + 3], tris[o + 6]),
//       Math.max(tris[o + 1], tris[o + 4], tris[o + 7]),
//       Math.max(tris[o + 2], tris[o + 5], tris[o + 8])
//     );
//     ranges.set([a[0], a[1], a[2], b[0], b[1], b[2]], i * 6);
//     for (let x = a[0]; x <= b[0]; x++)
//       for (let y = a[1]; y <= b[1]; y++)
//         for (let z = a[2]; z <= b[2]; z++) counts[x + nx * (y + ny * z) + 1]++;
//   }
//   for (let c = 0; c < cellCount; c++) counts[c + 1] += counts[c];
//   const fill = counts.slice(0, cellCount);
//   const items = new Uint32Array(counts[cellCount]);
//   for (let i = 0; i < triCount; i++) {
//     const r = i * 6;
//     for (let x = ranges[r]; x <= ranges[r + 3]; x++)
//       for (let y = ranges[r + 1]; y <= ranges[r + 4]; y++)
//         for (let z = ranges[r + 2]; z <= ranges[r + 5]; z++) items[fill[x + nx * (y + ny * z)]++] = i;
//   }

//   return { tris, min, cell, nx, ny, nz, starts: counts, items, box };
// }

// const _tri = new THREE.Triangle();
// const _p = new THREE.Vector3();
// const _c = new THREE.Vector3();
// const _n = new THREE.Vector3();
// const _closest = new THREE.Vector3(); // nearest point found by the last signedDistance call

// // signed distance from (x, y, z) to the nearest opposing triangle within maxDist
// // (negative = the point is inside the opposing tooth); null when nothing is that close
// function signedDistance(grid, x, y, z, maxDist) {
//   const { tris, min, cell, nx, ny, nz, starts, items } = grid;
//   const ix = Math.floor((x - min.x) / cell);
//   const iy = Math.floor((y - min.y) / cell);
//   const iz = Math.floor((z - min.z) / cell);
//   if (ix < -1 || iy < -1 || iz < -1 || ix > nx || iy > ny || iz > nz) return null;

//   _p.set(x, y, z);
//   let best = maxDist * maxDist;
//   let bestTri = -1;
//   let bx = 0, by = 0, bz = 0;
//   for (let dx = -1; dx <= 1; dx++) {
//     const cx = ix + dx;
//     if (cx < 0 || cx >= nx) continue;
//     for (let dy = -1; dy <= 1; dy++) {
//       const cy = iy + dy;
//       if (cy < 0 || cy >= ny) continue;
//       for (let dz = -1; dz <= 1; dz++) {
//         const cz = iz + dz;
//         if (cz < 0 || cz >= nz) continue;
//         const c = cx + nx * (cy + ny * cz);
//         for (let k = starts[c]; k < starts[c + 1]; k++) {
//           const o = items[k] * 9;
//           _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
//           _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
//           _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
//           _tri.closestPointToPoint(_p, _c);
//           const d2 = _c.distanceToSquared(_p);
//           if (d2 < best) {
//             best = d2;
//             bestTri = items[k];
//             bx = _c.x; by = _c.y; bz = _c.z;
//           }
//         }
//       }
//     }
//   }
//   if (bestTri < 0) return null;
//   _closest.set(bx, by, bz);

//   // inside or outside: compare with the normal of the nearest triangle
//   const o = bestTri * 9;
//   _tri.a.set(tris[o], tris[o + 1], tris[o + 2]);
//   _tri.b.set(tris[o + 3], tris[o + 4], tris[o + 5]);
//   _tri.c.set(tris[o + 6], tris[o + 7], tris[o + 8]);
//   _tri.getNormal(_n);
//   const side = (x - bx) * _n.x + (y - by) * _n.y + (z - bz) * _n.z;
//   const d = Math.sqrt(best);
//   return side < 0 ? -d : d;
// }

// // distances of every vertex of `teeth` to the opposing teeth
// function measureJaw(teeth, opposingGrid, maxDist) {
//   const result = {};
//   const nearest = {};
//   const labels = [];
//   const reach = opposingGrid.box.clone().expandByScalar(maxDist);

//   for (const part of teeth) {
//     const pos = part.geo.attributes.position.array;
//     const n = pos.length / 3;
//     const dist = new Float32Array(n).fill(Infinity);
//     const near = new Float32Array(n * 3); // nearest point on the other jaw (used where teeth overlap)
//     let minD = Infinity;
//     let minIdx = -1;
//     for (let i = 0; i < n; i++) {
//       const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
//       if (x < reach.min.x || y < reach.min.y || z < reach.min.z || x > reach.max.x || y > reach.max.y || z > reach.max.z) continue;
//       const d = signedDistance(opposingGrid, x, y, z, maxDist);
//       if (d === null) continue;
//       dist[i] = d;
//       near[i * 3] = _closest.x;
//       near[i * 3 + 1] = _closest.y;
//       near[i * 3 + 2] = _closest.z;
//       if (d < minD) {
//         minD = d;
//         minIdx = i;
//       }
//     }
//     result[part.name] = dist;
//     nearest[part.name] = near;
//     // a label only for teeth that really touch the other jaw
//     if (minIdx >= 0 && isContact(minD)) {
//       labels.push({
//         name: part.name,
//         min: minD,
//         point: new THREE.Vector3(pos[minIdx * 3], pos[minIdx * 3 + 1], pos[minIdx * 3 + 2]),
//       });
//     }
//   }
//   return { distances: result, nearest, labels };
// }

// // places each label bubble a little outside the arch, away from the other jaw
// function placeBubbles(labels, teeth, up) {
//   const center = new THREE.Box3();
//   for (const p of teeth) {
//     if (!p.geo.boundingBox) p.geo.computeBoundingBox();
//     center.union(p.geo.boundingBox);
//   }
//   const c = center.getCenter(new THREE.Vector3());
//   for (const l of labels) {
//     const out = new THREE.Vector3(l.point.x - c.x, l.point.y - c.y, 0);
//     if (out.lengthSq() < 1e-6) out.set(0, -1, 0);
//     out.normalize().multiplyScalar(8);
//     l.bubble = l.point.clone().add(out).add(new THREE.Vector3(0, 0, 3 * up));
//   }
//   return labels;
// }

// /**
//  * Measures the occlusion between the upper and lower teeth.
//  * upperTeeth / lowerTeeth: [{ name, geo }] (teeth only, no gum).
//  * Returns { upper: { distances: { [name]: Float32Array }, labels: [...] }, lower: {...} }
//  * where a distance of Infinity means "farther than OCCLUSION_MAX_MM" and a negative distance
//  * means overlap. Labels are only made for teeth that come within CONTACT_TOLERANCE_MM (0.80 mm).
//  */
// export function computeOcclusion(upperTeeth, lowerTeeth, maxDist = OCCLUSION_MAX_MM) {
//   if (!upperTeeth?.length || !lowerTeeth?.length) return null;
//   const upperGrid = buildTriangleGrid(upperTeeth.map((p) => p.geo), maxDist);
//   const lowerGrid = buildTriangleGrid(lowerTeeth.map((p) => p.geo), maxDist);

//   const upper = measureJaw(upperTeeth, lowerGrid, maxDist);
//   const lower = measureJaw(lowerTeeth, upperGrid, maxDist);

//   // Z is up in the scans: upper labels go up, lower labels go down
//   placeBubbles(upper.labels, upperTeeth, 1);
//   placeBubbles(lower.labels, lowerTeeth, -1);
//   return { upper, lower };
// }

// /**
//  * A copy of a tooth geometry with vertex colors: the contact color where a vertex touches or
//  * goes into the other jaw, and baseColor everywhere else. Shares the position/normal data.
//  */
// export function makeOcclusionGeometry(geo, distances, baseColor) {
//   const out = new THREE.BufferGeometry();
//   out.setAttribute("position", geo.attributes.position);
//   if (geo.attributes.normal) out.setAttribute("normal", geo.attributes.normal);
//   if (geo.index) out.setIndex(geo.index);
//   if (geo.boundingBox) out.boundingBox = geo.boundingBox.clone();
//   if (geo.boundingSphere) out.boundingSphere = geo.boundingSphere.clone();

//   const base = new THREE.Color(baseColor);
//   const col = new THREE.Color();
//   const n = geo.attributes.position.count;
//   const colors = new Float32Array(n * 3);
//   for (let i = 0; i < n; i++) {
//     const d = distances[i];
//     const c = isContact(d) ? distanceToColor(d, col) : base;
//     colors[i * 3] = c.r;
//     colors[i * 3 + 1] = c.g;
//     colors[i * 3 + 2] = c.b;
//   }
//   out.setAttribute("color", new THREE.BufferAttribute(colors, 3));
//   return out;
// }

// // ---------------- Contact patches drawn on top ----------------
// //
// // Where two teeth overlap, the colored part of one tooth is INSIDE the other tooth, so it is
// // hidden behind it and you cannot see it. To make every contact visible, the contact triangles
// // are copied into a separate "patch" mesh: overlapping vertices are moved out onto the other
// // tooth's surface (+ CONTACT_LIFT_MM), other vertices are lifted CONTACT_LIFT_MM off their own surface
// // (the patch also draws a little in front of the tooth, so it wins where they lie on top of each other). The patch is also grown a little
// // (CONTACT_GROW_RINGS rings of triangles) so tiny contacts are big enough to see.

// export const CONTACT_LIFT_MM = 0.03; // how far the patch sits above the other tooth's surface
// export const CONTACT_GROW_RINGS = 1; // 0 = only the contact triangles, 1 = one extra ring around them

// /**
//  * A mesh of only the contact areas of one tooth, lifted so it is not hidden by the other jaw.
//  * Returns null when the tooth has no contact.
//  */
// export function makeContactPatch(geo, distances, nearest) {
//   const pos = geo.attributes.position.array;
//   const nor = geo.attributes.normal ? geo.attributes.normal.array : null;
//   const idx = triangleIndex(geo);
//   const vCount = geo.attributes.position.count;
//   const triCount = idx.length / 3;

//   // vertices that touch, then grow the marked area ring by ring
//   let marked = new Uint8Array(vCount);
//   let any = false;
//   for (let i = 0; i < vCount; i++) {
//     if (isContact(distances[i])) {
//       marked[i] = 1;
//       any = true;
//     }
//   }
//   if (!any) return null;

//   const triIn = new Uint8Array(triCount);
//   for (let ring = 0; ring <= CONTACT_GROW_RINGS; ring++) {
//     for (let t = 0; t < triCount; t++) {
//       if (marked[idx[t * 3]] || marked[idx[t * 3 + 1]] || marked[idx[t * 3 + 2]]) triIn[t] = 1;
//     }
//     if (ring < CONTACT_GROW_RINGS) {
//       const next = marked.slice();
//       for (let t = 0; t < triCount; t++) {
//         if (triIn[t]) next[idx[t * 3]] = next[idx[t * 3 + 1]] = next[idx[t * 3 + 2]] = 1;
//       }
//       marked = next;
//     }
//   }

//   let n = 0;
//   for (let t = 0; t < triCount; t++) n += triIn[t];
//   const outPos = new Float32Array(n * 9);
//   const outNor = new Float32Array(n * 9);
//   const outCol = new Float32Array(n * 9);
//   const col = new THREE.Color();
//   let o = 0;
//   for (let t = 0; t < triCount; t++) {
//     if (!triIn[t]) continue;
//     // corners outside the range (the grown ring) take the color of the closest corner
//     let dMin = Infinity;
//     for (let k = 0; k < 3; k++) dMin = Math.min(dMin, distances[idx[t * 3 + k]]);
//     if (!isContact(dMin)) dMin = CONTACT_TOLERANCE_MM;

//     for (let k = 0; k < 3; k++) {
//       const v = idx[t * 3 + k];
//       const d = distances[v];
//       if (d < 0 && nearest) {
//         // inside the other tooth: put it on that tooth's surface, a hair outside
//         const s = (-d + CONTACT_LIFT_MM) / -d;
//         for (let a = 0; a < 3; a++) {
//           const p = pos[v * 3 + a];
//           outPos[o + a] = p + (nearest[v * 3 + a] - p) * s;
//           outNor[o + a] = nor ? nor[v * 3 + a] : 0;
//         }
//       } else {
//         // outside: lift a hair off its own surface, but never so far that it goes into the other tooth
//         const lift = d < CONTACT_LIFT_MM ? 0 : CONTACT_LIFT_MM;
//         for (let a = 0; a < 3; a++) {
//           const nn = nor ? nor[v * 3 + a] : 0;
//           outPos[o + a] = pos[v * 3 + a] + nn * lift;
//           outNor[o + a] = nn;
//         }
//       }
//       distanceToColor(isContact(d) ? d : dMin, col);
//       outCol[o] = col.r;
//       outCol[o + 1] = col.g;
//       outCol[o + 2] = col.b;
//       o += 3;
//     }
//   }

//   const out = new THREE.BufferGeometry();
//   out.setAttribute("position", new THREE.BufferAttribute(outPos, 3));
//   out.setAttribute("normal", new THREE.BufferAttribute(outNor, 3));
//   out.setAttribute("color", new THREE.BufferAttribute(outCol, 3));
//   if (!nor) out.computeVertexNormals();
//   out.computeBoundingSphere();
//   return out;
// }


import * as THREE from "three";

// ---------------- Occlusion: how close each tooth comes to the teeth of the other jaw ----------------
//
// For every vertex of a tooth we find the nearest point on the teeth of the opposing jaw.
// ONLY the places where the teeth touch or go into each other are colored. The color tells
// how deep the teeth overlap, one color band every 0.20 mm:
//   0.00 purple (just touching), 0.20 blue, 0.40 cyan/green, 0.60 yellow, 0.80+ red
// Gaps (teeth not touching) are NOT colored: they keep the normal tooth color.
// No extra library is needed: the opposing teeth are put into a 3D grid so each vertex only
// checks the triangles near it.

export const CONTACT_TOLERANCE_MM = 0.05; // a gap this small or smaller still counts as "touching"
export const OCCLUSION_RANGE_MM = 1.2; // overlaps this deep or deeper are full red
export const OCCLUSION_MAX_MM = 1.2; // how far we search (also finds overlaps up to this deep)

// legend ticks shown on the right side bar (overlap depth, top = 0.80 mm, bottom = 0.00 mm)
export const OCCLUSION_TICKS = [1.2,1.0,0.8, 0.6, 0.4, 0.2, 0.0];

// hue goes from 270° (purple, 0 mm) through blue, cyan, green, yellow, orange to 0° (red, 0.80 mm)
const HUE_AT_ZERO = 270;

function hueFor(depth) {
  const t = Math.min(Math.max(depth / OCCLUSION_RANGE_MM, 0), 1);
  return HUE_AT_ZERO * (1 - t);
}

// true when a vertex at this signed distance (negative = overlap) touches the other jaw
export const isContact = (d) => d <= CONTACT_TOLERANCE_MM;

// color of one touching vertex (d = signed distance in mm; -0.40 = 0.40 mm overlap) as a THREE.Color
export function distanceToColor(d, target = new THREE.Color()) {
  return target.setHSL(hueFor(Math.max(-d, 0)) / 360, 0.9, 0.55);
}

// the same scale as a CSS gradient, for the legend bar (top = 0.80 mm overlap, bottom = touching)
export function occlusionGradientCss() {
  const stops = [];
  for (let i = 0; i <= 16; i++) {
    const depth = OCCLUSION_RANGE_MM * (1 - i / 16);
    stops.push(`hsl(${hueFor(depth).toFixed(0)}, 90%, 55%) ${((i / 16) * 100).toFixed(1)}%`);
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
const _closest = new THREE.Vector3(); // nearest point found by the last signedDistance call

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
  _closest.set(bx, by, bz);

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
  const nearest = {};
  const labels = [];
  const reach = opposingGrid.box.clone().expandByScalar(maxDist);

  for (const part of teeth) {
    const pos = part.geo.attributes.position.array;
    const n = pos.length / 3;
    const dist = new Float32Array(n).fill(Infinity);
    const near = new Float32Array(n * 3); // nearest point on the other jaw (used where teeth overlap)
    let minD = Infinity;
    let minIdx = -1;
    for (let i = 0; i < n; i++) {
      const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
      if (x < reach.min.x || y < reach.min.y || z < reach.min.z || x > reach.max.x || y > reach.max.y || z > reach.max.z) continue;
      const d = signedDistance(opposingGrid, x, y, z, maxDist);
      if (d === null) continue;
      dist[i] = d;
      near[i * 3] = _closest.x;
      near[i * 3 + 1] = _closest.y;
      near[i * 3 + 2] = _closest.z;
      if (d < minD) {
        minD = d;
        minIdx = i;
      }
    }
    result[part.name] = dist;
    nearest[part.name] = near;
    // a label only for teeth that really touch the other jaw
    if (minIdx >= 0 && isContact(minD)) {
      labels.push({
        name: part.name,
        min: minD,
        point: new THREE.Vector3(pos[minIdx * 3], pos[minIdx * 3 + 1], pos[minIdx * 3 + 2]),
      });
    }
  }
  return { distances: result, nearest, labels };
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
 * where a distance of Infinity means "farther than OCCLUSION_MAX_MM" and a negative distance
 * means overlap. Labels are only made for teeth that touch (min distance <= CONTACT_TOLERANCE_MM).
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
 * A copy of a tooth geometry with vertex colors: the contact color where a vertex touches or
 * goes into the other jaw, and baseColor everywhere else. Shares the position/normal data.
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
    const c = isContact(d) ? distanceToColor(d, col) : base;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  out.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return out;
}

// ---------------- Contact patches drawn on top ----------------
//
// Where two teeth overlap, the colored part of one tooth is INSIDE the other tooth, so it is
// hidden behind it and you cannot see it. To make every contact visible, the contact triangles
// are copied into a separate "patch" mesh: overlapping vertices are moved out onto the other
// tooth's surface (+ CONTACT_LIFT_MM), other vertices are lifted CONTACT_LIFT_MM off their own surface
// (the patch also draws a little in front of the tooth, so it wins where they lie on top of each other). The patch is also grown a little
// (CONTACT_GROW_RINGS rings of triangles) so tiny contacts are big enough to see.

export const CONTACT_LIFT_MM = 0.03; // how far the patch sits above the other tooth's surface
export const CONTACT_GROW_RINGS = 1; // 0 = only the contact triangles, 1 = one extra ring around them

/**
 * A mesh of only the contact areas of one tooth, lifted so it is not hidden by the other jaw.
 * Returns null when the tooth has no contact.
 */
export function makeContactPatch(geo, distances, nearest) {
  const pos = geo.attributes.position.array;
  const nor = geo.attributes.normal ? geo.attributes.normal.array : null;
  const idx = triangleIndex(geo);
  const vCount = geo.attributes.position.count;
  const triCount = idx.length / 3;

  // vertices that touch, then grow the marked area ring by ring
  let marked = new Uint8Array(vCount);
  let any = false;
  for (let i = 0; i < vCount; i++) {
    if (isContact(distances[i])) {
      marked[i] = 1;
      any = true;
    }
  }
  if (!any) return null;

  const triIn = new Uint8Array(triCount);
  for (let ring = 0; ring <= CONTACT_GROW_RINGS; ring++) {
    for (let t = 0; t < triCount; t++) {
      if (marked[idx[t * 3]] || marked[idx[t * 3 + 1]] || marked[idx[t * 3 + 2]]) triIn[t] = 1;
    }
    if (ring < CONTACT_GROW_RINGS) {
      const next = marked.slice();
      for (let t = 0; t < triCount; t++) {
        if (triIn[t]) next[idx[t * 3]] = next[idx[t * 3 + 1]] = next[idx[t * 3 + 2]] = 1;
      }
      marked = next;
    }
  }

  let n = 0;
  for (let t = 0; t < triCount; t++) n += triIn[t];
  const outPos = new Float32Array(n * 9);
  const outNor = new Float32Array(n * 9);
  const outCol = new Float32Array(n * 9);
  const col = new THREE.Color();
  let o = 0;
  for (let t = 0; t < triCount; t++) {
    if (!triIn[t]) continue;
    // corners outside the range (the grown ring) take the color of the closest corner
    let dMin = Infinity;
    for (let k = 0; k < 3; k++) dMin = Math.min(dMin, distances[idx[t * 3 + k]]);
    if (!isContact(dMin)) dMin = CONTACT_TOLERANCE_MM;

    for (let k = 0; k < 3; k++) {
      const v = idx[t * 3 + k];
      const d = distances[v];
      if (d < 0 && nearest) {
        // inside the other tooth: put it on that tooth's surface, a hair outside
        const s = (-d + CONTACT_LIFT_MM) / -d;
        for (let a = 0; a < 3; a++) {
          const p = pos[v * 3 + a];
          outPos[o + a] = p + (nearest[v * 3 + a] - p) * s;
          outNor[o + a] = nor ? nor[v * 3 + a] : 0;
        }
      } else {
        // outside: lift a hair off its own surface, but never so far that it goes into the other tooth
        const lift = d < CONTACT_LIFT_MM ? 0 : CONTACT_LIFT_MM;
        for (let a = 0; a < 3; a++) {
          const nn = nor ? nor[v * 3 + a] : 0;
          outPos[o + a] = pos[v * 3 + a] + nn * lift;
          outNor[o + a] = nn;
        }
      }
      distanceToColor(isContact(d) ? d : dMin, col);
      outCol[o] = col.r;
      outCol[o + 1] = col.g;
      outCol[o + 2] = col.b;
      o += 3;
    }
  }

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(outPos, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(outNor, 3));
  out.setAttribute("color", new THREE.BufferAttribute(outCol, 3));
  if (!nor) out.computeVertexNormals();
  out.computeBoundingSphere();
  return out;
}
