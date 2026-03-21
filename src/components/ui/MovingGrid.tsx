import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import floatingTechData from '../../data/floatingTechData.json';

type FloatingTech = {
  name: string;
  icon: string;
  top: string;
  left: string;
  iconSize: number;
  opacity: number;
};

export default function MovingGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingTech = floatingTechData as FloatingTech[];
  const [gridMetrics, setGridMetrics] = useState({ cols: 1, rows: 1 });
  const [isMdUp, setIsMdUp] = useState(() => window.matchMedia('(min-width: 768px)').matches);

  const size = 40;
  const usedCells = new Set<string>();
  const visibleTech = isMdUp ? floatingTech : floatingTech.slice(0, 4);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMdUp(event.matches);
    };

    setIsMdUp(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !rootRef.current) return;

    const updateGridMetrics = () => {
      if (!rootRef.current) return;

      const cols = Math.max(1, Math.floor(rootRef.current.clientWidth / size));
      const rows = Math.max(1, Math.floor(rootRef.current.clientHeight / size));
      setGridMetrics({ cols, rows });
    };

    updateGridMetrics();
    const resizeObserver = new ResizeObserver(updateGridMetrics);
    resizeObserver.observe(rootRef.current);

    // Spawn random horizontal and vertical dynamic tracers
    const createTracer = () => {
      if (!containerRef.current) return;

      const isHorizontal = Math.random() > 0.5;
      const maxSlots = 100;
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

    const techIcons = gsap.utils.toArray<HTMLElement>('.grid-tech-glow');
    let lastIndex = -1;
    let nextGlow: gsap.core.Tween | null = null;

    const runRandomGlow = () => {
      if (!techIcons.length) {
        return;
      }

      let nextIndex = Math.floor(Math.random() * techIcons.length);
      if (techIcons.length > 1 && nextIndex === lastIndex) {
        nextIndex = (nextIndex + 1) % techIcons.length;
      }

      lastIndex = nextIndex;
      const target = techIcons[nextIndex];

      gsap.fromTo(
        target,
        {
          opacity: Number(target.dataset.baseOpacity ?? 0.2),
          filter: 'drop-shadow(0 0 0 rgba(10,194,8,0))',
        },
        {
          opacity: 1,
          filter: 'drop-shadow(0 0 14px rgba(10,194,8,0.85))',
          duration: 1,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
          onComplete: () => {
            nextGlow = gsap.delayedCall(gsap.utils.random(3.5, 5), runRandomGlow);
          },
        }
      );
    };

    // Softly spawn a new subtle tracer every 300ms
    const interval = setInterval(createTracer, 300);
    runRandomGlow();

    return () => {
      clearInterval(interval);
      nextGlow?.kill();
      resizeObserver.disconnect();
    };
  }, [isMdUp]);

  return (
    <div
      ref={rootRef}
      className="absolute inset-[0_-10vw_-10vh_0] overflow-hidden opacity-75 pointer-events-none"
      style={{
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
      }}
    >
      {/* Underlying Static Grid Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#07990533_1px,transparent_1px),linear-gradient(to_bottom,#07990533_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Tech icons mapped onto the grid background */}
      <div className="absolute inset-0 z-20">
        {visibleTech.map((tech) => {
          const leftPercent = Number.parseFloat(tech.left);
          const topPercent = Number.parseFloat(tech.top);
          let col = Math.min(
            gridMetrics.cols - 1,
            Math.max(0, Math.round((leftPercent / 100) * (gridMetrics.cols - 1)))
          );
          let row = Math.min(
            gridMetrics.rows - 1,
            Math.max(0, Math.round((topPercent / 100) * (gridMetrics.rows - 1)))
          );

          // Keep all icons visible by finding the next free grid cell if a collision happens.
          let key = `${row}-${col}`;
          let guard = 0;
          while (usedCells.has(key) && guard < gridMetrics.cols * gridMetrics.rows) {
            col = (col + 1) % gridMetrics.cols;
            if (col === 0) {
              row = (row + 1) % gridMetrics.rows;
            }
            key = `${row}-${col}`;
            guard += 1;
          }
          usedCells.add(key);

          const fittedSize = Math.max(20, Math.min(30, Math.round(tech.iconSize * 0.75)));
          const snappedLeft = `${col * size + size / 2}px`;
          const snappedTop = `${row * size + size / 2}px`;
          const baseOpacity = Math.max(0.5, tech.opacity);

          return (
            <div
              key={tech.name}
              className="grid-tech-glow absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              data-base-opacity={baseOpacity}
              style={{ top: snappedTop, left: snappedLeft, opacity: baseOpacity }}
            >
              <i className={tech.icon} style={{ fontSize: `${fittedSize}px`, lineHeight: 1, color: 'rgb(10 194 8 / 0.85)' }} />
            </div>
          );
        })}
      </div>

      {/* GSAP Laser Tracers Container */}
      <div ref={containerRef} className="absolute inset-0 z-10" />
    </div>
  );
}
