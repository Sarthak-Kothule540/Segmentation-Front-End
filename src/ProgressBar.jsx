// export default function ProgressBar({ percent, label }) {
//   const done = percent >= 100;

//   return (
//     <div style={styles.track}>
//       {/* the colored part that grows */}
//       <div
//         style={{
//           ...styles.fill,
//           width: `${percent}%`,
//           background: done ? "#2e9e5b" : "#4f8cff", // green when finished
//         }}
//       />
//       {/* the text inside the bar */}
//       <span style={styles.text}>{done ? label : `${label} ${percent}%`}</span>
//     </div>
//   );
// }

// const styles = {
//   track: {
//     position: "relative",
//     width: 340,
//     height: 24,
//     background: "#2a2a2a",
//     border: "1px solid #555",
//     borderRadius: 12,
//     overflow: "hidden",
//     marginLeft: 20,
//   },
//   fill: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     transition: "width 0.6s ease",
//   },
//   text: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     fontSize: 12,
//     whiteSpace: "nowrap",
//   },
// };




export default function ProgressBar({ percent, label }) {
  const done = percent >= 100;

  return (
    <div style={styles.track}>
      {/* the colored part that grows */}
      <div
        style={{
          ...styles.fill,
          width: `${percent}%`,
          background: done ? "#2e9e5b" : "#4f8cff", // green when finished
        }}
      />
      {/* the text inside the bar */}
      <span style={styles.text}>{done ? label : `${label} ${percent}%`}</span>
    </div>
  );
}

const styles = {
  track: {
    position: "relative",
    width: "15%",   // half of the screen width
    minWidth: 350,
    height: 40,
    background: "#2a2a2a",
    border: "1px solid #666",
    borderRadius: 22,
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    transition: "width 0.6s ease",
  },
  text: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
};