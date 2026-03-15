'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });

  // Move left to right
  const x1 = useTransform(smoothProgress, [0, 1], [0, -1000]);
  // Move right to left
  const x2 = useTransform(smoothProgress, [0, 1], [-1000, 0]);

  return (
    <section ref={containerRef} className="relative w-full py-24 bg-[#030303] overflow-hidden flex flex-col gap-8 z-10 border-y border-white/5">
      
      {/* Top row */}
      <motion.div 
        style={{ x: x1 }}
        className="flex whitespace-nowrap"
      >
        <div className="flex gap-12 items-center px-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 uppercase tracking-tighter">
                Ecosystem Scaling
              </span>
              <div className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 uppercase tracking-tighter">
                Web3 Growth
              </span>
              <div className="w-4 h-4 rounded-full bg-purple-500" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom row */}
      <motion.div 
        style={{ x: x2 }}
        className="flex whitespace-nowrap"
      >
        <div className="flex gap-12 items-center px-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white uppercase tracking-tighter">
                Brand Identity
              </span>
              <div className="w-4 h-4 rounded-full bg-cyan-500" />
              <span className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white uppercase tracking-tighter">
                Tokenomics
              </span>
              <div className="w-4 h-4 rounded-full bg-rose-500" />
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
