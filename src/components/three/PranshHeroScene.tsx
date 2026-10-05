/* eslint-disable */
'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// Realistic Rice Field Generation
// --------------------------------------------------------
function RiceField({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const clumpsCount = isMobile ? 800 : 2500;
  
  const leavesRef = useRef<THREE.InstancedMesh>(null);
  const paniclesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 1. Create a single "Clump" geometry for leaves (Multiple curved blades)
  const clumpLeavesGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const leafCount = 8;
    for (let i = 0; i < leafCount; i++) {
      const height = 1.0 + Math.random() * 0.8;
      const width = 0.03 + Math.random() * 0.02;
      const curve = 0.2 + Math.random() * 0.3;
      
      const geom = new THREE.PlaneGeometry(width, height, 1, 5);
      geom.translate(0, height / 2, 0); // Origin at base
      
      const pos = geom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const y = pos.getY(j);
        const t = y / height;
        const bend = Math.pow(t, 2) * curve; 
        
        pos.setZ(j, pos.getZ(j) + bend);
        // Taper
        if (t > 0.5) {
          pos.setX(j, pos.getX(j) * (1.0 - (t - 0.5) * 2.0));
        }
      }
      geom.computeVertexNormals();
      
      // Rotate outward from center
      geom.rotateY((i / leafCount) * Math.PI * 2 + (Math.random() * 0.5));
      geom.rotateX(0.1 + Math.random() * 0.2); // lean out
      
      geometries.push(geom);
    }
    
    // Merge into one BufferGeometry (manual merge for zero dependencies)
    const totalVertices = geometries.reduce((sum, g) => sum + g.attributes.position.count, 0);
    const totalIndices = geometries.reduce((sum, g) => sum + (g.index ? g.index.count : 0), 0);
    
    const mergedPositions = new Float32Array(totalVertices * 3);
    const mergedNormals = new Float32Array(totalVertices * 3);
    const mergedUvs = new Float32Array(totalVertices * 2);
    const mergedIndices = new Uint16Array(totalIndices);
    
    let vOffset = 0;
    let iOffset = 0;
    
    geometries.forEach(g => {
      const pos = g.attributes.position.array;
      const norm = g.attributes.normal.array;
      const uv = g.attributes.uv.array;
      const ind = g.index!.array;
      
      mergedPositions.set(pos, vOffset * 3);
      mergedNormals.set(norm, vOffset * 3);
      mergedUvs.set(uv, vOffset * 2);
      
      for (let j = 0; j < ind.length; j++) {
        mergedIndices[iOffset + j] = ind[j] + vOffset;
      }
      
      vOffset += g.attributes.position.count;
      iOffset += ind.length;
    });
    
    const finalGeom = new THREE.BufferGeometry();
    finalGeom.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3));
    finalGeom.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3));
    finalGeom.setAttribute('uv', new THREE.BufferAttribute(mergedUvs, 2));
    finalGeom.setIndex(new THREE.BufferAttribute(mergedIndices, 1));
    return finalGeom;
  }, []);

  // 2. Create a single "Clump" geometry for panicles (the golden rice grains)
  const clumpPaniclesGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const panicleCount = 3;
    for (let i = 0; i < panicleCount; i++) {
      const height = 0.8 + Math.random() * 0.4;
      const geom = new THREE.CylinderGeometry(0.015, 0.005, height, 4, 6);
      geom.translate(0, height / 2, 0);
      
      const pos = geom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const y = pos.getY(j);
        const t = y / height;
        const droop = Math.pow(t, 2) * 0.6; // Heavy droop for grains
        pos.setZ(j, pos.getZ(j) + droop);
        pos.setY(j, y - droop * 0.3); // Weighs it down
      }
      geom.computeVertexNormals();
      
      geom.rotateY(Math.random() * Math.PI * 2);
      geom.rotateX(0.2 + Math.random() * 0.2);
      
      geometries.push(geom);
    }
    
    // Manual merge
    const totalVertices = geometries.reduce((sum, g) => sum + g.attributes.position.count, 0);
    const totalIndices = geometries.reduce((sum, g) => sum + (g.index ? g.index.count : 0), 0);
    const mergedPositions = new Float32Array(totalVertices * 3);
    const mergedNormals = new Float32Array(totalVertices * 3);
    const mergedIndices = new Uint16Array(totalIndices);
    let vOffset = 0; let iOffset = 0;
    
    geometries.forEach(g => {
      mergedPositions.set(g.attributes.position.array, vOffset * 3);
      mergedNormals.set(g.attributes.normal.array, vOffset * 3);
      for (let j = 0; j < g.index!.array.length; j++) mergedIndices[iOffset + j] = g.index!.array[j] + vOffset;
      vOffset += g.attributes.position.count;
      iOffset += g.index!.array.length;
    });
    
    const finalGeom = new THREE.BufferGeometry();
    finalGeom.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3));
    finalGeom.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3));
    finalGeom.setIndex(new THREE.BufferAttribute(mergedIndices, 1));
    return finalGeom;
  }, []);

  // 3. Distribute clumps across the field
  const fieldData = useMemo(() => {
    const data = [];
    const fieldWidth = 60;
    const fieldDepth = 120; // Massive depth extending to Z = -100
    
    for (let i = 0; i < clumpsCount; i++) {
      // Concentrate more near the center path, but fill out to the edges
      const x = (Math.random() - 0.5) * fieldWidth;
      // Z from +10 (behind start) to -110 (horizon)
      const z = 10 - Math.random() * fieldDepth;
      
      // Slight uneven terrain
      const y = Math.sin(x * 0.2) * 0.5 + Math.sin(z * 0.1) * 0.5 - 1.0;
      
      const scale = 0.8 + Math.random() * 0.6;
      const rotY = Math.random() * Math.PI * 2;
      
      // Wind phases
      const windPhase = x * 0.5 + z * 0.5 + Math.random();
      const windSpeed = 0.8 + Math.random() * 0.4;
      
      data.push({ x, y, z, scale, rotY, windPhase, windSpeed });
    }
    
    // Sort by Z to help with overdraw
    return data.sort((a, b) => a.z - b.z);
  }, [clumpsCount]);

  // Update instance matrices (Wind animation)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (leavesRef.current && paniclesRef.current) {
      for (let i = 0; i < clumpsCount; i++) {
        const d = fieldData[i];
        
        // Natural wind sway
        const swayX = Math.sin(time * d.windSpeed + d.windPhase) * 0.1;
        const swayZ = Math.cos(time * d.windSpeed * 0.8 + d.windPhase) * 0.1;
        
        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(swayX, d.rotY, swayZ);
        dummy.scale.setScalar(d.scale);
        dummy.updateMatrix();
        
        leavesRef.current.setMatrixAt(i, dummy.matrix);
        paniclesRef.current.setMatrixAt(i, dummy.matrix);
      }
      leavesRef.current.instanceMatrix.needsUpdate = true;
      paniclesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Terrain Floor */}
      <mesh position={[0, -1.2, -40]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 150, 32, 32]} />
        <meshStandardMaterial color="#4a3e28" roughness={1.0} />
      </mesh>
      
      {/* Leaves Instanced */}
      <instancedMesh ref={leavesRef} args={[clumpLeavesGeometry, undefined, clumpsCount]} castShadow receiveShadow>
        <meshStandardMaterial color="#7a8044" roughness={0.9} side={THREE.DoubleSide} />
      </instancedMesh>
      
      {/* Panicles Instanced (Golden Rice) */}
      <instancedMesh ref={paniclesRef} args={[clumpPaniclesGeometry, undefined, clumpsCount]} castShadow receiveShadow>
        <meshStandardMaterial color="#c29a65" roughness={0.7} side={THREE.DoubleSide} />
      </instancedMesh>
    </group>
  );
}

// --------------------------------------------------------
// Cinematic Camera
// --------------------------------------------------------
function SceneCamera({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  useFrame((state) => {
    const sp = scrollProgress.current || 0;
    
    // 0-20%: Subtle start, low in the plants.
    // 20-45%: Slow move forward.
    // 45-70%: Rise up, field opens.
    // 70-90%: Travel toward horizon faster.
    // 90-100%: Transition out.
    
    let targetZ = 6;
    let targetY = 1.2;
    let targetX = 0;
    
    let lookAtY = 1.2;
    let lookAtZ = 0;

    if (sp < 0.20) {
      const p = sp / 0.20;
      targetZ = 6 - p * 1.5; // very subtle move
    } else if (sp < 0.45) {
      const p = (sp - 0.20) / 0.25;
      targetZ = 4.5 - p * 10; // walk forward
      targetX = Math.sin(p * Math.PI) * 0.5; // slight weave
    } else if (sp < 0.70) {
      const p = (sp - 0.45) / 0.25;
      targetZ = -5.5 - p * 15;
      targetY = 1.2 + p * 3.5; // rise up to see the horizon
      lookAtY = 1.2 - p * 1.0; // look slightly down at the field
    } else if (sp < 0.90) {
      const p = (sp - 0.70) / 0.20;
      targetZ = -20.5 - p * 25; // fast cinematic travel
      targetY = 4.7;
      lookAtY = 0.2;
    } else {
      const p = (sp - 0.90) / 0.10;
      targetZ = -45.5 - p * 15; // push deep into the fog to exit
      targetY = 4.7 + p * 1.0;
      lookAtY = 0.2 + p * 2.0; // look up to sky/horizon for transition
    }
    
    // Smooth dampening
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    
    lookAtZ = state.camera.position.z - 10;
    state.camera.lookAt(targetX * 0.5, lookAtY, lookAtZ);
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
        <PerspectiveCamera makeDefault fov={isMobile ? 60 : 50} position={[0, 1.2, 6]} />
        
        {/* Warm Golden Hour Atmosphere */}
        <color attach="background" args={['#e3c298']} />
        {/* Depth Fog hides the horizon naturally */}
        <fogExp2 attach="fog" args={['#e3c298', 0.015]} />
        
        <SceneCamera scrollProgress={scrollProgress} />
        
        {/* Beautiful warm morning farm lighting */}
        <ambientLight intensity={1.2} color="#FFF1E0" />
        <directionalLight 
          position={[20, 15, -20]} 
          intensity={3.5} 
          color="#FFDAB9" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-10, 5, 10]} intensity={1.0} color="#E6C280" />
        
        <RiceField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
