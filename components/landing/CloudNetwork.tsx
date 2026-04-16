'use client';

import { useEffect, useRef } from 'react';

/* ─── Nodes config ───────────────────────────────────────────────────────── */
const NODES_CONFIG = [
  /* ── Java ── */
  { label: 'Spring Boot',    color: '#6ee7b7' },
  { label: 'Microservices',  color: '#fb923c' },
  { label: 'Java 21',        color: '#fbbf24' },
  /* ── TIBCO ── */
  { label: 'TIBCO BW',       color: '#c084fc' },
  { label: 'TIBCO EMS',      color: '#a78bfa' },
  { label: 'BWCE',           color: '#d8b4fe' },
  /* ── DevOps ── */
  { label: 'Docker',         color: '#60a5fa' },
  { label: 'Kubernetes',     color: '#34d399' },
  { label: 'Terraform',      color: '#818cf8' },
  { label: 'GitHub Actions', color: '#94a3b8' },
  { label: 'AWS',            color: '#f97316' },
  /* ── Web ── */
  { label: 'Next.js',        color: '#f8fafc' },
  { label: 'FastAPI',        color: '#34d399' },
  { label: 'PostgreSQL',     color: '#38bdf8' },
];

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  label: string;
  color: string;
  r: number;
  phase: number; /* for floating bob */
}

const MAX_DIST   = 160;
const SPEED      = 0.25;
const BOB_AMP    = 6;
const BOB_SPEED  = 0.008;

export default function CloudNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -999, y: -999 });
  const tilt      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let nodes: Node[] = [];
    let tick  = 0;

    /* ── resize ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── init nodes ── */
    const init = () => {
      nodes = NODES_CONFIG.map((cfg) => ({
        ...cfg,
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * SPEED,
        vy:    (Math.random() - 0.5) * SPEED,
        r:     5,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    init();

    /* ── mouse ── */
    const onMove = (e: MouseEvent) => {
      const rect   = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      tilt.current.x  =  (mouse.current.y / canvas.height - 0.5) * 12;
      tilt.current.y  = -(mouse.current.x / canvas.width  - 0.5) * 12;
    };
    const onLeave = () => {
      mouse.current = { x: -999, y: -999 };
      tilt.current  = { x: 0, y: 0 };
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    /* ── draw ── */
    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* update positions */
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy + Math.sin(tick * BOB_SPEED + n.phase) * BOB_AMP * 0.02;
        if (n.x < 30)               { n.x = 30;               n.vx *= -1; }
        if (n.x > canvas.width - 30) { n.x = canvas.width - 30; n.vx *= -1; }
        if (n.y < 30)               { n.y = 30;               n.vy *= -1; }
        if (n.y > canvas.height - 30){ n.y = canvas.height - 30; n.vy *= -1; }
      });

      /* draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a   = nodes[i]!;
          const b   = nodes[j]!;
          const dx  = a.x - b.x;
          const dy  = a.y - b.y;
          const d   = Math.sqrt(dx * dx + dy * dy);
          if (d > MAX_DIST) continue;

          const alpha = (1 - d / MAX_DIST) * 0.45;
          const grad  = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, a.color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
          grad.addColorStop(1, b.color + Math.round(alpha * 255).toString(16).padStart(2, '0'));

          ctx.save();
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* draw nodes */
      nodes.forEach((n) => {
        const bob = Math.sin(tick * BOB_SPEED + n.phase) * BOB_AMP;
        const ny  = n.y + bob;

        /* mouse repulsion */
        const mdx  = n.x - mouse.current.x;
        const mdy  = ny  - mouse.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const repulse = mdist < 90 ? (1 - mdist / 90) * 8 : 0;
        const rx = repulse * (mdx / (mdist || 1));
        const ry = repulse * (mdy / (mdist || 1));

        const px = n.x + rx;
        const py = ny  + ry;

        /* outer glow */
        const glow = ctx.createRadialGradient(px, py, 0, px, py, n.r * 4);
        glow.addColorStop(0, n.color + '55');
        glow.addColorStop(1, n.color + '00');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        /* node circle */
        ctx.save();
        ctx.shadowBlur  = 10;
        ctx.shadowColor = n.color;
        ctx.fillStyle   = n.color;
        ctx.beginPath();
        ctx.arc(px, py, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* label */
        ctx.font        = '10px ui-monospace, monospace';
        ctx.textAlign   = 'center';
        ctx.fillStyle   = 'rgba(148,163,184,0.75)';
        ctx.fillText(n.label, px, py + n.r + 13);
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* CSS 3-D tilt driven by mouse */
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    const tx =  ((e.clientY - r.top)  / r.height - 0.5) * 12;
    const ty = -((e.clientX - r.left) / r.width  - 0.5) * 12;
    e.currentTarget.style.transform = `perspective(600px) rotateX(${tx}deg) rotateY(${ty}deg)`;
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.25s ease-out' }}
      className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
