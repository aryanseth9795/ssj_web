import { motion } from "framer-motion";
import { fadeUp, Btn } from "../components/ui";

// Exact same data as App's ProfileScreen
const BIZ = {
  name: "Shri Sai Jewellers",
  address: "Sai Katra, Hanuman Ghat Gali, Jaunpur 222001",
  mapUrl: "https://maps.app.goo.gl/iTZUPuDqRFfQryDK6",
  proprietors: [
    {
      name: "Rakesh Kumar Soni",
      phone: "+91 9889466529",
      role: "Proprietor",
      wa: "https://wa.me/919889466529",
    },
    {
      name: "Piyush Soni",
      phone: "+91 7880448085",
      role: "Proprietor",
      wa: "https://wa.me/917880448085",
    },
  ],
  bank: {
    bankName: "HDFC Bank",
    holder: "Shri Sai Jewellers",
    account: "5020 0062 2060 15",
    ifsc: "HDFC0000867",
    branch: "Main Branch, Jaunpur",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919889466529",
  },
};

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] p-4 sm:p-6 shadow-[0_18px_60px_-44px_rgba(139,105,20,0.25)] overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-base sm:text-lg font-black text-amber-950">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-4 py-6 sm:py-10 md:py-14 space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="rounded-2xl sm:rounded-[34px] bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-500 p-5 sm:p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto text-2xl sm:text-4xl mb-3 sm:mb-4">
            💎
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black">
            {BIZ.name}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-white/80">⭐</span>
            <p className="text-sm font-semibold text-white/90 tracking-wider">
              Trust • Quality • Excellence
            </p>
            <span className="text-white/80">⭐</span>
          </div>
          <p className="mt-3 text-xs font-medium text-white/70 bg-white/15 inline-block px-4 py-1.5 rounded-full">
            Established Jeweller • Jaunpur
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Location */}
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Card title="Our Location" icon="📍">
            <p className="text-sm font-semibold text-amber-800 leading-relaxed">
              {BIZ.address}
            </p>
            <a
              href={BIZ.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-600 text-white px-4 py-3 text-sm font-bold no-underline hover:brightness-105 transition"
            >
              🗺️ Open in Google Maps →
            </a>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Card title="Contact Us" icon="📞">
            <div className="space-y-4">
              {BIZ.proprietors.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/30 border border-amber-200/30"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-200/50 flex items-center justify-center text-lg">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-amber-950">{p.name}</p>
                    <p className="text-[10px] font-semibold text-amber-700">
                      {p.role}
                    </p>
                    <p className="text-xs font-medium text-amber-800">
                      {p.phone}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={p.wa}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white text-sm no-underline hover:brightness-110 transition"
                    >
                      💬
                    </a>
                    <a
                      href={`tel:${p.phone.replace(/\s/g, "")}`}
                      className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm no-underline hover:brightness-110 transition"
                    >
                      📞
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bank Details */}
      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Card title="Bank Details" icon="🏦">
          <div className="rounded-xl sm:rounded-2xl bg-white/30 border border-amber-200/30 p-3 sm:p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏛️</span>
              <p className="text-lg font-bold text-blue-700">
                {BIZ.bank.bankName}
              </p>
            </div>
            <div className="space-y-3">
              {[
                ["Account Holder", BIZ.bank.holder],
                ["Account Number", BIZ.bank.account],
                ["IFSC Code", BIZ.bank.ifsc],
                ["Branch", BIZ.bank.branch],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 py-2 ${i < 3 ? "border-b border-amber-200/30" : ""}`}
                >
                  <p className="text-xs font-semibold text-amber-700">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-amber-950 sm:text-right break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Social */}
      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Card title="Connect With Us" icon="🔗">
          <p className="text-xs text-amber-700 text-center mb-4">
            Follow us on social media
          </p>
          <div className="flex justify-center gap-6">
            <a
              href={BIZ.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 no-underline group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition">
                📷
              </div>
              <p className="text-[10px] font-semibold text-amber-800">
                Instagram
              </p>
            </a>
            <a
              href={BIZ.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 no-underline group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition">
                📘
              </div>
              <p className="text-[10px] font-semibold text-amber-800">
                Facebook
              </p>
            </a>
            <a
              href={BIZ.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 no-underline group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition">
                💬
              </div>
              <p className="text-[10px] font-semibold text-amber-800">
                WhatsApp
              </p>
            </a>
          </div>
        </Card>
      </motion.div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-xs text-amber-700/60 font-semibold">
          © 2026 {BIZ.name} • All rights reserved
        </p>
      </div>
    </div>
  );
}
