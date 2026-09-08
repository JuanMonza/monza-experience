"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { Suspense } from "react";

import SceneCore from "@/components/experience/SceneCore";

export default function SceneCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 50,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
          />

          <pointLight
            position={[-4, 1, 4]}
            intensity={8}
            distance={12}
          />

          <Float
            speed={1.4}
            rotationIntensity={0.25}
            floatIntensity={0.6}
          >
            <SceneCore />
          </Float>

          <Stars
            radius={80}
            depth={40}
            count={700}
            factor={2}
            saturation={0}
            fade
            speed={0.25}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}