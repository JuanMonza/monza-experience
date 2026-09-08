"use client";

import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Database,
    Layers3,
    Server,
    Workflow,
} from "lucide-react";
import { motion } from "motion/react";

import type { Project } from "@/data/projects";
import type { ProjectCaseStudy } from "@/data/projectCaseStudies";

type Props = {
    project: Project;
    caseStudy: ProjectCaseStudy;
};

export default function ProjectCaseStudyPage({
    project,
    caseStudy,
}: Props) {
    return (
        <main className="min-h-screen bg-[#03050a] text-white">
            {/* Background */}
            <div
                className="
          pointer-events-none
          fixed
          inset-0
          opacity-50
          [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
            />

            {/* HERO */}
            <section className="relative min-h-screen overflow-hidden px-6">
                <div
                    className="pointer-events-none absolute left-1/2 top-[30%] h-[650px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
                    style={{
                        background: project.accent,
                        opacity: 0.09,
                    }}
                />

                <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col">
                    {/* Top navigation */}
                    <div className="flex items-center justify-between py-8">
                        <Link
                            href="/#projects"
                            className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-white/45
                transition
                hover:text-white
              "
                        >
                            <ArrowLeft size={16} />
                            MONZA CITY
                        </Link>

                        <div
                            className="
                font-[var(--font-geist-mono)]
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-white/25
              "
                        >
                            CASE STUDY / {caseStudy.year}
                        </div>
                    </div>

                    {/* Main hero */}
                    <div className="flex flex-1 items-center py-20">
                        <div className="w-full">
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 12,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="
                  font-[var(--font-geist-mono)]
                  text-xs
                  uppercase
                  tracking-[0.24em]
                "
                                style={{
                                    color: project.accent,
                                }}
                            >
                                {project.category}
                            </motion.p>

                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                    filter: "blur(12px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="
                  mt-7
                  max-w-6xl
                  font-[var(--font-geist)]
                  text-[clamp(4rem,10vw,10rem)]
                  font-semibold
                  leading-[0.82]
                  tracking-[-0.075em]
                "
                            >
                                {project.title}
                            </motion.h1>

                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 25,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.35,
                                    duration: 0.8,
                                }}
                                className="
                  mt-10
                  max-w-3xl
                  text-lg
                  leading-8
                  text-white/45
                  md:text-xl
                "
                            >
                                {caseStudy.headline}
                            </motion.p>

                            <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-4">
                                <Meta
                                    label="ROLE"
                                    value={caseStudy.role}
                                />

                                <Meta
                                    label="COMPANY"
                                    value={caseStudy.company}
                                />

                                <Meta
                                    label="YEAR"
                                    value={caseStudy.year}
                                />

                                <Meta
                                    label="STATUS"
                                    value={caseStudy.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SUMMARY */}
            <section className="relative border-t border-white/10 px-6 py-32">
                <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
                    <SectionIndex>
                        PROJECT OVERVIEW
                    </SectionIndex>

                    <div>
                        <p
                            className="
                max-w-4xl
                font-[var(--font-geist)]
                text-3xl
                leading-[1.15]
                tracking-[-0.04em]
                text-white/90
                md:text-5xl
              "
                        >
                            {caseStudy.summary}
                        </p>

                        <div className="mt-16 flex flex-wrap gap-2">
                            {caseStudy.technologies.map(
                                (technology) => (
                                    <span
                                        key={technology}
                                        className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      py-2
                      font-[var(--font-geist-mono)]
                      text-xs
                      text-white/45
                    "
                                    >
                                        {technology}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS */}
            <section className="relative border-y border-white/10">
                <div className="mx-auto grid max-w-7xl md:grid-cols-4">
                    {caseStudy.metrics.map(
                        (metric, index) => (
                            <div
                                key={`${metric.label}-${index}`}
                                className="
                  border-b
                  border-white/10
                  p-8
                  md:border-b-0
                  md:border-r
                  md:last:border-r-0
                  lg:p-12
                "
                            >
                                <p
                                    className="
                    font-[var(--font-geist)]
                    text-4xl
                    font-semibold
                    tracking-[-0.055em]
                    md:text-5xl
                  "
                                >
                                    {metric.value}
                                </p>

                                <p
                                    className="
                    mt-3
                    font-[var(--font-geist-mono)]
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                                >
                                    {metric.label}
                                </p>
                            </div>
                        ),
                    )}
                </div>
            </section>

            {/* PROBLEM */}
            <StorySection
                eyebrow={caseStudy.problem.eyebrow}
                title={caseStudy.problem.title}
                description={
                    caseStudy.problem.description
                }
            />

            {/* SOLUTION */}
            <StorySection
                eyebrow={caseStudy.solution.eyebrow}
                title={caseStudy.solution.title}
                description={
                    caseStudy.solution.description
                }
                reverse
            />

            {/* CHALLENGES */}
            <section className="relative border-t border-white/10 px-6 py-32">
                <div className="mx-auto max-w-7xl">
                    <SectionIndex>
                        03 / ENGINEERING CHALLENGES
                    </SectionIndex>

                    <div className="mt-14 grid gap-4 md:grid-cols-3">
                        {caseStudy.challenges.map(
                            (challenge, index) => (
                                <div
                                    key={challenge.title}
                                    className="
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-8
                    backdrop-blur-xl
                  "
                                >
                                    <span
                                        className="
                      font-[var(--font-geist-mono)]
                      text-[10px]
                      text-white/25
                    "
                                    >
                                        0{index + 1}
                                    </span>

                                    <h3
                                        className=" mt-10 font-(--font-geist)text-2xlfont-medium tracking-[-0.035em]"
                                    >
                                        {challenge.title}
                                    </h3>

                                    <p className="mt-5 text-sm leading-7 text-white/40">
                                        {challenge.description}
                                    </p>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* DEVELOPER MODE */}
            <section className="relative border-t border-white/10 px-6 py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 flex items-end justify-between gap-8">
                        <div>
                            <p
                                className="
                  font-(--font-geist-mono)
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-blue-300/60
                "
                            >
                                DEVELOPER MODE
                            </p>

                            <h2
                                className="
                  mt-5
                  font-(--font-geist)
                  text-5xl
                  font-semibold
                  tracking-[-0.055em]
                  md:text-7xl
                "
                            >
                                Under the hood.
                            </h2>
                        </div>

                        <span className="hidden text-sm text-white/30 md:block">
                            SYSTEM ARCHITECTURE
                        </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <ArchitectureCard
                            icon={<Layers3 size={20} />}
                            title="Frontend"
                            items={
                                caseStudy.architecture.frontend
                            }
                        />

                        <ArchitectureCard
                            icon={<Server size={20} />}
                            title="Backend"
                            items={
                                caseStudy.architecture.backend
                            }
                        />

                        <ArchitectureCard
                            icon={<Database size={20} />}
                            title="Database"
                            items={
                                caseStudy.architecture.database
                            }
                        />

                        <ArchitectureCard
                            icon={<Workflow size={20} />}
                            title="Infrastructure"
                            items={
                                caseStudy.architecture.infrastructure
                            }
                        />
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="relative border-t border-white/10 px-6 py-32">
                <div className="mx-auto max-w-7xl">
                    <SectionIndex>
                        PROJECT HIGHLIGHTS
                    </SectionIndex>

                    <div className="mt-14">
                        {caseStudy.highlights.map(
                            (highlight, index) => (
                                <div
                                    key={highlight}
                                    className="
                    flex
                    items-center
                    gap-6
                    border-t
                    border-white/10
                    py-7
                    last:border-b
                  "
                                >
                                    <span className="w-10 font-(--font-geist-mono) text-xs text-white/20">
                                        0{index + 1}
                                    </span>

                                    <p
                                        className="
                      font-(--font-geist)
                      text-xl
                      tracking-tight
                      text-white/75
                      md:text-2xl
                    "
                                    >
                                        {highlight}
                                    </p>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="relative px-6 py-36">
                <div className="mx-auto max-w-7xl">
                    <p
                        className="
              font-(--font-geist-mono)
              text-[10px]
              uppercase
              tracking-[0.24em]
              text-white/25
            "
                    >
                        END OF CASE STUDY
                    </p>

                    <h2
                        className="
              mt-7
              max-w-5xl
              text-5xl
              font-semibold
              leading-[0.95]
              tracking-[-0.065em]
              md:text-8xl
            "
                    >
                        Explore another
                        <br />
                        system.
                    </h2>

                    <Link
                        href="/#projects"
                        className="
              mt-12
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-medium
              text-black
              transition
              hover:scale-[1.02]
            "
                    >
                        Return to MONZA CITY
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function Meta({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p
                className="
          font-(--font-geist-mono)
          text-[9px]
          uppercase
          tracking-[0.22em]
          text-white/25
        "
            >
                {label}
            </p>

            <p className="mt-2 text-sm text-white/65">
                {value}
            </p>
        </div>
    );
}

function SectionIndex({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p
            className="
        font-(--font-geist-mono)
        text-[10px]
        uppercase
        tracking-[0.25em]
        text-white/25
      "
        >
            {children}
        </p>
    );
}

function StorySection({
    eyebrow,
    title,
    description,
    reverse = false,
}: {
    eyebrow: string;
    title: string;
    description: string;
    reverse?: boolean;
}) {
    return (
        <section className="relative border-t border-white/10 px-6 py-32">
            <div
                className={`
          mx-auto
          grid
          max-w-7xl
          gap-14
          lg:grid-cols-2
          ${reverse
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                    }
        `}
            >
                <p
                    className="
            font-(--font-geist-mono)
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-blue-300/60
          "
                >
                    {eyebrow}
                </p>

                <div>
                    <h2
                        className="
              font-(--font-geist)
              text-4xl
              font-semibold
              leading-none
              tracking-tighter
              md:text-6xl
            "
                    >
                        {title}
                    </h2>

                    <p className="mt-8 max-w-2xl text-base leading-8 text-white/40">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}

function ArchitectureCard({
    icon,
    title,
    items,
}: {
    icon: React.ReactNode;
    title: string;
    items: string[];
}) {
    return (
        <div
            className="
        rounded-[28px]
        border
        border-white/10
        bg-white/2.5
        p-8
      "
        >
            <div className="text-blue-300/60">
                {icon}
            </div>

            <h3
                className="
          mt-8
          text-2xl
          font-medium
          tracking-[-0.035em]
        "
            >
                {title}
            </h3>

            <div className="mt-7 space-y-3">
                {items.map((item) => (
                    <div
                        key={item}
                        className="
              flex
              items-center
              gap-3
              text-sm
              text-white/40
            "
                    >
                        <span className="h-1 w-1 rounded-full bg-blue-400" />

                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}