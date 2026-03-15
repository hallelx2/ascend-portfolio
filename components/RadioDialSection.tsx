'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { id: 1, title: 'animoca BRANDS', description: 'Advancing digital property rights for gaming and the open metaverse.', shape: 'Icosahedron' },
  { id: 2, title: 'Immutable', description: 'The leading web3 gaming platform, making building web3 games easy.', shape: 'Octahedron' },
  { id: 3, title: 'SANDBOX', description: 'A decentralized gaming virtual world driven by the community.', shape: 'Dodecahedron' },
  { id: 4, title: 'Seedify', description: 'Web3 gaming incubator and launchpad empowering innovators.', shape: 'Tetrahedron' },
  { id: 5, title: 'MONAD', description: 'High-performance Ethereum-compatible L1 blockchain.', shape: 'TorusKnot' },
  { id: 6, title: 'BLUR', description: 'The NFT marketplace for pro traders with sweeping features.', shape: 'Sphere' },
  { id: 7, title: 'POLYGON', description: 'Ethereum scaling platform for fast and secure transactions.', shape: 'Icosahedron' },
  { id: 8, title: 'SOLANA', description: 'Highly scalable, fast, and secure blockchain for decentralized apps.', shape: 'Octahedron' },
];

export default function RadioDialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" ref={sectionRef} className="relative w-full py-24 min-h-screen bg-[#030303] z-10 flex flex-col items-center justify-center overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-white mb-16 text-center"
        >
          Ecosystems we&apos;ve scaled
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-4 md:grid-rows-3 gap-4 md:gap-8 p-4 md:p-12 z-20 w-full max-w-5xl relative">
          
          {/* Background ambient glow for the whole section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-full aspect-square bg-[#0a0a0a] rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center border border-white/5 hover:border-emerald-500/30 shadow-lg group cursor-pointer transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              
              <span className="relative z-10 font-bold text-sm md:text-lg tracking-wide transition-transform duration-500 group-hover:-translate-y-6">{project.title}</span>
              <p className="absolute bottom-6 left-6 right-6 text-xs md:text-sm text-[#888] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}

          {/* Central hole for the coin target */}
          <div id="projects-coin-target" className="w-full aspect-square flex items-center justify-center relative hidden md:flex">
            {/* Intense central halo for the coin */}
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none animate-pulse"></div>
          </div>

          {projects.slice(4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
              className="relative w-full aspect-square bg-[#0a0a0a] rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center border border-white/5 hover:border-emerald-500/30 shadow-lg group cursor-pointer transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              
              <span className="relative z-10 font-bold text-sm md:text-lg tracking-wide transition-transform duration-500 group-hover:-translate-y-6">{project.title}</span>
              <p className="absolute bottom-6 left-6 right-6 text-xs md:text-sm text-[#888] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
