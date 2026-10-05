/* eslint-disable */
'use client';
import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 2.5D Realistic Supa + Hands Background
// --------------------------------------------------------
function SupaBackground({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const texture = useTexture('/images/hero/supa-hands.jpg');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime % 6.0; 
    const sp = scrollProgress.current || 0;

    if (meshRef.current) {
      // Base position & scale to cover right side
      meshRef.current.position.set(1.5, -0.5, -4.0);
      meshRef.current.scale.set(14, 14, 1);

      // Subtle parallax & interaction with winnowing cycle
      // Simulate hands lifting the supa
      if (t > 1.2 && t < 1.8) {
        const progress = (t - 1.2) / 0.6;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        meshRef.current.position.y = -0.5 + easeOut * 0.2;
        meshRef.current.rotation.x = easeOut * 0.05; // Slight tilt
      } else if (t >= 1.8 && t < 4.0) {
        meshRef.current.position.y = -0.3;
        meshRef.current.rotation.x = 0.05;
      } else if (t >= 4.0 && t < 5.0) {
        const progress = (t - 4.0) / 1.0;
        const easeInOut = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        meshRef.current.position.y = -0.3 - easeInOut * 0.2;
        meshRef.current.rotation.x = 0.05 - easeInOut * 0.05;
      } else {
        meshRef.current.position.y = -0.5;
        meshRef.current.rotation.x = 0;
      }

      // Scroll interaction
      meshRef.current.position.y += sp * 2.0; // Parallax background movement
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

// --------------------------------------------------------
// Realistic 3D Rice Winnowing Simulation
// --------------------------------------------------------
function WinnowingParticles({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const riceCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 1500;
  const chaffCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 300;
  
  const riceMeshRef = useRef<THREE.InstancedMesh>(null);
  const chaffMeshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Launch origin matching the 2D supa image center
  const launchOrigin = new THREE.Vector3(1.5, -0.5, -2.5);

  const riceData = useMemo(() => {
    const data = [];
    for (let i = 0; i < riceCount; i++) {
      // Dense pile inside the supa center
      const r = Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.cos(theta);
      const z = (r * Math.sin(theta)) * 0.5; // flatter z depth
      const y = Math.max(0, 0.4 - (x*x + z*z) * 0.2) + (Math.random() * 0.1); 

      const launchTime = 1.8 + Math.random() * 0.4;
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2.0, // spread x
        5.0 + Math.random() * 3.0,   // up y
        -1.0 - Math.random() * 2.0   // slight forward z towards camera
      );
      
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );

      data.push({ x, y, z, launchTime, velocity, rotSpeed });
    }
    return data;
  }, [riceCount]);

  const chaffData = useMemo(() => {
    const data = [];
    for (let i = 0; i < chaffCount; i++) {
      const r = Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.cos(theta);
      const z = (r * Math.sin(theta)) * 0.5;
      const y = Math.max(0, 0.4 - (x*x + z*z) * 0.2) + (Math.random() * 0.1); 

      const launchTime = 1.8 + Math.random() * 0.4;
      const velocity = new THREE.Vector3(
        (Math.random() - 0.2) * 3.0, 
        4.0 + Math.random() * 3.0,
        -0.5 - Math.random() * 1.5
      );
      
      data.push({ x, y, z, launchTime, velocity });
    }
    return data;
  }, [chaffCount]);

  const riceGeometry = useMemo(() => {
    // Realistic rice grain: long, narrow, slightly curved
    const geom = new THREE.CylinderGeometry(0.012, 0.012, 0.09, 8);
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  const chaffGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.05, 0.05);
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime % 6.0; 
    const sp = scrollProgress.current || 0;
    
    // Smooth time manipulation on scroll
    const timeScale = Math.max(0.2, 1.0 - sp * 1.5);
    
    // Sync supa lift motion to the pile
    let pileOffsetY = 0;
    if (t > 1.2 && t < 1.8) {
      pileOffsetY = (1 - Math.pow(1 - (t - 1.2) / 0.6, 3)) * 0.3;
    } else if (t >= 1.8 && t < 4.0) {
      pileOffsetY = 0.3;
    } else if (t >= 4.0 && t < 5.0) {
      const progress = (t - 4.0) / 1.0;
      pileOffsetY = 0.3 - (progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2) * 0.3;
    }

    if (riceMeshRef.current) {
      for (let i = 0; i < riceCount; i++) {
        const data = riceData[i];
        
        if (t < data.launchTime) {
          // Resting in pile
          dummy.position.set(
            launchOrigin.x + data.x, 
            launchOrigin.y + data.y + pileOffsetY, 
            launchOrigin.z + data.z
          );
          dummy.rotation.set((data.x * 3) % Math.PI, (data.z * 3) % Math.PI, 0);
        } else {
          // Ballistic trajectory
          const airTime = (t - data.launchTime) * timeScale;
          const gravity = -12.0; 
          
          dummy.position.x = launchOrigin.x + data.x + data.velocity.x * airTime;
          dummy.position.y = launchOrigin.y + data.y + 0.3 + data.velocity.y * airTime + 0.5 * gravity * airTime * airTime;
          dummy.position.z = launchOrigin.z + data.z + data.velocity.z * airTime;
          
          dummy.rotation.set(
            data.rotSpeed.x * airTime,
            data.rotSpeed.y * airTime,
            data.rotSpeed.z * airTime
          );
        }
        
        dummy.updateMatrix();
        riceMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      riceMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (chaffMeshRef.current) {
      for (let i = 0; i < chaffCount; i++) {
        const data = chaffData[i];
        
        if (t < data.launchTime) {
          dummy.position.set(
            launchOrigin.x + data.x, 
            launchOrigin.y + data.y + pileOffsetY + 0.02, 
            launchOrigin.z + data.z
          );
          dummy.scale.setScalar(1);
        } else {
          const airTime = (t - data.launchTime) * timeScale;
          const gravity = -3.0; // Slow fall
          
          const windX = 2.0 * airTime; // Blows away right

          dummy.position.x = launchOrigin.x + data.x + data.velocity.x * airTime + windX;
          dummy.position.y = launchOrigin.y + data.y + 0.3 + data.velocity.y * airTime + 0.5 * gravity * airTime * airTime;
          dummy.position.z = launchOrigin.z + data.z + data.velocity.z * airTime;
          
          dummy.rotation.set(airTime * 8, airTime * 4, airTime * 2);
          
          const scale = Math.max(0, 1 - (airTime * 0.5));
          dummy.scale.setScalar(scale);
        }
        
        dummy.updateMatrix();
        chaffMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      chaffMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={riceMeshRef} args={[riceGeometry, undefined, riceCount]} castShadow receiveShadow>
        <meshStandardMaterial color="#F9F6F0" roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={chaffMeshRef} args={[chaffGeometry, undefined, chaffCount]}>
        <meshStandardMaterial color="#D4B895" roughness={1.0} transparent opacity={0.6} />
      </instancedMesh>
    </>
  );
}

// --------------------------------------------------------
// Camera Control
// --------------------------------------------------------
function SceneCamera({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  useFrame((state) => {
    const sp = scrollProgress.current || 0;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Closer cinematic camera
    const baseZ = isMobile ? 8 : 6;
    const targetZ = baseZ - sp * 3.0; 
    const targetY = 2 - sp * 1.5;
    
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 1, 0);
  });
  return null;
}

function FallbackLoader() {
  return null;
}

// --------------------------------------------------------
// Main Export
// --------------------------------------------------------
export default function PranshHeroScene({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#111111]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={isMobile ? 55 : 45} position={[0, 2, 6]} />
        <SceneCamera scrollProgress={scrollProgress} />
        
        <ambientLight intensity={1.0} color="#FFF1E0" />
        
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={3.0} 
          color="#FFDAB9"
          castShadow 
        />

        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={1.0} 
          color="#E6C280" 
        />
        
        <fog attach="fog" args={['#111111', 5, 20]} />
        
        <Suspense fallback={<FallbackLoader />}>
          <SupaBackground scrollProgress={scrollProgress} />
        </Suspense>
        
        <WinnowingParticles scrollProgress={scrollProgress} />
      </Canvas>

      <div className="absolute bottom-12 right-12 text-[10px] font-sans uppercase tracking-[0.3em] text-[var(--color-champagne)]/70 hidden md:block">
        01 / FROM HARVEST TO GRAIN
      </div>
    </div>
  );
}
