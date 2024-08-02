// components/ThreeScene.js
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const CameraControls = ({ direction }) => {
  const { camera } = useThree();
  const speed = 0.1;

  useFrame(() => {
    if (direction.forward) camera.position.z -= speed;
    if (direction.backward) camera.position.z += speed;
    if (direction.left) camera.position.x -= speed;
    if (direction.right) camera.position.x += speed;
  });

  return null;
};

const RandomBox = ({ position }) => {
  const boxRef = useRef();
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (boxRef.current) {
      boxRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <mesh ref={boxRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
    </mesh>
  );
};

const ControllerInterface = ({ onDirectionChange }) => {
  const buttonStyle = {
    width: '50px',
    height: '50px',
    fontSize: '24px',
    margin: '5px',
    textAlign: 'center',
    lineHeight: '50px',
    cursor: 'pointer',
  };

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={buttonStyle}
          onMouseDown={() => onDirectionChange('forward', true)}
          onMouseUp={() => onDirectionChange('forward', false)}
          onTouchStart={() => onDirectionChange('forward', true)}
          onTouchEnd={() => onDirectionChange('forward', false)}
        >
          ↑
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={buttonStyle}
            onMouseDown={() => onDirectionChange('left', true)}
            onMouseUp={() => onDirectionChange('left', false)}
            onTouchStart={() => onDirectionChange('left', true)}
            onTouchEnd={() => onDirectionChange('left', false)}
          >
            ←
          </div>
          <div
            style={buttonStyle}
            onMouseDown={() => onDirectionChange('right', true)}
            onMouseUp={() => onDirectionChange('right', false)}
            onTouchStart={() => onDirectionChange('right', true)}
            onTouchEnd={() => onDirectionChange('right', false)}
          >
            →
          </div>
        </div>
        <div
          style={buttonStyle}
          onMouseDown={() => onDirectionChange('backward', true)}
          onMouseUp={() => onDirectionChange('backward', false)}
          onTouchStart={() => onDirectionChange('backward', true)}
          onTouchEnd={() => onDirectionChange('backward', false)}
        >
          ↓
        </div>
      </div>
    </div>
  );
};

const ThreeScene = () => {
  const [direction, setDirection] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const handleDirectionChange = (dir, state) => {
    setDirection((prev) => ({ ...prev, [dir]: state }));
  };

  const randomPositions = [
    [-5, 1, -5],
    [3, -1, -10],
    [-10, -2, -15],
    [7, 2, -20],
    [5, -3, -25],
    [-15, 3, -30],
    [10, 1, -35],
    [0, 0, -40],
  ];

  return (
    <>
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 1, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="blue" />
        <CameraControls direction={direction} />
        {randomPositions.map((position, index) => (
          <RandomBox key={index} position={position} />
        ))}
        <Text
          fontSize={0.5}
          color="white"
          position={[0, 0, 0]}
          anchorX="center"
          anchorY="middle"
        >
          Yantra Inc,
          Software Company of
          Birtamode, Jhapa, NP
        </Text>
      </Canvas>
      <ControllerInterface onDirectionChange={handleDirectionChange} />
    </>
  );
};

export default ThreeScene;