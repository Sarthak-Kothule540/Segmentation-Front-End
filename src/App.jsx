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

















import { useCallback, useRef, useState } from "react";
import TopBar from "./TopBar.jsx";
import Viewer from "./Viewer.jsx";
import VisibilityButtons from "./VisibilityButtons.jsx";
import { parseStl } from "./stlUtils.js";
import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

const BACKEND_URL = "http://localhost:5174";
const NO_CURVES = { upper: [], lower: [] };
const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

export default function App() {
  const [upper, setUpper] = useState({ name: "", geo: null });
  const [lower, setLower] = useState({ name: "", geo: null });
  const [showUpper, setShowUpper] = useState(true);
  const [showLower, setShowLower] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null); // { percent, label } or null
  const [message, setMessage] = useState("");

  // LAT splines: [{ id: "11", points: [Vector3, ...] }, ...] for each jaw
  const [latCurves, setLatCurves] = useState({ upper: [], lower: [] });
  const [showSplines, setShowSplines] = useState(true);
  // always holds the newest curves (used when a drag ends and the curve is saved)
  const latCurvesRef = useRef(latCurves);
  latCurvesRef.current = latCurves;

  // separated gum and teeth after Segment: [{ name, geo }, ...] for each jaw
  const [segParts, setSegParts] = useState({ upper: null, lower: null });

  // visibility of the upper/lower teeth and gum (the four buttons after Segment)
  const [segVisible, setSegVisible] = useState(ALL_VISIBLE);
  const toggleSeg = (key) => setSegVisible((prev) => ({ ...prev, [key]: !prev[key] }));

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
    setSegVisible(ALL_VISIBLE);
    setMessage("");
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

  // asks the backend for the progress every second until the job is done
  const waitForJob = async (statusUrl) => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(statusUrl);
      const job = await res.json();

      if (job.error) throw new Error(job.error);
      setProgress({ percent: job.percent, label: job.label });
      if (job.done) return job;
    }
  };

  // ---------------- Identify LAT button ----------------
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
      const res = await fetch(`${BACKEND_URL}/api/identify-lat`, { method: "POST" });
      const started = await res.json();
      if (!res.ok) throw new Error(started.message);

      const job = await waitForJob(`${BACKEND_URL}/api/identify-lat/status`);

      // download the CSV files and show them as splines
      const stamp = Date.now();
      const csv = job.csvFiles || {};
      setLatCurves({
        upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
        lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
      });
      setSegParts({ upper: null, lower: null }); // back to the raw scans
      setSegVisible(ALL_VISIBLE);
      setShowSplines(true);

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
    if (latCurves.upper.length === 0 && latCurves.lower.length === 0) {
      setProgress(null);
      setMessage("Please run Identify LAT first");
      return;
    }

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
      setSegParts({
        upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
        lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
      });
      setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible

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
      const upperGeo = await loadScan("upper", "Upper.stl", stamp);
      const lowerGeo = await loadScan("lower", "Lower.stl", stamp);
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

      // show the separated gum and teeth (made by the segmenter that ran after the cleaning)
      const stl = job.stlFiles || {};
      setSegParts({
        upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
        lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
      });
      setSegVisible(ALL_VISIBLE);

      setTimeout(() => setProgress(null), 2000);
    } catch (err) {
      setProgress(null);
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  };

  // the buttons in the Clean Model tab (Clean Model, Generate Trimline, Trim Model, Add Base)
  const handleToolClick = (tool) => {
    if (busy) return;
    if (tool === "Clean Model") handleCleanModel();
  };






  // ---------------- editing of the splines ----------------
  const startDrag = (jaw, id, index) => {
    dragRef.current = { jaw, id, index, moved: false };
    setDragging(true);
  };

  // when the mouse button is released: save the edited curve to its csv file
  const endDrag = useCallback(async () => {
    const d = dragRef.current;
    dragRef.current = null;
    setDragging(false);

    if (!d || !d.moved) return; // nothing was changed

    const curve = latCurvesRef.current[d.jaw].find((c) => c.id === d.id);
    if (!curve) return;

    try {
      const result = await saveLatCurve(BACKEND_URL, d.jaw, d.id, curve.points);
      setMessage(result.message);
      setTimeout(()=>setMessage(""),2000);
    } catch (err) {
      setMessage(`Could not save ${d.id}.csv: ${err.message}`);
    }
  }, []);

  // moves the dragged point to the surface point under the mouse
  const moveDrag = (point) => {
    const d = dragRef.current;
    if (!d) return;

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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
      />

      {/* position: relative lets the buttons float over the top-right of the 3D area */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <Viewer
          upperGeo={upper.geo}
          lowerGeo={lower.geo}
          upperParts={segParts.upper}
          lowerParts={segParts.lower}
          showUpper={showUpper}
          showLower={showLower}
          segVisible={segVisible}
          latCurves={showSplines ? latCurves : NO_CURVES}
          dragging={dragging}
          onStartDrag={startDrag}
          onMoveDrag={moveDrag}
          onEndDrag={endDrag}
        />

        <VisibilityButtons
          showUpper={showUpper}
          showLower={showLower}
          hasUpper={!!upper.geo}
          hasLower={!!lower.geo}
          onToggleUpper={() => setShowUpper((v) => !v)}
          onToggleLower={() => setShowLower((v) => !v)}
          segmentedUpper={!!segParts.upper}
          segmentedLower={!!segParts.lower}
          segVisible={segVisible}
          onToggleSeg={toggleSeg}
        />
      </div>
    </div>
  );
}