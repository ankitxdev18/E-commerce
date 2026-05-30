import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { updateUser } from "../store/slices/userSlice";
import { Badge, Rating } from "./ui/Base";

const ModernProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/signin");
      return;
    }

    const currentCart = Array.isArray(user.cart) ? [...user.cart] : [];
    const existingIndex = currentCart.findIndex(
      (item) => item.product?.id === product.id
    );

    if (existingIndex === -1) {
      currentCart.push({ product, quantity: 1 });
    } else {
      currentCart[existingIndex].quantity += 1;
    }

    dispatch(updateUser({ id: user.id, updates: { ...user, cart: currentCart } }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discount = product.discount || Math.floor(Math.random() * 40);
  const rating = product.rating || Math.floor(Math.random() * 5) + 1;
  const reviews = product.reviews || Math.floor(Math.random() * 100) + 10;

  return (
    <motion.div
      layoutId={`product-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/update-product/${product.id}`)}
      className="cursor-pointer h-full"
    >
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-neutral-100 h-48 group">
          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="absolute top-3 left-3 z-10"
            >
              <Badge variant="error" size="sm">
                -{discount}%
              </Badge>
            </motion.div>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-400"}
            />
          </motion.button>

          {/* Product Image */}
          <motion.img
            src={product.image || "https://via.placeholder.com/300x300?text=Product"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Quick View Button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickView(true);
            }}
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 flex items-center justify-center transition-all duration-300"
          >
            <div className="text-white flex flex-col items-center gap-2">
              <Eye size={32} />
              <span className="text-sm font-medium">Quick View</span>
            </div>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-neutral-500 uppercase tracking-wide font-semibold mb-2"
          >
            {product.category || "Uncategorized"}
          </motion.div>

          {/* Title */}
          <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-2 text-sm hover:text-blue-600 transition-colors">
            {product.title || "Untitled Product"}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-neutral-700">
                {rating}.0
              </span>
            </div>
            <span className="text-xs text-neutral-500">({reviews} reviews)</span>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-600 line-clamp-2 mb-3 flex-1">
            {product.description || "Great product"}
          </p>

          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-900">
                ${(product.price * (1 - discount / 100)).toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-neutral-500 line-through">
                  ${product.price?.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              isAdded
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={18} />
            {isAdded ? "Added!" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProductCard;
