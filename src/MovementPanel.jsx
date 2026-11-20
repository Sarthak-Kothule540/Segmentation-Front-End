// // ---------------- Movement panel: the table on the left side of the 3D view ----------------
// // One row per tooth, six columns (see movement.js for what each number and letter means).

// import { MOVEMENT_ROWS } from "./movement.js";

// const ARROW = "#5b6fd6"; // blue arrows in the header icons
// const TOOTH_FILL = "#f7cdd3"; // pink tooth
// const TOOTH_LINE = "#c79aa2";
// const LETTER = "#555";

// // column explanations (shown when the mouse is over a header icon)
// const COLUMN_TITLES = [
//   "Extrusion (O) / Intrusion (G), mm",
//   "Mesial (M) / Distal (D), mm",
//   "Buccal (B) / Lingual (L), mm",
//   "Rotation: mesial out (O) / mesial in (I), degrees",
//   "Torque: crown buccal (B) / lingual (L), degrees",
//   "Angulation: crown mesial (M) / distal (D), degrees",
// ];

// // ---------- header icons (small SVG drawings, 40 x 30) ----------

// // a tooth standing upright: root on top, pink crown at the bottom
// function Tooth({ x = 20, y = 15, scale = 1, rotate = 0 }) {
//   return (
//     <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
//       <path
//         d="M-5,1 L-3.5,-9 C-3,-12 3,-12 3.5,-9 L5,1"
//         fill="#fbe4e7"
//         stroke={TOOTH_LINE}
//         strokeWidth="0.8"
//       />
//       <path
//         d="M-6,0 C-6.5,6 -4,11 0,11 C4,11 6.5,6 6,0 C3,-1.5 -3,-1.5 -6,0 Z"
//         fill={TOOTH_FILL}
//         stroke={TOOTH_LINE}
//         strokeWidth="0.8"
//       />
//     </g>
//   );
// }

// // a straight arrow with heads at both ends
// function DoubleArrow({ x1, y1, x2, y2 }) {
//   const a = Math.atan2(y2 - y1, x2 - x1);
//   const head = (x, y, ang) => {
//     const s = 2.6;
//     const p1 = [x - s * Math.cos(ang - 0.5), y - s * Math.sin(ang - 0.5)];
//     const p2 = [x - s * Math.cos(ang + 0.5), y - s * Math.sin(ang + 0.5)];
//     return <path d={`M${p1} L${x},${y} L${p2}`} fill="none" stroke={ARROW} strokeWidth="1.1" />;
//   };
//   return (
//     <g>
//       <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ARROW} strokeWidth="1.1" />
//       {head(x2, y2, a)}
//       {head(x1, y1, a + Math.PI)}
//     </g>
//   );
// }

// // a curved arrow (part of a circle) with a head at the end
// function ArcArrow({ cx, cy, r, from, to }) {
//   const rad = (d) => (d * Math.PI) / 180;
//   const p = (d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
//   const [x1, y1] = p(from);
//   const [x2, y2] = p(to);
//   const sweep = to > from ? 1 : 0;
//   const large = Math.abs(to - from) > 180 ? 1 : 0;
//   const tangent = rad(to) + (sweep ? Math.PI / 2 : -Math.PI / 2);
//   const s = 2.4;
//   const h1 = [x2 - s * Math.cos(tangent - 0.5), y2 - s * Math.sin(tangent - 0.5)];
//   const h2 = [x2 - s * Math.cos(tangent + 0.5), y2 - s * Math.sin(tangent + 0.5)];
//   return (
//     <g fill="none" stroke={ARROW} strokeWidth="1.1">
//       <path d={`M${x1},${y1} A${r},${r} 0 ${large} ${sweep} ${x2},${y2}`} />
//       <path d={`M${h1} L${x2},${y2} L${h2}`} />
//     </g>
//   );
// }

// function Letter({ x, y, children }) {
//   return (
//     <text x={x} y={y} fontSize="7" fill={LETTER} fontFamily="Arial, sans-serif" textAnchor="middle">
//       {children}
//     </text>
//   );
// }

// const ICONS = [
//   // 1. up / down: G (gingival) on top, O (occlusal) at the bottom
//   <>
//     <Tooth x={22} />
//     <DoubleArrow x1={12} y1={5} x2={12} y2={25} />
//     <Letter x={30} y={8}>G</Letter>
//     <Letter x={8} y={28}>O</Letter>
//   </>,
//   // 2. mesial / distal
//   <>
//     <Tooth x={20} />
//     <DoubleArrow x1={9} y1={21} x2={31} y2={21} />
//     <Letter x={8} y={9}>M</Letter>
//     <Letter x={33} y={28}>D</Letter>
//   </>,
//   // 3. lingual / buccal
//   <>
//     <Tooth x={20} />
//     <DoubleArrow x1={9} y1={25} x2={31} y2={25} />
//     <Letter x={8} y={9}>L</Letter>
//     <Letter x={33} y={29}>B</Letter>
//   </>,
//   // 4. rotation around the long axis, seen from the biting side
//   <>
//     <ellipse cx={20} cy={15} rx={7} ry={4.5} fill={TOOTH_FILL} stroke={TOOTH_LINE} strokeWidth="0.8" />
//     <ellipse cx={20} cy={15} rx={3.5} ry={2} fill="none" stroke={TOOTH_LINE} strokeWidth="0.6" />
//     <ArcArrow cx={20} cy={15} r={10} from={200} to={330} />
//     <ArcArrow cx={20} cy={15} r={10} from={20} to={150} />
//     <Letter x={20} y={6}>O</Letter>
//     <Letter x={20} y={29}>I</Letter>
//   </>,
//   // 5. torque: crown tips lingual / buccal
//   <>
//     <Tooth x={20} />
//     <ArcArrow cx={20} cy={4} r={14} from={130} to={100} />
//     <ArcArrow cx={20} cy={4} r={14} from={50} to={80} />
//     <Letter x={26} y={29}>L</Letter>
//     <Letter x={35} y={29}>B</Letter>
//   </>,
//   // 6. angulation: crown tips mesial / distal
//   <>
//     <Tooth x={20} />
//     <DoubleArrow x1={9} y1={20} x2={13} y2={6} />
//     <DoubleArrow x1={31} y1={20} x2={27} y2={6} />
//     <Letter x={6} y={26}>M</Letter>
//     <Letter x={35} y={26}>D</Letter>
//   </>,
// ];

// function HeaderIcon({ index }) {
//   return (
//     <svg width="40" height="30" viewBox="0 0 40 30" style={{ display: "block", margin: "0 auto" }}>
//       <title>{COLUMN_TITLES[index]}</title>
//       {ICONS[index]}
//     </svg>
//   );
// }

// // ---------- the panel ----------

// // movement: { "11": { values: [...6], letters: [...6] }, ... } from computeMovement
// export default function MovementPanel({ movement, onClose }) {
//   // the usual 28 teeth; wisdom teeth (18, 28, 38, 48) are added only if the case has them
//   const rows = [...MOVEMENT_ROWS];
//   if (movement["18"]) rows.unshift("18");
//   if (movement["28"]) rows.splice(rows.indexOf(null), 0, "28");
//   if (movement["48"]) rows.splice(rows.indexOf(null) + 1, 0, "48");
//   if (movement["38"]) rows.push("38");

//   return (
//     <div style={styles.panel} onPointerDown={(e) => e.stopPropagation()}>
//       <div style={styles.titleRow}>
//         <span style={styles.title}>Movement</span>
//         <button style={styles.close} onClick={onClose} title="Close">
//           ✕
//         </button>
//       </div>

//       <div style={styles.subRow}>
//         <span style={styles.subtitle}>Movement reference point</span>
//         <span style={styles.refLink} title="Crown center (center of the tooth surface)">
//           ⌄ Reference points
//         </span>
//       </div>

//       <div style={styles.scroll}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={{ ...styles.th, width: 34 }} />
//               {ICONS.map((_, i) => (
//                 <th key={i} style={styles.th}>
//                   <HeaderIcon index={i} />
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((id, r) =>
//               id === null ? (
//                 <tr key={`gap-${r}`}>
//                   <td colSpan={7} style={styles.gap} />
//                 </tr>
//               ) : (
//                 <tr key={id}>
//                   <td style={styles.toothCell}>{id}</td>
//                   {Array.from({ length: 6 }, (_, c) => {
//                     const m = movement[id];
//                     return (
//                       <td key={c} style={styles.cell}>
//                         {m ? `${m.values[c].toFixed(2)} ${m.letters[c]}` : "–"}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   panel: {
//     position: "absolute",
//     left: 16,
//     top: 16,
//     bottom: 16,
//     width: 400,
//     maxWidth: "calc(100% - 32px)",
//     display: "flex",
//     flexDirection: "column",
//     background: "#fff",
//     borderRadius: 4,
//     boxShadow: "0 4px 18px rgba(0, 0, 0, 0.25)",
//     fontFamily: "Roboto, Arial, sans-serif",
//     color: "#222",
//     zIndex: 5,
//   },
//   titleRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "12px 14px 6px",
//   },
//   title: { fontSize: 15, fontWeight: 700 },
//   close: {
//     border: "none",
//     background: "transparent",
//     color: "#999",
//     fontSize: 15,
//     cursor: "pointer",
//     padding: 2,
//   },
//   subRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "6px 14px 10px",
//   },
//   subtitle: { fontSize: 13, fontWeight: 700 },
//   refLink: { fontSize: 12, color: "#4a6fd8", cursor: "default" },
//   scroll: { flex: 1, overflowY: "auto", padding: "0 14px 12px" },
//   table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
//   th: {
//     position: "sticky",
//     top: 0,
//     background: "#f3f4f6",
//     padding: "6px 0",
//     borderBottom: "1px solid #e3e3e3",
//     zIndex: 1,
//   },
//   toothCell: {
//     fontWeight: 700,
//     padding: "6px 4px 6px 8px",
//     borderBottom: "1px solid #e8e8e8",
//     whiteSpace: "nowrap",
//   },
//   cell: {
//     textAlign: "center",
//     padding: "6px 2px",
//     borderBottom: "1px solid #e8e8e8",
//     whiteSpace: "nowrap",
//   },
//   gap: { height: 28, borderBottom: "1px solid #e8e8e8" },
// };




// ---------------- Movement panel: the table on the left side of the 3D view ----------------
// One row per tooth, six columns (see movement.js for what each number and letter means).

import { MOVEMENT_ROWS } from "./movement.js";


// column explanations (shown when the mouse is over a header icon)
const COLUMN_TITLES = [
  "Extrusion (O) / Intrusion (G), mm",
  "Mesial (M) / Distal (D), mm",
  "Buccal (B) / Lingual (L), mm",
  "Rotation: mesial out (O) / mesial in (I), degrees",
  "Torque: crown buccal (B) / lingual (L), degrees",
  "Angulation: crown mesial (M) / distal (D), degrees",
];

// ---------- header icons (small SVG drawings, 44 x 34, copied from the reference table) ----------

const PURPLE = "#7a6fe0"; // arrows and the center dot
const ROOT_PINK = "#f6d0d0"; // the root behind the crown
const OUTLINE = "#2b2b2b"; // dark line around the crown

// pale pink root, drawn behind the crown
const Root = () => <path d="M17.5,17 C16.5,9 18.5,1.5 22,1.5 C25.5,1.5 27.5,9 26.5,17 Z" fill={ROOT_PINK} />;

// crown seen from the front (white, rounded box)
const FrontCrown = () => (
  <path
    d="M17,15 C17,13.2 18,12.6 22,12.6 C26,12.6 27,13.2 27,15 L27.4,25.2 C27.4,27 26.4,27.6 22,27.6 C17.6,27.6 16.6,27 16.6,25.2 Z"
    fill="#fff"
    stroke={OUTLINE}
    strokeWidth="1"
  />
);

// crown seen from the side (wide at the top, pointed at the biting edge)
const SideCrown = () => (
  <path
    d="M17,14.5 C17,12.6 19,12.4 20,13.6 C21,12.6 23,12.6 24,13.6 C25,12.4 27,12.8 27,14.8 C27,19 26.6,23.4 25,26.8 C24,28.6 22.4,28.9 21.4,27.4 C19.2,24 17,19.2 17,14.5 Z"
    fill="#fff"
    stroke={OUTLINE}
    strokeWidth="1"
  />
);

// purple ring with a dot in the middle (the movement reference point)
const CenterDot = ({ x = 22, y = 20 }) => (
  <g>
    <circle cx={x} cy={y} r={2.7} fill="#fff" stroke={PURPLE} strokeWidth="1.1" />
    <circle cx={x} cy={y} r={1.2} fill={PURPLE} />
  </g>
);

// filled arrow head at (x, y) pointing in direction ang (radians)
const Head = ({ x, y, ang }) => {
  const s = 3.2, w = 0.5;
  const p1 = [x - s * Math.cos(ang - w), y - s * Math.sin(ang - w)];
  const p2 = [x - s * Math.cos(ang + w), y - s * Math.sin(ang + w)];
  return <path d={`M${x},${y} L${p1} L${p2} Z`} fill={PURPLE} />;
};

// straight arrow; both = heads at both ends
function Arrow({ x1, y1, x2, y2, both = false }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={PURPLE} strokeWidth="1.2" />
      <Head x={x2} y={y2} ang={a} />
      {both && <Head x={x1} y={y1} ang={a + Math.PI} />}
    </g>
  );
}

function Letter({ x, y, children }) {
  return (
    <text x={x} y={y} fontSize="9" fill="#222" fontFamily="Arial, sans-serif" textAnchor="middle">
      {children}
    </text>
  );
}

const ICONS = [
  // 1. up / down: G on top right, O bottom left
  <>
    <Root />
    <FrontCrown />
    <Arrow x1={22} y1={6} x2={22} y2={32} both />
    <CenterDot />
    <Letter x={33} y={11}>G</Letter>
    <Letter x={11} y={31}>O</Letter>
  </>,
  // 2. mesial / distal (front view)
  <>
    <Root />
    <FrontCrown />
    <Arrow x1={9} y1={20} x2={35} y2={20} both />
    <CenterDot />
    <Letter x={9} y={13}>M</Letter>
    <Letter x={35} y={31}>D</Letter>
  </>,
  // 3. lingual / buccal (side view)
  <>
    <Root />
    <SideCrown />
    <Arrow x1={9} y1={20} x2={35} y2={20} both />
    <CenterDot />
    <Letter x={9} y={13}>L</Letter>
    <Letter x={35} y={31}>B</Letter>
  </>,
  // 4. rotation, seen from the biting side: pink arch, tooth in the middle, curved arrow on the right
  <>
    <path d="M5,20.5 Q22,14.5 39,20.5" fill="none" stroke={ROOT_PINK} strokeWidth="5" strokeLinecap="round" />
    <rect x={17} y={14.5} width={10} height={6} rx={2.5} fill="#fff" stroke={OUTLINE} strokeWidth="0.9" />
    <circle cx={20.5} cy={17.5} r={1.6} fill="none" stroke={PURPLE} strokeWidth="0.9" />
    <circle cx={23.5} cy={17.5} r={1.6} fill="none" stroke={PURPLE} strokeWidth="0.9" />
    <path d="M24.5,8.5 A9,9 0 0 1 24.5,26.5" fill="none" stroke={PURPLE} strokeWidth="1.2" />
    <Head x={24.5} y={8.5} ang={Math.PI} />
    <Head x={24.5} y={26.5} ang={Math.PI} />
    <Letter x={19} y={9}>O</Letter>
    <Letter x={19} y={32}>I</Letter>
  </>,
  // 5. torque (side view): crown tips lingual or buccal
  <>
    <Root />
    <SideCrown />
    <CenterDot />
    <Arrow x1={14.5} y1={5} x2={11.5} y2={19} />
    <Arrow x1={29.5} y1={5} x2={32.5} y2={19} />
    <Letter x={12} y={31}>L</Letter>
    <Letter x={33} y={31}>B</Letter>
  </>,
  // 6. angulation (front view): crown tips mesial or distal
  <>
    <Root />
    <FrontCrown />
    <CenterDot />
    <Arrow x1={14.5} y1={5} x2={11.5} y2={19} />
    <Arrow x1={29.5} y1={5} x2={32.5} y2={19} />
    <Letter x={10} y={31}>M</Letter>
    <Letter x={34} y={31}>D</Letter>
  </>,
];

function HeaderIcon({ index }) {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" style={{ display: "block", margin: "0 auto" }}>
      <title>{COLUMN_TITLES[index]}</title>
      {ICONS[index]}
    </svg>
  );
}

// ---------- the panel ----------

// movement: { "11": { values: [...6], letters: [...6] }, ... } from computeMovement
export default function MovementPanel({ movement, onClose }) {
  // the usual 28 teeth; wisdom teeth (18, 28, 38, 48) are added only if the case has them
  const rows = [...MOVEMENT_ROWS];
  if (movement["18"]) rows.unshift("18");
  if (movement["28"]) rows.splice(rows.indexOf(null), 0, "28");
  if (movement["48"]) rows.splice(rows.indexOf(null) + 1, 0, "48");
  if (movement["38"]) rows.push("38");

  return (
    <div style={styles.panel} onPointerDown={(e) => e.stopPropagation()}>
      <div style={styles.titleRow}>
        <span style={styles.title}>Movement</span>
        <button style={styles.close} onClick={onClose} title="Close">
          ✕
        </button>
      </div>

      <div style={styles.subRow}>
        <span style={styles.subtitle}>Movement reference point</span>
        <span style={styles.refLink} title="Crown center (center of the tooth surface)">
          ⌄ Reference points
        </span>
      </div>

      <div style={styles.scroll}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: 34 }} />
              {ICONS.map((_, i) => (
                <th key={i} style={styles.th}>
                  <HeaderIcon index={i} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((id, r) =>
              id === null ? (
                <tr key={`gap-${r}`}>
                  <td colSpan={7} style={styles.gap} />
                </tr>
              ) : (
                <tr key={id}>
                  <td style={styles.toothCell}>{id}</td>
                  {Array.from({ length: 6 }, (_, c) => {
                    const m = movement[id];
                    return (
                      <td key={c} style={styles.cell}>
                        {m ? `${m.values[c].toFixed(2)} ${m.letters[c]}` : "–"}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    position: "absolute",
    left: 16,
    top: 16,
    bottom: 16,
    width: 400,
    maxWidth: "calc(100% - 32px)",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 4,
    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.25)",
    fontFamily: "Roboto, Arial, sans-serif",
    color: "#222",
    zIndex: 5,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px 6px",
  },
  title: { fontSize: 15, fontWeight: 700 },
  close: {
    border: "none",
    background: "transparent",
    color: "#999",
    fontSize: 15,
    cursor: "pointer",
    padding: 2,
  },
  subRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 14px 10px",
  },
  subtitle: { fontSize: 13, fontWeight: 700 },
  refLink: { fontSize: 12, color: "#4a6fd8", cursor: "default" },
  scroll: { flex: 1, overflowY: "auto", padding: "0 14px 12px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: {
    position: "sticky",
    top: 0,
    background: "#f3f4f6",
    padding: "6px 0",
    borderBottom: "1px solid #e3e3e3",
    zIndex: 1,
  },
  toothCell: {
    fontWeight: 700,
    padding: "6px 4px 6px 8px",
    borderBottom: "1px solid #e8e8e8",
    whiteSpace: "nowrap",
  },
  cell: {
    textAlign: "center",
    padding: "6px 2px",
    borderBottom: "1px solid #e8e8e8",
    whiteSpace: "nowrap",
  },
  gap: { height: 28, borderBottom: "1px solid #e8e8e8" },
};
