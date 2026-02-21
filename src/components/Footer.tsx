import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-amber-200/40 bg-[linear-gradient(90deg,rgba(255,248,230,0.88),rgba(255,248,230,0.72),rgba(255,248,230,0.88))]">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black text-amber-900">Shri Sai Jwellers</p>
          <p className="text-xs font-semibold text-amber-700 mt-1">
            Sai Katra, Hanuman Ghat Gali, Jaunpur 222001
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { to: "/", label: "Home" },
            { to: "/prices", label: "Live Rates" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About Us" },
            { to: "/privacy-policy", label: "Privacy Policy" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-black text-amber-900 hover:underline no-underline"
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="text-xs font-extrabold text-amber-800">
          © {new Date().getFullYear()} Shri Sai Jwellers • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
