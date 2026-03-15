'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { id: 1, title: 'animoca BRANDS', description: 'Scaled their ecosystem through advanced tokenomics and targeted growth strategies.', shape: 'Icosahedron', color: '#3b82f6' },
  { id: 2, title: 'Immutable', description: 'Drove platform adoption through developer relations and cohesive brand identity.', shape: 'Octahedron', color: '#10b981' },
  { id: 3, title: 'SANDBOX', description: 'Built a thriving community via metaverse integrations and strategic partnerships.', shape: 'Dodecahedron', color: '#f59e0b' },
  { id: 4, title: 'Seedify', description: 'Empowered innovators through launchpad strategy, IDO marketing, and user acquisition.', shape: 'Tetrahedron', color: '#8b5cf6' },
  { id: 5, title: 'MONAD', description: 'Crafted their L1 narrative, streamlined developer onboarding, and managed technical PR.', shape: 'TorusKnot', color: '#ec4899' },
  { id: 6, title: 'BLUR', description: 'Executed their marketplace launch, designed airdrop mechanics, and acquired pro traders.', shape: 'Sphere', color: '#f97316' },
  { id: 7, title: 'POLYGON', description: 'Positioned their Layer 2 solution for enterprise adoption and managed their ecosystem fund.', shape: 'Icosahedron', color: '#8b5cf6' },
  { id: 8, title: 'SOLANA', description: 'Managed network resilience PR, scaled global hackathons, and spearheaded their DeFi revival.', shape: 'Octahedron', color: '#14b8a6' },
];

function ProjectIcon({ shape, color }: { shape: string, color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className="w-full h-full pointer-events-none">
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          {shape === 'Icosahedron' && <icosahedronGeometry args={[1, 0]} />}
          {shape === 'Octahedron' && <octahedronGeometry args={[1, 0]} />}
          {shape === 'Dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
          {shape === 'Tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
          {shape === 'TorusKnot' && <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />}
          {shape === 'Sphere' && <sphereGeometry args={[1, 32, 32]} />}
          <meshPhysicalMaterial 
            color={color}
            metalness={0.6}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.4}
            thickness={0.5}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}

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
              className="relative w-full aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center border-t border-l border-white/10 border-b border-r border-black/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_15px_30px_rgba(16,185,129,0.15)] group cursor-pointer transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* 3D Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-10 transition-all duration-700 scale-75 group-hover:scale-50">
                <ProjectIcon shape={project.shape} color={project.color} />
              </div>

              <span className="relative z-10 font-bold text-lg md:text-xl tracking-wide transition-transform duration-500 group-hover:-translate-y-12 drop-shadow-md">{project.title}</span>
              
              <div className="absolute bottom-8 left-6 right-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                <p className="text-sm text-[#A0A0A0] leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>
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
              className="relative w-full aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center border-t border-l border-white/10 border-b border-r border-black/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_15px_30px_rgba(16,185,129,0.15)] group cursor-pointer transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* 3D Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-10 transition-all duration-700 scale-75 group-hover:scale-50">
                <ProjectIcon shape={project.shape} color={project.color} />
              </div>

              <span className="relative z-10 font-bold text-lg md:text-xl tracking-wide transition-transform duration-500 group-hover:-translate-y-12 drop-shadow-md">{project.title}</span>
              
              <div className="absolute bottom-8 left-6 right-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                <p className="text-sm text-[#A0A0A0] leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
