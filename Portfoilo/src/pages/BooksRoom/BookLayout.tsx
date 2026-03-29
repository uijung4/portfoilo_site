import React, { useEffect, useRef } from 'react';
import { ReactTinyLink } from 'react-tiny-link';
import BackButton from '../../components/atoms/BackButton';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const CANVA_URL =
  'https://www.canva.com/design/DAGlsWAHUvQ/OpICcDpOy7O92I6XObYmmA/edit?utm_content=DAGlsWAHUvQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';

const NetWork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: Point[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // 연결선 그리기
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.35)';
      ctx.lineWidth = 1;
      points.forEach((p, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // 노드 그리기
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      <BackButton />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-5xl font-bold tracking-widest text-[#222] m-0">
          노트 (작성 중...)
        </h1>
        <div className="w-[420px] shadow-md rounded-lg overflow-hidden">
          <ReactTinyLink
            cardSize="large"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={CANVA_URL}
            proxyUrl="https://cors-anywhere.herokuapp.com"
          />
        </div>
        <p className="text-[#999] text-sm">코딩 노트 작성하려 했으나 지식 부족 및 능력 부족으로 인한 지연..</p>
      </div>
    </div>
  );
};

export default NetWork;