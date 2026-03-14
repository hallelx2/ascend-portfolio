'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { audio } from '@/lib/audioManager';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    
    const st = ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 80%',
      onEnter: () => {
        audio.playSwoosh(0);
      }
    });
    
    return () => st.kill();
  }, []);

  return (
    <footer ref={footerRef} className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-6 z-10 overflow-hidden bg-[#0a0515]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1)_0%,transparent_70%)] z-0" />
      
      <div className="relative z-10 text-center flex flex-col items-center mt-20">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[8rem] font-serif font-medium leading-[1] tracking-tighter mb-12"
        >
          Let&apos;s make <br />
          <span className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">some noise.</span>
        </motion.h2>
        
        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          href="#contact-form"
          className="group relative flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black text-lg font-bold hover:scale-105 transition-all duration-300"
        >
          <div className="absolute inset-0 rounded-full bg-white blur-md opacity-50 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 -z-10" />
          Start Your Campaign
          <span className="bg-black text-white rounded-full p-2 group-hover:-rotate-45 transition-transform duration-300">
            <ArrowRight size={18} />
          </span>
        </motion.a>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-32 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end z-10 border-t border-white/10">
        <div className="mb-8 md:mb-0 w-full md:w-auto">
          <div className="text-3xl font-serif font-bold tracking-tighter mb-4 text-white">
            Ascend.
          </div>
          <p className="text-sm font-sans text-[#A0A0A0] max-w-sm mb-1">
            Your community is waiting.
          </p>
          <a href="mailto:contact@ascendmarketing.xyz" className="text-sm font-sans text-purple-400 hover:text-white transition-colors">
            contact@ascendmarketing.xyz
          </a>
        </div>
        
        <div className="flex flex-row md:flex-col justify-between md:items-end w-full md:w-auto gap-8 md:gap-2 text-xs uppercase tracking-[0.1em] text-[#A0A0A0]">
          <div className="flex flex-col gap-2">
            <span className="text-white mb-2 font-bold">Discover</span>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#work" className="hover:text-purple-400 transition-colors">Clients</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white mb-2 font-bold">Socials</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Discord</a>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-6 text-xs text-[#555] z-10 flex justify-between">
        <span>© 2026 Ascend Marketing. All rights reserved.</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
}
