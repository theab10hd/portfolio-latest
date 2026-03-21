import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MovingGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const size = 40; // matches grid background-size

    // Spawn random horizontal and vertical dynamic tracers
    const createTracer = () => {
      if (!containerRef.current) return;

      const isHorizontal = Math.random() > 0.5;
      const maxSlots = 100; // random rows/columns across page
      const slot = Math.floor(Math.random() * maxSlots) * size;
      const length = 150 + Math.random() * 500; // length of light beam
      const duration = 2 + Math.random() * 10; // speed of light beam

      const tracer = document.createElement('div');

      if (isHorizontal) {
        tracer.className = 'absolute bg-gradient-to-r from-transparent via-green-500 to-transparent z-0';
        tracer.style.height = '1px';
        tracer.style.width = `${length}px`;
        tracer.style.top = `${slot}px`;
        tracer.style.left = `-${length}px`;

        const goRight = Math.random() > 0.5;

        containerRef.current.appendChild(tracer);

        gsap.to(tracer, {
          x: goRight ? window.innerWidth + length * 2 : -(window.innerWidth + length * 2),
          duration,
          ease: 'none',
          onComplete: () => {
            if (tracer.parentNode) tracer.remove();
          }
        });
      } else {
        tracer.className = 'absolute bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-100 z-0';
        tracer.style.width = '1px';
        tracer.style.height = `${length}px`;
        tracer.style.left = `${slot}px`;
        tracer.style.top = `-${length}px`;

        const goDown = Math.random() > 0.5;

        containerRef.current.appendChild(tracer);

        gsap.to(tracer, {
          y: goDown ? window.innerHeight + length * 2 : -(window.innerHeight + length * 2),
          duration,
          ease: 'none',
          onComplete: () => {
            if (tracer.parentNode) tracer.remove();
          }
        });
      }
    };

    // Softly spawn a new subtle tracer every 300ms
    const interval = setInterval(createTracer, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-[0_-10vw_-10vh_0] overflow-hidden opacity-75 pointer-events-none"
      style={{
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
      }}
    >
      {/* Underlying Static Grid Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#07990533_1px,transparent_1px),linear-gradient(to_bottom,#07990533_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* GSAP Laser Tracers Container */}
      <div ref={containerRef} className="absolute inset-0 z-10" />
    </div>
  );
}
