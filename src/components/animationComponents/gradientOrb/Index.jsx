import { useRef, useEffect } from 'react';

function GradientOrb() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.35, y: 0.35, radius: 0.25, speedX: 0.3, speedY: 0.4, color1: '#ff6b35', color2: '#ff1a1a' },
      { x: 0.65, y: 0.65, radius: 0.2, speedX: -0.4, speedY: 0.3, color1: '#7b2ff7', color2: '#2196f3' },
      { x: 0.5, y: 0.3, radius: 0.18, speedX: 0.25, speedY: -0.35, color1: '#00c9a7', color2: '#845ec2' },
    ];

    const animate = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      orbs.forEach((orb) => {
        const cx = w * (orb.x + Math.sin(time * orb.speedX) * 0.15);
        const cy = h * (orb.y + Math.cos(time * orb.speedY) * 0.15);
        const r = Math.min(w, h) * orb.radius;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, orb.color1 + '66');
        gradient.addColorStop(0.5, orb.color2 + '33');
        gradient.addColorStop(1, 'transparent');

        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      time += 0.008;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.7,
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }}
    />
  );
}

export default GradientOrb;
