import { lazy, Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import useInfinite from "../utils/useInfinite";
import ModernProductCard from "../components/ModernProductCard";
import { SkeletonProductCard, Spinner, EmptyCart } from "../components/ui/Animations";
import { Button } from "../components/ui/Base";
import { Zap, TrendingUp, Gift, Truck } from "lucide-react";

const ModernProducts = () => {
  const { products, hasMore, status, error, fetchLazyProducts } = useInfinite();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Books",
    "Home",
    "Sports",
  ];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Shop Your <span className="text-blue-200">Favorites</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Discover premium products handpicked just for you. Fast shipping, secure checkout, and 100% satisfaction guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">
                  Explore Now
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="w-80 h-80 bg-white/20 rounded-3xl border-2 border-white/30 flex items-center justify-center text-6xl">
                🛍️
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, label: "Fast Shipping", desc: "Worldwide delivery" },
            { icon: Gift, label: "Best Deals", desc: "Exclusive discounts" },
            { icon: Zap, label: "Quick Payment", desc: "Secure checkout" },
            { icon: TrendingUp, label: "Trending", desc: "Latest products" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 text-center hover:shadow-md transition-all"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-1">{feature.label}</h3>
              <p className="text-sm text-neutral-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Shop by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-blue-300"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {status === "loading" && products.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {status === "failed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-8 text-center"
          >
            <p className="text-red-600 font-medium mb-4">
              ⚠️ {error || "Failed to load products"}
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && status !== "loading" && (
          <EmptyCart />
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <InfiniteScroll
            dataLength={filteredProducts.length}
            next={fetchLazyProducts}
            hasMore={hasMore}
            loader={
              <div className="col-span-full flex justify-center py-12">
                <Spinner />
              </div>
            }
            endMessage={
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 text-neutral-500 font-medium"
              >
                ✅ You've seen all products
              </motion.p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Suspense
                  key={product.id}
                  fallback={<SkeletonProductCard />}
                >
                  <ModernProductCard product={product} />
                </Suspense>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get exclusive deals, new products, and special offers sent to your inbox
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-neutral-900"
              />
              <Button variant="secondary" size="md">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ModernProducts;
