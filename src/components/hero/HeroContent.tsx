"use client";

import { motion } from "motion/react";

export default function HeroContent() {
  return (
    <div className="relative z-20 mx-auto max-w-6xl text-center">
      {/* Status */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
        className="
          mx-auto mb-8 inline-flex items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/[0.035]
          px-4
          py-2
          text-sm
          text-white/55
          backdrop-blur-xl
        "
      >
        <span
          className="
            h-2
            w-2
            rounded-full
            bg-emerald-400
            shadow-[0_0_18px_rgba(52,211,153,.8)]
          "
        />

        Building digital experiences
      </motion.div>

      {/* Name */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.25,
        }}
        className="
          mb-4
          font-(family-name:--font-geist-mono)
          text-xs
          uppercase
          tracking-[0.32em]
          text-blue-300/70
        "
      >
        Juan Monsalve / Juan Monza
      </motion.p>

      {/* Main headline */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 30,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1.1,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          font-(family-name:--font-geist)
          text-[clamp(3.2rem,9vw,8.5rem)]
          font-semibold
          leading-[0.88]
          tracking-[-0.065em]
        "
      >
        Software
        <br />

        <span
          className="
            bg-linear-to-b
            from-white
            via-white/85
            to-white/35
            bg-clip-text
            text-transparent
          "
        >
          Engineer.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.7,
        }}
        className="
          mx-auto
          mt-9
          max-w-2xl
          font-(family-name:--font-inter)
          text-base
          leading-7
          text-white/45
          md:text-lg
        "
      >
        I design and build scalable digital products,
        full-stack platforms and AI-powered experiences
        where engineering meets product and design.
      </motion.p>

      {/* Technologies */}
      <motion.div
        id="tech"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.9,
        }}
        className="
          mt-10
          scroll-mt-28
          flex
          flex-wrap
          items-center
          justify-center
          gap-x-5
          gap-y-3
          font-(family-name:--font-geist-mono)
          text-xs
          uppercase
          tracking-wider
          text-white/30
        "
      >
        <span>Next.js</span>
        <span>React</span>
        <span>TypeScript</span>
        <span>Node.js</span>
        <span>PostgreSQL</span>
        <span>AI</span>
        <span>Three.js</span>
      </motion.div>
    </div>
  );
}
