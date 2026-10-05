import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GrainData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  speed: number;
  offset: number;
}

export default function FloatingGrain({ 
  count = 20, 
  scrollProgress 
}: { 
  count?: number;
  scrollProgress?: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Use a capsule geometry to approximate a rice grain
  const geometry = useMemo(() => new THREE.CapsuleGeometry(0.02, 0.08, 4, 8), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#E9E1D2", // Warm Beige
    roughness: 0.6,
    metalness: 0.1,
  }), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate deterministic grain data
  const grains = useMemo(() => {
    const data: GrainData[] = [];
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random values based on index
      const seed1 = (i * 1.1) % 1;
      const seed2 = (i * 2.3) % 1;
      const seed3 = (i * 3.7) % 1;
      
      data.push({
        position: new THREE.Vector3(
          (seed1 - 0.5) * 10,
          (seed2 - 0.5) * 5,
          (seed3 - 0.5) * 8 + 2 // Closer to camera
        ),
        rotation: new THREE.Euler(seed1 * Math.PI, seed2 * Math.PI, seed3 * Math.PI),
        scale: 0.5 + seed1 * 1.5,
        speed: 0.2 + seed2 * 0.5,
        offset: seed3 * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const scrollZ = scrollProgress?.current ? scrollProgress.current * 5 : 0;
    
    grains.forEach((grain, i) => {
      // Floating animation
      const y = grain.position.y + Math.sin(time * grain.speed + grain.offset) * 0.2;
      const x = grain.position.x + Math.cos(time * grain.speed + grain.offset) * 0.1;
      // When scrolling, grains fly past camera
      const z = grain.position.z + scrollZ * (grain.scale * 0.5);
      
      dummy.position.set(x, y, z);
      
      // Rotating animation
      dummy.rotation.x = grain.rotation.x + time * grain.speed * 0.2;
      dummy.rotation.y = grain.rotation.y + time * grain.speed * 0.3;
      dummy.rotation.z = grain.rotation.z;
      
      dummy.scale.setScalar(grain.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} castShadow receiveShadow />
  );
}
