"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import CityScene from "@/components/experience/CityScene";

function CameraRig() {
  const cameraTarget = useRef(new THREE.Vector3(0, 0.5, -10));

  useFrame((state) => {
    const { camera, pointer } = state;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.8,
      0.025,
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      2.3 + pointer.y * 0.25,
      0.025,
    );

    camera.lookAt(cameraTarget.current);
  });

  return null;
}

export default function CityCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 2.3, 10],
          fov: 48,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#03050a", 15, 70]} />

          <ambientLight intensity={0.45} />

          <directionalLight
            position={[8, 12, 5]}
            intensity={1.3}
          />

          <CityScene />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}