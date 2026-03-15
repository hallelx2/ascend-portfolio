'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { audio } from '@/lib/audioManager';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Magnetic from '@/components/Magnetic';

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
    <footer ref={footerRef} className="relative w-full bg-[#030303] text-white pt-32 pb-8 px-6 md:px-12 overflow-hidden border-t border-white/5 z-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.05)_0%,transparent_50%)] z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: CTA and Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-32">
          
          {/* CTA Area */}
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tighter mb-8"
            >
              Ready to ascend <br />
              <span className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent box-decoration-clone pr-2 pb-2 pl-1">beyond the noise?</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Magnetic strength={0.2}>
                <a 
                  href="#contact-form"
                  className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all duration-300"
                >
                  Start Your Campaign
                  <span className="bg-black text-white rounded-full p-1.5 group-hover:-rotate-45 transition-transform duration-300">
                    <ArrowRight size={16} />
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#666] font-bold">Navigation</span>
              <div className="flex flex-col gap-4 text-sm text-[#A0A0A0]">
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
                <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#work" className="hover:text-white transition-colors">Clients</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#666] font-bold">Socials</span>
              <div className="flex flex-col gap-4 text-sm text-[#A0A0A0]">
                <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
                <a href="#" className="hover:text-white transition-colors">Discord</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>

            <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
              <span className="text-xs uppercase tracking-[0.2em] text-[#666] font-bold">Contact</span>
              <div className="flex flex-col gap-4 text-sm text-[#A0A0A0]">
                <a href="mailto:contact@ascendmarketing.xyz" className="hover:text-white transition-colors">
                  contact@ascendmarketing.xyz
                </a>
                <p className="mt-4 text-[#666] leading-relaxed">
                  Based in the Metaverse.<br />
                  Operating globally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Typography */}
        <div className="w-full overflow-hidden flex items-center justify-center border-t border-white/10 pt-12 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[15vw] leading-none font-serif font-bold tracking-tighter text-white/5 select-none"
          >
            ASCEND.
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-[#666] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>All systems operational</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full">
            <span className="text-[#A0A0A0]">Created by</span>
            <span className="font-mono text-white lowercase tracking-normal">hallel</span>
            <span className="font-['var(--font-orbitron)'] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-sm tracking-normal">X2</span>
          </div>
          <div className="flex gap-8">
            <span>© {new Date().getFullYear()} Ascend Marketing</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
