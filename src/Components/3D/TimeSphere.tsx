import React, { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isHovered: boolean;
}

const Card: React.FC<CardProps> = ({ position, rotation, index, onHoverStart, onHoverEnd, isHovered }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Get the card's outward direction (local Z axis)
      const cardDirection = new THREE.Vector3(0, 0, -1);
      cardDirection.applyEuler(new THREE.Euler(rotation[0], rotation[1], rotation[2]));
      
      // Get camera direction
      const cameraDirection = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDirection);
      
      // Calculate dot product to determine visibility
      const dotProduct = cardDirection.dot(cameraDirection);
      setIsVisible(dotProduct < -0.3); // More strict threshold for visibility
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation}
      onPointerEnter={isVisible ? onHoverStart : undefined}
      onPointerLeave={isVisible ? onHoverEnd : undefined}
    >
      {/* Card geometry - thin box */}
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshStandardMaterial 
        color={isHovered ? "yellow" : `hsl(${(index * 7.2) % 360}, 70%, 60%)`}
        metalness={0.3}
        roughness={0.4}
        emissive={isHovered ? "yellow" : "black"}
        emissiveIntensity={isHovered ? 0.3 : 0}
      />
      {/* Red dot at the center of the outward face */}
      <mesh position={[0, 0, -0.55]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={isVisible ? "green" : "red"} />
      </mesh>
    </mesh>
  );
};

const CardSphere: React.FC<{ onHoverStart: () => void; onHoverEnd: () => void; hoveredIndex: number | null }> = ({ onHoverStart, onHoverEnd, hoveredIndex }) => {
  const cards = useMemo(() => {
    const cardPositions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const sphereRadius = 8;
    const numCards = 50;

    // Generate positions using spherical coordinates
    for (let i = 0; i < numCards; i++) {
      // Use golden ratio to distribute points evenly on sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / numCards);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      // Convert to Cartesian coordinates
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      // Calculate rotation to make card face outward
      const cardDirection = new THREE.Vector3(x, y, z).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(cardDirection, up).normalize();
      const cardUp = new THREE.Vector3().crossVectors(right, cardDirection).normalize();

      // Create rotation matrix
      const rotationMatrix = new THREE.Matrix4();
      rotationMatrix.makeBasis(right, cardUp, cardDirection.multiplyScalar(-1));

      // Extract Euler angles
      const euler = new THREE.Euler();
      euler.setFromRotationMatrix(rotationMatrix);

      cardPositions.push({
        position: [x, y, z],
        rotation: [euler.x, euler.y, euler.z]
      });
    }

    return cardPositions;
  }, []);

  return (
    <group>
      {cards.map((card, index) => (
        <Card
          key={index}
          position={card.position}
          rotation={card.rotation}
          index={index}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          isHovered={hoveredIndex === index}
        />
      ))}
    </group>
  );
};

const TimeSphere: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const handleHoverStart = () => {
    setIsAutoRotating(false);
  };

  const handleHoverEnd = () => {
    setIsAutoRotating(true);
    setHoveredIndex(null);
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #9b5fa3 100%)' }}
      shadows
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Card Sphere */}
      <CardSphere 
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        hoveredIndex={hoveredIndex}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={isAutoRotating}
        autoRotateSpeed={0.5}
        minDistance={10}
        maxDistance={40}
      />
    </Canvas>
  );
};

export default TimeSphere; 