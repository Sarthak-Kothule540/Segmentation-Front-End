// // // // // // import { useRef, useState } from "react";

// // // // // // const TABS = ["File", "Clean Model", "Segment"];

// // // // // // export default function TopBar({
// // // // // //   upperName,
// // // // // //   lowerName,
// // // // // //   onUpperSelected,
// // // // // //   onLowerSelected,
// // // // // //   message,
// // // // // // }) {
// // // // // //   const [activeTab, setActiveTab] = useState("File");
// // // // // //   const upperInputRef = useRef(null);
// // // // // //   const lowerInputRef = useRef(null);

// // // // // //   const handleChange = (e, callback) => {
// // // // // //     const file = e.target.files[0]; // only one file
// // // // // //     if (file) callback(file);
// // // // // //     e.target.value = ""; // allows selecting the same file again
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // // // //       <div style={styles.firstBar}>
// // // // // //         {/* {TABS.map((tab) => (
// // // // // //           <button
// // // // // //             key={tab}
// // // // // //             onClick={() => setActiveTab(tab)}
// // // // // //             style={{
// // // // // //               ...styles.tabButton,
// // // // // //             //   background: activeTab === tab ? "#3a3a3a" : "transparent",
// // // // // //             background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // // //             }}
// // // // // //           >
// // // // // //             {tab}
// // // // // //           </button>
// // // // // //         ))} */}


// // // // // //         {TABS.map((tab) => (
// // // // // //   <button
// // // // // //     key={tab}
// // // // // //     onClick={() => setActiveTab(tab)}
// // // // // //     onMouseEnter={(e) => {
// // // // // //       if (activeTab !== tab) e.currentTarget.style.background = "#505050";
// // // // // //     }}
// // // // // //     onMouseLeave={(e) => {
// // // // // //       if (activeTab !== tab) e.currentTarget.style.background = "#3a3a3a";
// // // // // //     }}
// // // // // //     style={{
// // // // // //       ...styles.tabButton,
// // // // // //       background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // // //     }}
// // // // // //   >
// // // // // //     {tab}
// // // // // //   </button>
// // // // // // ))}
// // // // // //         {message && <span style={styles.message}>{message}</span>}
// // // // // //       </div>

// // // // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // // // //       <div style={styles.secondBar}>
// // // // // //         {activeTab === "File" && (
// // // // // //           <>
// // // // // //             {/* Row 1: Upper */}
// // // // // //             <div style={styles.row}>
// // // // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // // // //                 Browse
// // // // // //               </button>
// // // // // //                 <span style={styles.label}>
// // // // // //                Upload Upper Scan Model {!upperName && <span style={styles.required}>*</span>}
// // // // // //                </span>
// // // // // //               <span style={styles.fileName}>{upperName}</span>
// // // // // //               <input
// // // // // //                 type="file"
// // // // // //                 accept=".stl"
// // // // // //                 ref={upperInputRef}
// // // // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // // // //                 style={{ display: "none" }}
// // // // // //               />
// // // // // //             </div>

// // // // // //             {/* Row 2: Lower */}
// // // // // //             <div style={styles.row}>
// // // // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // // // //                 Browse
// // // // // //               </button>
// // // // // //                 <span style={styles.label}>
// // // // // //                  Upload Lower Scan Model {!lowerName && <span style={styles.required}>*</span>}
// // // // // //                 </span>
// // // // // //               <span style={styles.fileName}>{lowerName}</span>
// // // // // //               <input
// // // // // //                 type="file"
// // // // // //                 accept=".stl"
// // // // // //                 ref={lowerInputRef}
// // // // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // // // //                 style={{ display: "none" }}
// // // // // //               />
// // // // // //             </div>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // const styles = {
// // // // // //   firstBar: {
// // // // // //     height: 44,
// // // // // //     background: "#0b0b0b", // dark black
// // // // // //     display: "flex",
// // // // // //     alignItems: "center",
// // // // // //     padding: "0 12px",
// // // // // //     gap: 16,
// // // // // //   },
// // // // // //   tabButton: {
// // // // // //     padding: "8px 18px",
// // // // // //     color: "white",
// // // // // //     border: "none",
// // // // // //     borderRadius: 4,
// // // // // //     cursor: "pointer",
// // // // // //     fontSize: 15,
// // // // // //   },
// // // // // //   message: {
// // // // // //     marginLeft: 20,
// // // // // //     color: "#f38ba8",
// // // // // //     fontSize: 14,
// // // // // //   },
// // // // // //   secondBar: {
// // // // // //     minHeight: 100, // taller than the first bar (44)
// // // // // //     background: "#3b3b3b", // dark grey
// // // // // //     padding: "12px 16px",
// // // // // //     display: "flex",
// // // // // //     flexDirection: "column",
// // // // // //     justifyContent: "center",
// // // // // //     gap: 12,
// // // // // //     boxSizing: "border-box",
// // // // // //   },
// // // // // //   row: {
// // // // // //     display: "flex",
// // // // // //     alignItems: "center",
// // // // // //     gap: 14,
// // // // // //   },
// // // // // //   browseButton: {
// // // // // //     padding: "6px 16px",
// // // // // //     background: "#5a5a5a",
// // // // // //     color: "white",
// // // // // //     border: "1px solid #777",
// // // // // //     borderRadius: 4,
// // // // // //     cursor: "pointer",
// // // // // //     fontSize: 14,
// // // // // //   },
// // // // // //   label: {
// // // // // //     color: "#e0e0e0",
// // // // // //     fontSize: 14,
// // // // // //     minWidth: 180,
// // // // // //   },
// // // // // //   required: {
// // // // // //   color: "#ff4d4d", // red star
// // // // // //   fontWeight: "bold",
// // // // // // },
// // // // // //   fileName: {
// // // // // //     color: "#ffffff",
// // // // // //     fontSize: 14,
// // // // // //     fontWeight: "bold",
// // // // // //   },
// // // // // // };






// // // // // // import { useRef, useState } from "react";

// // // // // // const TABS = ["File", "Clean Model", "Segment"];
// // // // // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // // // // export default function TopBar({
// // // // // //   upperName,
// // // // // //   lowerName,
// // // // // //   onUpperSelected,
// // // // // //   onLowerSelected,
// // // // // //   onSegment,
// // // // // //    onToolClick,
// // // // // //   busy,
// // // // // //   message,
// // // // // // }) {
// // // // // //   const [activeTab, setActiveTab] = useState("File");
// // // // // //   const upperInputRef = useRef(null);
// // // // // //   const lowerInputRef = useRef(null);

// // // // // //   const handleChange = (e, callback) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (file) callback(file);
// // // // // //     e.target.value = "";
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // // // //       <div style={styles.firstBar}>
// // // // // //         {TABS.map((tab) => (
// // // // // //           <button
// // // // // //             key={tab}
// // // // // //             onClick={() => {
// // // // // //               setActiveTab(tab);
// // // // // //               if (tab === "Segment" && !busy) onSegment(); // Segment runs the exe
// // // // // //             }}
// // // // // //             style={{
// // // // // //               ...styles.tabButton,
// // // // // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // // //             }}
// // // // // //           >
// // // // // //             {tab}
// // // // // //           </button>
// // // // // //         ))}
// // // // // //         {message && <span style={styles.message}>{message}</span>}
// // // // // //       </div>

// // // // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // // // //       <div style={styles.secondBar}>
// // // // // //         {activeTab === "File" && (
// // // // // //           <>
// // // // // //             <div style={styles.row}>
// // // // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // // // //                 Browse
// // // // // //               </button>
// // // // // //               {/* <span style={styles.label}>
// // // // // //                 Upload Upper Scan Model <span style={styles.required}>*</span>
// // // // // //               </span> */}

// // // // // //               <span style={styles.label}>
// // // // // //               Upload Upper Scan {!upperName && <span style={styles.required}>*</span>}
// // // // // //              </span>
// // // // // //               <span style={styles.fileName}>{upperName}</span>
// // // // // //               <input
// // // // // //                 type="file"
// // // // // //                 accept=".stl"
// // // // // //                 ref={upperInputRef}
// // // // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // // // //                 style={{ display: "none" }}
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div style={styles.row}>
// // // // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // // // //                 Browse
// // // // // //               </button>
// // // // // //               {/* <span style={styles.label}>
// // // // // //                 Upload Lower Scan Model <span style={styles.required}>*</span>
// // // // // //               </span> */}
// // // // // //               <span style={styles.label}>
// // // // // //               Upload Lower Scan {!lowerName && <span style={styles.required}>*</span>}
// // // // // //              </span>
// // // // // //               <span style={styles.fileName}>{lowerName}</span>
// // // // // //               <input
// // // // // //                 type="file"
// // // // // //                 accept=".stl"
// // // // // //                 ref={lowerInputRef}
// // // // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // // // //                 style={{ display: "none" }}
// // // // // //               />
// // // // // //             </div>
// // // // // //           </>
// // // // // //         )}

// // // // // //         {activeTab === "Clean Model" && (
// // // // // //          <div style={styles.toolRow}>
// // // // // //     {CLEAN_MODEL_TOOLS.map((tool) => (
// // // // // //       <button
// // // // // //         key={tool}
// // // // // //         style={styles.toolButton}
// // // // // //         onClick={() => onToolClick && onToolClick(tool)}
// // // // // //       >
// // // // // //         {tool}
// // // // // //       </button>
// // // // // //     ))}
// // // // // //   </div>
// // // // // // )}

// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // const styles = {
// // // // // //   firstBar: {
// // // // // //     height: 44,
// // // // // //     background: "#0b0b0b",
// // // // // //     display: "flex",
// // // // // //     alignItems: "center",
// // // // // //     padding: "0 12px",
// // // // // //     gap: 16,
// // // // // //   },
// // // // // //   tabButton: {
// // // // // //     padding: "8px 18px",
// // // // // //     color: "white",
// // // // // //     border: "none",
// // // // // //     borderRadius: 4,
// // // // // //     cursor: "pointer",
// // // // // //     fontSize: 15,
// // // // // //   },
// // // // // //   message: {
// // // // // //     marginLeft: 20,
// // // // // //     color: "#f9e2af",
// // // // // //     fontSize: 14,
// // // // // //   },
// // // // // //   secondBar: {
// // // // // //     minHeight: 100,
// // // // // //     background: "#3b3b3b",
// // // // // //     padding: "12px 16px",
// // // // // //     display: "flex",
// // // // // //     flexDirection: "column",
// // // // // //     justifyContent: "center",
// // // // // //     gap: 12,
// // // // // //     boxSizing: "border-box",
// // // // // //   },
// // // // // //   row: {
// // // // // //     display: "flex",
// // // // // //     alignItems: "center",
// // // // // //     gap: 14,
// // // // // //   },
// // // // // //   browseButton: {
// // // // // //     padding: "6px 16px",
// // // // // //     background: "#5a5a5a",
// // // // // //     color: "white",
// // // // // //     border: "1px solid #777",
// // // // // //     borderRadius: 4,
// // // // // //     cursor: "pointer",
// // // // // //     fontSize: 14,
// // // // // //   },
// // // // // //   label: {
// // // // // //     color: "#e0e0e0",
// // // // // //     fontSize: 14,
// // // // // //     minWidth: 120,
// // // // // //   },
// // // // // //   required: {
// // // // // //     color: "#ff4d4d",
// // // // // //     fontWeight: "bold",
// // // // // //   },
// // // // // //   fileName: {
// // // // // //     color: "#ffffff",
// // // // // //     fontSize: 14,
// // // // // //     fontWeight: "bold",
// // // // // //   },
// // // // // //   toolRow: {
// // // // // //   display: "flex",
// // // // // //   alignItems: "center",
// // // // // //   gap: 16,
// // // // // // },
// // // // // // toolButton: {
// // // // // //   padding: "10px 22px",
// // // // // //   background: "#5a5a5a",
// // // // // //   color: "white",
// // // // // //   border: "1px solid #777",
// // // // // //   borderRadius: 4,
// // // // // //   cursor: "pointer",
// // // // // //   fontSize: 14,
// // // // // // },
// // // // // // };






// // // // // import { useRef, useState } from "react";

// // // // // const TABS = ["File", "Clean Model", "Segment"];
// // // // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // // // export default function TopBar({
// // // // //   upperName,
// // // // //   lowerName,
// // // // //   onUpperSelected,
// // // // //   onLowerSelected,
// // // // //   onIdentifyLat,
// // // // //   onCutTeeth,
// // // // //   onToolClick,
// // // // //   busy,
// // // // //   message,
// // // // // }) {
// // // // //   const [activeTab, setActiveTab] = useState("File");
// // // // //   const upperInputRef = useRef(null);
// // // // //   const lowerInputRef = useRef(null);

// // // // //   const handleChange = (e, callback) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) callback(file);
// // // // //     e.target.value = "";
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // // //       <div style={styles.firstBar}>
// // // // //         {TABS.map((tab) => (
// // // // //           <button
// // // // //             key={tab}
// // // // //             onClick={() => setActiveTab(tab)}
// // // // //             style={{
// // // // //               ...styles.tabButton,
// // // // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // //             }}
// // // // //           >
// // // // //             {tab}
// // // // //           </button>
// // // // //         ))}
// // // // //         {message && <span style={styles.message}>{message}</span>}
// // // // //       </div>

// // // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // // //       <div style={styles.secondBar}>
// // // // //         {activeTab === "File" && (
// // // // //           <>
// // // // //             <div style={styles.row}>
// // // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // // //                 Browse
// // // // //               </button>
// // // // //               <span style={styles.label}>
// // // // //                 Upload Upper Scan <span style={styles.required}>*</span>
// // // // //               </span>
// // // // //               <span style={styles.fileName}>{upperName}</span>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept=".stl"
// // // // //                 ref={upperInputRef}
// // // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // // //                 style={{ display: "none" }}
// // // // //               />
// // // // //             </div>

// // // // //             <div style={styles.row}>
// // // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // // //                 Browse
// // // // //               </button>
// // // // //               <span style={styles.label}>
// // // // //                 Upload Lower Scan <span style={styles.required}>*</span>
// // // // //               </span>
// // // // //               <span style={styles.fileName}>{lowerName}</span>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept=".stl"
// // // // //                 ref={lowerInputRef}
// // // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // // //                 style={{ display: "none" }}
// // // // //               />
// // // // //             </div>
// // // // //           </>
// // // // //         )}

// // // // //         {activeTab === "Clean Model" && (
// // // // //           <div style={styles.toolRow}>
// // // // //             {CLEAN_MODEL_TOOLS.map((tool) => (
// // // // //               <button
// // // // //                 key={tool}
// // // // //                 style={styles.toolButton}
// // // // //                 onClick={() => onToolClick && onToolClick(tool)}
// // // // //               >
// // // // //                 {tool}
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}

// // // // //         {activeTab === "Segment" && (
// // // // //           <div style={styles.toolRow}>
// // // // //             <button
// // // // //               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // // // //               disabled={busy}
// // // // //               onClick={onIdentifyLat}
// // // // //             >
// // // // //               Identify LAT
// // // // //             </button>
// // // // //              <button style={styles.toolButton}>
// // // // //              Segment
// // // // //             </button>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // const styles = {
// // // // //   firstBar: {
// // // // //     height: 44,
// // // // //     background: "#0b0b0b",
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     padding: "0 12px",
// // // // //     gap: 16,
// // // // //   },
// // // // //   tabButton: {
// // // // //     padding: "8px 18px",
// // // // //     color: "white",
// // // // //     border: "none",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 15,
// // // // //   },
// // // // //   message: {
// // // // //     marginLeft: 20,
// // // // //     color: "#f9e2af",
// // // // //     fontSize: 14,
// // // // //   },
// // // // //   secondBar: {
// // // // //     minHeight: 100,
// // // // //     background: "#3b3b3b",
// // // // //     padding: "12px 16px",
// // // // //     display: "flex",
// // // // //     flexDirection: "column",
// // // // //     justifyContent: "center",
// // // // //     gap: 12,
// // // // //     boxSizing: "border-box",
// // // // //   },
// // // // //   row: {
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     gap: 14,
// // // // //   },
// // // // //   browseButton: {
// // // // //     padding: "6px 16px",
// // // // //     background: "#5a5a5a",
// // // // //     color: "white",
// // // // //     border: "1px solid #777",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 14,
// // // // //   },
// // // // //   label: {
// // // // //     color: "#e0e0e0",
// // // // //     fontSize: 14,
// // // // //     minWidth: 120,
// // // // //   },
// // // // //   required: {
// // // // //     color: "#ff4d4d",
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // //   fileName: {
// // // // //     color: "#ffffff",
// // // // //     fontSize: 14,
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // //   toolRow: {
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     gap: 16,
// // // // //   },
// // // // //   toolButton: {
// // // // //     padding: "10px 22px",
// // // // //     background: "#5a5a5a",
// // // // //     color: "white",
// // // // //     border: "1px solid #777",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 14,
// // // // //   },
// // // // // };












// // // // import { useRef, useState } from "react";
// // // // import ProgressBar from "./ProgressBar.jsx";

// // // // const TABS = ["File", "Clean Model", "Segment"];
// // // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // // export default function TopBar({
// // // //   upperName,
// // // //   lowerName,
// // // //   onUpperSelected,
// // // //   onLowerSelected,
// // // //   onIdentifyLat,
// // // //   onToolClick,
// // // //   busy,
// // // //   progress,
// // // //   message,
// // // // }) {
// // // //   const [activeTab, setActiveTab] = useState("File");
// // // //   const upperInputRef = useRef(null);
// // // //   const lowerInputRef = useRef(null);

// // // //   const handleChange = (e, callback) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) callback(file);
// // // //     e.target.value = "";
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // //       <div style={styles.firstBar}>
// // // //         {TABS.map((tab) => (
// // // //           <button
// // // //             key={tab}
// // // //             onClick={() => setActiveTab(tab)}
// // // //             style={{
// // // //               ...styles.tabButton,
// // // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // //             }}
// // // //           >
// // // //             {tab}
// // // //           </button>
// // // //         ))}

// // // //         {/* progress bar while Identify LAT works; otherwise normal messages (errors etc.) */}
// // // //         {progress ? (
// // // //           <ProgressBar percent={progress.percent} label={progress.label} />
// // // //         ) : (
// // // //           message && <span style={styles.message}>{message}</span>
// // // //         )}
// // // //       </div>

// // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // //       <div style={styles.secondBar}>
// // // //         {activeTab === "File" && (
// // // //           <>
// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //               <span style={styles.label}>
// // // //                 Upload Upper Scan <span style={styles.required}>*</span>
// // // //               </span>
// // // //               <span style={styles.fileName}>{upperName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={upperInputRef}
// // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>

// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //               <span style={styles.label}>
// // // //                 Upload Lower Scan <span style={styles.required}>*</span>
// // // //               </span>
// // // //               <span style={styles.fileName}>{lowerName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={lowerInputRef}
// // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>
// // // //           </>
// // // //         )}

// // // //         {activeTab === "Clean Model" && (
// // // //           <div style={styles.toolRow}>
// // // //             {CLEAN_MODEL_TOOLS.map((tool) => (
// // // //               <button
// // // //                 key={tool}
// // // //                 style={styles.toolButton}
// // // //                 onClick={() => onToolClick && onToolClick(tool)}
// // // //               >
// // // //                 {tool}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {activeTab === "Segment" && (
// // // //           <div style={styles.toolRow}>
// // // //             <button
// // // //               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // // //               disabled={busy}
// // // //               onClick={onIdentifyLat}
// // // //             >
// // // //               Identify LAT
// // // //             </button>
// // // //             <button style={styles.toolButton}>Segment</button>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // const styles = {
// // // //   firstBar: {
// // // //     height: 44,
// // // //     background: "#0b0b0b",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     padding: "0 12px",
// // // //     gap: 16,
// // // //   },
// // // //   tabButton: {
// // // //     padding: "8px 18px",
// // // //     color: "white",
// // // //     border: "none",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 15,
// // // //   },
// // // //   message: {
// // // //     marginLeft: 20,
// // // //     color: "#f9e2af",
// // // //     fontSize: 14,
// // // //   },
// // // //   secondBar: {
// // // //     minHeight: 100,
// // // //     background: "#3b3b3b",
// // // //     padding: "12px 16px",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     justifyContent: "center",
// // // //     gap: 12,
// // // //     boxSizing: "border-box",
// // // //   },
// // // //   row: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 14,
// // // //   },
// // // //   browseButton: {
// // // //     padding: "6px 16px",
// // // //     background: "#5a5a5a",
// // // //     color: "white",
// // // //     border: "1px solid #777",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 14,
// // // //   },
// // // //   label: {
// // // //     color: "#e0e0e0",
// // // //     fontSize: 14,
// // // //     minWidth: 120,
// // // //   },
// // // //   required: {
// // // //     color: "#ff4d4d",
// // // //     fontWeight: "bold",
// // // //   },
// // // //   fileName: {
// // // //     color: "#ffffff",
// // // //     fontSize: 14,
// // // //     fontWeight: "bold",
// // // //   },
// // // //   toolRow: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 16,
// // // //   },
// // // //   toolButton: {
// // // //     padding: "10px 22px",
// // // //     background: "#5a5a5a",
// // // //     color: "white",
// // // //     border: "1px solid #777",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 14,
// // // //   },
// // // // };








// // // import { useRef, useState } from "react";
// // // import ProgressBar from "./ProgressBar.jsx";

// // // const TABS = ["File", "Clean Model", "Segment", "Automatic Setup"];
// // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];
// // // const VIEWS = ["Front View", "Back View", "Top View", "Bottom View", "Left View", "Right View"];
// // // // const hoverOn = (e) => (e.currentTarget.style.background = "#505050");
// // // // const hoverOff = (e) => (e.currentTarget.style.background = "transparent");

// // // const ACTIVE_COLOR = "#4f8cff";
// // // const HOVER_COLOR = "#505050";

// // // // hover shows a grey box, but never replaces the blue of the active button
// // // const hoverOn = (e) => {
// // //   if (e.currentTarget.dataset.active !== "true") e.currentTarget.style.background = HOVER_COLOR;
// // // };
// // // const hoverOff = (e) => {
// // //   e.currentTarget.style.background =
// // //     e.currentTarget.dataset.active === "true" ? ACTIVE_COLOR : "transparent";
// // // };

// // // // which view each Clean Model tool shows
// // // const TOOL_VIEW = {
// // //   "Clean Model": "cleanModel",
// // //   "Generate Trimline": "generateTrimline",
// // //   "Trim Model": "trimModel",
// // //   "Add Base": "addBase",
// // // };

// // // const svgProps = {
// // //   width: 30,
// // //   height: 30,
// // //   viewBox: "0 0 32 32",
// // //   fill: "none",
// // //   stroke: "currentColor",
// // //   strokeWidth: 2,
// // //   strokeLinecap: "round",
// // //   strokeLinejoin: "round",
// // // };

// // // // two stacked jaws seen from the front or back
// // // // const FrontIcon = () => (
// // // //   <svg {...svgProps}>
// // // //     <path d="M5 13 C5 8 27 8 27 13 C27 16 5 16 5 13 Z" />
// // // //     <path d="M5 21 C5 16 27 16 27 21 C27 24 5 24 5 21 Z" />
// // // //   </svg>
// // // // );
// // // // const BackIcon = () => (
// // // //   <svg {...svgProps}>
// // // //     <path d="M5 13 C5 8 27 8 27 13 C27 16 5 16 5 13 Z" />
// // // //     <path d="M5 21 C5 16 27 16 27 21 C27 24 5 24 5 21 Z" />
// // // //     <path d="M11 13 H21" />
// // // //   </svg>
// // // // );


// // // // Front View: two stacked curved rectangles
// // // // Front View: traced from the hand-drawn sketch
// // // // Front View: two identical bands


// // // const jawProps = {
// // //   width: 34,
// // //   height: 30,
// // //   viewBox: "0 0 48 40",
// // //   strokeLinecap: "round",
// // //   strokeLinejoin: "round",
// // // };

// // // const EDGE = "#c9cfd8";

// // // const Defs = ({ id, dim }) => (
// // //   <defs>
// // //     <linearGradient id={`gum-${id}`} x1="0" y1="0" x2="0" y2="1">
// // //       <stop offset="0" stopColor="#ff9f99" />
// // //       <stop offset="0.5" stopColor="#f26f6a" />
// // //       <stop offset="1" stopColor="#d44d4d" />
// // //     </linearGradient>
// // //     <linearGradient id={`tooth-${id}`} x1="0" y1="0" x2="0" y2="1">
// // //       <stop offset="0" stopColor="#ffffff" />
// // //       <stop offset="1" stopColor={dim ? "#d3d8e0" : "#e8ecf1"} />
// // //     </linearGradient>
// // //   </defs>
// // // );


// // // // teeth of one row, from the left premolar to the right premolar
// // // const FRONT_TEETH = [
// // //   { type: "premolar", w: 4.2 },
// // //   { type: "canine", w: 4.0 },
// // //   { type: "lateral", w: 3.6 },
// // //   { type: "central", w: 4.8 },
// // //   { type: "central", w: 4.8 },
// // //   { type: "lateral", w: 3.6 },
// // //   { type: "canine", w: 4.0 },
// // //   { type: "premolar", w: 4.2 },
// // // ];

// // // // gives every tooth its x position and its center, so the row is centered
// // // const placeFrontTeeth = (gap) => {
// // //   const total = FRONT_TEETH.reduce((s, t) => s + t.w, 0) + gap * (FRONT_TEETH.length - 1);
// // //   let x = 24 - total / 2;
// // //   return FRONT_TEETH.map((t) => {
// // //     const item = { ...t, x, cx: x + t.w / 2 };
// // //     x += t.w + gap;
// // //     return item;
// // //   });
// // // };

// // // // one tooth in its own box: flat on the gum side (y = 0), rounded at the biting edge (y = h)
// // // const frontToothPath = (type, w, h) => {
// // //   const r = { central: 1.2, lateral: 1.8, canine: w / 2, premolar: 1.6 }[type];
// // //   return `M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
// // // };

// // // // ---------- Front / Back ----------
// // // // const FrontJaw = ({ id, dim, gum, base, toothH }) => {
// // // //   const N = 8, W = 4.4, GAP = 0.35;
// // // //   const start = 24 - (N * (W + GAP) - GAP) / 2;
// // // //   const half = (
// // // //     <>
// // // //       {Array.from({ length: N }, (_, i) => {
// // // //         const cx = start + i * (W + GAP) + W / 2;
// // // //         const u = (cx - 24) / 20;
// // // //         const yt = base + 4 * (1 - u * u);
// // // //         return (
// // // //           <rect
// // // //             key={i}
// // // //             x={cx - W / 2}
// // // //             y={yt - 1.5}
// // // //             width={W}
// // // //             height={toothH + 1.5}
// // // //             rx={1.6}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //             transform={`rotate(${-u * 6} ${cx} ${yt})`}
// // // //           />
// // // //         );
// // // //       })}
// // // //       <path d={gum} fill={`url(#gum-${id})`} />
// // // //     </>
// // // //   );
// // // //   return (
// // // //     <svg {...jawProps}>
// // // //       <Defs id={id} dim={dim} />
// // // //       {half}
// // // //       <g transform="translate(0 40) scale(1 -1)">{half}</g>
// // // //     </svg>
// // // //   );
// // // // };


// // // const FrontJaw = ({ id, dim, gum, base, toothH }) => {
// // //   const teeth = placeFrontTeeth(0.35);
// // //   const half = (
// // //     <>
// // //       {teeth.map((t, i) => {
// // //         const u = (t.cx - 24) / 20;
// // //         const yt = base + 4 * (1 - u * u);
// // //         return (
// // //           <path
// // //             key={i}
// // //             d={frontToothPath(t.type, t.w, toothH + 1.5)}
// // //             transform={`rotate(${-u * 6} ${t.cx} ${yt}) translate(${t.x} ${yt - 1.5})`}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         );
// // //       })}
// // //       <path d={gum} fill={`url(#gum-${id})`} />
// // //     </>
// // //   );
// // //   // return (
// // //   //   <svg {...jawProps}>
// // //   //     <Defs id={id} dim={dim} />
// // //   //     {half}
// // //   //     <g transform="translate(0 40) scale(1 -1)">{half}</g>
// // //   //   </svg>
// // //   // );
// // //    return (
// // //   <svg {...jawProps}>
// // //     <Defs id={id} dim={dim} />
// // //     <g transform="translate(24 20) scale(0.88) translate(-24 -20)">
// // //       {half}
// // //       <g transform="translate(0 40) scale(1 -1)">{half}</g>
// // //     </g>
// // //   </svg>
// // // );

// // // };



// // // // const FrontIcon = () => {
// // // //   const id = "front";
// // // //   const N = 8;          // teeth per row
// // // //   const W = 4.2;        // tooth width
// // // //   const GAP = 0.3;
// // // //   const start = 24 - (N * (W + GAP) - GAP) / 2;

// // // //   // x center of each tooth, and how far it is from the middle (-1 to 1)
// // // //   const cols = Array.from({ length: N }, (_, i) => {
// // // //     const cx = start + i * (W + GAP) + W / 2;
// // // //     return { cx, u: (cx - 24) / 18 };
// // // //   });

// // // //   return (
// // // //     <svg {...jawProps}>
// // // //       <Defs id={id} />

// // // //       {/* lower teeth */}
// // // //       {cols.map(({ cx, u }, i) => {
// // // //         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
// // // //         return (
// // // //           <rect
// // // //             key={"l" + i}
// // // //             x={cx - W / 2}
// // // //             y={top}
// // // //             width={W}
// // // //             height={32 - top}
// // // //             rx={1.6}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //           />
// // // //         );
// // // //       })}

// // // //       {/* lower gum (a bit narrower at the bottom) */}
// // // //       {/* <path
// // // //         d="M6 30 Q24 25 42 30 Q43 38 38 38 Q24 40 10 38 Q5 38 6 30 Z"
// // // //         fill={`url(#gum-${id})`}
// // // //       /> */}

// // // //       {/* lower gum: the upper gum flipped upside down (same shape and size) */}
// // // // <path
// // // //   transform="translate(0 40) scale(1 -1)"
// // // //   d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// // // //   fill={`url(#gum-${id})`}
// // // // />


// // // //       {/* upper teeth */}
// // // //       {cols.map(({ cx, u }, i) => {
// // // //         const bottom = 18 + 2 * (1 - u * u);
// // // //         return (
// // // //           <rect
// // // //             key={"u" + i}
// // // //             x={cx - W / 2}
// // // //             y={8}
// // // //             width={W}
// // // //             height={bottom - 8}
// // // //             rx={1.6}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //           />
// // // //         );
// // // //       })}

// // // //       {/* upper gum */}
// // // //       <path
// // // //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// // // //         fill={`url(#gum-${id})`}
// // // //       />
// // // //     </svg>
// // // //   );
// // // // };


// // // const FrontIcon = () => {
// // //   const id = "front";
// // //   const teeth = placeFrontTeeth(0.3);
// // //   const style = { fill: `url(#tooth-${id})`, stroke: EDGE, strokeWidth: 0.5 };

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />

// // //       {/* lower teeth: the same shapes turned upside down */}
// // //       {teeth.map((t, i) => {
// // //         const u = (t.cx - 24) / 18;
// // //         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
// // //         return (
// // //           <path
// // //             key={"l" + i}
// // //             transform={`translate(${t.x} 32) scale(1 -1)`}
// // //             d={frontToothPath(t.type, t.w, 32 - top)}
// // //             {...style}
// // //           />
// // //         );
// // //       })}

// // //       {/* lower gum: the upper gum flipped upside down */}
// // //       <path
// // //         transform="translate(0 40) scale(1 -1)"
// // //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// // //         fill={`url(#gum-${id})`}
// // //       />

// // //       {/* upper teeth */}
// // //       {teeth.map((t, i) => {
// // //         const u = (t.cx - 24) / 18;
// // //         const bottom = 18 + 2 * (1 - u * u);
// // //         return (
// // //           <path
// // //             key={"u" + i}
// // //             transform={`translate(${t.x} 8)`}
// // //             d={frontToothPath(t.type, t.w, bottom - 8)}
// // //             {...style}
// // //           />
// // //         );
// // //       })}

// // //       {/* upper gum */}
// // //       <path
// // //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// // //         fill={`url(#gum-${id})`}
// // //       />

// // //        <Defs id={id} />
// // //     <g transform="translate(24 20) scale(0.88) translate(-24 -20)">

// // //       {/* ...everything that is already there: lower teeth, lower gum, upper teeth, upper gum... */}

// // //     </g>
// // //     </svg>
// // //   );
// // // };


// // // // const FrontIcon = () => {
// // // //   const id = "front";
// // // //   const N = 10;      // number of teeth per row (was 8)
// // // //   const UW = 3.3;    // upper tooth width (was 3.9)
// // // //   const LW = 3.3;    // lower tooth width (was 3.9)
// // // //   const GAP = 0.3;
// // // //   const uStart = 24 - (N * (UW + GAP) - GAP) / 2;
// // // //   const lStart = 24 - (N * (LW + GAP) - GAP) / 2;

// // // //   return (
// // // //     <svg {...jawProps}>
// // // //       <Defs id={id} />

// // // //       {/* lower teeth */}
// // // //       {Array.from({ length: N }, (_, i) => {
// // // //         const cx = lStart + i * (LW + GAP) + LW / 2;
// // // //         const u = (cx - 24) / 20;
// // // //         const top = 18.5 + 2 * (1 - u * u);
// // // //         return (
// // // //           <rect
// // // //             key={"l" + i}
// // // //             x={cx - LW / 2}
// // // //             y={top}
// // // //             width={LW}
// // // //             height={13}
// // // //             rx={1.4}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //           />
// // // //         );
// // // //       })}

// // // //       {/* lower gum, moved up 1.5 so it covers more of the teeth */}
// // // //       <path
// // // //         transform="translate(0 -1.5)"
// // // //         d="M3 35 Q3 31 7 31 Q24 26.5 41 31 Q45 31 45 35 Q45 38.5 41 38 Q24 33 7 38 Q3 38.5 3 35 Z"
// // // //         fill={`url(#gum-${id})`}
// // // //       />

// // // //       {/* upper teeth */}
// // // //       {Array.from({ length: N }, (_, i) => {
// // // //         const cx = uStart + i * (UW + GAP) + UW / 2;
// // // //         const u = (cx - 24) / 20;
// // // //         const edge = 19.5 + 2 * (1 - u * u);
// // // //         return (
// // // //           <rect
// // // //             key={"u" + i}
// // // //             x={cx - UW / 2}
// // // //             y={7}
// // // //             width={UW}
// // // //             height={edge - 7}
// // // //             rx={1.4}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //           />
// // // //         );
// // // //       })}

// // // //       {/* upper gum, moved down 1.5 so it covers more of the teeth */}
// // // //       <path
// // // //         transform="translate(0 1.5)"
// // // //         d="M3 5 Q3 1.5 7 2.5 Q24 8 41 2.5 Q45 1.5 45 5 Q45 9 41 9 Q24 14 7 9 Q3 9 3 5 Z"
// // // //         fill={`url(#gum-${id})`}
// // // //       />
// // // //     </svg>
// // // //   );
// // // // };


// // // // const BackIcon = () => (
// // // //   <FrontJaw
// // // //     id="back"
// // // //     dim
// // // //     base={11}
// // // //     toothH={5}
// // // //     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 12 41 12 Q24 18 7 12 Q3 12 3 6 Z"
// // // //   />
// // // // );

// // // const BackIcon = () => (
// // //   <FrontJaw
// // //     id="back"
// // //     dim
// // //     base={9.5}   // was 11
// // //     toothH={6.5} // was 5
// // //     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 10.5 41 10.5 Q24 16 7 10.5 Q3 10.5 3 6 Z"
// // //   />
// // // );

// // // // ---------- Left / Right ----------
// // // const SideJaw = ({ id, flip }) => {
// // //   const N = 10, W = 3.7, GAP = 0.3;
// // //   const start = 24 - (N * (W + GAP) - GAP) / 2;
// // //   const half = (
// // //     <>
// // //       {Array.from({ length: N }, (_, i) => (
// // //         <rect
// // //           key={i}
// // //           x={start + i * (W + GAP)}
// // //           y={10.5}
// // //           width={W}
// // //           height={9}
// // //           rx={1.5}
// // //           fill={`url(#tooth-${id})`}
// // //           stroke={EDGE}
// // //           strokeWidth={0.5}
// // //         />
// // //       ))}
// // //       <path
// // //         d="M3 6 Q3 2 7 2 H41 Q45 2 45 6 Q45 12 41 12 H7 Q3 12 3 6 Z"
// // //         fill={`url(#gum-${id})`}
// // //       />
// // //     </>
// // //   );
// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />
// // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // //         {half}
// // //         <g transform="translate(-1.5 40) scale(1 -1)">{half}</g>
// // //       </g>
// // //     </svg>
// // //   );
// // // };


// // // // const SideBite = ({ id, flip }) => {
// // // //   // back (molars) -> front (incisors)
// // // //   const W = [6.8, 6.8, 5, 5, 4.2, 3.6, 3.2];
// // // //   const GAP = 0.3;
// // // //   const upperBottom = [19, 19.5, 20.5, 21, 22, 21.5, 21]; // biting edge of upper teeth
// // // //   const lowerTop = [21.5, 21.5, 20.5, 20, 19.5, 19.5, 20]; // top edge of lower teeth

// // // //   const place = (start) => {
// // // //     let x = start;
// // // //     return W.map((w) => {
// // // //       const px = x;
// // // //       x += w + GAP;
// // // //       return px;
// // // //     });
// // // //   };
// // // //   const ux = place(5);   // upper row
// // // //   const lx = place(3.8); // lower row sits slightly behind

// // // //   return (
// // // //     <svg {...jawProps}>
// // // //       <Defs id={id} />
// // // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // // //         {/* lower teeth (drawn first, so the upper teeth overlap them) */}
// // // //         {W.map((w, i) => (
// // // //           <rect
// // // //             key={"l" + i}
// // // //             x={lx[i]}
// // // //             y={lowerTop[i]}
// // // //             width={w}
// // // //             height={32 - lowerTop[i]}
// // // //             rx={Math.min(w * 0.35, 2)}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //           />
// // // //         ))}

// // // //         {/* lower gum */}
// // // //         <path
// // // //           d="M3 34 Q3 30.5 7 30.5 H40 Q43 30.5 43 33.5 Q43 37.5 40 37.5 H7 Q3 38 3 34 Z"
// // // //           fill={`url(#gum-${id})`}
// // // //         />

// // // //         {/* upper teeth */}
// // // //         {W.map((w, i) => (
// // // //           <rect
// // // //             key={"u" + i}
// // // //             x={ux[i]}
// // // //             y={8}
// // // //             width={w}
// // // //             height={upperBottom[i] - 8}
// // // //             rx={Math.min(w * 0.35, 2)}
// // // //             fill={`url(#tooth-${id})`}
// // // //             stroke={EDGE}
// // // //             strokeWidth={0.5}
// // // //           />
// // // //         ))}

// // // //         {/* upper gum */}
// // // //         <path
// // // //           d="M3 6 Q3 2.5 7 2.5 H42 Q45 2.5 45 5.5 Q45 9.5 42 9.5 H7 Q3 10 3 6 Z"
// // // //           fill={`url(#gum-${id})`}
// // // //         />
// // // //       </g>
// // // //     </svg>
// // // //   );
// // // // };

// // // // const LeftIcon = () => <SideBite id="left" />;
// // // // const RightIcon = () => <SideBite id="right" flip />;



// // // // const SideBite = ({ id, flip }) => {
// // // //   const N = 7;     // teeth in the strip
// // // //   const W = 5;   // tooth width
// // // //   const GAP = 0.4;
// // // //   const X0 = 6;    // where the first tooth starts

// // // //   // top and bottom edge of the tooth strip (the gap between the two gums)
// // // //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// // // //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;

// // // //   return (
// // // //     <svg {...jawProps}>
// // // //       <Defs id={id} />
// // // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // // //         {/* teeth (they get taller towards the right, like the gap does) */}
// // // //         {/* {Array.from({ length: N }, (_, i) => {
// // // //           const x = X0 + i * (W + GAP);
// // // //           const t = topEdge(x + W / 2);
// // // //           const b = botEdge(x + W / 2);
// // // //           return (
// // // //             <rect
// // // //               key={i}
// // // //               x={x}
// // // //               y={t - 0.5}
// // // //               width={W}
// // // //               height={b - t + 1}
// // // //               rx={1.2}
// // // //               fill={`url(#tooth-${id})`}
// // // //               stroke={EDGE}
// // // //               strokeWidth={0.4}
// // // //             />
// // // //           );
// // // //         })} */}


// // // //         {/* teeth: upper half and lower half with a small gap in the middle */}
// // // // {Array.from({ length: N }, (_, i) => {
// // // //   const x = X0 + i * (W + GAP);
// // // //   const t = topEdge(x + W / 2) - 0.5;   // top of the tooth
// // // //   const b = botEdge(x + W / 2) + 0.5;   // bottom of the tooth
// // // //   const mid = (t + b) / 2;
// // // //   const BITE_GAP = 1.2;                  // gap between upper and lower teeth

// // // //   return (
// // // //     <g key={i}>
// // // //       <rect
// // // //         x={x}
// // // //         y={t}
// // // //         width={W}
// // // //         height={mid - BITE_GAP / 2 - t}
// // // //         rx={1.2}
// // // //         fill={`url(#tooth-${id})`}
// // // //         stroke={EDGE}
// // // //         strokeWidth={0.4}
// // // //       />
// // // //       <rect
// // // //         x={x}
// // // //         y={mid + BITE_GAP / 2}
// // // //         width={W}
// // // //         height={b - (mid + BITE_GAP / 2)}
// // // //         rx={1.2}
// // // //         fill={`url(#tooth-${id})`}
// // // //         stroke={EDGE}
// // // //         strokeWidth={0.4}
// // // //       />
// // // //     </g>
// // // //   );
// // // // })}

// // // //         {/* upper gum: short on the left, taller on the right */}
// // // //         <path
// // // //           // d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 16 L4 18.5 Z"
// // // //           // d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 15.2 L4 17.7 Z"
// // // //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// // // //           fill={`url(#gum-${id})`}
// // // //         />

// // // //         {/* lower gum */}
// // // //         <path
// // // //           // d="M4 21.5 L44 23 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // // //           // d="M4 22.3 L44 23.8 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // // //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // // //           fill={`url(#gum-${id})`}
// // // //         />
// // // //       </g>
// // // //     </svg>
// // // //   );
// // // // };


// // // // tooth outline in its own box (width w, height h): the gum side is at y = 0,
// // // // the chewing edge at y = h
// // // const toothPath = (type, w, h) => {
// // //   if (type === "incisor") {
// // //     return `M0.6 0 H${w - 0.6} L${w} ${h - 1.2} Q${w} ${h} ${w - 1} ${h} H1 Q0 ${h} 0 ${h - 1.2} Z`;
// // //   }
// // //   if (type === "canine") {
// // //     return `M0.6 0 H${w - 0.6} L${w} ${h * 0.6} Q${w} ${h * 0.75} ${w / 2} ${h} Q0 ${h * 0.75} 0 ${h * 0.6} Z`;
// // //   }
// // //   if (type === "premolar") {
// // //     return `M0.6 0 H${w - 0.6} L${w} ${h - 1.2} Q${w} ${h} ${w - 1.2} ${h} Q${w * 0.62} ${h - 0.4} ${w / 2} ${h - 1.3} Q${w * 0.38} ${h - 0.4} 1.2 ${h} Q0 ${h} 0 ${h - 1.2} Z`;
// // //   }
// // //   // molar: two bumps with a dip in the middle
// // //   return `M0.5 0 H${w - 0.5} L${w} ${h - 1.2} Q${w} ${h} ${w - 1.4} ${h} Q${w * 0.68} ${h - 1.4} ${w / 2} ${h - 0.7} Q${w * 0.32} ${h - 1.4} 1.4 ${h} Q0 ${h} 0 ${h - 1.2} Z`;
// // // };

// // // // const SideBite = ({ id, flip }) => {
// // // //   // from the back of the mouth (left) to the front (right)
// // // //   const TEETH = [
// // // //     { type: "molar", w: 6 },
// // // //     { type: "molar", w: 6 },
// // // //     { type: "premolar", w: 4.8 },
// // // //     { type: "premolar", w: 4.8 },
// // // //     { type: "canine", w: 4.4 },
// // // //     { type: "incisor", w: 4 },
// // // //     { type: "incisor", w: 4 },
// // // //   ];
// // // //   const GAP = 0.4;
// // // //   const X0 = 6;          // where the first tooth starts
// // // //   const BITE_GAP = 1.2;  // gap between the upper and lower teeth

// // // //   // top and bottom edge of the tooth strip (the gap between the two gums)
// // // //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// // // //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;

// // // //   let x = X0;
// // // //   const placed = TEETH.map((t) => {
// // // //     const item = { ...t, x };
// // // //     x += t.w + GAP;
// // // //     return item;
// // // //   });

// // // //   return (
// // // //     <svg {...jawProps}>
// // // //       <Defs id={id} />
// // // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // // //         {placed.map((t, i) => {
// // // //           const top = topEdge(t.x + t.w / 2) - 0.5;
// // // //           const bottom = botEdge(t.x + t.w / 2) + 0.5;
// // // //           const mid = (top + bottom) / 2;
// // // //           const upperH = mid - BITE_GAP / 2 - top;
// // // //           const lowerH = bottom - (mid + BITE_GAP / 2);
// // // //           const style = {
// // // //             fill: `url(#tooth-${id})`,
// // // //             stroke: EDGE,
// // // //             strokeWidth: 0.4,
// // // //           };

// // // //           return (
// // // //             <g key={i}>
// // // //               {/* upper tooth */}
// // // //               <path transform={`translate(${t.x} ${top})`} d={toothPath(t.type, t.w, upperH)} {...style} />
// // // //               {/* lower tooth: the same shape turned upside down */}
// // // //               <path
// // // //                 transform={`translate(${t.x} ${bottom}) scale(1 -1)`}
// // // //                 d={toothPath(t.type, t.w, lowerH)}
// // // //                 {...style}
// // // //               />
// // // //             </g>
// // // //           );
// // // //         })}

// // // //         {/* upper gum */}
// // // //         <path
// // // //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// // // //           fill={`url(#gum-${id})`}
// // // //         />

// // // //         {/* lower gum */}
// // // //         <path
// // // //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // // //           fill={`url(#gum-${id})`}
// // // //         />
// // // //       </g>
// // // //     </svg>
// // // //   );
// // // // };


// // // const SideBite = ({ id, flip }) => {
// // //   // from the back of the mouth (left) to the front (right)
// // //   const TEETH = [
// // //     { w: 6, rx: 1.8, ext: 0 },     // molar
// // //     { w: 6, rx: 1.8, ext: 0 },     // molar
// // //     { w: 4.8, rx: 1.5, ext: 0 },   // premolar
// // //     { w: 4.8, rx: 1.5, ext: 0 },   // premolar
// // //     { w: 4.4, rx: 2.2, ext: 0.7 }, // canine (a little taller, rounder)
// // //     { w: 4, rx: 1, ext: 0 },       // incisor
// // //     { w: 4, rx: 1, ext: 0 },       // incisor
// // //   ];
// // //   const GAP = 0.4;
// // //   const X0 = 6;          // where the first tooth starts
// // //   const BITE_GAP = 1.2;  // the centre gap, the same for every tooth

// // //   // top and bottom edge of the tooth strip
// // //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// // //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;
// // //   const midEdge = (x) => (topEdge(x) + botEdge(x)) / 2; // the centre line

// // //   let x = X0;
// // //   const placed = TEETH.map((t) => {
// // //     const item = { ...t, x };
// // //     x += t.w + GAP;
// // //     return item;
// // //   });

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />
// // //       <defs>
// // //         {/* one straight cut through all the teeth = one equal gap */}
// // //         <mask id={`bite-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="40">
// // //           <rect x="0" y="0" width="48" height="40" fill="white" />
// // //           <line x1="0" y1={midEdge(0)} x2="48" y2={midEdge(48)} stroke="black" strokeWidth={BITE_GAP} />
// // //         </mask>
// // //       </defs>

// // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // //         <g mask={`url(#bite-${id})`}>
// // //           {placed.map((t, i) => {
// // //             const cx = t.x + t.w / 2;
// // //             const top = topEdge(cx) - 0.5 - t.ext;
// // //             const bottom = botEdge(cx) + 0.5 + t.ext;
// // //             return (
// // //               <rect
// // //                 key={i}
// // //                 x={t.x}
// // //                 y={top}
// // //                 width={t.w}
// // //                 height={bottom - top}
// // //                 rx={t.rx}
// // //                 fill={`url(#tooth-${id})`}
// // //                 stroke={EDGE}
// // //                 strokeWidth={0.4}
// // //               />
// // //             );
// // //           })}
// // //         </g>

// // //         {/* upper gum */}
// // //         <path
// // //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />

// // //         {/* lower gum */}
// // //         <path
// // //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />
// // //       </g>
// // //     </svg>
// // //   );
// // // };



// // // const LeftIcon = () => <SideBite id="left" />;
// // // const RightIcon = () => <SideBite id="right" flip />;

// // // // ---------- Top / Bottom ----------
// // // const ArchJaw = ({ id, lower }) => {
// // //   const CX = 24, CY = 22, RX = 15, RY = 17, COUNT = 14;
// // //   const outline = `M${CX - RX} ${CY + 0} V${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} V${CY + 0}`;
// // //   // gum band, moved inward so less gum sticks out on the outer side
// // // const GR = 1.5;
// // // const gumOutline = `M${CX - RX + GR} ${CY + 0} V${CY} A${RX - GR} ${RY - GR} 0 0 1 ${CX + RX - GR} ${CY} V${CY + 0}`;

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />
// // //       <g transform={lower ? "translate(0 40) scale(1 -1)" : undefined}>
// // //         {/* {!lower && <path d={`${outline} Z`} fill="#f8a29d" />} */}
// // //         <path d={outline} fill="none" stroke={`url(#gum-${id})`} strokeWidth={6} />
// // //         {Array.from({ length: COUNT }, (_, i) => {
// // //           const t = ((i + 0.5) * Math.PI) / COUNT;
// // //           const x = CX - RX * Math.cos(t);
// // //           const y = CY - RY * Math.sin(t);
// // //           const angle = (Math.atan2(-RY * Math.cos(t), RX * Math.sin(t)) * 180) / Math.PI;
// // //           return (
// // //             <rect
// // //               key={i}
// // //               x={-1.9}
// // //               y={-2.4}
// // //               width={3.8}
// // //               height={3.8}
// // //               rx={1.4}
// // //               fill={`url(#tooth-${id})`}
// // //               stroke={EDGE}
// // //               strokeWidth={0.5}
// // //               transform={`translate(${x} ${y}) rotate(${angle})`}
// // //             />
// // //           );
// // //         })}
// // //       </g>
// // //     </svg>
// // //   );
// // // };
// // // const TopIcon = () => <ArchJaw id="top" />;
// // // const BottomIcon = () => <ArchJaw id="bottom" lower />;



// // // const VIEW_ICONS = {
// // //   "Front View": <FrontIcon />,
// // //   "Back View": <BackIcon />,
// // //   "Top View": (
// // //   <span style={{ display: "flex", transform: "translateY(-5px)" }}>
// // //     <BottomIcon />
// // //   </span>
// // // ),
// // // "Bottom View": (
// // //   <span style={{ display: "flex", transform: "translateY(5px)" }}>
// // //     <TopIcon />
// // //   </span>
// // // ),

// // //   "Left View": <RightIcon />,     // swapped
// // //   "Right View": <LeftIcon />,     // swapped
// // // };

  

// // // export default function TopBar({
// // //   upperName,
// // //   lowerName,
// // //   onUpperSelected,
// // //   onLowerSelected,
// // //   onIdentifyLat,
// // //    onSegment,
// // //   onAutomaticSetup,
// // //   onInitialPosition,
// // //   onFinalPosition,
// // //   setupReady,
// // //   view,
// // //   onToolClick,
// // //   onViewChange,
// // //   busy,
// // //   progress,
// // //   message,
// // // }) {
// // //   // const [activeTab, setActiveTab] = useState("File");
// // //   const [activeTab, setActiveTab] = useState("Clean Model"); // the second bar no longer has a File page
// // // const [showFileDialog, setShowFileDialog] = useState(false);
// // //    const [activeView, setActiveView] = useState(null); // the view button shown in blue
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
// // //             // onClick={() => setActiveTab(tab)}

// // //           onClick={() => {
// // //          setActiveTab(tab);
// // //          if (tab === "Automatic Setup" && onAutomaticSetup) onAutomaticSetup();
// // //           }}

// // //             style={{
// // //               ...styles.tabButton,
// // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // //             }}
// // //           >
// // //             {tab}
// // //           </button>
// // //         ))}

// // //         {/* normal messages (errors etc.) */}
// // //         {message && <span style={styles.message}>{message}</span>}
// // //       </div>

// // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // //       <div style={styles.secondBar}>
// // //         {activeTab === "File" && (
// // //           <>
// // //             <div style={styles.row}>
// // //               {/* <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // //                 Browse
// // //               </button> */}

// // //               <button
// // //          data-active={!!upperName}
// // //           style={{
// // //           ...styles.browseButton,
// // //             background: upperName ? ACTIVE_COLOR : "transparent",
// // //         }}
// // //          onClick={() => upperInputRef.current.click()}
// // //        onMouseEnter={hoverOn}
// // //        onMouseLeave={hoverOff}
// // //          >
// // //           Browse
// // //        </button>
              
            

// // //               <span style={styles.label}>
// // //                 Upload Upper Scan <span style={styles.required}>*</span>
// // //               </span>
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
// // //               {/* <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // //                 Browse
// // //               </button> */}

// // //             <button
// // //          data-active={!!lowerName}
// // //           style={{
// // //       ...styles.browseButton,
// // //       background: lowerName ? ACTIVE_COLOR : "transparent",
// // //       }}
// // //       onClick={() => lowerInputRef.current.click()}
// // //       onMouseEnter={hoverOn}
// // //         onMouseLeave={hoverOff}
// // //         >
// // //     Browse
// // //    </button>

// // //               <span style={styles.label}>
// // //                 Upload Lower Scan <span style={styles.required}>*</span>
// // //               </span>
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
// // //           <div style={styles.toolRow}>
// // //             {/* {CLEAN_MODEL_TOOLS.map((tool) => (
// // //               <button
// // //              key={tool}
// // //             style={styles.toolButton}
// // //             onClick={() => onToolClick && onToolClick(tool)}
// // //              onMouseEnter={hoverOn}
// // //              onMouseLeave={hoverOff}
// // //             >
// // //                 {tool}
// // //               </button>
// // //             ))} */}

// // //            {CLEAN_MODEL_TOOLS.map((tool) => {
// // //           const isActive = view === TOOL_VIEW[tool];
// // //      return (
// // //     <button
// // //       key={tool}
// // //       data-active={isActive}
// // //       style={{ ...styles.toolButton, background: isActive ? ACTIVE_COLOR : "transparent" }}
// // //       onClick={() => onToolClick && onToolClick(tool)}
// // //       onMouseEnter={hoverOn}
// // //       onMouseLeave={hoverOff}
// // //     >
// // //       {tool}
// // //     </button>
// // //   );
// // // })}
          

// // //           </div>
// // //         )}

// // //         {activeTab === "Segment" && (
// // //           <div style={styles.toolRow}>
// // //            {/* <button
// // //             style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // //            disabled={busy}
// // //            onClick={onIdentifyLat}
// // //           onMouseEnter={hoverOn}
// // //            onMouseLeave={hoverOff}
// // //            >
// // //               Identify LAT
// // //             </button> */}

// // //           <button
// // //   data-active={view === "identifyLat"}
// // //   style={{
// // //     ...styles.toolButton,
// // //     background: view === "identifyLat" ? ACTIVE_COLOR : "transparent",
// // //     opacity: busy ? 0.5 : 1,
// // //   }}
// // //   disabled={busy}
// // //   onClick={onIdentifyLat}
// // //   onMouseEnter={hoverOn}
// // //   onMouseLeave={hoverOff}
// // // >
// // //   Identify LAT
// // // </button>
           

// // //             {/* <button
// // //           style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // //           disabled={busy}
// // //           onClick={onSegment}>
// // //           Segment
// // //          </button> */}

// // //          <button
// // //   data-active={view === "segment"}
// // //   style={{
// // //     ...styles.toolButton,
// // //     background: view === "segment" ? ACTIVE_COLOR : "transparent",
// // //     opacity: busy ? 0.5 : 1,
// // //   }}
// // //   disabled={busy}
// // //   onClick={onSegment}
// // //   onMouseEnter={hoverOn}
// // //   onMouseLeave={hoverOff}
// // // >
// // //   Segment
// // // </button>
        

// // //           </div>
// // //         )}

// // //      {activeTab === "Automatic Setup" && setupReady && (
// // //   <div style={styles.toolRow}>
// // //     {/* <button
// // //       style={{
// // //         ...styles.toolButton,
// // //         // background: view === "segment" ? "#4f8cff" : "#5a5a5a",
// // //         background: view === "segment" ? "#4f8cff" : "transparent",
// // //         opacity: busy ? 0.5 : 1,
// // //       }}
// // //       disabled={busy}
// // //       onClick={onInitialPosition}
// // //     >
// // //       Initial Position
// // //     </button> */}

// // //    <button
// // //   data-active={view === "segment"}
// // //   style={{
// // //     ...styles.toolButton,
// // //     background: view === "segment" ? ACTIVE_COLOR : "transparent",
// // //     opacity: busy ? 0.5 : 1,
// // //   }}
// // //   disabled={busy}
// // //   onClick={onInitialPosition}
// // //   onMouseEnter={hoverOn}
// // //   onMouseLeave={hoverOff}
// // // >
// // //   Initial Position
// // // </button>


// // //     {/* <button
// // //       style={{
// // //         ...styles.toolButton,
// // //         // background: view === "automaticSetup" ? "#4f8cff" : "#5a5a5a",
// // //         background: view === "automaticSetup" ? "#4f8cff" : "transparent",
// // //         opacity: busy ? 0.5 : 1,
// // //       }}
// // //       disabled={busy}
// // //       onClick={onFinalPosition}
// // //     >
// // //       Final Position
// // //     </button> */}

// // //     <button
// // //   data-active={view === "automaticSetup"}
// // //   style={{
// // //     ...styles.toolButton,
// // //     background: view === "automaticSetup" ? ACTIVE_COLOR : "transparent",
// // //     opacity: busy ? 0.5 : 1,
// // //   }}
// // //   disabled={busy}
// // //   onClick={onFinalPosition}
// // //   onMouseEnter={hoverOn}
// // //   onMouseLeave={hoverOff}
// // // >
// // //   Final Position
// // // </button>
// // //   </div>
// // // )}


// // //         {/* progress bar: centered inside the second bar */}
// // //         {progress && (
// // //           <div style={styles.progressWrapper}>
// // //             <ProgressBar percent={progress.percent} label={progress.label} />
// // //           </div>
// // //         )}
// // //       </div>

// // //            <div style={styles.thirdBar}>
// // //   {/* {VIEWS.map((v) => (
// // //     <button
// // //       key={v}
// // //       style={{
// // //         ...styles.viewButton,
// // //         background: activeView === v ? "#4f8cff" : "transparent",
// // //         color: activeView === v ? "#ffffff" : "#ffffff",
// // //       }}
// // //       onClick={() => {
// // //         setActiveView(v);
// // //         onViewChange && onViewChange(v);
// // //       }}
// // //     >
// // //       {VIEW_ICONS[v]}
// // //       <span style={styles.viewLabel}>{v}</span>
// // //     </button>
// // //   ))} */}

// // // {VIEWS.map((v) => {
// // //   const isActive = activeView === v;
// // //   return (
// // //     <button
// // //       key={v}
// // //       data-active={isActive}
// // //       style={{
// // //         ...styles.viewButton,
// // //         background: isActive ? ACTIVE_COLOR : "transparent",
// // //         color: "#ffffff",
// // //       }}
// // //       onClick={() => {
// // //         setActiveView(v);
// // //         onViewChange && onViewChange(v);
// // //       }}
// // //       onMouseEnter={hoverOn}
// // //       onMouseLeave={hoverOff}
// // //     >
// // //       {VIEW_ICONS[v]}
// // //       <span style={styles.viewLabel}>{v}</span>
// // //     </button>
// // //   );
// // // })}

// // // </div>


                   
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
// // //     color: "#ffffff",
// // //     fontSize: 14,
// // //   },
// // //   // secondBar: {
// // //   //   position: "relative", // needed to center the progress bar inside this bar
// // //   //   minHeight: 100,
// // //   //   background: "#3b3b3b",
// // //   //   padding: "12px 16px",
// // //   //   display: "flex",
// // //   //   flexDirection: "column",
// // //   //   justifyContent: "center",
// // //   //   gap: 12,
// // //   //   boxSizing: "border-box",
// // //   // },

// // //   secondBar: {
// // //   position: "relative",
// // //   height: 70,                 // fixed height instead of minHeight
// // //   background: "#3b3b3b",
// // //   padding: "0 16px",          // no top/bottom padding, so centering is exact
// // //   display: "flex",
// // //   flexDirection: "column",
// // //   justifyContent: "center",   // centers the buttons vertically
// // //   gap: 8,                     // space between the two File rows
// // //   boxSizing: "border-box",
// // // },

// // //   progressWrapper: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     display: "flex",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     pointerEvents: "none", // clicks go through to the buttons below
// // //   },
// // //   row: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 14,
// // //   },
// // //   // browseButton: {
// // //   //   padding: "6px 16px",
// // //   //   background: "#5a5a5a",
// // //   //   color: "white",
// // //   //   border: "1px solid #777",
// // //   //   borderRadius: 4,
// // //   //   cursor: "pointer",
// // //   //   fontSize: 14,
// // //   // },

// // // browseButton: {
// // //   padding: "6px 16px",
// // //   background: "transparent",   // was "#5a5a5a"
// // //   color: "white",
// // //   border: "none",              // was "1px solid #777"
// // //   borderRadius: 4,
// // //   cursor: "pointer",
// // //   fontSize: 14,
// // // },

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
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 1,
// // //   },
// // //   // toolButton: {
// // //   //   padding: "10px 22px",
// // //   //   background: "#5a5a5a",
// // //   //   color: "white",
// // //   //   border: "1px solid #777",
// // //   //   borderRadius: 4,
// // //   //   cursor: "pointer",
// // //   //   fontSize: 14,
// // //   // },

// // // // toolButton: {
// // // //   padding: "10px 22px",
// // // //   background: "transparent",   // was "#5a5a5a"
// // // //   color: "white",
// // // //   border: "none",              // was "1px solid #777"
// // // //   borderRadius: 4,
// // // //   cursor: "pointer",
// // // //   fontSize: 14,
// // // // },


// // // toolButton: {
// // //   height: 72,            // taller than wide = vertical box
// // //   minWidth: 64,
// // //   padding: "0 10px",
// // //   background: "transparent",
// // //   color: "white",
// // //   border: "none",
// // //   borderRadius: 8,
// // //   cursor: "pointer",
// // //   fontSize: 14,
// // // },



// // //   //   thirdBar: {
// // //   //   height: 44,
// // //   //   background: "#6b6b6b", // grey
// // //   //   display: "flex",
// // //   //   alignItems: "center",
// // //   //   justifyContent: "center",
// // //   //   padding: "0 16px",
// // //   //   gap: 12,
// // //   //   boxSizing: "border-box",
// // //   // },
// // //   // viewButton: {
// // //   //   padding: "6px 16px",
// // //   //   background: "#8a8a8a",
// // //   //   color: "white",
// // //   //   border: "1px solid #a0a0a0",
// // //   //   borderRadius: 4,
// // //   //   cursor: "pointer",
// // //   //   fontSize: 14,
// // //   // },


// // //   thirdBar: {
// // //   minHeight: 56,
// // //   background: "#0b0b0b",
// // //   display: "flex",
// // //   alignItems: "center",
// // //   justifyContent: "center",
// // //   padding: "6px 16px",
// // //   gap: 6,
// // //   boxSizing: "border-box",
// // // },
// // // viewButton: {
// // //   display: "flex",
// // //   flexDirection: "column",
// // //   alignItems: "center",
// // //   gap: 4,
// // //   padding: "3px 8px",
// // //   border: "none",
// // //   borderRadius: 6,
// // //   cursor: "pointer",
// // //   minWidth: 60,
// // // },
// // // viewLabel: {
// // //   fontSize: 12,
// // // },

// // // };








// // import { useRef, useState } from "react";
// // import ProgressBar from "./ProgressBar.jsx";

// // const TABS = ["File", "Clean Model", "Segment", "Setup"];
// // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];
// // const VIEWS = ["Front View", "Back View", "Top View", "Bottom View", "Left View", "Right View"];

// // const ACTIVE_COLOR = "#4f8cff";
// // const VIEW_ACTIVE_COLOR = "#6b6b6b";
// // const HOVER_COLOR = "#505050";

// // // hover shows a grey box, but never replaces the blue of the active button
// // const hoverOn = (e) => {
// //   if (e.currentTarget.dataset.active !== "true") e.currentTarget.style.background = HOVER_COLOR;
// // };
// // const hoverOff = (e) => {
// //   e.currentTarget.style.background =
// //     e.currentTarget.dataset.active === "true" ? ACTIVE_COLOR : "transparent";
// // };

// // const DONE_COLOR = "#000000"; // second bar: the clicked button

// // // hover for the second bar buttons: grey only when the button has no color of its own
// // const toolHoverOn = (e) => {
// //   if (e.currentTarget.dataset.bg === "transparent") e.currentTarget.style.background = HOVER_COLOR;
// // };
// // const toolHoverOff = (e) => {
// //   e.currentTarget.style.background = e.currentTarget.dataset.bg;
// // };


// // // which view each Clean Model tool shows
// // const TOOL_VIEW = {
// //   "Clean Model": "cleanModel",
// //   "Generate Trimline": "generateTrimline",
// //   "Trim Model": "trimModel",
// //   "Add Base": "addBase",
// // };

// // // =====================================================================
// // // View icons (the size of all six icons is set by jawProps)
// // // =====================================================================
// // const jawProps = {
// //   width: 34,
// //   height: 30,
// //   viewBox: "0 0 48 40",
// //   strokeLinecap: "round",
// //   strokeLinejoin: "round",
// // };

// // const EDGE = "#c9cfd8";

// // const Defs = ({ id, dim }) => (
// //   <defs>
// //     <linearGradient id={`gum-${id}`} x1="0" y1="0" x2="0" y2="1">
// //       <stop offset="0" stopColor="#ff9f99" />
// //       <stop offset="0.5" stopColor="#f26f6a" />
// //       <stop offset="1" stopColor="#d44d4d" />
// //     </linearGradient>
// //     <linearGradient id={`tooth-${id}`} x1="0" y1="0" x2="0" y2="1">
// //       <stop offset="0" stopColor="#ffffff" />
// //       <stop offset="1" stopColor={dim ? "#d3d8e0" : "#e8ecf1"} />
// //     </linearGradient>
// //   </defs>
// // );

// // // teeth of one row, from the left premolar to the right premolar
// // const FRONT_TEETH = [
// //   { type: "premolar", w: 4.2 },
// //   { type: "canine", w: 4.0 },
// //   { type: "lateral", w: 3.6 },
// //   { type: "central", w: 4.8 },
// //   { type: "central", w: 4.8 },
// //   { type: "lateral", w: 3.6 },
// //   { type: "canine", w: 4.0 },
// //   { type: "premolar", w: 4.2 },
// // ];

// // // gives every tooth its x position and its center, so the row is centered
// // const placeFrontTeeth = (gap) => {
// //   const total = FRONT_TEETH.reduce((s, t) => s + t.w, 0) + gap * (FRONT_TEETH.length - 1);
// //   let x = 24 - total / 2;
// //   return FRONT_TEETH.map((t) => {
// //     const item = { ...t, x, cx: x + t.w / 2 };
// //     x += t.w + gap;
// //     return item;
// //   });
// // };

// // // one tooth in its own box: flat on the gum side (y = 0), rounded at the biting edge (y = h)
// // const frontToothPath = (type, w, h) => {
// //   const r = { central: 1.2, lateral: 1.8, canine: w / 2, premolar: 1.6 }[type];
// //   return `M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
// // };

// // // ---------- Front / Back ----------
// // const FrontJaw = ({ id, dim, gum, base, toothH }) => {
// //   const teeth = placeFrontTeeth(0.35);
// //   const half = (
// //     <>
// //       {teeth.map((t, i) => {
// //         const u = (t.cx - 24) / 20;
// //         const yt = base + 4 * (1 - u * u);
// //         return (
// //           <path
// //             key={i}
// //             d={frontToothPath(t.type, t.w, toothH + 1.5)}
// //             transform={`rotate(${-u * 6} ${t.cx} ${yt}) translate(${t.x} ${yt - 1.5})`}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         );
// //       })}
// //       <path d={gum} fill={`url(#gum-${id})`} />
// //     </>
// //   );
// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} dim={dim} />
// //       <g transform="translate(24 20) scale(0.88) translate(-24 -20)">
// //         {half}
// //         <g transform="translate(0 40) scale(1 -1)">{half}</g>
// //       </g>
// //     </svg>
// //   );
// // };

// // const FrontIcon = () => {
// //   const id = "front";
// //   const teeth = placeFrontTeeth(0.3);
// //   const style = { fill: `url(#tooth-${id})`, stroke: EDGE, strokeWidth: 0.5 };

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />

// //       {/* lower teeth: the same shapes turned upside down */}
// //       {teeth.map((t, i) => {
// //         const u = (t.cx - 24) / 18;
// //         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
// //         return (
// //           <path
// //             key={"l" + i}
// //             transform={`translate(${t.x} 32) scale(1 -1)`}
// //             d={frontToothPath(t.type, t.w, 32 - top)}
// //             {...style}
// //           />
// //         );
// //       })}

// //       {/* lower gum: the upper gum flipped upside down */}
// //       <path
// //         transform="translate(0 40) scale(1 -1)"
// //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// //         fill={`url(#gum-${id})`}
// //       />

// //       {/* upper teeth */}
// //       {teeth.map((t, i) => {
// //         const u = (t.cx - 24) / 18;
// //         const bottom = 18 + 2 * (1 - u * u);
// //         return (
// //           <path
// //             key={"u" + i}
// //             transform={`translate(${t.x} 8)`}
// //             d={frontToothPath(t.type, t.w, bottom - 8)}
// //             {...style}
// //           />
// //         );
// //       })}

// //       {/* upper gum */}
// //       <path
// //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// //         fill={`url(#gum-${id})`}
// //       />
// //     </svg>
// //   );
// // };

// // const BackIcon = () => (
// //   <FrontJaw
// //     id="back"
// //     dim
// //     base={9.5}
// //     toothH={6.5}
// //     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 10.5 41 10.5 Q24 16 7 10.5 Q3 10.5 3 6 Z"
// //   />
// // );

// // // ---------- Left / Right ----------
// // const SideBite = ({ id, flip }) => {
// //   // from the back of the mouth (left) to the front (right)
// //   const TEETH = [
// //     { w: 6, rx: 1.8, ext: 0 }, // molar
// //     { w: 6, rx: 1.8, ext: 0 }, // molar
// //     { w: 4.8, rx: 1.5, ext: 0 }, // premolar
// //     { w: 4.8, rx: 1.5, ext: 0 }, // premolar
// //     { w: 4.4, rx: 2.2, ext: 0.7 }, // canine (a little taller, rounder)
// //     { w: 4, rx: 1, ext: 0 }, // incisor
// //     { w: 4, rx: 1, ext: 0 }, // incisor
// //   ];
// //   const GAP = 0.4;
// //   const X0 = 6; // where the first tooth starts
// //   const BITE_GAP = 1.2; // the centre gap, the same for every tooth

// //   // top and bottom edge of the tooth strip
// //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;
// //   const midEdge = (x) => (topEdge(x) + botEdge(x)) / 2; // the centre line

// //   let x = X0;
// //   const placed = TEETH.map((t) => {
// //     const item = { ...t, x };
// //     x += t.w + GAP;
// //     return item;
// //   });

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <defs>
// //         {/* one straight cut through all the teeth = one equal gap */}
// //         <mask id={`bite-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="40">
// //           <rect x="0" y="0" width="48" height="40" fill="white" />
// //           <line x1="0" y1={midEdge(0)} x2="48" y2={midEdge(48)} stroke="black" strokeWidth={BITE_GAP} />
// //         </mask>
// //       </defs>

// //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// //         <g mask={`url(#bite-${id})`}>
// //           {placed.map((t, i) => {
// //             const cx = t.x + t.w / 2;
// //             const top = topEdge(cx) - 0.5 - t.ext;
// //             const bottom = botEdge(cx) + 0.5 + t.ext;
// //             return (
// //               <rect
// //                 key={i}
// //                 x={t.x}
// //                 y={top}
// //                 width={t.w}
// //                 height={bottom - top}
// //                 rx={t.rx}
// //                 fill={`url(#tooth-${id})`}
// //                 stroke={EDGE}
// //                 strokeWidth={0.4}
// //               />
// //             );
// //           })}
// //         </g>

// //         {/* upper gum */}
// //         <path
// //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// //           fill={`url(#gum-${id})`}
// //         />

// //         {/* lower gum */}
// //         <path
// //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// //           fill={`url(#gum-${id})`}
// //         />
// //       </g>
// //     </svg>
// //   );
// // };

// // const LeftIcon = () => <SideBite id="left" />;
// // const RightIcon = () => <SideBite id="right" flip />;

// // // ---------- Top / Bottom ----------
// // const ArchJaw = ({ id, lower }) => {
// //   const CX = 24, CY = 22, RX = 15, RY = 17, COUNT = 14;
// //   const outline = `M${CX - RX} ${CY} V${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} V${CY}`;

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <g transform={lower ? "translate(0 40) scale(1 -1)" : undefined}>
// //         <path d={outline} fill="none" stroke={`url(#gum-${id})`} strokeWidth={6} />
// //         {Array.from({ length: COUNT }, (_, i) => {
// //           const t = ((i + 0.5) * Math.PI) / COUNT;
// //           const x = CX - RX * Math.cos(t);
// //           const y = CY - RY * Math.sin(t);
// //           const angle = (Math.atan2(-RY * Math.cos(t), RX * Math.sin(t)) * 180) / Math.PI;
// //           return (
// //             <rect
// //               key={i}
// //               x={-1.9}
// //               y={-2.4}
// //               width={3.8}
// //               height={3.8}
// //               rx={1.4}
// //               fill={`url(#tooth-${id})`}
// //               stroke={EDGE}
// //               strokeWidth={0.5}
// //               transform={`translate(${x} ${y}) rotate(${angle})`}
// //             />
// //           );
// //         })}
// //       </g>
// //     </svg>
// //   );
// // };
// // const TopIcon = () => <ArchJaw id="top" />;
// // const BottomIcon = () => <ArchJaw id="bottom" lower />;

// // const VIEW_ICONS = {
// //   "Front View": <FrontIcon />,
// //   "Back View": <BackIcon />,
// //   "Top View": (
// //     <span style={{ display: "flex", transform: "translateY(-5px)" }}>
// //       <BottomIcon />
// //     </span>
// //   ),
// //   "Bottom View": (
// //     <span style={{ display: "flex", transform: "translateY(5px)" }}>
// //       <TopIcon />
// //     </span>
// //   ),
// //   "Left View": <RightIcon />, // swapped
// //   "Right View": <LeftIcon />, // swapped
// // };

// // // =====================================================================
// // // The top bars
// // // =====================================================================
// // export default function TopBar({
// //   upperName,
// //   lowerName,
// //   onUpperSelected,
// //   onLowerSelected,
// //   onIdentifyLat,
// //   onSegment,
// //   onAutomaticSetup,
// //   onInitialPosition,
// //   onFinalPosition,
// //   setupReady,
// //   view,
// //   onToolClick,
// //   onViewChange,
// //   busy,
// //   progress,
// //   message,
// //     showGrid,
// //   onToggleGrid,
// //   gridSize,
// //   onGridSizeChange,
// //     showSuperimpose,
// //   onToggleSuperimpose,

// // }) {
// //   // the second bar shows the tools of this tab (File has no page there, it opens a dialog)
// //   const [activeTab, setActiveTab] = useState("Clean Model");
// //   const [showFileDialog, setShowFileDialog] = useState(false);
// //   const [pendingUpper, setPendingUpper] = useState(null); // picked in the window, not loaded yet
// // const [pendingLower, setPendingLower] = useState(null);
// //   const [activeView, setActiveView] = useState(null); // the view button shown in blue
// //   const [clickedTool, setClickedTool] = useState(null); // the second bar button clicked last

// // // black for the clicked button, nothing for the others
// // const toolColor = (key) => (clickedTool === key ? DONE_COLOR : "transparent");

// // // the other buttons look disabled while an exe runs
// // const toolOpacity = (key) => (busy && clickedTool !== key ? 0.5 : 1);
// //   const upperInputRef = useRef(null);
// //   const lowerInputRef = useRef(null);

// //   // const handleChange = (e, callback) => {
// //   //   const file = e.target.files[0];
// //   //   if (file) callback(file);
// //   //   e.target.value = "";
// //   // };
// //   // the picked file is only kept in the window until OK is clicked
// // const handlePick = (e, setPending) => {
// //   const file = e.target.files[0];
// //   if (file) setPending(file);
// //   e.target.value = "";
// // };

// // const openFileDialog = () => {
// //   setPendingUpper(null);
// //   setPendingLower(null);
// //   setShowFileDialog(true);
// // };

// // const cancelFileDialog = () => {
// //   setPendingUpper(null);
// //   setPendingLower(null);
// //   setShowFileDialog(false);
// // };

// // const confirmFileDialog = () => {
// //   if (pendingUpper) onUpperSelected(pendingUpper);
// //   if (pendingLower) onLowerSelected(pendingLower);
// //   setPendingUpper(null);
// //   setPendingLower(null);
// //   setShowFileDialog(false);
// // };

// //   return (
// //     <div>
// //       {/* ---------- First top bar (dark black) ---------- */}
// //       <div style={styles.firstBar}>
// //         {TABS.map((tab) => {
// //           const isActive = tab === "File" ? showFileDialog : activeTab === tab;
// //           return (
// //             <button
// //               key={tab}
// //               onClick={() => {
// //                 if (tab === "File") {
// //                   // setShowFileDialog(true); // File only opens the upload window
// //                   openFileDialog(); // File only opens the upload window
// //                   return;
// //                 }
// //                 setActiveTab(tab);
// //                 if (tab === "Setup" && onAutomaticSetup) onAutomaticSetup();
// //               }}
// //               style={{
// //                 ...styles.tabButton,
// //                 background: isActive ? ACTIVE_COLOR : "#3a3a3a",
// //               }}
// //             >
// //               {tab}
// //             </button>
// //           );
// //         })}

// //         {/* normal messages (errors etc.) */}
// //         {message && <span style={styles.message}>{message}</span>}
// //       </div>

// //       {/* ---------- Second top bar (dark grey) ---------- */}
// //       <div style={styles.secondBar}>
// //         {/* {activeTab === "Clean Model" && (
// //           <div style={styles.toolRow}>
// //             {CLEAN_MODEL_TOOLS.map((tool) => {
// //               const isActive = view === TOOL_VIEW[tool];
// //               return (
// //                 <button
// //                   key={tool}
// //                   data-active={isActive}
// //                   style={{ ...styles.toolButton, background: isActive ? ACTIVE_COLOR : "transparent" }}
// //                   onClick={() => onToolClick && onToolClick(tool)}
// //                   onMouseEnter={hoverOn}
// //                   onMouseLeave={hoverOff}
// //                 >
// //                   {tool}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         )}

// //         {activeTab === "Segment" && (
// //           <div style={styles.toolRow}>
// //             <button
// //               data-active={view === "identifyLat"}
// //               style={{
// //                 ...styles.toolButton,
// //                 background: view === "identifyLat" ? ACTIVE_COLOR : "transparent",
// //                 opacity: busy ? 0.5 : 1,
// //               }}
// //               disabled={busy}
// //               onClick={onIdentifyLat}
// //               onMouseEnter={hoverOn}
// //               onMouseLeave={hoverOff}
// //             >
// //               Identify LAT
// //             </button>

// //             <button
// //               data-active={view === "segment"}
// //               style={{
// //                 ...styles.toolButton,
// //                 background: view === "segment" ? ACTIVE_COLOR : "transparent",
// //                 opacity: busy ? 0.5 : 1,
// //               }}
// //               disabled={busy}
// //               onClick={onSegment}
// //               onMouseEnter={hoverOn}
// //               onMouseLeave={hoverOff}
// //             >
// //               Segment
// //             </button>
// //           </div>
// //         )}

// //         {activeTab === "Automatic Setup" && setupReady && (
// //           <div style={styles.toolRow}>
// //             <button
// //               data-active={view === "segment"}
// //               style={{
// //                 ...styles.toolButton,
// //                 background: view === "segment" ? ACTIVE_COLOR : "transparent",
// //                 opacity: busy ? 0.5 : 1,
// //               }}
// //               disabled={busy}
// //               onClick={onInitialPosition}
// //               onMouseEnter={hoverOn}
// //               onMouseLeave={hoverOff}
// //             >
// //               Initial Position
// //             </button>

// //             <button
// //               data-active={view === "automaticSetup"}
// //               style={{
// //                 ...styles.toolButton,
// //                 background: view === "automaticSetup" ? ACTIVE_COLOR : "transparent",
// //                 opacity: busy ? 0.5 : 1,
// //               }}
// //               disabled={busy}
// //               onClick={onFinalPosition}
// //               onMouseEnter={hoverOn}
// //               onMouseLeave={hoverOff}
// //             >
// //               Final Position
// //             </button>
// //           </div>
// //         )} */}

// //         {activeTab === "Clean Model" && (
// //   <div style={styles.toolRow}>
// //     {CLEAN_MODEL_TOOLS.map((tool) => {
// //       const bg = toolColor(tool);
// //       return (
// //         <button
// //           key={tool}
// //           data-bg={bg}
// //           style={{ ...styles.toolButton, background: bg, opacity: toolOpacity(tool) }}
// //           onClick={() => {
// //             setClickedTool(tool);
// //             onToolClick && onToolClick(tool);
// //           }}
// //           onMouseEnter={toolHoverOn}
// //           onMouseLeave={toolHoverOff}
// //         >
// //           {tool}
// //         </button>
// //       );
// //     })}
// //   </div>
// // )}

// // {activeTab === "Segment" && (
// //   <div style={styles.toolRow}>
// //     <button
// //       data-bg={toolColor("identifyLat")}
// //       style={{
// //         ...styles.toolButton,
// //         background: toolColor("identifyLat"),
// //         opacity: toolOpacity("identifyLat"),
// //       }}
// //       disabled={busy}
// //       onClick={() => {
// //         setClickedTool("identifyLat");
// //         onIdentifyLat();
// //       }}
// //       onMouseEnter={toolHoverOn}
// //       onMouseLeave={toolHoverOff}
// //     >
// //       Identify LAT
// //     </button>

// //     <button
// //       data-bg={toolColor("segment")}
// //       style={{
// //         ...styles.toolButton,
// //         background: toolColor("segment"),
// //         opacity: toolOpacity("segment"),
// //       }}
// //       disabled={busy}
// //       onClick={() => {
// //         setClickedTool("segment");
// //         onSegment();
// //       }}
// //       onMouseEnter={toolHoverOn}
// //       onMouseLeave={toolHoverOff}
// //     >
// //       Segment
// //     </button>
// //   </div>
// // )}

// // {activeTab === "Setup" && setupReady && (
// //   <div style={styles.toolRow}>
// //     <button
// //       data-bg={toolColor("initial")}
// //       style={{
// //         ...styles.toolButton,
// //         background: toolColor("initial"),
// //         opacity: toolOpacity("initial"),
// //       }}
// //       disabled={busy}
// //       onClick={() => {
// //         setClickedTool("initial");
// //         onInitialPosition();
// //       }}
// //       onMouseEnter={toolHoverOn}
// //       onMouseLeave={toolHoverOff}
// //     >
// //       Initial Position
// //     </button>

// //     <button
// //       data-bg={toolColor("final")}
// //       style={{
// //         ...styles.toolButton,
// //         background: toolColor("final"),
// //         opacity: toolOpacity("final"),
// //       }}
// //       disabled={busy}
// //       onClick={() => {
// //         setClickedTool("final");
// //         onFinalPosition();
// //       }}
// //       onMouseEnter={toolHoverOn}
// //       onMouseLeave={toolHoverOff}
// //     >
// //       Final Position
// //     </button>



// //     <button
// //   data-bg={showGrid ? DONE_COLOR : "transparent"}
// //   style={{
// //     ...styles.toolButton,
// //     background: showGrid ? DONE_COLOR : "transparent",
// //   }}
// //   onClick={onToggleGrid}
// //   onMouseEnter={toolHoverOn}
// //   onMouseLeave={toolHoverOff}
// // >
// //   Grid
// // </button>



// // {showGrid && (

// // <select
// //   value={gridSize}
// //   onChange={(e) => onGridSizeChange(Number(e.target.value))}
// //   style={styles.gridSelect}
// // >
// //   <option value={1}>1 mm</option>
// //   <option value={2}>2 mm</option>
// //   <option value={5}>5 mm</option>
// // </select>

// // )}



// // <button
// //   data-bg={showSuperimpose ? DONE_COLOR : "transparent"}
// //   style={{
// //     ...styles.toolButton,
// //     background: showSuperimpose ? DONE_COLOR : "transparent",
// //   }}
// //   onClick={onToggleSuperimpose}
// //   onMouseEnter={toolHoverOn}
// //   onMouseLeave={toolHoverOff}
// // >
// //   Superimpose
// // </button>



// //   </div>
// // )}

// //         {/* progress bar: centered inside the second bar */}
// //         {progress && (
// //           <div style={styles.progressWrapper}>
// //             <ProgressBar percent={progress.percent} label={progress.label} />
// //           </div>
// //         )}
// //       </div>

// //       {/* ---------- Third bar (the six views) ---------- */}
// //       <div style={styles.thirdBar}>
// //         {/* {VIEWS.map((v) => {
// //           const isActive = activeView === v;
// //           return (
// //             <button
// //               key={v}
// //               data-active={isActive}
// //               style={{
// //                 ...styles.viewButton,
// //                 // background: isActive ? ACTIVE_COLOR : "transparent",
// //                 background: isActive ? VIEW_ACTIVE_COLOR : "transparent",
// //                 color: "#ffffff",
// //               }}
// //               onClick={() => {
// //                 setActiveView(v);
// //                 onViewChange && onViewChange(v);
// //               }}
// //               onMouseEnter={hoverOn}
// //               onMouseLeave={hoverOff}
// //             >
// //               {VIEW_ICONS[v]}
// //               <span style={styles.viewLabel}>{v}</span>
// //             </button>
// //           );
// //         })} */}

// //        {VIEWS.map((v) => {
// //   const bg = activeView === v ? VIEW_ACTIVE_COLOR : "transparent";
// //   return (
// //     <button
// //       key={v}
// //       data-bg={bg}
// //       style={{
// //         ...styles.viewButton,
// //         background: bg,
// //         color: "#ffffff",
// //       }}
// //       onClick={() => {
// //         setActiveView(v);
// //         onViewChange && onViewChange(v);
// //       }}
// //       onMouseEnter={toolHoverOn}
// //       onMouseLeave={toolHoverOff}
// //     >
// //       {VIEW_ICONS[v]}
// //       <span style={styles.viewLabel}>{v}</span>
// //     </button>
// //   );
// // })}

// //       </div>

// //       {/* ---------- Upload window (opened by the File button) ---------- */}
// //       {showFileDialog && (
// //   <div style={styles.overlay} onClick={cancelFileDialog}>
// //     <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
// //       <div style={styles.dialogTitle}>Upload Scan Files</div>

// //       <div style={styles.row}>
// //         <button
// //           data-active={!!(pendingUpper || upperName)}
// //           style={{
// //             ...styles.browseButton,
// //             background: pendingUpper || upperName ? ACTIVE_COLOR : "transparent",
// //           }}
// //           onClick={() => upperInputRef.current.click()}
// //           onMouseEnter={hoverOn}
// //           onMouseLeave={hoverOff}
// //         >
// //           Browse
// //         </button>
// //         <span style={styles.label}>
// //           Upload Upper Scan <span style={styles.required}>*</span>
// //         </span>
// //         <span style={styles.fileName}>{pendingUpper ? pendingUpper.name : upperName}</span>
// //         <input
// //           type="file"
// //           accept=".stl"
// //           ref={upperInputRef}
// //           onChange={(e) => handlePick(e, setPendingUpper)}
// //           style={{ display: "none" }}
// //         />
// //       </div>

// //       <div style={styles.row}>
// //         <button
// //           data-active={!!(pendingLower || lowerName)}
// //           style={{
// //             ...styles.browseButton,
// //             background: pendingLower || lowerName ? ACTIVE_COLOR : "transparent",
// //           }}
// //           onClick={() => lowerInputRef.current.click()}
// //           onMouseEnter={hoverOn}
// //           onMouseLeave={hoverOff}
// //         >
// //           Browse
// //         </button>
// //         <span style={styles.label}>
// //           Upload Lower Scan <span style={styles.required}>*</span>
// //         </span>
// //         <span style={styles.fileName}>{pendingLower ? pendingLower.name : lowerName}</span>
// //         <input
// //           type="file"
// //           accept=".stl"
// //           ref={lowerInputRef}
// //           onChange={(e) => handlePick(e, setPendingLower)}
// //           style={{ display: "none" }}
// //         />
// //       </div>

// //       {/* <div style={styles.dialogButtons}>
// //         <button style={styles.cancelButton} onClick={cancelFileDialog}>
// //           Cancel
// //         </button>
// //         <button style={styles.okButton} onClick={confirmFileDialog}>
// //           OK
// //         </button>
// //       </div> */}

// //           <div style={styles.dialogButtons}>
// //          <button style={styles.okButton} onClick={confirmFileDialog}>
// //          OK
// //         </button>
// //       <button style={styles.cancelButton} onClick={cancelFileDialog}>
// //       Cancel
// //      </button>
// //    </div>
// //     </div>
// //   </div>
// // )}
      
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
// //     color: "#ffffff",
// //     fontSize: 14,
// //   },
// //   secondBar: {
// //     position: "relative", // needed to center the progress bar inside this bar
// //     height: 44, // fixed height, the File page is gone so it can be short
// //     background: "#3b3b3b",
// //     padding: "0 16px",
// //     display: "flex",
// //     flexDirection: "column",
// //     justifyContent: "center", // centers the buttons vertically
// //     gap: 8,
// //     boxSizing: "border-box",
// //   },
// //   progressWrapper: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     pointerEvents: "none", // clicks go through to the buttons below
// //   },
// //   row: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 14,
// //   },
// //   browseButton: {
// //     padding: "6px 16px",
// //     background: "transparent",
// //     color: "white",
// //     border: "none",
// //     borderRadius: 4,
// //     cursor: "pointer",
// //     fontSize: 14,
// //   },
// //   label: {
// //     color: "#e0e0e0",
// //     fontSize: 14,
// //     minWidth: 150,
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
// //     gap: 1,
// //   },
// //   toolButton: {
// //     height: 34, // must be lower than the height of secondBar
// //     minWidth: 64,
// //     padding: "0 10px",
// //     background: "transparent",
// //     color: "white",
// //     border: "none",
// //     borderRadius: 8,
// //     cursor: "pointer",
// //     fontSize: 14,
// //   },
// //   thirdBar: {
// //     minHeight: 56,
// //     background: "#0b0b0b",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     padding: "6px 16px",
// //     gap: 6,
// //     boxSizing: "border-box",
// //   },
// //   viewButton: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     gap: 4,
// //     padding: "3px 8px",
// //     border: "none",
// //     borderRadius: 6,
// //     cursor: "pointer",
// //     minWidth: 60,
// //   },
// //   viewLabel: {
// //     fontSize: 12,
// //   },

// //   // ----- upload window -----
// //   overlay: {
// //     position: "fixed",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     background: "rgba(0, 0, 0, 0.5)",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     zIndex: 1000,
// //   },
// //   dialog: {
// //     background: "#3b3b3b",
// //     padding: "20px 28px",
// //     borderRadius: 8,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 16,
// //     minWidth: 300,
// //   },
// //   dialogTitle: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   // closeButton: {
// //   //   alignSelf: "flex-end",
// //   //   padding: "6px 18px",
// //   //   background: "#5a5a5a",
// //   //   color: "white",
// //   //   border: "none",
// //   //   borderRadius: 4,
// //   //   cursor: "pointer",
// //   //   fontSize: 14,
// //   // },

// //   dialogButtons: {
// //   display: "flex",
// //   justifyContent: "flex-end",
// //   gap: 10,
// // },
// // cancelButton: {
// //   padding: "6px 18px",
// //   background: "#5a5a5a",
// //   color: "white",
// //   border: "none",
// //   borderRadius: 4,
// //   cursor: "pointer",
// //   fontSize: 14,
// // },
// // okButton: {
// //   padding: "6px 24px",
// //   background: ACTIVE_COLOR,
// //   color: "white",
// //   border: "none",
// //   borderRadius: 4,
// //   cursor: "pointer",
// //   fontSize: 14,
// // },
// //   gridSelect: {
// //     height: 28,
// //     margin:"0 6px",
// //     padding: "0 6px",
// //     background: "#5a5a5a",
// //     color: "white",
// //     border: "none",
// //     borderRadius: 4,
// //     fontSize: 14,
// //     cursor: "pointer",
// //   },

// // };









// // // // // import { useRef, useState } from "react";

// // // // // const TABS = ["File", "Clean Model", "Segment"];

// // // // // export default function TopBar({
// // // // //   upperName,
// // // // //   lowerName,
// // // // //   onUpperSelected,
// // // // //   onLowerSelected,
// // // // //   message,
// // // // // }) {
// // // // //   const [activeTab, setActiveTab] = useState("File");
// // // // //   const upperInputRef = useRef(null);
// // // // //   const lowerInputRef = useRef(null);

// // // // //   const handleChange = (e, callback) => {
// // // // //     const file = e.target.files[0]; // only one file
// // // // //     if (file) callback(file);
// // // // //     e.target.value = ""; // allows selecting the same file again
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // // //       <div style={styles.firstBar}>
// // // // //         {/* {TABS.map((tab) => (
// // // // //           <button
// // // // //             key={tab}
// // // // //             onClick={() => setActiveTab(tab)}
// // // // //             style={{
// // // // //               ...styles.tabButton,
// // // // //             //   background: activeTab === tab ? "#3a3a3a" : "transparent",
// // // // //             background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // //             }}
// // // // //           >
// // // // //             {tab}
// // // // //           </button>
// // // // //         ))} */}


// // // // //         {TABS.map((tab) => (
// // // // //   <button
// // // // //     key={tab}
// // // // //     onClick={() => setActiveTab(tab)}
// // // // //     onMouseEnter={(e) => {
// // // // //       if (activeTab !== tab) e.currentTarget.style.background = "#505050";
// // // // //     }}
// // // // //     onMouseLeave={(e) => {
// // // // //       if (activeTab !== tab) e.currentTarget.style.background = "#3a3a3a";
// // // // //     }}
// // // // //     style={{
// // // // //       ...styles.tabButton,
// // // // //       background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // //     }}
// // // // //   >
// // // // //     {tab}
// // // // //   </button>
// // // // // ))}
// // // // //         {message && <span style={styles.message}>{message}</span>}
// // // // //       </div>

// // // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // // //       <div style={styles.secondBar}>
// // // // //         {activeTab === "File" && (
// // // // //           <>
// // // // //             {/* Row 1: Upper */}
// // // // //             <div style={styles.row}>
// // // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // // //                 Browse
// // // // //               </button>
// // // // //                 <span style={styles.label}>
// // // // //                Upload Upper Scan Model {!upperName && <span style={styles.required}>*</span>}
// // // // //                </span>
// // // // //               <span style={styles.fileName}>{upperName}</span>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept=".stl"
// // // // //                 ref={upperInputRef}
// // // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // // //                 style={{ display: "none" }}
// // // // //               />
// // // // //             </div>

// // // // //             {/* Row 2: Lower */}
// // // // //             <div style={styles.row}>
// // // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // // //                 Browse
// // // // //               </button>
// // // // //                 <span style={styles.label}>
// // // // //                  Upload Lower Scan Model {!lowerName && <span style={styles.required}>*</span>}
// // // // //                 </span>
// // // // //               <span style={styles.fileName}>{lowerName}</span>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept=".stl"
// // // // //                 ref={lowerInputRef}
// // // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // // //                 style={{ display: "none" }}
// // // // //               />
// // // // //             </div>
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // const styles = {
// // // // //   firstBar: {
// // // // //     height: 44,
// // // // //     background: "#0b0b0b", // dark black
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     padding: "0 12px",
// // // // //     gap: 16,
// // // // //   },
// // // // //   tabButton: {
// // // // //     padding: "8px 18px",
// // // // //     color: "white",
// // // // //     border: "none",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 15,
// // // // //   },
// // // // //   message: {
// // // // //     marginLeft: 20,
// // // // //     color: "#f38ba8",
// // // // //     fontSize: 14,
// // // // //   },
// // // // //   secondBar: {
// // // // //     minHeight: 100, // taller than the first bar (44)
// // // // //     background: "#3b3b3b", // dark grey
// // // // //     padding: "12px 16px",
// // // // //     display: "flex",
// // // // //     flexDirection: "column",
// // // // //     justifyContent: "center",
// // // // //     gap: 12,
// // // // //     boxSizing: "border-box",
// // // // //   },
// // // // //   row: {
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     gap: 14,
// // // // //   },
// // // // //   browseButton: {
// // // // //     padding: "6px 16px",
// // // // //     background: "#5a5a5a",
// // // // //     color: "white",
// // // // //     border: "1px solid #777",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 14,
// // // // //   },
// // // // //   label: {
// // // // //     color: "#e0e0e0",
// // // // //     fontSize: 14,
// // // // //     minWidth: 180,
// // // // //   },
// // // // //   required: {
// // // // //   color: "#ff4d4d", // red star
// // // // //   fontWeight: "bold",
// // // // // },
// // // // //   fileName: {
// // // // //     color: "#ffffff",
// // // // //     fontSize: 14,
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // // };






// // // // // import { useRef, useState } from "react";

// // // // // const TABS = ["File", "Clean Model", "Segment"];
// // // // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // // // export default function TopBar({
// // // // //   upperName,
// // // // //   lowerName,
// // // // //   onUpperSelected,
// // // // //   onLowerSelected,
// // // // //   onSegment,
// // // // //    onToolClick,
// // // // //   busy,
// // // // //   message,
// // // // // }) {
// // // // //   const [activeTab, setActiveTab] = useState("File");
// // // // //   const upperInputRef = useRef(null);
// // // // //   const lowerInputRef = useRef(null);

// // // // //   const handleChange = (e, callback) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) callback(file);
// // // // //     e.target.value = "";
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // // //       <div style={styles.firstBar}>
// // // // //         {TABS.map((tab) => (
// // // // //           <button
// // // // //             key={tab}
// // // // //             onClick={() => {
// // // // //               setActiveTab(tab);
// // // // //               if (tab === "Segment" && !busy) onSegment(); // Segment runs the exe
// // // // //             }}
// // // // //             style={{
// // // // //               ...styles.tabButton,
// // // // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // // //             }}
// // // // //           >
// // // // //             {tab}
// // // // //           </button>
// // // // //         ))}
// // // // //         {message && <span style={styles.message}>{message}</span>}
// // // // //       </div>

// // // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // // //       <div style={styles.secondBar}>
// // // // //         {activeTab === "File" && (
// // // // //           <>
// // // // //             <div style={styles.row}>
// // // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // // //                 Browse
// // // // //               </button>
// // // // //               {/* <span style={styles.label}>
// // // // //                 Upload Upper Scan Model <span style={styles.required}>*</span>
// // // // //               </span> */}

// // // // //               <span style={styles.label}>
// // // // //               Upload Upper Scan {!upperName && <span style={styles.required}>*</span>}
// // // // //              </span>
// // // // //               <span style={styles.fileName}>{upperName}</span>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept=".stl"
// // // // //                 ref={upperInputRef}
// // // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // // //                 style={{ display: "none" }}
// // // // //               />
// // // // //             </div>

// // // // //             <div style={styles.row}>
// // // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // // //                 Browse
// // // // //               </button>
// // // // //               {/* <span style={styles.label}>
// // // // //                 Upload Lower Scan Model <span style={styles.required}>*</span>
// // // // //               </span> */}
// // // // //               <span style={styles.label}>
// // // // //               Upload Lower Scan {!lowerName && <span style={styles.required}>*</span>}
// // // // //              </span>
// // // // //               <span style={styles.fileName}>{lowerName}</span>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 accept=".stl"
// // // // //                 ref={lowerInputRef}
// // // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // // //                 style={{ display: "none" }}
// // // // //               />
// // // // //             </div>
// // // // //           </>
// // // // //         )}

// // // // //         {activeTab === "Clean Model" && (
// // // // //          <div style={styles.toolRow}>
// // // // //     {CLEAN_MODEL_TOOLS.map((tool) => (
// // // // //       <button
// // // // //         key={tool}
// // // // //         style={styles.toolButton}
// // // // //         onClick={() => onToolClick && onToolClick(tool)}
// // // // //       >
// // // // //         {tool}
// // // // //       </button>
// // // // //     ))}
// // // // //   </div>
// // // // // )}

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // const styles = {
// // // // //   firstBar: {
// // // // //     height: 44,
// // // // //     background: "#0b0b0b",
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     padding: "0 12px",
// // // // //     gap: 16,
// // // // //   },
// // // // //   tabButton: {
// // // // //     padding: "8px 18px",
// // // // //     color: "white",
// // // // //     border: "none",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 15,
// // // // //   },
// // // // //   message: {
// // // // //     marginLeft: 20,
// // // // //     color: "#f9e2af",
// // // // //     fontSize: 14,
// // // // //   },
// // // // //   secondBar: {
// // // // //     minHeight: 100,
// // // // //     background: "#3b3b3b",
// // // // //     padding: "12px 16px",
// // // // //     display: "flex",
// // // // //     flexDirection: "column",
// // // // //     justifyContent: "center",
// // // // //     gap: 12,
// // // // //     boxSizing: "border-box",
// // // // //   },
// // // // //   row: {
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     gap: 14,
// // // // //   },
// // // // //   browseButton: {
// // // // //     padding: "6px 16px",
// // // // //     background: "#5a5a5a",
// // // // //     color: "white",
// // // // //     border: "1px solid #777",
// // // // //     borderRadius: 4,
// // // // //     cursor: "pointer",
// // // // //     fontSize: 14,
// // // // //   },
// // // // //   label: {
// // // // //     color: "#e0e0e0",
// // // // //     fontSize: 14,
// // // // //     minWidth: 120,
// // // // //   },
// // // // //   required: {
// // // // //     color: "#ff4d4d",
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // //   fileName: {
// // // // //     color: "#ffffff",
// // // // //     fontSize: 14,
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // //   toolRow: {
// // // // //   display: "flex",
// // // // //   alignItems: "center",
// // // // //   gap: 16,
// // // // // },
// // // // // toolButton: {
// // // // //   padding: "10px 22px",
// // // // //   background: "#5a5a5a",
// // // // //   color: "white",
// // // // //   border: "1px solid #777",
// // // // //   borderRadius: 4,
// // // // //   cursor: "pointer",
// // // // //   fontSize: 14,
// // // // // },
// // // // // };






// // // // import { useRef, useState } from "react";

// // // // const TABS = ["File", "Clean Model", "Segment"];
// // // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // // export default function TopBar({
// // // //   upperName,
// // // //   lowerName,
// // // //   onUpperSelected,
// // // //   onLowerSelected,
// // // //   onIdentifyLat,
// // // //   onCutTeeth,
// // // //   onToolClick,
// // // //   busy,
// // // //   message,
// // // // }) {
// // // //   const [activeTab, setActiveTab] = useState("File");
// // // //   const upperInputRef = useRef(null);
// // // //   const lowerInputRef = useRef(null);

// // // //   const handleChange = (e, callback) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) callback(file);
// // // //     e.target.value = "";
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // //       <div style={styles.firstBar}>
// // // //         {TABS.map((tab) => (
// // // //           <button
// // // //             key={tab}
// // // //             onClick={() => setActiveTab(tab)}
// // // //             style={{
// // // //               ...styles.tabButton,
// // // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // //             }}
// // // //           >
// // // //             {tab}
// // // //           </button>
// // // //         ))}
// // // //         {message && <span style={styles.message}>{message}</span>}
// // // //       </div>

// // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // //       <div style={styles.secondBar}>
// // // //         {activeTab === "File" && (
// // // //           <>
// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //               <span style={styles.label}>
// // // //                 Upload Upper Scan <span style={styles.required}>*</span>
// // // //               </span>
// // // //               <span style={styles.fileName}>{upperName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={upperInputRef}
// // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>

// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //               <span style={styles.label}>
// // // //                 Upload Lower Scan <span style={styles.required}>*</span>
// // // //               </span>
// // // //               <span style={styles.fileName}>{lowerName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={lowerInputRef}
// // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>
// // // //           </>
// // // //         )}

// // // //         {activeTab === "Clean Model" && (
// // // //           <div style={styles.toolRow}>
// // // //             {CLEAN_MODEL_TOOLS.map((tool) => (
// // // //               <button
// // // //                 key={tool}
// // // //                 style={styles.toolButton}
// // // //                 onClick={() => onToolClick && onToolClick(tool)}
// // // //               >
// // // //                 {tool}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {activeTab === "Segment" && (
// // // //           <div style={styles.toolRow}>
// // // //             <button
// // // //               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // // //               disabled={busy}
// // // //               onClick={onIdentifyLat}
// // // //             >
// // // //               Identify LAT
// // // //             </button>
// // // //              <button style={styles.toolButton}>
// // // //              Segment
// // // //             </button>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // const styles = {
// // // //   firstBar: {
// // // //     height: 44,
// // // //     background: "#0b0b0b",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     padding: "0 12px",
// // // //     gap: 16,
// // // //   },
// // // //   tabButton: {
// // // //     padding: "8px 18px",
// // // //     color: "white",
// // // //     border: "none",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 15,
// // // //   },
// // // //   message: {
// // // //     marginLeft: 20,
// // // //     color: "#f9e2af",
// // // //     fontSize: 14,
// // // //   },
// // // //   secondBar: {
// // // //     minHeight: 100,
// // // //     background: "#3b3b3b",
// // // //     padding: "12px 16px",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     justifyContent: "center",
// // // //     gap: 12,
// // // //     boxSizing: "border-box",
// // // //   },
// // // //   row: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 14,
// // // //   },
// // // //   browseButton: {
// // // //     padding: "6px 16px",
// // // //     background: "#5a5a5a",
// // // //     color: "white",
// // // //     border: "1px solid #777",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 14,
// // // //   },
// // // //   label: {
// // // //     color: "#e0e0e0",
// // // //     fontSize: 14,
// // // //     minWidth: 120,
// // // //   },
// // // //   required: {
// // // //     color: "#ff4d4d",
// // // //     fontWeight: "bold",
// // // //   },
// // // //   fileName: {
// // // //     color: "#ffffff",
// // // //     fontSize: 14,
// // // //     fontWeight: "bold",
// // // //   },
// // // //   toolRow: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 16,
// // // //   },
// // // //   toolButton: {
// // // //     padding: "10px 22px",
// // // //     background: "#5a5a5a",
// // // //     color: "white",
// // // //     border: "1px solid #777",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 14,
// // // //   },
// // // // };












// // // import { useRef, useState } from "react";
// // // import ProgressBar from "./ProgressBar.jsx";

// // // const TABS = ["File", "Clean Model", "Segment"];
// // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // export default function TopBar({
// // //   upperName,
// // //   lowerName,
// // //   onUpperSelected,
// // //   onLowerSelected,
// // //   onIdentifyLat,
// // //   onToolClick,
// // //   busy,
// // //   progress,
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
// // //             onClick={() => setActiveTab(tab)}
// // //             style={{
// // //               ...styles.tabButton,
// // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // //             }}
// // //           >
// // //             {tab}
// // //           </button>
// // //         ))}

// // //         {/* progress bar while Identify LAT works; otherwise normal messages (errors etc.) */}
// // //         {progress ? (
// // //           <ProgressBar percent={progress.percent} label={progress.label} />
// // //         ) : (
// // //           message && <span style={styles.message}>{message}</span>
// // //         )}
// // //       </div>

// // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // //       <div style={styles.secondBar}>
// // //         {activeTab === "File" && (
// // //           <>
// // //             <div style={styles.row}>
// // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // //                 Browse
// // //               </button>
// // //               <span style={styles.label}>
// // //                 Upload Upper Scan <span style={styles.required}>*</span>
// // //               </span>
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
// // //               <span style={styles.label}>
// // //                 Upload Lower Scan <span style={styles.required}>*</span>
// // //               </span>
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
// // //           <div style={styles.toolRow}>
// // //             {CLEAN_MODEL_TOOLS.map((tool) => (
// // //               <button
// // //                 key={tool}
// // //                 style={styles.toolButton}
// // //                 onClick={() => onToolClick && onToolClick(tool)}
// // //               >
// // //                 {tool}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {activeTab === "Segment" && (
// // //           <div style={styles.toolRow}>
// // //             <button
// // //               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // //               disabled={busy}
// // //               onClick={onIdentifyLat}
// // //             >
// // //               Identify LAT
// // //             </button>
// // //             <button style={styles.toolButton}>Segment</button>
// // //           </div>
// // //         )}
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
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 16,
// // //   },
// // //   toolButton: {
// // //     padding: "10px 22px",
// // //     background: "#5a5a5a",
// // //     color: "white",
// // //     border: "1px solid #777",
// // //     borderRadius: 4,
// // //     cursor: "pointer",
// // //     fontSize: 14,
// // //   },
// // // };








// // import { useRef, useState } from "react";
// // import ProgressBar from "./ProgressBar.jsx";

// // const TABS = ["File", "Clean Model", "Segment", "Automatic Setup"];
// // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];
// // const VIEWS = ["Front View", "Back View", "Top View", "Bottom View", "Left View", "Right View"];
// // // const hoverOn = (e) => (e.currentTarget.style.background = "#505050");
// // // const hoverOff = (e) => (e.currentTarget.style.background = "transparent");

// // const ACTIVE_COLOR = "#4f8cff";
// // const HOVER_COLOR = "#505050";

// // // hover shows a grey box, but never replaces the blue of the active button
// // const hoverOn = (e) => {
// //   if (e.currentTarget.dataset.active !== "true") e.currentTarget.style.background = HOVER_COLOR;
// // };
// // const hoverOff = (e) => {
// //   e.currentTarget.style.background =
// //     e.currentTarget.dataset.active === "true" ? ACTIVE_COLOR : "transparent";
// // };

// // // which view each Clean Model tool shows
// // const TOOL_VIEW = {
// //   "Clean Model": "cleanModel",
// //   "Generate Trimline": "generateTrimline",
// //   "Trim Model": "trimModel",
// //   "Add Base": "addBase",
// // };

// // const svgProps = {
// //   width: 30,
// //   height: 30,
// //   viewBox: "0 0 32 32",
// //   fill: "none",
// //   stroke: "currentColor",
// //   strokeWidth: 2,
// //   strokeLinecap: "round",
// //   strokeLinejoin: "round",
// // };

// // // two stacked jaws seen from the front or back
// // // const FrontIcon = () => (
// // //   <svg {...svgProps}>
// // //     <path d="M5 13 C5 8 27 8 27 13 C27 16 5 16 5 13 Z" />
// // //     <path d="M5 21 C5 16 27 16 27 21 C27 24 5 24 5 21 Z" />
// // //   </svg>
// // // );
// // // const BackIcon = () => (
// // //   <svg {...svgProps}>
// // //     <path d="M5 13 C5 8 27 8 27 13 C27 16 5 16 5 13 Z" />
// // //     <path d="M5 21 C5 16 27 16 27 21 C27 24 5 24 5 21 Z" />
// // //     <path d="M11 13 H21" />
// // //   </svg>
// // // );


// // // Front View: two stacked curved rectangles
// // // Front View: traced from the hand-drawn sketch
// // // Front View: two identical bands


// // const jawProps = {
// //   width: 34,
// //   height: 30,
// //   viewBox: "0 0 48 40",
// //   strokeLinecap: "round",
// //   strokeLinejoin: "round",
// // };

// // const EDGE = "#c9cfd8";

// // const Defs = ({ id, dim }) => (
// //   <defs>
// //     <linearGradient id={`gum-${id}`} x1="0" y1="0" x2="0" y2="1">
// //       <stop offset="0" stopColor="#ff9f99" />
// //       <stop offset="0.5" stopColor="#f26f6a" />
// //       <stop offset="1" stopColor="#d44d4d" />
// //     </linearGradient>
// //     <linearGradient id={`tooth-${id}`} x1="0" y1="0" x2="0" y2="1">
// //       <stop offset="0" stopColor="#ffffff" />
// //       <stop offset="1" stopColor={dim ? "#d3d8e0" : "#e8ecf1"} />
// //     </linearGradient>
// //   </defs>
// // );


// // // teeth of one row, from the left premolar to the right premolar
// // const FRONT_TEETH = [
// //   { type: "premolar", w: 4.2 },
// //   { type: "canine", w: 4.0 },
// //   { type: "lateral", w: 3.6 },
// //   { type: "central", w: 4.8 },
// //   { type: "central", w: 4.8 },
// //   { type: "lateral", w: 3.6 },
// //   { type: "canine", w: 4.0 },
// //   { type: "premolar", w: 4.2 },
// // ];

// // // gives every tooth its x position and its center, so the row is centered
// // const placeFrontTeeth = (gap) => {
// //   const total = FRONT_TEETH.reduce((s, t) => s + t.w, 0) + gap * (FRONT_TEETH.length - 1);
// //   let x = 24 - total / 2;
// //   return FRONT_TEETH.map((t) => {
// //     const item = { ...t, x, cx: x + t.w / 2 };
// //     x += t.w + gap;
// //     return item;
// //   });
// // };

// // // one tooth in its own box: flat on the gum side (y = 0), rounded at the biting edge (y = h)
// // const frontToothPath = (type, w, h) => {
// //   const r = { central: 1.2, lateral: 1.8, canine: w / 2, premolar: 1.6 }[type];
// //   return `M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
// // };

// // // ---------- Front / Back ----------
// // // const FrontJaw = ({ id, dim, gum, base, toothH }) => {
// // //   const N = 8, W = 4.4, GAP = 0.35;
// // //   const start = 24 - (N * (W + GAP) - GAP) / 2;
// // //   const half = (
// // //     <>
// // //       {Array.from({ length: N }, (_, i) => {
// // //         const cx = start + i * (W + GAP) + W / 2;
// // //         const u = (cx - 24) / 20;
// // //         const yt = base + 4 * (1 - u * u);
// // //         return (
// // //           <rect
// // //             key={i}
// // //             x={cx - W / 2}
// // //             y={yt - 1.5}
// // //             width={W}
// // //             height={toothH + 1.5}
// // //             rx={1.6}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //             transform={`rotate(${-u * 6} ${cx} ${yt})`}
// // //           />
// // //         );
// // //       })}
// // //       <path d={gum} fill={`url(#gum-${id})`} />
// // //     </>
// // //   );
// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} dim={dim} />
// // //       {half}
// // //       <g transform="translate(0 40) scale(1 -1)">{half}</g>
// // //     </svg>
// // //   );
// // // };


// // const FrontJaw = ({ id, dim, gum, base, toothH }) => {
// //   const teeth = placeFrontTeeth(0.35);
// //   const half = (
// //     <>
// //       {teeth.map((t, i) => {
// //         const u = (t.cx - 24) / 20;
// //         const yt = base + 4 * (1 - u * u);
// //         return (
// //           <path
// //             key={i}
// //             d={frontToothPath(t.type, t.w, toothH + 1.5)}
// //             transform={`rotate(${-u * 6} ${t.cx} ${yt}) translate(${t.x} ${yt - 1.5})`}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         );
// //       })}
// //       <path d={gum} fill={`url(#gum-${id})`} />
// //     </>
// //   );
// //   // return (
// //   //   <svg {...jawProps}>
// //   //     <Defs id={id} dim={dim} />
// //   //     {half}
// //   //     <g transform="translate(0 40) scale(1 -1)">{half}</g>
// //   //   </svg>
// //   // );
// //    return (
// //   <svg {...jawProps}>
// //     <Defs id={id} dim={dim} />
// //     <g transform="translate(24 20) scale(0.88) translate(-24 -20)">
// //       {half}
// //       <g transform="translate(0 40) scale(1 -1)">{half}</g>
// //     </g>
// //   </svg>
// // );

// // };



// // // const FrontIcon = () => {
// // //   const id = "front";
// // //   const N = 8;          // teeth per row
// // //   const W = 4.2;        // tooth width
// // //   const GAP = 0.3;
// // //   const start = 24 - (N * (W + GAP) - GAP) / 2;

// // //   // x center of each tooth, and how far it is from the middle (-1 to 1)
// // //   const cols = Array.from({ length: N }, (_, i) => {
// // //     const cx = start + i * (W + GAP) + W / 2;
// // //     return { cx, u: (cx - 24) / 18 };
// // //   });

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />

// // //       {/* lower teeth */}
// // //       {cols.map(({ cx, u }, i) => {
// // //         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
// // //         return (
// // //           <rect
// // //             key={"l" + i}
// // //             x={cx - W / 2}
// // //             y={top}
// // //             width={W}
// // //             height={32 - top}
// // //             rx={1.6}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         );
// // //       })}

// // //       {/* lower gum (a bit narrower at the bottom) */}
// // //       {/* <path
// // //         d="M6 30 Q24 25 42 30 Q43 38 38 38 Q24 40 10 38 Q5 38 6 30 Z"
// // //         fill={`url(#gum-${id})`}
// // //       /> */}

// // //       {/* lower gum: the upper gum flipped upside down (same shape and size) */}
// // // <path
// // //   transform="translate(0 40) scale(1 -1)"
// // //   d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// // //   fill={`url(#gum-${id})`}
// // // />


// // //       {/* upper teeth */}
// // //       {cols.map(({ cx, u }, i) => {
// // //         const bottom = 18 + 2 * (1 - u * u);
// // //         return (
// // //           <rect
// // //             key={"u" + i}
// // //             x={cx - W / 2}
// // //             y={8}
// // //             width={W}
// // //             height={bottom - 8}
// // //             rx={1.6}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         );
// // //       })}

// // //       {/* upper gum */}
// // //       <path
// // //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// // //         fill={`url(#gum-${id})`}
// // //       />
// // //     </svg>
// // //   );
// // // };


// // const FrontIcon = () => {
// //   const id = "front";
// //   const teeth = placeFrontTeeth(0.3);
// //   const style = { fill: `url(#tooth-${id})`, stroke: EDGE, strokeWidth: 0.5 };

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />

// //       {/* lower teeth: the same shapes turned upside down */}
// //       {teeth.map((t, i) => {
// //         const u = (t.cx - 24) / 18;
// //         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
// //         return (
// //           <path
// //             key={"l" + i}
// //             transform={`translate(${t.x} 32) scale(1 -1)`}
// //             d={frontToothPath(t.type, t.w, 32 - top)}
// //             {...style}
// //           />
// //         );
// //       })}

// //       {/* lower gum: the upper gum flipped upside down */}
// //       <path
// //         transform="translate(0 40) scale(1 -1)"
// //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// //         fill={`url(#gum-${id})`}
// //       />

// //       {/* upper teeth */}
// //       {teeth.map((t, i) => {
// //         const u = (t.cx - 24) / 18;
// //         const bottom = 18 + 2 * (1 - u * u);
// //         return (
// //           <path
// //             key={"u" + i}
// //             transform={`translate(${t.x} 8)`}
// //             d={frontToothPath(t.type, t.w, bottom - 8)}
// //             {...style}
// //           />
// //         );
// //       })}

// //       {/* upper gum */}
// //       <path
// //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// //         fill={`url(#gum-${id})`}
// //       />

// //        <Defs id={id} />
// //     <g transform="translate(24 20) scale(0.88) translate(-24 -20)">

// //       {/* ...everything that is already there: lower teeth, lower gum, upper teeth, upper gum... */}

// //     </g>
// //     </svg>
// //   );
// // };


// // // const FrontIcon = () => {
// // //   const id = "front";
// // //   const N = 10;      // number of teeth per row (was 8)
// // //   const UW = 3.3;    // upper tooth width (was 3.9)
// // //   const LW = 3.3;    // lower tooth width (was 3.9)
// // //   const GAP = 0.3;
// // //   const uStart = 24 - (N * (UW + GAP) - GAP) / 2;
// // //   const lStart = 24 - (N * (LW + GAP) - GAP) / 2;

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />

// // //       {/* lower teeth */}
// // //       {Array.from({ length: N }, (_, i) => {
// // //         const cx = lStart + i * (LW + GAP) + LW / 2;
// // //         const u = (cx - 24) / 20;
// // //         const top = 18.5 + 2 * (1 - u * u);
// // //         return (
// // //           <rect
// // //             key={"l" + i}
// // //             x={cx - LW / 2}
// // //             y={top}
// // //             width={LW}
// // //             height={13}
// // //             rx={1.4}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         );
// // //       })}

// // //       {/* lower gum, moved up 1.5 so it covers more of the teeth */}
// // //       <path
// // //         transform="translate(0 -1.5)"
// // //         d="M3 35 Q3 31 7 31 Q24 26.5 41 31 Q45 31 45 35 Q45 38.5 41 38 Q24 33 7 38 Q3 38.5 3 35 Z"
// // //         fill={`url(#gum-${id})`}
// // //       />

// // //       {/* upper teeth */}
// // //       {Array.from({ length: N }, (_, i) => {
// // //         const cx = uStart + i * (UW + GAP) + UW / 2;
// // //         const u = (cx - 24) / 20;
// // //         const edge = 19.5 + 2 * (1 - u * u);
// // //         return (
// // //           <rect
// // //             key={"u" + i}
// // //             x={cx - UW / 2}
// // //             y={7}
// // //             width={UW}
// // //             height={edge - 7}
// // //             rx={1.4}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         );
// // //       })}

// // //       {/* upper gum, moved down 1.5 so it covers more of the teeth */}
// // //       <path
// // //         transform="translate(0 1.5)"
// // //         d="M3 5 Q3 1.5 7 2.5 Q24 8 41 2.5 Q45 1.5 45 5 Q45 9 41 9 Q24 14 7 9 Q3 9 3 5 Z"
// // //         fill={`url(#gum-${id})`}
// // //       />
// // //     </svg>
// // //   );
// // // };


// // // const BackIcon = () => (
// // //   <FrontJaw
// // //     id="back"
// // //     dim
// // //     base={11}
// // //     toothH={5}
// // //     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 12 41 12 Q24 18 7 12 Q3 12 3 6 Z"
// // //   />
// // // );

// // const BackIcon = () => (
// //   <FrontJaw
// //     id="back"
// //     dim
// //     base={9.5}   // was 11
// //     toothH={6.5} // was 5
// //     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 10.5 41 10.5 Q24 16 7 10.5 Q3 10.5 3 6 Z"
// //   />
// // );

// // // ---------- Left / Right ----------
// // const SideJaw = ({ id, flip }) => {
// //   const N = 10, W = 3.7, GAP = 0.3;
// //   const start = 24 - (N * (W + GAP) - GAP) / 2;
// //   const half = (
// //     <>
// //       {Array.from({ length: N }, (_, i) => (
// //         <rect
// //           key={i}
// //           x={start + i * (W + GAP)}
// //           y={10.5}
// //           width={W}
// //           height={9}
// //           rx={1.5}
// //           fill={`url(#tooth-${id})`}
// //           stroke={EDGE}
// //           strokeWidth={0.5}
// //         />
// //       ))}
// //       <path
// //         d="M3 6 Q3 2 7 2 H41 Q45 2 45 6 Q45 12 41 12 H7 Q3 12 3 6 Z"
// //         fill={`url(#gum-${id})`}
// //       />
// //     </>
// //   );
// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// //         {half}
// //         <g transform="translate(-1.5 40) scale(1 -1)">{half}</g>
// //       </g>
// //     </svg>
// //   );
// // };


// // // const SideBite = ({ id, flip }) => {
// // //   // back (molars) -> front (incisors)
// // //   const W = [6.8, 6.8, 5, 5, 4.2, 3.6, 3.2];
// // //   const GAP = 0.3;
// // //   const upperBottom = [19, 19.5, 20.5, 21, 22, 21.5, 21]; // biting edge of upper teeth
// // //   const lowerTop = [21.5, 21.5, 20.5, 20, 19.5, 19.5, 20]; // top edge of lower teeth

// // //   const place = (start) => {
// // //     let x = start;
// // //     return W.map((w) => {
// // //       const px = x;
// // //       x += w + GAP;
// // //       return px;
// // //     });
// // //   };
// // //   const ux = place(5);   // upper row
// // //   const lx = place(3.8); // lower row sits slightly behind

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />
// // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // //         {/* lower teeth (drawn first, so the upper teeth overlap them) */}
// // //         {W.map((w, i) => (
// // //           <rect
// // //             key={"l" + i}
// // //             x={lx[i]}
// // //             y={lowerTop[i]}
// // //             width={w}
// // //             height={32 - lowerTop[i]}
// // //             rx={Math.min(w * 0.35, 2)}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         ))}

// // //         {/* lower gum */}
// // //         <path
// // //           d="M3 34 Q3 30.5 7 30.5 H40 Q43 30.5 43 33.5 Q43 37.5 40 37.5 H7 Q3 38 3 34 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />

// // //         {/* upper teeth */}
// // //         {W.map((w, i) => (
// // //           <rect
// // //             key={"u" + i}
// // //             x={ux[i]}
// // //             y={8}
// // //             width={w}
// // //             height={upperBottom[i] - 8}
// // //             rx={Math.min(w * 0.35, 2)}
// // //             fill={`url(#tooth-${id})`}
// // //             stroke={EDGE}
// // //             strokeWidth={0.5}
// // //           />
// // //         ))}

// // //         {/* upper gum */}
// // //         <path
// // //           d="M3 6 Q3 2.5 7 2.5 H42 Q45 2.5 45 5.5 Q45 9.5 42 9.5 H7 Q3 10 3 6 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />
// // //       </g>
// // //     </svg>
// // //   );
// // // };

// // // const LeftIcon = () => <SideBite id="left" />;
// // // const RightIcon = () => <SideBite id="right" flip />;



// // // const SideBite = ({ id, flip }) => {
// // //   const N = 7;     // teeth in the strip
// // //   const W = 5;   // tooth width
// // //   const GAP = 0.4;
// // //   const X0 = 6;    // where the first tooth starts

// // //   // top and bottom edge of the tooth strip (the gap between the two gums)
// // //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// // //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />
// // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // //         {/* teeth (they get taller towards the right, like the gap does) */}
// // //         {/* {Array.from({ length: N }, (_, i) => {
// // //           const x = X0 + i * (W + GAP);
// // //           const t = topEdge(x + W / 2);
// // //           const b = botEdge(x + W / 2);
// // //           return (
// // //             <rect
// // //               key={i}
// // //               x={x}
// // //               y={t - 0.5}
// // //               width={W}
// // //               height={b - t + 1}
// // //               rx={1.2}
// // //               fill={`url(#tooth-${id})`}
// // //               stroke={EDGE}
// // //               strokeWidth={0.4}
// // //             />
// // //           );
// // //         })} */}


// // //         {/* teeth: upper half and lower half with a small gap in the middle */}
// // // {Array.from({ length: N }, (_, i) => {
// // //   const x = X0 + i * (W + GAP);
// // //   const t = topEdge(x + W / 2) - 0.5;   // top of the tooth
// // //   const b = botEdge(x + W / 2) + 0.5;   // bottom of the tooth
// // //   const mid = (t + b) / 2;
// // //   const BITE_GAP = 1.2;                  // gap between upper and lower teeth

// // //   return (
// // //     <g key={i}>
// // //       <rect
// // //         x={x}
// // //         y={t}
// // //         width={W}
// // //         height={mid - BITE_GAP / 2 - t}
// // //         rx={1.2}
// // //         fill={`url(#tooth-${id})`}
// // //         stroke={EDGE}
// // //         strokeWidth={0.4}
// // //       />
// // //       <rect
// // //         x={x}
// // //         y={mid + BITE_GAP / 2}
// // //         width={W}
// // //         height={b - (mid + BITE_GAP / 2)}
// // //         rx={1.2}
// // //         fill={`url(#tooth-${id})`}
// // //         stroke={EDGE}
// // //         strokeWidth={0.4}
// // //       />
// // //     </g>
// // //   );
// // // })}

// // //         {/* upper gum: short on the left, taller on the right */}
// // //         <path
// // //           // d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 16 L4 18.5 Z"
// // //           // d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 15.2 L4 17.7 Z"
// // //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />

// // //         {/* lower gum */}
// // //         <path
// // //           // d="M4 21.5 L44 23 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // //           // d="M4 22.3 L44 23.8 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />
// // //       </g>
// // //     </svg>
// // //   );
// // // };


// // // tooth outline in its own box (width w, height h): the gum side is at y = 0,
// // // the chewing edge at y = h
// // const toothPath = (type, w, h) => {
// //   if (type === "incisor") {
// //     return `M0.6 0 H${w - 0.6} L${w} ${h - 1.2} Q${w} ${h} ${w - 1} ${h} H1 Q0 ${h} 0 ${h - 1.2} Z`;
// //   }
// //   if (type === "canine") {
// //     return `M0.6 0 H${w - 0.6} L${w} ${h * 0.6} Q${w} ${h * 0.75} ${w / 2} ${h} Q0 ${h * 0.75} 0 ${h * 0.6} Z`;
// //   }
// //   if (type === "premolar") {
// //     return `M0.6 0 H${w - 0.6} L${w} ${h - 1.2} Q${w} ${h} ${w - 1.2} ${h} Q${w * 0.62} ${h - 0.4} ${w / 2} ${h - 1.3} Q${w * 0.38} ${h - 0.4} 1.2 ${h} Q0 ${h} 0 ${h - 1.2} Z`;
// //   }
// //   // molar: two bumps with a dip in the middle
// //   return `M0.5 0 H${w - 0.5} L${w} ${h - 1.2} Q${w} ${h} ${w - 1.4} ${h} Q${w * 0.68} ${h - 1.4} ${w / 2} ${h - 0.7} Q${w * 0.32} ${h - 1.4} 1.4 ${h} Q0 ${h} 0 ${h - 1.2} Z`;
// // };

// // // const SideBite = ({ id, flip }) => {
// // //   // from the back of the mouth (left) to the front (right)
// // //   const TEETH = [
// // //     { type: "molar", w: 6 },
// // //     { type: "molar", w: 6 },
// // //     { type: "premolar", w: 4.8 },
// // //     { type: "premolar", w: 4.8 },
// // //     { type: "canine", w: 4.4 },
// // //     { type: "incisor", w: 4 },
// // //     { type: "incisor", w: 4 },
// // //   ];
// // //   const GAP = 0.4;
// // //   const X0 = 6;          // where the first tooth starts
// // //   const BITE_GAP = 1.2;  // gap between the upper and lower teeth

// // //   // top and bottom edge of the tooth strip (the gap between the two gums)
// // //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// // //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;

// // //   let x = X0;
// // //   const placed = TEETH.map((t) => {
// // //     const item = { ...t, x };
// // //     x += t.w + GAP;
// // //     return item;
// // //   });

// // //   return (
// // //     <svg {...jawProps}>
// // //       <Defs id={id} />
// // //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// // //         {placed.map((t, i) => {
// // //           const top = topEdge(t.x + t.w / 2) - 0.5;
// // //           const bottom = botEdge(t.x + t.w / 2) + 0.5;
// // //           const mid = (top + bottom) / 2;
// // //           const upperH = mid - BITE_GAP / 2 - top;
// // //           const lowerH = bottom - (mid + BITE_GAP / 2);
// // //           const style = {
// // //             fill: `url(#tooth-${id})`,
// // //             stroke: EDGE,
// // //             strokeWidth: 0.4,
// // //           };

// // //           return (
// // //             <g key={i}>
// // //               {/* upper tooth */}
// // //               <path transform={`translate(${t.x} ${top})`} d={toothPath(t.type, t.w, upperH)} {...style} />
// // //               {/* lower tooth: the same shape turned upside down */}
// // //               <path
// // //                 transform={`translate(${t.x} ${bottom}) scale(1 -1)`}
// // //                 d={toothPath(t.type, t.w, lowerH)}
// // //                 {...style}
// // //               />
// // //             </g>
// // //           );
// // //         })}

// // //         {/* upper gum */}
// // //         <path
// // //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />

// // //         {/* lower gum */}
// // //         <path
// // //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// // //           fill={`url(#gum-${id})`}
// // //         />
// // //       </g>
// // //     </svg>
// // //   );
// // // };


// // const SideBite = ({ id, flip }) => {
// //   // from the back of the mouth (left) to the front (right)
// //   const TEETH = [
// //     { w: 6, rx: 1.8, ext: 0 },     // molar
// //     { w: 6, rx: 1.8, ext: 0 },     // molar
// //     { w: 4.8, rx: 1.5, ext: 0 },   // premolar
// //     { w: 4.8, rx: 1.5, ext: 0 },   // premolar
// //     { w: 4.4, rx: 2.2, ext: 0.7 }, // canine (a little taller, rounder)
// //     { w: 4, rx: 1, ext: 0 },       // incisor
// //     { w: 4, rx: 1, ext: 0 },       // incisor
// //   ];
// //   const GAP = 0.4;
// //   const X0 = 6;          // where the first tooth starts
// //   const BITE_GAP = 1.2;  // the centre gap, the same for every tooth

// //   // top and bottom edge of the tooth strip
// //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;
// //   const midEdge = (x) => (topEdge(x) + botEdge(x)) / 2; // the centre line

// //   let x = X0;
// //   const placed = TEETH.map((t) => {
// //     const item = { ...t, x };
// //     x += t.w + GAP;
// //     return item;
// //   });

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <defs>
// //         {/* one straight cut through all the teeth = one equal gap */}
// //         <mask id={`bite-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="40">
// //           <rect x="0" y="0" width="48" height="40" fill="white" />
// //           <line x1="0" y1={midEdge(0)} x2="48" y2={midEdge(48)} stroke="black" strokeWidth={BITE_GAP} />
// //         </mask>
// //       </defs>

// //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// //         <g mask={`url(#bite-${id})`}>
// //           {placed.map((t, i) => {
// //             const cx = t.x + t.w / 2;
// //             const top = topEdge(cx) - 0.5 - t.ext;
// //             const bottom = botEdge(cx) + 0.5 + t.ext;
// //             return (
// //               <rect
// //                 key={i}
// //                 x={t.x}
// //                 y={top}
// //                 width={t.w}
// //                 height={bottom - top}
// //                 rx={t.rx}
// //                 fill={`url(#tooth-${id})`}
// //                 stroke={EDGE}
// //                 strokeWidth={0.4}
// //               />
// //             );
// //           })}
// //         </g>

// //         {/* upper gum */}
// //         <path
// //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// //           fill={`url(#gum-${id})`}
// //         />

// //         {/* lower gum */}
// //         <path
// //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// //           fill={`url(#gum-${id})`}
// //         />
// //       </g>
// //     </svg>
// //   );
// // };



// // const LeftIcon = () => <SideBite id="left" />;
// // const RightIcon = () => <SideBite id="right" flip />;

// // // ---------- Top / Bottom ----------
// // const ArchJaw = ({ id, lower }) => {
// //   const CX = 24, CY = 22, RX = 15, RY = 17, COUNT = 14;
// //   const outline = `M${CX - RX} ${CY + 0} V${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} V${CY + 0}`;
// //   // gum band, moved inward so less gum sticks out on the outer side
// // const GR = 1.5;
// // const gumOutline = `M${CX - RX + GR} ${CY + 0} V${CY} A${RX - GR} ${RY - GR} 0 0 1 ${CX + RX - GR} ${CY} V${CY + 0}`;

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <g transform={lower ? "translate(0 40) scale(1 -1)" : undefined}>
// //         {/* {!lower && <path d={`${outline} Z`} fill="#f8a29d" />} */}
// //         <path d={outline} fill="none" stroke={`url(#gum-${id})`} strokeWidth={6} />
// //         {Array.from({ length: COUNT }, (_, i) => {
// //           const t = ((i + 0.5) * Math.PI) / COUNT;
// //           const x = CX - RX * Math.cos(t);
// //           const y = CY - RY * Math.sin(t);
// //           const angle = (Math.atan2(-RY * Math.cos(t), RX * Math.sin(t)) * 180) / Math.PI;
// //           return (
// //             <rect
// //               key={i}
// //               x={-1.9}
// //               y={-2.4}
// //               width={3.8}
// //               height={3.8}
// //               rx={1.4}
// //               fill={`url(#tooth-${id})`}
// //               stroke={EDGE}
// //               strokeWidth={0.5}
// //               transform={`translate(${x} ${y}) rotate(${angle})`}
// //             />
// //           );
// //         })}
// //       </g>
// //     </svg>
// //   );
// // };
// // const TopIcon = () => <ArchJaw id="top" />;
// // const BottomIcon = () => <ArchJaw id="bottom" lower />;



// // const VIEW_ICONS = {
// //   "Front View": <FrontIcon />,
// //   "Back View": <BackIcon />,
// //   "Top View": (
// //   <span style={{ display: "flex", transform: "translateY(-5px)" }}>
// //     <BottomIcon />
// //   </span>
// // ),
// // "Bottom View": (
// //   <span style={{ display: "flex", transform: "translateY(5px)" }}>
// //     <TopIcon />
// //   </span>
// // ),

// //   "Left View": <RightIcon />,     // swapped
// //   "Right View": <LeftIcon />,     // swapped
// // };

  

// // export default function TopBar({
// //   upperName,
// //   lowerName,
// //   onUpperSelected,
// //   onLowerSelected,
// //   onIdentifyLat,
// //    onSegment,
// //   onAutomaticSetup,
// //   onInitialPosition,
// //   onFinalPosition,
// //   setupReady,
// //   view,
// //   onToolClick,
// //   onViewChange,
// //   busy,
// //   progress,
// //   message,
// // }) {
// //   // const [activeTab, setActiveTab] = useState("File");
// //   const [activeTab, setActiveTab] = useState("Clean Model"); // the second bar no longer has a File page
// // const [showFileDialog, setShowFileDialog] = useState(false);
// //    const [activeView, setActiveView] = useState(null); // the view button shown in blue
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
// //             // onClick={() => setActiveTab(tab)}

// //           onClick={() => {
// //          setActiveTab(tab);
// //          if (tab === "Automatic Setup" && onAutomaticSetup) onAutomaticSetup();
// //           }}

// //             style={{
// //               ...styles.tabButton,
// //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// //             }}
// //           >
// //             {tab}
// //           </button>
// //         ))}

// //         {/* normal messages (errors etc.) */}
// //         {message && <span style={styles.message}>{message}</span>}
// //       </div>

// //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// //       <div style={styles.secondBar}>
// //         {activeTab === "File" && (
// //           <>
// //             <div style={styles.row}>
// //               {/* <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// //                 Browse
// //               </button> */}

// //               <button
// //          data-active={!!upperName}
// //           style={{
// //           ...styles.browseButton,
// //             background: upperName ? ACTIVE_COLOR : "transparent",
// //         }}
// //          onClick={() => upperInputRef.current.click()}
// //        onMouseEnter={hoverOn}
// //        onMouseLeave={hoverOff}
// //          >
// //           Browse
// //        </button>
              
            

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
// //               {/* <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// //                 Browse
// //               </button> */}

// //             <button
// //          data-active={!!lowerName}
// //           style={{
// //       ...styles.browseButton,
// //       background: lowerName ? ACTIVE_COLOR : "transparent",
// //       }}
// //       onClick={() => lowerInputRef.current.click()}
// //       onMouseEnter={hoverOn}
// //         onMouseLeave={hoverOff}
// //         >
// //     Browse
// //    </button>

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
// //             {/* {CLEAN_MODEL_TOOLS.map((tool) => (
// //               <button
// //              key={tool}
// //             style={styles.toolButton}
// //             onClick={() => onToolClick && onToolClick(tool)}
// //              onMouseEnter={hoverOn}
// //              onMouseLeave={hoverOff}
// //             >
// //                 {tool}
// //               </button>
// //             ))} */}

// //            {CLEAN_MODEL_TOOLS.map((tool) => {
// //           const isActive = view === TOOL_VIEW[tool];
// //      return (
// //     <button
// //       key={tool}
// //       data-active={isActive}
// //       style={{ ...styles.toolButton, background: isActive ? ACTIVE_COLOR : "transparent" }}
// //       onClick={() => onToolClick && onToolClick(tool)}
// //       onMouseEnter={hoverOn}
// //       onMouseLeave={hoverOff}
// //     >
// //       {tool}
// //     </button>
// //   );
// // })}
          

// //           </div>
// //         )}

// //         {activeTab === "Segment" && (
// //           <div style={styles.toolRow}>
// //            {/* <button
// //             style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// //            disabled={busy}
// //            onClick={onIdentifyLat}
// //           onMouseEnter={hoverOn}
// //            onMouseLeave={hoverOff}
// //            >
// //               Identify LAT
// //             </button> */}

// //           <button
// //   data-active={view === "identifyLat"}
// //   style={{
// //     ...styles.toolButton,
// //     background: view === "identifyLat" ? ACTIVE_COLOR : "transparent",
// //     opacity: busy ? 0.5 : 1,
// //   }}
// //   disabled={busy}
// //   onClick={onIdentifyLat}
// //   onMouseEnter={hoverOn}
// //   onMouseLeave={hoverOff}
// // >
// //   Identify LAT
// // </button>
           

// //             {/* <button
// //           style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// //           disabled={busy}
// //           onClick={onSegment}>
// //           Segment
// //          </button> */}

// //          <button
// //   data-active={view === "segment"}
// //   style={{
// //     ...styles.toolButton,
// //     background: view === "segment" ? ACTIVE_COLOR : "transparent",
// //     opacity: busy ? 0.5 : 1,
// //   }}
// //   disabled={busy}
// //   onClick={onSegment}
// //   onMouseEnter={hoverOn}
// //   onMouseLeave={hoverOff}
// // >
// //   Segment
// // </button>
        

// //           </div>
// //         )}

// //      {activeTab === "Automatic Setup" && setupReady && (
// //   <div style={styles.toolRow}>
// //     {/* <button
// //       style={{
// //         ...styles.toolButton,
// //         // background: view === "segment" ? "#4f8cff" : "#5a5a5a",
// //         background: view === "segment" ? "#4f8cff" : "transparent",
// //         opacity: busy ? 0.5 : 1,
// //       }}
// //       disabled={busy}
// //       onClick={onInitialPosition}
// //     >
// //       Initial Position
// //     </button> */}

// //    <button
// //   data-active={view === "segment"}
// //   style={{
// //     ...styles.toolButton,
// //     background: view === "segment" ? ACTIVE_COLOR : "transparent",
// //     opacity: busy ? 0.5 : 1,
// //   }}
// //   disabled={busy}
// //   onClick={onInitialPosition}
// //   onMouseEnter={hoverOn}
// //   onMouseLeave={hoverOff}
// // >
// //   Initial Position
// // </button>


// //     {/* <button
// //       style={{
// //         ...styles.toolButton,
// //         // background: view === "automaticSetup" ? "#4f8cff" : "#5a5a5a",
// //         background: view === "automaticSetup" ? "#4f8cff" : "transparent",
// //         opacity: busy ? 0.5 : 1,
// //       }}
// //       disabled={busy}
// //       onClick={onFinalPosition}
// //     >
// //       Final Position
// //     </button> */}

// //     <button
// //   data-active={view === "automaticSetup"}
// //   style={{
// //     ...styles.toolButton,
// //     background: view === "automaticSetup" ? ACTIVE_COLOR : "transparent",
// //     opacity: busy ? 0.5 : 1,
// //   }}
// //   disabled={busy}
// //   onClick={onFinalPosition}
// //   onMouseEnter={hoverOn}
// //   onMouseLeave={hoverOff}
// // >
// //   Final Position
// // </button>
// //   </div>
// // )}


// //         {/* progress bar: centered inside the second bar */}
// //         {progress && (
// //           <div style={styles.progressWrapper}>
// //             <ProgressBar percent={progress.percent} label={progress.label} />
// //           </div>
// //         )}
// //       </div>

// //            <div style={styles.thirdBar}>
// //   {/* {VIEWS.map((v) => (
// //     <button
// //       key={v}
// //       style={{
// //         ...styles.viewButton,
// //         background: activeView === v ? "#4f8cff" : "transparent",
// //         color: activeView === v ? "#ffffff" : "#ffffff",
// //       }}
// //       onClick={() => {
// //         setActiveView(v);
// //         onViewChange && onViewChange(v);
// //       }}
// //     >
// //       {VIEW_ICONS[v]}
// //       <span style={styles.viewLabel}>{v}</span>
// //     </button>
// //   ))} */}

// // {VIEWS.map((v) => {
// //   const isActive = activeView === v;
// //   return (
// //     <button
// //       key={v}
// //       data-active={isActive}
// //       style={{
// //         ...styles.viewButton,
// //         background: isActive ? ACTIVE_COLOR : "transparent",
// //         color: "#ffffff",
// //       }}
// //       onClick={() => {
// //         setActiveView(v);
// //         onViewChange && onViewChange(v);
// //       }}
// //       onMouseEnter={hoverOn}
// //       onMouseLeave={hoverOff}
// //     >
// //       {VIEW_ICONS[v]}
// //       <span style={styles.viewLabel}>{v}</span>
// //     </button>
// //   );
// // })}

// // </div>


                   
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
// //     color: "#ffffff",
// //     fontSize: 14,
// //   },
// //   // secondBar: {
// //   //   position: "relative", // needed to center the progress bar inside this bar
// //   //   minHeight: 100,
// //   //   background: "#3b3b3b",
// //   //   padding: "12px 16px",
// //   //   display: "flex",
// //   //   flexDirection: "column",
// //   //   justifyContent: "center",
// //   //   gap: 12,
// //   //   boxSizing: "border-box",
// //   // },

// //   secondBar: {
// //   position: "relative",
// //   height: 70,                 // fixed height instead of minHeight
// //   background: "#3b3b3b",
// //   padding: "0 16px",          // no top/bottom padding, so centering is exact
// //   display: "flex",
// //   flexDirection: "column",
// //   justifyContent: "center",   // centers the buttons vertically
// //   gap: 8,                     // space between the two File rows
// //   boxSizing: "border-box",
// // },

// //   progressWrapper: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     pointerEvents: "none", // clicks go through to the buttons below
// //   },
// //   row: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 14,
// //   },
// //   // browseButton: {
// //   //   padding: "6px 16px",
// //   //   background: "#5a5a5a",
// //   //   color: "white",
// //   //   border: "1px solid #777",
// //   //   borderRadius: 4,
// //   //   cursor: "pointer",
// //   //   fontSize: 14,
// //   // },

// // browseButton: {
// //   padding: "6px 16px",
// //   background: "transparent",   // was "#5a5a5a"
// //   color: "white",
// //   border: "none",              // was "1px solid #777"
// //   borderRadius: 4,
// //   cursor: "pointer",
// //   fontSize: 14,
// // },

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
// //     gap: 1,
// //   },
// //   // toolButton: {
// //   //   padding: "10px 22px",
// //   //   background: "#5a5a5a",
// //   //   color: "white",
// //   //   border: "1px solid #777",
// //   //   borderRadius: 4,
// //   //   cursor: "pointer",
// //   //   fontSize: 14,
// //   // },

// // // toolButton: {
// // //   padding: "10px 22px",
// // //   background: "transparent",   // was "#5a5a5a"
// // //   color: "white",
// // //   border: "none",              // was "1px solid #777"
// // //   borderRadius: 4,
// // //   cursor: "pointer",
// // //   fontSize: 14,
// // // },


// // toolButton: {
// //   height: 72,            // taller than wide = vertical box
// //   minWidth: 64,
// //   padding: "0 10px",
// //   background: "transparent",
// //   color: "white",
// //   border: "none",
// //   borderRadius: 8,
// //   cursor: "pointer",
// //   fontSize: 14,
// // },



// //   //   thirdBar: {
// //   //   height: 44,
// //   //   background: "#6b6b6b", // grey
// //   //   display: "flex",
// //   //   alignItems: "center",
// //   //   justifyContent: "center",
// //   //   padding: "0 16px",
// //   //   gap: 12,
// //   //   boxSizing: "border-box",
// //   // },
// //   // viewButton: {
// //   //   padding: "6px 16px",
// //   //   background: "#8a8a8a",
// //   //   color: "white",
// //   //   border: "1px solid #a0a0a0",
// //   //   borderRadius: 4,
// //   //   cursor: "pointer",
// //   //   fontSize: 14,
// //   // },


// //   thirdBar: {
// //   minHeight: 56,
// //   background: "#0b0b0b",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// //   padding: "6px 16px",
// //   gap: 6,
// //   boxSizing: "border-box",
// // },
// // viewButton: {
// //   display: "flex",
// //   flexDirection: "column",
// //   alignItems: "center",
// //   gap: 4,
// //   padding: "3px 8px",
// //   border: "none",
// //   borderRadius: 6,
// //   cursor: "pointer",
// //   minWidth: 60,
// // },
// // viewLabel: {
// //   fontSize: 12,
// // },

// // };








// import { useRef, useState } from "react";
// import ProgressBar from "./ProgressBar.jsx";

// const TABS = ["File", "Clean Model", "Segment", "Setup"];
// const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];
// const VIEWS = ["Front View", "Back View", "Top View", "Bottom View", "Left View", "Right View"];

// const ACTIVE_COLOR = "#4f8cff";
// const VIEW_ACTIVE_COLOR = "#6b6b6b";
// const HOVER_COLOR = "#505050";

// // hover shows a grey box, but never replaces the blue of the active button
// const hoverOn = (e) => {
//   if (e.currentTarget.dataset.active !== "true") e.currentTarget.style.background = HOVER_COLOR;
// };
// const hoverOff = (e) => {
//   e.currentTarget.style.background =
//     e.currentTarget.dataset.active === "true" ? ACTIVE_COLOR : "transparent";
// };

// const DONE_COLOR = "#000000"; // second bar: the clicked button

// // hover for the second bar buttons: grey only when the button has no color of its own
// const toolHoverOn = (e) => {
//   if (e.currentTarget.dataset.bg === "transparent") e.currentTarget.style.background = HOVER_COLOR;
// };
// const toolHoverOff = (e) => {
//   e.currentTarget.style.background = e.currentTarget.dataset.bg;
// };


// // which view each Clean Model tool shows
// const TOOL_VIEW = {
//   "Clean Model": "cleanModel",
//   "Generate Trimline": "generateTrimline",
//   "Trim Model": "trimModel",
//   "Add Base": "addBase",
// };

// // =====================================================================
// // View icons (the size of all six icons is set by jawProps)
// // =====================================================================
// const jawProps = {
//   width: 34,
//   height: 30,
//   viewBox: "0 0 48 40",
//   strokeLinecap: "round",
//   strokeLinejoin: "round",
// };

// const EDGE = "#c9cfd8";

// const Defs = ({ id, dim }) => (
//   <defs>
//     <linearGradient id={`gum-${id}`} x1="0" y1="0" x2="0" y2="1">
//       <stop offset="0" stopColor="#ff9f99" />
//       <stop offset="0.5" stopColor="#f26f6a" />
//       <stop offset="1" stopColor="#d44d4d" />
//     </linearGradient>
//     <linearGradient id={`tooth-${id}`} x1="0" y1="0" x2="0" y2="1">
//       <stop offset="0" stopColor="#ffffff" />
//       <stop offset="1" stopColor={dim ? "#d3d8e0" : "#e8ecf1"} />
//     </linearGradient>
//   </defs>
// );

// // teeth of one row, from the left premolar to the right premolar
// const FRONT_TEETH = [
//   { type: "premolar", w: 4.2 },
//   { type: "canine", w: 4.0 },
//   { type: "lateral", w: 3.6 },
//   { type: "central", w: 4.8 },
//   { type: "central", w: 4.8 },
//   { type: "lateral", w: 3.6 },
//   { type: "canine", w: 4.0 },
//   { type: "premolar", w: 4.2 },
// ];

// // gives every tooth its x position and its center, so the row is centered
// const placeFrontTeeth = (gap) => {
//   const total = FRONT_TEETH.reduce((s, t) => s + t.w, 0) + gap * (FRONT_TEETH.length - 1);
//   let x = 24 - total / 2;
//   return FRONT_TEETH.map((t) => {
//     const item = { ...t, x, cx: x + t.w / 2 };
//     x += t.w + gap;
//     return item;
//   });
// };

// // one tooth in its own box: flat on the gum side (y = 0), rounded at the biting edge (y = h)
// const frontToothPath = (type, w, h) => {
//   const r = { central: 1.2, lateral: 1.8, canine: w / 2, premolar: 1.6 }[type];
//   return `M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
// };

// // ---------- Front / Back ----------
// const FrontJaw = ({ id, dim, gum, base, toothH }) => {
//   const teeth = placeFrontTeeth(0.35);
//   const half = (
//     <>
//       {teeth.map((t, i) => {
//         const u = (t.cx - 24) / 20;
//         const yt = base + 4 * (1 - u * u);
//         return (
//           <path
//             key={i}
//             d={frontToothPath(t.type, t.w, toothH + 1.5)}
//             transform={`rotate(${-u * 6} ${t.cx} ${yt}) translate(${t.x} ${yt - 1.5})`}
//             fill={`url(#tooth-${id})`}
//             stroke={EDGE}
//             strokeWidth={0.5}
//           />
//         );
//       })}
//       <path d={gum} fill={`url(#gum-${id})`} />
//     </>
//   );
//   return (
//     <svg {...jawProps}>
//       <Defs id={id} dim={dim} />
//       <g transform="translate(24 20) scale(0.88) translate(-24 -20)">
//         {half}
//         <g transform="translate(0 40) scale(1 -1)">{half}</g>
//       </g>
//     </svg>
//   );
// };

// const FrontIcon = () => {
//   const id = "front";
//   const teeth = placeFrontTeeth(0.3);
//   const style = { fill: `url(#tooth-${id})`, stroke: EDGE, strokeWidth: 0.5 };

//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />

//       {/* lower teeth: the same shapes turned upside down */}
//       {teeth.map((t, i) => {
//         const u = (t.cx - 24) / 18;
//         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
//         return (
//           <path
//             key={"l" + i}
//             transform={`translate(${t.x} 32) scale(1 -1)`}
//             d={frontToothPath(t.type, t.w, 32 - top)}
//             {...style}
//           />
//         );
//       })}

//       {/* lower gum: the upper gum flipped upside down */}
//       <path
//         transform="translate(0 40) scale(1 -1)"
//         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
//         fill={`url(#gum-${id})`}
//       />

//       {/* upper teeth */}
//       {teeth.map((t, i) => {
//         const u = (t.cx - 24) / 18;
//         const bottom = 18 + 2 * (1 - u * u);
//         return (
//           <path
//             key={"u" + i}
//             transform={`translate(${t.x} 8)`}
//             d={frontToothPath(t.type, t.w, bottom - 8)}
//             {...style}
//           />
//         );
//       })}

//       {/* upper gum */}
//       <path
//         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
//         fill={`url(#gum-${id})`}
//       />
//     </svg>
//   );
// };

// const BackIcon = () => (
//   <FrontJaw
//     id="back"
//     dim
//     base={9.5}
//     toothH={6.5}
//     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 10.5 41 10.5 Q24 16 7 10.5 Q3 10.5 3 6 Z"
//   />
// );

// // ---------- Left / Right ----------
// const SideBite = ({ id, flip }) => {
//   // from the back of the mouth (left) to the front (right)
//   const TEETH = [
//     { w: 6, rx: 1.8, ext: 0 }, // molar
//     { w: 6, rx: 1.8, ext: 0 }, // molar
//     { w: 4.8, rx: 1.5, ext: 0 }, // premolar
//     { w: 4.8, rx: 1.5, ext: 0 }, // premolar
//     { w: 4.4, rx: 2.2, ext: 0.7 }, // canine (a little taller, rounder)
//     { w: 4, rx: 1, ext: 0 }, // incisor
//     { w: 4, rx: 1, ext: 0 }, // incisor
//   ];
//   const GAP = 0.4;
//   const X0 = 6; // where the first tooth starts
//   const BITE_GAP = 1.2; // the centre gap, the same for every tooth

//   // top and bottom edge of the tooth strip
//   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
//   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;
//   const midEdge = (x) => (topEdge(x) + botEdge(x)) / 2; // the centre line

//   let x = X0;
//   const placed = TEETH.map((t) => {
//     const item = { ...t, x };
//     x += t.w + GAP;
//     return item;
//   });

//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />
//       <defs>
//         {/* one straight cut through all the teeth = one equal gap */}
//         <mask id={`bite-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="40">
//           <rect x="0" y="0" width="48" height="40" fill="white" />
//           <line x1="0" y1={midEdge(0)} x2="48" y2={midEdge(48)} stroke="black" strokeWidth={BITE_GAP} />
//         </mask>
//       </defs>

//       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
//         <g mask={`url(#bite-${id})`}>
//           {placed.map((t, i) => {
//             const cx = t.x + t.w / 2;
//             const top = topEdge(cx) - 0.5 - t.ext;
//             const bottom = botEdge(cx) + 0.5 + t.ext;
//             return (
//               <rect
//                 key={i}
//                 x={t.x}
//                 y={top}
//                 width={t.w}
//                 height={bottom - top}
//                 rx={t.rx}
//                 fill={`url(#tooth-${id})`}
//                 stroke={EDGE}
//                 strokeWidth={0.4}
//               />
//             );
//           })}
//         </g>

//         {/* upper gum */}
//         <path
//           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
//           fill={`url(#gum-${id})`}
//         />

//         {/* lower gum */}
//         <path
//           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
//           fill={`url(#gum-${id})`}
//         />
//       </g>
//     </svg>
//   );
// };

// const LeftIcon = () => <SideBite id="left" />;
// const RightIcon = () => <SideBite id="right" flip />;

// // ---------- Top / Bottom ----------
// const ArchJaw = ({ id, lower }) => {
//   const CX = 24, CY = 22, RX = 15, RY = 17, COUNT = 14;
//   const outline = `M${CX - RX} ${CY} V${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} V${CY}`;

//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />
//       <g transform={lower ? "translate(0 40) scale(1 -1)" : undefined}>
//         <path d={outline} fill="none" stroke={`url(#gum-${id})`} strokeWidth={6} />
//         {Array.from({ length: COUNT }, (_, i) => {
//           const t = ((i + 0.5) * Math.PI) / COUNT;
//           const x = CX - RX * Math.cos(t);
//           const y = CY - RY * Math.sin(t);
//           const angle = (Math.atan2(-RY * Math.cos(t), RX * Math.sin(t)) * 180) / Math.PI;
//           return (
//             <rect
//               key={i}
//               x={-1.9}
//               y={-2.4}
//               width={3.8}
//               height={3.8}
//               rx={1.4}
//               fill={`url(#tooth-${id})`}
//               stroke={EDGE}
//               strokeWidth={0.5}
//               transform={`translate(${x} ${y}) rotate(${angle})`}
//             />
//           );
//         })}
//       </g>
//     </svg>
//   );
// };
// const TopIcon = () => <ArchJaw id="top" />;
// const BottomIcon = () => <ArchJaw id="bottom" lower />;

// const VIEW_ICONS = {
//   "Front View": <FrontIcon />,
//   "Back View": <BackIcon />,
//   "Top View": (
//     <span style={{ display: "flex", transform: "translateY(-5px)" }}>
//       <BottomIcon />
//     </span>
//   ),
//   "Bottom View": (
//     <span style={{ display: "flex", transform: "translateY(5px)" }}>
//       <TopIcon />
//     </span>
//   ),
//   "Left View": <RightIcon />, // swapped
//   "Right View": <LeftIcon />, // swapped
// };

// // =====================================================================
// // The top bars
// // =====================================================================
// export default function TopBar({
//   upperName,
//   lowerName,
//   onUpperSelected,
//   onLowerSelected,
//   onIdentifyLat,
//   onSegment,
//   onAutomaticSetup,
//   onInitialPosition,
//   onFinalPosition,
//   setupReady,
//   view,
//   onToolClick,
//   onViewChange,
//   busy,
//   progress,
//   message,
//     showGrid,
//   onToggleGrid,
//   gridSize,
//   onGridSizeChange,
//     showSuperimpose,
//   onToggleSuperimpose,
//   showOcclusion,
//   onToggleOcclusion,

// }) {
//   // the second bar shows the tools of this tab (File has no page there, it opens a dialog)
//   const [activeTab, setActiveTab] = useState("Clean Model");
//   const [showFileDialog, setShowFileDialog] = useState(false);
//   const [pendingUpper, setPendingUpper] = useState(null); // picked in the window, not loaded yet
// const [pendingLower, setPendingLower] = useState(null);
//   const [activeView, setActiveView] = useState(null); // the view button shown in blue
//   const [clickedTool, setClickedTool] = useState(null); // the second bar button clicked last

// // black for the clicked button, nothing for the others
// const toolColor = (key) => (clickedTool === key ? DONE_COLOR : "transparent");

// // the other buttons look disabled while an exe runs
// const toolOpacity = (key) => (busy && clickedTool !== key ? 0.5 : 1);
//   const upperInputRef = useRef(null);
//   const lowerInputRef = useRef(null);

//   // const handleChange = (e, callback) => {
//   //   const file = e.target.files[0];
//   //   if (file) callback(file);
//   //   e.target.value = "";
//   // };
//   // the picked file is only kept in the window until OK is clicked
// const handlePick = (e, setPending) => {
//   const file = e.target.files[0];
//   if (file) setPending(file);
//   e.target.value = "";
// };

// const openFileDialog = () => {
//   setPendingUpper(null);
//   setPendingLower(null);
//   setShowFileDialog(true);
// };

// const cancelFileDialog = () => {
//   setPendingUpper(null);
//   setPendingLower(null);
//   setShowFileDialog(false);
// };

// const confirmFileDialog = () => {
//   if (pendingUpper) onUpperSelected(pendingUpper);
//   if (pendingLower) onLowerSelected(pendingLower);
//   setPendingUpper(null);
//   setPendingLower(null);
//   setShowFileDialog(false);
// };

//   return (
//     <div>
//       {/* ---------- First top bar (dark black) ---------- */}
//       <div style={styles.firstBar}>
//         {TABS.map((tab) => {
//           const isActive = tab === "File" ? showFileDialog : activeTab === tab;
//           return (
//             <button
//               key={tab}
//               onClick={() => {
//                 if (tab === "File") {
//                   // setShowFileDialog(true); // File only opens the upload window
//                   openFileDialog(); // File only opens the upload window
//                   return;
//                 }
//                 setActiveTab(tab);
//                 if (tab === "Setup" && onAutomaticSetup) onAutomaticSetup();
//               }}
//               style={{
//                 ...styles.tabButton,
//                 background: isActive ? ACTIVE_COLOR : "#3a3a3a",
//               }}
//             >
//               {tab}
//             </button>
//           );
//         })}

//         {/* normal messages (errors etc.) */}
//         {message && <span style={styles.message}>{message}</span>}
//       </div>

//       {/* ---------- Second top bar (dark grey) ---------- */}
//       <div style={styles.secondBar}>
//         {/* {activeTab === "Clean Model" && (
//           <div style={styles.toolRow}>
//             {CLEAN_MODEL_TOOLS.map((tool) => {
//               const isActive = view === TOOL_VIEW[tool];
//               return (
//                 <button
//                   key={tool}
//                   data-active={isActive}
//                   style={{ ...styles.toolButton, background: isActive ? ACTIVE_COLOR : "transparent" }}
//                   onClick={() => onToolClick && onToolClick(tool)}
//                   onMouseEnter={hoverOn}
//                   onMouseLeave={hoverOff}
//                 >
//                   {tool}
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {activeTab === "Segment" && (
//           <div style={styles.toolRow}>
//             <button
//               data-active={view === "identifyLat"}
//               style={{
//                 ...styles.toolButton,
//                 background: view === "identifyLat" ? ACTIVE_COLOR : "transparent",
//                 opacity: busy ? 0.5 : 1,
//               }}
//               disabled={busy}
//               onClick={onIdentifyLat}
//               onMouseEnter={hoverOn}
//               onMouseLeave={hoverOff}
//             >
//               Identify LAT
//             </button>

//             <button
//               data-active={view === "segment"}
//               style={{
//                 ...styles.toolButton,
//                 background: view === "segment" ? ACTIVE_COLOR : "transparent",
//                 opacity: busy ? 0.5 : 1,
//               }}
//               disabled={busy}
//               onClick={onSegment}
//               onMouseEnter={hoverOn}
//               onMouseLeave={hoverOff}
//             >
//               Segment
//             </button>
//           </div>
//         )}

//         {activeTab === "Automatic Setup" && setupReady && (
//           <div style={styles.toolRow}>
//             <button
//               data-active={view === "segment"}
//               style={{
//                 ...styles.toolButton,
//                 background: view === "segment" ? ACTIVE_COLOR : "transparent",
//                 opacity: busy ? 0.5 : 1,
//               }}
//               disabled={busy}
//               onClick={onInitialPosition}
//               onMouseEnter={hoverOn}
//               onMouseLeave={hoverOff}
//             >
//               Initial Position
//             </button>

//             <button
//               data-active={view === "automaticSetup"}
//               style={{
//                 ...styles.toolButton,
//                 background: view === "automaticSetup" ? ACTIVE_COLOR : "transparent",
//                 opacity: busy ? 0.5 : 1,
//               }}
//               disabled={busy}
//               onClick={onFinalPosition}
//               onMouseEnter={hoverOn}
//               onMouseLeave={hoverOff}
//             >
//               Final Position
//             </button>
//           </div>
//         )} */}

//         {activeTab === "Clean Model" && (
//   <div style={styles.toolRow}>
//     {CLEAN_MODEL_TOOLS.map((tool) => {
//       const bg = toolColor(tool);
//       return (
//         <button
//           key={tool}
//           data-bg={bg}
//           style={{ ...styles.toolButton, background: bg, opacity: toolOpacity(tool) }}
//           onClick={() => {
//             setClickedTool(tool);
//             onToolClick && onToolClick(tool);
//           }}
//           onMouseEnter={toolHoverOn}
//           onMouseLeave={toolHoverOff}
//         >
//           {tool}
//         </button>
//       );
//     })}
//   </div>
// )}

// {activeTab === "Segment" && (
//   <div style={styles.toolRow}>
//     <button
//       data-bg={toolColor("identifyLat")}
//       style={{
//         ...styles.toolButton,
//         background: toolColor("identifyLat"),
//         opacity: toolOpacity("identifyLat"),
//       }}
//       disabled={busy}
//       onClick={() => {
//         setClickedTool("identifyLat");
//         onIdentifyLat();
//       }}
//       onMouseEnter={toolHoverOn}
//       onMouseLeave={toolHoverOff}
//     >
//       Identify LAT
//     </button>

//     <button
//       data-bg={toolColor("segment")}
//       style={{
//         ...styles.toolButton,
//         background: toolColor("segment"),
//         opacity: toolOpacity("segment"),
//       }}
//       disabled={busy}
//       onClick={() => {
//         setClickedTool("segment");
//         onSegment();
//       }}
//       onMouseEnter={toolHoverOn}
//       onMouseLeave={toolHoverOff}
//     >
//       Segment
//     </button>
//   </div>
// )}

// {activeTab === "Setup" && setupReady && (
//   <div style={styles.toolRow}>
//     <button
//       data-bg={toolColor("initial")}
//       style={{
//         ...styles.toolButton,
//         background: toolColor("initial"),
//         opacity: toolOpacity("initial"),
//       }}
//       disabled={busy}
//       onClick={() => {
//         setClickedTool("initial");
//         onInitialPosition();
//       }}
//       onMouseEnter={toolHoverOn}
//       onMouseLeave={toolHoverOff}
//     >
//       Initial Position
//     </button>

//     <button
//       data-bg={toolColor("final")}
//       style={{
//         ...styles.toolButton,
//         background: toolColor("final"),
//         opacity: toolOpacity("final"),
//       }}
//       disabled={busy}
//       onClick={() => {
//         setClickedTool("final");
//         onFinalPosition();
//       }}
//       onMouseEnter={toolHoverOn}
//       onMouseLeave={toolHoverOff}
//     >
//       Final Position
//     </button>



//     <button
//   data-bg={showGrid ? DONE_COLOR : "transparent"}
//   style={{
//     ...styles.toolButton,
//     background: showGrid ? DONE_COLOR : "transparent",
//   }}
//   onClick={onToggleGrid}
//   onMouseEnter={toolHoverOn}
//   onMouseLeave={toolHoverOff}
// >
//   Grid
// </button>



// {showGrid && (

// <select
//   value={gridSize}
//   onChange={(e) => onGridSizeChange(Number(e.target.value))}
//   style={styles.gridSelect}
// >
//   <option value={1}>1 mm</option>
//   <option value={2}>2 mm</option>
//   <option value={5}>5 mm</option>
// </select>

// )}



// <button
//   data-bg={showSuperimpose ? DONE_COLOR : "transparent"}
//   style={{
//     ...styles.toolButton,
//     background: showSuperimpose ? DONE_COLOR : "transparent",
//   }}
//   onClick={onToggleSuperimpose}
//   onMouseEnter={toolHoverOn}
//   onMouseLeave={toolHoverOff}
// >
//   Superimpose
// </button>

// <button
//   data-bg={showOcclusion ? DONE_COLOR : "transparent"}
//   style={{
//     ...styles.toolButton,
//     background: showOcclusion ? DONE_COLOR : "transparent",
//   }}
//   onClick={onToggleOcclusion}
//   onMouseEnter={toolHoverOn}
//   onMouseLeave={toolHoverOff}
// >
//   Occlusion
// </button>



//   </div>
// )}

//         {/* progress bar: centered inside the second bar */}
//         {progress && (
//           <div style={styles.progressWrapper}>
//             <ProgressBar percent={progress.percent} label={progress.label} />
//           </div>
//         )}
//       </div>

//       {/* ---------- Third bar (the six views) ---------- */}
//       <div style={styles.thirdBar}>
//         {/* {VIEWS.map((v) => {
//           const isActive = activeView === v;
//           return (
//             <button
//               key={v}
//               data-active={isActive}
//               style={{
//                 ...styles.viewButton,
//                 // background: isActive ? ACTIVE_COLOR : "transparent",
//                 background: isActive ? VIEW_ACTIVE_COLOR : "transparent",
//                 color: "#ffffff",
//               }}
//               onClick={() => {
//                 setActiveView(v);
//                 onViewChange && onViewChange(v);
//               }}
//               onMouseEnter={hoverOn}
//               onMouseLeave={hoverOff}
//             >
//               {VIEW_ICONS[v]}
//               <span style={styles.viewLabel}>{v}</span>
//             </button>
//           );
//         })} */}

//        {VIEWS.map((v) => {
//   const bg = activeView === v ? VIEW_ACTIVE_COLOR : "transparent";
//   return (
//     <button
//       key={v}
//       data-bg={bg}
//       style={{
//         ...styles.viewButton,
//         background: bg,
//         color: "#ffffff",
//       }}
//       onClick={() => {
//         setActiveView(v);
//         onViewChange && onViewChange(v);
//       }}
//       onMouseEnter={toolHoverOn}
//       onMouseLeave={toolHoverOff}
//     >
//       {VIEW_ICONS[v]}
//       <span style={styles.viewLabel}>{v}</span>
//     </button>
//   );
// })}

//       </div>

//       {/* ---------- Upload window (opened by the File button) ---------- */}
//       {showFileDialog && (
//   <div style={styles.overlay} onClick={cancelFileDialog}>
//     <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
//       <div style={styles.dialogTitle}>Upload Scan Files</div>

//       <div style={styles.row}>
//         <button
//           data-active={!!(pendingUpper || upperName)}
//           style={{
//             ...styles.browseButton,
//             background: pendingUpper || upperName ? ACTIVE_COLOR : "transparent",
//           }}
//           onClick={() => upperInputRef.current.click()}
//           onMouseEnter={hoverOn}
//           onMouseLeave={hoverOff}
//         >
//           Browse
//         </button>
//         <span style={styles.label}>
//           Upload Upper Scan <span style={styles.required}>*</span>
//         </span>
//         <span style={styles.fileName}>{pendingUpper ? pendingUpper.name : upperName}</span>
//         <input
//           type="file"
//           accept=".stl"
//           ref={upperInputRef}
//           onChange={(e) => handlePick(e, setPendingUpper)}
//           style={{ display: "none" }}
//         />
//       </div>

//       <div style={styles.row}>
//         <button
//           data-active={!!(pendingLower || lowerName)}
//           style={{
//             ...styles.browseButton,
//             background: pendingLower || lowerName ? ACTIVE_COLOR : "transparent",
//           }}
//           onClick={() => lowerInputRef.current.click()}
//           onMouseEnter={hoverOn}
//           onMouseLeave={hoverOff}
//         >
//           Browse
//         </button>
//         <span style={styles.label}>
//           Upload Lower Scan <span style={styles.required}>*</span>
//         </span>
//         <span style={styles.fileName}>{pendingLower ? pendingLower.name : lowerName}</span>
//         <input
//           type="file"
//           accept=".stl"
//           ref={lowerInputRef}
//           onChange={(e) => handlePick(e, setPendingLower)}
//           style={{ display: "none" }}
//         />
//       </div>

//       {/* <div style={styles.dialogButtons}>
//         <button style={styles.cancelButton} onClick={cancelFileDialog}>
//           Cancel
//         </button>
//         <button style={styles.okButton} onClick={confirmFileDialog}>
//           OK
//         </button>
//       </div> */}

//           <div style={styles.dialogButtons}>
//          <button style={styles.okButton} onClick={confirmFileDialog}>
//          OK
//         </button>
//       <button style={styles.cancelButton} onClick={cancelFileDialog}>
//       Cancel
//      </button>
//    </div>
//     </div>
//   </div>
// )}
      
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
//     color: "#ffffff",
//     fontSize: 14,
//   },
//   secondBar: {
//     position: "relative", // needed to center the progress bar inside this bar
//     height: 44, // fixed height, the File page is gone so it can be short
//     background: "#3b3b3b",
//     padding: "0 16px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center", // centers the buttons vertically
//     gap: 8,
//     boxSizing: "border-box",
//   },
//   progressWrapper: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     pointerEvents: "none", // clicks go through to the buttons below
//   },
//   row: {
//     display: "flex",
//     alignItems: "center",
//     gap: 14,
//   },
//   browseButton: {
//     padding: "6px 16px",
//     background: "transparent",
//     color: "white",
//     border: "none",
//     borderRadius: 4,
//     cursor: "pointer",
//     fontSize: 14,
//   },
//   label: {
//     color: "#e0e0e0",
//     fontSize: 14,
//     minWidth: 150,
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
//     gap: 1,
//   },
//   toolButton: {
//     height: 34, // must be lower than the height of secondBar
//     minWidth: 64,
//     padding: "0 10px",
//     background: "transparent",
//     color: "white",
//     border: "none",
//     borderRadius: 8,
//     cursor: "pointer",
//     fontSize: 14,
//   },
//   thirdBar: {
//     minHeight: 56,
//     background: "#0b0b0b",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "6px 16px",
//     gap: 6,
//     boxSizing: "border-box",
//   },
//   viewButton: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 4,
//     padding: "3px 8px",
//     border: "none",
//     borderRadius: 6,
//     cursor: "pointer",
//     minWidth: 60,
//   },
//   viewLabel: {
//     fontSize: 12,
//   },

//   // ----- upload window -----
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   dialog: {
//     background: "#3b3b3b",
//     padding: "20px 28px",
//     borderRadius: 8,
//     display: "flex",
//     flexDirection: "column",
//     gap: 16,
//     minWidth: 300,
//   },
//   dialogTitle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   // closeButton: {
//   //   alignSelf: "flex-end",
//   //   padding: "6px 18px",
//   //   background: "#5a5a5a",
//   //   color: "white",
//   //   border: "none",
//   //   borderRadius: 4,
//   //   cursor: "pointer",
//   //   fontSize: 14,
//   // },

//   dialogButtons: {
//   display: "flex",
//   justifyContent: "flex-end",
//   gap: 10,
// },
// cancelButton: {
//   padding: "6px 18px",
//   background: "#5a5a5a",
//   color: "white",
//   border: "none",
//   borderRadius: 4,
//   cursor: "pointer",
//   fontSize: 14,
// },
// okButton: {
//   padding: "6px 24px",
//   background: ACTIVE_COLOR,
//   color: "white",
//   border: "none",
//   borderRadius: 4,
//   cursor: "pointer",
//   fontSize: 14,
// },
//   gridSelect: {
//     height: 28,
//     margin:"0 6px",
//     padding: "0 6px",
//     background: "#5a5a5a",
//     color: "white",
//     border: "none",
//     borderRadius: 4,
//     fontSize: 14,
//     cursor: "pointer",
//   },

// };










// // // // import { useRef, useState } from "react";

// // // // const TABS = ["File", "Clean Model", "Segment"];

// // // // export default function TopBar({
// // // //   upperName,
// // // //   lowerName,
// // // //   onUpperSelected,
// // // //   onLowerSelected,
// // // //   message,
// // // // }) {
// // // //   const [activeTab, setActiveTab] = useState("File");
// // // //   const upperInputRef = useRef(null);
// // // //   const lowerInputRef = useRef(null);

// // // //   const handleChange = (e, callback) => {
// // // //     const file = e.target.files[0]; // only one file
// // // //     if (file) callback(file);
// // // //     e.target.value = ""; // allows selecting the same file again
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // //       <div style={styles.firstBar}>
// // // //         {/* {TABS.map((tab) => (
// // // //           <button
// // // //             key={tab}
// // // //             onClick={() => setActiveTab(tab)}
// // // //             style={{
// // // //               ...styles.tabButton,
// // // //             //   background: activeTab === tab ? "#3a3a3a" : "transparent",
// // // //             background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // //             }}
// // // //           >
// // // //             {tab}
// // // //           </button>
// // // //         ))} */}


// // // //         {TABS.map((tab) => (
// // // //   <button
// // // //     key={tab}
// // // //     onClick={() => setActiveTab(tab)}
// // // //     onMouseEnter={(e) => {
// // // //       if (activeTab !== tab) e.currentTarget.style.background = "#505050";
// // // //     }}
// // // //     onMouseLeave={(e) => {
// // // //       if (activeTab !== tab) e.currentTarget.style.background = "#3a3a3a";
// // // //     }}
// // // //     style={{
// // // //       ...styles.tabButton,
// // // //       background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // //     }}
// // // //   >
// // // //     {tab}
// // // //   </button>
// // // // ))}
// // // //         {message && <span style={styles.message}>{message}</span>}
// // // //       </div>

// // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // //       <div style={styles.secondBar}>
// // // //         {activeTab === "File" && (
// // // //           <>
// // // //             {/* Row 1: Upper */}
// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //                 <span style={styles.label}>
// // // //                Upload Upper Scan Model {!upperName && <span style={styles.required}>*</span>}
// // // //                </span>
// // // //               <span style={styles.fileName}>{upperName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={upperInputRef}
// // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>

// // // //             {/* Row 2: Lower */}
// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //                 <span style={styles.label}>
// // // //                  Upload Lower Scan Model {!lowerName && <span style={styles.required}>*</span>}
// // // //                 </span>
// // // //               <span style={styles.fileName}>{lowerName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={lowerInputRef}
// // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // const styles = {
// // // //   firstBar: {
// // // //     height: 44,
// // // //     background: "#0b0b0b", // dark black
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     padding: "0 12px",
// // // //     gap: 16,
// // // //   },
// // // //   tabButton: {
// // // //     padding: "8px 18px",
// // // //     color: "white",
// // // //     border: "none",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 15,
// // // //   },
// // // //   message: {
// // // //     marginLeft: 20,
// // // //     color: "#f38ba8",
// // // //     fontSize: 14,
// // // //   },
// // // //   secondBar: {
// // // //     minHeight: 100, // taller than the first bar (44)
// // // //     background: "#3b3b3b", // dark grey
// // // //     padding: "12px 16px",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     justifyContent: "center",
// // // //     gap: 12,
// // // //     boxSizing: "border-box",
// // // //   },
// // // //   row: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 14,
// // // //   },
// // // //   browseButton: {
// // // //     padding: "6px 16px",
// // // //     background: "#5a5a5a",
// // // //     color: "white",
// // // //     border: "1px solid #777",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 14,
// // // //   },
// // // //   label: {
// // // //     color: "#e0e0e0",
// // // //     fontSize: 14,
// // // //     minWidth: 180,
// // // //   },
// // // //   required: {
// // // //   color: "#ff4d4d", // red star
// // // //   fontWeight: "bold",
// // // // },
// // // //   fileName: {
// // // //     color: "#ffffff",
// // // //     fontSize: 14,
// // // //     fontWeight: "bold",
// // // //   },
// // // // };






// // // // import { useRef, useState } from "react";

// // // // const TABS = ["File", "Clean Model", "Segment"];
// // // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // // export default function TopBar({
// // // //   upperName,
// // // //   lowerName,
// // // //   onUpperSelected,
// // // //   onLowerSelected,
// // // //   onSegment,
// // // //    onToolClick,
// // // //   busy,
// // // //   message,
// // // // }) {
// // // //   const [activeTab, setActiveTab] = useState("File");
// // // //   const upperInputRef = useRef(null);
// // // //   const lowerInputRef = useRef(null);

// // // //   const handleChange = (e, callback) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) callback(file);
// // // //     e.target.value = "";
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       {/* ---------- First top bar (dark black) ---------- */}
// // // //       <div style={styles.firstBar}>
// // // //         {TABS.map((tab) => (
// // // //           <button
// // // //             key={tab}
// // // //             onClick={() => {
// // // //               setActiveTab(tab);
// // // //               if (tab === "Segment" && !busy) onSegment(); // Segment runs the exe
// // // //             }}
// // // //             style={{
// // // //               ...styles.tabButton,
// // // //               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
// // // //             }}
// // // //           >
// // // //             {tab}
// // // //           </button>
// // // //         ))}
// // // //         {message && <span style={styles.message}>{message}</span>}
// // // //       </div>

// // // //       {/* ---------- Second top bar (dark grey, taller) ---------- */}
// // // //       <div style={styles.secondBar}>
// // // //         {activeTab === "File" && (
// // // //           <>
// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //               {/* <span style={styles.label}>
// // // //                 Upload Upper Scan Model <span style={styles.required}>*</span>
// // // //               </span> */}

// // // //               <span style={styles.label}>
// // // //               Upload Upper Scan {!upperName && <span style={styles.required}>*</span>}
// // // //              </span>
// // // //               <span style={styles.fileName}>{upperName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={upperInputRef}
// // // //                 onChange={(e) => handleChange(e, onUpperSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>

// // // //             <div style={styles.row}>
// // // //               <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
// // // //                 Browse
// // // //               </button>
// // // //               {/* <span style={styles.label}>
// // // //                 Upload Lower Scan Model <span style={styles.required}>*</span>
// // // //               </span> */}
// // // //               <span style={styles.label}>
// // // //               Upload Lower Scan {!lowerName && <span style={styles.required}>*</span>}
// // // //              </span>
// // // //               <span style={styles.fileName}>{lowerName}</span>
// // // //               <input
// // // //                 type="file"
// // // //                 accept=".stl"
// // // //                 ref={lowerInputRef}
// // // //                 onChange={(e) => handleChange(e, onLowerSelected)}
// // // //                 style={{ display: "none" }}
// // // //               />
// // // //             </div>
// // // //           </>
// // // //         )}

// // // //         {activeTab === "Clean Model" && (
// // // //          <div style={styles.toolRow}>
// // // //     {CLEAN_MODEL_TOOLS.map((tool) => (
// // // //       <button
// // // //         key={tool}
// // // //         style={styles.toolButton}
// // // //         onClick={() => onToolClick && onToolClick(tool)}
// // // //       >
// // // //         {tool}
// // // //       </button>
// // // //     ))}
// // // //   </div>
// // // // )}

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // const styles = {
// // // //   firstBar: {
// // // //     height: 44,
// // // //     background: "#0b0b0b",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     padding: "0 12px",
// // // //     gap: 16,
// // // //   },
// // // //   tabButton: {
// // // //     padding: "8px 18px",
// // // //     color: "white",
// // // //     border: "none",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 15,
// // // //   },
// // // //   message: {
// // // //     marginLeft: 20,
// // // //     color: "#f9e2af",
// // // //     fontSize: 14,
// // // //   },
// // // //   secondBar: {
// // // //     minHeight: 100,
// // // //     background: "#3b3b3b",
// // // //     padding: "12px 16px",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     justifyContent: "center",
// // // //     gap: 12,
// // // //     boxSizing: "border-box",
// // // //   },
// // // //   row: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 14,
// // // //   },
// // // //   browseButton: {
// // // //     padding: "6px 16px",
// // // //     background: "#5a5a5a",
// // // //     color: "white",
// // // //     border: "1px solid #777",
// // // //     borderRadius: 4,
// // // //     cursor: "pointer",
// // // //     fontSize: 14,
// // // //   },
// // // //   label: {
// // // //     color: "#e0e0e0",
// // // //     fontSize: 14,
// // // //     minWidth: 120,
// // // //   },
// // // //   required: {
// // // //     color: "#ff4d4d",
// // // //     fontWeight: "bold",
// // // //   },
// // // //   fileName: {
// // // //     color: "#ffffff",
// // // //     fontSize: 14,
// // // //     fontWeight: "bold",
// // // //   },
// // // //   toolRow: {
// // // //   display: "flex",
// // // //   alignItems: "center",
// // // //   gap: 16,
// // // // },
// // // // toolButton: {
// // // //   padding: "10px 22px",
// // // //   background: "#5a5a5a",
// // // //   color: "white",
// // // //   border: "1px solid #777",
// // // //   borderRadius: 4,
// // // //   cursor: "pointer",
// // // //   fontSize: 14,
// // // // },
// // // // };






// // // import { useRef, useState } from "react";

// // // const TABS = ["File", "Clean Model", "Segment"];
// // // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // // export default function TopBar({
// // //   upperName,
// // //   lowerName,
// // //   onUpperSelected,
// // //   onLowerSelected,
// // //   onIdentifyLat,
// // //   onCutTeeth,
// // //   onToolClick,
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
// // //             onClick={() => setActiveTab(tab)}
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
// // //               <span style={styles.label}>
// // //                 Upload Upper Scan <span style={styles.required}>*</span>
// // //               </span>
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
// // //               <span style={styles.label}>
// // //                 Upload Lower Scan <span style={styles.required}>*</span>
// // //               </span>
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
// // //           <div style={styles.toolRow}>
// // //             {CLEAN_MODEL_TOOLS.map((tool) => (
// // //               <button
// // //                 key={tool}
// // //                 style={styles.toolButton}
// // //                 onClick={() => onToolClick && onToolClick(tool)}
// // //               >
// // //                 {tool}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {activeTab === "Segment" && (
// // //           <div style={styles.toolRow}>
// // //             <button
// // //               style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
// // //               disabled={busy}
// // //               onClick={onIdentifyLat}
// // //             >
// // //               Identify LAT
// // //             </button>
// // //              <button style={styles.toolButton}>
// // //              Segment
// // //             </button>
// // //           </div>
// // //         )}
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
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 16,
// // //   },
// // //   toolButton: {
// // //     padding: "10px 22px",
// // //     background: "#5a5a5a",
// // //     color: "white",
// // //     border: "1px solid #777",
// // //     borderRadius: 4,
// // //     cursor: "pointer",
// // //     fontSize: 14,
// // //   },
// // // };












// // import { useRef, useState } from "react";
// // import ProgressBar from "./ProgressBar.jsx";

// // const TABS = ["File", "Clean Model", "Segment"];
// // const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];

// // export default function TopBar({
// //   upperName,
// //   lowerName,
// //   onUpperSelected,
// //   onLowerSelected,
// //   onIdentifyLat,
// //   onToolClick,
// //   busy,
// //   progress,
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

// //         {/* progress bar while Identify LAT works; otherwise normal messages (errors etc.) */}
// //         {progress ? (
// //           <ProgressBar percent={progress.percent} label={progress.label} />
// //         ) : (
// //           message && <span style={styles.message}>{message}</span>
// //         )}
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
// //             <button style={styles.toolButton}>Segment</button>
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

// const TABS = ["File", "Clean Model", "Segment", "Automatic Setup"];
// const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];
// const VIEWS = ["Front View", "Back View", "Top View", "Bottom View", "Left View", "Right View"];
// // const hoverOn = (e) => (e.currentTarget.style.background = "#505050");
// // const hoverOff = (e) => (e.currentTarget.style.background = "transparent");

// const ACTIVE_COLOR = "#4f8cff";
// const HOVER_COLOR = "#505050";

// // hover shows a grey box, but never replaces the blue of the active button
// const hoverOn = (e) => {
//   if (e.currentTarget.dataset.active !== "true") e.currentTarget.style.background = HOVER_COLOR;
// };
// const hoverOff = (e) => {
//   e.currentTarget.style.background =
//     e.currentTarget.dataset.active === "true" ? ACTIVE_COLOR : "transparent";
// };

// // which view each Clean Model tool shows
// const TOOL_VIEW = {
//   "Clean Model": "cleanModel",
//   "Generate Trimline": "generateTrimline",
//   "Trim Model": "trimModel",
//   "Add Base": "addBase",
// };

// const svgProps = {
//   width: 30,
//   height: 30,
//   viewBox: "0 0 32 32",
//   fill: "none",
//   stroke: "currentColor",
//   strokeWidth: 2,
//   strokeLinecap: "round",
//   strokeLinejoin: "round",
// };

// // two stacked jaws seen from the front or back
// // const FrontIcon = () => (
// //   <svg {...svgProps}>
// //     <path d="M5 13 C5 8 27 8 27 13 C27 16 5 16 5 13 Z" />
// //     <path d="M5 21 C5 16 27 16 27 21 C27 24 5 24 5 21 Z" />
// //   </svg>
// // );
// // const BackIcon = () => (
// //   <svg {...svgProps}>
// //     <path d="M5 13 C5 8 27 8 27 13 C27 16 5 16 5 13 Z" />
// //     <path d="M5 21 C5 16 27 16 27 21 C27 24 5 24 5 21 Z" />
// //     <path d="M11 13 H21" />
// //   </svg>
// // );


// // Front View: two stacked curved rectangles
// // Front View: traced from the hand-drawn sketch
// // Front View: two identical bands


// const jawProps = {
//   width: 34,
//   height: 30,
//   viewBox: "0 0 48 40",
//   strokeLinecap: "round",
//   strokeLinejoin: "round",
// };

// const EDGE = "#c9cfd8";

// const Defs = ({ id, dim }) => (
//   <defs>
//     <linearGradient id={`gum-${id}`} x1="0" y1="0" x2="0" y2="1">
//       <stop offset="0" stopColor="#ff9f99" />
//       <stop offset="0.5" stopColor="#f26f6a" />
//       <stop offset="1" stopColor="#d44d4d" />
//     </linearGradient>
//     <linearGradient id={`tooth-${id}`} x1="0" y1="0" x2="0" y2="1">
//       <stop offset="0" stopColor="#ffffff" />
//       <stop offset="1" stopColor={dim ? "#d3d8e0" : "#e8ecf1"} />
//     </linearGradient>
//   </defs>
// );


// // teeth of one row, from the left premolar to the right premolar
// const FRONT_TEETH = [
//   { type: "premolar", w: 4.2 },
//   { type: "canine", w: 4.0 },
//   { type: "lateral", w: 3.6 },
//   { type: "central", w: 4.8 },
//   { type: "central", w: 4.8 },
//   { type: "lateral", w: 3.6 },
//   { type: "canine", w: 4.0 },
//   { type: "premolar", w: 4.2 },
// ];

// // gives every tooth its x position and its center, so the row is centered
// const placeFrontTeeth = (gap) => {
//   const total = FRONT_TEETH.reduce((s, t) => s + t.w, 0) + gap * (FRONT_TEETH.length - 1);
//   let x = 24 - total / 2;
//   return FRONT_TEETH.map((t) => {
//     const item = { ...t, x, cx: x + t.w / 2 };
//     x += t.w + gap;
//     return item;
//   });
// };

// // one tooth in its own box: flat on the gum side (y = 0), rounded at the biting edge (y = h)
// const frontToothPath = (type, w, h) => {
//   const r = { central: 1.2, lateral: 1.8, canine: w / 2, premolar: 1.6 }[type];
//   return `M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
// };

// // ---------- Front / Back ----------
// // const FrontJaw = ({ id, dim, gum, base, toothH }) => {
// //   const N = 8, W = 4.4, GAP = 0.35;
// //   const start = 24 - (N * (W + GAP) - GAP) / 2;
// //   const half = (
// //     <>
// //       {Array.from({ length: N }, (_, i) => {
// //         const cx = start + i * (W + GAP) + W / 2;
// //         const u = (cx - 24) / 20;
// //         const yt = base + 4 * (1 - u * u);
// //         return (
// //           <rect
// //             key={i}
// //             x={cx - W / 2}
// //             y={yt - 1.5}
// //             width={W}
// //             height={toothH + 1.5}
// //             rx={1.6}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //             transform={`rotate(${-u * 6} ${cx} ${yt})`}
// //           />
// //         );
// //       })}
// //       <path d={gum} fill={`url(#gum-${id})`} />
// //     </>
// //   );
// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} dim={dim} />
// //       {half}
// //       <g transform="translate(0 40) scale(1 -1)">{half}</g>
// //     </svg>
// //   );
// // };


// const FrontJaw = ({ id, dim, gum, base, toothH }) => {
//   const teeth = placeFrontTeeth(0.35);
//   const half = (
//     <>
//       {teeth.map((t, i) => {
//         const u = (t.cx - 24) / 20;
//         const yt = base + 4 * (1 - u * u);
//         return (
//           <path
//             key={i}
//             d={frontToothPath(t.type, t.w, toothH + 1.5)}
//             transform={`rotate(${-u * 6} ${t.cx} ${yt}) translate(${t.x} ${yt - 1.5})`}
//             fill={`url(#tooth-${id})`}
//             stroke={EDGE}
//             strokeWidth={0.5}
//           />
//         );
//       })}
//       <path d={gum} fill={`url(#gum-${id})`} />
//     </>
//   );
//   // return (
//   //   <svg {...jawProps}>
//   //     <Defs id={id} dim={dim} />
//   //     {half}
//   //     <g transform="translate(0 40) scale(1 -1)">{half}</g>
//   //   </svg>
//   // );
//    return (
//   <svg {...jawProps}>
//     <Defs id={id} dim={dim} />
//     <g transform="translate(24 20) scale(0.88) translate(-24 -20)">
//       {half}
//       <g transform="translate(0 40) scale(1 -1)">{half}</g>
//     </g>
//   </svg>
// );

// };



// // const FrontIcon = () => {
// //   const id = "front";
// //   const N = 8;          // teeth per row
// //   const W = 4.2;        // tooth width
// //   const GAP = 0.3;
// //   const start = 24 - (N * (W + GAP) - GAP) / 2;

// //   // x center of each tooth, and how far it is from the middle (-1 to 1)
// //   const cols = Array.from({ length: N }, (_, i) => {
// //     const cx = start + i * (W + GAP) + W / 2;
// //     return { cx, u: (cx - 24) / 18 };
// //   });

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />

// //       {/* lower teeth */}
// //       {cols.map(({ cx, u }, i) => {
// //         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
// //         return (
// //           <rect
// //             key={"l" + i}
// //             x={cx - W / 2}
// //             y={top}
// //             width={W}
// //             height={32 - top}
// //             rx={1.6}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         );
// //       })}

// //       {/* lower gum (a bit narrower at the bottom) */}
// //       {/* <path
// //         d="M6 30 Q24 25 42 30 Q43 38 38 38 Q24 40 10 38 Q5 38 6 30 Z"
// //         fill={`url(#gum-${id})`}
// //       /> */}

// //       {/* lower gum: the upper gum flipped upside down (same shape and size) */}
// // <path
// //   transform="translate(0 40) scale(1 -1)"
// //   d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// //   fill={`url(#gum-${id})`}
// // />


// //       {/* upper teeth */}
// //       {cols.map(({ cx, u }, i) => {
// //         const bottom = 18 + 2 * (1 - u * u);
// //         return (
// //           <rect
// //             key={"u" + i}
// //             x={cx - W / 2}
// //             y={8}
// //             width={W}
// //             height={bottom - 8}
// //             rx={1.6}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         );
// //       })}

// //       {/* upper gum */}
// //       <path
// //         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
// //         fill={`url(#gum-${id})`}
// //       />
// //     </svg>
// //   );
// // };


// const FrontIcon = () => {
//   const id = "front";
//   const teeth = placeFrontTeeth(0.3);
//   const style = { fill: `url(#tooth-${id})`, stroke: EDGE, strokeWidth: 0.5 };

//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />

//       {/* lower teeth: the same shapes turned upside down */}
//       {teeth.map((t, i) => {
//         const u = (t.cx - 24) / 18;
//         const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
//         return (
//           <path
//             key={"l" + i}
//             transform={`translate(${t.x} 32) scale(1 -1)`}
//             d={frontToothPath(t.type, t.w, 32 - top)}
//             {...style}
//           />
//         );
//       })}

//       {/* lower gum: the upper gum flipped upside down */}
//       <path
//         transform="translate(0 40) scale(1 -1)"
//         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
//         fill={`url(#gum-${id})`}
//       />

//       {/* upper teeth */}
//       {teeth.map((t, i) => {
//         const u = (t.cx - 24) / 18;
//         const bottom = 18 + 2 * (1 - u * u);
//         return (
//           <path
//             key={"u" + i}
//             transform={`translate(${t.x} 8)`}
//             d={frontToothPath(t.type, t.w, bottom - 8)}
//             {...style}
//           />
//         );
//       })}

//       {/* upper gum */}
//       <path
//         d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
//         fill={`url(#gum-${id})`}
//       />

//        <Defs id={id} />
//     <g transform="translate(24 20) scale(0.88) translate(-24 -20)">

//       {/* ...everything that is already there: lower teeth, lower gum, upper teeth, upper gum... */}

//     </g>
//     </svg>
//   );
// };


// // const FrontIcon = () => {
// //   const id = "front";
// //   const N = 10;      // number of teeth per row (was 8)
// //   const UW = 3.3;    // upper tooth width (was 3.9)
// //   const LW = 3.3;    // lower tooth width (was 3.9)
// //   const GAP = 0.3;
// //   const uStart = 24 - (N * (UW + GAP) - GAP) / 2;
// //   const lStart = 24 - (N * (LW + GAP) - GAP) / 2;

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />

// //       {/* lower teeth */}
// //       {Array.from({ length: N }, (_, i) => {
// //         const cx = lStart + i * (LW + GAP) + LW / 2;
// //         const u = (cx - 24) / 20;
// //         const top = 18.5 + 2 * (1 - u * u);
// //         return (
// //           <rect
// //             key={"l" + i}
// //             x={cx - LW / 2}
// //             y={top}
// //             width={LW}
// //             height={13}
// //             rx={1.4}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         );
// //       })}

// //       {/* lower gum, moved up 1.5 so it covers more of the teeth */}
// //       <path
// //         transform="translate(0 -1.5)"
// //         d="M3 35 Q3 31 7 31 Q24 26.5 41 31 Q45 31 45 35 Q45 38.5 41 38 Q24 33 7 38 Q3 38.5 3 35 Z"
// //         fill={`url(#gum-${id})`}
// //       />

// //       {/* upper teeth */}
// //       {Array.from({ length: N }, (_, i) => {
// //         const cx = uStart + i * (UW + GAP) + UW / 2;
// //         const u = (cx - 24) / 20;
// //         const edge = 19.5 + 2 * (1 - u * u);
// //         return (
// //           <rect
// //             key={"u" + i}
// //             x={cx - UW / 2}
// //             y={7}
// //             width={UW}
// //             height={edge - 7}
// //             rx={1.4}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         );
// //       })}

// //       {/* upper gum, moved down 1.5 so it covers more of the teeth */}
// //       <path
// //         transform="translate(0 1.5)"
// //         d="M3 5 Q3 1.5 7 2.5 Q24 8 41 2.5 Q45 1.5 45 5 Q45 9 41 9 Q24 14 7 9 Q3 9 3 5 Z"
// //         fill={`url(#gum-${id})`}
// //       />
// //     </svg>
// //   );
// // };


// // const BackIcon = () => (
// //   <FrontJaw
// //     id="back"
// //     dim
// //     base={11}
// //     toothH={5}
// //     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 12 41 12 Q24 18 7 12 Q3 12 3 6 Z"
// //   />
// // );

// const BackIcon = () => (
//   <FrontJaw
//     id="back"
//     dim
//     base={9.5}   // was 11
//     toothH={6.5} // was 5
//     gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 10.5 41 10.5 Q24 16 7 10.5 Q3 10.5 3 6 Z"
//   />
// );

// // ---------- Left / Right ----------
// const SideJaw = ({ id, flip }) => {
//   const N = 10, W = 3.7, GAP = 0.3;
//   const start = 24 - (N * (W + GAP) - GAP) / 2;
//   const half = (
//     <>
//       {Array.from({ length: N }, (_, i) => (
//         <rect
//           key={i}
//           x={start + i * (W + GAP)}
//           y={10.5}
//           width={W}
//           height={9}
//           rx={1.5}
//           fill={`url(#tooth-${id})`}
//           stroke={EDGE}
//           strokeWidth={0.5}
//         />
//       ))}
//       <path
//         d="M3 6 Q3 2 7 2 H41 Q45 2 45 6 Q45 12 41 12 H7 Q3 12 3 6 Z"
//         fill={`url(#gum-${id})`}
//       />
//     </>
//   );
//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />
//       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
//         {half}
//         <g transform="translate(-1.5 40) scale(1 -1)">{half}</g>
//       </g>
//     </svg>
//   );
// };


// // const SideBite = ({ id, flip }) => {
// //   // back (molars) -> front (incisors)
// //   const W = [6.8, 6.8, 5, 5, 4.2, 3.6, 3.2];
// //   const GAP = 0.3;
// //   const upperBottom = [19, 19.5, 20.5, 21, 22, 21.5, 21]; // biting edge of upper teeth
// //   const lowerTop = [21.5, 21.5, 20.5, 20, 19.5, 19.5, 20]; // top edge of lower teeth

// //   const place = (start) => {
// //     let x = start;
// //     return W.map((w) => {
// //       const px = x;
// //       x += w + GAP;
// //       return px;
// //     });
// //   };
// //   const ux = place(5);   // upper row
// //   const lx = place(3.8); // lower row sits slightly behind

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// //         {/* lower teeth (drawn first, so the upper teeth overlap them) */}
// //         {W.map((w, i) => (
// //           <rect
// //             key={"l" + i}
// //             x={lx[i]}
// //             y={lowerTop[i]}
// //             width={w}
// //             height={32 - lowerTop[i]}
// //             rx={Math.min(w * 0.35, 2)}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         ))}

// //         {/* lower gum */}
// //         <path
// //           d="M3 34 Q3 30.5 7 30.5 H40 Q43 30.5 43 33.5 Q43 37.5 40 37.5 H7 Q3 38 3 34 Z"
// //           fill={`url(#gum-${id})`}
// //         />

// //         {/* upper teeth */}
// //         {W.map((w, i) => (
// //           <rect
// //             key={"u" + i}
// //             x={ux[i]}
// //             y={8}
// //             width={w}
// //             height={upperBottom[i] - 8}
// //             rx={Math.min(w * 0.35, 2)}
// //             fill={`url(#tooth-${id})`}
// //             stroke={EDGE}
// //             strokeWidth={0.5}
// //           />
// //         ))}

// //         {/* upper gum */}
// //         <path
// //           d="M3 6 Q3 2.5 7 2.5 H42 Q45 2.5 45 5.5 Q45 9.5 42 9.5 H7 Q3 10 3 6 Z"
// //           fill={`url(#gum-${id})`}
// //         />
// //       </g>
// //     </svg>
// //   );
// // };

// // const LeftIcon = () => <SideBite id="left" />;
// // const RightIcon = () => <SideBite id="right" flip />;



// // const SideBite = ({ id, flip }) => {
// //   const N = 7;     // teeth in the strip
// //   const W = 5;   // tooth width
// //   const GAP = 0.4;
// //   const X0 = 6;    // where the first tooth starts

// //   // top and bottom edge of the tooth strip (the gap between the two gums)
// //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// //         {/* teeth (they get taller towards the right, like the gap does) */}
// //         {/* {Array.from({ length: N }, (_, i) => {
// //           const x = X0 + i * (W + GAP);
// //           const t = topEdge(x + W / 2);
// //           const b = botEdge(x + W / 2);
// //           return (
// //             <rect
// //               key={i}
// //               x={x}
// //               y={t - 0.5}
// //               width={W}
// //               height={b - t + 1}
// //               rx={1.2}
// //               fill={`url(#tooth-${id})`}
// //               stroke={EDGE}
// //               strokeWidth={0.4}
// //             />
// //           );
// //         })} */}


// //         {/* teeth: upper half and lower half with a small gap in the middle */}
// // {Array.from({ length: N }, (_, i) => {
// //   const x = X0 + i * (W + GAP);
// //   const t = topEdge(x + W / 2) - 0.5;   // top of the tooth
// //   const b = botEdge(x + W / 2) + 0.5;   // bottom of the tooth
// //   const mid = (t + b) / 2;
// //   const BITE_GAP = 1.2;                  // gap between upper and lower teeth

// //   return (
// //     <g key={i}>
// //       <rect
// //         x={x}
// //         y={t}
// //         width={W}
// //         height={mid - BITE_GAP / 2 - t}
// //         rx={1.2}
// //         fill={`url(#tooth-${id})`}
// //         stroke={EDGE}
// //         strokeWidth={0.4}
// //       />
// //       <rect
// //         x={x}
// //         y={mid + BITE_GAP / 2}
// //         width={W}
// //         height={b - (mid + BITE_GAP / 2)}
// //         rx={1.2}
// //         fill={`url(#tooth-${id})`}
// //         stroke={EDGE}
// //         strokeWidth={0.4}
// //       />
// //     </g>
// //   );
// // })}

// //         {/* upper gum: short on the left, taller on the right */}
// //         <path
// //           // d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 16 L4 18.5 Z"
// //           // d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 15.2 L4 17.7 Z"
// //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// //           fill={`url(#gum-${id})`}
// //         />

// //         {/* lower gum */}
// //         <path
// //           // d="M4 21.5 L44 23 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// //           // d="M4 22.3 L44 23.8 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// //           fill={`url(#gum-${id})`}
// //         />
// //       </g>
// //     </svg>
// //   );
// // };


// // tooth outline in its own box (width w, height h): the gum side is at y = 0,
// // the chewing edge at y = h
// const toothPath = (type, w, h) => {
//   if (type === "incisor") {
//     return `M0.6 0 H${w - 0.6} L${w} ${h - 1.2} Q${w} ${h} ${w - 1} ${h} H1 Q0 ${h} 0 ${h - 1.2} Z`;
//   }
//   if (type === "canine") {
//     return `M0.6 0 H${w - 0.6} L${w} ${h * 0.6} Q${w} ${h * 0.75} ${w / 2} ${h} Q0 ${h * 0.75} 0 ${h * 0.6} Z`;
//   }
//   if (type === "premolar") {
//     return `M0.6 0 H${w - 0.6} L${w} ${h - 1.2} Q${w} ${h} ${w - 1.2} ${h} Q${w * 0.62} ${h - 0.4} ${w / 2} ${h - 1.3} Q${w * 0.38} ${h - 0.4} 1.2 ${h} Q0 ${h} 0 ${h - 1.2} Z`;
//   }
//   // molar: two bumps with a dip in the middle
//   return `M0.5 0 H${w - 0.5} L${w} ${h - 1.2} Q${w} ${h} ${w - 1.4} ${h} Q${w * 0.68} ${h - 1.4} ${w / 2} ${h - 0.7} Q${w * 0.32} ${h - 1.4} 1.4 ${h} Q0 ${h} 0 ${h - 1.2} Z`;
// };

// // const SideBite = ({ id, flip }) => {
// //   // from the back of the mouth (left) to the front (right)
// //   const TEETH = [
// //     { type: "molar", w: 6 },
// //     { type: "molar", w: 6 },
// //     { type: "premolar", w: 4.8 },
// //     { type: "premolar", w: 4.8 },
// //     { type: "canine", w: 4.4 },
// //     { type: "incisor", w: 4 },
// //     { type: "incisor", w: 4 },
// //   ];
// //   const GAP = 0.4;
// //   const X0 = 6;          // where the first tooth starts
// //   const BITE_GAP = 1.2;  // gap between the upper and lower teeth

// //   // top and bottom edge of the tooth strip (the gap between the two gums)
// //   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
// //   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;

// //   let x = X0;
// //   const placed = TEETH.map((t) => {
// //     const item = { ...t, x };
// //     x += t.w + GAP;
// //     return item;
// //   });

// //   return (
// //     <svg {...jawProps}>
// //       <Defs id={id} />
// //       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
// //         {placed.map((t, i) => {
// //           const top = topEdge(t.x + t.w / 2) - 0.5;
// //           const bottom = botEdge(t.x + t.w / 2) + 0.5;
// //           const mid = (top + bottom) / 2;
// //           const upperH = mid - BITE_GAP / 2 - top;
// //           const lowerH = bottom - (mid + BITE_GAP / 2);
// //           const style = {
// //             fill: `url(#tooth-${id})`,
// //             stroke: EDGE,
// //             strokeWidth: 0.4,
// //           };

// //           return (
// //             <g key={i}>
// //               {/* upper tooth */}
// //               <path transform={`translate(${t.x} ${top})`} d={toothPath(t.type, t.w, upperH)} {...style} />
// //               {/* lower tooth: the same shape turned upside down */}
// //               <path
// //                 transform={`translate(${t.x} ${bottom}) scale(1 -1)`}
// //                 d={toothPath(t.type, t.w, lowerH)}
// //                 {...style}
// //               />
// //             </g>
// //           );
// //         })}

// //         {/* upper gum */}
// //         <path
// //           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
// //           fill={`url(#gum-${id})`}
// //         />

// //         {/* lower gum */}
// //         <path
// //           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
// //           fill={`url(#gum-${id})`}
// //         />
// //       </g>
// //     </svg>
// //   );
// // };


// const SideBite = ({ id, flip }) => {
//   // from the back of the mouth (left) to the front (right)
//   const TEETH = [
//     { w: 6, rx: 1.8, ext: 0 },     // molar
//     { w: 6, rx: 1.8, ext: 0 },     // molar
//     { w: 4.8, rx: 1.5, ext: 0 },   // premolar
//     { w: 4.8, rx: 1.5, ext: 0 },   // premolar
//     { w: 4.4, rx: 2.2, ext: 0.7 }, // canine (a little taller, rounder)
//     { w: 4, rx: 1, ext: 0 },       // incisor
//     { w: 4, rx: 1, ext: 0 },       // incisor
//   ];
//   const GAP = 0.4;
//   const X0 = 6;          // where the first tooth starts
//   const BITE_GAP = 1.2;  // the centre gap, the same for every tooth

//   // top and bottom edge of the tooth strip
//   const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
//   const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;
//   const midEdge = (x) => (topEdge(x) + botEdge(x)) / 2; // the centre line

//   let x = X0;
//   const placed = TEETH.map((t) => {
//     const item = { ...t, x };
//     x += t.w + GAP;
//     return item;
//   });

//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />
//       <defs>
//         {/* one straight cut through all the teeth = one equal gap */}
//         <mask id={`bite-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="40">
//           <rect x="0" y="0" width="48" height="40" fill="white" />
//           <line x1="0" y1={midEdge(0)} x2="48" y2={midEdge(48)} stroke="black" strokeWidth={BITE_GAP} />
//         </mask>
//       </defs>

//       <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
//         <g mask={`url(#bite-${id})`}>
//           {placed.map((t, i) => {
//             const cx = t.x + t.w / 2;
//             const top = topEdge(cx) - 0.5 - t.ext;
//             const bottom = botEdge(cx) + 0.5 + t.ext;
//             return (
//               <rect
//                 key={i}
//                 x={t.x}
//                 y={top}
//                 width={t.w}
//                 height={bottom - top}
//                 rx={t.rx}
//                 fill={`url(#tooth-${id})`}
//                 stroke={EDGE}
//                 strokeWidth={0.4}
//               />
//             );
//           })}
//         </g>

//         {/* upper gum */}
//         <path
//           d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
//           fill={`url(#gum-${id})`}
//         />

//         {/* lower gum */}
//         <path
//           d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
//           fill={`url(#gum-${id})`}
//         />
//       </g>
//     </svg>
//   );
// };



// const LeftIcon = () => <SideBite id="left" />;
// const RightIcon = () => <SideBite id="right" flip />;

// // ---------- Top / Bottom ----------
// const ArchJaw = ({ id, lower }) => {
//   const CX = 24, CY = 22, RX = 15, RY = 17, COUNT = 14;
//   const outline = `M${CX - RX} ${CY + 0} V${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} V${CY + 0}`;
//   // gum band, moved inward so less gum sticks out on the outer side
// const GR = 1.5;
// const gumOutline = `M${CX - RX + GR} ${CY + 0} V${CY} A${RX - GR} ${RY - GR} 0 0 1 ${CX + RX - GR} ${CY} V${CY + 0}`;

//   return (
//     <svg {...jawProps}>
//       <Defs id={id} />
//       <g transform={lower ? "translate(0 40) scale(1 -1)" : undefined}>
//         {/* {!lower && <path d={`${outline} Z`} fill="#f8a29d" />} */}
//         <path d={outline} fill="none" stroke={`url(#gum-${id})`} strokeWidth={6} />
//         {Array.from({ length: COUNT }, (_, i) => {
//           const t = ((i + 0.5) * Math.PI) / COUNT;
//           const x = CX - RX * Math.cos(t);
//           const y = CY - RY * Math.sin(t);
//           const angle = (Math.atan2(-RY * Math.cos(t), RX * Math.sin(t)) * 180) / Math.PI;
//           return (
//             <rect
//               key={i}
//               x={-1.9}
//               y={-2.4}
//               width={3.8}
//               height={3.8}
//               rx={1.4}
//               fill={`url(#tooth-${id})`}
//               stroke={EDGE}
//               strokeWidth={0.5}
//               transform={`translate(${x} ${y}) rotate(${angle})`}
//             />
//           );
//         })}
//       </g>
//     </svg>
//   );
// };
// const TopIcon = () => <ArchJaw id="top" />;
// const BottomIcon = () => <ArchJaw id="bottom" lower />;



// const VIEW_ICONS = {
//   "Front View": <FrontIcon />,
//   "Back View": <BackIcon />,
//   "Top View": (
//   <span style={{ display: "flex", transform: "translateY(-5px)" }}>
//     <BottomIcon />
//   </span>
// ),
// "Bottom View": (
//   <span style={{ display: "flex", transform: "translateY(5px)" }}>
//     <TopIcon />
//   </span>
// ),

//   "Left View": <RightIcon />,     // swapped
//   "Right View": <LeftIcon />,     // swapped
// };

  

// export default function TopBar({
//   upperName,
//   lowerName,
//   onUpperSelected,
//   onLowerSelected,
//   onIdentifyLat,
//    onSegment,
//   onAutomaticSetup,
//   onInitialPosition,
//   onFinalPosition,
//   setupReady,
//   view,
//   onToolClick,
//   onViewChange,
//   busy,
//   progress,
//   message,
// }) {
//   // const [activeTab, setActiveTab] = useState("File");
//   const [activeTab, setActiveTab] = useState("Clean Model"); // the second bar no longer has a File page
// const [showFileDialog, setShowFileDialog] = useState(false);
//    const [activeView, setActiveView] = useState(null); // the view button shown in blue
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
//             // onClick={() => setActiveTab(tab)}

//           onClick={() => {
//          setActiveTab(tab);
//          if (tab === "Automatic Setup" && onAutomaticSetup) onAutomaticSetup();
//           }}

//             style={{
//               ...styles.tabButton,
//               background: activeTab === tab ? "#4f8cff" : "#3a3a3a",
//             }}
//           >
//             {tab}
//           </button>
//         ))}

//         {/* normal messages (errors etc.) */}
//         {message && <span style={styles.message}>{message}</span>}
//       </div>

//       {/* ---------- Second top bar (dark grey, taller) ---------- */}
//       <div style={styles.secondBar}>
//         {activeTab === "File" && (
//           <>
//             <div style={styles.row}>
//               {/* <button style={styles.browseButton} onClick={() => upperInputRef.current.click()}>
//                 Browse
//               </button> */}

//               <button
//          data-active={!!upperName}
//           style={{
//           ...styles.browseButton,
//             background: upperName ? ACTIVE_COLOR : "transparent",
//         }}
//          onClick={() => upperInputRef.current.click()}
//        onMouseEnter={hoverOn}
//        onMouseLeave={hoverOff}
//          >
//           Browse
//        </button>
              
            

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
//               {/* <button style={styles.browseButton} onClick={() => lowerInputRef.current.click()}>
//                 Browse
//               </button> */}

//             <button
//          data-active={!!lowerName}
//           style={{
//       ...styles.browseButton,
//       background: lowerName ? ACTIVE_COLOR : "transparent",
//       }}
//       onClick={() => lowerInputRef.current.click()}
//       onMouseEnter={hoverOn}
//         onMouseLeave={hoverOff}
//         >
//     Browse
//    </button>

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
//             {/* {CLEAN_MODEL_TOOLS.map((tool) => (
//               <button
//              key={tool}
//             style={styles.toolButton}
//             onClick={() => onToolClick && onToolClick(tool)}
//              onMouseEnter={hoverOn}
//              onMouseLeave={hoverOff}
//             >
//                 {tool}
//               </button>
//             ))} */}

//            {CLEAN_MODEL_TOOLS.map((tool) => {
//           const isActive = view === TOOL_VIEW[tool];
//      return (
//     <button
//       key={tool}
//       data-active={isActive}
//       style={{ ...styles.toolButton, background: isActive ? ACTIVE_COLOR : "transparent" }}
//       onClick={() => onToolClick && onToolClick(tool)}
//       onMouseEnter={hoverOn}
//       onMouseLeave={hoverOff}
//     >
//       {tool}
//     </button>
//   );
// })}
          

//           </div>
//         )}

//         {activeTab === "Segment" && (
//           <div style={styles.toolRow}>
//            {/* <button
//             style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
//            disabled={busy}
//            onClick={onIdentifyLat}
//           onMouseEnter={hoverOn}
//            onMouseLeave={hoverOff}
//            >
//               Identify LAT
//             </button> */}

//           <button
//   data-active={view === "identifyLat"}
//   style={{
//     ...styles.toolButton,
//     background: view === "identifyLat" ? ACTIVE_COLOR : "transparent",
//     opacity: busy ? 0.5 : 1,
//   }}
//   disabled={busy}
//   onClick={onIdentifyLat}
//   onMouseEnter={hoverOn}
//   onMouseLeave={hoverOff}
// >
//   Identify LAT
// </button>
           

//             {/* <button
//           style={{ ...styles.toolButton, opacity: busy ? 0.5 : 1 }}
//           disabled={busy}
//           onClick={onSegment}>
//           Segment
//          </button> */}

//          <button
//   data-active={view === "segment"}
//   style={{
//     ...styles.toolButton,
//     background: view === "segment" ? ACTIVE_COLOR : "transparent",
//     opacity: busy ? 0.5 : 1,
//   }}
//   disabled={busy}
//   onClick={onSegment}
//   onMouseEnter={hoverOn}
//   onMouseLeave={hoverOff}
// >
//   Segment
// </button>
        

//           </div>
//         )}

//      {activeTab === "Automatic Setup" && setupReady && (
//   <div style={styles.toolRow}>
//     {/* <button
//       style={{
//         ...styles.toolButton,
//         // background: view === "segment" ? "#4f8cff" : "#5a5a5a",
//         background: view === "segment" ? "#4f8cff" : "transparent",
//         opacity: busy ? 0.5 : 1,
//       }}
//       disabled={busy}
//       onClick={onInitialPosition}
//     >
//       Initial Position
//     </button> */}

//    <button
//   data-active={view === "segment"}
//   style={{
//     ...styles.toolButton,
//     background: view === "segment" ? ACTIVE_COLOR : "transparent",
//     opacity: busy ? 0.5 : 1,
//   }}
//   disabled={busy}
//   onClick={onInitialPosition}
//   onMouseEnter={hoverOn}
//   onMouseLeave={hoverOff}
// >
//   Initial Position
// </button>


//     {/* <button
//       style={{
//         ...styles.toolButton,
//         // background: view === "automaticSetup" ? "#4f8cff" : "#5a5a5a",
//         background: view === "automaticSetup" ? "#4f8cff" : "transparent",
//         opacity: busy ? 0.5 : 1,
//       }}
//       disabled={busy}
//       onClick={onFinalPosition}
//     >
//       Final Position
//     </button> */}

//     <button
//   data-active={view === "automaticSetup"}
//   style={{
//     ...styles.toolButton,
//     background: view === "automaticSetup" ? ACTIVE_COLOR : "transparent",
//     opacity: busy ? 0.5 : 1,
//   }}
//   disabled={busy}
//   onClick={onFinalPosition}
//   onMouseEnter={hoverOn}
//   onMouseLeave={hoverOff}
// >
//   Final Position
// </button>
//   </div>
// )}


//         {/* progress bar: centered inside the second bar */}
//         {progress && (
//           <div style={styles.progressWrapper}>
//             <ProgressBar percent={progress.percent} label={progress.label} />
//           </div>
//         )}
//       </div>

//            <div style={styles.thirdBar}>
//   {/* {VIEWS.map((v) => (
//     <button
//       key={v}
//       style={{
//         ...styles.viewButton,
//         background: activeView === v ? "#4f8cff" : "transparent",
//         color: activeView === v ? "#ffffff" : "#ffffff",
//       }}
//       onClick={() => {
//         setActiveView(v);
//         onViewChange && onViewChange(v);
//       }}
//     >
//       {VIEW_ICONS[v]}
//       <span style={styles.viewLabel}>{v}</span>
//     </button>
//   ))} */}

// {VIEWS.map((v) => {
//   const isActive = activeView === v;
//   return (
//     <button
//       key={v}
//       data-active={isActive}
//       style={{
//         ...styles.viewButton,
//         background: isActive ? ACTIVE_COLOR : "transparent",
//         color: "#ffffff",
//       }}
//       onClick={() => {
//         setActiveView(v);
//         onViewChange && onViewChange(v);
//       }}
//       onMouseEnter={hoverOn}
//       onMouseLeave={hoverOff}
//     >
//       {VIEW_ICONS[v]}
//       <span style={styles.viewLabel}>{v}</span>
//     </button>
//   );
// })}

// </div>


                   
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
//     color: "#ffffff",
//     fontSize: 14,
//   },
//   // secondBar: {
//   //   position: "relative", // needed to center the progress bar inside this bar
//   //   minHeight: 100,
//   //   background: "#3b3b3b",
//   //   padding: "12px 16px",
//   //   display: "flex",
//   //   flexDirection: "column",
//   //   justifyContent: "center",
//   //   gap: 12,
//   //   boxSizing: "border-box",
//   // },

//   secondBar: {
//   position: "relative",
//   height: 70,                 // fixed height instead of minHeight
//   background: "#3b3b3b",
//   padding: "0 16px",          // no top/bottom padding, so centering is exact
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",   // centers the buttons vertically
//   gap: 8,                     // space between the two File rows
//   boxSizing: "border-box",
// },

//   progressWrapper: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     pointerEvents: "none", // clicks go through to the buttons below
//   },
//   row: {
//     display: "flex",
//     alignItems: "center",
//     gap: 14,
//   },
//   // browseButton: {
//   //   padding: "6px 16px",
//   //   background: "#5a5a5a",
//   //   color: "white",
//   //   border: "1px solid #777",
//   //   borderRadius: 4,
//   //   cursor: "pointer",
//   //   fontSize: 14,
//   // },

// browseButton: {
//   padding: "6px 16px",
//   background: "transparent",   // was "#5a5a5a"
//   color: "white",
//   border: "none",              // was "1px solid #777"
//   borderRadius: 4,
//   cursor: "pointer",
//   fontSize: 14,
// },

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
//     gap: 1,
//   },
//   // toolButton: {
//   //   padding: "10px 22px",
//   //   background: "#5a5a5a",
//   //   color: "white",
//   //   border: "1px solid #777",
//   //   borderRadius: 4,
//   //   cursor: "pointer",
//   //   fontSize: 14,
//   // },

// // toolButton: {
// //   padding: "10px 22px",
// //   background: "transparent",   // was "#5a5a5a"
// //   color: "white",
// //   border: "none",              // was "1px solid #777"
// //   borderRadius: 4,
// //   cursor: "pointer",
// //   fontSize: 14,
// // },


// toolButton: {
//   height: 72,            // taller than wide = vertical box
//   minWidth: 64,
//   padding: "0 10px",
//   background: "transparent",
//   color: "white",
//   border: "none",
//   borderRadius: 8,
//   cursor: "pointer",
//   fontSize: 14,
// },



//   //   thirdBar: {
//   //   height: 44,
//   //   background: "#6b6b6b", // grey
//   //   display: "flex",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   padding: "0 16px",
//   //   gap: 12,
//   //   boxSizing: "border-box",
//   // },
//   // viewButton: {
//   //   padding: "6px 16px",
//   //   background: "#8a8a8a",
//   //   color: "white",
//   //   border: "1px solid #a0a0a0",
//   //   borderRadius: 4,
//   //   cursor: "pointer",
//   //   fontSize: 14,
//   // },


//   thirdBar: {
//   minHeight: 56,
//   background: "#0b0b0b",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "6px 16px",
//   gap: 6,
//   boxSizing: "border-box",
// },
// viewButton: {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: 4,
//   padding: "3px 8px",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
//   minWidth: 60,
// },
// viewLabel: {
//   fontSize: 12,
// },

// };








import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TABS = ["File", "Clean Model", "Segment", "Setup"];
const CLEAN_MODEL_TOOLS = ["Clean Model", "Generate Trimline", "Trim Model", "Add Base"];
const VIEWS = ["Front View", "Back View", "Top View", "Bottom View", "Left View", "Right View"];

const ACTIVE_COLOR = "#4f8cff";
const VIEW_ACTIVE_COLOR = "#6b6b6b";
const HOVER_COLOR = "#505050";

// hover shows a grey box, but never replaces the blue of the active button
const hoverOn = (e) => {
  if (e.currentTarget.dataset.active !== "true") e.currentTarget.style.background = HOVER_COLOR;
};
const hoverOff = (e) => {
  e.currentTarget.style.background =
    e.currentTarget.dataset.active === "true" ? ACTIVE_COLOR : "transparent";
};

const DONE_COLOR = "#000000"; // second bar: the clicked button

// hover for the second bar buttons: grey only when the button has no color of its own
const toolHoverOn = (e) => {
  if (e.currentTarget.dataset.bg === "transparent") e.currentTarget.style.background = HOVER_COLOR;
};
const toolHoverOff = (e) => {
  e.currentTarget.style.background = e.currentTarget.dataset.bg;
};


// which view each Clean Model tool shows
const TOOL_VIEW = {
  "Clean Model": "cleanModel",
  "Generate Trimline": "generateTrimline",
  "Trim Model": "trimModel",
  "Add Base": "addBase",
};

// =====================================================================
// View icons (the size of all six icons is set by jawProps)
// =====================================================================
const jawProps = {
  width: 34,
  height: 30,
  viewBox: "0 0 48 40",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const EDGE = "#c9cfd8";

const Defs = ({ id, dim }) => (
  <defs>
    <linearGradient id={`gum-${id}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ff9f99" />
      <stop offset="0.5" stopColor="#f26f6a" />
      <stop offset="1" stopColor="#d44d4d" />
    </linearGradient>
    <linearGradient id={`tooth-${id}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="1" stopColor={dim ? "#d3d8e0" : "#e8ecf1"} />
    </linearGradient>
  </defs>
);

// teeth of one row, from the left premolar to the right premolar
const FRONT_TEETH = [
  { type: "premolar", w: 4.2 },
  { type: "canine", w: 4.0 },
  { type: "lateral", w: 3.6 },
  { type: "central", w: 4.8 },
  { type: "central", w: 4.8 },
  { type: "lateral", w: 3.6 },
  { type: "canine", w: 4.0 },
  { type: "premolar", w: 4.2 },
];

// gives every tooth its x position and its center, so the row is centered
const placeFrontTeeth = (gap) => {
  const total = FRONT_TEETH.reduce((s, t) => s + t.w, 0) + gap * (FRONT_TEETH.length - 1);
  let x = 24 - total / 2;
  return FRONT_TEETH.map((t) => {
    const item = { ...t, x, cx: x + t.w / 2 };
    x += t.w + gap;
    return item;
  });
};

// one tooth in its own box: flat on the gum side (y = 0), rounded at the biting edge (y = h)
const frontToothPath = (type, w, h) => {
  const r = { central: 1.2, lateral: 1.8, canine: w / 2, premolar: 1.6 }[type];
  return `M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
};

// ---------- Front / Back ----------
const FrontJaw = ({ id, dim, gum, base, toothH }) => {
  const teeth = placeFrontTeeth(0.35);
  const half = (
    <>
      {teeth.map((t, i) => {
        const u = (t.cx - 24) / 20;
        const yt = base + 4 * (1 - u * u);
        return (
          <path
            key={i}
            d={frontToothPath(t.type, t.w, toothH + 1.5)}
            transform={`rotate(${-u * 6} ${t.cx} ${yt}) translate(${t.x} ${yt - 1.5})`}
            fill={`url(#tooth-${id})`}
            stroke={EDGE}
            strokeWidth={0.5}
          />
        );
      })}
      <path d={gum} fill={`url(#gum-${id})`} />
    </>
  );
  return (
    <svg {...jawProps}>
      <Defs id={id} dim={dim} />
      <g transform="translate(24 20) scale(0.88) translate(-24 -20)">
        {half}
        <g transform="translate(0 40) scale(1 -1)">{half}</g>
      </g>
    </svg>
  );
};

const FrontIcon = () => {
  const id = "front";
  const teeth = placeFrontTeeth(0.3);
  const style = { fill: `url(#tooth-${id})`, stroke: EDGE, strokeWidth: 0.5 };

  return (
    <svg {...jawProps}>
      <Defs id={id} />

      {/* lower teeth: the same shapes turned upside down */}
      {teeth.map((t, i) => {
        const u = (t.cx - 24) / 18;
        const top = 19.5 + 2 * (1 - u * u); // follows the smile curve
        return (
          <path
            key={"l" + i}
            transform={`translate(${t.x} 32) scale(1 -1)`}
            d={frontToothPath(t.type, t.w, 32 - top)}
            {...style}
          />
        );
      })}

      {/* lower gum: the upper gum flipped upside down */}
      <path
        transform="translate(0 40) scale(1 -1)"
        d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
        fill={`url(#gum-${id})`}
      />

      {/* upper teeth */}
      {teeth.map((t, i) => {
        const u = (t.cx - 24) / 18;
        const bottom = 18 + 2 * (1 - u * u);
        return (
          <path
            key={"u" + i}
            transform={`translate(${t.x} 8)`}
            d={frontToothPath(t.type, t.w, bottom - 8)}
            {...style}
          />
        );
      })}

      {/* upper gum */}
      <path
        d="M5 8 Q5 3 10 4 Q24 1 38 4 Q43 3 43 8 Q43 12 39 12 Q24 9 9 12 Q5 12 5 8 Z"
        fill={`url(#gum-${id})`}
      />
    </svg>
  );
};

const BackIcon = () => (
  <FrontJaw
    id="back"
    dim
    base={9.5}
    toothH={6.5}
    gum="M3 6 Q3 1 7 2 Q24 8 41 2 Q45 1 45 6 Q45 10.5 41 10.5 Q24 16 7 10.5 Q3 10.5 3 6 Z"
  />
);

// ---------- Left / Right ----------
const SideBite = ({ id, flip }) => {
  // from the back of the mouth (left) to the front (right)
  const TEETH = [
    { w: 6, rx: 1.8, ext: 0 }, // molar
    { w: 6, rx: 1.8, ext: 0 }, // molar
    { w: 4.8, rx: 1.5, ext: 0 }, // premolar
    { w: 4.8, rx: 1.5, ext: 0 }, // premolar
    { w: 4.4, rx: 2.2, ext: 0.7 }, // canine (a little taller, rounder)
    { w: 4, rx: 1, ext: 0 }, // incisor
    { w: 4, rx: 1, ext: 0 }, // incisor
  ];
  const GAP = 0.4;
  const X0 = 6; // where the first tooth starts
  const BITE_GAP = 1.2; // the centre gap, the same for every tooth

  // top and bottom edge of the tooth strip
  const topEdge = (x) => 17.0 - ((x - 4) / 40) * 2.5;
  const botEdge = (x) => 23.0 + ((x - 4) / 40) * 1.5;
  const midEdge = (x) => (topEdge(x) + botEdge(x)) / 2; // the centre line

  let x = X0;
  const placed = TEETH.map((t) => {
    const item = { ...t, x };
    x += t.w + GAP;
    return item;
  });

  return (
    <svg {...jawProps}>
      <Defs id={id} />
      <defs>
        {/* one straight cut through all the teeth = one equal gap */}
        <mask id={`bite-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="40">
          <rect x="0" y="0" width="48" height="40" fill="white" />
          <line x1="0" y1={midEdge(0)} x2="48" y2={midEdge(48)} stroke="black" strokeWidth={BITE_GAP} />
        </mask>
      </defs>

      <g transform={flip ? "translate(48 0) scale(-1 1)" : undefined}>
        <g mask={`url(#bite-${id})`}>
          {placed.map((t, i) => {
            const cx = t.x + t.w / 2;
            const top = topEdge(cx) - 0.5 - t.ext;
            const bottom = botEdge(cx) + 0.5 + t.ext;
            return (
              <rect
                key={i}
                x={t.x}
                y={top}
                width={t.w}
                height={bottom - top}
                rx={t.rx}
                fill={`url(#tooth-${id})`}
                stroke={EDGE}
                strokeWidth={0.4}
              />
            );
          })}
        </g>

        {/* upper gum */}
        <path
          d="M4 15 Q4 12.5 7 12.2 L41 8.2 Q44 8 44 11 L44 14.5 L4 17.0 Z"
          fill={`url(#gum-${id})`}
        />

        {/* lower gum */}
        <path
          d="M4 23.0 L44 24.5 L44 29 Q44 32 41 31.8 L7 27.8 Q4 27.5 4 25 Z"
          fill={`url(#gum-${id})`}
        />
      </g>
    </svg>
  );
};

const LeftIcon = () => <SideBite id="left" />;
const RightIcon = () => <SideBite id="right" flip />;

// ---------- Top / Bottom ----------
const ArchJaw = ({ id, lower }) => {
  const CX = 24, CY = 22, RX = 15, RY = 17, COUNT = 14;
  const outline = `M${CX - RX} ${CY} V${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} V${CY}`;

  return (
    <svg {...jawProps}>
      <Defs id={id} />
      <g transform={lower ? "translate(0 40) scale(1 -1)" : undefined}>
        <path d={outline} fill="none" stroke={`url(#gum-${id})`} strokeWidth={6} />
        {Array.from({ length: COUNT }, (_, i) => {
          const t = ((i + 0.5) * Math.PI) / COUNT;
          const x = CX - RX * Math.cos(t);
          const y = CY - RY * Math.sin(t);
          const angle = (Math.atan2(-RY * Math.cos(t), RX * Math.sin(t)) * 180) / Math.PI;
          return (
            <rect
              key={i}
              x={-1.9}
              y={-2.4}
              width={3.8}
              height={3.8}
              rx={1.4}
              fill={`url(#tooth-${id})`}
              stroke={EDGE}
              strokeWidth={0.5}
              transform={`translate(${x} ${y}) rotate(${angle})`}
            />
          );
        })}
      </g>
    </svg>
  );
};
const TopIcon = () => <ArchJaw id="top" />;
const BottomIcon = () => <ArchJaw id="bottom" lower />;

const VIEW_ICONS = {
  "Front View": <FrontIcon />,
  "Back View": <BackIcon />,
  "Top View": (
    <span style={{ display: "flex", transform: "translateY(-5px)" }}>
      <BottomIcon />
    </span>
  ),
  "Bottom View": (
    <span style={{ display: "flex", transform: "translateY(5px)" }}>
      <TopIcon />
    </span>
  ),
  "Left View": <RightIcon />, // swapped
  "Right View": <LeftIcon />, // swapped
};

// =====================================================================
// The top bars
// =====================================================================
export default function TopBar({
  upperName,
  lowerName,
  onUpperSelected,
  onLowerSelected,
  onIdentifyLat,
  onSegment,
  onAutomaticSetup,
  onInitialPosition,
  onFinalPosition,
  setupReady,
  view,
  onToolClick,
  onViewChange,
  busy,
  progress,
  message,
    showGrid,
  onToggleGrid,
  gridSize,
  onGridSizeChange,
    showSuperimpose,
  onToggleSuperimpose,
  showOcclusion,
  onToggleOcclusion,
  showMovement,
  onToggleMovement,

}) {
  // the second bar shows the tools of this tab (File has no page there, it opens a dialog)
  const [activeTab, setActiveTab] = useState("Clean Model");
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [pendingUpper, setPendingUpper] = useState(null); // picked in the window, not loaded yet
const [pendingLower, setPendingLower] = useState(null);
  const [activeView, setActiveView] = useState(null); // the view button shown in blue
  const [clickedTool, setClickedTool] = useState(null); // the second bar button clicked last

// black for the clicked button, nothing for the others
const toolColor = (key) => (clickedTool === key ? DONE_COLOR : "transparent");

// the other buttons look disabled while an exe runs
const toolOpacity = (key) => (busy && clickedTool !== key ? 0.5 : 1);
  const upperInputRef = useRef(null);
  const lowerInputRef = useRef(null);

  // const handleChange = (e, callback) => {
  //   const file = e.target.files[0];
  //   if (file) callback(file);
  //   e.target.value = "";
  // };
  // the picked file is only kept in the window until OK is clicked
const handlePick = (e, setPending) => {
  const file = e.target.files[0];
  if (file) setPending(file);
  e.target.value = "";
};

const openFileDialog = () => {
  setPendingUpper(null);
  setPendingLower(null);
  setShowFileDialog(true);
};

const cancelFileDialog = () => {
  setPendingUpper(null);
  setPendingLower(null);
  setShowFileDialog(false);
};

const confirmFileDialog = () => {
  if (pendingUpper) onUpperSelected(pendingUpper);
  if (pendingLower) onLowerSelected(pendingLower);
  setPendingUpper(null);
  setPendingLower(null);
  setShowFileDialog(false);
};

  return (
    <div>
      {/* ---------- First top bar (dark black) ---------- */}
      <div style={styles.firstBar}>
        {TABS.map((tab) => {
          const isActive = tab === "File" ? showFileDialog : activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                if (tab === "File") {
                  // setShowFileDialog(true); // File only opens the upload window
                  openFileDialog(); // File only opens the upload window
                  return;
                }
                setActiveTab(tab);
                if (tab === "Setup" && onAutomaticSetup) onAutomaticSetup();
              }}
              style={{
                ...styles.tabButton,
                background: isActive ? ACTIVE_COLOR : "#3a3a3a",
              }}
            >
              {tab}
            </button>
          );
        })}

        {/* normal messages (errors etc.) */}
        {message && <span style={styles.message}>{message}</span>}
      </div>

      {/* ---------- Second top bar (dark grey) ---------- */}
      <div style={styles.secondBar}>
        {/* {activeTab === "Clean Model" && (
          <div style={styles.toolRow}>
            {CLEAN_MODEL_TOOLS.map((tool) => {
              const isActive = view === TOOL_VIEW[tool];
              return (
                <button
                  key={tool}
                  data-active={isActive}
                  style={{ ...styles.toolButton, background: isActive ? ACTIVE_COLOR : "transparent" }}
                  onClick={() => onToolClick && onToolClick(tool)}
                  onMouseEnter={hoverOn}
                  onMouseLeave={hoverOff}
                >
                  {tool}
                </button>
              );
            })}
          </div>
        )}

        {activeTab === "Segment" && (
          <div style={styles.toolRow}>
            <button
              data-active={view === "identifyLat"}
              style={{
                ...styles.toolButton,
                background: view === "identifyLat" ? ACTIVE_COLOR : "transparent",
                opacity: busy ? 0.5 : 1,
              }}
              disabled={busy}
              onClick={onIdentifyLat}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              Identify LAT
            </button>

            <button
              data-active={view === "segment"}
              style={{
                ...styles.toolButton,
                background: view === "segment" ? ACTIVE_COLOR : "transparent",
                opacity: busy ? 0.5 : 1,
              }}
              disabled={busy}
              onClick={onSegment}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              Segment
            </button>
          </div>
        )}

        {activeTab === "Automatic Setup" && setupReady && (
          <div style={styles.toolRow}>
            <button
              data-active={view === "segment"}
              style={{
                ...styles.toolButton,
                background: view === "segment" ? ACTIVE_COLOR : "transparent",
                opacity: busy ? 0.5 : 1,
              }}
              disabled={busy}
              onClick={onInitialPosition}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              Initial Position
            </button>

            <button
              data-active={view === "automaticSetup"}
              style={{
                ...styles.toolButton,
                background: view === "automaticSetup" ? ACTIVE_COLOR : "transparent",
                opacity: busy ? 0.5 : 1,
              }}
              disabled={busy}
              onClick={onFinalPosition}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              Final Position
            </button>
          </div>
        )} */}

        {activeTab === "Clean Model" && (
  <div style={styles.toolRow}>
    {CLEAN_MODEL_TOOLS.map((tool) => {
      const bg = toolColor(tool);
      return (
        <button
          key={tool}
          data-bg={bg}
          style={{ ...styles.toolButton, background: bg, opacity: toolOpacity(tool) }}
          onClick={() => {
            setClickedTool(tool);
            onToolClick && onToolClick(tool);
          }}
          onMouseEnter={toolHoverOn}
          onMouseLeave={toolHoverOff}
        >
          {tool}
        </button>
      );
    })}
  </div>
)}

{activeTab === "Segment" && (
  <div style={styles.toolRow}>
    <button
      data-bg={toolColor("identifyLat")}
      style={{
        ...styles.toolButton,
        background: toolColor("identifyLat"),
        opacity: toolOpacity("identifyLat"),
      }}
      disabled={busy}
      onClick={() => {
        setClickedTool("identifyLat");
        onIdentifyLat();
      }}
      onMouseEnter={toolHoverOn}
      onMouseLeave={toolHoverOff}
    >
      Identify LAT
    </button>

    <button
      data-bg={toolColor("segment")}
      style={{
        ...styles.toolButton,
        background: toolColor("segment"),
        opacity: toolOpacity("segment"),
      }}
      disabled={busy}
      onClick={() => {
        setClickedTool("segment");
        onSegment();
      }}
      onMouseEnter={toolHoverOn}
      onMouseLeave={toolHoverOff}
    >
      Segment
    </button>
  </div>
)}

{activeTab === "Setup" && setupReady && (
  <div style={styles.toolRow}>
    <button
      data-bg={toolColor("initial")}
      style={{
        ...styles.toolButton,
        background: toolColor("initial"),
        opacity: toolOpacity("initial"),
      }}
      disabled={busy}
      onClick={() => {
        setClickedTool("initial");
        onInitialPosition();
      }}
      onMouseEnter={toolHoverOn}
      onMouseLeave={toolHoverOff}
    >
      Initial Position
    </button>

    <button
      data-bg={toolColor("final")}
      style={{
        ...styles.toolButton,
        background: toolColor("final"),
        opacity: toolOpacity("final"),
      }}
      disabled={busy}
      onClick={() => {
        setClickedTool("final");
        onFinalPosition();
      }}
      onMouseEnter={toolHoverOn}
      onMouseLeave={toolHoverOff}
    >
      Final Position
    </button>



    <button
  data-bg={showGrid ? DONE_COLOR : "transparent"}
  style={{
    ...styles.toolButton,
    background: showGrid ? DONE_COLOR : "transparent",
  }}
  onClick={onToggleGrid}
  onMouseEnter={toolHoverOn}
  onMouseLeave={toolHoverOff}
>
  Grid
</button>



{showGrid && (

<select
  value={gridSize}
  onChange={(e) => onGridSizeChange(Number(e.target.value))}
  style={styles.gridSelect}
>
  <option value={1}>1 mm</option>
  <option value={2}>2 mm</option>
  <option value={5}>5 mm</option>
</select>

)}



<button
  data-bg={showSuperimpose ? DONE_COLOR : "transparent"}
  style={{
    ...styles.toolButton,
    background: showSuperimpose ? DONE_COLOR : "transparent",
  }}
  onClick={onToggleSuperimpose}
  onMouseEnter={toolHoverOn}
  onMouseLeave={toolHoverOff}
>
  Superimpose
</button>

<button
  data-bg={showOcclusion ? DONE_COLOR : "transparent"}
  style={{
    ...styles.toolButton,
    background: showOcclusion ? DONE_COLOR : "transparent",
  }}
  onClick={onToggleOcclusion}
  onMouseEnter={toolHoverOn}
  onMouseLeave={toolHoverOff}
>
  Occlusion
</button>

<button
  data-bg={showMovement ? DONE_COLOR : "transparent"}
  style={{
    ...styles.toolButton,
    background: showMovement ? DONE_COLOR : "transparent",
  }}
  onClick={onToggleMovement}
  onMouseEnter={toolHoverOn}
  onMouseLeave={toolHoverOff}
>
  Movement
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

      {/* ---------- Third bar (the six views) ---------- */}
      <div style={styles.thirdBar}>
        {/* {VIEWS.map((v) => {
          const isActive = activeView === v;
          return (
            <button
              key={v}
              data-active={isActive}
              style={{
                ...styles.viewButton,
                // background: isActive ? ACTIVE_COLOR : "transparent",
                background: isActive ? VIEW_ACTIVE_COLOR : "transparent",
                color: "#ffffff",
              }}
              onClick={() => {
                setActiveView(v);
                onViewChange && onViewChange(v);
              }}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              {VIEW_ICONS[v]}
              <span style={styles.viewLabel}>{v}</span>
            </button>
          );
        })} */}

       {VIEWS.map((v) => {
  const bg = activeView === v ? VIEW_ACTIVE_COLOR : "transparent";
  return (
    <button
      key={v}
      data-bg={bg}
      style={{
        ...styles.viewButton,
        background: bg,
        color: "#ffffff",
      }}
      onClick={() => {
        setActiveView(v);
        onViewChange && onViewChange(v);
      }}
      onMouseEnter={toolHoverOn}
      onMouseLeave={toolHoverOff}
    >
      {VIEW_ICONS[v]}
      <span style={styles.viewLabel}>{v}</span>
    </button>
  );
})}

      </div>

      {/* ---------- Upload window (opened by the File button) ---------- */}
      {showFileDialog && (
  <div style={styles.overlay} onClick={cancelFileDialog}>
    <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
      <div style={styles.dialogTitle}>Upload Scan Files</div>

      <div style={styles.row}>
        <button
          data-active={!!(pendingUpper || upperName)}
          style={{
            ...styles.browseButton,
            background: pendingUpper || upperName ? ACTIVE_COLOR : "transparent",
          }}
          onClick={() => upperInputRef.current.click()}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          Browse
        </button>
        <span style={styles.label}>
          Upload Upper Scan <span style={styles.required}>*</span>
        </span>
        <span style={styles.fileName}>{pendingUpper ? pendingUpper.name : upperName}</span>
        <input
          type="file"
          accept=".stl"
          ref={upperInputRef}
          onChange={(e) => handlePick(e, setPendingUpper)}
          style={{ display: "none" }}
        />
      </div>

      <div style={styles.row}>
        <button
          data-active={!!(pendingLower || lowerName)}
          style={{
            ...styles.browseButton,
            background: pendingLower || lowerName ? ACTIVE_COLOR : "transparent",
          }}
          onClick={() => lowerInputRef.current.click()}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          Browse
        </button>
        <span style={styles.label}>
          Upload Lower Scan <span style={styles.required}>*</span>
        </span>
        <span style={styles.fileName}>{pendingLower ? pendingLower.name : lowerName}</span>
        <input
          type="file"
          accept=".stl"
          ref={lowerInputRef}
          onChange={(e) => handlePick(e, setPendingLower)}
          style={{ display: "none" }}
        />
      </div>

      {/* <div style={styles.dialogButtons}>
        <button style={styles.cancelButton} onClick={cancelFileDialog}>
          Cancel
        </button>
        <button style={styles.okButton} onClick={confirmFileDialog}>
          OK
        </button>
      </div> */}

          <div style={styles.dialogButtons}>
         <button style={styles.okButton} onClick={confirmFileDialog}>
         OK
        </button>
      <button style={styles.cancelButton} onClick={cancelFileDialog}>
      Cancel
     </button>
   </div>
    </div>
  </div>
)}
      
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
    height: 44, // fixed height, the File page is gone so it can be short
    background: "#3b3b3b",
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // centers the buttons vertically
    gap: 8,
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
    background: "transparent",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
  },
  label: {
    color: "#e0e0e0",
    fontSize: 14,
    minWidth: 150,
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
    gap: 1,
  },
  toolButton: {
    height: 34, // must be lower than the height of secondBar
    minWidth: 64,
    padding: "0 10px",
    background: "transparent",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },
  thirdBar: {
    minHeight: 56,
    background: "#0b0b0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 16px",
    gap: 6,
    boxSizing: "border-box",
  },
  viewButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "3px 8px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    minWidth: 60,
  },
  viewLabel: {
    fontSize: 12,
  },

  // ----- upload window -----
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  dialog: {
    background: "#3b3b3b",
    padding: "20px 28px",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minWidth: 300,
  },
  dialogTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // closeButton: {
  //   alignSelf: "flex-end",
  //   padding: "6px 18px",
  //   background: "#5a5a5a",
  //   color: "white",
  //   border: "none",
  //   borderRadius: 4,
  //   cursor: "pointer",
  //   fontSize: 14,
  // },

  dialogButtons: {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
},
cancelButton: {
  padding: "6px 18px",
  background: "#5a5a5a",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 14,
},
okButton: {
  padding: "6px 24px",
  background: ACTIVE_COLOR,
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 14,
},
  gridSelect: {
    height: 28,
    margin:"0 6px",
    padding: "0 6px",
    background: "#5a5a5a",
    color: "white",
    border: "none",
    borderRadius: 4,
    fontSize: 14,
    cursor: "pointer",
  },

};




