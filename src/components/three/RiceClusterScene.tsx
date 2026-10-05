'use client';
import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function GrainCluster({ count = 20 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.CapsuleGeometry(0.04, 0.15, 8, 16), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#F5F0E6", // Very light off-white
    roughness: 0.4,
    metalness: 0.1,
  }), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate clustered grain data
  const grains = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random values to satisfy react purity rules
      const r1 = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
      const r2 = Math.abs((Math.cos(i * 4.1414) * 43758.5453) % 1);
      const r3 = Math.abs((Math.sin(i * 7.7777) * 43758.5453) % 1);
      
      const u = r1;
      const v = r2;
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(r3) * 1.5; // radius of cluster

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      data.push({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(r1 * Math.PI, r2 * Math.PI, r3 * Math.PI),
        scale: 0.8 + r1 * 0.4,
        speed: 0.2 + r2 * 0.5,
        offset: r3 * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    grains.forEach((grain, i) => {
      // Gentle floating within the cluster
      const y = grain.position.y + Math.sin(time * grain.speed + grain.offset) * 0.1;
      const x = grain.position.x + Math.cos(time * grain.speed * 0.8 + grain.offset) * 0.1;
      
      dummy.position.set(x, y, grain.position.z);
      
      // Slow rotation
      dummy.rotation.x = grain.rotation.x + time * grain.speed * 0.2;
      dummy.rotation.y = grain.rotation.y + time * grain.speed * 0.3;
      dummy.rotation.z = grain.rotation.z;
      
      dummy.scale.setScalar(grain.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    // Rotate the entire cluster slowly
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.1;
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} castShadow receiveShadow />
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2());
  // Use refs to hold camera target to avoid mutating the camera directly and triggering eslint immutability errors
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5));

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
    const targetX = mouse.current.x * 0.5;
    const targetY = mouse.current.y * 0.5;
    
    targetCamPos.current.set(targetX, targetY, 5);
    camera.position.lerp(targetCamPos.current, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function RiceClusterScene() {
  return (
    <div className="w-full h-full min-h-[400px] pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={35} position={[0, 0, 5]} />
        <CameraRig />
        
        <ambientLight intensity={0.7} color="#ffffff" />
        <directionalLight 
          position={[5, 5, 2]} 
          intensity={2} 
          color="#DCCCB5" 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#4A5A3F" />
        
        <Suspense fallback={null}>
          <GrainCluster count={20} />
        </Suspense>
      </Canvas>
    </div>
  );
}
