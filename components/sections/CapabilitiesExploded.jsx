"use client";

// Real-time 3D exploded view for the Capabilities section (three.js, PBR materials, soft shadows,
// environment reflections): an automotive-style ECU. Machined aluminium base with mounting ears and
// two sealed multi-pin connectors, a field of press-fit pins, the controller PCB with a glowing SoC,
// a gasket, a finned brushed-aluminium lid and four screws. Like a product teardown film, the parts
// lift off one after another (screws first), hold, then seat back down. The unit sways gently and
// can be dragged to rotate. Renders only while on screen; honours prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

// Housing footprint (1 unit ≈ 3 cm). The connectors sit on the front face (+z).
const W = 3.2;
const D = 2.3;
const BASE_H = 0.5;
const LID_H = 0.22;
const PCB_W = W - 0.3;
const PCB_D = D - 0.3;
const PCB_T = 0.05;

// Resting height, how far each part lifts when exploded, and its place in the sequence.
const LAYERS = {
  pins: { rest: BASE_H - 0.02, lift: 0.7, order: 4 },
  pcb: { rest: BASE_H + 0.02, lift: 1.35, order: 3 },
  gasket: { rest: BASE_H, lift: 1.95, order: 2 },
  lid: { rest: BASE_H + 0.02, lift: 2.55, order: 1 },
  screws: { rest: BASE_H + LID_H + 0.02, lift: 3.35, order: 0 },
};
const ORDER_COUNT = 5;
const CYCLE = 12; // seconds: hold closed → staggered explode → hold open → seat back

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const hw = w / 2;
  const hh = h / 2;
  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.quadraticCurveTo(hw, -hh, hw, -hh + r);
  s.lineTo(hw, hh - r);
  s.quadraticCurveTo(hw, hh, hw - r, hh);
  s.lineTo(-hw + r, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - r);
  s.lineTo(-hw, -hh + r);
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  return s;
}
const circle = (x, y, r) => {
  const p = new THREE.Path();
  p.absarc(x, y, r, 0, Math.PI * 2, true);
  return p;
};
// Extrude a 2D shape (x, y) into a slab lying flat (x, z), from y = 0 up to `depth`.
function slab(shape, depth, bevel = 0, segments = 16) {
  const opts = bevel
    ? { depth: Math.max(0.001, depth - 2 * bevel), bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: segments }
    : { depth, bevelEnabled: false, curveSegments: segments };
  const geo = new THREE.ExtrudeGeometry(shape, opts);
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, bevel, 0);
  return geo;
}

// Controller PCB: dark blue soldermask, gold traces and pads, silkscreen.
function makePcbTexture(renderer) {
  const c = document.createElement("canvas");
  // drawn at 1.5x for crisp traces and silkscreen without a huge texture
  const LW = 1024;
  const LH = Math.round((1024 * PCB_D) / PCB_W);
  c.width = Math.round(LW * 1.5);
  c.height = Math.round(LH * 1.5);
  const g = c.getContext("2d");
  g.scale(1.5, 1.5);
  const u = LW / PCB_W; // px per unit
  const P = (x, z) => [(x + PCB_W / 2) * u, (z + PCB_D / 2) * u];

  g.fillStyle = "#0b1a2e";
  g.fillRect(0, 0, LW, LH);
  g.fillStyle = "rgba(80,120,170,.12)";
  g.fillRect(30, 30, LW - 60, LH - 60);

  // bus traces fanning from the SoC to the connector side
  g.strokeStyle = "rgba(214,178,92,.75)";
  g.lineWidth = 2.4;
  g.lineCap = "round";
  const [sx, sy] = P(-0.15, -0.15);
  for (let i = 0; i < 22; i++) {
    const [ex] = P(-1.25 + i * 0.12, 0);
    const [, ey] = P(0, PCB_D / 2 - 0.12);
    g.beginPath();
    g.moveTo(sx - 60 + i * 5.5, sy + 70);
    g.lineTo(sx - 60 + i * 5.5, sy + 110 + (i % 4) * 6);
    g.lineTo(ex, ey - 40 - (i % 3) * 8);
    g.lineTo(ex, ey);
    g.stroke();
  }
  for (let i = 0; i < 14; i++) {
    g.beginPath();
    g.moveTo(sx + 70, sy - 50 + i * 7);
    g.lineTo(sx + 190 + (i % 3) * 12, sy - 50 + i * 7);
    g.lineTo(sx + 240 + (i % 3) * 12, sy - 110 + i * 9);
    g.lineTo(LW - 90, sy - 110 + i * 9);
    g.stroke();
  }
  for (let i = 0; i < 10; i++) {
    g.beginPath();
    g.moveTo(sx - 70, sy - 40 + i * 8);
    g.lineTo(140, sy - 40 + i * 8);
    g.lineTo(110, sy - 120 + i * 8);
    g.stroke();
  }
  // vias and pads
  const via = (x, y, r) => {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fillStyle = "#d8b45e";
    g.fill();
    g.beginPath();
    g.arc(x, y, r * 0.45, 0, Math.PI * 2);
    g.fillStyle = "#1a1408";
    g.fill();
  };
  for (let i = 0; i < 90; i++) via(60 + ((i * 137) % (LW - 120)), 50 + ((i * 89) % (LH - 100)), 3.2);
  // press-fit pin rows along the front edge
  for (let k = 0; k < 2; k++) {
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 16; i++) {
        const [px, py] = P(-1.3 + k * 1.42 + i * 0.075, PCB_D / 2 - 0.1 - r * 0.075);
        via(px, py, 5);
      }
    }
  }
  // mounting holes
  for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    const [px, py] = P(x * (PCB_W / 2 - 0.12), z * (PCB_D / 2 - 0.12));
    via(px, py, 16);
  }
  // silkscreen
  g.strokeStyle = "rgba(236,240,246,.8)";
  g.lineWidth = 2;
  const box = (x, z, w, d) => {
    const [px, py] = P(x - w / 2, z - d / 2);
    g.strokeRect(px, py, w * u, d * u);
  };
  box(-0.15, -0.15, 0.62, 0.62);
  box(0.95, -0.55, 0.42, 0.42);
  box(-1.05, -0.45, 0.36, 0.36);
  g.fillStyle = "rgba(236,240,246,.88)";
  g.font = "600 22px sans-serif";
  const [tx, ty] = P(0.5, 0.42);
  g.fillText("SPEZAR  ECU-7", tx, ty);
  g.font = "500 15px sans-serif";
  g.fillText("REV B  •  IP67", tx, ty + 22);
  g.fillText("U1", P(-0.44, -0.5)[0], P(0, -0.5)[1]);
  g.fillText("U2", P(0.76, -0.8)[0], P(0, -0.8)[1]);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return tex;
}

// ---- Surface detail: procedural roughness/bump maps so materials aren't perfectly uniform ----
function seeded(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
// kind: "brushed" (long directional streaks), "blasted" (fine even grain), "plastic" (soft grain)
function makeSurfaceMap(kind, size = 1024) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const rnd = seeded(kind.length * 7919);
  g.fillStyle = "rgb(128,128,128)";
  g.fillRect(0, 0, size, size);
  if (kind === "brushed") {
    for (let i = 0; i < 3200; i++) {
      const y = rnd() * size;
      const len = 80 + rnd() * size * 0.9;
      const x = rnd() * size - len * 0.2;
      const v = 128 + (rnd() - 0.5) * 70;
      g.strokeStyle = `rgba(${v},${v},${v},${0.18 + rnd() * 0.3})`;
      g.lineWidth = 0.5 + rnd() * 1.2;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + len, y + (rnd() - 0.5) * 1.5);
      g.stroke();
    }
  } else {
    const img = g.getImageData(0, 0, size, size);
    const amp = kind === "blasted" ? 90 : 40;
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 128 + (rnd() - 0.5) * amp;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    }
    g.putImageData(img, 0, 0);
    if (kind === "plastic") {
      g.filter = "blur(1.2px)";
      g.drawImage(c, 0, 0);
      g.filter = "none";
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

// Photo-studio lighting environment: a light grey room with a large overhead softbox, two tall strip
// lights and a low fill card. Reflected in the metal it gives the crisp highlights of a product shot.
function makeStudioEnvironment(renderer) {
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 16, 30), new THREE.MeshBasicMaterial({ color: 0x7d8490, side: THREE.BackSide })));
  const panel = (w, h, intensity, color, pos, look) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }));
    m.position.set(...pos);
    m.lookAt(...look);
    env.add(m);
  };
  panel(16, 10, 4.5, 0xffffff, [0, 7.5, 1], [0, 0, 0]); // overhead softbox
  panel(2.2, 11, 6, 0xfff4e8, [-8, 2, 3], [0, 1, 0]); // left strip
  panel(2.2, 11, 4.5, 0xe8f1ff, [8, 2, -2], [0, 1, 0]); // right strip
  panel(14, 5, 2.2, 0xf2f6ff, [0, 1.5, 9], [0, 1, 0]); // front fill card
  panel(6, 1.2, 2.5, 0xffffff, [0, 3, -9], [0, 1, 0]); // back kicker
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  env.traverse((o) => {
    o.geometry?.dispose?.();
    o.material?.dispose?.();
  });
  return tex;
}

const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (v) => Math.min(1, Math.max(0, v));
// 0 = assembled, 1 = exploded, with the timeline: hold closed, open, hold open, close.
function timeline(t) {
  const p = (t % CYCLE) / CYCLE;
  if (p < 0.14) return 0;
  if (p < 0.46) return (p - 0.14) / 0.32;
  if (p < 0.78) return 1;
  return 1 - (p - 0.78) / 0.22;
}
// Each part moves in its own slot of the timeline: opening lifts the screws first and the pins
// last; because closing runs the same timeline backwards, the pins seat first, then the PCB,
// gasket and lid, and the screws go in last.
function layerAmount(a, order) {
  const span = 0.42;
  const step = (1 - span) / (ORDER_COUNT - 1);
  return smooth(clamp01((a - order * step) / span));
}

const shadowed = (m) => {
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
};

function buildECU(renderer) {
  const brushed = makeSurfaceMap("brushed", 512);
  brushed.repeat.set(2.5, 2.5);
  const blasted = makeSurfaceMap("blasted", 256);
  blasted.repeat.set(7, 7);
  const grain = makeSurfaceMap("plastic", 256);
  grain.repeat.set(5, 5);
  // machined aluminium: brushed streaks drive roughness and a faint bump
  const alu = new THREE.MeshPhysicalMaterial({ color: 0xbfc4cb, metalness: 1, roughness: 0.34, roughnessMap: brushed, bumpMap: brushed, bumpScale: 0.35, anisotropy: 0.6, clearcoat: 0.1, clearcoatRoughness: 0.4 });
  const aluBlast = new THREE.MeshStandardMaterial({ color: 0xa9aeb5, metalness: 1, roughness: 0.62, roughnessMap: blasted, bumpMap: blasted, bumpScale: 0.25 });
  const aluLid = new THREE.MeshPhysicalMaterial({ color: 0xcdd1d6, metalness: 1, roughness: 0.3, roughnessMap: brushed, bumpMap: brushed, bumpScale: 0.4, anisotropy: 0.75, anisotropyRotation: 0, clearcoat: 0.12, clearcoatRoughness: 0.3 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xd2d6dc, metalness: 0.95, roughness: 0.22 });
  // glass-filled PBT connector plastic: dark, slightly satin, with grain
  const blackPlastic = new THREE.MeshPhysicalMaterial({ color: 0x17191d, roughness: 0.55, roughnessMap: grain, bumpMap: grain, bumpScale: 0.6, metalness: 0, sheen: 0.3, sheenRoughness: 0.6, sheenColor: new THREE.Color(0x3a4048) });
  const blackMatte = new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.85, roughnessMap: grain, bumpMap: grain, bumpScale: 0.4 });
  const rubber = new THREE.MeshPhysicalMaterial({ color: 0x0f1012, roughness: 0.9, roughnessMap: grain, bumpMap: grain, bumpScale: 0.8, sheen: 0.4, sheenRoughness: 0.8, sheenColor: new THREE.Color(0x2b2f35) });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd8b25c, metalness: 0.95, roughness: 0.25 });
  const chip = new THREE.MeshStandardMaterial({ color: 0x15171c, roughness: 0.4, metalness: 0.2 });
  const glow = new THREE.MeshStandardMaterial({ color: 0x5aa8ff, emissive: 0x3d8bff, emissiveIntensity: 2.2, roughness: 0.25, metalness: 0.3 });
  const ceramic = new THREE.MeshStandardMaterial({ color: 0x9aa0a8, roughness: 0.5, metalness: 0.2 });
  const capTop = new THREE.MeshStandardMaterial({ color: 0xc9ced4, metalness: 0.9, roughness: 0.3 });
  const thermal = new THREE.MeshStandardMaterial({ color: 0x5c6470, roughness: 0.75 });

  const rig = new THREE.Group();
  const layers = [];
  const addLayer = (name, group) => {
    group.position.y = LAYERS[name].rest;
    rig.add(group);
    layers.push([group, LAYERS[name]]);
  };

  // ---- Base: machined tray, mounting ears, two sealed connectors ----
  const base = new THREE.Group();
  const flangeShape = roundedRect(W + 0.9, D - 0.5, 0.18);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) flangeShape.holes.push(circle(sx * (W / 2 + 0.25), sz * (D / 2 - 0.55), 0.09));
  base.add(shadowed(new THREE.Mesh(slab(flangeShape, 0.09, 0.015), aluBlast)));
  const tray = shadowed(new THREE.Mesh(slab(roundedRect(W, D, 0.16), BASE_H, 0.03), alu));
  base.add(tray);
  // stiffening ribs from the tray to each ear
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const rib = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.06), aluBlast));
    rib.position.set(sx * (W / 2 + 0.12), 0.2, sz * (D / 2 - 0.3));
    base.add(rib);
  }
  // inner floor (visible when the parts lift away)
  const floor = new THREE.Mesh(slab(roundedRect(W - 0.24, D - 0.24, 0.1), 0.01), new THREE.MeshStandardMaterial({ color: 0x7c838c, metalness: 0.8, roughness: 0.6 }));
  floor.position.y = BASE_H - 0.004;
  floor.receiveShadow = true;
  base.add(floor);
  // connectors: shroud, cavity face, pin grid, latch, keying ribs
  const cavity = new THREE.BoxGeometry(0.05, 0.05, 0.02);
  const cavityMat = new THREE.MeshStandardMaterial({ color: 0x030304, roughness: 1 });
  for (const cx of [-0.72, 0.72]) {
    const conn = new THREE.Group();
    conn.add(shadowed(new THREE.Mesh(new RoundedBoxGeometry(1.32, 0.46, 0.5, 3, 0.05), blackPlastic)));
    const face = new THREE.Mesh(new RoundedBoxGeometry(1.18, 0.34, 0.06, 2, 0.03), blackMatte);
    face.position.z = 0.24;
    conn.add(face);
    const cavities = new THREE.InstancedMesh(cavity, cavityMat, 2 * 15 + 14);
    let n = 0;
    const m = new THREE.Matrix4();
    for (let r = 0; r < 3; r++) {
      const count = r === 1 ? 14 : 15;
      for (let i = 0; i < count; i++) {
        m.makeTranslation(-0.5 + i * 0.072 + (r === 1 ? 0.036 : 0), 0.09 - r * 0.09, 0.275);
        cavities.setMatrixAt(n++, m);
      }
    }
    conn.add(cavities);
    const latch = shadowed(new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.08, 0.32, 2, 0.02), blackPlastic));
    latch.position.set(0, 0.27, 0.06);
    conn.add(latch);
    for (const kx of [-0.6, 0.6]) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.08), blackPlastic);
      key.position.set(kx, 0, 0.26);
      conn.add(key);
    }
    conn.position.set(cx, 0.3, D / 2 + 0.05);
    base.add(conn);
  }
  rig.add(base);

  // ---- Press-fit pin field (behind the connectors) on a dark carrier ----
  const pins = new THREE.Group();
  const carrier = shadowed(new THREE.Mesh(new RoundedBoxGeometry(2.9, 0.05, 0.36, 2, 0.02), blackPlastic));
  carrier.position.set(0, 0.025, D / 2 - 0.3);
  pins.add(carrier);
  const pinGeo = new THREE.BoxGeometry(0.018, 0.12, 0.018);
  const pinCount = 2 * 3 * 16;
  const pinMesh = new THREE.InstancedMesh(pinGeo, gold, pinCount);
  pinMesh.castShadow = true;
  const pm = new THREE.Matrix4();
  let pn = 0;
  for (let k = 0; k < 2; k++) for (let r = 0; r < 3; r++) for (let i = 0; i < 16; i++) {
    pm.makeTranslation(-1.3 + k * 1.42 + i * 0.075, 0.08, D / 2 - 0.25 - r * 0.075);
    pinMesh.setMatrixAt(pn++, pm);
  }
  pins.add(pinMesh);
  addLayer("pins", pins);

  // ---- Controller PCB ----
  const pcb = new THREE.Group();
  // glossy soldermask over copper: clearcoat for the lacquer sheen, faint grain in the bump
  const pcbTop = new THREE.MeshPhysicalMaterial({ map: makePcbTexture(renderer), roughness: 0.45, metalness: 0.15, clearcoat: 0.7, clearcoatRoughness: 0.18, bumpMap: blasted, bumpScale: 0.15 });
  const pcbSide = new THREE.MeshStandardMaterial({ color: 0x2a3b2c, roughness: 0.6 });
  const board = shadowed(new THREE.Mesh(new THREE.BoxGeometry(PCB_W, PCB_T, PCB_D), [pcbSide, pcbSide, pcbTop, pcbSide, pcbSide, pcbSide]));
  board.position.y = PCB_T / 2;
  pcb.add(board);
  const top = PCB_T;
  const part = (geo, mat, x, z, h) => {
    const mesh = shadowed(new THREE.Mesh(geo, mat));
    mesh.position.set(x, top + h / 2, z);
    pcb.add(mesh);
    return mesh;
  };
  // SoC with a glowing heat-spreader, like the reference
  part(new RoundedBoxGeometry(0.62, 0.05, 0.62, 2, 0.02), chip, -0.15, -0.15, 0.05);
  const spreader = part(new RoundedBoxGeometry(0.44, 0.03, 0.44, 2, 0.015), glow, -0.15, -0.15, 0.03);
  spreader.position.y = top + 0.065;
  const socLight = new THREE.PointLight(0x4d9bff, 1.4, 1.6, 2);
  socLight.position.set(-0.15, top + 0.35, -0.15);
  pcb.add(socLight);
  part(new RoundedBoxGeometry(0.42, 0.045, 0.42, 2, 0.01), chip, 0.95, -0.55, 0.045); // PMIC
  part(new RoundedBoxGeometry(0.36, 0.04, 0.36, 2, 0.01), chip, -1.05, -0.45, 0.04); // CAN transceiver
  part(new THREE.BoxGeometry(0.26, 0.035, 0.14), chip, 0.95, 0.05, 0.035); // flash
  part(new RoundedBoxGeometry(0.16, 0.05, 0.1, 2, 0.01), steel, 0.4, -0.75, 0.05); // crystal
  for (let i = 0; i < 4; i++) {
    part(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 24), blackPlastic, 1.1 - i * 0.16, -0.72, 0.08);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.006, 24), capTop);
    cap.position.set(1.1 - i * 0.16, top + 0.083, -0.72);
    pcb.add(cap);
  }
  for (let i = 0; i < 2; i++) part(new RoundedBoxGeometry(0.2, 0.1, 0.2, 2, 0.02), thermal, -1.15 + i * 0.26, 0.15, 0.1); // power inductors
  const passive = new THREE.BoxGeometry(0.05, 0.025, 0.03);
  const passives = new THREE.InstancedMesh(passive, ceramic, 60);
  const qm = new THREE.Matrix4();
  for (let i = 0; i < 60; i++) {
    const x = -1.3 + ((i * 0.173) % 2.6);
    const z = -0.95 + ((i * 0.291) % 1.2);
    if (Math.abs(x + 0.15) < 0.4 && Math.abs(z + 0.15) < 0.4) {
      qm.makeTranslation(0, -10, 0);
    } else {
      qm.makeRotationY((i % 2) * (Math.PI / 2));
      qm.setPosition(x, top + 0.0125, z);
    }
    passives.setMatrixAt(i, qm);
  }
  passives.castShadow = true;
  pcb.add(passives);
  addLayer("pcb", pcb);

  // ---- Gasket ----
  const gasketShape = roundedRect(W - 0.04, D - 0.04, 0.15);
  gasketShape.holes.push(roundedRect(W - 0.22, D - 0.22, 0.08));
  addLayer("gasket", (() => {
    const gg = new THREE.Group();
    gg.add(shadowed(new THREE.Mesh(slab(gasketShape, 0.04), rubber)));
    return gg;
  })());

  // ---- Lid: brushed aluminium, raised finned panel, screw bosses ----
  const lid = new THREE.Group();
  const lidShape = roundedRect(W, D, 0.16);
  const screwPos = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => [sx * (W / 2 - 0.18), sz * (D / 2 - 0.18)]);
  for (const [x, z] of screwPos) lidShape.holes.push(circle(x, -z, 0.05));
  lid.add(shadowed(new THREE.Mesh(slab(lidShape, LID_H * 0.55, 0.025), aluLid)));
  const panel = shadowed(new THREE.Mesh(slab(roundedRect(W - 0.7, D - 0.62, 0.12), 0.07, 0.02), aluLid));
  panel.position.y = LID_H * 0.55 - 0.005;
  lid.add(panel);
  for (let i = 0; i < 9; i++) {
    const fin = shadowed(new THREE.Mesh(new RoundedBoxGeometry(0.07, 0.07, D - 0.85, 2, 0.02), aluLid));
    fin.position.set(-((W - 1.1) / 2) + i * ((W - 1.1) / 8), LID_H * 0.55 + 0.095, 0);
    lid.add(fin);
  }
  for (const [x, z] of screwPos) {
    const boss = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, LID_H * 0.55 + 0.03, 32), aluLid));
    boss.position.set(x, (LID_H * 0.55 + 0.03) / 2, z);
    lid.add(boss);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.01, 24), blackMatte);
    hole.position.set(x, LID_H * 0.55 + 0.032, z);
    lid.add(hole);
  }
  addLayer("lid", lid);

  // ---- Screws ----
  const screws = new THREE.Group();
  for (const [x, z] of screwPos) {
    const head = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.06, 32), steel));
    head.position.set(x, 0.06, z);
    screws.add(head);
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 6), blackMatte);
    socket.position.set(x, 0.091, z);
    screws.add(socket);
    const shaft = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 16), steel));
    shaft.position.set(x, -0.22, z);
    screws.add(shaft);
    for (let t = 0; t < 7; t++) {
      const thread = new THREE.Mesh(new THREE.TorusGeometry(0.037, 0.006, 6, 20), steel);
      thread.rotation.x = Math.PI / 2;
      thread.position.set(x, -0.42 + t * 0.045, z);
      screws.add(thread);
    }
  }
  addLayer("screws", screws);

  return { rig, layers, glowLight: socLight };
}

export default function CapabilitiesExploded() {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // sharper than 1.5x is not visible here, but costs a lot
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Neutral tone mapping keeps metals and colours true, like a studio product photo.
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "capability-scene-canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.environment = makeStudioEnvironment(renderer);
    scene.environmentIntensity = 1.0;

    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60);

    const key = new THREE.DirectionalLight(0xfff3e2, 1.35);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = key.shadow.camera.bottom = -4;
    key.shadow.camera.right = key.shadow.camera.top = 4;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9cc8ff, 0.3);
    fill.position.set(-5, 3, -2);
    scene.add(fill);
    RectAreaLightUniformsLib.init();
    const softTop = new THREE.RectAreaLight(0xffffff, 2.6, 7, 3);
    softTop.position.set(-1, 7, 3);
    softTop.lookAt(0, 0.8, 0);
    scene.add(softTop);
    const softSide = new THREE.RectAreaLight(0xd6e6ff, 1.4, 3, 5);
    softSide.position.set(6, 2, 3);
    softSide.lookAt(0, 0.8, 0);
    scene.add(softSide);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.35 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.002;
    ground.receiveShadow = true;
    scene.add(ground);

    const { rig, layers, glowLight } = buildECU(renderer);
    const BASE_YAW = -0.42; // front three-quarter view, connectors towards the viewer
    rig.rotation.y = BASE_YAW;
    scene.add(rig);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Camera pulls back while the stack is open and eases in when the unit is closed.
    let baseDist = 13.8;
    const placeCamera = (open) => {
      const dist = baseDist * (0.7 + 0.3 * open);
      camera.position.set(dist * 0.18, dist * 0.5, dist * 0.85);
      camera.lookAt(0, 0.4 + 1.55 * open, 0);
    };
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      baseDist = camera.aspect < 1 ? 19 : camera.aspect < 1.2 ? 15.6 : 13.8;
      camera.updateProjectionMatrix();
      placeCamera(1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let dragging = false;
    let lastX = 0;
    let spin = 0;
    let spinVel = 0;
    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      host.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      spinVel = dx * 0.006;
      spin += spinVel;
    };
    const onUp = () => {
      dragging = false;
    };
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", onUp);
    host.addEventListener("pointerleave", onUp);

    const clock = new THREE.Clock();
    let elapsed = 0;
    let firstFrame = true;
    let open = 0;
    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reduceMotion) elapsed += dt;
      if (!dragging) {
        spin += spinVel;
        spinVel *= 0.92;
        spin *= 0.995; // drift back to the hero angle after a drag
      }
      const a = reduceMotion ? 1 : timeline(elapsed);
      for (const [group, { rest, lift, order }] of layers) group.position.y = rest + lift * layerAmount(a, order);
      glowLight.intensity = 1.4 * layerAmount(a, LAYERS.lid.order); // only while the lid is lifted
      open += ((reduceMotion ? 1 : smooth(a)) - open) * 0.06;
      placeCamera(open);
      rig.rotation.y = BASE_YAW + (reduceMotion ? 0 : Math.sin(elapsed * 0.3) * 0.1) + spin;
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        setReady(true);
      }
    };

    let onScreen = false;
    let running = false;
    const setRunning = () => {
      const should = onScreen && document.visibilityState === "visible";
      if (should && !running) {
        running = true;
        clock.getDelta();
        renderer.setAnimationLoop(frame);
      } else if (!should && running) {
        running = false;
        renderer.setAnimationLoop(null);
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      setRunning();
    }, { threshold: 0.05 });
    // Compile all shaders up front (off the main animation path) so the first frames don't stutter.
    let disposed = false;
    const startWatching = () => {
      if (!disposed) io.observe(host);
    };
    if (renderer.compileAsync) renderer.compileAsync(scene, camera).then(startWatching, startWatching);
    else startWatching();
    document.addEventListener("visibilitychange", setRunning);

    return () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", setRunning);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      host.removeEventListener("pointerleave", onUp);
      renderer.setAnimationLoop(null);
      scene.traverse((obj) => {
        obj.geometry?.dispose?.();
        const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
        for (const m of mats) {
          m.map?.dispose?.();
          m.dispose?.();
        }
      });
      scene.environment?.dispose?.();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`capability-scene ${ready ? "is-ready" : ""}`}
      aria-label="Interactive exploded view of an automotive control unit: screws, finned aluminium lid, gasket, controller PCB, press-fit pins and the aluminium base with two sealed connectors"
      role="img"
    >
      {ready && <span className="capability-scene-hint">Drag to rotate</span>}
    </div>
  );
}
