// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls, Bounds } from "@react-three/drei";

// // const JAW_COLOR = "#f4a6b8"; // pink

// // export default function Viewer({ upperGeo, lowerGeo }) {
// //   // camera re-fits only when a new file is loaded
// //   const fitKey = `${upperGeo ? upperGeo.uuid : 0}-${lowerGeo ? lowerGeo.uuid : 0}`;

// //   return (
// //     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
// //       <ambientLight intensity={0.6} />
// //       <directionalLight position={[50, 50, 50]} intensity={1} />
// //       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

// //       <Bounds key={fitKey} fit margin={1.4}>
// //         {upperGeo && (
// //           <mesh geometry={upperGeo}>
// //             <meshStandardMaterial color={JAW_COLOR} />
// //           </mesh>
// //         )}
// //         {lowerGeo && (
// //           <mesh geometry={lowerGeo}>
// //             <meshStandardMaterial color={JAW_COLOR} />
// //           </mesh>
// //         )}
// //       </Bounds>

// //       <OrbitControls makeDefault />
// //     </Canvas>
// //   );
// // }







// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Bounds } from "@react-three/drei";

// const JAW_COLOR = "#f4a6b8"; // pink

// function Jaw({ geo, parts }) {
//   if (parts && parts.length > 0) {
//     return (
//       <>
//         {parts.map((p) => (
//           <mesh key={p.name} geometry={p.geo}>
//             <meshStandardMaterial color={JAW_COLOR} />
//           </mesh>
//         ))}
//       </>
//     );
//   }
//   if (geo) {
//     return (
//       <mesh geometry={geo}>
//         <meshStandardMaterial color={JAW_COLOR} />
//       </mesh>
//     );
//   }
//   return null;
// }

// export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts }) {
//   const fitKey = [
//     upperGeo?.uuid,
//     lowerGeo?.uuid,
//     upperParts ? upperParts.length : 0,
//     lowerParts ? lowerParts.length : 0,
//   ].join("-");

//   return (
//     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[50, 50, 50]} intensity={1} />
//       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

//       <Bounds key={fitKey} fit margin={1.4}>
//         <Jaw geo={upperGeo} parts={upperParts} />
//         <Jaw geo={lowerGeo} parts={lowerParts} />
//       </Bounds>

//       <OrbitControls makeDefault />
//     </Canvas>
//   );
// }






// import { Canvas } from "@react-three/fiber";

// import { TrackballControls, Bounds } from "@react-three/drei";

// const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation
// const GUM_COLOR = "#D47575";
// const TEETH_COLOR = "#F6E5DF";

// // Gum.stl is gum, every other file (11.stl, 12.stl, ...) is a tooth
// function colorFor(fileName) {
//   return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
// }

// function Jaw({ geo, parts }) {
//   // after segmentation: show gum and each tooth with their own color
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

//   // before segmentation: show the original scan
//   if (geo) {
//     return (
//       <mesh geometry={geo}>
//         <meshStandardMaterial color={ORIGINAL_COLOR} />
//       </mesh>
//     );
//   }
//   return null;
// }

// export default function Viewer({ upperGeo, lowerGeo, upperParts, lowerParts,showUpper,
//   showLower, }) {
//   const fitKey = [
//     upperGeo?.uuid,
//     lowerGeo?.uuid,
//     upperParts ? upperParts.length : 0,
//     lowerParts ? lowerParts.length : 0,
//   ].join("-");

//   return (
//     <Canvas camera={{ position: [0, 0, 150], fov: 45, near: 0.1, far: 5000 }}>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[50, 50, 50]} intensity={1} />
//       <directionalLight position={[-50, -50, -50]} intensity={0.5} />

//       <Bounds key={fitKey} fit margin={0.9}>
//         <group visible={showUpper}>
//         <Jaw geo={upperGeo} parts={upperParts} />
//          </group>
//          <group visible={showLower}>
//         <Jaw geo={lowerGeo} parts={lowerParts} />
//         </group>
//       </Bounds>

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




import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";

const ORIGINAL_COLOR = "#f4a6b8"; // pink, original scan before segmentation

const GUM_COLOR = "#D47575";
const TEETH_COLOR = "#F6E5DF";

// ---- Start view settings ----
const FRONT_DIRECTION = -1; // -1 = camera on the -Y side, 1 = camera on the +Y side
const CAMERA_UP = [0, 0, 1]; // Z is up in your scans
const FIT_MARGIN = 1.2; // smaller = closer

function colorFor(fileName) {
  return fileName.toLowerCase().includes("gum") ? GUM_COLOR : TEETH_COLOR;
}

function Jaw({ geo, parts }) {
  if (parts && parts.length > 0) {
    return (
      <>
        {parts.map((p) => (
          <mesh key={p.name} geometry={p.geo}>
            <meshStandardMaterial color={colorFor(p.name)} />
          </mesh>
        ))}
      </>
    );
  }

  if (geo) {
    return (
      <mesh geometry={geo}>
        <meshStandardMaterial color={ORIGINAL_COLOR} />
      </mesh>
    );
  }
  return null;
}

// Puts the camera in front of the model whenever fitKey changes
// (new file uploaded or segmentation finished)
function FrontView({ targetRef, fitKey }) {
  const { camera, controls, size } = useThree();

  useEffect(() => {
    const group = targetRef.current;
    if (!group) return;

    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;

    const center = box.getCenter(new THREE.Vector3());
    const boxSize = box.getSize(new THREE.Vector3());

    // From the front we see the X width and the Z height of the model
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
}) {
  const modelRef = useRef();

  const fitKey = [
    upperGeo?.uuid,
    lowerGeo?.uuid,
    upperParts ? upperParts.length : 0,
    lowerParts ? lowerParts.length : 0,
  ].join("-");

  return (
    <Canvas camera={{ position: [0, -150, 0], up: CAMERA_UP, fov: 45, near: 0.1, far: 5000 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 50, 50]} intensity={1} />
      <directionalLight position={[-50, -50, -50]} intensity={0.5} />

      <group ref={modelRef}>
        <group visible={showUpper}>
          <Jaw geo={upperGeo} parts={upperParts} />
        </group>
        <group visible={showLower}>
          <Jaw geo={lowerGeo} parts={lowerParts} />
        </group>
      </group>

      <FrontView targetRef={modelRef} fitKey={fitKey} />

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