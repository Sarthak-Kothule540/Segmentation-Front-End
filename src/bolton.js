// // ---------------- Bolton analysis: are the upper and lower teeth the right size for each other? ----------------
// //
// // Simple idea: the upper teeth sit around the outside of the lower teeth, so the upper teeth together must be a
// // little wider than the lower teeth together. Bolton measured many good bites and found the normal ratio:
// //   3-3 Anterior Bolton = sum of the 6 lower front teeth (33..43) / sum of the 6 upper front teeth (13..23) x 100
// //                         normal = 77.2 %
// //   6-6 Total Bolton    = sum of the 12 lower teeth (36..46)      / sum of the 12 upper teeth (16..26)      x 100
// //                         normal = 91.3 %
// // Higher than normal = the lower teeth are too big ("Lower arch larger for X mm"),
// // lower than normal  = the upper teeth are too big ("Upper arch larger for X mm").
// // X = how many mm of tooth width is extra, compared with the normal ratio.
// //
// // Width of one tooth (mesiodistal width) = its size measured along the arch, from the side touching the
// // neighbour nearer the middle (mesial) to the side touching the neighbour further back (distal).
// // The app has no stored tooth axes, so for each tooth we start from the arch direction at that tooth (from its
// // two neighbours), then turn it up to SEARCH_DEG degrees to find the direction where the crown is shortest
// // (that is the tooth's own mesial-distal direction), and measure the crown from end to end along it.

// import * as THREE from "three";

// export const BOLTON_ANTERIOR_IDEAL = 77.2;
// export const BOLTON_TOTAL_IDEAL = 91.3;

// // the table rows: right side (1x / 4x) and left side (2x / 3x), from the middle backwards
// export const BOLTON_ROWS = {
//   upper: { right: ["11", "12", "13", "14", "15", "16", "17", "18"], left: ["21", "22", "23", "24", "25", "26", "27", "28"] },
//   lower: { right: ["41", "42", "43", "44", "45", "46", "47", "48"], left: ["31", "32", "33", "34", "35", "36", "37", "38"] },
// };

// const LINE_ABOVE_MM = 1.5; // how far past the tip of each tooth the arch line is drawn (smaller = closer to the teeth)
// const TICK_MM = 2; // length of the small marks between the teeth
// const SEARCH_DEG = 25; // the mesial-distal direction is looked for within this many degrees of the arch direction

// const toothId = (name) => {
//   const m = String(name).match(/(\d)(\d)/);
//   return m ? m[1] + m[2] : null;
// };

// // arch order of one jaw: right back tooth ... middle ... left back tooth
// const archOrder = (jaw) => {
//   const r = BOLTON_ROWS[jaw];
//   return [...r.right].reverse().concat(r.left);
// };

// // average of all vertices (good enough for the center of a crown)
// function centerOf(geo) {
//   const p = geo.attributes.position.array;
//   const c = new THREE.Vector3();
//   const n = p.length / 3;
//   for (let i = 0; i < p.length; i += 3) {
//     c.x += p[i];
//     c.y += p[i + 1];
//     c.z += p[i + 2];
//   }
//   return n ? c.divideScalar(n) : c;
// }

// // vertex positions of the biggest connected piece of a crown (small loose bits from segmentation are left out,
// // they would make the tooth look wider than it is)
// function mainPiece(geo) {
//   const pos = geo.attributes.position.array;
//   const n = pos.length / 3;
//   const idx = geo.index ? geo.index.array : null;
//   if (!idx) return pos; // no shared vertices: cannot tell the pieces apart
//   const parent = new Int32Array(n);
//   for (let i = 0; i < n; i++) parent[i] = i;
//   const find = (x) => {
//     while (parent[x] !== x) {
//       parent[x] = parent[parent[x]];
//       x = parent[x];
//     }
//     return x;
//   };
//   const join = (a, b) => {
//     a = find(a);
//     b = find(b);
//     if (a !== b) parent[b] = a;
//   };
//   for (let t = 0; t < idx.length; t += 3) {
//     join(idx[t], idx[t + 1]);
//     join(idx[t], idx[t + 2]);
//   }
//   const count = new Map();
//   let best = -1, bestCount = 0;
//   for (let i = 0; i < n; i++) {
//     const r = find(i);
//     const c = (count.get(r) || 0) + 1;
//     count.set(r, c);
//     if (c > bestCount) { bestCount = c; best = r; }
//   }
//   if (count.size === 1) return pos;
//   const out = new Float32Array(bestCount * 3);
//   let k = 0;
//   for (let i = 0; i < n; i++) {
//     if (find(i) !== best) continue;
//     out[k++] = pos[3 * i];
//     out[k++] = pos[3 * i + 1];
//     out[k++] = pos[3 * i + 2];
//   }
//   return out;
// }

// // one jaw: width of every tooth + the points for the line drawn in the 3D view
// // up = the occlusal direction of this jaw (the way the crowns point)
// function measureJaw(jaw, parts, up) {
//   const teeth = [];
//   for (const id of archOrder(jaw)) {
//     const p = parts.find((x) => toothId(x.name) === id && x.geo && x.geo.attributes.position);
//     if (!p) continue;
//     const pos = mainPiece(p.geo);
//     teeth.push({ id, pos, center: centerOf({ attributes: { position: { array: pos } } }) });
//   }
//   const widths = {};
//   if (!teeth.length) return { widths, line: null };

//   const flat = (v) => v.clone().addScaledVector(up, -v.dot(up)); // seen from above (height removed)
//   const side = new THREE.Vector3(); // second flat axis, at right angles to the arch direction

//   const ends = []; // per tooth: the two end points (flat), its tip height and its width
//   teeth.forEach((t, i) => {
//     // rough arch direction at this tooth: from the tooth before to the tooth after
//     const prev = teeth[Math.max(0, i - 1)].center;
//     const next = teeth[Math.min(teeth.length - 1, i + 1)].center;
//     let dir = flat(next.clone().sub(prev));
//     if (dir.lengthSq() < 1e-6) dir = flat(new THREE.Vector3(1, 0, 0));
//     dir.normalize();
//     side.crossVectors(up, dir).normalize();

//     // crown seen from above, in (along arch, across arch) coordinates
//     const pos = t.pos;
//     const n = pos.length / 3;
//     const u = new Float32Array(n), w = new Float32Array(n);
//     const v = new THREE.Vector3();
//     let tip = -Infinity;
//     for (let k = 0; k < n; k++) {
//       v.set(pos[3 * k], pos[3 * k + 1], pos[3 * k + 2]);
//       u[k] = v.dot(dir);
//       w[k] = v.dot(side);
//       const h = v.dot(up);
//       if (h > tip) tip = h;
//     }

//     // the rough direction can be a few degrees off, and a nearly square molar then looks much wider
//     // (11 mm turned by 10 degrees reads 12.6 mm). Turning to the true mesial-distal direction gives the
//     // smallest length, so we try every angle within SEARCH_DEG of the rough direction and keep the smallest.
//     let best = { width: Infinity, ang: 0, min: 0, max: 0 };
//     for (let deg = -SEARCH_DEG; deg <= SEARCH_DEG; deg += 1) {
//       const ca = Math.cos((deg * Math.PI) / 180), sa = Math.sin((deg * Math.PI) / 180);
//       let min = Infinity, max = -Infinity;
//       for (let k = 0; k < n; k++) {
//         const s = u[k] * ca + w[k] * sa;
//         if (s < min) min = s;
//         if (s > max) max = s;
//       }
//       if (max - min < best.width) best = { width: max - min, ang: deg, min, max };
//     }
//     const rad = (best.ang * Math.PI) / 180;
//     const md = dir.clone().multiplyScalar(Math.cos(rad)).addScaledVector(side, Math.sin(rad)); // mesial-distal direction

//     widths[t.id] = best.width;
//     // where the tooth starts and ends, laid on the arch direction through the crown center
//     // (the line is drawn there, so it stays on the arch even when a tooth is turned)
//     const c = flat(t.center);
//     const cm = t.center.dot(md);
//     const onArch = (q) => c.clone().addScaledVector(dir, q.clone().sub(c).dot(dir));
//     const a = onArch(c.clone().addScaledVector(md, best.min - cm)); // end toward the tooth before
//     const b = onArch(c.clone().addScaledVector(md, best.max - cm)); // end toward the tooth after
//     ends.push({ id: t.id, a, b, mid: a.clone().add(b).multiplyScalar(0.5), tip, width: best.width });
//   });

//   // height of the line over each tooth: its own tip + LINE_ABOVE_MM, evened out with its neighbours
//   // (two passes) so the line rises and falls gently: low over the front teeth, higher where the teeth are higher
//   let h = ends.map((e) => e.tip + LINE_ABOVE_MM);
//   for (let pass = 0; pass < 2; pass++) {
//     h = h.map((x, i) => 0.25 * h[Math.max(0, i - 1)] + 0.5 * x + 0.25 * h[Math.min(h.length - 1, i + 1)]);
//   }
//   // never inside a tooth
//   h = h.map((x, i) => Math.max(x, ends[i].tip + 0.5));

//   const at = (p, height) => p.clone().addScaledVector(up, height);
//   const tick = (p) => [p, p.clone().addScaledVector(up, -TICK_MM)];
//   const points = []; // the marks, in arch order: the line is straight from one mark to the next
//   const ticks = [];
//   const labels = [];
//   const addMark = (p) => {
//     points.push(p);
//     ticks.push(tick(p));
//     return p;
//   };

//   // where each tooth starts and ends on the line
//   let start = addMark(at(ends[0].a, h[0]));
//   ends.forEach((e, i) => {
//     let end, nextStart;
//     if (i === ends.length - 1) {
//       end = addMark(at(e.b, h[i]));
//     } else {
//       const nxt = ends[i + 1];
//       const hb = (h[i] + h[i + 1]) / 2;
//       // one mark between two neighbouring teeth, half way between where one ends and the next starts
//       end = nextStart = addMark(at(e.b.clone().add(nxt.a).multiplyScalar(0.5), hb));
//     }
//     // the label sits ON the line, half way between the tooth's two marks; the Viewer lifts it a few pixels
//     labels.push({ id: e.id, width: e.width, position: start.clone().add(end).multiplyScalar(0.5) });
//     start = nextStart;
//   });
//   return { widths, line: { points, ticks, labels } };
// }

// const sum = (widths, ids) => {
//   let s = 0;
//   for (const id of ids) {
//     if (widths[id] == null) return null; // a tooth is missing: no sum
//     s += widths[id];
//   }
//   return s;
// };

// // ratio = lower / upper x 100; extra = how many mm too much, and in which arch
// function boltonRatio(lowerSum, upperSum, ideal) {
//   if (lowerSum == null || upperSum == null || !(upperSum > 0)) return null;
//   const percent = (lowerSum / upperSum) * 100;
//   const k = ideal / 100;
//   if (percent >= ideal) return { percent, larger: "Lower", mm: lowerSum - upperSum * k, ideal };
//   return { percent, larger: "Upper", mm: upperSum - lowerSum / k, ideal };
// }

// const ids = (jaw, side, count) => BOLTON_ROWS[jaw][side].slice(0, count);

// // parts: { upper: [{ name, geo }], lower: [...] } (teeth only)
// // Returns { widths: { "11": 8.21, ... }, sums, anterior, total, lines: { upper, lower } }
// export function computeBolton(parts) {
//   const upperList = parts.upper || [];
//   const lowerList = parts.lower || [];

//   // the upper crowns point toward the lower crowns (Z is up, so normally down)
//   let upperUp = new THREE.Vector3(0, 0, -1);
//   if (upperList.length && lowerList.length) {
//     const avg = (list) => list.reduce((c, p) => c.add(centerOf(p.geo)), new THREE.Vector3()).divideScalar(list.length);
//     const d = avg(lowerList).sub(avg(upperList));
//     if (Math.abs(d.z) > 1) upperUp = new THREE.Vector3(0, 0, Math.sign(d.z));
//   }
//   const lowerUp = upperUp.clone().negate();

//   const up = measureJaw("upper", upperList, upperUp);
//   const lo = measureJaw("lower", lowerList, lowerUp);
//   const widths = { ...up.widths, ...lo.widths };

//   const sums = {
//     upper33: sum(widths, [...ids("upper", "right", 3), ...ids("upper", "left", 3)]),
//     upper66: sum(widths, [...ids("upper", "right", 6), ...ids("upper", "left", 6)]),
//     lower33: sum(widths, [...ids("lower", "right", 3), ...ids("lower", "left", 3)]),
//     lower66: sum(widths, [...ids("lower", "right", 6), ...ids("lower", "left", 6)]),
//   };

//   return {
//     widths,
//     sums,
//     anterior: boltonRatio(sums.lower33, sums.upper33, BOLTON_ANTERIOR_IDEAL),
//     total: boltonRatio(sums.lower66, sums.upper66, BOLTON_TOTAL_IDEAL),
//     lines: { upper: up.line, lower: lo.line },
//   };
// }





// ---------------- Bolton analysis: are the upper and lower teeth the right size for each other? ----------------
//
// Simple idea: the upper teeth sit around the outside of the lower teeth, so the upper teeth together must be a
// little wider than the lower teeth together. Bolton measured many good bites and found the normal ratio:
//   3-3 Anterior Bolton = sum of the 6 lower front teeth (33..43) / sum of the 6 upper front teeth (13..23) x 100
//                         normal = 77.2 %
//   6-6 Total Bolton    = sum of the 12 lower teeth (36..46)      / sum of the 12 upper teeth (16..26)      x 100
//                         normal = 91.3 %
// Higher than normal = the lower teeth are too big ("Lower arch larger for X mm"),
// lower than normal  = the upper teeth are too big ("Upper arch larger for X mm").
// X = how many mm of tooth width is extra, compared with the normal ratio.
//
// Width of one tooth (mesiodistal width) = its size measured along the arch, from the side touching the
// neighbour nearer the middle (mesial) to the side touching the neighbour further back (distal).
// The app has no stored tooth axes, so for each tooth we start from the arch direction at that tooth (from its
// two neighbours), then turn it up to SEARCH_DEG degrees to find the direction where the crown is shortest
// (that is the tooth's own mesial-distal direction), and measure the crown from end to end along it.

import * as THREE from "three";

export const BOLTON_ANTERIOR_IDEAL = 77.2;
export const BOLTON_TOTAL_IDEAL = 91.3;

// the table rows: right side (1x / 4x) and left side (2x / 3x), from the middle backwards
export const BOLTON_ROWS = {
  upper: { right: ["11", "12", "13", "14", "15", "16", "17", "18"], left: ["21", "22", "23", "24", "25", "26", "27", "28"] },
  lower: { right: ["41", "42", "43", "44", "45", "46", "47", "48"], left: ["31", "32", "33", "34", "35", "36", "37", "38"] },
};

const LINE_ABOVE_MM = 1.5; // how far past the tip of each tooth the arch line is drawn (smaller = closer to the teeth)
const TICK_MM = 2; // length of the small marks between the teeth
const SEARCH_DEG = 25; // the mesial-distal direction is looked for within this many degrees of the arch direction

const toothId = (name) => {
  const m = String(name).match(/(\d)(\d)/);
  return m ? m[1] + m[2] : null;
};

// arch order of one jaw: right back tooth ... middle ... left back tooth
const archOrder = (jaw) => {
  const r = BOLTON_ROWS[jaw];
  return [...r.right].reverse().concat(r.left);
};

// average of all vertices (good enough for the center of a crown)
function centerOf(geo) {
  const p = geo.attributes.position.array;
  const c = new THREE.Vector3();
  const n = p.length / 3;
  for (let i = 0; i < p.length; i += 3) {
    c.x += p[i];
    c.y += p[i + 1];
    c.z += p[i + 2];
  }
  return n ? c.divideScalar(n) : c;
}

// vertex positions of the biggest connected piece of a crown (small loose bits from segmentation are left out,
// they would make the tooth look wider than it is)
function mainPiece(geo) {
  const pos = geo.attributes.position.array;
  const n = pos.length / 3;
  const idx = geo.index ? geo.index.array : null;
  if (!idx) return pos; // no shared vertices: cannot tell the pieces apart
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const join = (a, b) => {
    a = find(a);
    b = find(b);
    if (a !== b) parent[b] = a;
  };
  for (let t = 0; t < idx.length; t += 3) {
    join(idx[t], idx[t + 1]);
    join(idx[t], idx[t + 2]);
  }
  const count = new Map();
  let best = -1, bestCount = 0;
  for (let i = 0; i < n; i++) {
    const r = find(i);
    const c = (count.get(r) || 0) + 1;
    count.set(r, c);
    if (c > bestCount) { bestCount = c; best = r; }
  }
  if (count.size === 1) return pos;
  const out = new Float32Array(bestCount * 3);
  let k = 0;
  for (let i = 0; i < n; i++) {
    if (find(i) !== best) continue;
    out[k++] = pos[3 * i];
    out[k++] = pos[3 * i + 1];
    out[k++] = pos[3 * i + 2];
  }
  return out;
}

// the flat plane that fits the tooth tips best: returns a function giving the plane height (along up) at a flat point
// (least squares: height = k0 + k1 * x + k2 * y, x and y = two flat directions)
function fitTipPlane(ends, up) {
  const maxTip = Math.max(...ends.map((e) => e.tip));
  if (ends.length < 3) return () => maxTip;
  const ex = Math.abs(up.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  ex.addScaledVector(up, -ex.dot(up)).normalize();
  const ey = new THREE.Vector3().crossVectors(up, ex);
  // normal equations A k = r
  const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const r = [0, 0, 0];
  for (const e of ends) {
    const row = [1, e.mid.dot(ex), e.mid.dot(ey)];
    for (let a = 0; a < 3; a++) {
      r[a] += row[a] * e.tip;
      for (let b = 0; b < 3; b++) A[a][b] += row[a] * row[b];
    }
  }
  const det = (M) =>
    M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
    M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
    M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const D = det(A);
  if (Math.abs(D) < 1e-9) return () => maxTip; // teeth in a straight row: use a level plane
  const k = [0, 1, 2].map((c) => det(A.map((row, a) => row.map((v, b) => (b === c ? r[a] : v)))) / D);
  return (p) => k[0] + k[1] * p.dot(ex) + k[2] * p.dot(ey);
}

// one jaw: width of every tooth + the points for the line drawn in the 3D view
// up = the occlusal direction of this jaw (the way the crowns point)
function measureJaw(jaw, parts, up) {
  const teeth = [];
  for (const id of archOrder(jaw)) {
    const p = parts.find((x) => toothId(x.name) === id && x.geo && x.geo.attributes.position);
    if (!p) continue;
    const pos = mainPiece(p.geo);
    teeth.push({ id, pos, center: centerOf({ attributes: { position: { array: pos } } }) });
  }
  const widths = {};
  if (!teeth.length) return { widths, line: null };

  const flat = (v) => v.clone().addScaledVector(up, -v.dot(up)); // seen from above (height removed)
  const side = new THREE.Vector3(); // second flat axis, at right angles to the arch direction

  const ends = []; // per tooth: the two end points (flat), its tip height and its width
  teeth.forEach((t, i) => {
    // rough arch direction at this tooth: from the tooth before to the tooth after
    const prev = teeth[Math.max(0, i - 1)].center;
    const next = teeth[Math.min(teeth.length - 1, i + 1)].center;
    let dir = flat(next.clone().sub(prev));
    if (dir.lengthSq() < 1e-6) dir = flat(new THREE.Vector3(1, 0, 0));
    dir.normalize();
    side.crossVectors(up, dir).normalize();

    // crown seen from above, in (along arch, across arch) coordinates
    const pos = t.pos;
    const n = pos.length / 3;
    const u = new Float32Array(n), w = new Float32Array(n);
    const v = new THREE.Vector3();
    let tip = -Infinity;
    for (let k = 0; k < n; k++) {
      v.set(pos[3 * k], pos[3 * k + 1], pos[3 * k + 2]);
      u[k] = v.dot(dir);
      w[k] = v.dot(side);
      const h = v.dot(up);
      if (h > tip) tip = h;
    }

    // the rough direction can be a few degrees off, and a nearly square molar then looks much wider
    // (11 mm turned by 10 degrees reads 12.6 mm). Turning to the true mesial-distal direction gives the
    // smallest length, so we try every angle within SEARCH_DEG of the rough direction and keep the smallest.
    let best = { width: Infinity, ang: 0, min: 0, max: 0 };
    for (let deg = -SEARCH_DEG; deg <= SEARCH_DEG; deg += 1) {
      const ca = Math.cos((deg * Math.PI) / 180), sa = Math.sin((deg * Math.PI) / 180);
      let min = Infinity, max = -Infinity;
      for (let k = 0; k < n; k++) {
        const s = u[k] * ca + w[k] * sa;
        if (s < min) min = s;
        if (s > max) max = s;
      }
      if (max - min < best.width) best = { width: max - min, ang: deg, min, max };
    }
    const rad = (best.ang * Math.PI) / 180;
    const md = dir.clone().multiplyScalar(Math.cos(rad)).addScaledVector(side, Math.sin(rad)); // mesial-distal direction

    widths[t.id] = best.width;
    // where the tooth starts and ends, laid on the arch direction through the crown center
    // (the line is drawn there, so it stays on the arch even when a tooth is turned)
    const c = flat(t.center);
    const cm = t.center.dot(md);
    const onArch = (q) => c.clone().addScaledVector(dir, q.clone().sub(c).dot(dir));
    const a = onArch(c.clone().addScaledVector(md, best.min - cm)); // end toward the tooth before
    const b = onArch(c.clone().addScaledVector(md, best.max - cm)); // end toward the tooth after
    ends.push({ id: t.id, a, b, mid: a.clone().add(b).multiplyScalar(0.5), tip, width: best.width });
  });

  // the whole line lies in ONE flat plane: the plane that fits the tips of the teeth best (it may tilt a little,
  // following how the jaw sits), moved up so every tip is under it, plus LINE_ABOVE_MM
  const planeAt = fitTipPlane(ends, up);
  let lift = -Infinity;
  for (const e of ends) lift = Math.max(lift, e.tip - planeAt(e.mid));
  const heightAt = (p) => planeAt(p) + lift + LINE_ABOVE_MM;

  const at = (p, height) => p.clone().addScaledVector(up, height);
  const tick = (p) => [p, p.clone().addScaledVector(up, -TICK_MM)];
  const points = []; // the marks, in arch order: the line is straight from one mark to the next
  const ticks = [];
  const labels = [];
  const addMark = (p) => {
    points.push(p);
    ticks.push(tick(p));
    return p;
  };

  // where each tooth starts and ends on the line
  let start = addMark(at(ends[0].a, heightAt(ends[0].a)));
  ends.forEach((e, i) => {
    let end, nextStart;
    if (i === ends.length - 1) {
      end = addMark(at(e.b, heightAt(e.b)));
    } else {
      const nxt = ends[i + 1];
      // one mark between two neighbouring teeth, half way between where one ends and the next starts
      const m = e.b.clone().add(nxt.a).multiplyScalar(0.5);
      end = nextStart = addMark(at(m, heightAt(m)));
    }
    // the label sits ON the line, half way between the tooth's two marks; the Viewer lifts it a few pixels
    labels.push({ id: e.id, width: e.width, position: start.clone().add(end).multiplyScalar(0.5) });
    start = nextStart;
  });
  return { widths, line: { points, ticks, labels } };
}

const sum = (widths, ids) => {
  let s = 0;
  for (const id of ids) {
    if (widths[id] == null) return null; // a tooth is missing: no sum
    s += widths[id];
  }
  return s;
};

// ratio = lower / upper x 100; extra = how many mm too much, and in which arch
function boltonRatio(lowerSum, upperSum, ideal) {
  if (lowerSum == null || upperSum == null || !(upperSum > 0)) return null;
  const percent = (lowerSum / upperSum) * 100;
  const k = ideal / 100;
  if (percent >= ideal) return { percent, larger: "Lower", mm: lowerSum - upperSum * k, ideal };
  return { percent, larger: "Upper", mm: upperSum - lowerSum / k, ideal };
}

const ids = (jaw, side, count) => BOLTON_ROWS[jaw][side].slice(0, count);

// parts: { upper: [{ name, geo }], lower: [...] } (teeth only)
// Returns { widths: { "11": 8.21, ... }, sums, anterior, total, lines: { upper, lower } }
export function computeBolton(parts) {
  const upperList = parts.upper || [];
  const lowerList = parts.lower || [];

  // the upper crowns point toward the lower crowns (Z is up, so normally down)
  let upperUp = new THREE.Vector3(0, 0, -1);
  if (upperList.length && lowerList.length) {
    const avg = (list) => list.reduce((c, p) => c.add(centerOf(p.geo)), new THREE.Vector3()).divideScalar(list.length);
    const d = avg(lowerList).sub(avg(upperList));
    if (Math.abs(d.z) > 1) upperUp = new THREE.Vector3(0, 0, Math.sign(d.z));
  }
  const lowerUp = upperUp.clone().negate();

  const up = measureJaw("upper", upperList, upperUp);
  const lo = measureJaw("lower", lowerList, lowerUp);
  const widths = { ...up.widths, ...lo.widths };

  const sums = {
    upper33: sum(widths, [...ids("upper", "right", 3), ...ids("upper", "left", 3)]),
    upper66: sum(widths, [...ids("upper", "right", 6), ...ids("upper", "left", 6)]),
    lower33: sum(widths, [...ids("lower", "right", 3), ...ids("lower", "left", 3)]),
    lower66: sum(widths, [...ids("lower", "right", 6), ...ids("lower", "left", 6)]),
  };

  return {
    widths,
    sums,
    anterior: boltonRatio(sums.lower33, sums.upper33, BOLTON_ANTERIOR_IDEAL),
    total: boltonRatio(sums.lower66, sums.upper66, BOLTON_TOTAL_IDEAL),
    lines: { upper: up.line, lower: lo.line },
  };
}
