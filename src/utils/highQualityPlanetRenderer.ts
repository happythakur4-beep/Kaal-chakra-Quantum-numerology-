/**
 * Photorealistic Celestial Canvas Shader & Texture Engine
 * Renders NASA / Hubble / JWST-grade authentic planetary surfaces, realistic lighting,
 * volumetric atmospheric scattering, cloud shadows, multi-tier ring systems, and storm vortices.
 */

import { CelestialBodyData } from '../types';

export interface RenderPlanetOptions {
  ctx: CanvasRenderingContext2D;
  body: CelestialBodyData;
  screenX: number;
  screenY: number;
  bodyRadius: number;
  frame: number;
  isSelected?: boolean;
  isHovered?: boolean;
  lightSourceX?: number;
  lightSourceY?: number;
}

function safeNum(val: any, fallback = 0): number {
  return typeof val === 'number' && Number.isFinite(val) ? val : fallback;
}

export function drawHighFidelityPlanet(opts: RenderPlanetOptions) {
  const {
    ctx,
    body,
    screenX: rawX,
    screenY: rawY,
    bodyRadius: rawRadius,
    frame: rawFrame,
    isSelected = false,
    isHovered = false,
  } = opts;

  if (!ctx || !body) return;

  const screenX = safeNum(rawX, 0);
  const screenY = safeNum(rawY, 0);
  const bodyRadius = Math.max(2, safeNum(rawRadius, 10));
  const frame = safeNum(rawFrame, 0);

  // 1. Draw Volumetric Atmospheric Glow Halo
  const glowRadius = Math.max(bodyRadius + 1, bodyRadius * (isSelected || isHovered ? 4.2 : 2.6));
  const innerGlowRadius = Math.max(0.1, bodyRadius * 0.4);

  try {
    const glowGrad = ctx.createRadialGradient(
      screenX,
      screenY,
      innerGlowRadius,
      screenX,
      screenY,
      glowRadius
    );
    glowGrad.addColorStop(0, body.glowColor || 'rgba(255, 215, 0, 0.4)');
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.save();
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } catch (err) {
    // Fallback if gradient creation fails
  }

  // 2. Photorealistic Shaders by Body ID
  try {
    if (body.id === 'sun') {
      renderPhotorealisticSun(ctx, screenX, screenY, bodyRadius, frame, isSelected);
    } else if (body.type === 'black-hole') {
      renderPhotorealisticBlackHole(ctx, screenX, screenY, bodyRadius, frame, isSelected);
    } else if (body.id === 'mercury') {
      renderMercuryPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'venus') {
      renderVenusPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'earth') {
      renderEarthPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'mars') {
      renderMarsPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'jupiter') {
      renderJupiterPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'saturn') {
      renderSaturnPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'uranus') {
      renderUranusPhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else if (body.id === 'neptune') {
      renderNeptunePhotorealistic(ctx, screenX, screenY, bodyRadius, frame);
    } else {
      renderStandardVolumetricSphere(ctx, screenX, screenY, bodyRadius, body.color, body.glowColor, frame);
    }
  } catch (err) {
    renderStandardVolumetricSphere(ctx, screenX, screenY, bodyRadius, body.color, body.glowColor, frame);
  }

  // 3. Futuristic Targeting Reticle on Hover or Selection
  if (isSelected || isHovered) {
    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.rotate(frame * 0.012);
    ctx.beginPath();
    ctx.arc(0, 0, bodyRadius + 10, 0, Math.PI * 2);
    ctx.strokeStyle = isSelected ? '#ffd700' : '#38bdf8';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([6, 5]);
    ctx.stroke();

    // 4 Corner brackets
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.arc(0, 0, bodyRadius + 15, -0.18, 0.18);
      ctx.strokeStyle = isSelected ? 'rgba(255, 215, 0, 0.95)' : 'rgba(56, 189, 248, 0.95)';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([]);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// -------------------------------------------------------------
// 1. SUN (Surya) - Thermonuclear Convection & Coronal Loops
// -------------------------------------------------------------
function renderPhotorealisticSun(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number,
  isSelected: boolean
) {
  ctx.save();
  ctx.translate(x, y);

  // Dynamic Coronal Prominences & Magnetic Loops
  ctx.rotate(frame * 0.005);
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16;
    const flareLen = r * (1.3 + 0.3 * Math.sin(frame * 0.04 + i * 1.8));
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r * 0.9, Math.sin(angle) * r * 0.9);
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.15) * flareLen * 1.1,
      Math.sin(angle + 0.15) * flareLen * 1.1,
      Math.cos(angle + 0.25) * r * 0.95,
      Math.sin(angle + 0.25) * r * 0.95
    );
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 215, 0, 0.75)' : 'rgba(249, 115, 22, 0.6)';
    ctx.lineWidth = 2.4;
    ctx.stroke();
  }

  // Multi-tier Solar Sphere with Limb Darkening
  const sunGrad = ctx.createRadialGradient(-r * 0.2, -r * 0.2, Math.max(0.1, r * 0.05), 0, 0, Math.max(0.2, r));
  sunGrad.addColorStop(0, '#ffffff'); // Incandescent core (5778K)
  sunGrad.addColorStop(0.25, '#fffbeb');
  sunGrad.addColorStop(0.55, '#f59e0b');
  sunGrad.addColorStop(0.82, '#d97706');
  sunGrad.addColorStop(1, '#7c2d12'); // Limb darkening edge

  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = isSelected ? 40 : 25;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Turbulent Plasma Granulation Spots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let i = 0; i < 10; i++) {
    const px = Math.cos(frame * 0.015 + i * 1.2) * r * 0.55;
    const py = Math.sin(frame * 0.012 + i * 2.1) * r * 0.55;
    ctx.beginPath();
    ctx.arc(px, py, Math.max(0.5, r * 0.12), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// -------------------------------------------------------------
// 2. BLACK HOLE (Singularity) - Relativistic Lensing & Doppler Beaming
// -------------------------------------------------------------
function renderPhotorealisticBlackHole(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number,
  isSelected: boolean
) {
  ctx.save();
  ctx.translate(x, y);

  // Upper Gravitational Lensing Arch
  const upperGrad = ctx.createRadialGradient(
    0,
    -r * 0.3,
    Math.max(0.1, r * 0.8),
    0,
    -r * 0.3,
    Math.max(0.2, r * 2.4)
  );
  upperGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  upperGrad.addColorStop(0.3, 'rgba(255, 215, 0, 0.8)');
  upperGrad.addColorStop(0.65, 'rgba(249, 115, 22, 0.5)');
  upperGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = upperGrad;
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.2, r * 2.2, r * 1.9, 0, Math.PI, Math.PI * 2);
  ctx.fill();

  // Lower Gravitational Lensing Arch
  const lowerGrad = ctx.createRadialGradient(
    0,
    r * 0.3,
    Math.max(0.1, r * 0.8),
    0,
    r * 0.3,
    Math.max(0.2, r * 1.8)
  );
  lowerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  lowerGrad.addColorStop(0.35, 'rgba(255, 180, 0, 0.65)');
  lowerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = lowerGrad;
  ctx.beginPath();
  ctx.ellipse(0, r * 0.2, r * 1.8, r * 1.1, 0, 0, Math.PI);
  ctx.fill();

  // Relativistic Doppler-Beamed Accretion Disk (Left side blinding bright, right side dimmer)
  const safeDiskR = Math.max(1, r * 3.2);
  try {
    const diskGrad = ctx.createLinearGradient(-safeDiskR, 0, safeDiskR, 0);
    diskGrad.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Doppler boosted oncoming
    diskGrad.addColorStop(0.25, 'rgba(147, 197, 253, 0.9)');
    diskGrad.addColorStop(0.5, 'rgba(255, 215, 0, 0.85)');
    diskGrad.addColorStop(0.8, 'rgba(234, 88, 12, 0.55)');
    diskGrad.addColorStop(1, 'rgba(159, 18, 57, 0.2)');

    ctx.fillStyle = diskGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, safeDiskR, safeDiskR / 2.8, 0, 0, Math.PI * 2);
    ctx.fill();
  } catch (e) {}

  // Schwarzschild Event Horizon (0 Reflectance Void)
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1, r * 0.95), 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Thin Relativistic Photon Ring
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1.1, r * 0.98), 0, Math.PI * 2);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.4;
  ctx.shadowColor = '#ffd700';
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.restore();
}

// -------------------------------------------------------------
// 3. MERCURY (Budha) - Silicate Regolith & Impact Basins
// -------------------------------------------------------------
function renderMercuryPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Basalt silicate spherical shading
  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  grad.addColorStop(0, '#e2e8f0');
  grad.addColorStop(0.4, '#94a3b8');
  grad.addColorStop(0.75, '#475569');
  grad.addColorStop(1, '#0f172a');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // Craters & Caloris Basin impact rims
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1;
  const craters = [
    { cx: -0.2, cy: -0.3, cr: 0.18 },
    { cx: 0.25, cy: 0.15, cr: 0.22 },
    { cx: -0.35, cy: 0.2, cr: 0.15 },
    { cx: 0.1, cy: -0.4, cr: 0.12 },
  ];
  craters.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.cx * r, c.cy * r, Math.max(0.2, c.cr * r), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.restore();
}

// -------------------------------------------------------------
// 4. VENUS (Shukra) - Creamy Dense Sulfuric Acid Cloud Veil
// -------------------------------------------------------------
function renderVenusPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Sulfuric acid atmosphere with golden limb
  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  grad.addColorStop(0, '#fef9c3'); // Bright sunlit cloud tops
  grad.addColorStop(0.4, '#fef08a');
  grad.addColorStop(0.7, '#eab308');
  grad.addColorStop(0.9, '#a16207');
  grad.addColorStop(1, '#451a03'); // Dark terminator

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // Soft atmospheric chevron cloud bands
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = Math.max(0.5, r * 0.15);
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.ellipse(0, i * r * 0.35, r * 1.1, Math.max(0.1, r * 0.25), 0.1, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Atmospheric limb scattering
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

// -------------------------------------------------------------
// 5. EARTH (Prithvi) - Blue Marble with Ocean Glint, Continents & Cyclones
// -------------------------------------------------------------
function renderEarthPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // 1. Deep Ocean Sphere
  const oceanGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  oceanGrad.addColorStop(0, '#38bdf8'); // Specular sun reflection
  oceanGrad.addColorStop(0.3, '#0284c7');
  oceanGrad.addColorStop(0.7, '#0369a1');
  oceanGrad.addColorStop(0.92, '#0c4a6e');
  oceanGrad.addColorStop(1, '#082f49');

  ctx.fillStyle = oceanGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // 2. Realistic Landmass Continents (Africa, Eurasia, Americas)
  const rot = (frame * 0.003) % (Math.PI * 2);
  ctx.fillStyle = '#15803d'; // Forest green
  const continents = [
    // Africa / Europe
    { x: Math.sin(rot) * r * 0.6, y: -r * 0.1, rx: r * 0.38, ry: r * 0.55 },
    // Eurasia / India
    { x: Math.sin(rot + 1.2) * r * 0.7, y: -r * 0.3, rx: r * 0.45, ry: r * 0.35 },
    // Americas
    { x: Math.sin(rot + 3.2) * r * 0.7, y: 0, rx: r * 0.35, ry: r * 0.7 },
  ];

  continents.forEach((c) => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, Math.max(0.1, c.rx), Math.max(0.1, c.ry), 0.2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Sahara / Desert Ochre tones
  ctx.fillStyle = '#ca8a04';
  continents.forEach((c) => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y - r * 0.08, Math.max(0.1, c.rx * 0.6), Math.max(0.1, c.ry * 0.35), 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Polar Ice Caps (Arctic & Antarctic)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.88, Math.max(0.1, r * 0.45), Math.max(0.1, r * 0.18), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, r * 0.88, Math.max(0.1, r * 0.55), Math.max(0.1, r * 0.2), 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. Swirling Weather / Cyclonic Cloud Systems
  ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
  const cloudRot = rot * 1.25;
  for (let i = 0; i < 5; i++) {
    const cx = Math.sin(cloudRot + i * 1.3) * r * 0.8;
    const cy = Math.cos(i * 1.5) * r * 0.6;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(0.2, r * 0.22), 0, Math.PI * 2);
    ctx.arc(cx + r * 0.12, cy - r * 0.05, Math.max(0.2, r * 0.16), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  // 5. Atmospheric Rayleigh Scattering Blue Rim
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // 6. Orbiting Moon
  const moonAngle = frame * 0.02;
  const moonDist = r * 1.75;
  const mx = Math.cos(moonAngle) * moonDist;
  const my = Math.sin(moonAngle) * (moonDist * 0.4);
  ctx.beginPath();
  ctx.arc(mx, my, Math.max(0.5, r * 0.26), 0, Math.PI * 2);
  ctx.fillStyle = '#cbd5e1';
  ctx.shadowColor = '#e2e8f0';
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

// -------------------------------------------------------------
// 6. MARS (Mangal) - Ferric Oxide Crust, Valles Marineris & Ice Caps
// -------------------------------------------------------------
function renderMarsPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Red planet ferric oxide spherical gradient
  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  grad.addColorStop(0, '#fca5a5'); // Sunlit rusty ochre
  grad.addColorStop(0.35, '#ef4444');
  grad.addColorStop(0.7, '#b91c1c');
  grad.addColorStop(0.9, '#7f1d1d');
  grad.addColorStop(1, '#450a0a');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Dark Basaltic Plains (Syrtis Major) & Canyon Rifts (Valles Marineris)
  ctx.fillStyle = 'rgba(69, 10, 10, 0.65)';
  ctx.beginPath();
  ctx.ellipse(-r * 0.1, r * 0.15, Math.max(0.1, r * 0.45), Math.max(0.1, r * 0.22), -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Valles Marineris rift streak
  ctx.strokeStyle = '#450a0a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-r * 0.4, 0);
  ctx.lineTo(r * 0.3, r * 0.1);
  ctx.stroke();

  // Olympus Mons Caldera Shield
  ctx.beginPath();
  ctx.arc(r * 0.35, -r * 0.2, Math.max(0.2, r * 0.12), 0, Math.PI * 2);
  ctx.fillStyle = '#991b1b';
  ctx.fill();

  // Polar Ice Cap (CO2 / Water Ice)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.9, Math.max(0.1, r * 0.35), Math.max(0.1, r * 0.14), 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();
}

// -------------------------------------------------------------
// 7. JUPITER (Brihaspati) - Zonal Jet Streams & Great Red Spot
// -------------------------------------------------------------
function renderJupiterPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Gas giant base sphere
  const baseGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  baseGrad.addColorStop(0, '#fef3c7');
  baseGrad.addColorStop(0.5, '#d97706');
  baseGrad.addColorStop(0.85, '#92400e');
  baseGrad.addColorStop(1, '#451a03');

  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Intricate Zonal Jet Stream Belts & Zones
  const belts = [
    { y: -0.75, h: 0.15, col: '#78350f' },
    { y: -0.55, h: 0.12, col: '#fde68a' },
    { y: -0.35, h: 0.18, col: '#9a3412' }, // North Equatorial Belt
    { y: -0.12, h: 0.14, col: '#fef3c7' }, // Equatorial Zone
    { y: 0.15, h: 0.22, col: '#b45309' }, // South Equatorial Belt
    { y: 0.45, h: 0.15, col: '#fed7aa' },
    { y: 0.68, h: 0.18, col: '#7c2d12' },
  ];

  belts.forEach((b) => {
    ctx.fillStyle = b.col;
    ctx.fillRect(-r, b.y * r, r * 2, b.h * r);

    // Turbulent swirl oscillations across the belt
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(-r, b.y * r);
    for (let px = -r; px <= r; px += 10) {
      const py = b.y * r + Math.sin(px * 0.1 + frame * 0.02) * (r * 0.04);
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  });

  // Great Red Spot Vortex (Anticyclonic Storm with Eye)
  const grsX = Math.cos(frame * 0.008) * r * 0.45;
  const grsY = r * 0.26;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, Math.max(0.1, r * 0.24), Math.max(0.1, r * 0.14), 0, 0, Math.PI * 2);
  ctx.fillStyle = '#dc2626'; // Iconic Red
  ctx.fill();

  // Internal GRS Eye
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, Math.max(0.1, r * 0.1), Math.max(0.1, r * 0.06), 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.55;
  ctx.fill();
  ctx.globalAlpha = 1.0;

  ctx.restore();
  ctx.restore();
}

// -------------------------------------------------------------
// 8. SATURN (Shani) - Butterscotch Globe & 3D Ring System
// -------------------------------------------------------------
function renderSaturnPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  const ringTilt = 0.38;
  const outerRingR = r * 2.45;

  // 1. Back Half of Rings (Behind Planet)
  renderSaturnRings(ctx, r, ringTilt, outerRingR, Math.PI, Math.PI * 2);

  // 2. Planet Shadow Cast onto Back Rings
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.beginPath();
  ctx.ellipse(r * 0.25, -r * 0.3, Math.max(0.1, r * 0.9), Math.max(0.1, r * 0.35), 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. Saturn Globe Sphere with Soft Golden Bands
  const planetGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  planetGrad.addColorStop(0, '#fef3c7');
  planetGrad.addColorStop(0.4, '#fde68a');
  planetGrad.addColorStop(0.75, '#d97706');
  planetGrad.addColorStop(1, '#78350f');

  ctx.fillStyle = planetGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // Ring Shadow Cast onto the Planet's Surface
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.08, Math.max(0.1, r * 1.1), Math.max(0.1, r * 0.14), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 4. Front Half of Rings (In Front of Planet)
  renderSaturnRings(ctx, r, ringTilt, outerRingR, 0, Math.PI);

  ctx.restore();
}

function renderSaturnRings(
  ctx: CanvasRenderingContext2D,
  r: number,
  tilt: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) {
  ctx.save();
  // Multi-tier Ring System with Cassini Division
  // B-Ring (Dense Gold)
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.max(0.1, outerR * 0.75), Math.max(0.1, outerR * 0.75 * tilt), -0.2, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.lineWidth = Math.max(0.5, r * 0.35);
  ctx.stroke();

  // Cassini Division (Dark Gap)
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.max(0.1, outerR * 0.82), Math.max(0.1, outerR * 0.82 * tilt), -0.2, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.lineWidth = Math.max(0.2, r * 0.08);
  ctx.stroke();

  // A-Ring (Outer Ring)
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.max(0.1, outerR * 0.94), Math.max(0.1, outerR * 0.94 * tilt), -0.2, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.65)';
  ctx.lineWidth = Math.max(0.5, r * 0.22);
  ctx.stroke();
  ctx.restore();
}

// -------------------------------------------------------------
// 9. URANUS (Aruna) - Aquamarine Ice Giant
// -------------------------------------------------------------
function renderUranusPhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  grad.addColorStop(0, '#cffafe'); // Cyan pale top
  grad.addColorStop(0.5, '#22d3ee');
  grad.addColorStop(0.85, '#0891b2');
  grad.addColorStop(1, '#164e63');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // Atmospheric limb ring
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(165, 243, 252, 0.6)';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.restore();
}

// -------------------------------------------------------------
// 10. NEPTUNE (Varuna) - Deep Azure Storms & High Cirrus
// -------------------------------------------------------------
function renderNeptunePhotorealistic(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, Math.max(0.1, r * 0.1), 0, 0, Math.max(0.2, r));
  grad.addColorStop(0, '#60a5fa');
  grad.addColorStop(0.45, '#2563eb');
  grad.addColorStop(0.8, '#1d4ed8');
  grad.addColorStop(1, '#172554');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // High-altitude supersonic methane storm cirrus wisps
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.ellipse(r * 0.15, -r * 0.25, Math.max(0.1, r * 0.35), Math.max(0.1, r * 0.08), 0.1, 0, Math.PI * 2);
  ctx.stroke();

  // Great Dark Spot
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.beginPath();
  ctx.ellipse(-r * 0.2, r * 0.2, Math.max(0.1, r * 0.25), Math.max(0.1, r * 0.15), 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// -------------------------------------------------------------
// 11. Generic Volumetric Sphere Fallback
// -------------------------------------------------------------
function renderStandardVolumetricSphere(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  baseColor: string,
  glowColor: string,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  const safeR = Math.max(2, safeNum(r, 10));
  const grad = ctx.createRadialGradient(-safeR * 0.35, -safeR * 0.35, Math.max(0.1, safeR * 0.1), 0, 0, Math.max(0.2, safeR));
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.4, baseColor || '#ffd700');
  grad.addColorStop(1, '#000000');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, safeR, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
