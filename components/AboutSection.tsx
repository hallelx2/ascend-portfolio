'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { audio } from '@/lib/audioManager';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      onEnter: () => {
        audio.playSwoosh(0);
      },
      onEnterBack: () => {
        audio.playSwoosh(0);
      }
    });
    
    return () => st.kill();
  }, []);

  const text = "The Web3 space is noisy. We cut through the static with narrative-driven marketing, turning passive holders into cult-like communities. We don't just launch tokens; we build movements.";
  const words = text.split(" ");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen w-full flex items-center px-6 md:px-24 py-16 md:py-32 z-10 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 40%)`,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col justify-center space-y-6 md:space-y-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-purple-400"></span>
            THE PROBLEM & SOLUTION
          </motion.h2>
          
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.02 } },
              hidden: {}
            }}
            className="text-2xl md:text-5xl font-serif leading-[1.2] md:leading-[1.3] tracking-tight text-white/90 flex flex-wrap gap-x-2 gap-y-2 pb-4"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>
        
        {/* Right side for the 3D coin to sit */}
        <div className="hidden md:flex items-center justify-center relative">
          <div id="about-coin-target" className="w-[300px] h-[300px]"></div>
        </div>
      </div>
    </section>
  );
}
