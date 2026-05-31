import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProductById } from "../store/slices/productSlice";
import { updateUser } from "../store/slices/userSlice";
import { ShoppingCart, Heart, Star, Truck, Shield, Plus, Minus } from "lucide-react";
import { Button, Badge } from "../components/ui/Base";
import { Spinner } from "../components/ui/Animations";
import ModernProductCard from "../components/ModernProductCard";

const ModernProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.userReducer);
  const { items, selectedProduct, selectedStatus, selectedError } = useSelector(
    (state) => state.productReducer
  );

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const productFromStore = items.find((p) => String(p.id) === id);
  const product = productFromStore || selectedProduct;

  useEffect(() => {
    if (!productFromStore && String(selectedProduct?.id) !== id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, productFromStore, selectedProduct?.id]);

  const relatedProducts = items
    .filter((item) => item.id !== product?.id && item.category === product?.category)
    .slice(0, 4);

  if (selectedStatus === "loading" && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Spinner size="lg" />
      </div>
    );
  }

  if (selectedStatus === "failed" || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center"
          role="alert"
        >
          <p className="text-xl font-semibold text-rose-700 mb-4">
            {selectedError || "Product not found."}
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to products
          </Button>
        </motion.div>
      </div>
    );
  }

  const images = [product.image, ...(product.gallery || [])].filter(Boolean);
  const discount = product.discount ?? Math.max(10, Math.round((product.price ?? 0) * 0.1));
  const rating = Math.min(5, Math.max(3, Math.round(product.rating ?? 4)));
  const stock = product.stock ?? 50;
  const reviews = product.reviews ?? 68;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const currentCart = Array.isArray(user.cart) ? [...user.cart] : [];
    const existingIndex = currentCart.findIndex((item) => item.product?.id === product.id);
    if (existingIndex === -1) {
      currentCart.push({ product, quantity });
    } else {
      currentCart[existingIndex].quantity += quantity;
    }

    dispatch(updateUser({ id: user.id, updates: { ...user, cart: currentCart } }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <button
            onClick={() => navigate("/")}
            className="font-semibold text-slate-900 hover:text-blue-600"
          >
            Products
          </button>
          <span aria-hidden="true">/</span>
          <span>{product.category || "Uncategorized"}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr]">
          <section aria-labelledby="gallery-title" className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-[36px] border border-slate-200 bg-white p-5 shadow-card">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-100">
                  <img
                    src={images[selectedImage] || product.image}
                    alt={product.title}
                    className="h-[420px] w-full object-cover"
                  />
                  {discount > 0 && (
                    <Badge variant="error" className="absolute left-5 top-5">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.map((src, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View image ${index + 1}`}
                        className={`overflow-hidden rounded-3xl border transition ${
                          selectedImage === index ? "border-blue-600" : "border-slate-200"
                        }`}
                      >
                        <img src={src} alt={`${product.title} ${index + 1}`} className="h-20 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-card">
                <div className="flex flex-col gap-6">
                  <div>
                    <Badge variant="secondary" className="mb-4">
                      {product.category || "Category"}
                    </Badge>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{product.title}</h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-slate-500" aria-label={`Rated ${rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={20}
                          className={idx < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-slate-700">{rating}.0</p>
                    <span className="text-sm text-slate-500">({reviews} reviews)</span>
                  </div>

                  <div className="rounded-[30px] bg-slate-50 p-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Price</p>
                        <div className="mt-2 flex items-baseline gap-3">
                          <span className="text-4xl font-semibold text-slate-900">
                            ${(product.price * (1 - discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-slate-500 line-through">${product.price?.toFixed(2)}</span>
                        </div>
                      </div>
                      <Badge variant="success" className="px-4 py-2 text-sm">
                        Save ${(product.price * discount / 100).toFixed(2)}
                      </Badge>
                    </div>
                    <p className="mt-4 text-sm text-slate-600">Fast shipping, secure checkout, and premium support included.</p>
                  </div>

                  <p className="text-slate-600 leading-8">{product.description}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Stock status</p>
                      <p className={`mt-2 text-base font-semibold ${stock > 0 ? "text-emerald-700" : "text-rose-600"}`}>
                        {stock > 0 ? `${stock} available` : "Out of stock"}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Shipping</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">Free worldwide</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Quantity</p>
                      <div className="mt-3 flex items-center gap-3 rounded-3xl bg-slate-100 p-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          aria-label="Decrease quantity"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-200"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="min-w-[2rem] text-center text-lg font-semibold text-slate-900">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                          aria-label="Increase quantity"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-200"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Delivery</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">2-4 days express</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={stock === 0}
                    >
                      <ShoppingCart size={18} /> Add to cart
                    </Button>
                    <button
                      type="button"
                      onClick={() => setIsWishlisted((prev) => !prev)}
                      aria-pressed={isWishlisted}
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-3xl border px-5 py-3 text-sm font-semibold transition ${
                        isWishlisted ? "border-rose-500 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      <Heart size={18} /> {isWishlisted ? "Wishlisted" : "Add to wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          </section>

          <aside className="space-y-8" aria-labelledby="product-sidebar-title">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-card">
                <h2 id="product-sidebar-title" className="text-2xl font-semibold text-slate-900 mb-5">
                  Product details
                </h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                  {[
                    { term: "Brand", description: product.brand || "ShopHub" },
                    { term: "Category", description: product.category || "General" },
                    { term: "Condition", description: "New" },
                    { term: "SKU", description: `SH-${product.id}` },
                  ].map((item) => (
                    <div key={item.term} className="rounded-3xl bg-slate-50 p-4">
                      <dt className="text-sm text-slate-500">{item.term}</dt>
                      <dd className="mt-2 font-semibold text-slate-900">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-slate-900">Customer reviews</h2>
                  <span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{reviews} reviews</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { name: "Sara W.", rating: 5, comment: "Beautiful product quality and fast delivery." },
                    { name: "Daniel R.", rating: 4, comment: "Loved the user experience, checkout was smooth." },
                    { name: "Priya K.", rating: 5, comment: "Exactly as pictured, premium look and feel." },
                  ].map((review, idx) => (
                    <article key={idx} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{review.name}</p>
                          <div className="flex items-center gap-1 text-amber-400" aria-label={`Rated ${review.rating} out of 5 stars`}>
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={starIndex < review.rating ? "fill-amber-400" : "text-slate-300"}
                                size={16}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-slate-600">{review.comment}</p>
                    </article>
                  ))}
                </div>
              </div>
            </motion.section>

            {relatedProducts.length > 0 && (
              <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-card">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Related products</h2>
                  <div className="grid gap-4">
                    {relatedProducts.map((item) => (
                      <ModernProductCard key={item.id} product={item} />
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ModernProductDetails;
