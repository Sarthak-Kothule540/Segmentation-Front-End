// ---------------- Measurement panel: the tools and the list of measurements, on the left of the 3D view ----------------
// Top: the two tools (distance with two points, angle with three points).
// Below: every measurement made in this view, with show / hide and delete (see measurement.js).

const PURPLE = "#6a55c9";

// small line icons (drawn in the text colour)
const DistanceIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 14 L14 2" strokeLinecap="round" />
  </svg>
);
const AngleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2 L2 8 L14 14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EyeIcon = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    {open ? (
      <>
        <path d="M2 12 C5 6 9 4 12 4 C15 4 19 6 22 12 C19 18 15 20 12 20 C9 20 5 18 2 12 Z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3.2" />
      </>
    ) : (
      <path d="M3 10 C6 14.5 9 16 12 16 C15 16 18 14.5 21 10 M7 14.6 L5.5 17 M12 16 V19 M17 14.6 L18.5 17" strokeLinecap="round" />
    )}
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 6 H20 M9 6 V4 H15 V6 M6 6 L7 20 H17 L18 6 M10 10 V16 M14 10 V16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// one of the two tool buttons
function ToolButton({ active, onClick, icon, children }) {
  return (
    <button
      style={{
        ...styles.tool,
        background: active ? "#fff" : "#f2f3f5",
        borderColor: active ? PURPLE : "#f2f3f5",
        color: active ? PURPLE : "#333",
      }}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// the on/off switch next to "show all"
function Switch({ on, onChange }) {
  return (
    <button
      style={{ ...styles.switch, background: on ? PURPLE : "#c8cbd0" }}
      onClick={() => onChange(!on)}
      title={on ? "Hide all" : "Show all"}
    >
      <span style={{ ...styles.knob, left: on ? 17 : 3 }} />
    </button>
  );
}

// mode: null, "distance" or "angle" (the tool in use)
// pendingCount: how many points of the measurement being made are already clicked
// records: the measurements of this view (makeRecord in measurement.js)
export default function MeasurementPanel({
  mode,
  onModeChange,
  pendingCount = 0,
  records,
  onToggleRecord,
  onDeleteRecord,
  onShowAll,
  onClearAll,
  onClose,
  top = 16,
  bottom = 16,
}) {
  const allShown = records.length > 0 && records.every((r) => r.visible);
  const need = mode === "distance" ? 2 : 3;

  return (
    <div style={{ ...styles.panel, top, bottom }} onPointerDown={(e) => e.stopPropagation()}>
      {/* <div style={styles.titleRow}>
        <span style={styles.title}>Measurement</span>
        <button style={styles.close} onClick={onClose} title="Close">
          ✕
        </button>
      </div> */}
      <div style={styles.titleRow}>
  <span style={styles.titleSide} />
  <span style={styles.title}>Measurement</span>
  <span style={{ ...styles.titleSide, textAlign: "right" }}>
    <button style={styles.close} onClick={onClose} title="Close">✕</button>
  </span>
</div>


      <div style={styles.scroll}>
        {/* <div style={styles.section}>Measuring tool</div> */}
        <div style={{ ...styles.section, textAlign: "center" }}>Measuring tool</div>
        <ToolButton
          active={mode === "distance"}
          onClick={() => onModeChange(mode === "distance" ? null : "distance")}
          icon={<DistanceIcon />}
        >
          distance with two point
        </ToolButton>
        <ToolButton
          active={mode === "angle"}
          onClick={() => onModeChange(mode === "angle" ? null : "angle")}
          icon={<AngleIcon />}
        >
          angle with three point
        </ToolButton>
        {mode && (
          <div style={styles.hint}>
            Click point {Math.min(pendingCount + 1, need)} of {need} on the teeth or gum.
            {mode === "angle" && " The second point is the corner of the angle."} Press Esc to cancel.
          </div>
        )}

        <div style={{ ...styles.section, marginTop: 26 }}>measurement record</div>
        <div style={styles.recordBar}>
          <span style={styles.showAll}>
            show all
            <Switch on={allShown} onChange={onShowAll} />
          </span>
          <button style={styles.clearAll} onClick={onClearAll} disabled={records.length === 0}>
            <TrashIcon />
            clear all
          </button>
        </div>

        <div style={styles.headRow}>
          <span style={styles.colLoc}>Measurement Point Location</span>
          <span style={styles.colVal}>Values</span>
          <span style={styles.colBtns} />
        </div>

        {records.length === 0 && <div style={styles.empty}>No measurements yet.</div>}

        {records.map((r) => (
          <div key={r.id} style={{ ...styles.row, color: r.visible ? "#222" : "#b5b8bd" }}>
            <span style={styles.colLoc}>{r.location}</span>
            <span style={styles.colVal}>{r.text}</span>
            <span style={styles.colBtns}>
              <button
                style={{ ...styles.icon, color: r.visible ? "#444" : "#b5b8bd" }}
                onClick={() => onToggleRecord(r.id)}
                title={r.visible ? "Hide" : "Show"}
              >
                <EyeIcon open={r.visible} />
              </button>
              <button style={{ ...styles.icon, color: r.visible ? "#444" : "#b5b8bd" }} onClick={() => onDeleteRecord(r.id)} title="Delete">
                <TrashIcon />
              </button>
            </span>
          </div>
        ))}
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
    width: 290,
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
    padding: "12px 14px 10px",
    borderBottom: "1px solid #e8e8e8",
  },
  title: { fontSize: 15, fontWeight: 700 },
  titleSide: { flex: 1 },
  close: {
    border: "none",
    background: "transparent",
    color: "#999",
    fontSize: 15,
    cursor: "pointer",
    padding: 2,
  },
  scroll: { flex: 1, overflowY: "auto", padding: "16px 14px 12px" },

  section: { fontSize: 13, fontWeight: 700, marginBottom: 12 },
  tool: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "7px 0",
    marginBottom: 8,
    border: "1px solid",
    borderRadius: 4,
    fontSize: 12,
    cursor: "pointer",
  },
  hint: { fontSize: 12, color: "#777", lineHeight: 1.5, marginTop: 2 },

  recordBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  showAll: { display: "flex", alignItems: "center", gap: 10, fontSize: 12 },
  switch: {
    position: "relative",
    width: 32,
    height: 18,
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    padding: 0,
  },
  knob: {
    position: "absolute",
    top: 3,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#fff",
    transition: "left 0.15s",
  },
  clearAll: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    border: "none",
    background: "transparent",
    color: "#e5484d",
    fontSize: 12,
    cursor: "pointer",
    padding: 0,
  },

  headRow: { display: "flex", alignItems: "flex-start", fontSize: 12, color: "#444", padding: "6px 4px", lineHeight: 1.6 },
  row: { display: "flex", alignItems: "center", fontSize: 12, padding: "9px 4px" },
  colLoc: { flex: 1.25, minWidth: 0, overflowWrap: "anywhere", paddingRight: 6 },
  colVal: { flex: 1, minWidth: 0 },
  colBtns: { width: 48, display: "flex", justifyContent: "flex-end", gap: 6 },
  icon: { border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "flex" },
  empty: { fontSize: 12, color: "#999", padding: "10px 4px" },
};
