// import * as THREE from "three";

// // Gum-only copy of a model: removes the triangles whose 3 corners
// // are all corners of a tooth mesh. Returns null if nothing matched.
// export function removeTeeth(wholeGeo, toothGeos) {
//   const key = (x, y, z) =>
//     `${Math.round(x * 1000)},${Math.round(y * 1000)},${Math.round(z * 1000)}`;

//   const toothKeys = new Set();
//   for (const g of toothGeos) {
//     const p = g.attributes.position;
//     for (let i = 0; i < p.count; i++) toothKeys.add(key(p.getX(i), p.getY(i), p.getZ(i)));
//   }

//   const pos = wholeGeo.attributes.position;
//   const index = wholeGeo.index;
//   const triCount = index ? index.count / 3 : pos.count / 3;
//   const vert = (t, k) => (index ? index.getX(t * 3 + k) : t * 3 + k);

//   const out = [];
//   let removed = 0;
//   for (let t = 0; t < triCount; t++) {
//     const v = [vert(t, 0), vert(t, 1), vert(t, 2)];
//     const isTooth = v.every((i) => toothKeys.has(key(pos.getX(i), pos.getY(i), pos.getZ(i))));
//     if (isTooth) {
//       removed++;
//       continue;
//     }
//     for (const i of v) out.push(pos.getX(i), pos.getY(i), pos.getZ(i));
//   }

//   console.log(`removeTeeth: removed ${removed} of ${triCount} triangles`);
//   if (removed === 0) return null;

//   const geo = new THREE.BufferGeometry();
//   geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(out), 3));
//   geo.computeVertexNormals();
//   return geo;
// }



import * as THREE from "three";

// Gum-only copy of a model: removes the triangles that also exist in a tooth mesh.
// A triangle is matched by all 3 of its corners together, so gum triangles that only
// touch the tooth border are kept. Returns null if nothing matched.
export function removeTeeth(wholeGeo, toothGeos) {
  const key = (x, y, z) =>
    `${Math.round(x * 1000)},${Math.round(y * 1000)},${Math.round(z * 1000)}`;

  // one key per triangle: its 3 corner keys, sorted, so the corner order does not matter
  const triKey = (a, b, c) => [a, b, c].sort().join("|");

  const toothTris = new Set();
  for (const g of toothGeos) {
    const p = g.attributes.position;
    const idx = g.index;
    const count = idx ? idx.count / 3 : p.count / 3;
    const v = (t, k) => (idx ? idx.getX(t * 3 + k) : t * 3 + k);
    for (let t = 0; t < count; t++) {
      const k = [0, 1, 2].map((c) => {
        const i = v(t, c);
        return key(p.getX(i), p.getY(i), p.getZ(i));
      });
      toothTris.add(triKey(k[0], k[1], k[2]));
    }
  }

  const pos = wholeGeo.attributes.position;
  const index = wholeGeo.index;
  const triCount = index ? index.count / 3 : pos.count / 3;
  const vert = (t, k) => (index ? index.getX(t * 3 + k) : t * 3 + k);

  const out = [];
  let removed = 0;
  for (let t = 0; t < triCount; t++) {
    const v = [vert(t, 0), vert(t, 1), vert(t, 2)];
    const k = v.map((i) => key(pos.getX(i), pos.getY(i), pos.getZ(i)));
    if (toothTris.has(triKey(k[0], k[1], k[2]))) {
      removed++;
      continue;
    }
    for (const i of v) out.push(pos.getX(i), pos.getY(i), pos.getZ(i));
  }

  console.log(`removeTeeth: removed ${removed} of ${triCount} triangles`);
  if (removed === 0) return null;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(out), 3));
  geo.computeVertexNormals();
  return geo;
}