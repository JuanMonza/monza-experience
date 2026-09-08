"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

import AnimatedGlows from "@/components/effects/AnimatedGlows";
import AnimatedGrid from "@/components/effects/AnimatedGrid";
import Particles from "@/components/effects/Particles";
import HeroContent from "@/components/hero/HeroContent";
import SceneCanvas from "@/components/experience/SceneCanvas";

export default function Hero() {
  return (
    <main
      id="home"
      className="relative min-h-screen overflow-hidden pt-[88px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]"
      >
        <AnimatedGrid />
        <AnimatedGlows />
        <Particles />
        <SceneCanvas />
      </div>

      <section
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-6
          pt-28
          pb-32
        "
      >
        <HeroContent />

        {/* Scroll Indicator */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 1,
          }}
          className="
            absolute
            bottom-8
            left-1/2
            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            text-white/30
          "
        >
          <span
            className="
              font-(family-name:--font-geist-mono)
              text-[10px]
              uppercase
              tracking-[0.25em]
            "
          >
            Enter Experience
          </span>

          <motion.div
            animate={{
              y: [0, 7, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={15} />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
