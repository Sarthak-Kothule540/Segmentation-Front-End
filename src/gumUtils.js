import * as THREE from "three";

// Gum-only copy of a model: removes the triangles whose 3 corners
// are all corners of a tooth mesh. Returns null if nothing matched.
export function removeTeeth(wholeGeo, toothGeos) {
  const key = (x, y, z) =>
    `${Math.round(x * 1000)},${Math.round(y * 1000)},${Math.round(z * 1000)}`;

  const toothKeys = new Set();
  for (const g of toothGeos) {
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) toothKeys.add(key(p.getX(i), p.getY(i), p.getZ(i)));
  }

  const pos = wholeGeo.attributes.position;
  const index = wholeGeo.index;
  const triCount = index ? index.count / 3 : pos.count / 3;
  const vert = (t, k) => (index ? index.getX(t * 3 + k) : t * 3 + k);

  const out = [];
  let removed = 0;
  for (let t = 0; t < triCount; t++) {
    const v = [vert(t, 0), vert(t, 1), vert(t, 2)];
    const isTooth = v.every((i) => toothKeys.has(key(pos.getX(i), pos.getY(i), pos.getZ(i))));
    if (isTooth) {
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