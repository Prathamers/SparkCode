import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as THREE from 'three';

export interface ThreeStageHandle {
  createCube: () => void;
  rotateObject: (degrees: number, axis: 'X' | 'Y' | 'Z') => void;
  reset: () => void;
}

interface CubeData {
  id: string;
  rotation: [number, number, number];
}

const Cube: React.FC<{ data: CubeData }> = ({ data }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = data.rotation[0];
      meshRef.current.rotation.y = data.rotation[1];
      meshRef.current.rotation.z = data.rotation[2];
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial color="hotpink" />
    </Box>
  );
};

export const ThreeStage = forwardRef<ThreeStageHandle, {}>((_props, ref) => {
  const [cubes, setCubes] = useState<CubeData[]>([]);

  useImperativeHandle(ref, () => ({
    createCube: () => {
      setCubes(prev => [...prev, { id: Math.random().toString(), rotation: [0, 0, 0] }]);
    },
    rotateObject: (degrees: number, axis: 'X' | 'Y' | 'Z') => {
      setCubes(prev => prev.map(cube => {
        const newRotation = [...cube.rotation] as [number, number, number];
        const rads = degrees * (Math.PI / 180);
        if (axis === 'X') newRotation[0] += rads;
        if (axis === 'Y') newRotation[1] += rads;
        if (axis === 'Z') newRotation[2] += rads;
        return { ...cube, rotation: newRotation };
      }));
    },
    reset: () => {
      setCubes([]);
    }
  }));

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {cubes.map(cube => (
          <Cube key={cube.id} data={cube} />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
});

ThreeStage.displayName = 'ThreeStage';
