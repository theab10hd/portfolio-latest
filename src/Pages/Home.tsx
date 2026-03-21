import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import portfolioData from '../data/portfolioData.json';

export default function Home() {
  const { personal } = portfolioData;
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-elem',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8 min-h-screen" ref={heroRef}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="hero-elem mb-6 inline-block rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
          Available for freelance work
        </div>

        <h1 className="hero-elem text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-50 leading-[1.1]">
          Hi, I'm {personal.name.split(' ')[0]}.<br /><span className="text-gradient-green"> I build for the web and design a bit too.</span>
        </h1>

        <p className="hero-elem text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {personal.tagline}
        </p>

        <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/projects"
            className="group flex items-center gap-2 rounded-full bg-green-500 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-green-400 hover:scale-105 active:scale-95"
          >
            View My Work
            <i className="fa-solid fa-arrow-right text-lg transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 rounded-full glass px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-file-lines text-lg" />
            More About Me
          </Link>
        </div>
      </div>
    </section>
  );
}
