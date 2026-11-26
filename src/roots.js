// Root view: an approximate root for every tooth crown.
// The exe gives only crowns, so each root is made here: the open edge of the crown
// (the cervical line, where the crown met the gum) is pulled away from the biting side
// along the tooth's long axis and narrowed down to a rounded tip.
// Back teeth get more than one root (upper molars 3, lower molars 2, upper first premolars 2,
// all other teeth 1). They are made as one smooth surface: under the crown it follows the crown
// edge, then it turns into 2 or 3 slim, pointed roots with an inverted V between them.
// The roots are made from the teeth you are looking at (Final Position = the moved teeth),
// so they always sit on the crowns and move with them.
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

// typical root length per tooth type (2nd digit of the tooth number), in mm
// typical root lengths (mm) by jaw and tooth type (2nd digit of the tooth number)
const ROOT_LENGTH_MM = {
  upper: { 1: 14, 2: 13.5, 3: 17.5, 4: 14.5, 5: 14.5, 6: 13.5, 7: 13, 8: 12 },
  lower: { 1: 12.5, 2: 13, 3: 16, 4: 14.5, 5: 14.5, 6: 14, 7: 13, 8: 12 },
};
const DEFAULT_ROOT_LENGTH_MM = 14;
const ROOT_LENGTH_SCALE = 0.6; // only when ROOT_BELOW_CROWN_MM = 0: roots are this much of the lengths above (1 = full length)
const ROOT_BELOW_CROWN_MM = 0; // >0: the root ends this far below the crown's lowest point (a short rounded root); 0 = the tooth-type lengths above times ROOT_LENGTH_SCALE
const MOLAR_SIZE_MM = 8.5; // a tooth with no number: a crown at least this wide both ways is treated as a molar

const RING_POINTS = 128; // points around the root (more = smoother)
const RINGS = 120; // rings from the crown edge to the tip (more = smoother)
// back teeth with 2 or 3 roots are made as one smooth surface (see buildSplitRoots):
const SPLIT_MM = 2.5; // under the crown edge the root keeps the crown's outline this far, then turns into separate roots
const ROOT_THICK = 1.15; // root thickness compared with its part of the crown edge (less = slimmer)
const ROOT_WIDE = 0.85; // root width (the other way) compared with its part of the crown edge
const ROOT_SLIM = 0.35; // roots get this much slimmer (35%) over their first part (makes the inverted V)
const BLEND_MM = 0.6; // how softly the roots melt into each other (bigger = rounder top of the V)
const SPLAY_MM = 2.2; // how far the tips of split roots spread outward
const JOIN_AT = 2 / 3; // the open IPR region above this far down the crown (from the biting side) is filled; the crown itself is never cut; 1 = no fill
const LOFT_MM = 2.5; // the root is cut this far below the crown edge; in between, a smooth band changes from the crown's outline to the root's
const LOFT_RINGS = 40; // rings in that band (more = smoother)
const LOFT_POINTS = 128; // points per ring in that band
const LOFT_RELAX = 15; // smoothing passes for that band
const EDGE_SMOOTH_MM = 1.0; // the crown is smoothed this far in from its open edge, so it blends into the new parts (0 = crown kept exactly as it is)
const JOINT_SMOOTH_MM = 1.5; // where the crown meets the new parts (band, IPR fill), both sides are smoothed together this far (0 = off)
const JOINT_SMOOTH_PASSES = 120; // how strongly that strip is smoothed
const SEAM_MM = 1.2; // where the IPR fill meets the crown, this narrow strip is smoothed extra, so no border line shows (0 = off)
const SEAM_PASSES = 80; // how strongly
const SEPARATE_TEETH = false; // true = push the new parts of touching teeth apart (off for now: it left streaks in the IPR fill)
const CONTACT_MM = 0.25; // the IPR region: the part of the crown edge this close to the next crown (where the two crowns touch)
const CONTACT_SHARE = 0.5; // a side opening less than this much in contact with the next crown (moved teeth) is filled whole, by the height rule
const RETRY_JOIN_AT = [0.58, 0.5, 0.42]; // if the root cannot start cleanly after that, the openings are filled from these heights instead
const NORMAL_MM = 0.1; // the crown's surface direction at its edge is measured over this distance
const ACROSS_SMOOTH = 80; // how much the crown slope at the IPR edge is evened out along the edge (more = the fill ignores small wiggles, but meets the crown less exactly)
const SIDE_ROUND = 0.5; // how round the IPR fill is between the crown walls (0 = flat, 1 = very round)
const GRID_MM = 0.32; // detail of the split-root surface (smaller = finer, slower)
const CURVE_MM = 1.2; // how far root tips bend toward the back of the mouth (distal), like real roots
const MAX_TILT_DEG = 45;
const MAX_ROOT_LEAN_DEG = 20; // a root never leans more than this from the jaw's up/down
const CANINE_MAX_LEAN_DEG = 10; // canines: their pointed crowns give a wrong long direction, so keep them nearly straight // the edge's own direction is used only if it is this close to the jaw's up/down
const TUCK_UP_MM = 0; // 0 = the root starts exactly at the crown end (more = further over the crown)
const END_SEARCH_MM = 0.6; // how near (seen along the axis) a crown point must be to count as "the crown ends here" // the root starts this far inside the crown (toward the biting side)...
const TUCK_IN_MM = 0.1; // ...and this much narrower than the crown edge, so the crown covers the join

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

export function rootLengthFor(name, jaw = "upper") {
  const id = toothId(name);
  return ((id && ROOT_LENGTH_MM[jaw === "lower" ? "lower" : "upper"][Number(id[1])]) || DEFAULT_ROOT_LENGTH_MM) * ROOT_LENGTH_SCALE;
}

// ---------- the open edge of the crown ----------

// all loops of edges that belong to only one triangle (open edges of the crown mesh).
// The cut where the crown met the gum is one of them; small holes in the crown are others.
// Returns [{ pts: [Vector3], closed, perimeter }]
function boundaryLoops(geo, minLen = 8) {
  const index = geo.index;
  const pos = geo.attributes.position;
  if (!index) return [];
  const idx = index.array;

  const N = pos.count;
  const count = new Map(); // edge key (a<b) -> how many triangles use this edge
  const dir = new Map(); // edge key -> from-vertex as the triangle uses it
  for (let t = 0; t < idx.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = idx[t + k], b = idx[t + ((k + 1) % 3)];
      const key = a < b ? a * N + b : b * N + a;
      count.set(key, (count.get(key) || 0) + 1);
      dir.set(key, a);
    }
  }

  // open edges, by start vertex (a vertex can start more than one, where two holes touch)
  const out = new Map(); // vertex -> [edge ids]
  const edges = [];
  for (const [key, c] of count) {
    if (c !== 1) continue;
    const lo = Math.floor(key / N), hi = key - lo * N;
    const a = dir.get(key), b = a === lo ? hi : lo;
    const id = edges.length;
    edges.push([a, b]);
    if (!out.has(a)) out.set(a, []);
    out.get(a).push(id);
  }
  if (edges.length < minLen) return [];

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
    if (verts.length < minLen) continue;
    const pts = verts.map(P);
    let perimeter = 0;
    for (let i = 0; i < pts.length; i++) perimeter += pts[i].distanceTo(pts[(i + 1) % pts.length]);
    loops.push({ pts, ids: verts, closed, perimeter });
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
    if (wide < 0.45 || deep < 0.45) continue; // (loose enough for strongly tilted teeth)
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

// a clean ring from messy crown-boundary points: the outline (convex hull) of the boundary seen
// along the tooth axis, with even spacing. Each ring point sits at the height of the boundary
// right there. Real crown edges are jagged, go back and forth and can be one-sided on tilted
// teeth; the outline never folds or pinches, so the root gets no lines, spikes or thin slivers.
function cleanRing(points, center, axis, mode, crownGeo = null) {
  const { u, w } = planeAxes(axis);
  const P = points.map((p) => ({ x: p.dot(u), y: p.dot(w), h: p.dot(axis) }));
  if (P.length < 3) return null;

  // convex hull (monotone chain), counter-clockwise in u/w
  const S = [...P].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [], upper = [];
  for (const p of S) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  for (let i = S.length - 1; i >= 0; i--) {
    const p = S[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  const hull = lower.slice(0, -1).concat(upper.slice(0, -1));
  if (hull.length < 3) return null;

  // hull centre and size
  let cx = 0, cy = 0;
  hull.forEach((p) => { cx += p.x; cy += p.y; });
  cx /= hull.length; cy /= hull.length;
  let perim = 0;
  for (let i = 0; i < hull.length; i++) {
    const a = hull[i], b = hull[(i + 1) % hull.length];
    perim += Math.hypot(b.x - a.x, b.y - a.y);
  }
  if (perim < 3) return null; // smaller than 1 mm across: not a crown edge

  // RING_POINTS points spread evenly along the hull
  const N = RING_POINTS;
  const pts2 = [];
  let seg = 0, segStart = 0;
  for (let k = 0; k < N; k++) {
    const target = (k / N) * perim;
    let a = hull[seg], b = hull[(seg + 1) % hull.length];
    let L = Math.hypot(b.x - a.x, b.y - a.y);
    while (segStart + L < target && seg < hull.length - 1) {
      segStart += L;
      seg++;
      a = hull[seg]; b = hull[(seg + 1) % hull.length];
      L = Math.hypot(b.x - a.x, b.y - a.y);
    }
    const t = L > 1e-9 ? (target - segStart) / L : 0;
    pts2.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  }

  // height at each ring point:
  // - crown edge found: the edge's own height right there (average of the 3 nearest edge points)
  // - no open edge (e.g. a closed crown): where the crown really ends right there = the crown point
  //   closest to the root side within END_SEARCH_MM. Before, this case used crown points up to
  //   20% of the crown height toward the biting side, so the root covered part of the crown
  const near3 = (q) => {
    const near = [];
    for (const p of P) {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (near.length < 3) { near.push({ d, h: p.h }); near.sort((a, b) => a.d - b.d); }
      else if (d < near[2].d) { near[2] = { d, h: p.h }; near.sort((a, b) => a.d - b.d); }
    }
    return near.reduce((a, b) => a + b.h, 0) / near.length;
  };
  let crownEnd = null;
  if (crownGeo && mode === "outline") { // no open crown edge found (e.g. a closed crown)
    // crown points in a grid (cells END_SEARCH_MM wide), keeping the deepest point per cell
    const pos = crownGeo.attributes.position;
    const cell = END_SEARCH_MM;
    const grid = new Map();
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const x = v.dot(u), y = v.dot(w), hh = v.dot(axis);
      const key = Math.floor(x / cell) + "," + Math.floor(y / cell);
      const g = grid.get(key);
      if (!g) grid.set(key, [{ x, y, h: hh }]);
      else g.push({ x, y, h: hh });
    }
    crownEnd = (q) => {
      const gx = Math.floor(q.x / cell), gy = Math.floor(q.y / cell);
      let best = -Infinity;
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        const g = grid.get(gx + a + "," + (gy + b));
        if (!g) continue;
        for (const p of g) if (p.h > best && Math.hypot(p.x - q.x, p.y - q.y) <= END_SEARCH_MM) best = p.h;
      }
      return best > -Infinity ? best : null;
    };
  }
  const H = pts2.map((q) => {
    const e = crownEnd ? crownEnd(q) : null;
    return e !== null ? e : near3(q);
  });
  // smooth the heights round the ring (no steps)
  let h = H;
  for (let s = 0; s < 6; s++) h = h.map((v, k) => 0.5 * v + 0.25 * h[(k - 1 + N) % N] + 0.25 * h[(k + 1) % N]);

  const ring = [];
  for (let k = 0; k < N; k++) {
    // tucked a little inside the crown, so the crown's own edge covers the join
    const dx = pts2[k].x - cx, dy = pts2[k].y - cy;
    const r = Math.hypot(dx, dy);
    const f = r > 1e-6 ? Math.max(0.2, (r - TUCK_IN_MM) / r) : 1;
    ring.push(new THREE.Vector3()
      .addScaledVector(u, cx + dx * f)
      .addScaledVector(w, cy + dy * f)
      .addScaledVector(axis, h[k] - TUCK_UP_MM));
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
// short root: keeps its width a little, then closes in a round end
const shortWidth = (t) => Math.sqrt(Math.max(0, 1 - Math.pow(t, 2))); // closes to a point at the end (no little knob)
const singleWidth = (t) => (1 - 0.1 * smoothstep(t / 0.3)) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.5);

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
  const flatMm = o.flatMm ?? Math.max(2.5, (hMax - hMin) * 1.5); // the wavy crown edge becomes flat over this depth

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
  const withTip = o.tip !== false;
  // rounded tip: a little past the last ring
  const tip = center.clone().addScaledVector(axis, hMax + o.length + (o.tipMm ?? 0.4))
    .addScaledVector(splayDir, splay).addScaledVector(curveDir, curve);
  if (withTip) positions.push(tip.x, tip.y, tip.z);
  const tipIndex = (o.rings + 1) * n;
  const endRing = [];
  for (let i = 0; i < n; i++) {
    const k = (o.rings * n + i) * 3;
    endRing.push(new THREE.Vector3(positions[k], positions[k + 1], positions[k + 2]));
  }

  const indices = [];
  for (let r = 0; r < o.rings; r++) {
    for (let i = 0; i < n; i++) {
      const a = r * n + i;
      const b = r * n + ((i + 1) % n);
      indices.push(a, a + n, b, b, a + n, b + n);
    }
  }
  const last = o.rings * n;
  if (withTip) for (let i = 0; i < n; i++) indices.push(last + i, tipIndex, last + ((i + 1) % n));

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
  geo.userData.endRing = endRing;
  geo.userData.ringN = n; // points per ring (the points are stored ring after ring, the tip last)
  geo.userData.ringCount = o.rings + 1;
  return geo;
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

// keep a direction within MAX_ROOT_LEAN_DEG of the jaw's up/down (turned back toward it if needed)
function limitLean(dir, jawDir, maxDeg = MAX_ROOT_LEAN_DEG) {
  const a = dir.angleTo(jawDir);
  const max = THREE.MathUtils.degToRad(maxDeg);
  if (a <= max) return dir;
  const q = new THREE.Quaternion().setFromUnitVectors(jawDir, dir);
  const part = new THREE.Quaternion().slerp(q, max / a); // from no turn toward the full turn
  return jawDir.clone().applyQuaternion(part).normalize();
}

// the crown's longest direction (principal axis) and how much longer it is than the next one
function crownLongAxis(geo) {
  const pos = geo.attributes.position;
  const n = pos.count;
  if (n < 10) return null;
  const c = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) c.add(v.fromBufferAttribute(pos, i));
  c.divideScalar(n);
  const C = [0, 0, 0, 0, 0, 0]; // xx xy xz yy yz zz
  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(pos, i).sub(c);
    C[0] += v.x * v.x; C[1] += v.x * v.y; C[2] += v.x * v.z; C[3] += v.y * v.y; C[4] += v.y * v.z; C[5] += v.z * v.z;
  }
  const mul = (x) => new THREE.Vector3(
    C[0] * x.x + C[1] * x.y + C[2] * x.z,
    C[1] * x.x + C[3] * x.y + C[4] * x.z,
    C[2] * x.x + C[4] * x.y + C[5] * x.z
  );
  const power = (start, deflate) => {
    let x = start.clone().normalize();
    let lam = 0;
    for (let k = 0; k < 60; k++) {
      let y = mul(x);
      if (deflate) y.addScaledVector(deflate.dir, -deflate.lam * deflate.dir.dot(x));
      lam = y.length();
      if (lam < 1e-12) break;
      x = y.divideScalar(lam);
    }
    return { dir: x, lam };
  };
  const e1 = power(new THREE.Vector3(0.3, 0.5, 1), null);
  const e2 = power(new THREE.Vector3(1, -0.4, 0.2).sub(e1.dir.clone().multiplyScalar(e1.dir.dot(new THREE.Vector3(1, -0.4, 0.2)))), e1);
  if (e2.lam < 1e-9) return null;
  return { dir: e1.dir, ratio: e1.lam / e2.lam };
}

// how round a ring is seen along the axis: narrowest width / widest width (0 = a flat line)
function ringRoundness(ring, axis) {
  const { u, w } = planeAxes(axis);
  let best = Infinity, worst = 0;
  for (let k = 0; k < 18; k++) {
    const a = (k / 18) * Math.PI;
    const d = u.clone().multiplyScalar(Math.cos(a)).addScaledVector(w, Math.sin(a));
    let lo = Infinity, hi = -Infinity;
    for (const p of ring) { const x = p.dot(d); if (x < lo) lo = x; if (x > hi) hi = x; }
    best = Math.min(best, hi - lo);
    worst = Math.max(worst, hi - lo);
  }
  return worst > 1e-9 ? best / worst : 0;
}

let lastBuildInfo = ""; // how the last root was made (for the console line)

// ---------- one root ----------

// crownGeo: tooth geometry (indexed), apicalDir: unit vector pointing from the crown toward the root
// buccalDir: toward the cheek, distalDir: toward the back of the mouth (both may be null)
// plan: rootPlan(...) or null for one root
export function buildRoot(crownGeo, apicalDir, length, buccalDir = null, plan = null, distalDir = null, maxLean = MAX_ROOT_LEAN_DEG, trimmed = false, neighbours = null) {
  if (!trimmed && EDGE_SMOOTH_MM > 0 && !crownGeo.userData.edgeSmoothed) {
    const sm = smoothCrownEdge(crownGeo, EDGE_SMOOTH_MM);
    if (sm) {
      sm.userData.edgeSmoothed = true;
      const g = buildRoot(sm, apicalDir, length, buccalDir, plan, distalDir, maxLean, false, neighbours);
      if (g && !g.userData.crown) g.userData.crown = sm;
      if (g) g.userData.baseCrown = sm; // the crown as used (smoothed edge): never moved after this
      return g;
    }
  }
  // where the root starts: the crown's open edge, or else the crown's root end.
  // Each try measures directions from the middle of its own points (not the middle of the crown:
  // on a strongly tilted tooth that can lie outside the edge, and then no root was made)
  const edge = crownEdge(crownGeo, apicalDir);
  const band = bandPoints(crownGeo, apicalDir);
  const tries = [];
  if (edge) tries.push({ pts: edge, mode: "edge" });
  if (band) tries.push({ pts: band, mode: "outline" });

  // long axis of the tooth: the crown's own long direction when the crown is clearly longer than
  // wide (front teeth, canines), else the direction the crown edge faces, else the jaw's up/down
  const axes = [];
  const pca = crownLongAxis(crownGeo);
  if (pca && pca.ratio > 1.6) {
    if (pca.dir.dot(apicalDir) < 0) pca.dir.negate();
    if (pca.dir.angleTo(apicalDir) < THREE.MathUtils.degToRad(35)) axes.push({ dir: limitLean(pca.dir.clone().lerp(apicalDir, 0.4).normalize(), apicalDir, maxLean), how: "crown" });
  }

  let loop = null;
  let axis = apicalDir.clone();
  let how = "";
  for (const tr of tries) {
    const mid = new THREE.Vector3();
    tr.pts.forEach((p) => mid.add(p));
    mid.divideScalar(tr.pts.length);
    const first = cleanRing(tr.pts, mid, apicalDir, tr.mode, crownGeo);
    if (!first) continue;
    const fc = new THREE.Vector3();
    first.forEach((p) => fc.add(p));
    fc.divideScalar(first.length);
    const cands = axes.slice();
    const n = loopNormal(first, fc);
    if (n) {
      if (n.dot(apicalDir) < 0) n.negate();
      if (n.angleTo(apicalDir) < THREE.MathUtils.degToRad(MAX_TILT_DEG)) cands.push({ dir: limitLean(n.lerp(apicalDir, 0.5).normalize(), apicalDir, maxLean), how: "edge" });
    }
    cands.push({ dir: apicalDir.clone(), how: "jaw" });
    // take the first axis that gives a proper, not flat, ring (a flat ring = a wrong axis = a thin sheet)
    for (const c of cands) {
      const ring = cleanRing(tr.pts, fc, c.dir, tr.mode, crownGeo);
      if (ring && ringRoundness(ring, c.dir) > 0.35) {
        loop = ring; axis = c.dir; how = `${tr.mode}, ${c.how} axis`;
        break;
      }
    }
    if (loop) break;
  }
  if (!loop) how = "round fallback";
  if (!loop) { loop = circleRing(crownGeo, apicalDir); axis = apicalDir.clone(); } // last resort: a round root under the crown
  if (!loop) return null;
  lastBuildInfo = how;

  // the crown keeps its own shape. Only the open IPR region (where the edge runs up between the
  // teeth, above two-thirds of the crown's height) is filled with new triangles, and the root is
  // joined to the crown's edge plus those fills. The filled crown is returned with the root
  // (geo.userData.crown) and is what Root view shows.
  if (!trimmed && JOIN_AT < 1 && how.startsWith("edge")) {
    const tryCut = (cut) => {
      if (!cut) return null;
      const geo = buildRoot(cut, axis, length, buccalDir, plan, distalDir, maxLean, true);
      if (geo && geo.userData.closedToCrown) {
        geo.userData.crown = fillOtherHoles(cut, geo.userData.joinedLoopFirst);
        geo.userData.iprBy = cut.userData.iprBy;
        return geo;
      }
      if (geo) geo.dispose();
      cut.dispose();
      return null;
    };
    const done = (geo) => { lastBuildInfo = `${how}, IPR filled ${geo.userData.iprBy}`; return geo; };
    const first = trimCrown(crownGeo, axis, JOIN_AT, neighbours);
    const added = first ? first.userData.addedRuns || 0 : 0;
    if (!added) {
      // no side opening needed the extra fill (all teeth that touch their neighbours): as before
      const geo = tryCut(first);
      if (geo) return done(geo);
    } else {
      // side openings that hardly touch the next crown were filled whole. A tooth that could not be
      // joined at the IPR fill before stays as it was; else the fuller fill is used, and if the root
      // cannot start cleanly with it (too much of the edge became one straight bridge), the openings
      // are filled from a little higher up, then one at a time
      first.dispose();
      const before = tryCut(trimCrown(crownGeo, axis, JOIN_AT, neighbours, []));
      if (before) {
        const tries = [[null, JOIN_AT], ...RETRY_JOIN_AT.map((at) => [null, at])];
        for (let k = 0; k < added; k++) tries.push([[k], JOIN_AT]);
        for (const [only, at] of tries) {
          const geo = tryCut(trimCrown(crownGeo, axis, at, neighbours, only));
          if (geo) { before.dispose(); if (geo.userData.crown !== before.userData.crown) before.userData.crown.dispose(); return done(geo); }
        }
        return done(before);
      }
    }
    lastBuildInfo = how; // the cut did not work out: join at the crown's own edge
  }

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
  // short root: it ends ROOT_BELOW_CROWN_MM below the crown's lowest point, as one rounded end
  // (no split roots, no bend)
  let short = false;
  if (ROOT_BELOW_CROWN_MM > 0) {
    const CP = crownGeo.attributes.position, v = new THREE.Vector3();
    let crownDeep = -Infinity, edgeDeep = -Infinity;
    for (let i = 0; i < CP.count; i++) crownDeep = Math.max(crownDeep, v.fromBufferAttribute(CP, i).sub(c0).dot(axis));
    loop.forEach((p) => { edgeDeep = Math.max(edgeDeep, p.clone().sub(c0).dot(axis)); });
    length = Math.max(1, crownDeep + ROOT_BELOW_CROWN_MM - edgeDeep - 0.05);
    short = true;
  }
  if (short || !plan || !b || b.lengthSq() < 1e-6) {
    // one root
    const geo = extrude(loop, c0, axis, short ? {
      length, rings: RINGS, roundMm: length * 0.6, flatMm: length * 0.6, smoothPasses: 24, width: shortWidth, tipMm: 0,
    } : {
      length, rings: RINGS, roundMm: length * 0.3, smoothPasses: 24, width: singleWidth, curveDir, curve: CURVE_MM,
    });
    if (short) geo.userData.loftMm = Math.min(LOFT_MM, length * 0.35);
    return joinToCrown(geo, how.startsWith("edge") ? edge : null, c0, axis, crownGeo);
  }

  // several roots: one smooth surface (trunk + 2 or 3 tapered roots melted together)
  b.normalize();
  const buccalAngle = Math.atan2(b.dot(w), b.dot(u));
  const geo = buildSplitRoots(loop, c0, axis, u, w, plan, length, buccalAngle, curveDir);
  return joinToCrown(geo, how.startsWith("edge") ? edge : null, c0, axis, crownGeo);
}

function smoothCrownEdge(crownGeo, mm) {
  const geo = crownGeo.index ? crownGeo.clone() : mergeIndexed(crownGeo);
  const loops = boundaryLoops(geo, 3).filter((L) => L.closed);
  if (!loops.length) { geo.dispose(); return null; }
  const pos = geo.attributes.position, ix = geo.index.array, n = pos.count;
  const P = [];
  for (let i = 0; i < n; i++) P.push(new THREE.Vector3().fromBufferAttribute(pos, i));
  const edgeNb = new Map();
  loops.forEach((L) => L.ids.forEach((id, q) => edgeNb.set(id, [L.ids[(q - 1 + L.ids.length) % L.ids.length], L.ids[(q + 1) % L.ids.length]])));
  const nb = Array.from({ length: n }, () => new Set());
  for (let t = 0; t < ix.length; t += 3) for (let q = 0; q < 3; q++) { nb[ix[t + q]].add(ix[t + (q + 1) % 3]); nb[ix[t + q]].add(ix[t + (q + 2) % 3]); }
  const cell = mm, grid = new Map();
  const key = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (const id of edgeNb.keys()) { const p = P[id]; const k = key(p.x, p.y, p.z); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(p); }
  const w = P.map((p, i) => {
    if (edgeNb.has(i)) return 1;
    let d = mm;
    const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell), cz = Math.floor(p.z / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++)
      for (const e of grid.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) d = Math.min(d, e.distanceTo(p));
    return 1 - smoothstep(d / mm);
  });
  const active = [];
  for (let i = 0; i < n; i++) if (w[i] > 0) active.push(i);
  const step = (lambda) => {
    const moves = active.map((i) => {
      const list = edgeNb.get(i) || [...nb[i]];
      const c = new THREE.Vector3();
      list.forEach((j) => c.add(P[j]));
      c.divideScalar(list.length).sub(P[i]);
      const en = edgeNb.get(i);
      if (en) { // an edge point only moves across the edge line (sliding along it skews the crown's last triangles)
        const t = P[en[1]].clone().sub(P[en[0]]);
        if (t.lengthSq() > 1e-12) { t.normalize(); c.addScaledVector(t, -c.dot(t)); }
      }
      return c.multiplyScalar(lambda * w[i]);
    });
    active.forEach((i, k) => P[i].add(moves[k]));
  };
  for (let pass = 0; pass < 20; pass++) { step(0.5); step(-0.53); }
  for (const i of active) pos.setXYZ(i, P[i].x, P[i].y, P[i].z);
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  return geo;
}

// the crown with its other holes (not the one the root closes, which starts at `joinedFirst`)
// filled with smooth patches: e.g. a segmented front tooth that is open on its inner side
function fillOtherHoles(crown, joinedFirst) {
  const loops = boundaryLoops(crown, 3).filter((L) => L.closed);
  const holes = loops.filter((L) => !(joinedFirst && L.pts.some((p) => p.distanceToSquared(joinedFirst) < 1e-12)));
  if (!holes.length) return crown;
  const pos = Array.from(crown.attributes.position.array);
  const faces = Array.from(crown.index.array);
  for (const L of holes) fillHole(pos, faces, L.ids);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(faces);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  crown.dispose();
  return geo;
}

// the crown with its shape untouched: no crown triangle is moved or removed. Only the open IPR
// region is filled: where the crown edge runs up the side (between the teeth) higher than `at` of
// the crown's height from the biting side (0 = biting side, 1 = the deepest point), that opening is
// closed with new triangles, bridged straight across at that height. Returns null if nothing was filled.
function trimCrown(crownGeo, axis, at, neighbours = null, only = null) {
  const crown = crownGeo.index ? crownGeo.clone() : mergeIndexed(crownGeo);
  const P = crown.attributes.position;
  const v = new THREE.Vector3();
  let top = Infinity, deep = -Infinity;
  for (let i = 0; i < P.count; i++) {
    const h = v.fromBufferAttribute(P, i).dot(axis);
    if (h < top) top = h;
    if (h > deep) deep = h;
  }
  const joinH = top + at * (deep - top);
  const filled = closeSides(crown, axis, joinH, neighbours, only);
  if (filled === crown) { crown.dispose(); return null; }
  filled.computeVertexNormals();
  filled.computeBoundingBox();
  return filled;
}

// Segmented crowns are often open at the sides (where they touched the next tooth): above the cut
// the crown edge then runs up the side toward the biting edge and back. Each such side opening is
// closed with its own smooth patch, bridged straight across at the cut, so the crown ends in one
// clean rim at the cut and the root does not have to reach up the sides.
function closeSides(geo, axis, joinH, neighbours = null, only = null) {
  const loops = boundaryLoops(geo, 3).filter((L) => L.closed);
  if (!loops.length) return geo;
  const main = loops.reduce((a, b) => (b.perimeter > a.perimeter ? b : a));
  const ids = main.ids;
  const n = ids.length;
  const pos = Array.from(geo.attributes.position.array);
  const faces = Array.from(geo.index.array);
  const H = (id) => pos[id * 3] * axis.x + pos[id * 3 + 1] * axis.y + pos[id * 3 + 2] * axis.z;
  // the IPR region: the edge points within CONTACT_MM of a neighbouring crown (where the crowns
  // touched). Without neighbours (or no clear contact) it is the edge above `joinH`, as before.
  let above = contactRuns(ids, pos, neighbours);
  let iprBy = `where the next crown is within ${CONTACT_MM} mm`;
  let weakRuns = 0, addedRuns = 0;
  const high = ids.map((id) => H(id) < joinH - 0.05);
  if (!above) {
    above = high;
    iprBy = `above ${Math.round(JOIN_AT * 100)}%`;
  } else {
    // a side opening that hardly touches the next crown (moved teeth no longer touch where the
    // scan was open) is still filled whole, by the height rule; else the band would have to cover
    // it and hung down in folds
    const nn = ids.length;
    const s0 = high.findIndex((x) => !x);
    let added = 0, weak = 0;
    if (s0 >= 0) for (let q = 0; q < nn; q++) {
      const i = (s0 + q) % nn;
      if (!high[i] || high[(i - 1 + nn) % nn]) continue;
      let len = 0, touch = 0;
      while (high[(i + len) % nn] && len < nn) { if (above[(i + len) % nn]) touch++; len++; }
      if (touch < CONTACT_SHARE * len) {
        if (!only || only.includes(weak)) {
          for (let k = 0; k < len; k++) above[(i + k) % nn] = true;
          added++;
        }
        weak++;
      }
    }
    weakRuns = weak; addedRuns = added;
    if (added) iprBy += ` (+${added} opening${added > 1 ? "s" : ""} above ${Math.round(JOIN_AT * 100)}%)`;
  }
  const start = above.findIndex((x) => !x);
  if (start < 0 || !above.some(Boolean)) return geo;
  const P = (id) => new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
  // the crown's surface direction at an edge point, from the crown triangles within NORMAL_MM of
  // it (the edge points sit on tiny cut triangles, so their own normals are noisy and gave a thin
  // line where the fill meets the crown)
  const crownFaces = faces.length;
  const fN = [], fC = [], cell = NORMAL_MM, fGrid = new Map();
  const gk = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (let t = 0; t < crownFaces; t += 3) {
    const a = P(faces[t]), b = P(faces[t + 1]), c = P(faces[t + 2]);
    const nn = b.clone().sub(a).cross(c.clone().sub(a)); // length = twice the area
    const cc = a.add(b).add(c).divideScalar(3);
    const k = gk(cc.x, cc.y, cc.z);
    if (!fGrid.has(k)) fGrid.set(k, []);
    fGrid.get(k).push(fN.length);
    fN.push(nn); fC.push(cc);
  }
  // the crown triangles at an edge point (its last row): the fill carries exactly that slope on
  const facesAt = new Map();
  for (let t = 0; t < crownFaces; t += 3) for (let q = 0; q < 3; q++) {
    const v = faces[t + q];
    if (!facesAt.has(v)) facesAt.set(v, []);
    facesAt.get(v).push(t / 3);
  }
  const normalAt = (id) => {
    const own = new THREE.Vector3();
    for (const f of facesAt.get(id) || []) own.add(fN[f]);
    if (own.lengthSq() > 1e-16) return own.normalize();
    const p = P(id), n = new THREE.Vector3();
    const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell), cz = Math.floor(p.z / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      for (const f of fGrid.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) {
        const d = fC[f].distanceTo(p);
        if (d < cell) n.addScaledVector(fN[f], 1 - d / cell);
      }
    }
    return n.lengthSq() > 0 ? n.normalize() : n;
  };
  let changed = false;
  for (let q = 0; q < n; q++) {
    const i = (start + q) % n;
    if (above[i] || !above[(i + 1) % n]) continue;
    // a run of points above the cut starts after i; find where it comes back down
    let j = (i + 1) % n, len = 0;
    while (above[j] && len < n) { j = (j + 1) % n; len++; }
    const A = ids[i], B = ids[j];
    const run = [];
    for (let k = (i + 1) % n; k !== j; k = (k + 1) % n) run.push(ids[k]);
    // the opening is filled row by row (see fillSide); its bottom row, at the join height, is the
    // bridge the root joins to. If the opening has no clear tip, a straight bridge and a plain patch.
    if (!fillSide(pos, faces, A, run, B, H, normalAt)) {
      const pa = P(A), pb = P(B);
      const steps = Math.max(1, Math.round(pa.distanceTo(pb) / 0.3));
      const bridge = [];
      for (let k = 1; k < steps; k++) {
        const p = pb.clone().lerp(pa, k / steps);
        pos.push(p.x, p.y, p.z);
        bridge.push(pos.length / 3 - 1);
      }
      fillHole(pos, faces, [A, ...run, B, ...bridge]);
    }
    changed = true;
  }
  if (!changed) return geo;
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setIndex(faces);
  out.userData.iprBy = iprBy;
  out.userData.weakRuns = weakRuns;
  out.userData.addedRuns = addedRuns;
  geo.dispose();
  return out;
}

// which edge points (ids, in order round the edge) lie within CONTACT_MM of a neighbouring crown.
// Small gaps in a contact stretch are closed and very short stretches dropped. Returns null when
// there are no neighbours or no contact stretch.
function contactRuns(ids, pos, neighbours) {
  if (!neighbours || !neighbours.length) return null;
  const n = ids.length;
  const cell = 1;
  const grid = new Map();
  const key = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  const tris = [];
  const edgeBox = new THREE.Box3();
  for (const id of ids) edgeBox.expandByPoint(new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]));
  edgeBox.expandByScalar(CONTACT_MM + 0.01);
  for (const g of neighbours) {
    const P = g.attributes.position;
    const ix = g.index ? g.index.array : null;
    const count = ix ? ix.length : P.count;
    for (let t = 0; t < count; t += 3) {
      const a = new THREE.Vector3().fromBufferAttribute(P, ix ? ix[t] : t);
      const b = new THREE.Vector3().fromBufferAttribute(P, ix ? ix[t + 1] : t + 1);
      const c = new THREE.Vector3().fromBufferAttribute(P, ix ? ix[t + 2] : t + 2);
      const box = new THREE.Box3().setFromPoints([a, b, c]);
      if (!box.intersectsBox(edgeBox)) continue;
      const tri = new THREE.Triangle(a, b, c);
      const k = tris.length;
      tris.push(tri);
      box.expandByScalar(CONTACT_MM);
      for (let x = Math.floor(box.min.x / cell); x <= Math.floor(box.max.x / cell); x++)
        for (let y = Math.floor(box.min.y / cell); y <= Math.floor(box.max.y / cell); y++)
          for (let z = Math.floor(box.min.z / cell); z <= Math.floor(box.max.z / cell); z++) {
            const kk = `${x},${y},${z}`;
            if (!grid.has(kk)) grid.set(kk, []);
            grid.get(kk).push(k);
          }
    }
  }
  if (!tris.length) return null;
  const p = new THREE.Vector3(), cp = new THREE.Vector3();
  const near = ids.map((id) => {
    p.set(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
    for (const k of grid.get(key(p.x, p.y, p.z)) || []) {
      tris[k].closestPointToPoint(p, cp);
      if (cp.distanceToSquared(p) < CONTACT_MM * CONTACT_MM) return true;
    }
    return false;
  });
  // close gaps of up to GAP points inside a contact stretch, then drop stretches shorter than MIN
  const GAP = 4, MIN = 8;
  const runs = (mask, want) => {
    const out = [];
    const s0 = mask.findIndex((x) => x !== want);
    if (s0 < 0) return out;
    for (let q = 0; q < n; q++) {
      const i = (s0 + q) % n;
      if (mask[i] !== want || mask[(i - 1 + n) % n] === want) continue;
      let len = 0;
      while (mask[(i + len) % n] === want && len < n) len++;
      out.push([i, len]);
    }
    return out;
  };
  for (const [i, len] of runs(near, false)) if (len <= GAP) for (let q = 0; q < len; q++) near[(i + q) % n] = true;
  for (const [i, len] of runs(near, true)) if (len < MIN) for (let q = 0; q < len; q++) near[(i + q) % n] = false;
  // nearly the whole edge touching the next crowns (crowns that overlap a lot): no clear IPR region
  const count = near.filter(Boolean).length;
  if (!count || count > 0.75 * n) return null;
  return near;
}

// fills one side (IPR) opening row by row: the opening's two edges (from A and from B up to the
// opening's tip) are walked together, and each row joins a point on one edge to a point on the other.
// The bottom row is the bridge (where the root joins). Rows never cross, so there are no folded
// triangles. Returns false if the opening has no clear tip (then fillHole is used).
function fillSide(pos, faces, A, run, B, H, normalAt) {
  if (run.length < 3) return false;
  let k = 0;
  run.forEach((id, q) => { if (H(id) < H(run[k])) k = q; });
  if (k === 0 || k === run.length - 1) return false;
  const left = [A, ...run.slice(0, k + 1)];
  const right = [B, ...run.slice(k).reverse()];
  const P = (id) => new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
  const progress = (ids) => {
    const out = [0];
    for (let i = 1; i < ids.length; i++) out.push(out[i - 1] + P(ids[i]).distanceTo(P(ids[i - 1])));
    const tot = out[out.length - 1] || 1;
    return { t: out.map((x) => x / tot), tot };
  };
  const pl = progress(left), pr = progress(right);
  const firstVert = pos.length / 3; // points from here on are new
  const sp = Math.min(0.5, Math.max(0.2, (pl.tot + pr.tot) / (left.length + right.length - 2)));
  const add = (p) => { pos.push(p.x, p.y, p.z); return pos.length / 3 - 1; };
  // at each edge point: the direction the crown's surface carries on into the opening
  // (along the surface, across the edge)
  const across = new Map();
  const chainDir = (chain, i) => P(chain[Math.min(chain.length - 1, i + 1)]).sub(P(chain[Math.max(0, i - 1)]));
  const inward = (id) => { // middle of the crown points next to `id` (they lie on the crown side of the edge)
    const c = new THREE.Vector3();
    let n = 0;
    for (let t = 0; t < faces.length; t += 3) {
      if (faces[t] !== id && faces[t + 1] !== id && faces[t + 2] !== id) continue;
      for (let q = 0; q < 3; q++) if (faces[t + q] !== id) { c.add(P(faces[t + q])); n++; }
    }
    return n ? c.divideScalar(n) : P(id);
  };
  const setAcross = (chain) => chain.forEach((id, i) => {
    if (across.has(id)) return;
    const t = normalAt(id).cross(chainDir(chain, i));
    if (t.dot(P(id).sub(inward(id))) < 0) t.negate(); // away from the crown, into the opening
    across.set(id, t);
  });
  setAcross(left); setAcross(right);
  // the exact (unsmoothed) directions: used only right at the crown edge, so the fill meets the crown
  // with the crown's own slope; the rest of the fill follows the smoothed ones (no wrinkles)
  const acrossExact = new Map(across);
  // smooth those directions along each edge, so neighbouring rows bend alike (no steps)
  const smoothAcross = (chain) => {
    let v = chain.map((id) => { const t = across.get(id).clone(); return t.lengthSq() > 1e-12 ? t.normalize() : t; });
    for (let it = 0; it < ACROSS_SMOOTH; it++) {
      v = v.map((t, i) => t.clone().multiplyScalar(0.5).addScaledVector(v[Math.max(0, i - 1)], 0.25).addScaledVector(v[Math.min(v.length - 1, i + 1)], 0.25));
    }
    chain.forEach((id, i) => { if (i < chain.length - 1) across.set(id, v[i]); }); // (the tip is shared by both edges)
  };
  smoothAcross(left); smoothAcross(right);
  // a point (and its "into the opening" direction) part way `u` (0..1, by length) along an edge
  const sample = (chain, prog, u, map = across) => {
    let q = 0;
    while (q < chain.length - 2 && prog.t[q + 1] < u) q++;
    const f = Math.min(1, Math.max(0, (u - prog.t[q]) / Math.max(1e-9, prog.t[q + 1] - prog.t[q])));
    const p = P(chain[q]).lerp(P(chain[q + 1]), f);
    const d = map.get(chain[q]).clone().lerp(map.get(chain[Math.min(q + 1, chain.length - 2)]), f);
    const nrm = normalAt(chain[q]).lerp(normalAt(chain[q + 1]), f).normalize();
    return { p, d, nrm };
  };
  // each row is a curve that leaves both edges along the crown's surface, so the fill carries on
  // the crown's curve (no flat wedge, no crease at the edge). Rows are evenly spaced and all have
  // the same number of points: a regular grid, so no lines show in the fill.
  const sAt = (q, m) => q / (m + 1); // where the q-th of m points sits along a row (0..1)
  const rowAt = (a, da, b, db, m, keep, na = null, nb = null, daFit = null, dbFit = null) => {
    const D = a.distanceTo(b);
    const ab = b.clone().sub(a);
    const dirAt = (d, toward, nrm) => { // into the opening, never back over the crown
      const t = d.clone();
      const tw = toward.clone().normalize();
      // turned toward the other side only within the crown's own surface (else a line at the edge)
      if (nrm && nrm.lengthSq() > 0.5) {
        const tp = tw.clone().addScaledVector(nrm, -tw.dot(nrm));
        if (tp.lengthSq() > 0.01) tw.copy(tp.normalize());
      }
      if (t.lengthSq() < 1e-12) return tw;
      t.normalize();
      const dn = t.clone();
      const s = t.dot(tw);
      if (s < 0.3) t.addScaledVector(tw, 0.3 - s).normalize();
      // but always mostly straight across the edge (never sliding along it, which folds the fill)
      const c = t.dot(dn);
      if (c < 0.7) t.addScaledVector(dn, 0.7 - c).normalize();
      return t;
    };
    const ta = dirAt(da, ab, na), tb = dirAt(db, ab.clone().negate(), nb).negate(); // both from a toward b
    const row = [];
    row.ta = ta; row.tb = tb;
    row.taFit = daFit ? dirAt(daFit, ab, na) : ta;
    row.tbFit = dbFit ? dirAt(dbFit, ab.clone().negate(), nb).negate() : tb;
    for (let q = 1; q <= m; q++) {
      const s = sAt(q, m), s2 = s * s, s3 = s2 * s;
      row.push(keep(a.clone().multiplyScalar(2 * s3 - 3 * s2 + 1)
        .addScaledVector(ta, (s3 - 2 * s2 + s) * D * SIDE_ROUND)
        .addScaledVector(b, -2 * s3 + 3 * s2)
        .addScaledVector(tb, (s3 - s2) * D * SIDE_ROUND)));
    }
    return row;
  };
  const start = faces.length;
  const tri = (a, b, c) => { if (a !== b && b !== c && a !== c) faces.push(a, b, c); };
  let widest = P(A).distanceTo(P(B));
  const nRows = Math.max(2, Math.round(Math.max(pl.tot, pr.tot) / sp));
  for (let r = 1; r < nRows; r++) widest = Math.max(widest, sample(left, pl, r / nRows).p.distanceTo(sample(right, pr, r / nRows).p));
  const m = Math.max(1, Math.min(60, Math.round(widest / sp) - 1));
  // grid[r][c]: row r (0 = the bridge at the join height, up to just below the tip), column c
  const grid = [], ends = [];
  for (let r = 0; r < nRows; r++) {
    const u = r / nRows;
    const L = r === 0 ? { p: P(A), d: across.get(A), nrm: normalAt(A) } : sample(left, pl, u);
    const R = r === 0 ? { p: P(B), d: across.get(B), nrm: normalAt(B) } : sample(right, pr, u);
    const Lx = r === 0 ? acrossExact.get(A) : sample(left, pl, u, acrossExact).d;
    const Rx = r === 0 ? acrossExact.get(B) : sample(right, pr, u, acrossExact).d;
    grid.push(rowAt(L.p, L.d, R.p, R.d, m, add, L.nrm, R.nrm, Lx, Rx));
    ends.push([L.p, R.p]);
  }
  // how far each row bulges out from the straight line between its ends, evened out from row to
  // row (over about 1.5 mm): where the opening is narrow (a "waist") the fill stays as full as the
  // rows around it, instead of pinching in
  const bulge = grid.map((row, r) => row.map((id, q) => P(id).sub(ends[r][0].clone().lerp(ends[r][1], sAt(q + 1, m)))));
  let bz = bulge;
  const passes = Math.min(400, Math.round(2 * (1.5 / sp) * (1.5 / sp)));
  for (let it = 0; it < passes; it++) {
    bz = bz.map((row, r) => row.map((o, q) => o.clone().multiplyScalar(0.5)
      .addScaledVector(bz[Math.max(0, r - 1)][q], 0.25).addScaledVector(bz[Math.min(nRows - 1, r + 1)][q], 0.25)));
  }
  grid.forEach((row, r) => row.forEach((id, q) => {
    const p = ends[r][0].clone().lerp(ends[r][1], sAt(q + 1, m)).add(bz[r][q]);
    pos[id * 3] = p.x; pos[id * 3 + 1] = p.y; pos[id * 3 + 2] = p.z;
  }));
  // a sharp corner in the crown's edge would otherwise run straight across the fill as a ridge:
  // even out each column from row to row, fully in the middle of the fill and not at all at the
  // crown (where the fill has to follow the crown's edge)
  for (let it = 0; it < passes; it++) {
    for (let r = 1; r + 1 < nRows; r++) {
      for (let q = 0; q < m; q++) {
        const w = 0.5 * Math.sin(Math.PI * sAt(q + 1, m));
        const id = grid[r][q], up = grid[r + 1][q], dn = grid[r - 1][q];
        for (let k = 0; k < 3; k++) pos[id * 3 + k] += w * ((pos[up * 3 + k] + pos[dn * 3 + k]) / 2 - pos[id * 3 + k]);
      }
    }
  }
  // the points next to the crown are put exactly on the line the crown's surface carries on
  // along (the second ones part way), so the fill leaves the crown with the crown's own slope and
  // no thin line shows where they meet
  grid.forEach((row, r) => {
    const fit = (id, from, t, f) => {
      const p = P(id), want = from.clone().addScaledVector(t, p.distanceTo(from));
      p.lerp(want, f);
      pos[id * 3] = p.x; pos[id * 3 + 1] = p.y; pos[id * 3 + 2] = p.z;
    };
    const [a, b] = ends[r];
    const back = row.tbFit.clone().negate(); // from b into the opening
    fit(row[0], a, row.taFit, 1); fit(row[m - 1], b, back, 1);
    if (m > 3) { fit(row[1], a, row.taFit, 0.4); fit(row[m - 2], b, back, 0.4); }
  });
  const bridge = grid[0];
  const tip = left[left.length - 1];
  // between rows: two triangles per grid square
  for (let r = 0; r + 1 < nRows; r++) {
    for (let c = 0; c + 1 < m; c++) {
      tri(grid[r][c], grid[r][c + 1], grid[r + 1][c]);
      tri(grid[r][c + 1], grid[r + 1][c + 1], grid[r + 1][c]);
    }
  }
  for (let c = 0; c + 1 < m; c++) tri(grid[nRows - 1][c], grid[nRows - 1][c + 1], tip); // top row to the tip
  // the edges of the opening (the crown's own points) to the grid's first and last columns
  const rowU = [...grid.map((_, r) => r / nRows), 1];
  const zip = (X, tX, Y, tY) => { // X on the left, Y on the right, both going up to the tip
    let i = 0, j = 0;
    while (i < X.length - 1 || j < Y.length - 1) {
      const ni = i < X.length - 1 ? tX[i + 1] : Infinity, nj = j < Y.length - 1 ? tY[j + 1] : Infinity;
      if (ni <= nj) { tri(X[i], Y[j], X[i + 1]); i++; }
      else { tri(Y[j], Y[j + 1], X[i]); j++; }
    }
  };
  zip(left, pl.t, [...grid.map((row) => row[0]), tip], rowU);
  zip([...grid.map((row) => row[m - 1]), tip], rowU, right, pr.t);
  // the patch must use the crown's edge A - left[1] the other way round from the crown's own triangle
  const dirIn = (from, to) => {
    for (let t = from; t < to; t += 3) {
      const f = [faces[t], faces[t + 1], faces[t + 2]];
      const ia = f.indexOf(A), ib = f.indexOf(left[1]);
      if (ia >= 0 && ib >= 0) return (ia + 1) % 3 === ib ? 1 : -1;
    }
    return 0;
  };
  // a light smoothing of the new points only (keeps the size: no shrinking). The bridge and the
  // two columns next to the crown stay put, so the fill keeps leaving the crown at the crown's slope.
  const onBridge = new Set([...bridge, ...grid.map((row) => row[0]), ...grid.map((row) => row[m - 1])]);
  const nb = new Map();
  for (let t = start; t < faces.length; t += 3) {
    const f = [faces[t], faces[t + 1], faces[t + 2]];
    for (let q = 0; q < 3; q++) {
      const a = f[q];
      if (a < firstVert || onBridge.has(a)) continue;
      if (!nb.has(a)) nb.set(a, new Set());
      nb.get(a).add(f[(q + 1) % 3]); nb.get(a).add(f[(q + 2) % 3]);
    }
  }
  relax(pos, [...nb.keys()], nb, 40, true);
  const crownDir = dirIn(0, start), patchDir = dirIn(start, faces.length);
  if (crownDir && patchDir === crownDir) for (let u = start; u < faces.length; u += 3) { const x = faces[u + 1]; faces[u + 1] = faces[u + 2]; faces[u + 2] = x; }
  return true;
}

// ---------- closing the gap between crown and root ----------
// The crown is an open shell. To make crown + root one closed tooth, the root is cut a little
// below the crown edge, and a band of triangles (the "collar") joins the crown's own edge points
// to that cut, so the gap is filled exactly (crown edge -> collar -> root, no holes).
// Without an open crown edge the root is returned as it is.
function joinToCrown(rootGeo, crownLoop, c0, axis, crownGeo) {
  rootGeo.userData.closedToCrown = false;
  if (!crownLoop || crownLoop.length < 8) {
    rootGeo.computeBoundingBox();
    return rootGeo;
  }
  try {
    const root = mergeIndexed(rootGeo);
    const { u, w } = planeAxes(axis);
    const local = (p) => { const d = p.clone().sub(c0); return { x: d.dot(u), y: d.dot(w), h: d.dot(axis) }; };
    const area = (pts) => {
      let A = 0;
      for (let i = 0; i < pts.length; i++) {
        const a = local(pts[i]), b = local(pts[(i + 1) % pts.length]);
        A += a.x * b.y - a.y * b.x;
      }
      return Math.sign(A);
    };
    let zDeep = -Infinity;
    crownLoop.forEach((p) => { zDeep = Math.max(zDeep, local(p).h); });

    // cut the root straight across LOFT_MM below the crown edge (higher up if the roots have
    // already split there, so the cut gives one rim)
    let below = null, loops = [];
    // a one-piece root made of rings: it is not cut across (a cut gives a ragged rim, which showed as
    // a jagged line where the band meets the root); its first ring that lies fully LOFT_MM below the
    // crown edge becomes the rim, and the rings above it are dropped
    const ringN = rootGeo.userData.ringN, ringCount = rootGeo.userData.ringCount;
    if (ringN && ringCount && rootGeo.index) {
      const RP = rootGeo.attributes.position;
      const loft = rootGeo.userData.loftMm ?? LOFT_MM;
      let pick = -1;
      for (const f of [1, 0.75, 0.5, 0.3]) {
        for (let r = 1; r < ringCount - 2 && pick < 0; r++) {
          let lo = Infinity;
          for (let i = 0; i < ringN; i++) lo = Math.min(lo, local(new THREE.Vector3().fromBufferAttribute(RP, r * ringN + i)).h);
          if (lo >= zDeep + loft * f) pick = r;
        }
        if (pick >= 0) break;
      }
      if (pick >= 0) {
        const first = pick * ringN;
        const arr = Array.from(RP.array).slice(first * 3);
        const ix = [];
        const src = rootGeo.index.array;
        for (let t = 0; t < src.length; t += 3) {
          if (src[t] < first || src[t + 1] < first || src[t + 2] < first) continue;
          ix.push(src[t] - first, src[t + 1] - first, src[t + 2] - first);
        }
        below = new THREE.BufferGeometry();
        below.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        below.setIndex(ix);
        loops = [{ ids: Array.from({ length: ringN }, (_, i) => i), closed: true }];
      }
    }
    if (!below) for (const f of [1, 0.75, 0.5, 0.3]) {
      const cutH = zDeep + (rootGeo.userData.loftMm ?? LOFT_MM) * f;
      below = cutBelow(root, c0, axis, () => cutH);
      loops = boundaryLoops(below).filter((L) => L.closed);
      if (loops.length === 1) break;
    }
    if (loops.length !== 1) throw new Error(`cut gave ${loops.length} rims`);
    const rimIds = loops[0].ids;
    const rimPts = rimIds.map((id) => new THREE.Vector3().fromBufferAttribute(below.attributes.position, id));

    // both rims go round the same way as the crown edge
    const L = crownLoop;
    const sL = area(L);
    let R = rimPts.map((p, q) => ({ p, id: rimIds[q] }));
    if (area(rimPts) !== sL) R.reverse();

    // which way the crown's wall is heading at each edge point (so the band carries it on)
    const T = edgeContinue(L, crownGeo, axis);
    // which way the root's own surface is heading at each rim point (down the root), so the band
    // arrives along the root and there is no line where the band meets the root
    const rimDir = (() => {
      const bp = below.attributes.position, bi = below.index.array;
      const nb = new Map();
      for (let t = 0; t < bi.length; t += 3) for (let q = 0; q < 3; q++) {
        const a = bi[t + q];
        if (!nb.has(a)) nb.set(a, new Set());
        nb.get(a).add(bi[t + (q + 1) % 3]); nb.get(a).add(bi[t + (q + 2) % 3]);
      }
      const at = (id) => new THREE.Vector3().fromBufferAttribute(bp, id);
      const dirs = R.map((r) => {
        // points up to 3 steps from the rim point that lie deeper along the tooth
        const p = r.p, h0 = p.dot(axis);
        let front = [r.id];
        const seen = new Set(front);
        const d = new THREE.Vector3();
        for (let step = 0; step < 3; step++) {
          const next = [];
          for (const a of front) for (const b of nb.get(a) || []) if (!seen.has(b)) { seen.add(b); next.push(b); }
          for (const b of next) {
            const q = at(b).sub(p);
            const dh = q.dot(axis);
            if (dh > 0.05) d.addScaledVector(q, 1 / q.length());
          }
          front = next;
        }
        if (d.dot(axis) <= 0) return axis.clone();
        return d.normalize();
      });
      // smooth along the rim
      for (let pass = 0; pass < 6; pass++) {
        const old = dirs.map((v) => v.clone());
        for (let q = 0; q < dirs.length; q++) dirs[q].copy(old[(q - 1 + old.length) % old.length]).add(old[q]).add(old[q]).add(old[(q + 1) % old.length]).normalize();
      }
      return dirs;
    })();
    // every ring of the band has one point per crown edge point (so the band starts on the crown
    // edge with no long thin triangles); the root rim is sampled at the same places along its length
    const M = L.length;
    const Lres = L;
    const Tres = L.map((p, q) => p.clone().add(T[q]));
    const frac = [0];
    for (let q = 1; q < M; q++) frac.push(frac[q - 1] + L[q].distanceTo(L[q - 1]));
    const Ltot = frac[M - 1] + L[M - 1].distanceTo(L[0]);
    for (let q = 0; q < M; q++) frac[q] /= Ltot;
    const sampleAt = (pts, off) => {
      const cum = [0];
      for (let q = 1; q <= pts.length; q++) cum.push(cum[q - 1] + pts[q % pts.length].distanceTo(pts[q - 1]));
      const tot = cum[pts.length];
      let k = 0;
      const order = frac.map((f, q) => [((f + off) % 1) * tot, q]).sort((a, b) => a[0] - b[0]);
      const out = new Array(M);
      for (const [target, q] of order) {
        while (k < pts.length - 1 && cum[k + 1] < target) k++;
        const seg = cum[k + 1] - cum[k];
        out[q] = pts[k].clone().lerp(pts[(k + 1) % pts.length], seg > 0 ? Math.min(1, Math.max(0, (target - cum[k]) / seg)) : 0);
      }
      return out;
    };
    // turn the root rim so its points sit across from the crown edge's points
    const Rpts = R.map((r) => r.p);
    let bestOff = 0, best = Infinity;
    const Ll = L.map(local);
    for (let sh = 0; sh < 256; sh++) {
      const cand = sampleAt(Rpts, sh / 256);
      let sum = 0;
      for (let q = 0; q < M; q += 2) {
        const a = Ll[q], b = local(cand[q]);
        sum += (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      }
      if (sum < best) { best = sum; bestOff = sh / 256; }
    }
    const Rres = sampleAt(Rpts, bestOff);
    const RDres = sampleAt(R.map((r, q) => r.p.clone().addScaledVector(rimDir[q], 0.01)), bestOff);
    const t1s = Rres.map((p, j) => {
      const t = RDres[j].clone().sub(p);
      return t.dot(axis) > 0.001 ? t.normalize() : axis.clone();
    });
    // start the exact root rim at its point nearest to Rres[0]
    let r0 = 0, rd = Infinity;
    R.forEach((r, q) => { const d = r.p.distanceToSquared(Rres[0]); if (d < rd) { rd = d; r0 = q; } });
    R = R.slice(r0).concat(R.slice(0, r0));

    // the band: ring 0 = the crown edge itself, ring K = the root rim; in between, the shape
    // changes smoothly from the crown edge's outline to the root's (it leaves the crown edge
    // going straight along the tooth, so the crown's wall simply carries on)
    const K = LOFT_RINGS;
    const pos = Array.from(below.attributes.position.array);
    const addPoint = (p) => { pos.push(p.x, p.y, p.z); return pos.length / 3 - 1; };
    const crownIds = L.map(addPoint);
    const rings = [];
    // each band line is a smooth curve (Hermite): it leaves the crown edge in the direction of the
    // crown's wall and arrives at the root rim running along the tooth
    const t0x = Lres.map((p, j) => Tres[j].clone().sub(p).normalize()); // exact, for the first ring
    // smoothed along the edge for the band's shape (the exact ones are noisy and gave lines down the band)
    let t0s = t0x.map((t) => t.clone());
    for (let pass = 0; pass < 30; pass++) {
      t0s = t0s.map((d, i) => d.clone().multiplyScalar(0.5).addScaledVector(t0s[(i - 1 + M) % M], 0.25).addScaledVector(t0s[(i + 1) % M], 0.25).normalize());
    }
    for (let k = 1; k < K; k++) {
      const s = k / K;
      const h00 = 2 * s ** 3 - 3 * s ** 2 + 1, h10 = s ** 3 - 2 * s ** 2 + s, h01 = -2 * s ** 3 + 3 * s ** 2, h11 = s ** 3 - s ** 2;
      const ring = [];
      for (let j = 0; j < M; j++) {
        const P0 = Lres[j], P1 = Rres[j];
        const D = P0.distanceTo(P1);
        const p = P0.clone().multiplyScalar(h00)
          .addScaledVector(t0s[j], h10 * D)
          .addScaledVector(P1, h01)
          .addScaledVector(t1s[j], h11 * D);
        ring.push(addPoint(p));
      }
      rings.push(ring);
    }
    // the first ring lies exactly on the crown's own slope past the edge (and the second ring half
    // way), so the band carries the crown's surface on with no crease along the crown edge
    for (let k = 0; k < Math.min(2, rings.length); k++) {
      const wgt = k === 0 ? 1 : 0.5;
      rings[k].forEach((id, j) => {
        const P0 = Lres[j], t = t0x[j];
        const p = new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
        const d = Math.max(0.01, p.clone().sub(P0).dot(t));
        const onSlope = P0.clone().addScaledVector(t, d);
        p.lerp(onSlope, wgt);
        pos[id * 3] = p.x; pos[id * 3 + 1] = p.y; pos[id * 3 + 2] = p.z;
      });
    }
    const faces = Array.from(below.index.array);
    // rings of the same length: plain strips (edge a(i)->a(i+1) is used backwards, like the crown edge)
    const strip = (A, B) => {
      for (let q = 0; q < A.length; q++) {
        const a = A[q], a1 = A[(q + 1) % A.length], b = B[q], b1 = B[(q + 1) % B.length];
        faces.push(a1, a, b, a1, b, b1);
      }
    };
    // rings of different length: zip them together by how far round each point is
    const progress = (pts) => {
      const out = [0];
      let acc = 0;
      for (let i = 1; i < pts.length; i++) { acc += pts[i].distanceTo(pts[i - 1]); out.push(acc); }
      acc += pts[pts.length - 1].distanceTo(pts[0]);
      return out.map((x) => x / Math.max(acc, 1e-9));
    };
    const P = (id) => new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
    const zip = (A, B) => {
      const tA = progress(A.map(P)), tB = progress(B.map(P));
      const nA = A.length, nB = B.length;
      let i = 0, j = 0;
      while (i < nA || j < nB) {
        const nextA = i < nA ? (i + 1 < nA ? tA[i + 1] : 1) : Infinity;
        const nextB = j < nB ? (j + 1 < nB ? tB[j + 1] : 1) : Infinity;
        const a = A[i % nA], a1 = A[(i + 1) % nA], b = B[j % nB], b1 = B[(j + 1) % nB];
        if (nextA <= nextB) { faces.push(a1, a, b); i++; }
        else { faces.push(a, b, b1); j++; }
      }
    };
    const bandStart = faces.length;
    strip(crownIds, rings[0]);
    for (let k = 0; k + 1 < rings.length; k++) strip(rings[k], rings[k + 1]);
    zip(rings[rings.length - 1], R.map((r) => r.id));

    // relax the band (crown edge and root rim stay where they are): where the crown edge runs up
    // round an open part of the crown, the band becomes a smooth curved patch, not a curtain
    {
      const free = new Set();
      // the first ring stays where it is: it carries the crown's wall on, so there is no crease at the crown edge
      rings.forEach((ring, k) => { if (k > 0) ring.forEach((id) => free.add(id)); });
      const nb = new Map();
      const link = (a, b) => { if (free.has(a)) { if (!nb.has(a)) nb.set(a, new Set()); nb.get(a).add(b); } };
      for (let t = bandStart; t < faces.length; t += 3) {
        const a = faces[t], b = faces[t + 1], c = faces[t + 2];
        link(a, b); link(a, c); link(b, a); link(b, c); link(c, a); link(c, b);
      }
      relax(pos, [...free], nb, LOFT_RELAX, true);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(faces);
    dropFlat(geo);
    geo.computeVertexNormals();
    geo.computeBoundingBox();
    geo.userData.closedToCrown = true;
    geo.userData.joinedLoopFirst = crownLoop[0].clone(); // which crown hole the root closes
    return geo;
  } catch (err) {
    console.warn("[Root] could not join root to crown edge:", err.message);
    rootGeo.computeBoundingBox();
    return rootGeo;
  }
}

// smooths the given vertices toward their neighbours. keepVolume: Taubin smoothing (a step in,
// a slightly bigger step out), so the surface gets smoother without shrinking into a groove
function relax(pos, ids, nb, passes, keepVolume) {
  const step = (f) => {
    const next = new Map();
    for (const id of ids) {
      let x = 0, y = 0, z = 0, n = 0;
      for (const m of nb.get(id) || []) { x += pos[m * 3]; y += pos[m * 3 + 1]; z += pos[m * 3 + 2]; n++; }
      if (n) next.set(id, [
        pos[id * 3] + f * (x / n - pos[id * 3]),
        pos[id * 3 + 1] + f * (y / n - pos[id * 3 + 1]),
        pos[id * 3 + 2] + f * (z / n - pos[id * 3 + 2]),
      ]);
    }
    for (const [id, p] of next) { pos[id * 3] = p[0]; pos[id * 3 + 1] = p[1]; pos[id * 3 + 2] = p[2]; }
  };
  for (let it = 0; it < passes; it++) {
    step(0.5);
    if (keepVolume) step(-0.53);
  }
}

// fills a hole (boundary vertex ids, in the order the mesh uses them) with a smooth curved patch:
// rings that close in toward the middle, then relaxed like a soap film. Adds to pos/faces.
function fillHole(pos, faces, loopIds, bulge = null) {
  const P = (id) => new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
  const pts = loopIds.map(P);
  const mid = new THREE.Vector3();
  pts.forEach((p) => mid.add(p));
  mid.divideScalar(pts.length);
  const add = (p) => { pos.push(p.x, p.y, p.z); return pos.length / 3 - 1; };
  const n = loopIds.length;
  const K = Math.max(2, Math.min(10, Math.round(n / 6)));
  const start = faces.length;
  const free = [];
  const depthOf = new Map(); // vertex -> how far in from the edge (0..1)
  let prev = loopIds;
  for (let k = 1; k < K; k++) {
    const m = Math.max(3, Math.round(n * (1 - k / K)));
    const ring = resampleClosed(pts, m).map((p) => add(p.lerp(mid, k / K)));
    ring.forEach((id) => depthOf.set(id, k / K));
    free.push(...ring);
    zipRings(pos, faces, prev, ring);
    prev = ring;
  }
  const c = add(mid);
  depthOf.set(c, 1);
  free.push(c);
  for (let q = 0; q < prev.length; q++) faces.push(prev[(q + 1) % prev.length], prev[q], c);
  const nb = new Map();
  const fs = new Set(free);
  const link = (a, b) => { if (fs.has(a)) { if (!nb.has(a)) nb.set(a, new Set()); nb.get(a).add(b); } };
  for (let t = start; t < faces.length; t += 3) {
    const a = faces[t], b = faces[t + 1], cc = faces[t + 2];
    link(a, b); link(a, cc); link(b, a); link(b, cc); link(cc, a); link(cc, b);
  }
  relax(pos, free, nb, 40, false);
  // bulge: push the patch outward (away from the tooth's middle line) like a rounded tooth side
  if (bulge) {
    let r = 0;
    pts.forEach((p) => { r += p.distanceTo(mid); });
    r /= pts.length;
    const dir = mid.clone().sub(bulge.center);
    dir.addScaledVector(bulge.axis, -dir.dot(bulge.axis));
    if (dir.lengthSq() > 1e-6) {
      dir.normalize();
      const amount = Math.min(0.8, 0.18 * r);
      for (const id of free) {
        const d = depthOf.get(id) || 0;
        const f = amount * (1 - (1 - d) * (1 - d));
        pos[id * 3] += dir.x * f; pos[id * 3 + 1] += dir.y * f; pos[id * 3 + 2] += dir.z * f;
      }
      relax(pos, free, nb, 8, false);
    }
  }
}

// joins two loops of vertex ids (same turning direction) with triangles, by how far round each
// point is; the first loop's edges a(i)->a(i+1) are used backwards (as for a hole's edge)
function zipRings(pos, faces, A, B) {
  const P = (id) => new THREE.Vector3(pos[id * 3], pos[id * 3 + 1], pos[id * 3 + 2]);
  const progress = (ids) => {
    const pts = ids.map(P);
    const out = [0];
    let acc = 0;
    for (let i = 1; i < pts.length; i++) { acc += pts[i].distanceTo(pts[i - 1]); out.push(acc); }
    acc += pts[pts.length - 1].distanceTo(pts[0]);
    return out.map((x) => x / Math.max(acc, 1e-9));
  };
  // start B at its point nearest to A's first point
  const a0 = P(A[0]);
  let b0 = 0, bd = Infinity;
  B.forEach((id, q) => { const d = P(id).distanceToSquared(a0); if (d < bd) { bd = d; b0 = q; } });
  B = B.slice(b0).concat(B.slice(0, b0));
  const tA = progress(A), tB = progress(B);
  const nA = A.length, nB = B.length;
  let i = 0, j = 0;
  while (i < nA || j < nB) {
    const nextA = i < nA ? (i + 1 < nA ? tA[i + 1] : 1) : Infinity;
    const nextB = j < nB ? (j + 1 < nB ? tB[j + 1] : 1) : Infinity;
    const a = A[i % nA], a1 = A[(i + 1) % nA], b = B[j % nB], b1 = B[(j + 1) % nB];
    if (nextA <= nextB) { faces.push(a1, a, b); i++; }
    else { faces.push(a, b, b1); j++; }
  }
}

// direction the crown's surface is heading at each of its edge points (away from the crown,
// toward the root): the tooth's axis laid flat onto the crown surface at that point
// for each crown edge point: the direction that carries the crown's surface straight on past the
// edge (across the edge, along the surface, measured from the crown triangles within 0.3 mm)
function edgeContinue(loop, crownGeo, axis) {
  const P = crownGeo.attributes.position, ix = crownGeo.index ? crownGeo.index.array : null;
  const nT = (ix ? ix.length : P.count) / 3;
  const cell = 0.3, grid = new Map(), fN = [], fC = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (let t = 0; t < nT; t++) {
    a.fromBufferAttribute(P, ix ? ix[t * 3] : t * 3);
    b.fromBufferAttribute(P, ix ? ix[t * 3 + 1] : t * 3 + 1);
    c.fromBufferAttribute(P, ix ? ix[t * 3 + 2] : t * 3 + 2);
    const nn = b.clone().sub(a).cross(c.clone().sub(a));
    const cc = a.clone().add(b).add(c).divideScalar(3);
    const k = `${Math.floor(cc.x / cell)},${Math.floor(cc.y / cell)},${Math.floor(cc.z / cell)}`;
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(fN.length);
    fN.push(nn); fC.push(cc);
  }
  // the crown triangles at each edge point (the crown's last row: the band must carry exactly
  // that slope on, else there is a line along the crown edge)
  const vkey = (x, y, z) => `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
  const atPoint = new Map();
  for (let t = 0; t < nT; t++) for (let q = 0; q < 3; q++) {
    const v = ix ? ix[t * 3 + q] : t * 3 + q;
    const k = vkey(P.getX(v), P.getY(v), P.getZ(v));
    if (!atPoint.has(k)) atPoint.set(k, []);
    atPoint.get(k).push(t);
  }
  const n = loop.length;
  let out = loop.map((p, i) => {
    const nm = new THREE.Vector3(), mid = new THREE.Vector3();
    let wsum = 0;
    for (const t of atPoint.get(vkey(p.x, p.y, p.z)) || []) { nm.add(fN[t]); mid.addScaledVector(fC[t], 1); wsum++; }
    if (!wsum) {
      const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell), cz = Math.floor(p.z / cell);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
        for (const f of grid.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) {
          const d = fC[f].distanceTo(p);
          if (d >= cell) continue;
          const w = 1 - d / cell;
          nm.addScaledVector(fN[f], w);
          mid.addScaledVector(fC[f], w); wsum += w;
        }
      }
    }
    if (!wsum || nm.lengthSq() < 1e-14) return axis.clone();
    nm.normalize(); mid.divideScalar(wsum);
    const along = loop[(i + 1) % n].clone().sub(loop[(i - 1 + n) % n]);
    const t = nm.clone().cross(along);
    if (t.lengthSq() < 1e-12) return axis.clone();
    t.normalize();
    if (t.dot(p.clone().sub(mid)) < 0) t.negate(); // away from the crown
    return t;
  });
  for (let s = 0; s < 2; s++) {
    out = out.map((d, i) => d.clone().multiplyScalar(0.5).addScaledVector(out[(i - 1 + n) % n], 0.25).addScaledVector(out[(i + 1) % n], 0.25).normalize());
  }
  // always heading at least a little toward the root
  return out.map((d) => (d.dot(axis) < 0.2 ? d.addScaledVector(axis, 0.2 - d.dot(axis)).normalize() : d));
}

function edgeTangents(loop, crownGeo, axis) {
  if (!crownGeo.attributes.normal) crownGeo.computeVertexNormals();
  const P = crownGeo.attributes.position, N = crownGeo.attributes.normal;
  // the crown surface's direction near each edge point: from crown points within 1.5 mm on the
  // biting side (the edge points themselves sit on tiny cut triangles, so their own normals are noisy)
  const cell = 1.5, grid = new Map();
  const key = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (let i = 0; i < P.count; i++) {
    const k = key(P.getX(i), P.getY(i), P.getZ(i));
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(i);
  }
  const v = new THREE.Vector3(), nm = new THREE.Vector3();
  const out = loop.map((p) => {
    const hp = p.dot(axis);
    const n = new THREE.Vector3();
    const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell), cz = Math.floor(p.z / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      for (const i of grid.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) {
        v.fromBufferAttribute(P, i);
        const d2 = v.distanceToSquared(p);
        if (d2 > cell * cell || v.dot(axis) > hp - 0.2) continue;
        nm.fromBufferAttribute(N, i);
        n.addScaledVector(nm, 1 / (0.2 + Math.sqrt(d2)));
      }
    }
    if (n.lengthSq() < 1e-9) return axis.clone();
    n.normalize();
    const t = axis.clone().addScaledVector(n, -axis.dot(n));
    return t.lengthSq() > 1e-4 ? t.normalize() : axis.clone();
  });
  // smooth along the edge and keep it heading toward the root
  let t = out;
  for (let s = 0; s < 6; s++) {
    t = t.map((d, i) => d.clone().multiplyScalar(0.5).addScaledVector(t[(i - 1 + t.length) % t.length], 0.25).addScaledVector(t[(i + 1) % t.length], 0.25));
  }
  return t.map((d) => {
    d.normalize();
    if (d.dot(axis) < 0.5) d.addScaledVector(axis, 0.5 - d.dot(axis)).normalize();
    return d;
  });
}

// a closed loop of points resampled to n points evenly spaced along it, starting at pts[0]
function resampleClosed(pts, n) {
  const seg = [];
  let total = 0;
  for (let i = 0; i < pts.length; i++) {
    const d = pts[i].distanceTo(pts[(i + 1) % pts.length]);
    seg.push(d);
    total += d;
  }
  const out = [];
  let i = 0, acc = 0;
  for (let k = 0; k < n; k++) {
    const target = (k / n) * total;
    while (i < pts.length - 1 && acc + seg[i] < target) { acc += seg[i]; i++; }
    const t = seg[i] > 0 ? (target - acc) / seg[i] : 0;
    out.push(pts[i].clone().lerp(pts[(i + 1) % pts.length], Math.min(1, Math.max(0, t))));
  }
  return out;
}

// an indexed copy with shared vertices (needed to find the rim of a cut)
function mergeIndexed(geo) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  Object.keys(g.attributes).forEach((k) => { if (k !== "position") g.deleteAttribute(k); });
  return dropFlat(mergeVertices(g, 1e-5));
}

// removes triangles that collapsed to a line or point (e.g. at a root tip after merging)
function dropFlat(g) {
  const ix = g.index.array;
  const keep = [];
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t], b = ix[t + 1], c = ix[t + 2];
    if (a !== b && b !== c && a !== c) keep.push(a, b, c);
  }
  g.setIndex(keep);
  return g;
}

// keeps the part of a mesh deeper than cutAt(point) (measured from c0 along axis); cut triangles are trimmed
function cutBelow(geo, c0, axis, cutAt) {
  const pos = geo.attributes.position;
  const idx = geo.index.array;
  const h = new Float32Array(pos.count);
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    let d = v.clone().sub(c0).dot(axis) - cutAt(v);
    if (Math.abs(d) < 1e-6) d = 1e-6; // nothing exactly on the cut
    h[i] = d;
  }
  const verts = [];
  const map = new Map(); // old vertex -> new index
  const cutMap = new Map(); // "a_b" -> new index of the point where edge a-b crosses the cut
  const keep = (i) => {
    if (!map.has(i)) { map.set(i, verts.length / 3); verts.push(pos.getX(i), pos.getY(i), pos.getZ(i)); }
    return map.get(i);
  };
  const cross = (a, b) => {
    const key = a < b ? a + "_" + b : b + "_" + a;
    if (!cutMap.has(key)) {
      const t = h[a] / (h[a] - h[b]);
      cutMap.set(key, verts.length / 3);
      verts.push(
        pos.getX(a) + (pos.getX(b) - pos.getX(a)) * t,
        pos.getY(a) + (pos.getY(b) - pos.getY(a)) * t,
        pos.getZ(a) + (pos.getZ(b) - pos.getZ(a)) * t,
      );
    }
    return cutMap.get(key);
  };
  const faces = [];
  for (let t = 0; t < idx.length; t += 3) {
    const tv = [idx[t], idx[t + 1], idx[t + 2]];
    const inside = tv.map((i) => h[i] > 0);
    const n = inside.filter(Boolean).length;
    if (n === 0) continue;
    if (n === 3) { faces.push(keep(tv[0]), keep(tv[1]), keep(tv[2])); continue; }
    // rotate so the odd vertex comes first
    let r = 0;
    for (let q = 0; q < 3; q++) if ((n === 1) === inside[q]) r = q;
    const a = tv[r], b = tv[(r + 1) % 3], c = tv[(r + 2) % 3];
    if (n === 1) {
      faces.push(keep(a), cross(a, b), cross(a, c));
    } else {
      const ab = cross(a, b), ac = cross(a, c);
      faces.push(ab, keep(b), keep(c), ab, keep(c), ac);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(faces);
  return g;
}

// ---------- one closed tooth (crown + root) for saving as STL ----------
// Joins the crown and its root and fills any hole that is left (for example small holes on the
// biting side), so the result has no open edges. Returns a geometry ready for STLExporter.
export function toothWithRoot(crownGeo, rootGeo) {
  const crown = crownGeo.index ? crownGeo : mergeIndexed(crownGeo);
  const tris = [];
  const addTris = (g) => {
    const p = g.attributes.position, ix = g.index ? g.index.array : null;
    const n = ix ? ix.length : p.count;
    for (let t = 0; t < n; t += 3) {
      const a = ix ? ix[t] : t, b = ix ? ix[t + 1] : t + 1, c = ix ? ix[t + 2] : t + 2;
      const same = (u, v) => p.getX(u) === p.getX(v) && p.getY(u) === p.getY(v) && p.getZ(u) === p.getZ(v);
      if (same(a, b) || same(b, c) || same(a, c)) continue; // a triangle squashed to a line or a point
      for (const v of [a, b, c]) tris.push(p.getX(v), p.getY(v), p.getZ(v));
    }
  };
  addTris(crown);
  if (rootGeo) addTris(rootGeo);
  // whatever holes are left (small holes in the crown, or the crown edge if the root could not be
  // joined): a fan of triangles to the hole's middle
  let joined = new THREE.BufferGeometry();
  joined.setAttribute("position", new THREE.Float32BufferAttribute(tris, 3));
  joined = mergeVertices(joined, 1e-6);
  for (const L of boundaryLoops(joined, 3)) {
    if (!L.closed) continue;
    const m = new THREE.Vector3();
    L.pts.forEach((p) => m.add(p));
    m.divideScalar(L.pts.length);
    for (let i = 0; i < L.pts.length; i++) {
      const a = L.pts[i], b = L.pts[(i + 1) % L.pts.length];
      tris.push(b.x, b.y, b.z, a.x, a.y, a.z, m.x, m.y, m.z); // the hole's edge used backwards
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(tris, 3));
  geo.computeVertexNormals();
  return geo;
}

// how many edges are open (used by 1 triangle) or overused (3+): 0 and 0 = watertight
export function openEdgeCount(geo) {
  let g = geo;
  if (!g.index) {
    g = new THREE.BufferGeometry();
    g.setAttribute("position", geo.attributes.position.clone());
    g = mergeVertices(g, 1e-6);
  }
  const idx = g.index.array;
  const count = new Map();
  for (let t = 0; t < idx.length; t += 3) for (let k = 0; k < 3; k++) {
    const a = idx[t + k], b = idx[t + ((k + 1) % 3)];
    const key = a < b ? a + "_" + b : b + "_" + a;
    count.set(key, (count.get(key) || 0) + 1);
  }
  let open = 0, over = 0;
  count.forEach((c) => { if (c === 1) open++; else if (c > 2) over++; });
  return { open, over };
}

// ---------- back teeth: trunk + roots as one smooth surface ----------
// The shape is described as a "distance field" (negative inside): a tapering trunk with the crown
// edge's outline, plus one tapered cone per root, melted together with a smooth union. Where the
// roots leave the trunk this gives a smooth inverted V. The surface is then traced on a fine grid
// (marching tetrahedra), so trunk and roots are one continuous closed mesh with no seams or bands.
function buildSplitRoots(loop, c0, axis, u, w, plan, length, buccalAngle, curveDir) {
  const N = loop.length;
  // crown edge in the tooth's own frame: x/y across the tooth, z = depth toward the root tip
  const E = loop.map((p) => {
    const d = p.clone().sub(c0);
    return { x: d.dot(u), y: d.dot(w), z: d.dot(axis) };
  });
  const zEdgeMax = Math.max(...E.map((e) => e.z)); // deepest point of the crown edge
  const zEdgeMin = Math.min(...E.map((e) => e.z));
  let R = 0;
  E.forEach((e) => { R = Math.max(R, Math.hypot(e.x, e.y)); });

  // edge height by direction (to cut the top of the trunk along the wavy crown edge)
  const angOf = (x, y) => Math.atan2(y, x);
  const edgeAng = E.map((e) => ({ a: angOf(e.x, e.y), z: e.z })).sort((p, q) => p.a - q.a);
  const edgeZAt = (a) => {
    // linear interpolation round the circle
    const n = edgeAng.length;
    let i = 0;
    while (i < n && edgeAng[i].a < a) i++;
    const p = edgeAng[(i - 1 + n) % n], q = edgeAng[i % n];
    let span = q.a - p.a; if (span <= 0) span += 2 * Math.PI;
    let off = a - p.a; if (off < 0) off += 2 * Math.PI;
    return p.z + (q.z - p.z) * Math.min(1, off / span);
  };

  // 2D signed distance to the crown outline, stored on a grid for speed
  const g2 = 0.2, pad2 = 2;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  E.forEach((e) => { minX = Math.min(minX, e.x); maxX = Math.max(maxX, e.x); minY = Math.min(minY, e.y); maxY = Math.max(maxY, e.y); });
  const ox = minX - pad2, oy = minY - pad2;
  const nx2 = Math.ceil((maxX - minX + 2 * pad2) / g2) + 1, ny2 = Math.ceil((maxY - minY + 2 * pad2) / g2) + 1;
  const sd2 = new Float32Array(nx2 * ny2);
  for (let j = 0; j < ny2; j++) for (let i = 0; i < nx2; i++) {
    const px = ox + i * g2, py = oy + j * g2;
    let dmin = Infinity, inside = false;
    for (let k = 0, l = N - 1; k < N; l = k++) {
      const a = E[l], c = E[k];
      if ((c.y > py) !== (a.y > py) && px < ((a.x - c.x) * (py - c.y)) / (a.y - c.y) + c.x) inside = !inside;
      const ex = c.x - a.x, ey = c.y - a.y;
      const t = Math.max(0, Math.min(1, ((px - a.x) * ex + (py - a.y) * ey) / (ex * ex + ey * ey || 1)));
      const dx = px - a.x - ex * t, dy = py - a.y - ey * t;
      dmin = Math.min(dmin, dx * dx + dy * dy);
    }
    sd2[j * nx2 + i] = (inside ? -1 : 1) * Math.sqrt(dmin);
  }
  const outline = (x, y) => {
    const fx = (x - ox) / g2, fy = (y - oy) / g2;
    if (fx < 0 || fy < 0 || fx >= nx2 - 1 || fy >= ny2 - 1) return pad2 + Math.hypot(Math.max(0, minX - x, x - maxX), Math.max(0, minY - y, y - maxY));
    const i = Math.floor(fx), j = Math.floor(fy), tx = fx - i, ty = fy - j;
    const a = sd2[j * nx2 + i], bb = sd2[j * nx2 + i + 1], c = sd2[(j + 1) * nx2 + i], d = sd2[(j + 1) * nx2 + i + 1];
    return (a * (1 - tx) + bb * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
  };

  // each root is a flattened, tapering "lobe" (an oval cross-section) that starts under its part of
  // the crown edge, moves outward and gets thinner toward a pointed tip. Just under the crown the
  // cross-section is the crown edge itself; a few mm lower it turns into the lobes, which melt into
  // each other near the top and come apart further down: that gives the inverted V.
  const cd = curveDir ? { x: curveDir.dot(u), y: curveDir.dot(w) } : { x: 0, y: 0 };
  const lobes = plan.map((part) => {
    const a0 = buccalAngle + THREE.MathUtils.degToRad(part.from);
    const a1 = buccalAngle + THREE.MathUtils.degToRad(part.to);
    const mid = (a0 + a1) / 2;
    const dir = { x: Math.cos(mid), y: Math.sin(mid) };
    const tan = { x: -dir.y, y: dir.x };
    // how far out (along dir) and how wide (across) this part of the crown edge is
    let rMax = 0, tMin = Infinity, tMax = -Infinity;
    for (const e of E) {
      let rel = angOf(e.x, e.y) - a0;
      rel = ((rel % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      if (rel > a1 - a0) continue;
      const r = e.x * dir.x + e.y * dir.y, t = e.x * tan.x + e.y * tan.y;
      rMax = Math.max(rMax, r); tMin = Math.min(tMin, t); tMax = Math.max(tMax, t);
    }
    if (!isFinite(tMin)) { rMax = R * 0.8; tMin = -R * 0.5; tMax = R * 0.5; }
    const cr = rMax * 0.5; // root middle: halfway out
    const ct = (tMin + tMax) / 2;
    return {
      dir, tan, cr, ct,
      ra: Math.max(0.9, rMax * 0.5 * ROOT_THICK), // thickness (along dir)
      rt: Math.max(0.9, ((tMax - tMin) / 2) * ROOT_WIDE), // width (across)
      L: length * part.lenScale,
    };
  });
  const zTop = zEdgeMax; // the lobes are measured from the deepest point of the crown edge
  const TIP_R = 0.05; // smallest root thickness, right at the end
  const lobeDist = (lb, x, y, z) => {
    const tRaw = (z - zTop) / lb.L;
    const t = Math.min(1, Math.max(0, tRaw));
    // slim down over the first 40%, then taper to a point
    // (the square root closes the root in a soft round end: no thin pin with a dot on it)
    const f = (1 - ROOT_SLIM * smoothstep(t / 0.4)) * Math.sqrt(Math.max(0, 1 - Math.pow(t, 1.4)));
    const out = lb.cr + SPLAY_MM * Math.pow(t, 1.3);
    const cx = lb.dir.x * out + lb.tan.x * lb.ct + cd.x * CURVE_MM * t * t;
    const cy = lb.dir.y * out + lb.tan.y * lb.ct + cd.y * CURVE_MM * t * t;
    const dx = x - cx, dy = y - cy;
    if (tRaw >= 1) return Math.hypot(dx, dy, z - zTop - lb.L) - TIP_R; // rounded tip
    const ra = Math.max(TIP_R, lb.ra * f), rt = Math.max(TIP_R, lb.rt * f);
    const dr = (dx * lb.dir.x + dy * lb.dir.y) / ra, dt = (dx * lb.tan.x + dy * lb.tan.y) / rt;
    return (Math.hypot(dr, dt) - 1) * Math.min(ra, rt);
  };
  const smin = (a, bb, k) => {
    const h = Math.max(0, Math.min(1, 0.5 + (0.5 * (bb - a)) / k));
    return bb * (1 - h) + a * h - k * h * (1 - h);
  };
  const field = (x, y, z) => {
    const zEdge = edgeZAt(angOf(x, y));
    let dl = Infinity;
    for (const lb of lobes) dl = dl === Infinity ? lobeDist(lb, x, y, z) : smin(dl, lobeDist(lb, x, y, z), BLEND_MM);
    // just under the crown: the crown edge's own outline, handing over to the lobes
    const s = Math.max(0, z - zEdgeMax - LOFT_MM); // keeps the crown outline down to where the join band ends (all the way round)
    const wOut = 1 - smoothstep(s / SPLIT_MM);
    const d0 = outline(x, y);
    const d = wOut * d0 + (1 - wOut) * dl;
    return Math.max(d, zEdge - 0.3 - z); // nothing above the crown edge (the top stays inside the crown)
  };
  const roots = lobes.map((lb) => {
    const out = lb.cr + SPLAY_MM;
    return { T: { x: lb.dir.x * out + cd.x * CURVE_MM, y: lb.dir.y * out + cd.y * CURVE_MM, z: zTop + lb.L } };
  });

  // grid around the shape
  let bx0 = minX - 1.5, bx1 = maxX + 1.5, by0 = minY - 1.5, by1 = maxY + 1.5;
  for (const r of roots) {
    bx0 = Math.min(bx0, r.T.x - 2); bx1 = Math.max(bx1, r.T.x + 2);
    by0 = Math.min(by0, r.T.y - 2); by1 = Math.max(by1, r.T.y + 2);
  }
  const bz0 = zEdgeMin - 1, bz1 = Math.max(...roots.map((r) => r.T.z)) + 1;
  const h = GRID_MM;
  const nx = Math.ceil((bx1 - bx0) / h) + 1, ny = Math.ceil((by1 - by0) / h) + 1, nz = Math.ceil((bz1 - bz0) / h) + 1;
  const F = new Float32Array(nx * ny * nz);
  for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    F[(k * ny + j) * nx + i] = field(bx0 + i * h, by0 + j * h, bz0 + k * h);
  }

  // marching tetrahedra: every grid cube is split into 6 tetrahedra and the surface is cut through
  // each one. Points on shared grid edges are shared, so the result is closed with no broken spots.
  const idx = (i, j, k) => (k * ny + j) * nx + i;
  const verts = [];
  const edgeVert = new Map();
  const NN = nx * ny * nz;
  const vertOn = (a, bb) => {
    const key = a < bb ? a * NN + bb : bb * NN + a;
    let id = edgeVert.get(key);
    if (id !== undefined) return id;
    const fa = F[a], fb = F[bb], t = fa / (fa - fb);
    const ai = a % nx, aj = Math.floor(a / nx) % ny, ak = Math.floor(a / (nx * ny));
    const bi = bb % nx, bj = Math.floor(bb / nx) % ny, bk = Math.floor(bb / (nx * ny));
    id = verts.length / 3;
    verts.push(bx0 + (ai + (bi - ai) * t) * h, by0 + (aj + (bj - aj) * t) * h, bz0 + (ak + (bk - ak) * t) * h);
    edgeVert.set(key, id);
    return id;
  };
  const faces = [];
  const cube = [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]];
  const tets = [[0,1,3,7],[0,3,2,7],[0,2,6,7],[0,6,4,7],[0,4,5,7],[0,5,1,7]];
  const nodeXYZ = (n) => [n % nx, Math.floor(n / nx) % ny, Math.floor(n / (nx * ny))];
  const emit = (p, q, r, insideNodes, outsideNodes) => {
    // turn the triangle so it faces outward (from the inside corners to the outside corners)
    const P = (id) => [verts[id * 3], verts[id * 3 + 1], verts[id * 3 + 2]];
    const A = P(p), B = P(q), C = P(r);
    const n = [
      (B[1] - A[1]) * (C[2] - A[2]) - (B[2] - A[2]) * (C[1] - A[1]),
      (B[2] - A[2]) * (C[0] - A[0]) - (B[0] - A[0]) * (C[2] - A[2]),
      (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]),
    ];
    const g = [0, 0, 0];
    for (const o of outsideNodes) { const c = nodeXYZ(o); g[0] += c[0]; g[1] += c[1]; g[2] += c[2]; }
    for (const o of insideNodes) { const c = nodeXYZ(o); g[0] -= c[0] * outsideNodes.length / insideNodes.length; g[1] -= c[1] * outsideNodes.length / insideNodes.length; g[2] -= c[2] * outsideNodes.length / insideNodes.length; }
    if (n[0] * g[0] + n[1] * g[1] + n[2] * g[2] < 0) faces.push(p, r, q);
    else faces.push(p, q, r);
  };
  for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const c = cube.map(([a, bb, cc]) => idx(i + a, j + bb, k + cc));
    let neg = 0;
    for (const n of c) if (F[n] < 0) neg++;
    if (neg === 0 || neg === 8) continue;
    for (const tt of tets) {
      const tv = tt.map((q) => c[q]);
      const ins = tv.filter((n) => F[n] < 0), outs = tv.filter((n) => F[n] >= 0);
      if (ins.length === 0 || ins.length === 4) continue;
      if (ins.length === 1 || ins.length === 3) {
        const lone = ins.length === 1 ? ins[0] : outs[0];
        const others = ins.length === 1 ? outs : ins;
        emit(vertOn(lone, others[0]), vertOn(lone, others[1]), vertOn(lone, others[2]), ins, outs);
      } else {
        const [a, bb] = ins, [cc, d] = outs;
        const v1 = vertOn(a, cc), v2 = vertOn(a, d), v3 = vertOn(bb, d), v4 = vertOn(bb, cc);
        emit(v1, v2, v3, ins, outs);
        emit(v1, v3, v4, ins, outs);
      }
    }
  }

  // back to the model's coordinates
  const out = new Float32Array(verts.length);
  for (let q = 0; q < verts.length; q += 3) {
    const p = c0.clone().addScaledVector(u, verts[q]).addScaledVector(w, verts[q + 1]).addScaledVector(axis, verts[q + 2]);
    out[q] = p.x; out[q + 1] = p.y; out[q + 2] = p.z;
  }
  let geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(out, 3));
  geo.setIndex(faces);
  // a few smoothing passes (the grid leaves small steps), then smooth normals
  geo = laplacianSmooth(geo, 5);
  geo.computeVertexNormals();
  return geo;
}

// moves each vertex a bit toward the average of its neighbours (removes grid steps)
function laplacianSmooth(geo, passes) {
  const pos = geo.attributes.position.array;
  const ix = geo.index.array;
  const n = pos.length / 3;
  const nb = Array.from({ length: n }, () => new Set());
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t], b = ix[t + 1], c = ix[t + 2];
    nb[a].add(b); nb[a].add(c); nb[b].add(a); nb[b].add(c); nb[c].add(a); nb[c].add(b);
  }
  let cur = Float32Array.from(pos);
  for (let s = 0; s < passes; s++) {
    const next = new Float32Array(cur.length);
    for (let v = 0; v < n; v++) {
      let x = 0, y = 0, z = 0, k = 0;
      for (const m of nb[v]) { x += cur[m * 3]; y += cur[m * 3 + 1]; z += cur[m * 3 + 2]; k++; }
      if (!k) { next[v * 3] = cur[v * 3]; next[v * 3 + 1] = cur[v * 3 + 1]; next[v * 3 + 2] = cur[v * 3 + 2]; continue; }
      next[v * 3] = 0.5 * cur[v * 3] + 0.5 * x / k;
      next[v * 3 + 1] = 0.5 * cur[v * 3 + 1] + 0.5 * y / k;
      next[v * 3 + 2] = 0.5 * cur[v * 3 + 2] + 0.5 * z / k;
    }
    cur = next;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(cur, 3));
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

// is a point inside a closed mesh (flat triangle list)? Counts how often a ray straight up (+Z)
// crosses the surface
function insideTester(tris) {
  const cell = 0.5, grid = new Map();
  const n = tris.length / 9;
  for (let t = 0; t < n; t++) {
    const o = t * 9;
    const x0 = Math.min(tris[o], tris[o + 3], tris[o + 6]), x1 = Math.max(tris[o], tris[o + 3], tris[o + 6]);
    const y0 = Math.min(tris[o + 1], tris[o + 4], tris[o + 7]), y1 = Math.max(tris[o + 1], tris[o + 4], tris[o + 7]);
    for (let x = Math.floor(x0 / cell); x <= Math.floor(x1 / cell); x++)
      for (let y = Math.floor(y0 / cell); y <= Math.floor(y1 / cell); y++) {
        const k = x * 100003 + y;
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push(o);
      }
  }
  return (px, py, pz) => {
    px += 1.3e-5; py += 2.7e-5; // off any edge
    const list = grid.get(Math.floor(px / cell) * 100003 + Math.floor(py / cell));
    if (!list) return false;
    let hits = 0;
    for (const o of list) {
      const ax = tris[o], ay = tris[o + 1], bx = tris[o + 3], by = tris[o + 4], cx = tris[o + 6], cy = tris[o + 7];
      const d = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
      if (Math.abs(d) < 1e-14) continue;
      const l1 = ((by - cy) * (px - cx) + (cx - bx) * (py - cy)) / d;
      const l2 = ((cy - ay) * (px - cx) + (ax - cx) * (py - cy)) / d;
      const l3 = 1 - l1 - l2;
      if (l1 < 0 || l2 < 0 || l3 < 0) continue;
      if (l1 * tris[o + 2] + l2 * tris[o + 5] + l3 * tris[o + 8] > pz) hits++;
    }
    return hits % 2 === 1;
  };
}

// pushes the new parts of each tooth (IPR fill, band, root; never the crown itself) out of its
// neighbours, sideways (away from the neighbour), with a smooth fall-off around the pushed part.
// items: computeRoots' list for one jaw; crowns: the original crowns { name, geo }.
function separateTeeth(items, crowns, apical) {
  const GAP = 0.02; // space left between two teeth (mm)
  const key = (x, y, z) => `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
  const T = [];
  for (const it of items) {
    const orig = crowns.find((p) => "root_" + p.name === it.name);
    if (!orig || !it.geo || !it.geo.userData.closedToCrown) continue;
    const crown = it.crown || orig.geo;
    const closed = toothWithRoot(crown, it.geo).attributes.position.array;
    const box = new THREE.Box3().setFromArray(closed);
    const fixed = new Set();
    const OP = (it.geo.userData.baseCrown || orig.geo).attributes.position;
    for (let i = 0; i < OP.count; i++) fixed.add(key(OP.getX(i), OP.getY(i), OP.getZ(i)));
    // the tooth's points by position (the band repeats the crown edge points, so a point can be in both pieces)
    const idx = new Map(), P = [], isFixed = [], nb = [];
    const geos = [crown, it.geo];
    const maps = geos.map((g) => {
      const A = g.attributes.position, m = new Int32Array(A.count);
      for (let i = 0; i < A.count; i++) {
        const k = key(A.getX(i), A.getY(i), A.getZ(i));
        let j = idx.get(k);
        if (j === undefined) {
          j = P.length; idx.set(k, j);
          P.push(new THREE.Vector3(A.getX(i), A.getY(i), A.getZ(i)));
          isFixed.push(fixed.has(k)); nb.push([]);
        }
        m[i] = j;
      }
      const ix = g.index.array;
      for (let t = 0; t < ix.length; t += 3) for (let q = 0; q < 3; q++) nb[m[ix[t + q]]].push(m[ix[t + (q + 1) % 3]]);
      return m;
    });
    // outward surface direction at each point (from the triangles round it)
    const N = P.map(() => new THREE.Vector3());
    geos.forEach((g, gi) => {
      const ix = g.index.array, m = maps[gi];
      for (let t = 0; t < ix.length; t += 3) {
        const a = m[ix[t]], b = m[ix[t + 1]], c = m[ix[t + 2]];
        const fn = P[b].clone().sub(P[a]).cross(P[c].clone().sub(P[a]));
        N[a].add(fn); N[b].add(fn); N[c].add(fn);
      }
    });
    N.forEach((v) => v.normalize());
    // how far each point is from the crown edge: the push fades in over EDGE_FADE_MM from the
    // crown edge, so the tooth's surface leaves the crown edge smoothly (no fold at the crown edge)
    const EDGE_FADE_MM = 0.8;
    const edgePts = [];
    for (let i = 0; i < P.length; i++) if (isFixed[i] && nb[i].some((j) => !isFixed[j])) edgePts.push(P[i]);
    const eg = new Map(), ec = EDGE_FADE_MM;
    const ek = (x, y, z) => `${Math.floor(x / ec)},${Math.floor(y / ec)},${Math.floor(z / ec)}`;
    for (const p of edgePts) { const k = ek(p.x, p.y, p.z); if (!eg.has(k)) eg.set(k, []); eg.get(k).push(p); }
    const fade = P.map((p, i) => {
      if (isFixed[i]) return 0;
      let d = EDGE_FADE_MM;
      const cx = Math.floor(p.x / ec), cy = Math.floor(p.y / ec), cz = Math.floor(p.z / ec);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++)
        for (const e of eg.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) d = Math.min(d, e.distanceTo(p));
      return smoothstep(d / EDGE_FADE_MM);
    });
    T.push({ it, crown, geos, maps, P, N, fade, isFixed, nb, inside: insideTester(closed), box, name: toothId(it.name) || it.name, disp: P.map(() => new THREE.Vector3()) });
  }
  const msg = [];
  for (const A of T) for (const B of T) {
    if (A === B || !A.box.clone().expandByScalar(0.3).intersectsBox(B.box)) continue;
    const toB = sideways(B.box.getCenter(new THREE.Vector3()).sub(A.box.getCenter(new THREE.Vector3())), apical).normalize();
    // how far each new point of A must move back (along -n) to be outside B
    const need = new Float64Array(A.P.length);
    const dirs = new Array(A.P.length);
    let count = 0, most = 0;
    const q = new THREE.Vector3();
    for (let i = 0; i < A.P.length; i++) {
      if (A.isFixed[i]) continue;
      const p = A.P[i];
      if (!B.box.containsPoint(p) || !B.inside(p.x, p.y, p.z)) continue;
      // move inward (against the tooth's own surface direction), which never folds the surface over;
      // if that direction is unclear, straight back from the neighbour
      const n = A.N[i].dot(toB) > 0.2 ? A.N[i] : toB;
      dirs[i] = n;
      let lo = 0, hi = 0.05;
      while (hi < 3 && B.inside(...q.copy(p).addScaledVector(n, -hi).toArray())) { lo = hi; hi *= 1.6; }
      for (let k = 0; k < 12; k++) {
        const mid = (lo + hi) / 2;
        if (B.inside(...q.copy(p).addScaledVector(n, -mid).toArray())) lo = mid; else hi = mid;
      }
      need[i] = hi + GAP;
      count++; most = Math.max(most, need[i]);
    }
    if (!count) continue;
    // smooth fall-off: every new point moves at least what it needs, and about as much as its neighbours
    let s = Float64Array.from(need);
    for (let pass = 0; pass < 48; pass++) {
      const keep = pass < 40; // the last passes only smooth (rounds off the edges of the pushed part)
      const old = Float64Array.from(s);
      for (let i = 0; i < A.P.length; i++) {
        if (A.isFixed[i] || !A.nb[i].length) continue;
        let m = 0;
        for (const j of A.nb[i]) m += A.isFixed[j] ? 0 : old[j];
        m = 0.5 * old[i] + 0.5 * m / A.nb[i].length;
        s[i] = keep ? Math.max(need[i], m) : m;
      }
    }
    // all points move the same way (the average inward direction where the teeth overlap), so the
    // surface stays smooth
    const avg = new THREE.Vector3();
    dirs.forEach((d, i) => { if (d) avg.addScaledVector(d, need[i]); });
    if (avg.lengthSq() < 1e-12) avg.copy(toB);
    avg.normalize();
    for (let i = 0; i < A.P.length; i++) {
      if (s[i] <= 1e-6) continue;
      A.disp[i].addScaledVector(avg, -s[i] * A.fade[i] / Math.max(0.3, avg.dot(dirs[i] || avg)));
    }
    msg.push(`${A.name} from ${B.name} ${most.toFixed(2)} mm`);
  }
  for (const A of T) {
    A.geos.forEach((g, gi) => {
      const pos = g.attributes.position, m = A.maps[gi];
      let moved = false;
      for (let i = 0; i < pos.count; i++) {
        const d = A.disp[m[i]];
        if (d.lengthSq() === 0) continue;
        pos.setXYZ(i, pos.getX(i) + d.x, pos.getY(i) + d.y, pos.getZ(i) + d.z);
        moved = true;
      }
      if (moved) { pos.needsUpdate = true; g.computeVertexNormals(); g.computeBoundingBox(); }
    });
  }
  return msg;
}

// smooths the strip within `mm` of where the crown meets the new parts (the band under the crown,
// and the IPR fills), on both sides at once, fading to nothing at `mm`. Crown and root keep sharing
// their edge points, so the tooth stays closed.
function smoothJoint(it, mm) {
  if (!it.geo || !it.geo.userData.closedToCrown || !it.crown) return;
  const base = it.geo.userData.baseCrown || null;
  const baseCount = base ? base.attributes.position.count : -1;
  const geos = [it.crown, it.geo];
  const key = (x, y, z) => `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
  const idx = new Map(), P = [], nb = [], isNew = [];
  const maps = geos.map((g, gi) => {
    const A = g.attributes.position, m = new Int32Array(A.count);
    for (let i = 0; i < A.count; i++) {
      const k = key(A.getX(i), A.getY(i), A.getZ(i));
      let j = idx.get(k);
      if (j === undefined) { j = P.length; idx.set(k, j); P.push(new THREE.Vector3(A.getX(i), A.getY(i), A.getZ(i))); nb.push(new Set()); isNew.push(false); }
      if (gi === 1 || (baseCount >= 0 && i >= baseCount)) isNew[j] = true; // band/root point, or an IPR fill point
      m[i] = j;
    }
    const ix = g.index.array;
    for (let t = 0; t < ix.length; t += 3) for (let q = 0; q < 3; q++) { nb[m[ix[t + q]]].add(m[ix[t + (q + 1) % 3]]); nb[m[ix[t + q]]].add(m[ix[t + (q + 2) % 3]]); }
    return m;
  });
  // the joint: crown points next to a new point (a point in both pieces counts as crown)
  const crownSide = maps[0];
  const isCrown = new Uint8Array(P.length);
  for (let i = 0; i < crownSide.length; i++) if (!(baseCount >= 0 && i >= baseCount)) isCrown[crownSide[i]] = 1;
  const joint = [];
  for (let j = 0; j < P.length; j++) if (isCrown[j] && [...nb[j]].some((k) => !isCrown[k])) joint.push(P[j]);
  if (!joint.length) return;
  const cell = mm, grid = new Map();
  const gk = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (const p of joint) { const k = gk(p.x, p.y, p.z); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(p); }
  const w = P.map((p) => {
    let d = mm;
    const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell), cz = Math.floor(p.z / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++)
      for (const e of grid.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) d = Math.min(d, e.distanceTo(p));
    return 1 - smoothstep(d / mm);
  });
  const active = [];
  for (let j = 0; j < P.length; j++) if (w[j] > 0) active.push(j);
  const step = (lambda) => {
    const moves = active.map((j) => {
      const c = new THREE.Vector3();
      nb[j].forEach((k) => c.add(P[k]));
      return c.divideScalar(nb[j].size).sub(P[j]).multiplyScalar(lambda * w[j]);
    });
    active.forEach((j, q) => P[j].add(moves[q]));
  };
  for (let pass = 0; pass < JOINT_SMOOTH_PASSES; pass++) { step(0.5); step(-0.53); }
  // the IPR fill seam: plain smoothing in a narrow strip around where the fill meets the crown
  if (SEAM_MM > 0 && baseCount >= 0) {
    const fillPt = new Uint8Array(P.length);
    for (let i = baseCount; i < crownSide.length; i++) fillPt[crownSide[i]] = 1;
    const seam = [];
    for (let j = 0; j < P.length; j++) if (isCrown[j] && [...nb[j]].some((k) => fillPt[k])) seam.push(P[j].clone());
    if (seam.length) {
      const sg = new Map();
      const sk = (x, y, z) => `${Math.floor(x / SEAM_MM)},${Math.floor(y / SEAM_MM)},${Math.floor(z / SEAM_MM)}`;
      for (const p of seam) { const k = sk(p.x, p.y, p.z); if (!sg.has(k)) sg.set(k, []); sg.get(k).push(p); }
      const sw = [], sa = [];
      for (let j = 0; j < P.length; j++) {
        const p = P[j];
        let d = SEAM_MM;
        const cx = Math.floor(p.x / SEAM_MM), cy = Math.floor(p.y / SEAM_MM), cz = Math.floor(p.z / SEAM_MM);
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++)
          for (const e of sg.get(`${cx + dx},${cy + dy},${cz + dz}`) || []) d = Math.min(d, e.distanceTo(p));
        const ww = 1 - smoothstep(d / SEAM_MM);
        if (ww > 0) { sa.push(j); sw.push(ww); }
      }
      for (let pass = 0; pass < SEAM_PASSES; pass++) {
        const moves = sa.map((j, q) => {
          const c = new THREE.Vector3();
          nb[j].forEach((k) => c.add(P[k]));
          return c.divideScalar(nb[j].size).sub(P[j]).multiplyScalar(0.5 * sw[q]);
        });
        sa.forEach((j, q) => P[j].add(moves[q]));
      }
    }
  }
  geos.forEach((g, gi) => {
    const A = g.attributes.position, m = maps[gi];
    for (let i = 0; i < A.count; i++) { const p = P[m[i]]; A.setXYZ(i, p.x, p.y, p.z); }
    A.needsUpdate = true;
    g.computeVertexNormals();
    g.computeBoundingBox();
  });
}

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
        let length = rootLengthFor(p.name, jaw);
        if (!toothId(p.name) && size && size.a >= MOLAR_SIZE_MM && size.b >= MOLAR_SIZE_MM) {
          plan = rootPlan(jaw === "upper" ? "16" : "36", jaw);
          length = rootLengthFor("x6", jaw);
        }
        const isCanine = (toothId(p.name) || "00")[1] === "3";
        // the crowns next to this one (for the IPR region: where the crowns touch)
        if (!p.geo.boundingBox) p.geo.computeBoundingBox();
        const near = p.geo.boundingBox.clone().expandByScalar(1);
        const neighbours = list.filter((o) => o !== p && o.geo && (o.geo.boundingBox || (o.geo.computeBoundingBox(), o.geo.boundingBox)).intersectsBox(near)).map((o) => o.geo);
        const geo = buildRoot(p.geo, apical, length, buccal, plan, distal, isCanine ? CANINE_MAX_LEAN_DEG : MAX_ROOT_LEAN_DEG, false, neighbours);
        report.push(`${toothId(p.name) || p.name} [${lastBuildInfo}]: ${plan ? plan.length : 1}`);
        if (geo) out.push({ name: "root_" + p.name, geo, crown: geo.userData.crown || null });
        else report.push(`${toothId(p.name) || p.name}: NO ROOT`);
      } catch (err) {
        console.error("Root failed for", p.name, err);
      }
    }
    return out;
  };
  const result = { upper: build("upper"), lower: build("lower") };
  // smooth the joint between crown and new parts, both sides together, so no line shows there
  if (JOINT_SMOOTH_MM > 0) for (const jaw of ["upper", "lower"]) for (const it of result[jaw]) {
    try { smoothJoint(it, JOINT_SMOOTH_MM); } catch (err) { console.error("Root: smoothing the joint failed", err); }
  }
  // neighbouring teeth must not run into each other: the new parts (IPR fill, band, root) of each
  // tooth are pushed back out of its neighbours
  for (const jaw of ["upper", "lower"]) {
    try {
      if (!SEPARATE_TEETH) continue;
      const ap = jaw === "upper" ? upperApical : upperApical.clone().negate();
      const msg = separateTeeth(result[jaw], teeth[jaw] || [], ap);
      separateTeeth(result[jaw], teeth[jaw] || [], ap); // a second round for what the first left
      if (msg.length) console.info(`[Root] ${jaw}: pushed apart`, msg.join(", "));
    } catch (err) {
      console.error("Root: separating teeth failed", err);
    }
  }
  // in the browser console (F12): every tooth, its crown size and how many roots it got
  console.info("[Root] tooth [how the root start was found]: roots ->", report.join(", "));
  return result;
}

// ---------- saving: every tooth with its root, as one closed STL (NNwithroot.stl) ----------
// Sends each tooth to server.js, which writes it to D:\Temp\Output. The first file of a run
// also tells the server to remove the old NNwithroot.stl files there (only those).
// crowns: { upper: [{ name, geo }], lower: [...] }; roots: the result of computeRoots.
// isCancelled(): return true to stop early (e.g. new roots were made meanwhile).
export async function saveTeethWithRoots(backendUrl, crowns, roots, isCancelled = () => false) {
  const exporter = new STLExporter();
  let saved = 0, failed = 0, first = true;
  for (const jaw of ["upper", "lower"]) {
    for (const p of crowns[jaw] || []) {
      if (isCancelled()) return { saved, failed, cancelled: true };
      const id = toothId(p.name);
      const root = (roots[jaw] || []).find((r) => r.name === "root_" + p.name);
      if (!id || !root) continue;
      const tooth = toothWithRoot(root.crown || p.geo, root.geo);
      const data = exporter.parse(new THREE.Mesh(tooth), { binary: true });
      tooth.dispose();
      try {
        const res = await fetch(`${backendUrl}/api/save-tooth-root?name=${id}withroot.stl${first ? "&first=1" : ""}`, {
          method: "POST",
          headers: { "Content-Type": "application/octet-stream" },
          body: data,
        });
        if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
        saved++;
        first = false;
      } catch (err) {
        failed++;
        console.error(`[Root] could not save ${id}withroot.stl:`, err);
      }
    }
  }
  console.info(`[Root] saved ${saved} teeth with roots to D:\\Temp\\Output` + (failed ? ` (${failed} failed)` : ""));
  return { saved, failed };
}
