"use client";

import { Billboard, Text, useCursor } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useProjectStore } from "@/store/useProjectStore";

type AuraOperationsBuildingProps = {
  id: string;
  title: string;
  accent: string;
  position: [number, number, number];
  scale: [number, number, number];
};

export default function AuraOperationsBuilding({
  id,
  title,
  accent,
  position,
  scale,
}: AuraOperationsBuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const hoveredProjectId = useProjectStore(
    (state) => state.hoveredProjectId,
  );

  const selectedProjectId = useProjectStore(
    (state) => state.selectedProjectId,
  );

  const hoverProject = useProjectStore(
    (state) => state.hoverProject,
  );

  const selectProject = useProjectStore(
    (state) => state.selectProject,
  );

  const hovered = hoveredProjectId === id;
  const selected = selectedProjectId === id;

  const muted = !!selectedProjectId && !selected;
  useCursor(hovered && !muted);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (ringARef.current) {
      ringARef.current.rotation.z += delta * 0.24;
      ringARef.current.rotation.x =
        Math.PI / 2 + Math.sin(time * 0.35) * 0.12;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z -= delta * 0.15;
      ringBRef.current.rotation.y =
        Math.PI / 2 + Math.cos(time * 0.3) * 0.15;
    }

    if (coreRef.current) {
      const material =
        coreRef.current.material as THREE.MeshBasicMaterial;

      material.opacity = muted ? 0.02 : selected
          ? 0.95
          : hovered
            ? 0.8
            : 0.55 + Math.sin(time * 2.4) * 0.12;
    }

    if (groupRef.current) {
      const targetScale =
        selected ? 1.08 : hovered ? 1.04 : 1;

      groupRef.current.scale.x =
        THREE.MathUtils.lerp(
          groupRef.current.scale.x,
          targetScale,
          1 - Math.exp(-4.5 * Math.min(delta, 0.1)),
        );

      groupRef.current.scale.y =
        THREE.MathUtils.lerp(
          groupRef.current.scale.y,
          targetScale,
          1 - Math.exp(-4.5 * Math.min(delta, 0.1)),
        );

      groupRef.current.scale.z =
        THREE.MathUtils.lerp(
          groupRef.current.scale.z,
          targetScale,
          1 - Math.exp(-4.5 * Math.min(delta, 0.1)),
        );
    }
  });

  const [width, height, depth] = scale;

  function handleClick(
    event: ThreeEvent<MouseEvent>,
  ) {
    event.stopPropagation();
    selectProject(id);
  }

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1] - height / 2 - 0.75, position[2]]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        hoverProject(id);
      }}
      onPointerLeave={() => {
        if (useProjectStore.getState().hoveredProjectId === id) hoverProject(null);
      }}
      onClick={handleClick}
    >
      <group position={[0, height / 2 + 0.75, 0]}>
      {/* Base */}
      <mesh
        position={[0, -height / 2 - 0.4, 0]}
      >
        <cylinderGeometry
          args={[
            width * 0.9,
            width,
            0.7,
            12,
          ]}
        />

        <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
          color="#090b14"
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>

      <mesh position={[0, -height * 0.435 - 0.025, 0]}>
        <cylinderGeometry args={[width * 0.5, width * 0.6, height * 0.15 + 0.05, 12]} />
        <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted} color="#111021" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Main operations tower */}
      <mesh>
        <cylinderGeometry
          args={[
            width * 0.34,
            width * 0.5,
            height * 0.72,
            12,
          ]}
        />

        <meshPhysicalMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
          color="#0b0a19"
          metalness={0.72}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Lower modules */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * width * 0.52,
            -height * 0.12,
            0,
          ]}
        >
          <boxGeometry
            args={[
              width * 0.38,
              height * 0.28,
              depth * 0.8,
            ]}
          />

          <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
            color="#111021"
            metalness={0.65}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Core */}
      <mesh
        ref={coreRef}
        position={[0, 0.6, depth * 0.38]}
      >
        <sphereGeometry
          args={[
            width * 0.22,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={muted ? 0.04 : 0.65}
        />
      </mesh>

      {/* Ring A */}
      <mesh
        ref={ringARef}
        position={[0, 0.8, 0]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            width * 0.46,
            0.055,
            16,
            80,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={muted ? 0.04 : 0.9}
        />
      </mesh>

      {/* Ring B */}
      <mesh
        ref={ringBRef}
        position={[0, 1.5, 0]}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            width * 0.58,
            0.035,
            12,
            80,
          ]}
        />

        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={muted ? 0.04 : 0.55}
        />
      </mesh>

      {/* Antennas */}
      {[-0.28, 0, 0.28].map((offset) => (
        <mesh
          key={offset}
          position={[
            offset * width,
            height * 0.47,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              0.035,
              0.035,
              height * 0.22,
              8,
            ]}
          />

          <meshBasicMaterial
            color={accent}
          />
        </mesh>
      ))}

      {/* Holographic panels */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * width * 0.78,
            height * 0.12,
            depth * 0.1,
          ]}
          rotation={[
            0,
            side === -1 ? 0.18 : -0.18,
            0,
          ]}
        >
          <planeGeometry
            args={[
              width * 0.44,
              height * 0.2,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={muted ? 0.04 : 0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <Billboard position={[0, height / 2 + 2, 0]}>
        <Text maxWidth={7.5} textAlign="center" fontSize={0.5}
          color={muted ? "#334155" : "#ffffff"} anchorX="center" anchorY="middle">
          {title.toUpperCase()}
        </Text>
        <Text position={[0, -0.6, 0]} maxWidth={7.5} textAlign="center" fontSize={0.18}
          color={muted ? "#334155" : accent} anchorX="center" anchorY="middle">
          OPERATIONS COMMAND CENTER
        </Text>
      </Billboard>
      <pointLight
        position={[0, 2, 3]}
        intensity={muted ? 0 : selected
            ? 24
            : hovered
              ? 18
              : 12
        }
        distance={18}
        color={accent}
      />
      </group>
    </group>
  );
}


