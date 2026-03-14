'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audio } from '@/lib/audioManager';
import { ArrowRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Icosahedron, Octahedron, Dodecahedron, Tetrahedron, TorusKnot, Sphere } from '@react-three/drei';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { id: 1, title: 'animoca BRANDS', span: 'col-span-1 md:col-span-2 row-span-2', bg: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10', shape: 'Icosahedron' },
  { id: 2, title: 'Immutable', span: 'col-span-1 row-span-1', bg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10', shape: 'Octahedron' },
  { id: 3, title: 'SANDBOX', span: 'col-span-1 row-span-2', bg: 'bg-gradient-to-br from-orange-500/10 to-red-500/10', shape: 'Dodecahedron' },
  { id: 4, title: 'Seedify', span: 'col-span-1 row-span-1', bg: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10', shape: 'Tetrahedron' },
  { id: 5, title: 'MONAD', span: 'col-span-1 md:col-span-2 row-span-1', bg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10', shape: 'TorusKnot' },
  { id: 6, title: 'BLUR', span: 'col-span-1 row-span-1', bg: 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10', shape: 'Sphere' },
];

function ShapeIcon({ shape }: { shape: string }) {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const material = <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />;

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      {shape === 'Icosahedron' && <Icosahedron ref={meshRef} args={[1, 0]}>{material}</Icosahedron>}
      {shape === 'Octahedron' && <Octahedron ref={meshRef} args={[1, 0]}>{material}</Octahedron>}
      {shape === 'Dodecahedron' && <Dodecahedron ref={meshRef} args={[1, 0]}>{material}</Dodecahedron>}
      {shape === 'Tetrahedron' && <Tetrahedron ref={meshRef} args={[1, 0]}>{material}</Tetrahedron>}
      {shape === 'TorusKnot' && <TorusKnot ref={meshRef} args={[0.6, 0.2, 64, 16]}>{material}</TorusKnot>}
      {shape === 'Sphere' && <Sphere ref={meshRef} args={[1, 32, 32]}>{material}</Sphere>}
    </Float>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      const rightCol = rightColRef.current!;
      const section = sectionRef.current!;
      
      const scrollDistance = rightCol.offsetHeight - window.innerHeight;

      if (scrollDistance > 0) {
        gsap.to(rightCol, {
          y: -scrollDistance,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance * 1.5}`, // Make scroll slightly longer/smoother
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => audio.playSwoosh(0),
            onEnterBack: () => audio.playSwoosh(0),
          },
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            const pan = index % 2 === 0 ? -0.3 : 0.3; 
            audio.playClang(pan);
            
            gsap.fromTo(card, 
              { scale: 0.9, opacity: 0, y: 50 }, 
              { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
            );
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-transparent z-10">
      <div className="flex flex-col md:flex-row h-full w-full max-w-7xl mx-auto">
        
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 py-12 md:py-0">
          <h2 className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-purple-400"></span>
            THE PROOF
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif leading-[1.1] tracking-tight text-white mb-10">
            Ecosystems <br />
            we&apos;ve scaled.
          </h3>
          <div>
            <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300">
              View All Work
              <span className="bg-black text-white rounded-full p-1">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full relative flex items-center justify-center">
          {/* Target for the 3D coin to sit in the center of the projects section */}
          <div id="projects-coin-target" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] z-0 pointer-events-none flex items-center justify-center"></div>
          
          <div 
            ref={rightColRef} 
            className="absolute top-0 left-0 w-full grid grid-cols-2 md:grid-cols-3 auto-rows-[150px] gap-4 p-6 md:p-12 pb-[50vh] z-10"
          >
            {projects.map((project, index) => (
              <div 
                key={project.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`project-card relative rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/40 transition-all duration-500 overflow-hidden group cursor-pointer ${project.span} ${project.bg} backdrop-blur-md`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                
                {/* 3D Icon Target for each card */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={1} />
                    <ShapeIcon shape={project.shape} />
                  </Canvas>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 z-20 p-4 text-center">
                  <p className="text-xs text-purple-300 mb-2">View Case Study</p>
                  <h4 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide transition-all duration-500 scale-90 group-hover:scale-100">
                    {project.title}
                  </h4>
                </div>

                <h4 className="text-xl md:text-2xl font-serif font-bold text-white/80 group-hover:opacity-0 tracking-wide text-center px-4 transition-all duration-500 z-10">
                  {project.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
