import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GRID_SIZE = 128;
const SPACING = 0.3;
const WAVE_SPEED = 0.3;
const WAVE_HEIGHT = 2;

function WaveGridParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const amplitudesRef = useRef<Float32Array | null>(null);

  const NUM_CIRCLES = 18;
  const CIRCLE_RADIUS = 7;
  const circleCentersRef = useRef<{ x: number; z: number; phase: number }[]>([]);

  const BACKGROUND_COLOR = [0.13, 0.13, 0.23];
  const LIGHTER_COLOR = [0.7, 0.8, 1.0];

  function lerpColor(a: number[], b: number[], t: number): number[] {
    return [
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    ];
  }

  useEffect(() => {
    const positions = [];
    const amplitudes = [];
    const centers = [];
    for (let i = 0; i < NUM_CIRCLES; i++) {
      centers.push({
        x: (Math.random() - 0.5) * GRID_SIZE * SPACING,
        z: (Math.random() - 0.5) * GRID_SIZE * SPACING,
        phase: Math.random() * Math.PI * 2,
      });
    }
    circleCentersRef.current = centers;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const xPos = (x - GRID_SIZE / 2) * SPACING;
        const zPos = (z - GRID_SIZE / 2) * SPACING;
        positions.push(xPos, 0, zPos);
        amplitudes.push(0.5 + Math.random());
      }
    }
    positionsRef.current = new Float32Array(positions);
    amplitudesRef.current = new Float32Array(amplitudes);
  }, []);

  const positions = React.useMemo(() => {
    const arr = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const xPos = (x - GRID_SIZE / 2) * SPACING;
        const zPos = (z - GRID_SIZE / 2) * SPACING;
        arr.push(xPos, 0, zPos);
      }
    }
    return new Float32Array(arr);
  }, []);

  const colors = useRef<Float32Array>(new Float32Array(GRID_SIZE * GRID_SIZE * 3));

  useFrame(({ clock }) => {
    if (!pointsRef.current || !positionsRef.current || !amplitudesRef.current || !circleCentersRef.current.length) return;
    const t = clock.getElapsedTime() * WAVE_SPEED;
    const positions = positionsRef.current;
    const amplitudes = amplitudesRef.current;
    const centers = circleCentersRef.current;
    const centerOffset = (GRID_SIZE / 2 - 0.5) * SPACING;
    for (let x = 0, i = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++, i++) {
        const idx = i;
        const posIdx = i * 3;
        const xVal = positions[posIdx];
        const zVal = positions[posIdx + 2];
        const xCentered = xVal - centerOffset;
        const zCentered = zVal - centerOffset;
        const amp = amplitudes[idx];
        const y = amp * (
          Math.sin(t + xCentered * 0.25 + zCentered * 0.18) * WAVE_HEIGHT * 0.5 +
          Math.sin(t * 1.3 - xCentered * 0.15 + zCentered * 0.22) * WAVE_HEIGHT * 0.3 +
          Math.sin(t * 0.7 + xCentered * 0.12 - zCentered * 0.27) * WAVE_HEIGHT * 0.2
        );
        pointsRef.current.geometry.attributes.position.setY(idx, y);
        let maxPulse = 0;
        for (let c = 0; c < centers.length; c++) {
          const dx = xVal - centers[c].x;
          const dz = zVal - centers[c].z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < CIRCLE_RADIUS) {
            const pulse = Math.sin(t + centers[c].phase) * (1 - dist / CIRCLE_RADIUS);
            if (pulse > maxPulse) maxPulse = pulse;
          }
        }
        let color;
        if (maxPulse > 0.95) {
          color = BACKGROUND_COLOR;
        } else {
          const tColor = Math.max(0, maxPulse / 0.95);
          color = lerpColor(BACKGROUND_COLOR, LIGHTER_COLOR, tColor);
        }
        colors.current[idx * 3 + 0] = color[0];
        colors.current[idx * 3 + 1] = color[1];
        colors.current[idx * 3 + 2] = color[2];
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    if (pointsRef.current.geometry.attributes.color) {
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  React.useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors.current, 3));
    }
  }, [positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.01}
        transparent
        opacity={1}
        toneMapped={false}
        sizeAttenuation={true}
        alphaTest={0.1}
      />
    </points>
  );
}

function WaveGridBackground() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at 60% 40%, #191820 60%, #1d1d2b 100%)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 10, 48], fov: 20 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#6ee7b7" />
        <WaveGridParticles />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={80}
          autoRotate={true}
          autoRotateSpeed={-0.1}
        />
      </Canvas>
    </div>
  );
}

export default WaveGridBackground; 