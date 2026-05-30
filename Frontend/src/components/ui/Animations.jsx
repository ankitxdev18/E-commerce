import { motion } from "framer-motion";

/**
 * Skeleton Product Card Loader
 */
export const SkeletonProductCard = () => {
  return (
    <motion.div
      className="bg-white rounded-lg border border-neutral-200 overflow-hidden"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-full h-48 bg-neutral-300 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-neutral-300 rounded w-3/4" />
        <div className="h-3 bg-neutral-300 rounded w-full" />
        <div className="h-3 bg-neutral-300 rounded w-1/2" />
        <div className="h-8 bg-neutral-300 rounded" />
      </div>
    </motion.div>
  );
};

/**
 * Animated Spinner
 */
export const Spinner = ({ size = "md", color = "text-blue-600" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <motion.div
      className={`${sizes[size]} border-4 border-neutral-200 border-t-blue-600 rounded-full ${color}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

/**
 * Modern Progress Bar
 */
export const ProgressBar = ({ progress = 0, className = "" }) => {
  return (
    <div className={`w-full h-2 bg-neutral-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

/**
 * Animated Empty State
 */
export const EmptyCart = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl mb-4"
      >
        🛒
      </motion.div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Cart is Empty</h2>
      <p className="text-neutral-600">Start shopping to add items to your cart</p>
    </motion.div>
  );
};

/**
 * Animated Error State
 */
export const ErrorAnimation = ({ message = "Something went wrong" }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.5 }}
        className="text-6xl mb-4"
      >
        ⚠️
      </motion.div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error Occurred</h2>
      <p className="text-neutral-600">{message}</p>
    </motion.div>
  );
};

/**
 * Pulse animation for attention
 */
export const PulseAnimation = ({ children }) => {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Shimmer loading effect for images
 */
export const ShimmerLoader = () => {
  return (
    <motion.div
      className="w-full h-64 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-lg"
      animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

export default {
  SkeletonProductCard,
  Spinner,
  ProgressBar,
  EmptyCart,
  ErrorAnimation,
  PulseAnimation,
  ShimmerLoader,
};
