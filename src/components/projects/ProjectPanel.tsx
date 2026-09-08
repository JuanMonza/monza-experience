"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Code2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { projects } from "@/data/projects";
import { useProjectStore } from "@/store/useProjectStore";

export default function ProjectPanel() {
  const router = useRouter();

  const selectedProjectId = useProjectStore(
    (state) => state.selectedProjectId,
  );

  const selectProject = useProjectStore(
    (state) => state.selectProject,
  );

  const project = projects.find(
    (item) => item.id === selectedProjectId,
  );

  function closeProject() {
    selectProject(null);
  }

  function openCaseStudy() {
    if (!project) return;

    router.push(`/projects/${project.id}`);
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Screen overlay */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={closeProject}
            className="
              absolute
              inset-0
              z-30
              bg-black/20
              backdrop-blur-[1px]
            "
          />

          {/* Panel */}
          <motion.aside
            key={project.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-panel-title"
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 80,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              bottom-3
              right-3
              z-40
              flex
              h-[calc(58%-12px)]
              w-[calc(100%-24px)]
              flex-col
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#080b12]/90
              shadow-2xl
              backdrop-blur-2xl

              lg:bottom-5
              lg:right-5
              lg:top-[108px]
              lg:h-auto
              lg:w-[480px]
            "
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3 lg:px-7 lg:py-5">
              <div
                className="
                  font-[var(--font-geist-mono)]
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                Project Case Study
              </div>

              <button
                type="button"
                onClick={closeProject}
                aria-label="Close project"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-white/50
                  transition
                  hover:bg-white/[0.08]
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-400/60
                "
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div
              data-project-scroll
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overscroll-contain
                px-5
                py-5
                lg:px-7
                lg:py-8
              "
            >
              {/* Accent */}
              <div
                className="
                  mb-8
                  h-1
                  w-12
                  rounded-full
                "
                style={{
                  background: project.accent,
                  boxShadow: `0 0 24px ${project.accent}`,
                }}
              />

              {/* Metadata */}
              <p
                className="
                  font-[var(--font-geist-mono)]
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-white/30
                "
              >
                {project.category}
                {" / "}
                {project.year}
              </p>

              {/* Title */}
              <h3
                id="project-panel-title"
                className="
                  mt-4
                  font-[var(--font-geist)]
                  text-2xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-white
                  lg:text-4xl
                "
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-6
                  text-sm
                  leading-7
                  text-white/45
                "
              >
                {project.description}
              </p>

              {/* Information cards */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-5
                  "
                >
                  <Code2
                    size={18}
                    className="mb-6 text-white/35"
                  />

                  <p
                    className="
                      font-[var(--font-geist-mono)]
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-white/30
                    "
                  >
                    MODE
                  </p>

                  <p className="mt-1 text-sm text-white/75">
                    Developer
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-5
                  "
                >
                  <ArrowUpRight
                    size={18}
                    className="mb-6 text-white/35"
                  />

                  <p
                    className="
                      font-[var(--font-geist-mono)]
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-white/30
                    "
                  >
                    DISTRICT
                  </p>

                  <p className="mt-1 text-sm text-white/75">
                    {project.featured
                      ? "Featured"
                      : "Archive"}
                  </p>
                </div>
              </div>

              {/* Repository status */}
              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  p-5
                "
              >
                <p
                  className="
                    font-[var(--font-geist-mono)]
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  REPOSITORY
                </p>

                <p className="mt-2 text-sm text-white/60">
                  {project.repository
                    ? "Repository linked"
                    : "Repository not linked yet"}
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <div
              className="
                shrink-0
                space-y-3
                border-t
                border-white/10
                p-3
                lg:p-5
              "
            >
              {/* Main CTA */}
              <button
                type="button"
                onClick={openCaseStudy}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  bg-white
                  px-5
                  py-4
                  text-sm
                  font-medium
                  text-black
                  transition
                  hover:scale-[1.01]
                  hover:bg-white/90
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-400
                "
              >
                Explore project

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </button>

              {/* Repository */}
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-5
                    py-4
                    text-sm
                    font-medium
                    text-white/70
                    transition
                    hover:bg-white/[0.07]
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-400/60
                  "
                >
                  View repository

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}