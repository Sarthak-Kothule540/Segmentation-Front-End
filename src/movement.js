// ---------------- Movement: how far each tooth moved from Initial Position to Final Position ----------------
//
// For every tooth we have two meshes: the Segment tooth (Initial) and the Automatic Setup tooth (Final).
// 1. We find the rigid motion (rotation R + shift t) that carries the Initial tooth onto the Final tooth.
//    - same number of vertices: the exe moved the same mesh, so vertex i matches vertex i (exact fit)
//    - different number of vertices: we match nearest points again and again (ICP) to find the motion
// 2. We build a small frame for each tooth on the Initial position (the app has no stored tooth axes):
//    - o = occlusal direction (the way the crown points: down for upper teeth, up for lower teeth)
//    - m = mesial direction (along the arch, toward the middle of the arch, from the neighbouring teeth)
//    - b = buccal direction (away from the tongue, at right angles to m and o)
// 3. The shift of the crown center and the rotation are read in that frame.
//
// Result per tooth (one row of the table):
//   vertical   mm   O = moved toward occlusal (extrusion),  G = moved toward gingiva (intrusion)
//   mesial     mm   M = mesial,  D = distal
//   buccal     mm   B = buccal,  L = lingual
//   rotation   deg  O = mesial side turns out (buccal),  I = mesial side turns in (lingual)   (around the long axis)
//   torque     deg  B = crown tips buccal,  L = crown tips lingual
//   angulation deg  M = crown tips mesial,  D = crown tips distal

import * as THREE from "three";

// order of the rows in the table (null = the empty gap between upper and lower)
export const MOVEMENT_ROWS = [
  "17", "16", "15", "14", "13", "12", "11",
  "21", "22", "23", "24", "25", "26", "27",
  null,
  "47", "46", "45", "44", "43", "42", "41",
  "31", "32", "33", "34", "35", "36", "37",
];

const toothId = (name) => {
  const m = String(name).match(/(\d)(\d)/);
  return m ? m[1] + m[2] : null;
};

// ---------- small helpers ----------

// all vertex positions as a flat Float32Array (x, y, z, x, y, z, ...)
const positionsOf = (geo) => geo.attributes.position.array;

// surface center: average of triangle centers, weighted by triangle area (not fooled by dense areas)
function surfaceCenter(geo) {
  const pos = geo.attributes.position;
  const idx = geo.index;
  const triCount = idx ? idx.count / 3 : pos.count / 3;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const ab = new THREE.Vector3(), ac = new THREE.Vector3();
  const sum = new THREE.Vector3();
  let total = 0;
  for (let t = 0; t < triCount; t++) {
    const i0 = idx ? idx.getX(3 * t) : 3 * t;
    const i1 = idx ? idx.getX(3 * t + 1) : 3 * t + 1;
    const i2 = idx ? idx.getX(3 * t + 2) : 3 * t + 2;
    a.fromBufferAttribute(pos, i0);
    b.fromBufferAttribute(pos, i1);
    c.fromBufferAttribute(pos, i2);
    const area = ab.subVectors(b, a).cross(ac.subVectors(c, a)).length() / 2;
    if (!(area > 0)) continue;
    sum.x += ((a.x + b.x + c.x) / 3) * area;
    sum.y += ((a.y + b.y + c.y) / 3) * area;
    sum.z += ((a.z + b.z + c.z) / 3) * area;
    total += area;
  }
  if (total > 0) return sum.divideScalar(total);
  geo.computeBoundingBox();
  return geo.boundingBox.getCenter(new THREE.Vector3());
}

// eigenvector of the largest eigenvalue of a symmetric 4x4 matrix (Jacobi method)
function largestEigenvector4(N) {
  const A = N.map((r) => r.slice());
  const V = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let sweep = 0; sweep < 50; sweep++) {
    let off = 0;
    for (let p = 0; p < 4; p++) for (let q = p + 1; q < 4; q++) off += A[p][q] * A[p][q];
    if (off < 1e-18) break;
    for (let p = 0; p < 4; p++) {
      for (let q = p + 1; q < 4; q++) {
        if (Math.abs(A[p][q]) < 1e-20) continue;
        const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < 4; k++) {
          const akp = A[k][p], akq = A[k][q];
          A[k][p] = c * akp - s * akq;
          A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < 4; k++) {
          const apk = A[p][k], aqk = A[q][k];
          A[p][k] = c * apk - s * aqk;
          A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < 4; k++) {
          const vkp = V[k][p], vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq;
          V[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  let best = 0;
  for (let i = 1; i < 4; i++) if (A[i][i] > A[best][best]) best = i;
  return [V[0][best], V[1][best], V[2][best], V[3][best]];
}

// best rotation + shift that carries points src[i] onto dst[i] (Horn's quaternion method)
// src, dst: arrays of THREE.Vector3 of the same length. Returns a THREE.Matrix4.
function bestFit(src, dst) {
  const n = src.length;
  const cs = new THREE.Vector3(), cd = new THREE.Vector3();
  for (let i = 0; i < n; i++) { cs.add(src[i]); cd.add(dst[i]); }
  cs.divideScalar(n); cd.divideScalar(n);

  let Sxx = 0, Sxy = 0, Sxz = 0, Syx = 0, Syy = 0, Syz = 0, Szx = 0, Szy = 0, Szz = 0;
  for (let i = 0; i < n; i++) {
    const ax = src[i].x - cs.x, ay = src[i].y - cs.y, az = src[i].z - cs.z;
    const bx = dst[i].x - cd.x, by = dst[i].y - cd.y, bz = dst[i].z - cd.z;
    Sxx += ax * bx; Sxy += ax * by; Sxz += ax * bz;
    Syx += ay * bx; Syy += ay * by; Syz += ay * bz;
    Szx += az * bx; Szy += az * by; Szz += az * bz;
  }
  const N = [
    [Sxx + Syy + Szz, Syz - Szy, Szx - Sxz, Sxy - Syx],
    [Syz - Szy, Sxx - Syy - Szz, Sxy + Syx, Szx + Sxz],
    [Szx - Sxz, Sxy + Syx, -Sxx + Syy - Szz, Syz + Szy],
    [Sxy - Syx, Szx + Sxz, Syz + Szy, -Sxx - Syy + Szz],
  ];
  const [w, x, y, z] = largestEigenvector4(N);
  const q = new THREE.Quaternion(x, y, z, w).normalize();
  const R = new THREE.Matrix4().makeRotationFromQuaternion(q);
  const t = cd.clone().sub(cs.clone().applyMatrix4(R));
  return R.setPosition(t);
}

// pick about `count` vertices spread over the mesh
function sampleVertices(arr, count) {
  const n = arr.length / 3;
  const step = Math.max(1, Math.floor(n / count));
  const out = [];
  for (let i = 0; i < n; i += step) out.push(new THREE.Vector3(arr[3 * i], arr[3 * i + 1], arr[3 * i + 2]));
  return out;
}

// rigid motion from Initial tooth to Final tooth
function toothMotion(origGeo, movedGeo) {
  const po = positionsOf(origGeo);
  const pm = positionsOf(movedGeo);

  // same mesh, moved by the exe: vertex i matches vertex i
  if (po.length === pm.length) {
    const n = po.length / 3;
    const step = Math.max(1, Math.floor(n / 4000));
    const src = [], dst = [];
    for (let i = 0; i < n; i += step) {
      src.push(new THREE.Vector3(po[3 * i], po[3 * i + 1], po[3 * i + 2]));
      dst.push(new THREE.Vector3(pm[3 * i], pm[3 * i + 1], pm[3 * i + 2]));
    }
    return bestFit(src, dst);
  }

  // different meshes: ICP (match each point to the nearest point of the other tooth, fit, repeat)
  const CELL = 1; // mm
  const grid = new Map();
  const key = (x, y, z) => `${x},${y},${z}`;
  const target = [];
  for (let i = 0; i < pm.length / 3; i++) {
    const v = new THREE.Vector3(pm[3 * i], pm[3 * i + 1], pm[3 * i + 2]);
    target.push(v);
    const k = key(Math.floor(v.x / CELL), Math.floor(v.y / CELL), Math.floor(v.z / CELL));
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(v);
  }
  const nearest = (p) => {
    const cx = Math.floor(p.x / CELL), cy = Math.floor(p.y / CELL), cz = Math.floor(p.z / CELL);
    for (let r = 1; r <= 3; r++) {
      let best = null, bestD = Infinity;
      for (let a = -r; a <= r; a++)
        for (let b = -r; b <= r; b++)
          for (let c = -r; c <= r; c++) {
            const list = grid.get(key(cx + a, cy + b, cz + c));
            if (!list) continue;
            for (const v of list) {
              const d = v.distanceToSquared(p);
              if (d < bestD) { bestD = d; best = v; }
            }
          }
      if (best) return best;
    }
    return null;
  };

  const src = sampleVertices(po, 1500);
  // start: shift the centers onto each other
  const M = new THREE.Matrix4().makeTranslation(
    surfaceCenter(movedGeo).sub(surfaceCenter(origGeo))
  );
  const moved = src.map(() => new THREE.Vector3());
  for (let iter = 0; iter < 30; iter++) {
    const s = [], d = [];
    for (let i = 0; i < src.length; i++) {
      moved[i].copy(src[i]).applyMatrix4(M);
      const nb = nearest(moved[i]);
      if (nb) { s.push(src[i]); d.push(nb); }
    }
    if (s.length < 10) break;
    const next = bestFit(s, d);
    const change = next.elements.reduce((acc, e, i) => acc + Math.abs(e - M.elements[i]), 0);
    M.copy(next);
    if (change < 1e-5) break;
  }
  return M;
}

// ---------- main ----------

// initialParts / finalParts: { upper: [{ name, geo }], lower: [...] } (teeth only)
// Returns { "11": { values: [6 numbers], letters: [6 letters] }, ... }
export function computeMovement(initialParts, finalParts) {
  const result = {};
  const teeth = {}; // id -> { jaw, orig, moved, center }
  for (const jaw of ["upper", "lower"]) {
    for (const orig of initialParts[jaw] || []) {
      const id = toothId(orig.name);
      if (!id) continue;
      const moved = (finalParts[jaw] || []).find((p) => toothId(p.name) === id);
      teeth[id] = { jaw, orig, moved, center: surfaceCenter(orig.geo) };
    }
  }

  // which way is "up" for each jaw: the upper teeth point toward the lower teeth
  const jawCenter = (jaw) => {
    const list = Object.values(teeth).filter((t) => t.jaw === jaw);
    if (!list.length) return null;
    const c = new THREE.Vector3();
    list.forEach((t) => c.add(t.center));
    return c.divideScalar(list.length);
  };
  const upC = jawCenter("upper"), loC = jawCenter("lower");
  let upperOcclusal = new THREE.Vector3(0, 0, -1); // Z is up, so the upper crowns point down
  if (upC && loC && upC.distanceTo(loC) > 1) {
    const d = loC.clone().sub(upC);
    // keep only the up/down part (the jaws may also be a bit shifted front/back)
    upperOcclusal = new THREE.Vector3(0, 0, Math.sign(d.z) || -1);
  }

  // neighbours along the arch: the mesial one is closer to the middle (11 -> 21 across the middle)
  const mesialNeighbour = (id) => {
    const q = id[0], n = Number(id[1]);
    if (n > 1) return q + (n - 1);
    return { 1: "21", 2: "11", 3: "41", 4: "31" }[q];
  };
  const distalNeighbour = (id) => id[0] + (Number(id[1]) + 1);
  const findNear = (id, step, tries = 3) => {
    let cur = id;
    for (let i = 0; i < tries; i++) {
      cur = step(cur);
      if (!cur || cur[1] === "9") return null;
      if (teeth[cur]) return teeth[cur];
    }
    return null;
  };

  for (const [id, t] of Object.entries(teeth)) {
    if (!t.moved) continue;
    try {
      const o = t.jaw === "upper" ? upperOcclusal.clone() : upperOcclusal.clone().negate();

      // mesial direction from the neighbours, flattened onto the occlusal plane
      const mes = findNear(id, mesialNeighbour);
      const dis = findNear(id, distalNeighbour);
      const from = dis ? dis.center : t.center;
      const to = mes ? mes.center : t.center;
      let m = to.clone().sub(from);
      m.sub(o.clone().multiplyScalar(m.dot(o)));
      if (m.lengthSq() < 1e-6) continue; // a lone tooth: no arch direction
      m.normalize();

      // buccal: at right angles to m and o, pointing away from the middle of the jaw
      let b = new THREE.Vector3().crossVectors(m, o).normalize();
      const jc = t.jaw === "upper" ? upC : loC;
      const out = t.center.clone().sub(jc);
      out.sub(o.clone().multiplyScalar(out.dot(o)));
      if (b.dot(out) < 0) b.negate();

      const M = toothMotion(t.orig.geo, t.moved.geo);
      const R = new THREE.Matrix3().setFromMatrix4(M);

      // shift of the crown center
      const d = t.center.clone().applyMatrix4(M).sub(t.center);
      const vert = d.dot(o), mesial = d.dot(m), buccal = d.dot(b);

      // where the tooth axes point after the move, read in the tooth's own frame
      const o2 = o.clone().applyMatrix3(R);
      const m2 = m.clone().applyMatrix3(R);
      const deg = (r) => (r * 180) / Math.PI;
      const rotation = deg(Math.atan2(m2.dot(b), m2.dot(m))); // + = mesial side turns buccal (out)
      const torque = deg(Math.atan2(o2.dot(b), o2.dot(o))); // + = crown tips buccal
      const angulation = deg(Math.atan2(o2.dot(m), o2.dot(o))); // + = crown tips mesial

      result[id] = {
        values: [vert, mesial, buccal, rotation, torque, angulation].map(Math.abs),
        letters: [
          vert >= 0 ? "O" : "G",
          mesial >= 0 ? "M" : "D",
          buccal >= 0 ? "B" : "L",
          rotation >= 0 ? "O" : "I",
          torque >= 0 ? "B" : "L",
          angulation >= 0 ? "M" : "D",
        ],
      };
    } catch (err) {
      console.error(`Movement of tooth ${id} failed:`, err);
    }
  }
  return result;
}
