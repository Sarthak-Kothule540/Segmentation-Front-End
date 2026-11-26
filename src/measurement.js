// ---------------- Measurement: distance between two points, angle between three points ----------------
// The person clicks points on the teeth or gum (Viewer.jsx picks them). Each finished measurement becomes
// one "record" shown in the list on the left (MeasurementPanel.jsx) and drawn in the 3D view.

import * as THREE from "three";

export const MEASURE_POINTS = { distance: 2, angle: 3 }; // clicks needed by each tool

// "42_final.stl" -> "42"
const toothId = (name) => {
  const m = String(name || "").match(/(\d)(\d)/);
  return m ? m[1] + m[2] : null;
};

// the name shown in the list for one clicked point: "#42" on a tooth, "UpperJaw" / "LowerJaw" on the gum
export function pointName(jaw, partName) {
  const id = partName && !/gum|modelwithbase/i.test(partName) ? toothId(partName) : null;
  if (id) return "#" + id;
//   return jaw === "upper" ? "UpperJaw" : "LowerJaw";
return jaw === "upper" ? "Upper gum" : "Lower gum";
}

// distance in mm between two points
function distance(a, b) {
  return new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b));
}

// angle in degrees at the middle point b, between the lines b-a and b-c
function angle(a, b, c) {
  const u = new THREE.Vector3(...a).sub(new THREE.Vector3(...b));
  const v = new THREE.Vector3(...c).sub(new THREE.Vector3(...b));
  if (u.lengthSq() < 1e-12 || v.lengthSq() < 1e-12) return 0;
  return THREE.MathUtils.radToDeg(u.angleTo(v));
}

let nextId = 1;

// picks: [{ point: [x, y, z], name: "#42", jaw: "lower", gum: false }, ...]   viewKey: the view it was made in (records only show there)
export function makeRecord(kind, picks, viewKey) {
  const points = picks.map((p) => p.point);
  const value = kind === "distance" ? distance(points[0], points[1]) : angle(points[0], points[1], points[2]);
  return {
    id: nextId++,
    kind,
    points,
    location: picks.map((p) => p.name).join("-"), // e.g. "#42-#42" or "#44-LowerJaw"
    where: picks.map((p) => ({ jaw: p.jaw, gum: p.gum })), // which jaw / surface each point is on (hidden with it)
    value,
    text: formatValue(kind, value),
    visible: true,
    viewKey,
  };
}

export function formatValue(kind, value) {
  return kind === "distance" ? `${value.toFixed(2)} mm` : `${value.toFixed(1)} °`;
}
