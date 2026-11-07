"use strict";

// Light follows curved paths into the app icon. All clocks stop out of view.
(() => {
  const section = document.querySelector(".closing-section");
  const canvas = section.querySelector(".closing-field");
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;
  const icon = section.querySelector(":scope > img");
  const download = section.querySelector(".closing-download");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(pointer: fine)");
  const palette = ["190, 163, 255", "226, 207, 255", "255, 208, 172"];
  const background = document.createElement("canvas");
  const backgroundContext = background.getContext("2d");
  let width = 0;
  let height = 0;
  let ratio = 1;
  let focusX = 0;
  let focusY = 0;
  let lanes = [];
  let motes = [];
  let stars = [];
  let elapsed = 0;
  let frame = 0;
  let lastTime = 0;
  let lastDraw = 0;
  let visible = false;
  let entered = false;
  let boost = 0;
  let targetBoost = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  const clamp = (value) => Math.max(0, Math.min(1, value));
  const smooth = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };
  let seed = 1739;
  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  function pointOnLane(lane, t) {
    const index = clamp(t) * (lane.points.length - 1);
    const low = Math.floor(index);
    const high = Math.min(lane.points.length - 1, low + 1);
    const mix = index - low;
    return {
      x: lane.points[low].x * (1 - mix) + lane.points[high].x * mix,
      y: lane.points[low].y * (1 - mix) + lane.points[high].y * mix,
    };
  }
  function glow(ctx, x, y, radius, color, alpha, stretch = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, stretch);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
    gradient.addColorStop(0.25, `rgba(${color}, ${alpha * 0.4})`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  }

  function resize() {
    width = section.clientWidth;
    height = section.clientHeight;
    focusX = icon.offsetLeft + icon.offsetWidth / 2;
    focusY = icon.offsetTop + icon.offsetHeight / 2;
    ratio = Math.min(
      devicePixelRatio || 1,
      1.5,
      Math.sqrt(1000000 / (width * height)),
    );
    canvas.width = background.width = Math.round(width * ratio);
    canvas.height = background.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    backgroundContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    seed = 1739;
    const small = width < 600;
    lanes = Array.from({ length: small ? 24 : 44 }, (_, index) => {
      const side = index % 2 ? 1 : -1;
      const distance = width * (0.46 + random() * 0.22);
      const upper = index % 5 === 0;
      const startY = upper ? -50 - random() * 120 : 170 + random() * 260;
      const bend = 30 + random() * 110;
      const p0 = { x: side * distance, y: startY };
      const p1 = {
        x: side * distance * 0.72,
        y: upper ? -180 : 20 + random() * 90,
      };
      const p2 = { x: side * (45 + random() * 95), y: -bend };
      const points = Array.from({ length: 81 }, (_, i) => {
        const t = i / 80;
        const u = 1 - t;
        return {
          x: 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + u * u * u * p0.x,
          y: 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + u * u * u * p0.y,
        };
      });
      return {
        points,
        color: palette[index % 7 === 0 ? 2 : index % 2],
        speed: 0.065 + random() * 0.055,
        phase: random(),
        delay: random() * 0.95,
        weight: 0.35 + random() * 0.65,
      };
    });
    motes = Array.from({ length: small ? 100 : 230 }, () => ({
      lane: Math.floor(random() * lanes.length),
      phase: random(),
      size: 0.45 + random() * 1.05,
      speed: 0.65 + random() * 0.8,
      depth: 0.35 + random() * 0.65,
    }));
    stars = Array.from({ length: small ? 30 : 70 }, () => ({
      x: random() * width,
      y: random() * height * 0.75,
      phase: random() * Math.PI * 2,
      size: random() * 0.7 + 0.3,
    }));
    backgroundContext.clearRect(0, 0, width, height);
    backgroundContext.globalCompositeOperation = "lighter";
    glow(
      backgroundContext,
      focusX,
      focusY,
      Math.min(width * 0.6, 380),
      palette[0],
      0.12,
      0.55,
    );
    glow(
      backgroundContext,
      focusX + width * 0.22,
      focusY + 60,
      width * 0.35,
      palette[2],
      0.035,
      0.6,
    );
    backgroundContext.save();
    backgroundContext.translate(focusX, focusY);
    lanes.forEach((lane) => {
      backgroundContext.beginPath();
      lane.points.forEach((point, i) =>
        i
          ? backgroundContext.lineTo(point.x, point.y)
          : backgroundContext.moveTo(point.x, point.y),
      );
      backgroundContext.strokeStyle = `rgba(${lane.color}, ${0.035 * lane.weight})`;
      backgroundContext.lineWidth = 0.6;
      backgroundContext.stroke();
    });
    backgroundContext.restore();
    render(reduced.matches ? 6 : elapsed);
  }

  function streak(lane, head, length, alpha, weight) {
    if (head <= 0 || head >= 1) return;
    const tail = Math.max(0, head - length);
    const start = pointOnLane(lane, tail);
    const end = pointOnLane(lane, head);
    const gradient = context.createLinearGradient(
      start.x,
      start.y,
      end.x + 0.001,
      end.y,
    );
    gradient.addColorStop(0, `rgba(${lane.color}, 0)`);
    gradient.addColorStop(0.7, `rgba(${lane.color}, ${alpha * 0.45})`);
    gradient.addColorStop(1, `rgba(${lane.color}, ${alpha})`);
    context.beginPath();
    for (let i = 0; i <= 15; i++) {
      const point = pointOnLane(lane, tail + ((head - tail) * i) / 15);
      i ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y);
    }
    context.strokeStyle = gradient;
    context.lineWidth = weight;
    context.stroke();
  }

  function render(time) {
    context.clearRect(0, 0, width, height);
    const intro = smooth(time / 2.8);
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 0.4 + intro * 0.6;
    context.drawImage(background, 0, 0, width, height);
    context.globalAlpha = 1;
    context.globalCompositeOperation = "lighter";
    stars.forEach((star) => {
      context.fillStyle = `rgba(208, 190, 240, ${(0.12 + 0.12 * Math.sin(time * 0.6 + star.phase)) * intro})`;
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();
    });
    context.save();
    context.translate(focusX + pointerX, focusY + pointerY);
    lanes.forEach((lane) => {
      const arrival = clamp((time - lane.delay) / 2.7);
      streak(
        lane,
        arrival,
        0.23,
        Math.sin(arrival * Math.PI) * 0.7,
        lane.weight * 1.3,
      );
      const head = (time * lane.speed + lane.phase) % 1;
      streak(
        lane,
        head,
        0.1,
        (0.2 + boost * 0.2) * intro * Math.sin(head * Math.PI),
        lane.weight * 0.8,
      );
    });
    motes.forEach((mote) => {
      const lane = lanes[mote.lane];
      const t = (time * lane.speed * mote.speed + mote.phase) % 1;
      const point = pointOnLane(lane, t);
      const alpha = Math.pow(Math.sin(t * Math.PI), 0.7) * intro * mote.depth;
      if (alpha < 0.03) return;
      const behind = pointOnLane(lane, Math.max(0, t - 0.012));
      context.strokeStyle = `rgba(${lane.color}, ${alpha * 0.3})`;
      context.lineWidth = mote.size * 0.65;
      context.beginPath();
      context.moveTo(behind.x, behind.y);
      context.lineTo(point.x, point.y);
      context.stroke();
      context.fillStyle = `rgba(${lane.color}, ${alpha * 0.8})`;
      context.beginPath();
      context.arc(point.x, point.y, mote.size, 0, Math.PI * 2);
      context.fill();
      if (mote.size > 1.25)
        glow(context, point.x, point.y, 6, lane.color, alpha * 0.25);
    });

    // Thin caustic arcs give the light depth without drawing through the copy.
    const ringWidth = Math.min(width * 0.28, 156);
    for (let i = 0; i < 3; i++) {
      context.save();
      context.rotate(-0.18 + i * 0.17 + pointerX * 0.002);
      const radius = ringWidth * (0.72 + i * 0.28);
      const gradient = context.createLinearGradient(-radius, 0, radius, 0);
      gradient.addColorStop(0, "rgba(190, 163, 255, 0)");
      gradient.addColorStop(0.3, `rgba(190, 163, 255, ${intro * 0.16})`);
      gradient.addColorStop(0.7, `rgba(255, 208, 172, ${intro * 0.33})`);
      gradient.addColorStop(1, "rgba(255, 208, 172, 0)");
      context.strokeStyle = gradient;
      context.lineWidth = i === 1 ? 0.9 : 0.55;
      context.beginPath();
      context.ellipse(0, 0, radius, radius * 0.25, 0, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }
    const pulse = Math.exp(-Math.pow((time - 3.1) / 0.75, 2));
    const breath = 0.85 + Math.sin(time * 0.75) * 0.15;
    glow(
      context,
      0,
      0,
      125 + pulse * 70,
      palette[0],
      intro * (0.13 * breath + boost * 0.08 + pulse * 0.13),
      0.65,
    );
    glow(context, 0, 0, 86, palette[2], intro * (0.12 + boost * 0.08), 0.23);
    if (pulse > 0.01) {
      context.strokeStyle = `rgba(223, 204, 255, ${pulse * 0.2})`;
      context.lineWidth = 0.7;
      context.beginPath();
      context.ellipse(
        0,
        0,
        80 + (time - 2.3) * 62,
        24 + (time - 2.3) * 18,
        -0.1,
        0,
        Math.PI * 2,
      );
      context.stroke();
    }
    context.restore();
    context.globalCompositeOperation = "source-over";
  }

  function canRun() {
    return (
      visible &&
      entered &&
      !document.hidden &&
      !reduced.matches &&
      !document.body.classList.contains("motion-paused")
    );
  }
  function animate(timestamp) {
    frame = 0;
    if (!canRun()) return;
    const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.08) : 0;
    lastTime = timestamp;
    elapsed += delta * (1 + boost * 0.25);
    const blend = 1 - Math.exp(-delta * 4);
    boost += (targetBoost - boost) * blend;
    pointerX += (targetX - pointerX) * blend;
    pointerY += (targetY - pointerY) * blend;
    if (timestamp - lastDraw > 1000 / (width < 600 ? 24 : 30)) {
      render(elapsed);
      lastDraw = timestamp;
    }
    frame = requestAnimationFrame(animate);
  }
  function syncPlayback() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (reduced.matches) render(6);
    if (canRun()) frame = requestAnimationFrame(animate);
  }
  new ResizeObserver(resize).observe(section);
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (entry.intersectionRatio >= 0.35) entered = true;
      syncPlayback();
    },
    { threshold: [0, 0.35] },
  ).observe(section);
  new MutationObserver(syncPlayback).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  reduced.addEventListener("change", syncPlayback);
  document.addEventListener("visibilitychange", syncPlayback);
  section.addEventListener(
    "pointermove",
    (event) => {
      if (!finePointer.matches || reduced.matches) return;
      const bounds = section.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / width - 0.5) * 12;
      targetY = ((event.clientY - bounds.top) / height - 0.5) * 8;
    },
    { passive: true },
  );
  section.addEventListener("pointerleave", () => {
    targetX = targetY = 0;
  });
  download.addEventListener("pointerenter", () => {
    targetBoost = 1;
  });
  download.addEventListener("pointerleave", () => {
    targetBoost = 0;
  });
  download.addEventListener("focus", () => {
    targetBoost = 1;
  });
  download.addEventListener("blur", () => {
    targetBoost = 0;
  });
  resize();
})();
