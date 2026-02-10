import { motion } from "framer-motion";
import { fadeUp } from "../components/ui";
import { useStaticData } from "../hooks/useStaticData";
import { useSSE } from "../hooks/useSSE";
import type { LivePrice } from "../types";

// ─── Helpers ───
function formatPrice(v: string | number) {
  const num = typeof v === "string" ? parseFloat(v) : v;
  if (isNaN(num)) return String(v);
  return num.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function formatTime(dateStr: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return "";
  }
}

// ─── Static Bhav Card ───
function StaticCard({
  title,
  subtitle,
  value,
  updatedAt,
  type,
  unit = "10g",
}: {
  title: string;
  subtitle: string;
  value: number;
  updatedAt: string;
  type: "gold" | "silver";
  unit?: string;
}) {
  const isGold = type === "gold";
  const grad = isGold
    ? "from-yellow-200 via-amber-200 to-yellow-300"
    : "from-violet-200 via-purple-200 to-violet-300";

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-gradient-to-br ${grad} p-3 sm:p-5 shadow-lg flex flex-col items-center gap-1.5 sm:gap-2 overflow-hidden`}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/50 flex items-center justify-center text-xl sm:text-2xl">
        {isGold ? "🥇" : "🥈"}
      </div>
      <div className="text-center">
        <p className="text-[10px] sm:text-xs font-extrabold text-slate-700">
          {title}{" "}
          <span className="text-[10px] font-semibold opacity-60">/{unit}</span>
        </p>
        {subtitle && (
          <p className="text-[10px] font-semibold text-slate-600">{subtitle}</p>
        )}
        <p className="text-lg sm:text-2xl font-black text-slate-900 mt-1 truncate w-full text-center">
          ₹{formatPrice(value)}
        </p>
        <p className="text-[10px] font-medium text-slate-500 mt-1">
          {formatTime(updatedAt)}
        </p>
      </div>
    </div>
  );
}

// ─── Live Price Card ───
const COMMODITY_ICONS: Record<
  string,
  { emoji: string; label: string; grad: string }
> = {
  GOLD: { emoji: "🥇", label: "Gold", grad: "from-yellow-100 to-amber-100" },
  SILVER: { emoji: "🥈", label: "Silver", grad: "from-slate-100 to-gray-200" },
  COPPER: { emoji: "🪙", label: "Copper", grad: "from-orange-100 to-amber-50" },
  CRUDEOIL: {
    emoji: "🛢️",
    label: "Crude Oil",
    grad: "from-gray-100 to-gray-200",
  },
};

function LiveCard({ item }: { item: LivePrice }) {
  const isPositive = !item.priceChange.startsWith("-");
  const config = COMMODITY_ICONS[item.symbol] || {
    emoji: "📊",
    label: item.symbol,
    grad: "from-indigo-50 to-blue-50",
  };
  const absChange = Math.abs(parseFloat(item.priceChange)).toFixed(2);

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-gradient-to-br ${config.grad} border border-black/5 p-3 sm:p-5 shadow-md flex flex-col items-center gap-1.5 sm:gap-2 transition hover:-translate-y-1 hover:shadow-lg overflow-hidden`}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/60 flex items-center justify-center text-xl sm:text-2xl">
        {config.emoji}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold text-slate-800">{config.label}</p>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
      </div>
      <p className="text-[10px] text-slate-500 font-medium -mt-1">
        {item.expDate}
      </p>
      <p className="text-lg sm:text-2xl font-black text-slate-900 truncate w-full text-center">
        ₹{formatPrice(item.lastPrice)}
      </p>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {isPositive ? "▲" : "▼"} ₹{absChange} ({item.priceChangePercentage}%)
      </span>
    </div>
  );
}

// ─── Page ───
export default function PricesPage() {
  const { data: staticData, isLoading: staticLoading } = useStaticData();
  const { data: liveData, isConnected, error: sseError } = useSSE();

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-10 md:py-14 space-y-8 sm:space-y-12">
      {/* Static Bhav */}
      <motion.section
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
        className="space-y-4"
      >
        <p className="text-xs font-black tracking-widest text-amber-700">
          TODAY'S RATE
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-950">
          Gold & Silver Prices
        </h2>
        <p className="text-sm font-semibold text-amber-800 max-w-2xl">
          Rates are updated daily. Contact us for the latest buying/selling
          price.
        </p>

        {staticLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-amber-100/40 h-44 shimmer"
              />
            ))}
          </div>
        ) : staticData ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <StaticCard
              title="Gold 999"
              subtitle="24 Karat Pure"
              value={staticData.gold_999_bhav.value}
              updatedAt={staticData.gold_999_bhav.updated_at}
              type="gold"
            />
            <StaticCard
              title="Gold 995"
              subtitle="23 Karat"
              value={staticData.gold_995_bhav.value}
              updatedAt={staticData.gold_995_bhav.updated_at}
              type="gold"
            />
            <StaticCard
              title="RTGS Gold"
              subtitle="Bank Transfer Rate"
              value={staticData.rtgs_bhav.value}
              updatedAt={staticData.rtgs_bhav.updated_at}
              type="gold"
            />
            <StaticCard
              title="Silver"
              subtitle="Pure Silver"
              value={staticData.silver_bhav.value}
              updatedAt={staticData.silver_bhav.updated_at}
              type="silver"
              unit="kg"
            />
          </div>
        ) : null}
      </motion.section>

      {/* Live MCX */}
      <motion.section
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="text-xs font-black tracking-widest text-amber-700">
            LIVE MCX PRICES
          </p>
          {isConnected ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />{" "}
              Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-700 bg-red-100 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />{" "}
              {sseError || "Connecting..."}
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-950">
          Real-Time Market Prices
        </h2>

        {sseError && !liveData ? (
          <div className="rounded-3xl border border-red-200 bg-red-50/50 p-8 text-center">
            <p className="text-lg">📡</p>
            <p className="text-sm font-bold text-red-700 mt-2">
              MCX feed is currently unavailable
            </p>
            <p className="text-xs text-red-600 mt-1">
              Prices will appear automatically when the feed reconnects
            </p>
          </div>
        ) : !liveData ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-slate-100/50 h-48 shimmer"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {liveData.list.map((item, i) => (
              <LiveCard key={`${item.symbol}-${i}`} item={item} />
            ))}
          </div>
        )}
      </motion.section>

      {/* Disclaimer */}
      <div className="text-center">
        <p className="text-xs font-semibold text-amber-700/60">
          Prices are indicative and subject to market conditions. Contact us for
          confirmation before transactions.
        </p>
      </div>
    </div>
  );
}
