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
  { id: 1, title: 'animoca BRANDS', shape: 'Icosahedron' },
  { id: 2, title: 'Immutable', shape: 'Octahedron' },
  { id: 3, title: 'SANDBOX', shape: 'Dodecahedron' },
  { id: 4, title: 'Seedify', shape: 'Tetrahedron' },
  { id: 5, title: 'MONAD', shape: 'TorusKnot' },
  { id: 6, title: 'BLUR', shape: 'Sphere' },
  { id: 7, title: 'POLYGON', shape: 'Icosahedron' },
  { id: 8, title: 'SOLANA', shape: 'Octahedron' },
];

export default function RadioDialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="work" ref={sectionRef} className="relative w-full h-[300vh] bg-[#030303] z-10">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        <h2 className="text-4xl font-serif text-white mb-10">Ecosystems we&apos;ve scaled</h2>
        
        <div className="grid grid-cols-3 grid-rows-3 gap-8 p-12 z-20">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-48 h-48 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center text-white text-xs font-bold p-2 text-center border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.15)] group cursor-pointer"
            >
              <span className="transition-opacity duration-300">{project.title}</span>
            </div>
          ))}

          {/* Central hole for the coin with radio dial */}
          <div id="projects-coin-target" className="flex items-center justify-center relative">
            {/* Scaled-down Radio Dial */}
            <div className="absolute w-40 h-40 rounded-full border-4 border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_0_20px_rgba(255,255,255,0.05)]">
              <div className="w-full h-full rounded-full border-2 border-white/5"></div>
            </div>
            {/* Coin */}
            <div className="z-10 w-24 h-24 flex items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-emerald-500 shadow-inner"></div>
            </div>
          </div>

          {projects.slice(4).map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index + 4] = el; }}
              className="w-48 h-48 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center text-white text-xs font-bold p-2 text-center border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.15)] group cursor-pointer"
            >
              <span className="transition-opacity duration-300">{project.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
