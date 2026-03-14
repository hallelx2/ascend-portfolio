'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { audio } from '@/lib/audioManager';

export default function HeroSection() {
  useEffect(() => {
    const initAudio = () => {
      audio.init();
      window.removeEventListener('click', initAudio);
    };
    window.addEventListener('click', initAudio);
    return () => window.removeEventListener('click', initAudio);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full p-4 md:p-8 overflow-hidden bg-purple-600">
      <div className="relative w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] bg-[#030303] rounded-[2rem] md:rounded-[3rem] border border-white/10 flex items-center justify-center px-6 md:px-24 overflow-hidden shadow-2xl">
        <div className="max-w-6xl w-full z-10 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-medium leading-[1.1] tracking-tighter flex flex-col items-center">
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                Time to
              </motion.span>
            </div>
            <div className="overflow-hidden pb-2 md:pb-4 flex items-center justify-center gap-4 md:gap-8">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Ascend
              </motion.span>
              {/* Spacer for the 3D coin to sit in the center of the text */}
              <div id="hero-coin-target" className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] shrink-0 flex items-center justify-center"></div>
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                beyond
              </motion.span>
            </div>
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="block"
              >
                the noise.
              </motion.span>
            </div>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <a href="#contact-form" className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300">
              Start Building 
              <span className="bg-black text-white rounded-full p-1">
                <ArrowRight size={14} />
              </span>
            </a>
            <a href="#philosophy" className="text-white text-sm font-medium hover:text-purple-400 transition-colors">
              Discover Our Philosophy
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-6 md:left-12 text-xs uppercase tracking-[0.1em] text-[#A0A0A0]"
          >
            Scroll to elevate
          </motion.div>
        </div>
      </div>
    </section>
  );
}
