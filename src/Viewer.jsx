// // // // import { Canvas } from "@react-three/fiber";
// // // // import { OrbitControls, Bounds } from "@react-three/drei";

// // // // const JAW_COLOR = "#f4a6b8"; // pink

// // // // export default function Viewer({ upperGeo, lowerGeo }) {
// // // //   // camera re-fits only when a new file is loaded
// // // //   const fitKey = `${upperGeo ? upperGeo.uuid : 0}-${lowerGeo ? lowerGeo.uuid : 0}`;

// // // //   return (
// // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // //       <ambientLight intensity={0.6} />
// // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // //       <Bounds key={fitKey} fit margin={1.4}>
// // // //         {upperGeo && (
// // // //           <mesh geometry={upperGeo}>
// // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // //           </mesh>
// // // //         )}
// // // //         {lowerGeo && (
// // // //           <mesh geometry={lowerGeo}>
// // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // //           </mesh>
// // // //         )}
// // // //       </Bounds>

// // // //       <OrbitControls makeDefault />
// // // //     </Canvas>
// // // //   );
// // // // }







// // // import { Canvas } from "@react-three/fiber";
// // // import { OrbitControls, Bounds } from "@react-three/drei";

// // // const JAW_COLOR = "#f4a6b8"; // pink

// // // function Jaw({ geo, parts }) {
// // //   if (parts && parts.length > 0) {
// // //     return (
// // //       <>
// // //         {parts.map((p) => (
// // //           <mesh key={p.name} geometry={p.geo}>
// // //             <meshStandardMaterial color={JAW_COLOR} />
// // //           </mesh>
// // //         ))}
// // //       </>
// // //     );
// // //   }
// // //   if (geo) {
// // //     return (
// // //       <mesh geometry={geo}>
// // //         <meshStandardMaterial color={JAW_COLOR} />
// // //       </mesh>
// // //     );
// // //   }
// // //   return null;
// // // }

// // // export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts }) {
// // //   const fitKey = [
// // //     upperGeo?.uuid,
// // //     lowerGeo?.uuid,
// // //     upperParts ? upperParts.length : 0,
// // //     lowerParts ? lowerParts.length : 0,
// // //   ].join("-");

// // //   return (
// // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // //       <ambientLight intensity={0.6} />
// // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // //       <Bounds key={fitKey} fit margin={1.4}>
// // //         <Jaw geo={upperGeo} parts={upperParts} />
// // //         <Jaw geo={lowerGeo} parts={lowerParts} />
// // //       </Bounds>

// // //       <OrbitControls makeDefault />
// // //     </Canvas>
// // //   );
// // // }






// // // import { Canvas } from "@react-three/fiber";

// // // import { TrackballControls, Bounds } from "@react-three/drei";

// // // const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation
// // // const GUM_COLOR = "#D47575";
// // // const TEETH_COLOR = "#F6E5DF";

// // // // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // // function colorFor(fileName) {
// // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // }

// // // function Jaw({ geo, parts }) {
// // //   // after segmentation: show gum and each tooth with their own color
// // //   if (parts && parts.length > 0) {
// // //     return (
// // //       <>
// // //         {parts.map((p) => (
// // //           <mesh key={p.name} geometry={p.geo}>
// // //             <meshStandardMaterial color={colorFor(p.name)} />
// // //           </mesh>
// // //         ))}
// // //       </>
// // //     );
// // //   }

// // //   // before segmentation: show the original scan
// // //   if (geo) {
// // //     return (
// // //       <mesh geometry={geo}>
// // //         <meshStandardMaterial color={ORIGINAL_COLOR} />
// // //       </mesh>
// // //     );
// // //   }
// // //   return null;
// // // }

// // // export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts,showUpper,
// // //   showLower, }) {
// // //   const fitKey = [
// // //     upperGeo?.uuid,
// // //     lowerGeo?.uuid,
// // //     upperParts ? upperParts.length : 0,
// // //     lowerParts ? lowerParts.length : 0,
// // //   ].join("-");

// // //   return (
// // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // //       <ambientLight intensity={0.6} />
// // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // //       <Bounds key={fitKey} fit margin={0.9}>
// // //         <group visible={showUpper}>
// // //         <Jaw geo={upperGeo} parts={upperParts} />
// // //          </group>
// // //          <group visible={showLower}>
// // //         <Jaw geo={lowerGeo} parts={lowerParts} />
// // //         </group>
// // //       </Bounds>

// // //       <TrackballControls
// // //         makeDefault
// // //         rotateSpeed={6}
// // //         zoomSpeed={1.5}
// // //         panSpeed={1.2}
// // //         staticMoving
// // //       />
// // //     </Canvas>
// // //   );
// // // }




// // // import { useEffect, useRef } from "react";
// // // import * as THREE from "three";
// // // import { Canvas, useThree } from "@react-three/fiber";
// // // import { TrackballControls } from "@react-three/drei";

// // // const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation

// // // const GUM_COLOR = "#D47575";
// // // const TEETH_COLOR = "#F6E5DF";

// // // // ---- Start view settings ----
// // // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // // const FIT_MARGIN = 1.2; // smaller = closer

// // // function colorFor(fileName) {
// // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // }

// // // function Jaw({ geo, parts }) {
// // //   if (parts && parts.length > 0) {
// // //     return (
// // //       <>
// // //         {parts.map((p) => (
// // //           <mesh key={p.name} geometry={p.geo}>
// // //             <meshStandardMaterial color={colorFor(p.name)} />
// // //           </mesh>
// // //         ))}
// // //       </>
// // //     );
// // //   }

// // //   if (geo) {
// // //     return (
// // //       <mesh geometry={geo}>
// // //         <meshStandardMaterial color={ORIGINAL_COLOR} />
// // //       </mesh>
// // //     );
// // //   }
// // //   return null;
// // // }

// // // // Puts the camera in front of the model whenever fitKey changes
// // // // (new file uploaded or segmentation finished)
// // // function FrontView({ targetRef, fitKey }) {
// // //   const { camera, controls, size } = useThree();

// // //   useEffect(() => {
// // //     const group = targetRef.current;
// // //     if (!group) return;

// // //     const box = new THREE.Box3().setFromObject(group);
// // //     if (box.isEmpty()) return;

// // //     const center = box.getCenter(new THREE.Vector3());
// // //     const boxSize = box.getSize(new THREE.Vector3());

// // //     // From the front we see the X width and the Z height of the model
// // //     const fov = (camera.fov * Math.PI) / 180;
// // //     const aspect = size.width / size.height;
// // //     const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
// // //     const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
// // //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

// // //     camera.up.set(...CAMERA_UP);
// // //     camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
// // //     camera.near = distance / 100;
// // //     camera.far = distance * 100;
// // //     camera.updateProjectionMatrix();
// // //     camera.lookAt(center);

// // //     if (controls) {
// // //       controls.target.copy(center);
// // //       controls.update();
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [fitKey]);

// // //   return null;
// // // }

// // // export default function Viewer({
// // //   upperGeo,
// // //   lowerGeo,
// // //   upperParts,
// // //   lowerParts,
// // //   showUpper,
// // //   showLower,
// // // }) {
// // //   const modelRef = useRef();

// // //   const fitKey = [
// // //     upperGeo?.uuid,
// // //     lowerGeo?.uuid,
// // //     upperParts ? upperParts.length : 0,
// // //     lowerParts ? lowerParts.length : 0,
// // //   ].join("-");

// // //   return (
// // //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// // //       <ambientLight intensity={0.6} />
// // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // //       <group ref={modelRef}>
// // //         <group visible={showUpper}>
// // //           <Jaw geo={upperGeo} parts={upperParts} />
// // //         </group>
// // //         <group visible={showLower}>
// // //           <Jaw geo={lowerGeo} parts={lowerParts} />
// // //         </group>
// // //       </group>

// // //       <FrontView targetRef={modelRef} fitKey={fitKey} />

// // //       <TrackballControls
// // //         makeDefault
// // //         rotateSpeed={6}
// // //         zoomSpeed={1.5}
// // //         panSpeed={1.2}
// // //         staticMoving
// // //       />
// // //     </Canvas>
// // //   );
// // // }






// // import { useEffect, useMemo, useRef } from "react";
// // import * as THREE from "three";
// // import { Canvas, useThree } from "@react-three/fiber";
// // import { TrackballControls } from "@react-three/drei";

// // // ---- Colors and sizes ----
// // const JAW_COLOR = "#f4a6b8"; // pink scan
// // const LINE_COLOR = "#00e5ff"; // LAT spline
// // const HANDLE_COLOR = "#ffd54a"; // editable points
// // const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// // const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// // const SPLINE_SAMPLES = 200; // smoothness of the spline

// // // ---- Start view settings ----
// // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // const FIT_MARGIN = 1.1; // smaller = closer

// // const noRaycast = () => null; // makes an object "invisible" for mouse picking
// // const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // const SEE_THROUGH = false; // true = lines are always visible, even behind the model

// // // ---------------- The scan of one jaw ----------------
// // // function Jaw({ geo, active, dragging, onMoveDrag }) {
// // //   if (!geo) return null;

// // //   return (
// // //     <mesh
// // //       geometry={geo}
// // //       // while a point is dragged, the point follows the surface under the mouse
// // //       onPointerMove={
// // //         dragging && active
// // //           ? (e) => {
// // //               e.stopPropagation();
// // //               onMoveDrag(e.point);
// // //             }
// // //           : undefined
// // //       }
// // //     >
// // //       <meshStandardMaterial color={JAW_COLOR} />
// // //     </mesh>
// // //   );
// // // }




// // function Jaw({ geo, active, dragging, onMoveDrag }) {
// //   if (!geo) return null;

// //   return (
// //     <mesh
// //       geometry={geo}
// //       // the scan blocks clicks on points that are behind it
// //       onPointerDown={(e) => e.stopPropagation()}
// //       // while a point is dragged, it follows the surface under the mouse
// //       onPointerMove={
// //         dragging && active
// //           ? (e) => {
// //               e.stopPropagation();
// //               onMoveDrag(e.point);
// //             }
// //           : undefined
// //       }
// //     >
// //       <meshStandardMaterial
// //         color={JAW_COLOR}
// //         polygonOffset
// //         polygonOffsetFactor={1}
// //         polygonOffsetUnits={1}
// //       />
// //     </mesh>
// //   );
// // }

// // // ---------------- The spline of one tooth ----------------
// // function LatSpline({ jaw, curve, dragging, onStartDrag }) {
// //   const controls = useThree((state) => state.controls);

// //   // smooth closed spline through the editable points, drawn as a thin tube
// //   const tubeGeometry = useMemo(() => {
// //     if (curve.points.length < 3) return null;
// //     const spline = new THREE.CatmullRomCurve3(curve.points, true, "centripetal");
// //     return new THREE.TubeGeometry(spline, SPLINE_SAMPLES, TUBE_RADIUS, 6, true);
// //   }, [curve.points]);

// //   return (
// //     <>
// //       {tubeGeometry && (
// //         <mesh geometry={tubeGeometry} renderOrder={10} raycast={noRaycast}>
// //           {/* <meshBasicMaterial color={LINE_COLOR} depthTest={false} />
// //            */}
// //            <meshBasicMaterial color={LINE_COLOR} depthTest={SEE_THROUGH ? false : true} />
// //         </mesh>
// //       )}

// //       {curve.points.map((p, i) => (
// //         <mesh
// //           key={i}
// //           position={p}
// //           renderOrder={11}
// //           // while dragging, the points must not block the mouse
// //           raycast={dragging ? noRaycast : meshRaycast}
// //           onPointerDown={(e) => {
// //             e.stopPropagation();
// //             if (controls) controls.enabled = false; // stop rotating the model
// //             onStartDrag(jaw, curve.id, i);
// //           }}
// //           onPointerOver={() => (document.body.style.cursor = "pointer")}
// //           onPointerOut={() => (document.body.style.cursor = "default")}
// //         >
// //           <sphereGeometry args={[HANDLE_RADIUS, 12, 12]} />
// //           {/* <meshBasicMaterial color={HANDLE_COLOR} depthTest={false} /> */}
// //           <meshBasicMaterial color={HANDLE_COLOR} depthTest={SEE_THROUGH ? false : true} />
// //         </mesh>
// //       ))}
// //     </>
// //   );
// // }

// // function LatCurves({ jaw, curves, dragging, onStartDrag }) {
// //   return (
// //     <>
// //       {curves.map((c) => (
// //         <LatSpline
// //           key={c.id}
// //           jaw={jaw}
// //           curve={c}
// //           dragging={dragging}
// //           onStartDrag={onStartDrag}
// //         />
// //       ))}
// //     </>
// //   );
// // }

// // // Turns the model rotation off while a point is dragged, and ends the drag
// // // when the mouse button is released
// // function DragController({ dragging, onEndDrag }) {
// //   const controls = useThree((state) => state.controls);

// //   useEffect(() => {
// //     if (controls) controls.enabled = !dragging;
// //     if (!dragging) return;

// //     const up = () => onEndDrag();
// //     window.addEventListener("pointerup", up);
// //     return () => window.removeEventListener("pointerup", up);
// //   }, [dragging, controls, onEndDrag]);

// //   return null;
// // }

// // // Puts the camera in front of the model whenever fitKey changes
// // function FrontView({ targetRef, fitKey }) {
// //   const { camera, controls, size } = useThree();

// //   useEffect(() => {
// //     const group = targetRef.current;
// //     if (!group) return;

// //     const box = new THREE.Box3().setFromObject(group);
// //     if (box.isEmpty()) return;

// //     const center = box.getCenter(new THREE.Vector3());
// //     const boxSize = box.getSize(new THREE.Vector3());

// //     const fov = (camera.fov * Math.PI) / 180;
// //     const aspect = size.width / size.height;
// //     const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
// //     const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
// //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

// //     camera.up.set(...CAMERA_UP);
// //     camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
// //     camera.near = distance / 100;
// //     camera.far = distance * 100;
// //     camera.updateProjectionMatrix();
// //     camera.lookAt(center);

// //     if (controls) {
// //       controls.target.copy(center);
// //       controls.update();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [fitKey]);

// //   return null;
// // }

// // export default function Viewer({
// //   upperGeo,
// //   lowerGeo,
// //   showUpper,
// //   showLower,
// //   latCurves,
// //   dragging,
// //   onStartDrag,
// //   onMoveDrag,
// //   onEndDrag,
// // }) {
// //   const modelRef = useRef();

// //   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

// //   return (
// //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// //       <ambientLight intensity={0.6} />
// //       <directionalLight position={[50, 50, 50]} intensity={1} />
// //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// //       {/* the scans (the camera fits to this group) */}
// //       <group ref={modelRef}>
// //         <group visible={showUpper}>
// //           <Jaw geo={upperGeo} active={showUpper} dragging={dragging} onMoveDrag={onMoveDrag} />
// //         </group>
// //         <group visible={showLower}>
// //           <Jaw geo={lowerGeo} active={showLower} dragging={dragging} onMoveDrag={onMoveDrag} />
// //         </group>
// //       </group>

// //       {/* the LAT splines, hidden together with their jaw */}
// //       <group visible={showUpper}>
// //         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
// //       </group>
// //       <group visible={showLower}>
// //         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
// //       </group>

// //       <FrontView targetRef={modelRef} fitKey={fitKey} />
// //       <DragController dragging={dragging} onEndDrag={onEndDrag} />

// //       <TrackballControls
// //         makeDefault
// //         rotateSpeed={6}
// //         zoomSpeed={1.5}
// //         panSpeed={1.2}
// //         staticMoving
// //       />
// //     </Canvas>
// //   );
// // }
















// import { useEffect, useMemo, useRef } from "react";
// import * as THREE from "three";
// import { Canvas, useThree } from "@react-three/fiber";
// import { TrackballControls } from "@react-three/drei";

// // ---- Colors and sizes ----
// const JAW_COLOR = "#f4a6b8"; // pink raw scan
// const GUM_COLOR = "#D47575"; // gum after Segment
// const TEETH_COLOR = "#F6E5DF"; // teeth after Segment
// const LINE_COLOR = "#00e5ff"; // LAT spline
// const HANDLE_COLOR = "#ffd54a"; // editable points
// const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// const SPLINE_SAMPLES = 200; // smoothness of the spline

// // ---- Start view settings ----
// const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// const FIT_MARGIN = 1.1; // smaller = closer

// const noRaycast = () => null; // makes an object "invisible" for mouse picking
// const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// function colorFor(fileName) {
//   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// }

// // ---------------- One jaw: the raw scan, or the separated gum and teeth ----------------
// function Jaw({ geo, parts, active, dragging, onMoveDrag }) {
//   // after Segment: gum and every tooth with their own color
//   if (parts && parts.length > 0) {
//     return (
//       <>
//         {parts.map((p) => (
//           <mesh key={p.name} geometry={p.geo}>
//             <meshStandardMaterial color={colorFor(p.name)} />
//           </mesh>
//         ))}
//       </>
//     );
//   }

//   if (!geo) return null;

//   // before Segment: the raw scan
//   return (
//     <mesh
//       geometry={geo}
//       // the scan blocks clicks on points that are behind it
//       onPointerDown={(e) => e.stopPropagation()}
//       // while a point is dragged, it follows the surface under the mouse
//       onPointerMove={
//         dragging && active
//           ? (e) => {
//               e.stopPropagation();
//               onMoveDrag(e.point);
//             }
//           : undefined
//       }
//     >
//       <meshStandardMaterial
//         color={JAW_COLOR}
//         polygonOffset
//         polygonOffsetFactor={1}
//         polygonOffsetUnits={1}
//       />
//     </mesh>
//   );
// }

// // ---------------- The spline of one tooth ----------------
// function LatSpline({ jaw, curve, dragging, onStartDrag }) {
//   const controls = useThree((state) => state.controls);

//   // smooth closed spline through the editable points, drawn as a thin tube
//   const tubeGeometry = useMemo(() => {
//     if (curve.points.length < 3) return null;
//     const spline = new THREE.CatmullRomCurve3(curve.points, true, "centripetal");
//     return new THREE.TubeGeometry(spline, SPLINE_SAMPLES, TUBE_RADIUS, 6, true);
//   }, [curve.points]);

//   return (
//     <>
//       {tubeGeometry && (
//         <mesh geometry={tubeGeometry} renderOrder={10} raycast={noRaycast}>
//           <meshBasicMaterial color={LINE_COLOR} />
//         </mesh>
//       )}

//       {curve.points.map((p, i) => (
//         <mesh
//           key={i}
//           position={p}
//           renderOrder={11}
//           // while dragging, the points must not block the mouse
//           raycast={dragging ? noRaycast : meshRaycast}
//           onPointerDown={(e) => {
//             e.stopPropagation();
//             if (controls) controls.enabled = false; // stop rotating the model
//             onStartDrag(jaw, curve.id, i);
//           }}
//           onPointerOver={() => (document.body.style.cursor = "pointer")}
//           onPointerOut={() => (document.body.style.cursor = "default")}
//         >
//           <sphereGeometry args={[HANDLE_RADIUS, 12, 12]} />
//           <meshBasicMaterial color={HANDLE_COLOR} />
//         </mesh>
//       ))}
//     </>
//   );
// }

// function LatCurves({ jaw, curves, dragging, onStartDrag }) {
//   return (
//     <>
//       {curves.map((c) => (
//         <LatSpline
//           key={c.id}
//           jaw={jaw}
//           curve={c}
//           dragging={dragging}
//           onStartDrag={onStartDrag}
//         />
//       ))}
//     </>
//   );
// }

// // Turns the model rotation off while a point is dragged, and ends the drag
// // when the mouse button is released
// function DragController({ dragging, onEndDrag }) {
//   const controls = useThree((state) => state.controls);

//   useEffect(() => {
//     if (controls) controls.enabled = !dragging;
//     if (!dragging) return;

//     const up = () => onEndDrag();
//     window.addEventListener("pointerup", up);
//     return () => window.removeEventListener("pointerup", up);
//   }, [dragging, controls, onEndDrag]);

//   return null;
// }

// // Puts the camera in front of the model whenever fitKey changes
// function FrontView({ targetRef, fitKey }) {
//   const { camera, controls, size } = useThree();

//   useEffect(() => {
//     const group = targetRef.current;
//     if (!group) return;

//     const box = new THREE.Box3().setFromObject(group);
//     if (box.isEmpty()) return;

//     const center = box.getCenter(new THREE.Vector3());
//     const boxSize = box.getSize(new THREE.Vector3());

//     const fov = (camera.fov * Math.PI) / 180;
//     const aspect = size.width / size.height;
//     const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
//     const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
//     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

//     camera.up.set(...CAMERA_UP);
//     camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
//     camera.near = distance / 100;
//     camera.far = distance * 100;
//     camera.updateProjectionMatrix();
//     camera.lookAt(center);

//     if (controls) {
//       controls.target.copy(center);
//       controls.update();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fitKey]);

//   return null;
// }

// export default function Viewer({
//   upperGeo,
//   lowerGeo,
//   upperParts,
//   lowerParts,
//   showUpper,
//   showLower,
//   latCurves,
//   dragging,
//   onStartDrag,
//   onMoveDrag,
//   onEndDrag,
// }) {
//   const modelRef = useRef();

//   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

//   return (
//     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[50, 50, 50]} intensity={1} />
//       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

//       {/* the scans (the camera fits to this group) */}
//       <group ref={modelRef}>
//         <group visible={showUpper}>
//           <Jaw
//             geo={upperGeo}
//             parts={upperParts}
//             active={showUpper}
//             dragging={dragging}
//             onMoveDrag={onMoveDrag}
//           />
//         </group>
//         <group visible={showLower}>
//           <Jaw
//             geo={lowerGeo}
//             parts={lowerParts}
//             active={showLower}
//             dragging={dragging}
//             onMoveDrag={onMoveDrag}
//           />
//         </group>
//       </group>

//       {/* the LAT splines, hidden together with their jaw */}
//       <group visible={showUpper}>
//         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
//       </group>
//       <group visible={showLower}>
//         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
//       </group>

//       <FrontView targetRef={modelRef} fitKey={fitKey} />
//       <DragController dragging={dragging} onEndDrag={onEndDrag} />

//       <TrackballControls
//         makeDefault
//         rotateSpeed={6}
//         zoomSpeed={1.5}
//         panSpeed={1.2}
//         staticMoving
//       />
//     </Canvas>
//   );
// }











import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree} from "@react-three/fiber";
// import { TrackballControls } from "@react-three/drei";
import { TrackballControls, Line, Html } from "@react-three/drei";


// ---- Colors and sizes ----
const JAW_COLOR = "#F7E0C5"; //  raw scan
const GUM_COLOR = "#D47575"; // gum after Segment
const TEETH_COLOR = "#EEDBD8"; // teeth after Segment
const LINE_COLOR = "rgb(0, 229, 255)"; // LAT spline
const HANDLE_COLOR = "#4a5cff"; // editable points

const TRIMLINE_COLOR = "#00ff44"; // trimline (Generate Trimline)
const TRIMLINE_RADIUS = 0.15; // thickness of the trimline (mm)

const TRIMLINE_HANDLE_COLOR = "#ff7a00"; // orange: the editable points of the trimline
const TRIMLINE_HANDLE_RADIUS = 0.35; // size of those points (mm)

const TRIM_MODEL_COLOR = "rgb(255, 255, 255)"; // Trim Model result
const BASE_MODEL_COLOR = "rgb(255, 255, 255)"; // Add Base result


const LABEL_COLOR = "#705bd1"; // line and bubble of the tooth numbers

// one color for each tooth position (1 to 8); the other side of the jaw is a bit darker
const TOOTH_PALETTE = ["#5b8be0", "#a37be0", "#e875b4", "#6cc04a", "#35a7a3", "#e8845f", "#4a4fb5", "#9a8a5a"];

// color of one tooth from its file name, e.g. "11.stl"
function toothColor(fileName) {
  const m = fileName.match(/(\d)(\d)/);
  if (!m) return TEETH_COLOR;
  const quadrant = Number(m[1]);
  const position = Number(m[2]);
  const color = new THREE.Color(TOOTH_PALETTE[(position + 7) % 8]);
  if (quadrant === 2 || quadrant === 3) color.multiplyScalar(0.8);
  return color;
}




const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
const SPLINE_SAMPLES = 200; // smoothness of the spline

// ---- Start view settings ----
const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
const FIT_MARGIN = 1.1; // smaller = closer

const noRaycast = () => null; // makes an object "invisible" for mouse picking
const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
const isGum = (fileName) => fileName.toLowerCase().includes("gum");

// ---------------- One jaw: the raw scan, or the separated gum and teeth ----------------
// function Jaw({ geo, parts, colored, showTeeth, showGum, active, dragging, onMoveDrag }) {
//   // after Segment: gum and every tooth with their own color and their own visibility
//   if (parts && parts.length > 0) {
//     return (
//       <>
//         {parts.map((p) => (
//           <mesh
//             key={p.name}
//             geometry={p.geo}
//             visible={isGum(p.name) ? showGum : showTeeth}
//           >
//             {/* <meshStandardMaterial color={isGum(p.name) ? GUM_COLOR : TEETH_COLOR} /> */}
//               {/* <meshStandardMaterial
//               color={isGum(p.name) ? GUM_COLOR : colored ? toothColor(p.name) : TEETH_COLOR}
//             /> */}
//             <meshStandardMaterial color={isGum(p.name) ? GUM_COLOR : TEETH_COLOR} />
//           </mesh>
//         ))}
//       </>
//     );
//   }

//   if (!geo) return null;

//   // before Segment: the raw scan
//   return (
//     <mesh
//       geometry={geo}
//       // the scan blocks clicks on points that are behind it
//       onPointerDown={(e) => e.stopPropagation()}
//       // while a point is dragged, it follows the surface under the mouse
//       onPointerMove={
//         dragging && active
//           ? (e) => {
//               e.stopPropagation();
//               onMoveDrag(e.point);
//             }
//           : undefined
//       }
//     >
//       <meshStandardMaterial
//         color={JAW_COLOR}
//         polygonOffset
//         polygonOffsetFactor={1}
//         polygonOffsetUnits={1}
//       />
//     </mesh>
//   );
// }



function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag }) {
  // while a point is dragged, it follows the surface under the mouse
  const moveHandler =
    dragging && active
      ? (e) => {
          e.stopPropagation();
          onMoveDrag(e.point);
        }
      : undefined;

  // after Segment: gum and every tooth with their own visibility
  if (parts && parts.length > 0) {
    return (
      <>
        {parts.map((p) => {
          const gum = isGum(p.name);
          const visible = gum ? showGum : showTeeth;
          return (
            <mesh
              key={p.name}
              geometry={p.geo}
              visible={visible}
              onPointerMove={visible ? moveHandler : undefined}
            >
              <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} />
            </mesh>
          );
        })}
      </>
    );
  }

  if (!geo) return null;

  // before Segment: the raw scan
  return (
    <mesh
      geometry={geo}
      // the scan blocks clicks on points that are behind it
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={moveHandler}
    >
      <meshStandardMaterial
        color={JAW_COLOR}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
    </mesh>
  );
}

// ---------------- The spline of one tooth ----------------
function LatSpline({ jaw, curve, dragging, onStartDrag }) {
  const controls = useThree((state) => state.controls);

  // smooth closed spline through the editable points, drawn as a thin tube
  const tubeGeometry = useMemo(() => {
    if (curve.points.length < 3) return null;
    const spline = new THREE.CatmullRomCurve3(curve.points, true, "centripetal");
    return new THREE.TubeGeometry(spline, SPLINE_SAMPLES, TUBE_RADIUS, 6, true);
  }, [curve.points]);

  return (
    <>
      {tubeGeometry && (
        <mesh geometry={tubeGeometry} renderOrder={10} raycast={noRaycast}>
          <meshBasicMaterial color={LINE_COLOR} />
        </mesh>
      )}

      {curve.points.map((p, i) => (
        <mesh
          key={i}
          position={p}
          renderOrder={11}
          // while dragging, the points must not block the mouse
          raycast={dragging ? noRaycast : meshRaycast}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (controls) controls.enabled = false; // stop rotating the model
            onStartDrag(jaw, curve.id, i);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <sphereGeometry args={[HANDLE_RADIUS, 12, 12]} />
          <meshBasicMaterial color={HANDLE_COLOR} />
        </mesh>
      ))}
    </>
  );
}

function LatCurves({ jaw, curves, dragging, onStartDrag }) {
  return (
    <>
      {curves.map((c) => (
        <LatSpline
          key={c.id}
          jaw={jaw}
          curve={c}
          dragging={dragging}
          onStartDrag={onStartDrag}
        />
      ))}
    </>
  );
}

// ---------------- The trimline: a curve along the gum ----------------
// function Trimline({ points }) {
//   const geometry = useMemo(() => {
//     if (!points || points.length < 2) return null;

//     // thin out very long lists, so the tube stays light (the last point is kept)
//     const step = Math.max(1, Math.ceil(points.length / 600));
//     const pts = points.filter((_, i) => i % step === 0);
//     const last = points[points.length - 1];
//     if (pts[pts.length - 1] !== last) pts.push(last);
//     if (pts.length < 2) return null;

//     // closed if the curve ends where it starts
//     const closed = pts.length > 3 && pts[0].distanceTo(last) < 0.5;
//     const curve = new THREE.CatmullRomCurve3(pts, closed, "centripetal");
//     return new THREE.TubeGeometry(curve, pts.length * 2, TRIMLINE_RADIUS, 6, closed);
//   }, [points]);

//   if (!geometry) return null;

//   return (
//     <mesh geometry={geometry} renderOrder={12} raycast={noRaycast}>
//       <meshBasicMaterial color={TRIMLINE_COLOR} />
//     </mesh>
//   );
// }


// ---------------- The trimline: a curve along the gum, with editable points ----------------
function EditableTrimline({ jaw, trimline, dragging, onStartTrimDrag }) {
  const controls = useThree((state) => state.controls);

  // smooth line through the editable points, drawn as a thin tube
  const geometry = useMemo(() => {
    if (!trimline || trimline.points.length < 3) return null;
    const curve = new THREE.CatmullRomCurve3(trimline.points, trimline.closed, "centripetal");
    return new THREE.TubeGeometry(curve, 400, TRIMLINE_RADIUS, 6, trimline.closed);
  }, [trimline]);

  if (!trimline || !geometry) return null;

  return (
    <>
      <mesh geometry={geometry} renderOrder={12} raycast={noRaycast}>
        <meshBasicMaterial color={TRIMLINE_COLOR} />
      </mesh>

      {trimline.points.map((p, i) => (
        <mesh
          key={i}
          position={p}
          renderOrder={13}
          // while dragging, the points must not block the mouse
          raycast={dragging ? noRaycast : meshRaycast}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (controls) controls.enabled = false; // stop rotating the model
            onStartTrimDrag(jaw, i);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <sphereGeometry args={[TRIMLINE_HANDLE_RADIUS, 12, 12]} />
          <meshBasicMaterial color={TRIMLINE_HANDLE_COLOR} />
        </mesh>
      ))}
    </>
  );
}


// ---------------- Result of Trim Model or Add Base: a surface drawn on top ----------------
function ResultMesh({ result }) {
  if (!result) return null;

  const color = result.kind === "trimModel" ? TRIM_MODEL_COLOR : BASE_MODEL_COLOR;

  return (
    <mesh geometry={result.geo}>
      <meshStandardMaterial
        color={color}
        // pulled a little towards the camera, so it wins over the surface below it
        polygonOffset
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
      />
    </mesh>
  );
}

// ---------------- Tooth number labels: a line from the tooth to a round bubble ----------------
function ToothLabels({ labels, parts, show }) {
  if (!show || !labels || labels.length === 0) return null;

  return (
    <>
      {labels.map((l) => {
        // the point nearer to the center of the tooth is the tooth end; the other gets the bubble
        let tooth = l.a;
        let bubble = l.b;
        const part = parts ? parts.find((p) => p.name.replace(/\.stl$/i, "") === l.id) : null;
        if (part && part.geo && part.geo.boundingBox) {
          const center = part.geo.boundingBox.getCenter(new THREE.Vector3());
          if (l.b.distanceTo(center) < l.a.distanceTo(center)) {
            tooth = l.b;
            bubble = l.a;
          }
        }

        return (
          <group key={l.id}>
            <Line points={[tooth, bubble]} color={LABEL_COLOR} lineWidth={2} />
            <Html position={bubble} center style={{ pointerEvents: "none" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: LABEL_COLOR,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  userSelect: "none",
                }}
              >
                {l.id}
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}







// Turns the model rotation off while a point is dragged, and ends the drag
// when the mouse button is released
function DragController({ dragging, onEndDrag }) {
  const controls = useThree((state) => state.controls);

  useEffect(() => {
    if (controls) controls.enabled = !dragging;
    if (!dragging) return;

    const up = () => onEndDrag();
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, [dragging, controls, onEndDrag]);

  return null;
}

// Puts the camera in front of the model whenever fitKey changes
function FrontView({ targetRef, fitKey }) {
  const { camera, controls, size } = useThree();

  useEffect(() => {
    const group = targetRef.current;
    if (!group) return;

    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;

    const center = box.getCenter(new THREE.Vector3());
    const boxSize = box.getSize(new THREE.Vector3());

    const fov = (camera.fov * Math.PI) / 180;
    const aspect = size.width / size.height;
    const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
    const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
    const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

    camera.up.set(...CAMERA_UP);
    camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();
    camera.lookAt(center);

    if (controls) {
      controls.target.copy(center);
      controls.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitKey]);

  return null;
}


export default function Viewer({
  upperGeo,
  lowerGeo,
  upperParts,
  lowerParts,
  showUpper,
  showLower,
  segVisible,
  trimlines,
  resultMeshes,
  toothLabels,
  showNumbers,
  latCurves,
  dragging,
  onStartDrag,
  onStartTrimDrag,
  onMoveDrag,
  onEndDrag,
}) {
  const modelRef = useRef();

  const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

  return (
    <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
       
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 50, 50]} intensity={1} />
      <directionalLight position={[-50, -50, -50]} intensity={0.5} /> 
           

      {/* the scans (the camera fits to this group) */}
      <group ref={modelRef}>
        <group visible={showUpper}>
           <group visible={resultMeshes.upper?.kind !== "base"}>
          <Jaw
            geo={upperGeo}
            colored={toothLabels.upper.length > 0}
            parts={upperParts}
            showTeeth={segVisible.upperTeeth}
            showGum={segVisible.upperGum}
            active={showUpper}
            dragging={dragging}
            onMoveDrag={onMoveDrag}
          />
          </group>

          {/* <Trimline points={trimlines.upper} /> */}
            {/* <EditableTrimline jaw="upper" trimline={trimlines.upper} dragging={dragging} onStartTrimDrag={onStartTrimDrag} /> */}
            <EditableTrimline jaw="upper" trimline={resultMeshes.upper ? null : trimlines.upper} dragging={dragging} onStartTrimDrag={onStartTrimDrag} />
          <ResultMesh result={resultMeshes.upper} />
          <ToothLabels
         labels={toothLabels.upper}
         parts={upperParts}
        //  show={showUpper && segVisible.upperTeeth}
        show={showUpper && segVisible.upperTeeth && showNumbers}

         />

        </group>
        <group visible={showLower}>
        <group visible={resultMeshes.lower?.kind !== "base"}>
          <Jaw
            geo={lowerGeo}
            colored={toothLabels.lower.length > 0}
            parts={lowerParts}
            showTeeth={segVisible.lowerTeeth}
            showGum={segVisible.lowerGum}
            active={showLower}
            dragging={dragging}
            onMoveDrag={onMoveDrag}
          />
          </group>
         
          {/* <Trimline points={trimlines.lower} /> */}
            {/* <EditableTrimline jaw="lower" trimline={trimlines.lower} dragging={dragging} onStartTrimDrag={onStartTrimDrag} /> */}
            <EditableTrimline jaw="lower" trimline={resultMeshes.lower ? null : trimlines.lower} dragging={dragging} onStartTrimDrag={onStartTrimDrag} />
          <ResultMesh result={resultMeshes.lower} />
           <ToothLabels
         labels={toothLabels.lower}
         parts={lowerParts}
        show={showLower && segVisible.lowerTeeth && showNumbers}
        />

        </group>
      </group>

      {/* the LAT splines, hidden together with their jaw */}
      <group visible={showUpper}>
        <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
      </group>
      <group visible={showLower}>
        <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
      </group>

      <FrontView targetRef={modelRef} fitKey={fitKey} />
      <DragController dragging={dragging} onEndDrag={onEndDrag} />

      <TrackballControls
        makeDefault
        rotateSpeed={6}
        zoomSpeed={1.5}
        panSpeed={1.2}
        staticMoving
      />
    </Canvas>
  );
}