"use strict";

// Both fields share the mark and renderer; the hero plays on time, the footer on scroll.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(pointer: fine)");
  const mask = document.createElement("canvas");
  mask.width = mask.height = 512;
  const ink = mask.getContext("2d", { willReadFrequently: true });
  if (!ink) return;

  // Paths from the project's existing icon, with its outer tile removed.
  ink.fillStyle = "#a18cd6";
  ink.fill(
    new Path2D(
      "M151 109h191c37 0 67 30 67 67v47c0 37-30 67-67 67h-5l11 38-52-38H151c-37 0-67-30-67-67v-47c0-37 30-67 67-67z",
    ),
  );
  ink.fillStyle = "#ded8ed";
  ink.fill(
    new Path2D(
      "M157 204h179c37 0 67 30 67 67v40c0 37-30 67-67 67H213l-52 37 11-37h-15c-37 0-67-30-67-67v-40c0-37 30-67 67-67z",
    ),
  );
  ink.fillStyle = "#98c9bd";
  ink.beginPath();
  ink.arc(338, 303, 38, 0, Math.PI * 2);
  ink.fill();
  ink.globalCompositeOperation = "destination-out";
  ink.lineCap = ink.lineJoin = "round";
  ink.lineWidth = 17;
  ink.stroke(new Path2D("M158 267h132M158 307h85"));
  ink.lineWidth = 9;
  ink.stroke(new Path2D("M338 282v38m-15-14 15 15 15-15"));
  const image = ink.getImageData(0, 0, 512, 512).data;
  const glow = document.createElement("canvas");
  glow.width = glow.height = 32;
  const glowContext = glow.getContext("2d");
  const halo = glowContext.createRadialGradient(16, 16, 0, 16, 16, 16);
  halo.addColorStop(0, "rgba(221, 211, 248, .3)");
  halo.addColorStop(0.2, "rgba(189, 163, 237, .08)");
  halo.addColorStop(1, "rgba(189, 163, 237, 0)");
  glowContext.fillStyle = halo;
  glowContext.fillRect(0, 0, 32, 32);

  function createField(section, canvas, automatic = false) {
    const context = canvas.getContext("2d");
    if (!context) return;
    const symbol = section.querySelector(
      automatic ? ".hero-copy" : ".closing-symbol",
    );
    const download = section.querySelector(
      automatic ? ".primary-download" : ".closing-download",
    );

    let width = 0,
      height = 0,
      centerX = 0,
      centerY = 0,
      copyTop = 0;
    let particles = [],
      gather = 0,
      targetGather = 0,
      elapsed = 0;
    let frame = 0,
      lastTime = 0,
      lastDraw = 0;
    let visible = false,
      entered = automatic;
    let autoplayReady = !automatic;
    let emphasis = 0,
      targetEmphasis = 0;
    let pointerX = -1000,
      pointerY = -1000,
      seed = 917;
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const smooth = (v) => {
      const t = clamp(v);
      return t * t * (3 - 2 * t);
    };
    function random() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    function updateGather() {
      if (automatic) return;
      const bounds = section.getBoundingClientRect();
      targetGather = clamp(
        (innerHeight - bounds.top - centerY) / (innerHeight * 0.55),
      );
    }
    function resize() {
      width = section.clientWidth;
      const bounds = section.getBoundingClientRect();
      const symbolBounds = symbol.getBoundingClientRect();
      height = automatic
        ? symbolBounds.bottom - bounds.top + 36
        : section.clientHeight;
      if (automatic) canvas.style.height = `${height}px`;
      centerX = width / 2;
      centerY = automatic
        ? symbolBounds.top - bounds.top + symbolBounds.height * 0.47
        : symbol.offsetTop + symbol.offsetHeight / 2;
      copyTop = automatic ? height : section.querySelector("h2").offsetTop;
      const dpr = Math.min(
        devicePixelRatio || 1,
        1.5,
        Math.sqrt(850000 / (width * height)),
      );
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = width < 600;
      const scale = (automatic ? (small ? 480 : 700) : small ? 270 : 340) / 512;
      const step = small ? 13 : 10;
      particles = [];
      seed = 917;
      for (let y = 100; y < 420; y += step)
        for (let x = 80; x < 415; x += step) {
          const sampleX = Math.round(x + (random() - 0.5) * step * 0.85);
          const sampleY = Math.round(y + (random() - 0.5) * step * 0.85);
          const index = (sampleY * 512 + sampleX) * 4;
          if (image[index + 3] < 180) continue;
          const angle = random() * Math.PI * 2;
          const vertical = random() * 2 - 1;
          const radial = Math.sqrt(1 - vertical * vertical);
          const radius = 0.45 + random() * 0.55;
          particles.push({
            tx: (sampleX - 246.5) * scale,
            ty: (sampleY - 262) * scale,
            tz: image[index] < 190 ? -9 : 8,
            sx:
              Math.cos(angle) *
              radial *
              radius *
              (automatic ? (small ? 320 : 620) : Math.min(width * 0.47, 340)),
            sy: vertical * radius * (automatic ? height * 0.7 : 180),
            sz: Math.sin(angle) * radial * radius * (automatic ? 220 : 150),
            phase: random() * Math.PI * 2,
            size: 1 + random() * 0.8,
            opacity: 0.55 + random() * 0.4,
            color: `${image[index]}, ${image[index + 1]}, ${image[index + 2]}`,
            glimmer: random() > 0.96,
          });
        }
      updateGather();
      if (needsStillFrame()) drawStillFrame();
      else render(elapsed, gather);
      section.dataset.particleField = "ready";
    }

    function render(time, amount) {
      context.clearRect(0, 0, width, height);
      const formed = smooth(amount);
      const fade = reduced.matches ? 1 : 1 - Math.exp(-time * 1.7);
      const rotateY = Math.sin(time * 0.16) * 0.09;
      const rotateZ = Math.sin(time * 0.12) * 0.025;
      const cy = Math.cos(rotateY),
        sy = Math.sin(rotateY);
      const cz = Math.cos(rotateZ),
        sz = Math.sin(rotateZ);
      const float = 4 * (1 - formed) + 0.6;
      context.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        const drift = time * 0.035;
        const sx = p.sx * Math.cos(drift) + p.sz * Math.sin(drift);
        let x =
          sx * (1 - formed) +
          p.tx * formed +
          Math.sin(time * 0.4 + p.phase) * float;
        let y =
          p.sy * (1 - formed) +
          p.ty * formed +
          Math.cos(time * 0.35 + p.phase) * float;
        const z = p.sz * (1 - formed) + p.tz * formed;
        const rotatedX = x * cy + z * sy;
        const rotatedZ = z * cy - x * sy;
        const perspective = 700 / (700 - rotatedZ);
        x = centerX + (rotatedX * cz - y * sz) * perspective;
        y =
          centerY +
          (rotatedX * sz + y * cz) * perspective +
          Math.sin(time * 0.3) * 1.5;
        // Footer light stays above the copy; hero light sits behind it.
        const clearance = automatic ? 1 : 1 - smooth((y - copyTop + 28) / 30);
        const edge = smooth(Math.min(x, width - x) / 35);
        const shimmer = 0.88 + Math.sin(time * 0.8 + p.phase) * 0.12;
        const alpha =
          p.opacity *
          fade *
          clearance *
          edge *
          shimmer *
          (0.65 + formed * 0.25 + emphasis * 0.08);
        if (alpha < 0.01) return;
        if (finePointer.matches && !reduced.matches) {
          const dx = x - pointerX,
            dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0.1 && distance < 65) {
            const push = Math.pow(1 - distance / 65, 2) * 8;
            x += (dx / distance) * push;
            y += (dy / distance) * push;
          }
        }
        const size = p.size * perspective * (0.9 + formed * 0.2);
        context.globalAlpha = alpha;
        context.fillStyle = `rgb(${p.color})`;
        context.beginPath();
        context.arc(x, y, size * 0.56, 0, Math.PI * 2);
        context.fill();
        if (p.glimmer) {
          context.globalAlpha = alpha * 0.42;
          context.drawImage(glow, x - 6, y - 6, 12, 12);
        }
      });
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    }
    function canRun() {
      return (
        entered &&
        autoplayReady &&
        visible &&
        !document.hidden &&
        !reduced.matches &&
        !document.body.classList.contains("motion-paused")
      );
    }
    function needsStillFrame() {
      return (
        reduced.matches ||
        (elapsed === 0 && document.body.classList.contains("motion-paused"))
      );
    }
    function drawStillFrame() {
      elapsed = Math.max(elapsed, 6);
      gather = 1;
      render(elapsed, gather);
    }
    function animate(timestamp) {
      frame = 0;
      if (!canRun()) return;
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.08) : 0;
      lastTime = timestamp;
      elapsed += dt;
      const blend = 1 - Math.exp(-dt * 3);
      if (automatic) gather = clamp(elapsed / 3.3);
      else gather += (targetGather - gather) * blend;
      emphasis += (targetEmphasis - emphasis) * blend;
      if (timestamp - lastDraw >= 1000 / (width < 600 ? 24 : 30)) {
        render(elapsed, gather);
        lastDraw = timestamp;
      }
      frame = requestAnimationFrame(animate);
    }
    function syncPlayback() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (needsStillFrame()) drawStillFrame();
      if (canRun()) frame = requestAnimationFrame(animate);
    }
    new ResizeObserver(resize).observe(section);
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!automatic && entry.intersectionRatio >= 0.28) entered = true;
        updateGather();
        syncPlayback();
      },
      { threshold: automatic ? 0 : [0, 0.28] },
    ).observe(automatic ? canvas : section);
    new MutationObserver(syncPlayback).observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    if (!automatic) addEventListener("scroll", updateGather, { passive: true });
    reduced.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    section.addEventListener(
      "pointermove",
      (event) => {
        if (!finePointer.matches || reduced.matches) return;
        const bounds = section.getBoundingClientRect();
        pointerX = event.clientX - bounds.left;
        pointerY = event.clientY - bounds.top;
      },
      { passive: true },
    );
    section.addEventListener("pointerleave", () => {
      pointerX = pointerY = -1000;
    });
    download.addEventListener("pointerenter", () => {
      targetEmphasis = 1;
    });
    download.addEventListener("pointerleave", () => {
      targetEmphasis = 0;
    });
    download.addEventListener("focus", () => {
      targetEmphasis = 1;
    });
    download.addEventListener("blur", () => {
      targetEmphasis = 0;
    });
    resize();
    if (automatic) {
      const startAfterLoad = () =>
        setTimeout(() => {
          autoplayReady = true;
          syncPlayback();
        }, 1000);
      if (document.readyState === "complete") startAfterLoad();
      else addEventListener("load", startAfterLoad, { once: true });
    }
  }
  createField(
    document.querySelector(".hero"),
    document.querySelector(".hero-particles"),
    true,
  );
  createField(
    document.querySelector(".closing-section"),
    document.querySelector(".closing-field"),
  );
})();
