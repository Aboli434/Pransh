'use client';
/* eslint-disable react-hooks/immutability */
import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { journeyStagesData } from '@/data/journey';

const PLANE_SPACING = 30;
const START_Z = -30;

function CinematicImagePlane({ 
  index, 
  textureUrl 
}: { 
  index: number, 
  textureUrl: string 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  // High quality texture settings
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }, [texture]);

  const zPosition = START_Z - (index * PLANE_SPACING);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const camZ = state.camera.position.z; 
    const dist = camZ - zPosition;
    
    if (dist > 0.5) { // In front of camera
      // Calculate exact dimensions to fill the camera frustum at this distance
      const fov = 45; // Matching the PerspectiveCamera
      const camera = state.camera as THREE.PerspectiveCamera;
      const height = 2 * Math.tan((fov * Math.PI) / 360) * dist;
      const width = height * camera.aspect;
      
      // Scale slightly larger than frustum (1.1x) to hide edges during parallax shake
      meshRef.current.scale.set(width * 1.1, height * 1.1, 1);
      
      // Cinematic dissolve: Fade out smoothly as camera approaches
      // Start fading when 15 units away, completely invisible at 2 units away
      let opacity = 1.0;
      if (dist < 15) {
        opacity = Math.max(0, (dist - 2) / 13);
        // Easing for smoother fade
        opacity = opacity * opacity * (3.0 - 2.0 * opacity); // Smoothstep
      }
      materialRef.current.opacity = opacity;
    } else {
      materialRef.current.opacity = 0; // Behind camera
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, zPosition]}>
      {/* Dense geometry allows for slight curvature if desired later, but flat is perfect for photos */}
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial 
        ref={materialRef}
        map={texture} 
        transparent 
        depthWrite={false} 
        toneMapped={false} 
      />
    </mesh>
  );
}

function SceneCameraManager({ scrollRef }: { scrollRef: React.RefObject<number> }) {
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
    const progress = scrollRef.current || 0;
    
    // Total camera travel distance
    // Progress 0 = Camera Z 0
    // Progress 1 = Camera Z reaches the final image (so it fills the screen perfectly)
    // Final image is at START_Z - (7 * PLANE_SPACING).
    // To make the final image stay on screen at progress=1, camera should stop 
    // at a safe viewing distance (e.g., 20 units away from final plane).
    const finalPlaneZ = START_Z - ((journeyStagesData.length - 1) * PLANE_SPACING);
    const targetZ = - (progress * Math.abs(finalPlaneZ + 20)); // Stops 20 units before the last plane

    // Mouse Parallax for subtle organic feeling
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const parallaxStrength = isMobile ? 0 : 0.5;
    
    const targetX = mouse.current.x * parallaxStrength;
    const targetY = mouse.current.y * parallaxStrength;

    // Smooth interpolation
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 4);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3);
    
    // Look straight ahead
    camera.lookAt(camera.position.x, camera.position.y, camera.position.z - 10);
  });

  return null;
}

export default function Journey3DScene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#11100e]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={45} position={[0, 0, 0]} />
        
        <Suspense fallback={null}>
          <group>
            {journeyStagesData.map((stage, i) => (
              <CinematicImagePlane 
                key={stage.id} 
                index={i} 
                textureUrl={stage.image} 
              />
            ))}
          </group>
        </Suspense>

        <SceneCameraManager scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
