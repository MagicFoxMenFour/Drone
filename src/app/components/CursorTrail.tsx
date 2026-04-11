import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  alpha: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dots = useRef<Dot[]>([]);
  const mouse = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dots.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (dots.current.length > 40) dots.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.current = dots.current
        .map(d => ({ ...d, alpha: d.alpha - 0.03 }))
        .filter(d => d.alpha > 0);

      dots.current.forEach((dot, i) => {
        const size = (i / dots.current.length) * 6 + 1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${dot.alpha * 0.6})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
