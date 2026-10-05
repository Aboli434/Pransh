'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import FarmTerrain from './FarmTerrain';
import FloatingGrain from './FloatingGrain';
import HeroCamera from './HeroCamera';

// Background Plane Component
function BackgroundPlane({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const texture = useTexture('/images/hero/hero-landscape.jpg');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && scrollProgress.current !== undefined) {
      // Moves slower than foreground
      meshRef.current.position.y = scrollProgress.current * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      {/* Aspect ratio to cover typical view */}
      <planeGeometry args={[30, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

// Fallback Loader
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0, 0, 0]} />
      <meshBasicMaterial color="transparent" />
    </mesh>
  );
}

export default function PranshHeroScene({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={40} position={[0, 2, 8]} />
        <HeroCamera scrollProgress={scrollProgress} />
        
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.6} color="#E9E1D2" />
        
        {/* Warm Sunlight Directional Light */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          color="#DCCCB5" // Warm Sand
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Subtle Fog for depth */}
        <fog attach="fog" args={['#20231F', 5, 25]} />
        
        <Suspense fallback={<Loader />}>
          <BackgroundPlane scrollProgress={scrollProgress} />
        </Suspense>
        
        <FarmTerrain scrollProgress={scrollProgress} />
        <FloatingGrain count={30} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
