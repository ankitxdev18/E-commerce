import { motion } from "framer-motion";

/**
 * Modern Button Component
 * Variants: primary, secondary, outline, ghost
 * Sizes: sm, md, lg
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 font-primary flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md active:scale-95",
    secondary:
      "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-500 active:scale-95",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:scale-95",
    ghost:
      "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-400 active:scale-95",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </motion.button>
  );
};

/**
 * Modern Card Component
 */
export const Card = ({ children, className = "", hover = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-card transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Modern Badge Component
 */
export const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-100 text-blue-700",
    secondary: "bg-neutral-100 text-neutral-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`font-medium rounded-full inline-block ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

/**
 * Modern Input Component
 */
export const Input = ({
  label,
  error,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <Icon size={20} />
          </span>
        )}
        <input
          className={`w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            Icon ? "pl-10" : ""
          } ${error ? "border-red-500 focus:ring-red-500" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

/**
 * Modern Skeleton Loader
 */
export const Skeleton = ({ width = "w-full", height = "h-4", className = "" }) => {
  return (
    <motion.div
      className={`bg-neutral-200 rounded-lg ${width} ${height} ${className}`}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

/**
 * Rating Stars Component
 */
export const Rating = ({ value = 0, maxValue = 5, color = "text-yellow-400" }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxValue }).map((_, i) => (
        <span key={i} className={`text-lg ${i < value ? color : "text-neutral-300"}`}>
          ★
        </span>
      ))}
    </div>
  );
};

/**
 * Modern Divider
 */
export const Divider = ({ className = "" }) => (
  <div className={`h-px bg-neutral-200 ${className}`} />
);

/**
 * Pricing Tag Component
 */
export const Price = ({ amount, original, sale = false }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold ${sale ? "text-red-600 text-2xl" : "text-neutral-900 text-xl"}`}>
        ${amount.toFixed(2)}
      </span>
      {original && original > amount && (
        <span className="text-neutral-500 line-through text-sm">
          ${original.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default {
  Button,
  Card,
  Badge,
  Input,
  Skeleton,
  Rating,
  Divider,
  Price,
};
