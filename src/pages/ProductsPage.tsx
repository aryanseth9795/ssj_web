import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../components/ui";
import { API_BASE_URL, ENDPOINTS } from "../config/api";
import type { ICategory, IProduct } from "../types";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("category");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [prodLoading, setProdLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetch(`${API_BASE_URL}${ENDPOINTS.CATEGORIES}`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []))
      .catch(() => {})
      .finally(() => setCatLoading(false));
  }, []);

  // Fetch products when category changes
  const fetchProducts = useCallback(async (catId: string | null) => {
    setProdLoading(true);
    try {
      const url = catId
        ? `${API_BASE_URL}${ENDPOINTS.PRODUCTS_BY_CATEGORY}/${catId}`
        : `${API_BASE_URL}${ENDPOINTS.PRODUCTS}`;
      const r = await fetch(url);
      const d = await r.json();
      setProducts(d.data || []);
    } catch {
      setProducts([]);
    } finally {
      setProdLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(activeCat);
  }, [activeCat, fetchProducts]);

  const selectCategory = (catId: string | null) => {
    if (catId) setSearchParams({ category: catId });
    else setSearchParams({});
  };

  const activeCatName = categories.find((c) => c._id === activeCat)?.name;

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-10 md:py-14 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
        className="space-y-2"
      >
        <p className="text-xs font-black tracking-widest text-amber-700">
          OUR COLLECTION
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-950">
          {activeCatName ? activeCatName : "Shop by Category"}
        </h1>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {catLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-amber-100/40 h-40 shimmer"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => selectCategory(null)}
              className={`rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer border ${
                !activeCat
                  ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white border-transparent shadow-lg"
                  : "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] text-amber-900 border-amber-300/40 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => selectCategory(cat._id)}
                className={`rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer border ${
                  activeCat === cat._id
                    ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white border-transparent shadow-lg"
                    : "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] text-amber-900 border-amber-300/40 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Products Grid */}
      {prodLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-3xl bg-amber-100/40 h-64 shimmer" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.65),rgba(255,248,230,0.30))] p-8 sm:p-12 text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-lg font-black text-amber-950">No products found</p>
          <p className="text-sm font-semibold text-amber-800 mt-1">
            {activeCat
              ? "Try selecting a different category."
              : "Check back later for new arrivals."}
          </p>
        </div>
      ) : (
        <motion.div
          initial="hid"
          whileInView="shw"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-4xl">💎</span>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm font-black text-amber-950 truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-amber-700 mt-1 truncate">
                        {p.category?.name}
                      </p>
                      <p className="text-[10px] sm:text-xs font-semibold text-amber-800 mt-1 truncate">
                        {p.variants[0]?.weight ? p.variants[0].weight : ""}
                        {p.variants.length > 1
                          ? ` • ${p.variants.length} options`
                          : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
