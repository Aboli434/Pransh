/* eslint-disable react-hooks/immutability */
'use client';
import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { journeyStagesData } from '@/data/journey';

function PhotoPlane({ 
  index, 
  total, 
  textureUrl, 
  scrollRef 
}: { 
  index: number, 
  total: number, 
  textureUrl: string,
  scrollRef: React.RefObject<number> 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);

  useFrame((state, delta) => {
    if (!meshRef.current || scrollRef.current === undefined) return;
    
    // progress goes from 0 to 1 over the whole page
    const progress = scrollRef.current;
    
    // Each photo represents a segment of the scroll
    const segment = 1 / total;
    const myCenterProgress = index * segment;
    
    // How far are we from this photo's optimal viewing point
    const diff = progress - myCenterProgress;
    
    // Instead of showing all 8, we only show current and incoming/outgoing
    // If diff is between -segment and +segment, it is active.
    
    // Target calculations
    let targetZ = -20; // Default hidden far back
    let targetX = 0;
    let targetRotY = 0;
    let targetOpacity = 0;
    
    if (diff > -segment * 2 && diff < segment * 2) {
      // It's in view
      // As diff approaches 0, z approaches 0
      targetZ = -diff * 8; // If diff is negative (incoming), z is positive (behind). Wait, diff = progress - center.
      // progress = 0, center = 0.125 -> diff = -0.125. targetZ = 1? No, we want negative Z for behind.
      // targetZ = diff * 8 -> if diff is -0.125, targetZ = -1. This is correct.
      targetZ = diff * 20; 
      
      // Rotation: incoming photo is slightly rotated, current is flat
      targetRotY = diff * Math.PI; 
      
      // X drift
      targetX = diff * 5;
      
      // Opacity
      targetOpacity = 1 - Math.abs(diff) * (1 / segment);
      targetOpacity = Math.max(0, Math.min(1, targetOpacity));
      
      // If it's outgoing (diff > 0), fade it out faster
      if (diff > 0) {
        targetOpacity = 1 - (diff * (2 / segment));
      }
    }
    
    // Interpolate towards targets for smoothness
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 5);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 5);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 5);
    
    // Material opacity based on depth
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 8);
      material.transparent = true;
      material.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} castShadow receiveShadow>
      {/* 4:3 aspect ratio photo planes */}
      <planeGeometry args={[5, 3.75, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.8}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
      {/* Backing layer for physical thickness feel */}
      <mesh position={[0, 0, -0.02]} receiveShadow>
        <planeGeometry args={[5.05, 3.8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </mesh>
  );
}

function SceneMouseTracker() {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/immutability
  useFrame((state, delta) => {
    // Subtle camera parallax
    const targetX = mouse.current.x * 0.5;
    const targetY = mouse.current.y * 0.3;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Journey3DScene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[var(--color-charcoal)]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={35} position={[0, 0, 6]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          color="#DCCCB5" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A5A3F" />
        
        <Suspense fallback={null}>
          <group position={[2, 0, 0]}>
            {journeyStagesData.map((stage, i) => (
              <PhotoPlane 
                key={stage.id} 
                index={i} 
                total={journeyStagesData.length} 
                textureUrl={stage.image} 
                scrollRef={scrollRef} 
              />
            ))}
          </group>
        </Suspense>

        <SceneMouseTracker />
      </Canvas>
    </div>
  );
}
