import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FarmTerrain({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  // Create curved agricultural rows
  const rows = useMemo(() => {
    const data = [];
    for (let i = 0; i < 5; i++) {
      // z positions: -2, -1, 0, 1, 2
      const z = -2 + i;
      // y positions to create a slight hill/curve effect
      const y = -1.5 + Math.sin(i * 0.5) * 0.2;
      
      data.push({
        position: [0, y, z] as [number, number, number],
        rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
      });
    }
    return data;
  }, []);

  useFrame(() => {
    if (group.current && scrollProgress.current !== undefined) {
      // Terrain moves slightly upward as user scrolls
      group.current.position.y = scrollProgress.current * 2;
    }
  });

  return (
    <group ref={group}>
      {rows.map((row, i) => (
        <mesh key={i} position={row.position} rotation={row.rotation} receiveShadow>
          {/* A long, slightly curved plane to simulate a crop row */}
          <planeGeometry args={[20, 1, 32, 1]} />
          <meshStandardMaterial 
            color="#35452D" // Deep Olive
            roughness={0.9} 
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
