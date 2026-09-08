"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#03050a]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <a
          href="#home"
          className="font-[family-name:var(--font-geist)] text-xl font-semibold tracking-[-0.04em] text-white"
        >
          MONZA<span className="text-blue-400">.EXE</span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#home" className="text-sm text-white/60 transition hover:text-white">
            Home
          </a>
          <a href="#projects" className="text-sm text-white/60 transition hover:text-white">
            Projects
          </a>
          <a href="#about" className="text-sm text-white/60 transition hover:text-white">
            About
          </a>
          <a href="#contact" className="text-sm text-white/60 transition hover:text-white">
            Contact
          </a>
          <a
            href="#tech"
            className="rounded-full border border-blue-400/30 bg-blue-400/[0.04] px-5 py-2.5 text-sm text-white transition hover:border-blue-400/60 hover:bg-blue-400/[0.08]"
          >
            Tech stack
          </a>
        </nav>

        {/* Social */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="https://github.com/JuanMonza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-xl p-2 text-white/45 transition hover:bg-white/5 hover:text-white"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-xl p-2 text-white/45 transition hover:bg-white/5 hover:text-white"
          >
            <FaLinkedinIn size={17} />
          </a>
          <a
            href="#contact"
            aria-label="Email"
            className="rounded-xl p-2 text-white/45 transition hover:bg-white/5 hover:text-white"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}
