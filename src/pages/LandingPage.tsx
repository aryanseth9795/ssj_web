import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  fadeUp,
  Btn,
  Pill,
  Stat,
  Acc,
  Inp,
  Sel,
  Field,
  useSpot,
} from "../components/ui";
import { useStaticData } from "../hooks/useStaticData";
import { API_BASE_URL, ENDPOINTS } from "../config/api";
import type { IProduct } from "../types";

export default function LandingPage() {
  const { p, onMv } = useSpot();
  const { data: prices } = useStaticData();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS}`)
      .then((r) => r.json())
      .then((d) => setProducts((d.data || []).slice(0, 8)))
      .catch(() => {});
  }, []);

  const fmtPrice = (v?: number) => (v ? `₹${v.toLocaleString("en-IN")}` : "—");

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-3 sm:px-4 pt-6 sm:pt-10 md:pt-14 pb-4">
        <div
          onMouseMove={onMv}
          className="relative overflow-hidden rounded-2xl sm:rounded-[34px] border border-black/5"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(900px circle at ${p.x}% ${p.y}%, rgba(255,255,255,0.10), transparent 55%)`,
            }}
          />
          <div className="relative p-4 sm:p-7 md:p-10">
            <motion.div
              initial="hid"
              whileInView="shw"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="space-y-5"
            >
              <div className="flex flex-wrap gap-2">
                <Pill ch="✨ Trusted Jewellers" />
                <Pill ch="💰 Best Rates" />
                <Pill ch="📦 Wide Collection" />
                <Pill ch="🔒 BIS Hallmark" />
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black leading-[1.08] tracking-tight text-amber-950">
                Your Trusted
                <span className="block bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  Jewellery Partner
                </span>
              </h1>

              <p className="text-sm md:text-base font-semibold leading-relaxed text-amber-800 max-w-2xl">
                Shri Sai Jwellers — providing the finest gold and silver
                jewellery with transparent pricing and live market rates.
                Explore our collection and get today's best prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/products">
                  <Btn
                    kind="pri"
                    ch={
                      <>
                        Browse Collection <span className="opacity-90">→</span>
                      </>
                    }
                  />
                </Link>
                <Link to="/prices">
                  <Btn kind="sec" ch="View Live Rates" />
                </Link>
              </div>

              {/* Live rates mini-preview */}
              {prices && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2">
                  <Stat
                    s="Gold 999"
                    v={fmtPrice(prices.gold_999_bhav.value)}
                    t="/10g"
                  />
                  <Stat
                    s="Gold 995"
                    v={fmtPrice(prices.gold_995_bhav.value)}
                    t="/10g"
                  />
                  <Stat
                    s="RTGS Gold"
                    v={fmtPrice(prices.rtgs_bhav.value)}
                    t="/10g"
                  />
                  <Stat
                    s="Silver"
                    v={fmtPrice(prices.silver_bhav.value)}
                    t="/kg"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <motion.div
            initial="hid"
            whileInView="shw"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="space-y-4"
          >
            <p className="text-xs font-black tracking-widest text-amber-700">
              OUR COLLECTION
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-amber-950">
              Explore Our Latest Products
            </h2>
            <p className="text-sm font-semibold text-amber-800 max-w-2xl">
              Handcrafted jewellery with the finest materials. Click any item to
              view details.
            </p>

            <div className="mt-4 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => {
                const img = p.thumbnail || p.variants[0]?.images?.[0];
                return (
                  <Link
                    to={`/product/${p._id}`}
                    key={p._id}
                    className="no-underline group"
                  >
                    <div className="rounded-2xl sm:rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] overflow-hidden shadow-[0_18px_60px_-44px_rgba(139,105,20,0.25)] transition hover:shadow-[0_24px_70px_-30px_rgba(139,105,20,0.35)] hover:-translate-y-1">
                      <div className="aspect-square bg-amber-50/50 flex items-center justify-center overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <span className="text-4xl">💎</span>
                        )}
                      </div>
                      <div className="p-3 sm:p-4">
                        <p className="text-xs sm:text-sm font-black text-amber-950 truncate">
                          {p.name}
                        </p>
                        <p className="text-[10px] sm:text-xs font-semibold text-amber-700 mt-1 truncate">
                          {p.variants.length}{" "}
                          {p.variants.length === 1 ? "option" : "options"}
                          {p.variants[0]?.weight
                            ? ` • ${p.variants[0].weight}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-center pt-4">
              <Link to="/products">
                <Btn
                  kind="pri"
                  ch={
                    <>
                      View All Products <span className="opacity-90">→</span>
                    </>
                  }
                />
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
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
            Frequently Asked Questions
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Acc
              q="What types of jewellery do you sell?"
              a="We specialize in gold and silver jewellery including chains, rings, necklaces, bangles, and more. All products are BIS hallmarked for quality assurance."
            />
            <Acc
              q="How are your prices calculated?"
              a="Our prices are based on live MCX rates and updated in real-time. You can always check the latest rates on our Live Rates page."
            />
            <Acc
              q="Do you provide hallmarking?"
              a="Yes, all our gold jewellery is BIS hallmarked. This guarantees the purity and quality of the gold used."
            />
            <Acc
              q="How can I place an order?"
              a="You can browse our collection online and contact us via WhatsApp or phone to place your order. We also welcome walk-in customers at our Jaunpur store."
            />
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <div className="rounded-2xl sm:rounded-[34px] border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-4 sm:p-7 md:p-10 shadow-[0_26px_80px_-60px_rgba(139,105,20,0.35)] overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs font-black tracking-widest text-amber-700">
                  GET IN TOUCH
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-950">
                  Have a question? Reach out!
                </h2>
                <p className="mt-3 text-sm md:text-base font-semibold text-amber-800 leading-relaxed">
                  Contact us for pricing, custom orders, or any queries. We're
                  always happy to help.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Pill ch="Fastest Response" />
                  <Pill ch="Custom Orders" />
                  <Pill ch="Best Prices" />
                </div>
                <div className="mt-7 rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.40))] p-6">
                  <p className="text-sm font-black text-amber-900">
                    Direct Contact
                  </p>
                  <p className="mt-2 text-sm font-semibold text-amber-800">
                    Rakesh Kumar Soni — +91 9889466529
                  </p>
                  <p className="text-sm font-semibold text-amber-800">
                    Piyush Soni — +91 7880448085
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Btn
                      kind="pri"
                      ch="WhatsApp Now"
                      href="https://wa.me/919889466529"
                    />
                    <Btn kind="sec" ch="Call Now" href="tel:+919889466529" />
                  </div>
                </div>
              </div>

              <form
                className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] p-5 sm:p-6 md:p-7"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://wa.me/919889466529?text=Hi, I have a query from the website.",
                    "_blank",
                  );
                }}
              >
                <p className="text-sm font-black text-amber-950">
                  Inquiry Form
                </p>
                <div className="mt-4 grid gap-4">
                  <Inp placeholder="Your Name" required />
                  <Inp placeholder="Phone / WhatsApp" required />
                  <Inp placeholder="What are you looking for?" />
                  <Inp placeholder="Any additional notes" />
                  <Btn
                    kind="pri"
                    ch={
                      <>
                        Send Inquiry <span className="opacity-90">→</span>
                      </>
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
