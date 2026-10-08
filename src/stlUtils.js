import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// converts raw STL file data into a three.js geometry
export function parseStl(data) {
  const geo = new STLLoader().parse(data);
  geo.computeVertexNormals();
  geo.computeBoundingBox(); // the box around the model (min and max corners)
  return geo;
}