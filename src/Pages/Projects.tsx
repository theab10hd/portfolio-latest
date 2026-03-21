import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projectsData.json';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projects = projectsData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full" ref={containerRef}>
      <div className="project-anim mb-16 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4 text-gray-300">Some Things I've Built</h2>
        <div className="h-1 w-24 bg-green-500 rounded mx-auto md:mx-0" />
      </div>

      <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="project-anim group flex flex-col glass rounded-2xl overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-all duration-300 w-full"
          >
            <div className="relative h-56 md:h-64 overflow-hidden bg-gray-900/50">
              <div className="absolute inset-0 bg-green-500/20 group-hover:bg-transparent transition-all z-10 duration-500 mix-blend-overlay" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="p-6 grow flex flex-col justify-between z-20 bg-gray-900/80 backdrop-blur-xl border-t border-white/5">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex space-x-3">
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                      <i className="fa-brands fa-github text-xl" />
                    </a>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                      <i className="fa-solid fa-arrow-up-right-from-square text-lg" />
                    </a>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono tracking-wide text-green-400 px-2 py-1 bg-green-500/10 rounded-md border border-green-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
