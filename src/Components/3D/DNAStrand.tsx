import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const NUM_BASE_PAIRS = 48;
const HELIX_RADIUS = 2.8;
const HELIX_PITCH = 0.95;
const HELIX_TURNS = 3;
const BACKBONE_RADIUS = 0.18;
const BASE_PAIR_RADIUS = 0.28;
const CONNECTOR_RADIUS = 0.09; // Thinner for ladder look
const COLORS = ['#6ee7b7', '#f472b6', '#60a5fa', '#fbbf24'];

function DNAHelix() {
  const outerGroup = useRef<THREE.Group>(null);
  const innerGroup = useRef<THREE.Group>(null);

  // Calculate helix points and backbone points from rung ends
  const { basePairs, backbonePoints1, backbonePoints2 } = useMemo(() => {
    const basePairs = [];
    const backbonePoints1 = [];
    const backbonePoints2 = [];
    for (let i = 0; i < NUM_BASE_PAIRS; i++) {
      const t = (i / (NUM_BASE_PAIRS - 1)) * (HELIX_TURNS * Math.PI * 2);
      const y = (i - NUM_BASE_PAIRS / 2) * HELIX_PITCH;
      const x1 = Math.cos(t) * HELIX_RADIUS;
      const z1 = Math.sin(t) * HELIX_RADIUS;
      const x2 = Math.cos(t + Math.PI) * HELIX_RADIUS;
      const z2 = Math.sin(t + Math.PI) * HELIX_RADIUS;
      const left = [x1, y, z1];
      const right = [x2, y, z2];
      basePairs.push({
        left,
        right,
        color: COLORS[i % COLORS.length],
      });
      backbonePoints1.push(new THREE.Vector3(...left));
      backbonePoints2.push(new THREE.Vector3(...right));
    }
    return { basePairs, backbonePoints1, backbonePoints2 };
  }, []);

  useFrame(({ clock }) => {
    if (outerGroup.current) {
      outerGroup.current.rotation.z = Math.PI / 2; // Lay flat (horizontal)
    }
    if (innerGroup.current) {
      innerGroup.current.rotation.y = -clock.getElapsedTime() * 0.12; // Turn around long axis
    }
  });

  return (
    <group ref={outerGroup}>
      <group ref={innerGroup}>
        {/* Backbone 1 (left) */}
        <mesh>
          <tubeGeometry args={[new THREE.CatmullRomCurve3(backbonePoints1), 256, BACKBONE_RADIUS, 24, false]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.3} roughness={0.3} />
        </mesh>
        {/* Backbone 2 (right) */}
        <mesh>
          <tubeGeometry args={[new THREE.CatmullRomCurve3(backbonePoints2), 256, BACKBONE_RADIUS, 24, false]} />
          <meshStandardMaterial color="#f472b6" metalness={0.3} roughness={0.3} />
        </mesh>
        {/* Base pairs */}
        {basePairs.map((bp, i) => {
          // Calculate midpoint and quaternion for cylinder
          const start = new THREE.Vector3(...bp.left);
          const end = new THREE.Vector3(...bp.right);
          const mid = start.clone().add(end).multiplyScalar(0.5);
          const dir = end.clone().sub(start).normalize();
          const length = start.distanceTo(end);
          // Cylinder default is along Y axis, so align to dir
          const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir
          );
          return (
            <group key={i}>
              {/* Left sphere */}
              <mesh position={bp.left as [number, number, number]}>
                <sphereGeometry args={[BASE_PAIR_RADIUS, 20, 20]} />
                <meshStandardMaterial color={bp.color} />
              </mesh>
              {/* Right sphere */}
              <mesh position={bp.right as [number, number, number]}>
                <sphereGeometry args={[BASE_PAIR_RADIUS, 20, 20]} />
                <meshStandardMaterial color={bp.color} />
              </mesh>
              {/* Ladder rung connector */}
              <mesh position={mid.toArray()} quaternion={quaternion}>
                <cylinderGeometry args={[CONNECTOR_RADIUS, CONNECTOR_RADIUS, length, 20]} />
                <meshStandardMaterial color={bp.color} metalness={0.2} roughness={0.4} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

const DNAStrand: React.FC = () => (
  <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(ellipse at 60% 40%, #23213a 60%, #0a0a1a 100%)', position: 'fixed', left: 0, top: 0, zIndex: 10 }}>
    <Canvas camera={{ position: [0, 3, 12], fov: 45 }} shadows>
      <DNAHelix />
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 8, 8]} intensity={1.2} />
      <pointLight position={[-8, -8, 8]} intensity={0.8} color="#6ee7b7" />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={false}
        minDistance={3}
        maxDistance={20}
      />
    </Canvas>
  </div>
);

export default DNAStrand; 