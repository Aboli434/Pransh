'use client';
import { useRef, useMemo, useEffect, Suspense } from 'react';
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
    
    // Target calculations
    // If diff is 0 (current photo), z should be 0.
    // If diff is < 0 (future photo), z should be deeper, e.g. -2, -4, etc.
    // If diff is > 0 (past photo), z should be in front, e.g. +2 (and fade/fly away)
    
    // Multiply diff to exaggerate depth
    const targetZ = -diff * 10;
    const targetX = diff * 5; // Slight drift
    
    // Scale slightly as it comes closer
    const targetScale = 1 - Math.abs(diff) * 0.5;
    const clampedScale = Math.max(0.5, Math.min(1.2, targetScale));
    
    // Rotation based on position
    const targetRotY = diff * -Math.PI / 4;
    
    // Interpolate towards targets for smoothness
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 5);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 5);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 5);
    
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, clampedScale, delta * 5));
    
    // Material opacity based on depth
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      // Fade out if it goes behind camera (z > 1) or very far back (z < -8)
      let targetOpacity = 1;
      if (meshRef.current.position.z > 1.5) targetOpacity = 0;
      if (meshRef.current.position.z < -6) targetOpacity = 0;
      
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 8);
      material.transparent = true;
      material.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -index * 2]} castShadow receiveShadow>
      {/* 4:3 aspect ratio photo planes */}
      <planeGeometry args={[4, 3, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.8}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
      {/* Backing layer for physical thickness feel */}
      <mesh position={[0, 0, -0.02]} receiveShadow>
        <planeGeometry args={[4.05, 3.05]} />
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

  useFrame((state, delta) => {
    // Subtle camera parallax
    const targetX = mouse.current.x * 1.5;
    const targetY = mouse.current.y * 1;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2);
    camera.lookAt(0, 0, -2);
  });

  return null;
}

export default function Journey3DScene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[var(--color-charcoal)]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={35} position={[0, 0, 4]} />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          color="#DCCCB5" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A5A3F" />
        
        <fog attach="fog" args={['#1a1a1a', 2, 12]} />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
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
