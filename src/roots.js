



// // // // Root view: an approximate root for every tooth crown.
// // // // The exe gives only crowns, so each root is made here: the open edge of the crown
// // // // (the cervical line, where the crown met the gum) is pulled away from the biting side
// // // // along the tooth's long axis and narrowed down to a rounded tip.
// // // // Back teeth get more than one root: the crown edge is cut like a pie into 2 or 3 pieces,
// // // // the pieces stay together for the first few mm (the trunk) and then part into separate roots
// // // // (upper molars 3 roots, lower molars 2, upper first premolars 2, all other teeth 1).
// // // // The roots are made from the teeth you are looking at (Final Position = the moved teeth),
// // // // so they always sit on the crowns and move with them.
// // // import * as THREE from "three";
// // // import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";


// // // // typical root length per tooth type (2nd digit of the tooth number), in mm
// // // const ROOT_LENGTH_MM = { 1: 15.5, 2: 15, 3: 19, 4: 15.5, 5: 15.5, 6: 14.5, 7: 14, 8: 12.5 };
// // // const DEFAULT_ROOT_LENGTH_MM = 15;
// // // const MOLAR_SIZE_MM = 8.5; // a tooth with no number: a crown at least this wide both ways is treated as a molar

// // // const RING_POINTS = 96; // points around the root (more = smoother)
// // // const RINGS = 40; // rings from the crown edge to the tip (more = smoother)
// // // const SPLIT_MM = 3.5; // about how far under the crown edge the roots of back teeth come apart
// // // const SPLAY_MM = 2.2; // how far the tips of split roots spread outward
// // // const CURVE_MM = 1.2; // how far root tips bend toward the back of the mouth (distal), like real roots
// // // const MAX_TILT_DEG = 25; // the edge's own direction is used only if it is this close to the jaw's up/down
// // // const TUCK_UP_MM = 0.4; // the root starts this far inside the crown (toward the biting side)...
// // // const NECK_MM = 1.5; // the root neck is as wide as the crown within this distance above the crown edge
// // // const TUCK_IN_MM = 0.15; // ...and this much narrower than the crown edge, so the crown covers the join

// // // const toothId = (name) => {
// // //   const m = /(\d{2})/.exec(name || "");
// // //   return m ? m[1] : null;
// // // };

// // // // how the root splits, by tooth type. Angles in degrees around the tooth, 0 = cheek side (buccal);
// // // // the split lines run from the middle of the tooth out at these angles.
// // // // lenScale: length of that root compared with the others
// // // export function rootPlan(name, jaw) {
// // //   const id = toothId(name);
// // //   const type = id ? Number(id[1]) : 0;
// // //   if (jaw === "upper" && (type === 6 || type === 7 || type === 8)) {
// // //     // 2 cheek-side roots + 1 longer palatal root
// // //     return [
// // //       { from: 0, to: 110, lenScale: 0.95 },
// // //       { from: 110, to: 250, lenScale: 1.05 },
// // //       { from: 250, to: 360, lenScale: 0.95 },
// // //     ];
// // //   }
// // //   if (jaw === "lower" && (type === 6 || type === 7 || type === 8)) {
// // //     // mesial + distal root (the split line runs cheek to tongue)
// // //     return [
// // //       { from: 0, to: 180, lenScale: 1 },
// // //       { from: 180, to: 360, lenScale: 0.95 },
// // //     ];
// // //   }
// // //   if (jaw === "upper" && type === 4) {
// // //     // upper first premolar: cheek-side + palatal root
// // //     return [
// // //       { from: 270, to: 450, lenScale: 1 },
// // //       { from: 90, to: 270, lenScale: 0.95 },
// // //     ];
// // //   }
// // //   return null; // one root
// // // }

// // // export function rootLengthFor(name) {
// // //   const id = toothId(name);
// // //   return (id && ROOT_LENGTH_MM[Number(id[1])]) || DEFAULT_ROOT_LENGTH_MM;
// // // }

// // // // ---------- the open edge of the crown ----------

// // // // all loops of edges that belong to only one triangle (open edges of the crown mesh).
// // // // The cut where the crown met the gum is one of them; small holes in the crown are others.
// // // // Returns [{ pts: [Vector3], closed, perimeter }]
// // // function boundaryLoops(geo) {
// // //   const index = geo.index;
// // //   const pos = geo.attributes.position;
// // //   if (!index) return [];
// // //   const idx = index.array;

// // //   const count = new Map(); // "a_b" (a<b) -> how many triangles use this edge
// // //   const dir = new Map(); // "a_b" -> [from, to] as the triangle uses it
// // //   for (let t = 0; t < idx.length; t += 3) {
// // //     for (let k = 0; k < 3; k++) {
// // //       const a = idx[t + k], b = idx[t + ((k + 1) % 3)];
// // //       const key = a < b ? a + "_" + b : b + "_" + a;
// // //       count.set(key, (count.get(key) || 0) + 1);
// // //       dir.set(key, [a, b]);
// // //     }
// // //   }

// // //   // open edges, by start vertex (a vertex can start more than one, where two holes touch)
// // //   const out = new Map(); // vertex -> [edge ids]
// // //   const edges = [];
// // //   for (const [key, c] of count) {
// // //     if (c !== 1) continue;
// // //     const [a, b] = dir.get(key);
// // //     const id = edges.length;
// // //     edges.push([a, b]);
// // //     if (!out.has(a)) out.set(a, []);
// // //     out.get(a).push(id);
// // //   }
// // //   if (edges.length < 8) return [];

// // //   // follow the open edges into loops (edge by edge, so touching holes do not break them)
// // //   const usedEdge = new Uint8Array(edges.length);
// // //   const loops = [];
// // //   const P = (i) => new THREE.Vector3().fromBufferAttribute(pos, i);
// // //   for (let e0 = 0; e0 < edges.length; e0++) {
// // //     if (usedEdge[e0]) continue;
// // //     const start = edges[e0][0];
// // //     const verts = [];
// // //     let e = e0;
// // //     let closed = false;
// // //     while (e !== undefined) {
// // //       usedEdge[e] = 1;
// // //       verts.push(edges[e][0]);
// // //       const v = edges[e][1];
// // //       if (v === start) { closed = true; break; }
// // //       const cand = (out.get(v) || []).filter((x) => !usedEdge[x]);
// // //       e = cand[0];
// // //     }
// // //     if (verts.length < 8) continue;
// // //     const pts = verts.map(P);
// // //     let perimeter = 0;
// // //     for (let i = 0; i < pts.length; i++) perimeter += pts[i].distanceTo(pts[(i + 1) % pts.length]);
// // //     loops.push({ pts, closed, perimeter });
// // //   }
// // //   return loops;
// // // }

// // // // the crown edge: a big open loop at the root end of the crown, as wide as the crown.
// // // // Returns null when no loop looks like that (then the outline of the crown's root end is used)
// // // function crownEdge(geo, apical) {
// // //   const loops = boundaryLoops(geo);
// // //   if (!loops.length) return null;

// // //   // size of the crown across the axis and along it
// // //   const pos = geo.attributes.position;
// // //   const { u, w } = planeAxes(apical);
// // //   const v = new THREE.Vector3();
// // //   let uMin = Infinity, uMax = -Infinity, wMin = Infinity, wMax = -Infinity, hMin = Infinity, hMax = -Infinity;
// // //   for (let i = 0; i < pos.count; i++) {
// // //     v.fromBufferAttribute(pos, i);
// // //     const x = v.dot(u), y = v.dot(w), h = v.dot(apical);
// // //     if (x < uMin) uMin = x; if (x > uMax) uMax = x;
// // //     if (y < wMin) wMin = y; if (y > wMax) wMax = y;
// // //     if (h < hMin) hMin = h; if (h > hMax) hMax = h;
// // //   }
// // //   const crownU = uMax - uMin, crownW = wMax - wMin, crownH = hMax - hMin;

// // //   let best = null, bestScore = -Infinity;
// // //   for (const L of loops) {
// // //     let lu0 = Infinity, lu1 = -Infinity, lw0 = Infinity, lw1 = -Infinity, hSum = 0;
// // //     for (const p of L.pts) {
// // //       const x = p.dot(u), y = p.dot(w);
// // //       if (x < lu0) lu0 = x; if (x > lu1) lu1 = x;
// // //       if (y < lw0) lw0 = y; if (y > lw1) lw1 = y;
// // //       hSum += p.dot(apical);
// // //     }
// // //     const wide = Math.min((lu1 - lu0) / crownU, (lw1 - lw0) / crownW); // 1 = as wide as the crown
// // //     const deep = crownH > 1e-6 ? (hSum / L.pts.length - hMin) / crownH : 1; // 1 = at the root end
// // //     // a hole on the biting side, a small hole, or a broken piece of the edge is not the crown edge
// // //     if (wide < 0.6 || deep < 0.5) continue;
// // //     const score = wide + deep + (L.closed ? 1 : 0);
// // //     if (score > bestScore) { bestScore = score; best = L; }
// // //   }
// // //   return best ? best.pts : null;
// // // }

// // // // fallback (closed crown, or no good open edge): the crown points near its root end
// // // function bandPoints(geo, apical) {
// // //   const pos = geo.attributes.position;
// // //   let hMin = Infinity, hMax = -Infinity;
// // //   const v = new THREE.Vector3();
// // //   for (let i = 0; i < pos.count; i++) {
// // //     const h = v.fromBufferAttribute(pos, i).dot(apical);
// // //     if (h < hMin) hMin = h;
// // //     if (h > hMax) hMax = h;
// // //   }
// // //   const bandStart = hMax - (hMax - hMin) * 0.2;
// // //   const pts = [];
// // //   for (let i = 0; i < pos.count; i++) {
// // //     v.fromBufferAttribute(pos, i);
// // //     if (v.dot(apical) >= bandStart) pts.push(v.clone());
// // //   }
// // //   return pts.length >= 8 ? pts : null;
// // // }

// // // // a clean, round-going ring from messy edge points: for every direction around the axis
// // // // (seen from the middle of the crown) one point, at the edge's distance and height there.
// // // // Real crown edges are jagged and go back and forth; used as they are they give thin
// // // // spikes and lines on the root. mode "edge": typical distance in each direction,
// // // // mode "outline": the farthest point (for the fallback band)
// // // function cleanRing(points, center, axis, mode, crownGeo = null) {
// // //   const { u, w } = planeAxes(axis);
// // //   const N = RING_POINTS;
// // //   const rad = Array.from({ length: N }, () => []);
// // //   const hgt = Array.from({ length: N }, () => []);
// // //   for (const p of points) {
// // //     const d = p.clone().sub(center);
// // //     const x = d.dot(u), y = d.dot(w);
// // //     const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
// // //     rad[k].push(Math.hypot(x, y));
// // //     hgt[k].push(d.dot(axis));
// // //   }
// // //   const median = (a) => {
// // //     const s = [...a].sort((x, y) => x - y);
// // //     return s[Math.floor(s.length / 2)];
// // //   };
// // //   let r = rad.map((a) => (a.length ? (mode === "outline" ? Math.max(...a) : median(a)) : null));
// // //   let h = hgt.map((a) => (a.length ? Math.max(...a) : null)); // the deepest edge point (root side)
// // //   const filled = r.filter((x) => x !== null).length;
// // //   if (filled < N * 0.3) return null;

// // //   // directions with no edge point: in between their neighbours
// // //   const fillGaps = (arr) => {
// // //     const out = arr.slice();
// // //     for (let k = 0; k < N; k++) {
// // //       if (out[k] !== null) continue;
// // //       let a = 1, b = 1;
// // //       while (arr[(k - a + N) % N] === null) a++;
// // //       while (arr[(k + b) % N] === null) b++;
// // //       const va = arr[(k - a + N) % N], vb = arr[(k + b) % N];
// // //       out[k] = va + ((vb - va) * a) / (a + b);
// // //     }
// // //     return out;
// // //   };
// // //   r = fillGaps(r);
// // //   h = fillGaps(h);

// // //   // root neck as wide as the crown just above its edge, so the root blends into the crown
// // //   // outline (and the jagged crown edge ends up inside the root instead of sticking out)
// // //   if (crownGeo) {
// // //     const pos = crownGeo.attributes.position;
// // //     const wide = new Array(N).fill(0);
// // //     const v = new THREE.Vector3();
// // //     for (let i = 0; i < pos.count; i++) {
// // //       const d = v.fromBufferAttribute(pos, i).sub(center);
// // //       const x = d.dot(u), y = d.dot(w), hh = d.dot(axis);
// // //       const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
// // //       if (hh <= h[k] + 0.2 && hh >= h[k] - NECK_MM) wide[k] = Math.max(wide[k], Math.hypot(x, y));
// // //     }
// // //     r = r.map((rk, k) => Math.max(rk, wide[k]));
// // //   }
// // //   // a little smoothing round the ring
// // //   const smooth1 = (arr, passes) => {
// // //     let cur = arr;
// // //     for (let s = 0; s < passes; s++) cur = cur.map((v, k) => 0.5 * v + 0.25 * cur[(k - 1 + N) % N] + 0.25 * cur[(k + 1) % N]);
// // //     return cur;
// // //   };
// // //   r = smooth1(r, 3);
// // //   h = smooth1(h, 3);

// // //   const ring = [];
// // //   for (let k = 0; k < N; k++) {
// // //     const a = ((k + 0.5) / N) * 2 * Math.PI - Math.PI;
// // //     // tucked a little inside the crown, so the crown's own edge covers the join (no lines there)
// // //     const rr = Math.max(0.1, r[k] - TUCK_IN_MM);
// // //     ring.push(
// // //       center.clone()
// // //         .addScaledVector(u, Math.cos(a) * rr)
// // //         .addScaledVector(w, Math.sin(a) * rr)
// // //         .addScaledVector(axis, h[k] - TUCK_UP_MM)
// // //     );
// // //   }
// // //   return ring;
// // // }

// // // function planeAxes(n) {
// // //   const helper = Math.abs(n.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
// // //   const u = new THREE.Vector3().crossVectors(n, helper).normalize();
// // //   const w = new THREE.Vector3().crossVectors(n, u).normalize();
// // //   return { u, w };
// // // }

// // // // RING_POINTS points spread evenly along a closed loop
// // // function resample(loop, n) {
// // //   const len = [0];
// // //   for (let i = 1; i <= loop.length; i++) {
// // //     len.push(len[i - 1] + loop[i - 1].distanceTo(loop[i % loop.length]));
// // //   }
// // //   const total = len[len.length - 1];
// // //   const out = [];
// // //   let seg = 0;
// // //   for (let k = 0; k < n; k++) {
// // //     const target = (k / n) * total;
// // //     while (seg < loop.length - 1 && len[seg + 1] < target) seg++;
// // //     const a = loop[seg], b = loop[(seg + 1) % loop.length];
// // //     const s = len[seg + 1] - len[seg];
// // //     const t = s > 1e-9 ? (target - len[seg]) / s : 0;
// // //     out.push(a.clone().lerp(b, t));
// // //   }
// // //   return out;
// // // }

// // // // circular moving average (makes the ragged crown edge round deeper down the root)
// // // function smoothLoop(pts, passes) {
// // //   let cur = pts.map((p) => p.clone());
// // //   for (let s = 0; s < passes; s++) {
// // //     cur = cur.map((p, i) => {
// // //       const a = cur[(i - 1 + cur.length) % cur.length], b = cur[(i + 1) % cur.length];
// // //       return p.clone().multiplyScalar(0.5).addScaledVector(a, 0.25).addScaledVector(b, 0.25);
// // //     });
// // //   }
// // //   return cur;
// // // }

// // // // plane normal of a loop (direction of least spread)
// // // function loopNormal(pts, center) {
// // //   // Newell's method: robust for a closed, roughly flat loop
// // //   const n = new THREE.Vector3();
// // //   for (let i = 0; i < pts.length; i++) {
// // //     const a = pts[i].clone().sub(center), b = pts[(i + 1) % pts.length].clone().sub(center);
// // //     n.x += (a.y - b.y) * (a.z + b.z);
// // //     n.y += (a.z - b.z) * (a.x + b.x);
// // //     n.z += (a.x - b.x) * (a.y + b.y);
// // //   }
// // //   return n.lengthSq() > 1e-12 ? n.normalize() : null;
// // // }

// // // const smoothstep = (x) => {
// // //   const t = Math.min(1, Math.max(0, x));
// // //   return t * t * (3 - 2 * t);
// // // };

// // // // how wide a root is at depth t (0 = crown edge, 1 = tip). Starts flat (no band at the crown),
// // // // gets a little narrower under the crown, then tapers smoothly to a rounded tip
// // // const singleWidth = (t) => (1 - 0.1 * smoothstep(t / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5);
// // // const splitWidth = (t) => (1 - 0.32 * smoothstep((t - 0.05) / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5); // thick, blunt roots

// // // const sideways = (v, axis) => v.clone().addScaledVector(axis, -v.dot(axis));

// // // // one root: from a ring of points (going round the axis the same way as the crown edge)
// // // // down along the axis, narrowing to a rounded tip
// // // function extrude(ring, center, axis, o) {
// // //   const n = ring.length;
// // //   const smooth = smoothLoop(ring, o.smoothPasses ?? 12);
// // //   const heights = ring.map((p) => p.clone().sub(center).dot(axis));
// // //   const hMax = Math.max(...heights); // the deepest point of the crown edge
// // //   const hMin = Math.min(...heights);
// // //   const zero = new THREE.Vector3();
// // //   const splayDir = o.splayDir || zero, curveDir = o.curveDir || zero;
// // //   const splay = o.splay || 0, curve = o.curve || 0;
// // //   const flatMm = Math.max(2.5, (hMax - hMin) * 1.5); // the wavy crown edge becomes flat over this depth

// // //   const positions = [];
// // //   for (let r = 0; r <= o.rings; r++) {
// // //     // rings closer together near the crown and the tip, where the shape changes most
// // //     const t = 0.5 - 0.5 * Math.cos((Math.PI * r) / o.rings);
// // //     const d = o.length * t; // depth in mm
// // //     const flat = smoothstep(d / flatMm);
// // //     const round = smoothstep(d / o.roundMm);
// // //     const w = o.width(t);
// // //     const bend = splayDir.clone().multiplyScalar(splay * smoothstep(d / o.length) ** 1.2)
// // //       .addScaledVector(curveDir, curve * t * t);
// // //     for (let i = 0; i < n; i++) {
// // //       let q;
// // //       if (r === 0) {
// // //         q = ring[i].clone(); // exactly on the crown edge
// // //       } else {
// // //         const off = sideways(ring[i].clone().lerp(smooth[i], round).sub(center), axis);
// // //         const h = heights[i] + (hMax - heights[i]) * flat + d;
// // //         q = center.clone().addScaledVector(axis, h).addScaledVector(off, w).add(bend);
// // //       }
// // //       positions.push(q.x, q.y, q.z);
// // //     }
// // //   }
// // //   // rounded tip: a little past the last ring
// // //   const tip = center.clone().addScaledVector(axis, hMax + o.length + 0.4)
// // //     .addScaledVector(splayDir, splay).addScaledVector(curveDir, curve);
// // //   positions.push(tip.x, tip.y, tip.z);
// // //   const tipIndex = (o.rings + 1) * n;

// // //   const indices = [];
// // //   for (let r = 0; r < o.rings; r++) {
// // //     for (let i = 0; i < n; i++) {
// // //       const a = r * n + i;
// // //       const b = r * n + ((i + 1) % n);
// // //       indices.push(a, a + n, b, b, a + n, b + n);
// // //     }
// // //   }
// // //   const last = o.rings * n;
// // //   for (let i = 0; i < n; i++) indices.push(last + i, tipIndex, last + ((i + 1) % n));

// // //   const geo = new THREE.BufferGeometry();
// // //   geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
// // //   geo.setIndex(indices);
// // //   geo.computeVertexNormals();

// // //   // check: the normals must point away from the middle, else flip all triangles
// // //   const midRing = Math.floor(o.rings / 2) * n;
// // //   const pos = geo.attributes.position;
// // //   const mc = new THREE.Vector3();
// // //   for (let i = 0; i < n; i++) mc.add(new THREE.Vector3().fromBufferAttribute(pos, midRing + i));
// // //   mc.divideScalar(n);
// // //   let score = 0;
// // //   for (let i = 0; i < n; i += 4) {
// // //     const p = new THREE.Vector3().fromBufferAttribute(pos, midRing + i);
// // //     const nm = new THREE.Vector3().fromBufferAttribute(geo.attributes.normal, midRing + i);
// // //     score += nm.dot(sideways(p.sub(mc), axis));
// // //   }
// // //   if (score < 0) {
// // //     const ix = geo.index.array;
// // //     for (let k = 0; k < ix.length; k += 3) {
// // //       const tmp = ix[k + 1];
// // //       ix[k + 1] = ix[k + 2];
// // //       ix[k + 2] = tmp;
// // //     }
// // //     geo.index.needsUpdate = true;
// // //     geo.computeVertexNormals();
// // //   }
// // //   return geo;
// // // }

// // // // point on the ring in direction `angle` (radians, in the u/w frame) from the center
// // // function ringPointAt(ring, center, u, w, angle) {
// // //   const ang = ring.map((p) => {
// // //     const d = p.clone().sub(center);
// // //     return Math.atan2(d.dot(w), d.dot(u));
// // //   });
// // //   const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
// // //   for (let i = 0; i < ring.length; i++) {
// // //     const j = (i + 1) % ring.length;
// // //     const a = wrap(angle - ang[i]); // how far past point i the wanted direction is
// // //     const span = wrap(ang[j] - ang[i]);
// // //     if (span > 1e-9 && span < Math.PI && a <= span) return ring[i].clone().lerp(ring[j], a / span);
// // //   }
// // //   let best = 0, bestD = Infinity;
// // //   ang.forEach((a, i) => {
// // //     const d = Math.min(wrap(a - angle), wrap(angle - a));
// // //     if (d < bestD) { bestD = d; best = i; }
// // //   });
// // //   return ring[best].clone();
// // // }

// // // // the slice of the ring between two angles, closed through the center (a pie piece),
// // // // going round the same way as the ring
// // // function pieSlice(ring, center, u, w, a0, a1) {
// // //   const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
// // //   const span = a1 - a0;
// // //   const arc = [];
// // //   ring.forEach((p) => {
// // //     const d = p.clone().sub(center);
// // //     const rel = wrap(Math.atan2(d.dot(w), d.dot(u)) - a0);
// // //     if (rel > 1e-6 && rel < span - 1e-6) arc.push({ rel, p });
// // //   });
// // //   arc.sort((x, y) => x.rel - y.rel);
// // //   return [
// // //     center.clone(),
// // //     ringPointAt(ring, center, u, w, a0),
// // //     ...arc.map((x) => x.p),
// // //     ringPointAt(ring, center, u, w, a1),
// // //   ];
// // // }

// // // // ---------- one root ----------

// // // // crownGeo: tooth geometry (indexed), apicalDir: unit vector pointing from the crown toward the root
// // // // buccalDir: toward the cheek, distalDir: toward the back of the mouth (both may be null)
// // // // plan: rootPlan(...) or null for one root
// // // export function buildRoot(crownGeo, apicalDir, length, buccalDir = null, plan = null, distalDir = null) {
// // //   const edge = crownEdge(crownGeo, apicalDir);
// // //   const raw = edge || bandPoints(crownGeo, apicalDir);
// // //   if (!raw) return null;
// // //   const mode = edge ? "edge" : "outline";
// // //   if (!crownGeo.boundingBox) crownGeo.computeBoundingBox();
// // //   const middle = crownGeo.boundingBox.getCenter(new THREE.Vector3()); // middle of the crown

// // //   // long axis: the edge's own direction if it agrees with the jaw, otherwise the jaw's up/down
// // //   let axis = apicalDir.clone();
// // //   const first = cleanRing(raw, middle, apicalDir, mode, crownGeo);
// // //   if (!first) return null;
// // //   const fc = new THREE.Vector3();
// // //   first.forEach((p) => fc.add(p));
// // //   fc.divideScalar(first.length);
// // //   const n = loopNormal(first, fc);
// // //   if (n) {
// // //     if (n.dot(apicalDir) < 0) n.negate();
// // //     if (n.angleTo(apicalDir) < THREE.MathUtils.degToRad(MAX_TILT_DEG)) {
// // //       axis = n.lerp(apicalDir, 0.5).normalize(); // a bit of both: steadier on ragged edges
// // //     }
// // //   }
// // //   let loop = cleanRing(raw, middle, axis, mode, crownGeo) || first;

// // //   const c0 = new THREE.Vector3();
// // //   loop.forEach((p) => c0.add(p));
// // //   c0.divideScalar(loop.length);

// // //   // keep the crown edge going one way round the axis (so all pieces turn the same way)
// // //   const { u, w } = planeAxes(axis);
// // //   let area = 0;
// // //   for (let i = 0; i < loop.length; i++) {
// // //     const a = loop[i].clone().sub(c0), b = loop[(i + 1) % loop.length].clone().sub(c0);
// // //     area += a.dot(u) * b.dot(w) - a.dot(w) * b.dot(u);
// // //   }
// // //   if (area < 0) loop.reverse();

// // //   let curveDir = distalDir ? sideways(distalDir, axis) : null;
// // //   if (curveDir && curveDir.lengthSq() > 1e-9) curveDir.normalize();
// // //   else curveDir = null;

// // //   const b = buccalDir ? sideways(buccalDir, axis) : null;
// // //   if (!plan || !b || b.lengthSq() < 1e-6) {
// // //     // one root
// // //     const geo = extrude(loop, c0, axis, {
// // //       length, rings: RINGS, roundMm: length * 0.35, width: singleWidth, curveDir, curve: CURVE_MM,
// // //     });
// // //     geo.computeBoundingBox();
// // //     return geo;
// // //   }

// // //   // several roots: one from each pie piece of the crown edge. The pieces start exactly on the
// // //   // crown edge and touch each other, stay together for about SPLIT_MM (the trunk), then part
// // //   b.normalize();
// // //   const buccalAngle = Math.atan2(b.dot(w), b.dot(u));
// // //   const pieces = [];
// // //   for (const part of plan) {
// // //     const a0 = buccalAngle + THREE.MathUtils.degToRad(part.from);
// // //     const a1 = buccalAngle + THREE.MathUtils.degToRad(part.to);
// // //     const slice = resample(pieSlice(loop, c0, u, w, a0, a1), RING_POINTS);
// // //     const ci = new THREE.Vector3();
// // //     slice.forEach((p) => ci.add(p));
// // //     ci.divideScalar(slice.length);
// // //     const out = sideways(ci.clone().sub(c0), axis);
// // //     pieces.push(
// // //       extrude(slice, ci, axis, {
// // //         length: length * part.lenScale,
// // //         rings: RINGS,
// // //         roundMm: SPLIT_MM + 2,
// // //         smoothPasses: 40, // the sharp pie corner becomes round
// // //         width: splitWidth,
// // //         splayDir: out.lengthSq() > 1e-9 ? out.normalize() : null,
// // //         splay: SPLAY_MM,
// // //         curveDir,
// // //         curve: CURVE_MM,
// // //       })
// // //     );
// // //   }
// // //   const geo = mergeGeometries(pieces, false);
// // //   pieces.forEach((p) => p.dispose());
// // //   geo.computeBoundingBox();
// // //   return geo;
// // // }

// // // // ---------- all roots ----------

// // // // crown size across the tooth: a = cheek to tongue, b = along the arch (mm)
// // // function crownSize(geo, apical, buccal) {
// // //   const b = sideways(buccal, apical);
// // //   if (b.lengthSq() < 1e-9) return null;
// // //   b.normalize();
// // //   const m = new THREE.Vector3().crossVectors(apical, b).normalize();
// // //   const pos = geo.attributes.position;
// // //   const v = new THREE.Vector3();
// // //   let b0 = Infinity, b1 = -Infinity, m0 = Infinity, m1 = -Infinity;
// // //   for (let i = 0; i < pos.count; i++) {
// // //     v.fromBufferAttribute(pos, i);
// // //     const x = v.dot(b), y = v.dot(m);
// // //     if (x < b0) b0 = x; if (x > b1) b1 = x;
// // //     if (y < m0) m0 = y; if (y > m1) m1 = y;
// // //   }
// // //   return { a: b1 - b0, b: m1 - m0 };
// // // }

// // // const centerOf = (list) => {
// // //   const c = new THREE.Vector3();
// // //   let n = 0;
// // //   for (const p of list) {
// // //     if (!p.geo.boundingBox) p.geo.computeBoundingBox();
// // //     c.add(p.geo.boundingBox.getCenter(new THREE.Vector3()));
// // //     n++;
// // //   }
// // //   return n ? c.divideScalar(n) : null;
// // // };

// // // // teeth: { upper: [{ name, geo }], lower: [...] } (teeth only)
// // // // Returns { upper: [{ name, geo }], lower: [...] } with one root shape per tooth
// // // export function computeRoots(teeth) {
// // //   // the roots of the upper teeth go up (+Z), unless the lower jaw is above the upper one
// // //   const upC = centerOf(teeth.upper || []), loC = centerOf(teeth.lower || []);
// // //   let upperApical = new THREE.Vector3(0, 0, 1);
// // //   if (upC && loC && Math.abs(upC.z - loC.z) > 1) upperApical.set(0, 0, Math.sign(upC.z - loC.z));

// // //   const report = [];
// // //   const build = (jaw) => {
// // //     const apical = jaw === "upper" ? upperApical : upperApical.clone().negate();
// // //     const list = teeth[jaw] || [];
// // //     const jawCenter = jaw === "upper" ? upC : loC;
// // //     // front of the jaw: middle of the front teeth (to know which way is "toward the back")
// // //     const front = centerOf(list.filter((p) => /^[12]$/.test((toothId(p.name) || "00")[1])));
// // //     const out = [];
// // //     for (const p of list) {
// // //       try {
// // //         const tc = p.geo.boundingBox.getCenter(new THREE.Vector3());
// // //         // cheek side: from the middle of the jaw out through this tooth
// // //         const buccal = jawCenter ? tc.clone().sub(jawCenter) : null;
// // //         // toward the back: along the arch, away from the front teeth
// // //         let distal = null;
// // //         if (buccal && front) {
// // //           distal = new THREE.Vector3().crossVectors(apical, buccal);
// // //           if (distal.dot(front.clone().sub(tc)) > 0) distal.negate();
// // //           if (tc.distanceTo(front) < 6) distal = null; // the front teeth themselves: no bend
// // //         }
// // //         // a tooth with no number in its name: a molar-sized crown gets molar roots
// // //         // (teeth with a number always follow their number)
// // //         const size = buccal ? crownSize(p.geo, apical, buccal) : null;
// // //         let plan = rootPlan(p.name, jaw);
// // //         let length = rootLengthFor(p.name);
// // //         if (!toothId(p.name) && size && size.a >= MOLAR_SIZE_MM && size.b >= MOLAR_SIZE_MM) {
// // //           plan = rootPlan(jaw === "upper" ? "16" : "36", jaw);
// // //           length = ROOT_LENGTH_MM[6];
// // //         }
// // //         report.push(`${toothId(p.name) || p.name}${size ? ` (${size.a.toFixed(1)}x${size.b.toFixed(1)} mm)` : ""}: ${plan ? plan.length : 1}`);
// // //         const geo = buildRoot(p.geo, apical, length, buccal, plan, distal);
// // //         if (geo) out.push({ name: "root_" + p.name, geo });
// // //       } catch (err) {
// // //         console.error("Root failed for", p.name, err);
// // //       }
// // //     }
// // //     return out;
// // //   };
// // //   const result = { upper: build("upper"), lower: build("lower") };
// // //   // in the browser console (F12): every tooth, its crown size and how many roots it got
// // //   console.info("[Root] tooth (crown size): roots ->", report.join(", "));
// // //   return result;
// // // }









// // // Root view: an approximate root for every tooth crown.
// // // The exe gives only crowns, so each root is made here: the open edge of the crown
// // // (the cervical line, where the crown met the gum) is pulled away from the biting side
// // // along the tooth's long axis and narrowed down to a rounded tip.
// // // Back teeth get more than one root: the crown edge is cut like a pie into 2 or 3 pieces,
// // // the pieces stay together for the first few mm (the trunk) and then part into separate roots
// // // (upper molars 3 roots, lower molars 2, upper first premolars 2, all other teeth 1).
// // // The roots are made from the teeth you are looking at (Final Position = the moved teeth),
// // // so they always sit on the crowns and move with them.
// // import * as THREE from "three";
// // import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";


// // // typical root length per tooth type (2nd digit of the tooth number), in mm
// // const ROOT_LENGTH_MM = { 1: 15.5, 2: 15, 3: 19, 4: 15.5, 5: 15.5, 6: 14.5, 7: 14, 8: 12.5 };
// // const DEFAULT_ROOT_LENGTH_MM = 15;
// // const MOLAR_SIZE_MM = 8.5; // a tooth with no number: a crown at least this wide both ways is treated as a molar

// // const RING_POINTS = 96; // points around the root (more = smoother)
// // const RINGS = 40; // rings from the crown edge to the tip (more = smoother)
// // const SPLIT_MM = 3.5; // about how far under the crown edge the roots of back teeth come apart
// // const SPLAY_MM = 2.2; // how far the tips of split roots spread outward
// // const CURVE_MM = 1.2; // how far root tips bend toward the back of the mouth (distal), like real roots
// // const MAX_TILT_DEG = 25; // the edge's own direction is used only if it is this close to the jaw's up/down
// // const TUCK_UP_MM = 0.4; // the root starts this far inside the crown (toward the biting side)...
// // const NECK_MM = 1.5; // the root neck is as wide as the crown within this distance above the crown edge
// // const TUCK_IN_MM = 0.15; // ...and this much narrower than the crown edge, so the crown covers the join

// // const toothId = (name) => {
// //   const m = /(\d{2})/.exec(name || "");
// //   return m ? m[1] : null;
// // };

// // // how the root splits, by tooth type. Angles in degrees around the tooth, 0 = cheek side (buccal);
// // // the split lines run from the middle of the tooth out at these angles.
// // // lenScale: length of that root compared with the others
// // export function rootPlan(name, jaw) {
// //   const id = toothId(name);
// //   const type = id ? Number(id[1]) : 0;
// //   if (jaw === "upper" && (type === 6 || type === 7 || type === 8)) {
// //     // 2 cheek-side roots + 1 longer palatal root
// //     return [
// //       { from: 0, to: 110, lenScale: 0.95 },
// //       { from: 110, to: 250, lenScale: 1.05 },
// //       { from: 250, to: 360, lenScale: 0.95 },
// //     ];
// //   }
// //   if (jaw === "lower" && (type === 6 || type === 7 || type === 8)) {
// //     // mesial + distal root (the split line runs cheek to tongue)
// //     return [
// //       { from: 0, to: 180, lenScale: 1 },
// //       { from: 180, to: 360, lenScale: 0.95 },
// //     ];
// //   }
// //   if (jaw === "upper" && type === 4) {
// //     // upper first premolar: cheek-side + palatal root
// //     return [
// //       { from: 270, to: 450, lenScale: 1 },
// //       { from: 90, to: 270, lenScale: 0.95 },
// //     ];
// //   }
// //   return null; // one root
// // }

// // export function rootLengthFor(name) {
// //   const id = toothId(name);
// //   return (id && ROOT_LENGTH_MM[Number(id[1])]) || DEFAULT_ROOT_LENGTH_MM;
// // }

// // // ---------- the open edge of the crown ----------

// // // all loops of edges that belong to only one triangle (open edges of the crown mesh).
// // // The cut where the crown met the gum is one of them; small holes in the crown are others.
// // // Returns [{ pts: [Vector3], closed, perimeter }]
// // function boundaryLoops(geo) {
// //   const index = geo.index;
// //   const pos = geo.attributes.position;
// //   if (!index) return [];
// //   const idx = index.array;

// //   const count = new Map(); // "a_b" (a<b) -> how many triangles use this edge
// //   const dir = new Map(); // "a_b" -> [from, to] as the triangle uses it
// //   for (let t = 0; t < idx.length; t += 3) {
// //     for (let k = 0; k < 3; k++) {
// //       const a = idx[t + k], b = idx[t + ((k + 1) % 3)];
// //       const key = a < b ? a + "_" + b : b + "_" + a;
// //       count.set(key, (count.get(key) || 0) + 1);
// //       dir.set(key, [a, b]);
// //     }
// //   }

// //   // open edges, by start vertex (a vertex can start more than one, where two holes touch)
// //   const out = new Map(); // vertex -> [edge ids]
// //   const edges = [];
// //   for (const [key, c] of count) {
// //     if (c !== 1) continue;
// //     const [a, b] = dir.get(key);
// //     const id = edges.length;
// //     edges.push([a, b]);
// //     if (!out.has(a)) out.set(a, []);
// //     out.get(a).push(id);
// //   }
// //   if (edges.length < 8) return [];

// //   // follow the open edges into loops (edge by edge, so touching holes do not break them)
// //   const usedEdge = new Uint8Array(edges.length);
// //   const loops = [];
// //   const P = (i) => new THREE.Vector3().fromBufferAttribute(pos, i);
// //   for (let e0 = 0; e0 < edges.length; e0++) {
// //     if (usedEdge[e0]) continue;
// //     const start = edges[e0][0];
// //     const verts = [];
// //     let e = e0;
// //     let closed = false;
// //     while (e !== undefined) {
// //       usedEdge[e] = 1;
// //       verts.push(edges[e][0]);
// //       const v = edges[e][1];
// //       if (v === start) { closed = true; break; }
// //       const cand = (out.get(v) || []).filter((x) => !usedEdge[x]);
// //       e = cand[0];
// //     }
// //     if (verts.length < 8) continue;
// //     const pts = verts.map(P);
// //     let perimeter = 0;
// //     for (let i = 0; i < pts.length; i++) perimeter += pts[i].distanceTo(pts[(i + 1) % pts.length]);
// //     loops.push({ pts, closed, perimeter });
// //   }
// //   return loops;
// // }

// // // the crown edge: a big open loop at the root end of the crown, as wide as the crown.
// // // Returns null when no loop looks like that (then the outline of the crown's root end is used)
// // function crownEdge(geo, apical) {
// //   const loops = boundaryLoops(geo);
// //   if (!loops.length) return null;

// //   // size of the crown across the axis and along it
// //   const pos = geo.attributes.position;
// //   const { u, w } = planeAxes(apical);
// //   const v = new THREE.Vector3();
// //   let uMin = Infinity, uMax = -Infinity, wMin = Infinity, wMax = -Infinity, hMin = Infinity, hMax = -Infinity;
// //   for (let i = 0; i < pos.count; i++) {
// //     v.fromBufferAttribute(pos, i);
// //     const x = v.dot(u), y = v.dot(w), h = v.dot(apical);
// //     if (x < uMin) uMin = x; if (x > uMax) uMax = x;
// //     if (y < wMin) wMin = y; if (y > wMax) wMax = y;
// //     if (h < hMin) hMin = h; if (h > hMax) hMax = h;
// //   }
// //   const crownU = uMax - uMin, crownW = wMax - wMin, crownH = hMax - hMin;

// //   let best = null, bestScore = -Infinity;
// //   for (const L of loops) {
// //     let lu0 = Infinity, lu1 = -Infinity, lw0 = Infinity, lw1 = -Infinity, hSum = 0;
// //     for (const p of L.pts) {
// //       const x = p.dot(u), y = p.dot(w);
// //       if (x < lu0) lu0 = x; if (x > lu1) lu1 = x;
// //       if (y < lw0) lw0 = y; if (y > lw1) lw1 = y;
// //       hSum += p.dot(apical);
// //     }
// //     const wide = Math.min((lu1 - lu0) / crownU, (lw1 - lw0) / crownW); // 1 = as wide as the crown
// //     const deep = crownH > 1e-6 ? (hSum / L.pts.length - hMin) / crownH : 1; // 1 = at the root end
// //     // a hole on the biting side, a small hole, or a broken piece of the edge is not the crown edge
// //     if (wide < 0.6 || deep < 0.5) continue;
// //     const score = wide + deep + (L.closed ? 1 : 0);
// //     if (score > bestScore) { bestScore = score; best = L; }
// //   }
// //   return best ? best.pts : null;
// // }

// // // fallback (closed crown, or no good open edge): the crown points near its root end
// // function bandPoints(geo, apical) {
// //   const pos = geo.attributes.position;
// //   let hMin = Infinity, hMax = -Infinity;
// //   const v = new THREE.Vector3();
// //   for (let i = 0; i < pos.count; i++) {
// //     const h = v.fromBufferAttribute(pos, i).dot(apical);
// //     if (h < hMin) hMin = h;
// //     if (h > hMax) hMax = h;
// //   }
// //   const bandStart = hMax - (hMax - hMin) * 0.2;
// //   const pts = [];
// //   for (let i = 0; i < pos.count; i++) {
// //     v.fromBufferAttribute(pos, i);
// //     if (v.dot(apical) >= bandStart) pts.push(v.clone());
// //   }
// //   return pts.length >= 8 ? pts : null;
// // }

// // // a clean, round-going ring from messy edge points: for every direction around the axis
// // // (seen from the middle of the crown) one point, at the edge's distance and height there.
// // // Real crown edges are jagged and go back and forth; used as they are they give thin
// // // spikes and lines on the root. mode "edge": typical distance in each direction,
// // // mode "outline": the farthest point (for the fallback band)
// // function cleanRing(points, center, axis, mode, crownGeo = null) {
// //   const { u, w } = planeAxes(axis);
// //   const N = RING_POINTS;
// //   const rad = Array.from({ length: N }, () => []);
// //   const hgt = Array.from({ length: N }, () => []);
// //   for (const p of points) {
// //     const d = p.clone().sub(center);
// //     const x = d.dot(u), y = d.dot(w);
// //     const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
// //     rad[k].push(Math.hypot(x, y));
// //     hgt[k].push(d.dot(axis));
// //   }
// //   const median = (a) => {
// //     const s = [...a].sort((x, y) => x - y);
// //     return s[Math.floor(s.length / 2)];
// //   };
// //   let r = rad.map((a) => (a.length ? (mode === "outline" ? Math.max(...a) : median(a)) : null));
// //   let h = hgt.map((a) => (a.length ? Math.max(...a) : null)); // the deepest edge point (root side)
// //   const filled = r.filter((x) => x !== null).length;
// //   if (filled < N * 0.3) return null;

// //   // directions with no edge point: in between their neighbours
// //   const fillGaps = (arr) => {
// //     const out = arr.slice();
// //     for (let k = 0; k < N; k++) {
// //       if (out[k] !== null) continue;
// //       let a = 1, b = 1;
// //       while (arr[(k - a + N) % N] === null) a++;
// //       while (arr[(k + b) % N] === null) b++;
// //       const va = arr[(k - a + N) % N], vb = arr[(k + b) % N];
// //       out[k] = va + ((vb - va) * a) / (a + b);
// //     }
// //     return out;
// //   };
// //   r = fillGaps(r);
// //   h = fillGaps(h);

// //   // root neck as wide as the crown just above its edge, so the root blends into the crown
// //   // outline (and the jagged crown edge ends up inside the root instead of sticking out)
// //   if (crownGeo) {
// //     const pos = crownGeo.attributes.position;
// //     const wide = new Array(N).fill(0);
// //     const v = new THREE.Vector3();
// //     for (let i = 0; i < pos.count; i++) {
// //       const d = v.fromBufferAttribute(pos, i).sub(center);
// //       const x = d.dot(u), y = d.dot(w), hh = d.dot(axis);
// //       const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
// //       if (hh <= h[k] + 0.2 && hh >= h[k] - NECK_MM) wide[k] = Math.max(wide[k], Math.hypot(x, y));
// //     }
// //     r = r.map((rk, k) => Math.max(rk, wide[k]));
// //   }
// //   // a little smoothing round the ring
// //   const smooth1 = (arr, passes) => {
// //     let cur = arr;
// //     for (let s = 0; s < passes; s++) cur = cur.map((v, k) => 0.5 * v + 0.25 * cur[(k - 1 + N) % N] + 0.25 * cur[(k + 1) % N]);
// //     return cur;
// //   };
// //   r = smooth1(r, 3);
// //   h = smooth1(h, 3);

// //   const ring = [];
// //   for (let k = 0; k < N; k++) {
// //     const a = ((k + 0.5) / N) * 2 * Math.PI - Math.PI;
// //     // tucked a little inside the crown, so the crown's own edge covers the join (no lines there)
// //     const rr = Math.max(0.1, r[k] - TUCK_IN_MM);
// //     ring.push(
// //       center.clone()
// //         .addScaledVector(u, Math.cos(a) * rr)
// //         .addScaledVector(w, Math.sin(a) * rr)
// //         .addScaledVector(axis, h[k] - TUCK_UP_MM)
// //     );
// //   }
// //   return ring;
// // }

// // function planeAxes(n) {
// //   const helper = Math.abs(n.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
// //   const u = new THREE.Vector3().crossVectors(n, helper).normalize();
// //   const w = new THREE.Vector3().crossVectors(n, u).normalize();
// //   return { u, w };
// // }

// // // RING_POINTS points spread evenly along a closed loop
// // function resample(loop, n) {
// //   const len = [0];
// //   for (let i = 1; i <= loop.length; i++) {
// //     len.push(len[i - 1] + loop[i - 1].distanceTo(loop[i % loop.length]));
// //   }
// //   const total = len[len.length - 1];
// //   const out = [];
// //   let seg = 0;
// //   for (let k = 0; k < n; k++) {
// //     const target = (k / n) * total;
// //     while (seg < loop.length - 1 && len[seg + 1] < target) seg++;
// //     const a = loop[seg], b = loop[(seg + 1) % loop.length];
// //     const s = len[seg + 1] - len[seg];
// //     const t = s > 1e-9 ? (target - len[seg]) / s : 0;
// //     out.push(a.clone().lerp(b, t));
// //   }
// //   return out;
// // }

// // // circular moving average (makes the ragged crown edge round deeper down the root)
// // function smoothLoop(pts, passes) {
// //   let cur = pts.map((p) => p.clone());
// //   for (let s = 0; s < passes; s++) {
// //     cur = cur.map((p, i) => {
// //       const a = cur[(i - 1 + cur.length) % cur.length], b = cur[(i + 1) % cur.length];
// //       return p.clone().multiplyScalar(0.5).addScaledVector(a, 0.25).addScaledVector(b, 0.25);
// //     });
// //   }
// //   return cur;
// // }

// // // plane normal of a loop (direction of least spread)
// // function loopNormal(pts, center) {
// //   // Newell's method: robust for a closed, roughly flat loop
// //   const n = new THREE.Vector3();
// //   for (let i = 0; i < pts.length; i++) {
// //     const a = pts[i].clone().sub(center), b = pts[(i + 1) % pts.length].clone().sub(center);
// //     n.x += (a.y - b.y) * (a.z + b.z);
// //     n.y += (a.z - b.z) * (a.x + b.x);
// //     n.z += (a.x - b.x) * (a.y + b.y);
// //   }
// //   return n.lengthSq() > 1e-12 ? n.normalize() : null;
// // }

// // const smoothstep = (x) => {
// //   const t = Math.min(1, Math.max(0, x));
// //   return t * t * (3 - 2 * t);
// // };

// // // how wide a root is at depth t (0 = crown edge, 1 = tip). Starts flat (no band at the crown),
// // // gets a little narrower under the crown, then tapers smoothly to a rounded tip
// // const singleWidth = (t) => (1 - 0.1 * smoothstep(t / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5);
// // const splitWidth = (t) => (1 - 0.32 * smoothstep((t - 0.05) / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5); // thick, blunt roots

// // const sideways = (v, axis) => v.clone().addScaledVector(axis, -v.dot(axis));

// // // one root: from a ring of points (going round the axis the same way as the crown edge)
// // // down along the axis, narrowing to a rounded tip
// // function extrude(ring, center, axis, o) {
// //   const n = ring.length;
// //   const smooth = smoothLoop(ring, o.smoothPasses ?? 12);
// //   const heights = ring.map((p) => p.clone().sub(center).dot(axis));
// //   const hMax = Math.max(...heights); // the deepest point of the crown edge
// //   const hMin = Math.min(...heights);
// //   const zero = new THREE.Vector3();
// //   const splayDir = o.splayDir || zero, curveDir = o.curveDir || zero;
// //   const splay = o.splay || 0, curve = o.curve || 0;
// //   const flatMm = Math.max(2.5, (hMax - hMin) * 1.5); // the wavy crown edge becomes flat over this depth

// //   const positions = [];
// //   for (let r = 0; r <= o.rings; r++) {
// //     // rings closer together near the crown and the tip, where the shape changes most
// //     const t = 0.5 - 0.5 * Math.cos((Math.PI * r) / o.rings);
// //     const d = o.length * t; // depth in mm
// //     const flat = smoothstep(d / flatMm);
// //     const round = smoothstep(d / o.roundMm);
// //     const w = o.width(t);
// //     const bend = splayDir.clone().multiplyScalar(splay * smoothstep(d / o.length) ** 1.2)
// //       .addScaledVector(curveDir, curve * t * t);
// //     for (let i = 0; i < n; i++) {
// //       let q;
// //       if (r === 0) {
// //         q = ring[i].clone(); // exactly on the crown edge
// //       } else {
// //         const off = sideways(ring[i].clone().lerp(smooth[i], round).sub(center), axis);
// //         const h = heights[i] + (hMax - heights[i]) * flat + d;
// //         q = center.clone().addScaledVector(axis, h).addScaledVector(off, w).add(bend);
// //       }
// //       positions.push(q.x, q.y, q.z);
// //     }
// //   }
// //   // rounded tip: a little past the last ring
// //   const tip = center.clone().addScaledVector(axis, hMax + o.length + 0.4)
// //     .addScaledVector(splayDir, splay).addScaledVector(curveDir, curve);
// //   positions.push(tip.x, tip.y, tip.z);
// //   const tipIndex = (o.rings + 1) * n;

// //   const indices = [];
// //   for (let r = 0; r < o.rings; r++) {
// //     for (let i = 0; i < n; i++) {
// //       const a = r * n + i;
// //       const b = r * n + ((i + 1) % n);
// //       indices.push(a, a + n, b, b, a + n, b + n);
// //     }
// //   }
// //   const last = o.rings * n;
// //   for (let i = 0; i < n; i++) indices.push(last + i, tipIndex, last + ((i + 1) % n));

// //   const geo = new THREE.BufferGeometry();
// //   geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
// //   geo.setIndex(indices);
// //   geo.computeVertexNormals();

// //   // check: the normals must point away from the middle, else flip all triangles
// //   const midRing = Math.floor(o.rings / 2) * n;
// //   const pos = geo.attributes.position;
// //   const mc = new THREE.Vector3();
// //   for (let i = 0; i < n; i++) mc.add(new THREE.Vector3().fromBufferAttribute(pos, midRing + i));
// //   mc.divideScalar(n);
// //   let score = 0;
// //   for (let i = 0; i < n; i += 4) {
// //     const p = new THREE.Vector3().fromBufferAttribute(pos, midRing + i);
// //     const nm = new THREE.Vector3().fromBufferAttribute(geo.attributes.normal, midRing + i);
// //     score += nm.dot(sideways(p.sub(mc), axis));
// //   }
// //   if (score < 0) {
// //     const ix = geo.index.array;
// //     for (let k = 0; k < ix.length; k += 3) {
// //       const tmp = ix[k + 1];
// //       ix[k + 1] = ix[k + 2];
// //       ix[k + 2] = tmp;
// //     }
// //     geo.index.needsUpdate = true;
// //     geo.computeVertexNormals();
// //   }
// //   return geo;
// // }

// // // point on the ring in direction `angle` (radians, in the u/w frame) from the center
// // function ringPointAt(ring, center, u, w, angle) {
// //   const ang = ring.map((p) => {
// //     const d = p.clone().sub(center);
// //     return Math.atan2(d.dot(w), d.dot(u));
// //   });
// //   const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
// //   for (let i = 0; i < ring.length; i++) {
// //     const j = (i + 1) % ring.length;
// //     const a = wrap(angle - ang[i]); // how far past point i the wanted direction is
// //     const span = wrap(ang[j] - ang[i]);
// //     if (span > 1e-9 && span < Math.PI && a <= span) return ring[i].clone().lerp(ring[j], a / span);
// //   }
// //   let best = 0, bestD = Infinity;
// //   ang.forEach((a, i) => {
// //     const d = Math.min(wrap(a - angle), wrap(angle - a));
// //     if (d < bestD) { bestD = d; best = i; }
// //   });
// //   return ring[best].clone();
// // }

// // // the slice of the ring between two angles, closed through the center (a pie piece),
// // // going round the same way as the ring
// // function pieSlice(ring, center, u, w, a0, a1) {
// //   const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
// //   const span = a1 - a0;
// //   const arc = [];
// //   ring.forEach((p) => {
// //     const d = p.clone().sub(center);
// //     const rel = wrap(Math.atan2(d.dot(w), d.dot(u)) - a0);
// //     if (rel > 1e-6 && rel < span - 1e-6) arc.push({ rel, p });
// //   });
// //   arc.sort((x, y) => x.rel - y.rel);
// //   return [
// //     center.clone(),
// //     ringPointAt(ring, center, u, w, a0),
// //     ...arc.map((x) => x.p),
// //     ringPointAt(ring, center, u, w, a1),
// //   ];
// // }

// // // ---------- one root ----------

// // // crownGeo: tooth geometry (indexed), apicalDir: unit vector pointing from the crown toward the root
// // // buccalDir: toward the cheek, distalDir: toward the back of the mouth (both may be null)
// // // plan: rootPlan(...) or null for one root
// // export function buildRoot(crownGeo, apicalDir, length, buccalDir = null, plan = null, distalDir = null) {
// //   const edge = crownEdge(crownGeo, apicalDir);
// //   const raw = edge || bandPoints(crownGeo, apicalDir);
// //   if (!raw) return null;
// //   const mode = edge ? "edge" : "outline";
// //   if (!crownGeo.boundingBox) crownGeo.computeBoundingBox();
// //   const middle = crownGeo.boundingBox.getCenter(new THREE.Vector3()); // middle of the crown

// //   // long axis: the edge's own direction if it agrees with the jaw, otherwise the jaw's up/down
// //   let axis = apicalDir.clone();
// //   const first = cleanRing(raw, middle, apicalDir, mode, crownGeo);
// //   if (!first) return null;
// //   const fc = new THREE.Vector3();
// //   first.forEach((p) => fc.add(p));
// //   fc.divideScalar(first.length);
// //   const n = loopNormal(first, fc);
// //   if (n) {
// //     if (n.dot(apicalDir) < 0) n.negate();
// //     if (n.angleTo(apicalDir) < THREE.MathUtils.degToRad(MAX_TILT_DEG)) {
// //       axis = n.lerp(apicalDir, 0.5).normalize(); // a bit of both: steadier on ragged edges
// //     }
// //   }
// //   let loop = cleanRing(raw, middle, axis, mode, crownGeo) || first;

// //   const c0 = new THREE.Vector3();
// //   loop.forEach((p) => c0.add(p));
// //   c0.divideScalar(loop.length);

// //   // keep the crown edge going one way round the axis (so all pieces turn the same way)
// //   const { u, w } = planeAxes(axis);
// //   let area = 0;
// //   for (let i = 0; i < loop.length; i++) {
// //     const a = loop[i].clone().sub(c0), b = loop[(i + 1) % loop.length].clone().sub(c0);
// //     area += a.dot(u) * b.dot(w) - a.dot(w) * b.dot(u);
// //   }
// //   if (area < 0) loop.reverse();

// //   let curveDir = distalDir ? sideways(distalDir, axis) : null;
// //   if (curveDir && curveDir.lengthSq() > 1e-9) curveDir.normalize();
// //   else curveDir = null;

// //   const b = buccalDir ? sideways(buccalDir, axis) : null;
// //   if (!plan || !b || b.lengthSq() < 1e-6) {
// //     // one root
// //     const geo = extrude(loop, c0, axis, {
// //       length, rings: RINGS, roundMm: length * 0.35, width: singleWidth, curveDir, curve: CURVE_MM,
// //     });
// //     geo.computeBoundingBox();
// //     return geo;
// //   }

// //   // several roots: one from each pie piece of the crown edge. The pieces start exactly on the
// //   // crown edge and touch each other, stay together for about SPLIT_MM (the trunk), then part
// //   b.normalize();
// //   const buccalAngle = Math.atan2(b.dot(w), b.dot(u));
// //   const pieces = [];
// //   for (const part of plan) {
// //     const a0 = buccalAngle + THREE.MathUtils.degToRad(part.from);
// //     const a1 = buccalAngle + THREE.MathUtils.degToRad(part.to);
// //     const slice = resample(pieSlice(loop, c0, u, w, a0, a1), RING_POINTS);
// //     const ci = new THREE.Vector3();
// //     slice.forEach((p) => ci.add(p));
// //     ci.divideScalar(slice.length);
// //     const out = sideways(ci.clone().sub(c0), axis);
// //     pieces.push(
// //       extrude(slice, ci, axis, {
// //         length: length * part.lenScale,
// //         rings: RINGS,
// //         roundMm: SPLIT_MM + 2,
// //         smoothPasses: 40, // the sharp pie corner becomes round
// //         width: splitWidth,
// //         splayDir: out.lengthSq() > 1e-9 ? out.normalize() : null,
// //         splay: SPLAY_MM,
// //         curveDir,
// //         curve: CURVE_MM,
// //       })
// //     );
// //   }
// //   const geo = mergeGeometries(pieces, false);
// //   pieces.forEach((p) => p.dispose());
// //   geo.computeBoundingBox();
// //   return geo;
// // }

// // // ---------- all roots ----------

// // // crown size across the tooth: a = cheek to tongue, b = along the arch (mm)
// // function crownSize(geo, apical, buccal) {
// //   const b = sideways(buccal, apical);
// //   if (b.lengthSq() < 1e-9) return null;
// //   b.normalize();
// //   const m = new THREE.Vector3().crossVectors(apical, b).normalize();
// //   const pos = geo.attributes.position;
// //   const v = new THREE.Vector3();
// //   let b0 = Infinity, b1 = -Infinity, m0 = Infinity, m1 = -Infinity;
// //   for (let i = 0; i < pos.count; i++) {
// //     v.fromBufferAttribute(pos, i);
// //     const x = v.dot(b), y = v.dot(m);
// //     if (x < b0) b0 = x; if (x > b1) b1 = x;
// //     if (y < m0) m0 = y; if (y > m1) m1 = y;
// //   }
// //   return { a: b1 - b0, b: m1 - m0 };
// // }

// // const centerOf = (list) => {
// //   const c = new THREE.Vector3();
// //   let n = 0;
// //   for (const p of list) {
// //     if (!p.geo.boundingBox) p.geo.computeBoundingBox();
// //     c.add(p.geo.boundingBox.getCenter(new THREE.Vector3()));
// //     n++;
// //   }
// //   return n ? c.divideScalar(n) : null;
// // };

// // // teeth: { upper: [{ name, geo }], lower: [...] } (teeth only)
// // // Returns { upper: [{ name, geo }], lower: [...] } with one root shape per tooth
// // export function computeRoots(teeth) {
// //   // the roots of the upper teeth go up (+Z), unless the lower jaw is above the upper one
// //   const upC = centerOf(teeth.upper || []), loC = centerOf(teeth.lower || []);
// //   let upperApical = new THREE.Vector3(0, 0, 1);
// //   if (upC && loC && Math.abs(upC.z - loC.z) > 1) upperApical.set(0, 0, Math.sign(upC.z - loC.z));

// //   const report = [];
// //   const build = (jaw) => {
// //     const apical = jaw === "upper" ? upperApical : upperApical.clone().negate();
// //     const list = teeth[jaw] || [];
// //     const jawCenter = jaw === "upper" ? upC : loC;
// //     // front of the jaw: middle of the front teeth (to know which way is "toward the back")
// //     const front = centerOf(list.filter((p) => /^[12]$/.test((toothId(p.name) || "00")[1])));
// //     const out = [];
// //     for (const p of list) {
// //       try {
// //         const tc = p.geo.boundingBox.getCenter(new THREE.Vector3());
// //         // cheek side: from the middle of the jaw out through this tooth
// //         const buccal = jawCenter ? tc.clone().sub(jawCenter) : null;
// //         // toward the back: along the arch, away from the front teeth
// //         let distal = null;
// //         if (buccal && front) {
// //           distal = new THREE.Vector3().crossVectors(apical, buccal);
// //           if (distal.dot(front.clone().sub(tc)) > 0) distal.negate();
// //           if (tc.distanceTo(front) < 6) distal = null; // the front teeth themselves: no bend
// //         }
// //         // a tooth with no number in its name: a molar-sized crown gets molar roots
// //         // (teeth with a number always follow their number)
// //         const size = buccal ? crownSize(p.geo, apical, buccal) : null;
// //         let plan = rootPlan(p.name, jaw);
// //         let length = rootLengthFor(p.name);
// //         if (!toothId(p.name) && size && size.a >= MOLAR_SIZE_MM && size.b >= MOLAR_SIZE_MM) {
// //           plan = rootPlan(jaw === "upper" ? "16" : "36", jaw);
// //           length = ROOT_LENGTH_MM[6];
// //         }
// //         report.push(`${toothId(p.name) || p.name}${size ? ` (${size.a.toFixed(1)}x${size.b.toFixed(1)} mm)` : ""}: ${plan ? plan.length : 1}`);
// //         const geo = buildRoot(p.geo, apical, length, buccal, plan, distal);
// //         if (geo) out.push({ name: "root_" + p.name, geo });
// //       } catch (err) {
// //         console.error("Root failed for", p.name, err);
// //       }
// //     }
// //     return out;
// //   };
// //   const result = { upper: build("upper"), lower: build("lower") };
// //   // in the browser console (F12): every tooth, its crown size and how many roots it got
// //   console.info("[Root] tooth (crown size): roots ->", report.join(", "));
// //   return result;
// // }






// // Root view: an approximate root for every tooth crown.
// // The exe gives only crowns, so each root is made here: the open edge of the crown
// // (the cervical line, where the crown met the gum) is pulled away from the biting side
// // along the tooth's long axis and narrowed down to a rounded tip.
// // Back teeth get more than one root: the crown edge is cut like a pie into 2 or 3 pieces,
// // the pieces stay together for the first few mm (the trunk) and then part into separate roots
// // (upper molars 3 roots, lower molars 2, upper first premolars 2, all other teeth 1).
// // The roots are made from the teeth you are looking at (Final Position = the moved teeth),
// // so they always sit on the crowns and move with them.
// import * as THREE from "three";
// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";


// // typical root length per tooth type (2nd digit of the tooth number), in mm
// const ROOT_LENGTH_MM = { 1: 15.5, 2: 15, 3: 19, 4: 15.5, 5: 15.5, 6: 14.5, 7: 14, 8: 12.5 };
// const DEFAULT_ROOT_LENGTH_MM = 15;
// const MOLAR_SIZE_MM = 8.5; // a tooth with no number: a crown at least this wide both ways is treated as a molar

// const RING_POINTS = 96; // points around the root (more = smoother)
// const RINGS = 40; // rings from the crown edge to the tip (more = smoother)
// const SPLIT_MM = 3.5; // about how far under the crown edge the roots of back teeth come apart
// const SPLAY_MM = 2.2; // how far the tips of split roots spread outward
// const CURVE_MM = 1.2; // how far root tips bend toward the back of the mouth (distal), like real roots
// const MAX_TILT_DEG = 30; // the edge's own direction is used only if it is this close to the jaw's up/down
// const TUCK_UP_MM = 0.4; // the root starts this far inside the crown (toward the biting side)...
// const NECK_MM = 1.5; // the root neck is as wide as the crown within this distance above the crown edge
// const TUCK_IN_MM = 0.15; // ...and this much narrower than the crown edge, so the crown covers the join

// const toothId = (name) => {
//   const m = /(\d{2})/.exec(name || "");
//   return m ? m[1] : null;
// };

// // how the root splits, by tooth type. Angles in degrees around the tooth, 0 = cheek side (buccal);
// // the split lines run from the middle of the tooth out at these angles.
// // lenScale: length of that root compared with the others
// export function rootPlan(name, jaw) {
//   const id = toothId(name);
//   const type = id ? Number(id[1]) : 0;
//   if (jaw === "upper" && (type === 6 || type === 7 || type === 8)) {
//     // 2 cheek-side roots + 1 longer palatal root
//     return [
//       { from: 0, to: 110, lenScale: 0.95 },
//       { from: 110, to: 250, lenScale: 1.05 },
//       { from: 250, to: 360, lenScale: 0.95 },
//     ];
//   }
//   if (jaw === "lower" && (type === 6 || type === 7 || type === 8)) {
//     // mesial + distal root (the split line runs cheek to tongue)
//     return [
//       { from: 0, to: 180, lenScale: 1 },
//       { from: 180, to: 360, lenScale: 0.95 },
//     ];
//   }
//   if (jaw === "upper" && type === 4) {
//     // upper first premolar: cheek-side + palatal root
//     return [
//       { from: 270, to: 450, lenScale: 1 },
//       { from: 90, to: 270, lenScale: 0.95 },
//     ];
//   }
//   return null; // one root
// }

// export function rootLengthFor(name) {
//   const id = toothId(name);
//   return (id && ROOT_LENGTH_MM[Number(id[1])]) || DEFAULT_ROOT_LENGTH_MM;
// }

// // ---------- the open edge of the crown ----------

// // all loops of edges that belong to only one triangle (open edges of the crown mesh).
// // The cut where the crown met the gum is one of them; small holes in the crown are others.
// // Returns [{ pts: [Vector3], closed, perimeter }]
// function boundaryLoops(geo) {
//   const index = geo.index;
//   const pos = geo.attributes.position;
//   if (!index) return [];
//   const idx = index.array;

//   const count = new Map(); // "a_b" (a<b) -> how many triangles use this edge
//   const dir = new Map(); // "a_b" -> [from, to] as the triangle uses it
//   for (let t = 0; t < idx.length; t += 3) {
//     for (let k = 0; k < 3; k++) {
//       const a = idx[t + k], b = idx[t + ((k + 1) % 3)];
//       const key = a < b ? a + "_" + b : b + "_" + a;
//       count.set(key, (count.get(key) || 0) + 1);
//       dir.set(key, [a, b]);
//     }
//   }

//   // open edges, by start vertex (a vertex can start more than one, where two holes touch)
//   const out = new Map(); // vertex -> [edge ids]
//   const edges = [];
//   for (const [key, c] of count) {
//     if (c !== 1) continue;
//     const [a, b] = dir.get(key);
//     const id = edges.length;
//     edges.push([a, b]);
//     if (!out.has(a)) out.set(a, []);
//     out.get(a).push(id);
//   }
//   if (edges.length < 8) return [];

//   // follow the open edges into loops (edge by edge, so touching holes do not break them)
//   const usedEdge = new Uint8Array(edges.length);
//   const loops = [];
//   const P = (i) => new THREE.Vector3().fromBufferAttribute(pos, i);
//   for (let e0 = 0; e0 < edges.length; e0++) {
//     if (usedEdge[e0]) continue;
//     const start = edges[e0][0];
//     const verts = [];
//     let e = e0;
//     let closed = false;
//     while (e !== undefined) {
//       usedEdge[e] = 1;
//       verts.push(edges[e][0]);
//       const v = edges[e][1];
//       if (v === start) { closed = true; break; }
//       const cand = (out.get(v) || []).filter((x) => !usedEdge[x]);
//       e = cand[0];
//     }
//     if (verts.length < 8) continue;
//     const pts = verts.map(P);
//     let perimeter = 0;
//     for (let i = 0; i < pts.length; i++) perimeter += pts[i].distanceTo(pts[(i + 1) % pts.length]);
//     loops.push({ pts, closed, perimeter });
//   }
//   return loops;
// }

// // the crown edge: a big open loop at the root end of the crown, as wide as the crown.
// // Returns null when no loop looks like that (then the outline of the crown's root end is used)
// function crownEdge(geo, apical) {
//   const loops = boundaryLoops(geo);
//   if (!loops.length) return null;

//   // size of the crown across the axis and along it
//   const pos = geo.attributes.position;
//   const { u, w } = planeAxes(apical);
//   const v = new THREE.Vector3();
//   let uMin = Infinity, uMax = -Infinity, wMin = Infinity, wMax = -Infinity, hMin = Infinity, hMax = -Infinity;
//   for (let i = 0; i < pos.count; i++) {
//     v.fromBufferAttribute(pos, i);
//     const x = v.dot(u), y = v.dot(w), h = v.dot(apical);
//     if (x < uMin) uMin = x; if (x > uMax) uMax = x;
//     if (y < wMin) wMin = y; if (y > wMax) wMax = y;
//     if (h < hMin) hMin = h; if (h > hMax) hMax = h;
//   }
//   const crownU = uMax - uMin, crownW = wMax - wMin, crownH = hMax - hMin;

//   let best = null, bestScore = -Infinity;
//   for (const L of loops) {
//     let lu0 = Infinity, lu1 = -Infinity, lw0 = Infinity, lw1 = -Infinity, hSum = 0;
//     for (const p of L.pts) {
//       const x = p.dot(u), y = p.dot(w);
//       if (x < lu0) lu0 = x; if (x > lu1) lu1 = x;
//       if (y < lw0) lw0 = y; if (y > lw1) lw1 = y;
//       hSum += p.dot(apical);
//     }
//     const wide = Math.min((lu1 - lu0) / crownU, (lw1 - lw0) / crownW); // 1 = as wide as the crown
//     const deep = crownH > 1e-6 ? (hSum / L.pts.length - hMin) / crownH : 1; // 1 = at the root end
//     // a hole on the biting side, a small hole, or a broken piece of the edge is not the crown edge
//     if (wide < 0.6 || deep < 0.5) continue;
//     const score = wide + deep + (L.closed ? 1 : 0);
//     if (score > bestScore) { bestScore = score; best = L; }
//   }
//   return best ? best.pts : null;
// }

// // fallback (closed crown, or no good open edge): the crown points near its root end
// function bandPoints(geo, apical) {
//   const pos = geo.attributes.position;
//   let hMin = Infinity, hMax = -Infinity;
//   const v = new THREE.Vector3();
//   for (let i = 0; i < pos.count; i++) {
//     const h = v.fromBufferAttribute(pos, i).dot(apical);
//     if (h < hMin) hMin = h;
//     if (h > hMax) hMax = h;
//   }
//   const bandStart = hMax - (hMax - hMin) * 0.2;
//   const pts = [];
//   for (let i = 0; i < pos.count; i++) {
//     v.fromBufferAttribute(pos, i);
//     if (v.dot(apical) >= bandStart) pts.push(v.clone());
//   }
//   return pts.length >= 8 ? pts : null;
// }

// // a clean, round-going ring from messy edge points: for every direction around the axis
// // (seen from the middle of the crown) one point, at the edge's distance and height there.
// // Real crown edges are jagged and go back and forth; used as they are they give thin
// // spikes and lines on the root. mode "edge": typical distance in each direction,
// // mode "outline": the farthest point (for the fallback band)
// function cleanRing(points, center, axis, mode, crownGeo = null) {
//   const { u, w } = planeAxes(axis);
//   const N = RING_POINTS;
//   const rad = Array.from({ length: N }, () => []);
//   const hgt = Array.from({ length: N }, () => []);
//   for (const p of points) {
//     const d = p.clone().sub(center);
//     const x = d.dot(u), y = d.dot(w);
//     const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
//     rad[k].push(Math.hypot(x, y));
//     hgt[k].push(d.dot(axis));
//   }
//   const median = (a) => {
//     const s = [...a].sort((x, y) => x - y);
//     return s[Math.floor(s.length / 2)];
//   };
//   let r = rad.map((a) => (a.length ? (mode === "outline" ? Math.max(...a) : median(a)) : null));
//   let h = hgt.map((a) => (a.length ? Math.max(...a) : null)); // the deepest edge point (root side)
//   const filled = r.filter((x) => x !== null).length;
//   if (filled < N * 0.3) return null;

//   // directions with no edge point: in between their neighbours
//   const fillGaps = (arr) => {
//     const out = arr.slice();
//     for (let k = 0; k < N; k++) {
//       if (out[k] !== null) continue;
//       let a = 1, b = 1;
//       while (arr[(k - a + N) % N] === null) a++;
//       while (arr[(k + b) % N] === null) b++;
//       const va = arr[(k - a + N) % N], vb = arr[(k + b) % N];
//       out[k] = va + ((vb - va) * a) / (a + b);
//     }
//     return out;
//   };
//   r = fillGaps(r);
//   h = fillGaps(h);

//   // root neck as wide as the crown just above its edge, so the root blends into the crown
//   // outline (and the jagged crown edge ends up inside the root instead of sticking out)
//   if (crownGeo) {
//     const pos = crownGeo.attributes.position;
//     const wide = new Array(N).fill(0);
//     const v = new THREE.Vector3();
//     for (let i = 0; i < pos.count; i++) {
//       const d = v.fromBufferAttribute(pos, i).sub(center);
//       const x = d.dot(u), y = d.dot(w), hh = d.dot(axis);
//       const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
//       if (hh <= h[k] + 0.2 && hh >= h[k] - NECK_MM) wide[k] = Math.max(wide[k], Math.hypot(x, y));
//     }
//     r = r.map((rk, k) => Math.max(rk, wide[k]));
//   }
//   // a little smoothing round the ring
//   const smooth1 = (arr, passes) => {
//     let cur = arr;
//     for (let s = 0; s < passes; s++) cur = cur.map((v, k) => 0.5 * v + 0.25 * cur[(k - 1 + N) % N] + 0.25 * cur[(k + 1) % N]);
//     return cur;
//   };
//   r = smooth1(r, 3);
//   h = smooth1(h, 3);

//   const ring = [];
//   for (let k = 0; k < N; k++) {
//     const a = ((k + 0.5) / N) * 2 * Math.PI - Math.PI;
//     // tucked a little inside the crown, so the crown's own edge covers the join (no lines there)
//     const rr = Math.max(0.1, r[k] - TUCK_IN_MM);
//     ring.push(
//       center.clone()
//         .addScaledVector(u, Math.cos(a) * rr)
//         .addScaledVector(w, Math.sin(a) * rr)
//         .addScaledVector(axis, h[k] - TUCK_UP_MM)
//     );
//   }
//   return ring;
// }

// function planeAxes(n) {
//   const helper = Math.abs(n.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
//   const u = new THREE.Vector3().crossVectors(n, helper).normalize();
//   const w = new THREE.Vector3().crossVectors(n, u).normalize();
//   return { u, w };
// }

// // RING_POINTS points spread evenly along a closed loop
// function resample(loop, n) {
//   const len = [0];
//   for (let i = 1; i <= loop.length; i++) {
//     len.push(len[i - 1] + loop[i - 1].distanceTo(loop[i % loop.length]));
//   }
//   const total = len[len.length - 1];
//   const out = [];
//   let seg = 0;
//   for (let k = 0; k < n; k++) {
//     const target = (k / n) * total;
//     while (seg < loop.length - 1 && len[seg + 1] < target) seg++;
//     const a = loop[seg], b = loop[(seg + 1) % loop.length];
//     const s = len[seg + 1] - len[seg];
//     const t = s > 1e-9 ? (target - len[seg]) / s : 0;
//     out.push(a.clone().lerp(b, t));
//   }
//   return out;
// }

// // circular moving average (makes the ragged crown edge round deeper down the root)
// function smoothLoop(pts, passes) {
//   let cur = pts.map((p) => p.clone());
//   for (let s = 0; s < passes; s++) {
//     cur = cur.map((p, i) => {
//       const a = cur[(i - 1 + cur.length) % cur.length], b = cur[(i + 1) % cur.length];
//       return p.clone().multiplyScalar(0.5).addScaledVector(a, 0.25).addScaledVector(b, 0.25);
//     });
//   }
//   return cur;
// }

// // plane normal of a loop (direction of least spread)
// function loopNormal(pts, center) {
//   // Newell's method: robust for a closed, roughly flat loop
//   const n = new THREE.Vector3();
//   for (let i = 0; i < pts.length; i++) {
//     const a = pts[i].clone().sub(center), b = pts[(i + 1) % pts.length].clone().sub(center);
//     n.x += (a.y - b.y) * (a.z + b.z);
//     n.y += (a.z - b.z) * (a.x + b.x);
//     n.z += (a.x - b.x) * (a.y + b.y);
//   }
//   return n.lengthSq() > 1e-12 ? n.normalize() : null;
// }

// const smoothstep = (x) => {
//   const t = Math.min(1, Math.max(0, x));
//   return t * t * (3 - 2 * t);
// };

// // how wide a root is at depth t (0 = crown edge, 1 = tip). Starts flat (no band at the crown),
// // gets a little narrower under the crown, then tapers smoothly to a rounded tip
// const singleWidth = (t) => (1 - 0.1 * smoothstep(t / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5);
// const splitWidth = (t) => (1 - 0.32 * smoothstep((t - 0.05) / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5); // thick, blunt roots

// const sideways = (v, axis) => v.clone().addScaledVector(axis, -v.dot(axis));

// // one root: from a ring of points (going round the axis the same way as the crown edge)
// // down along the axis, narrowing to a rounded tip
// function extrude(ring, center, axis, o) {
//   const n = ring.length;
//   const smooth = smoothLoop(ring, o.smoothPasses ?? 12);
//   const heights = ring.map((p) => p.clone().sub(center).dot(axis));
//   const hMax = Math.max(...heights); // the deepest point of the crown edge
//   const hMin = Math.min(...heights);
//   const zero = new THREE.Vector3();
//   const splayDir = o.splayDir || zero, curveDir = o.curveDir || zero;
//   const splay = o.splay || 0, curve = o.curve || 0;
//   const flatMm = Math.max(2.5, (hMax - hMin) * 1.5); // the wavy crown edge becomes flat over this depth

//   const positions = [];
//   for (let r = 0; r <= o.rings; r++) {
//     // rings closer together near the crown and the tip, where the shape changes most
//     const t = 0.5 - 0.5 * Math.cos((Math.PI * r) / o.rings);
//     const d = o.length * t; // depth in mm
//     const flat = smoothstep(d / flatMm);
//     const round = smoothstep(d / o.roundMm);
//     const w = o.width(t);
//     const bend = splayDir.clone().multiplyScalar(splay * smoothstep(d / o.length) ** 1.2)
//       .addScaledVector(curveDir, curve * t * t);
//     for (let i = 0; i < n; i++) {
//       let q;
//       if (r === 0) {
//         q = ring[i].clone(); // exactly on the crown edge
//       } else {
//         const off = sideways(ring[i].clone().lerp(smooth[i], round).sub(center), axis);
//         const h = heights[i] + (hMax - heights[i]) * flat + d;
//         q = center.clone().addScaledVector(axis, h).addScaledVector(off, w).add(bend);
//       }
//       positions.push(q.x, q.y, q.z);
//     }
//   }
//   // rounded tip: a little past the last ring
//   const tip = center.clone().addScaledVector(axis, hMax + o.length + 0.4)
//     .addScaledVector(splayDir, splay).addScaledVector(curveDir, curve);
//   positions.push(tip.x, tip.y, tip.z);
//   const tipIndex = (o.rings + 1) * n;

//   const indices = [];
//   for (let r = 0; r < o.rings; r++) {
//     for (let i = 0; i < n; i++) {
//       const a = r * n + i;
//       const b = r * n + ((i + 1) % n);
//       indices.push(a, a + n, b, b, a + n, b + n);
//     }
//   }
//   const last = o.rings * n;
//   for (let i = 0; i < n; i++) indices.push(last + i, tipIndex, last + ((i + 1) % n));

//   const geo = new THREE.BufferGeometry();
//   geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
//   geo.setIndex(indices);
//   geo.computeVertexNormals();

//   // check: the normals must point away from the middle, else flip all triangles
//   const midRing = Math.floor(o.rings / 2) * n;
//   const pos = geo.attributes.position;
//   const mc = new THREE.Vector3();
//   for (let i = 0; i < n; i++) mc.add(new THREE.Vector3().fromBufferAttribute(pos, midRing + i));
//   mc.divideScalar(n);
//   let score = 0;
//   for (let i = 0; i < n; i += 4) {
//     const p = new THREE.Vector3().fromBufferAttribute(pos, midRing + i);
//     const nm = new THREE.Vector3().fromBufferAttribute(geo.attributes.normal, midRing + i);
//     score += nm.dot(sideways(p.sub(mc), axis));
//   }
//   if (score < 0) {
//     const ix = geo.index.array;
//     for (let k = 0; k < ix.length; k += 3) {
//       const tmp = ix[k + 1];
//       ix[k + 1] = ix[k + 2];
//       ix[k + 2] = tmp;
//     }
//     geo.index.needsUpdate = true;
//     geo.computeVertexNormals();
//   }
//   return geo;
// }

// // point on the ring in direction `angle` (radians, in the u/w frame) from the center
// function ringPointAt(ring, center, u, w, angle) {
//   const ang = ring.map((p) => {
//     const d = p.clone().sub(center);
//     return Math.atan2(d.dot(w), d.dot(u));
//   });
//   const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
//   for (let i = 0; i < ring.length; i++) {
//     const j = (i + 1) % ring.length;
//     const a = wrap(angle - ang[i]); // how far past point i the wanted direction is
//     const span = wrap(ang[j] - ang[i]);
//     if (span > 1e-9 && span < Math.PI && a <= span) return ring[i].clone().lerp(ring[j], a / span);
//   }
//   let best = 0, bestD = Infinity;
//   ang.forEach((a, i) => {
//     const d = Math.min(wrap(a - angle), wrap(angle - a));
//     if (d < bestD) { bestD = d; best = i; }
//   });
//   return ring[best].clone();
// }

// // the slice of the ring between two angles, closed through the center (a pie piece),
// // going round the same way as the ring
// function pieSlice(ring, center, u, w, a0, a1) {
//   const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
//   const span = a1 - a0;
//   const arc = [];
//   ring.forEach((p) => {
//     const d = p.clone().sub(center);
//     const rel = wrap(Math.atan2(d.dot(w), d.dot(u)) - a0);
//     if (rel > 1e-6 && rel < span - 1e-6) arc.push({ rel, p });
//   });
//   arc.sort((x, y) => x.rel - y.rel);
//   return [
//     center.clone(),
//     ringPointAt(ring, center, u, w, a0),
//     ...arc.map((x) => x.p),
//     ringPointAt(ring, center, u, w, a1),
//   ];
// }

// // last resort: a circle at the crown's root end, a bit narrower than the crown
// function circleRing(geo, apical) {
//   const pos = geo.attributes.position;
//   if (!pos || pos.count < 3) return null;
//   const { u, w } = planeAxes(apical);
//   const v = new THREE.Vector3();
//   let hMax = -Infinity, u0 = Infinity, u1 = -Infinity, w0 = Infinity, w1 = -Infinity;
//   for (let i = 0; i < pos.count; i++) {
//     v.fromBufferAttribute(pos, i);
//     const x = v.dot(u), y = v.dot(w), h = v.dot(apical);
//     if (h > hMax) hMax = h;
//     if (x < u0) u0 = x; if (x > u1) u1 = x;
//     if (y < w0) w0 = y; if (y > w1) w1 = y;
//   }
//   const ru = (u1 - u0) * 0.35, rw = (w1 - w0) * 0.35;
//   const cu = (u0 + u1) / 2, cw = (w0 + w1) / 2;
//   const ring = [];
//   for (let k = 0; k < RING_POINTS; k++) {
//     const a = ((k + 0.5) / RING_POINTS) * 2 * Math.PI - Math.PI;
//     ring.push(new THREE.Vector3()
//       .addScaledVector(u, cu + Math.cos(a) * ru)
//       .addScaledVector(w, cw + Math.sin(a) * rw)
//       .addScaledVector(apical, hMax - TUCK_UP_MM - 0.5));
//   }
//   return ring;
// }

// // ---------- one root ----------

// // crownGeo: tooth geometry (indexed), apicalDir: unit vector pointing from the crown toward the root
// // buccalDir: toward the cheek, distalDir: toward the back of the mouth (both may be null)
// // plan: rootPlan(...) or null for one root
// export function buildRoot(crownGeo, apicalDir, length, buccalDir = null, plan = null, distalDir = null) {
//   // where the root starts: the crown's open edge, or else the crown's root end.
//   // Each try measures directions from the middle of its own points (not the middle of the crown:
//   // on a strongly tilted tooth that can lie outside the edge, and then no root was made)
//   const edge = crownEdge(crownGeo, apicalDir);
//   const band = bandPoints(crownGeo, apicalDir);
//   const tries = [];
//   if (edge) tries.push({ pts: edge, mode: "edge" });
//   if (band) tries.push({ pts: band, mode: "outline" });

//   let loop = null;
//   let axis = apicalDir.clone();
//   for (const tr of tries) {
//     const mid = new THREE.Vector3();
//     tr.pts.forEach((p) => mid.add(p));
//     mid.divideScalar(tr.pts.length);
//     const first = cleanRing(tr.pts, mid, apicalDir, tr.mode, crownGeo);
//     if (!first) continue;
//     // long axis: the edge's own direction if it agrees with the jaw, otherwise the jaw's up/down
//     const fc = new THREE.Vector3();
//     first.forEach((p) => fc.add(p));
//     fc.divideScalar(first.length);
//     const n = loopNormal(first, fc);
//     axis = apicalDir.clone();
//     if (n) {
//       if (n.dot(apicalDir) < 0) n.negate();
//       if (n.angleTo(apicalDir) < THREE.MathUtils.degToRad(MAX_TILT_DEG)) {
//         axis = n.lerp(apicalDir, 0.5).normalize(); // a bit of both: steadier on ragged edges
//       }
//     }
//     loop = cleanRing(tr.pts, fc, axis, tr.mode, crownGeo) || first;
//     break;
//   }
//   if (!loop) loop = circleRing(crownGeo, apicalDir); // last resort: a round root under the crown
//   if (!loop) return null;

//   const c0 = new THREE.Vector3();
//   loop.forEach((p) => c0.add(p));
//   c0.divideScalar(loop.length);

//   // keep the crown edge going one way round the axis (so all pieces turn the same way)
//   const { u, w } = planeAxes(axis);
//   let area = 0;
//   for (let i = 0; i < loop.length; i++) {
//     const a = loop[i].clone().sub(c0), b = loop[(i + 1) % loop.length].clone().sub(c0);
//     area += a.dot(u) * b.dot(w) - a.dot(w) * b.dot(u);
//   }
//   if (area < 0) loop.reverse();

//   let curveDir = distalDir ? sideways(distalDir, axis) : null;
//   if (curveDir && curveDir.lengthSq() > 1e-9) curveDir.normalize();
//   else curveDir = null;

//   const b = buccalDir ? sideways(buccalDir, axis) : null;
//   if (!plan || !b || b.lengthSq() < 1e-6) {
//     // one root
//     const geo = extrude(loop, c0, axis, {
//       length, rings: RINGS, roundMm: length * 0.35, width: singleWidth, curveDir, curve: CURVE_MM,
//     });
//     geo.computeBoundingBox();
//     return geo;
//   }

//   // several roots: one from each pie piece of the crown edge. The pieces start exactly on the
//   // crown edge and touch each other, stay together for about SPLIT_MM (the trunk), then part
//   b.normalize();
//   const buccalAngle = Math.atan2(b.dot(w), b.dot(u));
//   const pieces = [];
//   for (const part of plan) {
//     const a0 = buccalAngle + THREE.MathUtils.degToRad(part.from);
//     const a1 = buccalAngle + THREE.MathUtils.degToRad(part.to);
//     const slice = resample(pieSlice(loop, c0, u, w, a0, a1), RING_POINTS);
//     const ci = new THREE.Vector3();
//     slice.forEach((p) => ci.add(p));
//     ci.divideScalar(slice.length);
//     const out = sideways(ci.clone().sub(c0), axis);
//     pieces.push(
//       extrude(slice, ci, axis, {
//         length: length * part.lenScale,
//         rings: RINGS,
//         roundMm: SPLIT_MM + 2,
//         smoothPasses: 40, // the sharp pie corner becomes round
//         width: splitWidth,
//         splayDir: out.lengthSq() > 1e-9 ? out.normalize() : null,
//         splay: SPLAY_MM,
//         curveDir,
//         curve: CURVE_MM,
//       })
//     );
//   }
//   const geo = mergeGeometries(pieces, false);
//   pieces.forEach((p) => p.dispose());
//   geo.computeBoundingBox();
//   return geo;
// }

// // ---------- all roots ----------

// // crown size across the tooth: a = cheek to tongue, b = along the arch (mm)
// function crownSize(geo, apical, buccal) {
//   const b = sideways(buccal, apical);
//   if (b.lengthSq() < 1e-9) return null;
//   b.normalize();
//   const m = new THREE.Vector3().crossVectors(apical, b).normalize();
//   const pos = geo.attributes.position;
//   const v = new THREE.Vector3();
//   let b0 = Infinity, b1 = -Infinity, m0 = Infinity, m1 = -Infinity;
//   for (let i = 0; i < pos.count; i++) {
//     v.fromBufferAttribute(pos, i);
//     const x = v.dot(b), y = v.dot(m);
//     if (x < b0) b0 = x; if (x > b1) b1 = x;
//     if (y < m0) m0 = y; if (y > m1) m1 = y;
//   }
//   return { a: b1 - b0, b: m1 - m0 };
// }

// const centerOf = (list) => {
//   const c = new THREE.Vector3();
//   let n = 0;
//   for (const p of list) {
//     if (!p.geo.boundingBox) p.geo.computeBoundingBox();
//     c.add(p.geo.boundingBox.getCenter(new THREE.Vector3()));
//     n++;
//   }
//   return n ? c.divideScalar(n) : null;
// };

// // teeth: { upper: [{ name, geo }], lower: [...] } (teeth only)
// // Returns { upper: [{ name, geo }], lower: [...] } with one root shape per tooth
// export function computeRoots(teeth) {
//   // the roots of the upper teeth go up (+Z), unless the lower jaw is above the upper one
//   const upC = centerOf(teeth.upper || []), loC = centerOf(teeth.lower || []);
//   let upperApical = new THREE.Vector3(0, 0, 1);
//   if (upC && loC && Math.abs(upC.z - loC.z) > 1) upperApical.set(0, 0, Math.sign(upC.z - loC.z));

//   const report = [];
//   const build = (jaw) => {
//     const apical = jaw === "upper" ? upperApical : upperApical.clone().negate();
//     const list = teeth[jaw] || [];
//     const jawCenter = jaw === "upper" ? upC : loC;
//     // front of the jaw: middle of the front teeth (to know which way is "toward the back")
//     const front = centerOf(list.filter((p) => /^[12]$/.test((toothId(p.name) || "00")[1])));
//     const out = [];
//     for (const p of list) {
//       try {
//         const tc = p.geo.boundingBox.getCenter(new THREE.Vector3());
//         // cheek side: from the middle of the jaw out through this tooth
//         const buccal = jawCenter ? tc.clone().sub(jawCenter) : null;
//         // toward the back: along the arch, away from the front teeth
//         let distal = null;
//         if (buccal && front) {
//           distal = new THREE.Vector3().crossVectors(apical, buccal);
//           if (distal.dot(front.clone().sub(tc)) > 0) distal.negate();
//           if (tc.distanceTo(front) < 6) distal = null; // the front teeth themselves: no bend
//         }
//         // a tooth with no number in its name: a molar-sized crown gets molar roots
//         // (teeth with a number always follow their number)
//         const size = buccal ? crownSize(p.geo, apical, buccal) : null;
//         let plan = rootPlan(p.name, jaw);
//         let length = rootLengthFor(p.name);
//         if (!toothId(p.name) && size && size.a >= MOLAR_SIZE_MM && size.b >= MOLAR_SIZE_MM) {
//           plan = rootPlan(jaw === "upper" ? "16" : "36", jaw);
//           length = ROOT_LENGTH_MM[6];
//         }
//         report.push(`${toothId(p.name) || p.name}${size ? ` (${size.a.toFixed(1)}x${size.b.toFixed(1)} mm)` : ""}: ${plan ? plan.length : 1}`);
//         const geo = buildRoot(p.geo, apical, length, buccal, plan, distal);
//         if (geo) out.push({ name: "root_" + p.name, geo });
//         else report.push(`${toothId(p.name) || p.name}: NO ROOT`);
//       } catch (err) {
//         console.error("Root failed for", p.name, err);
//       }
//     }
//     return out;
//   };
//   const result = { upper: build("upper"), lower: build("lower") };
//   // in the browser console (F12): every tooth, its crown size and how many roots it got
//   console.info("[Root] tooth (crown size): roots ->", report.join(", "));
//   return result;
// }











// Root view: an approximate root for every tooth crown.
// The exe gives only crowns, so each root is made here: the open edge of the crown
// (the cervical line, where the crown met the gum) is pulled away from the biting side
// along the tooth's long axis and narrowed down to a rounded tip.
// Back teeth get more than one root: the crown edge is cut like a pie into 2 or 3 pieces,
// the pieces stay together for the first few mm (the trunk) and then part into separate roots
// (upper molars 3 roots, lower molars 2, upper first premolars 2, all other teeth 1).
// The roots are made from the teeth you are looking at (Final Position = the moved teeth),
// so they always sit on the crowns and move with them.
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";


// typical root length per tooth type (2nd digit of the tooth number), in mm
const ROOT_LENGTH_MM = { 1: 15.5, 2: 15, 3: 19, 4: 15.5, 5: 15.5, 6: 14.5, 7: 14, 8: 12.5 };
const DEFAULT_ROOT_LENGTH_MM = 15;
const MOLAR_SIZE_MM = 8.5; // a tooth with no number: a crown at least this wide both ways is treated as a molar

const RING_POINTS = 96; // points around the root (more = smoother)
const RINGS = 40; // rings from the crown edge to the tip (more = smoother)
const SPLIT_MM = 3.5; // about how far under the crown edge the roots of back teeth come apart
const SPLAY_MM = 2.2; // how far the tips of split roots spread outward
const CURVE_MM = 1.2; // how far root tips bend toward the back of the mouth (distal), like real roots
const MAX_TILT_DEG = 30; // the edge's own direction is used only if it is this close to the jaw's up/down
const TUCK_UP_MM = 0.4; // the root starts this far inside the crown (toward the biting side)...
const NECK_MM = 1.5; // the root neck is as wide as the crown within this distance above the crown edge
const TUCK_IN_MM = 0.15; // ...and this much narrower than the crown edge, so the crown covers the join

const toothId = (name) => {
  const m = /(\d{2})/.exec(name || "");
  return m ? m[1] : null;
};

// how the root splits, by tooth type. Angles in degrees around the tooth, 0 = cheek side (buccal);
// the split lines run from the middle of the tooth out at these angles.
// lenScale: length of that root compared with the others
export function rootPlan(name, jaw) {
  const id = toothId(name);
  const type = id ? Number(id[1]) : 0;
  if (jaw === "upper" && (type === 6 || type === 7 || type === 8)) {
    // 2 cheek-side roots + 1 longer palatal root
    return [
      { from: 0, to: 110, lenScale: 0.95 },
      { from: 110, to: 250, lenScale: 1.05 },
      { from: 250, to: 360, lenScale: 0.95 },
    ];
  }
  if (jaw === "lower" && (type === 6 || type === 7 || type === 8)) {
    // mesial + distal root (the split line runs cheek to tongue)
    return [
      { from: 0, to: 180, lenScale: 1 },
      { from: 180, to: 360, lenScale: 0.95 },
    ];
  }
  if (jaw === "upper" && type === 4) {
    // upper first premolar: cheek-side + palatal root
    return [
      { from: 270, to: 450, lenScale: 1 },
      { from: 90, to: 270, lenScale: 0.95 },
    ];
  }
  return null; // one root
}

export function rootLengthFor(name) {
  const id = toothId(name);
  return (id && ROOT_LENGTH_MM[Number(id[1])]) || DEFAULT_ROOT_LENGTH_MM;
}

// ---------- the open edge of the crown ----------

// all loops of edges that belong to only one triangle (open edges of the crown mesh).
// The cut where the crown met the gum is one of them; small holes in the crown are others.
// Returns [{ pts: [Vector3], closed, perimeter }]
function boundaryLoops(geo) {
  const index = geo.index;
  const pos = geo.attributes.position;
  if (!index) return [];
  const idx = index.array;

  const count = new Map(); // "a_b" (a<b) -> how many triangles use this edge
  const dir = new Map(); // "a_b" -> [from, to] as the triangle uses it
  for (let t = 0; t < idx.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = idx[t + k], b = idx[t + ((k + 1) % 3)];
      const key = a < b ? a + "_" + b : b + "_" + a;
      count.set(key, (count.get(key) || 0) + 1);
      dir.set(key, [a, b]);
    }
  }

  // open edges, by start vertex (a vertex can start more than one, where two holes touch)
  const out = new Map(); // vertex -> [edge ids]
  const edges = [];
  for (const [key, c] of count) {
    if (c !== 1) continue;
    const [a, b] = dir.get(key);
    const id = edges.length;
    edges.push([a, b]);
    if (!out.has(a)) out.set(a, []);
    out.get(a).push(id);
  }
  if (edges.length < 8) return [];

  // follow the open edges into loops (edge by edge, so touching holes do not break them)
  const usedEdge = new Uint8Array(edges.length);
  const loops = [];
  const P = (i) => new THREE.Vector3().fromBufferAttribute(pos, i);
  for (let e0 = 0; e0 < edges.length; e0++) {
    if (usedEdge[e0]) continue;
    const start = edges[e0][0];
    const verts = [];
    let e = e0;
    let closed = false;
    while (e !== undefined) {
      usedEdge[e] = 1;
      verts.push(edges[e][0]);
      const v = edges[e][1];
      if (v === start) { closed = true; break; }
      const cand = (out.get(v) || []).filter((x) => !usedEdge[x]);
      e = cand[0];
    }
    if (verts.length < 8) continue;
    const pts = verts.map(P);
    let perimeter = 0;
    for (let i = 0; i < pts.length; i++) perimeter += pts[i].distanceTo(pts[(i + 1) % pts.length]);
    loops.push({ pts, closed, perimeter });
  }
  return loops;
}

// the crown edge: a big open loop at the root end of the crown, as wide as the crown.
// Returns null when no loop looks like that (then the outline of the crown's root end is used)
function crownEdge(geo, apical) {
  const loops = boundaryLoops(geo);
  if (!loops.length) return null;

  // size of the crown across the axis and along it
  const pos = geo.attributes.position;
  const { u, w } = planeAxes(apical);
  const v = new THREE.Vector3();
  let uMin = Infinity, uMax = -Infinity, wMin = Infinity, wMax = -Infinity, hMin = Infinity, hMax = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const x = v.dot(u), y = v.dot(w), h = v.dot(apical);
    if (x < uMin) uMin = x; if (x > uMax) uMax = x;
    if (y < wMin) wMin = y; if (y > wMax) wMax = y;
    if (h < hMin) hMin = h; if (h > hMax) hMax = h;
  }
  const crownU = uMax - uMin, crownW = wMax - wMin, crownH = hMax - hMin;

  let best = null, bestScore = -Infinity;
  for (const L of loops) {
    let lu0 = Infinity, lu1 = -Infinity, lw0 = Infinity, lw1 = -Infinity, hSum = 0;
    for (const p of L.pts) {
      const x = p.dot(u), y = p.dot(w);
      if (x < lu0) lu0 = x; if (x > lu1) lu1 = x;
      if (y < lw0) lw0 = y; if (y > lw1) lw1 = y;
      hSum += p.dot(apical);
    }
    const wide = Math.min((lu1 - lu0) / crownU, (lw1 - lw0) / crownW); // 1 = as wide as the crown
    const deep = crownH > 1e-6 ? (hSum / L.pts.length - hMin) / crownH : 1; // 1 = at the root end
    // a hole on the biting side, a small hole, or a broken piece of the edge is not the crown edge
    if (wide < 0.6 || deep < 0.5) continue;
    const score = wide + deep + (L.closed ? 1 : 0);
    if (score > bestScore) { bestScore = score; best = L; }
  }
  return best ? best.pts : null;
}

// fallback (closed crown, or no good open edge): the crown points near its root end
function bandPoints(geo, apical) {
  const pos = geo.attributes.position;
  let hMin = Infinity, hMax = -Infinity;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    const h = v.fromBufferAttribute(pos, i).dot(apical);
    if (h < hMin) hMin = h;
    if (h > hMax) hMax = h;
  }
  const bandStart = hMax - (hMax - hMin) * 0.2;
  const pts = [];
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    if (v.dot(apical) >= bandStart) pts.push(v.clone());
  }
  return pts.length >= 8 ? pts : null;
}

// a clean, round-going ring from messy edge points: for every direction around the axis
// (seen from the middle of the crown) one point, at the edge's distance and height there.
// Real crown edges are jagged and go back and forth; used as they are they give thin
// spikes and lines on the root. mode "edge": typical distance in each direction,
// mode "outline": the farthest point (for the fallback band)
function cleanRing(points, center, axis, mode, crownGeo = null) {
  const { u, w } = planeAxes(axis);
  const N = RING_POINTS;
  const rad = Array.from({ length: N }, () => []);
  const hgt = Array.from({ length: N }, () => []);
  for (const p of points) {
    const d = p.clone().sub(center);
    const x = d.dot(u), y = d.dot(w);
    const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
    rad[k].push(Math.hypot(x, y));
    hgt[k].push(d.dot(axis));
  }
  const median = (a) => {
    const s = [...a].sort((x, y) => x - y);
    return s[Math.floor(s.length / 2)];
  };
  let r = rad.map((a) => (a.length ? (mode === "outline" ? Math.max(...a) : median(a)) : null));
  let h = hgt.map((a) => (a.length ? Math.max(...a) : null)); // the deepest edge point (root side)
  const filled = r.filter((x) => x !== null).length;
  if (filled < N * 0.3) return null;

  // directions with no edge point: in between their neighbours
  const fillGaps = (arr) => {
    const out = arr.slice();
    for (let k = 0; k < N; k++) {
      if (out[k] !== null) continue;
      let a = 1, b = 1;
      while (arr[(k - a + N) % N] === null) a++;
      while (arr[(k + b) % N] === null) b++;
      const va = arr[(k - a + N) % N], vb = arr[(k + b) % N];
      out[k] = va + ((vb - va) * a) / (a + b);
    }
    return out;
  };
  r = fillGaps(r);
  h = fillGaps(h);

  // root neck as wide as the crown just above its edge, so the root blends into the crown
  // outline (and the jagged crown edge ends up inside the root instead of sticking out)
  if (crownGeo) {
    const pos = crownGeo.attributes.position;
    const wide = new Array(N).fill(0);
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      const d = v.fromBufferAttribute(pos, i).sub(center);
      const x = d.dot(u), y = d.dot(w), hh = d.dot(axis);
      const k = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * N) % N;
      if (hh <= h[k] + 0.2 && hh >= h[k] - NECK_MM) wide[k] = Math.max(wide[k], Math.hypot(x, y));
    }
    r = r.map((rk, k) => Math.max(rk, wide[k]));
  }
  // a little smoothing round the ring
  const smooth1 = (arr, passes) => {
    let cur = arr;
    for (let s = 0; s < passes; s++) cur = cur.map((v, k) => 0.5 * v + 0.25 * cur[(k - 1 + N) % N] + 0.25 * cur[(k + 1) % N]);
    return cur;
  };
  r = smooth1(r, 3);
  h = smooth1(h, 3);

  const ring = [];
  for (let k = 0; k < N; k++) {
    const a = ((k + 0.5) / N) * 2 * Math.PI - Math.PI;
    // tucked a little inside the crown, so the crown's own edge covers the join (no lines there)
    const rr = Math.max(0.1, r[k] - TUCK_IN_MM);
    ring.push(
      center.clone()
        .addScaledVector(u, Math.cos(a) * rr)
        .addScaledVector(w, Math.sin(a) * rr)
        .addScaledVector(axis, h[k] - TUCK_UP_MM)
    );
  }
  return ring;
}

function planeAxes(n) {
  const helper = Math.abs(n.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const u = new THREE.Vector3().crossVectors(n, helper).normalize();
  const w = new THREE.Vector3().crossVectors(n, u).normalize();
  return { u, w };
}

// RING_POINTS points spread evenly along a closed loop
function resample(loop, n) {
  const len = [0];
  for (let i = 1; i <= loop.length; i++) {
    len.push(len[i - 1] + loop[i - 1].distanceTo(loop[i % loop.length]));
  }
  const total = len[len.length - 1];
  const out = [];
  let seg = 0;
  for (let k = 0; k < n; k++) {
    const target = (k / n) * total;
    while (seg < loop.length - 1 && len[seg + 1] < target) seg++;
    const a = loop[seg], b = loop[(seg + 1) % loop.length];
    const s = len[seg + 1] - len[seg];
    const t = s > 1e-9 ? (target - len[seg]) / s : 0;
    out.push(a.clone().lerp(b, t));
  }
  return out;
}

// circular moving average (makes the ragged crown edge round deeper down the root)
function smoothLoop(pts, passes) {
  let cur = pts.map((p) => p.clone());
  for (let s = 0; s < passes; s++) {
    cur = cur.map((p, i) => {
      const a = cur[(i - 1 + cur.length) % cur.length], b = cur[(i + 1) % cur.length];
      return p.clone().multiplyScalar(0.5).addScaledVector(a, 0.25).addScaledVector(b, 0.25);
    });
  }
  return cur;
}

// plane normal of a loop (direction of least spread)
function loopNormal(pts, center) {
  // Newell's method: robust for a closed, roughly flat loop
  const n = new THREE.Vector3();
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i].clone().sub(center), b = pts[(i + 1) % pts.length].clone().sub(center);
    n.x += (a.y - b.y) * (a.z + b.z);
    n.y += (a.z - b.z) * (a.x + b.x);
    n.z += (a.x - b.x) * (a.y + b.y);
  }
  return n.lengthSq() > 1e-12 ? n.normalize() : null;
}

const smoothstep = (x) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

// how wide a root is at depth t (0 = crown edge, 1 = tip). Starts flat (no band at the crown),
// gets a little narrower under the crown, then tapers smoothly to a rounded tip
const singleWidth = (t) => (1 - 0.1 * smoothstep(t / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5);
const splitWidth = (t) => (1 - 0.32 * smoothstep((t - 0.05) / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5); // thick, blunt roots

const sideways = (v, axis) => v.clone().addScaledVector(axis, -v.dot(axis));

// one root: from a ring of points (going round the axis the same way as the crown edge)
// down along the axis, narrowing to a rounded tip
function extrude(ring, center, axis, o) {
  const n = ring.length;
  const smooth = smoothLoop(ring, o.smoothPasses ?? 12);
  const heights = ring.map((p) => p.clone().sub(center).dot(axis));
  const hMax = Math.max(...heights); // the deepest point of the crown edge
  const hMin = Math.min(...heights);
  const zero = new THREE.Vector3();
  const splayDir = o.splayDir || zero, curveDir = o.curveDir || zero;
  const splay = o.splay || 0, curve = o.curve || 0;
  const flatMm = Math.max(2.5, (hMax - hMin) * 1.5); // the wavy crown edge becomes flat over this depth

  const positions = [];
  for (let r = 0; r <= o.rings; r++) {
    // rings closer together near the crown and the tip, where the shape changes most
    const t = 0.5 - 0.5 * Math.cos((Math.PI * r) / o.rings);
    const d = o.length * t; // depth in mm
    const flat = smoothstep(d / flatMm);
    const round = smoothstep(d / o.roundMm);
    const w = o.width(t);
    const bend = splayDir.clone().multiplyScalar(splay * smoothstep(d / o.length) ** 1.2)
      .addScaledVector(curveDir, curve * t * t);
    for (let i = 0; i < n; i++) {
      let q;
      if (r === 0) {
        q = ring[i].clone(); // exactly on the crown edge
      } else {
        const off = sideways(ring[i].clone().lerp(smooth[i], round).sub(center), axis);
        const h = heights[i] + (hMax - heights[i]) * flat + d;
        q = center.clone().addScaledVector(axis, h).addScaledVector(off, w).add(bend);
      }
      positions.push(q.x, q.y, q.z);
    }
  }
  // rounded tip: a little past the last ring
  const tip = center.clone().addScaledVector(axis, hMax + o.length + 0.4)
    .addScaledVector(splayDir, splay).addScaledVector(curveDir, curve);
  positions.push(tip.x, tip.y, tip.z);
  const tipIndex = (o.rings + 1) * n;

  const indices = [];
  for (let r = 0; r < o.rings; r++) {
    for (let i = 0; i < n; i++) {
      const a = r * n + i;
      const b = r * n + ((i + 1) % n);
      indices.push(a, a + n, b, b, a + n, b + n);
    }
  }
  const last = o.rings * n;
  for (let i = 0; i < n; i++) indices.push(last + i, tipIndex, last + ((i + 1) % n));

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  // check: the normals must point away from the middle, else flip all triangles
  const midRing = Math.floor(o.rings / 2) * n;
  const pos = geo.attributes.position;
  const mc = new THREE.Vector3();
  for (let i = 0; i < n; i++) mc.add(new THREE.Vector3().fromBufferAttribute(pos, midRing + i));
  mc.divideScalar(n);
  let score = 0;
  for (let i = 0; i < n; i += 4) {
    const p = new THREE.Vector3().fromBufferAttribute(pos, midRing + i);
    const nm = new THREE.Vector3().fromBufferAttribute(geo.attributes.normal, midRing + i);
    score += nm.dot(sideways(p.sub(mc), axis));
  }
  if (score < 0) {
    const ix = geo.index.array;
    for (let k = 0; k < ix.length; k += 3) {
      const tmp = ix[k + 1];
      ix[k + 1] = ix[k + 2];
      ix[k + 2] = tmp;
    }
    geo.index.needsUpdate = true;
    geo.computeVertexNormals();
  }
  return geo;
}

// point on the ring in direction `angle` (radians, in the u/w frame) from the center
function ringPointAt(ring, center, u, w, angle) {
  const ang = ring.map((p) => {
    const d = p.clone().sub(center);
    return Math.atan2(d.dot(w), d.dot(u));
  });
  const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  for (let i = 0; i < ring.length; i++) {
    const j = (i + 1) % ring.length;
    const a = wrap(angle - ang[i]); // how far past point i the wanted direction is
    const span = wrap(ang[j] - ang[i]);
    if (span > 1e-9 && span < Math.PI && a <= span) return ring[i].clone().lerp(ring[j], a / span);
  }
  let best = 0, bestD = Infinity;
  ang.forEach((a, i) => {
    const d = Math.min(wrap(a - angle), wrap(angle - a));
    if (d < bestD) { bestD = d; best = i; }
  });
  return ring[best].clone();
}

// the slice of the ring between two angles, closed through the center (a pie piece),
// going round the same way as the ring
function pieSlice(ring, center, u, w, a0, a1) {
  const wrap = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const span = a1 - a0;
  const arc = [];
  ring.forEach((p) => {
    const d = p.clone().sub(center);
    const rel = wrap(Math.atan2(d.dot(w), d.dot(u)) - a0);
    if (rel > 1e-6 && rel < span - 1e-6) arc.push({ rel, p });
  });
  arc.sort((x, y) => x.rel - y.rel);
  return [
    center.clone(),
    ringPointAt(ring, center, u, w, a0),
    ...arc.map((x) => x.p),
    ringPointAt(ring, center, u, w, a1),
  ];
}

// last resort: a circle at the crown's root end, a bit narrower than the crown
function circleRing(geo, apical) {
  const pos = geo.attributes.position;
  if (!pos || pos.count < 3) return null;
  const { u, w } = planeAxes(apical);
  const v = new THREE.Vector3();
  let hMax = -Infinity, u0 = Infinity, u1 = -Infinity, w0 = Infinity, w1 = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const x = v.dot(u), y = v.dot(w), h = v.dot(apical);
    if (h > hMax) hMax = h;
    if (x < u0) u0 = x; if (x > u1) u1 = x;
    if (y < w0) w0 = y; if (y > w1) w1 = y;
  }
  const ru = (u1 - u0) * 0.35, rw = (w1 - w0) * 0.35;
  const cu = (u0 + u1) / 2, cw = (w0 + w1) / 2;
  const ring = [];
  for (let k = 0; k < RING_POINTS; k++) {
    const a = ((k + 0.5) / RING_POINTS) * 2 * Math.PI - Math.PI;
    ring.push(new THREE.Vector3()
      .addScaledVector(u, cu + Math.cos(a) * ru)
      .addScaledVector(w, cw + Math.sin(a) * rw)
      .addScaledVector(apical, hMax - TUCK_UP_MM - 0.5));
  }
  return ring;
}

// ---------- one root ----------

// crownGeo: tooth geometry (indexed), apicalDir: unit vector pointing from the crown toward the root
// buccalDir: toward the cheek, distalDir: toward the back of the mouth (both may be null)
// plan: rootPlan(...) or null for one root
export function buildRoot(crownGeo, apicalDir, length, buccalDir = null, plan = null, distalDir = null) {
  // where the root starts: the crown's open edge, or else the crown's root end.
  // Each try measures directions from the middle of its own points (not the middle of the crown:
  // on a strongly tilted tooth that can lie outside the edge, and then no root was made)
  const edge = crownEdge(crownGeo, apicalDir);
  const band = bandPoints(crownGeo, apicalDir);
  const tries = [];
  if (edge) tries.push({ pts: edge, mode: "edge" });
  if (band) tries.push({ pts: band, mode: "outline" });

  let loop = null;
  let axis = apicalDir.clone();
  for (const tr of tries) {
    const mid = new THREE.Vector3();
    tr.pts.forEach((p) => mid.add(p));
    mid.divideScalar(tr.pts.length);
    const first = cleanRing(tr.pts, mid, apicalDir, tr.mode, crownGeo);
    if (!first) continue;
    // long axis: the edge's own direction if it agrees with the jaw, otherwise the jaw's up/down
    const fc = new THREE.Vector3();
    first.forEach((p) => fc.add(p));
    fc.divideScalar(first.length);
    const n = loopNormal(first, fc);
    axis = apicalDir.clone();
    if (n) {
      if (n.dot(apicalDir) < 0) n.negate();
      if (n.angleTo(apicalDir) < THREE.MathUtils.degToRad(MAX_TILT_DEG)) {
        axis = n.lerp(apicalDir, 0.5).normalize(); // a bit of both: steadier on ragged edges
      }
    }
    loop = cleanRing(tr.pts, fc, axis, tr.mode, crownGeo) || first;
    break;
  }
  if (!loop) loop = circleRing(crownGeo, apicalDir); // last resort: a round root under the crown
  if (!loop) return null;

  const c0 = new THREE.Vector3();
  loop.forEach((p) => c0.add(p));
  c0.divideScalar(loop.length);

  // keep the crown edge going one way round the axis (so all pieces turn the same way)
  const { u, w } = planeAxes(axis);
  let area = 0;
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i].clone().sub(c0), b = loop[(i + 1) % loop.length].clone().sub(c0);
    area += a.dot(u) * b.dot(w) - a.dot(w) * b.dot(u);
  }
  if (area < 0) loop.reverse();

  let curveDir = distalDir ? sideways(distalDir, axis) : null;
  if (curveDir && curveDir.lengthSq() > 1e-9) curveDir.normalize();
  else curveDir = null;

  const b = buccalDir ? sideways(buccalDir, axis) : null;
  if (!plan || !b || b.lengthSq() < 1e-6) {
    // one root
    const geo = extrude(loop, c0, axis, {
      length, rings: RINGS, roundMm: length * 0.35, width: singleWidth, curveDir, curve: CURVE_MM,
    });
    geo.computeBoundingBox();
    return geo;
  }

  // several roots: one from each pie piece of the crown edge. The pieces start exactly on the
  // crown edge and touch each other, stay together for about SPLIT_MM (the trunk), then part
  b.normalize();
  const buccalAngle = Math.atan2(b.dot(w), b.dot(u));
  const pieces = [];
  for (const part of plan) {
    const a0 = buccalAngle + THREE.MathUtils.degToRad(part.from);
    const a1 = buccalAngle + THREE.MathUtils.degToRad(part.to);
    const slice = resample(pieSlice(loop, c0, u, w, a0, a1), RING_POINTS);
    const ci = new THREE.Vector3();
    slice.forEach((p) => ci.add(p));
    ci.divideScalar(slice.length);
    const out = sideways(ci.clone().sub(c0), axis);
    pieces.push(
      extrude(slice, ci, axis, {
        length: length * part.lenScale,
        rings: RINGS,
        roundMm: SPLIT_MM + 2,
        smoothPasses: 40, // the sharp pie corner becomes round
        width: splitWidth,
        splayDir: out.lengthSq() > 1e-9 ? out.normalize() : null,
        splay: SPLAY_MM,
        curveDir,
        curve: CURVE_MM,
      })
    );
  }
  const geo = mergeGeometries(pieces, false);
  pieces.forEach((p) => p.dispose());
  geo.computeBoundingBox();
  return geo;
}

// ---------- all roots ----------

// crown size across the tooth: a = cheek to tongue, b = along the arch (mm)
function crownSize(geo, apical, buccal) {
  const b = sideways(buccal, apical);
  if (b.lengthSq() < 1e-9) return null;
  b.normalize();
  const m = new THREE.Vector3().crossVectors(apical, b).normalize();
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  let b0 = Infinity, b1 = -Infinity, m0 = Infinity, m1 = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const x = v.dot(b), y = v.dot(m);
    if (x < b0) b0 = x; if (x > b1) b1 = x;
    if (y < m0) m0 = y; if (y > m1) m1 = y;
  }
  return { a: b1 - b0, b: m1 - m0 };
}

const centerOf = (list) => {
  const c = new THREE.Vector3();
  let n = 0;
  for (const p of list) {
    if (!p.geo.boundingBox) p.geo.computeBoundingBox();
    c.add(p.geo.boundingBox.getCenter(new THREE.Vector3()));
    n++;
  }
  return n ? c.divideScalar(n) : null;
};

// teeth: { upper: [{ name, geo }], lower: [...] } (teeth only)
// Returns { upper: [{ name, geo }], lower: [...] } with one root shape per tooth
export function computeRoots(teeth) {
  // the roots of the upper teeth go up (+Z), unless the lower jaw is above the upper one
  const upC = centerOf(teeth.upper || []), loC = centerOf(teeth.lower || []);
  let upperApical = new THREE.Vector3(0, 0, 1);
  if (upC && loC && Math.abs(upC.z - loC.z) > 1) upperApical.set(0, 0, Math.sign(upC.z - loC.z));

  const report = [];
  const build = (jaw) => {
    const apical = jaw === "upper" ? upperApical : upperApical.clone().negate();
    const list = teeth[jaw] || [];
    const jawCenter = jaw === "upper" ? upC : loC;
    // front of the jaw: middle of the front teeth (to know which way is "toward the back")
    const front = centerOf(list.filter((p) => /^[12]$/.test((toothId(p.name) || "00")[1])));
    const out = [];
    for (const p of list) {
      try {
        const tc = p.geo.boundingBox.getCenter(new THREE.Vector3());
        // cheek side: from the middle of the jaw out through this tooth
        const buccal = jawCenter ? tc.clone().sub(jawCenter) : null;
        // toward the back: along the arch, away from the front teeth
        let distal = null;
        if (buccal && front) {
          distal = new THREE.Vector3().crossVectors(apical, buccal);
          if (distal.dot(front.clone().sub(tc)) > 0) distal.negate();
          if (tc.distanceTo(front) < 6) distal = null; // the front teeth themselves: no bend
        }
        // a tooth with no number in its name: a molar-sized crown gets molar roots
        // (teeth with a number always follow their number)
        const size = buccal ? crownSize(p.geo, apical, buccal) : null;
        let plan = rootPlan(p.name, jaw);
        let length = rootLengthFor(p.name);
        if (!toothId(p.name) && size && size.a >= MOLAR_SIZE_MM && size.b >= MOLAR_SIZE_MM) {
          plan = rootPlan(jaw === "upper" ? "16" : "36", jaw);
          length = ROOT_LENGTH_MM[6];
        }
        report.push(`${toothId(p.name) || p.name}${size ? ` (${size.a.toFixed(1)}x${size.b.toFixed(1)} mm)` : ""}: ${plan ? plan.length : 1}`);
        const geo = buildRoot(p.geo, apical, length, buccal, plan, distal);
        if (geo) out.push({ name: "root_" + p.name, geo });
        else report.push(`${toothId(p.name) || p.name}: NO ROOT`);
      } catch (err) {
        console.error("Root failed for", p.name, err);
      }
    }
    return out;
  };
  const result = { upper: build("upper"), lower: build("lower") };
  // in the browser console (F12): every tooth, its crown size and how many roots it got
  console.info("[Root] tooth (crown size): roots ->", report.join(", "));
  return result;
}
