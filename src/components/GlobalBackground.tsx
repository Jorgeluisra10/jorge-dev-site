"use client";

/**
 * GlobalBackground
 * ------------------------------------------------------------
 * - Canvas de partículas y parallax sutil.
 * - Fixed y `pointer-events-none` para no interferir con UI.
 * - DPI-aware (devicePixelRatio) y resize-safe.
 */

import React, { useEffect, useRef } from "react";

export default function GlobalBackground(): React.JSX.Element {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = Math.max(1, window.devicePixelRatio || 1);

    // Sizing y escala para pixeles densos
    const size = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * DPR;
      canvas.height = innerHeight * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // coords en px CSS
    };
    size();

    const onResize = () => size();
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouse.current.x = e.clientX / w - 0.5;
      mouse.current.y = e.clientY / h - 0.5;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });

    // Partículas
    const COUNT = 110;
    const stars = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 0.8 + 0.2, // profundidad
      s: Math.random() * 1.2 + 0.6, // tamaño
      seed: i * 0.37,
    }));

    let t = 0;
    const render = () => {
      t += 0.0025;
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);

      // Degradé muy sutil (no tapa el tema)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(2,6,23,0.00)");
      g.addColorStop(1, "rgba(2,6,23,0.06)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Parallax por mouse
      const px = mouse.current.x * 30;
      const py = mouse.current.y * 30;

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        const driftX = Math.sin(t + st.seed) * 14 * st.z;
        const driftY = Math.cos(t * 1.2 + st.seed) * 14 * st.z;

        let x = st.x + driftX + px * st.z;
        let y = st.y + driftY + py * st.z;

        // Reciclado en bordes
        if (x < -10) x += w + 20;
        if (x > w + 10) x -= w + 20;
        if (y < -10) y += h + 20;
        if (y > h + 10) y -= h + 20;

        // Punto
        ctx.beginPath();
        ctx.fillStyle = `rgba(59,130,246,${0.25 + st.z * 0.35})`; // blue-500
        ctx.arc(x, y, st.s * st.z, 0, Math.PI * 2);
        ctx.fill();

        // Estela
        ctx.strokeStyle = `rgba(14,165,233,${0.14 * st.z})`; // cyan-500
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 4 * st.z, y - 2 * st.z);
        ctx.lineTo(x + 2 * st.z, y + 1 * st.z);
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
