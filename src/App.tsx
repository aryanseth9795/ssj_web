import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import bg from "./assets/bg.png";
import asset1 from "./assets/asset1.png";

type Metal = "Gold" | "Silver" | "Rose Gold";
type Finish = "Polished" | "Matte" | "Diamond Cut";
type Style =
  | "Rope"
  | "Curb"
  | "Figaro"
  | "Box"
  | "Franco"
  | "Cuban"
  | "Wheat"
  | "Snake";

type Itm = {
  id: string;
  nm: string;
  st: Style;
  mt: Metal;
  fn: Finish;
  mm: number;
  ln: number;
  wt: number;
  tg: string[];
};

const easeA = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hid: { opacity: 0, y: 18, filter: "blur(8px)" },
  shw: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeA },
  },
};

const fade: Variants = {
  hid: { opacity: 0 },
  shw: { opacity: 1, transition: { duration: 0.45, ease: easeA } },
};

const pop: Variants = {
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

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useSpot() {
  const [p, sp] = useState({ x: 50, y: 35 });
  const onMv = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    sp({ x, y });
  };
  return { p, onMv };
}

function Btn({
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
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold tracking-tight transition active:scale-[0.99]";
  const pri =
    "text-white shadow-[0_18px_60px_-28px_rgba(139,105,20,0.45)] hover:brightness-[1.05] bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500";
  const sec =
    "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] text-amber-900 border border-amber-300/40 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]";
  const soft =
    "bg-[linear-gradient(135deg,rgba(255,248,230,0.50),rgba(255,248,230,0.25))] text-amber-900 border border-amber-200/30 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.35))] shadow-[0_14px_40px_-28px_rgba(139,105,20,0.25)]";
  const cls = cn(
    base,
    kind === "pri" ? pri : kind === "sec" ? sec : soft,
    className
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

function Pill({ ch }: { ch: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300/40 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] px-3 py-1 text-xs font-extrabold text-amber-900 shadow-sm">
      {ch}
    </span>
  );
}

function Field({ lb, ch }: { lb: string; ch: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-extrabold text-amber-800">{lb}</span>
      {ch}
    </label>
  );
}

function Inp(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-2xl border border-amber-300/40 px-4 text-sm font-semibold text-amber-900 outline-none",
        "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))]",
        "focus:border-amber-400/60 focus:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]",
        props.className
      )}
    />
  );
}

function Sel(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 w-full rounded-2xl border border-amber-300/40 px-4 text-sm font-semibold text-amber-900 outline-none",
        "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))]",
        "focus:border-amber-400/60 focus:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]",
        props.className
      )}
    />
  );
}

function Stat({ v, t, s }: { v: string; t: string; s: string }) {
  return (
    <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-4 shadow-[0_18px_60px_-44px_rgba(139,105,20,0.25)]">
      <p className="text-xs font-extrabold text-amber-700">{s}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-amber-900">
        {v}
      </p>
      <p className="mt-1 text-sm font-semibold text-amber-800">{t}</p>
    </div>
  );
}

function TiltCard({
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
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 10;
    const rx = -(py - 0.5) * 10;
    ss({ rx, ry, on: true });
  };
  const onLv = () => ss({ rx: 0, ry: 0, on: false });

  return (
    <div
      ref={rf}
      onMouseMove={onMv}
      onMouseLeave={onLv}
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

function Modal({
  open,
  onClose,
  it,
}: {
  open: boolean;
  onClose: () => void;
  it: Itm | null;
}) {
  return (
    <AnimatePresence>
      {open && it && (
        <>
          <motion.div
            variants={fade}
            initial="hid"
            animate="shw"
            exit="hid"
            className="fixed inset-0 z-[80] bg-black/35"
            onClick={onClose}
          />
          <motion.div
            variants={pop}
            initial="hid"
            animate="shw"
            exit="ext"
            className="fixed left-1/2 top-1/2 z-[90] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-[28px] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.30))] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.55)] overflow-hidden backdrop-blur">
              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold text-fuchsia-700">
                      CHAIN SKU
                    </p>
                    <h3 className="mt-1 text-xl md:text-2xl font-black tracking-tight">
                      {it.nm}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-zinc-700">
                      {it.mt} • {it.st} • {it.fn} • {it.mm.toFixed(1)}mm •{" "}
                      {it.ln}" • ~{it.wt}g
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))] px-3 py-2 text-xs font-extrabold hover:brightness-105"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-fuchsia-100/60 via-cyan-100/50 to-amber-100/55 p-5">
                    <p className="text-xs font-extrabold text-zinc-800">
                      B2B Notes
                    </p>
                    <ul className="mt-2 space-y-2 text-sm font-semibold text-zinc-800">
                      <li>• MOQ available for bulk orders</li>
                      <li>• Consistent supply + repeatable finish</li>
                      <li>• Custom length & thickness possible</li>
                      <li>• GST invoice + safe packing</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-black/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))] p-5">
                    <p className="text-xs font-extrabold text-zinc-800">
                      Request Quote
                    </p>
                    <div className="mt-3 grid gap-3">
                      <Inp placeholder="Company / Shop Name" />
                      <Inp placeholder="Phone / WhatsApp" />
                      <Inp placeholder="Required Quantity (pcs)" />
                      <Btn
                        kind="pri"
                        ch={
                          <>
                            Get Wholesale Quote{" "}
                            <span className="opacity-90">→</span>
                          </>
                        }
                        onClick={() =>
                          alert(
                            "Demo: connect this to your backend / WhatsApp."
                          )
                        }
                      />
                      <p className="text-[11px] font-semibold text-zinc-600">
                        Tip: connect to WhatsApp API / CRM to capture leads.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {it.tg.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))] px-3 py-1 text-xs font-extrabold text-zinc-800"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/5 bg-[linear-gradient(90deg,rgba(217,70,239,0.14),rgba(34,211,238,0.12),rgba(251,191,36,0.12))] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-extrabold text-zinc-800/80">
                    Only Chains • B2B Wholesale • No retail sales
                  </p>
                  <div className="flex gap-2">
                    <Btn
                      kind="soft"
                      ch="Download Catalog (PDF)"
                      href="/catalog.pdf"
                    />
                    <Btn
                      kind="sec"
                      ch="WhatsApp Now"
                      href="https://wa.me/910000000000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Acc({ q, a }: { q: string; a: string }) {
  const [op, so] = useState(false);
  return (
    <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] overflow-hidden">
      <button
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
        onClick={() => so(!op)}
      >
        <p className="text-sm font-black text-amber-950">{q}</p>
        <span
          className={cn(
            "text-sm font-black text-amber-700 transition",
            op ? "rotate-45" : ""
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

export default function App() {
  const { p, onMv } = useSpot();

  const data: Itm[] = useMemo(
    () => [
      {
        id: "SS-ROP-GLD-28",
        nm: "Rope Chain • Heavy Shine",
        st: "Rope",
        mt: "Gold",
        fn: "Polished",
        mm: 3.0,
        ln: 22,
        wt: 18,
        tg: ["Fast Moving", "High Margin", "Premium Finish"],
      },
      {
        id: "SS-CUB-SLV-11",
        nm: "Cuban Chain • Daily Wear",
        st: "Cuban",
        mt: "Silver",
        fn: "Polished",
        mm: 2.2,
        ln: 20,
        wt: 12,
        tg: ["Best Seller", "Repeat Orders", "Comfort Fit"],
      },
      {
        id: "SS-FIG-GLD-08",
        nm: "Figaro Chain • Classic",
        st: "Figaro",
        mt: "Gold",
        fn: "Diamond Cut",
        mm: 2.5,
        ln: 24,
        wt: 16,
        tg: ["Trending", "Gift Segment", "Sharp Look"],
      },
      {
        id: "SS-BOX-RSG-02",
        nm: "Box Chain • Minimal",
        st: "Box",
        mt: "Rose Gold",
        fn: "Polished",
        mm: 1.6,
        ln: 18,
        wt: 8,
        tg: ["Premium Minimal", "Youth Trend", "Layering"],
      },
      {
        id: "SS-WHT-SLV-19",
        nm: "Wheat Chain • Premium",
        st: "Wheat",
        mt: "Silver",
        fn: "Matte",
        mm: 2.8,
        ln: 22,
        wt: 15,
        tg: ["Luxury Feel", "High Repeat", "Good Finish"],
      },
      {
        id: "SS-FRN-GLD-55",
        nm: "Franco Chain • Strong Links",
        st: "Franco",
        mt: "Gold",
        fn: "Polished",
        mm: 3.4,
        ln: 24,
        wt: 22,
        tg: ["Bridal", "Heavy Demand", "Strong Build"],
      },
      {
        id: "SS-SNK-SLV-31",
        nm: "Snake Chain • Smooth",
        st: "Snake",
        mt: "Silver",
        fn: "Polished",
        mm: 1.9,
        ln: 20,
        wt: 10,
        tg: ["Daily Wear", "Smooth Look", "Comfort"],
      },
      {
        id: "SS-CRB-GLD-77",
        nm: "Curb Chain • Bold",
        st: "Curb",
        mt: "Gold",
        fn: "Diamond Cut",
        mm: 3.2,
        ln: 22,
        wt: 20,
        tg: ["High Shine", "Premium", "Fast Selling"],
      },
    ],
    []
  );

  /* Filters removed for cleaner UI - only Search remains */
  const [sr, ssr] = useState("");
  const [moq, smoq] = useState(50);
  const [md, smd] = useState<Itm | null>(null);

  const list = useMemo(() => {
    const q = sr.trim().toLowerCase();
    return data.filter((x) =>
      q ? (x.nm + " " + x.id).toLowerCase().includes(q) : true
    );
  }, [data, sr]);

  const dis = useMemo(
    () => (moq >= 100 ? 12 : moq >= 50 ? 8 : moq >= 25 ? 5 : 3),
    [moq]
  );
  const base = 100;
  const idx = Math.round(base * (1 - dis / 100));

  return (
    <div className="min-h-screen text-amber-950">
      {/* NON-BLANK BRIGHT BACKGROUND */}
      {/* BACKGROUND IMAGE - Fixed & Cover */}
      <div className="fixed inset-0 -z-10">
        <img src={bg} alt="background" className="h-full w-full object-cover" />
        {/* Optional overlay for better text readability if needed */}
        {/* <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" /> */}
      </div>
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-amber-200/40 bg-[linear-gradient(90deg,rgba(255,248,230,0.85),rgba(255,248,230,0.70),rgba(255,248,230,0.85))] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-500 text-white shadow-lg shadow-amber-500/30">
              <span className="text-sm font-black">SS</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-black tracking-tight text-amber-900">
                Shri Sai Jwellers
              </p>
              <p className="text-xs font-extrabold text-amber-700">
                B2B Wholesale • Chains Only
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              ["Catalog", "catalog"],
              ["MOQ & Pricing", "pricing"],
              ["Process", "process"],
              ["FAQ", "faq"],
              ["Contact", "contact"],
            ].map(([lb, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="rounded-full px-4 py-2 text-sm font-extrabold text-amber-900 hover:bg-amber-100/50"
              >
                {lb}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <Btn
              kind="soft"
              ch="Download Catalog"
              href="/catalog.pdf"
              className="hidden lg:inline-flex"
            />
            <Btn
              kind="pri"
              ch={
                <>
                  <span className="hidden md:inline">Request Wholesale</span>
                  <span className="md:hidden">Quote</span>
                </>
              }
              onClick={() => scrollToId("contact")}
            />
          </div>
          {/* Mobile menu button */}
          <button
            className="sm:hidden rounded-xl p-2 bg-amber-100/50 text-amber-900"
            onClick={() => scrollToId("contact")}
          >
            <span className="text-sm font-black">Get Quote</span>
          </button>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 md:pt-14 pb-4 md:pb-6">
        <div
          onMouseMove={onMv}
          className="relative overflow-hidden rounded-[34px] border border-black/5 bg-transparent"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(900px circle at ${p.x}% ${p.y}%, rgba(255,255,255,0.10), transparent 55%)`,
            }}
          />

          <div className="relative p-7 md:p-10">
            <motion.div
              initial="hid"
              whileInView="shw"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="space-y-5"
            >
              <div className="flex flex-wrap gap-2">
                <Pill ch="🚫 No Retail Sales" />
                <Pill ch="🔗 Chains Only" />
                <Pill ch="📦 Bulk Dispatch" />
                <Pill ch="🧾 GST Invoice" />
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-[1.03] tracking-tight text-amber-950">
                Wholesale Chain Hub for
                <span className="block bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  Shops, Resellers & Distributors
                </span>
              </h1>

              <p className="text-sm md:text-base font-semibold leading-relaxed text-amber-800 max-w-2xl">
                Shri Sai Jwellers is a B2B-only chain supplier. We focus on
                fast-moving chain styles with consistent finishing and
                repeatable supply—perfect for your shop's daily demand.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Btn
                  kind="pri"
                  ch={
                    <>
                      Browse Chain Catalog <span className="opacity-90">→</span>
                    </>
                  }
                  onClick={() => scrollToId("catalog")}
                />
                <Btn
                  kind="sec"
                  ch="MOQ & Pricing"
                  onClick={() => scrollToId("pricing")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Stat s="B2B Focus" v="100%" t="Wholesale supply" />
                <Stat s="Fast Moving" v="Top" t="Chain styles only" />
                <Stat s="Repeat Orders" v="High" t="Consistent finish" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Asset */}
      <section className="mx-auto max-w-6xl px-4 pb-6 md:pb-1">
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
          <TiltCard className="rounded-[40px] overflow-hidden shadow-2xl">
            <img
              src={asset1}
              alt="Premium Chain Collection"
              className="h-auto w-full object-cover"
            />
          </TiltCard>
        </motion.div>
      </section>

      {/* catalog */}
      <section
        id="catalog"
        className="mx-auto max-w-6xl px-4 pt-4 pb-10 md:py-1"
      >
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="space-y-4"
        >
          <p className="text-xs font-black tracking-widest text-amber-700">
            WHOLESALE CATALOG
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-amber-950">
            Chains only. Built for fast sales.
          </h2>
          <p className="text-sm md:text-base font-semibold text-amber-800 max-w-2xl">
            Search and filter SKUs to match your shop’s demand. Click any SKU
            for quick-view + quote request.
          </p>

          <div className="mt-3 rounded-[28px] border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-5 shadow-[0_26px_80px_-60px_rgba(139,105,20,0.35)]">
            <div className="grid gap-4">
              <Field
                lb="Search SKU / Name"
                ch={
                  <Inp
                    value={sr}
                    onChange={(e) => ssr(e.target.value)}
                    placeholder="e.g. Rope, SS-CRB..."
                  />
                }
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-extrabold text-amber-800">
                Showing <span className="text-amber-950">{list.length}</span>{" "}
                SKUs
              </p>
              <div className="flex gap-2">
                <Btn
                  kind="pri"
                  ch="Request Full Catalog"
                  onClick={() => scrollToId("contact")}
                />
              </div>
            </div>
          </div>

          <div className="hidden md:grid mt-4 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-6 md:gap-4">
            {list.map((x) => (
              <motion.div
                key={x.id}
                initial="hid"
                whileInView="shw"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <TiltCard>
                  <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] p-6 shadow-[0_26px_80px_-60px_rgba(139,105,20,0.35)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black text-amber-700">
                          {x.id}
                        </p>
                        <h3 className="mt-1 text-base font-black text-amber-950">
                          {x.nm}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-amber-800">
                          {x.mt} • {x.st} • {x.fn}
                        </p>
                      </div>
                      <span className="rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 px-3 py-1 text-[11px] font-black text-white">
                        B2B
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { k: "THK", v: `${x.mm.toFixed(1)}mm` },
                        { k: "LEN", v: `${x.ln}"` },
                        { k: "WT", v: `~${x.wt}g` },
                      ].map((b) => (
                        <div
                          key={b.k}
                          className="rounded-2xl border border-amber-200/40 bg-[linear-gradient(135deg,rgba(255,248,230,0.60),rgba(255,248,230,0.30))] p-3"
                        >
                          <p className="text-[11px] font-extrabold text-amber-700">
                            {b.k}
                          </p>
                          <p className="text-sm font-black text-amber-950">
                            {b.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {x.tg.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-amber-300/40 bg-[linear-gradient(135deg,rgba(255,248,230,0.60),rgba(255,248,230,0.30))] px-3 py-1 text-[11px] font-black text-amber-900"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <Btn
                        kind="pri"
                        ch="Quick View"
                        onClick={() => smd(x)}
                        className="flex-1"
                      />
                      <Btn
                        kind="sec"
                        ch="Quote"
                        onClick={() => {
                          smd(x);
                          scrollToId("contact");
                        }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="space-y-4"
        >
          <p className="text-xs font-black tracking-widest text-amber-700">
            MOQ & WHOLESALE PRICING
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-amber-950">
            Better MOQ → better rate
          </h2>
          <p className="text-sm md:text-base font-semibold text-amber-800 max-w-2xl">
            Demo tier model (replace with your real pricing). Move MOQ slider to
            see discount changes.
          </p>

          <div className="rounded-[30px] border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-6 shadow-[0_26px_80px_-60px_rgba(139,105,20,0.35)]">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3">
                <p className="text-sm font-black text-amber-950">
                  Select MOQ (pcs)
                </p>
                <input
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={moq}
                  onChange={(e) => smoq(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-800">
                  <span>10</span>
                  <span className="rounded-full bg-amber-200/50 px-3 py-1 text-amber-900">
                    MOQ: {moq} pcs
                  </span>
                  <span>150</span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.60),rgba(255,248,230,0.30))] p-4">
                    <p className="text-[11px] font-extrabold text-amber-700">
                      DISCOUNT
                    </p>
                    <p className="text-2xl font-black text-amber-600">{dis}%</p>
                  </div>
                  <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.60),rgba(255,248,230,0.30))] p-4">
                    <p className="text-[11px] font-extrabold text-amber-700">
                      PRICE INDEX
                    </p>
                    <p className="text-2xl font-black text-amber-950">{idx}</p>
                  </div>
                  <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.60),rgba(255,248,230,0.30))] p-4">
                    <p className="text-[11px] font-extrabold text-amber-700">
                      LEAD TIME
                    </p>
                    <p className="text-2xl font-black text-amber-800">24–72h</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.40))] p-5">
                <p className="text-xs font-black text-amber-900">
                  Wholesale Includes
                </p>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-amber-800">
                  <li>• Bulk packing + safe dispatch</li>
                  <li>• Consistent finish for repeat sales</li>
                  <li>• Custom length/thickness (on demand)</li>
                  <li>• GST invoice + batch tracking</li>
                </ul>
                <div className="mt-5 flex gap-2">
                  <Btn
                    kind="pri"
                    ch="Get MOQ Quote"
                    onClick={() => scrollToId("contact")}
                  />
                  <Btn kind="sec" ch="Download Catalog" href="/catalog.pdf" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* process */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="space-y-4"
        >
          <p className="text-xs font-black tracking-widest text-amber-700">
            ORDER PROCESS
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-amber-950">
            Simple B2B workflow
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Send Requirements",
                d: "Style, metal, finish, thickness, length, quantity.",
                i: "📝",
              },
              {
                t: "Confirm Quote",
                d: "We share wholesale quote + MOQ + dispatch timeline.",
                i: "✅",
              },
              {
                t: "Ready Stock / Custom",
                d: "Ready dispatch or custom order as required.",
                i: "🏭",
              },
              {
                t: "Dispatch",
                d: "Secure packing + invoice + tracking shared.",
                i: "🚚",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-6 shadow-[0_22px_60px_-52px_rgba(139,105,20,0.35)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,248,230,0.80),rgba(255,248,230,0.50))] border border-amber-300/40 text-xl">
                  {x.i}
                </div>
                <p className="mt-4 text-sm font-black text-amber-950">{x.t}</p>
                <p className="mt-2 text-sm font-semibold text-amber-800 leading-relaxed">
                  {x.d}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* faq */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="space-y-4"
        >
          <p className="text-xs font-black tracking-widest text-amber-700">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-amber-950">
            Quick answers for B2B buyers
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Acc
              q="Do you sell retail?"
              a="No. We are B2B only and supply chains in wholesale quantities to shops, resellers, and distributors."
            />
            <Acc
              q="Do you sell only chains?"
              a="Yes. Our entire focus is chains—fast-moving styles with consistent finishing and repeatable supply."
            />
            <Acc
              q="Can I order custom length / thickness?"
              a="Yes. Custom length/thickness is possible based on MOQ and timeline. Share your requirement for a quote."
            />
            <Acc
              q="What about dispatch and invoice?"
              a="We provide safe packing, dispatch support, GST invoice, and tracking details."
            />
          </div>
        </motion.div>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <div className="rounded-[34px] border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-5 sm:p-7 md:p-10 shadow-[0_26px_80px_-60px_rgba(139,105,20,0.35)]">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs font-black tracking-widest text-amber-700">
                  WHOLESALE INQUIRY
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-950">
                  Get your chain quote in minutes
                </h2>
                <p className="mt-3 text-sm md:text-base font-semibold text-amber-800 leading-relaxed">
                  Share your style + MOQ. We'll reply with best rate, timeline,
                  and dispatch details.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Pill ch="B2B Only" />
                  <Pill ch="Chains Only" />
                  <Pill ch="Fast Dispatch" />
                  <Pill ch="Repeatable Finish" />
                </div>

                <div className="mt-7 rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.40))] p-6">
                  <p className="text-sm font-black text-amber-900">
                    Direct Contact
                  </p>
                  <p className="text-sm font-black text-amber-950">
                    Ayush Soni
                  </p>
                  <p className="mt-2 text-sm font-semibold text-amber-800">
                    Phone: +91 6306216958
                  </p>
                  <p className="text-sm font-semibold text-amber-800">
                    WhatsApp: +91 6306216958
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Btn
                      kind="pri"
                      ch="WhatsApp Now"
                      href="https://wa.me/916306216958"
                    />
                    <Btn kind="sec" ch="Call Now" href="tel:+916306216958" />
                  </div>
                </div>
              </div>

              <form
                className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] p-5 sm:p-6 md:p-7"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Demo: form submitted. Connect this to your backend/CRM/WhatsApp."
                  );
                }}
              >
                <p className="text-sm font-black text-amber-950">
                  Inquiry Form
                </p>
                <div className="mt-4 grid gap-4">
                  <Inp placeholder="Company / Shop Name" required />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Inp placeholder="Your Name" required />
                    <Inp placeholder="Phone / WhatsApp" required />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Sel defaultValue="Rope">
                      {[
                        "Rope",
                        "Curb",
                        "Figaro",
                        "Box",
                        "Franco",
                        "Cuban",
                        "Wheat",
                        "Snake",
                      ].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </Sel>
                    <Sel defaultValue="Gold">
                      {["Gold", "Silver", "Rose Gold"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </Sel>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Inp placeholder="Thickness (mm)" />
                    <Inp placeholder="Length (inch)" />
                    <Inp placeholder="MOQ (pcs)" />
                  </div>
                  <Inp placeholder="Any note (finish / design / target price)" />
                  <Btn
                    kind="pri"
                    ch={
                      <>
                        Send Inquiry <span className="opacity-90">→</span>
                      </>
                    }
                  />
                  <p className="text-[11px] font-semibold text-amber-700">
                    Only chains • B2B wholesale • No retail orders accepted.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-amber-200/40 bg-[linear-gradient(90deg,rgba(255,248,230,0.85),rgba(255,248,230,0.70),rgba(255,248,230,0.85))]">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-extrabold text-amber-800">
            © {new Date().getFullYear()} Shri Sai Jwellers • B2B Wholesale •
            Chains Only
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => scrollToId("catalog")}
              className="text-xs font-black text-amber-900 hover:underline"
            >
              Catalog
            </button>
            <button
              onClick={() => scrollToId("pricing")}
              className="text-xs font-black text-amber-900 hover:underline"
            >
              MOQ & Pricing
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="text-xs font-black text-amber-900 hover:underline"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      <Modal open={!!md} onClose={() => smd(null)} it={md} />
    </div>
  );
}
