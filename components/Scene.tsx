'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows, Torus, Cylinder } from '@react-three/drei';
import { Suspense, useRef, useLayoutEffect, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sections = ['hero', 'philosophy', 'about', 'work', 'contact-form'];
const targets = ['hero-coin-target', 'philosophy-coin-target', 'about-coin-target', 'projects-coin-target', 'contact-coin-target'];
const colors = ['#FFD700', '#a855f7', '#06b6d4', '#10b981', '#f43f5e'];
const scales = [0.4, 1, 1, 0.8, 0.6]; // Hero is smaller, projects is smaller, contact is smaller

function DogeCoin() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const innerMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { camera, size } = useThree();
  
  // Reuse objects to avoid garbage collection
  const vec = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const startPos = useRef(new THREE.Vector3());
  const color = useRef(new THREE.Color());
  const targetColor = useRef(new THREE.Color());
  const scaleVec = useRef(new THREE.Vector3());
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [overrideTarget, setOverrideTarget] = useState<string | null>(null);
  const animProgress = useRef({ value: 0 });

  // Cache DOM elements
  const targetEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const triggers = sections.map((id, index) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    const handleStore = () => {
      setOverrideTarget('navbar-get-in-touch-target');
      if (groupRef.current) {
        startPos.current.copy(groupRef.current.position);
      }
      animProgress.current.value = 0;
      
      gsap.to(animProgress.current, {
        value: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            setOverrideTarget(null);
          }, 3000);
        }
      });
    };

    window.addEventListener('coin-store', handleStore);

    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('coin-store', handleStore);
    };
  }, [camera, size]);

  useFrame((state, delta) => {
    if (!groupRef.current || !materialRef.current || !innerMaterialRef.current) return;

    // 1. Calculate target 3D position
    const targetId = overrideTarget || targets[activeIndex];
    const el = document.getElementById(targetId);

    if (el) {
      const rect = el.getBoundingClientRect();
      
      const x = (rect.left + rect.width / 2) / size.width * 2 - 1;
      const y = -(rect.top + rect.height / 2) / size.height * 2 + 1;

      vec.current.set(x, y, 0.5);
      vec.current.unproject(camera);
      const dir = vec.current.clone().sub(camera.position).normalize();
      
      const distance = (0 - camera.position.z) / dir.z;
      const newPos = camera.position.clone().add(dir.multiplyScalar(distance));

      if (activeIndex === 4 && !overrideTarget) {
        newPos.y += 0.5;
      }

      if (overrideTarget) {
        const p0 = startPos.current;
        const p2 = newPos;
        const p1 = new THREE.Vector3(
          (p0.x + p2.x) / 2,
          Math.max(p0.y, p2.y) + 4,
          (p0.z + p2.z) / 2
        );

        const t = animProgress.current.value;
        const mt = 1 - t;
        
        targetPos.current.set(
          mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
          mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
          mt * mt * p0.z + 2 * mt * t * p1.z + t * t * p2.z
        );
        groupRef.current.position.copy(targetPos.current);
      } else {
        targetPos.current.copy(newPos);
        groupRef.current.position.lerp(targetPos.current, 0.08);
      }
    }

    // 3. Smoothly change color
    targetColor.current.set(overrideTarget ? '#ffffff' : colors[activeIndex]);
    materialRef.current.color.lerp(targetColor.current, 0.05);
    materialRef.current.emissive.lerp(targetColor.current, 0.05);
    innerMaterialRef.current.color.lerp(targetColor.current, 0.05);

    // 4. Smoothly change scale
    const targetScale = overrideTarget ? 0.15 : scales[activeIndex];
    scaleVec.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleVec.current, 0.05);

    // 5. Constant rotation
    groupRef.current.rotation.y += delta * (overrideTarget ? 8 : 1.5);
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Coin Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.15, 64]} />
          <meshPhysicalMaterial 
            ref={materialRef} 
            color="#FFD700" 
            metalness={1} 
            roughness={0.15} 
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#FFD700" 
            emissiveIntensity={0.1} 
          />
        </mesh>
        
        {/* Inner Coin Face (Recessed) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.16, 64]} />
          <meshPhysicalMaterial 
            ref={innerMaterialRef}
            color="#111111" 
            metalness={0.8} 
            roughness={0.4} 
            clearcoat={0.5}
          />
        </mesh>

        {/* Center "A" for Ascend - Front */}
        <group position={[0, 0, 0.08]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.12, 0.8, 0.05]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.12, 0.8, 0.05]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.4, 0.12, 0.05]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
        </group>
        
        {/* Back side "A" */}
        <group position={[0, 0, -0.08]} rotation={[0, Math.PI, 0]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.12, 0.8, 0.05]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.12, 0.8, 0.05]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.4, 0.12, 0.05]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function RadialDials() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  
  // Reuse objects
  const vec = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  
  useLayoutEffect(() => {
    if (!groupRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.set(groupRef.current!.scale, { x: 0, y: 0, z: 0 });
      
      gsap.to(groupRef.current!.scale, {
        x: 1, y: 1, z: 1,
        scrollTrigger: {
          trigger: "#work",
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      
      const el = document.getElementById('projects-coin-target');
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / size.width * 2 - 1;
        const y = -(rect.top + rect.height / 2) / size.height * 2 + 1;
        
        vec.current.set(x, y, 0.5);
        vec.current.unproject(camera);
        const dir = vec.current.clone().sub(camera.position).normalize();
        const distance = (0 - camera.position.z) / dir.z;
        const newPos = camera.position.clone().add(dir.multiplyScalar(distance));
        
        targetPos.current.set(newPos.x, newPos.y, -1);
        groupRef.current.position.lerp(targetPos.current, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.3, 0.015, 16, 100]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
      </Torus>
      <Torus args={[1.6, 0.008, 16, 100]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
      </Torus>
      {[...Array(12)].map((_, i) => (
        <mesh key={`tick-${i}`} position={[Math.cos(i * Math.PI / 6) * 1.3, Math.sin(i * Math.PI / 6) * 1.3, 0]} rotation={[0, 0, i * Math.PI / 6]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
          
          <DogeCoin />
          <RadialDials />
          
          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
