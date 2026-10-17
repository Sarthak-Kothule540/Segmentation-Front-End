// function EyeIcon({ open }) {
//   const common = {
//     width: 18,
//     height: 18,
//     viewBox: "0 0 24 24",
//     fill: "none",
//     stroke: "currentColor",
//     strokeWidth: 2,
//     strokeLinecap: "round",
//     strokeLinejoin: "round",
//   };

//   // open eye = jaw is visible, crossed eye = jaw is hidden
//   return open ? (
//     <svg {...common}>
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   ) : (
//     <svg {...common}>
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//       <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   );
// }

// function EyeButton({ label, visible, disabled, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       style={{
//         ...styles.button,
//         background: visible ? "#3a3a3a" : "#4f8cff", // blue when the jaw is hidden
//         opacity: disabled ? 0.5 : 1,
//         cursor: disabled ? "not-allowed" : "pointer",
//       }}
//     >
//       <EyeIcon open={visible} />
//       {/* <span>{visible ? `${label}` : `${label}`}</span> */}
//       <span>{label}</span>
//     </button>
//   );
// }

// export default function VisibilityButtons({
//   showUpper,
//   showLower,
//   hasUpper,
//   hasLower,
//   onToggleUpper,
//   onToggleLower,
// }) {
//   return (
//     <div style={styles.panel}>
//       <EyeButton label="Upper" visible={showUpper} disabled={!hasUpper} onClick={onToggleUpper} />
//       <EyeButton label="Lower" visible={showLower} disabled={!hasLower} onClick={onToggleLower} />
//     </div>
//   );
// }

// const styles = {
//   panel: {
//     position: "absolute",
//     top: 12,
//     right: 16,
//     display: "flex",
//     flexDirection: "column", // Hide Upper first, Hide Lower below it
//     gap: 10,
//     zIndex: 10,
//   },
//   button: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     // minWidth: 90,
//     padding: "9px 14px",
//     color: "white",
//     border: "1px solid #666",
//     borderRadius: 6,
//     fontSize: 14,
//   },
// };















function EyeIcon({ open }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  // open eye = shown, crossed eye = hidden
  return open ? (
    <svg {...common}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg {...common}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function EyeButton({ label, visible, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        background: visible ? "#3a3a3a" : "#4f8cff", // blue when hidden
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <EyeIcon open={visible} />
      <span>{label}</span>
    </button>
  );
}

export default function VisibilityButtons({
  showUpper,
  showLower,
  hasUpper,
  hasLower,
  onToggleUpper,
  onToggleLower,
  segmentedUpper, // true after Segment has separated the upper jaw
  segmentedLower, // true after Segment has separated the lower jaw
  segVisible, // { upperTeeth, upperGum, lowerTeeth, lowerGum }
  onToggleSeg, // (key) => ...
  hasNumbers, // true when the tooth numbers exist (after Segment)
  showNumbers,
  onToggleNumbers,
}) {
  const segmented = segmentedUpper || segmentedLower;

  return (
    <div style={styles.panel}>
      <EyeButton label="Upper Jaw" visible={showUpper} disabled={!hasUpper} onClick={onToggleUpper} />
      <EyeButton label="Lower Jaw" visible={showLower} disabled={!hasLower} onClick={onToggleLower} />

      {/* these four buttons appear only after Segment is done */}
      {segmented && (
        <>
          
          <EyeButton
            label="Upper Teeths"
            visible={segVisible.upperTeeth}
            disabled={!segmentedUpper}
            onClick={() => onToggleSeg("upperTeeth")}
          />
          <EyeButton
            label="Upper Gum"
            visible={segVisible.upperGum}
            disabled={!segmentedUpper}
            onClick={() => onToggleSeg("upperGum")}
          />
          <EyeButton
            label="Lower Teeths"
            visible={segVisible.lowerTeeth}
            disabled={!segmentedLower}
            onClick={() => onToggleSeg("lowerTeeth")}
          />
          <EyeButton
            label="Lower Gum"
            visible={segVisible.lowerGum}
            disabled={!segmentedLower}
            onClick={() => onToggleSeg("lowerGum")}
          />
        </>
      )}
       
        {/* appears after Segment, when the tooth numbers exist */}
         {hasNumbers && (
           <EyeButton label="Teeth Numbers" visible={showNumbers} onClick={onToggleNumbers} />
         )}



    </div>
  );
}

const styles = {
  panel: {
    position: "absolute",
    top: 12,
    right: 16,
    display: "flex",
    flexDirection: "column", // buttons are stacked
    gap: 10,
    zIndex: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 130, // all buttons have the same width
    padding: "9px 14px",
    color: "white",
    border: "1px solid #666",
    borderRadius: 6,
    fontSize: 14,
  },
  divider: {
    height: 1,
    background: "#555",
    margin: "2px 0",
  },
};