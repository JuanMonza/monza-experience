"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type ComponentRef, useRef } from "react";
import * as THREE from "three";

export type BackgroundBuildingData = {
  x: number; z: number; width: number; height: number; depth: number;
};

export default function BackgroundBuilding({ building, muted }: { building: BackgroundBuildingData; muted: boolean }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const edges = useRef<ComponentRef<typeof Edges>>(null);
  useFrame(({ camera }) => {
    if (!group.current || !material.current || !edges.current) return;
    // Keep tall nearby facades in view for a street-level scale; fade only when
    // they pass the camera, instead of hiding them to fit a distant panorama.
    const fade = muted ? 1 : THREE.MathUtils.smoothstep(camera.position.z - building.z, building.depth / 2 + 1, building.depth / 2 + 6);
    group.current.visible = fade > 0.01;
    material.current.opacity = fade * (muted ? 0.12 : 1);
    material.current.depthWrite = !muted && fade > 0.98;
    edges.current.material.opacity = fade * (muted ? 0.08 : 0.4);
  });
  return (
    <group ref={group} position={[building.x, -1.8 + building.height / 2, building.z]}>
      <mesh>
        <boxGeometry args={[building.width, building.height, building.depth]} />
        <meshStandardMaterial ref={material} color="#18243b" metalness={0.25} roughness={0.65}
          emissive="#091323" emissiveIntensity={0.4} transparent />
        <Edges ref={edges} color="#3978b8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
