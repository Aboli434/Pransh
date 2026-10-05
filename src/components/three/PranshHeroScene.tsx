/* eslint-disable */
'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// Realistic Procedural Supa (Winnowing Basket)
// --------------------------------------------------------
function getSupaState(sp: number) {
  // Start resting position
  let y = -1.5; 
  let z = -5.0; 
  let rotX = 0;
  let rotZ = 0;
  
  if (sp > 0.15 && sp <= 0.30) {
    // Preparation: slightly down and back
    const p = (sp - 0.15) / 0.15;
    y -= p * 0.3;
    z += p * 0.2;
    rotX = -p * 0.15;
  } else if (sp > 0.30 && sp <= 0.42) {
    // STRONG FLICK: Up, forward, pitching down
    const p = (sp - 0.30) / 0.12;
    const ease = Math.sin((p * Math.PI) / 2); // ease out
    y = -1.8 + ease * 2.5;
    z = -4.8 - ease * 1.0;
    rotX = -0.15 + ease * 0.8; 
  } else if (sp > 0.42) {
    // Follow through & settle
    const p = Math.min(1, (sp - 0.42) / 0.20);
    const ease = 1 - Math.pow(1 - p, 3);
    y = 0.7 - ease * 2.2;
    z = -5.8 + ease * 0.8;
    rotX = 0.65 - ease * 0.65;
  }
  
  return { y, z, rotX, rotZ };
}

function ProceduralSupa({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const sp = scrollProgress.current || 0;
    const state = getSupaState(sp);
    
    groupRef.current.position.set(0, state.y, state.z);
    groupRef.current.rotation.set(state.rotX, 0, state.rotZ);
  });

  return (
    <group ref={groupRef}>
      {/* 
        A quarter-sphere scaled perfectly creates a traditional dustpan/winnowing basket shape. 
        It has a flat open front, curved bottom, and raised back wall.
      */}
      <mesh rotation={[0, -Math.PI / 2, 0]} scale={[1.8, 0.4, 1.6]}>
        <sphereGeometry args={[1, 64, 32, 0, Math.PI, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#d4b27d" 
          roughness={0.9} 
          metalness={0.1}
          side={THREE.DoubleSide} 
        />
      </mesh>
      {/* Thick woven rim around the back/sides */}
      <mesh rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[1.8, 1.6, 0.4]}>
        <torusGeometry args={[1, 0.06, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#8e6234" roughness={1} />
      </mesh>
    </group>
  );
}

// --------------------------------------------------------
// Rice Simulation (360 Arc + Staggered Release)
// --------------------------------------------------------
function WinnowingParticles({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const riceCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 1800;
  const riceMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const riceData = useMemo(() => {
    const data = [];
    for (let i = 0; i < riceCount; i++) {
      // Build a dense mound inside the supa's local space
      const r = Math.pow(Math.random(), 0.6) * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const ox = r * Math.cos(theta);
      const oz = r * Math.sin(theta) * 0.9;
      
      // Mound height peaks in center
      const moundH = Math.max(0, 0.5 - (ox*ox + oz*oz) * 0.25);
      const oy = Math.random() * moundH; 
      
      // Staggered release: front (+Z) and top (+Y) leave first
      const zFactor = (oz + 1.3) / 2.6; 
      const yFactor = oy / 0.5;
      const releaseOrder = 1 - ((zFactor + yFactor) / 2); 
      const launchSp = 0.33 + releaseOrder * 0.08 + Math.random() * 0.02;
      
      // Individual flight drift to spread the stream out
      const flightDriftX = (Math.random() - 0.5) * 8.0;
      const flightDriftY = (Math.random() - 0.5) * 6.0;
      const flightDriftZ = (Math.random() - 0.5) * 8.0;

      // Individual tumble
      const initialRot = new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );

      data.push({ ox, oy, oz, launchSp, flightDriftX, flightDriftY, flightDriftZ, initialRot, rotSpeed });
    }
    return data;
  }, [riceCount]);

  const riceGeometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 6);
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  useFrame(() => {
    const sp = scrollProgress.current || 0;
    
    // Get live supa matrix
    const supaState = getSupaState(sp);
    const currentSupaMatrix = new THREE.Matrix4().compose(
      new THREE.Vector3(0, supaState.y, supaState.z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(supaState.rotX, 0, supaState.rotZ)),
      new THREE.Vector3(1, 1, 1)
    );

    if (riceMeshRef.current) {
      for (let i = 0; i < riceCount; i++) {
        const data = riceData[i];
        
        if (sp < data.launchSp) {
          // Locked inside the basket
          const localPos = new THREE.Vector3(data.ox, data.oy, data.oz);
          localPos.applyMatrix4(currentSupaMatrix);
          
          dummy.position.copy(localPos);
          dummy.rotation.set(data.initialRot.x + supaState.rotX, data.initialRot.y, data.initialRot.z);
          dummy.scale.setScalar(1);
        } else {
          // Airborne Flight
          // 1. Calculate where it launched from
          const launchState = getSupaState(data.launchSp);
          const launchMatrix = new THREE.Matrix4().compose(
            new THREE.Vector3(0, launchState.y, launchState.z),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(launchState.rotX, 0, launchState.rotZ)),
            new THREE.Vector3(1, 1, 1)
          );
          const startPos = new THREE.Vector3(data.ox, data.oy, data.oz).applyMatrix4(launchMatrix);

          // 2. Trajectory Math
          const t = (sp - data.launchSp) / (1.0 - data.launchSp); 
          
          // Massive 360 Arc Stream (Applies to the whole swarm)
          // Stream sweeps wide left/right, arcs extremely high, and blasts forward
          const streamX = Math.sin(t * Math.PI * 2.0) * (t * 12.0); 
          const streamY = Math.sin(t * Math.PI * 0.9) * 12.0; 
          const streamZ = t * 18.0; 
          
          dummy.position.set(
            startPos.x + streamX + (data.flightDriftX * Math.pow(t, 1.2)),
            startPos.y + streamY + (data.flightDriftY * Math.pow(t, 1.2)),
            startPos.z + streamZ + (data.flightDriftZ * Math.pow(t, 1.2))
          );

          // Individual grain tumbling
          dummy.rotation.set(
            data.initialRot.x + data.rotSpeed.x * t,
            data.initialRot.y + data.rotSpeed.y * t,
            data.initialRot.z + data.rotSpeed.z * t
          );
        }
        
        dummy.updateMatrix();
        riceMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      riceMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={riceMeshRef} args={[riceGeometry, undefined, riceCount]} castShadow receiveShadow>
      <meshStandardMaterial color="#Fdfbf7" roughness={0.4} />
    </instancedMesh>
  );
}

// --------------------------------------------------------
// Cinematic Camera
// --------------------------------------------------------
function SceneCamera({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  useFrame((state) => {
    const sp = scrollProgress.current || 0;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const baseZ = isMobile ? 8 : 6;
    let targetX = 0;
    let targetY = 0;
    let targetZ = baseZ;

    if (sp <= 0.50) {
      // 0-50%: Establish supa and prepare
      const p = sp / 0.50;
      targetZ = baseZ - p * 1.5;
      targetY = p * 0.5;
    } else if (sp <= 0.70) {
      // 50-70%: Look UP and follow the rising rice stream
      const p = (sp - 0.50) / 0.20;
      targetZ = baseZ - 1.5 - p * 2.0;
      targetY = 0.5 + p * 6.0; 
    } else if (sp <= 0.90) {
      // 70-90%: Fly FORWARD heavily into the 360 arc
      const p = (sp - 0.70) / 0.20;
      targetZ = baseZ - 3.5 - p * 8.0; 
      targetY = 6.5 + p * 2.0;
      targetX = Math.sin(p * Math.PI) * 2.0; // slight weave
    } else {
      // 90-100%: Pierce through the cloud completely to reveal next section
      const p = (sp - 0.90) / 0.10;
      targetZ = baseZ - 11.5 - p * 10.0; 
      targetY = 8.5 + p * 1.0;
    }
    
    // Smooth dampening
    state.camera.position.x += (targetX - state.camera.position.x) * 0.1;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.1;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
    
    // Look slightly upward and forward to see the majestic arc
    state.camera.lookAt(targetX * 0.5, targetY + 2, targetZ - 10);
  });
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
        <PerspectiveCamera makeDefault fov={isMobile ? 55 : 45} position={[0, 0, 6]} />
        <SceneCamera scrollProgress={scrollProgress} />
        
        {/* Cinematic warm agricultural lighting */}
        <ambientLight intensity={1.5} color="#fff4e6" />
        <directionalLight position={[10, 15, 10]} intensity={3.5} color="#ffd8a8" />
        <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#f0d5a3" />
        <pointLight position={[0, 5, 5]} intensity={2.0} color="#ffebcc" distance={20} />
        
        <ProceduralSupa scrollProgress={scrollProgress} />
        <WinnowingParticles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
