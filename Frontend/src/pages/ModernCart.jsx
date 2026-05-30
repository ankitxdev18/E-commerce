import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { updateUser } from "../store/slices/userSlice";
import { Button, Divider, Price } from "../components/ui/Base";

const ModernCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const cartItems = Array.isArray(user?.cart) ? user.cart : [];

  const handleQuantityChange = (index, quantity) => {
    if (quantity < 1) return;

    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity;

    dispatch(updateUser({ id: user.id, updates: { ...user, cart: updatedCart } }));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    dispatch(updateUser({ id: user.id, updates: { ...user, cart: updatedCart } }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.product?.price || 0) * item.quantity,
    0
  );

  const savingsAmount = cartItems.reduce(
    (total, item) => total + ((item.product?.originalPrice || 0) - (item.product?.price || 0)) * item.quantity,
    0
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Sign In Required
          </h2>
          <p className="text-neutral-600 mb-6">
            Please sign in to view your cart
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/signin")}
          >
            Go to Sign In
          </Button>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🛒
          </motion.div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Cart is Empty
          </h2>
          <p className="text-neutral-600 mb-6 text-lg">
            Start shopping to add items to your cart
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-neutral-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.product?.id}-${index}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={
                          item.product?.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.product?.title}
                        className="w-24 h-24 object-cover rounded-lg bg-neutral-100"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                          {item.product?.title || "Unknown Product"}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-4">
                          {item.product?.category || "Uncategorized"}
                        </p>
                        <Price amount={item.product?.price || 0} />
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-neutral-100 rounded-lg px-3 py-2 h-fit">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleQuantityChange(index, item.quantity - 1)
                          }
                          className="p-1 hover:bg-neutral-200 rounded transition-colors"
                        >
                          <Minus size={18} className="text-neutral-600" />
                        </motion.button>
                        <span className="font-semibold text-neutral-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleQuantityChange(index, item.quantity + 1)
                          }
                          className="p-1 hover:bg-neutral-200 rounded transition-colors"
                        >
                          <Plus size={18} className="text-neutral-600" />
                        </motion.button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm text-neutral-600 mb-1">
                          Subtotal
                        </p>
                        <Price
                          amount={
                            (item.product?.price || 0) * item.quantity
                          }
                        />
                      </div>

                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Shopping */}
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate("/")}
              className="mt-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              ← Continue Shopping
            </motion.button>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-20">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {savingsAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Savings</span>
                    <span>-${savingsAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax (estimated)</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Divider className="my-6" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-neutral-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2 mb-4"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </Button>

              {/* Promo Code */}
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  variant="outline"
                  size="md"
                  className="w-full mt-2"
                >
                  Apply
                </Button>
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center"
              >
                <p className="text-sm text-green-700 font-medium">
                  🔒 Your payment is secure
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernCart;
