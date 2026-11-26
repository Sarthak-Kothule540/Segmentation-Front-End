// ---------------- Bolton panel: the table on the left side of the 3D view ----------------
// Top: the two Bolton ratios. Below: the width of every tooth (mm) and the sums (see bolton.js).

import { BOLTON_ROWS } from "./bolton.js";

const MISSING = "------";
const fmt = (v) => (v == null ? MISSING : v.toFixed(2));

// one of the two boxes at the top (3-3 Anterior / 6-6 Total)
function RatioBox({ title, ratio, ideal }) {
  return (
    <div style={styles.ratioBox}>
      <div style={styles.ratioTitle} title={`Normal value: ${ideal}%`}>
        {title}
      </div>
      <div style={styles.ratioValue}>{ratio ? `${ratio.percent.toFixed(1)}%` : MISSING}</div>
      <div style={styles.ratioText}>
        {ratio ? (
          <>
            {ratio.larger} arch larger
            <br />
            for {ratio.mm.toFixed(2)} mm
          </>
        ) : (
          <>
            A tooth is missing
            <br />
            &nbsp;
          </>
        )}
      </div>
    </div>
  );
}

// the width table of one jaw (upper or lower) with its two sums
function JawTable({ jaw, widths, sum33, sum66 }) {
  const rows = BOLTON_ROWS[jaw];
  const name = jaw === "upper" ? "Upper" : "Lower";
  const sumName = jaw === "upper" ? "Maxillary" : "Mandibular";
  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <span>{name} Right side</span>
        <span>{name} Left side</span>
      </div>
      {rows.right.map((r, i) => {
        const l = rows.left[i];
        return (
          <div key={r} style={styles.row}>
            <span style={styles.half}>
              <span style={styles.id}>{r}</span>
              <span style={styles.value}>{fmt(widths[r])}</span>
            </span>
            <span style={styles.half}>
              <span style={styles.value}>{fmt(widths[l])}</span>
              <span style={{ ...styles.id, textAlign: "right" }}>{l}</span>
            </span>
          </div>
        );
      })}
      <div style={styles.sumRow}>
        <span>{sumName} 3-3 Sum of widths</span>
        <span>{fmt(sum33)}</span>
      </div>
      <div style={{ ...styles.sumRow, borderBottom: "none" }}>
        <span>{sumName} 6-6 Sum of widths</span>
        <span>{fmt(sum66)}</span>
      </div>
    </div>
  );
}

// bolton: the result of computeBolton (bolton.js)
// top: where the panel starts (App passes minus the third bar height, so it starts at the third top bar)
export default function BoltonPanel({ bolton, onClose, top = 16, bottom = 16 }) {
  return (
    <div style={{ ...styles.panel, top, bottom }} onPointerDown={(e) => e.stopPropagation()}>
      <div style={styles.titleRow}>
        <span style={styles.title}>Bolton</span>
        <button style={styles.close} onClick={onClose} title="Close">
          ✕
        </button>
      </div>

      <div style={styles.scroll}>
        <div style={styles.ratios}>
          <RatioBox title="3-3 Anterior Bolton" ratio={bolton.anterior} ideal={77.2} />
          <RatioBox title="6-6 Total Bolton" ratio={bolton.total} ideal={91.3} />
        </div>

        <JawTable jaw="upper" widths={bolton.widths} sum33={bolton.sums.upper33} sum66={bolton.sums.upper66} />
        <JawTable jaw="lower" widths={bolton.widths} sum33={bolton.sums.lower33} sum66={bolton.sums.lower66} />
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
  close: {
    border: "none",
    background: "transparent",
    color: "#999",
    fontSize: 15,
    cursor: "pointer",
    padding: 2,
  },
  scroll: { flex: 1, overflowY: "auto", padding: "14px 14px 12px" },

  // the two ratio boxes
  ratios: { display: "flex", gap: 2, marginBottom: 16 },
  ratioBox: { flex: 1, textAlign: "center" },
  ratioTitle: { background: "#eceef1", color: "#666", fontSize: 12, padding: "4px 0", borderRadius: 2 },
  ratioValue: { fontSize: 22, fontWeight: 700, margin: "8px 0 4px" },
  ratioText: { fontSize: 13, color: "#444", lineHeight: 1.6 },

  // width tables
  card: { background: "#f6f7f9", borderRadius: 6, marginBottom: 16, overflow: "hidden" },
  cardHead: {
    display: "flex",
    justifyContent: "space-between",
    background: "#e6e8ec",
    padding: "11px 8px",
    fontSize: 13,
    fontWeight: 700,
  },
  row: {
    display: "flex",
    gap: 16,
    padding: "0 8px",
    fontSize: 13,
  },
  half: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 6px",
    borderBottom: "1px solid #e3e5e8",
  },
  id: { color: "#999", width: 22 },
  value: { flex: 1, textAlign: "center" },
  sumRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 14px",
    fontSize: 13,
    borderBottom: "1px solid #e3e5e8",
  },
};
