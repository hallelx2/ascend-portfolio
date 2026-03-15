'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { audio } from '@/lib/audioManager';
import Magnetic from './Magnetic';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Header() {
  const [isMuted, setIsMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const handleInteraction = () => {
      audio.init();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      audio.init();
      audio.playClang(0);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-50 px-6 md:px-12 py-4 md:py-6 flex items-center justify-between transition-all duration-500 rounded-full ${
        scrolled ? 'bg-[#030303]/80 backdrop-blur-xl border border-white/10 shadow-2xl py-4' : 'mix-blend-difference'
      }`}
    >
      <div className="text-3xl font-serif font-bold tracking-tighter text-white">
        Ascend.
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.1em] font-bold text-[#A0A0A0]">
        <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
        <a href="#work" className="hover:text-purple-400 transition-colors">Clients</a>
        <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
      </nav>

      <div className="flex items-center gap-4">
        <Magnetic>
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#A0A0A0] hover:text-white"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </Magnetic>
        <Magnetic>
          <a 
            id="navbar-get-in-touch-target"
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all duration-300"
          >
            Get in Touch
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}
