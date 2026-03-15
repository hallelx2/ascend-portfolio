'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { audio } from '@/lib/audioManager';
import Magnetic from './Magnetic';

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
            <div className="overflow-hidden pb-4 md:pb-6">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                Time to
              </motion.span>
            </div>
            <div className="overflow-hidden py-4 md:py-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 -my-4 md:-my-6">
              <motion.span 
                initial={{ y: "120%" }}
                animate={{ y: 0, backgroundPosition: ["0% center", "-200% center"] }}
                transition={{ 
                  y: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                style={{ backgroundSize: "200% auto" }}
                className="block italic bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent box-decoration-clone pr-4 md:pr-6 pb-2 pl-1"
              >
                Ascend
              </motion.span>
              {/* Spacer for the 3D coin to sit in the center of the text */}
              <div id="hero-coin-target" className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] shrink-0 flex items-center justify-center"></div>
              <motion.span 
                initial={{ y: "120%" }}
                animate={{ y: 0, backgroundPosition: ["0% center", "-200% center"] }}
                transition={{ 
                  y: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                style={{ backgroundSize: "200% auto" }}
                className="block italic bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent box-decoration-clone pr-4 md:pr-6 pb-2 pl-1"
              >
                beyond
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4 md:pb-6">
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
            className="mt-12 flex flex-col sm:flex-row items-center gap-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-300 animate-pulse"></div>
              <Magnetic>
                <a href="#contact-form" className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-100 transition-all duration-300 group/btn">
                  Start Building 
                  <span className="bg-black text-white rounded-full p-1 transform transition-transform duration-500 group-hover/btn:-rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowRight size={14} />
                  </span>
                </a>
              </Magnetic>
            </div>
            
            <Magnetic>
              <a href="#philosophy" className="relative text-white text-sm font-medium hover:text-purple-300 transition-colors group/link py-2">
                Discover Our Philosophy
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-purple-400 transform origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
              </a>
            </Magnetic>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-6 md:left-12 text-xs uppercase tracking-[0.1em] text-[#A0A0A0]"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll to elevate
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
