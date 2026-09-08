"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const bootSteps = [
  "INITIALIZING CORE",
  "LOADING INTERFACE",
  "CONNECTING PROJECTS",
  "PREPARING ENVIRONMENT",
  "SYSTEM READY",
];

export default function BootLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    let timeout: number | undefined;
    const interval = window.setInterval(() => {
      current = Math.min(current + 2, 100);
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(interval);
        timeout = window.setTimeout(() => setVisible(false), 650);
      }
    }, 32);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  const stepIndex = Math.min(Math.floor(progress / 21), bootSteps.length - 1);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            bg-[#03050a]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blue-500/[0.06]
              blur-[150px]
            "
          />

          <div className="relative w-[min(88vw,520px)]">
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <p
                    className="
                      font-[family-name:var(--font-geist)]
                      text-xl
                      font-semibold
                      tracking-[-0.04em]
                      text-white
                    "
                  >
                    MONZA
                    <span className="text-blue-400">.EXE</span>
                  </p>

                  <p
                    className="
                      mt-1
                      font-[family-name:var(--font-geist-mono)]
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      text-white/30
                    "
                  >
                    Software Experience System
                  </p>
                </div>

                <span
                  className="
                    font-[family-name:var(--font-geist-mono)]
                    text-xs
                    text-white/40
                  "
                >
                  V1.0
                </span>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={bootSteps[stepIndex]}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      font-[family-name:var(--font-geist-mono)]
                      text-[11px]
                      tracking-[0.14em]
                      text-white/45
                    "
                  >
                    {bootSteps[stepIndex]}
                  </motion.p>
                </AnimatePresence>

                <p
                  className="
                    font-[family-name:var(--font-geist-mono)]
                    text-[11px]
                    tabular-nums
                    text-white/45
                  "
                >
                  {progress.toString().padStart(3, "0")}%
                </p>
              </div>

              <div
                className="
                  relative
                  h-[2px]
                  overflow-hidden
                  bg-white/[0.08]
                "
              >
                <motion.div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    bg-gradient-to-r
                    from-blue-500
                    via-cyan-300
                    to-white
                    shadow-[0_0_20px_rgba(80,180,255,.8)]
                  "
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  font-[family-name:var(--font-geist-mono)]
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-white/20
                "
              >
                <span>JM / SYSTEM</span>
                <span>PORTFOLIO EXPERIENCE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

