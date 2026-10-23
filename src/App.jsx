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
// import { loadLatCurves, loadStlParts, saveLatCurve } from "./latUtils.js";

// import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile } from "./latUtils.js";

import { loadLatCurves, loadStlParts, saveLatCurve, loadPointsFile, loadStlFile, loadToothLabels, makeTrimlineData, saveTrimline } from "./latUtils.js";

const BACKEND_URL = "http://localhost:5174";
const NO_CURVES = { upper: [], lower: [] };
const ALL_VISIBLE = { upperTeeth: true, upperGum: true, lowerTeeth: true, lowerGum: true };

const NO_RESULT = { upper: null, lower: null };

const NO_LABELS = { upper: [], lower: [] };
// TESTING ONLY: true = Generate Trimline / Trim Model / Add Base work after a new upload
// without running Clean Model or Identify LAT again (the old Output folder is kept)
const KEEP_OUTPUT_ON_UPLOAD = true;
const NO_PARTS = { upper: null, lower: null };

const STEP_ORDER = ["cleanModel", "generateTrimline", "trimModel", "addBase", "identifyLat", "segment"];
// when a step runs, only these steps become "not done" again
const RESETS = {
  cleanModel: ["generateTrimline", "trimModel", "addBase", "identifyLat", "segment"],
  generateTrimline: ["trimModel", "addBase"],
  trimModel: ["addBase"],
  addBase: [],
  identifyLat: ["segment"],
  segment: [],
};

const NOT_DONE = {
  cleanModel: false,
  identifyLat: false,
  segment: false,
  generateTrimline: false,
  trimModel: false,
  addBase: false,
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

    setToothLabels((prev) => ({ ...prev, [type]: [] }));
    setSegVisible(ALL_VISIBLE);

      // setTrimlines((prev) => ({ ...prev, [type]: null }));
      // setResultMeshes((prev) => ({ ...prev, [type]: null }));


   setTrimlines((prev) => ({ ...prev, [type]: null }));
   setTrimModelMeshes((prev) => ({ ...prev, [type]: null }));
   setBaseMeshes((prev) => ({ ...prev, [type]: null }));
   setView("scan");

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
      setLatCurves({
        upper: await loadLatCurves(BACKEND_URL, "upper", csv.upper || [], stamp),
        lower: await loadLatCurves(BACKEND_URL, "lower", csv.lower || [], stamp),
      });
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
      setSegParts({
        upper: await loadStlParts(BACKEND_URL, "upper", stl.upper || [], stamp),
        lower: await loadStlParts(BACKEND_URL, "lower", stl.lower || [], stamp),
      });
      setSegVisible(ALL_VISIBLE); // the four buttons start with everything visible




      
      // the tooth number labels (two points per tooth, from the TeethNumber exe)
      const numbers = job.numberFiles || {};
      setToothLabels({
        upper: await loadToothLabels(BACKEND_URL, "upper", numbers.upper || [], stamp),
        lower: await loadToothLabels(BACKEND_URL, "lower", numbers.lower || [], stamp),
      });
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
const viewParts = view === "segment" ? segParts : NO_PARTS;
const viewLabels = view === "segment" ? toothLabels : NO_LABELS;
const viewTrimlines = view === "generateTrimline" ? trimlines : NO_RESULT;
const viewResults =
  view === "trimModel" ? trimModelMeshes : view === "addBase" ? baseMeshes : NO_RESULT;

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
          // upperParts={segParts.upper}
          upperParts={viewParts.upper}
          // lowerParts={segParts.lower}
          lowerParts={viewParts.lower}
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
        />

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