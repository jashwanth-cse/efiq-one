/* ─────────────────────────────────────────────────────────────
   Custom Cursor System
   - Smooth lerp following
   - Particle trail
   - Hover scale-up
   - Magnetic button / card effect
───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  /* ── DOM references ── */
  const cursor = document.getElementById("cursor");

  /* ── Raw mouse coordinates (updated instantly) ── */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  /* ── Lerped cursor coordinates (updated each frame) ── */
  let currentX = mouseX;
  let currentY = mouseY;

  /* ── Particle throttle: track last particle creation time ── */
  let lastParticleTime = 0;
  const PARTICLE_INTERVAL = 30; // ms between particles (lower = denser trail)
  const MAX_PARTICLES = 60; // hard cap to protect DOM

  /* ─────────────────────────────────────────
     1.  Track raw mouse position
  ───────────────────────────────────────── */
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Spawn a particle on move (throttled) */
    spawnParticle(mouseX, mouseY);
  });

  /* ─────────────────────────────────────────
     2.  Smooth cursor via requestAnimationFrame (lerp)
  ───────────────────────────────────────── */
  function animateCursor() {
    /* Lerp: currentPos += (target - currentPos) * smoothing */
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;

    /* Move cursor element with translate for GPU compositing */
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animateCursor);
  }

  /* Kick off the animation loop */
  requestAnimationFrame(animateCursor);

  /* ─────────────────────────────────────────
     3.  Particle trail
  ───────────────────────────────────────── */
  function spawnParticle(x, y) {
    const now = Date.now();
    if (now - lastParticleTime < PARTICLE_INTERVAL) return;

    /* Respect the hard DOM cap */
    const existing = document.querySelectorAll(".particle");
    if (existing.length >= MAX_PARTICLES) return;

    lastParticleTime = now;

    /* Random size between 4–6 px */
    const size = Math.random() * 2 + 4;
    /* Small random offset so particles don't all stack perfectly */
    const offsetX = (Math.random() - 0.5) * 6;
    const offsetY = (Math.random() - 0.5) * 6;

    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    /* Centre the particle on the cursor position */
    p.style.left = `${x - size / 2 + offsetX}px`;
    p.style.top = `${y - size / 2 + offsetY}px`;
    /* Slight opacity variation for organic feel */
    p.style.opacity = (Math.random() * 0.4 + 0.4).toString();

    document.body.appendChild(p);

    /* Remove after the CSS animation finishes (600ms) */
    setTimeout(() => p.remove(), 620);
  }

  /* ─────────────────────────────────────────
     4.  Hover state — enlarge cursor on interactive elements
  ───────────────────────────────────────── */
  const HOVER_SELECTORS = "a, button, [data-magnetic]";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(HOVER_SELECTORS)) {
      cursor.classList.add("is-hovering");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(HOVER_SELECTORS)) {
      cursor.classList.remove("is-hovering");
    }
  });

  /* ─────────────────────────────────────────
     5.  Magnetic effect on [data-magnetic] elements
         Buttons and cards gently move toward the cursor.
  ───────────────────────────────────────── */

  /* Magnetic pull strength (0 = none, 1 = snaps to cursor) */
  const MAGNETIC_STRENGTH = 0.35;

  /* Store each element's active animation-frame id so we can cancel */
  const magneticFrames = new WeakMap();

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      /* Cancel any in-progress return animation */
      if (magneticFrames.has(el)) {
        cancelAnimationFrame(magneticFrames.get(el));
      }
    });

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      /* Distance from cursor to element centre */
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      el.style.transform = `translate(${dx * MAGNETIC_STRENGTH}px, ${dy * MAGNETIC_STRENGTH}px)`;
    });

    el.addEventListener("mouseleave", () => {
      /* Smoothly spring the element back to its original position */
      returnToOrigin(el);
    });
  });

  /**
   * Gradually lerp the element's translate back to (0, 0).
   * Uses its own rAF loop so it doesn't block the cursor loop.
   */
  function returnToOrigin(el) {
    /* Read current translate values */
    let tx = getTranslateXY(el).x;
    let ty = getTranslateXY(el).y;

    function step() {
      tx += (0 - tx) * 0.15;
      ty += (0 - ty) * 0.15;

      el.style.transform = `translate(${tx}px, ${ty}px)`;

      /* Stop when close enough */
      if (Math.abs(tx) > 0.3 || Math.abs(ty) > 0.3) {
        magneticFrames.set(el, requestAnimationFrame(step));
      } else {
        el.style.transform = "";
        magneticFrames.delete(el);
      }
    }

    magneticFrames.set(el, requestAnimationFrame(step));
  }

  /**
   * Parse the current CSS transform to extract translate x/y values.
   */
  function getTranslateXY(el) {
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrix(style.transform);
    return { x: matrix.m41, y: matrix.m42 };
  }

  /* ─────────────────────────────────────────
     6.  Hide cursor when mouse leaves the window
  ───────────────────────────────────────── */
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
})();
