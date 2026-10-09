// // // import { useState } from "react";
// // // import TopBar from "./TopBar.jsx";
// // // import Viewer from "./Viewer.jsx";
// // // import { parseStl } from "./stlUtils.js";

// // // const BACKEND_URL = "http://localhost:5174";

// // // export default function App() {
// // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // //   const [lower, setLower] = useState({ name: "", geo: null });
// // //   const [message, setMessage] = useState("");

// // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // //   const handleFile = async (type, file) => {
// // //     const geo = parseStl(await file.arrayBuffer());

// // //     if (type === "upper") setUpper({ name: file.name, geo });
// // //     else setLower({ name: file.name, geo });
// // //     setMessage("");

// // //     // send the file to the backend
// // //     try {
// // //       const formData = new FormData();
// // //       formData.append("file", file);
// // //       formData.append("type", type);
// // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // //       const result = await res.json();
// // //       if (!res.ok) setMessage(result.message);
// // //     } catch (err) {
// // //       setMessage("File loaded in viewer, but backend upload failed.");
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // //       <TopBar
// // //         upperName={upper.name}
// // //         lowerName={lower.name}
// // //         onUpperSelected={(file) => handleFile("upper", file)}
// // //         onLowerSelected={(file) => handleFile("lower", file)}
// // //         message={message}
// // //       />
// // //       <div style={{ flex: 1 }}>
// // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { useState } from "react";
// // import TopBar from "./TopBar.jsx";
// // import Viewer from "./Viewer.jsx";
// // import VisibilityButtons from "./VisibilityButtons.jsx";
// // import { parseStl } from "./stlUtils.js";

// // const BACKEND_URL = "http://localhost:5174";

// // export default function App() {
// //   const [upper, setUpper] = useState({ name: "", geo: null });
// //   const [lower, setLower] = useState({ name: "", geo: null });
// //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// //   const [upperParts, setUpperParts] = useState(null);
// //   const [lowerParts, setLowerParts] = useState(null);
// //    const [showUpper, setShowUpper] = useState(true);
// //   const [showLower, setShowLower] = useState(true);
// //   const [busy, setBusy] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const handleFile = async (type, file) => {
// //     const geo = parseStl(await file.arrayBuffer());

// //     if (type === "upper") {
// //       setUpper({ name: file.name, geo });
// //       setUpperParts(null); // old segmentation is no longer valid
// //        setShowUpper(true);
// //     } else {
// //       setLower({ name: file.name, geo });
// //       setLowerParts(null);
// //         setShowLower(true);
// //     }
// //     setMessage("");

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);
// //       formData.append("type", type);
// //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// //       const result = await res.json();
// //       if (!res.ok) setMessage(result.message);
// //     } catch (err) {
// //       setMessage("File loaded in viewer, but backend upload failed.");
// //     }
// //   };

// //   // downloads every result STL of one jaw from the backend
// //   const loadParts = (jaw, files, stamp) =>
// //     Promise.all(
// //       files.map(async (name) => {
// //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// //         return { name, geo: parseStl(await res.arrayBuffer()) };
// //       })
// //     );

// //   const handleSegment = async () => {
// //     if (!upper.geo || !lower.geo) {
// //       setMessage("Please upload both Upper and Lower scan models first");
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// //       const result = await res.json();
// //       if (!res.ok) throw new Error(result.message);

// //       const stamp = Date.now();
// //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// //       setMessage("Segmentation completed");
// //     } catch (err) {
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// //       <TopBar
// //         upperName={upper.name}
// //         lowerName={lower.name}
// //         onUpperSelected={(file) => handleFile("upper", file)}
// //         onLowerSelected={(file) => handleFile("lower", file)}
// //         onSegment={handleSegment}
// //         busy={busy}
// //         message={message}
// //       />
// //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// //         <Viewer
// //           upperGeo={upper.geo}
// //           lowerGeo={lower.geo}
// //           upperParts={upperParts}
// //           lowerParts={lowerParts}
// //           showUpper={showUpper}
// //           showLower={showLower}
// //         />

// //          <VisibilityButtons
// //           showUpper={showUpper}
// //           showLower={showLower}
// //           hasUpper={!!upper.geo}
// //           hasLower={!!lower.geo}
// //           onToggleUpper={() => setShowUpper((v) => !v)}
// //           onToggleLower={() => setShowLower((v) => !v)}
// //         />
// //       </div>
// //     </div>
// //   );
// // }











// import { useState } from "react";
// import TopBar from "./TopBar.jsx";
// import Viewer from "./Viewer.jsx";
// import VisibilityButtons from "./VisibilityButtons.jsx";
// import { parseStl } from "./stlUtils.js";

// const BACKEND_URL = "http://localhost:5174";

// export default function App() {
//   const [upper, setUpper] = useState({ name: "", geo: null });
//   const [lower, setLower] = useState({ name: "", geo: null });
//   const [showUpper, setShowUpper] = useState(true);
//   const [showLower, setShowLower] = useState(true);
//   const [busy, setBusy] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleFile = async (type, file) => {
//     const geo = parseStl(await file.arrayBuffer());

//     if (type === "upper") {
//       setUpper({ name: file.name, geo });
//       setShowUpper(true);
//     } else {
//       setLower({ name: file.name, geo });
//       setShowLower(true);
//     }
//     setMessage("");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("type", type);
//       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
//       const result = await res.json();
//       if (!res.ok) setMessage(result.message);
//     } catch (err) {
//       setMessage("File loaded in viewer, but backend upload failed.");
//     }
//   };

//   const handleIdentifyLat = async () => {
//     if (!upper.geo || !lower.geo) {
//       setMessage("Please upload both Upper and Lower scan models first");
//       return;
//     }

//     setBusy(true);
//     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message);
//       setMessage(result.message);
//     } catch (err) {
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   // the cutting step comes in a later phase
//   // const handleCutTeeth = () => {
//   //   setMessage("Cutting teeth from gum will be added in a later step");
//   // };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
//       <TopBar
//         upperName={upper.name}
//         lowerName={lower.name}
//         onUpperSelected={(file) => handleFile("upper", file)}
//         onLowerSelected={(file) => handleFile("lower", file)}
//         onIdentifyLat={handleIdentifyLat}
//         // onCutTeeth={handleCutTeeth}
//         busy={busy}
//         message={message}
//       />

//       {/* position: relative lets the buttons float over the top-right of the 3D area */}
//       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
//         <Viewer
//           upperGeo={upper.geo}
//           lowerGeo={lower.geo}
//           showUpper={showUpper}
//           showLower={showLower}
//         />

//         <VisibilityButtons
//           showUpper={showUpper}
//           showLower={showLower}
//           hasUpper={!!upper.geo}
//           hasLower={!!lower.geo}
//           onToggleUpper={() => setShowUpper((v) => !v)}
//           onToggleLower={() => setShowLower((v) => !v)}
//         />
//       </div>
//     </div>
//   );
// }















import { useState } from "react";
import TopBar from "./TopBar.jsx";
import Viewer from "./Viewer.jsx";
import VisibilityButtons from "./VisibilityButtons.jsx";
import { parseStl } from "./stlUtils.js";

const BACKEND_URL = "http://localhost:5174";

export default function App() {
  const [upper, setUpper] = useState({ name: "", geo: null });
  const [lower, setLower] = useState({ name: "", geo: null });
  const [showUpper, setShowUpper] = useState(true);
  const [showLower, setShowLower] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null); // { percent, label } or null
  const [message, setMessage] = useState("");

  const handleFile = async (type, file) => {
    const geo = parseStl(await file.arrayBuffer());

    if (type === "upper") {
      setUpper({ name: file.name, geo });
      setShowUpper(true);
    } else {
      setLower({ name: file.name, geo });
      setShowLower(true);
    }
    setMessage("");
    setProgress(null); // a new file was loaded, so hide the old progress bar

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) setMessage(result.message);
    } catch (err) {
      setMessage("File loaded in viewer, but backend upload failed.");
    }
  };

  const handleIdentifyLat = async () => {
    if (!upper.geo || !lower.geo) {
      setProgress(null);
      setMessage("Please upload both Upper and Lower scan models first");
      return;
    }

    setBusy(true);
    setMessage("");
    setProgress({ percent: 0, label: "Starting..." });

    try {
      // 1. start the job on the backend (answers immediately)
      const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
      const started = await res.json();
      if (!res.ok) throw new Error(started.message);

      // 2. ask the backend for the progress every second until it is done
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
        const job = await statusRes.json();

        if (job.error) throw new Error(job.error);
        setProgress({ percent: job.percent, label: job.label });
        if (job.done) break;
      }
            // keep the green "completed" bar for 2 seconds, then hide it
      setTimeout(() => setProgress(null), 2000);
    } catch (err) {
      setProgress(null);
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar
        upperName={upper.name}
        lowerName={lower.name}
        onUpperSelected={(file) => handleFile("upper", file)}
        onLowerSelected={(file) => handleFile("lower", file)}
        onIdentifyLat={handleIdentifyLat}
        busy={busy}
        progress={progress}
        message={message}
      />

      {/* position: relative lets the buttons float over the top-right of the 3D area */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <Viewer
          upperGeo={upper.geo}
          lowerGeo={lower.geo}
          showUpper={showUpper}
          showLower={showLower}
        />

        <VisibilityButtons
          showUpper={showUpper}
          showLower={showLower}
          hasUpper={!!upper.geo}
          hasLower={!!lower.geo}
          onToggleUpper={() => setShowUpper((v) => !v)}
          onToggleLower={() => setShowLower((v) => !v)}
        />
      </div>
    </div>
  );
}