"use client";

import { Sparkles, Stars } from "@react-three/drei";

export default function CityAtmosphere() {
  return (
    <group>
      <group position={[0, 14, -35]}>
        <Stars radius={95} depth={65} count={1600} factor={2.8} saturation={0.15} fade speed={0.2} />
      </group>
      <Sparkles position={[0, 8, -36]} count={120} scale={[36, 20, 105]}
        size={2.2} speed={0.22} opacity={0.65} color="#a9d9ff" noise={[0.3, 0.5, 0.3]} />
      <Sparkles position={[0, 11, -38]} count={45} scale={[26, 24, 100]}
        size={3} speed={0.12} opacity={0.85} color="#ffffff" />
    </group>
  );
}
