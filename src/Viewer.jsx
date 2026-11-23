// // // // // // import { Canvas } from "@react-three/fiber";
// // // // // // import { OrbitControls, Bounds } from "@react-three/drei";

// // // // // // const JAW_COLOR = "#f4a6b8"; // pink

// // // // // // export default function Viewer({ upperGeo, lowerGeo }) {
// // // // // //   // camera re-fits only when a new file is loaded
// // // // // //   const fitKey = `${upperGeo ? upperGeo.uuid : 0}-${lowerGeo ? lowerGeo.uuid : 0}`;

// // // // // //   return (
// // // // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // // // //       <ambientLight intensity={0.6} />
// // // // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // // // //       <Bounds key={fitKey} fit margin={1.4}>
// // // // // //         {upperGeo && (
// // // // // //           <mesh geometry={upperGeo}>
// // // // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // // // //           </mesh>
// // // // // //         )}
// // // // // //         {lowerGeo && (
// // // // // //           <mesh geometry={lowerGeo}>
// // // // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // // // //           </mesh>
// // // // // //         )}
// // // // // //       </Bounds>

// // // // // //       <OrbitControls makeDefault />
// // // // // //     </Canvas>
// // // // // //   );
// // // // // // }







// // // // // import { Canvas } from "@react-three/fiber";
// // // // // import { OrbitControls, Bounds } from "@react-three/drei";

// // // // // const JAW_COLOR = "#f4a6b8"; // pink

// // // // // function Jaw({ geo, parts }) {
// // // // //   if (parts && parts.length > 0) {
// // // // //     return (
// // // // //       <>
// // // // //         {parts.map((p) => (
// // // // //           <mesh key={p.name} geometry={p.geo}>
// // // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // // //           </mesh>
// // // // //         ))}
// // // // //       </>
// // // // //     );
// // // // //   }
// // // // //   if (geo) {
// // // // //     return (
// // // // //       <mesh geometry={geo}>
// // // // //         <meshStandardMaterial color={JAW_COLOR} />
// // // // //       </mesh>
// // // // //     );
// // // // //   }
// // // // //   return null;
// // // // // }

// // // // // export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts }) {
// // // // //   const fitKey = [
// // // // //     upperGeo?.uuid,
// // // // //     lowerGeo?.uuid,
// // // // //     upperParts ? upperParts.length : 0,
// // // // //     lowerParts ? lowerParts.length : 0,
// // // // //   ].join("-");

// // // // //   return (
// // // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // // //       <ambientLight intensity={0.6} />
// // // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // // //       <Bounds key={fitKey} fit margin={1.4}>
// // // // //         <Jaw geo={upperGeo} parts={upperParts} />
// // // // //         <Jaw geo={lowerGeo} parts={lowerParts} />
// // // // //       </Bounds>

// // // // //       <OrbitControls makeDefault />
// // // // //     </Canvas>
// // // // //   );
// // // // // }






// // // // // import { Canvas } from "@react-three/fiber";

// // // // // import { TrackballControls, Bounds } from "@react-three/drei";

// // // // // const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation
// // // // // const GUM_COLOR = "#D47575";
// // // // // const TEETH_COLOR = "#F6E5DF";

// // // // // // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // // // // function colorFor(fileName) {
// // // // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // // // }

// // // // // function Jaw({ geo, parts }) {
// // // // //   // after segmentation: show gum and each tooth with their own color
// // // // //   if (parts && parts.length > 0) {
// // // // //     return (
// // // // //       <>
// // // // //         {parts.map((p) => (
// // // // //           <mesh key={p.name} geometry={p.geo}>
// // // // //             <meshStandardMaterial color={colorFor(p.name)} />
// // // // //           </mesh>
// // // // //         ))}
// // // // //       </>
// // // // //     );
// // // // //   }

// // // // //   // before segmentation: show the original scan
// // // // //   if (geo) {
// // // // //     return (
// // // // //       <mesh geometry={geo}>
// // // // //         <meshStandardMaterial color={ORIGINAL_COLOR} />
// // // // //       </mesh>
// // // // //     );
// // // // //   }
// // // // //   return null;
// // // // // }

// // // // // export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts,showUpper,
// // // // //   showLower, }) {
// // // // //   const fitKey = [
// // // // //     upperGeo?.uuid,
// // // // //     lowerGeo?.uuid,
// // // // //     upperParts ? upperParts.length : 0,
// // // // //     lowerParts ? lowerParts.length : 0,
// // // // //   ].join("-");

// // // // //   return (
// // // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // // //       <ambientLight intensity={0.6} />
// // // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // // //       <Bounds key={fitKey} fit margin={0.9}>
// // // // //         <group visible={showUpper}>
// // // // //         <Jaw geo={upperGeo} parts={upperParts} />
// // // // //          </group>
// // // // //          <group visible={showLower}>
// // // // //         <Jaw geo={lowerGeo} parts={lowerParts} />
// // // // //         </group>
// // // // //       </Bounds>

// // // // //       <TrackballControls
// // // // //         makeDefault
// // // // //         rotateSpeed={6}
// // // // //         zoomSpeed={1.5}
// // // // //         panSpeed={1.2}
// // // // //         staticMoving
// // // // //       />
// // // // //     </Canvas>
// // // // //   );
// // // // // }




// // // // // import { useEffect, useRef } from "react";
// // // // // import * as THREE from "three";
// // // // // import { Canvas, useThree } from "@react-three/fiber";
// // // // // import { TrackballControls } from "@react-three/drei";

// // // // // const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation

// // // // // const GUM_COLOR = "#D47575";
// // // // // const TEETH_COLOR = "#F6E5DF";

// // // // // // ---- Start view settings ----
// // // // // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // // // // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // // // // const FIT_MARGIN = 1.2; // smaller = closer

// // // // // function colorFor(fileName) {
// // // // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // // // }

// // // // // function Jaw({ geo, parts }) {
// // // // //   if (parts && parts.length > 0) {
// // // // //     return (
// // // // //       <>
// // // // //         {parts.map((p) => (
// // // // //           <mesh key={p.name} geometry={p.geo}>
// // // // //             <meshStandardMaterial color={colorFor(p.name)} />
// // // // //           </mesh>
// // // // //         ))}
// // // // //       </>
// // // // //     );
// // // // //   }

// // // // //   if (geo) {
// // // // //     return (
// // // // //       <mesh geometry={geo}>
// // // // //         <meshStandardMaterial color={ORIGINAL_COLOR} />
// // // // //       </mesh>
// // // // //     );
// // // // //   }
// // // // //   return null;
// // // // // }

// // // // // // Puts the camera in front of the model whenever fitKey changes
// // // // // // (new file uploaded or segmentation finished)
// // // // // function FrontView({ targetRef, fitKey }) {
// // // // //   const { camera, controls, size } = useThree();

// // // // //   useEffect(() => {
// // // // //     const group = targetRef.current;
// // // // //     if (!group) return;

// // // // //     const box = new THREE.Box3().setFromObject(group);
// // // // //     if (box.isEmpty()) return;

// // // // //     const center = box.getCenter(new THREE.Vector3());
// // // // //     const boxSize = box.getSize(new THREE.Vector3());

// // // // //     // From the front we see the X width and the Z height of the model
// // // // //     const fov = (camera.fov * Math.PI) / 180;
// // // // //     const aspect = size.width / size.height;
// // // // //     const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
// // // // //     const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
// // // // //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

// // // // //     camera.up.set(...CAMERA_UP);
// // // // //     camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
// // // // //     camera.near = distance / 100;
// // // // //     camera.far = distance * 100;
// // // // //     camera.updateProjectionMatrix();
// // // // //     camera.lookAt(center);

// // // // //     if (controls) {
// // // // //       controls.target.copy(center);
// // // // //       controls.update();
// // // // //     }
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [fitKey]);

// // // // //   return null;
// // // // // }

// // // // // export default function Viewer({
// // // // //   upperGeo,
// // // // //   lowerGeo,
// // // // //   upperParts,
// // // // //   lowerParts,
// // // // //   showUpper,
// // // // //   showLower,
// // // // // }) {
// // // // //   const modelRef = useRef();

// // // // //   const fitKey = [
// // // // //     upperGeo?.uuid,
// // // // //     lowerGeo?.uuid,
// // // // //     upperParts ? upperParts.length : 0,
// // // // //     lowerParts ? lowerParts.length : 0,
// // // // //   ].join("-");

// // // // //   return (
// // // // //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// // // // //       <ambientLight intensity={0.6} />
// // // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // // //       <group ref={modelRef}>
// // // // //         <group visible={showUpper}>
// // // // //           <Jaw geo={upperGeo} parts={upperParts} />
// // // // //         </group>
// // // // //         <group visible={showLower}>
// // // // //           <Jaw geo={lowerGeo} parts={lowerParts} />
// // // // //         </group>
// // // // //       </group>

// // // // //       <FrontView targetRef={modelRef} fitKey={fitKey} />

// // // // //       <TrackballControls
// // // // //         makeDefault
// // // // //         rotateSpeed={6}
// // // // //         zoomSpeed={1.5}
// // // // //         panSpeed={1.2}
// // // // //         staticMoving
// // // // //       />
// // // // //     </Canvas>
// // // // //   );
// // // // // }






// // // // import { useEffect, useMemo, useRef } from "react";
// // // // import * as THREE from "three";
// // // // import { Canvas, useThree } from "@react-three/fiber";
// // // // import { TrackballControls } from "@react-three/drei";

// // // // // ---- Colors and sizes ----
// // // // const JAW_COLOR = "#f4a6b8"; // pink scan
// // // // const LINE_COLOR = "#00e5ff"; // LAT spline
// // // // const HANDLE_COLOR = "#ffd54a"; // editable points
// // // // const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// // // // const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// // // // const SPLINE_SAMPLES = 200; // smoothness of the spline

// // // // // ---- Start view settings ----
// // // // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // // // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // // // const FIT_MARGIN = 1.1; // smaller = closer

// // // // const noRaycast = () => null; // makes an object "invisible" for mouse picking
// // // // const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // // // const SEE_THROUGH = false; // true = lines are always visible, even behind the model

// // // // // ---------------- The scan of one jaw ----------------
// // // // // function Jaw({ geo, active, dragging, onMoveDrag }) {
// // // // //   if (!geo) return null;

// // // // //   return (
// // // // //     <mesh
// // // // //       geometry={geo}
// // // // //       // while a point is dragged, the point follows the surface under the mouse
// // // // //       onPointerMove={
// // // // //         dragging && active
// // // // //           ? (e) => {
// // // // //               e.stopPropagation();
// // // // //               onMoveDrag(e.point);
// // // // //             }
// // // // //           : undefined
// // // // //       }
// // // // //     >
// // // // //       <meshStandardMaterial color={JAW_COLOR} />
// // // // //     </mesh>
// // // // //   );
// // // // // }




// // // // function Jaw({ geo, active, dragging, onMoveDrag }) {
// // // //   if (!geo) return null;

// // // //   return (
// // // //     <mesh
// // // //       geometry={geo}
// // // //       // the scan blocks clicks on points that are behind it
// // // //       onPointerDown={(e) => e.stopPropagation()}
// // // //       // while a point is dragged, it follows the surface under the mouse
// // // //       onPointerMove={
// // // //         dragging && active
// // // //           ? (e) => {
// // // //               e.stopPropagation();
// // // //               onMoveDrag(e.point);
// // // //             }
// // // //           : undefined
// // // //       }
// // // //     >
// // // //       <meshStandardMaterial
// // // //         color={JAW_COLOR}
// // // //         polygonOffset
// // // //         polygonOffsetFactor={1}
// // // //         polygonOffsetUnits={1}
// // // //       />
// // // //     </mesh>
// // // //   );
// // // // }

// // // // // ---------------- The spline of one tooth ----------------
// // // // function LatSpline({ jaw, curve, dragging, onStartDrag }) {
// // // //   const controls = useThree((state) => state.controls);

// // // //   // smooth closed spline through the editable points, drawn as a thin tube
// // // //   const tubeGeometry = useMemo(() => {
// // // //     if (curve.points.length < 3) return null;
// // // //     const spline = new THREE.CatmullRomCurve3(curve.points, true, "centripetal");
// // // //     return new THREE.TubeGeometry(spline, SPLINE_SAMPLES, TUBE_RADIUS, 6, true);
// // // //   }, [curve.points]);

// // // //   return (
// // // //     <>
// // // //       {tubeGeometry && (
// // // //         <mesh geometry={tubeGeometry} renderOrder={10} raycast={noRaycast}>
// // // //           {/* <meshBasicMaterial color={LINE_COLOR} depthTest={false} />
// // // //            */}
// // // //            <meshBasicMaterial color={LINE_COLOR} depthTest={SEE_THROUGH ? false : true} />
// // // //         </mesh>
// // // //       )}

// // // //       {curve.points.map((p, i) => (
// // // //         <mesh
// // // //           key={i}
// // // //           position={p}
// // // //           renderOrder={11}
// // // //           // while dragging, the points must not block the mouse
// // // //           raycast={dragging ? noRaycast : meshRaycast}
// // // //           onPointerDown={(e) => {
// // // //             e.stopPropagation();
// // // //             if (controls) controls.enabled = false; // stop rotating the model
// // // //             onStartDrag(jaw, curve.id, i);
// // // //           }}
// // // //           onPointerOver={() => (document.body.style.cursor = "pointer")}
// // // //           onPointerOut={() => (document.body.style.cursor = "default")}
// // // //         >
// // // //           <sphereGeometry args={[HANDLE_RADIUS, 12, 12]} />
// // // //           {/* <meshBasicMaterial color={HANDLE_COLOR} depthTest={false} /> */}
// // // //           <meshBasicMaterial color={HANDLE_COLOR} depthTest={SEE_THROUGH ? false : true} />
// // // //         </mesh>
// // // //       ))}
// // // //     </>
// // // //   );
// // // // }

// // // // function LatCurves({ jaw, curves, dragging, onStartDrag }) {
// // // //   return (
// // // //     <>
// // // //       {curves.map((c) => (
// // // //         <LatSpline
// // // //           key={c.id}
// // // //           jaw={jaw}
// // // //           curve={c}
// // // //           dragging={dragging}
// // // //           onStartDrag={onStartDrag}
// // // //         />
// // // //       ))}
// // // //     </>
// // // //   );
// // // // }

// // // // // Turns the model rotation off while a point is dragged, and ends the drag
// // // // // when the mouse button is released
// // // // function DragController({ dragging, onEndDrag }) {
// // // //   const controls = useThree((state) => state.controls);

// // // //   useEffect(() => {
// // // //     if (controls) controls.enabled = !dragging;
// // // //     if (!dragging) return;

// // // //     const up = () => onEndDrag();
// // // //     window.addEventListener("pointerup", up);
// // // //     return () => window.removeEventListener("pointerup", up);
// // // //   }, [dragging, controls, onEndDrag]);

// // // //   return null;
// // // // }

// // // // // Puts the camera in front of the model whenever fitKey changes
// // // // function FrontView({ targetRef, fitKey }) {
// // // //   const { camera, controls, size } = useThree();

// // // //   useEffect(() => {
// // // //     const group = targetRef.current;
// // // //     if (!group) return;

// // // //     const box = new THREE.Box3().setFromObject(group);
// // // //     if (box.isEmpty()) return;

// // // //     const center = box.getCenter(new THREE.Vector3());
// // // //     const boxSize = box.getSize(new THREE.Vector3());

// // // //     const fov = (camera.fov * Math.PI) / 180;
// // // //     const aspect = size.width / size.height;
// // // //     const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
// // // //     const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
// // // //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

// // // //     camera.up.set(...CAMERA_UP);
// // // //     camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
// // // //     camera.near = distance / 100;
// // // //     camera.far = distance * 100;
// // // //     camera.updateProjectionMatrix();
// // // //     camera.lookAt(center);

// // // //     if (controls) {
// // // //       controls.target.copy(center);
// // // //       controls.update();
// // // //     }
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [fitKey]);

// // // //   return null;
// // // // }

// // // // export default function Viewer({
// // // //   upperGeo,
// // // //   lowerGeo,
// // // //   showUpper,
// // // //   showLower,
// // // //   latCurves,
// // // //   dragging,
// // // //   onStartDrag,
// // // //   onMoveDrag,
// // // //   onEndDrag,
// // // // }) {
// // // //   const modelRef = useRef();

// // // //   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

// // // //   return (
// // // //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// // // //       <ambientLight intensity={0.6} />
// // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // //       {/* the scans (the camera fits to this group) */}
// // // //       <group ref={modelRef}>
// // // //         <group visible={showUpper}>
// // // //           <Jaw geo={upperGeo} active={showUpper} dragging={dragging} onMoveDrag={onMoveDrag} />
// // // //         </group>
// // // //         <group visible={showLower}>
// // // //           <Jaw geo={lowerGeo} active={showLower} dragging={dragging} onMoveDrag={onMoveDrag} />
// // // //         </group>
// // // //       </group>

// // // //       {/* the LAT splines, hidden together with their jaw */}
// // // //       <group visible={showUpper}>
// // // //         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
// // // //       </group>
// // // //       <group visible={showLower}>
// // // //         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
// // // //       </group>

// // // //       <FrontView targetRef={modelRef} fitKey={fitKey} />
// // // //       <DragController dragging={dragging} onEndDrag={onEndDrag} />

// // // //       <TrackballControls
// // // //         makeDefault
// // // //         rotateSpeed={6}
// // // //         zoomSpeed={1.5}
// // // //         panSpeed={1.2}
// // // //         staticMoving
// // // //       />
// // // //     </Canvas>
// // // //   );
// // // // }
















// // // import { useEffect, useMemo, useRef } from "react";
// // // import * as THREE from "three";
// // // import { Canvas, useThree } from "@react-three/fiber";
// // // import { TrackballControls } from "@react-three/drei";

// // // // ---- Colors and sizes ----
// // // const JAW_COLOR = "#f4a6b8"; // pink raw scan
// // // const GUM_COLOR = "#D47575"; // gum after Segment
// // // const TEETH_COLOR = "#F6E5DF"; // teeth after Segment
// // // const LINE_COLOR = "#00e5ff"; // LAT spline
// // // const HANDLE_COLOR = "#ffd54a"; // editable points
// // // const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// // // const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// // // const SPLINE_SAMPLES = 200; // smoothness of the spline

// // // // ---- Start view settings ----
// // // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // // const FIT_MARGIN = 1.1; // smaller = closer

// // // const noRaycast = () => null; // makes an object "invisible" for mouse picking
// // // const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // // // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // // function colorFor(fileName) {
// // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // }

// // // // ---------------- One jaw: the raw scan, or the separated gum and teeth ----------------
// // // function Jaw({ geo, parts, active, dragging, onMoveDrag }) {
// // //   // after Segment: gum and every tooth with their own color
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

// // //   if (!geo) return null;

// // //   // before Segment: the raw scan
// // //   return (
// // //     <mesh
// // //       geometry={geo}
// // //       // the scan blocks clicks on points that are behind it
// // //       onPointerDown={(e) => e.stopPropagation()}
// // //       // while a point is dragged, it follows the surface under the mouse
// // //       onPointerMove={
// // //         dragging && active
// // //           ? (e) => {
// // //               e.stopPropagation();
// // //               onMoveDrag(e.point);
// // //             }
// // //           : undefined
// // //       }
// // //     >
// // //       <meshStandardMaterial
// // //         color={JAW_COLOR}
// // //         polygonOffset
// // //         polygonOffsetFactor={1}
// // //         polygonOffsetUnits={1}
// // //       />
// // //     </mesh>
// // //   );
// // // }

// // // // ---------------- The spline of one tooth ----------------
// // // function LatSpline({ jaw, curve, dragging, onStartDrag }) {
// // //   const controls = useThree((state) => state.controls);

// // //   // smooth closed spline through the editable points, drawn as a thin tube
// // //   const tubeGeometry = useMemo(() => {
// // //     if (curve.points.length < 3) return null;
// // //     const spline = new THREE.CatmullRomCurve3(curve.points, true, "centripetal");
// // //     return new THREE.TubeGeometry(spline, SPLINE_SAMPLES, TUBE_RADIUS, 6, true);
// // //   }, [curve.points]);

// // //   return (
// // //     <>
// // //       {tubeGeometry && (
// // //         <mesh geometry={tubeGeometry} renderOrder={10} raycast={noRaycast}>
// // //           <meshBasicMaterial color={LINE_COLOR} />
// // //         </mesh>
// // //       )}

// // //       {curve.points.map((p, i) => (
// // //         <mesh
// // //           key={i}
// // //           position={p}
// // //           renderOrder={11}
// // //           // while dragging, the points must not block the mouse
// // //           raycast={dragging ? noRaycast : meshRaycast}
// // //           onPointerDown={(e) => {
// // //             e.stopPropagation();
// // //             if (controls) controls.enabled = false; // stop rotating the model
// // //             onStartDrag(jaw, curve.id, i);
// // //           }}
// // //           onPointerOver={() => (document.body.style.cursor = "pointer")}
// // //           onPointerOut={() => (document.body.style.cursor = "default")}
// // //         >
// // //           <sphereGeometry args={[HANDLE_RADIUS, 12, 12]} />
// // //           <meshBasicMaterial color={HANDLE_COLOR} />
// // //         </mesh>
// // //       ))}
// // //     </>
// // //   );
// // // }

// // // function LatCurves({ jaw, curves, dragging, onStartDrag }) {
// // //   return (
// // //     <>
// // //       {curves.map((c) => (
// // //         <LatSpline
// // //           key={c.id}
// // //           jaw={jaw}
// // //           curve={c}
// // //           dragging={dragging}
// // //           onStartDrag={onStartDrag}
// // //         />
// // //       ))}
// // //     </>
// // //   );
// // // }

// // // // Turns the model rotation off while a point is dragged, and ends the drag
// // // // when the mouse button is released
// // // function DragController({ dragging, onEndDrag }) {
// // //   const controls = useThree((state) => state.controls);

// // //   useEffect(() => {
// // //     if (controls) controls.enabled = !dragging;
// // //     if (!dragging) return;

// // //     const up = () => onEndDrag();
// // //     window.addEventListener("pointerup", up);
// // //     return () => window.removeEventListener("pointerup", up);
// // //   }, [dragging, controls, onEndDrag]);

// // //   return null;
// // // }

// // // // Puts the camera in front of the model whenever fitKey changes
// // // function FrontView({ targetRef, fitKey }) {
// // //   const { camera, controls, size } = useThree();

// // //   useEffect(() => {
// // //     const group = targetRef.current;
// // //     if (!group) return;

// // //     const box = new THREE.Box3().setFromObject(group);
// // //     if (box.isEmpty()) return;

// // //     const center = box.getCenter(new THREE.Vector3());
// // //     const boxSize = box.getSize(new THREE.Vector3());

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
// // //   latCurves,
// // //   dragging,
// // //   onStartDrag,
// // //   onMoveDrag,
// // //   onEndDrag,
// // // }) {
// // //   const modelRef = useRef();

// // //   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

// // //   return (
// // //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// // //       <ambientLight intensity={0.6} />
// // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // //       {/* the scans (the camera fits to this group) */}
// // //       <group ref={modelRef}>
// // //         <group visible={showUpper}>
// // //           <Jaw
// // //             geo={upperGeo}
// // //             parts={upperParts}
// // //             active={showUpper}
// // //             dragging={dragging}
// // //             onMoveDrag={onMoveDrag}
// // //           />
// // //         </group>
// // //         <group visible={showLower}>
// // //           <Jaw
// // //             geo={lowerGeo}
// // //             parts={lowerParts}
// // //             active={showLower}
// // //             dragging={dragging}
// // //             onMoveDrag={onMoveDrag}
// // //           />
// // //         </group>
// // //       </group>

// // //       {/* the LAT splines, hidden together with their jaw */}
// // //       <group visible={showUpper}>
// // //         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
// // //       </group>
// // //       <group visible={showLower}>
// // //         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
// // //       </group>

// // //       <FrontView targetRef={modelRef} fitKey={fitKey} />
// // //       <DragController dragging={dragging} onEndDrag={onEndDrag} />

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











// // import { useEffect, useMemo, useRef, useState } from "react";
// // import * as THREE from "three";
// // import { Canvas, useThree, useFrame} from "@react-three/fiber";
// // // import { TrackballControls } from "@react-three/drei";
// // import { TrackballControls, Line, Html } from "@react-three/drei";
// // import { removeTeeth } from "./gumUtils.js";


// // // ---- Colors and sizes ----
// // const JAW_COLOR = "#F7E0C5"; //  raw scan
// // const GUM_COLOR = "#D47575"; // gum after Segment
// // const TEETH_COLOR = "#EEDBD8"; // teeth after Segment
// // const LINE_COLOR = "green"; // LAT spline
// // const HANDLE_COLOR = "#4a5cff"; // editable points

// // const TRIMLINE_COLOR = "green"; // trimline (Generate Trimline)
// // const TRIMLINE_RADIUS = 0.15; // thickness of the trimline (mm)

// // const TRIMLINE_HANDLE_COLOR = "#800080"; 
// // const TRIMLINE_HANDLE_RADIUS = 0.35; // size of those points (mm)

// // const TRIM_MODEL_COLOR = "#F7E0C5"; // Trim Model result
// // const BASE_MODEL_COLOR = "#F7E0C5"; // Add Base result

// // const MODEL_WITH_BASE_COLOR = GUM_COLOR; // the whole model with base (Segment view)

// // const LABEL_COLOR = "#705bd1"; // line and bubble of the tooth numbers

// // // one color for each tooth position (1 to 8); the other side of the jaw is a bit darker
// // const TOOTH_PALETTE = ["#5b8be0", "#a37be0", "#e875b4", "#6cc04a", "#35a7a3", "#e8845f", "#4a4fb5", "#9a8a5a"];

// // // color of one tooth from its file name, e.g. "11.stl"
// // function toothColor(fileName) {
// //   const m = fileName.match(/(\d)(\d)/);
// //   if (!m) return TEETH_COLOR;
// //   const quadrant = Number(m[1]);
// //   const position = Number(m[2]);
// //   const color = new THREE.Color(TOOTH_PALETTE[(position + 7) % 8]);
// //   if (quadrant === 2 || quadrant === 3) color.multiplyScalar(0.8);
// //   return color;
// // }




// // const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// // const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// // const SPLINE_SAMPLES = 200; // smoothness of the spline

// // // ---- Start view settings ----
// // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // const FIT_MARGIN = 1.1; // smaller = closer
// // const LINES_ALWAYS_VISIBLE = false; // true = lines and points are drawn even where they are inside the surface

// // const noRaycast = () => null; // makes an object "invisible" for mouse picking
// // const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // // const isGum = (fileName) => fileName.toLowerCase().includes("gum");
// // // const isGum = (fileName) => /gum|modelwithbase/i.test(fileName);

// // const isGum = (fileName) => fileName.toLowerCase().includes("gum");
// // const isModelWithBase = (fileName) => /modelwithbase/i.test(fileName);
// // // ---------------- One jaw: the raw scan, or the separated gum and teeth ----------------
// // // function Jaw({ geo, parts, colored, showTeeth, showGum, active, dragging, onMoveDrag }) {
// // //   // after Segment: gum and every tooth with their own color and their own visibility
// // //   if (parts && parts.length > 0) {
// // //     return (
// // //       <>
// // //         {parts.map((p) => (
// // //           <mesh
// // //             key={p.name}
// // //             geometry={p.geo}
// // //             visible={isGum(p.name) ? showGum : showTeeth}
// // //           >
// // //             {/* <meshStandardMaterial color={isGum(p.name) ? GUM_COLOR : TEETH_COLOR} /> */}
// // //               {/* <meshStandardMaterial
// // //               color={isGum(p.name) ? GUM_COLOR : colored ? toothColor(p.name) : TEETH_COLOR}
// // //             /> */}
// // //             <meshStandardMaterial color={isGum(p.name) ? GUM_COLOR : TEETH_COLOR} />
// // //           </mesh>
// // //         ))}
// // //       </>
// // //     );
// // //   }

// // //   if (!geo) return null;

// // //   // before Segment: the raw scan
// // //   return (
// // //     <mesh
// // //       geometry={geo}
// // //       // the scan blocks clicks on points that are behind it
// // //       onPointerDown={(e) => e.stopPropagation()}
// // //       // while a point is dragged, it follows the surface under the mouse
// // //       onPointerMove={
// // //         dragging && active
// // //           ? (e) => {
// // //               e.stopPropagation();
// // //               onMoveDrag(e.point);
// // //             }
// // //           : undefined
// // //       }
// // //     >
// // //       <meshStandardMaterial
// // //         color={JAW_COLOR}
// // //         polygonOffset
// // //         polygonOffsetFactor={1}
// // //         polygonOffsetUnits={1}
// // //       />
// // //     </mesh>
// // //   );
// // // }



// // // Makes a gum-only copy of the model with base by removing the triangles
// // // whose 3 corners are all corners of a tooth mesh.


// // // function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag }) {
// // //   // while a point is dragged, it follows the surface under the mouse
// // //   const moveHandler =
// // //     dragging && active
// // //       ? (e) => {
// // //           e.stopPropagation();
// // //           onMoveDrag(e.point);
// // //         }
// // //       : undefined;

// // //   // after Segment: gum and every tooth with their own visibility
// // //   if (parts && parts.length > 0) {
// // //     // true when the model with base is among the parts
// // // const hasWhole = parts.some((p) => isModelWithBase(p.name));
// // //     return (
// // //       <>
// // //         {parts.map((p) => {
// // //           // const gum = isGum(p.name);
// // //           // const visible = gum ? showGum : showTeeth;
// // //          const gum = isGum(p.name);
// // // const whole = isModelWithBase(p.name);
// // // // the whole model has both gum and teeth, so it is hidden only when both buttons are off
// // // // const visible = whole ? showGum || showTeeth : gum ? showGum : showTeeth;
// // // // const visible = whole ? showGum : gum ? showGum : showTeeth;

// // // // the model with base shows only while the teeth are on; with the teeth off, the plain gum is shown instead
// // // const visible = whole
// // //   ? showGum && showTeeth
// // //   : gum
// // //   ? hasWhole
// // //     ? showGum && !showTeeth
// // //     : showGum
// // //   : showTeeth;
// // // const color = whole ? MODEL_WITH_BASE_COLOR : gum ? GUM_COLOR : TEETH_COLOR;

// // //           return (
// // //             <mesh
// // //               key={p.name}
// // //               geometry={p.geo}
// // //               visible={visible}
// // //               onPointerMove={visible ? moveHandler : undefined}
// // //             >
// // //               {/* <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} /> */}

// // //               {/* <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} side={THREE.DoubleSide} /> */}
// // //               <meshStandardMaterial
// // //             //  color={gum ? GUM_COLOR : TEETH_COLOR}
// // //              color={color}
// // //              side={THREE.DoubleSide}
// // //              polygonOffset
// // //             //  polygonOffsetFactor={8}
// // //             //  polygonOffsetUnits={8}
           
// // //           polygonOffsetFactor={whole ? 20 : 8}
// // //           polygonOffsetUnits={whole ? 20 : 8}
// // //            />

// // //             </mesh>
// // //           );
// // //         })}
// // //       </>
// // //     );
// // //   }

// // //   if (!geo) return null;

// // //   // before Segment: the raw scan
// // //   return (
// // //     <mesh
// // //       geometry={geo}
// // //       // the scan blocks clicks on points that are behind it
// // //       onPointerDown={(e) => e.stopPropagation()}
// // //       onPointerMove={moveHandler}
// // //     >
// // //       <meshStandardMaterial
// // //         color={JAW_COLOR}
// // //         side={THREE.DoubleSide}
// // //         polygonOffset
// // //         polygonOffsetFactor={25}
// // //         polygonOffsetUnits={25}
// // //       />
// // //     </mesh>
// // //   );
// // // }


// // function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag }) {
// //   const moveHandler =
// //     dragging && active
// //       ? (e) => {
// //           e.stopPropagation();
// //           onMoveDrag(e.point);
// //         }
// //       : undefined;

// //   const whole = parts ? parts.find((p) => isModelWithBase(p.name)) : null;

// //   // gum + base without the teeth (built once per result)
// //   const gumOnlyGeo = useMemo(() => {
// //     if (!whole || !parts) return null;
// //     const teeth = parts.filter((p) => !isGum(p.name) && !isModelWithBase(p.name)).map((p) => p.geo);
// //     return removeTeeth(whole.geo, teeth);
// //   }, [whole, parts]);

// //   if (parts && parts.length > 0) {
// //     return (
// //       <>
// //         {/* gum with base, no teeth */}
// //         {whole && gumOnlyGeo && (
// //           <mesh
// //             geometry={gumOnlyGeo}
// //             visible={showGum}
// //             onPointerMove={showGum ? moveHandler : undefined}
// //           >
// //             <meshStandardMaterial
// //               color={GUM_COLOR}
// //               side={THREE.DoubleSide}
// //               polygonOffset
// //               polygonOffsetFactor={8}
// //               polygonOffsetUnits={8}
// //             />
// //           </mesh>
// //         )}

// //         {parts.map((p) => {
// //           if (isModelWithBase(p.name)) {
// //             // fallback only: if the teeth could not be removed, show the whole model
// //             // when both buttons are on (old behaviour)
// //             if (gumOnlyGeo) return null;
// //             return (
// //               <mesh key={p.name} geometry={p.geo} visible={showGum && showTeeth}>
// //                 <meshStandardMaterial
// //                   color={GUM_COLOR}
// //                   side={THREE.DoubleSide}
// //                   polygonOffset
// //                   polygonOffsetFactor={20}
// //                   polygonOffsetUnits={20}
// //                 />
// //               </mesh>
// //             );
// //           }

// //           const gum = isGum(p.name);
// //           // the plain Gum.stl is replaced by the gum with base
// //           const visible = gum ? showGum && !whole : showTeeth;

// //           return (
// //             <mesh
// //               key={p.name}
// //               geometry={p.geo}
// //               visible={visible}
// //               onPointerMove={visible ? moveHandler : undefined}
// //             >
// //               <meshStandardMaterial
// //                 color={gum ? GUM_COLOR : TEETH_COLOR}
// //                 side={THREE.DoubleSide}
// //                 polygonOffset
// //                 polygonOffsetFactor={8}
// //                 polygonOffsetUnits={8}
// //               />
// //             </mesh>
// //           );
// //         })}
// //       </>
// //     );
// //   }

// //   if (!geo) return null;

// //   return (
// //     <mesh geometry={geo} onPointerDown={(e) => e.stopPropagation()} onPointerMove={moveHandler}>
// //       <meshStandardMaterial
// //         color={JAW_COLOR}
// //         side={THREE.DoubleSide}
// //         polygonOffset
// //         polygonOffsetFactor={25}
// //         polygonOffsetUnits={25}
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
// //           {/* <meshBasicMaterial color={LINE_COLOR} /> */}
// //           <meshBasicMaterial
// //          color={LINE_COLOR}
// //          depthTest={!LINES_ALWAYS_VISIBLE}
// //          />
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
// //           {/* <meshBasicMaterial color={HANDLE_COLOR} /> */}
// //           <meshBasicMaterial
// //          color={HANDLE_COLOR}
// //         depthTest={!LINES_ALWAYS_VISIBLE}
// //         />
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

// // // ---------------- The trimline: a curve along the gum ----------------
// // // function Trimline({ points }) {
// // //   const geometry = useMemo(() => {
// // //     if (!points || points.length < 2) return null;

// // //     // thin out very long lists, so the tube stays light (the last point is kept)
// // //     const step = Math.max(1, Math.ceil(points.length / 600));
// // //     const pts = points.filter((_, i) => i % step === 0);
// // //     const last = points[points.length - 1];
// // //     if (pts[pts.length - 1] !== last) pts.push(last);
// // //     if (pts.length < 2) return null;

// // //     // closed if the curve ends where it starts
// // //     const closed = pts.length > 3 && pts[0].distanceTo(last) < 0.5;
// // //     const curve = new THREE.CatmullRomCurve3(pts, closed, "centripetal");
// // //     return new THREE.TubeGeometry(curve, pts.length * 2, TRIMLINE_RADIUS, 6, closed);
// // //   }, [points]);

// // //   if (!geometry) return null;

// // //   return (
// // //     <mesh geometry={geometry} renderOrder={12} raycast={noRaycast}>
// // //       <meshBasicMaterial color={TRIMLINE_COLOR} />
// // //     </mesh>
// // //   );
// // // }


// // // ---------------- The trimline: a curve along the gum, with editable points ----------------
// // function EditableTrimline({ jaw, trimline, dragging, onStartTrimDrag }) {
// //   const controls = useThree((state) => state.controls);

// //   // smooth line through the editable points, drawn as a thin tube
// //   const geometry = useMemo(() => {
// //     if (!trimline || trimline.points.length < 3) return null;
// //     const curve = new THREE.CatmullRomCurve3(trimline.points, trimline.closed, "centripetal");
// //     return new THREE.TubeGeometry(curve, 400, TRIMLINE_RADIUS, 6, trimline.closed);
// //   }, [trimline]);

// //   if (!trimline || !geometry) return null;

// //   return (
// //     <>
// //       <mesh geometry={geometry} renderOrder={12} raycast={noRaycast}>
// //         {/* <meshBasicMaterial color={TRIMLINE_COLOR} /> */}
// //         <meshBasicMaterial
// //       color={TRIMLINE_COLOR}
// //      depthTest={!LINES_ALWAYS_VISIBLE}
// //       />
// //       </mesh>

// //       {trimline.points.map((p, i) => (
// //         <mesh
// //           key={i}
// //           position={p}
// //           renderOrder={13}
// //           // while dragging, the points must not block the mouse
// //           raycast={dragging ? noRaycast : meshRaycast}
// //           onPointerDown={(e) => {
// //             e.stopPropagation();
// //             if (controls) controls.enabled = false; // stop rotating the model
// //             onStartTrimDrag(jaw, i);
// //           }}
// //           onPointerOver={() => (document.body.style.cursor = "pointer")}
// //           onPointerOut={() => (document.body.style.cursor = "default")}
// //         >
// //           <sphereGeometry args={[TRIMLINE_HANDLE_RADIUS, 12, 12]} />
// //           {/* <meshBasicMaterial color={TRIMLINE_HANDLE_COLOR} /> */}
// //           <meshBasicMaterial
// //          color={TRIMLINE_HANDLE_COLOR}
// //          depthTest={!LINES_ALWAYS_VISIBLE}
// //          />
// //         </mesh>
// //       ))}
// //     </>
// //   );
// // }


// // // ---------------- Result of Trim Model or Add Base: a surface drawn on top ----------------
// // function ResultMesh({ result }) {
// //   if (!result) return null;

// //   const color = result.kind === "trimModel" ? TRIM_MODEL_COLOR : BASE_MODEL_COLOR;

// //   return (
// //     <mesh geometry={result.geo}>
// //       {/* <meshStandardMaterial
// //         color={color}
// //         // pulled a little towards the camera, so it wins over the surface below it
// //         polygonOffset
// //         polygonOffsetFactor={-2}
// //         polygonOffsetUnits={-2}
// //       /> */}

// //       <meshStandardMaterial
// //     color={color}
// //     side={THREE.DoubleSide}
// //   // pulled a little towards the camera, so it wins over the surface below it
// //    polygonOffset
// //    polygonOffsetFactor={-2}
// //    polygonOffsetUnits={-2}
// // />
// //     </mesh>
// //   );
// // }

// // // ---------------- Tooth number labels: a line from the tooth to a round bubble ----------------
// // function ToothLabels({ labels, parts, show }) {
// //   if (!show || !labels || labels.length === 0) return null;

// //   return (
// //     <>
// //       {labels.map((l) => {
// //         // the point nearer to the center of the tooth is the tooth end; the other gets the bubble
// //         let tooth = l.a;
// //         let bubble = l.b;
// //         const part = parts ? parts.find((p) => p.name.replace(/\.stl$/i, "") === l.id) : null;
// //         if (part && part.geo && part.geo.boundingBox) {
// //           const center = part.geo.boundingBox.getCenter(new THREE.Vector3());
// //           if (l.b.distanceTo(center) < l.a.distanceTo(center)) {
// //             tooth = l.b;
// //             bubble = l.a;
// //           }
// //         }

// //         return (
// //           <group key={l.id}>
// //             <Line points={[tooth, bubble]} color={LABEL_COLOR} lineWidth={2} />
// //             <Html position={bubble} center style={{ pointerEvents: "none" }}>
// //               <div
// //                 style={{
// //                   width: 34,
// //                   height: 34,
// //                   borderRadius: "50%",
// //                   background: LABEL_COLOR,
// //                   color: "white",
// //                   fontWeight: "bold",
// //                   fontSize: 15,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   userSelect: "none",
// //                 }}
// //               >
// //                 {l.id}
// //               </div>
// //             </Html>
// //           </group>
// //         );
// //       })}
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


// // // Moves the camera to Front / Back / Top / Bottom / Left / Right when a view button is clicked
// // const VIEW_SETTINGS = {
// //   "Front View":  { dir: [0, -1, -0.1], up: [0, 0, 1], w: "x", h: "z", d: "y" },
// //   // "Back View":   { dir: [0, 1, -0.25],  up: [0, 0, 1], w: "x", h: "z", d: "y" },
// //   "Back View":   { dir: [0, 1, -0.12],  up: [0, 0, 1], w: "x", h: "z", d: "y", shiftX: 0.05, shiftZ: 0.05 },
// //   // "Top View":    { dir: [0, 0, 1],  up: [0, -1, 0], w: "x", h: "y", d: "z",shiftY: -0.04},
// //   // "Bottom View": { dir: [0, 0, -1], up: [0.001, 1, 0.1], w: "x", h: "y", d: "z",shiftX: 0.1, shiftY: -0.07 },
// //   "Top View":    { dir: [0, 0, 1],  up: [0, 1, 0], w: "x", h: "y", d: "z", shiftY: -0.04 },
// // "Bottom View": { dir: [0, 0, -1], up: [0.001, -1, 0], w: "x", h: "y", d: "z", shiftX: 0.1, shiftY: -0.07 },

// //   "Left View": { dir: [-1, -0.2, -0.001], up: [0, -0.05, 1], w: "y", h: "z", d: "x",shiftZ: -0.05 },
// //  "Right View": { dir: [1, -0.2, -0.001], up: [0, -0.15, 1], w: "y", h: "z", d: "x" },
// // };

// // // the Left and Right buttons use each other's camera
// // const VIEW_SWAP = {
// //   "Left View": "Right View",
// //   "Right View": "Left View",
// // };

// // // function ViewController({ targetRef, viewRequest }) {
// // //   const { camera, controls, size } = useThree();

// // //   useEffect(() => {
// // //     if (!viewRequest) return;
// // //     const cfg = VIEW_SETTINGS[viewRequest.name];
// // //     const group = targetRef.current;
// // //     if (!cfg || !group) return;

// // //     const box = new THREE.Box3().setFromObject(group);
// // //     if (box.isEmpty()) return;

// // //     const center = box.getCenter(new THREE.Vector3());
// // //     const s = box.getSize(new THREE.Vector3());

// // //     const fov = (camera.fov * Math.PI) / 180;
// // //     const aspect = size.width / size.height;
// // //     const distForHeight = s[cfg.h] / 2 / Math.tan(fov / 2);
// // //     const distForWidth = s[cfg.w] / 2 / (Math.tan(fov / 2) * aspect);
// // //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + s[cfg.d] / 2;

// // //     camera.up.set(...cfg.up);
// // //     camera.position.set(
// // //       center.x + cfg.dir[0] * distance,
// // //       center.y + cfg.dir[1] * distance,
// // //       center.z + cfg.dir[2] * distance
// // //     );
// // //     camera.near = distance / 100;
// // //     camera.far = distance * 100;
// // //     camera.updateProjectionMatrix();
// // //     camera.lookAt(center);

// // //     if (controls) {
// // //       controls.target.copy(center);
// // //       controls.update();
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [viewRequest]);

// // //   return null;
// // // }



// // function ViewController({ targetRef, viewRequest }) {
// //   const { camera, controls, size } = useThree();

// //   useEffect(() => {
// //     if (!viewRequest) return;
// //     // const cfg = VIEW_SETTINGS[viewRequest.name];
// //     const cfg = VIEW_SETTINGS[VIEW_SWAP[viewRequest.name] || viewRequest.name];
// //     const group = targetRef.current;
// //     if (!cfg || !group) return;

// //     const box = new THREE.Box3().setFromObject(group);
// //     if (box.isEmpty()) return;

// //     const center = box.getCenter(new THREE.Vector3());
// //     const s = box.getSize(new THREE.Vector3());

// //     const fov = (camera.fov * Math.PI) / 180;
// //     const aspect = size.width / size.height;
// //     const distForHeight = s[cfg.h] / 2 / Math.tan(fov / 2);
// //     const distForWidth = s[cfg.w] / 2 / (Math.tan(fov / 2) * aspect);
// //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + s[cfg.d] / 2;

// //     // move the look-at point by a fraction of the model size
// //     const target = center.clone();
// //     target.x += s.x * (cfg.shiftX || 0);
// //     target.y += s.y * (cfg.shiftY || 0);
// //     target.z += s.z * (cfg.shiftZ || 0);

// //     camera.up.set(...cfg.up);
// //     camera.position.set(
// //       target.x + cfg.dir[0] * distance,
// //       target.y + cfg.dir[1] * distance,
// //       target.z + cfg.dir[2] * distance
// //     );
// //     camera.near = distance / 100;
// //     camera.far = distance * 100;
// //     camera.updateProjectionMatrix();
// //     camera.lookAt(target);

// //     if (controls) {
// //       controls.target.copy(target);
// //       controls.update();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [viewRequest]);

// //   return null;
// // }

// // // A light that always shines from the camera towards the model

// // function Headlight() {
// //   const { camera, controls } = useThree();
// //   const light = useRef();

// //   useFrame(() => {
// //     if (!light.current) return;

// //     // slightly above and to the left of the camera
// //     const up = camera.up.clone().normalize();
// //     const right = new THREE.Vector3().crossVectors(camera.getWorldDirection(new THREE.Vector3()), up).normalize();
// //     const dist = controls ? camera.position.distanceTo(controls.target) : 100;

// //     light.current.position
// //       .copy(camera.position)
// //       .addScaledVector(up, dist * 0.5)
// //       .addScaledVector(right, -dist * 0.3);

// //     if (controls) light.current.target.position.copy(controls.target);
// //     light.current.target.updateMatrixWorld();
// //   });

// //   return <directionalLight ref={light} intensity={1.3} />;
// // }


// // // ---------------- Grid: a measuring backdrop behind the model ----------------
// // // const GRID_COLOR = "#5a5a5a"; // normal lines
// // // const GRID_CENTER_COLOR = "#9a9a9a"; // the two middle lines

// // // // the grid lies in the plane that faces the last view button (Front is the start view)
// // // const GRID_PLANE = {
// // //   "Front View": "xz",
// // //   "Back View": "xz",
// // //   "Top View": "xy",
// // //   "Bottom View": "xy",
// // //   "Left View": "yz",
// // //   "Right View": "yz",
// // // };

// // // function MeasureGrid({ targetRef, spacing, plane, fitKey }) {
// // //   const [area, setArea] = useState(null); // { center, extent } of the model

// // //   useEffect(() => {
// // //     const group = targetRef.current;
// // //     if (!group) return;
// // //     const box = new THREE.Box3().setFromObject(group);
// // //     if (box.isEmpty()) return;
// // //     const s = box.getSize(new THREE.Vector3());
// // //     setArea({ center: box.getCenter(new THREE.Vector3()), extent: Math.max(s.x, s.y, s.z) });
// // //   }, [targetRef, fitKey]);

// // //   const grid = useMemo(() => {
// // //     if (!area) return null;
// // //     // an even number of divisions (max 400), so there is a line in the middle
// // //     const divisions = Math.min(400, Math.ceil((area.extent * 1.6) / spacing / 2) * 2);
// // //     const helper = new THREE.GridHelper(divisions * spacing, divisions, GRID_CENTER_COLOR, GRID_COLOR);
// // //     helper.material.depthTest = false; // drawn first, the model covers it
// // //     helper.material.depthWrite = false;
// // //     helper.raycast = () => null; // the grid never blocks the mouse
// // //     helper.renderOrder = -1;
// // //     return helper;
// // //   }, [area, spacing]);

// // //   if (!grid) return null;

// // //   // lines sit on whole millimeters, the plane goes through the middle of the model
// // //   const snap = (v) => Math.round(v / spacing) * spacing;
// // //   const c = area.center;
// // //   let position = [snap(c.x), c.y, snap(c.z)]; // front / back: plane X-Z
// // //   let rotation = [0, 0, 0];
// // //   if (plane === "xy") {
// // //     position = [snap(c.x), snap(c.y), c.z]; // top / bottom: plane X-Y
// // //     rotation = [Math.PI / 2, 0, 0];
// // //   } else if (plane === "yz") {
// // //     position = [c.x, snap(c.y), snap(c.z)]; // left / right: plane Y-Z
// // //     rotation = [0, 0, Math.PI / 2];
// // //   }

// // //   return <primitive object={grid} position={position} rotation={rotation} />;
// // // }

// // const MAJOR_EVERY = 5; // a strong line after every 5 small squares

// // // ---------------- Grid: sets the size of the grid layer so that it matches mm ----------------
// // // function GridScaler({ gridRef, spacing, active }) {
// // //   const { camera, controls, size, gl } = useThree();
// // //   const last = useRef("");

// // //   useFrame(() => {
// // //     const el = gridRef.current;
// // //     if (!el || !active) return;

// // //     // the middle of the model (where the camera looks at)
// // //     const target = controls ? controls.target : new THREE.Vector3();

// // //     // how many screen pixels are 1 mm at the depth of the model
// // //     const distance = camera.position.distanceTo(target);
// // //     const pxPerMm = size.height / (2 * distance * Math.tan((camera.fov * Math.PI) / 360));
// // //     const cell = pxPerMm * spacing;

// // //     // where the middle of the model is on the screen, measured from the corner of the grid layer
// // //     const p = target.clone().project(camera);
// // //     const canvasRect = gl.domElement.getBoundingClientRect();
// // //     const layerRect = el.getBoundingClientRect();
// // //     const x = canvasRect.left - layerRect.left + (p.x * 0.5 + 0.5) * size.width;
// // //     const y = canvasRect.top - layerRect.top + (-p.y * 0.5 + 0.5) * size.height;

// // //     // only touch the page when something changed
// // //     const key = `${cell.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`;
// // //     if (key === last.current) return;
// // //     last.current = key;

// // //     // zoomed out so far that the lines would blur together: hide them
// // //     if (cell < 3) {
// // //       el.style.backgroundSize = "0 0";
// // //       return;
// // //     }
// // //     el.style.backgroundSize = `${cell}px ${cell}px`;
// // //     el.style.backgroundPosition = `${x}px ${y}px`;
// // //   });

// // //   return null;
// // // }


// // function GridScaler({ gridRef, spacing, active }) {
// //   const { camera, controls, size, gl } = useThree();
// //   const last = useRef("");

// //   useFrame(() => {
// //     const el = gridRef.current;
// //     if (!el || !active) return;

// //     // the middle of the model (where the camera looks at)
// //     const target = controls ? controls.target : new THREE.Vector3();

// //     // how many screen pixels are 1 mm at the depth of the model
// //     const distance = camera.position.distanceTo(target);
// //     const pxPerMm = size.height / (2 * distance * Math.tan((camera.fov * Math.PI) / 360));
// //     const cell = pxPerMm * spacing; // one small square
// //     const major = cell * MAJOR_EVERY; // one big square

// //     // where the middle of the model is on the screen, measured from the corner of the grid layer
// //     const p = target.clone().project(camera);
// //     const canvasRect = gl.domElement.getBoundingClientRect();
// //     const layerRect = el.getBoundingClientRect();
// //     const x = canvasRect.left - layerRect.left + (p.x * 0.5 + 0.5) * size.width;
// //     const y = canvasRect.top - layerRect.top + (-p.y * 0.5 + 0.5) * size.height;

// //     // only touch the page when something changed
// //     const key = `${cell.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`;
// //     if (key === last.current) return;
// //     last.current = key;

// //     // zoomed out so far that lines would blur together: hide the small ones first, then the strong ones
// //     const minorSize = cell >= 4 ? `${cell}px ${cell}px` : "0 0";
// //     const majorSize = major >= 8 ? `${major}px ${major}px` : "0 0";

// //     el.style.backgroundSize = `${majorSize}, ${majorSize}, ${minorSize}, ${minorSize}`;
// //     el.style.backgroundPosition = `${x}px ${y}px`; // the same start for all four layers
// //   });

// //   return null;
// // }

// // // ---------------- Superimpose: the initial position of the teeth as a green ghost ----------------
// // const GHOST_COLOR = "#00F7F6"; // color of the initial position
// // const GHOST_OPACITY = 0.55; // 1 = solid, lower = more see-through

// // function GhostTeeth({ parts, show }) {
// //   if (!show || !parts || parts.length === 0) return null;

// //   return (
// //     <>
// //       {parts.map((p) => (
// //         <mesh key={p.name} geometry={p.geo} renderOrder={5} raycast={noRaycast}>
// //           <meshStandardMaterial
// //             color={GHOST_COLOR}
// //             transparent
// //             opacity={GHOST_OPACITY}
// //             side={THREE.DoubleSide}
// //             depthWrite={false}
// //             // pulled a little towards the camera, so it wins where it lies on the final tooth
// //             polygonOffset
// //             polygonOffsetFactor={-1}
// //             polygonOffsetUnits={-1}
// //           />
// //         </mesh>
// //       ))}
// //     </>
// //   );
// // }



// // export default function Viewer({
// //   upperGeo,
// //   lowerGeo,
// //   upperParts,
// //   lowerParts,
// //   showUpper,
// //   showLower,
// //   segVisible,
// //   trimlines,
// //   resultMeshes,
// //   toothLabels,
// //   showNumbers,
// //   viewRequest,
// //   latCurves,
// //   dragging,
// //   onStartDrag,
// //   onStartTrimDrag,
// //   onMoveDrag,
// //   onEndDrag,
// //   showGrid,
// //   gridSize,
// //   gridRef,
// //   ghostParts,

// // }) {
// //   const modelRef = useRef();

// //   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

// //   return (
// //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
       
// //       {/* <ambientLight intensity={0.6} />
// //       <directionalLight position={[50, 50, 50]} intensity={1} />
// //       <directionalLight position={[-50, -50, -50]} intensity={0.5} /> 
// //             */}

// //       <ambientLight intensity={0.5} />
// //       <Headlight />
// //       <hemisphereLight args={["#ffeedd", "#888888", 0.2]} />

// //       {/* the scans (the camera fits to this group) */}
// //       <group ref={modelRef}>
// //         <group visible={showUpper}>
// //            <group visible={!resultMeshes.upper}> 
          
// //           <Jaw
// //             geo={upperGeo}
// //             colored={toothLabels.upper.length > 0}
// //             parts={upperParts}
// //             showTeeth={segVisible.upperTeeth}
// //             showGum={segVisible.upperGum}
// //             active={showUpper}
// //             dragging={dragging}
// //             onMoveDrag={onMoveDrag}
// //           />
// //           </group>

// //           {/* <Trimline points={trimlines.upper} /> */}
// //             {/* <EditableTrimline jaw="upper" trimline={trimlines.upper} dragging={dragging} onStartTrimDrag={onStartTrimDrag} /> */}
// //             <EditableTrimline jaw="upper" trimline={resultMeshes.upper ? null : trimlines.upper} dragging={dragging} onStartTrimDrag={onStartTrimDrag} />
// //           <ResultMesh result={resultMeshes.upper} />
// //           <ToothLabels
// //          labels={toothLabels.upper}
// //          parts={upperParts}
// //         //  show={showUpper && segVisible.upperTeeth}
// //         show={showUpper && segVisible.upperTeeth && showNumbers}

// //          />
// //          <GhostTeeth parts={ghostParts.upper} show={segVisible.upperTeeth} />

// //         </group>
// //         <group visible={showLower}>
// //          <group visible={!resultMeshes.lower}> 
       
// //           <Jaw
// //             geo={lowerGeo}
// //             colored={toothLabels.lower.length > 0}
// //             parts={lowerParts}
// //             showTeeth={segVisible.lowerTeeth}
// //             showGum={segVisible.lowerGum}
// //             active={showLower}
// //             dragging={dragging}
// //             onMoveDrag={onMoveDrag}
// //           />
// //           </group>
         
// //           {/* <Trimline points={trimlines.lower} /> */}
// //             {/* <EditableTrimline jaw="lower" trimline={trimlines.lower} dragging={dragging} onStartTrimDrag={onStartTrimDrag} /> */}
// //             <EditableTrimline jaw="lower" trimline={resultMeshes.lower ? null : trimlines.lower} dragging={dragging} onStartTrimDrag={onStartTrimDrag} />
// //           <ResultMesh result={resultMeshes.lower} />
// //            <ToothLabels
// //          labels={toothLabels.lower}
// //          parts={lowerParts}
// //         show={showLower && segVisible.lowerTeeth && showNumbers}
// //         />

// //         <GhostTeeth parts={ghostParts.lower} show={segVisible.lowerTeeth} />

// //         </group>
// //       </group>


// //       {/* {showGrid && (
// //   <MeasureGrid
// //     targetRef={modelRef}
// //     spacing={gridSize}
// //     plane={(viewRequest && GRID_PLANE[viewRequest.name]) || "xz"}
// //     fitKey={fitKey}
// //   />
// // )} */}


// //       {/* the LAT splines, hidden together with their jaw */}
// //       <group visible={showUpper }>
// //         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
// //       </group>
// //       <group visible={showLower}>
// //         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
// //       </group>

// //       <FrontView targetRef={modelRef} fitKey={fitKey} />
// //       <ViewController targetRef={modelRef} viewRequest={viewRequest} />
// //       <DragController dragging={dragging} onEndDrag={onEndDrag} />
// //       <GridScaler gridRef={gridRef} spacing={gridSize} active={showGrid} />

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




// // // // // import { Canvas } from "@react-three/fiber";
// // // // // import { OrbitControls, Bounds } from "@react-three/drei";

// // // // // const JAW_COLOR = "#f4a6b8"; // pink

// // // // // export default function Viewer({ upperGeo, lowerGeo }) {
// // // // //   // camera re-fits only when a new file is loaded
// // // // //   const fitKey = `${upperGeo ? upperGeo.uuid : 0}-${lowerGeo ? lowerGeo.uuid : 0}`;

// // // // //   return (
// // // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // // //       <ambientLight intensity={0.6} />
// // // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // // //       <Bounds key={fitKey} fit margin={1.4}>
// // // // //         {upperGeo && (
// // // // //           <mesh geometry={upperGeo}>
// // // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // // //           </mesh>
// // // // //         )}
// // // // //         {lowerGeo && (
// // // // //           <mesh geometry={lowerGeo}>
// // // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // // //           </mesh>
// // // // //         )}
// // // // //       </Bounds>

// // // // //       <OrbitControls makeDefault />
// // // // //     </Canvas>
// // // // //   );
// // // // // }







// // // // import { Canvas } from "@react-three/fiber";
// // // // import { OrbitControls, Bounds } from "@react-three/drei";

// // // // const JAW_COLOR = "#f4a6b8"; // pink

// // // // function Jaw({ geo, parts }) {
// // // //   if (parts && parts.length > 0) {
// // // //     return (
// // // //       <>
// // // //         {parts.map((p) => (
// // // //           <mesh key={p.name} geometry={p.geo}>
// // // //             <meshStandardMaterial color={JAW_COLOR} />
// // // //           </mesh>
// // // //         ))}
// // // //       </>
// // // //     );
// // // //   }
// // // //   if (geo) {
// // // //     return (
// // // //       <mesh geometry={geo}>
// // // //         <meshStandardMaterial color={JAW_COLOR} />
// // // //       </mesh>
// // // //     );
// // // //   }
// // // //   return null;
// // // // }

// // // // export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts }) {
// // // //   const fitKey = [
// // // //     upperGeo?.uuid,
// // // //     lowerGeo?.uuid,
// // // //     upperParts ? upperParts.length : 0,
// // // //     lowerParts ? lowerParts.length : 0,
// // // //   ].join("-");

// // // //   return (
// // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // //       <ambientLight intensity={0.6} />
// // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // //       <Bounds key={fitKey} fit margin={1.4}>
// // // //         <Jaw geo={upperGeo} parts={upperParts} />
// // // //         <Jaw geo={lowerGeo} parts={lowerParts} />
// // // //       </Bounds>

// // // //       <OrbitControls makeDefault />
// // // //     </Canvas>
// // // //   );
// // // // }






// // // // import { Canvas } from "@react-three/fiber";

// // // // import { TrackballControls, Bounds } from "@react-three/drei";

// // // // const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation
// // // // const GUM_COLOR = "#D47575";
// // // // const TEETH_COLOR = "#F6E5DF";

// // // // // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // // // function colorFor(fileName) {
// // // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // // }

// // // // function Jaw({ geo, parts }) {
// // // //   // after segmentation: show gum and each tooth with their own color
// // // //   if (parts && parts.length > 0) {
// // // //     return (
// // // //       <>
// // // //         {parts.map((p) => (
// // // //           <mesh key={p.name} geometry={p.geo}>
// // // //             <meshStandardMaterial color={colorFor(p.name)} />
// // // //           </mesh>
// // // //         ))}
// // // //       </>
// // // //     );
// // // //   }

// // // //   // before segmentation: show the original scan
// // // //   if (geo) {
// // // //     return (
// // // //       <mesh geometry={geo}>
// // // //         <meshStandardMaterial color={ORIGINAL_COLOR} />
// // // //       </mesh>
// // // //     );
// // // //   }
// // // //   return null;
// // // // }

// // // // export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts,showUpper,
// // // //   showLower, }) {
// // // //   const fitKey = [
// // // //     upperGeo?.uuid,
// // // //     lowerGeo?.uuid,
// // // //     upperParts ? upperParts.length : 0,
// // // //     lowerParts ? lowerParts.length : 0,
// // // //   ].join("-");

// // // //   return (
// // // //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// // // //       <ambientLight intensity={0.6} />
// // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // //       <Bounds key={fitKey} fit margin={0.9}>
// // // //         <group visible={showUpper}>
// // // //         <Jaw geo={upperGeo} parts={upperParts} />
// // // //          </group>
// // // //          <group visible={showLower}>
// // // //         <Jaw geo={lowerGeo} parts={lowerParts} />
// // // //         </group>
// // // //       </Bounds>

// // // //       <TrackballControls
// // // //         makeDefault
// // // //         rotateSpeed={6}
// // // //         zoomSpeed={1.5}
// // // //         panSpeed={1.2}
// // // //         staticMoving
// // // //       />
// // // //     </Canvas>
// // // //   );
// // // // }




// // // // import { useEffect, useRef } from "react";
// // // // import * as THREE from "three";
// // // // import { Canvas, useThree } from "@react-three/fiber";
// // // // import { TrackballControls } from "@react-three/drei";

// // // // const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation

// // // // const GUM_COLOR = "#D47575";
// // // // const TEETH_COLOR = "#F6E5DF";

// // // // // ---- Start view settings ----
// // // // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // // // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // // // const FIT_MARGIN = 1.2; // smaller = closer

// // // // function colorFor(fileName) {
// // // //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // // // }

// // // // function Jaw({ geo, parts }) {
// // // //   if (parts && parts.length > 0) {
// // // //     return (
// // // //       <>
// // // //         {parts.map((p) => (
// // // //           <mesh key={p.name} geometry={p.geo}>
// // // //             <meshStandardMaterial color={colorFor(p.name)} />
// // // //           </mesh>
// // // //         ))}
// // // //       </>
// // // //     );
// // // //   }

// // // //   if (geo) {
// // // //     return (
// // // //       <mesh geometry={geo}>
// // // //         <meshStandardMaterial color={ORIGINAL_COLOR} />
// // // //       </mesh>
// // // //     );
// // // //   }
// // // //   return null;
// // // // }

// // // // // Puts the camera in front of the model whenever fitKey changes
// // // // // (new file uploaded or segmentation finished)
// // // // function FrontView({ targetRef, fitKey }) {
// // // //   const { camera, controls, size } = useThree();

// // // //   useEffect(() => {
// // // //     const group = targetRef.current;
// // // //     if (!group) return;

// // // //     const box = new THREE.Box3().setFromObject(group);
// // // //     if (box.isEmpty()) return;

// // // //     const center = box.getCenter(new THREE.Vector3());
// // // //     const boxSize = box.getSize(new THREE.Vector3());

// // // //     // From the front we see the X width and the Z height of the model
// // // //     const fov = (camera.fov * Math.PI) / 180;
// // // //     const aspect = size.width / size.height;
// // // //     const distForHeight = boxSize.z / 2 / Math.tan(fov / 2);
// // // //     const distForWidth = boxSize.x / 2 / (Math.tan(fov / 2) * aspect);
// // // //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + boxSize.y / 2;

// // // //     camera.up.set(...CAMERA_UP);
// // // //     camera.position.set(center.x, center.y + FRONT_DIRECTION * distance, center.z);
// // // //     camera.near = distance / 100;
// // // //     camera.far = distance * 100;
// // // //     camera.updateProjectionMatrix();
// // // //     camera.lookAt(center);

// // // //     if (controls) {
// // // //       controls.target.copy(center);
// // // //       controls.update();
// // // //     }
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [fitKey]);

// // // //   return null;
// // // // }

// // // // export default function Viewer({
// // // //   upperGeo,
// // // //   lowerGeo,
// // // //   upperParts,
// // // //   lowerParts,
// // // //   showUpper,
// // // //   showLower,
// // // // }) {
// // // //   const modelRef = useRef();

// // // //   const fitKey = [
// // // //     upperGeo?.uuid,
// // // //     lowerGeo?.uuid,
// // // //     upperParts ? upperParts.length : 0,
// // // //     lowerParts ? lowerParts.length : 0,
// // // //   ].join("-");

// // // //   return (
// // // //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// // // //       <ambientLight intensity={0.6} />
// // // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // // //       <group ref={modelRef}>
// // // //         <group visible={showUpper}>
// // // //           <Jaw geo={upperGeo} parts={upperParts} />
// // // //         </group>
// // // //         <group visible={showLower}>
// // // //           <Jaw geo={lowerGeo} parts={lowerParts} />
// // // //         </group>
// // // //       </group>

// // // //       <FrontView targetRef={modelRef} fitKey={fitKey} />

// // // //       <TrackballControls
// // // //         makeDefault
// // // //         rotateSpeed={6}
// // // //         zoomSpeed={1.5}
// // // //         panSpeed={1.2}
// // // //         staticMoving
// // // //       />
// // // //     </Canvas>
// // // //   );
// // // // }






// // // import { useEffect, useMemo, useRef } from "react";
// // // import * as THREE from "three";
// // // import { Canvas, useThree } from "@react-three/fiber";
// // // import { TrackballControls } from "@react-three/drei";

// // // // ---- Colors and sizes ----
// // // const JAW_COLOR = "#f4a6b8"; // pink scan
// // // const LINE_COLOR = "#00e5ff"; // LAT spline
// // // const HANDLE_COLOR = "#ffd54a"; // editable points
// // // const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// // // const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// // // const SPLINE_SAMPLES = 200; // smoothness of the spline

// // // // ---- Start view settings ----
// // // const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// // // const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// // // const FIT_MARGIN = 1.1; // smaller = closer

// // // const noRaycast = () => null; // makes an object "invisible" for mouse picking
// // // const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // // const SEE_THROUGH = false; // true = lines are always visible, even behind the model

// // // // ---------------- The scan of one jaw ----------------
// // // // function Jaw({ geo, active, dragging, onMoveDrag }) {
// // // //   if (!geo) return null;

// // // //   return (
// // // //     <mesh
// // // //       geometry={geo}
// // // //       // while a point is dragged, the point follows the surface under the mouse
// // // //       onPointerMove={
// // // //         dragging && active
// // // //           ? (e) => {
// // // //               e.stopPropagation();
// // // //               onMoveDrag(e.point);
// // // //             }
// // // //           : undefined
// // // //       }
// // // //     >
// // // //       <meshStandardMaterial color={JAW_COLOR} />
// // // //     </mesh>
// // // //   );
// // // // }




// // // function Jaw({ geo, active, dragging, onMoveDrag }) {
// // //   if (!geo) return null;

// // //   return (
// // //     <mesh
// // //       geometry={geo}
// // //       // the scan blocks clicks on points that are behind it
// // //       onPointerDown={(e) => e.stopPropagation()}
// // //       // while a point is dragged, it follows the surface under the mouse
// // //       onPointerMove={
// // //         dragging && active
// // //           ? (e) => {
// // //               e.stopPropagation();
// // //               onMoveDrag(e.point);
// // //             }
// // //           : undefined
// // //       }
// // //     >
// // //       <meshStandardMaterial
// // //         color={JAW_COLOR}
// // //         polygonOffset
// // //         polygonOffsetFactor={1}
// // //         polygonOffsetUnits={1}
// // //       />
// // //     </mesh>
// // //   );
// // // }

// // // // ---------------- The spline of one tooth ----------------
// // // function LatSpline({ jaw, curve, dragging, onStartDrag }) {
// // //   const controls = useThree((state) => state.controls);

// // //   // smooth closed spline through the editable points, drawn as a thin tube
// // //   const tubeGeometry = useMemo(() => {
// // //     if (curve.points.length < 3) return null;
// // //     const spline = new THREE.CatmullRomCurve3(curve.points, true, "centripetal");
// // //     return new THREE.TubeGeometry(spline, SPLINE_SAMPLES, TUBE_RADIUS, 6, true);
// // //   }, [curve.points]);

// // //   return (
// // //     <>
// // //       {tubeGeometry && (
// // //         <mesh geometry={tubeGeometry} renderOrder={10} raycast={noRaycast}>
// // //           {/* <meshBasicMaterial color={LINE_COLOR} depthTest={false} />
// // //            */}
// // //            <meshBasicMaterial color={LINE_COLOR} depthTest={SEE_THROUGH ? false : true} />
// // //         </mesh>
// // //       )}

// // //       {curve.points.map((p, i) => (
// // //         <mesh
// // //           key={i}
// // //           position={p}
// // //           renderOrder={11}
// // //           // while dragging, the points must not block the mouse
// // //           raycast={dragging ? noRaycast : meshRaycast}
// // //           onPointerDown={(e) => {
// // //             e.stopPropagation();
// // //             if (controls) controls.enabled = false; // stop rotating the model
// // //             onStartDrag(jaw, curve.id, i);
// // //           }}
// // //           onPointerOver={() => (document.body.style.cursor = "pointer")}
// // //           onPointerOut={() => (document.body.style.cursor = "default")}
// // //         >
// // //           <sphereGeometry args={[HANDLE_RADIUS, 12, 12]} />
// // //           {/* <meshBasicMaterial color={HANDLE_COLOR} depthTest={false} /> */}
// // //           <meshBasicMaterial color={HANDLE_COLOR} depthTest={SEE_THROUGH ? false : true} />
// // //         </mesh>
// // //       ))}
// // //     </>
// // //   );
// // // }

// // // function LatCurves({ jaw, curves, dragging, onStartDrag }) {
// // //   return (
// // //     <>
// // //       {curves.map((c) => (
// // //         <LatSpline
// // //           key={c.id}
// // //           jaw={jaw}
// // //           curve={c}
// // //           dragging={dragging}
// // //           onStartDrag={onStartDrag}
// // //         />
// // //       ))}
// // //     </>
// // //   );
// // // }

// // // // Turns the model rotation off while a point is dragged, and ends the drag
// // // // when the mouse button is released
// // // function DragController({ dragging, onEndDrag }) {
// // //   const controls = useThree((state) => state.controls);

// // //   useEffect(() => {
// // //     if (controls) controls.enabled = !dragging;
// // //     if (!dragging) return;

// // //     const up = () => onEndDrag();
// // //     window.addEventListener("pointerup", up);
// // //     return () => window.removeEventListener("pointerup", up);
// // //   }, [dragging, controls, onEndDrag]);

// // //   return null;
// // // }

// // // // Puts the camera in front of the model whenever fitKey changes
// // // function FrontView({ targetRef, fitKey }) {
// // //   const { camera, controls, size } = useThree();

// // //   useEffect(() => {
// // //     const group = targetRef.current;
// // //     if (!group) return;

// // //     const box = new THREE.Box3().setFromObject(group);
// // //     if (box.isEmpty()) return;

// // //     const center = box.getCenter(new THREE.Vector3());
// // //     const boxSize = box.getSize(new THREE.Vector3());

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
// // //   showUpper,
// // //   showLower,
// // //   latCurves,
// // //   dragging,
// // //   onStartDrag,
// // //   onMoveDrag,
// // //   onEndDrag,
// // // }) {
// // //   const modelRef = useRef();

// // //   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

// // //   return (
// // //     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
// // //       <ambientLight intensity={0.6} />
// // //       <directionalLight position={[50, 50, 50]} intensity={1} />
// // //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// // //       {/* the scans (the camera fits to this group) */}
// // //       <group ref={modelRef}>
// // //         <group visible={showUpper}>
// // //           <Jaw geo={upperGeo} active={showUpper} dragging={dragging} onMoveDrag={onMoveDrag} />
// // //         </group>
// // //         <group visible={showLower}>
// // //           <Jaw geo={lowerGeo} active={showLower} dragging={dragging} onMoveDrag={onMoveDrag} />
// // //         </group>
// // //       </group>

// // //       {/* the LAT splines, hidden together with their jaw */}
// // //       <group visible={showUpper}>
// // //         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
// // //       </group>
// // //       <group visible={showLower}>
// // //         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
// // //       </group>

// // //       <FrontView targetRef={modelRef} fitKey={fitKey} />
// // //       <DragController dragging={dragging} onEndDrag={onEndDrag} />

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
// // const JAW_COLOR = "#f4a6b8"; // pink raw scan
// // const GUM_COLOR = "#D47575"; // gum after Segment
// // const TEETH_COLOR = "#F6E5DF"; // teeth after Segment
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

// // // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // function colorFor(fileName) {
// //   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// // }

// // // ---------------- One jaw: the raw scan, or the separated gum and teeth ----------------
// // function Jaw({ geo, parts, active, dragging, onMoveDrag }) {
// //   // after Segment: gum and every tooth with their own color
// //   if (parts && parts.length > 0) {
// //     return (
// //       <>
// //         {parts.map((p) => (
// //           <mesh key={p.name} geometry={p.geo}>
// //             <meshStandardMaterial color={colorFor(p.name)} />
// //           </mesh>
// //         ))}
// //       </>
// //     );
// //   }

// //   if (!geo) return null;

// //   // before Segment: the raw scan
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
// //           <meshBasicMaterial color={LINE_COLOR} />
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
// //           <meshBasicMaterial color={HANDLE_COLOR} />
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
// //   upperParts,
// //   lowerParts,
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
// //           <Jaw
// //             geo={upperGeo}
// //             parts={upperParts}
// //             active={showUpper}
// //             dragging={dragging}
// //             onMoveDrag={onMoveDrag}
// //           />
// //         </group>
// //         <group visible={showLower}>
// //           <Jaw
// //             geo={lowerGeo}
// //             parts={lowerParts}
// //             active={showLower}
// //             dragging={dragging}
// //             onMoveDrag={onMoveDrag}
// //           />
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











// import { useEffect, useMemo, useRef, useState } from "react";
// import * as THREE from "three";
// import { Canvas, useThree, useFrame} from "@react-three/fiber";
// // import { TrackballControls } from "@react-three/drei";
// import { TrackballControls, Line, Html } from "@react-three/drei";
// import { removeTeeth } from "./gumUtils.js";
// import { makeOcclusionGeometry } from "./occlusion.js";


// // ---- Colors and sizes ----
// const JAW_COLOR = "#F7E0C5"; //  raw scan
// const GUM_COLOR = "#D47575"; // gum after Segment
// const TEETH_COLOR = "#EEDBD8"; // teeth after Segment
// const LINE_COLOR = "green"; // LAT spline
// const HANDLE_COLOR = "#4a5cff"; // editable points

// const TRIMLINE_COLOR = "green"; // trimline (Generate Trimline)
// const TRIMLINE_RADIUS = 0.15; // thickness of the trimline (mm)

// const TRIMLINE_HANDLE_COLOR = "#800080"; 
// const TRIMLINE_HANDLE_RADIUS = 0.35; // size of those points (mm)

// const TRIM_MODEL_COLOR = "#F7E0C5"; // Trim Model result
// const BASE_MODEL_COLOR = "#F7E0C5"; // Add Base result

// const MODEL_WITH_BASE_COLOR = GUM_COLOR; // the whole model with base (Segment view)

// const LABEL_COLOR = "#705bd1"; // line and bubble of the tooth numbers

// // one color for each tooth position (1 to 8); the other side of the jaw is a bit darker
// const TOOTH_PALETTE = ["#5b8be0", "#a37be0", "#e875b4", "#6cc04a", "#35a7a3", "#e8845f", "#4a4fb5", "#9a8a5a"];

// // color of one tooth from its file name, e.g. "11.stl"
// function toothColor(fileName) {
//   const m = fileName.match(/(\d)(\d)/);
//   if (!m) return TEETH_COLOR;
//   const quadrant = Number(m[1]);
//   const position = Number(m[2]);
//   const color = new THREE.Color(TOOTH_PALETTE[(position + 7) % 8]);
//   if (quadrant === 2 || quadrant === 3) color.multiplyScalar(0.8);
//   return color;
// }




// const TUBE_RADIUS = 0.08; // thickness of the spline line (mm)
// const HANDLE_RADIUS = 0.3; // size of the editable points (mm)
// const SPLINE_SAMPLES = 200; // smoothness of the spline

// // ---- Start view settings ----
// const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
// const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
// const FIT_MARGIN = 1.1; // smaller = closer
// const LINES_ALWAYS_VISIBLE = false; // true = lines and points are drawn even where they are inside the surface

// const noRaycast = () => null; // makes an object "invisible" for mouse picking
// const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// // const isGum = (fileName) => fileName.toLowerCase().includes("gum");
// // const isGum = (fileName) => /gum|modelwithbase/i.test(fileName);

// const isGum = (fileName) => fileName.toLowerCase().includes("gum");
// const isModelWithBase = (fileName) => /modelwithbase/i.test(fileName);
// // ---------------- One jaw: the raw scan, or the separated gum and teeth ----------------
// // function Jaw({ geo, parts, colored, showTeeth, showGum, active, dragging, onMoveDrag }) {
// //   // after Segment: gum and every tooth with their own color and their own visibility
// //   if (parts && parts.length > 0) {
// //     return (
// //       <>
// //         {parts.map((p) => (
// //           <mesh
// //             key={p.name}
// //             geometry={p.geo}
// //             visible={isGum(p.name) ? showGum : showTeeth}
// //           >
// //             {/* <meshStandardMaterial color={isGum(p.name) ? GUM_COLOR : TEETH_COLOR} /> */}
// //               {/* <meshStandardMaterial
// //               color={isGum(p.name) ? GUM_COLOR : colored ? toothColor(p.name) : TEETH_COLOR}
// //             /> */}
// //             <meshStandardMaterial color={isGum(p.name) ? GUM_COLOR : TEETH_COLOR} />
// //           </mesh>
// //         ))}
// //       </>
// //     );
// //   }

// //   if (!geo) return null;

// //   // before Segment: the raw scan
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



// // Makes a gum-only copy of the model with base by removing the triangles
// // whose 3 corners are all corners of a tooth mesh.


// // function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag }) {
// //   // while a point is dragged, it follows the surface under the mouse
// //   const moveHandler =
// //     dragging && active
// //       ? (e) => {
// //           e.stopPropagation();
// //           onMoveDrag(e.point);
// //         }
// //       : undefined;

// //   // after Segment: gum and every tooth with their own visibility
// //   if (parts && parts.length > 0) {
// //     // true when the model with base is among the parts
// // const hasWhole = parts.some((p) => isModelWithBase(p.name));
// //     return (
// //       <>
// //         {parts.map((p) => {
// //           // const gum = isGum(p.name);
// //           // const visible = gum ? showGum : showTeeth;
// //          const gum = isGum(p.name);
// // const whole = isModelWithBase(p.name);
// // // the whole model has both gum and teeth, so it is hidden only when both buttons are off
// // // const visible = whole ? showGum || showTeeth : gum ? showGum : showTeeth;
// // // const visible = whole ? showGum : gum ? showGum : showTeeth;

// // // the model with base shows only while the teeth are on; with the teeth off, the plain gum is shown instead
// // const visible = whole
// //   ? showGum && showTeeth
// //   : gum
// //   ? hasWhole
// //     ? showGum && !showTeeth
// //     : showGum
// //   : showTeeth;
// // const color = whole ? MODEL_WITH_BASE_COLOR : gum ? GUM_COLOR : TEETH_COLOR;

// //           return (
// //             <mesh
// //               key={p.name}
// //               geometry={p.geo}
// //               visible={visible}
// //               onPointerMove={visible ? moveHandler : undefined}
// //             >
// //               {/* <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} /> */}

// //               {/* <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} side={THREE.DoubleSide} /> */}
// //               <meshStandardMaterial
// //             //  color={gum ? GUM_COLOR : TEETH_COLOR}
// //              color={color}
// //              side={THREE.DoubleSide}
// //              polygonOffset
// //             //  polygonOffsetFactor={8}
// //             //  polygonOffsetUnits={8}
           
// //           polygonOffsetFactor={whole ? 20 : 8}
// //           polygonOffsetUnits={whole ? 20 : 8}
// //            />

// //             </mesh>
// //           );
// //         })}
// //       </>
// //     );
// //   }

// //   if (!geo) return null;

// //   // before Segment: the raw scan
// //   return (
// //     <mesh
// //       geometry={geo}
// //       // the scan blocks clicks on points that are behind it
// //       onPointerDown={(e) => e.stopPropagation()}
// //       onPointerMove={moveHandler}
// //     >
// //       <meshStandardMaterial
// //         color={JAW_COLOR}
// //         side={THREE.DoubleSide}
// //         polygonOffset
// //         polygonOffsetFactor={25}
// //         polygonOffsetUnits={25}
// //       />
// //     </mesh>
// //   );
// // }


// function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag, occlusion }) {
//   // Occlusion on: a vertex-colored copy of every tooth that comes close to the other jaw
//   const occlusionGeos = useMemo(() => {
//     if (!occlusion || !parts) return null;
//     const map = {};
//     for (const p of parts) {
//       const d = occlusion.distances[p.name];
//       if (d && d.length === p.geo.attributes.position.count) {
//         map[p.name] = makeOcclusionGeometry(p.geo, d, TEETH_COLOR);
//       }
//     }
//     return map;
//   }, [occlusion, parts]);

//   const moveHandler =
//     dragging && active
//       ? (e) => {
//           e.stopPropagation();
//           onMoveDrag(e.point);
//         }
//       : undefined;

//   const whole = parts ? parts.find((p) => isModelWithBase(p.name)) : null;

//   // gum + base without the teeth (built once per result)
//   const gumOnlyGeo = useMemo(() => {
//     if (!whole || !parts) return null;
//     const teeth = parts.filter((p) => !isGum(p.name) && !isModelWithBase(p.name)).map((p) => p.geo);
//     return removeTeeth(whole.geo, teeth);
//   }, [whole, parts]);

//   if (parts && parts.length > 0) {
//     return (
//       <>
//         {/* gum with base, no teeth */}
//         {whole && gumOnlyGeo && (
//           <mesh
//             geometry={gumOnlyGeo}
//             visible={showGum}
//             onPointerMove={showGum ? moveHandler : undefined}
//           >
//             <meshStandardMaterial
//               color={GUM_COLOR}
//               side={THREE.DoubleSide}
//               polygonOffset
//               polygonOffsetFactor={8}
//               polygonOffsetUnits={8}
//             />
//           </mesh>
//         )}

//         {parts.map((p) => {
//           if (isModelWithBase(p.name)) {
//             // fallback only: if the teeth could not be removed, show the whole model
//             // when both buttons are on (old behaviour)
//             if (gumOnlyGeo) return null;
//             return (
//               <mesh key={p.name} geometry={p.geo} visible={showGum && showTeeth}>
//                 <meshStandardMaterial
//                   color={GUM_COLOR}
//                   side={THREE.DoubleSide}
//                   polygonOffset
//                   polygonOffsetFactor={20}
//                   polygonOffsetUnits={20}
//                 />
//               </mesh>
//             );
//           }

//           const gum = isGum(p.name);
//           // the plain Gum.stl is replaced by the gum with base
//           const visible = gum ? showGum && !whole : showTeeth;
//           const occGeo = !gum && occlusionGeos ? occlusionGeos[p.name] : null;

//           return (
//             <mesh
//               key={occGeo ? p.name + "-occlusion" : p.name}
//               geometry={occGeo || p.geo}
//               visible={visible}
//               onPointerMove={visible ? moveHandler : undefined}
//             >
//               <meshStandardMaterial
//                 color={occGeo ? "#ffffff" : gum ? GUM_COLOR : TEETH_COLOR}
//                 vertexColors={!!occGeo}
//                 side={THREE.DoubleSide}
//                 polygonOffset
//                 polygonOffsetFactor={8}
//                 polygonOffsetUnits={8}
//               />
//             </mesh>
//           );
//         })}
//       </>
//     );
//   }

//   if (!geo) return null;

//   return (
//     <mesh geometry={geo} onPointerDown={(e) => e.stopPropagation()} onPointerMove={moveHandler}>
//       <meshStandardMaterial
//         color={JAW_COLOR}
//         side={THREE.DoubleSide}
//         polygonOffset
//         polygonOffsetFactor={25}
//         polygonOffsetUnits={25}
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
//           {/* <meshBasicMaterial color={LINE_COLOR} /> */}
//           <meshBasicMaterial
//          color={LINE_COLOR}
//          depthTest={!LINES_ALWAYS_VISIBLE}
//          />
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
//           {/* <meshBasicMaterial color={HANDLE_COLOR} /> */}
//           <meshBasicMaterial
//          color={HANDLE_COLOR}
//         depthTest={!LINES_ALWAYS_VISIBLE}
//         />
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

// // ---------------- The trimline: a curve along the gum ----------------
// // function Trimline({ points }) {
// //   const geometry = useMemo(() => {
// //     if (!points || points.length < 2) return null;

// //     // thin out very long lists, so the tube stays light (the last point is kept)
// //     const step = Math.max(1, Math.ceil(points.length / 600));
// //     const pts = points.filter((_, i) => i % step === 0);
// //     const last = points[points.length - 1];
// //     if (pts[pts.length - 1] !== last) pts.push(last);
// //     if (pts.length < 2) return null;

// //     // closed if the curve ends where it starts
// //     const closed = pts.length > 3 && pts[0].distanceTo(last) < 0.5;
// //     const curve = new THREE.CatmullRomCurve3(pts, closed, "centripetal");
// //     return new THREE.TubeGeometry(curve, pts.length * 2, TRIMLINE_RADIUS, 6, closed);
// //   }, [points]);

// //   if (!geometry) return null;

// //   return (
// //     <mesh geometry={geometry} renderOrder={12} raycast={noRaycast}>
// //       <meshBasicMaterial color={TRIMLINE_COLOR} />
// //     </mesh>
// //   );
// // }


// // ---------------- The trimline: a curve along the gum, with editable points ----------------
// function EditableTrimline({ jaw, trimline, dragging, onStartTrimDrag }) {
//   const controls = useThree((state) => state.controls);

//   // smooth line through the editable points, drawn as a thin tube
//   const geometry = useMemo(() => {
//     if (!trimline || trimline.points.length < 3) return null;
//     const curve = new THREE.CatmullRomCurve3(trimline.points, trimline.closed, "centripetal");
//     return new THREE.TubeGeometry(curve, 400, TRIMLINE_RADIUS, 6, trimline.closed);
//   }, [trimline]);

//   if (!trimline || !geometry) return null;

//   return (
//     <>
//       <mesh geometry={geometry} renderOrder={12} raycast={noRaycast}>
//         {/* <meshBasicMaterial color={TRIMLINE_COLOR} /> */}
//         <meshBasicMaterial
//       color={TRIMLINE_COLOR}
//      depthTest={!LINES_ALWAYS_VISIBLE}
//       />
//       </mesh>

//       {trimline.points.map((p, i) => (
//         <mesh
//           key={i}
//           position={p}
//           renderOrder={13}
//           // while dragging, the points must not block the mouse
//           raycast={dragging ? noRaycast : meshRaycast}
//           onPointerDown={(e) => {
//             e.stopPropagation();
//             if (controls) controls.enabled = false; // stop rotating the model
//             onStartTrimDrag(jaw, i);
//           }}
//           onPointerOver={() => (document.body.style.cursor = "pointer")}
//           onPointerOut={() => (document.body.style.cursor = "default")}
//         >
//           <sphereGeometry args={[TRIMLINE_HANDLE_RADIUS, 12, 12]} />
//           {/* <meshBasicMaterial color={TRIMLINE_HANDLE_COLOR} /> */}
//           <meshBasicMaterial
//          color={TRIMLINE_HANDLE_COLOR}
//          depthTest={!LINES_ALWAYS_VISIBLE}
//          />
//         </mesh>
//       ))}
//     </>
//   );
// }


// // ---------------- Result of Trim Model or Add Base: a surface drawn on top ----------------
// function ResultMesh({ result }) {
//   if (!result) return null;

//   const color = result.kind === "trimModel" ? TRIM_MODEL_COLOR : BASE_MODEL_COLOR;

//   return (
//     <mesh geometry={result.geo}>
//       {/* <meshStandardMaterial
//         color={color}
//         // pulled a little towards the camera, so it wins over the surface below it
//         polygonOffset
//         polygonOffsetFactor={-2}
//         polygonOffsetUnits={-2}
//       /> */}

//       <meshStandardMaterial
//     color={color}
//     side={THREE.DoubleSide}
//   // pulled a little towards the camera, so it wins over the surface below it
//    polygonOffset
//    polygonOffsetFactor={-2}
//    polygonOffsetUnits={-2}
// />
//     </mesh>
//   );
// }

// // ---------------- Tooth number labels: a line from the tooth to a round bubble ----------------
// function ToothLabels({ labels, parts, show }) {
//   if (!show || !labels || labels.length === 0) return null;

//   return (
//     <>
//       {labels.map((l) => {
//         // the point nearer to the center of the tooth is the tooth end; the other gets the bubble
//         let tooth = l.a;
//         let bubble = l.b;
//         const part = parts ? parts.find((p) => p.name.replace(/\.stl$/i, "") === l.id) : null;
//         if (part && part.geo && part.geo.boundingBox) {
//           const center = part.geo.boundingBox.getCenter(new THREE.Vector3());
//           if (l.b.distanceTo(center) < l.a.distanceTo(center)) {
//             tooth = l.b;
//             bubble = l.a;
//           }
//         }

//         return (
//           <group key={l.id}>
//             <Line points={[tooth, bubble]} color={LABEL_COLOR} lineWidth={2} />
//             <Html position={bubble} center style={{ pointerEvents: "none" }}>
//               <div
//                 style={{
//                   width: 34,
//                   height: 34,
//                   borderRadius: "50%",
//                   background: LABEL_COLOR,
//                   color: "white",
//                   fontWeight: "bold",
//                   fontSize: 15,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   userSelect: "none",
//                 }}
//               >
//                 {l.id}
//               </div>
//             </Html>
//           </group>
//         );
//       })}
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


// // Moves the camera to Front / Back / Top / Bottom / Left / Right when a view button is clicked
// const VIEW_SETTINGS = {
//   "Front View":  { dir: [0, -1, -0.1], up: [0, 0, 1], w: "x", h: "z", d: "y" },
//   // "Back View":   { dir: [0, 1, -0.25],  up: [0, 0, 1], w: "x", h: "z", d: "y" },
//   "Back View":   { dir: [0, 1, -0.12],  up: [0, 0, 1], w: "x", h: "z", d: "y", shiftX: 0.05, shiftZ: 0.05 },
//   // "Top View":    { dir: [0, 0, 1],  up: [0, -1, 0], w: "x", h: "y", d: "z",shiftY: -0.04},
//   // "Bottom View": { dir: [0, 0, -1], up: [0.001, 1, 0.1], w: "x", h: "y", d: "z",shiftX: 0.1, shiftY: -0.07 },
//   "Top View":    { dir: [0, 0, 1],  up: [0, 1, 0], w: "x", h: "y", d: "z", shiftY: -0.04 },
// "Bottom View": { dir: [0, 0, -1], up: [0.001, -1, 0], w: "x", h: "y", d: "z", shiftX: 0.1, shiftY: -0.07 },

//   "Left View": { dir: [-1, -0.2, -0.001], up: [0, -0.05, 1], w: "y", h: "z", d: "x",shiftZ: -0.05 },
//  "Right View": { dir: [1, -0.2, -0.001], up: [0, -0.15, 1], w: "y", h: "z", d: "x" },
// };

// // the Left and Right buttons use each other's camera
// const VIEW_SWAP = {
//   "Left View": "Right View",
//   "Right View": "Left View",
// };

// // function ViewController({ targetRef, viewRequest }) {
// //   const { camera, controls, size } = useThree();

// //   useEffect(() => {
// //     if (!viewRequest) return;
// //     const cfg = VIEW_SETTINGS[viewRequest.name];
// //     const group = targetRef.current;
// //     if (!cfg || !group) return;

// //     const box = new THREE.Box3().setFromObject(group);
// //     if (box.isEmpty()) return;

// //     const center = box.getCenter(new THREE.Vector3());
// //     const s = box.getSize(new THREE.Vector3());

// //     const fov = (camera.fov * Math.PI) / 180;
// //     const aspect = size.width / size.height;
// //     const distForHeight = s[cfg.h] / 2 / Math.tan(fov / 2);
// //     const distForWidth = s[cfg.w] / 2 / (Math.tan(fov / 2) * aspect);
// //     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + s[cfg.d] / 2;

// //     camera.up.set(...cfg.up);
// //     camera.position.set(
// //       center.x + cfg.dir[0] * distance,
// //       center.y + cfg.dir[1] * distance,
// //       center.z + cfg.dir[2] * distance
// //     );
// //     camera.near = distance / 100;
// //     camera.far = distance * 100;
// //     camera.updateProjectionMatrix();
// //     camera.lookAt(center);

// //     if (controls) {
// //       controls.target.copy(center);
// //       controls.update();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [viewRequest]);

// //   return null;
// // }



// function ViewController({ targetRef, viewRequest }) {
//   const { camera, controls, size } = useThree();

//   useEffect(() => {
//     if (!viewRequest) return;
//     // const cfg = VIEW_SETTINGS[viewRequest.name];
//     const cfg = VIEW_SETTINGS[VIEW_SWAP[viewRequest.name] || viewRequest.name];
//     const group = targetRef.current;
//     if (!cfg || !group) return;

//     const box = new THREE.Box3().setFromObject(group);
//     if (box.isEmpty()) return;

//     const center = box.getCenter(new THREE.Vector3());
//     const s = box.getSize(new THREE.Vector3());

//     const fov = (camera.fov * Math.PI) / 180;
//     const aspect = size.width / size.height;
//     const distForHeight = s[cfg.h] / 2 / Math.tan(fov / 2);
//     const distForWidth = s[cfg.w] / 2 / (Math.tan(fov / 2) * aspect);
//     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + s[cfg.d] / 2;

//     // move the look-at point by a fraction of the model size
//     const target = center.clone();
//     target.x += s.x * (cfg.shiftX || 0);
//     target.y += s.y * (cfg.shiftY || 0);
//     target.z += s.z * (cfg.shiftZ || 0);

//     camera.up.set(...cfg.up);
//     camera.position.set(
//       target.x + cfg.dir[0] * distance,
//       target.y + cfg.dir[1] * distance,
//       target.z + cfg.dir[2] * distance
//     );
//     camera.near = distance / 100;
//     camera.far = distance * 100;
//     camera.updateProjectionMatrix();
//     camera.lookAt(target);

//     if (controls) {
//       controls.target.copy(target);
//       controls.update();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [viewRequest]);

//   return null;
// }

// // A light that always shines from the camera towards the model

// function Headlight() {
//   const { camera, controls } = useThree();
//   const light = useRef();

//   useFrame(() => {
//     if (!light.current) return;

//     // slightly above and to the left of the camera
//     const up = camera.up.clone().normalize();
//     const right = new THREE.Vector3().crossVectors(camera.getWorldDirection(new THREE.Vector3()), up).normalize();
//     const dist = controls ? camera.position.distanceTo(controls.target) : 100;

//     light.current.position
//       .copy(camera.position)
//       .addScaledVector(up, dist * 0.5)
//       .addScaledVector(right, -dist * 0.3);

//     if (controls) light.current.target.position.copy(controls.target);
//     light.current.target.updateMatrixWorld();
//   });

//   return <directionalLight ref={light} intensity={1.3} />;
// }


// // ---------------- Grid: a measuring backdrop behind the model ----------------
// // const GRID_COLOR = "#5a5a5a"; // normal lines
// // const GRID_CENTER_COLOR = "#9a9a9a"; // the two middle lines

// // // the grid lies in the plane that faces the last view button (Front is the start view)
// // const GRID_PLANE = {
// //   "Front View": "xz",
// //   "Back View": "xz",
// //   "Top View": "xy",
// //   "Bottom View": "xy",
// //   "Left View": "yz",
// //   "Right View": "yz",
// // };

// // function MeasureGrid({ targetRef, spacing, plane, fitKey }) {
// //   const [area, setArea] = useState(null); // { center, extent } of the model

// //   useEffect(() => {
// //     const group = targetRef.current;
// //     if (!group) return;
// //     const box = new THREE.Box3().setFromObject(group);
// //     if (box.isEmpty()) return;
// //     const s = box.getSize(new THREE.Vector3());
// //     setArea({ center: box.getCenter(new THREE.Vector3()), extent: Math.max(s.x, s.y, s.z) });
// //   }, [targetRef, fitKey]);

// //   const grid = useMemo(() => {
// //     if (!area) return null;
// //     // an even number of divisions (max 400), so there is a line in the middle
// //     const divisions = Math.min(400, Math.ceil((area.extent * 1.6) / spacing / 2) * 2);
// //     const helper = new THREE.GridHelper(divisions * spacing, divisions, GRID_CENTER_COLOR, GRID_COLOR);
// //     helper.material.depthTest = false; // drawn first, the model covers it
// //     helper.material.depthWrite = false;
// //     helper.raycast = () => null; // the grid never blocks the mouse
// //     helper.renderOrder = -1;
// //     return helper;
// //   }, [area, spacing]);

// //   if (!grid) return null;

// //   // lines sit on whole millimeters, the plane goes through the middle of the model
// //   const snap = (v) => Math.round(v / spacing) * spacing;
// //   const c = area.center;
// //   let position = [snap(c.x), c.y, snap(c.z)]; // front / back: plane X-Z
// //   let rotation = [0, 0, 0];
// //   if (plane === "xy") {
// //     position = [snap(c.x), snap(c.y), c.z]; // top / bottom: plane X-Y
// //     rotation = [Math.PI / 2, 0, 0];
// //   } else if (plane === "yz") {
// //     position = [c.x, snap(c.y), snap(c.z)]; // left / right: plane Y-Z
// //     rotation = [0, 0, Math.PI / 2];
// //   }

// //   return <primitive object={grid} position={position} rotation={rotation} />;
// // }

// const MAJOR_EVERY = 5; // a strong line after every 5 small squares

// // ---------------- Grid: sets the size of the grid layer so that it matches mm ----------------
// // function GridScaler({ gridRef, spacing, active }) {
// //   const { camera, controls, size, gl } = useThree();
// //   const last = useRef("");

// //   useFrame(() => {
// //     const el = gridRef.current;
// //     if (!el || !active) return;

// //     // the middle of the model (where the camera looks at)
// //     const target = controls ? controls.target : new THREE.Vector3();

// //     // how many screen pixels are 1 mm at the depth of the model
// //     const distance = camera.position.distanceTo(target);
// //     const pxPerMm = size.height / (2 * distance * Math.tan((camera.fov * Math.PI) / 360));
// //     const cell = pxPerMm * spacing;

// //     // where the middle of the model is on the screen, measured from the corner of the grid layer
// //     const p = target.clone().project(camera);
// //     const canvasRect = gl.domElement.getBoundingClientRect();
// //     const layerRect = el.getBoundingClientRect();
// //     const x = canvasRect.left - layerRect.left + (p.x * 0.5 + 0.5) * size.width;
// //     const y = canvasRect.top - layerRect.top + (-p.y * 0.5 + 0.5) * size.height;

// //     // only touch the page when something changed
// //     const key = `${cell.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`;
// //     if (key === last.current) return;
// //     last.current = key;

// //     // zoomed out so far that the lines would blur together: hide them
// //     if (cell < 3) {
// //       el.style.backgroundSize = "0 0";
// //       return;
// //     }
// //     el.style.backgroundSize = `${cell}px ${cell}px`;
// //     el.style.backgroundPosition = `${x}px ${y}px`;
// //   });

// //   return null;
// // }


// function GridScaler({ gridRef, spacing, active }) {
//   const { camera, controls, size, gl } = useThree();
//   const last = useRef("");

//   useFrame(() => {
//     const el = gridRef.current;
//     if (!el || !active) return;

//     // the middle of the model (where the camera looks at)
//     const target = controls ? controls.target : new THREE.Vector3();

//     // how many screen pixels are 1 mm at the depth of the model
//     const distance = camera.position.distanceTo(target);
//     const pxPerMm = size.height / (2 * distance * Math.tan((camera.fov * Math.PI) / 360));
//     const cell = pxPerMm * spacing; // one small square
//     const major = cell * MAJOR_EVERY; // one big square

//     // where the middle of the model is on the screen, measured from the corner of the grid layer
//     const p = target.clone().project(camera);
//     const canvasRect = gl.domElement.getBoundingClientRect();
//     const layerRect = el.getBoundingClientRect();
//     const x = canvasRect.left - layerRect.left + (p.x * 0.5 + 0.5) * size.width;
//     const y = canvasRect.top - layerRect.top + (-p.y * 0.5 + 0.5) * size.height;

//     // only touch the page when something changed
//     const key = `${cell.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`;
//     if (key === last.current) return;
//     last.current = key;

//     // zoomed out so far that lines would blur together: hide the small ones first, then the strong ones
//     const minorSize = cell >= 4 ? `${cell}px ${cell}px` : "0 0";
//     const majorSize = major >= 8 ? `${major}px ${major}px` : "0 0";

//     el.style.backgroundSize = `${majorSize}, ${majorSize}, ${minorSize}, ${minorSize}`;
//     el.style.backgroundPosition = `${x}px ${y}px`; // the same start for all four layers
//   });

//   return null;
// }

// // ---------------- Occlusion: smallest distance of each tooth to the other jaw ----------------
// const OCCLUSION_LABEL_COLOR = "#6a55c9"; // text and line of the distance labels
// const OCCLUSION_LABEL_BG = "#e4e0f7"; // light purple bubble

// function OcclusionLabels({ labels, show }) {
//   if (!show || !labels || labels.length === 0) return null;

//   return (
//     <>
//       {labels.map((l) => (
//         <group key={l.name}>
//           <Line points={[l.point, l.bubble]} color={OCCLUSION_LABEL_COLOR} lineWidth={1} />
//           <Html position={l.bubble} center style={{ pointerEvents: "none" }}>
//             <div
//               style={{
//                 padding: "3px 9px",
//                 borderRadius: 4,
//                 background: OCCLUSION_LABEL_BG,
//                 color: OCCLUSION_LABEL_COLOR,
//                 fontSize: 13,
//                 fontWeight: 500,
//                 whiteSpace: "nowrap",
//                 userSelect: "none",
//               }}
//             >
//               {l.min.toFixed(2)}
//             </div>
//           </Html>
//         </group>
//       ))}
//     </>
//   );
// }

// // ---------------- Superimpose: the initial position of the teeth as a green ghost ----------------
// const GHOST_COLOR = "#00F7F6"; // color of the initial position
// const GHOST_OPACITY = 0.55; // 1 = solid, lower = more see-through

// function GhostTeeth({ parts, show }) {
//   if (!show || !parts || parts.length === 0) return null;

//   return (
//     <>
//       {parts.map((p) => (
//         <mesh key={p.name} geometry={p.geo} renderOrder={5} raycast={noRaycast}>
//           <meshStandardMaterial
//             color={GHOST_COLOR}
//             transparent
//             opacity={GHOST_OPACITY}
//             side={THREE.DoubleSide}
//             depthWrite={false}
//             // pulled a little towards the camera, so it wins where it lies on the final tooth
//             polygonOffset
//             polygonOffsetFactor={-1}
//             polygonOffsetUnits={-1}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }



// export default function Viewer({
//   upperGeo,
//   lowerGeo,
//   upperParts,
//   lowerParts,
//   showUpper,
//   showLower,
//   segVisible,
//   trimlines,
//   resultMeshes,
//   toothLabels,
//   showNumbers,
//   viewRequest,
//   latCurves,
//   dragging,
//   onStartDrag,
//   onStartTrimDrag,
//   onMoveDrag,
//   onEndDrag,
//   showGrid,
//   gridSize,
//   gridRef,
//   ghostParts,
//   occlusion, // null, or the result of computeOcclusion (occlusion.js)

// }) {
//   const modelRef = useRef();

//   const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

//   return (
//     <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
       
//       {/* <ambientLight intensity={0.6} />
//       <directionalLight position={[50, 50, 50]} intensity={1} />
//       <directionalLight position={[-50, -50, -50]} intensity={0.5} /> 
//             */}

//       <ambientLight intensity={0.5} />
//       <Headlight />
//       <hemisphereLight args={["#ffeedd", "#888888", 0.2]} />

//       {/* the scans (the camera fits to this group) */}
//       <group ref={modelRef}>
//         <group visible={showUpper}>
//            <group visible={!resultMeshes.upper}> 
          
//           <Jaw
//             geo={upperGeo}
//             colored={toothLabels.upper.length > 0}
//             parts={upperParts}
//             showTeeth={segVisible.upperTeeth}
//             showGum={segVisible.upperGum}
//             occlusion={occlusion ? occlusion.upper : null}
//             active={showUpper}
//             dragging={dragging}
//             onMoveDrag={onMoveDrag}
//           />
//           </group>

//           {/* <Trimline points={trimlines.upper} /> */}
//             {/* <EditableTrimline jaw="upper" trimline={trimlines.upper} dragging={dragging} onStartTrimDrag={onStartTrimDrag} /> */}
//             <EditableTrimline jaw="upper" trimline={resultMeshes.upper ? null : trimlines.upper} dragging={dragging} onStartTrimDrag={onStartTrimDrag} />
//           <ResultMesh result={resultMeshes.upper} />
//           <ToothLabels
//          labels={toothLabels.upper}
//          parts={upperParts}
//         //  show={showUpper && segVisible.upperTeeth}
//         show={showUpper && segVisible.upperTeeth && showNumbers && !occlusion}

//          />
//          <OcclusionLabels labels={occlusion?.upper.labels} show={showUpper && segVisible.upperTeeth} />
//          <GhostTeeth parts={ghostParts.upper} show={segVisible.upperTeeth} />

//         </group>
//         <group visible={showLower}>
//          <group visible={!resultMeshes.lower}> 
       
//           <Jaw
//             geo={lowerGeo}
//             colored={toothLabels.lower.length > 0}
//             parts={lowerParts}
//             showTeeth={segVisible.lowerTeeth}
//             showGum={segVisible.lowerGum}
//             occlusion={occlusion ? occlusion.lower : null}
//             active={showLower}
//             dragging={dragging}
//             onMoveDrag={onMoveDrag}
//           />
//           </group>
         
//           {/* <Trimline points={trimlines.lower} /> */}
//             {/* <EditableTrimline jaw="lower" trimline={trimlines.lower} dragging={dragging} onStartTrimDrag={onStartTrimDrag} /> */}
//             <EditableTrimline jaw="lower" trimline={resultMeshes.lower ? null : trimlines.lower} dragging={dragging} onStartTrimDrag={onStartTrimDrag} />
//           <ResultMesh result={resultMeshes.lower} />
//            <ToothLabels
//          labels={toothLabels.lower}
//          parts={lowerParts}
//         show={showLower && segVisible.lowerTeeth && showNumbers && !occlusion}
//         />
//         <OcclusionLabels labels={occlusion?.lower.labels} show={showLower && segVisible.lowerTeeth} />

//         <GhostTeeth parts={ghostParts.lower} show={segVisible.lowerTeeth} />

//         </group>
//       </group>


//       {/* {showGrid && (
//   <MeasureGrid
//     targetRef={modelRef}
//     spacing={gridSize}
//     plane={(viewRequest && GRID_PLANE[viewRequest.name]) || "xz"}
//     fitKey={fitKey}
//   />
// )} */}


//       {/* the LAT splines, hidden together with their jaw */}
//       <group visible={showUpper }>
//         <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
//       </group>
//       <group visible={showLower}>
//         <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
//       </group>

//       <FrontView targetRef={modelRef} fitKey={fitKey} />
//       <ViewController targetRef={modelRef} viewRequest={viewRequest} />
//       <DragController dragging={dragging} onEndDrag={onEndDrag} />
//       <GridScaler gridRef={gridRef} spacing={gridSize} active={showGrid} />

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











import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame} from "@react-three/fiber";
// import { TrackballControls } from "@react-three/drei";
import { TrackballControls, Line, Html } from "@react-three/drei";
import { removeTeeth } from "./gumUtils.js";
import { makeOcclusionGeometry, makeContactPatch } from "./occlusion.js";


// ---- Colors and sizes ----
const JAW_COLOR = "#F7E0C5"; //  raw scan
const GUM_COLOR = "#D47575"; // gum after Segment
const TEETH_COLOR = "#EEDBD8"; // teeth after Segment
const LINE_COLOR = "green"; // LAT spline
const HANDLE_COLOR = "#4a5cff"; // editable points

const TRIMLINE_COLOR = "green"; // trimline (Generate Trimline)
const TRIMLINE_RADIUS = 0.15; // thickness of the trimline (mm)

const TRIMLINE_HANDLE_COLOR = "#800080"; 
const TRIMLINE_HANDLE_RADIUS = 0.35; // size of those points (mm)

const TRIM_MODEL_COLOR = "#F7E0C5"; // Trim Model result
const BASE_MODEL_COLOR = "#F7E0C5"; // Add Base result

const MODEL_WITH_BASE_COLOR = GUM_COLOR; // the whole model with base (Segment view)

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
const LINES_ALWAYS_VISIBLE = false; // true = lines and points are drawn even where they are inside the surface

const noRaycast = () => null; // makes an object "invisible" for mouse picking
const meshRaycast = THREE.Mesh.prototype.raycast; // normal picking

// Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// const isGum = (fileName) => fileName.toLowerCase().includes("gum");
// const isGum = (fileName) => /gum|modelwithbase/i.test(fileName);

const isGum = (fileName) => fileName.toLowerCase().includes("gum");
const isModelWithBase = (fileName) => /modelwithbase/i.test(fileName);
const IDENTITY_MATRIX = new THREE.Matrix4(); // tooth not moved (all views except Staging)
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



// Makes a gum-only copy of the model with base by removing the triangles
// whose 3 corners are all corners of a tooth mesh.


// function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag }) {
//   // while a point is dragged, it follows the surface under the mouse
//   const moveHandler =
//     dragging && active
//       ? (e) => {
//           e.stopPropagation();
//           onMoveDrag(e.point);
//         }
//       : undefined;

//   // after Segment: gum and every tooth with their own visibility
//   if (parts && parts.length > 0) {
//     // true when the model with base is among the parts
// const hasWhole = parts.some((p) => isModelWithBase(p.name));
//     return (
//       <>
//         {parts.map((p) => {
//           // const gum = isGum(p.name);
//           // const visible = gum ? showGum : showTeeth;
//          const gum = isGum(p.name);
// const whole = isModelWithBase(p.name);
// // the whole model has both gum and teeth, so it is hidden only when both buttons are off
// // const visible = whole ? showGum || showTeeth : gum ? showGum : showTeeth;
// // const visible = whole ? showGum : gum ? showGum : showTeeth;

// // the model with base shows only while the teeth are on; with the teeth off, the plain gum is shown instead
// const visible = whole
//   ? showGum && showTeeth
//   : gum
//   ? hasWhole
//     ? showGum && !showTeeth
//     : showGum
//   : showTeeth;
// const color = whole ? MODEL_WITH_BASE_COLOR : gum ? GUM_COLOR : TEETH_COLOR;

//           return (
//             <mesh
//               key={p.name}
//               geometry={p.geo}
//               visible={visible}
//               onPointerMove={visible ? moveHandler : undefined}
//             >
//               {/* <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} /> */}

//               {/* <meshStandardMaterial color={gum ? GUM_COLOR : TEETH_COLOR} side={THREE.DoubleSide} /> */}
//               <meshStandardMaterial
//             //  color={gum ? GUM_COLOR : TEETH_COLOR}
//              color={color}
//              side={THREE.DoubleSide}
//              polygonOffset
//             //  polygonOffsetFactor={8}
//             //  polygonOffsetUnits={8}
           
//           polygonOffsetFactor={whole ? 20 : 8}
//           polygonOffsetUnits={whole ? 20 : 8}
//            />

//             </mesh>
//           );
//         })}
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
//       onPointerMove={moveHandler}
//     >
//       <meshStandardMaterial
//         color={JAW_COLOR}
//         side={THREE.DoubleSide}
//         polygonOffset
//         polygonOffsetFactor={25}
//         polygonOffsetUnits={25}
//       />
//     </mesh>
//   );
// }


function Jaw({ geo, parts, showTeeth, showGum, active, dragging, onMoveDrag, occlusion }) {
  // Occlusion on: a vertex-colored copy of every tooth that comes close to the other jaw
  const occlusionGeos = useMemo(() => {
    if (!occlusion || !parts) return null;
    const map = {};
    for (const p of parts) {
      const d = occlusion.distances[p.name];
      if (d && d.length === p.geo.attributes.position.count) {
        map[p.name] = {
          geo: makeOcclusionGeometry(p.geo, d, TEETH_COLOR),
          patch: makeContactPatch(p.geo, d, occlusion.nearest && occlusion.nearest[p.name]), // contact areas lifted so the other jaw does not hide them
        };
      }
    }
    return map;
  }, [occlusion, parts]);

  const moveHandler =
    dragging && active
      ? (e) => {
          e.stopPropagation();
          onMoveDrag(e.point);
        }
      : undefined;

  const whole = parts ? parts.find((p) => isModelWithBase(p.name)) : null;

  // gum + base without the teeth (built once per result)
  const gumOnlyGeo = useMemo(() => {
    if (!whole || !parts) return null;
    const teeth = parts.filter((p) => !isGum(p.name) && !isModelWithBase(p.name)).map((p) => p.geo);
    return removeTeeth(whole.geo, teeth);
  }, [whole, parts]);

  if (parts && parts.length > 0) {
    return (
      <>
        {/* gum with base, no teeth */}
        {whole && gumOnlyGeo && (
          <mesh
            geometry={gumOnlyGeo}
            visible={showGum}
            onPointerMove={showGum ? moveHandler : undefined}
          >
            <meshStandardMaterial
              color={GUM_COLOR}
              side={THREE.DoubleSide}
              polygonOffset
              polygonOffsetFactor={8}
              polygonOffsetUnits={8}
            />
          </mesh>
        )}

        {parts.map((p) => {
          if (isModelWithBase(p.name)) {
            // fallback only: if the teeth could not be removed, show the whole model
            // when both buttons are on (old behaviour)
            if (gumOnlyGeo) return null;
            return (
              <mesh key={p.name} geometry={p.geo} visible={showGum && showTeeth}>
                <meshStandardMaterial
                  color={GUM_COLOR}
                  side={THREE.DoubleSide}
                  polygonOffset
                  polygonOffsetFactor={20}
                  polygonOffsetUnits={20}
                />
              </mesh>
            );
          }

          const gum = isGum(p.name);
          // the plain Gum.stl is replaced by the gum with base
          const visible = gum ? showGum && !whole : showTeeth;
          const occ = !gum && occlusionGeos ? occlusionGeos[p.name] : null;
          const occGeo = occ ? occ.geo : null;

          return (
            <group key={p.name}>
            <mesh
              key={occGeo ? p.name + "-occlusion" : p.name}
              geometry={occGeo || p.geo}
              // Staging: the tooth is moved by its matrix (p.matrix), the geometry itself stays the same
              matrix={p.matrix || IDENTITY_MATRIX}
              matrixAutoUpdate={!p.matrix}
              visible={visible}
              onPointerMove={visible ? moveHandler : undefined}
            >
              <meshStandardMaterial
                color={occGeo ? "#ffffff" : gum ? GUM_COLOR : TEETH_COLOR}
                vertexColors={!!occGeo}
                side={THREE.DoubleSide}
                polygonOffset
                polygonOffsetFactor={8}
                polygonOffsetUnits={8}
              />
            </mesh>
            {occ && occ.patch && (
              <mesh geometry={occ.patch} visible={visible} raycast={noRaycast} renderOrder={2}>
                <meshStandardMaterial
                  vertexColors
                  side={THREE.DoubleSide}
                  polygonOffset
                  polygonOffsetFactor={-4}
                  polygonOffsetUnits={-4}
                />
              </mesh>
            )}
            </group>
          );
        })}
      </>
    );
  }

  if (!geo) return null;

  return (
    <mesh geometry={geo} onPointerDown={(e) => e.stopPropagation()} onPointerMove={moveHandler}>
      <meshStandardMaterial
        color={JAW_COLOR}
        side={THREE.DoubleSide}
        polygonOffset
        polygonOffsetFactor={25}
        polygonOffsetUnits={25}
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
          {/* <meshBasicMaterial color={LINE_COLOR} /> */}
          <meshBasicMaterial
         color={LINE_COLOR}
         depthTest={!LINES_ALWAYS_VISIBLE}
         />
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
          {/* <meshBasicMaterial color={HANDLE_COLOR} /> */}
          <meshBasicMaterial
         color={HANDLE_COLOR}
        depthTest={!LINES_ALWAYS_VISIBLE}
        />
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
        {/* <meshBasicMaterial color={TRIMLINE_COLOR} /> */}
        <meshBasicMaterial
      color={TRIMLINE_COLOR}
     depthTest={!LINES_ALWAYS_VISIBLE}
      />
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
          {/* <meshBasicMaterial color={TRIMLINE_HANDLE_COLOR} /> */}
          <meshBasicMaterial
         color={TRIMLINE_HANDLE_COLOR}
         depthTest={!LINES_ALWAYS_VISIBLE}
         />
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
      {/* <meshStandardMaterial
        color={color}
        // pulled a little towards the camera, so it wins over the surface below it
        polygonOffset
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
      /> */}

      <meshStandardMaterial
    color={color}
    side={THREE.DoubleSide}
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


// Moves the camera to Front / Back / Top / Bottom / Left / Right when a view button is clicked
const VIEW_SETTINGS = {
  "Front View":  { dir: [0, -1, -0.1], up: [0, 0, 1], w: "x", h: "z", d: "y" },
  // "Back View":   { dir: [0, 1, -0.25],  up: [0, 0, 1], w: "x", h: "z", d: "y" },
  "Back View":   { dir: [0, 1, -0.12],  up: [0, 0, 1], w: "x", h: "z", d: "y", shiftX: 0.05, shiftZ: 0.05 },
  // "Top View":    { dir: [0, 0, 1],  up: [0, -1, 0], w: "x", h: "y", d: "z",shiftY: -0.04},
  // "Bottom View": { dir: [0, 0, -1], up: [0.001, 1, 0.1], w: "x", h: "y", d: "z",shiftX: 0.1, shiftY: -0.07 },
  "Top View":    { dir: [0, 0, 1],  up: [0, 1, 0], w: "x", h: "y", d: "z", shiftY: -0.04 },
"Bottom View": { dir: [0, 0, -1], up: [0.001, -1, 0], w: "x", h: "y", d: "z", shiftX: 0.1, shiftY: -0.07 },

  "Left View": { dir: [-1, -0.2, -0.001], up: [0, -0.05, 1], w: "y", h: "z", d: "x",shiftZ: -0.05 },
 "Right View": { dir: [1, -0.2, -0.001], up: [0, -0.15, 1], w: "y", h: "z", d: "x" },
};

// the Left and Right buttons use each other's camera
const VIEW_SWAP = {
  "Left View": "Right View",
  "Right View": "Left View",
};

// function ViewController({ targetRef, viewRequest }) {
//   const { camera, controls, size } = useThree();

//   useEffect(() => {
//     if (!viewRequest) return;
//     const cfg = VIEW_SETTINGS[viewRequest.name];
//     const group = targetRef.current;
//     if (!cfg || !group) return;

//     const box = new THREE.Box3().setFromObject(group);
//     if (box.isEmpty()) return;

//     const center = box.getCenter(new THREE.Vector3());
//     const s = box.getSize(new THREE.Vector3());

//     const fov = (camera.fov * Math.PI) / 180;
//     const aspect = size.width / size.height;
//     const distForHeight = s[cfg.h] / 2 / Math.tan(fov / 2);
//     const distForWidth = s[cfg.w] / 2 / (Math.tan(fov / 2) * aspect);
//     const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + s[cfg.d] / 2;

//     camera.up.set(...cfg.up);
//     camera.position.set(
//       center.x + cfg.dir[0] * distance,
//       center.y + cfg.dir[1] * distance,
//       center.z + cfg.dir[2] * distance
//     );
//     camera.near = distance / 100;
//     camera.far = distance * 100;
//     camera.updateProjectionMatrix();
//     camera.lookAt(center);

//     if (controls) {
//       controls.target.copy(center);
//       controls.update();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [viewRequest]);

//   return null;
// }



function ViewController({ targetRef, viewRequest }) {
  const { camera, controls, size } = useThree();

  useEffect(() => {
    if (!viewRequest) return;
    // const cfg = VIEW_SETTINGS[viewRequest.name];
    const cfg = VIEW_SETTINGS[VIEW_SWAP[viewRequest.name] || viewRequest.name];
    const group = targetRef.current;
    if (!cfg || !group) return;

    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;

    const center = box.getCenter(new THREE.Vector3());
    const s = box.getSize(new THREE.Vector3());

    const fov = (camera.fov * Math.PI) / 180;
    const aspect = size.width / size.height;
    const distForHeight = s[cfg.h] / 2 / Math.tan(fov / 2);
    const distForWidth = s[cfg.w] / 2 / (Math.tan(fov / 2) * aspect);
    const distance = Math.max(distForHeight, distForWidth) * FIT_MARGIN + s[cfg.d] / 2;

    // move the look-at point by a fraction of the model size
    const target = center.clone();
    target.x += s.x * (cfg.shiftX || 0);
    target.y += s.y * (cfg.shiftY || 0);
    target.z += s.z * (cfg.shiftZ || 0);

    camera.up.set(...cfg.up);
    camera.position.set(
      target.x + cfg.dir[0] * distance,
      target.y + cfg.dir[1] * distance,
      target.z + cfg.dir[2] * distance
    );
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();
    camera.lookAt(target);

    if (controls) {
      controls.target.copy(target);
      controls.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewRequest]);

  return null;
}

// A light that always shines from the camera towards the model

function Headlight() {
  const { camera, controls } = useThree();
  const light = useRef();

  useFrame(() => {
    if (!light.current) return;

    // slightly above and to the left of the camera
    const up = camera.up.clone().normalize();
    const right = new THREE.Vector3().crossVectors(camera.getWorldDirection(new THREE.Vector3()), up).normalize();
    const dist = controls ? camera.position.distanceTo(controls.target) : 100;

    light.current.position
      .copy(camera.position)
      .addScaledVector(up, dist * 0.5)
      .addScaledVector(right, -dist * 0.3);

    if (controls) light.current.target.position.copy(controls.target);
    light.current.target.updateMatrixWorld();
  });

  return <directionalLight ref={light} intensity={1.3} />;
}


// ---------------- Grid: a measuring backdrop behind the model ----------------
// const GRID_COLOR = "#5a5a5a"; // normal lines
// const GRID_CENTER_COLOR = "#9a9a9a"; // the two middle lines

// // the grid lies in the plane that faces the last view button (Front is the start view)
// const GRID_PLANE = {
//   "Front View": "xz",
//   "Back View": "xz",
//   "Top View": "xy",
//   "Bottom View": "xy",
//   "Left View": "yz",
//   "Right View": "yz",
// };

// function MeasureGrid({ targetRef, spacing, plane, fitKey }) {
//   const [area, setArea] = useState(null); // { center, extent } of the model

//   useEffect(() => {
//     const group = targetRef.current;
//     if (!group) return;
//     const box = new THREE.Box3().setFromObject(group);
//     if (box.isEmpty()) return;
//     const s = box.getSize(new THREE.Vector3());
//     setArea({ center: box.getCenter(new THREE.Vector3()), extent: Math.max(s.x, s.y, s.z) });
//   }, [targetRef, fitKey]);

//   const grid = useMemo(() => {
//     if (!area) return null;
//     // an even number of divisions (max 400), so there is a line in the middle
//     const divisions = Math.min(400, Math.ceil((area.extent * 1.6) / spacing / 2) * 2);
//     const helper = new THREE.GridHelper(divisions * spacing, divisions, GRID_CENTER_COLOR, GRID_COLOR);
//     helper.material.depthTest = false; // drawn first, the model covers it
//     helper.material.depthWrite = false;
//     helper.raycast = () => null; // the grid never blocks the mouse
//     helper.renderOrder = -1;
//     return helper;
//   }, [area, spacing]);

//   if (!grid) return null;

//   // lines sit on whole millimeters, the plane goes through the middle of the model
//   const snap = (v) => Math.round(v / spacing) * spacing;
//   const c = area.center;
//   let position = [snap(c.x), c.y, snap(c.z)]; // front / back: plane X-Z
//   let rotation = [0, 0, 0];
//   if (plane === "xy") {
//     position = [snap(c.x), snap(c.y), c.z]; // top / bottom: plane X-Y
//     rotation = [Math.PI / 2, 0, 0];
//   } else if (plane === "yz") {
//     position = [c.x, snap(c.y), snap(c.z)]; // left / right: plane Y-Z
//     rotation = [0, 0, Math.PI / 2];
//   }

//   return <primitive object={grid} position={position} rotation={rotation} />;
// }

const MAJOR_EVERY = 5; // a strong line after every 5 small squares

// ---------------- Grid: sets the size of the grid layer so that it matches mm ----------------
// function GridScaler({ gridRef, spacing, active }) {
//   const { camera, controls, size, gl } = useThree();
//   const last = useRef("");

//   useFrame(() => {
//     const el = gridRef.current;
//     if (!el || !active) return;

//     // the middle of the model (where the camera looks at)
//     const target = controls ? controls.target : new THREE.Vector3();

//     // how many screen pixels are 1 mm at the depth of the model
//     const distance = camera.position.distanceTo(target);
//     const pxPerMm = size.height / (2 * distance * Math.tan((camera.fov * Math.PI) / 360));
//     const cell = pxPerMm * spacing;

//     // where the middle of the model is on the screen, measured from the corner of the grid layer
//     const p = target.clone().project(camera);
//     const canvasRect = gl.domElement.getBoundingClientRect();
//     const layerRect = el.getBoundingClientRect();
//     const x = canvasRect.left - layerRect.left + (p.x * 0.5 + 0.5) * size.width;
//     const y = canvasRect.top - layerRect.top + (-p.y * 0.5 + 0.5) * size.height;

//     // only touch the page when something changed
//     const key = `${cell.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`;
//     if (key === last.current) return;
//     last.current = key;

//     // zoomed out so far that the lines would blur together: hide them
//     if (cell < 3) {
//       el.style.backgroundSize = "0 0";
//       return;
//     }
//     el.style.backgroundSize = `${cell}px ${cell}px`;
//     el.style.backgroundPosition = `${x}px ${y}px`;
//   });

//   return null;
// }


function GridScaler({ gridRef, spacing, active }) {
  const { camera, controls, size, gl } = useThree();
  const last = useRef("");

  useFrame(() => {
    const el = gridRef.current;
    if (!el || !active) return;

    // the middle of the model (where the camera looks at)
    const target = controls ? controls.target : new THREE.Vector3();

    // how many screen pixels are 1 mm at the depth of the model
    const distance = camera.position.distanceTo(target);
    const pxPerMm = size.height / (2 * distance * Math.tan((camera.fov * Math.PI) / 360));
    const cell = pxPerMm * spacing; // one small square
    const major = cell * MAJOR_EVERY; // one big square

    // where the middle of the model is on the screen, measured from the corner of the grid layer
    const p = target.clone().project(camera);
    const canvasRect = gl.domElement.getBoundingClientRect();
    const layerRect = el.getBoundingClientRect();
    const x = canvasRect.left - layerRect.left + (p.x * 0.5 + 0.5) * size.width;
    const y = canvasRect.top - layerRect.top + (-p.y * 0.5 + 0.5) * size.height;

    // only touch the page when something changed
    const key = `${cell.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`;
    if (key === last.current) return;
    last.current = key;

    // zoomed out so far that lines would blur together: hide the small ones first, then the strong ones
    const minorSize = cell >= 4 ? `${cell}px ${cell}px` : "0 0";
    const majorSize = major >= 8 ? `${major}px ${major}px` : "0 0";

    el.style.backgroundSize = `${majorSize}, ${majorSize}, ${minorSize}, ${minorSize}`;
    el.style.backgroundPosition = `${x}px ${y}px`; // the same start for all four layers
  });

  return null;
}

// ---------------- Occlusion: smallest distance of each tooth to the other jaw ----------------
const OCCLUSION_LABEL_COLOR = "#6a55c9"; // text and line of the distance labels
const OCCLUSION_LABEL_BG = "#e4e0f7"; // light purple bubble

function OcclusionLabels({ labels, show }) {
  if (!show || !labels || labels.length === 0) return null;

  return (
    <>
      {labels.map((l) => (
        <group key={l.name}>
          <Line points={[l.point, l.bubble]} color={OCCLUSION_LABEL_COLOR} lineWidth={1} />
          <Html position={l.bubble} center style={{ pointerEvents: "none" }}>
            <div
              style={{
                padding: "3px 9px",
                borderRadius: 4,
                background: OCCLUSION_LABEL_BG,
                color: OCCLUSION_LABEL_COLOR,
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              {l.min.toFixed(2)}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

// ---------------- Superimpose: the initial position of the teeth as a green ghost ----------------
// const GHOST_COLOR = "#00F7F6"; // color of the initial position
const GHOST_COLOR = "#09fa9e"; // color of the initial position
const GHOST_OPACITY = 0.55; // 1 = solid, lower = more see-through

function GhostTeeth({ parts, show }) {
  if (!show || !parts || parts.length === 0) return null;

  return (
    <>
      {parts.map((p) => (
        <mesh key={p.name} geometry={p.geo} renderOrder={5} raycast={noRaycast}>
          <meshStandardMaterial
            color={GHOST_COLOR}
            transparent
            opacity={GHOST_OPACITY}
            side={THREE.DoubleSide}
            depthWrite={false}
            // pulled a little towards the camera, so it wins where it lies on the final tooth
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      ))}
    </>
  );
}

// ---------------- Root: an approximate root under every crown (made in roots.js) ----------------
const ROOT_COLOR = "#cdc3ab"; // beige root
const ROOT_OPACITY = 0.8; // 1 = solid, lower = more see-through

function RootMeshes({ parts, show }) {
  if (!show || !parts || parts.length === 0) return null;

  return (
    <>
      {parts.map((p) => (
        <mesh key={p.name} geometry={p.geo} renderOrder={4} raycast={noRaycast}>
          <meshStandardMaterial
            color={ROOT_COLOR}
            transparent
            opacity={ROOT_OPACITY}
            roughness={0.75}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
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
  viewRequest,
  latCurves,
  dragging,
  onStartDrag,
  onStartTrimDrag,
  onMoveDrag,
  onEndDrag,
  showGrid,
  gridSize,
  gridRef,
  ghostParts,
  occlusion, // null, or the result of computeOcclusion (occlusion.js)
  rootParts = { upper: null, lower: null }, // Root view: { upper: [{ name, geo }], lower: [...] }

}) {
  const modelRef = useRef();

  const fitKey = [upperGeo?.uuid, lowerGeo?.uuid].join("-");

  return (
    <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
       
      {/* <ambientLight intensity={0.6} />
      <directionalLight position={[50, 50, 50]} intensity={1} />
      <directionalLight position={[-50, -50, -50]} intensity={0.5} /> 
            */}

      <ambientLight intensity={0.5} />
      <Headlight />
      <hemisphereLight args={["#ffeedd", "#888888", 0.2]} />

      {/* the scans (the camera fits to this group) */}
      <group ref={modelRef}>
        <group visible={showUpper}>
           <group visible={!resultMeshes.upper}> 
          
          <Jaw
            geo={upperGeo}
            colored={toothLabels.upper.length > 0}
            parts={upperParts}
            showTeeth={segVisible.upperTeeth}
            showGum={segVisible.upperGum}
            occlusion={occlusion ? occlusion.upper : null}
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
        show={showUpper && segVisible.upperTeeth && showNumbers && !occlusion}

         />
         <OcclusionLabels labels={occlusion?.upper.labels} show={showUpper && segVisible.upperTeeth} />
         <GhostTeeth parts={ghostParts.upper} show={segVisible.upperTeeth} />
                  <RootMeshes parts={rootParts.upper} show={segVisible.upperTeeth} />

        </group>
        <group visible={showLower}>
         <group visible={!resultMeshes.lower}> 
       
          <Jaw
            geo={lowerGeo}
            colored={toothLabels.lower.length > 0}
            parts={lowerParts}
            showTeeth={segVisible.lowerTeeth}
            showGum={segVisible.lowerGum}
            occlusion={occlusion ? occlusion.lower : null}
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
        show={showLower && segVisible.lowerTeeth && showNumbers && !occlusion}
        />
        <OcclusionLabels labels={occlusion?.lower.labels} show={showLower && segVisible.lowerTeeth} />

        <GhostTeeth parts={ghostParts.lower} show={segVisible.lowerTeeth} />
        <RootMeshes parts={rootParts.lower} show={segVisible.lowerTeeth} />

        </group>
      </group>


      {/* {showGrid && (
  <MeasureGrid
    targetRef={modelRef}
    spacing={gridSize}
    plane={(viewRequest && GRID_PLANE[viewRequest.name]) || "xz"}
    fitKey={fitKey}
  />
)} */}


      {/* the LAT splines, hidden together with their jaw */}
      <group visible={showUpper }>
        <LatCurves jaw="upper" curves={latCurves.upper} dragging={dragging} onStartDrag={onStartDrag} />
      </group>
      <group visible={showLower}>
        <LatCurves jaw="lower" curves={latCurves.lower} dragging={dragging} onStartDrag={onStartDrag} />
      </group>

      <FrontView targetRef={modelRef} fitKey={fitKey} />
      <ViewController targetRef={modelRef} viewRequest={viewRequest} />
      <DragController dragging={dragging} onEndDrag={onEndDrag} />
      <GridScaler gridRef={gridRef} spacing={gridSize} active={showGrid} />

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

