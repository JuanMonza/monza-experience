"use client";

import { motion } from "motion/react";

export default function AnimatedGrid() {
  return (
    <motion.div
      animate={{
        backgroundPosition: [
          "0px 0px",
          "72px 72px",
        ],
      }}
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "linear",
      }}
      className="
        pointer-events-none
        absolute
        inset-0
        opacity-60
        [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
        [background-size:72px_72px]
        [mask-image:linear-gradient(to_bottom,black,transparent_90%)]
      "
    />
  );
}