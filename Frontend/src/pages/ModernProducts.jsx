import { useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import useInfinite from "../utils/useInfinite";
import ModernProductCard from "../components/ModernProductCard";
import { SkeletonProductCard, Spinner, EmptyCart } from "../components/ui/Animations";
import { Button } from "../components/ui/Base";
import { Zap, TrendingUp, Gift, Truck } from "lucide-react";

const categories = [
  { label: "All", value: "All" },
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Books", value: "books" },
  { label: "Home", value: "home" },
  { label: "Sports", value: "sports" },
];

const testimonials = [
  {
    quote: "ShopHub made shopping effortless. The whole experience feels premium and polished.",
    name: "Mia Brook",
    role: "Verified Buyer",
  },
  {
    quote: "Fast shipping, beautiful product pages, and a checkout flow that feels modern.",
    name: "Noah Lee",
    role: "Frequent Shopper",
  },
  {
    quote: "I love how clear and responsive the UI is across mobile and desktop.",
    name: "Alex Kim",
    role: "Product Designer",
  },
];

const ModernProducts = () => {
  const productsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const { products, hasMore, status, error, fetchLazyProducts } = useInfinite();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter(
            (product) =>
              product.category?.toLowerCase() === selectedCategory.toLowerCase()
          ),
    [products, selectedCategory]
  );

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);
  const trendingProducts = useMemo(() => products.slice(4, 8), [products]);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-hero-pattern bg-cover bg-center py-20 sm:py-24"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
                Premium shopping experience
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Discover products that feel modern, polished, and effortless.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                ShopHub combines premium product discovery with fast checkout, secure payment flows, and thoughtful design across every screen.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollTo(productsRef)}
                  aria-label="Scroll to product collections"
                >
                  Browse collections
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => scrollTo(testimonialsRef)}
                  aria-label="Scroll to testimonials"
                >
                  Hear from shoppers
                </Button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-[32px] bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">Featured</p>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900 line-clamp-2">{product.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-2">{product.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[32px] bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-slate-900">Why ShopHub</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Built for high-converting experiences, fast browsing, and elegant product discovery.
            </p>
          </div>
          {[
            { icon: Truck, title: "Fast shipping", text: "Delivered to your door in record time." },
            { icon: Gift, title: "Exclusive deals", text: "Curated offers for your next purchase." },
            { icon: Zap, title: "Fluid checkout", text: "Secure and simple payment experiences." },
          ].map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md"
            >
              <feature.icon className="h-11 w-11 rounded-3xl bg-blue-50 p-3 text-blue-600" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-slate-600 leading-7">{feature.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Browse by category</h2>
            <p className="mt-2 text-slate-600">Filter the collection to find the perfect match for your lifestyle.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
              aria-pressed={selectedCategory === category.value}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                selectedCategory === category.value
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={productsRef} id="collections">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">New arrivals</h2>
            <p className="mt-2 text-slate-600">Quality products updated daily for modern shoppers.</p>
          </div>
          <p className="text-sm text-slate-500">Showing {filteredProducts.length} products</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {status === "loading" && products.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        ) : status === "failed" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-rose-200 bg-rose-50 p-10 text-center"
          >
            <p className="text-xl font-semibold text-rose-700">Unable to load products</p>
            <p className="mt-3 text-slate-600">{error || "An unexpected error occurred."}</p>
            <Button variant="primary" className="mt-6" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </motion.div>
        ) : filteredProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <InfiniteScroll
            dataLength={filteredProducts.length}
            next={fetchLazyProducts}
            hasMore={hasMore}
            loader={
              <div className="py-12 text-center">
                <Spinner />
              </div>
            }
            endMessage={
              <p className="py-12 text-center text-slate-500">You’ve reached the end of the collection.</p>
            }
          >
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ModernProductCard key={product.id} product={product} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-card">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">Limited time offer</span>
              <h2 className="text-3xl font-semibold text-slate-900">Upgrade your style with curated deals.</h2>
              <p className="text-slate-600 leading-7">
                Explore seasonal picks, exclusive bundles, and trending products designed to delight your everyday routine.
              </p>
              <Button variant="primary" size="lg">
                See deals
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trendingProducts.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900 line-clamp-2">{item.title}</p>
                  <p className="mt-3 text-sm text-slate-600">${item.price?.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={testimonialsRef}>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Testimonials</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Customers love the new ShopHub experience</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              whileHover={{ y: -6 }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-slate-600 leading-7">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold">Never miss a launch</h2>
          <p className="mt-3 text-slate-200 leading-7">
            Join our newsletter for new arrivals, exclusive previews, and member-only perks.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-white/70 sm:max-w-md"
            />
            <Button variant="secondary" size="lg" className="rounded-full px-8 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernProducts;
