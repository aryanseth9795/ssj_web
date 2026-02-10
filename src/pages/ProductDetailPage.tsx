import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, Btn, cn } from "../components/ui";
import { API_BASE_URL, ENDPOINTS } from "../config/api";
import type { IProduct, IVariant } from "../types";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS}/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setProduct(d.data || d);
        setSelectedVariant(0);
        setSelectedImage(0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-3 sm:px-4 py-8 sm:py-14">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <div className="aspect-square rounded-3xl bg-amber-100/40 shimmer" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded-2xl bg-amber-100/40 shimmer" />
            <div className="h-5 w-1/3 rounded-xl bg-amber-100/40 shimmer" />
            <div className="h-24 rounded-2xl bg-amber-100/40 shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-xl font-black text-amber-950">Product not found</p>
        <Link to="/products" className="mt-4 inline-block">
          <Btn kind="pri" ch="← Back to Products" />
        </Link>
      </div>
    );
  }

  const variant: IVariant | undefined = product.variants[selectedVariant];
  const images = variant?.images?.length
    ? variant.images
    : product.thumbnail
      ? [product.thumbnail]
      : [];
  const currentImg = images[selectedImage] || null;

  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-4 py-6 sm:py-10 md:py-14">
      {/* Breadcrumb */}
      <motion.div
        initial="hid"
        animate="shw"
        variants={fadeUp}
        className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-amber-800 overflow-hidden"
      >
        <Link
          to="/products"
          className="hover:underline no-underline text-amber-700"
        >
          Products
        </Link>
        <span className="text-amber-500">›</span>
        {product.category?.name && (
          <>
            <Link
              to={`/products?category=${product.category._id}`}
              className="hover:underline no-underline text-amber-700"
            >
              {product.category.name}
            </Link>
            <span className="text-amber-500">›</span>
          </>
        )}
        <span className="text-amber-950 font-bold truncate">
          {product.name}
        </span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
        {/* Image Gallery */}
        <motion.div initial="hid" animate="shw" variants={fadeUp}>
          <div className="rounded-2xl sm:rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] overflow-hidden shadow-lg">
            {/* Main Image */}
            <div className="aspect-square bg-amber-50/50 flex items-center justify-center overflow-hidden relative">
              <AnimatePresence mode="wait">
                {currentImg ? (
                  <motion.img
                    key={currentImg}
                    src={currentImg}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.span
                    key="placeholder"
                    className="text-6xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    💎
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition",
                      selectedImage === i
                        ? "border-amber-600 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial="hid"
          animate="shw"
          variants={fadeUp}
          className="space-y-4 sm:space-y-6"
        >
          {/* Category badge */}
          {product.category?.name && (
            <span className="inline-block rounded-full bg-amber-200/50 px-3 py-1 text-xs font-bold text-amber-900">
              {product.category.name}
            </span>
          )}

          {/* Name */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-950 tracking-tight">
            {product.name}
          </h1>

          {/* Variant specs */}
          {variant && (variant.weight || variant.size) && (
            <div className="flex flex-wrap gap-3">
              {variant.weight && (
                <div className="rounded-xl sm:rounded-2xl border border-amber-300/40 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2">
                  <span className="text-sm">⚖️</span>
                  <div>
                    <p className="text-[10px] font-bold text-amber-700">
                      WEIGHT
                    </p>
                    <p className="text-sm font-black text-amber-950">
                      {variant.weight}
                    </p>
                  </div>
                </div>
              )}
              {variant.size && (
                <div className="rounded-xl sm:rounded-2xl border border-amber-300/40 bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2">
                  <span className="text-sm">📐</span>
                  <div>
                    <p className="text-[10px] font-bold text-amber-700">SIZE</p>
                    <p className="text-sm font-black text-amber-950">
                      {variant.size}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-amber-800">SELECT VARIANT</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v._id}
                    onClick={() => {
                      setSelectedVariant(i);
                      setSelectedImage(0);
                    }}
                    className={cn(
                      "rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer border",
                      selectedVariant === i
                        ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white border-transparent shadow-lg"
                        : "bg-[linear-gradient(135deg,rgba(255,248,230,0.70),rgba(255,248,230,0.35))] text-amber-900 border-amber-300/40 hover:bg-[linear-gradient(135deg,rgba(255,248,230,0.85),rgba(255,248,230,0.50))]",
                    )}
                  >
                    {v.weight || v.size || `Option ${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div>
              <p className="text-xs font-bold text-amber-800 mb-2">
                DESCRIPTION
              </p>
              <p className="text-sm font-semibold text-amber-800 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Btn
              kind="pri"
              ch={
                <>
                  Inquire on WhatsApp <span className="opacity-90">→</span>
                </>
              }
              href={`https://wa.me/919889466529?text=Hi, I'm interested in "${product.name}"${variant?.weight ? ` (${variant.weight})` : ""}. Please share details.`}
            />
            <Btn kind="sec" ch="Call Now" href="tel:+919889466529" />
          </div>

          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 no-underline hover:underline mt-4"
          >
            ← Back to Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
