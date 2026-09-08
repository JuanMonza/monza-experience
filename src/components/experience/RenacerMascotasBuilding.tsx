"use client";

import { Billboard, Text, useCursor } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useProjectStore } from "@/store/useProjectStore";

type RenacerMascotasBuildingProps = {
  id: string;
  title: string;
  accent: string;
  position: [number, number, number];
  scale: [number, number, number];
};

export default function RenacerMascotasBuilding({
  id,
  title,
  accent,
  position,
  scale,
}: RenacerMascotasBuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const domeRef = useRef<THREE.Mesh>(null);

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

  const particles = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const angle =
        (index / 14) * Math.PI * 2;

      const radius =
        scale[0] * (0.6 + (index % 3) * 0.047);

      return {
        x: Math.cos(angle) * radius,
        y: (index % 5) * 0.35 - 0.7,
        z: Math.sin(angle) * radius,
        size: 0.05 + (index % 3) * 0.02,
      };
    });
  }, [scale]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.18;
      orbitRef.current.rotation.x =
        Math.sin(time * 0.25) * 0.04;
    }

    if (domeRef.current) {
      const material =
        domeRef.current.material as THREE.MeshBasicMaterial;

      material.opacity = muted ? 0.02 : selected
          ? 0.24
          : hovered
            ? 0.16
            : 0.08 +
              Math.sin(time * 1.8) * 0.02;
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
      position={[position[0], position[1] - height / 2 - 0.6, position[2]]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        hoverProject(id);
      }}
      onPointerLeave={() => {
        if (useProjectStore.getState().hoveredProjectId === id) hoverProject(null);
      }}
      onClick={handleClick}
    >
      <group position={[0, height / 2 + 0.6, 0]}>
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
            width * 0.78,
            width * 0.9,
            0.5,
            20,
          ]}
        />

        <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
          color="#061116"
          metalness={0.35}
          roughness={0.45}
        />
      </mesh>

      <mesh position={[0, -height / 2 + (height * 0.22 - width * 0.32) / 2 - 0.05, 0]}>
        <cylinderGeometry args={[width * 0.32, width * 0.5, Math.max(0.1, height * 0.22 - width * 0.32 + 0.1), 20]} />
        <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted} color="#0b1d24" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Main organic tower */}
      <mesh>
        <capsuleGeometry
          args={[
            width * 0.32,
            height * 0.56,
            16,
            28,
          ]}
        />

        <meshPhysicalMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
          color="#07171d"
          metalness={0.32}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Side pods */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * width * 0.45,
            -height * 0.06,
            0,
          ]}
          rotation={[
            0,
            0,
            side * 0.16,
          ]}
        >
          <capsuleGeometry
            args={[
              width * 0.16,
              height * 0.3,
              12,
              20,
            ]}
          />

          <meshStandardMaterial transparent opacity={muted ? 0.12 : 1} depthWrite={!muted}
            color="#0b1d24"
            metalness={0.25}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Glass dome */}
      <mesh
        ref={domeRef}
        position={[
          0,
          height * 0.28,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            width * 0.38,
            36,
            36,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={muted ? 0.04 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner garden core */}
      <mesh
        position={[
          0,
          -height * 0.1,
          depth * 0.22,
        ]}
      >
        <sphereGeometry
          args={[
            width * 0.18,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={muted ? 0.04 : 0.75}
        />
      </mesh>

      {/* Orbiting particles */}
      <group ref={orbitRef}>
        {particles.map(
          (particle, index) => (
            <mesh
              key={index}
              position={[
                particle.x,
                particle.y,
                particle.z,
              ]}
            >
              <sphereGeometry
                args={[
                  particle.size,
                  10,
                  10,
                ]}
              />

              <meshBasicMaterial
                color={
                  index % 3 === 0
                    ? "#67e8f9"
                    : accent
                }
                transparent
                opacity={muted ? 0.04 : 0.7}
              />
            </mesh>
          ),
        )}
      </group>

      {/* Decorative light arcs */}
      {[0, 1].map((index) => (
        <mesh
          key={index}
          position={[
            0,
            -height * 0.12 +
              index * 1.15,
            depth * 0.36,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              width * (0.24 + index * 0.04),
              0.025,
              10,
              64,
              Math.PI,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={muted ? 0.04 : 0.55}
          />
        </mesh>
      ))}

      <Billboard position={[0, height / 2 + 1.15, 0]}>
        <Text maxWidth={7.5} textAlign="center" fontSize={0.5}
          color={muted ? "#334155" : "#ffffff"} anchorX="center" anchorY="middle">
          {title.toUpperCase()}
        </Text>
        <Text position={[0, -0.6, 0]} maxWidth={7.5} textAlign="center" fontSize={0.18}
          color={muted ? "#334155" : accent} anchorX="center" anchorY="middle">
          DIGITAL PET ECOSYSTEM
        </Text>
      </Billboard>
      <pointLight
        position={[0, 1.5, 3]}
        intensity={muted ? 0 : selected
            ? 20
            : hovered
              ? 14
              : 9
        }
        distance={16}
        color={accent}
      />
      </group>
    </group>
  );
}


