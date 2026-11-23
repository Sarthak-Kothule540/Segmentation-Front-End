// Root view: an approximate root for every tooth crown.
// The exe gives only crowns, so each root is made here: the open edge of the crown
// (the cervical line, where the crown met the gum) is pulled away from the biting side
// along the tooth's long axis and narrowed down to a rounded tip.
// The roots are made from the teeth you are looking at (Final Position = the moved teeth),
// so they always sit on the crowns and move with them.
import * as THREE from "three";

// typical root length per tooth type (2nd digit of the tooth number), in mm
const ROOT_LENGTH_MM = { 1: 13, 2: 13, 3: 17, 4: 14, 5: 14, 6: 12, 7: 12, 8: 11 };
const DEFAULT_ROOT_LENGTH_MM = 13;

const RING_POINTS = 64; // points around the root
const RINGS = 24; // rings from the crown edge to the tip
const MAX_TILT_DEG = 35; // the edge's own direction is used only if it is this close to the jaw's up/down

const toothId = (name) => {
  const m = /(\d{2})/.exec(name || "");
  return m ? m[1] : null;
};

export function rootLengthFor(name) {
  const id = toothId(name);
  return (id && ROOT_LENGTH_MM[Number(id[1])]) || DEFAULT_ROOT_LENGTH_MM;
}

// ---------- the open edge of the crown ----------

// longest loop of edges that belong to only one triangle (the cut where the crown met the gum)
function boundaryLoop(geo) {
  const index = geo.index;
  const pos = geo.attributes.position;
  if (!index) return null;
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

  const next = new Map(); // vertex -> next vertex along the edge
  for (const [key, c] of count) {
    if (c !== 1) continue;
    const [a, b] = dir.get(key);
    next.set(a, b);
  }
  if (next.size < 8) return null;

  // follow the edges into loops, keep the longest one
  const used = new Set();
  let best = null;
  for (const start of next.keys()) {
    if (used.has(start)) continue;
    const loop = [];
    let v = start;
    while (v !== undefined && !used.has(v)) {
      used.add(v);
      loop.push(v);
      v = next.get(v);
    }
    if (!best || loop.length > best.length) best = loop;
  }
  if (!best || best.length < 8) return null;
  return best.map((i) => new THREE.Vector3().fromBufferAttribute(pos, i));
}

// fallback for a closed crown: the outline of the crown's lowest band (toward the root side)
function ringFromBand(geo, apical) {
  const pos = geo.attributes.position;
  const pts = [];
  let hMin = Infinity, hMax = -Infinity;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    const h = v.fromBufferAttribute(pos, i).dot(apical);
    if (h < hMin) hMin = h;
    if (h > hMax) hMax = h;
  }
  const bandStart = hMax - (hMax - hMin) * 0.15;
  const c = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    if (v.dot(apical) >= bandStart) {
      pts.push(v.clone());
      c.add(v);
    }
  }
  if (pts.length < 8) return null;
  c.divideScalar(pts.length);

  // farthest band point in each direction around the axis
  const { u, w } = planeAxes(apical);
  const ring = new Array(RING_POINTS).fill(null);
  const best = new Array(RING_POINTS).fill(-1);
  for (const p of pts) {
    const d = p.clone().sub(c);
    const x = d.dot(u), y = d.dot(w);
    const a = Math.atan2(y, x);
    const k = Math.floor(((a + Math.PI) / (2 * Math.PI)) * RING_POINTS) % RING_POINTS;
    const r = x * x + y * y;
    if (r > best[k]) { best[k] = r; ring[k] = p; }
  }
  const out = ring.filter(Boolean);
  return out.length >= 8 ? out : null;
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

// how wide the root is at depth t (0 = crown edge, 1 = tip)
const widthAt = (t) => (1 - 0.12 * smoothstep(t / 0.2)) * Math.pow(1 - t, 0.7);

// ---------- one root ----------

// crownGeo: tooth geometry (indexed), apicalDir: unit vector pointing from the crown toward the root
export function buildRoot(crownGeo, apicalDir, length) {
  let loop = boundaryLoop(crownGeo) || ringFromBand(crownGeo, apicalDir);
  if (!loop) return null;
  loop = resample(loop, RING_POINTS);

  const c0 = new THREE.Vector3();
  loop.forEach((p) => c0.add(p));
  c0.divideScalar(loop.length);

  // long axis: the edge's own direction if it agrees with the jaw, otherwise the jaw's up/down
  let axis = apicalDir.clone();
  const n = loopNormal(loop, c0);
  if (n) {
    if (n.dot(apicalDir) < 0) n.negate();
    if (n.angleTo(apicalDir) < THREE.MathUtils.degToRad(MAX_TILT_DEG)) {
      axis = n.lerp(apicalDir, 0.4).normalize(); // a bit of both: steadier on ragged edges
    }
  }

  // keep the crown edge going one way round the axis (so the triangles face outward)
  if (n) {
    const { u, w } = planeAxes(axis);
    let area = 0;
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i].clone().sub(c0), b = loop[(i + 1) % loop.length].clone().sub(c0);
      area += a.dot(u) * b.dot(w) - a.dot(w) * b.dot(u);
    }
    if (area < 0) loop.reverse();
  }

  const smooth = smoothLoop(loop, 12);
  const heights = loop.map((p) => p.clone().sub(c0).dot(axis));
  const hMax = Math.max(...heights); // the deepest point of the crown edge

  const positions = [];
  for (let r = 0; r <= RINGS; r++) {
    const t = r / RINGS;
    const flat = smoothstep(t / 0.3); // the wavy edge becomes flat and round in the first 30%
    const wScale = widthAt(t);
    for (let i = 0; i < RING_POINTS; i++) {
      const p = loop[i].clone().lerp(smooth[i], flat);
      const off = p.sub(c0);
      off.addScaledVector(axis, -off.dot(axis)); // sideways part only
      const h = heights[i] + (hMax - heights[i]) * flat + length * t;
      const q = c0.clone().addScaledVector(axis, h).addScaledVector(off, r === 0 ? 1 : wScale);
      if (r === 0) q.copy(loop[i]); // exactly on the crown edge
      positions.push(q.x, q.y, q.z);
    }
  }
  // rounded tip
  const tip = c0.clone().addScaledVector(axis, hMax + length + 0.6);
  positions.push(tip.x, tip.y, tip.z);
  const tipIndex = (RINGS + 1) * RING_POINTS;

  const indices = [];
  for (let r = 0; r < RINGS; r++) {
    for (let i = 0; i < RING_POINTS; i++) {
      const a = r * RING_POINTS + i;
      const b = r * RING_POINTS + ((i + 1) % RING_POINTS);
      const c = a + RING_POINTS;
      const d = b + RING_POINTS;
      indices.push(a, c, b, b, c, d);
    }
  }
  const last = RINGS * RING_POINTS;
  for (let i = 0; i < RING_POINTS; i++) {
    indices.push(last + i, tipIndex, last + ((i + 1) % RING_POINTS));
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  // check one side: the normals must point away from the axis, else flip all triangles
  const mid = Math.floor(RINGS / 2) * RING_POINTS;
  const pm = new THREE.Vector3().fromBufferAttribute(geo.attributes.position, mid);
  const nm = new THREE.Vector3().fromBufferAttribute(geo.attributes.normal, mid);
  const out = pm.clone().sub(c0);
  out.addScaledVector(axis, -out.dot(axis));
  if (nm.dot(out) < 0) {
    const ix = geo.index.array;
    for (let k = 0; k < ix.length; k += 3) {
      const tmp = ix[k + 1];
      ix[k + 1] = ix[k + 2];
      ix[k + 2] = tmp;
    }
    geo.index.needsUpdate = true;
    geo.computeVertexNormals();
  }
  geo.computeBoundingBox();
  return geo;
}

// ---------- all roots ----------

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
// Returns { upper: [{ name, geo }], lower: [...] } with one root per tooth
export function computeRoots(teeth) {
  // the roots of the upper teeth go up (+Z), unless the lower jaw is above the upper one
  const upC = centerOf(teeth.upper || []), loC = centerOf(teeth.lower || []);
  let upperApical = new THREE.Vector3(0, 0, 1);
  if (upC && loC && Math.abs(upC.z - loC.z) > 1) upperApical.set(0, 0, Math.sign(upC.z - loC.z));

  const build = (jaw) => {
    const apical = jaw === "upper" ? upperApical : upperApical.clone().negate();
    const out = [];
    for (const p of teeth[jaw] || []) {
      try {
        const geo = buildRoot(p.geo, apical, rootLengthFor(p.name));
        if (geo) out.push({ name: "root_" + p.name, geo });
      } catch (err) {
        console.error("Root failed for", p.name, err);
      }
    }
    return out;
  };
  return { upper: build("upper"), lower: build("lower") };
}
