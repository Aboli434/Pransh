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

  useFrame(() => {
    const sp = scrollProgress.current || 0;

    if (meshRef.current) {
      // Base position
      meshRef.current.position.set(2.0, -1.0, -5.0);
      meshRef.current.scale.set(16, 16, 1);

      // Supa Timeline:
      // 0.00 - 0.15: Rest
      // 0.15 - 0.30: Prep (pull back slightly)
      // 0.30 - 0.45: Throw (lift and forward tilt)
      // 0.45 - 0.60: Settle back

      if (sp < 0.15) {
        meshRef.current.position.y = -1.0;
        meshRef.current.rotation.x = 0;
      } else if (sp < 0.30) {
        const p = (sp - 0.15) / 0.15; // 0 to 1
        meshRef.current.position.y = -1.0 - p * 0.1; // lower slightly
        meshRef.current.rotation.x = -p * 0.05; // tilt back slightly
      } else if (sp < 0.45) {
        const p = (sp - 0.30) / 0.15; // 0 to 1
        meshRef.current.position.y = -1.1 + Math.sin(p * Math.PI * 0.5) * 0.5; // lift up
        meshRef.current.rotation.x = -0.05 + Math.sin(p * Math.PI * 0.5) * 0.2; // tilt forward (throw)
      } else if (sp < 0.60) {
        const p = (sp - 0.45) / 0.15; // 0 to 1
        meshRef.current.position.y = -0.6 - p * 0.4; // settle down
        meshRef.current.rotation.x = 0.15 - p * 0.15;
      } else {
        meshRef.current.position.y = -1.0;
        meshRef.current.rotation.x = 0;
      }
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
  
  const riceMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Launch origin matching the 2D supa image center
  const launchOrigin = new THREE.Vector3(1.8, -1.0, -3.5);

  const riceData = useMemo(() => {
    const data = [];
    for (let i = 0; i < riceCount; i++) {
      // Dense pile inside the supa center
      const r = Math.pow(Math.random(), 0.5) * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.cos(theta);
      const z = (r * Math.sin(theta)) * 0.6;
      
      const moundHeight = Math.max(0, 0.8 - (x*x + z*z) * 0.25);
      const y = Math.random() * moundHeight; 

      // Staggered launch timing (0.35 to 0.45)
      // Front grains (higher Z, positive) launch later? Or earlier? Let's random stagger
      const launchSp = 0.35 + Math.random() * 0.10; 
      
      // Flight physics
      const vy = 8.0 + Math.random() * 8.0; // Strong upward travel
      const maxFlightSp = 1.0; // Never lands before hero ends
      
      // Swirl params
      const baseSwirlAngle = Math.random() * Math.PI * 2;
      const swirlSpeed = 1.5 + Math.random() * 1.0; // How many radians to turn through the flight
      const swirlRadiusStart = (Math.random() - 0.5) * 0.5;
      const swirlRadiusExpansion = 3.0 + Math.random() * 4.0; // Spreads out wide

      // Forward travel (towards camera which is at Z ~ 6)
      const vz = 4.0 + Math.random() * 5.0; // Moves positive Z (forward)

      // Individual grain rotations
      const initialRot = new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      // Distinguish chaff-like vs heavy
      const isChaff = Math.random() > 0.8; 

      data.push({ 
        x, y, z, 
        launchSp, vy, vz, 
        baseSwirlAngle, swirlSpeed, swirlRadiusStart, swirlRadiusExpansion,
        initialRot, rotSpeed, isChaff 
      });
    }
    return data;
  }, [riceCount]);

  const riceGeometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 6);
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  useFrame(() => {
    const sp = scrollProgress.current || 0;
    
    // Supa pile syncing
    let pileOffsetY = 0;
    let pileRotationX = 0;
    
    if (sp > 0.15 && sp < 0.30) {
      const p = (sp - 0.15) / 0.15;
      pileOffsetY = -p * 0.1;
      pileRotationX = -p * 0.05;
    } else if (sp >= 0.30 && sp < 0.45) {
      const p = (sp - 0.30) / 0.15;
      pileOffsetY = -0.1 + Math.sin(p * Math.PI * 0.5) * 0.5;
      pileRotationX = -0.05 + Math.sin(p * Math.PI * 0.5) * 0.2;
    }

    if (riceMeshRef.current) {
      for (let i = 0; i < riceCount; i++) {
        const data = riceData[i];
        
        if (sp < data.launchSp) {
          // Resting in pile
          dummy.position.set(
            launchOrigin.x + data.x, 
            launchOrigin.y + data.y + pileOffsetY, 
            launchOrigin.z + data.z
          );
          dummy.rotation.set(
            pileRotationX + data.initialRot.x, 
            data.initialRot.y, 
            data.initialRot.z
          );
          dummy.scale.setScalar(1);
        } else {
          // Airborne
          const t = (sp - data.launchSp) / (1.0 - data.launchSp); // Normalized flight time 0 to 1
          
          // Vertical movement (High arc, doesn't come down much)
          // Use an ease-out curve so it shoots up and hangs
          const verticalEase = 1 - Math.pow(1 - t, 2); // fast up, slows down
          const currentY = launchOrigin.y + data.y + pileOffsetY + (data.vy * verticalEase);

          // 360 Swirl logic (X and Z)
          const angle = data.baseSwirlAngle + (t * data.swirlSpeed * Math.PI);
          const radius = data.swirlRadiusStart + (t * data.swirlRadiusExpansion);

          const currentX = launchOrigin.x + Math.cos(angle) * radius;
          // Z moves forward (towards camera), plus swirl
          const currentZ = launchOrigin.z + Math.sin(angle) * radius * 0.5 + (data.vz * t);

          dummy.position.set(currentX, currentY, currentZ);

          // Tumbling rotation
          dummy.rotation.set(
            data.initialRot.x + data.rotSpeed.x * t,
            data.initialRot.y + data.rotSpeed.y * t,
            data.initialRot.z + data.rotSpeed.z * t
          );

          if (data.isChaff) {
            dummy.scale.setScalar(Math.max(0, 1 - t * 0.8)); // Fades out
          } else {
            dummy.scale.setScalar(1);
          }
        }
        
        dummy.updateMatrix();
        riceMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      riceMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={riceMeshRef} args={[riceGeometry, undefined, riceCount]} castShadow receiveShadow>
      <meshStandardMaterial color="#F9F6F0" roughness={0.6} />
    </instancedMesh>
  );
}

// --------------------------------------------------------
// Camera Control
// --------------------------------------------------------
function SceneCamera({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  useFrame((state) => {
    const sp = scrollProgress.current || 0;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Base camera position
    const baseZ = isMobile ? 8 : 6;
    let targetZ = baseZ;
    let targetY = 2;
    let targetX = 0;

    // 0.0 - 0.15: Rest
    // 0.15 - 0.45: Prepare and Throw (push slightly in)
    // 0.45 - 0.75: Follow rice up
    // 0.75 - 1.00: Travel THROUGH the rice cloud forward
    
    if (sp < 0.15) {
      targetZ = baseZ;
    } else if (sp < 0.45) {
      const p = (sp - 0.15) / 0.30;
      targetZ = baseZ - p * 1.5; 
    } else if (sp < 0.75) {
      const p = (sp - 0.45) / 0.30;
      targetZ = baseZ - 1.5;
      targetY = 2 + p * 3.0; // Pan up significantly to follow the rice
    } else {
      const p = (sp - 0.75) / 0.25;
      // Fly completely forward into the cloud
      targetZ = baseZ - 1.5 - p * 8.0; 
      targetY = 5 + p * 1.0;
      targetX = p * 1.0; // slight drift
    }
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.1;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.1;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
    state.camera.lookAt(targetX, targetY - 2, targetZ - 5); // Look forward/up slightly
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
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={isMobile ? 55 : 45} position={[0, 2, 6]} />
        <SceneCamera scrollProgress={scrollProgress} />
        
        <ambientLight intensity={1.5} color="#FFF1E0" />
        
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={3.0} 
          color="#FFDAB9"
        />

        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={1.0} 
          color="#E6C280" 
        />
        
        <Suspense fallback={<FallbackLoader />}>
          <SupaBackground scrollProgress={scrollProgress} />
        </Suspense>
        
        <WinnowingParticles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
