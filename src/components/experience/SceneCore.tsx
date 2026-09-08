"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function SceneCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * 0.15,
      0.03,
    );

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mouseX * 0.08,
      0.03,
    );
  });

  return (
    <group ref={groupRef}>
      {/* Núcleo */}
      <mesh>
        <icosahedronGeometry args={[1.55, 5]} />

        <meshPhysicalMaterial
          color="#0d111c"
          metalness={0.75}
          roughness={0.18}
          transmission={0.2}
          thickness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Wireframe exterior */}
      <mesh scale={1.04}>
        <icosahedronGeometry args={[1.55, 2]} />

        <meshBasicMaterial
          color="#4f8cff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Halo */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}