import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye, X } from "lucide-react";
import { updateUser } from "../store/slices/userSlice";
import { Badge } from "./ui/Base";

const QUICK_VIEW_ANIMATION = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

const ModernProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const discount = product.discount ?? Math.max(5, Math.min(40, Math.round(product.price * 0.05)));
  const rating = Math.min(5, Math.max(3, Math.round(product.rating ?? 4)));
  const reviews = product.reviews ?? Math.floor(Math.random() * 150) + 20;

  const handleAddToCart = (e, qty = 1) => {
    e.stopPropagation();
    if (!user) {
      navigate("/signin");
      return;
    }

    const currentCart = Array.isArray(user.cart) ? [...user.cart] : [];
    const existingIndex = currentCart.findIndex((item) => item.product?.id === product.id);

    if (existingIndex === -1) {
      currentCart.push({ product, quantity: qty });
    } else {
      currentCart[existingIndex].quantity += qty;
    }

    dispatch(updateUser({ id: user.id, updates: { ...user, cart: currentCart } }));
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => navigate(`/update-product/${product.id}`)}
        className="group cursor-pointer h-full"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition-shadow duration-300 hover:shadow-xl">
          <div className="relative overflow-hidden bg-slate-100 h-56">
            {discount > 0 && (
              <Badge variant="error" size="sm" className="absolute left-4 top-4 z-10">
                {discount}% OFF
              </Badge>
            )}
            <button
              type="button"
              onClick={(e) => handleWishlist(e)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition hover:text-rose-500 hover:shadow-md"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={20} className={isWishlisted ? "fill-rose-500 text-rose-500" : ""} />
            </button>
            <img
              src={product.image || "https://via.placeholder.com/420x420?text=No+Image"}
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="absolute inset-x-0 bottom-4 mx-auto flex w-fit items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-sm font-medium text-white opacity-0 transition duration-300 hover:bg-slate-900 group-hover:opacity-100"
            >
              <Eye size={18} /> Quick view
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                {product.category || "General"}
              </span>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{rating}.0</span>
                <span className="text-slate-400">({reviews})</span>
              </div>
            </div>

            <h3 className="min-h-[3rem] text-base font-semibold leading-6 text-slate-900 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600 line-clamp-2">{product.description || "Designed for comfort and modern living."}</p>

            <div className="mt-auto flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-900">
                    ${(product.price * (1 - discount / 100)).toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      ${product.price?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => handleAddToCart(e, 1)}
                className={`inline-flex items-center justify-center rounded-3xl px-4 py-2 text-sm font-semibold text-white transition ${
                  isAdded ? "bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
                aria-label="Add product to cart"
              >
                <ShoppingCart size={16} />
                {isAdded ? "Added" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {showQuickView && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Quick view product dialog"
          >
            <motion.div
              {...QUICK_VIEW_ANIMATION}
              className="w-full max-w-3xl overflow-hidden rounded-[30px] bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Quick view</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{product.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuickView(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                  aria-label="Close quick view"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[26px] bg-slate-100">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-slate-700 bg-slate-100">{product.category || "Category"}</Badge>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      <span>{rating}.0</span>
                      <span>• {reviews} reviews</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-7">{product.description || "Experience unmatched quality, premium performance, and clean design in every detail."}</p>

                  <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-slate-900">
                        ${(product.price * (1 - discount / 100)).toFixed(2)}
                      </span>
                      {discount > 0 && <span className="text-sm text-slate-400 line-through">${product.price?.toFixed(2)}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        handleAddToCart(e, 1);
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <ShoppingCart size={18} /> Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsWishlisted(true);
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Heart size={18} className={isWishlisted ? "fill-rose-500 text-rose-500" : ""} />
                      Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(ModernProductCard);
