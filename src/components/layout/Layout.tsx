import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';

import MovingGrid from '../ui/MovingGrid.tsx';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full overflow-x-hidden origin-top cursor-default">
      {/* Background gradients for Tailwind aesthetic */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MovingGrid />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/10 blur-[120px]" />
      </div>

      <Navbar />
      <main className="flex-grow w-full flex flex-col z-10">
        <Outlet />
      </main>
    </div>
  );
}
