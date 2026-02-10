import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn, Btn, fade, pop } from "./ui";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/prices", label: "Live Rates" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/40 bg-[linear-gradient(90deg,rgba(255,248,230,0.88),rgba(255,248,230,0.72),rgba(255,248,230,0.88))] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 no-underline min-w-0"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-500 text-white shadow-lg shadow-amber-500/30">
            <span className="text-xs sm:text-sm font-black">SS</span>
          </div>
          <div className="leading-tight min-w-0">
            <p className="text-xs sm:text-sm font-black tracking-tight text-amber-900 truncate">
              Shri Sai Jwellers
            </p>
            <p className="text-[9px] sm:text-[10px] font-extrabold text-amber-700 hidden sm:block">
              Trusted Jewellers • Since Generations
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-extrabold transition no-underline",
                  isActive
                    ? "bg-amber-100/60 text-amber-950"
                    : "text-amber-900 hover:bg-amber-100/40",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Btn kind="pri" ch="WhatsApp Now" href="https://wa.me/919889466529" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-xl p-2 bg-amber-100/50 text-amber-900 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-lg font-black">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={fade}
            initial="hid"
            animate="shw"
            exit="hid"
            className="md:hidden border-t border-amber-200/40 bg-[linear-gradient(180deg,rgba(255,248,230,0.95),rgba(255,248,230,0.85))] backdrop-blur-xl"
          >
            <motion.nav
              variants={pop}
              initial="hid"
              animate="shw"
              exit="ext"
              className="flex flex-col gap-1 p-4"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-2xl px-4 py-3 text-sm font-extrabold no-underline transition",
                      isActive
                        ? "bg-amber-200/50 text-amber-950"
                        : "text-amber-900 hover:bg-amber-100/40",
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="mt-2">
                <Btn
                  kind="pri"
                  ch="WhatsApp Now"
                  href="https://wa.me/919889466529"
                  className="w-full"
                />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
