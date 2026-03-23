import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';

import MovingGrid from '../ui/MovingGrid.tsx';
import AnimatedCursor from 'react-animated-cursor';
export default function Layout() {
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCursorSupport = () => setShowCustomCursor(mediaQuery.matches);

    updateCursorSupport();
    mediaQuery.addEventListener('change', updateCursorSupport);

    return () => {
      mediaQuery.removeEventListener('change', updateCursorSupport);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center w-full overflow-x-hidden origin-top ${showCustomCursor ? 'cursor-none' : ''}`}>
      {/* Background gradients for Tailwind aesthetic */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MovingGrid />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/10 blur-[120px]" />
      </div>

      <Navbar />
      {showCustomCursor && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={2}
          outerScale={2}
          outerAlpha={0}
          innerStyle={{
            border: '1px solid rgba(6, 146, 62, 1)',
            backgroundColor: '#06923e'
          }}
          outerStyle={{
            border: '1px solid rgba(6, 146, 62, 1)',
            backgroundColor: 'transparent'
          }}
          clickables={[
            'a',
            'button',
            '.link',
            'input',
            'textarea'
          ]}
        />
      )}

      <main className="grow w-full flex flex-col z-10">
        <Outlet />
      </main>
    </div>
  );
}
