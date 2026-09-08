"use client";

import { Billboard, Text, useCursor } from "@react-three/drei";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { buildingDimensions, SELECTED_BUILDING_SCALE } from "@/lib/city-camera";
import { useProjectStore } from "@/store/useProjectStore";
import type { BuildingVariant } from "@/data/projects";
import BuildingStructure from "@/components/experience/BuildingStructure";

type ProjectBuildingProps = {
  id: string;
  title: string;
  accent: string;
  variant: BuildingVariant;
  position: [number, number, number];
  scale?: [number, number, number];
};

export default function ProjectBuilding({ id, title, accent, variant, position, scale = [3, 7, 3] }: ProjectBuildingProps) {
  const buildingRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const dimensions = buildingDimensions(variant, scale);
  const hovered = useProjectStore((state) => state.hoveredProjectId === id);
  const selected = useProjectStore((state) => state.selectedProjectId === id);
  const muted = useProjectStore((state) => state.selectedProjectId !== null && state.selectedProjectId !== id);
  const hoverProject = useProjectStore((state) => state.hoverProject);
  const selectProject = useProjectStore((state) => state.selectProject);
  useCursor(hovered && !muted);

  useFrame((state, delta) => {
    if (!buildingRef.current || !glowRef.current) return;
    // Completed districts leave the frame before their near facades fill it.
    // The active district remains inside the corridor fitted by JourneyCamera.
    const perspective = state.camera as THREE.PerspectiveCamera;
    const tanVertical = Math.tan(THREE.MathUtils.degToRad(perspective.fov / 2));
    const ground = position[1] - scale[1] / 2;
    const requiredDistance = Math.max(
      (Math.abs(position[0] - perspective.position.x) + Math.max(dimensions.width * 1.07, 8) * 1.08 / 2) / (tanVertical * perspective.aspect),
      Math.max(Math.abs(ground - perspective.position.y), Math.abs(ground + (dimensions.labelY + 0.75) * 1.08 - perspective.position.y)) / tanVertical,
    ) + dimensions.depth * 1.07 * 1.08 / 2;
    buildingRef.current.visible = selected || muted || perspective.position.z - position[2] > requiredDistance;
    if (!buildingRef.current.visible && hovered) hoverProject(null);
    const targetScale = selected ? SELECTED_BUILDING_SCALE : hovered ? 1.045 : 1;
    const nextScale = THREE.MathUtils.damp(buildingRef.current.scale.x, targetScale, 5, delta);
    buildingRef.current.scale.setScalar(nextScale);
    glowRef.current.material.opacity = muted ? 0.015 : selected ? 0.2 : hovered ? 0.14 :
      0.07 + Math.sin(state.clock.elapsedTime * 2.3) * 0.025;
  });

  function handleClick(event: ThreeEvent<MouseEvent>) {
    if (!buildingRef.current?.visible) return;
    event.stopPropagation();
    selectProject(id);
  }

  return (
    <group
      ref={buildingRef}
      position={[position[0], position[1] - scale[1] / 2, position[2]]}
      onPointerOver={(event) => {
        if (!buildingRef.current?.visible) return;
        event.stopPropagation();
        hoverProject(id);
      }}
      onPointerOut={() => {
        if (useProjectStore.getState().hoveredProjectId === id) hoverProject(null);
      }}
      onClick={handleClick}
    >
      {/* Scale from the ground so the base never sinks below the avenue. */}
      <group position={[0, scale[1] / 2, 0]}>
        <BuildingStructure variant={variant} scale={scale} accent={accent} selected={selected} hovered={hovered} muted={muted} />
        <mesh ref={glowRef} position={[0, scale[1] * 0.02, 0]} scale={[1.07, 1.04, 1.07]}>
          {variant === "organic" || variant === "pets" ? (
            <cylinderGeometry args={[scale[0] * 0.45, scale[0] * 0.58, scale[1], 12]} />
          ) : variant === "operations" ? (
            <cylinderGeometry args={[scale[0] / 2, scale[0] / 2, scale[1], 8]} />
          ) : <boxGeometry args={scale} />}
          <meshBasicMaterial color={accent} transparent opacity={0.07} side={THREE.BackSide} depthWrite={false} />
        </mesh>
        <Billboard position={[0, dimensions.labelY - scale[1] / 2, 0]}>
          <Text
            fontSize={hovered || selected ? 0.52 : 0.44}
            maxWidth={7}
            textAlign="center"
            color={accent}
            fillOpacity={muted ? 0.15 : 1}
            anchorX="center"
            anchorY="middle"
          >
            {title.toUpperCase()}
          </Text>
        </Billboard>
        <pointLight position={[0, scale[1] / 2, 2]} intensity={muted ? 1 : selected ? 18 : hovered ? 12 : 7} distance={12} color={accent} />
      </group>
    </group>
  );
}

