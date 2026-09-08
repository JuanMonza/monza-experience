"use client";

import { Billboard, Edges, Text, useCursor } from "@react-three/drei";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SELECTED_BUILDING_SCALE } from "@/lib/city-camera";
import { useProjectStore } from "@/store/useProjectStore";

type Props = {
  id: string; title: string; subtitle?: string; accent: string;
  position: [number, number, number]; scale: [number, number, number];
};

export default function FlagshipBuilding({ id, title, subtitle = "DIGITAL ECOSYSTEM 2026", accent, position, scale }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const hovered = useProjectStore((state) => state.hoveredProjectId === id);
  const selected = useProjectStore((state) => state.selectedProjectId === id);
  const muted = useProjectStore((state) => state.selectedProjectId !== null && state.selectedProjectId !== id);
  const [width, height, depth] = scale;
  useCursor(hovered && !muted);
  const surface = { transparent: true, opacity: muted ? 0.12 : 1, depthWrite: !muted,
    emissive: "#102440", emissiveIntensity: muted ? 0.05 : 0.55 };
  const lightOpacity = muted ? 0.08 : selected ? 1 : hovered ? 0.85 : 0.6;

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      const value = THREE.MathUtils.damp(groupRef.current.scale.x, selected ? SELECTED_BUILDING_SCALE : hovered ? 1.045 : 1, 5, delta);
      groupRef.current.scale.setScalar(value);
    }
    if (ringRef.current) {
      // Bounded tilt keeps the animated crown inside its camera envelope.
      ringRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.08;
      ringRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.05;
    }
    if (haloRef.current) haloRef.current.material.opacity = muted ? 0.008 : selected ? 0.12 :
      (hovered ? 0.075 : 0.045) + Math.sin(clock.elapsedTime * 1.8) * 0.012;
  });

  function select(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    useProjectStore.getState().selectProject(id);
  }

  return (
    <group ref={groupRef} position={[position[0], position[1] - height / 2 - 0.6, position[2]]}
      onClick={select}
      onPointerOver={(event) => { event.stopPropagation(); useProjectStore.getState().hoverProject(id); }}
      onPointerOut={() => { if (useProjectStore.getState().hoveredProjectId === id) useProjectStore.getState().hoverProject(null); }}>
      {/* A grounded plaza supports the tower; scaling never sinks the foundation. */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[width * 0.82, width * 0.9, 0.6, 32]} />
        <meshStandardMaterial {...surface} color="#0c1728" metalness={0.55} roughness={0.32} />
        <Edges color={accent} transparent opacity={lightOpacity * 0.7} />
      </mesh>
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[width * 0.68, 0.04, 12, 72]} />
        <meshBasicMaterial color={accent} transparent opacity={lightOpacity} depthWrite={false} />
      </mesh>
      <group position={[0, height / 2 + 0.6, 0]}>
        <mesh>
          <boxGeometry args={scale} />
          <meshPhysicalMaterial {...surface} color="#0e2037" metalness={0.65} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} />
          <Edges color={accent} transparent opacity={lightOpacity} />
        </mesh>
        <mesh position={[0, 0, depth / 2 + 0.025]}>
          <planeGeometry args={[width * 0.78, height * 0.82]} />
          <meshPhysicalMaterial color="#1a416b" transparent opacity={muted ? 0.03 : 0.3} transmission={muted ? 0 : 0.18}
            roughness={0.05} metalness={0.1} depthWrite={false} />
        </mesh>
        {[-0.32, -0.16, 0, 0.16, 0.32].map((offset) => (
          <mesh key={offset} position={[offset * width, 0, depth / 2 + 0.04]}>
            <planeGeometry args={[0.045, height * 0.74]} />
            <meshBasicMaterial color={accent} transparent opacity={lightOpacity} depthWrite={false} />
          </mesh>
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <mesh key={index} position={[0, -height / 2 + 1 + index * height / 9, depth / 2 + 0.045]}>
            <planeGeometry args={[width * 0.72, 0.035]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={lightOpacity * 0.5} depthWrite={false} />
          </mesh>
        ))}
        <mesh position={[0, height / 2 + 0.45, 0]}>
          <cylinderGeometry args={[width * 0.34, width * 0.4, 0.5, 8]} />
          <meshStandardMaterial {...surface} color="#142b48" metalness={0.7} roughness={0.16} />
        </mesh>
        <mesh ref={ringRef} position={[0, height / 2 + 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[width * 0.36, 0.035, 12, 72]} />
          <meshBasicMaterial color={accent} transparent opacity={lightOpacity} depthWrite={false} />
        </mesh>
        <mesh ref={haloRef} position={[0, height * 0.03, 0]} scale={[1.15, 1.06, 1.15]}>
          <boxGeometry args={scale} />
          <meshBasicMaterial color={accent} transparent opacity={0.05} side={THREE.BackSide} depthWrite={false} />
        </mesh>
        <Billboard position={[0, height / 2 + 2.6, 0]}>
          <Text fontSize={0.56} maxWidth={7.5} textAlign="center" color="white" fillOpacity={muted ? 0.15 : 1}
            anchorX="center" anchorY="middle" lineHeight={1.1}>{title}</Text>
          <Text position={[0, -1, 0]} fontSize={0.2} maxWidth={7.5} color={accent} fillOpacity={muted ? 0.15 : 1}
            anchorX="center" anchorY="middle">{subtitle}</Text>
        </Billboard>
        <pointLight position={[0, height / 2, 3]} intensity={muted ? 1 : selected ? 30 : 22} distance={18} color={accent} />
        <pointLight position={[0, -height / 3, 2]} intensity={muted ? 1 : 10} distance={12} color="#22d3ee" />
      </group>
    </group>
  );
}
