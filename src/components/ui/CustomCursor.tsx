import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Lock initial cursor positioning statically off-screen to avoid ghosting before mouse tracking initiates
    gsap.set([cursor, follower], {
      x: -100,
      y: -100,
      opacity: 0,
    });

    // Use GSAP's highly optimized quickTo method for tracking cursor coordinates
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0, ease: "power3" });
    
    // Slower tracked follower
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

    let isVisible = false;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    // Animate cursor when hovering over links or buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find closest structural interactive tags
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        gsap.to(follower, { 
          scale: 1.8, 
          borderColor: '#079905', 
          backgroundColor: 'rgba(7, 153, 5, 0.1)', 
          duration: 0.3 
        });
        gsap.to(cursor, { scale: 0, duration: 0.3 });
      }
    };

    const handleMouseOut = () => {
      gsap.to(follower, { 
        scale: 1, 
        borderColor: 'rgba(7, 153, 5, 0.4)', 
        backgroundColor: 'transparent', 
        duration: 0.3 
      });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    const hideCursor = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-green-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-green-500/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden lg:block transition-colors duration-200"
        style={{ willChange: 'transform, border-color' }}
      />
    </>
  );
}
