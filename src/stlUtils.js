// import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// // converts raw STL file data into a three.js geometry
// export function parseStl(data) {
//   const geo = new STLLoader().parse(data);
//   geo.computeVertexNormals();
//   geo.computeBoundingBox(); // the box around the model (min and max corners)
//   return geo;
// }



import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// converts raw STL file data into a three.js geometry
export function parseStl(data) {
  let geo = new STLLoader().parse(data);

  geo.deleteAttribute("normal"); // the per-triangle normals stop vertices from merging
  geo = mergeVertices(geo, 1e-4); // joins vertices that sit at the same place
  geo.computeVertexNormals(); // now the normals are smooth

  geo.computeBoundingBox(); // the box around the model (min and max corners)
  return geo;
}