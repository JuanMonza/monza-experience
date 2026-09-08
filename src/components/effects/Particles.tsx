"use client";

import { motion } from "motion/react";

const particles = Array.from({ length: 26 });

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const left = `${(index * 37) % 100}%`;
        const top = `${(index * 53) % 100}%`;
        const delay = (index % 8) * 0.4;
        const duration = 5 + (index % 6);

        return (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [10, -18, -42],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left,
              top,
            }}
            className="
              absolute
              h-[2px]
              w-[2px]
              rounded-full
              bg-white
              shadow-[0_0_10px_rgba(255,255,255,.35)]
            "
          />
        );
      })}
    </div>
  );
}