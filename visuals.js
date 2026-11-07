"use strict";

// A domain-warped noise field gives the hero continuous, soft-edged motion.
// Rendering stops when the hero, tab, or the user's motion preference pauses it.
(() => {
  const canvas = document.querySelector("#fluid-field");
  const field = canvas.parentElement;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    field.dataset.renderer = "fallback";
    return;
  }

  const vertexSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;

    float randomValue(vec2 point) {
      vec3 value = fract(vec3(point.xyx) * 0.1031);
      value += dot(value, value.yzx + 33.33);
      return fract((value.x + value.y) * value.z);
    }

    float softNoise(vec2 point) {
      vec2 cell = floor(point);
      vec2 local = fract(point);
      vec2 blend = local * local * (3.0 - 2.0 * local);
      return mix(
        mix(randomValue(cell), randomValue(cell + vec2(1.0, 0.0)), blend.x),
        mix(randomValue(cell + vec2(0.0, 1.0)), randomValue(cell + vec2(1.0)), blend.x),
        blend.y
      );
    }

    float cloudNoise(vec2 point) {
      float value = 0.0;
      float weight = 0.57;
      mat2 turn = mat2(0.82, 0.57, -0.57, 0.82);
      for (int octave = 0; octave < 3; octave++) {
        value += softNoise(point) * weight;
        point = turn * point * 2.03 + vec2(7.3, 2.1);
        weight *= 0.43;
      }
      return value;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      float aspect = resolution.x / resolution.y;
      vec2 point = (uv - vec2(0.46, 0.43)) * vec2(aspect, 1.0) * 2.75;
      float drift = time * 0.045;
      vec2 current = vec2(
        cloudNoise(point * 0.72 + vec2(drift, 1.4)),
        cloudNoise(point * 0.72 + vec2(5.8, -drift * 0.8))
      ) - 0.45;
      vec2 fold = vec2(
        cloudNoise(point + current * 2.6 + vec2(1.7, drift * 0.6)),
        cloudNoise(point + current * 2.3 + vec2(8.2, -drift * 0.5))
      ) - 0.44;
      float density = cloudNoise(point * 0.87 + current * 2.4 + fold * 2.0);
      float ribbon = cloudNoise(point * 0.64 + fold * 3.1 + vec2(-drift * 0.2, 4.2));
      float blue = smoothstep(0.20, 0.69, density);
      float silver = smoothstep(0.36, 0.76, ribbon + density * 0.19);

      vec3 color = mix(vec3(0.018, 0.027, 0.045), vec3(0.115, 0.26, 0.45), blue);
      color = mix(color, vec3(0.66, 0.67, 0.69), silver * 0.71);
      color *= 0.70 + 0.30 * smoothstep(0.2, 0.7, density);
      float light = exp(-length((uv - vec2(0.87, 0.8)) * vec2(aspect, 1.0)) * 2.4);
      color += vec3(0.09, 0.085, 0.10) * light;
      float vignette = smoothstep(0.3, 0.95, length(uv - 0.5));
      color *= 1.0 - vignette * 0.30;
      color += (randomValue(gl_FragCoord.xy) - 0.5) * 0.006;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw new Error("Fluid shader is unavailable");
    }
    return shader;
  }

  let program;
  try {
    const vertex = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Fluid program is unavailable");
    }
  } catch {
    field.dataset.renderer = "fallback";
    return;
  }

  gl.useProgram(program);
  const vertices = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "resolution");
  const time = gl.getUniformLocation(program, "time");
  let frame = 0;
  let previousTime = 0;
  let previousDraw = 0;
  let elapsed = 24;
  let inView = true;
  let contextLost = false;

  function draw() {
    if (contextLost) return;
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(time, elapsed);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function canRun() {
    return (
      !contextLost &&
      inView &&
      !document.hidden &&
      !reducedMotion.matches &&
      !document.body.classList.contains("motion-paused")
    );
  }

  function animate(timestamp) {
    frame = 0;
    if (!canRun()) return;
    if (previousTime) elapsed += Math.min(timestamp - previousTime, 100) / 1000;
    previousTime = timestamp;
    if (timestamp - previousDraw >= 1000 / 24) {
      draw();
      previousDraw = timestamp;
    }
    frame = requestAnimationFrame(animate);
  }

  function syncPlayback() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    if (canRun()) frame = requestAnimationFrame(animate);
  }

  function resize() {
    const { width, height } = field.getBoundingClientRect();
    const pixelBudget = width < 760 ? 260000 : 700000;
    const ratio = Math.min(1, Math.sqrt(pixelBudget / (width * height)));
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    draw();
  }

  new ResizeObserver(resize).observe(field);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  }).observe(field);
  new MutationObserver(syncPlayback).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  document.addEventListener("visibilitychange", syncPlayback);
  reducedMotion.addEventListener("change", syncPlayback);
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    contextLost = true;
    field.dataset.renderer = "fallback";
    canvas.style.opacity = "0";
    syncPlayback();
  });
  resize();
  field.dataset.renderer = "webgl";
  requestAnimationFrame(() => field.classList.add("field-ready"));
  syncPlayback();
})();

(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const cards = [...document.querySelectorAll(".feature-card")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("demo-offscreen", !entry.isIntersecting),
      );
    },
    { threshold: 0.08 },
  );

  function updateLabels() {
    const english = document.documentElement.lang === "en";
    cards.forEach((card) => {
      const button = card.querySelector(".card-pause");
      const paused = card.classList.contains("demo-paused");
      button.setAttribute(
        "aria-label",
        english
          ? paused
            ? "Resume demo"
            : "Pause demo"
          : paused
            ? "继续演示"
            : "暂停演示",
      );
      button.setAttribute("aria-pressed", String(paused));
      button
        .querySelector("use")
        .setAttribute("href", paused ? "#i-play" : "#i-pause");
      button.hidden = reducedMotion.matches;
    });
  }

  cards.forEach((card) => {
    card.classList.add("demo-offscreen");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card-pause icon-button";
    button.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="#i-pause"/></svg>';
    button.addEventListener("click", () => {
      card.classList.toggle("demo-paused");
      updateLabels();
    });
    card.append(button);
    observer.observe(card);
  });
  new MutationObserver(updateLabels).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  reducedMotion.addEventListener("change", updateLabels);
  document.addEventListener("visibilitychange", () =>
    document.body.classList.toggle("page-hidden", document.hidden),
  );
  updateLabels();
})();
