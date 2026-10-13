// // // import { useRef, useState } from "react";

// // // const TABS = ["File", "Clean Model", "Segment"];

// // // export default function TopBar({
// // //   upperName,
// // //   lowerName,
// // //   onUpperSelected,
// // //   onLowerSelected,
// // //   message,
// // // }) {
// // //   const [activeTab, setActiveTab] = useState("File");
// // //   const upperInputRef = useRef(null);
// // //   const lowerInputRef = useRef(null);

// // //   const handleChange = (e, callback) => {
// // //     const file = e.target.files[0]; // only one file
// // //     if (file) callback(file);
// // //     e.target.value = ""; // allows selecting the same file again
// // //   };

// // //   return (
// // //     <div>
// // //       {/* ---------- First top bar (dark black) ---------- */}
// // //       <div style={styles.firstBar}>
// // //         {/* {TABS.map((tab) => (
// // //           <button
// // //             key={tab}
// // //             onClick={() => setActiveTab(tab)}
// // //             style={{
// // //               ...styles.tabButton,
// // //             //   background: activeTab === tab ? "#3a3a3a" : "transparent",
// // //             background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // //             }}
// // //           >
// // //             {tab}
// // //           </button>
// // //         ))} */}


// // //         {TABS.map((tab) => (
// // //   <button
// // //     key={tab}
// // //     onClick={() => setActiveTab(tab)}
// // //     onMouseEnter={(e) => {
// // //       if (activeTab !== tab) e.currentTarget.style.background = "#505050";
// // //     }}
// // //     onMouseLeave={(e) => {
// // //       if (activeTab !== tab) e.currentTarget.style.background = "#3a3a3a";
// // //     }}
// // //     style={{
// // //       ...styles.tabButton,
// // //       background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // //     }}
// // //   >
// // //     {tab}
// // //   </button>
// // // ))}
// // //         {message && <span style={styles.message}>{message}</span>}
// // //       </div>

// // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // //       <div style={styles.secondBar}>
// // //         {activeTab === "File" && (
// // //           <>
// // //             {/* Row 1: Upper */}
// // //             <div style={styles.row}>
// // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // //                 Browse
// // //               </button>
// // //                 <span style={styles.label}>
// // //                Upload Upper Scan Model {!upperName && <span style={styles.required}>*</span>}
// // //                </span>
// // //               <span style={styles.fileName}>{upperName}</span>
// // //               <input
// // //                 type="file"
// // //                 accept=".stl"
// // //                 ref={upperInputRef}
// // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // //                 style={{ display: "none" }}
// // //               />
// // //             </div>

// // //             {/* Row 2: Lower */}
// // //             <div style={styles.row}>
// // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // //                 Browse
// // //               </button>
// // //                 <span style={styles.label}>
// // //                  Upload Lower Scan Model {!lowerName && <span style={styles.required}>*</span>}
// // //                 </span>
// // //               <span style={styles.fileName}>{lowerName}</span>
// // //               <input
// // //                 type="file"
// // //                 accept=".stl"
// // //                 ref={lowerInputRef}
// // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // //                 style={{ display: "none" }}
// // //               />
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   firstBar: {
// // //     height: 44,
// // //     background: "#0b0b0b", // dark black
// // //     display: "flex",
// // //     alignItems: "center",
// // //     padding: "0 12px",
// // //     gap: 16,
// // //   },
// // //   tabButton: {
// // //     padding: "8px 18px",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: 4,
// // //     cursor: "pointer",
// // //     fontSize: 15,
// // //   },
// // //   message: {
// // //     marginLeft: 20,
// // //     color: "#f38ba8",
// // //     fontSize: 14,
// // //   },
// // //   secondBar: {
// // //     minHeight: 100, // taller than the first bar (44)
// // //     background: "#3b3b3b", // dark grey
// // //     padding: "12px 16px",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     justifyContent: "center",
// // //     gap: 12,
// // //     boxSizing: "border-box",
// // //   },
// // //   row: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 14,
// // //   },
// // //   browseButton: {
// // //     padding: "6px 16px",
// // //     background: "#5a5a5a",
// // //     color: "white",
// // //     border: "1px solid #777",
// // //     borderRadius: 4,
// // //     cursor: "pointer",
// // //     fontSize: 14,
// // //   },
// // //   label: {
// // //     color: "#e0e0e0",
// // //     fontSize: 14,
// // //     minWidth: 180,
// // //   },
// // //   required: {
// // //   color: "#ff4d4d", // red star
// // //   fontWeight: "bold",
// // // },
// // //   fileName: {
// // //     color: "#ffffff",
// // //     fontSize: 14,
// // //     fontWeight: "bold",
// // //   },
// // // };






// // // import { useRef, useState } from "react";

// // // const TABS = ["File", "Clean Model", "Segment"];
// // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // export default function TopBar({
// // //   upperName,
// // //   lowerName,
// // //   onUpperSelected,
// // //   onLowerSelected,
// // //   onSegment,
// // //    onToolClick,
// // //   busy,
// // //   message,
// // // }) {
// // //   const [activeTab, setActiveTab] = useState("File");
// // //   const upperInputRef = useRef(null);
// // //   const lowerInputRef = useRef(null);

// // //   const handleChange = (e, callback) => {
// // //     const file = e.target.files[0];
// // //     if (file) callback(file);
// // //     e.target.value = "";
// // //   };

// // //   return (
// // //     <div>
// // //       {/* ---------- First top bar (dark black) ---------- */}
// // //       <div style={styles.firstBar}>
// // //         {TABS.map((tab) => (
// // //           <button
// // //             key={tab}
// // //             onClick={() => {
// // //               setActiveTab(tab);
// // //               if (tab === "Segment" && !busy) onSegment(); // Segment runs the exe
// // //             }}
// // //             style={{
// // //               ...styles.tabButton,
// // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // //             }}
// // //           >
// // //             {tab}
// // //           </button>
// // //         ))}
// // //         {message && <span style={styles.message}>{message}</span>}
// // //       </div>

// // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // //       <div style={styles.secondBar}>
// // //         {activeTab === "File" && (
// // //           <>
// // //             <div style={styles.row}>
// // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // //                 Browse
// // //               </button>
// // //               {/* <span style={styles.label}>
// // //                 Upload Upper Scan Model <span style={styles.required}>*</span>
// // //               </span> */}

// // //               <span style={styles.label}>
// // //               Upload Upper Scan {!upperName && <span style={styles.required}>*</span>}
// // //              </span>
// // //               <span style={styles.fileName}>{upperName}</span>
// // //               <input
// // //                 type="file"
// // //                 accept=".stl"
// // //                 ref={upperInputRef}
// // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // //                 style={{ display: "none" }}
// // //               />
// // //             </div>

// // //             <div style={styles.row}>
// // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // //                 Browse
// // //               </button>
// // //               {/* <span style={styles.label}>
// // //                 Upload Lower Scan Model <span style={styles.required}>*</span>
// // //               </span> */}
// // //               <span style={styles.label}>
// // //               Upload Lower Scan {!lowerName && <span style={styles.required}>*</span>}
// // //              </span>
// // //               <span style={styles.fileName}>{lowerName}</span>
// // //               <input
// // //                 type="file"
// // //                 accept=".stl"
// // //                 ref={lowerInputRef}
// // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // //                 style={{ display: "none" }}
// // //               />
// // //             </div>
// // //           </>
// // //         )}

// // //         {activeTab === "Clean Model" && (
// // //          <div style={styles.toolRow}>
// // //     {CLEAN_MODEL_TOOLS.map((tool) => (
// // //       <button
// // //         key={tool}
// // //         style={styles.toolButton}
// // //         onClick={() => onToolClick && onToolClick(tool)}
// // //       >
// // //         {tool}
// // //       </button>
// // //     ))}
// // //   </div>
// // // )}

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   firstBar: {
// // //     height: 44,
// // //     background: "#0b0b0b",
// // //     display: "flex",
// // //     alignItems: "center",
// // //     padding: "0 12px",
// // //     gap: 16,
// // //   },
// // //   tabButton: {
// // //     padding: "8px 18px",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: 4,
// // //     cursor: "pointer",
// // //     fontSize: 15,
// // //   },
// // //   message: {
// // //     marginLeft: 20,
// // //     color: "#f9e2af",
// // //     fontSize: 14,
// // //   },
// // //   secondBar: {
// // //     minHeight: 100,
// // //     background: "#3b3b3b",
// // //     padding: "12px 16px",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     justifyContent: "center",
// // //     gap: 12,
// // //     boxSizing: "border-box",
// // //   },
// // //   row: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 14,
// // //   },
// // //   browseButton: {
// // //     padding: "6px 16px",
// // //     background: "#5a5a5a",
// // //     color: "white",
// // //     border: "1px solid #777",
// // //     borderRadius: 4,
// // //     cursor: "pointer",
// // //     fontSize: 14,
// // //   },
// // //   label: {
// // //     color: "#e0e0e0",
// // //     fontSize: 14,
// // //     minWidth: 120,
// // //   },
// // //   required: {
// // //     color: "#ff4d4d",
// // //     fontWeight: "bold",
// // //   },
// // //   fileName: {
// // //     color: "#ffffff",
// // //     fontSize: 14,
// // //     fontWeight: "bold",
// // //   },
// // //   toolRow: {
// // //   display: "flex",
// // //   alignItems: "center",
// // //   gap: 16,
// // // },
// // // toolButton: {
// // //   padding: "10px 22px",
// // //   background: "#5a5a5a",
// // //   color: "white",
// // //   border: "1px solid #777",
// // //   borderRadius: 4,
// // //   cursor: "pointer",
// // //   fontSize: 14,
// // // },
// // // };






// // import { useRef, useState } from "react";

// // const TABS = ["File", "Clean Model", "Segment"];
// // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // export default function TopBar({
// //   upperName,
// //   lowerName,
// //   onUpperSelected,
// //   onLowerSelected,
// //   onIdentifyLat,
// //   onCutTeeth,
// //   onToolClick,
// //   busy,
// //   message,
// // }) {
// //   const [activeTab, setActiveTab] = useState("File");
// //   const upperInputRef = useRef(null);
// //   const lowerInputRef = useRef(null);

// //   const handleChange = (e, callback) => {
// //     const file = e.target.files[0];
// //     if (file) callback(file);
// //     e.target.value = "";
// //   };

// //   return (
// //     <div>
// //       {/* ---------- First top bar (dark black) ---------- */}
// //       <div style={styles.firstBar}>
// //         {TABS.map((tab) => (
// //           <button
// //             key={tab}
// //             onClick={() => setActiveTab(tab)}
// //             style={{
// //               ...styles.tabButton,
// //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// //             }}
// //           >
// //             {tab}
// //           </button>
// //         ))}
// //         {message && <span style={styles.message}>{message}</span>}
// //       </div>

// //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// //       <div style={styles.secondBar}>
// //         {activeTab === "File" && (
// //           <>
// //             <div style={styles.row}>
// //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// //                 Browse
// //               </button>
// //               <span style={styles.label}>
// //                 Upload Upper Scan <span style={styles.required}>*</span>
// //               </span>
// //               <span style={styles.fileName}>{upperName}</span>
// //               <input
// //                 type="file"
// //                 accept=".stl"
// //                 ref={upperInputRef}
// //                 onChange={(e) => handleChange(e, onUpperSelected)}
// //                 style={{ display: "none" }}
// //               />
// //             </div>

// //             <div style={styles.row}>
// //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// //                 Browse
// //               </button>
// //               <span style={styles.label}>
// //                 Upload Lower Scan <span style={styles.required}>*</span>
// //               </span>
// //               <span style={styles.fileName}>{lowerName}</span>
// //               <input
// //                 type="file"
// //                 accept=".stl"
// //                 ref={lowerInputRef}
// //                 onChange={(e) => handleChange(e, onLowerSelected)}
// //                 style={{ display: "none" }}
// //               />
// //             </div>
// //           </>
// //         )}

// //         {activeTab === "Clean Model" && (
// //           <div style={styles.toolRow}>
// //             {CLEAN_MODEL_TOOLS.map((tool) => (
// //               <button
// //                 key={tool}
// //                 style={styles.toolButton}
// //                 onClick={() => onToolClick && onToolClick(tool)}
// //               >
// //                 {tool}
// //               </button>
// //             ))}
// //           </div>
// //         )}

// //         {activeTab === "Segment" && (
// //           <div style={styles.toolRow}>
// //             <button
// //               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// //               disabled={busy}
// //               onClick={onIdentifyLat}
// //             >
// //               Identify LAT
// //             </button>
// //              <button style={styles.toolButton}>
// //              Segment
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   firstBar: {
// //     height: 44,
// //     background: "#0b0b0b",
// //     display: "flex",
// //     alignItems: "center",
// //     padding: "0 12px",
// //     gap: 16,
// //   },
// //   tabButton: {
// //     padding: "8px 18px",
// //     color: "white",
// //     border: "none",
// //     borderRadius: 4,
// //     cursor: "pointer",
// //     fontSize: 15,
// //   },
// //   message: {
// //     marginLeft: 20,
// //     color: "#f9e2af",
// //     fontSize: 14,
// //   },
// //   secondBar: {
// //     minHeight: 100,
// //     background: "#3b3b3b",
// //     padding: "12px 16px",
// //     display: "flex",
// //     flexDirection: "column",
// //     justifyContent: "center",
// //     gap: 12,
// //     boxSizing: "border-box",
// //   },
// //   row: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 14,
// //   },
// //   browseButton: {
// //     padding: "6px 16px",
// //     background: "#5a5a5a",
// //     color: "white",
// //     border: "1px solid #777",
// //     borderRadius: 4,
// //     cursor: "pointer",
// //     fontSize: 14,
// //   },
// //   label: {
// //     color: "#e0e0e0",
// //     fontSize: 14,
// //     minWidth: 120,
// //   },
// //   required: {
// //     color: "#ff4d4d",
// //     fontWeight: "bold",
// //   },
// //   fileName: {
// //     color: "#ffffff",
// //     fontSize: 14,
// //     fontWeight: "bold",
// //   },
// //   toolRow: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 16,
// //   },
// //   toolButton: {
// //     padding: "10px 22px",
// //     background: "#5a5a5a",
// //     color: "white",
// //     border: "1px solid #777",
// //     borderRadius: 4,
// //     cursor: "pointer",
// //     fontSize: 14,
// //   },
// // };












// import { useRef, useState } from "react";
// import ProgressBar from "./ProgressBar.jsx";

// const TABS = ["File", "Clean Model", "Segment"];
// const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// export default function TopBar({
//   upperName,
//   lowerName,
//   onUpperSelected,
//   onLowerSelected,
//   onIdentifyLat,
//   onToolClick,
//   busy,
//   progress,
//   message,
// }) {
//   const [activeTab, setActiveTab] = useState("File");
//   const upperInputRef = useRef(null);
//   const lowerInputRef = useRef(null);

//   const handleChange = (e, callback) => {
//     const file = e.target.files[0];
//     if (file) callback(file);
//     e.target.value = "";
//   };

//   return (
//     <div>
//       {/* ---------- First top bar (dark black) ---------- */}
//       <div style={styles.firstBar}>
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             style={{
//               ...styles.tabButton,
//               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
//             }}
//           >
//             {tab}
//           </button>
//         ))}

//         {/* progress bar while Identify LAT works; otherwise normal messages (errors etc.) */}
//         {progress ? (
//           <ProgressBar percent={progress.percent} label={progress.label} />
//         ) : (
//           message && <span style={styles.message}>{message}</span>
//         )}
//       </div>

//       {/* ---------- Second top bar (dark grey, taller) ---------- */}
//       <div style={styles.secondBar}>
//         {activeTab === "File" && (
//           <>
//             <div style={styles.row}>
//               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
//                 Browse
//               </button>
//               <span style={styles.label}>
//                 Upload Upper Scan <span style={styles.required}>*</span>
//               </span>
//               <span style={styles.fileName}>{upperName}</span>
//               <input
//                 type="file"
//                 accept=".stl"
//                 ref={upperInputRef}
//                 onChange={(e) => handleChange(e, onUpperSelected)}
//                 style={{ display: "none" }}
//               />
//             </div>

//             <div style={styles.row}>
//               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
//                 Browse
//               </button>
//               <span style={styles.label}>
//                 Upload Lower Scan <span style={styles.required}>*</span>
//               </span>
//               <span style={styles.fileName}>{lowerName}</span>
//               <input
//                 type="file"
//                 accept=".stl"
//                 ref={lowerInputRef}
//                 onChange={(e) => handleChange(e, onLowerSelected)}
//                 style={{ display: "none" }}
//               />
//             </div>
//           </>
//         )}

//         {activeTab === "Clean Model" && (
//           <div style={styles.toolRow}>
//             {CLEAN_MODEL_TOOLS.map((tool) => (
//               <button
//                 key={tool}
//                 style={styles.toolButton}
//                 onClick={() => onToolClick && onToolClick(tool)}
//               >
//                 {tool}
//               </button>
//             ))}
//           </div>
//         )}

//         {activeTab === "Segment" && (
//           <div style={styles.toolRow}>
//             <button
//               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
//               disabled={busy}
//               onClick={onIdentifyLat}
//             >
//               Identify LAT
//             </button>
//             <button style={styles.toolButton}>Segment</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   firstBar: {
//     height: 44,
//     background: "#0b0b0b",
//     display: "flex",
//     alignItems: "center",
//     padding: "0 12px",
//     gap: 16,
//   },
//   tabButton: {
//     padding: "8px 18px",
//     color: "white",
//     border: "none",
//     borderRadius: 4,
//     cursor: "pointer",
//     fontSize: 15,
//   },
//   message: {
//     marginLeft: 20,
//     color: "#f9e2af",
//     fontSize: 14,
//   },
//   secondBar: {
//     minHeight: 100,
//     background: "#3b3b3b",
//     padding: "12px 16px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: 12,
//     boxSizing: "border-box",
//   },
//   row: {
//     display: "flex",
//     alignItems: "center",
//     gap: 14,
//   },
//   browseButton: {
//     padding: "6px 16px",
//     background: "#5a5a5a",
//     color: "white",
//     border: "1px solid #777",
//     borderRadius: 4,
//     cursor: "pointer",
//     fontSize: 14,
//   },
//   label: {
//     color: "#e0e0e0",
//     fontSize: 14,
//     minWidth: 120,
//   },
//   required: {
//     color: "#ff4d4d",
//     fontWeight: "bold",
//   },
//   fileName: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   toolRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//   },
//   toolButton: {
//     padding: "10px 22px",
//     background: "#5a5a5a",
//     color: "white",
//     border: "1px solid #777",
//     borderRadius: 4,
//     cursor: "pointer",
//     fontSize: 14,
//   },
// };








import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TABS = ["File", "Clean Model", "Segment"];
const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

export default function TopBar({
  upperName,
  lowerName,
  onUpperSelected,
  onLowerSelected,
  onIdentifyLat,
   onSegment,
  onToolClick,
  busy,
  progress,
  message,
}) {
  const [activeTab, setActiveTab] = useState("File");
  const upperInputRef = useRef(null);
  const lowerInputRef = useRef(null);

  const handleChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) callback(file);
    e.target.value = "";
  };

  return (
    <div>
      {/* ---------- First top bar (dark black) ---------- */}
      <div style={styles.firstBar}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tabButton,
              background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
            }}
          >
            {tab}
          </button>
        ))}

        {/* normal messages (errors etc.) */}
        {message && <span style={styles.message}>{message}</span>}
      </div>

      {/* ---------- Second top bar (dark grey, taller) ---------- */}
      <div style={styles.secondBar}>
        {activeTab === "File" && (
          <>
            <div style={styles.row}>
              <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
                Browse
              </button>
              <span style={styles.label}>
                Upload Upper Scan <span style={styles.required}>*</span>
              </span>
              <span style={styles.fileName}>{upperName}</span>
              <input
                type="file"
                accept=".stl"
                ref={upperInputRef}
                onChange={(e) => handleChange(e, onUpperSelected)}
                style={{ display: "none" }}
              />
            </div>

            <div style={styles.row}>
              <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
                Browse
              </button>
              <span style={styles.label}>
                Upload Lower Scan <span style={styles.required}>*</span>
              </span>
              <span style={styles.fileName}>{lowerName}</span>
              <input
                type="file"
                accept=".stl"
                ref={lowerInputRef}
                onChange={(e) => handleChange(e, onLowerSelected)}
                style={{ display: "none" }}
              />
            </div>
          </>
        )}

        {activeTab === "Clean Model" && (
          <div style={styles.toolRow}>
            {CLEAN_MODEL_TOOLS.map((tool) => (
              <button
                key={tool}
                style={styles.toolButton}
                onClick={() => onToolClick && onToolClick(tool)}
              >
                {tool}
              </button>
            ))}
          </div>
        )}

        {activeTab === "Segment" && (
          <div style={styles.toolRow}>
            <button
              style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
              disabled={busy}
              onClick={onIdentifyLat}
            >
              Identify LAT
            </button>
            <button
          style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
          disabled={busy}
          onClick={onSegment}>
          Segment
         </button>
          </div>
        )}

        {/* progress bar: centered inside the second bar */}
        {progress && (
          <div style={styles.progressWrapper}>
            <ProgressBar percent={progress.percent} label={progress.label} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  firstBar: {
    height: 44,
    background: "#0b0b0b",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    gap: 16,
  },
  tabButton: {
    padding: "8px 18px",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
  },
  message: {
    marginLeft: 20,
    color: "#ffffff",
    fontSize: 14,
  },
  secondBar: {
    position: "relative", // needed to center the progress bar inside this bar
    minHeight: 100,
    background: "#3b3b3b",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    boxSizing: "border-box",
  },
  progressWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none", // clicks go through to the buttons below
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  browseButton: {
    padding: "6px 16px",
    background: "#5a5a5a",
    color: "white",
    border: "1px solid #777",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
  },
  label: {
    color: "#e0e0e0",
    fontSize: 14,
    minWidth: 120,
  },
  required: {
    color: "#ff4d4d",
    fontWeight: "bold",
  },
  fileName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  toolRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  toolButton: {
    padding: "10px 22px",
    background: "#5a5a5a",
    color: "white",
    border: "1px solid #777",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
  },
};
