// Exploded, rendered-style view of one product. Every part is a rounded solid drawn with
// per-face lighting gradients so it reads as a product render rather than line art.
// Layer motion, labels and theme colours live under .hero-exploded in globals.css.

const CX = 250;
const CY = 440;
const COS = 0.866;
const SIN = 0.5;

// Isometric projection: x runs down-right, y runs down-left, z is up.
const iso = (x, y, z) => [CX + (x - y) * COS, CY + (x + y) * SIN - z];
const path = (points) => `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;

// Rounded-rectangle outline in plan view, sampled so corners project to smooth arcs.
function outline(w, d, r, cx, cy, n = 5) {
  const hw = w / 2 - r;
  const hd = d / 2 - r;
  const corners = [[hw, hd, 0], [-hw, hd, Math.PI / 2], [-hw, -hd, Math.PI], [hw, -hd, Math.PI * 1.5]];
  const pts = [];
  for (const [ox, oy, a0] of corners) {
    for (let i = 0; i <= n; i++) {
      const a = a0 + (i / n) * (Math.PI / 2);
      pts.push([cx + ox + r * Math.cos(a), cy + oy + r * Math.sin(a)]);
    }
  }
  return pts;
}

// Convex hull (monotone chain) of projected points: the silhouette of an extruded solid.
function hull(points) {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const build = (list) => {
    const out = [];
    for (const pt of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], pt) <= 0) out.pop();
      out.push(pt);
    }
    return out;
  };
  const lower = build(p);
  const upper = build(p.slice().reverse());
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function geom({ w, d, h, r = 0, z = 0, x = 0, y = 0, n = 5 }) {
  const o = outline(w, d, r, x, y, n);
  const top = o.map(([px, py]) => iso(px, py, z + h));
  const bottom = o.map(([px, py]) => iso(px, py, z));
  const side = hull([...top, ...bottom]);
  const xs = side.map((p) => p[0]);
  const ys = top.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  // Screen x of the front corner: where the lit left face meets the shaded right face.
  const k = (iso(x + w / 2, y + d / 2, z)[0] - minX) / (maxX - minX);
  return { top, side, minX, maxX, minY: Math.min(...ys), maxY: Math.max(...ys), k };
}

// Materials: [light, dark] stops per face plus an edge highlight.
const M = {
  alu: { top: ["#3d5170", "#1a293e"], left: ["#2b3d5a", "#3c5273"], right: ["#182537", "#0d1728"], rim: "rgba(170,200,240,.5)" },
  pcb: { top: ["#174668", "#0a2a48"], left: ["#0f3553", "#15405f"], right: ["#092238", "#06192b"], rim: "rgba(120,190,255,.55)" },
  chip: { top: ["#2c3548", "#161c2a"], left: ["#242d40", "#2e384c"], right: ["#131a28", "#0c111d"], rim: "rgba(190,210,240,.35)" },
  mcu: { top: ["#28334a", "#0f1522"], left: ["#1d2637", "#2a3449"], right: ["#0f1522", "#080c15"], rim: "rgba(143,196,255,.75)" },
  metal: { top: ["#e6edf5", "#9eadc1"], left: ["#aebccd", "#cbd6e3"], right: ["#7f8ea4", "#5c6b82"], rim: "rgba(255,255,255,.75)" },
  battery: { top: ["#d6dee9", "#98a6ba"], left: ["#aab7c9", "#c0ccdb"], right: ["#76859b", "#59687e"], rim: "rgba(255,255,255,.6)" },
  cap: { top: ["#c9d3df", "#8d9bb0"], left: ["#2a3447", "#3a4559"], right: ["#1b2231", "#10141f"], rim: "rgba(220,230,245,.5)" },
  glass: {
    top: ["rgba(175,210,255,.24)", "rgba(80,130,205,.07)"],
    left: ["rgba(150,195,250,.24)", "rgba(175,215,255,.36)"],
    right: ["rgba(105,155,225,.3)", "rgba(70,115,185,.2)"],
    rim: "rgba(228,242,255,.8)",
  },
};

function Box({ id, g, mat, soft = 0.012 }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-s`} gradientUnits="userSpaceOnUse" x1={g.minX} x2={g.maxX} y1="0" y2="0">
          <stop offset="0" stopColor={mat.left[0]} />
          <stop offset={Math.max(0, g.k - soft)} stopColor={mat.left[1]} />
          <stop offset={Math.min(1, g.k + soft)} stopColor={mat.right[0]} />
          <stop offset="1" stopColor={mat.right[1]} />
        </linearGradient>
        <linearGradient id={`${id}-t`} gradientUnits="userSpaceOnUse" x1={g.minX} y1={g.minY} x2={g.maxX} y2={g.maxY}>
          <stop offset="0" stopColor={mat.top[0]} />
          <stop offset="1" stopColor={mat.top[1]} />
        </linearGradient>
      </defs>
      <path d={path(g.side)} fill={`url(#${id}-s)`} />
      <path d={path(g.top)} fill={`url(#${id}-t)`} stroke={mat.rim} strokeWidth="0.8" strokeLinejoin="round" />
    </g>
  );
}

const Solid = ({ id, mat, soft, ...dims }) => <Box id={id} g={geom(dims)} mat={mat} soft={soft} />;

// Leader line from a point on a layer out to its label at the right.
function Label({ at, dy = 0, title, detail }) {
  const [fx, fy] = at;
  const y = fy + dy;
  return (
    <g className="hx-label">
      <circle cx={fx} cy={fy} r="3" className="hx-label-dot" />
      <path d={`M${fx} ${fy} L${fx + 26} ${y} H 436`} className="hx-leader" />
      <text x="446" y={y - 3} className="hx-label-title">{title}</text>
      <text x="446" y={y + 14} className="hx-label-detail">{detail}</text>
    </g>
  );
}

// Device footprint and layer heights (exploded). Collapsed heights are set via --collapse.
const W = 200;
const D = 140;
const BASE = { z: 0, h: 30 };
const BAT = { z: 92, h: 12 };
const PCB = { z: 168, h: 4 };
const FW = { z: 250 };
const LID = { z: 316, h: 12 };
// Assembled heights, and how far the closed device rises so it stays centred in the frame.
const LIFT = 118;
const collapse = (layer, restZ) => `${layer.z - restZ - LIFT}px`;

const pcbTop = PCB.z + PCB.h;
const mcuH = 7;
const mcuTop = pcbTop + mcuH;

// Copper traces on the board, in plan coordinates.
const traces = [
  [[-22, -8], [-48, -8], [-48, -30]],
  [[-22, 4], [-60, 4], [-60, 34], [-30, 34]],
  [[22, -14], [36, -14], [36, -32]],
  [[22, 0], [44, 0], [44, 26], [66, 26]],
  [[-8, 12], [-8, 40], [10, 40]],
  [[10, -28], [10, -46], [-30, -46]],
  [[-70, -40], [-70, 20]],
  [[62, -12], [80, -12], [80, 10]],
];

const codeLines = [
  [-48, -34, 62, 1], [-38, -21, 36, 0], [-38, -8, 54, 0], [-28, 5, 30, 1], [-38, 18, 58, 0], [-48, 31, 44, 1],
];

export default function HeroExplodedView() {
  const lid = geom({ w: W, d: D, h: LID.h, r: 20, z: LID.z });
  const mcu = { w: 40, d: 40, x: 0, y: -8 };
  const beam = hull([
    ...[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => iso(mcu.x + sx * 20, mcu.y + sy * 20, mcuTop)),
    ...[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => iso(mcu.x + sx * 48, mcu.y + sy * 34, FW.z)),
  ]);
  const panel = outline(128, 92, 10, mcu.x, mcu.y).map(([x, y]) => iso(x, y, FW.z));
  const [mx, my] = iso(mcu.x, mcu.y, mcuTop);

  return (
    <svg
      className="hero-exploded"
      viewBox="0 0 690 640"
      role="img"
      aria-label="Exploded view of a connected device: glass enclosure, firmware, PCB, battery and machined chassis"
    >
      <defs>
        <radialGradient id="hx-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" className="hx-glow-stop" />
          <stop offset="1" className="hx-glow-stop-clear" />
        </radialGradient>
        <linearGradient id="hx-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fc4ff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#8fc4ff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="hx-tray" gradientUnits="userSpaceOnUse" x1="120" y1="380" x2="380" y2="520">
          <stop offset="0" stopColor="#0c1524" />
          <stop offset="1" stopColor="#1a2a41" />
        </linearGradient>
        <linearGradient id="hx-stripe" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="330" y2="0">
          <stop offset="0" stopColor="#2b67c9" />
          <stop offset="1" stopColor="#4e95e8" />
        </linearGradient>
        <filter id="hx-shadow" x="-30%" y="-30%" width="160%" height="190%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#02070f" floodOpacity="0.6" />
        </filter>
        <filter id="hx-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="hx-softer" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <clipPath id="hx-lid-clip">
          <path d={path(lid.top)} />
        </clipPath>
      </defs>

      {/* stage glow and contact shadow */}
      <ellipse cx={CX} cy={CY + 40} rx="250" ry="120" fill="url(#hx-glow)" />

      <g className="hx-float">
        {/* Chassis: machined aluminium tray (carries the contact shadow) */}
        <g className="hx-layer" style={{ "--collapse": collapse(BASE, 0) }}>
          <ellipse cx={CX} cy={CY + 36} rx="170" ry="78" className="hx-ground" filter="url(#hx-softer)" />
          <g filter="url(#hx-shadow)">
            <Solid id="base" mat={M.alu} w={W} d={D} h={BASE.h} r={20} z={BASE.z} />
            <path d={path(outline(W - 18, D - 18, 13, 0, 0).map(([x, y]) => iso(x, y, BASE.z + BASE.h)))} fill="url(#hx-tray)" stroke="rgba(0,0,0,.35)" strokeWidth="0.8" />
            <path d={path(outline(W - 18, D - 18, 13, 0, 0).map(([x, y]) => iso(x, y, BASE.z + BASE.h - 8)))} fill="none" stroke="rgba(150,185,230,.18)" strokeWidth="0.8" />
            {/* mounting bosses */}
            {[[-78, -50], [78, -50], [-78, 50], [78, 50]].map(([x, y]) => (
              <Solid key={`${x}${y}`} id={`boss${x}${y}`} mat={M.alu} w={12} d={12} h={6} r={6} z={BASE.z + BASE.h - 8} x={x} y={y} soft={0.4} />
            ))}
          </g>
          <Label at={iso(W / 2, -D / 2, BASE.z + BASE.h / 2)} dy={6} title="Chassis" detail="Mechanical design & DFM" />
        </g>

        {/* Battery: Li-Po pouch with brand stripe and tab */}
        <g className="hx-layer" style={{ "--collapse": collapse(BAT, 8) }}>
          <g filter="url(#hx-shadow)">
            <Solid id="bat" mat={M.battery} w={124} d={72} h={BAT.h} r={7} z={BAT.z} x={-28} y={14} />
            <path d={path([[-80, 2], [16, 2], [16, 26], [-80, 26]].map(([x, y]) => iso(x, y, BAT.z + BAT.h + 0.3)))} fill="url(#hx-stripe)" opacity="0.9" />
            <path d={path([[-80, 6], [16, 6], [16, 7.5], [-80, 7.5]].map(([x, y]) => iso(x, y, BAT.z + BAT.h + 0.5)))} fill="rgba(255,255,255,.45)" />
            <Solid id="battab" mat={M.metal} w={18} d={10} h={3} z={BAT.z + 4} x={43} y={0} />
            <Solid id="batconn" mat={M.chip} w={16} d={12} h={8} r={2} z={BAT.z} x={58} y={-2} />
          </g>
          <Label at={iso(34, -22, BAT.z + BAT.h)} dy={-2} title="Battery" detail="Power design, charging & BMS" />
        </g>

        {/* PCB with copper traces and components */}
        <g className="hx-layer" style={{ "--collapse": collapse(PCB, 30) }}>
          <g filter="url(#hx-shadow)">
            <Solid id="pcb" mat={M.pcb} w={180} d={120} h={PCB.h} r={8} z={PCB.z} />
            {traces.map((t, i) => (
              <polyline key={i} points={t.map(([x, y]) => iso(x, y, pcbTop + 0.4).join(",")).join(" ")} className="hx-trace" />
            ))}
            {traces.map((t, i) => {
              const [x, y] = t[t.length - 1];
              const [px, py] = iso(x, y, pcbTop + 0.5);
              return <ellipse key={i} cx={px} cy={py} rx="2.8" ry="1.6" className="hx-pad" />;
            })}
            {/* silkscreen outline around the MCU */}
            <path d={path(outline(48, 48, 3, mcu.x, mcu.y).map(([x, y]) => iso(x, y, pcbTop + 0.4)))} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="0.7" />
            {/* glow under the MCU */}
            <ellipse cx={mx} cy={my + 6} rx="30" ry="15" fill="#8fc4ff" opacity="0.4" filter="url(#hx-soft)" />
            <Solid id="mcu" mat={M.mcu} w={mcu.w} d={mcu.d} h={mcuH} r={3} z={pcbTop} x={mcu.x} y={mcu.y} />
            <ellipse cx={mx - 10} cy={my + 2} rx="2" ry="1.2" fill="#8fc4ff" />
            {/* RF shield can, USB-C, header, inductor, sensor, capacitors */}
            <Solid id="rf" mat={M.metal} w={44} d={30} h={8} r={2} z={pcbTop} x={58} y={-32} />
            <Solid id="usb" mat={M.metal} w={16} d={10} h={4} r={2} z={pcbTop} x={-80} y={24} />
            <Solid id="hdr" mat={M.chip} w={30} d={8} h={7} r={1} z={pcbTop} x={36} y={44} />
            <Solid id="ind" mat={M.chip} w={14} d={14} h={7} r={7} z={pcbTop} x={-22} y={44} soft={0.4} />
            <Solid id="sens" mat={M.chip} w={12} d={12} h={4} r={2} z={pcbTop} x={72} y={30} />
            {[-66, -54, -42].map((x) => (
              <Solid key={x} id={`cap${x}`} mat={M.cap} w={9} d={9} h={11} r={4.5} z={pcbTop} x={x} y={-30} soft={0.4} />
            ))}
          </g>
          <Label at={iso(90, -60, pcbTop)} dy={-2} title="PCB" detail="Schematic, layout & bring-up" />
        </g>

        {/* Firmware: holographic panel projected from the MCU */}
        <g className="hx-layer" style={{ "--collapse": collapse(FW, 40) }}>
          <g className="hx-firmware-art">
            <path d={path(beam)} fill="url(#hx-beam)" filter="url(#hx-soft)" />
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} className="hx-spark" style={{ animationDelay: `${i * 0.7}s` }} cx={mx + (i - 1.5) * 12} cy={my - 10} r="1.6" fill="#cfe4ff" />
            ))}
            <path d={path(panel)} className="hx-panel" />
            {codeLines.map(([x, y, len, accent], i) => (
              <line
                key={i}
                x1={iso(x, y, FW.z)[0]}
                y1={iso(x, y, FW.z)[1]}
                x2={iso(x + len, y, FW.z)[0]}
                y2={iso(x + len, y, FW.z)[1]}
                className={accent ? "hx-code hx-code-accent" : "hx-code"}
              />
            ))}
          </g>
          <Label at={iso(56, -48, FW.z)} dy={-6} title="Firmware" detail="Embedded code & RTOS" />
        </g>

        {/* Enclosure: glass top with specular sweep and status LED */}
        <g className="hx-layer" style={{ "--collapse": collapse(LID, 52) }}>
          <g filter="url(#hx-shadow)">
            <Box id="lid" g={lid} mat={M.glass} soft={0.05} />
            <g clipPath="url(#hx-lid-clip)">
              <g className="hx-sweep">
                <polygon points={`${CX - 40},${lid.minY - 20} ${CX + 30},${lid.minY - 20} ${CX - 90},${lid.maxY + 20} ${CX - 160},${lid.maxY + 20}`} fill="rgba(255,255,255,.16)" />
                <polygon points={`${CX + 44},${lid.minY - 20} ${CX + 58},${lid.minY - 20} ${CX - 62},${lid.maxY + 20} ${CX - 76},${lid.maxY + 20}`} fill="rgba(255,255,255,.1)" />
              </g>
            </g>
            <path d={path(lid.top)} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" strokeLinejoin="round" />
            {(() => {
              const [lx, ly] = iso(70, -44, LID.z + LID.h);
              return (
                <g>
                  <ellipse cx={lx} cy={ly} rx="12" ry="7" fill="#8fc4ff" opacity="0.5" filter="url(#hx-soft)" />
                  <ellipse cx={lx} cy={ly} rx="4.5" ry="2.6" className="hx-led" />
                </g>
              );
            })()}
          </g>
          <Label at={iso(W / 2, -D / 2, LID.z + LID.h)} dy={-6} title="Enclosure" detail="Industrial design & CAD" />
        </g>
      </g>
    </svg>
  );
}
