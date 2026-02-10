import React, { useState, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

// ─── Animation Variants ───
export const easeA = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hid: { opacity: 0, y: 18, filter: "blur(8px)" },
  shw: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeA },
  },
};

export const fade: Variants = {
  hid: { opacity: 0 },
  shw: { opacity: 1, transition: { duration: 0.45, ease: easeA } },
};

export const pop: Variants = {
  hid: { opacity: 0, scale: 0.96, y: 10 },
  shw: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeA },
  },
  ext: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: 0.3, ease: easeA },
  },
};

// ─── Utilities ───
export function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

// ─── Components ───
export function Btn({
  ch,
  onClick,
  kind = "pri",
  className,
  href,
}: {
  ch: React.ReactNode;
  onClick?: () => void;
  kind?: "pri" | "sec" | "soft";
  className?: string;
  href?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold tracking-tight transition active:scale-[0.99] cursor-pointer whitespace-nowrap";
  const pri =
    "text-white shadow-[0_18px_60px_-28px_rgba(139,105,20,0.45)] hover:brightness-[1.05] bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500";
  const sec =
    "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] text-amber-900 border border-amber-300/40 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]";
  const soft =
    "bg-[linear-gradient(135deg,rgba(255,248,230,0.50),rgba(255,248,230,0.25))] text-amber-900 border border-amber-200/30 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.35))] shadow-[0_14px_40px_-28px_rgba(139,105,20,0.25)]";
  const cls = cn(
    base,
    kind === "pri" ? pri : kind === "sec" ? sec : soft,
    className,
  );
  if (href)
    return (
      <a
        className={cls}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {ch}
      </a>
    );
  return (
    <button className={cls} onClick={onClick}>
      {ch}
    </button>
  );
}

export function Pill({ ch }: { ch: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300/40 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] px-3 py-1 text-xs font-extrabold text-amber-900 shadow-sm">
      {ch}
    </span>
  );
}

export function Stat({ v, t, s }: { v: string; t: string; s: string }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-amber-800/30 bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 p-3 sm:p-4 shadow-[0_18px_60px_-28px_rgba(0,0,0,0.5)] overflow-hidden">
      <p className="text-[10px] sm:text-xs font-extrabold text-amber-300 truncate">
        {s}
      </p>
      <p className="mt-0.5 sm:mt-1 text-base sm:text-2xl font-black tracking-tight text-amber-50 truncate">
        {v}
      </p>
      <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-amber-400">
        {t}
      </p>
    </div>
  );
}

export function Inp(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-2xl border border-amber-300/40 px-4 text-sm font-semibold text-amber-900 outline-none",
        "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))]",
        "focus:border-amber-400/60 focus:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]",
        props.className,
      )}
    />
  );
}

export function Sel(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 w-full rounded-2xl border border-amber-300/40 px-4 text-sm font-semibold text-amber-900 outline-none",
        "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))]",
        "focus:border-amber-400/60 focus:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]",
        props.className,
      )}
    />
  );
}

export function Field({ lb, ch }: { lb: string; ch: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-extrabold text-amber-800">{lb}</span>
      {ch}
    </label>
  );
}

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rf = useRef<HTMLDivElement | null>(null);
  const [st, ss] = useState({ rx: 0, ry: 0, on: false });
  const onMv = (e: React.MouseEvent) => {
    const el = rf.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const rx = -((e.clientY - r.top) / r.height - 0.5) * 10;
    ss({ rx, ry, on: true });
  };
  return (
    <div
      ref={rf}
      onMouseMove={onMv}
      onMouseLeave={() => ss({ rx: 0, ry: 0, on: false })}
      className={cn("group relative", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${st.rx}deg) rotateY(${st.ry}deg)`,
        transition: st.on
          ? "transform 80ms linear"
          : "transform 380ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(700px circle at 30% 20%, rgba(255,255,255,0.65), transparent 42%)",
        }}
      />
    </div>
  );
}

export function Acc({ q, a }: { q: string; a: string }) {
  const [op, so] = useState(false);
  return (
    <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] overflow-hidden">
      <button
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
        onClick={() => so(!op)}
      >
        <p className="text-sm font-black text-amber-950">{q}</p>
        <span
          className={cn(
            "text-sm font-black text-amber-700 transition",
            op ? "rotate-45" : "",
          )}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {op && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.35, ease: easeA },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.25, ease: easeA },
            }}
          >
            <div className="px-5 pb-5 text-sm font-semibold text-amber-800 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function useSpot() {
  const [p, sp] = useState({ x: 50, y: 35 });
  const onMv = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    sp({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };
  return { p, onMv };
}
