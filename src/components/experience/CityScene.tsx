"use client";

import { useMemo } from "react";
import ProjectBuilding from "@/components/experience/ProjectBuilding";
import FlagshipBuilding from "@/components/experience/FlagshipBuilding";
import AuraOperationsBuilding from "@/components/experience/AuraOperationsBuilding";
import RenacerMascotasBuilding from "@/components/experience/RenacerMascotasBuilding";
import LocosDigitalBuilding from "@/components/experience/LocosDigitalBuilding";
import { projects } from "@/data/projects";
import { useProjectStore } from "@/store/useProjectStore";
import BackgroundBuilding from "@/components/experience/BackgroundBuilding";
import NextProjectBuilding from "@/components/experience/NextProjectBuilding";
import { buildingDimensions } from "@/lib/city-camera";

type BuildingData = {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
};

export default function CityScene() {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);

  const buildings = useMemo<BuildingData[]>(() => {
    const result: BuildingData[] = [];

    for (let row = 0; row < 16; row++) {
      const z = -row * 5 - 8;

      for (let side = -1; side <= 1; side += 2) {
        const count = 4;

        for (let i = 0; i < count; i++) {
          const width = 1.6 + ((row + i) % 3) * 0.55;
          const height = 3.6 + ((row * 2 + i * 3) % 7) * 1.05;
          const depth = 1.8 + ((row + i * 2) % 3) * 0.4;

          const laneOffset = 4.5;
          const x =
            side * (laneOffset + i * 2.9 + ((row + i) % 2) * 0.45);

          // Keep the entire project lot clear, including its enlarged glow.
          const overlapsProject = projects.some(({ city, buildingVariant }) => {
            const footprint = buildingDimensions(buildingVariant, city.scale);
            return Math.abs(x - city.position[0]) < (width + footprint.width * 1.16) / 2 + 0.8 &&
              Math.abs(z - city.position[2]) < (depth + footprint.depth * 1.16) / 2 + 0.8;
          });
          const overlapsConstruction = Math.abs(x) < (width + 7) / 2 + 0.8 &&
            Math.abs(z + 70) < (depth + 7) / 2 + 0.8;
          if (overlapsProject || overlapsConstruction) continue;

          result.push({
            x,
            z,
            width,
            height,
            depth,
          });
        }
      }
    }

    return result;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, -40]}
      >
        <planeGeometry args={[60, 120]} />

        <meshStandardMaterial
          color="#02050a"
          metalness={0.3}
          roughness={0.85}
        />
      </mesh>

      {/* Central road */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.76, -40]}
      >
        <planeGeometry args={[6, 120]} />

        <meshStandardMaterial
          color="#050913"
          metalness={0.55}
          roughness={0.55}
        />
      </mesh>

      {/* Road center line */}
      {Array.from({ length: 24 }).map((_, index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.72, -index * 4 - 4]}
        >
          <planeGeometry args={[0.08, 1.5]} />

          <meshBasicMaterial
            color="#4f8cff"
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}

      {/* Nearby scenery fades before it becomes a cropped foreground wall. */}
      {buildings.map((building, index) => (
        <BackgroundBuilding key={index} building={building} muted={!!selectedProjectId} />
      ))}
      {/* Project buildings share their coordinates with the focus camera. */}
      {projects.map((project) => project.buildingVariant === "flagship" ? (
        <FlagshipBuilding key={project.id} id={project.id}
          title={project.id === "jardines-web-2026" ? "JARDINES\nDEL RENACER" : project.shortTitle.toUpperCase()}
          subtitle={`DIGITAL ECOSYSTEM ${project.year}`} accent={project.accent}
          position={project.city.position} scale={project.city.scale} />
      ) : project.buildingVariant === "operations" ? (
        <AuraOperationsBuilding key={project.id} id={project.id} title={project.shortTitle}
          accent={project.accent} position={project.city.position} scale={project.city.scale} />
      ) : project.buildingVariant === "pets" ? (
        <RenacerMascotasBuilding key={project.id} id={project.id} title={project.shortTitle}
          accent={project.accent} position={project.city.position} scale={project.city.scale} />
      ) : project.buildingVariant === "agency" ? (
        <LocosDigitalBuilding key={project.id} id={project.id} title={project.shortTitle}
          accent={project.accent} position={project.city.position} scale={project.city.scale} />
      ) : (
        <ProjectBuilding
          key={project.id}
          id={project.id}
          title={project.shortTitle}
          accent={project.accent}
          variant={project.buildingVariant}
          position={project.city.position}
          scale={project.city.scale}
        />
      ))}
      <NextProjectBuilding />

      {/* Avenue lamps: emissive fixtures add detail without extra point lights. */}
      {Array.from({ length: 14 }, (_, index) => (
        <group key={index} position={[(index % 2 === 0 ? -1 : 1) * (index >= 12 ? 4.2 : 3.2), -0.9, -index * 5 - 8]}>
          <mesh>
            <boxGeometry args={[0.08, 1.8, 0.08]} />
            <meshBasicMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshBasicMaterial color={index % 3 === 0 ? "#22d3ee" : "#4f8cff"} />
          </mesh>
        </group>
      ))}
      {/* City lights */}
      <pointLight
        position={[0, 3, -12]}
        intensity={16}
        distance={24}
        color="#4f8cff"
      />

      <pointLight
        position={[-8, 1, -25]}
        intensity={10}
        distance={18}
        color="#22d3ee"
      />

      <pointLight
        position={[8, 2, -35]}
        intensity={9}
        distance={20}
        color="#8b5cf6"
      />
    </group>
  );
}



