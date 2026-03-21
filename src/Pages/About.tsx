import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import portfolioData from '../data/portfolioData.json';
import skillsData from '../data/skillsData.json';

export default function About() {
  const { about } = portfolioData;
  const skills = skillsData;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-elem',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full" ref={sectionRef}>
      <div className="about-elem mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4 text-gray-300">About Me</h2>
        <div className="h-1 w-20 bg-green-500 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="about-elem prose prose-invert prose-lg text-gray-400">
          {(Array.isArray(about.background) ? about.background : [about.background]).map((paragraph, idx) => (
            <p key={idx} className={`${idx !== 0 ? 'mt-4' : ''} leading-relaxed text-justify sm:text-left`}>
              {paragraph}
            </p>
          ))}
          <div className="mt-8 glass p-6 rounded-2xl border-l-4 border-l-green-500 text-gray-200">
            "My focus is on bringing ideas to life in the browser, ensuring clean code, beautiful designs, and accessible interfaces."
          </div>
        </div>

        <div className="about-elem space-y-8">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <i className="fa-solid fa-terminal text-green-500 text-2xl" />
            Technical Arsenal
          </h3>
          <div className="space-y-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="glass p-5 rounded-xl transition-all hover:bg-white/5">
                <h4 className="text-lg font-medium text-gray-200 mb-3 flex items-center gap-2">
                  {skillGroup.category === 'Development' && <i className="fa-solid fa-code text-green-400 text-lg" />}
                  {skillGroup.category === 'Designing' && <i className="fa-solid fa-palette text-green-400 text-lg" />}
                  {skillGroup.category === 'AI Workflows' && <i className="fa-solid fa-robot text-green-400 text-lg" />}
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, id) => (
                    <span
                      key={id}
                      className="px-3 py-1 text-sm font-medium rounded-md bg-green-500/10 text-green-400 border border-green-500/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
