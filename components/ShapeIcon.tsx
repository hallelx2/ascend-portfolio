'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, Dodecahedron, Tetrahedron, TorusKnot, Sphere } from '@react-three/drei';

export default function ShapeIcon({ shape }: { shape: string }) {
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
