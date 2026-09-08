"use client";

import { ArrowUpRight } from "lucide-react";
import { archivedProjects } from "@/data/projects";
import { useProjectStore } from "@/store/useProjectStore";

export default function ProjectArchive() {
  const selectProject = useProjectStore((state) => state.selectProject);
  if (!archivedProjects.length) return null;
  return (
    <section id="archive" aria-labelledby="archive-title" className="relative scroll-mt-24 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.22em] text-blue-300">Beyond the avenue</p>
        <h2 id="archive-title" className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Project archive</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">More platforms, tools and digital experiences. Explore the projects beyond the featured district.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {archivedProjects.map((project) => (
            <article key={project.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <span className="mb-6 h-1 w-10 rounded-full" style={{ background: project.accent }} />
              <p className="text-xs text-white/50">{project.category} · {project.year}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mb-6 mt-3 flex-1 text-sm leading-6 text-white/60">{project.description}</p>
              <button type="button" onClick={() => selectProject(project.id)}
                className="flex items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-sm text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-400">
                View project <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
