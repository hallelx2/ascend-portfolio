'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import ShapeIcon from '@/components/ShapeIcon';

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="work" ref={sectionRef} className="relative w-full py-24 min-h-screen bg-[#030303] z-10 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-serif text-white mb-10">Ecosystems we&apos;ve scaled</h2>
        
        <div className="grid grid-cols-3 grid-rows-3 gap-6 md:gap-8 p-4 md:p-12 z-20 w-full max-w-5xl">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative w-full aspect-square bg-[#141414] rounded-3xl flex flex-col items-center justify-center text-white p-4 text-center border border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(0,0,0,0.4)] group cursor-pointer hover:bg-[#1a1a1a] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <span className="relative z-10 font-bold text-sm md:text-base transition-transform duration-300 group-hover:-translate-y-4">{project.title}</span>
              <p className="absolute bottom-4 left-4 right-4 text-xs text-[#888] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                {project.description}
              </p>
            </div>
          ))}

          {/* Central hole for the coin target */}
          <div id="projects-coin-target" className="w-full aspect-square flex items-center justify-center relative">
          </div>

          {projects.slice(4).map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index + 4] = el; }}
              className="relative w-full aspect-square bg-[#141414] rounded-3xl flex flex-col items-center justify-center text-white p-4 text-center border border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(0,0,0,0.4)] group cursor-pointer hover:bg-[#1a1a1a] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <span className="relative z-10 font-bold text-sm md:text-base transition-transform duration-300 group-hover:-translate-y-4">{project.title}</span>
              <p className="absolute bottom-4 left-4 right-4 text-xs text-[#888] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                {project.description}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
}
