"use client";

import { useEffect, useRef, useCallback } from "react";
import { projects } from "@/data/projects";

interface Layer {
  type: "hero" | "project" | "overview";
  name?: string;
  description?: string;
  tags?: string[];
  github?: string;
}

const layers: Layer[] = [
  { type: "hero" },
  ...projects.map((p) => ({
    type: "project" as const,
    name: p.name,
    description: p.description,
    tags: p.tags,
    github: p.github,
  })),
  { type: "overview" },
];

const ZOOM_FACTOR = 4;
const SCROLL_SENSITIVITY = 0.0004;
const LERP_SPEED = 0.045;

function LayerContent({ layer }: { layer: Layer }) {
  if (layer.type === "hero") {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8">
        <p className="font-mono text-accent text-sm sm:text-base mb-4 tracking-wider">
          PORTFOLIO
        </p>
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter mb-6">
          Pragati Lad
        </h1>
        <p className="text-text-secondary text-xl sm:text-2xl md:text-3xl font-light">
          Developer & Data Enthusiast
        </p>
        <div className="flex items-center gap-6 mt-12">
          <a
            href="https://github.com/pragati-lad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/pragati-lad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&to=pragatilad.ds@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent transition-colors"
            aria-label="Email"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
          </a>
        </div>
        <p className="absolute bottom-12 text-text-secondary/50 text-xs font-mono animate-pulse">
          scroll to zoom
        </p>
      </div>
    );
  }

  if (layer.type === "project") {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 max-w-3xl">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent mb-8">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
          {layer.name}
        </h2>
        <p className="text-text-secondary text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 max-w-xl">
          {layer.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {layer.tags?.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs sm:text-sm text-accent/90 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={layer.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent font-mono text-base transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </div>
    );
  }

  if (layer.type === "overview") {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8">
        <p className="font-mono text-accent text-sm mb-3 tracking-wider">
          OVERVIEW
        </p>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-4">
          Pragati Lad
        </h2>
        <p className="text-text-secondary text-lg sm:text-xl md:text-2xl font-light mb-10">
          Developer &amp; Data Enthusiast
        </p>

        {/* Project bubbles */}
        <div className="flex items-center gap-10 sm:gap-14 mb-12">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-[5px] border-solid border-border flex flex-col items-center justify-center text-center hover:border-accent/60 hover:bg-accent/5 transition-all group"
            >
              <span className="text-sm sm:text-base md:text-lg font-semibold group-hover:text-accent transition-colors leading-tight px-4">{project.name}</span>
              <span className="font-mono text-[10px] sm:text-xs text-accent/70 mt-2">{project.tags[0]}</span>
            </a>
          ))}
        </div>

        {/* Contact */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=pragatilad.ds@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-accent text-accent px-8 py-3 rounded-lg font-mono text-sm hover:bg-accent/10 transition-colors mb-6"
        >
          Say Hello
        </a>
        <div className="flex items-center gap-5">
          <a href="https://github.com/pragati-lad" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors" aria-label="GitHub">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/pragati-lad" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors" aria-label="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&to=pragatilad.ds@gmail.com" className="text-text-secondary hover:text-accent transition-colors" aria-label="Email">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
          </a>
        </div>
      </div>
    );
  }

  return null;
}

export default function Home() {
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const layerEls = useRef<(HTMLDivElement | null)[]>([]);
  const dotEls = useRef<(HTMLButtonElement | null)[]>([]);
  const counterEl = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const touchStartRef = useRef(0);
  const prevActiveRef = useRef(0);
  const numLayers = layers.length;

  // Smooth cosine ease for opacity — stays fully visible longer, fades at edges
  const easeOpacity = (t: number) => {
    const clamped = Math.max(0, Math.min(1, Math.abs(t)));
    return Math.cos(clamped * Math.PI) * 0.5 + 0.5;
  };

  const updateLayers = useCallback(() => {
    const progress = progressRef.current;
    const newActive = ((Math.round(progress) % numLayers) + numLayers) % numLayers;

    // Update dots & counter via DOM (no React re-render)
    if (newActive !== prevActiveRef.current) {
      dotEls.current[prevActiveRef.current]?.classList.remove("!bg-accent", "!scale-150");
      dotEls.current[newActive]?.classList.add("!bg-accent", "!scale-150");
      if (counterEl.current) {
        counterEl.current.textContent = `${newActive + 1} / ${numLayers}`;
      }
      prevActiveRef.current = newActive;
    }

    layerEls.current.forEach((el, i) => {
      if (!el) return;
      let localP = progress - i;

      // Wrap for seamless loop
      while (localP > numLayers / 2) localP -= numLayers;
      while (localP < -numLayers / 2) localP += numLayers;

      if (Math.abs(localP) >= 1.2) {
        el.style.visibility = "hidden";
        return;
      }

      el.style.visibility = "visible";
      const scale = Math.pow(ZOOM_FACTOR, localP);
      const opacity = easeOpacity(localP);
      el.style.transform = `translate3d(0,0,0) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(100 - Math.round(Math.abs(localP) * 10));
      el.style.pointerEvents = Math.abs(localP) < 0.3 ? "auto" : "none";
    });
  }, [numLayers]);

  const animate = useCallback(() => {
    const diff = targetRef.current - progressRef.current;
    // Smooth interpolation with adaptive speed
    progressRef.current += diff * LERP_SPEED;

    // Wrap
    if (progressRef.current >= numLayers) {
      progressRef.current -= numLayers;
      targetRef.current -= numLayers;
    }
    if (progressRef.current < 0) {
      progressRef.current += numLayers;
      targetRef.current += numLayers;
    }

    updateLayers();
    rafRef.current = requestAnimationFrame(animate);
  }, [numLayers, updateLayers]);

  useEffect(() => {
    // Normalize wheel delta across browsers/devices
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Normalize: trackpads send small deltas frequently, mice send large deltas
      const delta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY;
      targetRef.current += delta * SCROLL_SENSITIVITY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchStartRef.current - e.touches[0].clientY;
      touchStartRef.current = e.touches[0].clientY;
      targetRef.current += delta * 0.004;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        targetRef.current += 1;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        targetRef.current -= 1;
      }
    };

    // Initialize first dot
    dotEls.current[0]?.classList.add("!bg-accent", "!scale-150");

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-bg">
      {/* Zoom layers */}
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => { layerEls.current[i] = el; }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            visibility: i === 0 ? "visible" : "hidden",
            willChange: "transform, opacity",
            transformOrigin: "center center",
          }}
        >
          <LayerContent layer={layer} />
        </div>
      ))}

      {/* Progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-[200]">
        {layers.map((_, i) => (
          <button
            key={i}
            ref={(el) => { dotEls.current[i] = el; }}
            onClick={() => { targetRef.current = i; }}
            className="w-1.5 h-1.5 rounded-full bg-text-secondary/30 hover:bg-text-secondary/60 transition-all duration-300"
            aria-label={`Go to layer ${i + 1}`}
          />
        ))}
      </div>

      {/* Layer counter */}
      <div
        ref={counterEl}
        className="fixed bottom-6 right-6 z-[200] font-mono text-xs text-text-secondary/50"
      >
        1 / {numLayers}
      </div>
    </div>
  );
}
