"use client";

import { motion } from "motion/react";

export default function AnimatedGlows() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[10%]
          top-[15%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/10
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[8%]
          top-[28%]
          h-[360px]
          w-[360px]
          rounded-full
          bg-violet-500/10
          blur-[150px]
        "
      />

      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[5%]
          left-[38%]
          h-[300px]
          w-[300px]
          rounded-full
          bg-cyan-400/[0.08]
          blur-[130px]
        "
      />
    </div>
  );
}