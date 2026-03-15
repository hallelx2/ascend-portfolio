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
  
  const [activeIndex, setActiveIndex] = useState(0);
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));

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

    const handleSwoosh = () => {
      const el = document.getElementById('contact-coin-target');
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / size.width * 2 - 1;
        const y = -(rect.top + rect.height / 2) / size.height * 2 + 1;
        const vector = new THREE.Vector3(x, y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = (0 - camera.position.z) / dir.z;
        const newPos = camera.position.clone().add(dir.multiplyScalar(distance));
        
        gsap.to(groupRef.current!.position, {
          x: newPos.x,
          y: newPos.y,
          z: newPos.z,
          duration: 1,
          ease: "power2.inOut"
        });
      }
    };

    window.addEventListener('coin-swoosh', handleSwoosh);

    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('coin-swoosh', handleSwoosh);
    };
  }, [camera, size]);

  useFrame((state, delta) => {
    if (!groupRef.current || !materialRef.current || !innerMaterialRef.current) return;

    // 1. Calculate target 3D position from DOM element
    const targetId = targets[activeIndex];
    const el = document.getElementById(targetId);

    if (el) {
      const rect = el.getBoundingClientRect();
      
      // Calculate center of the element in NDC (-1 to +1)
      const x = (rect.left + rect.width / 2) / size.width * 2 - 1;
      const y = -(rect.top + rect.height / 2) / size.height * 2 + 1;

      // Unproject to 3D space
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      
      // Choose a fixed Z distance for the coin (e.g., Z=0)
      const distance = (0 - camera.position.z) / dir.z;
      const newPos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Fine-tune position for contact section
      if (activeIndex === 4) {
        newPos.x += 0.0; // Adjust horizontal alignment
        newPos.y += 0.5; // Adjust vertical alignment (shifted upward)
      }

      targetPos.current.copy(newPos);
    }

    // 2. Smoothly move coin to target position
    groupRef.current.position.lerp(targetPos.current, 0.08);

    // 3. Smoothly change color
    const targetColor = new THREE.Color(colors[activeIndex]);
    materialRef.current.color.lerp(targetColor, 0.05);
    materialRef.current.emissive.lerp(targetColor, 0.05);
    innerMaterialRef.current.color.lerp(targetColor, 0.05);

    // 4. Smoothly change scale
    const targetScale = scales[activeIndex];
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

    // 5. Constant rotation
    groupRef.current.rotation.y += delta * 1.5;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Ring */}
        <Torus args={[1.2, 0.15, 32, 100]} rotation={[0, 0, 0]}>
          <meshStandardMaterial ref={materialRef} color="#FFD700" metalness={0.8} roughness={0.2} emissive="#FFD700" emissiveIntensity={0.2} />
        </Torus>
        
        {/* Inner Glass Core */}
        <Cylinder args={[1.1, 1.1, 0.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial 
            ref={innerMaterialRef}
            color="#FFD700" 
            metalness={0.1} 
            roughness={0.1} 
            transmission={0.9} 
            thickness={0.5}
            ior={1.5}
          />
        </Cylinder>

        {/* Center "A" for Ascend */}
        <group position={[0, 0, 0.15]}>
          {/* Left leg */}
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
          </mesh>
          {/* Right leg */}
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
          </mesh>
          {/* Crossbar */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.4, 0.1, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
          </mesh>
        </group>
        
        {/* Back side "A" */}
        <group position={[0, 0, -0.15]} rotation={[0, Math.PI, 0]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.4, 0.1, 0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function RadialDials() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  
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
      
      // Track the projects coin target for the dials too
      const el = document.getElementById('projects-coin-target');
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / size.width * 2 - 1;
        const y = -(rect.top + rect.height / 2) / size.height * 2 + 1;
        const vector = new THREE.Vector3(x, y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = (0 - camera.position.z) / dir.z;
        const newPos = camera.position.clone().add(dir.multiplyScalar(distance));
        
        // Place dials slightly behind the coin
        groupRef.current.position.lerp(new THREE.Vector3(newPos.x, newPos.y, -1), 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <Torus key={i} args={[3 + i * 1.5, 0.02, 16, 100]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3 - i * 0.1} />
        </Torus>
      ))}
      {[...Array(12)].map((_, i) => (
        <mesh key={`tick-${i}`} position={[Math.cos(i * Math.PI / 6) * 3, Math.sin(i * Math.PI / 6) * 3, 0]} rotation={[0, 0, i * Math.PI / 6]}>
          <boxGeometry args={[0.5, 0.05, 0.05]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ pointerEvents: 'none' }}>
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
