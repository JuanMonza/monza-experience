"use client";

import { Billboard, Text, useCursor } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useProjectStore } from "@/store/useProjectStore";

type LocosDigitalBuildingProps = {
  id: string;
  title: string;
  accent: string;
  position: [number, number, number];
  scale: [number, number, number];
};

export default function LocosDigitalBuilding({
  id,
  title,
  accent,
  position,
  scale,
}: LocosDigitalBuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const panelARef = useRef<THREE.Mesh>(null);
  const panelBRef = useRef<THREE.Mesh>(null);

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

    if (panelARef.current) {
      panelARef.current.rotation.y =
        Math.sin(time * 0.55) * 0.08;
    }

    if (panelBRef.current) {
      panelBRef.current.rotation.y =
        -Math.PI / 2 - Math.sin(time * 0.45) * 0.06;
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
      position={[position[0], position[1] - height / 2 - 0.625, position[2]]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        hoverProject(id);
      }}
      onPointerLeave={() => {
        if (useProjectStore.getState().hoveredProjectId === id) hoverProject(null);
      }}
      onClick={handleClick}
    >
      <group position={[0, height / 2 + 0.625, 0]}>
      {/* Base */}
      <mesh
        position={[
          0,
          -height / 2 - 0.35,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.88,
            width,
            0.55,
            10,
          ]}
        />

        <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
          color="#120b04"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, -height / 2 - 0.0375, 0]}>
        <boxGeometry args={[width, 0.075, depth]} />
        <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted} color="#15100a" />
      </mesh>
      {/* Main tower */}
      <mesh>
        <boxGeometry args={scale} />

        <meshPhysicalMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
          color="#15100a"
          metalness={0.82}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Front media frame */}
      <mesh
        position={[
          0,
          0.2,
          depth / 2 + 0.05,
        ]}
      >
        <boxGeometry
          args={[
            width * 0.78,
            height * 0.58,
            0.08,
          ]}
        />

        <meshBasicMaterial
          color="#1a1108"
        />
      </mesh>

      {/* Main LED screen */}
      <mesh
        ref={panelARef}
        position={[
          0,
          0.4,
          depth / 2 + 0.3,
        ]}
      >
        <planeGeometry
          args={[
            width * 0.7,
            height * 0.5,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={selected ? 0.34 : hovered ? 0.26 : 0.16}
        />
      </mesh>

      {/* Secondary side screen */}
      <mesh
        ref={panelBRef}
        position={[
          width * 0.5 + 0.2,
          -height * 0.08,
          0,
        ]}
        rotation={[
          0,
          -Math.PI / 2,
          0,
        ]}
      >
        <planeGeometry
          args={[
            depth * 0.72,
            height * 0.38,
          ]}
        />

        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={muted ? 0.04 : 0.14}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Accent strips */}
      {[-0.34, 0.34].map((offset) => (
        <mesh
          key={offset}
          position={[
            offset * width,
            0,
            depth / 2 + 0.08,
          ]}
        >
          <planeGeometry
            args={[
              0.05,
              height * 0.82,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={muted ? 0.04 : 0.72}
          />
        </mesh>
      ))}

      {/* Rooftop media modules */}
      {[-0.8, 0, 0.8].map((x, index) => (
        <mesh
          key={x}
          position={[
            x,
            height / 2 + 0.4,
            0,
          ]}
          rotation={[
            0,
            0,
            index % 2 === 0 ? 0.12 : -0.12,
          ]}
        >
          <boxGeometry
            args={[
              width * 0.2,
              0.75,
              depth * 0.45,
            ]}
          />

          <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
            color="#1a1208"
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>
      ))}

      <Billboard position={[0, height / 2 + 1.8, 0]}>
        <Text maxWidth={7.5} textAlign="center" fontSize={0.5}
          color={muted ? "#334155" : "#ffffff"} anchorX="center" anchorY="middle">
          {title.toUpperCase()}
        </Text>
        <Text position={[0, -0.6, 0]} maxWidth={7.5} textAlign="center" fontSize={0.18}
          color={muted ? "#334155" : accent} anchorX="center" anchorY="middle">
          CREATIVE MEDIA DISTRICT
        </Text>
      </Billboard>
      <pointLight
        position={[0, 1.8, 3]}
        intensity={muted ? 0 : selected
            ? 22
            : hovered
              ? 16
              : 9
        }
        distance={16}
        color={accent}
      />
      </group>
    </group>
  );
}


