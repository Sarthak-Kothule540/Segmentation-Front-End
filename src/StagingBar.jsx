// ---------------- Staging timeline: the bar at the bottom of the 3D view ----------------
// 5 buttons (first stage, previous, play/pause, next, last stage) and a ruler 0..stageCount
// with a marker on the current stage. Clicking the ruler jumps to that stage.

const PURPLE = "#6a5acd";
const ICON = "#222222";

const svg = (children) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill={ICON} aria-hidden="true">
    {children}
  </svg>
);

const FirstIcon = () => svg(<><rect x="1" y="2" width="2" height="10" /><polygon points="13,2 13,12 4,7" /></>);
const PrevIcon = () => svg(<><rect x="2" y="2" width="2" height="10" /><polygon points="12,2 12,12 5,7" /></>);
const PlayIcon = () => svg(<polygon points="3,1.5 3,12.5 12,7" />);
const PauseIcon = () => svg(<><rect x="3" y="2" width="3" height="10" /><rect x="8" y="2" width="3" height="10" /></>);
const NextIcon = () => svg(<><polygon points="2,2 2,12 9,7" /><rect x="10" y="2" width="2" height="10" /></>);
const LastIcon = () => svg(<><polygon points="1,2 1,12 10,7" /><rect x="11" y="2" width="2" height="10" /></>);

export default function StagingBar({ stage, stageCount, playing, onStageChange, onPlay, onPause }) {
  const last = Math.max(stageCount, 0);
  const go = (s) => onStageChange(Math.min(last, Math.max(0, s)));

  // with many stages only every 5th / 10th number is written, so they don't overlap
  const labelEvery = last <= 40 ? 1 : last <= 100 ? 5 : 10;
  const percent = (s) => (last > 0 ? (s / last) * 100 : 0);

  const handleRulerClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const f = (e.clientX - rect.left) / rect.width;
    go(Math.round(f * last));
  };

  const button = (title, icon, onClick, disabled) => (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={{ ...styles.button, opacity: disabled ? 0.35 : 1, cursor: disabled ? "default" : "pointer" }}
    >
      {icon}
    </button>
  );

  return (
    <div style={styles.bar}>
      <div style={styles.buttons}>
        {button("First stage", <FirstIcon />, () => go(0), stage === 0)}
        {button("Previous stage", <PrevIcon />, () => go(stage - 1), stage === 0)}
        {playing
          ? button("Pause", <PauseIcon />, onPause, false)
          : button("Play", <PlayIcon />, onPlay, last === 0)}
        {button("Next stage", <NextIcon />, () => go(stage + 1), stage === last)}
        {button("Last stage", <LastIcon />, () => go(last), stage === last)}
      </div>

      <div style={styles.ruler} onClick={handleRulerClick}>
        {/* stage numbers */}
        {Array.from({ length: last + 1 }, (_, s) =>
          s % labelEvery === 0 && s !== stage ? (
            <span key={s} style={{ ...styles.label, left: `${percent(s)}%` }}>
              {s}
            </span>
          ) : null
        )}

        {/* the double purple line */}
        <div style={{ ...styles.line, top: 22 }} />
        <div style={{ ...styles.line, top: 27 }} />

        {/* marker on the current stage */}
        <div style={{ ...styles.marker, left: `${percent(stage)}%` }}>
          <span style={styles.flag}>{stage}</span>
          <div style={styles.markerLine} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    background: "#fafafa",
    borderTop: "1px solid #e2e2e2",
    display: "flex",
    alignItems: "center",
    padding: "0 28px 0 16px",
    boxSizing: "border-box",
    zIndex: 5,
    userSelect: "none",
  },
  buttons: { display: "flex", gap: 4, marginRight: 24, flexShrink: 0 },
  button: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    padding: 0,
  },
  ruler: { position: "relative", flex: 1, height: 40, cursor: "pointer" },
  label: {
    position: "absolute",
    top: 2,
    transform: "translateX(-50%)",
    fontSize: 10,
    color: "#222",
    fontFamily: "serif",
    pointerEvents: "none",
  },
  line: { position: "absolute", left: 0, right: 0, height: 3, background: PURPLE, pointerEvents: "none" },
  marker: {
    position: "absolute",
    top: 0,
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none",
    transition: "left 0.2s",
  },
  flag: {
    minWidth: 16,
    padding: "1px 3px",
    background: PURPLE,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "2px 2px 0 0",
    boxSizing: "border-box",
  },
  markerLine: { width: 3, height: 24, background: PURPLE },
};
