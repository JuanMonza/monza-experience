"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import CityScene from "@/components/experience/CityScene";
import CityAtmosphere from "@/components/experience/CityAtmosphere";
import Particles from "@/components/effects/Particles";
import ProjectPanel from "@/components/projects/ProjectPanel";
import { featuredProjects, projects } from "@/data/projects";
import { useProjectStore } from "@/store/useProjectStore";
import { journeyCameraPose, projectCameraPose } from "@/lib/city-camera";
import { motion } from "motion/react";

function JourneyCamera({ progress }: { progress: number }) {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const lookTarget = useRef(new THREE.Vector3(0, 0.3, 0));
  const desiredPosition = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const selectedProject = projects.find((project) => project.id === selectedProjectId);
  const { size, camera } = useThree();
  const perspective = camera as THREE.PerspectiveCamera;
  const captionHeight = Math.max(190, Math.min((size.height + 88) * 0.3, 260));
  const sceneHeight = Math.max(1, size.height - captionHeight);
  useLayoutEffect(() => {
    if (selectedProject) {
      perspective.setViewOffset(size.width, size.height, 0, 0, size.width, size.height);
      perspective.clearViewOffset();
    } else {
      // Extend the same frustum below the safe building area: the street and
      // stars continue behind the caption without moving the skyline into it.
      perspective.setViewOffset(size.width, sceneHeight, 0, 0, size.width, size.height);
    }
  }, [perspective, selectedProject, size.width, size.height, sceneHeight]);
  const focusPose = useMemo(() => selectedProject
    ? projectCameraPose(selectedProject, perspective.fov, size.width / size.height)
    : null, [selectedProject, perspective.fov, size.width, size.height]);
  const journeyPose = useMemo(() => journeyCameraPose(progress, featuredProjects, perspective.fov, size.width / sceneHeight),
    [progress, perspective.fov, size.width, sceneHeight]);

  const initialized = useRef(false);

  useFrame((state, delta) => {
    const camera = state.camera;
    if (focusPose) {
      desiredPosition.current.copy(focusPose.position);
      desiredTarget.current.copy(focusPose.target);
    } else {
      desiredPosition.current.copy(journeyPose.position);
      desiredTarget.current.copy(journeyPose.target);
    }
    if (!initialized.current) {
      camera.position.copy(desiredPosition.current);
      lookTarget.current.copy(desiredTarget.current);
      initialized.current = true;
    }
    // Exponential damping has the same speed on 30, 60 and 120 Hz displays.
    const blend = 1 - Math.exp(-3.5 * Math.min(delta, 0.1));
    camera.position.lerp(desiredPosition.current, blend);
    lookTarget.current.lerp(desiredTarget.current, blend);
    camera.lookAt(lookTarget.current);

    if (selectedProject && camera.position.distanceTo(desiredPosition.current) < 0.12 &&
        lookTarget.current.distanceTo(desiredTarget.current) < 0.06 &&
        useProjectStore.getState().focusedProjectId !== selectedProject.id) {
      useProjectStore.getState().focusProject(selectedProject.id);
    }
  });
  return null;
}
function CityWorld({
  progress,
}: {
  progress: number;
}) {
  return (
    <Canvas
      onPointerMissed={() => useProjectStore.getState().selectProject(null)}
      camera={{
        position: [0, 2.3, 10],
        fov: 48,
        near: 0.1,
        far: 250,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <fog
        attach="fog"
        args={["#03050a", 60, 180]}
      />

      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#d5e5ff", "#263c58", 1.6]} />

      <directionalLight
        position={[8, 12, 5]}
        intensity={2.4}
      />

      <pointLight
        position={[0, 5, -18]}
        intensity={18}
        distance={28}
        color="#4f8cff"
      />

      <pointLight
        position={[-10, 2, -35]}
        intensity={12}
        distance={22}
        color="#22d3ee"
      />

      <CityScene />
      <CityAtmosphere />

      <JourneyCamera progress={progress} />
    </Canvas>
  );
}

export default function CityJourney() {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const focusReady = useProjectStore((state) => state.focusedProjectId === state.selectedProjectId);
  const sectionRef =
    useRef<HTMLElement>(null);

  const [progress, setProgress] =
    useState(0);

  useLayoutEffect(() => {
    if (!selectedProjectId) return;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top,
      left: body.style.left, width: body.style.width };
    // Keep the document at the exact same offset. Toggling root overflow
    // changes sticky containment and used to push the panel below the viewport.
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = "100%";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") useProjectStore.getState().selectProject(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      Object.assign(body.style, previous);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProjectId]);

  useEffect(() => {
    function updateProgress() {
      if (useProjectStore.getState().selectedProjectId) return;
      const section =
        sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const scrollable =
        section.offsetHeight -
        window.innerHeight;

      const travelled = -rect.top;

      const nextProgress =
        THREE.MathUtils.clamp(
          travelled / Math.max(scrollable, 1),
          0,
          1,
        );

      setProgress(nextProgress);
    }

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateProgress,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress,
      );

      window.removeEventListener(
        "resize",
        updateProgress,
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        h-[400vh]
      "
    >
      {/* Sticky 3D */}
      <div className={`h-dvh overflow-hidden [--journey-caption-height:clamp(190px,30dvh,260px)] ${selectedProjectId
        ? "fixed inset-0 z-40 bg-[#03050a]" : "sticky top-0"}`}>
        <div className={`absolute left-0 z-0 ${selectedProjectId
          ? "top-22 right-0 bottom-[46%] lg:right-130 lg:bottom-0"
          : "top-22 right-0 bottom-0"}`}>
          <CityWorld
            progress={progress}
          />
        </div>
        <Particles />

        <motion.div
          animate={{ opacity: selectedProjectId ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-0 z-5 bg-black"
        />

        {selectedProjectId && !focusReady && (
          <button
            type="button"
            onClick={() => useProjectStore.getState().selectProject(null)}
            className="absolute right-6 top-28 z-40 rounded-full border border-white/20 bg-[#080b12] px-5 py-3 text-sm text-white"
          >
            Cancel focus
          </button>
        )}

        {/* Gradientes */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-8
            bg-linear-to-t
            from-[#03050a]/20
            to-transparent
          "
        />

        {/* HUD */}
        <div
          className="
            pointer-events-none
            absolute
            left-6
            top-28
            z-20
            hidden
            font-(family-name:--font-geist-mono)
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-white/55
            md:block
          "
        >
          <p>
            MONZA CITY /
            EXPLORATION
          </p>

          <p className="mt-2">
            POSITION{" "}
            {Math.round(progress * 100)
              .toString()
              .padStart(3, "0")}
            %
          </p>
        </div>

        {/* Progress lateral */}
        <div
          className="
            absolute
            right-8
            top-1/2
            z-20
            hidden
            h-48
            w-px
            -translate-y-1/2
            bg-white/10
            md:block
          "
        >
          <div
            className="
              absolute
              left-0
              top-0
              w-px
              bg-blue-400
              shadow-[0_0_12px_rgba(96,165,250,.8)]
            "
            style={{
              height: `${progress * 100}%`,
            }}
          />
        </div>

        <motion.div
          animate={{ opacity: selectedProjectId ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden={!!selectedProjectId}
          inert={!!selectedProjectId}
          className="absolute inset-x-0 bottom-0 z-10 h-(--journey-caption-height) [text-shadow:0_2px_8px_#03050a]"
        >
          <JourneyContent progress={progress} />
        </motion.div>
        <ProjectPanel />
      </div>
    </section>
  );
}

function JourneyContent({ progress }: { progress: number }) {
  const index = Math.min(Math.floor(progress * featuredProjects.length), featuredProjects.length - 1);
  const currentProject = featuredProjects[index];
  if (!currentProject) return null;

  return (
    <div className="h-full overflow-y-auto overscroll-contain px-6 py-4 sm:py-5">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 font-(family-name:--font-geist-mono) text-[10px] uppercase tracking-[0.24em] text-blue-300">
          FEATURED {(index + 1).toString().padStart(2, "0")} / {featuredProjects.length.toString().padStart(2, "0")}
        </p>
        <h2 className="font-(family-name:--font-geist) text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
          {currentProject.title}
        </h2>
        <p className="mt-2 font-(family-name:--font-geist-mono) text-[10px] uppercase tracking-[0.16em] text-white/60 sm:text-xs">
          {currentProject.category} · {currentProject.year}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
          {currentProject.description}
        </p>
      </div>
    </div>
  );
}
