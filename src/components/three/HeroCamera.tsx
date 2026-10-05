import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroCamera({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2());
  const targetPosition = useRef(new THREE.Vector3(0, 2, 8));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/immutability
  useFrame((state, delta) => {
    if (scrollProgress.current !== undefined) {
      // Calculate target based on mouse and scroll
      // Scroll moves camera forward from z=8 to z=5.5
      const scrollZ = 8 - scrollProgress.current * 2.5;
      
      // Mouse adds subtle parallax
      const mouseX = mouse.current.x * 0.4;
      const mouseY = 2 + mouse.current.y * 0.25;
      
      targetPosition.current.set(mouseX, mouseY, scrollZ);
      
      // Interpolate smoothly
      camera.position.lerp(targetPosition.current, delta * 3);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
