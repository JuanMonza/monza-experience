"use client";

import { Edges, Sparkles } from "@react-three/drei";
import type { BuildingVariant } from "@/data/projects";

type Props = {
  variant: BuildingVariant;
  scale: [number, number, number];
  accent: string;
  selected: boolean;
  hovered: boolean;
  muted: boolean;
};

export default function BuildingStructure({ variant, scale, accent, selected, hovered, muted }: Props) {
  const [width, height, depth] = scale;
  const organic = variant === "organic" || variant === "pets";
  const surface = { transparent: true, opacity: muted ? 0.12 : 1, depthWrite: !muted,
    emissive: "#10213a", emissiveIntensity: muted ? 0.05 : 0.45 };
  const light = { color: accent, transparent: true, opacity: muted ? 0.08 : selected ? 1 : 0.75, depthWrite: false };

  return (
    <>
      <mesh>
        {variant === "operations" ? (
          <cylinderGeometry args={[width / 2, width / 2, height, 8]} />
        ) : organic ? (
          <cylinderGeometry args={[width * 0.45, width * 0.58, height, 12]} />
        ) : <boxGeometry args={scale} />}

        {variant === "memorial" ? (
          <meshPhysicalMaterial {...surface} color="#07101c" metalness={0.45} roughness={0.22} transmission={muted ? 0 : 0.08} />
        ) : variant === "legal" ? (
          <meshPhysicalMaterial {...surface} color="#08070c" metalness={0.9} roughness={0.16} clearcoat={1} />
        ) : organic ? (
          <meshStandardMaterial {...surface} color="#071219" metalness={0.35} roughness={0.38} />
        ) : variant === "operations" ? (
          <meshStandardMaterial {...surface} color="#0b0b18" metalness={0.8} roughness={0.2} />
        ) : variant === "corporate" ? (
          <meshStandardMaterial {...surface} color="#07131b" metalness={0.72} roughness={0.22} />
        ) : (
          <meshStandardMaterial {...surface} color="#050b14" metalness={0.65} roughness={0.34} />
        )}
        <Edges color={accent} transparent opacity={muted ? 0.1 : selected ? 1 : hovered ? 0.9 : 0.55} />
      </mesh>

      {variant === "memorial" && (
        <mesh position={[0, 0, depth / 2 + 0.03]}>
          <planeGeometry args={[width * 0.72, height * 0.6]} />
          <meshBasicMaterial {...light} opacity={muted ? 0.02 : selected ? 0.16 : 0.07} />
        </mesh>
      )}
      {variant === "corporate" && [-0.32, 0, 0.32].map((x) => (
        <mesh key={x} position={[x * width, 0, depth / 2 + 0.03]}>
          <planeGeometry args={[0.06, height * 0.8]} />
          <meshBasicMaterial {...light} />
        </mesh>
      ))}
      {variant === "operations" && (
        <>
          <mesh position={[0, height / 2 + 0.35, 0]}>
            <torusGeometry args={[width * 0.32, 0.05, 12, 48]} />
            <meshBasicMaterial {...light} />
          </mesh>
          {[-0.16, 0.12].map((level) => (
            <mesh key={level} position={[0, height * level, depth / 2 + 0.04]}>
              <planeGeometry args={[width * 0.62, height * 0.18]} />
              <meshBasicMaterial {...light} opacity={muted ? 0.03 : 0.26} />
            </mesh>
          ))}
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * width * 0.36, -height * 0.26, 0]}>
              <boxGeometry args={[width * 0.24, height * 0.32, depth * 0.8]} />
              <meshStandardMaterial {...surface} color="#16162c" />
              <Edges color={accent} transparent opacity={muted ? 0.08 : 0.5} />
            </mesh>
          ))}
        </>
      )}
      {variant === "data" && Array.from({ length: 7 }, (_, index) => (
        <mesh key={index} position={[0, -height / 2 + 0.8 + index * height / 8, depth / 2 + 0.03]}>
          <planeGeometry args={[width * 0.72, 0.05]} />
          <meshBasicMaterial {...light} />
        </mesh>
      ))}
      {organic && (
        <mesh position={[0, height / 2 + 0.5, 0]}>
          <sphereGeometry args={[width * 0.3, 32, 32]} />
          <meshBasicMaterial {...light} opacity={muted ? 0.02 : selected ? 0.28 : 0.14} />
        </mesh>
      )}
      {variant === "pets" && (
        <>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * width * 0.35, -height / 2 + width * 0.12, depth * 0.36]}>
              <sphereGeometry args={[width * 0.12, 16, 16]} />
              <meshBasicMaterial {...light} opacity={muted ? 0.03 : 0.3} />
            </mesh>
          ))}
          <Sparkles count={24} scale={[width, height * 0.9, depth]} size={1.8} speed={0.15}
            opacity={muted ? 0.05 : 0.55} color={accent} />
        </>
      )}
      {variant === "agency" && [-0.26, 0.02, 0.3].map((level, index) => (
        <group key={level} position={[0, height * level, depth / 2 + 0.04]}>
          <mesh>
            <boxGeometry args={[width * 0.8, height * 0.2, 0.06]} />
            <meshStandardMaterial {...surface} color="#241506" emissive={accent} emissiveIntensity={muted ? 0.03 : 0.25} />
            <Edges color={accent} transparent opacity={muted ? 0.08 : 0.8} />
          </mesh>
          <mesh position={[-width * 0.1, 0, 0.04]}>
            <planeGeometry args={[width * (0.34 + index * 0.12), 0.06]} />
            <meshBasicMaterial {...light} />
          </mesh>
        </group>
      ))}
      {variant === "legal" && (
        <mesh position={[0, 0, depth / 2 + 0.03]}>
          <planeGeometry args={[width * 0.06, height * 0.9]} />
          <meshBasicMaterial {...light} />
        </mesh>
      )}
    </>
  );
}




