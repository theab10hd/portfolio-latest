import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experienceData from '../data/experienceData.json';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const experience = experienceData;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      const items = gsap.utils.toArray('.timeline-item');

      // Ignite the top item immediately upon page mount
      if (items.length > 0) {
        gsap.fromTo(
          items[0] as HTMLElement,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
      }

      // Reserve isolated scroll triggers purely for chronological elements strictly out of view
      items.slice(1).forEach((item: any) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full" ref={sectionRef}>
      <div className="exp-title mb-16 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4 text-gray-300">
          Where I've Worked
        </h2>
        <div className="h-1 w-24 bg-green-500 rounded mx-auto md:mx-0" />
      </div>

      <div className="timeline-container relative wrap overflow-hidden p-4 h-full">
        {/* Vertical line through timeline */}
        <div className="absolute w-px bg-linear-to-b to-transparent from-gray-100 h-full left-8 md:left-1/2 md:-translate-x-1/2" />

        {experience.map((job, index) => {
          const isPresent = job.period.toLowerCase().includes('present');

          return (
            <div
              key={job.id}
              className={`timeline-item mb-12 flex justify-between items-center w-full right-timeline opacity-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
            >
              {/* Empty space for alternating layout */}
              <div className="order-1 hidden md:block w-5/12" />

              {/* Timeline dot */}
              <div className="z-20 relative flex items-center justify-center order-1 w-6 h-6 ml-5 md:ml-0">
                {isPresent && (
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                )}
                <div className={`relative z-10 w-full h-full rounded-full border-4 border-black box-content ${isPresent ? 'bg-green-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-green-500 shadow-xl'}`} />
              </div>

              <div className={`order-1 glass rounded-2xl w-full md:w-5/12 ml-4 md:ml-0 px-6 py-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${isPresent
                ? 'border-green-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-linear-to-br from-green-500/5 to-transparent'
                : 'hover:border-green-500/30 shadow-xl'
                }`}>
                {isPresent && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-green-500 text-black text-[10px] font-extrabold rounded-bl-xl tracking-widest uppercase shadow-md">
                    Current
                  </div>
                )}

                <h3 className={`font-bold text-gray-100 text-xl tracking-tight ${isPresent ? 'text-green-400' : 'text-gradient-green'} pr-16`}>
                  {job.role}
                </h3>

                <div className="flex justify-between items-center mt-1 mb-4 border-b border-white/5 pb-3">
                  <span className="text-sm font-semibold text-gray-300">{job.company}</span>
                  <span className="text-xs font-mono px-2 py-1 rounded text-green-400 bg-green-500/10">
                    {job.period}
                  </span>
                </div>

                <p className="text-sm leading-snug tracking-wide text-gray-400 text-opacity-100">
                  {job.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
