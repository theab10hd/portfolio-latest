import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import portfolioData from '../../data/portfolioData.json';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { personal } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 border-b  ${scrolled
        ? ' backdrop-blur-md  shadow-lg  border-white/10'
        : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-gray-50 hover:text-green-400 transition-colors">
            AbhijithGaganan<span className="text-green-500">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-green-400 ${isActive ? 'text-green-500' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex items-center space-x-5 border-l border-white/10 pl-8">
              <a href={personal.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <i className="fa-brands fa-github text-xl" />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <i className="fa-brands fa-linkedin text-xl" />
              </a>
              <a href={`mailto:${personal.email}`} className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">Email</span>
                <i className="fa-solid fa-envelope text-xl" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <i className="fa-solid fa-xmark text-2xl" /> : <i className="fa-solid fa-bars text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full h-screen bg-black/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden transform transition-all duration-500 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
      >
        <div className={`flex flex-col items-center justify-start pt-32 h-full space-y-12 pb-32 transform transition-all duration-700 delay-100 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-4xl font-black tracking-tighter transition-colors ${isActive
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex space-x-8 pt-8 border-t border-white/10 w-32 justify-center">
            <a href={personal.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
              <span className="sr-only">GitHub</span>
              <i className="fa-brands fa-github text-3xl" />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <i className="fa-brands fa-linkedin text-3xl" />
            </a>
            <a href={`mailto:${personal.email}`} className="text-gray-400 hover:text-green-400 transition-colors">
              <span className="sr-only">Email</span>
              <i className="fa-solid fa-envelope text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
