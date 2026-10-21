// // import * as THREE from "three";

// // // maximum number of editable points (handles) for each tooth curve
// // export const MAX_HANDLES = 20;

// // // CSV text: one point per line as "x,y,z"  ->  list of 3D points
// // export function parseLatCsv(text) {
// //   const points = [];
// //   for (const line of text.split(/\r?\n/)) {
// //     const parts = line.trim().split(/[,;\s]+/).map(Number);
// //     // lines that are not 3 numbers (empty lines, a header) are skipped
// //     if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
// //       points.push(new THREE.Vector3(parts[0], parts[1], parts[2]));
// //     }
// //   }
// //   return points;
// // }

// // // picks at most maxHandles points, evenly spread along the curve
// // export function makeControlPoints(points, maxHandles = MAX_HANDLES) {
// //   let pts = points;

// //   // if the last point repeats the first one, drop it (the curve is closed anyway)
// //   if (pts.length > 3 && pts[0].distanceTo(pts[pts.length - 1]) < 1e-4) {
// //     pts = pts.slice(0, -1);
// //   }

// //   if (pts.length <= maxHandles) return pts.map((p) => p.clone());

// //   const step = pts.length / maxHandles;
// //   const result = [];
// //   for (let i = 0; i < maxHandles; i++) {
// //     result.push(pts[Math.floor(i * step)].clone());
// //   }
// //   return result;
// // }

// // // downloads the CSV files of one jaw from the backend
// // // returns: [{ id: "11", points: [Vector3, ...] }, ...]
// // export async function loadLatCurves(backendUrl, jaw, fileNames, stamp) {
// //   const curves = [];

// //   for (const name of fileNames) {
// //     const res = await fetch(`${backendUrl}/files/${jaw}/Output/${name}?t=${stamp}`);
// //     const text = await res.text();
// //     const all = parseLatCsv(text);

// //     if (all.length < 3) continue; // not enough points for a curve

// //     curves.push({
// //       id: name.replace(/\.csv$/i, ""), // "11.csv" -> "11"
// //       points: makeControlPoints(all),
// //     });
// //   }

// //   return curves;
// // }







// import * as THREE from "three";

// // maximum number of editable points (handles) for each tooth curve
// export const MAX_HANDLES = 20;

// // number of points written to the CSV when an edited curve is saved
// export const SAVE_SAMPLES = 200;

// // CSV text: one point per line as "x,y,z"  ->  list of 3D points
// export function parseLatCsv(text) {
//   const points = [];
//   for (const line of text.split(/\r?\n/)) {
//     const parts = line.trim().split(/[,;\s]+/).map(Number);
//     // lines that are not 3 numbers (empty lines, a header) are skipped
//     if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
//       points.push(new THREE.Vector3(parts[0], parts[1], parts[2]));
//     }
//   }
//   return points;
// }

// // picks at most maxHandles points, evenly spread along the curve
// export function makeControlPoints(points, maxHandles = MAX_HANDLES) {
//   let pts = points;

//   // if the last point repeats the first one, drop it (the curve is closed anyway)
//   if (pts.length > 3 && pts[0].distanceTo(pts[pts.length - 1]) < 1e-4) {
//     pts = pts.slice(0, -1);
//   }

//   if (pts.length <= maxHandles) return pts.map((p) => p.clone());

//   const step = pts.length / maxHandles;
//   const result = [];
//   for (let i = 0; i < maxHandles; i++) {
//     result.push(pts[Math.floor(i * step)].clone());
//   }
//   return result;
// }

// // downloads the CSV files of one jaw from the backend
// // returns: [{ id: "11", points: [Vector3, ...] }, ...]
// export async function loadLatCurves(backendUrl, jaw, fileNames, stamp) {
//   const curves = [];

//   for (const name of fileNames) {
//     const res = await fetch(`${backendUrl}/files/${jaw}/Output/${name}?t=${stamp}`);
//     const text = await res.text();
//     const all = parseLatCsv(text);

//     if (all.length < 3) continue; // not enough points for a curve

//     curves.push({
//       id: name.replace(/\.csv$/i, ""), // "11.csv" -> "11"
//       points: makeControlPoints(all),
//     });
//   }

//   return curves;
// }

// // edited control points -> CSV text (smooth spline sampled into SAVE_SAMPLES points)
// export function curveToCsv(controlPoints, samples = SAVE_SAMPLES) {
//   const spline = new THREE.CatmullRomCurve3(controlPoints, true, "centripetal");
//   const pts = spline.getPoints(samples).slice(0, -1); // the last point repeats the first
//   return pts.map((p) => `${p.x},${p.y},${p.z}`).join("\n") + "\n";
// }

// // sends one edited curve to the backend, which writes it to <tooth>.csv
// export async function saveLatCurve(backendUrl, jaw, id, controlPoints) {
//   const res = await fetch(`${backendUrl}/api/save-lat`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ jaw, id, csv: curveToCsv(controlPoints) }),
//   });
//   const result = await res.json();
//   if (!res.ok) throw new Error(result.message);
//   return result;
// }




import * as THREE from "three";
import { parseStl } from "./stlUtils.js";

// maximum number of editable points (handles) for each tooth curve
export const MAX_HANDLES = 15;

// number of points written to the CSV when an edited curve is saved
export const SAVE_SAMPLES = 80;

// CSV text: one point per line as "x,y,z"  ->  list of 3D points
export function parseLatCsv(text) {
  const points = [];
  for (const line of text.split(/\r?\n/)) {
    const parts = line.trim().split(/[,;\s]+/).map(Number);
    // lines that are not 3 numbers (empty lines, a header) are skipped
    if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
      points.push(new THREE.Vector3(parts[0], parts[1], parts[2]));
    }
  }
  return points;
}

// picks at most maxHandles points, evenly spread along the curve
export function makeControlPoints(points, maxHandles = MAX_HANDLES) {
  let pts = points;

  // if the last point repeats the first one, drop it (the curve is closed anyway)
  if (pts.length > 3 && pts[0].distanceTo(pts[pts.length - 1]) < 1e-4) {
    pts = pts.slice(0, -1);
  }

  if (pts.length <= maxHandles) return pts.map((p) => p.clone());

  const step = pts.length / maxHandles;
  const result = [];
  for (let i = 0; i < maxHandles; i++) {
    result.push(pts[Math.floor(i * step)].clone());
  }
  return result;
}

// downloads the CSV files of one jaw from the backend
// returns: [{ id: "11", points: [Vector3, ...] }, ...]
export async function loadLatCurves(backendUrl, jaw, fileNames, stamp) {
  const curves = [];

  for (const name of fileNames) {
    const res = await fetch(`${backendUrl}/files/${jaw}/Output/${name}?t=${stamp}`);
    const text = await res.text();
    const all = parseLatCsv(text);

    if (all.length < 3) continue; // not enough points for a curve

    curves.push({
      id: name.replace(/\.csv$/i, ""), // "11.csv" -> "11"
      points: makeControlPoints(all),
    });
  }

  return curves;
}

// edited control points -> CSV text (smooth spline sampled into SAVE_SAMPLES points)
export function curveToCsv(controlPoints, samples = SAVE_SAMPLES) {
  const spline = new THREE.CatmullRomCurve3(controlPoints, true, "centripetal");
  const pts = spline.getPoints(samples).slice(0, -1); // the last point repeats the first
  return pts.map((p) => `${p.x},${p.y},${p.z}`).join("\n") + "\n";
}

// sends one edited curve to the backend, which writes it to <tooth>.csv
export async function saveLatCurve(backendUrl, jaw, id, controlPoints) {
  const res = await fetch(`${backendUrl}/api/save-lat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jaw, id, csv: curveToCsv(controlPoints) }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

// downloads the STL files (gum and teeth) of one jaw from the backend
// returns: [{ name: "Gum.stl", geo }, { name: "11.stl", geo }, ...]
export async function loadStlParts(backendUrl, jaw, fileNames, stamp) {
  return Promise.all(
    fileNames.map(async (name) => {
      const res = await fetch(`${backendUrl}/files/${jaw}/Output/${name}?t=${stamp}`);
      return { name, geo: parseStl(await res.arrayBuffer()) };
    })
  );
}



// downloads a CSV file with "x,y,z" lines and returns the points
export async function loadPointsFile(url) {
  const res = await fetch(url);
  return parseLatCsv(await res.text());
}

// downloads an STL file and returns its geometry
export async function loadStlFile(url) {
  const res = await fetch(url);
  return parseStl(await res.arrayBuffer());
}




// one label file: two points (x,y,z) -> { a, b } or null
// accepted: two lines "x,y,z", or one line with six numbers. Anything else is skipped.
export function parseLabelFile(text) {
  const rows = text
    .split(/\r?\n/)
    .map((line) =>
      line
        .trim()
        .split(/[,;\s]+/)
        .filter((t) => t !== "")
        .map(Number)
    )
    .filter((r) => r.length >= 3 && r.every(Number.isFinite));

  if (rows.length === 2) {
    return {
      a: new THREE.Vector3(rows[0][0], rows[0][1], rows[0][2]),
      b: new THREE.Vector3(rows[1][0], rows[1][1], rows[1][2]),
    };
  }
  if (rows.length === 1 && rows[0].length >= 6) {
    return {
      a: new THREE.Vector3(rows[0][0], rows[0][1], rows[0][2]),
      b: new THREE.Vector3(rows[0][3], rows[0][4], rows[0][5]),
    };
  }
  return null;
}

// downloads the label csv files of one jaw -> [{ id: "11", a: Vector3, b: Vector3 }, ...]
export async function loadToothLabels(backendUrl, jaw, files, stamp) {
  const labels = [];

  for (const rel of files) {
    const fileName = rel.split("/").pop();
    // tooth number (11-18, 21-28, 31-38, 41-48) from the file name
    const match = fileName.match(/(^|\D)([1-4][1-8])(\D|$)/);
    if (!match) continue;

    const res = await fetch(`${backendUrl}/files/${jaw}/${rel}?t=${stamp}`);
    const line = parseLabelFile(await res.text());
    if (line) labels.push({ id: match[2], ...line });
  }

  return labels;
}


// number of editable points on the trimline of one jaw
export const TRIMLINE_HANDLES = 64;

// Trimline.csv points -> { points (the editable points), total, closed, file } or null
export function makeTrimlineData(allPoints, file, handles = TRIMLINE_HANDLES) {
  if (!allPoints || allPoints.length < 4) return null;

  // closed if the line ends where it starts
  const closed = allPoints[0].distanceTo(allPoints[allPoints.length - 1]) < 0.5;
  const pts = closed ? allPoints.slice(0, -1) : allPoints; // the last point repeats the first

  const n = pts.length;
  const count = Math.min(handles, n);
  const points = [];
  for (let i = 0; i < count; i++) {
    const index = closed ? Math.floor((i * n) / count) : Math.round((i * (n - 1)) / (count - 1));
    points.push(pts[index].clone());
  }

  return { points, total: allPoints.length, closed, file };
}

// edited trimline -> CSV text, with the same number of points as the original file
export function trimlineToCsv(trimline) {
  const curve = new THREE.CatmullRomCurve3(trimline.points, trimline.closed, "centripetal");
  const pts = curve.getPoints(Math.max(trimline.total - 1, 1));
  return pts.map((p) => `${p.x},${p.y},${p.z}`).join("\n") + "\n";
}

// sends the edited trimline of one jaw to the backend, which overwrites Trimline.csv
export async function saveTrimline(backendUrl, jaw, trimline) {
  const res = await fetch(`${backendUrl}/api/save-trimline`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jaw, file: trimline.file, csv: trimlineToCsv(trimline) }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}