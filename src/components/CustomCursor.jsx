"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor
 * - Smooth lerp following (rAF loop)
 * - Neon green (#82E05A) glow dot
 * - Particle trail on mouse move
 * - Scale-up on hover over interactive elements
 * - Magnetic pull + spring-return on [data-magnetic] elements
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /* ── State ── */
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId;

    let lastParticleTime = 0;
    const PARTICLE_INTERVAL = 28; // ms between particles
    const MAX_PARTICLES = 60;
    let particleColorToggle = false;

    /* ─────────────────────────────────────────
       Track raw mouse position + spawn particles
    ───────────────────────────────────────── */
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      spawnParticle(mouseX, mouseY);
    };

    /* ─────────────────────────────────────────
       Lerp animation loop
    ───────────────────────────────────────── */
    const animate = () => {
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    /* ─────────────────────────────────────────
       Particle trail
    ───────────────────────────────────────── */
    function spawnParticle(x, y) {
      const now = Date.now();
      if (now - lastParticleTime < PARTICLE_INTERVAL) return;
      if (document.querySelectorAll(".efiq-particle").length >= MAX_PARTICLES)
        return;
      lastParticleTime = now;

      const size = Math.random() * 2 + 4; // 4–6 px
      const ox = (Math.random() - 0.5) * 8;
      const oy = (Math.random() - 0.5) * 8;

      particleColorToggle = !particleColorToggle;
      const pColor = particleColorToggle ? "#82e05a" : "#5a78ff";

      const p = document.createElement("div");
      p.className = "efiq-particle";
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${x - size / 2 + ox}px;top:${y - size / 2 + oy}px;
        opacity:${Math.random() * 0.4 + 0.45};
        background:${pColor};
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 650);
    }

    /* ─────────────────────────────────────────
       Hover: enlarge cursor on interactive elements
    ───────────────────────────────────────── */
    const HOVER_SEL = 'a, button, [data-magnetic], [role="button"]';
    const FOCUS_SEL = "[data-cursor-focus]";

    const onOver = (e) => {
      if (e.target.closest(FOCUS_SEL)) {
        cursor.classList.remove("is-hovering");
        cursor.classList.add("is-focus");
      } else if (e.target.closest(HOVER_SEL)) {
        cursor.classList.remove("is-focus");
        cursor.classList.add("is-hovering");
      }
    };
    const onOut = (e) => {
      if (e.target.closest(FOCUS_SEL)) {
        cursor.classList.remove("is-focus");
      } else if (e.target.closest(HOVER_SEL)) {
        cursor.classList.remove("is-hovering");
      }
    };

    /* ─────────────────────────────────────────
       Magnetic pull on [data-magnetic] elements
    ───────────────────────────────────────── */
    const STRENGTH = 0.32;
    const magneticFrames = new WeakMap();

    function attachMagnetic(el) {
      const onEnter = () => {
        if (magneticFrames.has(el))
          cancelAnimationFrame(magneticFrames.get(el));
      };

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
      };

      const onLeave = () => springReturn(el);

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      /* Store cleanup references */
      el._cursorCleanup = () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }

    function springReturn(el) {
      const matrix = new DOMMatrix(window.getComputedStyle(el).transform);
      let tx = matrix.m41;
      let ty = matrix.m42;

      function step() {
        tx += (0 - tx) * 0.14;
        ty += (0 - ty) * 0.14;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        if (Math.abs(tx) > 0.3 || Math.abs(ty) > 0.3) {
          magneticFrames.set(el, requestAnimationFrame(step));
        } else {
          el.style.transform = "";
          magneticFrames.delete(el);
        }
      }
      magneticFrames.set(el, requestAnimationFrame(step));
    }

    /* Attach to all current magnetic elements */
    const magneticEls = [...document.querySelectorAll("[data-magnetic]")];
    magneticEls.forEach(attachMagnetic);

    /* ── MutationObserver to catch dynamically added elements ── */
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.dataset?.magnetic !== undefined) attachMagnetic(node);
          node.querySelectorAll?.("[data-magnetic]").forEach(attachMagnetic);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* ─────────────────────────────────────────
       Hide / show cursor when leaving window
    ───────────────────────────────────────── */
    const onLeaveDoc = () => {
      cursor.style.opacity = "0";
    };
    const onEnterDoc = () => {
      cursor.style.opacity = "1";
    };

    /* ─────────────────────────────────────────
       Register all listeners
    ───────────────────────────────────────── */
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);

    /* ─────────────────────────────────────────
       Cleanup on unmount
    ───────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
      magneticEls.forEach((el) => el._cursorCleanup?.());
      document.querySelectorAll(".efiq-particle").forEach((p) => p.remove());
    };
  }, []);

  return <div ref={cursorRef} id="efiq-cursor" aria-hidden="true" />;
}
