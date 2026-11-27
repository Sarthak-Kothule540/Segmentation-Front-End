// ---------------- Measurement in the 3D view (used by Viewer.jsx) ----------------
// MeasurePicker: while a tool is on, a click on a tooth or the gum adds a point.
// MeasureOverlay: a dashed line with an X at each clicked point and the value (mm or °).

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { pointName } from "./measurement.js";

const MEASURE_LINE_DARK = "#7a7a7a"; // grey under the white dashes
const MEASURE_LINE_LIGHT = "#ffffff"; // the white dashes
const MEASURE_LINE_WIDTH = 4; // line thickness (screen pixels)
const MEASURE_DASH_MM = 0.6; // length of one white dash (mm)
const MEASURE_GAP_MM = 0.4; // gap between two dashes (mm)
const MEASURE_X_MM = 1.0; // size of the X marks (mm)
const MEASURE_LABEL_HEIGHT_MM = 1.3; // label size in the 3D view (mm): grows and shrinks with zoom, like the Bolton labels
const MEASURE_LABEL_GAP = 0.35; // gap between a distance line and its value, as a part of the label height
const MEASURE_ANGLE_LABEL_MM = 2.0; // the angle value sits this far from the corner point (mm)
const MEASURE_CLICK_PX = 5; // a mouse press that moves more than this is a turn of the model, not a click
const MEASURE_HIDDEN_TOLERANCE_MM = 0.8; // a point counts as hidden when a tooth/gum is more than this in front of it

const noRaycast = () => null; // the marks themselves can not be clicked

// true when the object and all its parents are shown (hidden meshes can still be hit by a ray in three.js)
function isShown(obj) {
  for (let o = obj; o; o = o.parent) if (!o.visible) return false;
  return true;
}

// the first shown tooth / gum the ray hits, or null (Viewer.jsx marks them with userData.measure)
function firstModelHit(raycaster, root) {
  if (!root) return null;
  const hits = raycaster.intersectObject(root, true);
  for (const h of hits) {
    if (h.object.userData && h.object.userData.measure && isShown(h.object)) return h;
  }
  return null;
}

// clicks on the model while a Measurement tool is on. A press-and-drag still turns the model.
export function MeasurePicker({ modelRef, active, onPick }) {
  const { gl, camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useEffect(() => {
    if (!active) return;
    const el = gl.domElement;
    el.style.cursor = "crosshair";
    let down = null;

    const onDown = (e) => {
      down = e.button === 0 ? { x: e.clientX, y: e.clientY } : null;
    };
    const onUp = (e) => {
      if (!down || e.button !== 0) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      down = null;
      if (moved > MEASURE_CLICK_PX) return;
      const r = el.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = firstModelHit(raycaster, modelRef.current);
      if (!hit) return;
      let jaw = "lower";
      for (let o = hit.object; o; o = o.parent) {
        if (o.userData && o.userData.jaw) {
          jaw = o.userData.jaw;
          break;
        }
      }
      const part = hit.object.userData.part;
      const gum = !part || /gum|modelwithbase/i.test(part);
      if (onPick) onPick({ point: hit.point.toArray(), name: pointName(jaw, part), jaw, gum });
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    return () => {
      el.style.cursor = "";
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
    };
  }, [active, gl, camera, raycaster, modelRef, onPick]);

  return null;
}

// draws the value box once into a small picture (shown as a sprite that always faces the camera)
function makeMeasureLabelTexture(text) {
  const px = 4; // drawing resolution, keeps the text sharp when zoomed in
  const fontSize = 13 * px;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const font = `${fontSize}px Roboto, Arial, sans-serif`;
  ctx.font = font;
  const padX = 7 * px, padY = 3 * px;
  const w = Math.ceil(ctx.measureText(text).width + 2 * padX);
  const h = Math.ceil(fontSize * 1.25 + 2 * padY);
  canvas.width = w;
  canvas.height = h;
  const r = 3 * px;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(w, 0, w, h, r);
  ctx.arcTo(w, h, 0, h, r);
  ctx.arcTo(0, h, 0, 0, r);
  ctx.arcTo(0, 0, w, 0, r);
  ctx.closePath();
  ctx.fillStyle = "rgba(95, 95, 95, 0.92)"; // dark grey box
  ctx.fill();
  ctx.font = font;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + px);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: w / h };
}

// the X picture, made once and shared by all marks
let measureXTexture = null;
function getMeasureXTexture() {
  if (measureXTexture) return measureXTexture;
  const s = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  const cross = (color, width) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(12, 12);
    ctx.lineTo(s - 12, s - 12);
    ctx.moveTo(s - 12, 12);
    ctx.lineTo(12, s - 12);
    ctx.stroke();
  };
  cross("rgba(255,255,255,0.9)", 14); // thin white edge, so the X shows on dark spots too
  cross("#222", 8);
  measureXTexture = new THREE.CanvasTexture(canvas);
  measureXTexture.colorSpace = THREE.SRGBColorSpace;
  return measureXTexture;
}

function MeasureX({ position }) {
  return (
    <sprite position={position} scale={[MEASURE_X_MM, MEASURE_X_MM, 1]} renderOrder={13} raycast={noRaycast}>
      <spriteMaterial map={getMeasureXTexture()} transparent depthTest={false} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

// line: [a, b] for a distance. The value then sits beside the line instead of on it: above a line that
// runs across the screen, to the right of a line that runs up and down (worked out again when the view turns).
function MeasureLabel({ position, text, line = null }) {
  const label = useMemo(() => makeMeasureLabelTexture(text), [text]);
  useEffect(() => () => label.texture.dispose(), [label]);
  const ref = useRef();
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), b: new THREE.Vector3() }), []);
  useFrame(({ camera, size }) => {
    if (!ref.current || !line) return;
    tmp.a.fromArray(line[0]).project(camera);
    tmp.b.fromArray(line[1]).project(camera);
    const dx = (tmp.b.x - tmp.a.x) * size.width;
    const dy = (tmp.b.y - tmp.a.y) * size.height;
    const across = Math.abs(dx) >= Math.abs(dy);
    // across: label above the line; up and down: label to the right of the line
    ref.current.center.set(across ? 0.5 : -MEASURE_LABEL_GAP / label.aspect, across ? -MEASURE_LABEL_GAP : 0.5);
  });
  return (
    <sprite
      ref={ref}
      position={position}
      scale={[MEASURE_LABEL_HEIGHT_MM * label.aspect, MEASURE_LABEL_HEIGHT_MM, 1]}
      renderOrder={14}
      raycast={noRaycast}
    >
      <spriteMaterial map={label.texture} transparent depthTest={false} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

// grey line with white dashes on top (drawn over the tooth it lies on)
function MeasureDash({ a, b }) {
  const pts = [a, b];
  return (
    <>
      <Line
        points={pts}
        color={MEASURE_LINE_DARK}
        lineWidth={MEASURE_LINE_WIDTH}
        depthTest={false}
        depthWrite={false}
        transparent
        renderOrder={11}
        raycast={noRaycast}
      />
      <Line
        points={pts}
        color={MEASURE_LINE_LIGHT}
        lineWidth={MEASURE_LINE_WIDTH}
        dashed
        dashSize={MEASURE_DASH_MM}
        gapSize={MEASURE_GAP_MM}
        depthTest={false}
        depthWrite={false}
        transparent
        renderOrder={12}
        raycast={noRaycast}
      />
    </>
  );
}

// where the value goes: middle of the line (distance), or just outside the corner (angle)
function labelPosition(record) {
  const [a, b, c] = record.points.map((p) => new THREE.Vector3(...p));
  if (record.kind === "distance") return a.add(b).multiplyScalar(0.5).toArray();
  const u = a.clone().sub(b).normalize();
  const v = c.clone().sub(b).normalize();
  const bis = u.add(v);
  if (bis.lengthSq() < 1e-8) return b.toArray();
  return b.clone().addScaledVector(bis.normalize(), -MEASURE_ANGLE_LABEL_MM).toArray();
}

// points: the clicked points; record: the finished measurement (null while it is being made, no value yet)
function MeasureShape({ points, record = null }) {
  return (
    <group>
      {points.slice(1).map((p, i) => (
        <MeasureDash key={i} a={points[i]} b={p} />
      ))}
      {points.map((p, i) => (
        <MeasureX key={i} position={p} />
      ))}
      {record && (
        <MeasureLabel
          position={labelPosition(record)}
          text={record.text}
          line={record.kind === "distance" ? record.points : null}
        />
      )}
    </group>
  );
}

// all measurements of this view + the one being made.
// The lines are drawn on top of the tooth they lie on; a whole measurement is hidden when all its
// points are behind a tooth or the gum (checked a few times a second, only when the camera moves).
// shown(where): false when the jaw / teeth / gum that point lies on is switched off
export function MeasureOverlay({ modelRef, records, pending, shown }) {
  const { camera } = useThree();
  const [hidden, setHidden] = useState({}); // record id -> true when behind the model
  const check = useRef({ last: -1, matrix: new THREE.Matrix4(), key: null });
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame(({ clock }) => {
    const c = check.current;
    const now = clock.elapsedTime;
    const key = records.map((r) => r.id + (r.visible ? "v" : "h")).join(",");
    const changed = !c.matrix.equals(camera.matrixWorld) || key !== c.key;
    if (!changed || now - c.last < 0.12) return;
    c.last = now;
    c.key = key;
    c.matrix.copy(camera.matrixWorld);

    const eye = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
    const next = {};
    for (const r of records) {
      if (!r.visible) continue;
      let anyVisible = false;
      for (const p of r.points) {
        const dir = new THREE.Vector3(...p).sub(eye);
        const dist = dir.length();
        raycaster.set(eye, dir.normalize());
        raycaster.far = dist + 1;
        const hit = firstModelHit(raycaster, modelRef.current);
        if (!hit || hit.distance >= dist - MEASURE_HIDDEN_TOLERANCE_MM) {
          anyVisible = true;
          break;
        }
      }
      if (!anyVisible) next[r.id] = true;
    }
    setHidden((old) => {
      const a = Object.keys(old);
      const b = Object.keys(next);
      return a.length === b.length && b.every((k) => old[k]) ? old : next;
    });
  });

  return (
    <group>
      {records.map((r) =>
        r.visible && !hidden[r.id] && r.where.some(shown) ? <MeasureShape key={r.id} points={r.points} record={r} /> : null
      )}
      {pending && pending.length > 0 && <MeasureShape points={pending.map((p) => p.point)} />}
    </group>
  );
}
