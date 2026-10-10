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
  
  // Drastically increased density for a much fuller, more lush field
  const clumpsCount = isMobile ? 2500 : 9000; 
  
  const leavesRef = useRef<THREE.InstancedMesh>(null);
  const paniclesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // 1. Create a single "Clump" geometry for leaves
  const clumpLeavesGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const leafCount = 10;
    for (let i = 0; i < leafCount; i++) {
      const height = 1.2 + Math.random() * 0.6;
      const width = 0.03 + Math.random() * 0.02;
      const curve = 0.15 + Math.random() * 0.25;
      
      const geom = new THREE.PlaneGeometry(width, height, 1, 6);
      geom.translate(0, height / 2, 0); 
      
      const pos = geom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const y = pos.getY(j);
        const t = y / height;
        const bend = Math.pow(t, 2) * curve; 
        
        pos.setZ(j, pos.getZ(j) + bend);
        if (t > 0.4) {
          pos.setX(j, pos.getX(j) * (1.0 - (t - 0.4) * 1.5));
        }
      }
      geom.computeVertexNormals();
      
      geom.rotateY((i / leafCount) * Math.PI * 2 + (Math.random() * 0.3));
      geom.rotateX(0.05 + Math.random() * 0.15);
      
      geometries.push(geom);
    }
    
    // Merge
    const totalVertices = geometries.reduce((sum, g) => sum + g.attributes.position.count, 0);
    const totalIndices = geometries.reduce((sum, g) => sum + (g.index ? g.index.count : 0), 0);
    const mergedPositions = new Float32Array(totalVertices * 3);
    const mergedNormals = new Float32Array(totalVertices * 3);
    const mergedUvs = new Float32Array(totalVertices * 2);
    const mergedIndices = new Uint16Array(totalIndices);
    
    let vOffset = 0; let iOffset = 0;
    geometries.forEach(g => {
      mergedPositions.set(g.attributes.position.array, vOffset * 3);
      mergedNormals.set(g.attributes.normal.array, vOffset * 3);
      mergedUvs.set(g.attributes.uv.array, vOffset * 2);
      for (let j = 0; j < g.index!.array.length; j++) mergedIndices[iOffset + j] = g.index!.array[j] + vOffset;
      vOffset += g.attributes.position.count;
      iOffset += g.index!.array.length;
    });
    
    const finalGeom = new THREE.BufferGeometry();
    finalGeom.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3));
    finalGeom.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3));
    finalGeom.setAttribute('uv', new THREE.BufferAttribute(mergedUvs, 2));
    finalGeom.setIndex(new THREE.BufferAttribute(mergedIndices, 1));
    return finalGeom;
  }, []);

  // 2. Create Panicles
  const clumpPaniclesGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const panicleCount = 4;
    for (let i = 0; i < panicleCount; i++) {
      const height = 0.6 + Math.random() * 0.4;
      const geom = new THREE.CylinderGeometry(0.015, 0.005, height, 4, 6);
      geom.translate(0, height / 2, 0);
      
      const pos = geom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const y = pos.getY(j);
        const t = y / height;
        const droop = Math.pow(t, 2) * 0.8; 
        pos.setZ(j, pos.getZ(j) + droop);
        pos.setY(j, y - droop * 0.4); 
      }
      geom.computeVertexNormals();
      
      geom.rotateY(Math.random() * Math.PI * 2);
      geom.rotateX(0.1 + Math.random() * 0.2);
      
      geometries.push(geom);
    }
    
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

  const fieldData = useMemo(() => {
    const data = [];
    const fieldWidth = 40;
    const fieldDepth = 60; 
    
    const leafPalettes = ['#7c8c5c', '#8a9a5b', '#92a362', '#6b7a4a']; // Muted olive/yellow-green
    const paniclePalettes = ['#c9a87c', '#c29f6b', '#b5925e', '#a88554']; // Earthy golden
    
    for (let i = 0; i < clumpsCount; i++) {
      const x = (Math.random() - 0.5) * fieldWidth;
      const z = 8 - Math.random() * fieldDepth; // Starts at z=8 to z=-52
      
      const y = Math.sin(x * 0.2) * 0.4 + Math.sin(z * 0.1) * 0.4 - 1.0;
      
      const scale = 0.9 + Math.random() * 0.4;
      const rotY = Math.random() * Math.PI * 2;
      
      const windPhase = x * 0.3 + z * 0.3 + Math.random();
      const windSpeed = 0.4 + Math.random() * 0.3; // Extremely slow wind
      
      data.push({ 
        x, y, z, scale, rotY, windPhase, windSpeed,
        leafColor: leafPalettes[Math.floor(Math.random() * leafPalettes.length)],
        panicleColor: paniclePalettes[Math.floor(Math.random() * paniclePalettes.length)]
      });
    }
    
    return data.sort((a, b) => a.z - b.z);
  }, [clumpsCount]);

  useEffect(() => {
    if (leavesRef.current && paniclesRef.current) {
      for (let i = 0; i < clumpsCount; i++) {
        const d = fieldData[i];
        
        // Initial setup for positions
        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(0, d.rotY, 0);
        dummy.scale.setScalar(d.scale);
        dummy.updateMatrix();
        
        leavesRef.current.setMatrixAt(i, dummy.matrix);
        paniclesRef.current.setMatrixAt(i, dummy.matrix);
        
        // Setup individual colors!
        color.set(d.leafColor);
        leavesRef.current.setColorAt(i, color);
        
        color.set(d.panicleColor);
        paniclesRef.current.setColorAt(i, color);
      }
      leavesRef.current.instanceMatrix.needsUpdate = true;
      paniclesRef.current.instanceMatrix.needsUpdate = true;
      if (leavesRef.current.instanceColor) leavesRef.current.instanceColor.needsUpdate = true;
      if (paniclesRef.current.instanceColor) paniclesRef.current.instanceColor.needsUpdate = true;
    }
  }, [clumpsCount, fieldData, dummy, color]);

  // Subtle Wind Animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (leavesRef.current && paniclesRef.current) {
      for (let i = 0; i < clumpsCount; i++) {
        const d = fieldData[i];
        
        // Very subtle breathing movement
        const swayX = Math.sin(time * d.windSpeed + d.windPhase) * 0.05;
        const swayZ = Math.cos(time * d.windSpeed * 0.8 + d.windPhase) * 0.05;
        
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
      {/* Earthy Terrain Floor */}
      <mesh position={[0, -1.2, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 100, 16, 16]} />
        <meshStandardMaterial color="#54493a" roughness={1.0} />
      </mesh>
      
      {/* Matte, Organic Leaves */}
      <instancedMesh ref={leavesRef} args={[clumpLeavesGeometry, undefined, clumpsCount]} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.9} side={THREE.DoubleSide} />
      </instancedMesh>
      
      {/* Matte Panicles */}
      <instancedMesh ref={paniclesRef} args={[clumpPaniclesGeometry, undefined, clumpsCount]} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.8} side={THREE.DoubleSide} />
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
    
    let targetZ = 6;
    let targetY = 1.0;
    let targetX = 0;
    
    let lookAtY = 1.0;
    
    // Much slower, graceful camera timeline
    if (sp < 0.35) {
      const p = sp / 0.35;
      targetZ = 6 - p * 0.5; // Almost still
    } else if (sp < 0.65) {
      const p = (sp - 0.35) / 0.30;
      targetZ = 5.5 - p * 4.0; // Very slow forward movement
      targetX = Math.sin(p * Math.PI) * 0.2; 
    } else if (sp < 0.85) {
      const p = (sp - 0.65) / 0.20;
      targetZ = 1.5 - p * 6.0;
      targetY = 1.0 + p * 2.0; // Gentle rise and reveal
      lookAtY = 1.0 - p * 0.5;
    } else {
      const p = (sp - 0.85) / 0.15;
      targetZ = -4.5 - p * 4.0; // Slow movement toward horizon (no aggressive dive)
      targetY = 3.0 + p * 0.5;
      lookAtY = 0.5;
    }
    
    // Ultra smooth dampening
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.03;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.03;
    
    state.camera.lookAt(targetX * 0.5, lookAtY, state.camera.position.z - 10);
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
        <PerspectiveCamera makeDefault fov={isMobile ? 55 : 45} position={[0, 1.0, 6]} />
        
        {/* Gentle Sky color to contrast with the white navbar text */}
        <color attach="background" args={['#9AAEA9']} />
        
        <SceneCamera scrollProgress={scrollProgress} />
        
        {/* Realistic Golden Hour Lighting */}
        <ambientLight intensity={1.5} color="#FAF0E6" />
        <directionalLight 
          position={[15, 20, -15]} 
          intensity={3.0} 
          color="#FFF5EB" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.001}
        />
        {/* Fill light */}
        <directionalLight position={[-10, 5, 10]} intensity={1.2} color="#DCD0C0" />
        
        <RiceField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
