import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  fetchProductById,
  deleteProduct,
  updateProduct,
} from "../store/slices/productSlice";
import { updateUser } from "../store/slices/userSlice";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  Plus,
  Minus,
  Trash2,
  Edit2,
} from "lucide-react";
import { Button, Badge, Rating } from "../components/ui/Base";
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
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();

  const productFromStore = items.find((p) => String(p.id) === id);
  const product = productFromStore || selectedProduct;

  useEffect(() => {
    if (!productFromStore && String(selectedProduct?.id) !== id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, productFromStore, selectedProduct?.id]);

  if (selectedStatus === "loading" && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (selectedStatus === "failed" || !product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-red-600 text-xl mb-4">
            {selectedError || "Product not found"}
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
          >
            Back to Products
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const currentCart = Array.isArray(user.cart) ? [...user.cart] : [];
    const existingIndex = currentCart.findIndex(
      (item) => item.product?.id === product.id
    );

    if (existingIndex === -1) {
      currentCart.push({ product, quantity });
    } else {
      currentCart[existingIndex].quantity += quantity;
    }

    dispatch(updateUser({ id: user.id, updates: { ...user, cart: currentCart } }));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(product.id));
      navigate("/");
    }
  };

  const handleUpdate = async (data) => {
    const payload = {
      id: product.id,
      product: {
        ...product,
        ...data,
        price: Number(data.price),
      },
    };
    await dispatch(updateProduct(payload));
    setIsEditing(false);
  };

  const images = [product.image, ...(product.gallery || [])].filter(Boolean);
  const discount = product.discount || 15;
  const rating = product.rating || 4.5;
  const stock = product.stock !== undefined ? product.stock : 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center gap-2 text-sm text-neutral-600"
        >
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-600 font-medium"
          >
            Products
          </button>
          <span>/</span>
          <span className="text-neutral-900">{product.category}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                layoutId="product-image"
                className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-neutral-200 h-96 md:h-[500px] flex items-center justify-center group"
              >
                {discount > 0 && (
                  <Badge variant="error" className="absolute top-4 left-4 z-10">
                    -{discount}%
                  </Badge>
                )}
                <motion.img
                  src={images[selectedImage] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx
                          ? "border-blue-600"
                          : "border-neutral-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Title */}
            <div>
              <Badge variant="secondary" className="mb-4">
                {product.category || "Uncategorized"}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-neutral-300"
                    }
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-neutral-900">
                {rating} ({128} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${(product.price * (1 - discount / 100)).toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="text-lg text-neutral-500 line-through">
                    ${product.price?.toFixed(2)}
                  </span>
                )}
                <Badge variant="error" size="sm">
                  Save ${((product.price * discount) / 100).toFixed(2)}
                </Badge>
              </div>
              <p className="text-sm text-green-600 font-medium">
                ✓ Offer valid until stocks last
              </p>
            </div>

            {/* Description */}
            <p className="text-neutral-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Stock Status */}
            <motion.div
              className={`p-3 rounded-lg ${
                stock > 0
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  stock > 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {stock > 0
                  ? `✓ In Stock (${stock} available)`
                  : "Out of Stock"}
              </p>
            </motion.div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-900">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-neutral-100 rounded-lg p-1 w-fit">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-neutral-200 rounded transition-colors"
                >
                  <Minus size={20} />
                </motion.button>
                <span className="font-bold text-lg w-12 text-center">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  className="p-2 hover:bg-neutral-200 rounded transition-colors"
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={stock === 0}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="px-6 py-3 border-2 border-neutral-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
              >
                <Heart
                  size={22}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }
                />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { icon: Truck, label: "Free Shipping", desc: "Worldwide" },
                { icon: Shield, label: "Secure Payment", desc: "100% safe" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <feature.icon className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-medium text-neutral-900 text-sm">
                    {feature.label}
                  </p>
                  <p className="text-xs text-neutral-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Admin Edit */}
            {user?.isAdmin && (
              <div className="pt-6 border-t border-neutral-200">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Edit2 size={18} />
                  {isEditing ? "Cancel Edit" : "Edit Product"}
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-12 border-t border-neutral-200"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.slice(0, 4).map((p) => (
              <ModernProductCard key={p.id} product={p} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ModernProductDetails;
