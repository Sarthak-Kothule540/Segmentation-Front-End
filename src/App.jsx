// // // // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // // // export default function App() {
// // // // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // // // // // // // //     setMessage("");

// // // // // // // // // // // // // //     // send the file to the backend
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // // // //       <TopBar
// // // // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // // // //         message={message}
// // // // // // // // // // // // // //       />
// // // // // // // // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }




// // // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // // export default function App() {
// // // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // // // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // // // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // // // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // // // // // // // //        setShowUpper(true);
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // // // //       setLowerParts(null);
// // // // // // // // // // // // //         setShowLower(true);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     setMessage("");

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // // // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // // // // // // // //     Promise.all(
// // // // // // // // // // // // //       files.map(async (name) => {
// // // // // // // // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // // // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // // // // // // // //       })
// // // // // // // // // // // // //     );

// // // // // // // // // // // // //   const handleSegment = async () => {
// // // // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     setBusy(true);
// // // // // // // // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // // // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // // // // // // // //       setMessage("Segmentation completed");
// // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setBusy(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // // //       <TopBar
// // // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // // //         onSegment={handleSegment}
// // // // // // // // // // // // //         busy={busy}
// // // // // // // // // // // // //         message={message}
// // // // // // // // // // // // //       />
// // // // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // // // //         <Viewer
// // // // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // // // //           upperParts={upperParts}
// // // // // // // // // // // // //           lowerParts={lowerParts}
// // // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // // //         />

// // // // // // // // // // // // //          <VisibilityButtons
// // // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // // // //         />
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }











// // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // export default function App() {
// // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // // //       setShowUpper(true);
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // // //       setShowLower(true);
// // // // // // // // // // // //     }
// // // // // // // // // // // //     setMessage("");

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     setBusy(true);
// // // // // // // // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // // // // // // // //       setMessage(result.message);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setBusy(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // the cutting step comes in a later phase
// // // // // // // // // // // //   // const handleCutTeeth = () => {
// // // // // // // // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // // // // // // // //   // };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // //       <TopBar
// // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // // // // // // // //         busy={busy}
// // // // // // // // // // // //         message={message}
// // // // // // // // // // // //       />

// // // // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // // //         <Viewer
// // // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // //         />

// // // // // // // // // // // //         <VisibilityButtons
// // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // // //         />
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }















// // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // export default function App() {
// // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // // //       setShowUpper(true);
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // // //       setShowLower(true);
// // // // // // // // // // // //     }
// // // // // // // // // // // //     setMessage("");
// // // // // // // // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // // // //     // if (!upper.geo) {
// // // // // // // // // // // //     //   setProgress(null);
// // // // // // // // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // // //     //   return;
// // // // // // // // // // // //     // }

// // // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // // //      setProgress(null);
// // // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //       }

// // // // // // // // // // // //     setBusy(true);
// // // // // // // // // // // //     setMessage("");
// // // // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // // // //       const started = await res.json();
// // // // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // // // // //       while (true) {
// // // // // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // // // // //         const job = await statusRes.json();

// // // // // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // // // // //         if (job.done) break;
// // // // // // // // // // // //       }
// // // // // // // // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setProgress(null);
// // // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setBusy(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // //       <TopBar
// // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // // // //         busy={busy}
// // // // // // // // // // // //         progress={progress}
// // // // // // // // // // // //         message={message}
// // // // // // // // // // // //       />

// // // // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // // //         <Viewer
// // // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // //         />

// // // // // // // // // // // //         <VisibilityButtons
// // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // // //         />
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }







// // // // // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // export default function App() {
// // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // // // // // // // //   // dragging of one editable point
// // // // // // // // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // //       setShowUpper(true);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // //       setShowLower(true);
// // // // // // // // // // //     }
// // // // // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // // // // //     setMessage("");
// // // // // // // // // // //     setProgress(null);

// // // // // // // // // // //     try {
// // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // //       setProgress(null);
// // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setBusy(true);
// // // // // // // // // // //     setMessage("");
// // // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // // //     try {
// // // // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // // //       const started = await res.json();
// // // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // // // //       let job;
// // // // // // // // // // //       while (true) {
// // // // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // // // //         job = await statusRes.json();

// // // // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // // // //         if (job.done) break;
// // // // // // // // // // //       }

// // // // // // // // // // //       // 3. download the CSV files and show them as splines
// // // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // // // // //       setLatCurves({
// // // // // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // // // // //       });

// // // // // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setProgress(null);
// // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setBusy(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // // // // //     dragRef.current = { jaw, id, index };
// // // // // // // // // // //     setDragging(true);
// // // // // // // // // // //   };

// // // // // // // // // // //   const endDrag = useCallback(() => {
// // // // // // // // // // //     dragRef.current = null;
// // // // // // // // // // //     setDragging(false);
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // // // // //   const moveDrag = (point) => {
// // // // // // // // // // //     const d = dragRef.current;
// // // // // // // // // // //     if (!d) return;

// // // // // // // // // // //     setLatCurves((prev) => ({
// // // // // // // // // // //       ...prev,
// // // // // // // // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // // // // // // // //         curve.id === d.id
// // // // // // // // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // // // // // // // //           : curve
// // // // // // // // // // //       ),
// // // // // // // // // // //     }));
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // //       <TopBar
// // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // // //         busy={busy}
// // // // // // // // // // //         progress={progress}
// // // // // // // // // // //         message={message}
// // // // // // // // // // //       />

// // // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // //         <Viewer
// // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //           latCurves={latCurves}
// // // // // // // // // // //           dragging={dragging}
// // // // // // // // // // //           onStartDrag={startDrag}
// // // // // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // // // // //           onEndDrag={endDrag}
// // // // // // // // // // //         />

// // // // // // // // // // //         <VisibilityButtons
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // //         />
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }











// // // // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // export default function App() {
// // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // // // // //   latCurvesRef.current = latCurves;

// // // // // // // // // //   // dragging of one editable point
// // // // // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // //     if (type === "upper") {
// // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // //       setShowUpper(true);
// // // // // // // // // //     } else {
// // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // //       setShowLower(true);
// // // // // // // // // //     }
// // // // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress(null);

// // // // // // // // // //     try {
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append("file", file);
// // // // // // // // // //       formData.append("type", type);
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // // // // //     while (true) {
// // // // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // // //       const res = await fetch(statusUrl);
// // // // // // // // // //       const job = await res.json();

// // // // // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // // // // //       if (job.done) return job;
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setBusy(true);
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // //       const started = await res.json();
// // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // // // // //       // download the CSV files and show them as splines
// // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // // // //       setLatCurves({
// // // // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // // // //       });

// // // // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage(err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setBusy(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setBusy(true);
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // // // // //       const started = await res.json();
// // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage(err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setBusy(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // // // // //     setDragging(true);
// // // // // // // // // //   };

// // // // // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // // // // //   const endDrag = useCallback(async () => {
// // // // // // // // // //     const d = dragRef.current;
// // // // // // // // // //     dragRef.current = null;
// // // // // // // // // //     setDragging(false);

// // // // // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // // // //     if (!curve) return;

// // // // // // // // // //     try {
// // // // // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // // // //       setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // // // // //     }
// // // // // // // // // //   }, []);

// // // // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // // // //   const moveDrag = (point) => {
// // // // // // // // // //     const d = dragRef.current;
// // // // // // // // // //     if (!d) return;

// // // // // // // // // //     const current = latCurvesRef.current;
// // // // // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // // // //     if (!curve) return;

// // // // // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // // // //     d.moved = true;

// // // // // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // // // //     latCurvesRef.current = {
// // // // // // // // // //       ...current,
// // // // // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // // // //     };
// // // // // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // //       <TopBar
// // // // // // // // // //         upperName={upper.name}
// // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // // // // //         busy={busy}
// // // // // // // // // //         progress={progress}
// // // // // // // // // //         message={message}
// // // // // // // // // //       />

// // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // //         <Viewer
// // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           latCurves={latCurves}
// // // // // // // // // //           dragging={dragging}
// // // // // // // // // //           onStartDrag={startDrag}
// // // // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // // // //           onEndDrag={endDrag}
// // // // // // // // // //         />

// // // // // // // // // //         <VisibilityButtons
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }












// // // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // // // // const NO_CURVES = { upper: [], lower: [] };

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // // // //   latCurvesRef.current = latCurves;

// // // // // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // // // // //   // dragging of one editable point
// // // // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") {
// // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // //       setShowUpper(true);
// // // // // // // // //     } else {
// // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // //       setShowLower(true);
// // // // // // // // //     }
// // // // // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress(null);

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // // // //     while (true) {
// // // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // //       const res = await fetch(statusUrl);
// // // // // // // // //       const job = await res.json();

// // // // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // // // //       if (job.done) return job;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // //       const started = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // // // //       // download the CSV files and show them as splines
// // // // // // // // //       const stamp = Date.now();
// // // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // // //       setLatCurves({
// // // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // // //       });
// // // // // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // // // // //       setShowSplines(true);

// // // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // // // //       const started = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // // // //       // download the gum and teeth STL files and show them
// // // // // // // // //       const stamp = Date.now();
// // // // // // // // //       const stl = job.stlFiles || {};
// // // // // // // // //       setSegParts({
// // // // // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // // // //       });

// // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // // // //     setDragging(true);
// // // // // // // // //   };

// // // // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // // // //   const endDrag = useCallback(async () => {
// // // // // // // // //     const d = dragRef.current;
// // // // // // // // //     dragRef.current = null;
// // // // // // // // //     setDragging(false);

// // // // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // // //     if (!curve) return;

// // // // // // // // //     try {
// // // // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // // //       setMessage(result.message);
// // // // // // // // //       setTimeout(() => setMessage(""), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // // // //     }
// // // // // // // // //   }, []);

// // // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // // //   const moveDrag = (point) => {
// // // // // // // // //     const d = dragRef.current;
// // // // // // // // //     if (!d) return;

// // // // // // // // //     const current = latCurvesRef.current;
// // // // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // // //     if (!curve) return;

// // // // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // // //     d.moved = true;

// // // // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // // //     latCurvesRef.current = {
// // // // // // // // //       ...current,
// // // // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // // //     };
// // // // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // // // //         busy={busy}
// // // // // // // // //         progress={progress}
// // // // // // // // //         message={message}
// // // // // // // // //       />

// // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // //         <Viewer
// // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // //           upperParts={segParts.upper}
// // // // // // // // //           lowerParts={segParts.lower}
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // // // // //           dragging={dragging}
// // // // // // // // //           onStartDrag={startDrag}
// // // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // // //           onEndDrag={endDrag}
// // // // // // // // //         />

// // // // // // // // //         <VisibilityButtons
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // //         />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

















// // // // // // // // import { useCallback,useMemo, useRef, useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // import { removeTeeth } from "./gumUtils.js";
// // // // // // // // import { deformGum } from "./gumDeform.js";


// // // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // // // const NO_CURVES = { upper: [], lower: [] };
// // // // // // // // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // // // // // // // const NO_RESULT = { upper: null, lower: null };

// // // // // // // // const NO_LABELS = { upper: [], lower: [] };
// // // // // // // // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // // // // // // // const BARS_HEIGHT = 88;
// // // // // // // // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // // // // // // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // // // // // // // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // // // // // // // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // // // // // // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // // // // // // // const GRID_IMAGE = [
// // // // // // // //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // // //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // // //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // // //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // // // ].join(", ");
// // // // // // // // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // // // // // // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // // // // // // // const KEEP_OUTPUT_ON_UPLOAD = false;
// // // // // // // // const NO_PARTS = { upper: null, lower: null };

  

// // // // // // // // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // // // // // // // when a step runs, only these steps become "not done" again
// // // // // // // // const RESETS = {
// // // // // // // //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// // // // // // // //   generateTrimline: ["trimModel", "addBase"],
// // // // // // // //   trimModel: ["addBase"],
// // // // // // // //   addBase: [],
// // // // // // // //   identifyLat: ["segment","automaticSetup"],
// // // // // // // //   segment: ["automaticSetup"],
// // // // // // // //     automaticSetup: [],
// // // // // // // // };

// // // // // // // // const NOT_DONE = {
// // // // // // // //   cleanModel: false,
// // // // // // // //   identifyLat: false,
// // // // // // // //   segment: false,
// // // // // // // //   generateTrimline: false,
// // // // // // // //   trimModel: false,
// // // // // // // //   addBase: false,
// // // // // // // //   automaticSetup: false,
// // // // // // // // };




// // // // // // // // // button name used by the backend -> step name
// // // // // // // // const COMMAND_TO_STEP = {
// // // // // // // //   GenerateTrimline: "generateTrimline",
// // // // // // // //   TrimModel: "trimModel",
// // // // // // // //   AddBase: "addBase",
// // // // // // // // };
// // // // // // // // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // // // // // // // step that must be finished before this step can run
// // // // // // // // const REQUIRED_BEFORE = {
// // // // // // // //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// // // // // // // //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // // // // // // // };



// // // // // // // // // button text in the Clean Model tab -> command sent to the backend
// // // // // // // // const NEW_EXE_COMMANDS = {
// // // // // // // //   "Generate Trimline": "GenerateTrimline",
// // // // // // // //   "Trim Model": "TrimModel",
// // // // // // // //   "Add Base": "AddBase",
// // // // // // // // };

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   // which buttons already produced a result
// // // // // // // // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // // // // // // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // // // // // // // const [segmenterReady, setSegmenterReady] = useState(false);

// // // // // // // // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // // // // // // // marks a step as done and resets the steps after it
// // // // // // // // // const markDone = (step) =>
// // // // // // // // //   setDoneSteps((prev) => {
// // // // // // // // //     const next = { ...prev };
// // // // // // // // //     STEP_ORDER.forEach((s, i) => {
// // // // // // // // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // // // // // // // //     });
// // // // // // // // //     next[step] = true;
// // // // // // // // //     return next;
// // // // // // // // //   });



// // // // // // // // const markDone = (step) =>
// // // // // // // //   setDoneSteps((prev) => {
// // // // // // // //     const next = { ...prev };
// // // // // // // //     RESETS[step].forEach((s) => (next[s] = false));
// // // // // // // //     next[step] = true;
// // // // // // // //     return next;
// // // // // // // //   });

// // // // // // // // // shows the alert and returns true if the step was already done
// // // // // // // // // const alreadyDone = (step) => {
// // // // // // // // //   if (doneSteps[step]) {
// // // // // // // // //     alert(DONE_MESSAGES[step]);
// // // // // // // // //     return true;
// // // // // // // // //   }
// // // // // // // // //   return false;
// // // // // // // // // };


// // // // // // // // // if the step is already done: show its stored result and do not run the exe again
// // // // // // // // const showIfDone = (step) => {
// // // // // // // //   if (doneSteps[step]) {
// // // // // // // //     setView(step);
// // // // // // // //     setMessage("");
// // // // // // // //     return true;
// // // // // // // //   }
// // // // // // // //   return false;
// // // // // // // // };

// // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // // //   latCurvesRef.current = latCurves;

// // // // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // // // //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // // // // // // // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// // // // // // // //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// // // // // // // //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// // // // // // // //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// // // // // // // //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// // // // // // // //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// // // // // // // //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // // // // // // // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // // // // // // // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // // // // // // // which result is shown: "scan" or the name of a step
// // // // // // // // const [view, setView] = useState("scan");

// // // // // // // //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// // // // // // // //   const trimlinesRef = useRef(trimlines);
// // // // // // // //   trimlinesRef.current = trimlines;

// // // // // // // //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// // // // // // // //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// // // // // // // //        const [showNumbers, setShowNumbers] = useState(true);
// // // // // // // //        const [showGrid, setShowGrid] = useState(false);
// // // // // // // //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // // // // // // // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // // // // // // // const [showSuperimpose, setShowSuperimpose] = useState(false);

// // // // // // // //        const [viewRequest, setViewRequest] = useState(null);



// // // // // // // //   // dragging of one editable point
// // // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setShowLower(true);
// // // // // // // //     }
// // // // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // // // //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// // // // // // // //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// // // // // // // //     setSegVisible(ALL_VISIBLE);

// // // // // // // //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // // // // //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// // // // // // // //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // // // // //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// // // // // // // //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// // // // // // // //    setView("scan");
// // // // // // // //    setShowSuperimpose(false);

// // // // // // // //     setMessage("");
// // // // // // // //     setDoneSteps(NOT_DONE);
// // // // // // // //     setSegmenterReady(false);
// // // // // // // //     setProgress(null);

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // // //     while (true) {
// // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // //       const res = await fetch(statusUrl);
// // // // // // // //       const job = await res.json();

// // // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // // //       if (job.done) return job;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // //     // if (alreadyDone("identifyLat")) return;
// // // // // // // //     if (showIfDone("identifyLat")) return;
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
      
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // // //       // download the CSV files and show them as splines
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // //       setLatCurves({
// // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // //       });
// // // // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // // // //       setToothLabels(NO_LABELS);
// // // // // // // //       setSegVisible(ALL_VISIBLE);
// // // // // // // //       setShowSplines(true);


// // // // // // // //       // setTrimlines(NO_RESULT);
// // // // // // // //       // setResultMeshes(NO_RESULT);
// // // // // // // //       markDone("identifyLat");
// // // // // // // //       setView("identifyLat");

// // // // // // // //       setSegmenterReady(true);

// // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // // //     // if (alreadyDone("segment")) return;
// // // // // // // //     if (showIfDone("segment")) return;
// // // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //      setShowNumbers(true);

// // // // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // // //       // download the gum and teeth STL files and show them
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const stl = job.stlFiles || {};
// // // // // // // //       setSegParts({
// // // // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // // //       });
// // // // // // // //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// // // // // // // //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// // // // // // // //       const numbers = job.numberFiles || {};
// // // // // // // //       setToothLabels({
// // // // // // // //         upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// // // // // // // //         lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// // // // // // // //       });
// // // // // // // //       markDone("segment");
// // // // // // // //       setView("segment");

// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };


// // // // // // // //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// // // // // // // //   // downloads one scan file from the backend again
// // // // // // // //   const loadScan = async (jaw, fileName, stamp) => {
// // // // // // // //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// // // // // // // //     return parseStl(await res.arrayBuffer());
// // // // // // // //   };

// // // // // // // //   const handleCleanModel = async () => {
// // // // // // // //     // if (alreadyDone("cleanModel")) return;
// // // // // // // //     if (showIfDone("cleanModel")) return;
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // // // // //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // // // // //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const upperGeo = await loadScan("upper", "Upper.stl", stamp);
// // // // // // // //       const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
// // // // // // // //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// // // // // // // //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// // // // // // // //       // old LAT curves and separated parts do not match the cleaned scans
// // // // // // // //       // setLatCurves({ upper: [], lower: [] });
// // // // // // // //       // setSegParts({ upper: null, lower: null });
// // // // // // // //       // setSegVisible(ALL_VISIBLE);
// // // // // // // //       // setShowSplines(true);


// // // // // // // //             // old LAT curves do not match the cleaned scans
// // // // // // // //       setLatCurves({ upper: [], lower: [] });
// // // // // // // //       setShowSplines(true);


// // // // // // // //       setTrimlines(NO_RESULT);
// // // // // // // //       // setResultMeshes(NO_RESULT);
// // // // // // // //       setTrimModelMeshes(NO_RESULT);
// // // // // // // //       setBaseMeshes(NO_RESULT);

// // // // // // // //       // setToothLabels(NO_LABELS);

// // // // // // // //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// // // // // // // //       // const stl = job.stlFiles || {};
// // // // // // // //       // setSegParts({
// // // // // // // //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // // //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // // //       // });
// // // // // // // //       // setSegVisible(ALL_VISIBLE);

// // // // // // // //        setToothLabels(NO_LABELS);
// // // // // // // //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// // // // // // // //       setSegParts({ upper: null, lower: null });
// // // // // // // //       setSegVisible(ALL_VISIBLE);
// // // // // // // //       markDone("cleanModel");
// // // // // // // //       setView("cleanModel");
// // // // // // // //       setSegmenterReady(true);

// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // // // // //   // const handleToolClick = (tool) => {
// // // // // // // //   //   if (busy) return;
// // // // // // // //   //   if (tool === "Clean Model") handleCleanModel();
// // // // // // // //   // };



// // // // // // // //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// // // // // // // //   const runNewExeCommand = async (commandKey) => {
// // // // // // // //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// // // // // // // //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// // // // // // // //   //   if (!segmenterReady) {
// // // // // // // //   //  alert(NEED_SEGMENTER_MESSAGE);
// // // // // // // //   //  return;
// // // // // // // //   //  }

// // // // // // // //   if (!segmenterReady) {
// // // // // // // //   // the flag is false (for example after a refresh), so ask the backend about the real files
// // // // // // // //   let ready = false;
// // // // // // // //   try {
// // // // // // // //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// // // // // // // //     ready = (await res.json()).ready;
// // // // // // // //   } catch (err) {
// // // // // // // //     ready = false;
// // // // // // // //   }
// // // // // // // //   if (!ready) {
// // // // // // // //     alert(NEED_SEGMENTER_MESSAGE);
// // // // // // // //     return;
// // // // // // // //   }
// // // // // // // // }



// // // // // // // //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// // // // // // // //    if (required && !doneSteps[required.step]) {
// // // // // // // //   alert(required.message);
// // // // // // // //   return;
// // // // // // // //   }
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // // // // //       // console.log(`${commandKey} output files:`, job.report);



// // // // // // // //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // // // // //       console.log(`${commandKey} output files:`, job.report);

// // // // // // // //       // show the result in the 3D view
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const missing = [];
// // // // // // // //       for (const jaw of ["upper", "lower"]) {
// // // // // // // //         const rel = job.files ? job.files[jaw] : null;
// // // // // // // //         if (!rel) {
// // // // // // // //           missing.push(jaw);
// // // // // // // //           continue;
// // // // // // // //         }
// // // // // // // //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// // // // // // // //         // if (commandKey === "GenerateTrimline") {
// // // // // // // //         //   const points = await loadPointsFile(url);
// // // // // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// // // // // // // //         // } else {

// // // // // // // //         //   if (commandKey === "GenerateTrimline") {
// // // // // // // //         //   const points = await loadPointsFile(url);
// // // // // // // //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// // // // // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// // // // // // // //         // } else {
// // // // // // // //         //   const geo = await loadStlFile(url);
// // // // // // // //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// // // // // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// // // // // // // //         // }


// // // // // // // //           if (commandKey === "GenerateTrimline") {
// // // // // // // //      const points = await loadPointsFile(url);
// // // // // // // //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // // // // //     } else {
// // // // // // // //     const geo = await loadStlFile(url);
// // // // // // // //     if (commandKey === "TrimModel") {
// // // // // // // //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// // // // // // // //    } else {
// // // // // // // //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// // // // // // // //   }
// // // // // // // // }


// // // // // // // //       }

// // // // // // // //       // if (missing.length > 0) {
// // // // // // // //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // // // // //       // }

// // // // // // // //       if (missing.length > 0) {
// // // // // // // //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // // // // //    } else {
// // // // // // // //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// // // // // // // //      setView(COMMAND_TO_STEP[commandKey]);
// // // // // // // //    }


// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // // // ---------------- Automatic Setup button ----------------
// // // // // // // // // const handleAutomaticSetup = async () => {
// // // // // // // // //   if (busy) return;

// // // // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // // // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // // // // // // // //     return;
// // // // // // // // //   }
// // // // // // // // //   if (!doneSteps.segment) {
// // // // // // // // //     alert("Please do Segment first.");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   setBusy(true);
// // // // // // // // //   setMessage("");
// // // // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //   try {
// // // // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // // // //     const started = await res.json();
// // // // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // // // // // // // //     // the files made by the exe (also printed in the backend terminal)
// // // // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // // // //     markDone("automaticSetup");
// // // // // // // // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // // // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     setProgress(null);
// // // // // // // // //     setMessage(err.message);
// // // // // // // // //   } finally {
// // // // // // // // //     setBusy(false);
// // // // // // // // //   }
// // // // // // // // // };




// // // // // // // // // const handleAutomaticSetup = async () => {
// // // // // // // // //   if (busy) return;

// // // // // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // // // //     setView("automaticSetup");
// // // // // // // // //     setMessage("");
// // // // // // // // //     return;
// // // // // // // // //   }
// // // // // // // // //   if (!doneSteps.segment) {
// // // // // // // // //     alert("Please do Segment first.");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   setBusy(true);
// // // // // // // // //   setMessage("");
// // // // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //   try {
// // // // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // // // //     const started = await res.json();
// // // // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // // // //     // download the STL files that the exe made, for each jaw
// // // // // // // // //     const stamp = Date.now();
// // // // // // // // //     const parts = { upper: [], lower: [] };
// // // // // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // // // // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // // // // // // // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // // // // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // // // // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // // // // // // // //     }

// // // // // // // // //     markDone("automaticSetup");

// // // // // // // // //     if (parts.upper.length + parts.lower.length === 0) {
// // // // // // // // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // // // // // // // //     } else {
// // // // // // // // //       setSetupParts({
// // // // // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // // // // //       });
// // // // // // // // //       setView("automaticSetup");
// // // // // // // // //     }

// // // // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     setProgress(null);
// // // // // // // // //     setMessage(err.message);
// // // // // // // // //   } finally {
// // // // // // // // //     setBusy(false);
// // // // // // // // //   }
// // // // // // // // // };


// // // // // // // // const handleAutomaticSetup = async () => {
// // // // // // // //   if (busy) return;

// // // // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // // //     setView("automaticSetup");
// // // // // // // //     setMessage("");
// // // // // // // //     return;
// // // // // // // //   }
// // // // // // // //   if (!doneSteps.segment) {
// // // // // // // //     alert("Please do Segment first.");
// // // // // // // //     return;
// // // // // // // //   }

// // // // // // // //   setBusy(true);
// // // // // // // //   setMessage("");
// // // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //   try {
// // // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // // //     const started = await res.json();
// // // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // // //     // download the tooth STL files that the exe made, for each jaw
// // // // // // // //     const stamp = Date.now();
// // // // // // // //     const parts = { upper: [], lower: [] };
// // // // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // // // //       const fileName = rel.split("/").pop();

// // // // // // // //       // only tooth files like 11_final.stl (this skips all_final.stl)
// // // // // // // //       const m = fileName.match(/^(\d)(\d)_final\.stl$/i);
// // // // // // // //       if (!m) continue;

// // // // // // // //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// // // // // // // //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";

// // // // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // // // //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// // // // // // // //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo });
// // // // // // // //     }

// // // // // // // //     if (parts.upper.length + parts.lower.length > 0) {
// // // // // // // //       setSetupParts({
// // // // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // // // //       });
// // // // // // // //       markDone("automaticSetup");
// // // // // // // //       setView("automaticSetup");
// // // // // // // //     } else {
// // // // // // // //       console.warn("Automatic Setup made no STL files to show:", job.files);
// // // // // // // //     }

// // // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // // //   } catch (err) {
// // // // // // // //     setProgress(null);
// // // // // // // //     setMessage(err.message);
// // // // // // // //   } finally {
// // // // // // // //     setBusy(false);
// // // // // // // //   }
// // // // // // // // };


// // // // // // // // // Initial Position: the Segment result (no exe is called)
// // // // // // // // const handleInitialPosition = () => {
// // // // // // // //   if (busy) return;
// // // // // // // //   setView("segment");
// // // // // // // //   setMessage("");
// // // // // // // // };

// // // // // // // // // Final Position: the Automatic Setup result (no exe is called)
// // // // // // // // const handleFinalPosition = () => {
// // // // // // // //   if (busy) return;
// // // // // // // //   setView("automaticSetup");
// // // // // // // //   setMessage("");
// // // // // // // // };

// // // // // // // //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// // // // // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // // // // //   const handleToolClick = (tool) => {
// // // // // // // //     if (busy) return;
// // // // // // // //     if (tool === "Clean Model") handleCleanModel();
// // // // // // // //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// // // // // // // //   };

















// // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // //   // const startDrag = (jaw, id, index) => {
// // // // // // // //   //   dragRef.current = { jaw, id, index, moved: false };
// // // // // // // //   //   setDragging(true);
// // // // // // // //   // };

// // // // // // // //   // // when the mouse button is released: save the edited curve to its csv file
// // // // // // // //   // const endDrag = useCallback(async () => {
// // // // // // // //   //   const d = dragRef.current;
// // // // // // // //   //   dragRef.current = null;
// // // // // // // //   //   setDragging(false);

// // // // // // // //   //   if (!d || !d.moved) return; // nothing was changed

// // // // // // // //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //   //   if (!curve) return;

// // // // // // // //   //   try {
// // // // // // // //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // //   //     setMessage(result.message);
// // // // // // // //   //     setTimeout(()=>setMessage(""),2000);
// // // // // // // //   //   } catch (err) {
// // // // // // // //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // // //   //   }
// // // // // // // //   // }, []);

// // // // // // // //   // // moves the dragged point to the surface point under the mouse
// // // // // // // //   // const moveDrag = (point) => {
// // // // // // // //   //   const d = dragRef.current;
// // // // // // // //   //   if (!d) return;

// // // // // // // //   //   const current = latCurvesRef.current;
// // // // // // // //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //   //   if (!curve) return;

// // // // // // // //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // //   //   d.moved = true;

// // // // // // // //   //   // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // //   //   latCurvesRef.current = {
// // // // // // // //   //     ...current,
// // // // // // // //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // //   //   };
// // // // // // // //   //   setLatCurves(latCurvesRef.current);
// // // // // // // //   // };


// // // // // // // //     // ---------------- editing of the splines and of the trimline ----------------
// // // // // // // //   // a LAT point of one tooth
// // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// // // // // // // //     setDragging(true);
// // // // // // // //   };

// // // // // // // //   // a point of the trimline
// // // // // // // //   const startTrimDrag = (jaw, index) => {
// // // // // // // //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// // // // // // // //     setDragging(true);
// // // // // // // //   };

// // // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // // //   const endDrag = useCallback(async () => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     dragRef.current = null;
// // // // // // // //     setDragging(false);

// // // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // // //     try {
// // // // // // // //       if (d.kind === "trim") {
// // // // // // // //         const trimline = trimlinesRef.current[d.jaw];
// // // // // // // //         if (!trimline) return;
// // // // // // // //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// // // // // // // //         setMessage(result.message);
// // // // // // // //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// // // // // // // //       } else {
// // // // // // // //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //         if (!curve) return;
// // // // // // // //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // //         setMessage(result.message);
// // // // // // // //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage(`Could not save: ${err.message}`);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // //   const moveDrag = (point) => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     if (!d) return;

// // // // // // // //     // a point of the trimline
// // // // // // // //     if (d.kind === "trim") {
// // // // // // // //       const trimline = trimlinesRef.current[d.jaw];
// // // // // // // //       if (!trimline) return;

// // // // // // // //       d.moved = true;
// // // // // // // //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// // // // // // // //       setTrimlines(trimlinesRef.current);
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     // a LAT point of one tooth
// // // // // // // //     const current = latCurvesRef.current;
// // // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //     if (!curve) return;

// // // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // //     d.moved = true;

// // // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // //     latCurvesRef.current = {
// // // // // // // //       ...current,
// // // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // //     };
// // // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // // //   };

// // // // // // // //   // only the result of the selected step is shown, everything else is hidden
// // // // // // // // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // // // // // // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // // // // // // // const viewParts =
// // // // // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // // // // // // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // // // const setupWithGum = (jaw) => {
// // // // // // // // //   const teeth = setupParts[jaw];
// // // // // // // // //   if (!teeth) return null;
// // // // // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // // // // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // // // // // // // //   return [...gum, ...teeth];
// // // // // // // // // };
// // // // // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // // // // // // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // // // // // // // const wholeGum = useMemo(() => {
// // // // // // // //   const build = (parts) => {
// // // // // // // //     if (!parts) return null;
// // // // // // // //     const whole = parts.find(isWholePart);
// // // // // // // //     if (!whole) return null;
// // // // // // // //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// // // // // // // //     const geo = removeTeeth(whole.geo, teeth);
// // // // // // // //     return geo ? { name: "GumWithBase.stl", geo } : null;
// // // // // // // //   };
// // // // // // // //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // // // // // // // }, [segParts]);

// // // // // // // // // gum that follows the moved teeth (Automatic Setup result)
// // // // // // // // const deformedGum = useMemo(() => {
// // // // // // // //   const build = (jaw) => {
// // // // // // // //     const moved = setupParts[jaw];
// // // // // // // //     if (!moved || moved.some(isGumPart)) return null;
// // // // // // // //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// // // // // // // //     if (!base) return null;
// // // // // // // //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // // // // //     const geo = deformGum(base.geo, orig, moved);
// // // // // // // //     return geo ? { name: "GumDeformed.stl", geo } : null;
// // // // // // // //   };
// // // // // // // //   return { upper: build("upper"), lower: build("lower") };
// // // // // // // // }, [setupParts, segParts, wholeGum]);

// // // // // // // // const setupWithGum = (jaw) => {
// // // // // // // //   const teeth = setupParts[jaw];
// // // // // // // //   if (!teeth) return null;
// // // // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // // // //   // const gum = wholeGum[jaw]
// // // // // // // //   //   ? [wholeGum[jaw]]
// // // // // // // //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// // // // // // // //     const gum = deformedGum[jaw]
// // // // // // // //     ? [deformedGum[jaw]]
// // // // // // // //     : wholeGum[jaw]
// // // // // // // //     ? [wholeGum[jaw]]
// // // // // // // //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// // // // // // // //   return [...gum, ...teeth];
// // // // // // // // };
// // // // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // // // // // // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // // // // // // // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // // // // // // // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // // // // // // // const ghostParts = superimposeActive
// // // // // // // //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// // // // // // // //   : NO_PARTS;

// // // // // // // // const handleToggleSuperimpose = () => {
// // // // // // // //   if (busy) return;
// // // // // // // //   if (superimposeActive) {
// // // // // // // //     setShowSuperimpose(false);
// // // // // // // //   } else {
// // // // // // // //     setShowSuperimpose(true);
// // // // // // // //     setView("automaticSetup"); // Superimpose compares with the final position
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // const viewParts =
// // // // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupView : NO_PARTS;



// // // // // // // // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // // // // // // // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // // // // // // // const viewResults =
// // // // // // // //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// // // // // // // //   return (
// // // // // // // //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// // // // // // // //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// // // // // // // //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// // // // // // // //     <div
// // // // // // // //       ref={gridRef}
// // // // // // // //       style={{
// // // // // // // //         position: "absolute",
// // // // // // // //         top: BARS_HEIGHT,
// // // // // // // //         left: 0,
// // // // // // // //         right: 0,
// // // // // // // //         bottom: 0,
// // // // // // // //         zIndex: -1,
// // // // // // // //         pointerEvents: "none", // the mouse goes through to the model
// // // // // // // //         display: showGrid ? "block" : "none",
// // // // // // // //         backgroundImage: GRID_IMAGE,
// // // // // // // //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// // // // // // // //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// // // // // // // //       }}
// // // // // // // //     />
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // // //         onToolClick={handleToolClick}
// // // // // // // //         busy={busy}
// // // // // // // //         progress={progress}
// // // // // // // //         message={message}
// // // // // // // //         onAutomaticSetup={handleAutomaticSetup}
// // // // // // // //         onInitialPosition={handleInitialPosition}
// // // // // // // //         onFinalPosition={handleFinalPosition}
// // // // // // // //         showGrid={showGrid}
// // // // // // // //        onToggleGrid={() => setShowGrid((v) => !v)}
// // // // // // // //        gridSize={gridSize}
// // // // // // // //       onGridSizeChange={setGridSize}
// // // // // // // //       showSuperimpose={superimposeActive}
// // // // // // // // onToggleSuperimpose={handleToggleSuperimpose}
// // // // // // // //         setupReady={doneSteps.automaticSetup}
// // // // // // // //         view={view}
// // // // // // // //         onViewChange={handleViewChange}

// // // // // // // //       />

// // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           // upperParts={segParts.upper}
// // // // // // // //           upperParts={viewParts.upper}
// // // // // // // //           // lowerParts={segParts.lower}
// // // // // // // //           lowerParts={viewParts.lower}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           segVisible={segVisible}

// // // // // // // //           // trimlines={trimlines}
// // // // // // // //           trimlines={viewTrimlines}
// // // // // // // //           // resultMeshes={resultMeshes}
// // // // // // // //           resultMeshes={viewResults}
// // // // // // // //           // toothLabels={toothLabels}
// // // // // // // //           toothLabels={viewLabels}

// // // // // // // //           // latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // // // //           latCurves={viewCurves}
// // // // // // // //           dragging={dragging}
// // // // // // // //           onStartDrag={startDrag}
// // // // // // // //           onStartTrimDrag={startTrimDrag}
// // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // //           onEndDrag={endDrag}
// // // // // // // //           showNumbers={showNumbers}
// // // // // // // //           viewRequest={viewRequest}
// // // // // // // //           showGrid={showGrid}
// // // // // // // //           gridRef={gridRef}
// // // // // // // //           gridSize={gridSize}
// // // // // // // //           ghostParts={ghostParts}

// // // // // // // //         />

// // // // // // // //         <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //           // segmentedUpper={!!segParts.upper}
// // // // // // // //           // segmentedLower={!!segParts.lower}
// // // // // // // //           segmentedUpper={!!viewParts.upper}
// // // // // // // //           segmentedLower={!!viewParts.lower}
// // // // // // // //           segVisible={segVisible}
// // // // // // // //           onToggleSeg={toggleSeg}
// // // // // // // //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// // // // // // // //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// // // // // // // //            showNumbers={showNumbers}
// // // // // // // //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }









// // // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // // export default function App() {
// // // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // // // // // // //     setMessage("");

// // // // // // // // // // // // //     // send the file to the backend
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // // //       <TopBar
// // // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // // //         message={message}
// // // // // // // // // // // // //       />
// // // // // // // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }




// // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // export default function App() {
// // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // // // // // // //        setShowUpper(true);
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // // //       setLowerParts(null);
// // // // // // // // // // // //         setShowLower(true);
// // // // // // // // // // // //     }
// // // // // // // // // // // //     setMessage("");

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // // // // // // //     Promise.all(
// // // // // // // // // // // //       files.map(async (name) => {
// // // // // // // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // // // // // // //       })
// // // // // // // // // // // //     );

// // // // // // // // // // // //   const handleSegment = async () => {
// // // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     setBusy(true);
// // // // // // // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // // // // // // //       setMessage("Segmentation completed");
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setBusy(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // //       <TopBar
// // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // //         onSegment={handleSegment}
// // // // // // // // // // // //         busy={busy}
// // // // // // // // // // // //         message={message}
// // // // // // // // // // // //       />
// // // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // // //         <Viewer
// // // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // // //           upperParts={upperParts}
// // // // // // // // // // // //           lowerParts={lowerParts}
// // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // //         />

// // // // // // // // // // // //          <VisibilityButtons
// // // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // // //         />
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }











// // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // export default function App() {
// // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // //       setShowUpper(true);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // //       setShowLower(true);
// // // // // // // // // // //     }
// // // // // // // // // // //     setMessage("");

// // // // // // // // // // //     try {
// // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setBusy(true);
// // // // // // // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // // // // // // //       setMessage(result.message);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setBusy(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // the cutting step comes in a later phase
// // // // // // // // // // //   // const handleCutTeeth = () => {
// // // // // // // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // // // // // // //   // };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // //       <TopBar
// // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // // // // // // //         busy={busy}
// // // // // // // // // // //         message={message}
// // // // // // // // // // //       />

// // // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // //         <Viewer
// // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //         />

// // // // // // // // // // //         <VisibilityButtons
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // //         />
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }















// // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // export default function App() {
// // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // //       setShowUpper(true);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // //       setShowLower(true);
// // // // // // // // // // //     }
// // // // // // // // // // //     setMessage("");
// // // // // // // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // // // // // // //     try {
// // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // // //     // if (!upper.geo) {
// // // // // // // // // // //     //   setProgress(null);
// // // // // // // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // //     //   return;
// // // // // // // // // // //     // }

// // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // //      setProgress(null);
// // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // //       return;
// // // // // // // // // // //       }

// // // // // // // // // // //     setBusy(true);
// // // // // // // // // // //     setMessage("");
// // // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // // //     try {
// // // // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // // //       const started = await res.json();
// // // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // // // //       while (true) {
// // // // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // // // //         const job = await statusRes.json();

// // // // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // // // //         if (job.done) break;
// // // // // // // // // // //       }
// // // // // // // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setProgress(null);
// // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setBusy(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // //       <TopBar
// // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // // //         busy={busy}
// // // // // // // // // // //         progress={progress}
// // // // // // // // // // //         message={message}
// // // // // // // // // // //       />

// // // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // //         <Viewer
// // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //         />

// // // // // // // // // // //         <VisibilityButtons
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // //         />
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }







// // // // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // export default function App() {
// // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // // // // // // //   // dragging of one editable point
// // // // // // // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // //     if (type === "upper") {
// // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // //       setShowUpper(true);
// // // // // // // // // //     } else {
// // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // //       setShowLower(true);
// // // // // // // // // //     }
// // // // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress(null);

// // // // // // // // // //     try {
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append("file", file);
// // // // // // // // // //       formData.append("type", type);
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setBusy(true);
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // //     try {
// // // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // //       const started = await res.json();
// // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // // //       let job;
// // // // // // // // // //       while (true) {
// // // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // // //         job = await statusRes.json();

// // // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // // //         if (job.done) break;
// // // // // // // // // //       }

// // // // // // // // // //       // 3. download the CSV files and show them as splines
// // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // // // //       setLatCurves({
// // // // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // // // //       });

// // // // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage(err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setBusy(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // // // //     dragRef.current = { jaw, id, index };
// // // // // // // // // //     setDragging(true);
// // // // // // // // // //   };

// // // // // // // // // //   const endDrag = useCallback(() => {
// // // // // // // // // //     dragRef.current = null;
// // // // // // // // // //     setDragging(false);
// // // // // // // // // //   }, []);

// // // // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // // // //   const moveDrag = (point) => {
// // // // // // // // // //     const d = dragRef.current;
// // // // // // // // // //     if (!d) return;

// // // // // // // // // //     setLatCurves((prev) => ({
// // // // // // // // // //       ...prev,
// // // // // // // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // // // // // // //         curve.id === d.id
// // // // // // // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // // // // // // //           : curve
// // // // // // // // // //       ),
// // // // // // // // // //     }));
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // //       <TopBar
// // // // // // // // // //         upperName={upper.name}
// // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // //         busy={busy}
// // // // // // // // // //         progress={progress}
// // // // // // // // // //         message={message}
// // // // // // // // // //       />

// // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // //         <Viewer
// // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           latCurves={latCurves}
// // // // // // // // // //           dragging={dragging}
// // // // // // // // // //           onStartDrag={startDrag}
// // // // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // // // //           onEndDrag={endDrag}
// // // // // // // // // //         />

// // // // // // // // // //         <VisibilityButtons
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }











// // // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // // // //   latCurvesRef.current = latCurves;

// // // // // // // // //   // dragging of one editable point
// // // // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") {
// // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // //       setShowUpper(true);
// // // // // // // // //     } else {
// // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // //       setShowLower(true);
// // // // // // // // //     }
// // // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress(null);

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // // // //     while (true) {
// // // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // //       const res = await fetch(statusUrl);
// // // // // // // // //       const job = await res.json();

// // // // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // // // //       if (job.done) return job;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // //       const started = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // // // //       // download the CSV files and show them as splines
// // // // // // // // //       const stamp = Date.now();
// // // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // // //       setLatCurves({
// // // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // // //       });

// // // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // // // //       const started = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // // // //     setDragging(true);
// // // // // // // // //   };

// // // // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // // // //   const endDrag = useCallback(async () => {
// // // // // // // // //     const d = dragRef.current;
// // // // // // // // //     dragRef.current = null;
// // // // // // // // //     setDragging(false);

// // // // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // // //     if (!curve) return;

// // // // // // // // //     try {
// // // // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // // //       setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // // // //     }
// // // // // // // // //   }, []);

// // // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // // //   const moveDrag = (point) => {
// // // // // // // // //     const d = dragRef.current;
// // // // // // // // //     if (!d) return;

// // // // // // // // //     const current = latCurvesRef.current;
// // // // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // // //     if (!curve) return;

// // // // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // // //     d.moved = true;

// // // // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // // //     latCurvesRef.current = {
// // // // // // // // //       ...current,
// // // // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // // //     };
// // // // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // // // //         busy={busy}
// // // // // // // // //         progress={progress}
// // // // // // // // //         message={message}
// // // // // // // // //       />

// // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // //         <Viewer
// // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           latCurves={latCurves}
// // // // // // // // //           dragging={dragging}
// // // // // // // // //           onStartDrag={startDrag}
// // // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // // //           onEndDrag={endDrag}
// // // // // // // // //         />

// // // // // // // // //         <VisibilityButtons
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // //         />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }












// // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // // // const NO_CURVES = { upper: [], lower: [] };

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // // //   latCurvesRef.current = latCurves;

// // // // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // // // //   // dragging of one editable point
// // // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setShowLower(true);
// // // // // // // //     }
// // // // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress(null);

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // // //     while (true) {
// // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // //       const res = await fetch(statusUrl);
// // // // // // // //       const job = await res.json();

// // // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // // //       if (job.done) return job;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // // //       // download the CSV files and show them as splines
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // //       setLatCurves({
// // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // //       });
// // // // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // // // //       setShowSplines(true);

// // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // // //       // download the gum and teeth STL files and show them
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const stl = job.stlFiles || {};
// // // // // // // //       setSegParts({
// // // // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // // //       });

// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // // //     setDragging(true);
// // // // // // // //   };

// // // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // // //   const endDrag = useCallback(async () => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     dragRef.current = null;
// // // // // // // //     setDragging(false);

// // // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //     if (!curve) return;

// // // // // // // //     try {
// // // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // //       setMessage(result.message);
// // // // // // // //       setTimeout(() => setMessage(""), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // //   const moveDrag = (point) => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     if (!d) return;

// // // // // // // //     const current = latCurvesRef.current;
// // // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //     if (!curve) return;

// // // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // //     d.moved = true;

// // // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // //     latCurvesRef.current = {
// // // // // // // //       ...current,
// // // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // //     };
// // // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // // //         busy={busy}
// // // // // // // //         progress={progress}
// // // // // // // //         message={message}
// // // // // // // //       />

// // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           upperParts={segParts.upper}
// // // // // // // //           lowerParts={segParts.lower}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // // // //           dragging={dragging}
// // // // // // // //           onStartDrag={startDrag}
// // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // //           onEndDrag={endDrag}
// // // // // // // //         />

// // // // // // // //         <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

















// // // // // // // import { useCallback,useMemo, useRef, useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // import { removeTeeth } from "./gumUtils.js";
// // // // // // // import { deformGum } from "./gumDeform.js";
// // // // // // // import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";


// // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // // const NO_CURVES = { upper: [], lower: [] };
// // // // // // // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // // // // // // const NO_RESULT = { upper: null, lower: null };

// // // // // // // const NO_LABELS = { upper: [], lower: [] };
// // // // // // // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // // // // // // const BARS_HEIGHT = 88;
// // // // // // // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // // // // // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // // // // // // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // // // // // // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // // // // // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // // // // // // const GRID_IMAGE = [
// // // // // // //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // // ].join(", ");
// // // // // // // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // // // // // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // // // // // // const KEEP_OUTPUT_ON_UPLOAD = false;
// // // // // // // const NO_PARTS = { upper: null, lower: null };

  

// // // // // // // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // // // // // // when a step runs, only these steps become "not done" again
// // // // // // // const RESETS = {
// // // // // // //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// // // // // // //   generateTrimline: ["trimModel", "addBase"],
// // // // // // //   trimModel: ["addBase"],
// // // // // // //   addBase: [],
// // // // // // //   identifyLat: ["segment","automaticSetup"],
// // // // // // //   segment: ["automaticSetup"],
// // // // // // //     automaticSetup: [],
// // // // // // // };

// // // // // // // const NOT_DONE = {
// // // // // // //   cleanModel: false,
// // // // // // //   identifyLat: false,
// // // // // // //   segment: false,
// // // // // // //   generateTrimline: false,
// // // // // // //   trimModel: false,
// // // // // // //   addBase: false,
// // // // // // //   automaticSetup: false,
// // // // // // // };




// // // // // // // // button name used by the backend -> step name
// // // // // // // const COMMAND_TO_STEP = {
// // // // // // //   GenerateTrimline: "generateTrimline",
// // // // // // //   TrimModel: "trimModel",
// // // // // // //   AddBase: "addBase",
// // // // // // // };
// // // // // // // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // // // // // // step that must be finished before this step can run
// // // // // // // const REQUIRED_BEFORE = {
// // // // // // //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// // // // // // //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // // // // // // };



// // // // // // // // button text in the Clean Model tab -> command sent to the backend
// // // // // // // const NEW_EXE_COMMANDS = {
// // // // // // //   "Generate Trimline": "GenerateTrimline",
// // // // // // //   "Trim Model": "TrimModel",
// // // // // // //   "Add Base": "AddBase",
// // // // // // // };

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   // which buttons already produced a result
// // // // // // // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // // // // // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // // // // // // const [segmenterReady, setSegmenterReady] = useState(false);

// // // // // // // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // // // // // // marks a step as done and resets the steps after it
// // // // // // // // const markDone = (step) =>
// // // // // // // //   setDoneSteps((prev) => {
// // // // // // // //     const next = { ...prev };
// // // // // // // //     STEP_ORDER.forEach((s, i) => {
// // // // // // // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // // // // // // //     });
// // // // // // // //     next[step] = true;
// // // // // // // //     return next;
// // // // // // // //   });



// // // // // // // const markDone = (step) =>
// // // // // // //   setDoneSteps((prev) => {
// // // // // // //     const next = { ...prev };
// // // // // // //     RESETS[step].forEach((s) => (next[s] = false));
// // // // // // //     next[step] = true;
// // // // // // //     return next;
// // // // // // //   });

// // // // // // // // shows the alert and returns true if the step was already done
// // // // // // // // const alreadyDone = (step) => {
// // // // // // // //   if (doneSteps[step]) {
// // // // // // // //     alert(DONE_MESSAGES[step]);
// // // // // // // //     return true;
// // // // // // // //   }
// // // // // // // //   return false;
// // // // // // // // };


// // // // // // // // if the step is already done: show its stored result and do not run the exe again
// // // // // // // const showIfDone = (step) => {
// // // // // // //   if (doneSteps[step]) {
// // // // // // //     setView(step);
// // // // // // //     setMessage("");
// // // // // // //     return true;
// // // // // // //   }
// // // // // // //   return false;
// // // // // // // };

// // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // //   latCurvesRef.current = latCurves;

// // // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // // //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // // // // // // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// // // // // // //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// // // // // // //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// // // // // // //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// // // // // // //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// // // // // // //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// // // // // // //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // // // // // // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // // // // // // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // // // // // // which result is shown: "scan" or the name of a step
// // // // // // // const [view, setView] = useState("scan");

// // // // // // //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// // // // // // //   const trimlinesRef = useRef(trimlines);
// // // // // // //   trimlinesRef.current = trimlines;

// // // // // // //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// // // // // // //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// // // // // // //        const [showNumbers, setShowNumbers] = useState(true);
// // // // // // //        const [showGrid, setShowGrid] = useState(false);
// // // // // // //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // // // // // // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // // // // // // const [showSuperimpose, setShowSuperimpose] = useState(false);
// // // // // // // const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off

// // // // // // //        const [viewRequest, setViewRequest] = useState(null);



// // // // // // //   // dragging of one editable point
// // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setShowLower(true);
// // // // // // //     }
// // // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // // //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// // // // // // //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// // // // // // //     setSegVisible(ALL_VISIBLE);

// // // // // // //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // // // //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// // // // // // //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // // // //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// // // // // // //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// // // // // // //    setView("scan");
// // // // // // //    setShowSuperimpose(false);
// // // // // // //    setShowOcclusion(false);

// // // // // // //     setMessage("");
// // // // // // //     setDoneSteps(NOT_DONE);
// // // // // // //     setSegmenterReady(false);
// // // // // // //     setProgress(null);

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // //     while (true) {
// // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // //       const res = await fetch(statusUrl);
// // // // // // //       const job = await res.json();

// // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // //       if (job.done) return job;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // //   const handleIdentifyLat = async () => {
// // // // // // //     // if (alreadyDone("identifyLat")) return;
// // // // // // //     if (showIfDone("identifyLat")) return;
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
      
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // //       // download the CSV files and show them as splines
// // // // // // //       const stamp = Date.now();
// // // // // // //       const csv = job.csvFiles || {};
// // // // // // //       setLatCurves({
// // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // //       });
// // // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // // //       setToothLabels(NO_LABELS);
// // // // // // //       setSegVisible(ALL_VISIBLE);
// // // // // // //       setShowSplines(true);


// // // // // // //       // setTrimlines(NO_RESULT);
// // // // // // //       // setResultMeshes(NO_RESULT);
// // // // // // //       markDone("identifyLat");
// // // // // // //       setView("identifyLat");

// // // // // // //       setSegmenterReady(true);

// // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // //     // if (alreadyDone("segment")) return;
// // // // // // //     if (showIfDone("segment")) return;
// // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //      setShowNumbers(true);

// // // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // //       // download the gum and teeth STL files and show them
// // // // // // //       const stamp = Date.now();
// // // // // // //       const stl = job.stlFiles || {};
// // // // // // //       setSegParts({
// // // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // //       });
// // // // // // //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// // // // // // //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// // // // // // //       const numbers = job.numberFiles || {};
// // // // // // //       setToothLabels({
// // // // // // //         upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// // // // // // //         lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// // // // // // //       });
// // // // // // //       markDone("segment");
// // // // // // //       setView("segment");

// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };


// // // // // // //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// // // // // // //   // downloads one scan file from the backend again
// // // // // // //   const loadScan = async (jaw, fileName, stamp) => {
// // // // // // //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// // // // // // //     return parseStl(await res.arrayBuffer());
// // // // // // //   };

// // // // // // //   const handleCleanModel = async () => {
// // // // // // //     // if (alreadyDone("cleanModel")) return;
// // // // // // //     if (showIfDone("cleanModel")) return;
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // // // //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // // // //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// // // // // // //       const stamp = Date.now();
// // // // // // //       const upperGeo = await loadScan("upper", "Upper.stl", stamp);
// // // // // // //       const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
// // // // // // //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// // // // // // //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// // // // // // //       // old LAT curves and separated parts do not match the cleaned scans
// // // // // // //       // setLatCurves({ upper: [], lower: [] });
// // // // // // //       // setSegParts({ upper: null, lower: null });
// // // // // // //       // setSegVisible(ALL_VISIBLE);
// // // // // // //       // setShowSplines(true);


// // // // // // //             // old LAT curves do not match the cleaned scans
// // // // // // //       setLatCurves({ upper: [], lower: [] });
// // // // // // //       setShowSplines(true);


// // // // // // //       setTrimlines(NO_RESULT);
// // // // // // //       // setResultMeshes(NO_RESULT);
// // // // // // //       setTrimModelMeshes(NO_RESULT);
// // // // // // //       setBaseMeshes(NO_RESULT);

// // // // // // //       // setToothLabels(NO_LABELS);

// // // // // // //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// // // // // // //       // const stl = job.stlFiles || {};
// // // // // // //       // setSegParts({
// // // // // // //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // //       // });
// // // // // // //       // setSegVisible(ALL_VISIBLE);

// // // // // // //        setToothLabels(NO_LABELS);
// // // // // // //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// // // // // // //       setSegParts({ upper: null, lower: null });
// // // // // // //       setSegVisible(ALL_VISIBLE);
// // // // // // //       markDone("cleanModel");
// // // // // // //       setView("cleanModel");
// // // // // // //       setSegmenterReady(true);

// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // // // //   // const handleToolClick = (tool) => {
// // // // // // //   //   if (busy) return;
// // // // // // //   //   if (tool === "Clean Model") handleCleanModel();
// // // // // // //   // };



// // // // // // //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// // // // // // //   const runNewExeCommand = async (commandKey) => {
// // // // // // //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// // // // // // //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// // // // // // //   //   if (!segmenterReady) {
// // // // // // //   //  alert(NEED_SEGMENTER_MESSAGE);
// // // // // // //   //  return;
// // // // // // //   //  }

// // // // // // //   if (!segmenterReady) {
// // // // // // //   // the flag is false (for example after a refresh), so ask the backend about the real files
// // // // // // //   let ready = false;
// // // // // // //   try {
// // // // // // //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// // // // // // //     ready = (await res.json()).ready;
// // // // // // //   } catch (err) {
// // // // // // //     ready = false;
// // // // // // //   }
// // // // // // //   if (!ready) {
// // // // // // //     alert(NEED_SEGMENTER_MESSAGE);
// // // // // // //     return;
// // // // // // //   }
// // // // // // // }



// // // // // // //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// // // // // // //    if (required && !doneSteps[required.step]) {
// // // // // // //   alert(required.message);
// // // // // // //   return;
// // // // // // //   }
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // // // //       // console.log(`${commandKey} output files:`, job.report);



// // // // // // //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // // // //       console.log(`${commandKey} output files:`, job.report);

// // // // // // //       // show the result in the 3D view
// // // // // // //       const stamp = Date.now();
// // // // // // //       const missing = [];
// // // // // // //       for (const jaw of ["upper", "lower"]) {
// // // // // // //         const rel = job.files ? job.files[jaw] : null;
// // // // // // //         if (!rel) {
// // // // // // //           missing.push(jaw);
// // // // // // //           continue;
// // // // // // //         }
// // // // // // //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// // // // // // //         // if (commandKey === "GenerateTrimline") {
// // // // // // //         //   const points = await loadPointsFile(url);
// // // // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// // // // // // //         // } else {

// // // // // // //         //   if (commandKey === "GenerateTrimline") {
// // // // // // //         //   const points = await loadPointsFile(url);
// // // // // // //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// // // // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// // // // // // //         // } else {
// // // // // // //         //   const geo = await loadStlFile(url);
// // // // // // //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// // // // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// // // // // // //         // }


// // // // // // //           if (commandKey === "GenerateTrimline") {
// // // // // // //      const points = await loadPointsFile(url);
// // // // // // //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // // // //     } else {
// // // // // // //     const geo = await loadStlFile(url);
// // // // // // //     if (commandKey === "TrimModel") {
// // // // // // //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// // // // // // //    } else {
// // // // // // //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// // // // // // //   }
// // // // // // // }


// // // // // // //       }

// // // // // // //       // if (missing.length > 0) {
// // // // // // //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // // // //       // }

// // // // // // //       if (missing.length > 0) {
// // // // // // //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // // // //    } else {
// // // // // // //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// // // // // // //      setView(COMMAND_TO_STEP[commandKey]);
// // // // // // //    }


// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // // // ---------------- Automatic Setup button ----------------
// // // // // // // // const handleAutomaticSetup = async () => {
// // // // // // // //   if (busy) return;

// // // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // // // // // // //     return;
// // // // // // // //   }
// // // // // // // //   if (!doneSteps.segment) {
// // // // // // // //     alert("Please do Segment first.");
// // // // // // // //     return;
// // // // // // // //   }

// // // // // // // //   setBusy(true);
// // // // // // // //   setMessage("");
// // // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //   try {
// // // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // // //     const started = await res.json();
// // // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // // // // // // //     // the files made by the exe (also printed in the backend terminal)
// // // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // // //     markDone("automaticSetup");
// // // // // // // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // // //   } catch (err) {
// // // // // // // //     setProgress(null);
// // // // // // // //     setMessage(err.message);
// // // // // // // //   } finally {
// // // // // // // //     setBusy(false);
// // // // // // // //   }
// // // // // // // // };




// // // // // // // // const handleAutomaticSetup = async () => {
// // // // // // // //   if (busy) return;

// // // // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // // //     setView("automaticSetup");
// // // // // // // //     setMessage("");
// // // // // // // //     return;
// // // // // // // //   }
// // // // // // // //   if (!doneSteps.segment) {
// // // // // // // //     alert("Please do Segment first.");
// // // // // // // //     return;
// // // // // // // //   }

// // // // // // // //   setBusy(true);
// // // // // // // //   setMessage("");
// // // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //   try {
// // // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // // //     const started = await res.json();
// // // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // // //     // download the STL files that the exe made, for each jaw
// // // // // // // //     const stamp = Date.now();
// // // // // // // //     const parts = { upper: [], lower: [] };
// // // // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // // // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // // // // // // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // // // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // // // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // // // // // // //     }

// // // // // // // //     markDone("automaticSetup");

// // // // // // // //     if (parts.upper.length + parts.lower.length === 0) {
// // // // // // // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // // // // // // //     } else {
// // // // // // // //       setSetupParts({
// // // // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // // // //       });
// // // // // // // //       setView("automaticSetup");
// // // // // // // //     }

// // // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // // //   } catch (err) {
// // // // // // // //     setProgress(null);
// // // // // // // //     setMessage(err.message);
// // // // // // // //   } finally {
// // // // // // // //     setBusy(false);
// // // // // // // //   }
// // // // // // // // };


// // // // // // // const handleAutomaticSetup = async () => {
// // // // // // //   if (busy) return;

// // // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // //     setView("automaticSetup");
// // // // // // //     setMessage("");
// // // // // // //     return;
// // // // // // //   }
// // // // // // //   if (!doneSteps.segment) {
// // // // // // //     alert("Please do Segment first.");
// // // // // // //     return;
// // // // // // //   }

// // // // // // //   setBusy(true);
// // // // // // //   setMessage("");
// // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // //   try {
// // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // //     const started = await res.json();
// // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // //     // download the tooth STL files that the exe made, for each jaw
// // // // // // //     const stamp = Date.now();
// // // // // // //     const parts = { upper: [], lower: [] };
// // // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // // //       const fileName = rel.split("/").pop();

// // // // // // //       // only tooth files like 11_final.stl (this skips all_final.stl)
// // // // // // //       const m = fileName.match(/^(\d)(\d)_final\.stl$/i);
// // // // // // //       if (!m) continue;

// // // // // // //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// // // // // // //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";

// // // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // // //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// // // // // // //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo });
// // // // // // //     }

// // // // // // //     if (parts.upper.length + parts.lower.length > 0) {
// // // // // // //       setSetupParts({
// // // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // // //       });
// // // // // // //       markDone("automaticSetup");
// // // // // // //       setView("automaticSetup");
// // // // // // //     } else {
// // // // // // //       console.warn("Automatic Setup made no STL files to show:", job.files);
// // // // // // //     }

// // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // //   } catch (err) {
// // // // // // //     setProgress(null);
// // // // // // //     setMessage(err.message);
// // // // // // //   } finally {
// // // // // // //     setBusy(false);
// // // // // // //   }
// // // // // // // };


// // // // // // // // Initial Position: the Segment result (no exe is called)
// // // // // // // const handleInitialPosition = () => {
// // // // // // //   if (busy) return;
// // // // // // //   setView("segment");
// // // // // // //   setMessage("");
// // // // // // // };

// // // // // // // // Final Position: the Automatic Setup result (no exe is called)
// // // // // // // const handleFinalPosition = () => {
// // // // // // //   if (busy) return;
// // // // // // //   setView("automaticSetup");
// // // // // // //   setMessage("");
// // // // // // // };

// // // // // // //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// // // // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // // // //   const handleToolClick = (tool) => {
// // // // // // //     if (busy) return;
// // // // // // //     if (tool === "Clean Model") handleCleanModel();
// // // // // // //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// // // // // // //   };

















// // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // //   // const startDrag = (jaw, id, index) => {
// // // // // // //   //   dragRef.current = { jaw, id, index, moved: false };
// // // // // // //   //   setDragging(true);
// // // // // // //   // };

// // // // // // //   // // when the mouse button is released: save the edited curve to its csv file
// // // // // // //   // const endDrag = useCallback(async () => {
// // // // // // //   //   const d = dragRef.current;
// // // // // // //   //   dragRef.current = null;
// // // // // // //   //   setDragging(false);

// // // // // // //   //   if (!d || !d.moved) return; // nothing was changed

// // // // // // //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // //   //   if (!curve) return;

// // // // // // //   //   try {
// // // // // // //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // //   //     setMessage(result.message);
// // // // // // //   //     setTimeout(()=>setMessage(""),2000);
// // // // // // //   //   } catch (err) {
// // // // // // //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // //   //   }
// // // // // // //   // }, []);

// // // // // // //   // // moves the dragged point to the surface point under the mouse
// // // // // // //   // const moveDrag = (point) => {
// // // // // // //   //   const d = dragRef.current;
// // // // // // //   //   if (!d) return;

// // // // // // //   //   const current = latCurvesRef.current;
// // // // // // //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // //   //   if (!curve) return;

// // // // // // //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // //   //   d.moved = true;

// // // // // // //   //   // update the ref at once, so a save right after the last move uses the newest points
// // // // // // //   //   latCurvesRef.current = {
// // // // // // //   //     ...current,
// // // // // // //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // //   //   };
// // // // // // //   //   setLatCurves(latCurvesRef.current);
// // // // // // //   // };


// // // // // // //     // ---------------- editing of the splines and of the trimline ----------------
// // // // // // //   // a LAT point of one tooth
// // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// // // // // // //     setDragging(true);
// // // // // // //   };

// // // // // // //   // a point of the trimline
// // // // // // //   const startTrimDrag = (jaw, index) => {
// // // // // // //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// // // // // // //     setDragging(true);
// // // // // // //   };

// // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // //   const endDrag = useCallback(async () => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     dragRef.current = null;
// // // // // // //     setDragging(false);

// // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // //     try {
// // // // // // //       if (d.kind === "trim") {
// // // // // // //         const trimline = trimlinesRef.current[d.jaw];
// // // // // // //         if (!trimline) return;
// // // // // // //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// // // // // // //         setMessage(result.message);
// // // // // // //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// // // // // // //       } else {
// // // // // // //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // //         if (!curve) return;
// // // // // // //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // //         setMessage(result.message);
// // // // // // //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       setMessage(`Could not save: ${err.message}`);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // //   const moveDrag = (point) => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     if (!d) return;

// // // // // // //     // a point of the trimline
// // // // // // //     if (d.kind === "trim") {
// // // // // // //       const trimline = trimlinesRef.current[d.jaw];
// // // // // // //       if (!trimline) return;

// // // // // // //       d.moved = true;
// // // // // // //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// // // // // // //       setTrimlines(trimlinesRef.current);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     // a LAT point of one tooth
// // // // // // //     const current = latCurvesRef.current;
// // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // //     if (!curve) return;

// // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // //     d.moved = true;

// // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // //     latCurvesRef.current = {
// // // // // // //       ...current,
// // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // //     };
// // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // //   };

// // // // // // //   // only the result of the selected step is shown, everything else is hidden
// // // // // // // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // // // // // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // // // // // // const viewParts =
// // // // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // // // // // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // // const setupWithGum = (jaw) => {
// // // // // // // //   const teeth = setupParts[jaw];
// // // // // // // //   if (!teeth) return null;
// // // // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // // // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // // // // // // //   return [...gum, ...teeth];
// // // // // // // // };
// // // // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // // // // // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // // // // // // const wholeGum = useMemo(() => {
// // // // // // //   const build = (parts) => {
// // // // // // //     if (!parts) return null;
// // // // // // //     const whole = parts.find(isWholePart);
// // // // // // //     if (!whole) return null;
// // // // // // //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// // // // // // //     const geo = removeTeeth(whole.geo, teeth);
// // // // // // //     return geo ? { name: "GumWithBase.stl", geo } : null;
// // // // // // //   };
// // // // // // //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // // // // // // }, [segParts]);

// // // // // // // // gum that follows the moved teeth (Automatic Setup result)
// // // // // // // const deformedGum = useMemo(() => {
// // // // // // //   const build = (jaw) => {
// // // // // // //     const moved = setupParts[jaw];
// // // // // // //     if (!moved || moved.some(isGumPart)) return null;
// // // // // // //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// // // // // // //     if (!base) return null;
// // // // // // //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // // // //     const geo = deformGum(base.geo, orig, moved);
// // // // // // //     return geo ? { name: "GumDeformed.stl", geo } : null;
// // // // // // //   };
// // // // // // //   return { upper: build("upper"), lower: build("lower") };
// // // // // // // }, [setupParts, segParts, wholeGum]);

// // // // // // // const setupWithGum = (jaw) => {
// // // // // // //   const teeth = setupParts[jaw];
// // // // // // //   if (!teeth) return null;
// // // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // // //   // const gum = wholeGum[jaw]
// // // // // // //   //   ? [wholeGum[jaw]]
// // // // // // //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// // // // // // //     const gum = deformedGum[jaw]
// // // // // // //     ? [deformedGum[jaw]]
// // // // // // //     : wholeGum[jaw]
// // // // // // //     ? [wholeGum[jaw]]
// // // // // // //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// // // // // // //   return [...gum, ...teeth];
// // // // // // // };
// // // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // // // // // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // // // // // // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // // // // // // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // // // // // // const ghostParts = superimposeActive
// // // // // // //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// // // // // // //   : NO_PARTS;

// // // // // // // const handleToggleSuperimpose = () => {
// // // // // // //   if (busy) return;
// // // // // // //   if (superimposeActive) {
// // // // // // //     setShowSuperimpose(false);
// // // // // // //   } else {
// // // // // // //     setShowSuperimpose(true);
// // // // // // //     setView("automaticSetup"); // Superimpose compares with the final position
// // // // // // //   }
// // // // // // // };

// // // // // // // const viewParts =
// // // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupView : NO_PARTS;

// // // // // // // // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // // // // // // // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// // // // // // // const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // // // // const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// // // // // // // const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// // // // // // // const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // // // // // // // measured once per result (it takes a moment on big scans), not on every render
// // // // // // // const occlusion = useMemo(() => {
// // // // // // //   if (!occlusionActive) return null;
// // // // // // //   try {
// // // // // // //     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Occlusion failed:", err);
// // // // // // //     return null;
// // // // // // //   }
// // // // // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // // }, [occlusionActive, occlusionSource]);

// // // // // // // const handleToggleOcclusion = () => {
// // // // // // //   if (busy) return;
// // // // // // //   if (occlusionActive) {
// // // // // // //     setShowOcclusion(false);
// // // // // // //     return;
// // // // // // //   }
// // // // // // //   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
// // // // // // //   if (occlusionSource && hasBothJaws(occlusionSource)) {
// // // // // // //     // nothing to change
// // // // // // //   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
// // // // // // //     setView("automaticSetup");
// // // // // // //   } else if (hasBothJaws(segParts)) {
// // // // // // //     setView("segment");
// // // // // // //   } else {
// // // // // // //     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
// // // // // // //     return;
// // // // // // //   }
// // // // // // //   setShowOcclusion(true);
// // // // // // // };



// // // // // // // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // // // // // // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // // // // // // const viewResults =
// // // // // // //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// // // // // // //   return (
// // // // // // //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// // // // // // //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// // // // // // //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// // // // // // //     <div
// // // // // // //       ref={gridRef}
// // // // // // //       style={{
// // // // // // //         position: "absolute",
// // // // // // //         top: BARS_HEIGHT,
// // // // // // //         left: 0,
// // // // // // //         right: 0,
// // // // // // //         bottom: 0,
// // // // // // //         zIndex: -1,
// // // // // // //         pointerEvents: "none", // the mouse goes through to the model
// // // // // // //         display: showGrid ? "block" : "none",
// // // // // // //         backgroundImage: GRID_IMAGE,
// // // // // // //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// // // // // // //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// // // // // // //       }}
// // // // // // //     />
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // //         onToolClick={handleToolClick}
// // // // // // //         busy={busy}
// // // // // // //         progress={progress}
// // // // // // //         message={message}
// // // // // // //         onAutomaticSetup={handleAutomaticSetup}
// // // // // // //         onInitialPosition={handleInitialPosition}
// // // // // // //         onFinalPosition={handleFinalPosition}
// // // // // // //         showGrid={showGrid}
// // // // // // //        onToggleGrid={() => setShowGrid((v) => !v)}
// // // // // // //        gridSize={gridSize}
// // // // // // //       onGridSizeChange={setGridSize}
// // // // // // //       showSuperimpose={superimposeActive}
// // // // // // // onToggleSuperimpose={handleToggleSuperimpose}
// // // // // // //       showOcclusion={occlusionActive}
// // // // // // //       onToggleOcclusion={handleToggleOcclusion}
// // // // // // //         setupReady={doneSteps.automaticSetup}
// // // // // // //         view={view}
// // // // // // //         onViewChange={handleViewChange}

// // // // // // //       />

// // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           // upperParts={segParts.upper}
// // // // // // //           upperParts={viewParts.upper}
// // // // // // //           // lowerParts={segParts.lower}
// // // // // // //           lowerParts={viewParts.lower}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           segVisible={segVisible}

// // // // // // //           // trimlines={trimlines}
// // // // // // //           trimlines={viewTrimlines}
// // // // // // //           // resultMeshes={resultMeshes}
// // // // // // //           resultMeshes={viewResults}
// // // // // // //           // toothLabels={toothLabels}
// // // // // // //           toothLabels={viewLabels}

// // // // // // //           // latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // // //           latCurves={viewCurves}
// // // // // // //           dragging={dragging}
// // // // // // //           onStartDrag={startDrag}
// // // // // // //           onStartTrimDrag={startTrimDrag}
// // // // // // //           onMoveDrag={moveDrag}
// // // // // // //           onEndDrag={endDrag}
// // // // // // //           showNumbers={showNumbers}
// // // // // // //           viewRequest={viewRequest}
// // // // // // //           showGrid={showGrid}
// // // // // // //           gridRef={gridRef}
// // // // // // //           gridSize={gridSize}
// // // // // // //           ghostParts={ghostParts}
// // // // // // //           occlusion={occlusion}

// // // // // // //         />

// // // // // // //         {/* Occlusion color scale: 0 mm (touching) at the bottom, 1.2 mm at the top */}
// // // // // // //         {occlusion && <OcclusionLegend />}

// // // // // // //         <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //           // segmentedUpper={!!segParts.upper}
// // // // // // //           // segmentedLower={!!segParts.lower}
// // // // // // //           segmentedUpper={!!viewParts.upper}
// // // // // // //           segmentedLower={!!viewParts.lower}
// // // // // // //           segVisible={segVisible}
// // // // // // //           onToggleSeg={toggleSeg}
// // // // // // //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// // // // // // //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// // // // // // //            showNumbers={showNumbers}
// // // // // // //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // // // ---------------- Occlusion legend: the color bar on the right side ----------------
// // // // // // // const LEGEND_BAR_HEIGHT = 200;

// // // // // // // function OcclusionLegend() {
// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       style={{
// // // // // // //         position: "absolute",
// // // // // // //         right: 204,
// // // // // // //         top: "50%",
// // // // // // //         transform: "translateY(-50%)",
// // // // // // //         display: "flex",
// // // // // // //         flexDirection: "column",
// // // // // // //         alignItems: "center",
// // // // // // //         fontSize: 11,
// // // // // // //         color: "#ffffff",
// // // // // // //         pointerEvents: "none",
// // // // // // //         userSelect: "none",
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             display: "flex",
// // // // // // //             flexDirection: "column",
// // // // // // //             justifyContent: "space-between",
// // // // // // //             textAlign: "right",
// // // // // // //             margin: "-7px 0", // centers each number on its line
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {OCCLUSION_TICKS.map((t) => (
// // // // // // //             <span key={t}>{t.toFixed(2)}</span>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //         <div style={{ width: 16, borderRadius: 2, background: occlusionGradientCss() }} />
// // // // // // //       </div>
// // // // // // //       <div style={{ marginTop: 10 }}>mm</div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }




// // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // // export default function App() {
// // // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // // // // // //     setMessage("");

// // // // // // // // // // // //     // send the file to the backend
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // // //       <TopBar
// // // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // // //         message={message}
// // // // // // // // // // // //       />
// // // // // // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }




// // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // export default function App() {
// // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // //     if (type === "upper") {
// // // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // // // // // //        setShowUpper(true);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // // //       setLowerParts(null);
// // // // // // // // // // //         setShowLower(true);
// // // // // // // // // // //     }
// // // // // // // // // // //     setMessage("");

// // // // // // // // // // //     try {
// // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // // // // // //     Promise.all(
// // // // // // // // // // //       files.map(async (name) => {
// // // // // // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // // // // // //       })
// // // // // // // // // // //     );

// // // // // // // // // // //   const handleSegment = async () => {
// // // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setBusy(true);
// // // // // // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // // // // // //       setMessage("Segmentation completed");
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage(err.message);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setBusy(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // //       <TopBar
// // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // //         onSegment={handleSegment}
// // // // // // // // // // //         busy={busy}
// // // // // // // // // // //         message={message}
// // // // // // // // // // //       />
// // // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // // //         <Viewer
// // // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // // //           upperParts={upperParts}
// // // // // // // // // // //           lowerParts={lowerParts}
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //         />

// // // // // // // // // // //          <VisibilityButtons
// // // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // // //           showLower={showLower}
// // // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // // //         />
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }











// // // // // // // // // // import { useState } from "react";
// // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // export default function App() {
// // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // //     if (type === "upper") {
// // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // //       setShowUpper(true);
// // // // // // // // // //     } else {
// // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // //       setShowLower(true);
// // // // // // // // // //     }
// // // // // // // // // //     setMessage("");

// // // // // // // // // //     try {
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append("file", file);
// // // // // // // // // //       formData.append("type", type);
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setBusy(true);
// // // // // // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // // // // // //       setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage(err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setBusy(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // the cutting step comes in a later phase
// // // // // // // // // //   // const handleCutTeeth = () => {
// // // // // // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // // // // // //   // };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // //       <TopBar
// // // // // // // // // //         upperName={upper.name}
// // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // // // // // //         busy={busy}
// // // // // // // // // //         message={message}
// // // // // // // // // //       />

// // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // //         <Viewer
// // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //         />

// // // // // // // // // //         <VisibilityButtons
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }















// // // // // // // // // // import { useState } from "react";
// // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // export default function App() {
// // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // //     if (type === "upper") {
// // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // //       setShowUpper(true);
// // // // // // // // // //     } else {
// // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // //       setShowLower(true);
// // // // // // // // // //     }
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // // // // // //     try {
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append("file", file);
// // // // // // // // // //       formData.append("type", type);
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // // //     // if (!upper.geo) {
// // // // // // // // // //     //   setProgress(null);
// // // // // // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // //     //   return;
// // // // // // // // // //     // }

// // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // //      setProgress(null);
// // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // //       return;
// // // // // // // // // //       }

// // // // // // // // // //     setBusy(true);
// // // // // // // // // //     setMessage("");
// // // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // // //     try {
// // // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // // //       const started = await res.json();
// // // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // // //       while (true) {
// // // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // // //         const job = await statusRes.json();

// // // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // // //         if (job.done) break;
// // // // // // // // // //       }
// // // // // // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setProgress(null);
// // // // // // // // // //       setMessage(err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setBusy(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // //       <TopBar
// // // // // // // // // //         upperName={upper.name}
// // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // // //         busy={busy}
// // // // // // // // // //         progress={progress}
// // // // // // // // // //         message={message}
// // // // // // // // // //       />

// // // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // //         <Viewer
// // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //         />

// // // // // // // // // //         <VisibilityButtons
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }







// // // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // // // // // //   // dragging of one editable point
// // // // // // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") {
// // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // //       setShowUpper(true);
// // // // // // // // //     } else {
// // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // //       setShowLower(true);
// // // // // // // // //     }
// // // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress(null);

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //     try {
// // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // //       const started = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // //       let job;
// // // // // // // // //       while (true) {
// // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // //         job = await statusRes.json();

// // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // //         if (job.done) break;
// // // // // // // // //       }

// // // // // // // // //       // 3. download the CSV files and show them as splines
// // // // // // // // //       const stamp = Date.now();
// // // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // // //       setLatCurves({
// // // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // // //       });

// // // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // // //     dragRef.current = { jaw, id, index };
// // // // // // // // //     setDragging(true);
// // // // // // // // //   };

// // // // // // // // //   const endDrag = useCallback(() => {
// // // // // // // // //     dragRef.current = null;
// // // // // // // // //     setDragging(false);
// // // // // // // // //   }, []);

// // // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // // //   const moveDrag = (point) => {
// // // // // // // // //     const d = dragRef.current;
// // // // // // // // //     if (!d) return;

// // // // // // // // //     setLatCurves((prev) => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // // // // // //         curve.id === d.id
// // // // // // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // // // // // //           : curve
// // // // // // // // //       ),
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // //         busy={busy}
// // // // // // // // //         progress={progress}
// // // // // // // // //         message={message}
// // // // // // // // //       />

// // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // //         <Viewer
// // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           latCurves={latCurves}
// // // // // // // // //           dragging={dragging}
// // // // // // // // //           onStartDrag={startDrag}
// // // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // // //           onEndDrag={endDrag}
// // // // // // // // //         />

// // // // // // // // //         <VisibilityButtons
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // //         />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }











// // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // // //   latCurvesRef.current = latCurves;

// // // // // // // //   // dragging of one editable point
// // // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setShowLower(true);
// // // // // // // //     }
// // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress(null);

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // // //     while (true) {
// // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // //       const res = await fetch(statusUrl);
// // // // // // // //       const job = await res.json();

// // // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // // //       if (job.done) return job;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // // //       // download the CSV files and show them as splines
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // //       setLatCurves({
// // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // //       });

// // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // // //     setDragging(true);
// // // // // // // //   };

// // // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // // //   const endDrag = useCallback(async () => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     dragRef.current = null;
// // // // // // // //     setDragging(false);

// // // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //     if (!curve) return;

// // // // // // // //     try {
// // // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // // //       setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // //   const moveDrag = (point) => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     if (!d) return;

// // // // // // // //     const current = latCurvesRef.current;
// // // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // // //     if (!curve) return;

// // // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // // //     d.moved = true;

// // // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // // //     latCurvesRef.current = {
// // // // // // // //       ...current,
// // // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // // //     };
// // // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // // //         busy={busy}
// // // // // // // //         progress={progress}
// // // // // // // //         message={message}
// // // // // // // //       />

// // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           latCurves={latCurves}
// // // // // // // //           dragging={dragging}
// // // // // // // //           onStartDrag={startDrag}
// // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // //           onEndDrag={endDrag}
// // // // // // // //         />

// // // // // // // //         <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }












// // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // // const NO_CURVES = { upper: [], lower: [] };

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // //   latCurvesRef.current = latCurves;

// // // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // // //   // dragging of one editable point
// // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setShowLower(true);
// // // // // // //     }
// // // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // // //     setMessage("");
// // // // // // //     setProgress(null);

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // //     while (true) {
// // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // //       const res = await fetch(statusUrl);
// // // // // // //       const job = await res.json();

// // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // //       if (job.done) return job;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // //   const handleIdentifyLat = async () => {
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // //       // download the CSV files and show them as splines
// // // // // // //       const stamp = Date.now();
// // // // // // //       const csv = job.csvFiles || {};
// // // // // // //       setLatCurves({
// // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // //       });
// // // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // // //       setShowSplines(true);

// // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // //       // download the gum and teeth STL files and show them
// // // // // // //       const stamp = Date.now();
// // // // // // //       const stl = job.stlFiles || {};
// // // // // // //       setSegParts({
// // // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // // //       });

// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // //     setDragging(true);
// // // // // // //   };

// // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // //   const endDrag = useCallback(async () => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     dragRef.current = null;
// // // // // // //     setDragging(false);

// // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // //     if (!curve) return;

// // // // // // //     try {
// // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // //       setMessage(result.message);
// // // // // // //       setTimeout(() => setMessage(""), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // //   const moveDrag = (point) => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     if (!d) return;

// // // // // // //     const current = latCurvesRef.current;
// // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // //     if (!curve) return;

// // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // //     d.moved = true;

// // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // //     latCurvesRef.current = {
// // // // // // //       ...current,
// // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // //     };
// // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // //         busy={busy}
// // // // // // //         progress={progress}
// // // // // // //         message={message}
// // // // // // //       />

// // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           upperParts={segParts.upper}
// // // // // // //           lowerParts={segParts.lower}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // // //           dragging={dragging}
// // // // // // //           onStartDrag={startDrag}
// // // // // // //           onMoveDrag={moveDrag}
// // // // // // //           onEndDrag={endDrag}
// // // // // // //         />

// // // // // // //         <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

















// // // // // // import { useCallback,useMemo, useRef, useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // import { removeTeeth } from "./gumUtils.js";
// // // // // // import { deformGum } from "./gumDeform.js";
// // // // // // import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";


// // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // const NO_CURVES = { upper: [], lower: [] };
// // // // // // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // // // // // const NO_RESULT = { upper: null, lower: null };

// // // // // // const NO_LABELS = { upper: [], lower: [] };
// // // // // // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // // // // // const BARS_HEIGHT = 88;
// // // // // // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // // // // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // // // // // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // // // // // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // // // // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // // // // // const GRID_IMAGE = [
// // // // // //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // // ].join(", ");
// // // // // // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // // // // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // // // // // const KEEP_OUTPUT_ON_UPLOAD = false;
// // // // // // const NO_PARTS = { upper: null, lower: null };

  

// // // // // // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // // // // // when a step runs, only these steps become "not done" again
// // // // // // const RESETS = {
// // // // // //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// // // // // //   generateTrimline: ["trimModel", "addBase"],
// // // // // //   trimModel: ["addBase"],
// // // // // //   addBase: [],
// // // // // //   identifyLat: ["segment","automaticSetup"],
// // // // // //   segment: ["automaticSetup"],
// // // // // //     automaticSetup: [],
// // // // // // };

// // // // // // const NOT_DONE = {
// // // // // //   cleanModel: false,
// // // // // //   identifyLat: false,
// // // // // //   segment: false,
// // // // // //   generateTrimline: false,
// // // // // //   trimModel: false,
// // // // // //   addBase: false,
// // // // // //   automaticSetup: false,
// // // // // // };




// // // // // // // button name used by the backend -> step name
// // // // // // const COMMAND_TO_STEP = {
// // // // // //   GenerateTrimline: "generateTrimline",
// // // // // //   TrimModel: "trimModel",
// // // // // //   AddBase: "addBase",
// // // // // // };
// // // // // // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // // // // // step that must be finished before this step can run
// // // // // // const REQUIRED_BEFORE = {
// // // // // //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// // // // // //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // // // // // };



// // // // // // // button text in the Clean Model tab -> command sent to the backend
// // // // // // const NEW_EXE_COMMANDS = {
// // // // // //   "Generate Trimline": "GenerateTrimline",
// // // // // //   "Trim Model": "TrimModel",
// // // // // //   "Add Base": "AddBase",
// // // // // // };

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   // which buttons already produced a result
// // // // // // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // // // // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // // // // // const [segmenterReady, setSegmenterReady] = useState(false);

// // // // // // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // // // // // marks a step as done and resets the steps after it
// // // // // // // const markDone = (step) =>
// // // // // // //   setDoneSteps((prev) => {
// // // // // // //     const next = { ...prev };
// // // // // // //     STEP_ORDER.forEach((s, i) => {
// // // // // // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // // // // // //     });
// // // // // // //     next[step] = true;
// // // // // // //     return next;
// // // // // // //   });



// // // // // // const markDone = (step) =>
// // // // // //   setDoneSteps((prev) => {
// // // // // //     const next = { ...prev };
// // // // // //     RESETS[step].forEach((s) => (next[s] = false));
// // // // // //     next[step] = true;
// // // // // //     return next;
// // // // // //   });

// // // // // // // shows the alert and returns true if the step was already done
// // // // // // // const alreadyDone = (step) => {
// // // // // // //   if (doneSteps[step]) {
// // // // // // //     alert(DONE_MESSAGES[step]);
// // // // // // //     return true;
// // // // // // //   }
// // // // // // //   return false;
// // // // // // // };


// // // // // // // if the step is already done: show its stored result and do not run the exe again
// // // // // // const showIfDone = (step) => {
// // // // // //   if (doneSteps[step]) {
// // // // // //     setView(step);
// // // // // //     setMessage("");
// // // // // //     return true;
// // // // // //   }
// // // // // //   return false;
// // // // // // };

// // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // //   latCurvesRef.current = latCurves;

// // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // // // // // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// // // // // //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// // // // // //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// // // // // //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// // // // // //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// // // // // //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// // // // // //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // // // // // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // // // // // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // // // // // which result is shown: "scan" or the name of a step
// // // // // // const [view, setView] = useState("scan");

// // // // // //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// // // // // //   const trimlinesRef = useRef(trimlines);
// // // // // //   trimlinesRef.current = trimlines;

// // // // // //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// // // // // //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// // // // // //        const [showNumbers, setShowNumbers] = useState(true);
// // // // // //        const [showGrid, setShowGrid] = useState(false);
// // // // // //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // // // // // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // // // // // const [showSuperimpose, setShowSuperimpose] = useState(false);
// // // // // // const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off

// // // // // //        const [viewRequest, setViewRequest] = useState(null);



// // // // // //   // dragging of one editable point
// // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // //   const [dragging, setDragging] = useState(false);

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setShowLower(true);
// // // // // //     }
// // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// // // // // //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// // // // // //     setSegVisible(ALL_VISIBLE);

// // // // // //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // // //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// // // // // //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // // //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// // // // // //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// // // // // //    setView("scan");
// // // // // //    setShowSuperimpose(false);
// // // // // //    setShowOcclusion(false);

// // // // // //     setMessage("");
// // // // // //     setDoneSteps(NOT_DONE);
// // // // // //     setSegmenterReady(false);
// // // // // //     setProgress(null);

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   // asks the backend for the progress every second until the job is done
// // // // // //   const waitForJob = async (statusUrl) => {
// // // // // //     while (true) {
// // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // //       const res = await fetch(statusUrl);
// // // // // //       const job = await res.json();

// // // // // //       if (job.error) throw new Error(job.error);
// // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // //       if (job.done) return job;
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- Identify LAT button ----------------
// // // // // //   const handleIdentifyLat = async () => {
// // // // // //     // if (alreadyDone("identifyLat")) return;
// // // // // //     if (showIfDone("identifyLat")) return;
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
      
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // //       // download the CSV files and show them as splines
// // // // // //       const stamp = Date.now();
// // // // // //       const csv = job.csvFiles || {};
// // // // // //       setLatCurves({
// // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // //       });
// // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // //       setToothLabels(NO_LABELS);
// // // // // //       setSegVisible(ALL_VISIBLE);
// // // // // //       setShowSplines(true);


// // // // // //       // setTrimlines(NO_RESULT);
// // // // // //       // setResultMeshes(NO_RESULT);
// // // // // //       markDone("identifyLat");
// // // // // //       setView("identifyLat");

// // // // // //       setSegmenterReady(true);

// // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // //   const handleSegmentTeeth = async () => {
// // // // // //     // if (alreadyDone("segment")) return;
// // // // // //     if (showIfDone("segment")) return;
// // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please run Identify LAT first");
// // // // // //       return;
// // // // // //     }
// // // // // //      setShowNumbers(true);

// // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // //       // download the gum and teeth STL files and show them
// // // // // //       const stamp = Date.now();
// // // // // //       const stl = job.stlFiles || {};
// // // // // //       setSegParts({
// // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // //       });
// // // // // //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// // // // // //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// // // // // //       const numbers = job.numberFiles || {};
// // // // // //       setToothLabels({
// // // // // //         upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// // // // // //         lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// // // // // //       });
// // // // // //       markDone("segment");
// // // // // //       setView("segment");

// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };


// // // // // //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// // // // // //   // downloads one scan file from the backend again
// // // // // //   const loadScan = async (jaw, fileName, stamp) => {
// // // // // //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// // // // // //     return parseStl(await res.arrayBuffer());
// // // // // //   };

// // // // // //   const handleCleanModel = async () => {
// // // // // //     // if (alreadyDone("cleanModel")) return;
// // // // // //     if (showIfDone("cleanModel")) return;
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // // //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // // //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// // // // // //       const stamp = Date.now();
// // // // // //       const upperGeo = await loadScan("upper", "Upper.stl", stamp);
// // // // // //       const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
// // // // // //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// // // // // //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// // // // // //       // old LAT curves and separated parts do not match the cleaned scans
// // // // // //       // setLatCurves({ upper: [], lower: [] });
// // // // // //       // setSegParts({ upper: null, lower: null });
// // // // // //       // setSegVisible(ALL_VISIBLE);
// // // // // //       // setShowSplines(true);


// // // // // //             // old LAT curves do not match the cleaned scans
// // // // // //       setLatCurves({ upper: [], lower: [] });
// // // // // //       setShowSplines(true);


// // // // // //       setTrimlines(NO_RESULT);
// // // // // //       // setResultMeshes(NO_RESULT);
// // // // // //       setTrimModelMeshes(NO_RESULT);
// // // // // //       setBaseMeshes(NO_RESULT);

// // // // // //       // setToothLabels(NO_LABELS);

// // // // // //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// // // // // //       // const stl = job.stlFiles || {};
// // // // // //       // setSegParts({
// // // // // //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // //       // });
// // // // // //       // setSegVisible(ALL_VISIBLE);

// // // // // //        setToothLabels(NO_LABELS);
// // // // // //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// // // // // //       setSegParts({ upper: null, lower: null });
// // // // // //       setSegVisible(ALL_VISIBLE);
// // // // // //       markDone("cleanModel");
// // // // // //       setView("cleanModel");
// // // // // //       setSegmenterReady(true);

// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // // //   // const handleToolClick = (tool) => {
// // // // // //   //   if (busy) return;
// // // // // //   //   if (tool === "Clean Model") handleCleanModel();
// // // // // //   // };



// // // // // //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// // // // // //   const runNewExeCommand = async (commandKey) => {
// // // // // //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// // // // // //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// // // // // //   //   if (!segmenterReady) {
// // // // // //   //  alert(NEED_SEGMENTER_MESSAGE);
// // // // // //   //  return;
// // // // // //   //  }

// // // // // //   if (!segmenterReady) {
// // // // // //   // the flag is false (for example after a refresh), so ask the backend about the real files
// // // // // //   let ready = false;
// // // // // //   try {
// // // // // //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// // // // // //     ready = (await res.json()).ready;
// // // // // //   } catch (err) {
// // // // // //     ready = false;
// // // // // //   }
// // // // // //   if (!ready) {
// // // // // //     alert(NEED_SEGMENTER_MESSAGE);
// // // // // //     return;
// // // // // //   }
// // // // // // }



// // // // // //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// // // // // //    if (required && !doneSteps[required.step]) {
// // // // // //   alert(required.message);
// // // // // //   return;
// // // // // //   }
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // // //       // console.log(`${commandKey} output files:`, job.report);



// // // // // //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // // //       console.log(`${commandKey} output files:`, job.report);

// // // // // //       // show the result in the 3D view
// // // // // //       const stamp = Date.now();
// // // // // //       const missing = [];
// // // // // //       for (const jaw of ["upper", "lower"]) {
// // // // // //         const rel = job.files ? job.files[jaw] : null;
// // // // // //         if (!rel) {
// // // // // //           missing.push(jaw);
// // // // // //           continue;
// // // // // //         }
// // // // // //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// // // // // //         // if (commandKey === "GenerateTrimline") {
// // // // // //         //   const points = await loadPointsFile(url);
// // // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// // // // // //         // } else {

// // // // // //         //   if (commandKey === "GenerateTrimline") {
// // // // // //         //   const points = await loadPointsFile(url);
// // // // // //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// // // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// // // // // //         // } else {
// // // // // //         //   const geo = await loadStlFile(url);
// // // // // //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// // // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// // // // // //         // }


// // // // // //           if (commandKey === "GenerateTrimline") {
// // // // // //      const points = await loadPointsFile(url);
// // // // // //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // // //     } else {
// // // // // //     const geo = await loadStlFile(url);
// // // // // //     if (commandKey === "TrimModel") {
// // // // // //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// // // // // //    } else {
// // // // // //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// // // // // //   }
// // // // // // }


// // // // // //       }

// // // // // //       // if (missing.length > 0) {
// // // // // //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // // //       // }

// // // // // //       if (missing.length > 0) {
// // // // // //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // // //    } else {
// // // // // //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// // // // // //      setView(COMMAND_TO_STEP[commandKey]);
// // // // // //    }


// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // // // ---------------- Automatic Setup button ----------------
// // // // // // // const handleAutomaticSetup = async () => {
// // // // // // //   if (busy) return;

// // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // // // // // //     return;
// // // // // // //   }
// // // // // // //   if (!doneSteps.segment) {
// // // // // // //     alert("Please do Segment first.");
// // // // // // //     return;
// // // // // // //   }

// // // // // // //   setBusy(true);
// // // // // // //   setMessage("");
// // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // //   try {
// // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // //     const started = await res.json();
// // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // // // // // //     // the files made by the exe (also printed in the backend terminal)
// // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // //     markDone("automaticSetup");
// // // // // // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // //   } catch (err) {
// // // // // // //     setProgress(null);
// // // // // // //     setMessage(err.message);
// // // // // // //   } finally {
// // // // // // //     setBusy(false);
// // // // // // //   }
// // // // // // // };




// // // // // // // const handleAutomaticSetup = async () => {
// // // // // // //   if (busy) return;

// // // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // // //   if (doneSteps.automaticSetup) {
// // // // // // //     setView("automaticSetup");
// // // // // // //     setMessage("");
// // // // // // //     return;
// // // // // // //   }
// // // // // // //   if (!doneSteps.segment) {
// // // // // // //     alert("Please do Segment first.");
// // // // // // //     return;
// // // // // // //   }

// // // // // // //   setBusy(true);
// // // // // // //   setMessage("");
// // // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // // //   try {
// // // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // // //     const started = await res.json();
// // // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // // //     // download the STL files that the exe made, for each jaw
// // // // // // //     const stamp = Date.now();
// // // // // // //     const parts = { upper: [], lower: [] };
// // // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // // // // // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // // // // // //     }

// // // // // // //     markDone("automaticSetup");

// // // // // // //     if (parts.upper.length + parts.lower.length === 0) {
// // // // // // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // // // // // //     } else {
// // // // // // //       setSetupParts({
// // // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // // //       });
// // // // // // //       setView("automaticSetup");
// // // // // // //     }

// // // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // // //   } catch (err) {
// // // // // // //     setProgress(null);
// // // // // // //     setMessage(err.message);
// // // // // // //   } finally {
// // // // // // //     setBusy(false);
// // // // // // //   }
// // // // // // // };


// // // // // // const handleAutomaticSetup = async () => {
// // // // // //   if (busy) return;

// // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // //   if (doneSteps.automaticSetup) {
// // // // // //     setView("automaticSetup");
// // // // // //     setMessage("");
// // // // // //     return;
// // // // // //   }
// // // // // //   if (!doneSteps.segment) {
// // // // // //     alert("Please do Segment first.");
// // // // // //     return;
// // // // // //   }

// // // // // //   setBusy(true);
// // // // // //   setMessage("");
// // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // //   try {
// // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // //     const started = await res.json();
// // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // //     // download the tooth STL files that the exe made, for each jaw
// // // // // //     const stamp = Date.now();
// // // // // //     const parts = { upper: [], lower: [] };
// // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // //       const fileName = rel.split("/").pop();

// // // // // //       // only tooth files like 11_final.stl (this skips all_final.stl)
// // // // // //       const m = fileName.match(/^(\d)(\d)_final\.stl$/i);
// // // // // //       if (!m) continue;

// // // // // //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// // // // // //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";

// // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// // // // // //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo });
// // // // // //     }

// // // // // //     if (parts.upper.length + parts.lower.length > 0) {
// // // // // //       setSetupParts({
// // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // //       });
// // // // // //       markDone("automaticSetup");
// // // // // //       setView("automaticSetup");
// // // // // //     } else {
// // // // // //       console.warn("Automatic Setup made no STL files to show:", job.files);
// // // // // //     }

// // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // //   } catch (err) {
// // // // // //     setProgress(null);
// // // // // //     setMessage(err.message);
// // // // // //   } finally {
// // // // // //     setBusy(false);
// // // // // //   }
// // // // // // };


// // // // // // // Initial Position: the Segment result (no exe is called)
// // // // // // const handleInitialPosition = () => {
// // // // // //   if (busy) return;
// // // // // //   setView("segment");
// // // // // //   setMessage("");
// // // // // // };

// // // // // // // Final Position: the Automatic Setup result (no exe is called)
// // // // // // const handleFinalPosition = () => {
// // // // // //   if (busy) return;
// // // // // //   setView("automaticSetup");
// // // // // //   setMessage("");
// // // // // // };

// // // // // //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// // // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // // //   const handleToolClick = (tool) => {
// // // // // //     if (busy) return;
// // // // // //     if (tool === "Clean Model") handleCleanModel();
// // // // // //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// // // // // //   };

















// // // // // //   // ---------------- editing of the splines ----------------
// // // // // //   // const startDrag = (jaw, id, index) => {
// // // // // //   //   dragRef.current = { jaw, id, index, moved: false };
// // // // // //   //   setDragging(true);
// // // // // //   // };

// // // // // //   // // when the mouse button is released: save the edited curve to its csv file
// // // // // //   // const endDrag = useCallback(async () => {
// // // // // //   //   const d = dragRef.current;
// // // // // //   //   dragRef.current = null;
// // // // // //   //   setDragging(false);

// // // // // //   //   if (!d || !d.moved) return; // nothing was changed

// // // // // //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // //   //   if (!curve) return;

// // // // // //   //   try {
// // // // // //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // //   //     setMessage(result.message);
// // // // // //   //     setTimeout(()=>setMessage(""),2000);
// // // // // //   //   } catch (err) {
// // // // // //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // //   //   }
// // // // // //   // }, []);

// // // // // //   // // moves the dragged point to the surface point under the mouse
// // // // // //   // const moveDrag = (point) => {
// // // // // //   //   const d = dragRef.current;
// // // // // //   //   if (!d) return;

// // // // // //   //   const current = latCurvesRef.current;
// // // // // //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // //   //   if (!curve) return;

// // // // // //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // //   //   d.moved = true;

// // // // // //   //   // update the ref at once, so a save right after the last move uses the newest points
// // // // // //   //   latCurvesRef.current = {
// // // // // //   //     ...current,
// // // // // //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // //   //   };
// // // // // //   //   setLatCurves(latCurvesRef.current);
// // // // // //   // };


// // // // // //     // ---------------- editing of the splines and of the trimline ----------------
// // // // // //   // a LAT point of one tooth
// // // // // //   const startDrag = (jaw, id, index) => {
// // // // // //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// // // // // //     setDragging(true);
// // // // // //   };

// // // // // //   // a point of the trimline
// // // // // //   const startTrimDrag = (jaw, index) => {
// // // // // //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// // // // // //     setDragging(true);
// // // // // //   };

// // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // //   const endDrag = useCallback(async () => {
// // // // // //     const d = dragRef.current;
// // // // // //     dragRef.current = null;
// // // // // //     setDragging(false);

// // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // //     try {
// // // // // //       if (d.kind === "trim") {
// // // // // //         const trimline = trimlinesRef.current[d.jaw];
// // // // // //         if (!trimline) return;
// // // // // //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// // // // // //         setMessage(result.message);
// // // // // //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// // // // // //       } else {
// // // // // //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // //         if (!curve) return;
// // // // // //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // //         setMessage(result.message);
// // // // // //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       setMessage(`Could not save: ${err.message}`);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // //   const moveDrag = (point) => {
// // // // // //     const d = dragRef.current;
// // // // // //     if (!d) return;

// // // // // //     // a point of the trimline
// // // // // //     if (d.kind === "trim") {
// // // // // //       const trimline = trimlinesRef.current[d.jaw];
// // // // // //       if (!trimline) return;

// // // // // //       d.moved = true;
// // // // // //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// // // // // //       setTrimlines(trimlinesRef.current);
// // // // // //       return;
// // // // // //     }

// // // // // //     // a LAT point of one tooth
// // // // // //     const current = latCurvesRef.current;
// // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // //     if (!curve) return;

// // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // //     d.moved = true;

// // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // //     latCurvesRef.current = {
// // // // // //       ...current,
// // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // //     };
// // // // // //     setLatCurves(latCurvesRef.current);
// // // // // //   };

// // // // // //   // only the result of the selected step is shown, everything else is hidden
// // // // // // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // // // // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // // // // // const viewParts =
// // // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // // // // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // // const setupWithGum = (jaw) => {
// // // // // // //   const teeth = setupParts[jaw];
// // // // // // //   if (!teeth) return null;
// // // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // // // // // //   return [...gum, ...teeth];
// // // // // // // };
// // // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // // // // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // // // // // const wholeGum = useMemo(() => {
// // // // // //   const build = (parts) => {
// // // // // //     if (!parts) return null;
// // // // // //     const whole = parts.find(isWholePart);
// // // // // //     if (!whole) return null;
// // // // // //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// // // // // //     const geo = removeTeeth(whole.geo, teeth);
// // // // // //     return geo ? { name: "GumWithBase.stl", geo } : null;
// // // // // //   };
// // // // // //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // // // // // }, [segParts]);

// // // // // // // gum that follows the moved teeth (Automatic Setup result)
// // // // // // const deformedGum = useMemo(() => {
// // // // // //   const build = (jaw) => {
// // // // // //     const moved = setupParts[jaw];
// // // // // //     if (!moved || moved.some(isGumPart)) return null;
// // // // // //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// // // // // //     if (!base) return null;
// // // // // //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // // //     const geo = deformGum(base.geo, orig, moved);
// // // // // //     return geo ? { name: "GumDeformed.stl", geo } : null;
// // // // // //   };
// // // // // //   return { upper: build("upper"), lower: build("lower") };
// // // // // // }, [setupParts, segParts, wholeGum]);

// // // // // // const setupWithGum = (jaw) => {
// // // // // //   const teeth = setupParts[jaw];
// // // // // //   if (!teeth) return null;
// // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // //   // const gum = wholeGum[jaw]
// // // // // //   //   ? [wholeGum[jaw]]
// // // // // //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// // // // // //     const gum = deformedGum[jaw]
// // // // // //     ? [deformedGum[jaw]]
// // // // // //     : wholeGum[jaw]
// // // // // //     ? [wholeGum[jaw]]
// // // // // //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// // // // // //   return [...gum, ...teeth];
// // // // // // };
// // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // // // // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // // // // // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // // // // // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // // // // // const ghostParts = superimposeActive
// // // // // //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// // // // // //   : NO_PARTS;

// // // // // // const handleToggleSuperimpose = () => {
// // // // // //   if (busy) return;
// // // // // //   if (superimposeActive) {
// // // // // //     setShowSuperimpose(false);
// // // // // //   } else {
// // // // // //     setShowSuperimpose(true);
// // // // // //     setView("automaticSetup"); // Superimpose compares with the final position
// // // // // //   }
// // // // // // };

// // // // // // const viewParts =
// // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupView : NO_PARTS;

// // // // // // // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // // // // // // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// // // // // // const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // // // const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// // // // // // const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// // // // // // const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // // // // // // measured once per result (it takes a moment on big scans), not on every render
// // // // // // const occlusion = useMemo(() => {
// // // // // //   if (!occlusionActive) return null;
// // // // // //   try {
// // // // // //     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
// // // // // //   } catch (err) {
// // // // // //     console.error("Occlusion failed:", err);
// // // // // //     return null;
// // // // // //   }
// // // // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // }, [occlusionActive, occlusionSource]);

// // // // // // const handleToggleOcclusion = () => {
// // // // // //   if (busy) return;
// // // // // //   if (occlusionActive) {
// // // // // //     setShowOcclusion(false);
// // // // // //     return;
// // // // // //   }
// // // // // //   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
// // // // // //   if (occlusionSource && hasBothJaws(occlusionSource)) {
// // // // // //     // nothing to change
// // // // // //   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
// // // // // //     setView("automaticSetup");
// // // // // //   } else if (hasBothJaws(segParts)) {
// // // // // //     setView("segment");
// // // // // //   } else {
// // // // // //     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
// // // // // //     return;
// // // // // //   }
// // // // // //   setShowOcclusion(true);
// // // // // // };



// // // // // // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // // // // // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // // // // // const viewResults =
// // // // // //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// // // // // //   return (
// // // // // //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// // // // // //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// // // // // //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// // // // // //     <div
// // // // // //       ref={gridRef}
// // // // // //       style={{
// // // // // //         position: "absolute",
// // // // // //         top: BARS_HEIGHT,
// // // // // //         left: 0,
// // // // // //         right: 0,
// // // // // //         bottom: 0,
// // // // // //         zIndex: -1,
// // // // // //         pointerEvents: "none", // the mouse goes through to the model
// // // // // //         display: showGrid ? "block" : "none",
// // // // // //         backgroundImage: GRID_IMAGE,
// // // // // //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// // // // // //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// // // // // //       }}
// // // // // //     />
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // //         onSegment={handleSegmentTeeth}
// // // // // //         onToolClick={handleToolClick}
// // // // // //         busy={busy}
// // // // // //         progress={progress}
// // // // // //         message={message}
// // // // // //         onAutomaticSetup={handleAutomaticSetup}
// // // // // //         onInitialPosition={handleInitialPosition}
// // // // // //         onFinalPosition={handleFinalPosition}
// // // // // //         showGrid={showGrid}
// // // // // //        onToggleGrid={() => setShowGrid((v) => !v)}
// // // // // //        gridSize={gridSize}
// // // // // //       onGridSizeChange={setGridSize}
// // // // // //       showSuperimpose={superimposeActive}
// // // // // // onToggleSuperimpose={handleToggleSuperimpose}
// // // // // //       showOcclusion={occlusionActive}
// // // // // //       onToggleOcclusion={handleToggleOcclusion}
// // // // // //         setupReady={doneSteps.automaticSetup}
// // // // // //         view={view}
// // // // // //         onViewChange={handleViewChange}

// // // // // //       />

// // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           // upperParts={segParts.upper}
// // // // // //           upperParts={viewParts.upper}
// // // // // //           // lowerParts={segParts.lower}
// // // // // //           lowerParts={viewParts.lower}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           segVisible={segVisible}

// // // // // //           // trimlines={trimlines}
// // // // // //           trimlines={viewTrimlines}
// // // // // //           // resultMeshes={resultMeshes}
// // // // // //           resultMeshes={viewResults}
// // // // // //           // toothLabels={toothLabels}
// // // // // //           toothLabels={viewLabels}

// // // // // //           // latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // //           latCurves={viewCurves}
// // // // // //           dragging={dragging}
// // // // // //           onStartDrag={startDrag}
// // // // // //           onStartTrimDrag={startTrimDrag}
// // // // // //           onMoveDrag={moveDrag}
// // // // // //           onEndDrag={endDrag}
// // // // // //           showNumbers={showNumbers}
// // // // // //           viewRequest={viewRequest}
// // // // // //           showGrid={showGrid}
// // // // // //           gridRef={gridRef}
// // // // // //           gridSize={gridSize}
// // // // // //           ghostParts={ghostParts}
// // // // // //           occlusion={occlusion}

// // // // // //         />

// // // // // //         {/* Occlusion color scale: touching (blue) at the bottom, deep overlap (red) at the top */}
// // // // // //         {occlusion && <OcclusionLegend />}

// // // // // //         <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //           // segmentedUpper={!!segParts.upper}
// // // // // //           // segmentedLower={!!segParts.lower}
// // // // // //           segmentedUpper={!!viewParts.upper}
// // // // // //           segmentedLower={!!viewParts.lower}
// // // // // //           segVisible={segVisible}
// // // // // //           onToggleSeg={toggleSeg}
// // // // // //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// // // // // //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// // // // // //            showNumbers={showNumbers}
// // // // // //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // // // ---------------- Occlusion legend: the color bar on the right side ----------------
// // // // // // const LEGEND_BAR_HEIGHT = 200;

// // // // // // function OcclusionLegend() {
// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         position: "absolute",
// // // // // //         right: 204,
// // // // // //         top: "50%",
// // // // // //         transform: "translateY(-50%)",
// // // // // //         display: "flex",
// // // // // //         flexDirection: "column",
// // // // // //         alignItems: "center",
// // // // // //         fontSize: 11,
// // // // // //         color: "#ffffff",
// // // // // //         pointerEvents: "none",
// // // // // //         userSelect: "none",
// // // // // //       }}
// // // // // //     >
// // // // // //       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
// // // // // //         <div
// // // // // //           style={{
// // // // // //             display: "flex",
// // // // // //             flexDirection: "column",
// // // // // //             justifyContent: "space-between",
// // // // // //             textAlign: "right",
// // // // // //             margin: "-7px 0", // centers each number on its line
// // // // // //           }}
// // // // // //         >
// // // // // //           {OCCLUSION_TICKS.map((t) => (
// // // // // //             <span key={t}>{t.toFixed(2)}</span>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //         <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
// // // // // //       </div>
// // // // // //       <div style={{ marginTop: 10, textAlign: "center", lineHeight: 1.3 }}>
// // // // // //         overlap
// // // // // //         <br />
// // // // // //         mm
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }




// // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // // export default function App() {
// // // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // // // // //     setMessage("");

// // // // // // // // // // //     // send the file to the backend
// // // // // // // // // // //     try {
// // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // //       formData.append("file", file);
// // // // // // // // // // //       formData.append("type", type);
// // // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // // //       const result = await res.json();
// // // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // // //       <TopBar
// // // // // // // // // // //         upperName={upper.name}
// // // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // // //         message={message}
// // // // // // // // // // //       />
// // // // // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }




// // // // // // // // // // import { useState } from "react";
// // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // export default function App() {
// // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // //     if (type === "upper") {
// // // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // // // // //        setShowUpper(true);
// // // // // // // // // //     } else {
// // // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // // //       setLowerParts(null);
// // // // // // // // // //         setShowLower(true);
// // // // // // // // // //     }
// // // // // // // // // //     setMessage("");

// // // // // // // // // //     try {
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append("file", file);
// // // // // // // // // //       formData.append("type", type);
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // // // // //     Promise.all(
// // // // // // // // // //       files.map(async (name) => {
// // // // // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // // // // //       })
// // // // // // // // // //     );

// // // // // // // // // //   const handleSegment = async () => {
// // // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setBusy(true);
// // // // // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // // // // //       const stamp = Date.now();
// // // // // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // // // // //       setMessage("Segmentation completed");
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage(err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setBusy(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // //       <TopBar
// // // // // // // // // //         upperName={upper.name}
// // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // //         onSegment={handleSegment}
// // // // // // // // // //         busy={busy}
// // // // // // // // // //         message={message}
// // // // // // // // // //       />
// // // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // // //         <Viewer
// // // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // // //           upperParts={upperParts}
// // // // // // // // // //           lowerParts={lowerParts}
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //         />

// // // // // // // // // //          <VisibilityButtons
// // // // // // // // // //           showUpper={showUpper}
// // // // // // // // // //           showLower={showLower}
// // // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }











// // // // // // // // // import { useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") {
// // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // //       setShowUpper(true);
// // // // // // // // //     } else {
// // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // //       setShowLower(true);
// // // // // // // // //     }
// // // // // // // // //     setMessage("");

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // // // // //       setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // the cutting step comes in a later phase
// // // // // // // // //   // const handleCutTeeth = () => {
// // // // // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // // // // //   // };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // // // // //         busy={busy}
// // // // // // // // //         message={message}
// // // // // // // // //       />

// // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // //         <Viewer
// // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //         />

// // // // // // // // //         <VisibilityButtons
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // //         />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }















// // // // // // // // // import { useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") {
// // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // //       setShowUpper(true);
// // // // // // // // //     } else {
// // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // //       setShowLower(true);
// // // // // // // // //     }
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // // //     // if (!upper.geo) {
// // // // // // // // //     //   setProgress(null);
// // // // // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //     //   return;
// // // // // // // // //     // }

// // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // //      setProgress(null);
// // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //       return;
// // // // // // // // //       }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("");
// // // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // // //     try {
// // // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // // //       const started = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // // //       while (true) {
// // // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // // //         const job = await statusRes.json();

// // // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // // //         if (job.done) break;
// // // // // // // // //       }
// // // // // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setProgress(null);
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // // //         busy={busy}
// // // // // // // // //         progress={progress}
// // // // // // // // //         message={message}
// // // // // // // // //       />

// // // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // //         <Viewer
// // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //         />

// // // // // // // // //         <VisibilityButtons
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // //         />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }







// // // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // // // // //   // dragging of one editable point
// // // // // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setShowLower(true);
// // // // // // // //     }
// // // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress(null);

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // //       let job;
// // // // // // // //       while (true) {
// // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // //         job = await statusRes.json();

// // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // //         if (job.done) break;
// // // // // // // //       }

// // // // // // // //       // 3. download the CSV files and show them as splines
// // // // // // // //       const stamp = Date.now();
// // // // // // // //       const csv = job.csvFiles || {};
// // // // // // // //       setLatCurves({
// // // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // // //       });

// // // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // // //     dragRef.current = { jaw, id, index };
// // // // // // // //     setDragging(true);
// // // // // // // //   };

// // // // // // // //   const endDrag = useCallback(() => {
// // // // // // // //     dragRef.current = null;
// // // // // // // //     setDragging(false);
// // // // // // // //   }, []);

// // // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // // //   const moveDrag = (point) => {
// // // // // // // //     const d = dragRef.current;
// // // // // // // //     if (!d) return;

// // // // // // // //     setLatCurves((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // // // // //         curve.id === d.id
// // // // // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // // // // //           : curve
// // // // // // // //       ),
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // //         busy={busy}
// // // // // // // //         progress={progress}
// // // // // // // //         message={message}
// // // // // // // //       />

// // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           latCurves={latCurves}
// // // // // // // //           dragging={dragging}
// // // // // // // //           onStartDrag={startDrag}
// // // // // // // //           onMoveDrag={moveDrag}
// // // // // // // //           onEndDrag={endDrag}
// // // // // // // //         />

// // // // // // // //         <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }











// // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // // //   latCurvesRef.current = latCurves;

// // // // // // //   // dragging of one editable point
// // // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setShowLower(true);
// // // // // // //     }
// // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // //     setMessage("");
// // // // // // //     setProgress(null);

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // asks the backend for the progress every second until the job is done
// // // // // // //   const waitForJob = async (statusUrl) => {
// // // // // // //     while (true) {
// // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // //       const res = await fetch(statusUrl);
// // // // // // //       const job = await res.json();

// // // // // // //       if (job.error) throw new Error(job.error);
// // // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // // //       if (job.done) return job;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- Identify LAT button ----------------
// // // // // // //   const handleIdentifyLat = async () => {
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // // //       // download the CSV files and show them as splines
// // // // // // //       const stamp = Date.now();
// // // // // // //       const csv = job.csvFiles || {};
// // // // // // //       setLatCurves({
// // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // //       });

// // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // // //   const handleSegmentTeeth = async () => {
// // // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please run Identify LAT first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // // //     setDragging(true);
// // // // // // //   };

// // // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // // //   const endDrag = useCallback(async () => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     dragRef.current = null;
// // // // // // //     setDragging(false);

// // // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // // //     if (!curve) return;

// // // // // // //     try {
// // // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // // //       setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // //   const moveDrag = (point) => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     if (!d) return;

// // // // // // //     const current = latCurvesRef.current;
// // // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // // //     if (!curve) return;

// // // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // // //     d.moved = true;

// // // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // // //     latCurvesRef.current = {
// // // // // // //       ...current,
// // // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // // //     };
// // // // // // //     setLatCurves(latCurvesRef.current);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // //         onSegment={handleSegmentTeeth}
// // // // // // //         busy={busy}
// // // // // // //         progress={progress}
// // // // // // //         message={message}
// // // // // // //       />

// // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           latCurves={latCurves}
// // // // // // //           dragging={dragging}
// // // // // // //           onStartDrag={startDrag}
// // // // // // //           onMoveDrag={moveDrag}
// // // // // // //           onEndDrag={endDrag}
// // // // // // //         />

// // // // // // //         <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }












// // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // // const NO_CURVES = { upper: [], lower: [] };

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // //   latCurvesRef.current = latCurves;

// // // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // // //   // dragging of one editable point
// // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // //   const [dragging, setDragging] = useState(false);

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setShowLower(true);
// // // // // //     }
// // // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // // //     setMessage("");
// // // // // //     setProgress(null);

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   // asks the backend for the progress every second until the job is done
// // // // // //   const waitForJob = async (statusUrl) => {
// // // // // //     while (true) {
// // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // //       const res = await fetch(statusUrl);
// // // // // //       const job = await res.json();

// // // // // //       if (job.error) throw new Error(job.error);
// // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // //       if (job.done) return job;
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- Identify LAT button ----------------
// // // // // //   const handleIdentifyLat = async () => {
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // //       // download the CSV files and show them as splines
// // // // // //       const stamp = Date.now();
// // // // // //       const csv = job.csvFiles || {};
// // // // // //       setLatCurves({
// // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // //       });
// // // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // // //       setShowSplines(true);

// // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // //   const handleSegmentTeeth = async () => {
// // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please run Identify LAT first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // //       // download the gum and teeth STL files and show them
// // // // // //       const stamp = Date.now();
// // // // // //       const stl = job.stlFiles || {};
// // // // // //       setSegParts({
// // // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // // //       });

// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- editing of the splines ----------------
// // // // // //   const startDrag = (jaw, id, index) => {
// // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // //     setDragging(true);
// // // // // //   };

// // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // //   const endDrag = useCallback(async () => {
// // // // // //     const d = dragRef.current;
// // // // // //     dragRef.current = null;
// // // // // //     setDragging(false);

// // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // //     if (!curve) return;

// // // // // //     try {
// // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // //       setMessage(result.message);
// // // // // //       setTimeout(() => setMessage(""), 2000);
// // // // // //     } catch (err) {
// // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // //   const moveDrag = (point) => {
// // // // // //     const d = dragRef.current;
// // // // // //     if (!d) return;

// // // // // //     const current = latCurvesRef.current;
// // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // //     if (!curve) return;

// // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // //     d.moved = true;

// // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // //     latCurvesRef.current = {
// // // // // //       ...current,
// // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // //     };
// // // // // //     setLatCurves(latCurvesRef.current);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // //         onSegment={handleSegmentTeeth}
// // // // // //         busy={busy}
// // // // // //         progress={progress}
// // // // // //         message={message}
// // // // // //       />

// // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           upperParts={segParts.upper}
// // // // // //           lowerParts={segParts.lower}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // // // // //           dragging={dragging}
// // // // // //           onStartDrag={startDrag}
// // // // // //           onMoveDrag={moveDrag}
// // // // // //           onEndDrag={endDrag}
// // // // // //         />

// // // // // //         <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

















// // // // // import { useCallback,useMemo, useRef, useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";
// // // // // import { removeTeeth } from "./gumUtils.js";
// // // // // import { deformGum } from "./gumDeform.js";
// // // // // import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";


// // // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // const NO_CURVES = { upper: [], lower: [] };
// // // // // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // // // // const NO_RESULT = { upper: null, lower: null };

// // // // // const NO_LABELS = { upper: [], lower: [] };
// // // // // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // // // // const BARS_HEIGHT = 88;
// // // // // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // // // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // // // // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // // // // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // // // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // // // // const GRID_IMAGE = [
// // // // //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // // ].join(", ");
// // // // // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // // // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // // // // const KEEP_OUTPUT_ON_UPLOAD = false;
// // // // // const NO_PARTS = { upper: null, lower: null };

  

// // // // // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // // // // when a step runs, only these steps become "not done" again
// // // // // const RESETS = {
// // // // //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// // // // //   generateTrimline: ["trimModel", "addBase"],
// // // // //   trimModel: ["addBase"],
// // // // //   addBase: [],
// // // // //   identifyLat: ["segment","automaticSetup"],
// // // // //   segment: ["automaticSetup"],
// // // // //     automaticSetup: [],
// // // // // };

// // // // // const NOT_DONE = {
// // // // //   cleanModel: false,
// // // // //   identifyLat: false,
// // // // //   segment: false,
// // // // //   generateTrimline: false,
// // // // //   trimModel: false,
// // // // //   addBase: false,
// // // // //   automaticSetup: false,
// // // // // };




// // // // // // button name used by the backend -> step name
// // // // // const COMMAND_TO_STEP = {
// // // // //   GenerateTrimline: "generateTrimline",
// // // // //   TrimModel: "trimModel",
// // // // //   AddBase: "addBase",
// // // // // };
// // // // // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // // // // step that must be finished before this step can run
// // // // // const REQUIRED_BEFORE = {
// // // // //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// // // // //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // // // // };



// // // // // // button text in the Clean Model tab -> command sent to the backend
// // // // // const NEW_EXE_COMMANDS = {
// // // // //   "Generate Trimline": "GenerateTrimline",
// // // // //   "Trim Model": "TrimModel",
// // // // //   "Add Base": "AddBase",
// // // // // };

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // //   const [message, setMessage] = useState("");

// // // // //   // which buttons already produced a result
// // // // // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // // // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // // // // const [segmenterReady, setSegmenterReady] = useState(false);

// // // // // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // // // // marks a step as done and resets the steps after it
// // // // // // const markDone = (step) =>
// // // // // //   setDoneSteps((prev) => {
// // // // // //     const next = { ...prev };
// // // // // //     STEP_ORDER.forEach((s, i) => {
// // // // // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // // // // //     });
// // // // // //     next[step] = true;
// // // // // //     return next;
// // // // // //   });



// // // // // const markDone = (step) =>
// // // // //   setDoneSteps((prev) => {
// // // // //     const next = { ...prev };
// // // // //     RESETS[step].forEach((s) => (next[s] = false));
// // // // //     next[step] = true;
// // // // //     return next;
// // // // //   });

// // // // // // shows the alert and returns true if the step was already done
// // // // // // const alreadyDone = (step) => {
// // // // // //   if (doneSteps[step]) {
// // // // // //     alert(DONE_MESSAGES[step]);
// // // // // //     return true;
// // // // // //   }
// // // // // //   return false;
// // // // // // };


// // // // // // if the step is already done: show its stored result and do not run the exe again
// // // // // const showIfDone = (step) => {
// // // // //   if (doneSteps[step]) {
// // // // //     setView(step);
// // // // //     setMessage("");
// // // // //     return true;
// // // // //   }
// // // // //   return false;
// // // // // };

// // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // //   const latCurvesRef = useRef(latCurves);
// // // // //   latCurvesRef.current = latCurves;

// // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // // // // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// // // // //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// // // // //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// // // // //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// // // // //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// // // // //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// // // // //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // // // // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // // // // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // // // // which result is shown: "scan" or the name of a step
// // // // // const [view, setView] = useState("scan");

// // // // //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// // // // //   const trimlinesRef = useRef(trimlines);
// // // // //   trimlinesRef.current = trimlines;

// // // // //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// // // // //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// // // // //        const [showNumbers, setShowNumbers] = useState(true);
// // // // //        const [showGrid, setShowGrid] = useState(false);
// // // // //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // // // // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // // // // const [showSuperimpose, setShowSuperimpose] = useState(false);
// // // // // const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off

// // // // //        const [viewRequest, setViewRequest] = useState(null);



// // // // //   // dragging of one editable point
// // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // //   const [dragging, setDragging] = useState(false);

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setShowLower(true);
// // // // //     }
// // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// // // // //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// // // // //     setSegVisible(ALL_VISIBLE);

// // // // //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// // // // //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // // //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// // // // //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// // // // //    setView("scan");
// // // // //    setShowSuperimpose(false);
// // // // //    setShowOcclusion(false);

// // // // //     setMessage("");
// // // // //     setDoneSteps(NOT_DONE);
// // // // //     setSegmenterReady(false);
// // // // //     setProgress(null);

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   // asks the backend for the progress every second until the job is done
// // // // //   const waitForJob = async (statusUrl) => {
// // // // //     while (true) {
// // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // //       const res = await fetch(statusUrl);
// // // // //       const job = await res.json();

// // // // //       if (job.error) throw new Error(job.error);
// // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // //       if (job.done) return job;
// // // // //     }
// // // // //   };

// // // // //   // ---------------- Identify LAT button ----------------
// // // // //   const handleIdentifyLat = async () => {
// // // // //     // if (alreadyDone("identifyLat")) return;
// // // // //     if (showIfDone("identifyLat")) return;
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
      
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // //       // download the CSV files and show them as splines
// // // // //       const stamp = Date.now();
// // // // //       const csv = job.csvFiles || {};
// // // // //       setLatCurves({
// // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // //       });
// // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // //       setToothLabels(NO_LABELS);
// // // // //       setSegVisible(ALL_VISIBLE);
// // // // //       setShowSplines(true);


// // // // //       // setTrimlines(NO_RESULT);
// // // // //       // setResultMeshes(NO_RESULT);
// // // // //       markDone("identifyLat");
// // // // //       setView("identifyLat");

// // // // //       setSegmenterReady(true);

// // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // //   const handleSegmentTeeth = async () => {
// // // // //     // if (alreadyDone("segment")) return;
// // // // //     if (showIfDone("segment")) return;
// // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please run Identify LAT first");
// // // // //       return;
// // // // //     }
// // // // //      setShowNumbers(true);

// // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // //       console.log("Segment output files:", job.newFiles);

// // // // //       // download the gum and teeth STL files and show them
// // // // //       const stamp = Date.now();
// // // // //       const stl = job.stlFiles || {};
// // // // //       setSegParts({
// // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // //       });
// // // // //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// // // // //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// // // // //       const numbers = job.numberFiles || {};
// // // // //       setToothLabels({
// // // // //         upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// // // // //         lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// // // // //       });
// // // // //       markDone("segment");
// // // // //       setView("segment");

// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };


// // // // //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// // // // //   // downloads one scan file from the backend again
// // // // //   const loadScan = async (jaw, fileName, stamp) => {
// // // // //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// // // // //     return parseStl(await res.arrayBuffer());
// // // // //   };

// // // // //   const handleCleanModel = async () => {
// // // // //     // if (alreadyDone("cleanModel")) return;
// // // // //     if (showIfDone("cleanModel")) return;
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // // //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// // // // //       const stamp = Date.now();
// // // // //       const upperGeo = await loadScan("upper", "Upper.stl", stamp);
// // // // //       const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
// // // // //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// // // // //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// // // // //       // old LAT curves and separated parts do not match the cleaned scans
// // // // //       // setLatCurves({ upper: [], lower: [] });
// // // // //       // setSegParts({ upper: null, lower: null });
// // // // //       // setSegVisible(ALL_VISIBLE);
// // // // //       // setShowSplines(true);


// // // // //             // old LAT curves do not match the cleaned scans
// // // // //       setLatCurves({ upper: [], lower: [] });
// // // // //       setShowSplines(true);


// // // // //       setTrimlines(NO_RESULT);
// // // // //       // setResultMeshes(NO_RESULT);
// // // // //       setTrimModelMeshes(NO_RESULT);
// // // // //       setBaseMeshes(NO_RESULT);

// // // // //       // setToothLabels(NO_LABELS);

// // // // //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// // // // //       // const stl = job.stlFiles || {};
// // // // //       // setSegParts({
// // // // //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // //       // });
// // // // //       // setSegVisible(ALL_VISIBLE);

// // // // //        setToothLabels(NO_LABELS);
// // // // //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// // // // //       setSegParts({ upper: null, lower: null });
// // // // //       setSegVisible(ALL_VISIBLE);
// // // // //       markDone("cleanModel");
// // // // //       setView("cleanModel");
// // // // //       setSegmenterReady(true);

// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // //   // const handleToolClick = (tool) => {
// // // // //   //   if (busy) return;
// // // // //   //   if (tool === "Clean Model") handleCleanModel();
// // // // //   // };



// // // // //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// // // // //   const runNewExeCommand = async (commandKey) => {
// // // // //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// // // // //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// // // // //   //   if (!segmenterReady) {
// // // // //   //  alert(NEED_SEGMENTER_MESSAGE);
// // // // //   //  return;
// // // // //   //  }

// // // // //   if (!segmenterReady) {
// // // // //   // the flag is false (for example after a refresh), so ask the backend about the real files
// // // // //   let ready = false;
// // // // //   try {
// // // // //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// // // // //     ready = (await res.json()).ready;
// // // // //   } catch (err) {
// // // // //     ready = false;
// // // // //   }
// // // // //   if (!ready) {
// // // // //     alert(NEED_SEGMENTER_MESSAGE);
// // // // //     return;
// // // // //   }
// // // // // }



// // // // //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// // // // //    if (required && !doneSteps[required.step]) {
// // // // //   alert(required.message);
// // // // //   return;
// // // // //   }
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // //       // console.log(`${commandKey} output files:`, job.report);



// // // // //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // // //       console.log(`${commandKey} output files:`, job.report);

// // // // //       // show the result in the 3D view
// // // // //       const stamp = Date.now();
// // // // //       const missing = [];
// // // // //       for (const jaw of ["upper", "lower"]) {
// // // // //         const rel = job.files ? job.files[jaw] : null;
// // // // //         if (!rel) {
// // // // //           missing.push(jaw);
// // // // //           continue;
// // // // //         }
// // // // //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// // // // //         // if (commandKey === "GenerateTrimline") {
// // // // //         //   const points = await loadPointsFile(url);
// // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// // // // //         // } else {

// // // // //         //   if (commandKey === "GenerateTrimline") {
// // // // //         //   const points = await loadPointsFile(url);
// // // // //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// // // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// // // // //         // } else {
// // // // //         //   const geo = await loadStlFile(url);
// // // // //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// // // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// // // // //         // }


// // // // //           if (commandKey === "GenerateTrimline") {
// // // // //      const points = await loadPointsFile(url);
// // // // //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // // //     } else {
// // // // //     const geo = await loadStlFile(url);
// // // // //     if (commandKey === "TrimModel") {
// // // // //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// // // // //    } else {
// // // // //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// // // // //   }
// // // // // }


// // // // //       }

// // // // //       // if (missing.length > 0) {
// // // // //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // //       // }

// // // // //       if (missing.length > 0) {
// // // // //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // // //    } else {
// // // // //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// // // // //      setView(COMMAND_TO_STEP[commandKey]);
// // // // //    }


// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // // // ---------------- Automatic Setup button ----------------
// // // // // // const handleAutomaticSetup = async () => {
// // // // // //   if (busy) return;

// // // // // //   if (doneSteps.automaticSetup) {
// // // // // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // // // // //     return;
// // // // // //   }
// // // // // //   if (!doneSteps.segment) {
// // // // // //     alert("Please do Segment first.");
// // // // // //     return;
// // // // // //   }

// // // // // //   setBusy(true);
// // // // // //   setMessage("");
// // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // //   try {
// // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // //     const started = await res.json();
// // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // // // // //     // the files made by the exe (also printed in the backend terminal)
// // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // //     markDone("automaticSetup");
// // // // // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // //   } catch (err) {
// // // // // //     setProgress(null);
// // // // // //     setMessage(err.message);
// // // // // //   } finally {
// // // // // //     setBusy(false);
// // // // // //   }
// // // // // // };




// // // // // // const handleAutomaticSetup = async () => {
// // // // // //   if (busy) return;

// // // // // //   // already done: only show the stored result, the exe is not called again
// // // // // //   if (doneSteps.automaticSetup) {
// // // // // //     setView("automaticSetup");
// // // // // //     setMessage("");
// // // // // //     return;
// // // // // //   }
// // // // // //   if (!doneSteps.segment) {
// // // // // //     alert("Please do Segment first.");
// // // // // //     return;
// // // // // //   }

// // // // // //   setBusy(true);
// // // // // //   setMessage("");
// // // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // // //   try {
// // // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // // //     const started = await res.json();
// // // // // //     if (!res.ok) throw new Error(started.message);

// // // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // // //     console.log("Automatic Setup output files:", job.files);

// // // // // //     // download the STL files that the exe made, for each jaw
// // // // // //     const stamp = Date.now();
// // // // // //     const parts = { upper: [], lower: [] };
// // // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // // // // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // // // // //     }

// // // // // //     markDone("automaticSetup");

// // // // // //     if (parts.upper.length + parts.lower.length === 0) {
// // // // // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // // // // //     } else {
// // // // // //       setSetupParts({
// // // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // // //       });
// // // // // //       setView("automaticSetup");
// // // // // //     }

// // // // // //     setTimeout(() => setProgress(null), 2000);
// // // // // //   } catch (err) {
// // // // // //     setProgress(null);
// // // // // //     setMessage(err.message);
// // // // // //   } finally {
// // // // // //     setBusy(false);
// // // // // //   }
// // // // // // };


// // // // // const handleAutomaticSetup = async () => {
// // // // //   if (busy) return;

// // // // //   // already done: only show the stored result, the exe is not called again
// // // // //   if (doneSteps.automaticSetup) {
// // // // //     setView("automaticSetup");
// // // // //     setMessage("");
// // // // //     return;
// // // // //   }
// // // // //   if (!doneSteps.segment) {
// // // // //     alert("Please do Segment first.");
// // // // //     return;
// // // // //   }

// // // // //   setBusy(true);
// // // // //   setMessage("");
// // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // //   try {
// // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // //     const started = await res.json();
// // // // //     if (!res.ok) throw new Error(started.message);

// // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // //     console.log("Automatic Setup output files:", job.files);

// // // // //     // download the tooth STL files that the exe made, for each jaw
// // // // //     const stamp = Date.now();
// // // // //     const parts = { upper: [], lower: [] };
// // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // //       const fileName = rel.split("/").pop();

// // // // //       // only tooth files like 11_final.stl (this skips all_final.stl)
// // // // //       const m = fileName.match(/^(\d)(\d)_final\.stl$/i);
// // // // //       if (!m) continue;

// // // // //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// // // // //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";

// // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// // // // //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo });
// // // // //     }

// // // // //     if (parts.upper.length + parts.lower.length > 0) {
// // // // //       setSetupParts({
// // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // //       });
// // // // //       markDone("automaticSetup");
// // // // //       setView("automaticSetup");
// // // // //     } else {
// // // // //       console.warn("Automatic Setup made no STL files to show:", job.files);
// // // // //     }

// // // // //     setTimeout(() => setProgress(null), 2000);
// // // // //   } catch (err) {
// // // // //     setProgress(null);
// // // // //     setMessage(err.message);
// // // // //   } finally {
// // // // //     setBusy(false);
// // // // //   }
// // // // // };


// // // // // // Initial Position: the Segment result (no exe is called)
// // // // // const handleInitialPosition = () => {
// // // // //   if (busy) return;
// // // // //   setView("segment");
// // // // //   setMessage("");
// // // // // };

// // // // // // Final Position: the Automatic Setup result (no exe is called)
// // // // // const handleFinalPosition = () => {
// // // // //   if (busy) return;
// // // // //   setView("automaticSetup");
// // // // //   setMessage("");
// // // // // };

// // // // //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// // // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // // //   const handleToolClick = (tool) => {
// // // // //     if (busy) return;
// // // // //     if (tool === "Clean Model") handleCleanModel();
// // // // //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// // // // //   };

















// // // // //   // ---------------- editing of the splines ----------------
// // // // //   // const startDrag = (jaw, id, index) => {
// // // // //   //   dragRef.current = { jaw, id, index, moved: false };
// // // // //   //   setDragging(true);
// // // // //   // };

// // // // //   // // when the mouse button is released: save the edited curve to its csv file
// // // // //   // const endDrag = useCallback(async () => {
// // // // //   //   const d = dragRef.current;
// // // // //   //   dragRef.current = null;
// // // // //   //   setDragging(false);

// // // // //   //   if (!d || !d.moved) return; // nothing was changed

// // // // //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // //   //   if (!curve) return;

// // // // //   //   try {
// // // // //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // //   //     setMessage(result.message);
// // // // //   //     setTimeout(()=>setMessage(""),2000);
// // // // //   //   } catch (err) {
// // // // //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // //   //   }
// // // // //   // }, []);

// // // // //   // // moves the dragged point to the surface point under the mouse
// // // // //   // const moveDrag = (point) => {
// // // // //   //   const d = dragRef.current;
// // // // //   //   if (!d) return;

// // // // //   //   const current = latCurvesRef.current;
// // // // //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // //   //   if (!curve) return;

// // // // //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // //   //   d.moved = true;

// // // // //   //   // update the ref at once, so a save right after the last move uses the newest points
// // // // //   //   latCurvesRef.current = {
// // // // //   //     ...current,
// // // // //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // //   //   };
// // // // //   //   setLatCurves(latCurvesRef.current);
// // // // //   // };


// // // // //     // ---------------- editing of the splines and of the trimline ----------------
// // // // //   // a LAT point of one tooth
// // // // //   const startDrag = (jaw, id, index) => {
// // // // //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// // // // //     setDragging(true);
// // // // //   };

// // // // //   // a point of the trimline
// // // // //   const startTrimDrag = (jaw, index) => {
// // // // //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// // // // //     setDragging(true);
// // // // //   };

// // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // //   const endDrag = useCallback(async () => {
// // // // //     const d = dragRef.current;
// // // // //     dragRef.current = null;
// // // // //     setDragging(false);

// // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // //     try {
// // // // //       if (d.kind === "trim") {
// // // // //         const trimline = trimlinesRef.current[d.jaw];
// // // // //         if (!trimline) return;
// // // // //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// // // // //         setMessage(result.message);
// // // // //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// // // // //       } else {
// // // // //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // //         if (!curve) return;
// // // // //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // //         setMessage(result.message);
// // // // //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       setMessage(`Could not save: ${err.message}`);
// // // // //     }
// // // // //   }, []);

// // // // //   // moves the dragged point to the surface point under the mouse
// // // // //   const moveDrag = (point) => {
// // // // //     const d = dragRef.current;
// // // // //     if (!d) return;

// // // // //     // a point of the trimline
// // // // //     if (d.kind === "trim") {
// // // // //       const trimline = trimlinesRef.current[d.jaw];
// // // // //       if (!trimline) return;

// // // // //       d.moved = true;
// // // // //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// // // // //       setTrimlines(trimlinesRef.current);
// // // // //       return;
// // // // //     }

// // // // //     // a LAT point of one tooth
// // // // //     const current = latCurvesRef.current;
// // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // //     if (!curve) return;

// // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // //     d.moved = true;

// // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // //     latCurvesRef.current = {
// // // // //       ...current,
// // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // //     };
// // // // //     setLatCurves(latCurvesRef.current);
// // // // //   };

// // // // //   // only the result of the selected step is shown, everything else is hidden
// // // // // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // // // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // // // // const viewParts =
// // // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // // // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // // const setupWithGum = (jaw) => {
// // // // // //   const teeth = setupParts[jaw];
// // // // // //   if (!teeth) return null;
// // // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // // // // //   return [...gum, ...teeth];
// // // // // // };
// // // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // // // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // // // // const wholeGum = useMemo(() => {
// // // // //   const build = (parts) => {
// // // // //     if (!parts) return null;
// // // // //     const whole = parts.find(isWholePart);
// // // // //     if (!whole) return null;
// // // // //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// // // // //     const geo = removeTeeth(whole.geo, teeth);
// // // // //     return geo ? { name: "GumWithBase.stl", geo } : null;
// // // // //   };
// // // // //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // // // // }, [segParts]);

// // // // // // gum that follows the moved teeth (Automatic Setup result)
// // // // // const deformedGum = useMemo(() => {
// // // // //   const build = (jaw) => {
// // // // //     const moved = setupParts[jaw];
// // // // //     if (!moved || moved.some(isGumPart)) return null;
// // // // //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// // // // //     if (!base) return null;
// // // // //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // //     const geo = deformGum(base.geo, orig, moved);
// // // // //     return geo ? { name: "GumDeformed.stl", geo } : null;
// // // // //   };
// // // // //   return { upper: build("upper"), lower: build("lower") };
// // // // // }, [setupParts, segParts, wholeGum]);

// // // // // const setupWithGum = (jaw) => {
// // // // //   const teeth = setupParts[jaw];
// // // // //   if (!teeth) return null;
// // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // //   // const gum = wholeGum[jaw]
// // // // //   //   ? [wholeGum[jaw]]
// // // // //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// // // // //     const gum = deformedGum[jaw]
// // // // //     ? [deformedGum[jaw]]
// // // // //     : wholeGum[jaw]
// // // // //     ? [wholeGum[jaw]]
// // // // //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// // // // //   return [...gum, ...teeth];
// // // // // };
// // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // // // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // // // // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // // // // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // // // // const ghostParts = superimposeActive
// // // // //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// // // // //   : NO_PARTS;

// // // // // const handleToggleSuperimpose = () => {
// // // // //   if (busy) return;
// // // // //   if (superimposeActive) {
// // // // //     setShowSuperimpose(false);
// // // // //   } else {
// // // // //     setShowSuperimpose(true);
// // // // //     setView("automaticSetup"); // Superimpose compares with the final position
// // // // //   }
// // // // // };

// // // // // const viewParts =
// // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupView : NO_PARTS;

// // // // // // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // // // // // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// // // // // const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // // const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// // // // // const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// // // // // const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // // // // // measured once per result (it takes a moment on big scans), not on every render
// // // // // const occlusion = useMemo(() => {
// // // // //   if (!occlusionActive) return null;
// // // // //   try {
// // // // //     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
// // // // //   } catch (err) {
// // // // //     console.error("Occlusion failed:", err);
// // // // //     return null;
// // // // //   }
// // // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // }, [occlusionActive, occlusionSource]);

// // // // // const handleToggleOcclusion = () => {
// // // // //   if (busy) return;
// // // // //   if (occlusionActive) {
// // // // //     setShowOcclusion(false);
// // // // //     return;
// // // // //   }
// // // // //   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
// // // // //   if (occlusionSource && hasBothJaws(occlusionSource)) {
// // // // //     // nothing to change
// // // // //   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
// // // // //     setView("automaticSetup");
// // // // //   } else if (hasBothJaws(segParts)) {
// // // // //     setView("segment");
// // // // //   } else {
// // // // //     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
// // // // //     return;
// // // // //   }
// // // // //   setShowOcclusion(true);
// // // // // };



// // // // // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // // // // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // // // // const viewResults =
// // // // //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// // // // //   return (
// // // // //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// // // // //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// // // // //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// // // // //     <div
// // // // //       ref={gridRef}
// // // // //       style={{
// // // // //         position: "absolute",
// // // // //         top: BARS_HEIGHT,
// // // // //         left: 0,
// // // // //         right: 0,
// // // // //         bottom: 0,
// // // // //         zIndex: -1,
// // // // //         pointerEvents: "none", // the mouse goes through to the model
// // // // //         display: showGrid ? "block" : "none",
// // // // //         backgroundImage: GRID_IMAGE,
// // // // //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// // // // //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// // // // //       }}
// // // // //     />
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onIdentifyLat={handleIdentifyLat}
// // // // //         onSegment={handleSegmentTeeth}
// // // // //         onToolClick={handleToolClick}
// // // // //         busy={busy}
// // // // //         progress={progress}
// // // // //         message={message}
// // // // //         onAutomaticSetup={handleAutomaticSetup}
// // // // //         onInitialPosition={handleInitialPosition}
// // // // //         onFinalPosition={handleFinalPosition}
// // // // //         showGrid={showGrid}
// // // // //        onToggleGrid={() => setShowGrid((v) => !v)}
// // // // //        gridSize={gridSize}
// // // // //       onGridSizeChange={setGridSize}
// // // // //       showSuperimpose={superimposeActive}
// // // // // onToggleSuperimpose={handleToggleSuperimpose}
// // // // //       showOcclusion={occlusionActive}
// // // // //       onToggleOcclusion={handleToggleOcclusion}
// // // // //         setupReady={doneSteps.automaticSetup}
// // // // //         view={view}
// // // // //         onViewChange={handleViewChange}

// // // // //       />

// // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           // upperParts={segParts.upper}
// // // // //           upperParts={viewParts.upper}
// // // // //           // lowerParts={segParts.lower}
// // // // //           lowerParts={viewParts.lower}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           segVisible={segVisible}

// // // // //           // trimlines={trimlines}
// // // // //           trimlines={viewTrimlines}
// // // // //           // resultMeshes={resultMeshes}
// // // // //           resultMeshes={viewResults}
// // // // //           // toothLabels={toothLabels}
// // // // //           toothLabels={viewLabels}

// // // // //           // latCurves={showSplines ? latCurves : NO_CURVES}
// // // // //           latCurves={viewCurves}
// // // // //           dragging={dragging}
// // // // //           onStartDrag={startDrag}
// // // // //           onStartTrimDrag={startTrimDrag}
// // // // //           onMoveDrag={moveDrag}
// // // // //           onEndDrag={endDrag}
// // // // //           showNumbers={showNumbers}
// // // // //           viewRequest={viewRequest}
// // // // //           showGrid={showGrid}
// // // // //           gridRef={gridRef}
// // // // //           gridSize={gridSize}
// // // // //           ghostParts={ghostParts}
// // // // //           occlusion={occlusion}

// // // // //         />

// // // // //         {/* Occlusion color scale: 0.00 mm (touching, purple) at the bottom, 0.80 mm (red) at the top */}
// // // // //         {occlusion && <OcclusionLegend />}

// // // // //         <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //           // segmentedUpper={!!segParts.upper}
// // // // //           // segmentedLower={!!segParts.lower}
// // // // //           segmentedUpper={!!viewParts.upper}
// // // // //           segmentedLower={!!viewParts.lower}
// // // // //           segVisible={segVisible}
// // // // //           onToggleSeg={toggleSeg}
// // // // //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// // // // //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// // // // //            showNumbers={showNumbers}
// // // // //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // // ---------------- Occlusion legend: the color bar on the right side ----------------
// // // // // const LEGEND_BAR_HEIGHT = 200;

// // // // // function OcclusionLegend() {
// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         position: "absolute",
// // // // //         right: 24,
// // // // //         top: "50%",
// // // // //         transform: "translateY(-50%)",
// // // // //         display: "flex",
// // // // //         flexDirection: "column",
// // // // //         alignItems: "center",
// // // // //         fontSize: 11,
// // // // //         color: "#444",
// // // // //         pointerEvents: "none",
// // // // //         userSelect: "none",
// // // // //       }}
// // // // //     >
// // // // //       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
// // // // //         <div
// // // // //           style={{
// // // // //             display: "flex",
// // // // //             flexDirection: "column",
// // // // //             justifyContent: "space-between",
// // // // //             textAlign: "right",
// // // // //             margin: "-7px 0", // centers each number on its line
// // // // //           }}
// // // // //         >
// // // // //           {OCCLUSION_TICKS.map((t) => (
// // // // //             <span key={t}>{t.toFixed(2)}</span>
// // // // //           ))}
// // // // //         </div>
// // // // //         <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
// // // // //       </div>
// // // // //       <div style={{ marginTop: 10 }}>mm</div>
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // // // // // // // import { useState } from "react";
// // // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // // export default function App() {
// // // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // // // //     setMessage("");

// // // // // // // // // //     // send the file to the backend
// // // // // // // // // //     try {
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append("file", file);
// // // // // // // // // //       formData.append("type", type);
// // // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // // //       const result = await res.json();
// // // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // // //       <TopBar
// // // // // // // // // //         upperName={upper.name}
// // // // // // // // // //         lowerName={lower.name}
// // // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // // //         message={message}
// // // // // // // // // //       />
// // // // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }




// // // // // // // // // import { useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") {
// // // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // // // //        setShowUpper(true);
// // // // // // // // //     } else {
// // // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // // //       setLowerParts(null);
// // // // // // // // //         setShowLower(true);
// // // // // // // // //     }
// // // // // // // // //     setMessage("");

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // // // //     Promise.all(
// // // // // // // // //       files.map(async (name) => {
// // // // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // // // //       })
// // // // // // // // //     );

// // // // // // // // //   const handleSegment = async () => {
// // // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setBusy(true);
// // // // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // // // //       const stamp = Date.now();
// // // // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // // // //       setMessage("Segmentation completed");
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage(err.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setBusy(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         onSegment={handleSegment}
// // // // // // // // //         busy={busy}
// // // // // // // // //         message={message}
// // // // // // // // //       />
// // // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // // //         <Viewer
// // // // // // // // //           upperGeo={upper.geo}
// // // // // // // // //           lowerGeo={lower.geo}
// // // // // // // // //           upperParts={upperParts}
// // // // // // // // //           lowerParts={lowerParts}
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //         />

// // // // // // // // //          <VisibilityButtons
// // // // // // // // //           showUpper={showUpper}
// // // // // // // // //           showLower={showLower}
// // // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // // //           hasLower={!!lower.geo}
// // // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // // //         />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }











// // // // // // // // import { useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setShowLower(true);
// // // // // // // //     }
// // // // // // // //     setMessage("");

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // // // //       setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // the cutting step comes in a later phase
// // // // // // // //   // const handleCutTeeth = () => {
// // // // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // // // //   // };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // // // //         busy={busy}
// // // // // // // //         message={message}
// // // // // // // //       />

// // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //         />

// // // // // // // //         <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }















// // // // // // // // import { useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setShowLower(true);
// // // // // // // //     }
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleIdentifyLat = async () => {
// // // // // // // //     // if (!upper.geo) {
// // // // // // // //     //   setProgress(null);
// // // // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //     //   return;
// // // // // // // //     // }

// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //      setProgress(null);
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //       }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("");
// // // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // // //     try {
// // // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // // //       const started = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // // //       while (true) {
// // // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // // //         const job = await statusRes.json();

// // // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // // //         if (job.done) break;
// // // // // // // //       }
// // // // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // // //     } catch (err) {
// // // // // // // //       setProgress(null);
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // // //         busy={busy}
// // // // // // // //         progress={progress}
// // // // // // // //         message={message}
// // // // // // // //       />

// // // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //         />

// // // // // // // //         <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }







// // // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // // // //   // dragging of one editable point
// // // // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // // // //   const [dragging, setDragging] = useState(false);

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setShowLower(true);
// // // // // // //     }
// // // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // // //     setMessage("");
// // // // // // //     setProgress(null);

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleIdentifyLat = async () => {
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // //       let job;
// // // // // // //       while (true) {
// // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // //         job = await statusRes.json();

// // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // //         if (job.done) break;
// // // // // // //       }

// // // // // // //       // 3. download the CSV files and show them as splines
// // // // // // //       const stamp = Date.now();
// // // // // // //       const csv = job.csvFiles || {};
// // // // // // //       setLatCurves({
// // // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // // //       });

// // // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ---------------- editing of the splines ----------------
// // // // // // //   const startDrag = (jaw, id, index) => {
// // // // // // //     dragRef.current = { jaw, id, index };
// // // // // // //     setDragging(true);
// // // // // // //   };

// // // // // // //   const endDrag = useCallback(() => {
// // // // // // //     dragRef.current = null;
// // // // // // //     setDragging(false);
// // // // // // //   }, []);

// // // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // // //   const moveDrag = (point) => {
// // // // // // //     const d = dragRef.current;
// // // // // // //     if (!d) return;

// // // // // // //     setLatCurves((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // // // //         curve.id === d.id
// // // // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // // // //           : curve
// // // // // // //       ),
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // //         busy={busy}
// // // // // // //         progress={progress}
// // // // // // //         message={message}
// // // // // // //       />

// // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           latCurves={latCurves}
// // // // // // //           dragging={dragging}
// // // // // // //           onStartDrag={startDrag}
// // // // // // //           onMoveDrag={moveDrag}
// // // // // // //           onEndDrag={endDrag}
// // // // // // //         />

// // // // // // //         <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }











// // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // // //   const latCurvesRef = useRef(latCurves);
// // // // // //   latCurvesRef.current = latCurves;

// // // // // //   // dragging of one editable point
// // // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // // //   const [dragging, setDragging] = useState(false);

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setShowLower(true);
// // // // // //     }
// // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // //     setMessage("");
// // // // // //     setProgress(null);

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   // asks the backend for the progress every second until the job is done
// // // // // //   const waitForJob = async (statusUrl) => {
// // // // // //     while (true) {
// // // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // //       const res = await fetch(statusUrl);
// // // // // //       const job = await res.json();

// // // // // //       if (job.error) throw new Error(job.error);
// // // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // // //       if (job.done) return job;
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- Identify LAT button ----------------
// // // // // //   const handleIdentifyLat = async () => {
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // // //       // download the CSV files and show them as splines
// // // // // //       const stamp = Date.now();
// // // // // //       const csv = job.csvFiles || {};
// // // // // //       setLatCurves({
// // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // //       });

// // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // // //   const handleSegmentTeeth = async () => {
// // // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please run Identify LAT first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // // //       console.log("Segment output files:", job.newFiles);

// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- editing of the splines ----------------
// // // // // //   const startDrag = (jaw, id, index) => {
// // // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // // //     setDragging(true);
// // // // // //   };

// // // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // // //   const endDrag = useCallback(async () => {
// // // // // //     const d = dragRef.current;
// // // // // //     dragRef.current = null;
// // // // // //     setDragging(false);

// // // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // // //     if (!curve) return;

// // // // // //     try {
// // // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // // //       setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // //   const moveDrag = (point) => {
// // // // // //     const d = dragRef.current;
// // // // // //     if (!d) return;

// // // // // //     const current = latCurvesRef.current;
// // // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // // //     if (!curve) return;

// // // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // // //     d.moved = true;

// // // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // // //     latCurvesRef.current = {
// // // // // //       ...current,
// // // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // // //     };
// // // // // //     setLatCurves(latCurvesRef.current);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // //         onSegment={handleSegmentTeeth}
// // // // // //         busy={busy}
// // // // // //         progress={progress}
// // // // // //         message={message}
// // // // // //       />

// // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           latCurves={latCurves}
// // // // // //           dragging={dragging}
// // // // // //           onStartDrag={startDrag}
// // // // // //           onMoveDrag={moveDrag}
// // // // // //           onEndDrag={endDrag}
// // // // // //         />

// // // // // //         <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }












// // // // // import { useCallback, useRef, useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";
// // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";
// // // // // const NO_CURVES = { upper: [], lower: [] };

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // //   const [message, setMessage] = useState("");

// // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // //   const [showSplines, setShowSplines] = useState(true);
// // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // //   const latCurvesRef = useRef(latCurves);
// // // // //   latCurvesRef.current = latCurves;

// // // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // // //   // dragging of one editable point
// // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // //   const [dragging, setDragging] = useState(false);

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setShowLower(true);
// // // // //     }
// // // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // // //     setMessage("");
// // // // //     setProgress(null);

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   // asks the backend for the progress every second until the job is done
// // // // //   const waitForJob = async (statusUrl) => {
// // // // //     while (true) {
// // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // //       const res = await fetch(statusUrl);
// // // // //       const job = await res.json();

// // // // //       if (job.error) throw new Error(job.error);
// // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // //       if (job.done) return job;
// // // // //     }
// // // // //   };

// // // // //   // ---------------- Identify LAT button ----------------
// // // // //   const handleIdentifyLat = async () => {
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // //       // download the CSV files and show them as splines
// // // // //       const stamp = Date.now();
// // // // //       const csv = job.csvFiles || {};
// // // // //       setLatCurves({
// // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // //       });
// // // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // // //       setShowSplines(true);

// // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // //   const handleSegmentTeeth = async () => {
// // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please run Identify LAT first");
// // // // //       return;
// // // // //     }

// // // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // //       console.log("Segment output files:", job.newFiles);

// // // // //       // download the gum and teeth STL files and show them
// // // // //       const stamp = Date.now();
// // // // //       const stl = job.stlFiles || {};
// // // // //       setSegParts({
// // // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // // //       });

// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // ---------------- editing of the splines ----------------
// // // // //   const startDrag = (jaw, id, index) => {
// // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // //     setDragging(true);
// // // // //   };

// // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // //   const endDrag = useCallback(async () => {
// // // // //     const d = dragRef.current;
// // // // //     dragRef.current = null;
// // // // //     setDragging(false);

// // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // //     if (!curve) return;

// // // // //     try {
// // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // //       setMessage(result.message);
// // // // //       setTimeout(() => setMessage(""), 2000);
// // // // //     } catch (err) {
// // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // //     }
// // // // //   }, []);

// // // // //   // moves the dragged point to the surface point under the mouse
// // // // //   const moveDrag = (point) => {
// // // // //     const d = dragRef.current;
// // // // //     if (!d) return;

// // // // //     const current = latCurvesRef.current;
// // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // //     if (!curve) return;

// // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // //     d.moved = true;

// // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // //     latCurvesRef.current = {
// // // // //       ...current,
// // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // //     };
// // // // //     setLatCurves(latCurvesRef.current);
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onIdentifyLat={handleIdentifyLat}
// // // // //         onSegment={handleSegmentTeeth}
// // // // //         busy={busy}
// // // // //         progress={progress}
// // // // //         message={message}
// // // // //       />

// // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           upperParts={segParts.upper}
// // // // //           lowerParts={segParts.lower}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // // // //           dragging={dragging}
// // // // //           onStartDrag={startDrag}
// // // // //           onMoveDrag={moveDrag}
// // // // //           onEndDrag={endDrag}
// // // // //         />

// // // // //         <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

















// // // // import { useCallback,useMemo, useRef, useState } from "react";
// // // // import TopBar from "./TopBar.jsx";
// // // // import Viewer from "./Viewer.jsx";
// // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // import { parseStl } from "./stlUtils.js";
// // // // import { removeTeeth } from "./gumUtils.js";
// // // // import { deformGum } from "./gumDeform.js";
// // // // import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";


// // // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // // // const BACKEND_URL = "http://localhost:5174";
// // // // const NO_CURVES = { upper: [], lower: [] };
// // // // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // // // const NO_RESULT = { upper: null, lower: null };

// // // // const NO_LABELS = { upper: [], lower: [] };
// // // // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // // // const BARS_HEIGHT = 88;
// // // // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // // // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // // // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // // // const GRID_IMAGE = [
// // // //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // // //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // // ].join(", ");
// // // // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // // // const KEEP_OUTPUT_ON_UPLOAD = false;
// // // // const NO_PARTS = { upper: null, lower: null };

  

// // // // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // // // when a step runs, only these steps become "not done" again
// // // // const RESETS = {
// // // //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// // // //   generateTrimline: ["trimModel", "addBase"],
// // // //   trimModel: ["addBase"],
// // // //   addBase: [],
// // // //   identifyLat: ["segment","automaticSetup"],
// // // //   segment: ["automaticSetup"],
// // // //     automaticSetup: [],
// // // // };

// // // // const NOT_DONE = {
// // // //   cleanModel: false,
// // // //   identifyLat: false,
// // // //   segment: false,
// // // //   generateTrimline: false,
// // // //   trimModel: false,
// // // //   addBase: false,
// // // //   automaticSetup: false,
// // // // };




// // // // // button name used by the backend -> step name
// // // // const COMMAND_TO_STEP = {
// // // //   GenerateTrimline: "generateTrimline",
// // // //   TrimModel: "trimModel",
// // // //   AddBase: "addBase",
// // // // };
// // // // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // // // step that must be finished before this step can run
// // // // const REQUIRED_BEFORE = {
// // // //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// // // //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // // // };



// // // // // button text in the Clean Model tab -> command sent to the backend
// // // // const NEW_EXE_COMMANDS = {
// // // //   "Generate Trimline": "GenerateTrimline",
// // // //   "Trim Model": "TrimModel",
// // // //   "Add Base": "AddBase",
// // // // };

// // // // export default function App() {
// // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // //   const [showUpper, setShowUpper] = useState(true);
// // // //   const [showLower, setShowLower] = useState(true);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // //   const [message, setMessage] = useState("");

// // // //   // which buttons already produced a result
// // // // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // // // const [segmenterReady, setSegmenterReady] = useState(false);

// // // // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // // // marks a step as done and resets the steps after it
// // // // // const markDone = (step) =>
// // // // //   setDoneSteps((prev) => {
// // // // //     const next = { ...prev };
// // // // //     STEP_ORDER.forEach((s, i) => {
// // // // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // // // //     });
// // // // //     next[step] = true;
// // // // //     return next;
// // // // //   });



// // // // const markDone = (step) =>
// // // //   setDoneSteps((prev) => {
// // // //     const next = { ...prev };
// // // //     RESETS[step].forEach((s) => (next[s] = false));
// // // //     next[step] = true;
// // // //     return next;
// // // //   });

// // // // // shows the alert and returns true if the step was already done
// // // // // const alreadyDone = (step) => {
// // // // //   if (doneSteps[step]) {
// // // // //     alert(DONE_MESSAGES[step]);
// // // // //     return true;
// // // // //   }
// // // // //   return false;
// // // // // };


// // // // // if the step is already done: show its stored result and do not run the exe again
// // // // const showIfDone = (step) => {
// // // //   if (doneSteps[step]) {
// // // //     setView(step);
// // // //     setMessage("");
// // // //     return true;
// // // //   }
// // // //   return false;
// // // // };

// // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // //   const [showSplines, setShowSplines] = useState(true);
// // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // //   const latCurvesRef = useRef(latCurves);
// // // //   latCurvesRef.current = latCurves;

// // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // // // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// // // //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// // // //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// // // //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// // // //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// // // //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// // // //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // // // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // // // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // // // which result is shown: "scan" or the name of a step
// // // // const [view, setView] = useState("scan");

// // // //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// // // //   const trimlinesRef = useRef(trimlines);
// // // //   trimlinesRef.current = trimlines;

// // // //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// // // //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// // // //        const [showNumbers, setShowNumbers] = useState(true);
// // // //        const [showGrid, setShowGrid] = useState(false);
// // // //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // // // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // // // const [showSuperimpose, setShowSuperimpose] = useState(false);
// // // // const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off

// // // //        const [viewRequest, setViewRequest] = useState(null);



// // // //   // dragging of one editable point
// // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // //   const [dragging, setDragging] = useState(false);

// // // //   const handleFile = async (type, file) => {
// // // //     const geo = parseStl(await file.arrayBuffer());

// // // //     if (type === "upper") {
// // // //       setUpper({ name: file.name, geo });
// // // //       setShowUpper(true);
// // // //     } else {
// // // //       setLower({ name: file.name, geo });
// // // //       setShowLower(true);
// // // //     }
// // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// // // //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// // // //     setSegVisible(ALL_VISIBLE);

// // // //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// // // //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// // // //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// // // //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// // // //    setView("scan");
// // // //    setShowSuperimpose(false);
// // // //    setShowOcclusion(false);

// // // //     setMessage("");
// // // //     setDoneSteps(NOT_DONE);
// // // //     setSegmenterReady(false);
// // // //     setProgress(null);

// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("file", file);
// // // //       formData.append("type", type);
// // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // //       const result = await res.json();
// // // //       if (!res.ok) setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // //     }
// // // //   };

// // // //   // asks the backend for the progress every second until the job is done
// // // //   const waitForJob = async (statusUrl) => {
// // // //     while (true) {
// // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // //       const res = await fetch(statusUrl);
// // // //       const job = await res.json();

// // // //       if (job.error) throw new Error(job.error);
// // // //       setProgress({ percent: job.percent, label: job.label });
// // // //       if (job.done) return job;
// // // //     }
// // // //   };

// // // //   // ---------------- Identify LAT button ----------------
// // // //   const handleIdentifyLat = async () => {
// // // //     // if (alreadyDone("identifyLat")) return;
// // // //     if (showIfDone("identifyLat")) return;
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
      
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // //       // download the CSV files and show them as splines
// // // //       const stamp = Date.now();
// // // //       const csv = job.csvFiles || {};
// // // //       setLatCurves({
// // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // //       });
// // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // //       setToothLabels(NO_LABELS);
// // // //       setSegVisible(ALL_VISIBLE);
// // // //       setShowSplines(true);


// // // //       // setTrimlines(NO_RESULT);
// // // //       // setResultMeshes(NO_RESULT);
// // // //       markDone("identifyLat");
// // // //       setView("identifyLat");

// // // //       setSegmenterReady(true);

// // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // //   const handleSegmentTeeth = async () => {
// // // //     // if (alreadyDone("segment")) return;
// // // //     if (showIfDone("segment")) return;
// // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // //       setProgress(null);
// // // //       setMessage("Please run Identify LAT first");
// // // //       return;
// // // //     }
// // // //      setShowNumbers(true);

// // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // //       // the files created by the exe (also printed in the backend terminal)
// // // //       console.log("Segment output files:", job.newFiles);

// // // //       // download the gum and teeth STL files and show them
// // // //       const stamp = Date.now();
// // // //       const stl = job.stlFiles || {};
// // // //       setSegParts({
// // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // //       });
// // // //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// // // //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// // // //       const numbers = job.numberFiles || {};
// // // //       setToothLabels({
// // // //         upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// // // //         lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// // // //       });
// // // //       markDone("segment");
// // // //       setView("segment");

// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };


// // // //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// // // //   // downloads one scan file from the backend again
// // // //   const loadScan = async (jaw, fileName, stamp) => {
// // // //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// // // //     return parseStl(await res.arrayBuffer());
// // // //   };

// // // //   const handleCleanModel = async () => {
// // // //     // if (alreadyDone("cleanModel")) return;
// // // //     if (showIfDone("cleanModel")) return;
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // // //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// // // //       const stamp = Date.now();
// // // //       const upperGeo = await loadScan("upper", "Upper.stl", stamp);
// // // //       const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
// // // //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// // // //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// // // //       // old LAT curves and separated parts do not match the cleaned scans
// // // //       // setLatCurves({ upper: [], lower: [] });
// // // //       // setSegParts({ upper: null, lower: null });
// // // //       // setSegVisible(ALL_VISIBLE);
// // // //       // setShowSplines(true);


// // // //             // old LAT curves do not match the cleaned scans
// // // //       setLatCurves({ upper: [], lower: [] });
// // // //       setShowSplines(true);


// // // //       setTrimlines(NO_RESULT);
// // // //       // setResultMeshes(NO_RESULT);
// // // //       setTrimModelMeshes(NO_RESULT);
// // // //       setBaseMeshes(NO_RESULT);

// // // //       // setToothLabels(NO_LABELS);

// // // //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// // // //       // const stl = job.stlFiles || {};
// // // //       // setSegParts({
// // // //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // //       // });
// // // //       // setSegVisible(ALL_VISIBLE);

// // // //        setToothLabels(NO_LABELS);
// // // //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// // // //       setSegParts({ upper: null, lower: null });
// // // //       setSegVisible(ALL_VISIBLE);
// // // //       markDone("cleanModel");
// // // //       setView("cleanModel");
// // // //       setSegmenterReady(true);

// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // //   // const handleToolClick = (tool) => {
// // // //   //   if (busy) return;
// // // //   //   if (tool === "Clean Model") handleCleanModel();
// // // //   // };



// // // //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// // // //   const runNewExeCommand = async (commandKey) => {
// // // //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// // // //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// // // //   //   if (!segmenterReady) {
// // // //   //  alert(NEED_SEGMENTER_MESSAGE);
// // // //   //  return;
// // // //   //  }

// // // //   if (!segmenterReady) {
// // // //   // the flag is false (for example after a refresh), so ask the backend about the real files
// // // //   let ready = false;
// // // //   try {
// // // //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// // // //     ready = (await res.json()).ready;
// // // //   } catch (err) {
// // // //     ready = false;
// // // //   }
// // // //   if (!ready) {
// // // //     alert(NEED_SEGMENTER_MESSAGE);
// // // //     return;
// // // //   }
// // // // }



// // // //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// // // //    if (required && !doneSteps[required.step]) {
// // // //   alert(required.message);
// // // //   return;
// // // //   }
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // //       // console.log(`${commandKey} output files:`, job.report);



// // // //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // // //       // the files created or changed by the exe (also printed in the backend terminal)
// // // //       console.log(`${commandKey} output files:`, job.report);

// // // //       // show the result in the 3D view
// // // //       const stamp = Date.now();
// // // //       const missing = [];
// // // //       for (const jaw of ["upper", "lower"]) {
// // // //         const rel = job.files ? job.files[jaw] : null;
// // // //         if (!rel) {
// // // //           missing.push(jaw);
// // // //           continue;
// // // //         }
// // // //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// // // //         // if (commandKey === "GenerateTrimline") {
// // // //         //   const points = await loadPointsFile(url);
// // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// // // //         // } else {

// // // //         //   if (commandKey === "GenerateTrimline") {
// // // //         //   const points = await loadPointsFile(url);
// // // //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// // // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// // // //         // } else {
// // // //         //   const geo = await loadStlFile(url);
// // // //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// // // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// // // //         // }


// // // //           if (commandKey === "GenerateTrimline") {
// // // //      const points = await loadPointsFile(url);
// // // //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // // //     } else {
// // // //     const geo = await loadStlFile(url);
// // // //     if (commandKey === "TrimModel") {
// // // //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// // // //    } else {
// // // //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// // // //   }
// // // // }


// // // //       }

// // // //       // if (missing.length > 0) {
// // // //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // //       // }

// // // //       if (missing.length > 0) {
// // // //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// // // //    } else {
// // // //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// // // //      setView(COMMAND_TO_STEP[commandKey]);
// // // //    }


// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // // // ---------------- Automatic Setup button ----------------
// // // // // const handleAutomaticSetup = async () => {
// // // // //   if (busy) return;

// // // // //   if (doneSteps.automaticSetup) {
// // // // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // // // //     return;
// // // // //   }
// // // // //   if (!doneSteps.segment) {
// // // // //     alert("Please do Segment first.");
// // // // //     return;
// // // // //   }

// // // // //   setBusy(true);
// // // // //   setMessage("");
// // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // //   try {
// // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // //     const started = await res.json();
// // // // //     if (!res.ok) throw new Error(started.message);

// // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // // // //     // the files made by the exe (also printed in the backend terminal)
// // // // //     console.log("Automatic Setup output files:", job.files);

// // // // //     markDone("automaticSetup");
// // // // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // // // //     setTimeout(() => setProgress(null), 2000);
// // // // //   } catch (err) {
// // // // //     setProgress(null);
// // // // //     setMessage(err.message);
// // // // //   } finally {
// // // // //     setBusy(false);
// // // // //   }
// // // // // };




// // // // // const handleAutomaticSetup = async () => {
// // // // //   if (busy) return;

// // // // //   // already done: only show the stored result, the exe is not called again
// // // // //   if (doneSteps.automaticSetup) {
// // // // //     setView("automaticSetup");
// // // // //     setMessage("");
// // // // //     return;
// // // // //   }
// // // // //   if (!doneSteps.segment) {
// // // // //     alert("Please do Segment first.");
// // // // //     return;
// // // // //   }

// // // // //   setBusy(true);
// // // // //   setMessage("");
// // // // //   setProgress({ percent: 0, label: "Starting..." });

// // // // //   try {
// // // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // // //     const started = await res.json();
// // // // //     if (!res.ok) throw new Error(started.message);

// // // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // // //     console.log("Automatic Setup output files:", job.files);

// // // // //     // download the STL files that the exe made, for each jaw
// // // // //     const stamp = Date.now();
// // // // //     const parts = { upper: [], lower: [] };
// // // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // // // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // // // //     }

// // // // //     markDone("automaticSetup");

// // // // //     if (parts.upper.length + parts.lower.length === 0) {
// // // // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // // // //     } else {
// // // // //       setSetupParts({
// // // // //         upper: parts.upper.length ? parts.upper : null,
// // // // //         lower: parts.lower.length ? parts.lower : null,
// // // // //       });
// // // // //       setView("automaticSetup");
// // // // //     }

// // // // //     setTimeout(() => setProgress(null), 2000);
// // // // //   } catch (err) {
// // // // //     setProgress(null);
// // // // //     setMessage(err.message);
// // // // //   } finally {
// // // // //     setBusy(false);
// // // // //   }
// // // // // };


// // // // const handleAutomaticSetup = async () => {
// // // //   if (busy) return;

// // // //   // already done: only show the stored result, the exe is not called again
// // // //   if (doneSteps.automaticSetup) {
// // // //     setView("automaticSetup");
// // // //     setMessage("");
// // // //     return;
// // // //   }
// // // //   if (!doneSteps.segment) {
// // // //     alert("Please do Segment first.");
// // // //     return;
// // // //   }

// // // //   setBusy(true);
// // // //   setMessage("");
// // // //   setProgress({ percent: 0, label: "Starting..." });

// // // //   try {
// // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // //     const started = await res.json();
// // // //     if (!res.ok) throw new Error(started.message);

// // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // //     console.log("Automatic Setup output files:", job.files);

// // // //     // download the tooth STL files that the exe made, for each jaw
// // // //     const stamp = Date.now();
// // // //     const parts = { upper: [], lower: [] };
// // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // //       const fileName = rel.split("/").pop();

// // // //       // only tooth files like 11_final.stl (this skips all_final.stl)
// // // //       const m = fileName.match(/^(\d)(\d)_final\.stl$/i);
// // // //       if (!m) continue;

// // // //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// // // //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";

// // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// // // //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo });
// // // //     }

// // // //     if (parts.upper.length + parts.lower.length > 0) {
// // // //       setSetupParts({
// // // //         upper: parts.upper.length ? parts.upper : null,
// // // //         lower: parts.lower.length ? parts.lower : null,
// // // //       });
// // // //       markDone("automaticSetup");
// // // //       setView("automaticSetup");
// // // //     } else {
// // // //       console.warn("Automatic Setup made no STL files to show:", job.files);
// // // //     }

// // // //     setTimeout(() => setProgress(null), 2000);
// // // //   } catch (err) {
// // // //     setProgress(null);
// // // //     setMessage(err.message);
// // // //   } finally {
// // // //     setBusy(false);
// // // //   }
// // // // };


// // // // // Initial Position: the Segment result (no exe is called)
// // // // const handleInitialPosition = () => {
// // // //   if (busy) return;
// // // //   setView("segment");
// // // //   setMessage("");
// // // // };

// // // // // Final Position: the Automatic Setup result (no exe is called)
// // // // const handleFinalPosition = () => {
// // // //   if (busy) return;
// // // //   setView("automaticSetup");
// // // //   setMessage("");
// // // // };

// // // //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// // // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // // //   const handleToolClick = (tool) => {
// // // //     if (busy) return;
// // // //     if (tool === "Clean Model") handleCleanModel();
// // // //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// // // //   };

















// // // //   // ---------------- editing of the splines ----------------
// // // //   // const startDrag = (jaw, id, index) => {
// // // //   //   dragRef.current = { jaw, id, index, moved: false };
// // // //   //   setDragging(true);
// // // //   // };

// // // //   // // when the mouse button is released: save the edited curve to its csv file
// // // //   // const endDrag = useCallback(async () => {
// // // //   //   const d = dragRef.current;
// // // //   //   dragRef.current = null;
// // // //   //   setDragging(false);

// // // //   //   if (!d || !d.moved) return; // nothing was changed

// // // //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // //   //   if (!curve) return;

// // // //   //   try {
// // // //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // //   //     setMessage(result.message);
// // // //   //     setTimeout(()=>setMessage(""),2000);
// // // //   //   } catch (err) {
// // // //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // //   //   }
// // // //   // }, []);

// // // //   // // moves the dragged point to the surface point under the mouse
// // // //   // const moveDrag = (point) => {
// // // //   //   const d = dragRef.current;
// // // //   //   if (!d) return;

// // // //   //   const current = latCurvesRef.current;
// // // //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// // // //   //   if (!curve) return;

// // // //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // //   //   d.moved = true;

// // // //   //   // update the ref at once, so a save right after the last move uses the newest points
// // // //   //   latCurvesRef.current = {
// // // //   //     ...current,
// // // //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // //   //   };
// // // //   //   setLatCurves(latCurvesRef.current);
// // // //   // };


// // // //     // ---------------- editing of the splines and of the trimline ----------------
// // // //   // a LAT point of one tooth
// // // //   const startDrag = (jaw, id, index) => {
// // // //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// // // //     setDragging(true);
// // // //   };

// // // //   // a point of the trimline
// // // //   const startTrimDrag = (jaw, index) => {
// // // //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// // // //     setDragging(true);
// // // //   };

// // // //   // when the mouse button is released: save the edited curve to its csv file
// // // //   const endDrag = useCallback(async () => {
// // // //     const d = dragRef.current;
// // // //     dragRef.current = null;
// // // //     setDragging(false);

// // // //     if (!d || !d.moved) return; // nothing was changed

// // // //     try {
// // // //       if (d.kind === "trim") {
// // // //         const trimline = trimlinesRef.current[d.jaw];
// // // //         if (!trimline) return;
// // // //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// // // //         setMessage(result.message);
// // // //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// // // //       } else {
// // // //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // //         if (!curve) return;
// // // //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // //         setMessage(result.message);
// // // //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// // // //       }
// // // //     } catch (err) {
// // // //       setMessage(`Could not save: ${err.message}`);
// // // //     }
// // // //   }, []);

// // // //   // moves the dragged point to the surface point under the mouse
// // // //   const moveDrag = (point) => {
// // // //     const d = dragRef.current;
// // // //     if (!d) return;

// // // //     // a point of the trimline
// // // //     if (d.kind === "trim") {
// // // //       const trimline = trimlinesRef.current[d.jaw];
// // // //       if (!trimline) return;

// // // //       d.moved = true;
// // // //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// // // //       setTrimlines(trimlinesRef.current);
// // // //       return;
// // // //     }

// // // //     // a LAT point of one tooth
// // // //     const current = latCurvesRef.current;
// // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // //     if (!curve) return;

// // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // //     d.moved = true;

// // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // //     latCurvesRef.current = {
// // // //       ...current,
// // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // //     };
// // // //     setLatCurves(latCurvesRef.current);
// // // //   };

// // // //   // only the result of the selected step is shown, everything else is hidden
// // // // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // // // const viewParts =
// // // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // // const setupWithGum = (jaw) => {
// // // // //   const teeth = setupParts[jaw];
// // // // //   if (!teeth) return null;
// // // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // // // //   return [...gum, ...teeth];
// // // // // };
// // // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // // // const wholeGum = useMemo(() => {
// // // //   const build = (parts) => {
// // // //     if (!parts) return null;
// // // //     const whole = parts.find(isWholePart);
// // // //     if (!whole) return null;
// // // //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// // // //     const geo = removeTeeth(whole.geo, teeth);
// // // //     return geo ? { name: "GumWithBase.stl", geo } : null;
// // // //   };
// // // //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // // // }, [segParts]);

// // // // // gum that follows the moved teeth (Automatic Setup result)
// // // // const deformedGum = useMemo(() => {
// // // //   const build = (jaw) => {
// // // //     const moved = setupParts[jaw];
// // // //     if (!moved || moved.some(isGumPart)) return null;
// // // //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// // // //     if (!base) return null;
// // // //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // //     const geo = deformGum(base.geo, orig, moved);
// // // //     return geo ? { name: "GumDeformed.stl", geo } : null;
// // // //   };
// // // //   return { upper: build("upper"), lower: build("lower") };
// // // // }, [setupParts, segParts, wholeGum]);

// // // // const setupWithGum = (jaw) => {
// // // //   const teeth = setupParts[jaw];
// // // //   if (!teeth) return null;
// // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // //   // const gum = wholeGum[jaw]
// // // //   //   ? [wholeGum[jaw]]
// // // //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// // // //     const gum = deformedGum[jaw]
// // // //     ? [deformedGum[jaw]]
// // // //     : wholeGum[jaw]
// // // //     ? [wholeGum[jaw]]
// // // //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// // // //   return [...gum, ...teeth];
// // // // };
// // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // // // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // // // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // // // const ghostParts = superimposeActive
// // // //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// // // //   : NO_PARTS;

// // // // const handleToggleSuperimpose = () => {
// // // //   if (busy) return;
// // // //   if (superimposeActive) {
// // // //     setShowSuperimpose(false);
// // // //   } else {
// // // //     setShowSuperimpose(true);
// // // //     setView("automaticSetup"); // Superimpose compares with the final position
// // // //   }
// // // // };

// // // // const viewParts =
// // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupView : NO_PARTS;

// // // // // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // // // // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// // // // const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // // const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// // // // const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// // // // const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // // // // measured once per result (it takes a moment on big scans), not on every render
// // // // const occlusion = useMemo(() => {
// // // //   if (!occlusionActive) return null;
// // // //   try {
// // // //     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
// // // //   } catch (err) {
// // // //     console.error("Occlusion failed:", err);
// // // //     return null;
// // // //   }
// // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // }, [occlusionActive, occlusionSource]);

// // // // const handleToggleOcclusion = () => {
// // // //   if (busy) return;
// // // //   if (occlusionActive) {
// // // //     setShowOcclusion(false);
// // // //     return;
// // // //   }
// // // //   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
// // // //   if (occlusionSource && hasBothJaws(occlusionSource)) {
// // // //     // nothing to change
// // // //   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
// // // //     setView("automaticSetup");
// // // //   } else if (hasBothJaws(segParts)) {
// // // //     setView("segment");
// // // //   } else {
// // // //     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
// // // //     return;
// // // //   }
// // // //   setShowOcclusion(true);
// // // // };



// // // // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // // // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // // // const viewResults =
// // // //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// // // //   return (
// // // //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// // // //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// // // //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// // // //     <div
// // // //       ref={gridRef}
// // // //       style={{
// // // //         position: "absolute",
// // // //         top: BARS_HEIGHT,
// // // //         left: 0,
// // // //         right: 0,
// // // //         bottom: 0,
// // // //         zIndex: -1,
// // // //         pointerEvents: "none", // the mouse goes through to the model
// // // //         display: showGrid ? "block" : "none",
// // // //         backgroundImage: GRID_IMAGE,
// // // //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// // // //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// // // //       }}
// // // //     />
// // // //       <TopBar
// // // //         upperName={upper.name}
// // // //         lowerName={lower.name}
// // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // //         onIdentifyLat={handleIdentifyLat}
// // // //         onSegment={handleSegmentTeeth}
// // // //         onToolClick={handleToolClick}
// // // //         busy={busy}
// // // //         progress={progress}
// // // //         message={message}
// // // //         onAutomaticSetup={handleAutomaticSetup}
// // // //         onInitialPosition={handleInitialPosition}
// // // //         onFinalPosition={handleFinalPosition}
// // // //         showGrid={showGrid}
// // // //        onToggleGrid={() => setShowGrid((v) => !v)}
// // // //        gridSize={gridSize}
// // // //       onGridSizeChange={setGridSize}
// // // //       showSuperimpose={superimposeActive}
// // // // onToggleSuperimpose={handleToggleSuperimpose}
// // // //       showOcclusion={occlusionActive}
// // // //       onToggleOcclusion={handleToggleOcclusion}
// // // //         setupReady={doneSteps.automaticSetup}
// // // //         view={view}
// // // //         onViewChange={handleViewChange}

// // // //       />

// // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // //         <Viewer
// // // //           upperGeo={upper.geo}
// // // //           lowerGeo={lower.geo}
// // // //           // upperParts={segParts.upper}
// // // //           upperParts={viewParts.upper}
// // // //           // lowerParts={segParts.lower}
// // // //           lowerParts={viewParts.lower}
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           segVisible={segVisible}

// // // //           // trimlines={trimlines}
// // // //           trimlines={viewTrimlines}
// // // //           // resultMeshes={resultMeshes}
// // // //           resultMeshes={viewResults}
// // // //           // toothLabels={toothLabels}
// // // //           toothLabels={viewLabels}

// // // //           // latCurves={showSplines ? latCurves : NO_CURVES}
// // // //           latCurves={viewCurves}
// // // //           dragging={dragging}
// // // //           onStartDrag={startDrag}
// // // //           onStartTrimDrag={startTrimDrag}
// // // //           onMoveDrag={moveDrag}
// // // //           onEndDrag={endDrag}
// // // //           showNumbers={showNumbers}
// // // //           viewRequest={viewRequest}
// // // //           showGrid={showGrid}
// // // //           gridRef={gridRef}
// // // //           gridSize={gridSize}
// // // //           ghostParts={ghostParts}
// // // //           occlusion={occlusion}

// // // //         />

// // // //         {/* Occlusion color scale: how deep the teeth overlap, 0.00 (just touching) at the bottom, 0.80 mm at the top */}
// // // //         {occlusion && <OcclusionLegend />}

// // // //         <VisibilityButtons
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           hasUpper={!!upper.geo}
// // // //           hasLower={!!lower.geo}
// // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // //           // segmentedUpper={!!segParts.upper}
// // // //           // segmentedLower={!!segParts.lower}
// // // //           segmentedUpper={!!viewParts.upper}
// // // //           segmentedLower={!!viewParts.lower}
// // // //           segVisible={segVisible}
// // // //           onToggleSeg={toggleSeg}
// // // //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// // // //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// // // //            showNumbers={showNumbers}
// // // //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // // ---------------- Occlusion legend: the color bar on the right side ----------------
// // // // const LEGEND_BAR_HEIGHT = 200;

// // // // function OcclusionLegend() {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         right: 204,
// // // //         top: "50%",
// // // //         transform: "translateY(-50%)",
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //         alignItems: "center",
// // // //         fontSize: 11,
// // // //         color: "#ffffff",
// // // //         pointerEvents: "none",
// // // //         userSelect: "none",
// // // //       }}
// // // //     >
// // // //       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
// // // //         <div
// // // //           style={{
// // // //             display: "flex",
// // // //             flexDirection: "column",
// // // //             justifyContent: "space-between",
// // // //             textAlign: "right",
// // // //             margin: "-7px 0", // centers each number on its line
// // // //           }}
// // // //         >
// // // //           {OCCLUSION_TICKS.map((t) => (
// // // //             <span key={t}>{t.toFixed(2)}</span>
// // // //           ))}
// // // //         </div>
// // // //         <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
// // // //       </div>
// // // //       {/* <div style={{ marginTop: 10, textAlign: "center", lineHeight: 1.3 }}>
// // // //         overlap
// // // //         <br />
// // // //         mm
// // // //       </div> */}
// // // //       <div style={{ marginTop: 10 }}>mm</div>
// // // //     </div>
// // // //   );
// // // // }









// // // // // // // // // import { useState } from "react";
// // // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // // export default function App() {
// // // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // // //     setMessage("");

// // // // // // // // //     // send the file to the backend
// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append("file", file);
// // // // // // // // //       formData.append("type", type);
// // // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // // //       const result = await res.json();
// // // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // // //       <TopBar
// // // // // // // // //         upperName={upper.name}
// // // // // // // // //         lowerName={lower.name}
// // // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // // //         message={message}
// // // // // // // // //       />
// // // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }




// // // // // // // // import { useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") {
// // // // // // // //       setUpper({ name: file.name, geo });
// // // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // // //        setShowUpper(true);
// // // // // // // //     } else {
// // // // // // // //       setLower({ name: file.name, geo });
// // // // // // // //       setLowerParts(null);
// // // // // // // //         setShowLower(true);
// // // // // // // //     }
// // // // // // // //     setMessage("");

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // // //     Promise.all(
// // // // // // // //       files.map(async (name) => {
// // // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // // //       })
// // // // // // // //     );

// // // // // // // //   const handleSegment = async () => {
// // // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setBusy(true);
// // // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // // //       const stamp = Date.now();
// // // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // // //       setMessage("Segmentation completed");
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage(err.message);
// // // // // // // //     } finally {
// // // // // // // //       setBusy(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         onSegment={handleSegment}
// // // // // // // //         busy={busy}
// // // // // // // //         message={message}
// // // // // // // //       />
// // // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // // //         <Viewer
// // // // // // // //           upperGeo={upper.geo}
// // // // // // // //           lowerGeo={lower.geo}
// // // // // // // //           upperParts={upperParts}
// // // // // // // //           lowerParts={lowerParts}
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //         />

// // // // // // // //          <VisibilityButtons
// // // // // // // //           showUpper={showUpper}
// // // // // // // //           showLower={showLower}
// // // // // // // //           hasUpper={!!upper.geo}
// // // // // // // //           hasLower={!!lower.geo}
// // // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }











// // // // // // // import { useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setShowLower(true);
// // // // // // //     }
// // // // // // //     setMessage("");

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleIdentifyLat = async () => {
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // // //       setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // the cutting step comes in a later phase
// // // // // // //   // const handleCutTeeth = () => {
// // // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // // //   // };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // // //         busy={busy}
// // // // // // //         message={message}
// // // // // // //       />

// // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //         />

// // // // // // //         <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }















// // // // // // // import { useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setShowLower(true);
// // // // // // //     }
// // // // // // //     setMessage("");
// // // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleIdentifyLat = async () => {
// // // // // // //     // if (!upper.geo) {
// // // // // // //     //   setProgress(null);
// // // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //     //   return;
// // // // // // //     // }

// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //      setProgress(null);
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //       }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("");
// // // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // // //     try {
// // // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // // //       const started = await res.json();
// // // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // // //       while (true) {
// // // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // // //         const job = await statusRes.json();

// // // // // // //         if (job.error) throw new Error(job.error);
// // // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // // //         if (job.done) break;
// // // // // // //       }
// // // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // // //     } catch (err) {
// // // // // // //       setProgress(null);
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // // //         busy={busy}
// // // // // // //         progress={progress}
// // // // // // //         message={message}
// // // // // // //       />

// // // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //         />

// // // // // // //         <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }







// // // // // // import { useCallback, useRef, useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";
// // // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // // //   // dragging of one editable point
// // // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // // //   const [dragging, setDragging] = useState(false);

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setShowLower(true);
// // // // // //     }
// // // // // //     // a new scan: remove the old LAT of that jaw
// // // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // // //     setMessage("");
// // // // // //     setProgress(null);

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleIdentifyLat = async () => {
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // //       let job;
// // // // // //       while (true) {
// // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // //         job = await statusRes.json();

// // // // // //         if (job.error) throw new Error(job.error);
// // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // //         if (job.done) break;
// // // // // //       }

// // // // // //       // 3. download the CSV files and show them as splines
// // // // // //       const stamp = Date.now();
// // // // // //       const csv = job.csvFiles || {};
// // // // // //       setLatCurves({
// // // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // // //       });

// // // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ---------------- editing of the splines ----------------
// // // // // //   const startDrag = (jaw, id, index) => {
// // // // // //     dragRef.current = { jaw, id, index };
// // // // // //     setDragging(true);
// // // // // //   };

// // // // // //   const endDrag = useCallback(() => {
// // // // // //     dragRef.current = null;
// // // // // //     setDragging(false);
// // // // // //   }, []);

// // // // // //   // moves the dragged point to the surface point under the mouse
// // // // // //   const moveDrag = (point) => {
// // // // // //     const d = dragRef.current;
// // // // // //     if (!d) return;

// // // // // //     setLatCurves((prev) => ({
// // // // // //       ...prev,
// // // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // // //         curve.id === d.id
// // // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // // //           : curve
// // // // // //       ),
// // // // // //     }));
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // //         busy={busy}
// // // // // //         progress={progress}
// // // // // //         message={message}
// // // // // //       />

// // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           latCurves={latCurves}
// // // // // //           dragging={dragging}
// // // // // //           onStartDrag={startDrag}
// // // // // //           onMoveDrag={moveDrag}
// // // // // //           onEndDrag={endDrag}
// // // // // //         />

// // // // // //         <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }











// // // // // import { useCallback, useRef, useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";
// // // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // //   const [message, setMessage] = useState("");

// // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // // //   const latCurvesRef = useRef(latCurves);
// // // // //   latCurvesRef.current = latCurves;

// // // // //   // dragging of one editable point
// // // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // // //   const [dragging, setDragging] = useState(false);

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setShowLower(true);
// // // // //     }
// // // // //     // a new scan: remove the old LAT of that jaw
// // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // //     setMessage("");
// // // // //     setProgress(null);

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   // asks the backend for the progress every second until the job is done
// // // // //   const waitForJob = async (statusUrl) => {
// // // // //     while (true) {
// // // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // //       const res = await fetch(statusUrl);
// // // // //       const job = await res.json();

// // // // //       if (job.error) throw new Error(job.error);
// // // // //       setProgress({ percent: job.percent, label: job.label });
// // // // //       if (job.done) return job;
// // // // //     }
// // // // //   };

// // // // //   // ---------------- Identify LAT button ----------------
// // // // //   const handleIdentifyLat = async () => {
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // // //       // download the CSV files and show them as splines
// // // // //       const stamp = Date.now();
// // // // //       const csv = job.csvFiles || {};
// // // // //       setLatCurves({
// // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // //       });

// // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // // //   const handleSegmentTeeth = async () => {
// // // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please run Identify LAT first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // // //       // the files created by the exe (also printed in the backend terminal)
// // // // //       console.log("Segment output files:", job.newFiles);

// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // ---------------- editing of the splines ----------------
// // // // //   const startDrag = (jaw, id, index) => {
// // // // //     dragRef.current = { jaw, id, index, moved: false };
// // // // //     setDragging(true);
// // // // //   };

// // // // //   // when the mouse button is released: save the edited curve to its csv file
// // // // //   const endDrag = useCallback(async () => {
// // // // //     const d = dragRef.current;
// // // // //     dragRef.current = null;
// // // // //     setDragging(false);

// // // // //     if (!d || !d.moved) return; // nothing was changed

// // // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // // //     if (!curve) return;

// // // // //     try {
// // // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // // //       setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // // //     }
// // // // //   }, []);

// // // // //   // moves the dragged point to the surface point under the mouse
// // // // //   const moveDrag = (point) => {
// // // // //     const d = dragRef.current;
// // // // //     if (!d) return;

// // // // //     const current = latCurvesRef.current;
// // // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // // //     if (!curve) return;

// // // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // // //     d.moved = true;

// // // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // // //     latCurvesRef.current = {
// // // // //       ...current,
// // // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // // //     };
// // // // //     setLatCurves(latCurvesRef.current);
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onIdentifyLat={handleIdentifyLat}
// // // // //         onSegment={handleSegmentTeeth}
// // // // //         busy={busy}
// // // // //         progress={progress}
// // // // //         message={message}
// // // // //       />

// // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           latCurves={latCurves}
// // // // //           dragging={dragging}
// // // // //           onStartDrag={startDrag}
// // // // //           onMoveDrag={moveDrag}
// // // // //           onEndDrag={endDrag}
// // // // //         />

// // // // //         <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }












// // // // import { useCallback, useRef, useState } from "react";
// // // // import TopBar from "./TopBar.jsx";
// // // // import Viewer from "./Viewer.jsx";
// // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // import { parseStl } from "./stlUtils.js";
// // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // const BACKEND_URL = "http://localhost:5174";
// // // // const NO_CURVES = { upper: [], lower: [] };

// // // // export default function App() {
// // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // //   const [showUpper, setShowUpper] = useState(true);
// // // //   const [showLower, setShowLower] = useState(true);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // //   const [message, setMessage] = useState("");

// // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // //   const [showSplines, setShowSplines] = useState(true);
// // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // //   const latCurvesRef = useRef(latCurves);
// // // //   latCurvesRef.current = latCurves;

// // // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // // //   // dragging of one editable point
// // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // //   const [dragging, setDragging] = useState(false);

// // // //   const handleFile = async (type, file) => {
// // // //     const geo = parseStl(await file.arrayBuffer());

// // // //     if (type === "upper") {
// // // //       setUpper({ name: file.name, geo });
// // // //       setShowUpper(true);
// // // //     } else {
// // // //       setLower({ name: file.name, geo });
// // // //       setShowLower(true);
// // // //     }
// // // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // // //     setMessage("");
// // // //     setProgress(null);

// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("file", file);
// // // //       formData.append("type", type);
// // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // //       const result = await res.json();
// // // //       if (!res.ok) setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // //     }
// // // //   };

// // // //   // asks the backend for the progress every second until the job is done
// // // //   const waitForJob = async (statusUrl) => {
// // // //     while (true) {
// // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // //       const res = await fetch(statusUrl);
// // // //       const job = await res.json();

// // // //       if (job.error) throw new Error(job.error);
// // // //       setProgress({ percent: job.percent, label: job.label });
// // // //       if (job.done) return job;
// // // //     }
// // // //   };

// // // //   // ---------------- Identify LAT button ----------------
// // // //   const handleIdentifyLat = async () => {
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // //       // download the CSV files and show them as splines
// // // //       const stamp = Date.now();
// // // //       const csv = job.csvFiles || {};
// // // //       setLatCurves({
// // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // //       });
// // // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // // //       setShowSplines(true);

// // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // //   const handleSegmentTeeth = async () => {
// // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // //       setProgress(null);
// // // //       setMessage("Please run Identify LAT first");
// // // //       return;
// // // //     }

// // // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // //       // the files created by the exe (also printed in the backend terminal)
// // // //       console.log("Segment output files:", job.newFiles);

// // // //       // download the gum and teeth STL files and show them
// // // //       const stamp = Date.now();
// // // //       const stl = job.stlFiles || {};
// // // //       setSegParts({
// // // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // // //       });

// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setShowSplines(true); // Segment failed, so the splines come back
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------------- editing of the splines ----------------
// // // //   const startDrag = (jaw, id, index) => {
// // // //     dragRef.current = { jaw, id, index, moved: false };
// // // //     setDragging(true);
// // // //   };

// // // //   // when the mouse button is released: save the edited curve to its csv file
// // // //   const endDrag = useCallback(async () => {
// // // //     const d = dragRef.current;
// // // //     dragRef.current = null;
// // // //     setDragging(false);

// // // //     if (!d || !d.moved) return; // nothing was changed

// // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // //     if (!curve) return;

// // // //     try {
// // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // //       setMessage(result.message);
// // // //       setTimeout(() => setMessage(""), 2000);
// // // //     } catch (err) {
// // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // //     }
// // // //   }, []);

// // // //   // moves the dragged point to the surface point under the mouse
// // // //   const moveDrag = (point) => {
// // // //     const d = dragRef.current;
// // // //     if (!d) return;

// // // //     const current = latCurvesRef.current;
// // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // //     if (!curve) return;

// // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // //     d.moved = true;

// // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // //     latCurvesRef.current = {
// // // //       ...current,
// // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // //     };
// // // //     setLatCurves(latCurvesRef.current);
// // // //   };

// // // //   return (
// // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // //       <TopBar
// // // //         upperName={upper.name}
// // // //         lowerName={lower.name}
// // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // //         onIdentifyLat={handleIdentifyLat}
// // // //         onSegment={handleSegmentTeeth}
// // // //         busy={busy}
// // // //         progress={progress}
// // // //         message={message}
// // // //       />

// // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // //         <Viewer
// // // //           upperGeo={upper.geo}
// // // //           lowerGeo={lower.geo}
// // // //           upperParts={segParts.upper}
// // // //           lowerParts={segParts.lower}
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // // //           dragging={dragging}
// // // //           onStartDrag={startDrag}
// // // //           onMoveDrag={moveDrag}
// // // //           onEndDrag={endDrag}
// // // //         />

// // // //         <VisibilityButtons
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           hasUpper={!!upper.geo}
// // // //           hasLower={!!lower.geo}
// // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

















// // // import { useCallback,useMemo, useRef, useState } from "react";
// // // import TopBar from "./TopBar.jsx";
// // // import Viewer from "./Viewer.jsx";
// // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // import { parseStl } from "./stlUtils.js";
// // // import { removeTeeth } from "./gumUtils.js";
// // // import { deformGum } from "./gumDeform.js";
// // // import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";
// // // import { computeMovement } from "./movement.js";
// // // import MovementPanel from "./MovementPanel.jsx";


// // // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // // const BACKEND_URL = "http://localhost:5174";
// // // const NO_CURVES = { upper: [], lower: [] };
// // // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // // const NO_RESULT = { upper: null, lower: null };

// // // const NO_LABELS = { upper: [], lower: [] };
// // // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // // const BARS_HEIGHT = 88;
// // // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // // const GRID_IMAGE = [
// // //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// // //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // // ].join(", ");
// // // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // // const KEEP_OUTPUT_ON_UPLOAD = false;
// // // const NO_PARTS = { upper: null, lower: null };

  

// // // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // // when a step runs, only these steps become "not done" again
// // // const RESETS = {
// // //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// // //   generateTrimline: ["trimModel", "addBase"],
// // //   trimModel: ["addBase"],
// // //   addBase: [],
// // //   identifyLat: ["segment","automaticSetup"],
// // //   segment: ["automaticSetup"],
// // //     automaticSetup: [],
// // // };

// // // const NOT_DONE = {
// // //   cleanModel: false,
// // //   identifyLat: false,
// // //   segment: false,
// // //   generateTrimline: false,
// // //   trimModel: false,
// // //   addBase: false,
// // //   automaticSetup: false,
// // // };




// // // // button name used by the backend -> step name
// // // const COMMAND_TO_STEP = {
// // //   GenerateTrimline: "generateTrimline",
// // //   TrimModel: "trimModel",
// // //   AddBase: "addBase",
// // // };
// // // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // // step that must be finished before this step can run
// // // const REQUIRED_BEFORE = {
// // //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// // //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // // };



// // // // button text in the Clean Model tab -> command sent to the backend
// // // const NEW_EXE_COMMANDS = {
// // //   "Generate Trimline": "GenerateTrimline",
// // //   "Trim Model": "TrimModel",
// // //   "Add Base": "AddBase",
// // // };

// // // export default function App() {
// // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // //   const [lower, setLower] = useState({ name: "", geo: null });
// // //   const [showUpper, setShowUpper] = useState(true);
// // //   const [showLower, setShowLower] = useState(true);
// // //   const [busy, setBusy] = useState(false);
// // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // //   const [message, setMessage] = useState("");

// // //   // which buttons already produced a result
// // // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // // const [segmenterReady, setSegmenterReady] = useState(false);

// // // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // // marks a step as done and resets the steps after it
// // // // const markDone = (step) =>
// // // //   setDoneSteps((prev) => {
// // // //     const next = { ...prev };
// // // //     STEP_ORDER.forEach((s, i) => {
// // // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // // //     });
// // // //     next[step] = true;
// // // //     return next;
// // // //   });



// // // const markDone = (step) =>
// // //   setDoneSteps((prev) => {
// // //     const next = { ...prev };
// // //     RESETS[step].forEach((s) => (next[s] = false));
// // //     next[step] = true;
// // //     return next;
// // //   });

// // // // shows the alert and returns true if the step was already done
// // // // const alreadyDone = (step) => {
// // // //   if (doneSteps[step]) {
// // // //     alert(DONE_MESSAGES[step]);
// // // //     return true;
// // // //   }
// // // //   return false;
// // // // };


// // // // if the step is already done: show its stored result and do not run the exe again
// // // const showIfDone = (step) => {
// // //   if (doneSteps[step]) {
// // //     setView(step);
// // //     setMessage("");
// // //     return true;
// // //   }
// // //   return false;
// // // };

// // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // //   const [showSplines, setShowSplines] = useState(true);
// // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // //   const latCurvesRef = useRef(latCurves);
// // //   latCurvesRef.current = latCurves;

// // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// // //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// // //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// // //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// // //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// // //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// // //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // // which result is shown: "scan" or the name of a step
// // // const [view, setView] = useState("scan");

// // //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// // //   const trimlinesRef = useRef(trimlines);
// // //   trimlinesRef.current = trimlines;

// // //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// // //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// // //        const [showNumbers, setShowNumbers] = useState(true);
// // //        const [showGrid, setShowGrid] = useState(false);
// // //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // // const [showSuperimpose, setShowSuperimpose] = useState(false);
// // // const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off
// // // const [showMovement, setShowMovement] = useState(false); // Movement table on/off

// // //        const [viewRequest, setViewRequest] = useState(null);



// // //   // dragging of one editable point
// // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // //   const [dragging, setDragging] = useState(false);

// // //   const handleFile = async (type, file) => {
// // //     const geo = parseStl(await file.arrayBuffer());

// // //     if (type === "upper") {
// // //       setUpper({ name: file.name, geo });
// // //       setShowUpper(true);
// // //     } else {
// // //       setLower({ name: file.name, geo });
// // //       setShowLower(true);
// // //     }
// // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// // //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// // //     setSegVisible(ALL_VISIBLE);

// // //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// // //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// // //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// // //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// // //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// // //    setView("scan");
// // //    setShowSuperimpose(false);
// // //    setShowOcclusion(false);
// // //    setShowMovement(false);

// // //     setMessage("");
// // //     setDoneSteps(NOT_DONE);
// // //     setSegmenterReady(false);
// // //     setProgress(null);

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

// // //   // asks the backend for the progress every second until the job is done
// // // //   const waitForJob = async (statusUrl) => {
// // // //     while (true) {
// // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // //       const res = await fetch(statusUrl);
// // // //       const job = await res.json();

// // // //       if (job.error) throw new Error(job.error);
// // // //       setProgress({ percent: job.percent, label: job.label });
// // // //       if (job.done) return job;
// // // //     }
// // // //   };



// // //   // asks the backend for the progress every second until the job is done.
// // //   // The backend only knows when a whole exe step finishes (0, 50, 100 ...),
// // //   // so the number on the bar climbs 1% at a time by itself while the exe works
// // //   // (never past 99), catches up 1% at a time when the backend is ahead,
// // //   // and only reaches 100% when the job is really done.
// // //   const waitForJob = (statusUrl) =>
// // //     new Promise((resolve, reject) => {
// // //       let shown = 0;          // number shown on the bar
// // //       let target = 0;         // real percent from the backend
// // //       let label = "Starting...";
// // //       let doneJob = null;     // set when the backend says done
// // //       let stopped = false;
// // //       let lastStep = Date.now();

// // //       // every 25 ms: decide whether to add 1%
// // //       const timer = setInterval(() => {
// // //         if (stopped) return;
// // //         const now = Date.now();
// // //         // slow climb while waiting: 0.5 s per 1% at the start, about 4.5 s per 1% near 99
// // //         const waitMs = 500 + shown * 40;
// // //         if (shown < target) {
// // //           shown++;               // backend is ahead (or done): catch up fast, 1% at a time
// // //           lastStep = now;
// // //         } else if (!doneJob && shown < 99 && now - lastStep >= waitMs) {
// // //           shown++;               // exe still working: creep up 1%
// // //           lastStep = now;
// // //         } else if (!doneJob) {
// // //           return;                // nothing changed
// // //         }
// // //         setProgress({ percent: shown, label });
// // //         if (doneJob && shown >= 100) {
// // //           stopped = true;
// // //           clearInterval(timer);
// // //           resolve(doneJob);
// // //         }
// // //       }, 25);

// // //       // ask the backend every second
// // //       (async () => {
// // //         while (!stopped) {
// // //           await new Promise((r) => setTimeout(r, 1000));
// // //           try {
// // //             const res = await fetch(statusUrl);
// // //             const job = await res.json();
// // //             if (job.error) throw new Error(job.error);
// // //             target = Math.max(target, job.percent || 0);
// // //             if (job.label) label = job.label;
// // //             // if (job.done) {
// // //             //   target = 100;
// // //             //   doneJob = job;
// // //             //   return;
// // //             // }

// // //              if (job.done) {
// // //               // job finished: show 100% at once and load the output right away
// // //               stopped = true;
// // //               clearInterval(timer);
// // //               setProgress({ percent: 100, label });
// // //               resolve(job);
// // //               return;
// // //             }


// // //           } catch (err) {
// // //             stopped = true;
// // //             clearInterval(timer);
// // //             reject(err);
// // //             return;
// // //           }
// // //         }
// // //       })();
// // //     });

// // //   // ---------------- Identify LAT button ----------------
// // //   const handleIdentifyLat = async () => {
// // //     // if (alreadyDone("identifyLat")) return;
// // //     if (showIfDone("identifyLat")) return;
// // //     if (!upper.geo || !lower.geo) {
// // //       setProgress(null);
// // //       setMessage("Please upload both Upper and Lower scan models first");
      
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // //       // download the CSV files and show them as splines
// // //       const stamp = Date.now();
// // //       const csv = job.csvFiles || {};
// // //       setLatCurves({
// // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // //       });
// // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // //       setToothLabels(NO_LABELS);
// // //       setSegVisible(ALL_VISIBLE);
// // //       setShowSplines(true);


// // //       // setTrimlines(NO_RESULT);
// // //       // setResultMeshes(NO_RESULT);
// // //       markDone("identifyLat");
// // //       setView("identifyLat");

// // //       setSegmenterReady(true);

// // //       // keep the green "completed" bar for 2 seconds, then hide it
// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // //   const handleSegmentTeeth = async () => {
// // //     // if (alreadyDone("segment")) return;
// // //     if (showIfDone("segment")) return;
// // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // //       setProgress(null);
// // //       setMessage("Please run Identify LAT first");
// // //       return;
// // //     }
// // //      setShowNumbers(true);

// // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // //       // the files created by the exe (also printed in the backend terminal)
// // //       console.log("Segment output files:", job.newFiles);

// // //       // download the gum and teeth STL files and show them
// // //       const stamp = Date.now();
// // //       const stl = job.stlFiles || {};
// // //       setSegParts({
// // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // //       });
// // //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// // //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// // //       const numbers = job.numberFiles || {};
// // //       setToothLabels({
// // //         upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// // //         lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// // //       });
// // //       markDone("segment");
// // //       setView("segment");

// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setShowSplines(true); // Segment failed, so the splines come back
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };


// // //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// // //   // downloads one scan file from the backend again
// // //   const loadScan = async (jaw, fileName, stamp) => {
// // //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// // //     return parseStl(await res.arrayBuffer());
// // //   };

// // //   const handleCleanModel = async () => {
// // //     // if (alreadyDone("cleanModel")) return;
// // //     if (showIfDone("cleanModel")) return;
// // //     if (!upper.geo || !lower.geo) {
// // //       setProgress(null);
// // //       setMessage("Please upload both Upper and Lower scan models first");
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// // //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// // //       const stamp = Date.now();
// // //       const upperGeo = await loadScan("upper", "Upper.stl", stamp);
// // //       const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
// // //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// // //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// // //       // old LAT curves and separated parts do not match the cleaned scans
// // //       // setLatCurves({ upper: [], lower: [] });
// // //       // setSegParts({ upper: null, lower: null });
// // //       // setSegVisible(ALL_VISIBLE);
// // //       // setShowSplines(true);


// // //             // old LAT curves do not match the cleaned scans
// // //       setLatCurves({ upper: [], lower: [] });
// // //       setShowSplines(true);


// // //       setTrimlines(NO_RESULT);
// // //       // setResultMeshes(NO_RESULT);
// // //       setTrimModelMeshes(NO_RESULT);
// // //       setBaseMeshes(NO_RESULT);

// // //       // setToothLabels(NO_LABELS);

// // //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// // //       // const stl = job.stlFiles || {};
// // //       // setSegParts({
// // //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // //       // });
// // //       // setSegVisible(ALL_VISIBLE);

// // //        setToothLabels(NO_LABELS);
// // //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// // //       setSegParts({ upper: null, lower: null });
// // //       setSegVisible(ALL_VISIBLE);
// // //       markDone("cleanModel");
// // //       setView("cleanModel");
// // //       setSegmenterReady(true);

// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // //   // const handleToolClick = (tool) => {
// // //   //   if (busy) return;
// // //   //   if (tool === "Clean Model") handleCleanModel();
// // //   // };



// // //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// // //   const runNewExeCommand = async (commandKey) => {
// // //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// // //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// // //   //   if (!segmenterReady) {
// // //   //  alert(NEED_SEGMENTER_MESSAGE);
// // //   //  return;
// // //   //  }

// // //   if (!segmenterReady) {
// // //   // the flag is false (for example after a refresh), so ask the backend about the real files
// // //   let ready = false;
// // //   try {
// // //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// // //     ready = (await res.json()).ready;
// // //   } catch (err) {
// // //     ready = false;
// // //   }
// // //   if (!ready) {
// // //     alert(NEED_SEGMENTER_MESSAGE);
// // //     return;
// // //   }
// // // }



// // //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// // //    if (required && !doneSteps[required.step]) {
// // //   alert(required.message);
// // //   return;
// // //   }
// // //     if (!upper.geo || !lower.geo) {
// // //       setProgress(null);
// // //       setMessage("Please upload both Upper and Lower scan models first");
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // //       // the files created or changed by the exe (also printed in the backend terminal)
// // //       // console.log(`${commandKey} output files:`, job.report);



// // //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// // //       // the files created or changed by the exe (also printed in the backend terminal)
// // //       console.log(`${commandKey} output files:`, job.report);

// // //       // show the result in the 3D view
// // //       const stamp = Date.now();
// // //       const missing = [];
// // //       for (const jaw of ["upper", "lower"]) {
// // //         const rel = job.files ? job.files[jaw] : null;
// // //         if (!rel) {
// // //           missing.push(jaw);
// // //           continue;
// // //         }
// // //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// // //         // if (commandKey === "GenerateTrimline") {
// // //         //   const points = await loadPointsFile(url);
// // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// // //         // } else {

// // //         //   if (commandKey === "GenerateTrimline") {
// // //         //   const points = await loadPointsFile(url);
// // //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// // //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// // //         // } else {
// // //         //   const geo = await loadStlFile(url);
// // //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// // //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// // //         // }


// // //           if (commandKey === "GenerateTrimline") {
// // //      const points = await loadPointsFile(url);
// // //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// // //     } else {
// // //     const geo = await loadStlFile(url);
// // //     if (commandKey === "TrimModel") {
// // //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// // //    } else {
// // //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// // //   }
// // // }


// // //       }

// // //       // if (missing.length > 0) {
// // //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// // //       // }

// // //       if (missing.length > 0) {
// // //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// // //    } else {
// // //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// // //      setView(COMMAND_TO_STEP[commandKey]);
// // //    }


// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // // // ---------------- Automatic Setup button ----------------
// // // // const handleAutomaticSetup = async () => {
// // // //   if (busy) return;

// // // //   if (doneSteps.automaticSetup) {
// // // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // // //     return;
// // // //   }
// // // //   if (!doneSteps.segment) {
// // // //     alert("Please do Segment first.");
// // // //     return;
// // // //   }

// // // //   setBusy(true);
// // // //   setMessage("");
// // // //   setProgress({ percent: 0, label: "Starting..." });

// // // //   try {
// // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // //     const started = await res.json();
// // // //     if (!res.ok) throw new Error(started.message);

// // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // // //     // the files made by the exe (also printed in the backend terminal)
// // // //     console.log("Automatic Setup output files:", job.files);

// // // //     markDone("automaticSetup");
// // // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // // //     setTimeout(() => setProgress(null), 2000);
// // // //   } catch (err) {
// // // //     setProgress(null);
// // // //     setMessage(err.message);
// // // //   } finally {
// // // //     setBusy(false);
// // // //   }
// // // // };




// // // // const handleAutomaticSetup = async () => {
// // // //   if (busy) return;

// // // //   // already done: only show the stored result, the exe is not called again
// // // //   if (doneSteps.automaticSetup) {
// // // //     setView("automaticSetup");
// // // //     setMessage("");
// // // //     return;
// // // //   }
// // // //   if (!doneSteps.segment) {
// // // //     alert("Please do Segment first.");
// // // //     return;
// // // //   }

// // // //   setBusy(true);
// // // //   setMessage("");
// // // //   setProgress({ percent: 0, label: "Starting..." });

// // // //   try {
// // // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // // //     const started = await res.json();
// // // //     if (!res.ok) throw new Error(started.message);

// // // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // // //     console.log("Automatic Setup output files:", job.files);

// // // //     // download the STL files that the exe made, for each jaw
// // // //     const stamp = Date.now();
// // // //     const parts = { upper: [], lower: [] };
// // // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // // //     }

// // // //     markDone("automaticSetup");

// // // //     if (parts.upper.length + parts.lower.length === 0) {
// // // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // // //     } else {
// // // //       setSetupParts({
// // // //         upper: parts.upper.length ? parts.upper : null,
// // // //         lower: parts.lower.length ? parts.lower : null,
// // // //       });
// // // //       setView("automaticSetup");
// // // //     }

// // // //     setTimeout(() => setProgress(null), 2000);
// // // //   } catch (err) {
// // // //     setProgress(null);
// // // //     setMessage(err.message);
// // // //   } finally {
// // // //     setBusy(false);
// // // //   }
// // // // };


// // // const handleAutomaticSetup = async () => {
// // //   if (busy) return;

// // //   // already done: only show the stored result, the exe is not called again
// // //   if (doneSteps.automaticSetup) {
// // //     setView("automaticSetup");
// // //     setMessage("");
// // //     return;
// // //   }
// // //   if (!doneSteps.segment) {
// // //     alert("Please do Segment first.");
// // //     return;
// // //   }

// // //   setBusy(true);
// // //   setMessage("");
// // //   setProgress({ percent: 0, label: "Starting..." });

// // //   try {
// // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // //     const started = await res.json();
// // //     if (!res.ok) throw new Error(started.message);

// // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // //     console.log("Automatic Setup output files:", job.files);

// // //     // download the tooth STL files that the exe made, for each jaw
// // //     const stamp = Date.now();
// // //     const parts = { upper: [], lower: [] };
// // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // //       const fileName = rel.split("/").pop();

// // //       // only tooth files like 11_final.stl (this skips all_final.stl)
// // //       const m = fileName.match(/^(\d)(\d)_final\.stl$/i);
// // //       if (!m) continue;

// // //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// // //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";

// // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// // //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo });
// // //     }

// // //     if (parts.upper.length + parts.lower.length > 0) {
// // //       setSetupParts({
// // //         upper: parts.upper.length ? parts.upper : null,
// // //         lower: parts.lower.length ? parts.lower : null,
// // //       });
// // //       markDone("automaticSetup");
// // //       setView("automaticSetup");
// // //     } else {
// // //       console.warn("Automatic Setup made no STL files to show:", job.files);
// // //     }

// // //     setTimeout(() => setProgress(null), 2000);
// // //   } catch (err) {
// // //     setProgress(null);
// // //     setMessage(err.message);
// // //   } finally {
// // //     setBusy(false);
// // //   }
// // // };


// // // // Initial Position: the Segment result (no exe is called)
// // // const handleInitialPosition = () => {
// // //   if (busy) return;
// // //   setView("segment");
// // //   setMessage("");
// // // };

// // // // Final Position: the Automatic Setup result (no exe is called)
// // // const handleFinalPosition = () => {
// // //   if (busy) return;
// // //   setView("automaticSetup");
// // //   setMessage("");
// // // };

// // //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// // //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// // //   const handleToolClick = (tool) => {
// // //     if (busy) return;
// // //     if (tool === "Clean Model") handleCleanModel();
// // //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// // //   };

















// // //   // ---------------- editing of the splines ----------------
// // //   // const startDrag = (jaw, id, index) => {
// // //   //   dragRef.current = { jaw, id, index, moved: false };
// // //   //   setDragging(true);
// // //   // };

// // //   // // when the mouse button is released: save the edited curve to its csv file
// // //   // const endDrag = useCallback(async () => {
// // //   //   const d = dragRef.current;
// // //   //   dragRef.current = null;
// // //   //   setDragging(false);

// // //   //   if (!d || !d.moved) return; // nothing was changed

// // //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // //   //   if (!curve) return;

// // //   //   try {
// // //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // //   //     setMessage(result.message);
// // //   //     setTimeout(()=>setMessage(""),2000);
// // //   //   } catch (err) {
// // //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // //   //   }
// // //   // }, []);

// // //   // // moves the dragged point to the surface point under the mouse
// // //   // const moveDrag = (point) => {
// // //   //   const d = dragRef.current;
// // //   //   if (!d) return;

// // //   //   const current = latCurvesRef.current;
// // //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// // //   //   if (!curve) return;

// // //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // //   //   d.moved = true;

// // //   //   // update the ref at once, so a save right after the last move uses the newest points
// // //   //   latCurvesRef.current = {
// // //   //     ...current,
// // //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // //   //   };
// // //   //   setLatCurves(latCurvesRef.current);
// // //   // };


// // //     // ---------------- editing of the splines and of the trimline ----------------
// // //   // a LAT point of one tooth
// // //   const startDrag = (jaw, id, index) => {
// // //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// // //     setDragging(true);
// // //   };

// // //   // a point of the trimline
// // //   const startTrimDrag = (jaw, index) => {
// // //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// // //     setDragging(true);
// // //   };

// // //   // when the mouse button is released: save the edited curve to its csv file
// // //   const endDrag = useCallback(async () => {
// // //     const d = dragRef.current;
// // //     dragRef.current = null;
// // //     setDragging(false);

// // //     if (!d || !d.moved) return; // nothing was changed

// // //     try {
// // //       if (d.kind === "trim") {
// // //         const trimline = trimlinesRef.current[d.jaw];
// // //         if (!trimline) return;
// // //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// // //         setMessage(result.message);
// // //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// // //       } else {
// // //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // //         if (!curve) return;
// // //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // //         setMessage(result.message);
// // //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// // //       }
// // //     } catch (err) {
// // //       setMessage(`Could not save: ${err.message}`);
// // //     }
// // //   }, []);

// // //   // moves the dragged point to the surface point under the mouse
// // //   const moveDrag = (point) => {
// // //     const d = dragRef.current;
// // //     if (!d) return;

// // //     // a point of the trimline
// // //     if (d.kind === "trim") {
// // //       const trimline = trimlinesRef.current[d.jaw];
// // //       if (!trimline) return;

// // //       d.moved = true;
// // //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// // //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// // //       setTrimlines(trimlinesRef.current);
// // //       return;
// // //     }

// // //     // a LAT point of one tooth
// // //     const current = latCurvesRef.current;
// // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // //     if (!curve) return;

// // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // //     d.moved = true;

// // //     // update the ref at once, so a save right after the last move uses the newest points
// // //     latCurvesRef.current = {
// // //       ...current,
// // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // //     };
// // //     setLatCurves(latCurvesRef.current);
// // //   };

// // //   // only the result of the selected step is shown, everything else is hidden
// // // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // // const viewParts =
// // // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // // const setupWithGum = (jaw) => {
// // // //   const teeth = setupParts[jaw];
// // // //   if (!teeth) return null;
// // // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // // //   return [...gum, ...teeth];
// // // // };
// // // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // // const wholeGum = useMemo(() => {
// // //   const build = (parts) => {
// // //     if (!parts) return null;
// // //     const whole = parts.find(isWholePart);
// // //     if (!whole) return null;
// // //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// // //     const geo = removeTeeth(whole.geo, teeth);
// // //     return geo ? { name: "GumWithBase.stl", geo } : null;
// // //   };
// // //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // // }, [segParts]);

// // // // gum that follows the moved teeth (Automatic Setup result)
// // // const deformedGum = useMemo(() => {
// // //   const build = (jaw) => {
// // //     const moved = setupParts[jaw];
// // //     if (!moved || moved.some(isGumPart)) return null;
// // //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// // //     if (!base) return null;
// // //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // //     const geo = deformGum(base.geo, orig, moved);
// // //     return geo ? { name: "GumDeformed.stl", geo } : null;
// // //   };
// // //   return { upper: build("upper"), lower: build("lower") };
// // // }, [setupParts, segParts, wholeGum]);

// // // const setupWithGum = (jaw) => {
// // //   const teeth = setupParts[jaw];
// // //   if (!teeth) return null;
// // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // //   // const gum = wholeGum[jaw]
// // //   //   ? [wholeGum[jaw]]
// // //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// // //     const gum = deformedGum[jaw]
// // //     ? [deformedGum[jaw]]
// // //     : wholeGum[jaw]
// // //     ? [wholeGum[jaw]]
// // //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// // //   return [...gum, ...teeth];
// // // };
// // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // // const ghostParts = superimposeActive
// // //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// // //   : NO_PARTS;

// // // const handleToggleSuperimpose = () => {
// // //   if (busy) return;
// // //   if (superimposeActive) {
// // //     setShowSuperimpose(false);
// // //   } else {
// // //     setShowSuperimpose(true);
// // //     setView("automaticSetup"); // Superimpose compares with the final position
// // //   }
// // // };

// // // const viewParts =
// // //   view === "segment" ? segParts : view === "automaticSetup" ? setupView : NO_PARTS;

// // // // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // // // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// // // const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // // const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// // // const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// // // const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // // // measured once per result (it takes a moment on big scans), not on every render
// // // const occlusion = useMemo(() => {
// // //   if (!occlusionActive) return null;
// // //   try {
// // //     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
// // //   } catch (err) {
// // //     console.error("Occlusion failed:", err);
// // //     return null;
// // //   }
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // }, [occlusionActive, occlusionSource]);

// // // const handleToggleOcclusion = () => {
// // //   if (busy) return;
// // //   if (occlusionActive) {
// // //     setShowOcclusion(false);
// // //     return;
// // //   }
// // //   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
// // //   if (occlusionSource && hasBothJaws(occlusionSource)) {
// // //     // nothing to change
// // //   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
// // //     setView("automaticSetup");
// // //   } else if (hasBothJaws(segParts)) {
// // //     setView("segment");
// // //   } else {
// // //     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
// // //     return;
// // //   }
// // //   setShowOcclusion(true);
// // // };



// // // // ---------------- Movement: how far each tooth moved from Initial Position to Final Position ----------------
// // // const hasSetup = teethOnly(setupParts.upper).length + teethOnly(setupParts.lower).length > 0;
// // // const movementActive = showMovement && hasSetup;

// // // // measured once per Automatic Setup result, not on every render
// // // const movement = useMemo(() => {
// // //   if (!movementActive) return null;
// // //   try {
// // //     return computeMovement(
// // //       { upper: teethOnly(segParts.upper), lower: teethOnly(segParts.lower) },
// // //       { upper: teethOnly(setupParts.upper), lower: teethOnly(setupParts.lower) }
// // //     );
// // //   } catch (err) {
// // //     console.error("Movement failed:", err);
// // //     return null;
// // //   }
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // }, [movementActive, segParts, setupParts]);

// // // const handleToggleMovement = () => {
// // //   if (busy) return;
// // //   if (movementActive) {
// // //     setShowMovement(false);
// // //     return;
// // //   }
// // //   if (!hasSetup) {
// // //     alert("Movement compares Initial Position with Final Position. Please do Automatic Setup first.");
// // //     return;
// // //   }
// // //   setShowMovement(true);
// // // };

// // // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // // const viewResults =
// // //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// // //   return (
// // //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// // //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// // //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// // //     <div
// // //       ref={gridRef}
// // //       style={{
// // //         position: "absolute",
// // //         top: BARS_HEIGHT,
// // //         left: 0,
// // //         right: 0,
// // //         bottom: 0,
// // //         zIndex: -1,
// // //         pointerEvents: "none", // the mouse goes through to the model
// // //         display: showGrid ? "block" : "none",
// // //         backgroundImage: GRID_IMAGE,
// // //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// // //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// // //       }}
// // //     />
// // //       <TopBar
// // //         upperName={upper.name}
// // //         lowerName={lower.name}
// // //         onUpperSelected={(file) => handleFile("upper", file)}
// // //         onLowerSelected={(file) => handleFile("lower", file)}
// // //         onIdentifyLat={handleIdentifyLat}
// // //         onSegment={handleSegmentTeeth}
// // //         onToolClick={handleToolClick}
// // //         busy={busy}
// // //         progress={progress}
// // //         message={message}
// // //         onAutomaticSetup={handleAutomaticSetup}
// // //         onInitialPosition={handleInitialPosition}
// // //         onFinalPosition={handleFinalPosition}
// // //         showGrid={showGrid}
// // //        onToggleGrid={() => setShowGrid((v) => !v)}
// // //        gridSize={gridSize}
// // //       onGridSizeChange={setGridSize}
// // //       showSuperimpose={superimposeActive}
// // // onToggleSuperimpose={handleToggleSuperimpose}
// // //       showOcclusion={occlusionActive}
// // //       onToggleOcclusion={handleToggleOcclusion}
// // //       showMovement={movementActive}
// // //       onToggleMovement={handleToggleMovement}
// // //         setupReady={doneSteps.automaticSetup}
// // //         view={view}
// // //         onViewChange={handleViewChange}

// // //       />

// // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // //         <Viewer
// // //           upperGeo={upper.geo}
// // //           lowerGeo={lower.geo}
// // //           // upperParts={segParts.upper}
// // //           upperParts={viewParts.upper}
// // //           // lowerParts={segParts.lower}
// // //           lowerParts={viewParts.lower}
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           segVisible={segVisible}

// // //           // trimlines={trimlines}
// // //           trimlines={viewTrimlines}
// // //           // resultMeshes={resultMeshes}
// // //           resultMeshes={viewResults}
// // //           // toothLabels={toothLabels}
// // //           toothLabels={viewLabels}

// // //           // latCurves={showSplines ? latCurves : NO_CURVES}
// // //           latCurves={viewCurves}
// // //           dragging={dragging}
// // //           onStartDrag={startDrag}
// // //           onStartTrimDrag={startTrimDrag}
// // //           onMoveDrag={moveDrag}
// // //           onEndDrag={endDrag}
// // //           showNumbers={showNumbers}
// // //           viewRequest={viewRequest}
// // //           showGrid={showGrid}
// // //           gridRef={gridRef}
// // //           gridSize={gridSize}
// // //           ghostParts={ghostParts}
// // //           occlusion={occlusion}

// // //         />

// // //         {/* Occlusion color scale: how deep the teeth overlap, 0.00 (just touching) at the bottom, 0.80 mm at the top */}
// // //         {occlusion && <OcclusionLegend />}

// // //         {/* Movement table on the left: movement of each tooth from Initial to Final Position */}
// // //         {movement && <MovementPanel movement={movement} onClose={() => setShowMovement(false)} />}

// // //         <VisibilityButtons
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           hasUpper={!!upper.geo}
// // //           hasLower={!!lower.geo}
// // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // //           onToggleLower={() => setShowLower((v) => !v)}
// // //           // segmentedUpper={!!segParts.upper}
// // //           // segmentedLower={!!segParts.lower}
// // //           segmentedUpper={!!viewParts.upper}
// // //           segmentedLower={!!viewParts.lower}
// // //           segVisible={segVisible}
// // //           onToggleSeg={toggleSeg}
// // //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// // //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// // //            showNumbers={showNumbers}
// // //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // // ---------------- Occlusion legend: the color bar on the right side ----------------
// // // const LEGEND_BAR_HEIGHT = 200;

// // // function OcclusionLegend() {
// // //   return (
// // //     <div
// // //       style={{
// // //         position: "absolute",
// // //         right: 204,
// // //         top: "50%",
// // //         // transform: "translateY(-50%)",
// // //         transform: "translateY(calc(-50% - 20px))",
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         alignItems: "center",
// // //         fontSize: 11,
// // //         color: "#ffffff",
// // //         pointerEvents: "none",
// // //         userSelect: "none",
// // //       }}
// // //     >
// // //       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             flexDirection: "column",
// // //             justifyContent: "space-between",
// // //             textAlign: "right",
// // //             margin: "-7px 0", // centers each number on its line
// // //           }}
// // //         >
// // //           {OCCLUSION_TICKS.map((t) => (
// // //             <span key={t}>{t.toFixed(2)}</span>
// // //           ))}
// // //         </div>
// // //         <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
// // //       </div>
// // //       {/* <div style={{ marginTop: 10, textAlign: "center", lineHeight: 1.3 }}>
// // //         overlap
// // //         <br />
// // //         mm
// // //       </div> */}
// // //       <div style={{ marginTop: 7 }}>mm</div>
// // //     </div>
// // //   );
// // // }






// // // // // // // // import { useState } from "react";
// // // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // // export default function App() {
// // // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // // //   const handleFile = async (type, file) => {
// // // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // // //     else setLower({ name: file.name, geo });
// // // // // // // //     setMessage("");

// // // // // // // //     // send the file to the backend
// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append("file", file);
// // // // // // // //       formData.append("type", type);
// // // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // // //       const result = await res.json();
// // // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // // //       <TopBar
// // // // // // // //         upperName={upper.name}
// // // // // // // //         lowerName={lower.name}
// // // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // // //         message={message}
// // // // // // // //       />
// // // // // // // //       <div style={{ flex: 1 }}>
// // // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }




// // // // // // // import { useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // // //   const [busy, setBusy] = useState(false);
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") {
// // // // // // //       setUpper({ name: file.name, geo });
// // // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // // //        setShowUpper(true);
// // // // // // //     } else {
// // // // // // //       setLower({ name: file.name, geo });
// // // // // // //       setLowerParts(null);
// // // // // // //         setShowLower(true);
// // // // // // //     }
// // // // // // //     setMessage("");

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // downloads every result STL of one jaw from the backend
// // // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // // //     Promise.all(
// // // // // // //       files.map(async (name) => {
// // // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // // //       })
// // // // // // //     );

// // // // // // //   const handleSegment = async () => {
// // // // // // //     if (!upper.geo || !lower.geo) {
// // // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setBusy(true);
// // // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // // //       const stamp = Date.now();
// // // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // // //       setMessage("Segmentation completed");
// // // // // // //     } catch (err) {
// // // // // // //       setMessage(err.message);
// // // // // // //     } finally {
// // // // // // //       setBusy(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         onSegment={handleSegment}
// // // // // // //         busy={busy}
// // // // // // //         message={message}
// // // // // // //       />
// // // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // // //         <Viewer
// // // // // // //           upperGeo={upper.geo}
// // // // // // //           lowerGeo={lower.geo}
// // // // // // //           upperParts={upperParts}
// // // // // // //           lowerParts={lowerParts}
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //         />

// // // // // // //          <VisibilityButtons
// // // // // // //           showUpper={showUpper}
// // // // // // //           showLower={showLower}
// // // // // // //           hasUpper={!!upper.geo}
// // // // // // //           hasLower={!!lower.geo}
// // // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }











// // // // // // import { useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setShowLower(true);
// // // // // //     }
// // // // // //     setMessage("");

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleIdentifyLat = async () => {
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) throw new Error(result.message);
// // // // // //       setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // the cutting step comes in a later phase
// // // // // //   // const handleCutTeeth = () => {
// // // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // // //   // };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // //         // onCutTeeth={handleCutTeeth}
// // // // // //         busy={busy}
// // // // // //         message={message}
// // // // // //       />

// // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //         />

// // // // // //         <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }















// // // // // // import { useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setShowLower(true);
// // // // // //     }
// // // // // //     setMessage("");
// // // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleIdentifyLat = async () => {
// // // // // //     // if (!upper.geo) {
// // // // // //     //   setProgress(null);
// // // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // // //     //   return;
// // // // // //     // }

// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //      setProgress(null);
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //       }

// // // // // //     setBusy(true);
// // // // // //     setMessage("");
// // // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // // //     try {
// // // // // //       // 1. start the job on the backend (answers immediately)
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // // //       const started = await res.json();
// // // // // //       if (!res.ok) throw new Error(started.message);

// // // // // //       // 2. ask the backend for the progress every second until it is done
// // // // // //       while (true) {
// // // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // // //         const job = await statusRes.json();

// // // // // //         if (job.error) throw new Error(job.error);
// // // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // // //         if (job.done) break;
// // // // // //       }
// // // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // // //       setTimeout(() => setProgress(null), 2000);
// // // // // //     } catch (err) {
// // // // // //       setProgress(null);
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onIdentifyLat={handleIdentifyLat}
// // // // // //         busy={busy}
// // // // // //         progress={progress}
// // // // // //         message={message}
// // // // // //       />

// // // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //         />

// // // // // //         <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }







// // // // // import { useCallback, useRef, useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";
// // // // // import { loadLatCurves } from "./latUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // //   const [message, setMessage] = useState("");

// // // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // // //   // dragging of one editable point
// // // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // // //   const [dragging, setDragging] = useState(false);

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setShowLower(true);
// // // // //     }
// // // // //     // a new scan: remove the old LAT of that jaw
// // // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // // //     setMessage("");
// // // // //     setProgress(null);

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   const handleIdentifyLat = async () => {
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       // 1. start the job on the backend (answers immediately)
// // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       // 2. ask the backend for the progress every second until it is done
// // // // //       let job;
// // // // //       while (true) {
// // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // //         job = await statusRes.json();

// // // // //         if (job.error) throw new Error(job.error);
// // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // //         if (job.done) break;
// // // // //       }

// // // // //       // 3. download the CSV files and show them as splines
// // // // //       const stamp = Date.now();
// // // // //       const csv = job.csvFiles || {};
// // // // //       setLatCurves({
// // // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // // //       });

// // // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // ---------------- editing of the splines ----------------
// // // // //   const startDrag = (jaw, id, index) => {
// // // // //     dragRef.current = { jaw, id, index };
// // // // //     setDragging(true);
// // // // //   };

// // // // //   const endDrag = useCallback(() => {
// // // // //     dragRef.current = null;
// // // // //     setDragging(false);
// // // // //   }, []);

// // // // //   // moves the dragged point to the surface point under the mouse
// // // // //   const moveDrag = (point) => {
// // // // //     const d = dragRef.current;
// // // // //     if (!d) return;

// // // // //     setLatCurves((prev) => ({
// // // // //       ...prev,
// // // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // // //         curve.id === d.id
// // // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // // //           : curve
// // // // //       ),
// // // // //     }));
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onIdentifyLat={handleIdentifyLat}
// // // // //         busy={busy}
// // // // //         progress={progress}
// // // // //         message={message}
// // // // //       />

// // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           latCurves={latCurves}
// // // // //           dragging={dragging}
// // // // //           onStartDrag={startDrag}
// // // // //           onMoveDrag={moveDrag}
// // // // //           onEndDrag={endDrag}
// // // // //         />

// // // // //         <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }











// // // // import { useCallback, useRef, useState } from "react";
// // // // import TopBar from "./TopBar.jsx";
// // // // import Viewer from "./Viewer.jsx";
// // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // import { parseStl } from "./stlUtils.js";
// // // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // // const BACKEND_URL = "http://localhost:5174";

// // // // export default function App() {
// // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // //   const [showUpper, setShowUpper] = useState(true);
// // // //   const [showLower, setShowLower] = useState(true);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // //   const [message, setMessage] = useState("");

// // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // // //   const latCurvesRef = useRef(latCurves);
// // // //   latCurvesRef.current = latCurves;

// // // //   // dragging of one editable point
// // // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // // //   const [dragging, setDragging] = useState(false);

// // // //   const handleFile = async (type, file) => {
// // // //     const geo = parseStl(await file.arrayBuffer());

// // // //     if (type === "upper") {
// // // //       setUpper({ name: file.name, geo });
// // // //       setShowUpper(true);
// // // //     } else {
// // // //       setLower({ name: file.name, geo });
// // // //       setShowLower(true);
// // // //     }
// // // //     // a new scan: remove the old LAT of that jaw
// // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // //     setMessage("");
// // // //     setProgress(null);

// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("file", file);
// // // //       formData.append("type", type);
// // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // //       const result = await res.json();
// // // //       if (!res.ok) setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // //     }
// // // //   };

// // // //   // asks the backend for the progress every second until the job is done
// // // //   const waitForJob = async (statusUrl) => {
// // // //     while (true) {
// // // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // // //       const res = await fetch(statusUrl);
// // // //       const job = await res.json();

// // // //       if (job.error) throw new Error(job.error);
// // // //       setProgress({ percent: job.percent, label: job.label });
// // // //       if (job.done) return job;
// // // //     }
// // // //   };

// // // //   // ---------------- Identify LAT button ----------------
// // // //   const handleIdentifyLat = async () => {
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // // //       // download the CSV files and show them as splines
// // // //       const stamp = Date.now();
// // // //       const csv = job.csvFiles || {};
// // // //       setLatCurves({
// // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // //       });

// // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // // //   const handleSegmentTeeth = async () => {
// // // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // // //       setProgress(null);
// // // //       setMessage("Please run Identify LAT first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // // //       // the files created by the exe (also printed in the backend terminal)
// // // //       console.log("Segment output files:", job.newFiles);

// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------------- editing of the splines ----------------
// // // //   const startDrag = (jaw, id, index) => {
// // // //     dragRef.current = { jaw, id, index, moved: false };
// // // //     setDragging(true);
// // // //   };

// // // //   // when the mouse button is released: save the edited curve to its csv file
// // // //   const endDrag = useCallback(async () => {
// // // //     const d = dragRef.current;
// // // //     dragRef.current = null;
// // // //     setDragging(false);

// // // //     if (!d || !d.moved) return; // nothing was changed

// // // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // // //     if (!curve) return;

// // // //     try {
// // // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // // //       setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // // //     }
// // // //   }, []);

// // // //   // moves the dragged point to the surface point under the mouse
// // // //   const moveDrag = (point) => {
// // // //     const d = dragRef.current;
// // // //     if (!d) return;

// // // //     const current = latCurvesRef.current;
// // // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // // //     if (!curve) return;

// // // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // // //     d.moved = true;

// // // //     // update the ref at once, so a save right after the last move uses the newest points
// // // //     latCurvesRef.current = {
// // // //       ...current,
// // // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // // //     };
// // // //     setLatCurves(latCurvesRef.current);
// // // //   };

// // // //   return (
// // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // //       <TopBar
// // // //         upperName={upper.name}
// // // //         lowerName={lower.name}
// // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // //         onIdentifyLat={handleIdentifyLat}
// // // //         onSegment={handleSegmentTeeth}
// // // //         busy={busy}
// // // //         progress={progress}
// // // //         message={message}
// // // //       />

// // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // //         <Viewer
// // // //           upperGeo={upper.geo}
// // // //           lowerGeo={lower.geo}
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           latCurves={latCurves}
// // // //           dragging={dragging}
// // // //           onStartDrag={startDrag}
// // // //           onMoveDrag={moveDrag}
// // // //           onEndDrag={endDrag}
// // // //         />

// // // //         <VisibilityButtons
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           hasUpper={!!upper.geo}
// // // //           hasLower={!!lower.geo}
// // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }












// // // import { useCallback, useRef, useState } from "react";
// // // import TopBar from "./TopBar.jsx";
// // // import Viewer from "./Viewer.jsx";
// // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // import { parseStl } from "./stlUtils.js";
// // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // const BACKEND_URL = "http://localhost:5174";
// // // const NO_CURVES = { upper: [], lower: [] };

// // // export default function App() {
// // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // //   const [lower, setLower] = useState({ name: "", geo: null });
// // //   const [showUpper, setShowUpper] = useState(true);
// // //   const [showLower, setShowLower] = useState(true);
// // //   const [busy, setBusy] = useState(false);
// // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // //   const [message, setMessage] = useState("");

// // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // //   const [showSplines, setShowSplines] = useState(true);
// // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // //   const latCurvesRef = useRef(latCurves);
// // //   latCurvesRef.current = latCurves;

// // //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// // //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// // //   // dragging of one editable point
// // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // //   const [dragging, setDragging] = useState(false);

// // //   const handleFile = async (type, file) => {
// // //     const geo = parseStl(await file.arrayBuffer());

// // //     if (type === "upper") {
// // //       setUpper({ name: file.name, geo });
// // //       setShowUpper(true);
// // //     } else {
// // //       setLower({ name: file.name, geo });
// // //       setShowLower(true);
// // //     }
// // //     // a new scan: remove the old LAT and the old separated parts of that jaw
// // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // //     setSegParts((prev) => ({ ...prev, [type]: null }));
// // //     setMessage("");
// // //     setProgress(null);

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

// // //   // asks the backend for the progress every second until the job is done
// // //   const waitForJob = async (statusUrl) => {
// // //     while (true) {
// // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // //       const res = await fetch(statusUrl);
// // //       const job = await res.json();

// // //       if (job.error) throw new Error(job.error);
// // //       setProgress({ percent: job.percent, label: job.label });
// // //       if (job.done) return job;
// // //     }
// // //   };

// // //   // ---------------- Identify LAT button ----------------
// // //   const handleIdentifyLat = async () => {
// // //     if (!upper.geo || !lower.geo) {
// // //       setProgress(null);
// // //       setMessage("Please upload both Upper and Lower scan models first");
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // //       // download the CSV files and show them as splines
// // //       const stamp = Date.now();
// // //       const csv = job.csvFiles || {};
// // //       setLatCurves({
// // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // //       });
// // //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// // //       setShowSplines(true);

// // //       // keep the green "completed" bar for 2 seconds, then hide it
// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // //   const handleSegmentTeeth = async () => {
// // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // //       setProgress(null);
// // //       setMessage("Please run Identify LAT first");
// // //       return;
// // //     }

// // //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // //       // the files created by the exe (also printed in the backend terminal)
// // //       console.log("Segment output files:", job.newFiles);

// // //       // download the gum and teeth STL files and show them
// // //       const stamp = Date.now();
// // //       const stl = job.stlFiles || {};
// // //       setSegParts({
// // //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// // //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// // //       });

// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setShowSplines(true); // Segment failed, so the splines come back
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // ---------------- editing of the splines ----------------
// // //   const startDrag = (jaw, id, index) => {
// // //     dragRef.current = { jaw, id, index, moved: false };
// // //     setDragging(true);
// // //   };

// // //   // when the mouse button is released: save the edited curve to its csv file
// // //   const endDrag = useCallback(async () => {
// // //     const d = dragRef.current;
// // //     dragRef.current = null;
// // //     setDragging(false);

// // //     if (!d || !d.moved) return; // nothing was changed

// // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // //     if (!curve) return;

// // //     try {
// // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // //       setMessage(result.message);
// // //       setTimeout(() => setMessage(""), 2000);
// // //     } catch (err) {
// // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // //     }
// // //   }, []);

// // //   // moves the dragged point to the surface point under the mouse
// // //   const moveDrag = (point) => {
// // //     const d = dragRef.current;
// // //     if (!d) return;

// // //     const current = latCurvesRef.current;
// // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // //     if (!curve) return;

// // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // //     d.moved = true;

// // //     // update the ref at once, so a save right after the last move uses the newest points
// // //     latCurvesRef.current = {
// // //       ...current,
// // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // //     };
// // //     setLatCurves(latCurvesRef.current);
// // //   };

// // //   return (
// // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // //       <TopBar
// // //         upperName={upper.name}
// // //         lowerName={lower.name}
// // //         onUpperSelected={(file) => handleFile("upper", file)}
// // //         onLowerSelected={(file) => handleFile("lower", file)}
// // //         onIdentifyLat={handleIdentifyLat}
// // //         onSegment={handleSegmentTeeth}
// // //         busy={busy}
// // //         progress={progress}
// // //         message={message}
// // //       />

// // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // //         <Viewer
// // //           upperGeo={upper.geo}
// // //           lowerGeo={lower.geo}
// // //           upperParts={segParts.upper}
// // //           lowerParts={segParts.lower}
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           latCurves={showSplines ? latCurves : NO_CURVES}
// // //           dragging={dragging}
// // //           onStartDrag={startDrag}
// // //           onMoveDrag={moveDrag}
// // //           onEndDrag={endDrag}
// // //         />

// // //         <VisibilityButtons
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           hasUpper={!!upper.geo}
// // //           hasLower={!!lower.geo}
// // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // //           onToggleLower={() => setShowLower((v) => !v)}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

















// // import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // import TopBar from "./TopBar.jsx";
// // import Viewer from "./Viewer.jsx";
// // import VisibilityButtons from "./VisibilityButtons.jsx";
// // import { parseStl } from "./stlUtils.js";
// // import { removeTeeth } from "./gumUtils.js";
// // import { deformGum } from "./gumDeform.js";
// // import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";
// // import { computeMovement } from "./movement.js";
// // import MovementPanel from "./MovementPanel.jsx";
// // import { computeStaging, toothMatrixAtStage, gumAtStage } from "./staging.js";
// // import StagingBar from "./StagingBar.jsx";


// // // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// // const BACKEND_URL = "http://localhost:5174";
// // const NO_CURVES = { upper: [], lower: [] };
// // const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// // const NO_RESULT = { upper: null, lower: null };

// // const NO_LABELS = { upper: [], lower: [] };
// // // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// // const BARS_HEIGHT = 88;
// // // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// // const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// // const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// // const GRID_IMAGE = [
// //   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// //   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
// //   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// //   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// // ].join(", ");
// // // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // // without running Clean Model or Identify LAT again (the old Output folder is kept)
// // const KEEP_OUTPUT_ON_UPLOAD = false;
// // const NO_PARTS = { upper: null, lower: null };

  

// // const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // // when a step runs, only these steps become "not done" again
// // const RESETS = {
// //   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
// //   generateTrimline: ["trimModel", "addBase"],
// //   trimModel: ["addBase"],
// //   addBase: [],
// //   identifyLat: ["segment","automaticSetup"],
// //   segment: ["automaticSetup"],
// //     automaticSetup: [],
// // };

// // const NOT_DONE = {
// //   cleanModel: false,
// //   identifyLat: false,
// //   segment: false,
// //   generateTrimline: false,
// //   trimModel: false,
// //   addBase: false,
// //   automaticSetup: false,
// // };




// // // button name used by the backend -> step name
// // const COMMAND_TO_STEP = {
// //   GenerateTrimline: "generateTrimline",
// //   TrimModel: "trimModel",
// //   AddBase: "addBase",
// // };
// // const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // // step that must be finished before this step can run
// // const REQUIRED_BEFORE = {
// //   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
// //   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// // };



// // // button text in the Clean Model tab -> command sent to the backend
// // const NEW_EXE_COMMANDS = {
// //   "Generate Trimline": "GenerateTrimline",
// //   "Trim Model": "TrimModel",
// //   "Add Base": "AddBase",
// // };

// // export default function App() {
// //   const [upper, setUpper] = useState({ name: "", geo: null });
// //   const [lower, setLower] = useState({ name: "", geo: null });
// //   const [showUpper, setShowUpper] = useState(true);
// //   const [showLower, setShowLower] = useState(true);
// //   const [busy, setBusy] = useState(false);
// //   const [progress, setProgress] = useState(null); // { percent, label } or null
// //   const [message, setMessage] = useState("");

// //   // which buttons already produced a result
// // const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // // const [segmenterReady, setSegmenterReady] = useState(false);

// // const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // // marks a step as done and resets the steps after it
// // // const markDone = (step) =>
// // //   setDoneSteps((prev) => {
// // //     const next = { ...prev };
// // //     STEP_ORDER.forEach((s, i) => {
// // //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// // //     });
// // //     next[step] = true;
// // //     return next;
// // //   });



// // const markDone = (step) =>
// //   setDoneSteps((prev) => {
// //     const next = { ...prev };
// //     RESETS[step].forEach((s) => (next[s] = false));
// //     next[step] = true;
// //     return next;
// //   });

// // // shows the alert and returns true if the step was already done
// // // const alreadyDone = (step) => {
// // //   if (doneSteps[step]) {
// // //     alert(DONE_MESSAGES[step]);
// // //     return true;
// // //   }
// // //   return false;
// // // };


// // // if the step is already done: show its stored result and do not run the exe again
// // const showIfDone = (step) => {
// //   if (doneSteps[step]) {
// //     setView(step);
// //     setMessage("");
// //     return true;
// //   }
// //   return false;
// // };

// //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// //   const [showSplines, setShowSplines] = useState(true);
// //   // always holds the newest curves (used when a drag ends and the curve is saved)
// //   const latCurvesRef = useRef(latCurves);
// //   latCurvesRef.current = latCurves;

// //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// //   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// // const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

// //   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
// //   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
// //   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


// //   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
// //   const [trimlines, setTrimlines] = useState(NO_RESULT);
// //   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// // const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// // const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // // which result is shown: "scan" or the name of a step
// // const [view, setView] = useState("scan");

// //     // always holds the newest trimlines (used while a point is dragged and when it is saved)
// //   const trimlinesRef = useRef(trimlines);
// //   trimlinesRef.current = trimlines;

// //     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
// //   const [toothLabels, setToothLabels] = useState(NO_LABELS);
// //        const [showNumbers, setShowNumbers] = useState(true);
// //        const [showGrid, setShowGrid] = useState(false);
// //        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// // const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// // const [showSuperimpose, setShowSuperimpose] = useState(false);
// // const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off
// // const [showMovement, setShowMovement] = useState(false); // Movement table on/off
// // const [stage, setStage] = useState(0); // Staging: the stage shown (0 = Initial Position)
// // const [playing, setPlaying] = useState(false); // Staging: Play is running

// //        const [viewRequest, setViewRequest] = useState(null);



// //   // dragging of one editable point
// //   const dragRef = useRef(null); // { jaw, id, index, moved }
// //   const [dragging, setDragging] = useState(false);

// //   const handleFile = async (type, file) => {
// //     const geo = parseStl(await file.arrayBuffer());

// //     if (type === "upper") {
// //       setUpper({ name: file.name, geo });
// //       setShowUpper(true);
// //     } else {
// //       setLower({ name: file.name, geo });
// //       setShowLower(true);
// //     }
// //     // a new scan: remove the old LAT and the old separated parts of that jaw
// //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// //     setSegParts((prev) => ({ ...prev, [type]: null }));
// //     setSetupParts((prev) => ({ ...prev, [type]: null }));

// //     setToothLabels((prev) => ({ ...prev, [type]: [] }));
// //     setSegVisible(ALL_VISIBLE);

// //       // setTrimlines((prev) => ({ ...prev, [type]: null }));
// //       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


// //    setTrimlines((prev) => ({ ...prev, [type]: null }));
// //    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
// //    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
// //    setView("scan");
// //    setShowSuperimpose(false);
// //    setShowOcclusion(false);
// //    setShowMovement(false);

// //     setMessage("");
// //     setDoneSteps(NOT_DONE);
// //     setSegmenterReady(false);
// //     setProgress(null);

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

// //   // asks the backend for the progress every second until the job is done.
// //   // The backend only knows when a whole exe step finishes (0, 50, 100 ...),
// //   // so the number on the bar climbs 1% at a time by itself while the exe works
// //   // (never past 99), catches up 1% at a time when the backend is ahead,
// //   // and only reaches 100% when the job is really done.
// //   const waitForJob = (statusUrl) =>
// //     new Promise((resolve, reject) => {
// //       let shown = 0;          // number shown on the bar
// //       let target = 0;         // real percent from the backend
// //       let label = "Starting...";
// //       let doneJob = null;     // set when the backend says done
// //       let stopped = false;
// //       let lastStep = Date.now();

// //       // every 25 ms: decide whether to add 1%
// //       const timer = setInterval(() => {
// //         if (stopped) return;
// //         const now = Date.now();
// //         // slow climb while waiting: 0.5 s per 1% at the start, about 4.5 s per 1% near 99
// //         const waitMs = 500 + shown * 40;
// //         if (shown < target) {
// //           shown++;               // backend is ahead (or done): catch up fast, 1% at a time
// //           lastStep = now;
// //         } else if (!doneJob && shown < 99 && now - lastStep >= waitMs) {
// //           shown++;               // exe still working: creep up 1%
// //           lastStep = now;
// //         } else if (!doneJob) {
// //           return;                // nothing changed
// //         }
// //         setProgress({ percent: shown, label });
// //         if (doneJob && shown >= 100) {
// //           stopped = true;
// //           clearInterval(timer);
// //           resolve(doneJob);
// //         }
// //       }, 25);

// //       // ask the backend 4 times a second, so the end of the job is noticed quickly
// //       (async () => {
// //         while (!stopped) {
// //           await new Promise((r) => setTimeout(r, 250));
// //           try {
// //             const res = await fetch(statusUrl);
// //             const job = await res.json();
// //             if (job.error) throw new Error(job.error);
// //             target = Math.max(target, job.percent || 0);
// //             if (job.label) label = job.label;
// //             if (job.done) {
// //               // job finished: show 100% at once and load the output right away
// //               stopped = true;
// //               clearInterval(timer);
// //               setProgress({ percent: 100, label });
// //               resolve(job);
// //               return;
// //             }
// //           } catch (err) {
// //             stopped = true;
// //             clearInterval(timer);
// //             reject(err);
// //             return;
// //           }
// //         }
// //       })();
// //     });

// //   // ---------------- Identify LAT button ----------------
// //   const handleIdentifyLat = async () => {
// //     // if (alreadyDone("identifyLat")) return;
// //     if (showIfDone("identifyLat")) return;
// //     if (!upper.geo || !lower.geo) {
// //       setProgress(null);
// //       setMessage("Please upload both Upper and Lower scan models first");
      
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// //       // download the CSV files and show them as splines
// //       const stamp = Date.now();
// //       const csv = job.csvFiles || {};
// //       // both jaws download at the same time
// //       const [latUpper, latLower] = await Promise.all([
// //         loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// //         loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// //       ]);
// //       setLatCurves({ upper: latUpper, lower: latLower });
// //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// //       setToothLabels(NO_LABELS);
// //       setSegVisible(ALL_VISIBLE);
// //       setShowSplines(true);


// //       // setTrimlines(NO_RESULT);
// //       // setResultMeshes(NO_RESULT);
// //       markDone("identifyLat");
// //       setView("identifyLat");

// //       setSegmenterReady(true);

// //       // keep the green "completed" bar for 2 seconds, then hide it
// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   // ---------------- Segment button (separates teeth and gum) ----------------
// //   const handleSegmentTeeth = async () => {
// //     // if (alreadyDone("segment")) return;
// //     if (showIfDone("segment")) return;
// //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// //       setProgress(null);
// //       setMessage("Please run Identify LAT first");
// //       return;
// //     }
// //      setShowNumbers(true);

// //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// //       // the files created by the exe (also printed in the backend terminal)
// //       console.log("Segment output files:", job.newFiles);

// //       // download the gum and teeth STL files and show them
// //       const stamp = Date.now();
// //       const stl = job.stlFiles || {};
// //       const numbers = job.numberFiles || {};
// //       // teeth, gum and number labels of both jaws download at the same time
// //       const [partsUpper, partsLower, labelsUpper, labelsLower] = await Promise.all([
// //         loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// //         loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// //         loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
// //         loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
// //       ]);
// //       setSegParts({ upper: partsUpper, lower: partsLower });
// //       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
// //       // the tooth number labels (two points per tooth, from the TeethNumber exe)
// //       setToothLabels({ upper: labelsUpper, lower: labelsLower });
// //       markDone("segment");
// //       setView("segment");

// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setShowSplines(true); // Segment failed, so the splines come back
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };


// //     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
// //   // downloads one scan file from the backend again
// //   const loadScan = async (jaw, fileName, stamp) => {
// //     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
// //     return parseStl(await res.arrayBuffer());
// //   };

// //   const handleCleanModel = async () => {
// //     // if (alreadyDone("cleanModel")) return;
// //     if (showIfDone("cleanModel")) return;
// //     if (!upper.geo || !lower.geo) {
// //       setProgress(null);
// //       setMessage("Please upload both Upper and Lower scan models first");
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// //             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

// //       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
// //       const stamp = Date.now();
// //       // both scans download at the same time
// //       const [upperGeo, lowerGeo] = await Promise.all([
// //         loadScan("upper", "Upper.stl", stamp),
// //         loadScan("lower", "Lower.stl", stamp),
// //       ]);
// //       setUpper((prev) => ({ ...prev, geo: upperGeo }));
// //       setLower((prev) => ({ ...prev, geo: lowerGeo }));

// //       // old LAT curves and separated parts do not match the cleaned scans
// //       // setLatCurves({ upper: [], lower: [] });
// //       // setSegParts({ upper: null, lower: null });
// //       // setSegVisible(ALL_VISIBLE);
// //       // setShowSplines(true);


// //             // old LAT curves do not match the cleaned scans
// //       setLatCurves({ upper: [], lower: [] });
// //       setShowSplines(true);


// //       setTrimlines(NO_RESULT);
// //       // setResultMeshes(NO_RESULT);
// //       setTrimModelMeshes(NO_RESULT);
// //       setBaseMeshes(NO_RESULT);

// //       // setToothLabels(NO_LABELS);

// //       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
// //       // const stl = job.stlFiles || {};
// //       // setSegParts({
// //       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// //       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// //       // });
// //       // setSegVisible(ALL_VISIBLE);

// //        setToothLabels(NO_LABELS);
// //       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
// //       setSegParts({ upper: null, lower: null });
// //       setSegVisible(ALL_VISIBLE);
// //       markDone("cleanModel");
// //       setView("cleanModel");
// //       setSegmenterReady(true);

// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// //   // const handleToolClick = (tool) => {
// //   //   if (busy) return;
// //   //   if (tool === "Clean Model") handleCleanModel();
// //   // };



// //   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
// //   const runNewExeCommand = async (commandKey) => {
// //     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
// //     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
// //   //   if (!segmenterReady) {
// //   //  alert(NEED_SEGMENTER_MESSAGE);
// //   //  return;
// //   //  }

// //   if (!segmenterReady) {
// //   // the flag is false (for example after a refresh), so ask the backend about the real files
// //   let ready = false;
// //   try {
// //     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
// //     ready = (await res.json()).ready;
// //   } catch (err) {
// //     ready = false;
// //   }
// //   if (!ready) {
// //     alert(NEED_SEGMENTER_MESSAGE);
// //     return;
// //   }
// // }



// //    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
// //    if (required && !doneSteps[required.step]) {
// //   alert(required.message);
// //   return;
// //   }
// //     if (!upper.geo || !lower.geo) {
// //       setProgress(null);
// //       setMessage("Please upload both Upper and Lower scan models first");
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// //       // the files created or changed by the exe (also printed in the backend terminal)
// //       // console.log(`${commandKey} output files:`, job.report);



// //         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

// //       // the files created or changed by the exe (also printed in the backend terminal)
// //       console.log(`${commandKey} output files:`, job.report);

// //       // show the result in the 3D view
// //       const stamp = Date.now();
// //       const missing = [];
// //       for (const jaw of ["upper", "lower"]) {
// //         const rel = job.files ? job.files[jaw] : null;
// //         if (!rel) {
// //           missing.push(jaw);
// //           continue;
// //         }
// //         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

// //         // if (commandKey === "GenerateTrimline") {
// //         //   const points = await loadPointsFile(url);
// //         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
// //         // } else {

// //         //   if (commandKey === "GenerateTrimline") {
// //         //   const points = await loadPointsFile(url);
// //         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
// //         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
// //         // } else {
// //         //   const geo = await loadStlFile(url);
// //         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
// //         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
// //         // }


// //           if (commandKey === "GenerateTrimline") {
// //      const points = await loadPointsFile(url);
// //      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
// //     } else {
// //     const geo = await loadStlFile(url);
// //     if (commandKey === "TrimModel") {
// //     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
// //    } else {
// //     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
// //   }
// // }


// //       }

// //       // if (missing.length > 0) {
// //       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
// //       // }

// //       if (missing.length > 0) {
// //     setMessage(`Result file not found for: ${missing.join(", ")}`);
// //    } else {
// //      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
// //      setView(COMMAND_TO_STEP[commandKey]);
// //    }


// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// // // ---------------- Automatic Setup button ----------------
// // // const handleAutomaticSetup = async () => {
// // //   if (busy) return;

// // //   if (doneSteps.automaticSetup) {
// // //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// // //     return;
// // //   }
// // //   if (!doneSteps.segment) {
// // //     alert("Please do Segment first.");
// // //     return;
// // //   }

// // //   setBusy(true);
// // //   setMessage("");
// // //   setProgress({ percent: 0, label: "Starting..." });

// // //   try {
// // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // //     const started = await res.json();
// // //     if (!res.ok) throw new Error(started.message);

// // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// // //     // the files made by the exe (also printed in the backend terminal)
// // //     console.log("Automatic Setup output files:", job.files);

// // //     markDone("automaticSetup");
// // //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// // //     setTimeout(() => setProgress(null), 2000);
// // //   } catch (err) {
// // //     setProgress(null);
// // //     setMessage(err.message);
// // //   } finally {
// // //     setBusy(false);
// // //   }
// // // };




// // // const handleAutomaticSetup = async () => {
// // //   if (busy) return;

// // //   // already done: only show the stored result, the exe is not called again
// // //   if (doneSteps.automaticSetup) {
// // //     setView("automaticSetup");
// // //     setMessage("");
// // //     return;
// // //   }
// // //   if (!doneSteps.segment) {
// // //     alert("Please do Segment first.");
// // //     return;
// // //   }

// // //   setBusy(true);
// // //   setMessage("");
// // //   setProgress({ percent: 0, label: "Starting..." });

// // //   try {
// // //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// // //     const started = await res.json();
// // //     if (!res.ok) throw new Error(started.message);

// // //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// // //     console.log("Automatic Setup output files:", job.files);

// // //     // download the STL files that the exe made, for each jaw
// // //     const stamp = Date.now();
// // //     const parts = { upper: [], lower: [] };
// // //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// // //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// // //       if (jaw !== "upper" && jaw !== "lower") continue;
// // //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// // //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// // //     }

// // //     markDone("automaticSetup");

// // //     if (parts.upper.length + parts.lower.length === 0) {
// // //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// // //     } else {
// // //       setSetupParts({
// // //         upper: parts.upper.length ? parts.upper : null,
// // //         lower: parts.lower.length ? parts.lower : null,
// // //       });
// // //       setView("automaticSetup");
// // //     }

// // //     setTimeout(() => setProgress(null), 2000);
// // //   } catch (err) {
// // //     setProgress(null);
// // //     setMessage(err.message);
// // //   } finally {
// // //     setBusy(false);
// // //   }
// // // };


// // const handleAutomaticSetup = async () => {
// //   if (busy) return;

// //   // already done: only show the stored result, the exe is not called again
// //   if (doneSteps.automaticSetup) {
// //     setView("automaticSetup");
// //     setMessage("");
// //     return;
// //   }
// //   if (!doneSteps.segment) {
// //     alert("Please do Segment first.");
// //     return;
// //   }

// //   setBusy(true);
// //   setMessage("");
// //   setProgress({ percent: 0, label: "Starting..." });

// //   try {
// //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// //     const started = await res.json();
// //     if (!res.ok) throw new Error(started.message);

// //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// //     console.log("Automatic Setup output files:", job.files);

// //     // download the tooth STL files that the exe made, for each jaw
// //     const stamp = Date.now();
// //     const parts = { upper: [], lower: [] };
// //     // only tooth files like 11_final.stl (this skips all_final.stl)
// //     const toothFiles = (job.files || [])
// //       .map((rel) => ({ rel, m: rel.split("/").pop().match(/^(\d)(\d)_final\.stl$/i) }))
// //       .filter((f) => f.m);
// //     // all tooth files download at the same time (the order is kept)
// //     const geos = await Promise.all(
// //       toothFiles.map((f) => loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${f.rel}?t=${stamp}`))
// //     );
// //     toothFiles.forEach(({ m }, i) => {
// //       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
// //       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";
// //       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
// //       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo: geos[i] });
// //     });

// //     if (parts.upper.length + parts.lower.length > 0) {
// //       setSetupParts({
// //         upper: parts.upper.length ? parts.upper : null,
// //         lower: parts.lower.length ? parts.lower : null,
// //       });
// //       markDone("automaticSetup");
// //       setView("automaticSetup");
// //     } else {
// //       console.warn("Automatic Setup made no STL files to show:", job.files);
// //     }

// //     setTimeout(() => setProgress(null), 2000);
// //   } catch (err) {
// //     setProgress(null);
// //     setMessage(err.message);
// //   } finally {
// //     setBusy(false);
// //   }
// // };


// // // Initial Position: the Segment result (no exe is called)
// // const handleInitialPosition = () => {
// //   if (busy) return;
// //   setView("segment");
// //   setMessage("");
// // };

// // // Final Position: the Automatic Setup result (no exe is called)
// // const handleFinalPosition = () => {
// //   if (busy) return;
// //   setView("automaticSetup");
// //   setMessage("");
// // };

// //   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

// //   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
// //   const handleToolClick = (tool) => {
// //     if (busy) return;
// //     if (tool === "Clean Model") handleCleanModel();
// //     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
// //   };

















// //   // ---------------- editing of the splines ----------------
// //   // const startDrag = (jaw, id, index) => {
// //   //   dragRef.current = { jaw, id, index, moved: false };
// //   //   setDragging(true);
// //   // };

// //   // // when the mouse button is released: save the edited curve to its csv file
// //   // const endDrag = useCallback(async () => {
// //   //   const d = dragRef.current;
// //   //   dragRef.current = null;
// //   //   setDragging(false);

// //   //   if (!d || !d.moved) return; // nothing was changed

// //   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// //   //   if (!curve) return;

// //   //   try {
// //   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// //   //     setMessage(result.message);
// //   //     setTimeout(()=>setMessage(""),2000);
// //   //   } catch (err) {
// //   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// //   //   }
// //   // }, []);

// //   // // moves the dragged point to the surface point under the mouse
// //   // const moveDrag = (point) => {
// //   //   const d = dragRef.current;
// //   //   if (!d) return;

// //   //   const current = latCurvesRef.current;
// //   //   const curve = current[d.jaw].find((c) => c.id === d.id);
// //   //   if (!curve) return;

// //   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// //   //   d.moved = true;

// //   //   // update the ref at once, so a save right after the last move uses the newest points
// //   //   latCurvesRef.current = {
// //   //     ...current,
// //   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// //   //   };
// //   //   setLatCurves(latCurvesRef.current);
// //   // };


// //     // ---------------- editing of the splines and of the trimline ----------------
// //   // a LAT point of one tooth
// //   const startDrag = (jaw, id, index) => {
// //     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
// //     setDragging(true);
// //   };

// //   // a point of the trimline
// //   const startTrimDrag = (jaw, index) => {
// //     dragRef.current = { kind: "trim", jaw, index, moved: false };
// //     setDragging(true);
// //   };

// //   // when the mouse button is released: save the edited curve to its csv file
// //   const endDrag = useCallback(async () => {
// //     const d = dragRef.current;
// //     dragRef.current = null;
// //     setDragging(false);

// //     if (!d || !d.moved) return; // nothing was changed

// //     try {
// //       if (d.kind === "trim") {
// //         const trimline = trimlinesRef.current[d.jaw];
// //         if (!trimline) return;
// //         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
// //         setMessage(result.message);
// //         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

// //       } else {
// //         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// //         if (!curve) return;
// //         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// //         setMessage(result.message);
// //          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
// //       }
// //     } catch (err) {
// //       setMessage(`Could not save: ${err.message}`);
// //     }
// //   }, []);

// //   // moves the dragged point to the surface point under the mouse
// //   const moveDrag = (point) => {
// //     const d = dragRef.current;
// //     if (!d) return;

// //     // a point of the trimline
// //     if (d.kind === "trim") {
// //       const trimline = trimlinesRef.current[d.jaw];
// //       if (!trimline) return;

// //       d.moved = true;
// //       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
// //       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
// //       setTrimlines(trimlinesRef.current);
// //       return;
// //     }

// //     // a LAT point of one tooth
// //     const current = latCurvesRef.current;
// //     const curve = current[d.jaw].find((c) => c.id === d.id);
// //     if (!curve) return;

// //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// //     d.moved = true;

// //     // update the ref at once, so a save right after the last move uses the newest points
// //     latCurvesRef.current = {
// //       ...current,
// //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// //     };
// //     setLatCurves(latCurvesRef.current);
// //   };

// //   // only the result of the selected step is shown, everything else is hidden
// // const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // // const viewParts =
// // //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // // const setupWithGum = (jaw) => {
// // //   const teeth = setupParts[jaw];
// // //   if (!teeth) return null;
// // //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// // //   const gum = (segParts[jaw] || []).filter(isGumPart);
// // //   return [...gum, ...teeth];
// // // };
// // // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// // const wholeGum = useMemo(() => {
// //   const build = (parts) => {
// //     if (!parts) return null;
// //     const whole = parts.find(isWholePart);
// //     if (!whole) return null;
// //     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
// //     const geo = removeTeeth(whole.geo, teeth);
// //     return geo ? { name: "GumWithBase.stl", geo } : null;
// //   };
// //   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// // }, [segParts]);

// // // gum that follows the moved teeth (Automatic Setup result)
// // const deformedGum = useMemo(() => {
// //   const build = (jaw) => {
// //     const moved = setupParts[jaw];
// //     if (!moved || moved.some(isGumPart)) return null;
// //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// //     if (!base) return null;
// //     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// //     const geo = deformGum(base.geo, orig, moved);
// //     return geo ? { name: "GumDeformed.stl", geo } : null;
// //   };
// //   return { upper: build("upper"), lower: build("lower") };
// // }, [setupParts, segParts, wholeGum]);

// // const setupWithGum = (jaw) => {
// //   const teeth = setupParts[jaw];
// //   if (!teeth) return null;
// //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// //   // const gum = wholeGum[jaw]
// //   //   ? [wholeGum[jaw]]
// //   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

// //     const gum = deformedGum[jaw]
// //     ? [deformedGum[jaw]]
// //     : wholeGum[jaw]
// //     ? [wholeGum[jaw]]
// //     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
// //   return [...gum, ...teeth];
// // };
// // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // const superimposeActive = showSuperimpose && view === "automaticSetup";

// // const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// // const ghostParts = superimposeActive
// //   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
// //   : NO_PARTS;

// // const handleToggleSuperimpose = () => {
// //   if (busy) return;
// //   if (superimposeActive) {
// //     setShowSuperimpose(false);
// //   } else {
// //     setShowSuperimpose(true);
// //     setView("automaticSetup"); // Superimpose compares with the final position
// //   }
// // };

// // // ---------------- Staging: the movement from Initial to Final Position in small steps ----------------
// // // max 0.2 mm and 2 degrees per tooth per stage (staging.js); the timeline at the bottom picks the stage
// // const stagingTeeth = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // const stagingActive =
// //   view === "staging" && stagingTeeth(setupParts.upper).length + stagingTeeth(setupParts.lower).length > 0;

// // // measured once per Automatic Setup result, not on every stage
// // const staging = useMemo(() => {
// //   if (!stagingActive) return null;
// //   try {
// //     return computeStaging(
// //       { upper: stagingTeeth(segParts.upper), lower: stagingTeeth(segParts.lower) },
// //       { upper: stagingTeeth(setupParts.upper), lower: stagingTeeth(setupParts.lower) }
// //     );
// //   } catch (err) {
// //     console.error("Staging failed:", err);
// //     return null;
// //   }
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [stagingActive, segParts, setupParts]);
// // const stageCount = staging ? staging.stageCount : 0;
// // const shownStage = Math.min(stage, stageCount);

// // // gum of each jaw at the shown stage
// // const stagingGum = useMemo(() => {
// //   if (!staging) return NO_PARTS;
// //   const build = (jaw) => {
// //     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
// //     if (!base) return null;
// //     const final = deformedGum[jaw];
// //     return { name: base.name, geo: gumAtStage(base.geo, final && final.geo, shownStage, stageCount) };
// //   };
// //   return { upper: build("upper"), lower: build("lower") };
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [staging, shownStage, wholeGum, deformedGum, segParts]);

// // // the gum made for one stage is thrown away when the next stage is shown
// // useEffect(() => {
// //   return () => {
// //     for (const jaw of ["upper", "lower"]) {
// //       const g = stagingGum[jaw];
// //       if (!g) continue;
// //       const keep = [wholeGum[jaw]?.geo, deformedGum[jaw]?.geo, (segParts[jaw] || []).find(isGumPart)?.geo];
// //       if (!keep.includes(g.geo)) g.geo.dispose();
// //     }
// //   };
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [stagingGum]);

// // // the Initial teeth, each with the matrix that moves it to the shown stage
// // const stagingParts = (jaw) => {
// //   if (!staging) return null;
// //   const teeth = stagingTeeth(segParts[jaw]).map((p) => {
// //     const t = staging.teeth[p.name];
// //     return t ? { ...p, matrix: toothMatrixAtStage(t, shownStage, stageCount) } : p;
// //   });
// //   if (!teeth.length) return null;
// //   return stagingGum[jaw] ? [stagingGum[jaw], ...teeth] : teeth;
// // };
// // const stagingView = { upper: stagingParts("upper"), lower: stagingParts("lower") };

// // // Play: one stage every STAGE_PLAY_MS until the last stage
// // const STAGE_PLAY_MS = 400;
// // useEffect(() => {
// //   if (!playing) return;
// //   if (!stagingActive || shownStage >= stageCount) {
// //     setPlaying(false);
// //     return;
// //   }
// //   const timer = setTimeout(() => setStage(shownStage + 1), STAGE_PLAY_MS);
// //   return () => clearTimeout(timer);
// // }, [playing, stagingActive, shownStage, stageCount]);

// // const handlePlay = () => {
// //   if (shownStage >= stageCount) setStage(0); // at the end: play again from the start
// //   setPlaying(true);
// // };

// // const handleStaging = () => {
// //   if (busy) return;
// //   if (!doneSteps.automaticSetup) {
// //     alert("Staging goes from Initial Position to Final Position. Please do Automatic Setup first.");
// //     return;
// //   }
// //   setPlaying(false);
// //   setStage(0);
// //   setView("staging");
// //   setMessage("");
// // };

// // const viewParts =
// //   view === "segment"
// //     ? segParts
// //     : view === "automaticSetup"
// //     ? setupView
// //     : view === "staging"
// //     ? stagingView
// //     : NO_PARTS;

// // // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// // const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// // const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// // const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// // const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // // measured once per result (it takes a moment on big scans), not on every render
// // const occlusion = useMemo(() => {
// //   if (!occlusionActive) return null;
// //   try {
// //     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
// //   } catch (err) {
// //     console.error("Occlusion failed:", err);
// //     return null;
// //   }
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [occlusionActive, occlusionSource]);

// // const handleToggleOcclusion = () => {
// //   if (busy) return;
// //   if (occlusionActive) {
// //     setShowOcclusion(false);
// //     return;
// //   }
// //   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
// //   if (occlusionSource && hasBothJaws(occlusionSource)) {
// //     // nothing to change
// //   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
// //     setView("automaticSetup");
// //   } else if (hasBothJaws(segParts)) {
// //     setView("segment");
// //   } else {
// //     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
// //     return;
// //   }
// //   setShowOcclusion(true);
// // };



// // // ---------------- Movement: how far each tooth moved from Initial Position to Final Position ----------------
// // const hasSetup = teethOnly(setupParts.upper).length + teethOnly(setupParts.lower).length > 0;
// // const movementActive = showMovement && hasSetup;

// // // measured once per Automatic Setup result, not on every render
// // const movement = useMemo(() => {
// //   if (!movementActive) return null;
// //   try {
// //     return computeMovement(
// //       { upper: teethOnly(segParts.upper), lower: teethOnly(segParts.lower) },
// //       { upper: teethOnly(setupParts.upper), lower: teethOnly(setupParts.lower) }
// //     );
// //   } catch (err) {
// //     console.error("Movement failed:", err);
// //     return null;
// //   }
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [movementActive, segParts, setupParts]);

// // const handleToggleMovement = () => {
// //   if (busy) return;
// //   if (movementActive) {
// //     setShowMovement(false);
// //     return;
// //   }
// //   if (!hasSetup) {
// //     alert("Movement compares Initial Position with Final Position. Please do Automatic Setup first.");
// //     return;
// //   }
// //   setShowMovement(true);
// // };

// // const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// // const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// // const viewResults =
// //   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

// //   return (
// //     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

// //      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
// //     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
// //     <div
// //       ref={gridRef}
// //       style={{
// //         position: "absolute",
// //         top: BARS_HEIGHT,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         zIndex: -1,
// //         pointerEvents: "none", // the mouse goes through to the model
// //         display: showGrid ? "block" : "none",
// //         backgroundImage: GRID_IMAGE,
// //         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
// //         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
// //       }}
// //     />
// //       <TopBar
// //         upperName={upper.name}
// //         lowerName={lower.name}
// //         onUpperSelected={(file) => handleFile("upper", file)}
// //         onLowerSelected={(file) => handleFile("lower", file)}
// //         onIdentifyLat={handleIdentifyLat}
// //         onSegment={handleSegmentTeeth}
// //         onToolClick={handleToolClick}
// //         busy={busy}
// //         progress={progress}
// //         message={message}
// //         onAutomaticSetup={handleAutomaticSetup}
// //         onInitialPosition={handleInitialPosition}
// //         onFinalPosition={handleFinalPosition}
// //         showGrid={showGrid}
// //        onToggleGrid={() => setShowGrid((v) => !v)}
// //        gridSize={gridSize}
// //       onGridSizeChange={setGridSize}
// //       showSuperimpose={superimposeActive}
// // onToggleSuperimpose={handleToggleSuperimpose}
// //       showOcclusion={occlusionActive}
// //       onToggleOcclusion={handleToggleOcclusion}
// //       showMovement={movementActive}
// //       onToggleMovement={handleToggleMovement}
// //       onStaging={handleStaging}
// //         setupReady={doneSteps.automaticSetup}
// //         view={view}
// //         onViewChange={handleViewChange}

// //       />

// //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// //         <Viewer
// //           upperGeo={upper.geo}
// //           lowerGeo={lower.geo}
// //           // upperParts={segParts.upper}
// //           upperParts={viewParts.upper}
// //           // lowerParts={segParts.lower}
// //           lowerParts={viewParts.lower}
// //           showUpper={showUpper}
// //           showLower={showLower}
// //           segVisible={segVisible}

// //           // trimlines={trimlines}
// //           trimlines={viewTrimlines}
// //           // resultMeshes={resultMeshes}
// //           resultMeshes={viewResults}
// //           // toothLabels={toothLabels}
// //           toothLabels={viewLabels}

// //           // latCurves={showSplines ? latCurves : NO_CURVES}
// //           latCurves={viewCurves}
// //           dragging={dragging}
// //           onStartDrag={startDrag}
// //           onStartTrimDrag={startTrimDrag}
// //           onMoveDrag={moveDrag}
// //           onEndDrag={endDrag}
// //           showNumbers={showNumbers}
// //           viewRequest={viewRequest}
// //           showGrid={showGrid}
// //           gridRef={gridRef}
// //           gridSize={gridSize}
// //           ghostParts={ghostParts}
// //           occlusion={occlusion}

// //         />

// //         {/* Occlusion color scale: how deep the teeth overlap, 0.00 (just touching) at the bottom, 0.80 mm at the top */}
// //         {occlusion && <OcclusionLegend />}

// //         {/* Movement table on the left: movement of each tooth from Initial to Final Position */}
// //         {movement && <MovementPanel movement={movement} onClose={() => setShowMovement(false)} />}

// //         {/* Staging timeline at the bottom: first, previous, play, next, last + the stage ruler */}
// //         {staging && (
// //           <StagingBar
// //             stage={shownStage}
// //             stageCount={stageCount}
// //             playing={playing}
// //             onStageChange={(s) => {
// //               setPlaying(false);
// //               setStage(s);
// //             }}
// //             onPlay={handlePlay}
// //             onPause={() => setPlaying(false)}
// //           />
// //         )}

// //         <VisibilityButtons
// //           showUpper={showUpper}
// //           showLower={showLower}
// //           hasUpper={!!upper.geo}
// //           hasLower={!!lower.geo}
// //           onToggleUpper={() => setShowUpper((v) => !v)}
// //           onToggleLower={() => setShowLower((v) => !v)}
// //           // segmentedUpper={!!segParts.upper}
// //           // segmentedLower={!!segParts.lower}
// //           segmentedUpper={!!viewParts.upper}
// //           segmentedLower={!!viewParts.lower}
// //           segVisible={segVisible}
// //           onToggleSeg={toggleSeg}
// //           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
// //           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
// //            showNumbers={showNumbers}
// //             onToggleNumbers={() => setShowNumbers((v) => !v)}
// //         />
// //       </div>
// //     </div>
// //   );
// // }


// // // ---------------- Occlusion legend: the color bar on the right side ----------------
// // const LEGEND_BAR_HEIGHT = 200;

// // function OcclusionLegend() {
// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         right: 204,
// //         top: "50%",
// //         transform: "translateY(calc(-50% - 20px))", // 20 = how far up from center (px)
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         fontSize: 11,
// //         color: "#444",
// //         pointerEvents: "none",
// //         userSelect: "none",
// //       }}
// //     >
// //       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             justifyContent: "space-between",
// //             textAlign: "right",
// //             margin: "-7px 0", // centers each number on its line
// //           }}
// //         >
// //           {OCCLUSION_TICKS.map((t) => (
// //             <span key={t}>{t.toFixed(2)}</span>
// //           ))}
// //         </div>
// //         <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
// //       </div>
// //       <div style={{ marginTop: 10, textAlign: "center", lineHeight: 1.3 }}>
// //         overlap
// //         <br />
// //         mm
// //       </div>
// //     </div>
// //   );
// // }




// // // // // // // import { useState } from "react";
// // // // // // // import TopBar from "./TopBar.jsx";
// // // // // // // import Viewer from "./Viewer.jsx";
// // // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // // export default function App() {
// // // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // // //   const handleFile = async (type, file) => {
// // // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // // //     else setLower({ name: file.name, geo });
// // // // // // //     setMessage("");

// // // // // // //     // send the file to the backend
// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append("file", file);
// // // // // // //       formData.append("type", type);
// // // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // // //       const result = await res.json();
// // // // // // //       if (!res.ok) setMessage(result.message);
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // // //       <TopBar
// // // // // // //         upperName={upper.name}
// // // // // // //         lowerName={lower.name}
// // // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // // //         message={message}
// // // // // // //       />
// // // // // // //       <div style={{ flex: 1 }}>
// // // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }




// // // // // // import { useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // // //   const [showLower, setShowLower] = useState(true);
// // // // // //   const [busy, setBusy] = useState(false);
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") {
// // // // // //       setUpper({ name: file.name, geo });
// // // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // // //        setShowUpper(true);
// // // // // //     } else {
// // // // // //       setLower({ name: file.name, geo });
// // // // // //       setLowerParts(null);
// // // // // //         setShowLower(true);
// // // // // //     }
// // // // // //     setMessage("");

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   // downloads every result STL of one jaw from the backend
// // // // // //   const loadParts = (jaw, files, stamp) =>
// // // // // //     Promise.all(
// // // // // //       files.map(async (name) => {
// // // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // // //       })
// // // // // //     );

// // // // // //   const handleSegment = async () => {
// // // // // //     if (!upper.geo || !lower.geo) {
// // // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setBusy(true);
// // // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // // //     try {
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) throw new Error(result.message);

// // // // // //       const stamp = Date.now();
// // // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // // //       setMessage("Segmentation completed");
// // // // // //     } catch (err) {
// // // // // //       setMessage(err.message);
// // // // // //     } finally {
// // // // // //       setBusy(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         onSegment={handleSegment}
// // // // // //         busy={busy}
// // // // // //         message={message}
// // // // // //       />
// // // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // // //         <Viewer
// // // // // //           upperGeo={upper.geo}
// // // // // //           lowerGeo={lower.geo}
// // // // // //           upperParts={upperParts}
// // // // // //           lowerParts={lowerParts}
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //         />

// // // // // //          <VisibilityButtons
// // // // // //           showUpper={showUpper}
// // // // // //           showLower={showLower}
// // // // // //           hasUpper={!!upper.geo}
// // // // // //           hasLower={!!lower.geo}
// // // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // // //         />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }











// // // // // import { useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [message, setMessage] = useState("");

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setShowLower(true);
// // // // //     }
// // // // //     setMessage("");

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   const handleIdentifyLat = async () => {
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) throw new Error(result.message);
// // // // //       setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   // the cutting step comes in a later phase
// // // // //   // const handleCutTeeth = () => {
// // // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // // //   // };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onIdentifyLat={handleIdentifyLat}
// // // // //         // onCutTeeth={handleCutTeeth}
// // // // //         busy={busy}
// // // // //         message={message}
// // // // //       />

// // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //         />

// // // // //         <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }















// // // // // import { useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // // //   const [message, setMessage] = useState("");

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setShowLower(true);
// // // // //     }
// // // // //     setMessage("");
// // // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   const handleIdentifyLat = async () => {
// // // // //     // if (!upper.geo) {
// // // // //     //   setProgress(null);
// // // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // // //     //   return;
// // // // //     // }

// // // // //     if (!upper.geo || !lower.geo) {
// // // // //      setProgress(null);
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //       }

// // // // //     setBusy(true);
// // // // //     setMessage("");
// // // // //     setProgress({ percent: 0, label: "Starting..." });

// // // // //     try {
// // // // //       // 1. start the job on the backend (answers immediately)
// // // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // // //       const started = await res.json();
// // // // //       if (!res.ok) throw new Error(started.message);

// // // // //       // 2. ask the backend for the progress every second until it is done
// // // // //       while (true) {
// // // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // // //         const job = await statusRes.json();

// // // // //         if (job.error) throw new Error(job.error);
// // // // //         setProgress({ percent: job.percent, label: job.label });
// // // // //         if (job.done) break;
// // // // //       }
// // // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // // //       setTimeout(() => setProgress(null), 2000);
// // // // //     } catch (err) {
// // // // //       setProgress(null);
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onIdentifyLat={handleIdentifyLat}
// // // // //         busy={busy}
// // // // //         progress={progress}
// // // // //         message={message}
// // // // //       />

// // // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //         />

// // // // //         <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }







// // // // import { useCallback, useRef, useState } from "react";
// // // // import TopBar from "./TopBar.jsx";
// // // // import Viewer from "./Viewer.jsx";
// // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // import { parseStl } from "./stlUtils.js";
// // // // import { loadLatCurves } from "./latUtils.js";

// // // // const BACKEND_URL = "http://localhost:5174";

// // // // export default function App() {
// // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // //   const [showUpper, setShowUpper] = useState(true);
// // // //   const [showLower, setShowLower] = useState(true);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // //   const [message, setMessage] = useState("");

// // // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // // //   // dragging of one editable point
// // // //   const dragRef = useRef(null); // { jaw, id, index }
// // // //   const [dragging, setDragging] = useState(false);

// // // //   const handleFile = async (type, file) => {
// // // //     const geo = parseStl(await file.arrayBuffer());

// // // //     if (type === "upper") {
// // // //       setUpper({ name: file.name, geo });
// // // //       setShowUpper(true);
// // // //     } else {
// // // //       setLower({ name: file.name, geo });
// // // //       setShowLower(true);
// // // //     }
// // // //     // a new scan: remove the old LAT of that jaw
// // // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // // //     setMessage("");
// // // //     setProgress(null);

// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("file", file);
// // // //       formData.append("type", type);
// // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // //       const result = await res.json();
// // // //       if (!res.ok) setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // //     }
// // // //   };

// // // //   const handleIdentifyLat = async () => {
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       // 1. start the job on the backend (answers immediately)
// // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       // 2. ask the backend for the progress every second until it is done
// // // //       let job;
// // // //       while (true) {
// // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // //         job = await statusRes.json();

// // // //         if (job.error) throw new Error(job.error);
// // // //         setProgress({ percent: job.percent, label: job.label });
// // // //         if (job.done) break;
// // // //       }

// // // //       // 3. download the CSV files and show them as splines
// // // //       const stamp = Date.now();
// // // //       const csv = job.csvFiles || {};
// // // //       setLatCurves({
// // // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // // //       });

// // // //       // keep the green "completed" bar for 2 seconds, then hide it
// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // ---------------- editing of the splines ----------------
// // // //   const startDrag = (jaw, id, index) => {
// // // //     dragRef.current = { jaw, id, index };
// // // //     setDragging(true);
// // // //   };

// // // //   const endDrag = useCallback(() => {
// // // //     dragRef.current = null;
// // // //     setDragging(false);
// // // //   }, []);

// // // //   // moves the dragged point to the surface point under the mouse
// // // //   const moveDrag = (point) => {
// // // //     const d = dragRef.current;
// // // //     if (!d) return;

// // // //     setLatCurves((prev) => ({
// // // //       ...prev,
// // // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // // //         curve.id === d.id
// // // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // // //           : curve
// // // //       ),
// // // //     }));
// // // //   };

// // // //   return (
// // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // //       <TopBar
// // // //         upperName={upper.name}
// // // //         lowerName={lower.name}
// // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // //         onIdentifyLat={handleIdentifyLat}
// // // //         busy={busy}
// // // //         progress={progress}
// // // //         message={message}
// // // //       />

// // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // //         <Viewer
// // // //           upperGeo={upper.geo}
// // // //           lowerGeo={lower.geo}
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           latCurves={latCurves}
// // // //           dragging={dragging}
// // // //           onStartDrag={startDrag}
// // // //           onMoveDrag={moveDrag}
// // // //           onEndDrag={endDrag}
// // // //         />

// // // //         <VisibilityButtons
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           hasUpper={!!upper.geo}
// // // //           hasLower={!!lower.geo}
// // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }











// // // import { useCallback, useRef, useState } from "react";
// // // import TopBar from "./TopBar.jsx";
// // // import Viewer from "./Viewer.jsx";
// // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // import { parseStl } from "./stlUtils.js";
// // // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // // const BACKEND_URL = "http://localhost:5174";

// // // export default function App() {
// // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // //   const [lower, setLower] = useState({ name: "", geo: null });
// // //   const [showUpper, setShowUpper] = useState(true);
// // //   const [showLower, setShowLower] = useState(true);
// // //   const [busy, setBusy] = useState(false);
// // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // //   const [message, setMessage] = useState("");

// // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// // //   // always holds the newest curves (used when a drag ends and the curve is saved)
// // //   const latCurvesRef = useRef(latCurves);
// // //   latCurvesRef.current = latCurves;

// // //   // dragging of one editable point
// // //   const dragRef = useRef(null); // { jaw, id, index, moved }
// // //   const [dragging, setDragging] = useState(false);

// // //   const handleFile = async (type, file) => {
// // //     const geo = parseStl(await file.arrayBuffer());

// // //     if (type === "upper") {
// // //       setUpper({ name: file.name, geo });
// // //       setShowUpper(true);
// // //     } else {
// // //       setLower({ name: file.name, geo });
// // //       setShowLower(true);
// // //     }
// // //     // a new scan: remove the old LAT of that jaw
// // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // //     setMessage("");
// // //     setProgress(null);

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

// // //   // asks the backend for the progress every second until the job is done
// // //   const waitForJob = async (statusUrl) => {
// // //     while (true) {
// // //       await new Promise((resolve) => setTimeout(resolve, 1000));

// // //       const res = await fetch(statusUrl);
// // //       const job = await res.json();

// // //       if (job.error) throw new Error(job.error);
// // //       setProgress({ percent: job.percent, label: job.label });
// // //       if (job.done) return job;
// // //     }
// // //   };

// // //   // ---------------- Identify LAT button ----------------
// // //   const handleIdentifyLat = async () => {
// // //     if (!upper.geo || !lower.geo) {
// // //       setProgress(null);
// // //       setMessage("Please upload both Upper and Lower scan models first");
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// // //       // download the CSV files and show them as splines
// // //       const stamp = Date.now();
// // //       const csv = job.csvFiles || {};
// // //       setLatCurves({
// // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // //       });

// // //       // keep the green "completed" bar for 2 seconds, then hide it
// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // ---------------- Segment button (separates teeth and gum) ----------------
// // //   const handleSegmentTeeth = async () => {
// // //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// // //       setProgress(null);
// // //       setMessage("Please run Identify LAT first");
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// // //       // the files created by the exe (also printed in the backend terminal)
// // //       console.log("Segment output files:", job.newFiles);

// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // ---------------- editing of the splines ----------------
// // //   const startDrag = (jaw, id, index) => {
// // //     dragRef.current = { jaw, id, index, moved: false };
// // //     setDragging(true);
// // //   };

// // //   // when the mouse button is released: save the edited curve to its csv file
// // //   const endDrag = useCallback(async () => {
// // //     const d = dragRef.current;
// // //     dragRef.current = null;
// // //     setDragging(false);

// // //     if (!d || !d.moved) return; // nothing was changed

// // //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// // //     if (!curve) return;

// // //     try {
// // //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// // //       setMessage(result.message);
// // //     } catch (err) {
// // //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// // //     }
// // //   }, []);

// // //   // moves the dragged point to the surface point under the mouse
// // //   const moveDrag = (point) => {
// // //     const d = dragRef.current;
// // //     if (!d) return;

// // //     const current = latCurvesRef.current;
// // //     const curve = current[d.jaw].find((c) => c.id === d.id);
// // //     if (!curve) return;

// // //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// // //     d.moved = true;

// // //     // update the ref at once, so a save right after the last move uses the newest points
// // //     latCurvesRef.current = {
// // //       ...current,
// // //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// // //     };
// // //     setLatCurves(latCurvesRef.current);
// // //   };

// // //   return (
// // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // //       <TopBar
// // //         upperName={upper.name}
// // //         lowerName={lower.name}
// // //         onUpperSelected={(file) => handleFile("upper", file)}
// // //         onLowerSelected={(file) => handleFile("lower", file)}
// // //         onIdentifyLat={handleIdentifyLat}
// // //         onSegment={handleSegmentTeeth}
// // //         busy={busy}
// // //         progress={progress}
// // //         message={message}
// // //       />

// // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // //         <Viewer
// // //           upperGeo={upper.geo}
// // //           lowerGeo={lower.geo}
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           latCurves={latCurves}
// // //           dragging={dragging}
// // //           onStartDrag={startDrag}
// // //           onMoveDrag={moveDrag}
// // //           onEndDrag={endDrag}
// // //         />

// // //         <VisibilityButtons
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           hasUpper={!!upper.geo}
// // //           hasLower={!!lower.geo}
// // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // //           onToggleLower={() => setShowLower((v) => !v)}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }












// // import { useCallback, useRef, useState } from "react";
// // import TopBar from "./TopBar.jsx";
// // import Viewer from "./Viewer.jsx";
// // import VisibilityButtons from "./VisibilityButtons.jsx";
// // import { parseStl } from "./stlUtils.js";
// // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // const BACKEND_URL = "http://localhost:5174";
// // const NO_CURVES = { upper: [], lower: [] };

// // export default function App() {
// //   const [upper, setUpper] = useState({ name: "", geo: null });
// //   const [lower, setLower] = useState({ name: "", geo: null });
// //   const [showUpper, setShowUpper] = useState(true);
// //   const [showLower, setShowLower] = useState(true);
// //   const [busy, setBusy] = useState(false);
// //   const [progress, setProgress] = useState(null); // { percent, label } or null
// //   const [message, setMessage] = useState("");

// //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// //   const [showSplines, setShowSplines] = useState(true);
// //   // always holds the newest curves (used when a drag ends and the curve is saved)
// //   const latCurvesRef = useRef(latCurves);
// //   latCurvesRef.current = latCurves;

// //   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
// //   const [segParts, setSegParts] = useState({ upper: null, lower: null });

// //   // dragging of one editable point
// //   const dragRef = useRef(null); // { jaw, id, index, moved }
// //   const [dragging, setDragging] = useState(false);

// //   const handleFile = async (type, file) => {
// //     const geo = parseStl(await file.arrayBuffer());

// //     if (type === "upper") {
// //       setUpper({ name: file.name, geo });
// //       setShowUpper(true);
// //     } else {
// //       setLower({ name: file.name, geo });
// //       setShowLower(true);
// //     }
// //     // a new scan: remove the old LAT and the old separated parts of that jaw
// //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// //     setSegParts((prev) => ({ ...prev, [type]: null }));
// //     setMessage("");
// //     setProgress(null);

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

// //   // asks the backend for the progress every second until the job is done
// //   const waitForJob = async (statusUrl) => {
// //     while (true) {
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       const res = await fetch(statusUrl);
// //       const job = await res.json();

// //       if (job.error) throw new Error(job.error);
// //       setProgress({ percent: job.percent, label: job.label });
// //       if (job.done) return job;
// //     }
// //   };

// //   // ---------------- Identify LAT button ----------------
// //   const handleIdentifyLat = async () => {
// //     if (!upper.geo || !lower.geo) {
// //       setProgress(null);
// //       setMessage("Please upload both Upper and Lower scan models first");
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// //       // download the CSV files and show them as splines
// //       const stamp = Date.now();
// //       const csv = job.csvFiles || {};
// //       setLatCurves({
// //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// //       });
// //       setSegParts({ upper: null, lower: null }); // back to the raw scans
// //       setShowSplines(true);

// //       // keep the green "completed" bar for 2 seconds, then hide it
// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   // ---------------- Segment button (separates teeth and gum) ----------------
// //   const handleSegmentTeeth = async () => {
// //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// //       setProgress(null);
// //       setMessage("Please run Identify LAT first");
// //       return;
// //     }

// //     setShowSplines(false); // the splines disappear as soon as Segment is clicked
// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// //       // the files created by the exe (also printed in the backend terminal)
// //       console.log("Segment output files:", job.newFiles);

// //       // download the gum and teeth STL files and show them
// //       const stamp = Date.now();
// //       const stl = job.stlFiles || {};
// //       setSegParts({
// //         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
// //         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
// //       });

// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setShowSplines(true); // Segment failed, so the splines come back
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   // ---------------- editing of the splines ----------------
// //   const startDrag = (jaw, id, index) => {
// //     dragRef.current = { jaw, id, index, moved: false };
// //     setDragging(true);
// //   };

// //   // when the mouse button is released: save the edited curve to its csv file
// //   const endDrag = useCallback(async () => {
// //     const d = dragRef.current;
// //     dragRef.current = null;
// //     setDragging(false);

// //     if (!d || !d.moved) return; // nothing was changed

// //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// //     if (!curve) return;

// //     try {
// //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// //       setMessage(result.message);
// //       setTimeout(() => setMessage(""), 2000);
// //     } catch (err) {
// //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// //     }
// //   }, []);

// //   // moves the dragged point to the surface point under the mouse
// //   const moveDrag = (point) => {
// //     const d = dragRef.current;
// //     if (!d) return;

// //     const current = latCurvesRef.current;
// //     const curve = current[d.jaw].find((c) => c.id === d.id);
// //     if (!curve) return;

// //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// //     d.moved = true;

// //     // update the ref at once, so a save right after the last move uses the newest points
// //     latCurvesRef.current = {
// //       ...current,
// //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// //     };
// //     setLatCurves(latCurvesRef.current);
// //   };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// //       <TopBar
// //         upperName={upper.name}
// //         lowerName={lower.name}
// //         onUpperSelected={(file) => handleFile("upper", file)}
// //         onLowerSelected={(file) => handleFile("lower", file)}
// //         onIdentifyLat={handleIdentifyLat}
// //         onSegment={handleSegmentTeeth}
// //         busy={busy}
// //         progress={progress}
// //         message={message}
// //       />

// //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// //         <Viewer
// //           upperGeo={upper.geo}
// //           lowerGeo={lower.geo}
// //           upperParts={segParts.upper}
// //           lowerParts={segParts.lower}
// //           showUpper={showUpper}
// //           showLower={showLower}
// //           latCurves={showSplines ? latCurves : NO_CURVES}
// //           dragging={dragging}
// //           onStartDrag={startDrag}
// //           onMoveDrag={moveDrag}
// //           onEndDrag={endDrag}
// //         />

// //         <VisibilityButtons
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

















// // import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
// import TopBar from "./TopBar.jsx";
// import Viewer from "./Viewer.jsx";
// import VisibilityButtons from "./VisibilityButtons.jsx";
// import { parseStl } from "./stlUtils.js";
// import { removeTeeth } from "./gumUtils.js";
// import { deformGum } from "./gumDeform.js";
// import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";
// import { computeMovement, toothFrames } from "./movement.js";
// import MovementPanel from "./MovementPanel.jsx";
// import { computeStaging, toothMatrixAtStage, gumAtStage, computeStageMovement } from "./staging.js";
// import StagingBar from "./StagingBar.jsx";
// // import { computeRoots } from "./roots.js";
// import { computeRoots, saveTeethWithRoots } from "./roots.js";



// // import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// // import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

// import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

// const BACKEND_URL = "http://localhost:5174";
// const NO_CURVES = { upper: [], lower: [] };
// const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

// const NO_RESULT = { upper: null, lower: null };

// const NO_LABELS = { upper: [], lower: [] };
// // the grid starts below the first bar (44) and the second bar (44); change this if those heights change
// const BARS_HEIGHT = 88;
// // const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// // const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
// const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
// const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// // 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
// const GRID_IMAGE = [
//   `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
//   `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
//   `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
//   `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
// ].join(", ");
// // TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// // without running Clean Model or Identify LAT again (the old Output folder is kept)
// const KEEP_OUTPUT_ON_UPLOAD = false;
// const NO_PARTS = { upper: null, lower: null };

  

// const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// // when a step runs, only these steps become "not done" again
// const RESETS = {
//   cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
//   generateTrimline: ["trimModel", "addBase"],
//   trimModel: ["addBase"],
//   addBase: [],
//   identifyLat: ["segment","automaticSetup"],
//   segment: ["automaticSetup"],
//     automaticSetup: [],
// };

// const NOT_DONE = {
//   cleanModel: false,
//   identifyLat: false,
//   segment: false,
//   generateTrimline: false,
//   trimModel: false,
//   addBase: false,
//   automaticSetup: false,
// };




// // button name used by the backend -> step name
// const COMMAND_TO_STEP = {
//   GenerateTrimline: "generateTrimline",
//   TrimModel: "trimModel",
//   AddBase: "addBase",
// };
// const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// // step that must be finished before this step can run
// const REQUIRED_BEFORE = {
//   trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
//   addBase: { step: "trimModel", message: "Please do Trim Model first." },
// };



// // button text in the Clean Model tab -> command sent to the backend
// const NEW_EXE_COMMANDS = {
//   "Generate Trimline": "GenerateTrimline",
//   "Trim Model": "TrimModel",
//   "Add Base": "AddBase",
// };

// export default function App() {
//   const [upper, setUpper] = useState({ name: "", geo: null });
//   const [lower, setLower] = useState({ name: "", geo: null });
//   const [showUpper, setShowUpper] = useState(true);
//   const [showLower, setShowLower] = useState(true);
//   const [busy, setBusy] = useState(false);
//   const [progress, setProgress] = useState(null); // { percent, label } or null
//   const [message, setMessage] = useState("");

//   // which buttons already produced a result
// const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// // true after Clean Model or Identify LAT finished (the segmenter result exists)
// // const [segmenterReady, setSegmenterReady] = useState(false);

// const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// // marks a step as done and resets the steps after it
// // const markDone = (step) =>
// //   setDoneSteps((prev) => {
// //     const next = { ...prev };
// //     STEP_ORDER.forEach((s, i) => {
// //       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
// //     });
// //     next[step] = true;
// //     return next;
// //   });



// const markDone = (step) =>
//   setDoneSteps((prev) => {
//     const next = { ...prev };
//     RESETS[step].forEach((s) => (next[s] = false));
//     next[step] = true;
//     return next;
//   });

// // shows the alert and returns true if the step was already done
// // const alreadyDone = (step) => {
// //   if (doneSteps[step]) {
// //     alert(DONE_MESSAGES[step]);
// //     return true;
// //   }
// //   return false;
// // };


// // if the step is already done: show its stored result and do not run the exe again
// const showIfDone = (step) => {
//   if (doneSteps[step]) {
//     setView(step);
//     setMessage("");
//     return true;
//   }
//   return false;
// };

//   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
//   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
//   const [showSplines, setShowSplines] = useState(true);
//   // always holds the newest curves (used when a drag ends and the curve is saved)
//   const latCurvesRef = useRef(latCurves);
//   latCurvesRef.current = latCurves;

//   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
//   const [segParts, setSegParts] = useState({ upper: null, lower: null });

//   // result of Automatic Setup: [{ name, geo }, ...] for each jaw
// const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

//   // visibility of the upper/lower teeth and gum (the four buttons after Segment)
//   const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
//   const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


//   // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
//   const [trimlines, setTrimlines] = useState(NO_RESULT);
//   // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

// const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
// const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// // which result is shown: "scan" or the name of a step
// const [view, setView] = useState("scan");

//     // always holds the newest trimlines (used while a point is dragged and when it is saved)
//   const trimlinesRef = useRef(trimlines);
//   trimlinesRef.current = trimlines;

//     // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
//   const [toothLabels, setToothLabels] = useState(NO_LABELS);
//        const [showNumbers, setShowNumbers] = useState(true);
//        const [showGrid, setShowGrid] = useState(false);
//        const gridRef = useRef(null); // the grid layer, sized by the Viewer

// const [gridSize, setGridSize] = useState(1); // grid spacing in mm

// const [showSuperimpose, setShowSuperimpose] = useState(false);
// const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off
// const [showMovement, setShowMovement] = useState(false); // Movement table on/off
// const [showRoot, setShowRoot] = useState(false); // Root view on/off (gum hidden, a root under every crown)
// const [stage, setStage] = useState(0); // Staging: the stage shown (0 = Initial Position)
// const [playing, setPlaying] = useState(false); // Staging: Play is running
// const [stageMovementMode, setStageMovementMode] = useState("zero"); // Staging Movement table: "zero" or "prev"

// // Movement table starts at the top of the third bar: measure how tall the third bar is
// const viewAreaRef = useRef(null);
// const [thirdBarHeight, setThirdBarHeight] = useState(56);
// useLayoutEffect(() => {
//   const measure = () => {
//     // the 3D area starts right under the third bar; the first two bars are BARS_HEIGHT tall
//     if (viewAreaRef.current) setThirdBarHeight(Math.max(0, viewAreaRef.current.offsetTop - BARS_HEIGHT));
//   };
//   measure();
//   window.addEventListener("resize", measure);
//   return () => window.removeEventListener("resize", measure);
// }, []);

//        const [viewRequest, setViewRequest] = useState(null);



//   // dragging of one editable point
//   const dragRef = useRef(null); // { jaw, id, index, moved }
//   const [dragging, setDragging] = useState(false);

//   const handleFile = async (type, file) => {
//     const geo = parseStl(await file.arrayBuffer());

//     if (type === "upper") {
//       setUpper({ name: file.name, geo });
//       setShowUpper(true);
//     } else {
//       setLower({ name: file.name, geo });
//       setShowLower(true);
//     }
//     // a new scan: remove the old LAT and the old separated parts of that jaw
//     setLatCurves((prev) => ({ ...prev, [type]: [] }));
//     setSegParts((prev) => ({ ...prev, [type]: null }));
//     setSetupParts((prev) => ({ ...prev, [type]: null }));

//     setToothLabels((prev) => ({ ...prev, [type]: [] }));
//     setSegVisible(ALL_VISIBLE);

//       // setTrimlines((prev) => ({ ...prev, [type]: null }));
//       // setResultMeshes((prev) => ({ ...prev, [type]: null }));


//    setTrimlines((prev) => ({ ...prev, [type]: null }));
//    setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
//    setBaseMeshes((prev) => ({ ...prev, [type]: null }));
//    setView("scan");
//    setShowSuperimpose(false);
//    setShowOcclusion(false);
//    setShowMovement(false);

//     setMessage("");
//     setDoneSteps(NOT_DONE);
//     setSegmenterReady(false);
//     setProgress(null);

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

//   // asks the backend for the progress every second until the job is done.
//   // The backend only knows when a whole exe step finishes (0, 50, 100 ...),
//   // so the number on the bar climbs 1% at a time by itself while the exe works
//   // (never past 99), catches up 1% at a time when the backend is ahead,
//   // and only reaches 100% when the job is really done.
//   const waitForJob = (statusUrl) =>
//     new Promise((resolve, reject) => {
//       let shown = 0;          // number shown on the bar
//       let target = 0;         // real percent from the backend
//       let label = "Starting...";
//       let doneJob = null;     // set when the backend says done
//       let stopped = false;
//       let lastStep = Date.now();

//       // every 25 ms: decide whether to add 1%
//       const timer = setInterval(() => {
//         if (stopped) return;
//         const now = Date.now();
//         // slow climb while waiting: 0.5 s per 1% at the start, about 4.5 s per 1% near 99
//         const waitMs = 500 + shown * 40;
//         if (shown < target) {
//           shown++;               // backend is ahead (or done): catch up fast, 1% at a time
//           lastStep = now;
//         } else if (!doneJob && shown < 99 && now - lastStep >= waitMs) {
//           shown++;               // exe still working: creep up 1%
//           lastStep = now;
//         } else if (!doneJob) {
//           return;                // nothing changed
//         }
//         setProgress({ percent: shown, label });
//         if (doneJob && shown >= 100) {
//           stopped = true;
//           clearInterval(timer);
//           resolve(doneJob);
//         }
//       }, 25);

//       // ask the backend 4 times a second, so the end of the job is noticed quickly
//       (async () => {
//         while (!stopped) {
//           await new Promise((r) => setTimeout(r, 250));
//           try {
//             const res = await fetch(statusUrl);
//             const job = await res.json();
//             if (job.error) throw new Error(job.error);
//             target = Math.max(target, job.percent || 0);
//             if (job.label) label = job.label;
//             if (job.done) {
//               // job finished: show 100% at once and load the output right away
//               stopped = true;
//               clearInterval(timer);
//               setProgress({ percent: 100, label });
//               resolve(job);
//               return;
//             }
//           } catch (err) {
//             stopped = true;
//             clearInterval(timer);
//             reject(err);
//             return;
//           }
//         }
//       })();
//     });

//   // ---------------- Identify LAT button ----------------
//   const handleIdentifyLat = async () => {
//     // if (alreadyDone("identifyLat")) return;
//     if (showIfDone("identifyLat")) return;
//     if (!upper.geo || !lower.geo) {
//       setProgress(null);
//       setMessage("Please upload both Upper and Lower scan models first");
      
//       return;
//     }

//     setBusy(true);
//     setMessage("");
//     setProgress({ percent: 0, label: "Starting..." });

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
//       const started = await res.json();
//       if (!res.ok) throw new Error(started.message);

//       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

//       // download the CSV files and show them as splines
//       const stamp = Date.now();
//       const csv = job.csvFiles || {};
//       // both jaws download at the same time
//       const [latUpper, latLower] = await Promise.all([
//         loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
//         loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
//       ]);
//       setLatCurves({ upper: latUpper, lower: latLower });
//       setSegParts({ upper: null, lower: null }); // back to the raw scans
//       setToothLabels(NO_LABELS);
//       setSegVisible(ALL_VISIBLE);
//       setShowSplines(true);


//       // setTrimlines(NO_RESULT);
//       // setResultMeshes(NO_RESULT);
//       markDone("identifyLat");
//       setView("identifyLat");

//       setSegmenterReady(true);

//       // keep the green "completed" bar for 2 seconds, then hide it
//       setTimeout(() => setProgress(null), 2000);
//     } catch (err) {
//       setProgress(null);
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   // ---------------- Segment button (separates teeth and gum) ----------------
//   const handleSegmentTeeth = async () => {
//     // if (alreadyDone("segment")) return;
//     if (showIfDone("segment")) return;
//     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
//       setProgress(null);
//       setMessage("Please run Identify LAT first");
//       return;
//     }
//      setShowNumbers(true);

//     setShowSplines(false); // the splines disappear as soon as Segment is clicked
//     setBusy(true);
//     setMessage("");
//     setProgress({ percent: 0, label: "Starting..." });

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
//       const started = await res.json();
//       if (!res.ok) throw new Error(started.message);

//       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

//       // the files created by the exe (also printed in the backend terminal)
//       console.log("Segment output files:", job.newFiles);

//       // download the gum and teeth STL files and show them
//       const stamp = Date.now();
//       const stl = job.stlFiles || {};
//       const numbers = job.numberFiles || {};
//       // teeth, gum and number labels of both jaws download at the same time
//       const [partsUpper, partsLower, labelsUpper, labelsLower] = await Promise.all([
//         loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
//         loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
//         loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
//         loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
//       ]);
//       setSegParts({ upper: partsUpper, lower: partsLower });
//       setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
//       // the tooth number labels (two points per tooth, from the TeethNumber exe)
//       setToothLabels({ upper: labelsUpper, lower: labelsLower });
//       markDone("segment");
//       setView("segment");

//       setTimeout(() => setProgress(null), 2000);
//     } catch (err) {
//       setShowSplines(true); // Segment failed, so the splines come back
//       setProgress(null);
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };


//     // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
//   // downloads one scan file from the backend again
//   const loadScan = async (jaw, fileName, stamp) => {
//     const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
//     return parseStl(await res.arrayBuffer());
//   };

//   const handleCleanModel = async () => {
//     // if (alreadyDone("cleanModel")) return;
//     if (showIfDone("cleanModel")) return;
//     if (!upper.geo || !lower.geo) {
//       setProgress(null);
//       setMessage("Please upload both Upper and Lower scan models first");
//       return;
//     }

//     setBusy(true);
//     setMessage("");
//     setProgress({ percent: 0, label: "Starting..." });

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
//       const started = await res.json();
//       if (!res.ok) throw new Error(started.message);

//       // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

//             const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

//       // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
//       const stamp = Date.now();
//       // both scans download at the same time
//       const [upperGeo, lowerGeo] = await Promise.all([
//         loadScan("upper", "Upper.stl", stamp),
//         loadScan("lower", "Lower.stl", stamp),
//       ]);
//       setUpper((prev) => ({ ...prev, geo: upperGeo }));
//       setLower((prev) => ({ ...prev, geo: lowerGeo }));

//       // old LAT curves and separated parts do not match the cleaned scans
//       // setLatCurves({ upper: [], lower: [] });
//       // setSegParts({ upper: null, lower: null });
//       // setSegVisible(ALL_VISIBLE);
//       // setShowSplines(true);


//             // old LAT curves do not match the cleaned scans
//       setLatCurves({ upper: [], lower: [] });
//       setShowSplines(true);


//       setTrimlines(NO_RESULT);
//       // setResultMeshes(NO_RESULT);
//       setTrimModelMeshes(NO_RESULT);
//       setBaseMeshes(NO_RESULT);

//       // setToothLabels(NO_LABELS);

//       // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
//       // const stl = job.stlFiles || {};
//       // setSegParts({
//       //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
//       //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
//       // });
//       // setSegVisible(ALL_VISIBLE);

//        setToothLabels(NO_LABELS);
//       // show the whole cleaned scan (unsegmented), not the separated gum and teeth
//       setSegParts({ upper: null, lower: null });
//       setSegVisible(ALL_VISIBLE);
//       markDone("cleanModel");
//       setView("cleanModel");
//       setSegmenterReady(true);

//       setTimeout(() => setProgress(null), 2000);
//     } catch (err) {
//       setProgress(null);
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
//   // const handleToolClick = (tool) => {
//   //   if (busy) return;
//   //   if (tool === "Clean Model") handleCleanModel();
//   // };



//   // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
//   const runNewExeCommand = async (commandKey) => {
//     // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
//     if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
//   //   if (!segmenterReady) {
//   //  alert(NEED_SEGMENTER_MESSAGE);
//   //  return;
//   //  }

//   if (!segmenterReady) {
//   // the flag is false (for example after a refresh), so ask the backend about the real files
//   let ready = false;
//   try {
//     const res = await fetch(`${BACKEND_URL}/api/output-ready`);
//     ready = (await res.json()).ready;
//   } catch (err) {
//     ready = false;
//   }
//   if (!ready) {
//     alert(NEED_SEGMENTER_MESSAGE);
//     return;
//   }
// }



//    const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
//    if (required && !doneSteps[required.step]) {
//   alert(required.message);
//   return;
//   }
//     if (!upper.geo || !lower.geo) {
//       setProgress(null);
//       setMessage("Please upload both Upper and Lower scan models first");
//       return;
//     }

//     setBusy(true);
//     setMessage("");
//     setProgress({ percent: 0, label: "Starting..." });

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
//       const started = await res.json();
//       if (!res.ok) throw new Error(started.message);

//       // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

//       // the files created or changed by the exe (also printed in the backend terminal)
//       // console.log(`${commandKey} output files:`, job.report);



//         const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

//       // the files created or changed by the exe (also printed in the backend terminal)
//       console.log(`${commandKey} output files:`, job.report);

//       // show the result in the 3D view
//       const stamp = Date.now();
//       const missing = [];
//       for (const jaw of ["upper", "lower"]) {
//         const rel = job.files ? job.files[jaw] : null;
//         if (!rel) {
//           missing.push(jaw);
//           continue;
//         }
//         const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

//         // if (commandKey === "GenerateTrimline") {
//         //   const points = await loadPointsFile(url);
//         //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
//         // } else {

//         //   if (commandKey === "GenerateTrimline") {
//         //   const points = await loadPointsFile(url);
//         //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
//         //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
//         //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
//         // } else {
//         //   const geo = await loadStlFile(url);
//         //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
//         //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
//         // }


//           if (commandKey === "GenerateTrimline") {
//      const points = await loadPointsFile(url);
//      setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
//     } else {
//     const geo = await loadStlFile(url);
//     if (commandKey === "TrimModel") {
//     setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
//    } else {
//     setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
//   }
// }


//       }

//       // if (missing.length > 0) {
//       //   setMessage(`Result file not found for: ${missing.join(", ")}`);
//       // }

//       if (missing.length > 0) {
//     setMessage(`Result file not found for: ${missing.join(", ")}`);
//    } else {
//      markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
//      setView(COMMAND_TO_STEP[commandKey]);
//    }


//       setTimeout(() => setProgress(null), 2000);
//     } catch (err) {
//       setProgress(null);
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

// // ---------------- Automatic Setup button ----------------
// // const handleAutomaticSetup = async () => {
// //   if (busy) return;

// //   if (doneSteps.automaticSetup) {
// //     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
// //     return;
// //   }
// //   if (!doneSteps.segment) {
// //     alert("Please do Segment first.");
// //     return;
// //   }

// //   setBusy(true);
// //   setMessage("");
// //   setProgress({ percent: 0, label: "Starting..." });

// //   try {
// //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// //     const started = await res.json();
// //     if (!res.ok) throw new Error(started.message);

// //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

// //     // the files made by the exe (also printed in the backend terminal)
// //     console.log("Automatic Setup output files:", job.files);

// //     markDone("automaticSetup");
// //     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
// //     setTimeout(() => setProgress(null), 2000);
// //   } catch (err) {
// //     setProgress(null);
// //     setMessage(err.message);
// //   } finally {
// //     setBusy(false);
// //   }
// // };




// // const handleAutomaticSetup = async () => {
// //   if (busy) return;

// //   // already done: only show the stored result, the exe is not called again
// //   if (doneSteps.automaticSetup) {
// //     setView("automaticSetup");
// //     setMessage("");
// //     return;
// //   }
// //   if (!doneSteps.segment) {
// //     alert("Please do Segment first.");
// //     return;
// //   }

// //   setBusy(true);
// //   setMessage("");
// //   setProgress({ percent: 0, label: "Starting..." });

// //   try {
// //     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
// //     const started = await res.json();
// //     if (!res.ok) throw new Error(started.message);

// //     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
// //     console.log("Automatic Setup output files:", job.files);

// //     // download the STL files that the exe made, for each jaw
// //     const stamp = Date.now();
// //     const parts = { upper: [], lower: [] };
// //     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
// //       const jaw = rel.split("/")[0]; // "upper" or "lower"
// //       if (jaw !== "upper" && jaw !== "lower") continue;
// //       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
// //       parts[jaw].push({ name: rel.split("/").pop(), geo });
// //     }

// //     markDone("automaticSetup");

// //     if (parts.upper.length + parts.lower.length === 0) {
// //       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
// //     } else {
// //       setSetupParts({
// //         upper: parts.upper.length ? parts.upper : null,
// //         lower: parts.lower.length ? parts.lower : null,
// //       });
// //       setView("automaticSetup");
// //     }

// //     setTimeout(() => setProgress(null), 2000);
// //   } catch (err) {
// //     setProgress(null);
// //     setMessage(err.message);
// //   } finally {
// //     setBusy(false);
// //   }
// // };


// const handleAutomaticSetup = async () => {
//   if (busy) return;

//   // already done: only show the stored result, the exe is not called again
//   if (doneSteps.automaticSetup) {
//     setView("automaticSetup");
//     setMessage("");
//     return;
//   }
//   if (!doneSteps.segment) {
//     alert("Please do Segment first.");
//     return;
//   }

//   setBusy(true);
//   setMessage("");
//   setProgress({ percent: 0, label: "Starting..." });

//   try {
//     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
//     const started = await res.json();
//     if (!res.ok) throw new Error(started.message);

//     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
//     console.log("Automatic Setup output files:", job.files);

//     // download the tooth STL files that the exe made, for each jaw
//     const stamp = Date.now();
//     const parts = { upper: [], lower: [] };
//     // only tooth files like 11_final.stl (this skips all_final.stl)
//     const toothFiles = (job.files || [])
//       .map((rel) => ({ rel, m: rel.split("/").pop().match(/^(\d)(\d)_final\.stl$/i) }))
//       .filter((f) => f.m);
//     // all tooth files download at the same time (the order is kept)
//     const geos = await Promise.all(
//       toothFiles.map((f) => loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${f.rel}?t=${stamp}`))
//     );
//     toothFiles.forEach(({ m }, i) => {
//       // 1x, 2x = upper jaw; 3x, 4x = lower jaw
//       const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";
//       // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
//       parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo: geos[i] });
//     });

//     if (parts.upper.length + parts.lower.length > 0) {
//       setSetupParts({
//         upper: parts.upper.length ? parts.upper : null,
//         lower: parts.lower.length ? parts.lower : null,
//       });
//       markDone("automaticSetup");
//       setView("automaticSetup");
//     } else {
//       console.warn("Automatic Setup made no STL files to show:", job.files);
//     }

//     setTimeout(() => setProgress(null), 2000);
//   } catch (err) {
//     setProgress(null);
//     setMessage(err.message);
//   } finally {
//     setBusy(false);
//   }
// };


// // Initial Position: the Segment result (no exe is called)
// const handleInitialPosition = () => {
//   if (busy) return;
//   setView("segment");
//   setMessage("");
// };

// // Final Position: the Automatic Setup result (no exe is called)
// const handleFinalPosition = () => {
//   if (busy) return;
//   setView("automaticSetup");
//   setMessage("");
// };

//   const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

//   // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
//   const handleToolClick = (tool) => {
//     if (busy) return;
//     if (tool === "Clean Model") handleCleanModel();
//     else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
//   };

















//   // ---------------- editing of the splines ----------------
//   // const startDrag = (jaw, id, index) => {
//   //   dragRef.current = { jaw, id, index, moved: false };
//   //   setDragging(true);
//   // };

//   // // when the mouse button is released: save the edited curve to its csv file
//   // const endDrag = useCallback(async () => {
//   //   const d = dragRef.current;
//   //   dragRef.current = null;
//   //   setDragging(false);

//   //   if (!d || !d.moved) return; // nothing was changed

//   //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
//   //   if (!curve) return;

//   //   try {
//   //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
//   //     setMessage(result.message);
//   //     setTimeout(()=>setMessage(""),2000);
//   //   } catch (err) {
//   //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
//   //   }
//   // }, []);

//   // // moves the dragged point to the surface point under the mouse
//   // const moveDrag = (point) => {
//   //   const d = dragRef.current;
//   //   if (!d) return;

//   //   const current = latCurvesRef.current;
//   //   const curve = current[d.jaw].find((c) => c.id === d.id);
//   //   if (!curve) return;

//   //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
//   //   d.moved = true;

//   //   // update the ref at once, so a save right after the last move uses the newest points
//   //   latCurvesRef.current = {
//   //     ...current,
//   //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
//   //   };
//   //   setLatCurves(latCurvesRef.current);
//   // };


//     // ---------------- editing of the splines and of the trimline ----------------
//   // a LAT point of one tooth
//   const startDrag = (jaw, id, index) => {
//     dragRef.current = { kind: "lat", jaw, id, index, moved: false };
//     setDragging(true);
//   };

//   // a point of the trimline
//   const startTrimDrag = (jaw, index) => {
//     dragRef.current = { kind: "trim", jaw, index, moved: false };
//     setDragging(true);
//   };

//   // when the mouse button is released: save the edited curve to its csv file
//   const endDrag = useCallback(async () => {
//     const d = dragRef.current;
//     dragRef.current = null;
//     setDragging(false);

//     if (!d || !d.moved) return; // nothing was changed

//     try {
//       if (d.kind === "trim") {
//         const trimline = trimlinesRef.current[d.jaw];
//         if (!trimline) return;
//         const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
//         setMessage(result.message);
//         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

//       } else {
//         const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
//         if (!curve) return;
//         const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
//         setMessage(result.message);
//          setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
//       }
//     } catch (err) {
//       setMessage(`Could not save: ${err.message}`);
//     }
//   }, []);

//   // moves the dragged point to the surface point under the mouse
//   const moveDrag = (point) => {
//     const d = dragRef.current;
//     if (!d) return;

//     // a point of the trimline
//     if (d.kind === "trim") {
//       const trimline = trimlinesRef.current[d.jaw];
//       if (!trimline) return;

//       d.moved = true;
//       const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
//       trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
//       setTrimlines(trimlinesRef.current);
//       return;
//     }

//     // a LAT point of one tooth
//     const current = latCurvesRef.current;
//     const curve = current[d.jaw].find((c) => c.id === d.id);
//     if (!curve) return;

//     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
//     d.moved = true;

//     // update the ref at once, so a save right after the last move uses the newest points
//     latCurvesRef.current = {
//       ...current,
//       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
//     };
//     setLatCurves(latCurvesRef.current);
//   };

//   // only the result of the selected step is shown, everything else is hidden
// const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// // const viewParts = view === "segment" ? segParts : NO_PARTS;
// // const viewParts =
// //   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// // Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// // const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// // const setupWithGum = (jaw) => {
// //   const teeth = setupParts[jaw];
// //   if (!teeth) return null;
// //   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
// //   const gum = (segParts[jaw] || []).filter(isGumPart);
// //   return [...gum, ...teeth];
// // };
// // const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



// const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// const isWholePart = (p) => /modelwithbase/i.test(p.name);

// // full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
// const wholeGum = useMemo(() => {
//   const build = (parts) => {
//     if (!parts) return null;
//     const whole = parts.find(isWholePart);
//     if (!whole) return null;
//     const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
//     const geo = removeTeeth(whole.geo, teeth);
//     return geo ? { name: "GumWithBase.stl", geo } : null;
//   };
//   return { upper: build(segParts.upper), lower: build(segParts.lower) };
// }, [segParts]);

// // gum that follows the moved teeth (Automatic Setup result)
// const deformedGum = useMemo(() => {
//   const build = (jaw) => {
//     const moved = setupParts[jaw];
//     if (!moved || moved.some(isGumPart)) return null;
//     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
//     if (!base) return null;
//     const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
//     const geo = deformGum(base.geo, orig, moved);
//     return geo ? { name: "GumDeformed.stl", geo } : null;
//   };
//   return { upper: build("upper"), lower: build("lower") };
// }, [setupParts, segParts, wholeGum]);

// const setupWithGum = (jaw) => {
//   const teeth = setupParts[jaw];
//   if (!teeth) return null;
//   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
//   // const gum = wholeGum[jaw]
//   //   ? [wholeGum[jaw]]
//   //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

//     const gum = deformedGum[jaw]
//     ? [deformedGum[jaw]]
//     : wholeGum[jaw]
//     ? [wholeGum[jaw]]
//     : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
//   return [...gum, ...teeth];
// };
// const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// // Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// // const superimposeActive = showSuperimpose && view === "automaticSetup";
// // also on the Staging view: the initial teeth as a green ghost over the shown stage
// const superimposeActive = showSuperimpose && (view === "automaticSetup" || view === "staging");


// const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

// const ghostParts = superimposeActive
//   ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
//   : NO_PARTS;

// const handleToggleSuperimpose = () => {
//   if (busy) return;
//   if (superimposeActive) {
//     setShowSuperimpose(false);
//   } else {
//     // setShowSuperimpose(true);
//     // setView("automaticSetup"); // Superimpose compares with the final position
//         setShowSuperimpose(true);
//     // Superimpose compares with the final position (on Staging it stays on the shown stage)
//     if (view !== "staging") setView("automaticSetup");

//   }
// };

// // ---------------- Staging: the movement from Initial to Final Position in small steps ----------------
// // max 0.2 mm and 2 degrees per tooth per stage (staging.js); the timeline at the bottom picks the stage
// const stagingTeeth = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// const stagingActive =
//   view === "staging" && stagingTeeth(setupParts.upper).length + stagingTeeth(setupParts.lower).length > 0;

// // measured once per Automatic Setup result, not on every stage
// const staging = useMemo(() => {
//   if (!stagingActive) return null;
//   try {
//     return computeStaging(
//       { upper: stagingTeeth(segParts.upper), lower: stagingTeeth(segParts.lower) },
//       { upper: stagingTeeth(setupParts.upper), lower: stagingTeeth(setupParts.lower) }
//     );
//   } catch (err) {
//     console.error("Staging failed:", err);
//     return null;
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [stagingActive, segParts, setupParts]);
// const stageCount = staging ? staging.stageCount : 0;
// const shownStage = Math.min(stage, stageCount);

// // gum of each jaw at the shown stage
// const stagingGum = useMemo(() => {
//   if (!staging) return NO_PARTS;
//   const build = (jaw) => {
//     const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
//     if (!base) return null;
//     const final = deformedGum[jaw];
//     return { name: base.name, geo: gumAtStage(base.geo, final && final.geo, shownStage, stageCount) };
//   };
//   return { upper: build("upper"), lower: build("lower") };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [staging, shownStage, wholeGum, deformedGum, segParts]);

// // the gum made for one stage is thrown away when the next stage is shown
// useEffect(() => {
//   return () => {
//     for (const jaw of ["upper", "lower"]) {
//       const g = stagingGum[jaw];
//       if (!g) continue;
//       const keep = [wholeGum[jaw]?.geo, deformedGum[jaw]?.geo, (segParts[jaw] || []).find(isGumPart)?.geo];
//       if (!keep.includes(g.geo)) g.geo.dispose();
//     }
//   };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [stagingGum]);

// // the Initial teeth, each with the matrix that moves it to the shown stage
// const stagingParts = (jaw) => {
//   if (!staging) return null;
//   const teeth = stagingTeeth(segParts[jaw]).map((p) => {
//     const t = staging.teeth[p.name];
//     return t ? { ...p, matrix: toothMatrixAtStage(t, shownStage, stageCount) } : p;
//   });
//   if (!teeth.length) return null;
//   return stagingGum[jaw] ? [stagingGum[jaw], ...teeth] : teeth;
// };
// const stagingView = { upper: stagingParts("upper"), lower: stagingParts("lower") };

// // Play: one stage every STAGE_PLAY_MS until the last stage
// const STAGE_PLAY_MS = 400;
// useEffect(() => {
//   if (!playing) return;
//   if (!stagingActive || shownStage >= stageCount) {
//     setPlaying(false);
//     return;
//   }
//   const timer = setTimeout(() => setStage(shownStage + 1), STAGE_PLAY_MS);
//   return () => clearTimeout(timer);
// }, [playing, stagingActive, shownStage, stageCount]);

// const handlePlay = () => {
//   if (shownStage >= stageCount) setStage(0); // at the end: play again from the start
//   setPlaying(true);
// };

// const handleStaging = () => {
//   if (busy) return;
//   if (!doneSteps.automaticSetup) {
//     alert("Staging goes from Initial Position to Final Position. Please do Automatic Setup first.");
//     return;
//   }
//   setPlaying(false);
//   setStage(0);
//   setView("staging");
//   setMessage("");
// };

// const viewParts =
//   view === "segment"
//     ? segParts
//     : view === "automaticSetup"
//     ? setupView
//     : view === "staging"
//     ? stagingView
//     : NO_PARTS;

// // ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// // works on the Initial Position (Segment) and Final Position (Automatic Setup) views
// const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
// const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

// const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// // measured once per result (it takes a moment on big scans), not on every render
// const occlusion = useMemo(() => {
//   if (!occlusionActive) return null;
//   try {
//     return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
//   } catch (err) {
//     console.error("Occlusion failed:", err);
//     return null;
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [occlusionActive, occlusionSource]);

// const handleToggleOcclusion = () => {
//   if (busy) return;
//   if (occlusionActive) {
//     setShowOcclusion(false);
//     return;
//   }
//   // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
//   if (occlusionSource && hasBothJaws(occlusionSource)) {
//     // nothing to change
//   } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
//     setView("automaticSetup");
//   } else if (hasBothJaws(segParts)) {
//     setView("segment");
//   } else {
//     alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
//     return;
//   }
//   setShowOcclusion(true);
// };



// // ---------------- Movement: how far each tooth moved from Initial Position to Final Position ----------------
// const hasSetup = teethOnly(setupParts.upper).length + teethOnly(setupParts.lower).length > 0;
// const movementActive = showMovement && hasSetup;
// // on the Staging view the Movement table follows the stage instead (stageMovement below)
// const setupMovementActive = movementActive && view !== "staging";

// // measured once per Automatic Setup result, not on every render
// const movement = useMemo(() => {
//   if (!setupMovementActive) return null;
//   try {
//     return computeMovement(
//       { upper: teethOnly(segParts.upper), lower: teethOnly(segParts.lower) },
//       { upper: teethOnly(setupParts.upper), lower: teethOnly(setupParts.lower) }
//     );
//   } catch (err) {
//     console.error("Movement failed:", err);
//     return null;
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [setupMovementActive, segParts, setupParts]);

// // ---------------- Staging Movement table: values at the shown stage ----------------
// // "zero" = from stage 0 to the shown stage, "prev" = from the stage before to the shown stage
// const stageMovementActive = movementActive && !!staging;

// // tooth frames (axes) on the Initial position: once per Segment result
// const stageFrames = useMemo(() => {
//   if (!stageMovementActive) return null;
//   try {
//     return toothFrames({ upper: teethOnly(segParts.upper), lower: teethOnly(segParts.lower) });
//   } catch (err) {
//     console.error("Staging movement frames failed:", err);
//     return null;
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [stageMovementActive, segParts]);

// // cheap (only matrices), so it is worked out again for every stage, also while Play runs
// const stageMovement = useMemo(() => {
//   if (!stageMovementActive || !stageFrames) return null;
//   try {
//     return computeStageMovement(stageFrames, staging, shownStage, stageMovementMode);
//   } catch (err) {
//     console.error("Staging movement failed:", err);
//     return null;
//   }
// }, [stageMovementActive, stageFrames, staging, shownStage, stageMovementMode]);

// const handleToggleMovement = () => {
//   if (busy) return;
//   if (movementActive) {
//     setShowMovement(false);
//     return;
//   }
//   if (!hasSetup) {
//     alert("Movement compares Initial Position with Final Position. Please do Automatic Setup first.");
//     return;
//   }
//   setShowMovement(true);
// };


// // ---------------- Root: gum hidden, an approximate root under every crown (roots.js) ----------------
// // works on Initial Position and Final Position; the roots are made from the teeth on screen, so they move with them
// const rootSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
// const rootActive =
//   showRoot && !!rootSource && teethOnly(rootSource.upper).length + teethOnly(rootSource.lower).length > 0;

// // made once per Segment / Automatic Setup result, not on every render
// const roots = useMemo(() => {
//   if (!rootActive) return NO_PARTS;
//   try {
//     return computeRoots({ upper: teethOnly(rootSource.upper), lower: teethOnly(rootSource.lower) });
//   } catch (err) {
//     console.error("Root failed:", err);
//     return NO_PARTS;
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [rootActive, rootSource]);

// // the roots made for one result are thrown away when new ones are made
// useEffect(() => {
//   return () => {
//     // for (const jaw of ["upper", "lower"]) (roots[jaw] || []).forEach((p) => p.geo.dispose());
//         for (const jaw of ["upper", "lower"]) (roots[jaw] || []).forEach((p) => { p.geo.dispose(); if (p.crown) p.crown.dispose(); });
//   };
// }, [roots]);


// // every tooth + its root is also saved as one closed STL in D:\Temp\Output (11withroot.stl, ...)
// useEffect(() => {
//   if (!rootActive || roots === NO_PARTS) return;
//   let cancelled = false;
//   saveTeethWithRoots(
//     BACKEND_URL,
//     { upper: teethOnly(rootSource.upper), lower: teethOnly(rootSource.lower) },
//     roots,
//     () => cancelled
//   ).catch((err) => console.error("Saving teeth with roots failed:", err));
//   return () => {
//     cancelled = true;
//   };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [roots]);

// // in Root view only the teeth are drawn (no gum, no base)
// // const shownParts = rootActive
// //   ? {
// //       upper: viewParts.upper && teethOnly(viewParts.upper),
// //       lower: viewParts.lower && teethOnly(viewParts.lower),
// //     }
// //   : viewParts;


// // in Root view only the teeth are drawn (no gum, no base), and each crown is shown cut where its
// // root joins it (two-thirds of the way down, JOIN_AT in roots.js)
// const withRootCrowns = (list, jawRoots) =>
//   list.map((p) => {
//     const r = (jawRoots || []).find((x) => x.name === "root_" + p.name);
//     return r && r.crown ? { ...p, geo: r.crown } : p;
//   });
// const shownParts = useMemo(
//   () =>
//     rootActive
//       ? {
//           upper: viewParts.upper && withRootCrowns(teethOnly(viewParts.upper), roots.upper),
//           lower: viewParts.lower && withRootCrowns(teethOnly(viewParts.lower), roots.lower),
//         }
//       : viewParts,
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   [rootActive, viewParts, roots]
// );

// const handleToggleRoot = () => {
//   if (busy) return;
//   if (rootActive) {
//     setShowRoot(false);
//     return;
//   }
//   if (!hasSetup) {
//     alert("Root needs the teeth. Please do Automatic Setup first.");
//     return;
//   }
//   if (view !== "segment" && view !== "automaticSetup") setView("automaticSetup");
//   setShowRoot(true);
// };



// const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
// const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
// const viewResults =
//   view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

//   return (
//     // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

//      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
//     {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
//     <div
//       ref={gridRef}
//       style={{
//         position: "absolute",
//         top: BARS_HEIGHT,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: -1,
//         pointerEvents: "none", // the mouse goes through to the model
//         display: showGrid ? "block" : "none",
//         backgroundImage: GRID_IMAGE,
//         // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
//         backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
//       }}
//     />
//       <TopBar
//         upperName={upper.name}
//         lowerName={lower.name}
//         onUpperSelected={(file) => handleFile("upper", file)}
//         onLowerSelected={(file) => handleFile("lower", file)}
//         onIdentifyLat={handleIdentifyLat}
//         onSegment={handleSegmentTeeth}
//         onToolClick={handleToolClick}
//         busy={busy}
//         progress={progress}
//         message={message}
//         onAutomaticSetup={handleAutomaticSetup}
//         onInitialPosition={handleInitialPosition}
//         onFinalPosition={handleFinalPosition}
//         showGrid={showGrid}
//        onToggleGrid={() => setShowGrid((v) => !v)}
//        gridSize={gridSize}
//       onGridSizeChange={setGridSize}
//       showSuperimpose={superimposeActive}
// onToggleSuperimpose={handleToggleSuperimpose}
//       showOcclusion={occlusionActive}
//       onToggleOcclusion={handleToggleOcclusion}
//       showMovement={movementActive}
//       onToggleMovement={handleToggleMovement}
//       showRoot={rootActive}
//       onToggleRoot={handleToggleRoot}
//       onStaging={handleStaging}
//         setupReady={doneSteps.automaticSetup}
//         view={view}
//         onViewChange={handleViewChange}

//       />

//       {/* position: relative lets the buttons float over the top-right of the 3D area */}
//       {/* <div style={{ flex: 1, position: "relative", minHeight: 0 }}> */}
//             <div ref={viewAreaRef} style={{ flex: 1, position: "relative", minHeight: 0 }}>

//         <Viewer
//           upperGeo={upper.geo}
//           lowerGeo={lower.geo}
//           // upperParts={segParts.upper}
//         //   upperParts={viewParts.upper}
//         //   // lowerParts={segParts.lower}
//         //   lowerParts={viewParts.lower}
//           upperParts={shownParts.upper}
//           // lowerParts={segParts.lower}
//           lowerParts={shownParts.lower}

//           showUpper={showUpper}
//           showLower={showLower}
//           segVisible={segVisible}

//           // trimlines={trimlines}
//           trimlines={viewTrimlines}
//           // resultMeshes={resultMeshes}
//           resultMeshes={viewResults}
//           // toothLabels={toothLabels}
//           toothLabels={viewLabels}

//           // latCurves={showSplines ? latCurves : NO_CURVES}
//           latCurves={viewCurves}
//           dragging={dragging}
//           onStartDrag={startDrag}
//           onStartTrimDrag={startTrimDrag}
//           onMoveDrag={moveDrag}
//           onEndDrag={endDrag}
//           showNumbers={showNumbers}
//           viewRequest={viewRequest}
//           showGrid={showGrid}
//           gridRef={gridRef}
//           gridSize={gridSize}
//           ghostParts={ghostParts}
//           occlusion={occlusion}
//            rootParts={roots}

//         />

//         {/* Occlusion color scale: how deep the teeth overlap, 0.00 (just touching) at the bottom, 0.80 mm at the top */}
//         {occlusion && <OcclusionLegend />}

//         {/* Movement table on the left: movement of each tooth from Initial to Final Position */}
//         {/* {movement && <MovementPanel movement={movement} onClose={() => setShowMovement(false)} />} */}
//                 {movement && (
//           <MovementPanel movement={movement} onClose={() => setShowMovement(false)} top={-thirdBarHeight} />
//         )}

//         {/* Staging: the same table, values at the shown stage, with the "Amount of tooth movement" list */}
//         {stageMovement && (
//           <MovementPanel
//             movement={stageMovement}
//             onClose={() => setShowMovement(false)}
//             mode={stageMovementMode}
//             onModeChange={setStageMovementMode}
//             // bottom={16 + 56} // stays above the staging timeline
//             bottom={56} // touches the staging timeline
//            top={-thirdBarHeight} // starts at the third top bar
//           />
//         )}

//         {/* Staging timeline at the bottom: first, previous, play, next, last + the stage ruler */}
//         {staging && (
//           <StagingBar
//             stage={shownStage}
//             stageCount={stageCount}
//             playing={playing}
//             onStageChange={(s) => {
//               setPlaying(false);
//               setStage(s);
//             }}
//             onPlay={handlePlay}
//             onPause={() => setPlaying(false)}
//           />
//         )}

//         <VisibilityButtons
//           showUpper={showUpper}
//           showLower={showLower}
//           hasUpper={!!upper.geo}
//           hasLower={!!lower.geo}
//           onToggleUpper={() => setShowUpper((v) => !v)}
//           onToggleLower={() => setShowLower((v) => !v)}
//           // segmentedUpper={!!segParts.upper}
//           // segmentedLower={!!segParts.lower}
//           segmentedUpper={!!viewParts.upper}
//           segmentedLower={!!viewParts.lower}
//           segVisible={segVisible}
//           onToggleSeg={toggleSeg}
//           // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
//           hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
//            showNumbers={showNumbers}
//             onToggleNumbers={() => setShowNumbers((v) => !v)}
//         />
//       </div>
//     </div>
//   );
// }


// // ---------------- Occlusion legend: the color bar on the right side ----------------
// const LEGEND_BAR_HEIGHT = 200;

// function OcclusionLegend() {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         right: 204,
//         top: "50%",
//         transform: "translateY(calc(-50% - 20px))", // 20 = how far up from center (px)
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         fontSize: 11,
//         color: "#444",
//         pointerEvents: "none",
//         userSelect: "none",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             textAlign: "right",
//             margin: "-7px 0", // centers each number on its line
//           }}
//         >
//           {OCCLUSION_TICKS.map((t) => (
//             <span key={t}>{t.toFixed(2)}</span>
//           ))}
//         </div>
//         <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
//       </div>
//       <div style={{ marginTop: 10, textAlign: "center", lineHeight: 1.3 }}>
//         overlap
//         <br />
//         mm
//       </div>
//     </div>
//   );
// }






// // // // // // import { useState } from "react";
// // // // // // import TopBar from "./TopBar.jsx";
// // // // // // import Viewer from "./Viewer.jsx";
// // // // // // import { parseStl } from "./stlUtils.js";

// // // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // // export default function App() {
// // // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   // type is "upper" or "lower" (decided by which Browse button was used)
// // // // // //   const handleFile = async (type, file) => {
// // // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // // //     if (type === "upper") setUpper({ name: file.name, geo });
// // // // // //     else setLower({ name: file.name, geo });
// // // // // //     setMessage("");

// // // // // //     // send the file to the backend
// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append("file", file);
// // // // // //       formData.append("type", type);
// // // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // // //       const result = await res.json();
// // // // // //       if (!res.ok) setMessage(result.message);
// // // // // //     } catch (err) {
// // // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // // //       <TopBar
// // // // // //         upperName={upper.name}
// // // // // //         lowerName={lower.name}
// // // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // // //         message={message}
// // // // // //       />
// // // // // //       <div style={{ flex: 1 }}>
// // // // // //         <Viewer upperGeo={upper.geo} lowerGeo={lower.geo} />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }




// // // // // import { useState } from "react";
// // // // // import TopBar from "./TopBar.jsx";
// // // // // import Viewer from "./Viewer.jsx";
// // // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // // import { parseStl } from "./stlUtils.js";

// // // // // const BACKEND_URL = "http://localhost:5174";

// // // // // export default function App() {
// // // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // // //   // segmented results: list of { name, geo } (Gum.stl, 11.stl, ...)
// // // // //   const [upperParts, setUpperParts] = useState(null);
// // // // //   const [lowerParts, setLowerParts] = useState(null);
// // // // //    const [showUpper, setShowUpper] = useState(true);
// // // // //   const [showLower, setShowLower] = useState(true);
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const [message, setMessage] = useState("");

// // // // //   const handleFile = async (type, file) => {
// // // // //     const geo = parseStl(await file.arrayBuffer());

// // // // //     if (type === "upper") {
// // // // //       setUpper({ name: file.name, geo });
// // // // //       setUpperParts(null); // old segmentation is no longer valid
// // // // //        setShowUpper(true);
// // // // //     } else {
// // // // //       setLower({ name: file.name, geo });
// // // // //       setLowerParts(null);
// // // // //         setShowLower(true);
// // // // //     }
// // // // //     setMessage("");

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", file);
// // // // //       formData.append("type", type);
// // // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) setMessage(result.message);
// // // // //     } catch (err) {
// // // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // // //     }
// // // // //   };

// // // // //   // downloads every result STL of one jaw from the backend
// // // // //   const loadParts = (jaw, files, stamp) =>
// // // // //     Promise.all(
// // // // //       files.map(async (name) => {
// // // // //         const res = await fetch(`${BACKEND_URL}/files/${jaw}/Output/${name}?t=${stamp}`);
// // // // //         return { name, geo: parseStl(await res.arrayBuffer()) };
// // // // //       })
// // // // //     );

// // // // //   const handleSegment = async () => {
// // // // //     if (!upper.geo || !lower.geo) {
// // // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // // //       return;
// // // // //     }

// // // // //     setBusy(true);
// // // // //     setMessage("Segmenting... please wait (about 20 seconds per jaw)");

// // // // //     try {
// // // // //       const res = await fetch(`${BACKEND_URL}/api/segment`, { method: "POST" });
// // // // //       const result = await res.json();
// // // // //       if (!res.ok) throw new Error(result.message);

// // // // //       const stamp = Date.now();
// // // // //       setUpperParts(await loadParts("upper", result.upper.files, stamp));
// // // // //       setLowerParts(await loadParts("lower", result.lower.files, stamp));
// // // // //       setMessage("Segmentation completed");
// // // // //     } catch (err) {
// // // // //       setMessage(err.message);
// // // // //     } finally {
// // // // //       setBusy(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // // //       <TopBar
// // // // //         upperName={upper.name}
// // // // //         lowerName={lower.name}
// // // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // // //         onSegment={handleSegment}
// // // // //         busy={busy}
// // // // //         message={message}
// // // // //       />
// // // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // // //         <Viewer
// // // // //           upperGeo={upper.geo}
// // // // //           lowerGeo={lower.geo}
// // // // //           upperParts={upperParts}
// // // // //           lowerParts={lowerParts}
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //         />

// // // // //          <VisibilityButtons
// // // // //           showUpper={showUpper}
// // // // //           showLower={showLower}
// // // // //           hasUpper={!!upper.geo}
// // // // //           hasLower={!!lower.geo}
// // // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }











// // // // import { useState } from "react";
// // // // import TopBar from "./TopBar.jsx";
// // // // import Viewer from "./Viewer.jsx";
// // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // import { parseStl } from "./stlUtils.js";

// // // // const BACKEND_URL = "http://localhost:5174";

// // // // export default function App() {
// // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // //   const [showUpper, setShowUpper] = useState(true);
// // // //   const [showLower, setShowLower] = useState(true);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [message, setMessage] = useState("");

// // // //   const handleFile = async (type, file) => {
// // // //     const geo = parseStl(await file.arrayBuffer());

// // // //     if (type === "upper") {
// // // //       setUpper({ name: file.name, geo });
// // // //       setShowUpper(true);
// // // //     } else {
// // // //       setLower({ name: file.name, geo });
// // // //       setShowLower(true);
// // // //     }
// // // //     setMessage("");

// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("file", file);
// // // //       formData.append("type", type);
// // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // //       const result = await res.json();
// // // //       if (!res.ok) setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // //     }
// // // //   };

// // // //   const handleIdentifyLat = async () => {
// // // //     if (!upper.geo || !lower.geo) {
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //     }

// // // //     setBusy(true);
// // // //     setMessage("Identifying LAT... please wait (about 1 to 2 minutes)");

// // // //     try {
// // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // //       const result = await res.json();
// // // //       if (!res.ok) throw new Error(result.message);
// // // //       setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   // the cutting step comes in a later phase
// // // //   // const handleCutTeeth = () => {
// // // //   //   setMessage("Cutting teeth from gum will be added in a later step");
// // // //   // };

// // // //   return (
// // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // //       <TopBar
// // // //         upperName={upper.name}
// // // //         lowerName={lower.name}
// // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // //         onIdentifyLat={handleIdentifyLat}
// // // //         // onCutTeeth={handleCutTeeth}
// // // //         busy={busy}
// // // //         message={message}
// // // //       />

// // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // //         <Viewer
// // // //           upperGeo={upper.geo}
// // // //           lowerGeo={lower.geo}
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //         />

// // // //         <VisibilityButtons
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           hasUpper={!!upper.geo}
// // // //           hasLower={!!lower.geo}
// // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }















// // // // import { useState } from "react";
// // // // import TopBar from "./TopBar.jsx";
// // // // import Viewer from "./Viewer.jsx";
// // // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // // import { parseStl } from "./stlUtils.js";

// // // // const BACKEND_URL = "http://localhost:5174";

// // // // export default function App() {
// // // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // // //   const [lower, setLower] = useState({ name: "", geo: null });
// // // //   const [showUpper, setShowUpper] = useState(true);
// // // //   const [showLower, setShowLower] = useState(true);
// // // //   const [busy, setBusy] = useState(false);
// // // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // // //   const [message, setMessage] = useState("");

// // // //   const handleFile = async (type, file) => {
// // // //     const geo = parseStl(await file.arrayBuffer());

// // // //     if (type === "upper") {
// // // //       setUpper({ name: file.name, geo });
// // // //       setShowUpper(true);
// // // //     } else {
// // // //       setLower({ name: file.name, geo });
// // // //       setShowLower(true);
// // // //     }
// // // //     setMessage("");
// // // //     setProgress(null); // a new file was loaded, so hide the old progress bar

// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("file", file);
// // // //       formData.append("type", type);
// // // //       const res = await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
// // // //       const result = await res.json();
// // // //       if (!res.ok) setMessage(result.message);
// // // //     } catch (err) {
// // // //       setMessage("File loaded in viewer, but backend upload failed.");
// // // //     }
// // // //   };

// // // //   const handleIdentifyLat = async () => {
// // // //     // if (!upper.geo) {
// // // //     //   setProgress(null);
// // // //     //   setMessage("Please upload both Upper and Lower scan models first");
// // // //     //   return;
// // // //     // }

// // // //     if (!upper.geo || !lower.geo) {
// // // //      setProgress(null);
// // // //       setMessage("Please upload both Upper and Lower scan models first");
// // // //       return;
// // // //       }

// // // //     setBusy(true);
// // // //     setMessage("");
// // // //     setProgress({ percent: 0, label: "Starting..." });

// // // //     try {
// // // //       // 1. start the job on the backend (answers immediately)
// // // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // // //       const started = await res.json();
// // // //       if (!res.ok) throw new Error(started.message);

// // // //       // 2. ask the backend for the progress every second until it is done
// // // //       while (true) {
// // // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // // //         const job = await statusRes.json();

// // // //         if (job.error) throw new Error(job.error);
// // // //         setProgress({ percent: job.percent, label: job.label });
// // // //         if (job.done) break;
// // // //       }
// // // //             // keep the green "completed" bar for 2 seconds, then hide it
// // // //       setTimeout(() => setProgress(null), 2000);
// // // //     } catch (err) {
// // // //       setProgress(null);
// // // //       setMessage(err.message);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // // //       <TopBar
// // // //         upperName={upper.name}
// // // //         lowerName={lower.name}
// // // //         onUpperSelected={(file) => handleFile("upper", file)}
// // // //         onLowerSelected={(file) => handleFile("lower", file)}
// // // //         onIdentifyLat={handleIdentifyLat}
// // // //         busy={busy}
// // // //         progress={progress}
// // // //         message={message}
// // // //       />

// // // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // // //         <Viewer
// // // //           upperGeo={upper.geo}
// // // //           lowerGeo={lower.geo}
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //         />

// // // //         <VisibilityButtons
// // // //           showUpper={showUpper}
// // // //           showLower={showLower}
// // // //           hasUpper={!!upper.geo}
// // // //           hasLower={!!lower.geo}
// // // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // // //           onToggleLower={() => setShowLower((v) => !v)}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }







// // // import { useCallback, useRef, useState } from "react";
// // // import TopBar from "./TopBar.jsx";
// // // import Viewer from "./Viewer.jsx";
// // // import VisibilityButtons from "./VisibilityButtons.jsx";
// // // import { parseStl } from "./stlUtils.js";
// // // import { loadLatCurves } from "./latUtils.js";

// // // const BACKEND_URL = "http://localhost:5174";

// // // export default function App() {
// // //   const [upper, setUpper] = useState({ name: "", geo: null });
// // //   const [lower, setLower] = useState({ name: "", geo: null });
// // //   const [showUpper, setShowUpper] = useState(true);
// // //   const [showLower, setShowLower] = useState(true);
// // //   const [busy, setBusy] = useState(false);
// // //   const [progress, setProgress] = useState(null); // { percent, label } or null
// // //   const [message, setMessage] = useState("");

// // //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// // //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });

// // //   // dragging of one editable point
// // //   const dragRef = useRef(null); // { jaw, id, index }
// // //   const [dragging, setDragging] = useState(false);

// // //   const handleFile = async (type, file) => {
// // //     const geo = parseStl(await file.arrayBuffer());

// // //     if (type === "upper") {
// // //       setUpper({ name: file.name, geo });
// // //       setShowUpper(true);
// // //     } else {
// // //       setLower({ name: file.name, geo });
// // //       setShowLower(true);
// // //     }
// // //     // a new scan: remove the old LAT of that jaw
// // //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// // //     setMessage("");
// // //     setProgress(null);

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

// // //   const handleIdentifyLat = async () => {
// // //     if (!upper.geo || !lower.geo) {
// // //       setProgress(null);
// // //       setMessage("Please upload both Upper and Lower scan models first");
// // //       return;
// // //     }

// // //     setBusy(true);
// // //     setMessage("");
// // //     setProgress({ percent: 0, label: "Starting..." });

// // //     try {
// // //       // 1. start the job on the backend (answers immediately)
// // //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// // //       const started = await res.json();
// // //       if (!res.ok) throw new Error(started.message);

// // //       // 2. ask the backend for the progress every second until it is done
// // //       let job;
// // //       while (true) {
// // //         await new Promise((resolve) => setTimeout(resolve, 1000));

// // //         const statusRes = await fetch(`${BACKEND_URL}/api/identify-lat/status`);
// // //         job = await statusRes.json();

// // //         if (job.error) throw new Error(job.error);
// // //         setProgress({ percent: job.percent, label: job.label });
// // //         if (job.done) break;
// // //       }

// // //       // 3. download the CSV files and show them as splines
// // //       const stamp = Date.now();
// // //       const csv = job.csvFiles || {};
// // //       setLatCurves({
// // //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// // //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// // //       });

// // //       // keep the green "completed" bar for 2 seconds, then hide it
// // //       setTimeout(() => setProgress(null), 2000);
// // //     } catch (err) {
// // //       setProgress(null);
// // //       setMessage(err.message);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   // ---------------- editing of the splines ----------------
// // //   const startDrag = (jaw, id, index) => {
// // //     dragRef.current = { jaw, id, index };
// // //     setDragging(true);
// // //   };

// // //   const endDrag = useCallback(() => {
// // //     dragRef.current = null;
// // //     setDragging(false);
// // //   }, []);

// // //   // moves the dragged point to the surface point under the mouse
// // //   const moveDrag = (point) => {
// // //     const d = dragRef.current;
// // //     if (!d) return;

// // //     setLatCurves((prev) => ({
// // //       ...prev,
// // //       [d.jaw]: prev[d.jaw].map((curve) =>
// // //         curve.id === d.id
// // //           ? { ...curve, points: curve.points.map((p, i) => (i === d.index ? point.clone() : p)) }
// // //           : curve
// // //       ),
// // //     }));
// // //   };

// // //   return (
// // //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// // //       <TopBar
// // //         upperName={upper.name}
// // //         lowerName={lower.name}
// // //         onUpperSelected={(file) => handleFile("upper", file)}
// // //         onLowerSelected={(file) => handleFile("lower", file)}
// // //         onIdentifyLat={handleIdentifyLat}
// // //         busy={busy}
// // //         progress={progress}
// // //         message={message}
// // //       />

// // //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// // //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// // //         <Viewer
// // //           upperGeo={upper.geo}
// // //           lowerGeo={lower.geo}
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           latCurves={latCurves}
// // //           dragging={dragging}
// // //           onStartDrag={startDrag}
// // //           onMoveDrag={moveDrag}
// // //           onEndDrag={endDrag}
// // //         />

// // //         <VisibilityButtons
// // //           showUpper={showUpper}
// // //           showLower={showLower}
// // //           hasUpper={!!upper.geo}
// // //           hasLower={!!lower.geo}
// // //           onToggleUpper={() => setShowUpper((v) => !v)}
// // //           onToggleLower={() => setShowLower((v) => !v)}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }











// // import { useCallback, useRef, useState } from "react";
// // import TopBar from "./TopBar.jsx";
// // import Viewer from "./Viewer.jsx";
// // import VisibilityButtons from "./VisibilityButtons.jsx";
// // import { parseStl } from "./stlUtils.js";
// // import { loadLatCurves, saveLatCurve } from "./latUtils.js";

// // const BACKEND_URL = "http://localhost:5174";

// // export default function App() {
// //   const [upper, setUpper] = useState({ name: "", geo: null });
// //   const [lower, setLower] = useState({ name: "", geo: null });
// //   const [showUpper, setShowUpper] = useState(true);
// //   const [showLower, setShowLower] = useState(true);
// //   const [busy, setBusy] = useState(false);
// //   const [progress, setProgress] = useState(null); // { percent, label } or null
// //   const [message, setMessage] = useState("");

// //   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
// //   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
// //   // always holds the newest curves (used when a drag ends and the curve is saved)
// //   const latCurvesRef = useRef(latCurves);
// //   latCurvesRef.current = latCurves;

// //   // dragging of one editable point
// //   const dragRef = useRef(null); // { jaw, id, index, moved }
// //   const [dragging, setDragging] = useState(false);

// //   const handleFile = async (type, file) => {
// //     const geo = parseStl(await file.arrayBuffer());

// //     if (type === "upper") {
// //       setUpper({ name: file.name, geo });
// //       setShowUpper(true);
// //     } else {
// //       setLower({ name: file.name, geo });
// //       setShowLower(true);
// //     }
// //     // a new scan: remove the old LAT of that jaw
// //     setLatCurves((prev) => ({ ...prev, [type]: [] }));
// //     setMessage("");
// //     setProgress(null);

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

// //   // asks the backend for the progress every second until the job is done
// //   const waitForJob = async (statusUrl) => {
// //     while (true) {
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       const res = await fetch(statusUrl);
// //       const job = await res.json();

// //       if (job.error) throw new Error(job.error);
// //       setProgress({ percent: job.percent, label: job.label });
// //       if (job.done) return job;
// //     }
// //   };

// //   // ---------------- Identify LAT button ----------------
// //   const handleIdentifyLat = async () => {
// //     if (!upper.geo || !lower.geo) {
// //       setProgress(null);
// //       setMessage("Please upload both Upper and Lower scan models first");
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

// //       // download the CSV files and show them as splines
// //       const stamp = Date.now();
// //       const csv = job.csvFiles || {};
// //       setLatCurves({
// //         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
// //         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
// //       });

// //       // keep the green "completed" bar for 2 seconds, then hide it
// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   // ---------------- Segment button (separates teeth and gum) ----------------
// //   const handleSegmentTeeth = async () => {
// //     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
// //       setProgress(null);
// //       setMessage("Please run Identify LAT first");
// //       return;
// //     }

// //     setBusy(true);
// //     setMessage("");
// //     setProgress({ percent: 0, label: "Starting..." });

// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
// //       const started = await res.json();
// //       if (!res.ok) throw new Error(started.message);

// //       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

// //       // the files created by the exe (also printed in the backend terminal)
// //       console.log("Segment output files:", job.newFiles);

// //       setTimeout(() => setProgress(null), 2000);
// //     } catch (err) {
// //       setProgress(null);
// //       setMessage(err.message);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   // ---------------- editing of the splines ----------------
// //   const startDrag = (jaw, id, index) => {
// //     dragRef.current = { jaw, id, index, moved: false };
// //     setDragging(true);
// //   };

// //   // when the mouse button is released: save the edited curve to its csv file
// //   const endDrag = useCallback(async () => {
// //     const d = dragRef.current;
// //     dragRef.current = null;
// //     setDragging(false);

// //     if (!d || !d.moved) return; // nothing was changed

// //     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
// //     if (!curve) return;

// //     try {
// //       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
// //       setMessage(result.message);
// //     } catch (err) {
// //       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
// //     }
// //   }, []);

// //   // moves the dragged point to the surface point under the mouse
// //   const moveDrag = (point) => {
// //     const d = dragRef.current;
// //     if (!d) return;

// //     const current = latCurvesRef.current;
// //     const curve = current[d.jaw].find((c) => c.id === d.id);
// //     if (!curve) return;

// //     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
// //     d.moved = true;

// //     // update the ref at once, so a save right after the last move uses the newest points
// //     latCurvesRef.current = {
// //       ...current,
// //       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
// //     };
// //     setLatCurves(latCurvesRef.current);
// //   };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
// //       <TopBar
// //         upperName={upper.name}
// //         lowerName={lower.name}
// //         onUpperSelected={(file) => handleFile("upper", file)}
// //         onLowerSelected={(file) => handleFile("lower", file)}
// //         onIdentifyLat={handleIdentifyLat}
// //         onSegment={handleSegmentTeeth}
// //         busy={busy}
// //         progress={progress}
// //         message={message}
// //       />

// //       {/* position: relative lets the buttons float over the top-right of the 3D area */}
// //       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
// //         <Viewer
// //           upperGeo={upper.geo}
// //           lowerGeo={lower.geo}
// //           showUpper={showUpper}
// //           showLower={showLower}
// //           latCurves={latCurves}
// //           dragging={dragging}
// //           onStartDrag={startDrag}
// //           onMoveDrag={moveDrag}
// //           onEndDrag={endDrag}
// //         />

// //         <VisibilityButtons
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












// import { useCallback, useRef, useState } from "react";
// import TopBar from "./TopBar.jsx";
// import Viewer from "./Viewer.jsx";
// import VisibilityButtons from "./VisibilityButtons.jsx";
// import { parseStl } from "./stlUtils.js";
// import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// const BACKEND_URL = "http://localhost:5174";
// const NO_CURVES = { upper: [], lower: [] };

// export default function App() {
//   const [upper, setUpper] = useState({ name: "", geo: null });
//   const [lower, setLower] = useState({ name: "", geo: null });
//   const [showUpper, setShowUpper] = useState(true);
//   const [showLower, setShowLower] = useState(true);
//   const [busy, setBusy] = useState(false);
//   const [progress, setProgress] = useState(null); // { percent, label } or null
//   const [message, setMessage] = useState("");

//   // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
//   const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
//   const [showSplines, setShowSplines] = useState(true);
//   // always holds the newest curves (used when a drag ends and the curve is saved)
//   const latCurvesRef = useRef(latCurves);
//   latCurvesRef.current = latCurves;

//   // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
//   const [segParts, setSegParts] = useState({ upper: null, lower: null });

//   // dragging of one editable point
//   const dragRef = useRef(null); // { jaw, id, index, moved }
//   const [dragging, setDragging] = useState(false);

//   const handleFile = async (type, file) => {
//     const geo = parseStl(await file.arrayBuffer());

//     if (type === "upper") {
//       setUpper({ name: file.name, geo });
//       setShowUpper(true);
//     } else {
//       setLower({ name: file.name, geo });
//       setShowLower(true);
//     }
//     // a new scan: remove the old LAT and the old separated parts of that jaw
//     setLatCurves((prev) => ({ ...prev, [type]: [] }));
//     setSegParts((prev) => ({ ...prev, [type]: null }));
//     setMessage("");
//     setProgress(null);

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

//   // asks the backend for the progress every second until the job is done
//   const waitForJob = async (statusUrl) => {
//     while (true) {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const res = await fetch(statusUrl);
//       const job = await res.json();

//       if (job.error) throw new Error(job.error);
//       setProgress({ percent: job.percent, label: job.label });
//       if (job.done) return job;
//     }
//   };

//   // ---------------- Identify LAT button ----------------
//   const handleIdentifyLat = async () => {
//     if (!upper.geo || !lower.geo) {
//       setProgress(null);
//       setMessage("Please upload both Upper and Lower scan models first");
//       return;
//     }

//     setBusy(true);
//     setMessage("");
//     setProgress({ percent: 0, label: "Starting..." });

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
//       const started = await res.json();
//       if (!res.ok) throw new Error(started.message);

//       const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

//       // download the CSV files and show them as splines
//       const stamp = Date.now();
//       const csv = job.csvFiles || {};
//       setLatCurves({
//         upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
//         lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
//       });
//       setSegParts({ upper: null, lower: null }); // back to the raw scans
//       setShowSplines(true);

//       // keep the green "completed" bar for 2 seconds, then hide it
//       setTimeout(() => setProgress(null), 2000);
//     } catch (err) {
//       setProgress(null);
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   // ---------------- Segment button (separates teeth and gum) ----------------
//   const handleSegmentTeeth = async () => {
//     if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
//       setProgress(null);
//       setMessage("Please run Identify LAT first");
//       return;
//     }

//     setShowSplines(false); // the splines disappear as soon as Segment is clicked
//     setBusy(true);
//     setMessage("");
//     setProgress({ percent: 0, label: "Starting..." });

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
//       const started = await res.json();
//       if (!res.ok) throw new Error(started.message);

//       const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

//       // the files created by the exe (also printed in the backend terminal)
//       console.log("Segment output files:", job.newFiles);

//       // download the gum and teeth STL files and show them
//       const stamp = Date.now();
//       const stl = job.stlFiles || {};
//       setSegParts({
//         upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
//         lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
//       });

//       setTimeout(() => setProgress(null), 2000);
//     } catch (err) {
//       setShowSplines(true); // Segment failed, so the splines come back
//       setProgress(null);
//       setMessage(err.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   // ---------------- editing of the splines ----------------
//   const startDrag = (jaw, id, index) => {
//     dragRef.current = { jaw, id, index, moved: false };
//     setDragging(true);
//   };

//   // when the mouse button is released: save the edited curve to its csv file
//   const endDrag = useCallback(async () => {
//     const d = dragRef.current;
//     dragRef.current = null;
//     setDragging(false);

//     if (!d || !d.moved) return; // nothing was changed

//     const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
//     if (!curve) return;

//     try {
//       const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
//       setMessage(result.message);
//       setTimeout(() => setMessage(""), 2000);
//     } catch (err) {
//       setMessage(`Could not save ${d.id}.csv: ${err.message}`);
//     }
//   }, []);

//   // moves the dragged point to the surface point under the mouse
//   const moveDrag = (point) => {
//     const d = dragRef.current;
//     if (!d) return;

//     const current = latCurvesRef.current;
//     const curve = current[d.jaw].find((c) => c.id === d.id);
//     if (!curve) return;

//     const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
//     d.moved = true;

//     // update the ref at once, so a save right after the last move uses the newest points
//     latCurvesRef.current = {
//       ...current,
//       [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
//     };
//     setLatCurves(latCurvesRef.current);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
//       <TopBar
//         upperName={upper.name}
//         lowerName={lower.name}
//         onUpperSelected={(file) => handleFile("upper", file)}
//         onLowerSelected={(file) => handleFile("lower", file)}
//         onIdentifyLat={handleIdentifyLat}
//         onSegment={handleSegmentTeeth}
//         busy={busy}
//         progress={progress}
//         message={message}
//       />

//       {/* position: relative lets the buttons float over the top-right of the 3D area */}
//       <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
//         <Viewer
//           upperGeo={upper.geo}
//           lowerGeo={lower.geo}
//           upperParts={segParts.upper}
//           lowerParts={segParts.lower}
//           showUpper={showUpper}
//           showLower={showLower}
//           latCurves={showSplines ? latCurves : NO_CURVES}
//           dragging={dragging}
//           onStartDrag={startDrag}
//           onMoveDrag={moveDrag}
//           onEndDrag={endDrag}
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

















import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TopBar from "./TopBar.jsx";
import Viewer from "./Viewer.jsx";
import VisibilityButtons from "./VisibilityButtons.jsx";
import { parseStl } from "./stlUtils.js";
import { removeTeeth } from "./gumUtils.js";
import { deformGum } from "./gumDeform.js";
import { computeOcclusion, occlusionGradientCss, OCCLUSION_TICKS } from "./occlusion.js";
import { computeMovement, toothFrames } from "./movement.js";
import MovementPanel from "./MovementPanel.jsx";
import { computeStaging, toothMatrixAtStage, gumAtStage, computeStageMovement } from "./staging.js";
import StagingBar from "./StagingBar.jsx";
import { computeRoots, saveTeethWithRoots } from "./roots.js";
import { computeBolton } from "./bolton.js";
import BoltonPanel from "./BoltonPanel.jsx";


// import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

const BACKEND_URL = "http://localhost:5174";
const NO_CURVES = { upper: [], lower: [] };
const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

const NO_RESULT = { upper: null, lower: null };

const NO_LABELS = { upper: [], lower: [] };
// the grid starts below the first bar (44) and the second bar (44); change this if those heights change
const BARS_HEIGHT = 88;
// const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.28)";
// const GRID_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;
const MINOR_LINE_COLOR = "rgba(255, 255, 255, 0.65)"; // the small squares
const MAJOR_LINE_COLOR = "rgba(255, 90, 90, 0.6)"; // the strong line after every 5 squares

// 4 layers: strong vertical, strong horizontal, small vertical, small horizontal
const GRID_IMAGE = [
  `linear-gradient(to right, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
  `linear-gradient(to bottom, ${MAJOR_LINE_COLOR} 1px, transparent 1px)`,
  `linear-gradient(to right, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
  `linear-gradient(to bottom, ${MINOR_LINE_COLOR} 1px, transparent 1px)`,
].join(", ");
// TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// without running Clean Model or Identify LAT again (the old Output folder is kept)
const KEEP_OUTPUT_ON_UPLOAD = false;
const NO_PARTS = { upper: null, lower: null };

  

const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// when a step runs, only these steps become "not done" again
const RESETS = {
  cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment","automaticSetup"],
  generateTrimline: ["trimModel", "addBase"],
  trimModel: ["addBase"],
  addBase: [],
  identifyLat: ["segment","automaticSetup"],
  segment: ["automaticSetup"],
    automaticSetup: [],
};

const NOT_DONE = {
  cleanModel: false,
  identifyLat: false,
  segment: false,
  generateTrimline: false,
  trimModel: false,
  addBase: false,
  automaticSetup: false,
};




// button name used by the backend -> step name
const COMMAND_TO_STEP = {
  GenerateTrimline: "generateTrimline",
  TrimModel: "trimModel",
  AddBase: "addBase",
};
const NEED_SEGMENTER_MESSAGE = "First complete Clean Model or Identify LAT.";

// step that must be finished before this step can run
const REQUIRED_BEFORE = {
  trimModel: { step: "generateTrimline", message: "Please do Generate Trimline first." },
  addBase: { step: "trimModel", message: "Please do Trim Model first." },
};



// button text in the Clean Model tab -> command sent to the backend
const NEW_EXE_COMMANDS = {
  "Generate Trimline": "GenerateTrimline",
  "Trim Model": "TrimModel",
  "Add Base": "AddBase",
};

export default function App() {
  const [upper, setUpper] = useState({ name: "", geo: null });
  const [lower, setLower] = useState({ name: "", geo: null });
  const [showUpper, setShowUpper] = useState(true);
  const [showLower, setShowLower] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null); // { percent, label } or null
  const [message, setMessage] = useState("");

  // which buttons already produced a result
const [doneSteps, setDoneSteps] = useState(NOT_DONE);

// true after Clean Model or Identify LAT finished (the segmenter result exists)
// const [segmenterReady, setSegmenterReady] = useState(false);

const [segmenterReady, setSegmenterReady] = useState(KEEP_OUTPUT_ON_UPLOAD);

// marks a step as done and resets the steps after it
// const markDone = (step) =>
//   setDoneSteps((prev) => {
//     const next = { ...prev };
//     STEP_ORDER.forEach((s, i) => {
//       if (i > STEP_ORDER.indexOf(step)) next[s] = false;
//     });
//     next[step] = true;
//     return next;
//   });



const markDone = (step) =>
  setDoneSteps((prev) => {
    const next = { ...prev };
    RESETS[step].forEach((s) => (next[s] = false));
    next[step] = true;
    return next;
  });

// shows the alert and returns true if the step was already done
// const alreadyDone = (step) => {
//   if (doneSteps[step]) {
//     alert(DONE_MESSAGES[step]);
//     return true;
//   }
//   return false;
// };


// if the step is already done: show its stored result and do not run the exe again
const showIfDone = (step) => {
  if (doneSteps[step]) {
    setView(step);
    setMessage("");
    return true;
  }
  return false;
};

  // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
  const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
  const [showSplines, setShowSplines] = useState(true);
  // always holds the newest curves (used when a drag ends and the curve is saved)
  const latCurvesRef = useRef(latCurves);
  latCurvesRef.current = latCurves;

  // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
  const [segParts, setSegParts] = useState({ upper: null, lower: null });

  // result of Automatic Setup: [{ name, geo }, ...] for each jaw
const [setupParts, setSetupParts] = useState({ upper: null, lower: null });

  // visibility of the upper/lower teeth and gum (the four buttons after Segment)
  const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
  const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));


  // results of Generate Trimline (list of points) and Trim Model / Add Base ({ kind, geo })
  const [trimlines, setTrimlines] = useState(NO_RESULT);
  // const [resultMeshes, setResultMeshes] = useState(NO_RESULT);

const [trimModelMeshes, setTrimModelMeshes] = useState(NO_RESULT);
const [baseMeshes, setBaseMeshes] = useState(NO_RESULT);

// which result is shown: "scan" or the name of a step
const [view, setView] = useState("scan");

    // always holds the newest trimlines (used while a point is dragged and when it is saved)
  const trimlinesRef = useRef(trimlines);
  trimlinesRef.current = trimlines;

    // tooth number labels after Segment: [{ id: "11", a: Vector3, b: Vector3 }, ...] for each jaw
  const [toothLabels, setToothLabels] = useState(NO_LABELS);
       const [showNumbers, setShowNumbers] = useState(true);
       const [showGrid, setShowGrid] = useState(false);
       const gridRef = useRef(null); // the grid layer, sized by the Viewer

const [gridSize, setGridSize] = useState(1); // grid spacing in mm

const [showSuperimpose, setShowSuperimpose] = useState(false);
const [showOcclusion, setShowOcclusion] = useState(false); // occlusion contact map on/off
const [showMovement, setShowMovement] = useState(false); // Movement table on/off
const [showRoot, setShowRoot] = useState(false); // Root view on/off (gum hidden, a root under every crown)
const [showBolton, setShowBolton] = useState(false); // Bolton table + width line on the arch on/off
const [stage, setStage] = useState(0); // Staging: the stage shown (0 = Initial Position)
const [playing, setPlaying] = useState(false); // Staging: Play is running
const [stageMovementMode, setStageMovementMode] = useState("zero"); // Staging Movement table: "zero" or "prev"
// Movement table starts at the top of the third bar: measure how tall the third bar is
const viewAreaRef = useRef(null);
const [thirdBarHeight, setThirdBarHeight] = useState(56);
useLayoutEffect(() => {
  const measure = () => {
    // the 3D area starts right under the third bar; the first two bars are BARS_HEIGHT tall
    if (viewAreaRef.current) setThirdBarHeight(Math.max(0, viewAreaRef.current.offsetTop - BARS_HEIGHT));
  };
  measure();
  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
}, []);

       const [viewRequest, setViewRequest] = useState(null);



  // dragging of one editable point
  const dragRef = useRef(null); // { jaw, id, index, moved }
  const [dragging, setDragging] = useState(false);

  const handleFile = async (type, file) => {
    const geo = parseStl(await file.arrayBuffer());

    if (type === "upper") {
      setUpper({ name: file.name, geo });
      setShowUpper(true);
    } else {
      setLower({ name: file.name, geo });
      setShowLower(true);
    }
    // a new scan: remove the old LAT and the old separated parts of that jaw
    setLatCurves((prev) => ({ ...prev, [type]: [] }));
    setSegParts((prev) => ({ ...prev, [type]: null }));
    setSetupParts((prev) => ({ ...prev, [type]: null }));

    setToothLabels((prev) => ({ ...prev, [type]: [] }));
    setSegVisible(ALL_VISIBLE);

      // setTrimlines((prev) => ({ ...prev, [type]: null }));
      // setResultMeshes((prev) => ({ ...prev, [type]: null }));


   setTrimlines((prev) => ({ ...prev, [type]: null }));
   setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
   setBaseMeshes((prev) => ({ ...prev, [type]: null }));
   setView("scan");
   setShowSuperimpose(false);
   setShowOcclusion(false);
   setShowMovement(false);

    setMessage("");
    setDoneSteps(NOT_DONE);
    setSegmenterReady(false);
    setProgress(null);

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

  // asks the backend for the progress every second until the job is done.
  // The backend only knows when a whole exe step finishes (0, 50, 100 ...),
  // so the number on the bar climbs 1% at a time by itself while the exe works
  // (never past 99), catches up 1% at a time when the backend is ahead,
  // and only reaches 100% when the job is really done.
  const waitForJob = (statusUrl) =>
    new Promise((resolve, reject) => {
      let shown = 0;          // number shown on the bar
      let target = 0;         // real percent from the backend
      let label = "Starting...";
      let doneJob = null;     // set when the backend says done
      let stopped = false;
      let lastStep = Date.now();

      // every 25 ms: decide whether to add 1%
      const timer = setInterval(() => {
        if (stopped) return;
        const now = Date.now();
        // slow climb while waiting: 0.5 s per 1% at the start, about 4.5 s per 1% near 99
        const waitMs = 500 + shown * 40;
        if (shown < target) {
          shown++;               // backend is ahead (or done): catch up fast, 1% at a time
          lastStep = now;
        } else if (!doneJob && shown < 99 && now - lastStep >= waitMs) {
          shown++;               // exe still working: creep up 1%
          lastStep = now;
        } else if (!doneJob) {
          return;                // nothing changed
        }
        setProgress({ percent: shown, label });
        if (doneJob && shown >= 100) {
          stopped = true;
          clearInterval(timer);
          resolve(doneJob);
        }
      }, 25);

      // ask the backend 4 times a second, so the end of the job is noticed quickly
      (async () => {
        while (!stopped) {
          await new Promise((r) => setTimeout(r, 250));
          try {
            const res = await fetch(statusUrl);
            const job = await res.json();
            if (job.error) throw new Error(job.error);
            target = Math.max(target, job.percent || 0);
            if (job.label) label = job.label;
            if (job.done) {
              // job finished: show 100% at once and load the output right away
              stopped = true;
              clearInterval(timer);
              setProgress({ percent: 100, label });
              resolve(job);
              return;
            }
          } catch (err) {
            stopped = true;
            clearInterval(timer);
            reject(err);
            return;
          }
        }
      })();
    });

  // ---------------- Identify LAT button ----------------
  const handleIdentifyLat = async () => {
    // if (alreadyDone("identifyLat")) return;
    if (showIfDone("identifyLat")) return;
    if (!upper.geo || !lower.geo) {
      setProgress(null);
      setMessage("Please upload both Upper and Lower scan models first");
      
      return;
    }

    setBusy(true);
    setMessage("");
    setProgress({ percent: 0, label: "Starting..." });

    try {
      const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
      const started = await res.json();
      if (!res.ok) throw new Error(started.message);

      const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

      // download the CSV files and show them as splines
      const stamp = Date.now();
      const csv = job.csvFiles || {};
      // both jaws download at the same time
      const [latUpper, latLower] = await Promise.all([
        loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
        loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
      ]);
      setLatCurves({ upper: latUpper, lower: latLower });
      setSegParts({ upper: null, lower: null }); // back to the raw scans
      setToothLabels(NO_LABELS);
      setSegVisible(ALL_VISIBLE);
      setShowSplines(true);


      // setTrimlines(NO_RESULT);
      // setResultMeshes(NO_RESULT);
      markDone("identifyLat");
      setView("identifyLat");

      setSegmenterReady(true);

      // keep the green "completed" bar for 2 seconds, then hide it
      setTimeout(() => setProgress(null), 2000);
    } catch (err) {
      setProgress(null);
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  // ---------------- Segment button (separates teeth and gum) ----------------
  const handleSegmentTeeth = async () => {
    // if (alreadyDone("segment")) return;
    if (showIfDone("segment")) return;
    if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
      setProgress(null);
      setMessage("Please run Identify LAT first");
      return;
    }
     setShowNumbers(true);

    setShowSplines(false); // the splines disappear as soon as Segment is clicked
    setBusy(true);
    setMessage("");
    setProgress({ percent: 0, label: "Starting..." });

    try {
      const res = await fetch(`${BACKEND_URL}/api/segment-teeth`, { method: "POST" });
      const started = await res.json();
      if (!res.ok) throw new Error(started.message);

      const job = await waitForJob(`${BACKEND_URL}/api/segment-teeth/status`);

      // the files created by the exe (also printed in the backend terminal)
      console.log("Segment output files:", job.newFiles);

      // download the gum and teeth STL files and show them
      const stamp = Date.now();
      const stl = job.stlFiles || {};
      const numbers = job.numberFiles || {};
      // teeth, gum and number labels of both jaws download at the same time
      const [partsUpper, partsLower, labelsUpper, labelsLower] = await Promise.all([
        loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
        loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
        loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
        loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
      ]);
      setSegParts({ upper: partsUpper, lower: partsLower });
      setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
      // the tooth number labels (two points per tooth, from the TeethNumber exe)
      setToothLabels({ upper: labelsUpper, lower: labelsLower });
      markDone("segment");
      setView("segment");

      setTimeout(() => setProgress(null), 2000);
    } catch (err) {
      setShowSplines(true); // Segment failed, so the splines come back
      setProgress(null);
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };


    // ---------------- Clean Model button (CleanModel.exe, then the segmenter) ----------------
  // downloads one scan file from the backend again
  const loadScan = async (jaw, fileName, stamp) => {
    const res = await fetch(`${BACKEND_URL}/files/${jaw}/${fileName}?t=${stamp}`);
    return parseStl(await res.arrayBuffer());
  };

  const handleCleanModel = async () => {
    // if (alreadyDone("cleanModel")) return;
    if (showIfDone("cleanModel")) return;
    if (!upper.geo || !lower.geo) {
      setProgress(null);
      setMessage("Please upload both Upper and Lower scan models first");
      return;
    }

    setBusy(true);
    setMessage("");
    setProgress({ percent: 0, label: "Starting..." });

    try {
      const res = await fetch(`${BACKEND_URL}/api/clean-model`, { method: "POST" });
      const started = await res.json();
      if (!res.ok) throw new Error(started.message);

      // await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

            const job = await waitForJob(`${BACKEND_URL}/api/clean-model/status`);

      // show the cleaned scans (the cleaned model is saved in Upper.stl / Lower.stl)
      const stamp = Date.now();
      // both scans download at the same time
      const [upperGeo, lowerGeo] = await Promise.all([
        loadScan("upper", "Upper.stl", stamp),
        loadScan("lower", "Lower.stl", stamp),
      ]);
      setUpper((prev) => ({ ...prev, geo: upperGeo }));
      setLower((prev) => ({ ...prev, geo: lowerGeo }));

      // old LAT curves and separated parts do not match the cleaned scans
      // setLatCurves({ upper: [], lower: [] });
      // setSegParts({ upper: null, lower: null });
      // setSegVisible(ALL_VISIBLE);
      // setShowSplines(true);


            // old LAT curves do not match the cleaned scans
      setLatCurves({ upper: [], lower: [] });
      setShowSplines(true);


      setTrimlines(NO_RESULT);
      // setResultMeshes(NO_RESULT);
      setTrimModelMeshes(NO_RESULT);
      setBaseMeshes(NO_RESULT);

      // setToothLabels(NO_LABELS);

      // // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
      // const stl = job.stlFiles || {};
      // setSegParts({
      //   upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
      //   lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
      // });
      // setSegVisible(ALL_VISIBLE);

       setToothLabels(NO_LABELS);
      // show the whole cleaned scan (unsegmented), not the separated gum and teeth
      setSegParts({ upper: null, lower: null });
      setSegVisible(ALL_VISIBLE);
      markDone("cleanModel");
      setView("cleanModel");
      setSegmenterReady(true);

      setTimeout(() => setProgress(null), 2000);
    } catch (err) {
      setProgress(null);
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
  // const handleToolClick = (tool) => {
  //   if (busy) return;
  //   if (tool === "Clean Model") handleCleanModel();
  // };



  // Generate Trimline / Trim Model / Add Base: runs the new exe on the backend
  const runNewExeCommand = async (commandKey) => {
    // if (alreadyDone(COMMAND_TO_STEP[commandKey])) return;
    if (showIfDone(COMMAND_TO_STEP[commandKey])) return;
  //   if (!segmenterReady) {
  //  alert(NEED_SEGMENTER_MESSAGE);
  //  return;
  //  }

  if (!segmenterReady) {
  // the flag is false (for example after a refresh), so ask the backend about the real files
  let ready = false;
  try {
    const res = await fetch(`${BACKEND_URL}/api/output-ready`);
    ready = (await res.json()).ready;
  } catch (err) {
    ready = false;
  }
  if (!ready) {
    alert(NEED_SEGMENTER_MESSAGE);
    return;
  }
}



   const required = REQUIRED_BEFORE[COMMAND_TO_STEP[commandKey]];
   if (required && !doneSteps[required.step]) {
  alert(required.message);
  return;
  }
    if (!upper.geo || !lower.geo) {
      setProgress(null);
      setMessage("Please upload both Upper and Lower scan models first");
      return;
    }

    setBusy(true);
    setMessage("");
    setProgress({ percent: 0, label: "Starting..." });

    try {
      const res = await fetch(`${BACKEND_URL}/api/new-exe/${commandKey}`, { method: "POST" });
      const started = await res.json();
      if (!res.ok) throw new Error(started.message);

      // const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

      // the files created or changed by the exe (also printed in the backend terminal)
      // console.log(`${commandKey} output files:`, job.report);



        const job = await waitForJob(`${BACKEND_URL}/api/new-exe/status`);

      // the files created or changed by the exe (also printed in the backend terminal)
      console.log(`${commandKey} output files:`, job.report);

      // show the result in the 3D view
      const stamp = Date.now();
      const missing = [];
      for (const jaw of ["upper", "lower"]) {
        const rel = job.files ? job.files[jaw] : null;
        if (!rel) {
          missing.push(jaw);
          continue;
        }
        const url = `${BACKEND_URL}/files/${jaw}/${rel}?t=${stamp}`;

        // if (commandKey === "GenerateTrimline") {
        //   const points = await loadPointsFile(url);
        //   setTrimlines((prev) => ({ ...prev, [jaw]: points }));
        // } else {

        //   if (commandKey === "GenerateTrimline") {
        //   const points = await loadPointsFile(url);
        //   // 32 editable points; "rel" is the place of Trimline.csv, needed for saving
        //   setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
        //   setResultMeshes((prev) => ({ ...prev, [jaw]: null })); // a new trimline replaces an old Trim Model / Add Base result
        // } else {
        //   const geo = await loadStlFile(url);
        //   const kind = commandKey === "TrimModel" ? "trimModel" : "base";
        //   setResultMeshes((prev) => ({ ...prev, [jaw]: { kind, geo } }));
        // }


          if (commandKey === "GenerateTrimline") {
     const points = await loadPointsFile(url);
     setTrimlines((prev) => ({ ...prev, [jaw]: makeTrimlineData(points, rel) }));
    } else {
    const geo = await loadStlFile(url);
    if (commandKey === "TrimModel") {
    setTrimModelMeshes((prev) => ({ ...prev, [jaw]: { kind: "trimModel", geo } }));
   } else {
    setBaseMeshes((prev) => ({ ...prev, [jaw]: { kind: "base", geo } }));
  }
}


      }

      // if (missing.length > 0) {
      //   setMessage(`Result file not found for: ${missing.join(", ")}`);
      // }

      if (missing.length > 0) {
    setMessage(`Result file not found for: ${missing.join(", ")}`);
   } else {
     markDone(COMMAND_TO_STEP[commandKey]); // only when both jaws gave a result
     setView(COMMAND_TO_STEP[commandKey]);
   }


      setTimeout(() => setProgress(null), 2000);
    } catch (err) {
      setProgress(null);
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

// ---------------- Automatic Setup button ----------------
// const handleAutomaticSetup = async () => {
//   if (busy) return;

//   if (doneSteps.automaticSetup) {
//     setMessage("Automatic Setup is already completed. The output is in D:\\Temp\\uploads\\AutomaticSetupOutput");
//     return;
//   }
//   if (!doneSteps.segment) {
//     alert("Please do Segment first.");
//     return;
//   }

//   setBusy(true);
//   setMessage("");
//   setProgress({ percent: 0, label: "Starting..." });

//   try {
//     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
//     const started = await res.json();
//     if (!res.ok) throw new Error(started.message);

//     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);

//     // the files made by the exe (also printed in the backend terminal)
//     console.log("Automatic Setup output files:", job.files);

//     markDone("automaticSetup");
//     setMessage(`Automatic Setup completed. Output: ${job.outputDir}`);
//     setTimeout(() => setProgress(null), 2000);
//   } catch (err) {
//     setProgress(null);
//     setMessage(err.message);
//   } finally {
//     setBusy(false);
//   }
// };




// const handleAutomaticSetup = async () => {
//   if (busy) return;

//   // already done: only show the stored result, the exe is not called again
//   if (doneSteps.automaticSetup) {
//     setView("automaticSetup");
//     setMessage("");
//     return;
//   }
//   if (!doneSteps.segment) {
//     alert("Please do Segment first.");
//     return;
//   }

//   setBusy(true);
//   setMessage("");
//   setProgress({ percent: 0, label: "Starting..." });

//   try {
//     const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
//     const started = await res.json();
//     if (!res.ok) throw new Error(started.message);

//     const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
//     console.log("Automatic Setup output files:", job.files);

//     // download the STL files that the exe made, for each jaw
//     const stamp = Date.now();
//     const parts = { upper: [], lower: [] };
//     for (const rel of (job.files || []).filter((f) => f.toLowerCase().endsWith(".stl"))) {
//       const jaw = rel.split("/")[0]; // "upper" or "lower"
//       if (jaw !== "upper" && jaw !== "lower") continue;
//       const geo = await loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${rel}?t=${stamp}`);
//       parts[jaw].push({ name: rel.split("/").pop(), geo });
//     }

//     markDone("automaticSetup");

//     if (parts.upper.length + parts.lower.length === 0) {
//       setMessage(`Automatic Setup completed, but it made no STL files to show. Output: ${job.outputDir}`);
//     } else {
//       setSetupParts({
//         upper: parts.upper.length ? parts.upper : null,
//         lower: parts.lower.length ? parts.lower : null,
//       });
//       setView("automaticSetup");
//     }

//     setTimeout(() => setProgress(null), 2000);
//   } catch (err) {
//     setProgress(null);
//     setMessage(err.message);
//   } finally {
//     setBusy(false);
//   }
// };


const handleAutomaticSetup = async () => {
  if (busy) return;

  // already done: only show the stored result, the exe is not called again
  if (doneSteps.automaticSetup) {
    setView("automaticSetup");
    setMessage("");
    return;
  }
  if (!doneSteps.segment) {
    alert("Please do Segment first.");
    return;
  }

  setBusy(true);
  setMessage("");
  setProgress({ percent: 0, label: "Starting..." });

  try {
    const res = await fetch(`${BACKEND_URL}/api/automatic-setup`, { method: "POST" });
    const started = await res.json();
    if (!res.ok) throw new Error(started.message);

    const job = await waitForJob(`${BACKEND_URL}/api/automatic-setup/status`);
    console.log("Automatic Setup output files:", job.files);

    // download the tooth STL files that the exe made, for each jaw
    const stamp = Date.now();
    const parts = { upper: [], lower: [] };
    // only tooth files like 11_final.stl (this skips all_final.stl)
    const toothFiles = (job.files || [])
      .map((rel) => ({ rel, m: rel.split("/").pop().match(/^(\d)(\d)_final\.stl$/i) }))
      .filter((f) => f.m);
    // all tooth files download at the same time (the order is kept)
    const geos = await Promise.all(
      toothFiles.map((f) => loadStlFile(`${BACKEND_URL}/files/AutomaticSetupOutput/${f.rel}?t=${stamp}`))
    );
    toothFiles.forEach(({ m }, i) => {
      // 1x, 2x = upper jaw; 3x, 4x = lower jaw
      const jaw = m[1] === "1" || m[1] === "2" ? "upper" : "lower";
      // name it 11.stl again, like the Segment teeth, so the gum deformation can match each tooth
      parts[jaw].push({ name: `${m[1]}${m[2]}.stl`, geo: geos[i] });
    });

    if (parts.upper.length + parts.lower.length > 0) {
      setSetupParts({
        upper: parts.upper.length ? parts.upper : null,
        lower: parts.lower.length ? parts.lower : null,
      });
      markDone("automaticSetup");
      setView("automaticSetup");
    } else {
      console.warn("Automatic Setup made no STL files to show:", job.files);
    }

    setTimeout(() => setProgress(null), 2000);
  } catch (err) {
    setProgress(null);
    setMessage(err.message);
  } finally {
    setBusy(false);
  }
};


// Initial Position: the Segment result (no exe is called)
const handleInitialPosition = () => {
  if (busy) return;
  setView("segment");
  setMessage("");
};

// Final Position: the Automatic Setup result (no exe is called)
const handleFinalPosition = () => {
  if (busy) return;
  setView("automaticSetup");
  setMessage("");
};

  const handleViewChange = (name) => setViewRequest({ name, id: Date.now() });
  

  // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
  const handleToolClick = (tool) => {
    if (busy) return;
    if (tool === "Clean Model") handleCleanModel();
    else if (NEW_EXE_COMMANDS[tool]) runNewExeCommand(NEW_EXE_COMMANDS[tool]);
  };

















  // ---------------- editing of the splines ----------------
  // const startDrag = (jaw, id, index) => {
  //   dragRef.current = { jaw, id, index, moved: false };
  //   setDragging(true);
  // };

  // // when the mouse button is released: save the edited curve to its csv file
  // const endDrag = useCallback(async () => {
  //   const d = dragRef.current;
  //   dragRef.current = null;
  //   setDragging(false);

  //   if (!d || !d.moved) return; // nothing was changed

  //   const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
  //   if (!curve) return;

  //   try {
  //     const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
  //     setMessage(result.message);
  //     setTimeout(()=>setMessage(""),2000);
  //   } catch (err) {
  //     setMessage(`Could not save ${d.id}.csv: ${err.message}`);
  //   }
  // }, []);

  // // moves the dragged point to the surface point under the mouse
  // const moveDrag = (point) => {
  //   const d = dragRef.current;
  //   if (!d) return;

  //   const current = latCurvesRef.current;
  //   const curve = current[d.jaw].find((c) => c.id === d.id);
  //   if (!curve) return;

  //   const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
  //   d.moved = true;

  //   // update the ref at once, so a save right after the last move uses the newest points
  //   latCurvesRef.current = {
  //     ...current,
  //     [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
  //   };
  //   setLatCurves(latCurvesRef.current);
  // };


    // ---------------- editing of the splines and of the trimline ----------------
  // a LAT point of one tooth
  const startDrag = (jaw, id, index) => {
    dragRef.current = { kind: "lat", jaw, id, index, moved: false };
    setDragging(true);
  };

  // a point of the trimline
  const startTrimDrag = (jaw, index) => {
    dragRef.current = { kind: "trim", jaw, index, moved: false };
    setDragging(true);
  };

  // when the mouse button is released: save the edited curve to its csv file
  const endDrag = useCallback(async () => {
    const d = dragRef.current;
    dragRef.current = null;
    setDragging(false);

    if (!d || !d.moved) return; // nothing was changed

    try {
      if (d.kind === "trim") {
        const trimline = trimlinesRef.current[d.jaw];
        if (!trimline) return;
        const result = await saveTrimline(BACKEND_URL, d.jaw, trimline);
        setMessage(result.message);
        setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);

      } else {
        const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
        if (!curve) return;
        const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
        setMessage(result.message);
         setTimeout(() => setMessage((m) => (m === result.message ? "" : m)), 2000);
      }
    } catch (err) {
      setMessage(`Could not save: ${err.message}`);
    }
  }, []);

  // moves the dragged point to the surface point under the mouse
  const moveDrag = (point) => {
    const d = dragRef.current;
    if (!d) return;

    // a point of the trimline
    if (d.kind === "trim") {
      const trimline = trimlinesRef.current[d.jaw];
      if (!trimline) return;

      d.moved = true;
      const newPoints = trimline.points.map((p, i) => (i === d.index ? point.clone() : p));
      trimlinesRef.current = { ...trimlinesRef.current, [d.jaw]: { ...trimline, points: newPoints } };
      setTrimlines(trimlinesRef.current);
      return;
    }

    // a LAT point of one tooth
    const current = latCurvesRef.current;
    const curve = current[d.jaw].find((c) => c.id === d.id);
    if (!curve) return;

    const newPoints = curve.points.map((p, i) => (i === d.index ? point.clone() : p));
    d.moved = true;

    // update the ref at once, so a save right after the last move uses the newest points
    latCurvesRef.current = {
      ...current,
      [d.jaw]: current[d.jaw].map((c) => (c.id === d.id ? { ...c, points: newPoints } : c)),
    };
    setLatCurves(latCurvesRef.current);
  };

  // only the result of the selected step is shown, everything else is hidden
const viewCurves = view === "identifyLat" ? latCurves : NO_CURVES;
// const viewParts = view === "segment" ? segParts : NO_PARTS;
// const viewParts =
//   view === "segment" ? segParts : view === "automaticSetup" ? setupParts : NO_PARTS;

// Automatic Setup view: the moved teeth from the exe + the gum from the Segment step
// const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// const isGumPart = (p) => /gum|modelwithbase/i.test(p.name);

// const isGumPart = (p) => p.name.toLowerCase().includes("gum");
// const setupWithGum = (jaw) => {
//   const teeth = setupParts[jaw];
//   if (!teeth) return null;
//   if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
//   const gum = (segParts[jaw] || []).filter(isGumPart);
//   return [...gum, ...teeth];
// };
// const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };



const isGumPart = (p) => p.name.toLowerCase().includes("gum");
const isWholePart = (p) => /modelwithbase/i.test(p.name);

// full gum with base (no teeth), cut out of ModelWithBase.stl; built once per Segment result
const wholeGum = useMemo(() => {
  const build = (parts) => {
    if (!parts) return null;
    const whole = parts.find(isWholePart);
    if (!whole) return null;
    const teeth = parts.filter((p) => !isGumPart(p) && !isWholePart(p)).map((p) => p.geo);
    const geo = removeTeeth(whole.geo, teeth);
    return geo ? { name: "GumWithBase.stl", geo } : null;
  };
  return { upper: build(segParts.upper), lower: build(segParts.lower) };
}, [segParts]);

// gum that follows the moved teeth (Automatic Setup result)
const deformedGum = useMemo(() => {
  const build = (jaw) => {
    const moved = setupParts[jaw];
    if (!moved || moved.some(isGumPart)) return null;
    const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
    if (!base) return null;
    const orig = (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));
    const geo = deformGum(base.geo, orig, moved);
    return geo ? { name: "GumDeformed.stl", geo } : null;
  };
  return { upper: build("upper"), lower: build("lower") };
}, [setupParts, segParts, wholeGum]);

const setupWithGum = (jaw) => {
  const teeth = setupParts[jaw];
  if (!teeth) return null;
  if (teeth.some(isGumPart)) return teeth; // the exe already made a gum, so use it
  // const gum = wholeGum[jaw]
  //   ? [wholeGum[jaw]]
  //   : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl

    const gum = deformedGum[jaw]
    ? [deformedGum[jaw]]
    : wholeGum[jaw]
    ? [wholeGum[jaw]]
    : (segParts[jaw] || []).filter((p) => isGumPart(p)); // fallback: plain Gum.stl
  return [...gum, ...teeth];
};
const setupView = { upper: setupWithGum("upper"), lower: setupWithGum("lower") };
// Superimpose: only on the Final Position view; the initial teeth (Segment result) are drawn as a green ghost
// also on the Staging view: the initial teeth as a green ghost over the shown stage
const superimposeActive = showSuperimpose && (view === "automaticSetup" || view === "staging");

const initialTeeth = (jaw) => (segParts[jaw] || []).filter((p) => !isGumPart(p) && !isWholePart(p));

const ghostParts = superimposeActive
  ? { upper: initialTeeth("upper"), lower: initialTeeth("lower") }
  : NO_PARTS;

const handleToggleSuperimpose = () => {
  if (busy) return;
  if (superimposeActive) {
    setShowSuperimpose(false);
  } else {
    setShowSuperimpose(true);
    // Superimpose compares with the final position (on Staging it stays on the shown stage)
    if (view !== "staging") setView("automaticSetup");
  }
};

// ---------------- Staging: the movement from Initial to Final Position in small steps ----------------
// max 0.2 mm and 2 degrees per tooth per stage (staging.js); the timeline at the bottom picks the stage
const stagingTeeth = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
const stagingActive =
  view === "staging" && stagingTeeth(setupParts.upper).length + stagingTeeth(setupParts.lower).length > 0;

// measured once per Automatic Setup result, not on every stage
const staging = useMemo(() => {
  if (!stagingActive) return null;
  try {
    return computeStaging(
      { upper: stagingTeeth(segParts.upper), lower: stagingTeeth(segParts.lower) },
      { upper: stagingTeeth(setupParts.upper), lower: stagingTeeth(setupParts.lower) }
    );
  } catch (err) {
    console.error("Staging failed:", err);
    return null;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [stagingActive, segParts, setupParts]);
const stageCount = staging ? staging.stageCount : 0;
const shownStage = Math.min(stage, stageCount);

// gum of each jaw at the shown stage
const stagingGum = useMemo(() => {
  if (!staging) return NO_PARTS;
  const build = (jaw) => {
    const base = wholeGum[jaw] || (segParts[jaw] || []).find(isGumPart);
    if (!base) return null;
    const final = deformedGum[jaw];
    return { name: base.name, geo: gumAtStage(base.geo, final && final.geo, shownStage, stageCount) };
  };
  return { upper: build("upper"), lower: build("lower") };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [staging, shownStage, wholeGum, deformedGum, segParts]);

// the gum made for one stage is thrown away when the next stage is shown
useEffect(() => {
  return () => {
    for (const jaw of ["upper", "lower"]) {
      const g = stagingGum[jaw];
      if (!g) continue;
      const keep = [wholeGum[jaw]?.geo, deformedGum[jaw]?.geo, (segParts[jaw] || []).find(isGumPart)?.geo];
      if (!keep.includes(g.geo)) g.geo.dispose();
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [stagingGum]);

// the Initial teeth, each with the matrix that moves it to the shown stage
const stagingParts = (jaw) => {
  if (!staging) return null;
  const teeth = stagingTeeth(segParts[jaw]).map((p) => {
    const t = staging.teeth[p.name];
    return t ? { ...p, matrix: toothMatrixAtStage(t, shownStage, stageCount) } : p;
  });
  if (!teeth.length) return null;
  return stagingGum[jaw] ? [stagingGum[jaw], ...teeth] : teeth;
};
const stagingView = { upper: stagingParts("upper"), lower: stagingParts("lower") };

// Play: one stage every STAGE_PLAY_MS until the last stage
const STAGE_PLAY_MS = 400;
useEffect(() => {
  if (!playing) return;
  if (!stagingActive || shownStage >= stageCount) {
    setPlaying(false);
    return;
  }
  const timer = setTimeout(() => setStage(shownStage + 1), STAGE_PLAY_MS);
  return () => clearTimeout(timer);
}, [playing, stagingActive, shownStage, stageCount]);

const handlePlay = () => {
  if (shownStage >= stageCount) setStage(0); // at the end: play again from the start
  setPlaying(true);
};

const handleStaging = () => {
  if (busy) return;
  if (!doneSteps.automaticSetup) {
    alert("Staging goes from Initial Position to Final Position. Please do Automatic Setup first.");
    return;
  }
  setPlaying(false);
  setStage(0);
  setView("staging");
  setMessage("");
};

const viewParts =
  view === "segment"
    ? segParts
    : view === "automaticSetup"
    ? setupView
    : view === "staging"
    ? stagingView
    : NO_PARTS;

// ---------------- Occlusion: colors each tooth by its distance to the teeth of the other jaw ----------------
// works on the Initial Position (Segment) and Final Position (Automatic Setup) views
const teethOnly = (parts) => (parts || []).filter((p) => !isGumPart(p) && !isWholePart(p));
const hasBothJaws = (parts) => teethOnly(parts.upper).length > 0 && teethOnly(parts.lower).length > 0;

const occlusionSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
const occlusionActive = showOcclusion && !!occlusionSource && hasBothJaws(occlusionSource);

// measured once per result (it takes a moment on big scans), not on every render
const occlusion = useMemo(() => {
  if (!occlusionActive) return null;
  try {
    return computeOcclusion(teethOnly(occlusionSource.upper), teethOnly(occlusionSource.lower));
  } catch (err) {
    console.error("Occlusion failed:", err);
    return null;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [occlusionActive, occlusionSource]);

const handleToggleOcclusion = () => {
  if (busy) return;
  if (occlusionActive) {
    setShowOcclusion(false);
    return;
  }
  // stay on the current result if it has both jaws, else go to Final Position, else Initial Position
  if (occlusionSource && hasBothJaws(occlusionSource)) {
    // nothing to change
  } else if (doneSteps.automaticSetup && hasBothJaws(setupParts)) {
    setView("automaticSetup");
  } else if (hasBothJaws(segParts)) {
    setView("segment");
  } else {
    alert("Occlusion needs the upper and lower teeth. Please load both jaws and do Segment first.");
    return;
  }
  setShowOcclusion(true);
};



// ---------------- Movement: how far each tooth moved from Initial Position to Final Position ----------------
const hasSetup = teethOnly(setupParts.upper).length + teethOnly(setupParts.lower).length > 0;
const movementActive = showMovement && hasSetup;
// on the Staging view the Movement table follows the stage instead (stageMovement below)
const setupMovementActive = movementActive && view !== "staging";

// measured once per Automatic Setup result, not on every render
const movement = useMemo(() => {
  if (!setupMovementActive) return null;
  try {
    return computeMovement(
      { upper: teethOnly(segParts.upper), lower: teethOnly(segParts.lower) },
      { upper: teethOnly(setupParts.upper), lower: teethOnly(setupParts.lower) }
    );
  } catch (err) {
    console.error("Movement failed:", err);
    return null;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [setupMovementActive, segParts, setupParts]);

// ---------------- Staging Movement table: values at the shown stage ----------------
// "zero" = from stage 0 to the shown stage, "prev" = from the stage before to the shown stage
const stageMovementActive = movementActive && !!staging;

// tooth frames (axes) on the Initial position: once per Segment result
const stageFrames = useMemo(() => {
  if (!stageMovementActive) return null;
  try {
    return toothFrames({ upper: teethOnly(segParts.upper), lower: teethOnly(segParts.lower) });
  } catch (err) {
    console.error("Staging movement frames failed:", err);
    return null;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [stageMovementActive, segParts]);

// cheap (only matrices), so it is worked out again for every stage, also while Play runs
const stageMovement = useMemo(() => {
  if (!stageMovementActive || !stageFrames) return null;
  try {
    return computeStageMovement(stageFrames, staging, shownStage, stageMovementMode);
  } catch (err) {
    console.error("Staging movement failed:", err);
    return null;
  }
}, [stageMovementActive, stageFrames, staging, shownStage, stageMovementMode]);

const handleToggleMovement = () => {
  if (busy) return;
  if (movementActive) {
    setShowMovement(false);
    return;
  }
  if (!hasSetup) {
    alert("Movement compares Initial Position with Final Position. Please do Automatic Setup first.");
    return;
  }
  setShowBolton(false); // both tables sit on the left, so only one is open
  setShowMovement(true);
};

// ---------------- Root: gum hidden, an approximate root under every crown (roots.js) ----------------
// works on Initial Position and Final Position; the roots are made from the teeth on screen, so they move with them
const rootSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
const rootActive =
  showRoot && !!rootSource && teethOnly(rootSource.upper).length + teethOnly(rootSource.lower).length > 0;

// made once per Segment / Automatic Setup result, not on every render
const roots = useMemo(() => {
  if (!rootActive) return NO_PARTS;
  try {
    return computeRoots({ upper: teethOnly(rootSource.upper), lower: teethOnly(rootSource.lower) });
  } catch (err) {
    console.error("Root failed:", err);
    return NO_PARTS;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [rootActive, rootSource]);

// the roots made for one result are thrown away when new ones are made
useEffect(() => {
  return () => {
    for (const jaw of ["upper", "lower"]) (roots[jaw] || []).forEach((p) => { p.geo.dispose(); if (p.crown) p.crown.dispose(); });
  };
}, [roots]);

// every tooth + its root is also saved as one closed STL in D:\Temp\Output (11withroot.stl, ...)
useEffect(() => {
  if (!rootActive || roots === NO_PARTS) return;
  let cancelled = false;
  saveTeethWithRoots(
    BACKEND_URL,
    { upper: teethOnly(rootSource.upper), lower: teethOnly(rootSource.lower) },
    roots,
    () => cancelled
  ).catch((err) => console.error("Saving teeth with roots failed:", err));
  return () => {
    cancelled = true;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [roots]);

// in Root view only the teeth are drawn (no gum, no base), and each crown is shown cut where its
// root joins it (two-thirds of the way down, JOIN_AT in roots.js)
const withRootCrowns = (list, jawRoots) =>
  list.map((p) => {
    const r = (jawRoots || []).find((x) => x.name === "root_" + p.name);
    return r && r.crown ? { ...p, geo: r.crown } : p;
  });
const shownParts = useMemo(
  () =>
    rootActive
      ? {
          upper: viewParts.upper && withRootCrowns(teethOnly(viewParts.upper), roots.upper),
          lower: viewParts.lower && withRootCrowns(teethOnly(viewParts.lower), roots.lower),
        }
      : viewParts,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [rootActive, viewParts, roots]
);

const handleToggleRoot = () => {
  if (busy) return;
  if (rootActive) {
    setShowRoot(false);
    return;
  }
  if (!hasSetup) {
    alert("Root needs the teeth. Please do Automatic Setup first.");
    return;
  }
  if (view !== "segment" && view !== "automaticSetup") setView("automaticSetup");
  setShowRoot(true);
};

// ---------------- Bolton: width of every tooth and the upper / lower size ratio (bolton.js) ----------------
// works on Initial Position and Final Position (the widths are the same, the line follows the teeth on screen)
const boltonSource = view === "segment" ? segParts : view === "automaticSetup" ? setupParts : null;
const boltonActive =
  showBolton && !!boltonSource && teethOnly(boltonSource.upper).length + teethOnly(boltonSource.lower).length > 0;

// measured once per Segment / Automatic Setup result, not on every render
const bolton = useMemo(() => {
  if (!boltonActive) return null;
  try {
    return computeBolton({ upper: teethOnly(boltonSource.upper), lower: teethOnly(boltonSource.lower) });
  } catch (err) {
    console.error("Bolton failed:", err);
    return null;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [boltonActive, boltonSource]);

const handleToggleBolton = () => {
  if (busy) return;
  if (boltonActive) {
    setShowBolton(false);
    return;
  }
  if (!hasSetup) {
    alert("Bolton needs the teeth. Please do Automatic Setup first.");
    return;
  }
  if (view !== "segment" && view !== "automaticSetup") setView("automaticSetup");
  setShowMovement(false); // both tables sit on the left, so only one is open
  setShowBolton(true);
};

const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
const viewResults =
  view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

  return (
    // <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

     <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", zIndex: 0 }}>
    {/* grid layer: behind everything, from below the second bar to the bottom of the screen */}
    <div
      ref={gridRef}
      style={{
        position: "absolute",
        top: BARS_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: "none", // the mouse goes through to the model
        display: showGrid ? "block" : "none",
        backgroundImage: GRID_IMAGE,
        // backgroundSize: "50px 50px", // the Viewer replaces this with the real size
        backgroundSize: "250px 250px, 250px 250px, 50px 50px, 50px 50px", // the Viewer replaces this
      }}
    />
      <TopBar
        upperName={upper.name}
        lowerName={lower.name}
        onUpperSelected={(file) => handleFile("upper", file)}
        onLowerSelected={(file) => handleFile("lower", file)}
        onIdentifyLat={handleIdentifyLat}
        onSegment={handleSegmentTeeth}
        onToolClick={handleToolClick}
        busy={busy}
        progress={progress}
        message={message}
        onAutomaticSetup={handleAutomaticSetup}
        onInitialPosition={handleInitialPosition}
        onFinalPosition={handleFinalPosition}
        showGrid={showGrid}
       onToggleGrid={() => setShowGrid((v) => !v)}
       gridSize={gridSize}
      onGridSizeChange={setGridSize}
      showSuperimpose={superimposeActive}
onToggleSuperimpose={handleToggleSuperimpose}
      showOcclusion={occlusionActive}
      onToggleOcclusion={handleToggleOcclusion}
      showMovement={movementActive}
      onToggleMovement={handleToggleMovement}
      showRoot={rootActive}
      onToggleRoot={handleToggleRoot}
      showBolton={boltonActive}
      onToggleBolton={handleToggleBolton}
      onStaging={handleStaging}
        setupReady={doneSteps.automaticSetup}
        view={view}
        onViewChange={handleViewChange}

      />

      {/* position: relative lets the buttons float over the top-right of the 3D area */}
      <div ref={viewAreaRef} style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <Viewer
          upperGeo={upper.geo}
          lowerGeo={lower.geo}
          // upperParts={segParts.upper}
          upperParts={shownParts.upper}
          // lowerParts={segParts.lower}
          lowerParts={shownParts.lower}
          showUpper={showUpper}
          showLower={showLower}
          segVisible={segVisible}

          // trimlines={trimlines}
          trimlines={viewTrimlines}
          // resultMeshes={resultMeshes}
          resultMeshes={viewResults}
          // toothLabels={toothLabels}
          toothLabels={viewLabels}

          // latCurves={showSplines ? latCurves : NO_CURVES}
          latCurves={viewCurves}
          dragging={dragging}
          onStartDrag={startDrag}
          onStartTrimDrag={startTrimDrag}
          onMoveDrag={moveDrag}
          onEndDrag={endDrag}
          showNumbers={showNumbers}
          viewRequest={viewRequest}
          showGrid={showGrid}
          gridRef={gridRef}
          gridSize={gridSize}
          ghostParts={ghostParts}
          occlusion={occlusion}
          rootParts={roots}
          boltonLines={bolton ? bolton.lines : null}

        />

        {/* Occlusion color scale: how deep the teeth overlap, 0.00 (just touching) at the bottom, 0.80 mm at the top */}
        {occlusion && <OcclusionLegend />}

        {/* Movement table on the left: movement of each tooth from Initial to Final Position */}
        {movement && (
          <MovementPanel movement={movement} onClose={() => setShowMovement(false)} top={-thirdBarHeight} />
        )}

        {/* Bolton table on the left: width of every tooth and the two Bolton ratios */}
        {bolton && <BoltonPanel bolton={bolton} onClose={() => setShowBolton(false)} top={-thirdBarHeight} />}

        {/* Staging: the same table, values at the shown stage, with the "Amount of tooth movement" list */}
        {stageMovement && (
          <MovementPanel
            movement={stageMovement}
            onClose={() => setShowMovement(false)}
            mode={stageMovementMode}
            onModeChange={setStageMovementMode}
            bottom={56} // stays above the staging timeline
            top={-thirdBarHeight} // starts at the third top bar
          />
        )}

        {/* Staging timeline at the bottom: first, previous, play, next, last + the stage ruler */}
        {staging && (
          <StagingBar
            stage={shownStage}
            stageCount={stageCount}
            playing={playing}
            onStageChange={(s) => {
              setPlaying(false);
              setStage(s);
            }}
            onPlay={handlePlay}
            onPause={() => setPlaying(false)}
          />
        )}

        <VisibilityButtons
          showUpper={showUpper}
          showLower={showLower}
          hasUpper={!!upper.geo}
          hasLower={!!lower.geo}
          onToggleUpper={() => setShowUpper((v) => !v)}
          onToggleLower={() => setShowLower((v) => !v)}
          // segmentedUpper={!!segParts.upper}
          // segmentedLower={!!segParts.lower}
          segmentedUpper={!!viewParts.upper}
          segmentedLower={!!viewParts.lower}
          segVisible={segVisible}
          onToggleSeg={toggleSeg}
          // hasNumbers={toothLabels.upper.length + toothLabels.lower.length > 0}
          hasNumbers={viewLabels.upper.length + viewLabels.lower.length > 0}
           showNumbers={showNumbers}
            onToggleNumbers={() => setShowNumbers((v) => !v)}
        />
      </div>
    </div>
  );
}


// ---------------- Occlusion legend: the color bar on the right side ----------------
const LEGEND_BAR_HEIGHT = 200;

function OcclusionLegend() {
  return (
    <div
      style={{
        position: "absolute",
        right: 204,
        top: "50%",
        transform: "translateY(calc(-50% - 20px))", // 20 = how far up from center (px)
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 11,
        color: "#444",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch", gap: 6, height: LEGEND_BAR_HEIGHT }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "right",
            margin: "-7px 0", // centers each number on its line
          }}
        >
          {OCCLUSION_TICKS.map((t) => (
            <span key={t}>{t.toFixed(2)}</span>
          ))}
        </div>
        <div style={{ width: 6, borderRadius: 2, background: occlusionGradientCss() }} />
      </div>
      <div style={{ marginTop: 10, textAlign: "center", lineHeight: 1.3 }}>
        overlap
        <br />
        mm
      </div>
    </div>
  );
}
