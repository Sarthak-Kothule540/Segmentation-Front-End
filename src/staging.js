// // ---------------- Staging: split the tooth movement into small steps (one aligner per step) ----------------
// //
// // Stage 0 = Initial Position (Segment result), last stage = Final Position (Automatic Setup result).
// // In one stage no tooth may move more than MAX_TRANSLATION_MM or turn more than MAX_ROTATION_DEG.
// // So the tooth that has to move the most decides the number of stages:
// //   stages = biggest of ceil(translation / 0.2) and ceil(rotation / 2) over all teeth
// // Every tooth moves the same part of its own movement in each stage (1/stages of it), so all teeth
// // start together and reach the final position together at the last stage.
// // The shift is measured at the crown center, and the tooth turns around its crown center.

// import * as THREE from "three";
// import { surfaceCenter, toothMotion } from "./movement.js";

// export const MAX_TRANSLATION_MM = 0.2;
// export const MAX_ROTATION_DEG = 2;

// const toothId = (name) => {
//   const m = String(name).match(/(\d)(\d)/);
//   return m ? m[1] + m[2] : null;
// };

// // initialParts / finalParts: { upper: [{ name, geo }], lower: [...] } (teeth only)
// // Returns { stageCount, teeth: { "11": { jaw, center, shift, rotation, translationMm, rotationDeg, stages } } }
// export function computeStaging(initialParts, finalParts) {
//   const teeth = {};
//   let stageCount = 0;

//   for (const jaw of ["upper", "lower"]) {
//     for (const orig of initialParts[jaw] || []) {
//       const id = toothId(orig.name);
//       if (!id) continue;
//       const moved = (finalParts[jaw] || []).find((p) => toothId(p.name) === id);
//       if (!moved) continue;
//       try {
//         const M = toothMotion(orig.geo, moved.geo);
//         const center = surfaceCenter(orig.geo);
//         const shift = center.clone().applyMatrix4(M).sub(center); // how far the crown center moves
//         const rotation = new THREE.Quaternion().setFromRotationMatrix(
//           new THREE.Matrix4().extractRotation(M)
//         );
//         if (rotation.w < 0) rotation.set(-rotation.x, -rotation.y, -rotation.z, -rotation.w); // shortest way
//         const translationMm = shift.length();
//         const rotationDeg = (2 * Math.acos(Math.min(1, rotation.w)) * 180) / Math.PI;

//         // tiny -1e-6 so 0.4 mm gives exactly 2 stages, not 3 because of rounding
//         const stages = Math.max(
//           Math.ceil(translationMm / MAX_TRANSLATION_MM - 1e-6),
//           Math.ceil(rotationDeg / MAX_ROTATION_DEG - 1e-6),
//           0
//         );
//         stageCount = Math.max(stageCount, stages);
//         teeth[orig.name] = { id, jaw, center, shift, rotation, translationMm, rotationDeg, stages };
//       } catch (err) {
//         console.error(`Staging of tooth ${id} failed:`, err);
//       }
//     }
//   }
//   return { stageCount, teeth };
// }

// // where a tooth is at a stage, as a matrix that moves the Initial tooth there
// const IDENTITY_Q = new THREE.Quaternion();
// export function toothMatrixAtStage(tooth, stage, stageCount) {
//   const f = stageCount > 0 ? Math.min(1, Math.max(0, stage / stageCount)) : 1;
//   const q = IDENTITY_Q.clone().slerp(tooth.rotation, f);
//   // move the crown center to the origin, turn, then put it at its new place
//   const toOrigin = new THREE.Matrix4().makeTranslation(-tooth.center.x, -tooth.center.y, -tooth.center.z);
//   const turn = new THREE.Matrix4().makeRotationFromQuaternion(q);
//   const target = tooth.center.clone().addScaledVector(tooth.shift, f);
//   const back = new THREE.Matrix4().makeTranslation(target.x, target.y, target.z);
//   return back.multiply(turn).multiply(toOrigin);
// }

// // gum at a stage: part of the way from the Initial gum to the gum that follows the Final teeth
// // (both have the same vertices, the deformed one is a moved copy). Returns a new geometry.
// export function gumAtStage(baseGeo, finalGeo, stage, stageCount) {
//   if (!baseGeo) return null;
//   if (!finalGeo || finalGeo.attributes.position.count !== baseGeo.attributes.position.count) return baseGeo;
//   const f = stageCount > 0 ? Math.min(1, Math.max(0, stage / stageCount)) : 1;
//   if (f === 0) return baseGeo;
//   if (f === 1) return finalGeo;
//   const geo = baseGeo.clone();
//   const a = baseGeo.attributes.position.array;
//   const b = finalGeo.attributes.position.array;
//   const out = geo.attributes.position.array;
//   for (let i = 0; i < out.length; i++) out[i] = a[i] + (b[i] - a[i]) * f;
//   geo.attributes.position.needsUpdate = true;
//   geo.computeVertexNormals();
//   geo.computeBoundingBox();
//   geo.computeBoundingSphere();
//   return geo;
// }




// ---------------- Staging: split the tooth movement into small steps (one aligner per step) ----------------
//
// Stage 0 = Initial Position (Segment result), last stage = Final Position (Automatic Setup result).
// In one stage no tooth may move more than MAX_TRANSLATION_MM or turn more than MAX_ROTATION_DEG.
// So the tooth that has to move the most decides the number of stages:
//   stages = biggest of ceil(translation / 0.2) and ceil(rotation / 2) over all teeth
// Every tooth moves the same part of its own movement in each stage (1/stages of it), so all teeth
// start together and reach the final position together at the last stage.
// The shift is measured at the crown center, and the tooth turns around its crown center.

import * as THREE from "three";
import { surfaceCenter, toothMotion, readMovement } from "./movement.js";

export const MAX_TRANSLATION_MM = 0.2;
export const MAX_ROTATION_DEG = 2;

const toothId = (name) => {
  const m = String(name).match(/(\d)(\d)/);
  return m ? m[1] + m[2] : null;
};

// initialParts / finalParts: { upper: [{ name, geo }], lower: [...] } (teeth only)
// Returns { stageCount, teeth: { "11": { jaw, center, shift, rotation, translationMm, rotationDeg, stages } } }
export function computeStaging(initialParts, finalParts) {
  const teeth = {};
  let stageCount = 0;

  for (const jaw of ["upper", "lower"]) {
    for (const orig of initialParts[jaw] || []) {
      const id = toothId(orig.name);
      if (!id) continue;
      const moved = (finalParts[jaw] || []).find((p) => toothId(p.name) === id);
      if (!moved) continue;
      try {
        const M = toothMotion(orig.geo, moved.geo);
        const center = surfaceCenter(orig.geo);
        const shift = center.clone().applyMatrix4(M).sub(center); // how far the crown center moves
        const rotation = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().extractRotation(M)
        );
        if (rotation.w < 0) rotation.set(-rotation.x, -rotation.y, -rotation.z, -rotation.w); // shortest way
        const translationMm = shift.length();
        const rotationDeg = (2 * Math.acos(Math.min(1, rotation.w)) * 180) / Math.PI;

        // tiny -1e-6 so 0.4 mm gives exactly 2 stages, not 3 because of rounding
        const stages = Math.max(
          Math.ceil(translationMm / MAX_TRANSLATION_MM - 1e-6),
          Math.ceil(rotationDeg / MAX_ROTATION_DEG - 1e-6),
          0
        );
        stageCount = Math.max(stageCount, stages);
        teeth[orig.name] = { id, jaw, center, shift, rotation, translationMm, rotationDeg, stages };
      } catch (err) {
        console.error(`Staging of tooth ${id} failed:`, err);
      }
    }
  }
  return { stageCount, teeth };
}

// where a tooth is at a stage, as a matrix that moves the Initial tooth there
const IDENTITY_Q = new THREE.Quaternion();
export function toothMatrixAtStage(tooth, stage, stageCount) {
  const f = stageCount > 0 ? Math.min(1, Math.max(0, stage / stageCount)) : 1;
  const q = IDENTITY_Q.clone().slerp(tooth.rotation, f);
  // move the crown center to the origin, turn, then put it at its new place
  const toOrigin = new THREE.Matrix4().makeTranslation(-tooth.center.x, -tooth.center.y, -tooth.center.z);
  const turn = new THREE.Matrix4().makeRotationFromQuaternion(q);
  const target = tooth.center.clone().addScaledVector(tooth.shift, f);
  const back = new THREE.Matrix4().makeTranslation(target.x, target.y, target.z);
  return back.multiply(turn).multiply(toOrigin);
}

// gum at a stage: part of the way from the Initial gum to the gum that follows the Final teeth
// (both have the same vertices, the deformed one is a moved copy). Returns a new geometry.
export function gumAtStage(baseGeo, finalGeo, stage, stageCount) {
  if (!baseGeo) return null;
  if (!finalGeo || finalGeo.attributes.position.count !== baseGeo.attributes.position.count) return baseGeo;
  const f = stageCount > 0 ? Math.min(1, Math.max(0, stage / stageCount)) : 1;
  if (f === 0) return baseGeo;
  if (f === 1) return finalGeo;
  const geo = baseGeo.clone();
  const a = baseGeo.attributes.position.array;
  const b = finalGeo.attributes.position.array;
  const out = geo.attributes.position.array;
  for (let i = 0; i < out.length; i++) out[i] = a[i] + (b[i] - a[i]) * f;
  geo.attributes.position.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

// Movement table for the Staging view
//   frames: toothFrames(initial teeth) from movement.js, staging: computeStaging(...)
//   mode "zero": from stage 0 to the shown stage,  mode "prev": from the stage before to the shown stage
// Returns the same shape as computeMovement: { "11": { values, letters }, ... }
export function computeStageMovement(frames, staging, stage, mode) {
  const result = {};
  if (!frames || !staging) return result;
  const n = staging.stageCount;
  for (const t of Object.values(staging.teeth)) {
    const f = frames[t.id];
    if (!f) continue;
    const now = toothMatrixAtStage(t, stage, n);
    if (mode === "prev") {
      // stage 0 has no step before it: nothing moved
      const before = stage > 0 ? toothMatrixAtStage(t, stage - 1, n) : now;
      // the tooth frame where the tooth was at the stage before
      const R = new THREE.Matrix3().setFromMatrix4(before);
      const fBefore = {
        center: f.center.clone().applyMatrix4(before),
        o: f.o.clone().applyMatrix3(R).normalize(),
        m: f.m.clone().applyMatrix3(R).normalize(),
        b: f.b.clone().applyMatrix3(R).normalize(),
      };
      const step = now.clone().multiply(before.clone().invert()); // from the stage before to now
      result[t.id] = readMovement(fBefore, step);
    } else {
      result[t.id] = readMovement(f, now);
    }
  }
  return result;
}
