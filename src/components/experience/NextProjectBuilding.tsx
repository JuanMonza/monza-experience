"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function NextProjectBuilding() {
  const craneRef =
    useRef<THREE.Group>(null);

  const lightRef =
    useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (craneRef.current) {
      craneRef.current.rotation.y =
        Math.sin(
          state.clock.elapsedTime * 0.25,
        ) * 0.18;
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        6 +
        Math.sin(
          state.clock.elapsedTime * 2,
        ) *
          2;
    }
  });

  return (
    <group position={[0, -1.1, -70]}>
      {/* Foundation */}
      <mesh>
        <boxGeometry args={[7, 1.4, 7]} />

        <meshStandardMaterial
          color="#070b12"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Skeleton structure */}
      {[-2.4, 0, 2.4].map((x) =>
        [-2.4, 0, 2.4].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 3.5, z]}
          >
            <boxGeometry
              args={[0.12, 7, 0.12]}
            />

            <meshBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.65}
            />
          </mesh>
        )),
      )}

      {/* Floors under construction */}
      {[1.5, 3, 4.5, 6].map(
        (y) => (
          <mesh
            key={y}
            position={[0, y, 0]}
          >
            <boxGeometry
              args={[6, 0.08, 6]}
            />

            <meshBasicMaterial
              color="#4f8cff"
              transparent
              opacity={0.2}
            />
          </mesh>
        ),
      )}

      {/* Crane */}
      <group
        ref={craneRef}
        position={[2.7, 5.5, 2.7]}
      >
        <mesh>
          <boxGeometry
            args={[0.18, 10, 0.18]}
          />

          <meshBasicMaterial
            color="#94a3b8"
          />
        </mesh>

        <mesh
          position={[-2.5, 4.5, 0]}
        >
          <boxGeometry
            args={[5, 0.15, 0.15]}
          />

          <meshBasicMaterial
            color="#94a3b8"
          />
        </mesh>
      </group>

      <Text
        position={[0, 8.5, 0]}
        fontSize={0.55}
        color="#60a5fa"
        anchorX="center"
      >
        NEXT PROJECT
      </Text>

      <Text
        position={[0, 7.7, 0]}
        fontSize={0.22}
        color="#64748b"
        anchorX="center"
      >
        ALWAYS BUILDING
      </Text>

      <pointLight
        ref={lightRef}
        position={[0, 6, 1]}
        intensity={7}
        distance={16}
        color="#4f8cff"
      />
      <Text position={[0, 7.15, 0]} fontSize={0.18} color="#94a3b8" anchorX="center">
        UNDER CONSTRUCTION / 78%
      </Text>
      <mesh position={[0, 6.75, 0]}>
        <planeGeometry args={[3.2, 0.06]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-3.2 * 0.22 / 2, 6.75, 0.01]}>
        <planeGeometry args={[3.2 * 0.78, 0.06]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
}
