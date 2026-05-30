import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { createProduct } from "../store/slices/productSlice";
import { Button, Input } from "../components/ui/Base";
import { Spinner } from "../components/ui/Animations";
import { Package, ImageIcon, DollarSign, Layers, FileText } from "lucide-react";

const ModernCreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.userReducer);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const newProduct = {
      ...data,
      id: nanoid(),
      price: Number(data.price) || 0,
      description: data.description || "",
    };

    const result = await dispatch(createProduct(newProduct));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Create New Product
          </h1>
          <p className="text-neutral-600">
            Add a new product to your store
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Image */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <Input
                label="Product Image URL"
                icon={ImageIcon}
                type="url"
                placeholder="https://example.com/product.jpg"
                {...register("image", {
                  required: "Product image is required",
                })}
                error={errors.image?.message}
              />
            </motion.div>

            {/* Product Title */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <Input
                label="Product Title"
                icon={Package}
                type="text"
                placeholder="Amazing Product"
                {...register("title", {
                  required: "Product title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                error={errors.title?.message}
              />
            </motion.div>

            {/* Price */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Input
                label="Price"
                icon={DollarSign}
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price must be positive",
                  },
                })}
                error={errors.price?.message}
              />
            </motion.div>

            {/* Category */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <Input
                label="Category"
                icon={Layers}
                type="text"
                placeholder="Electronics"
                {...register("category", {
                  required: "Category is required",
                })}
                error={errors.category?.message}
              />
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                <FileText className="inline mr-2" size={18} />
                Description
              </label>
              <textarea
                placeholder="Describe your product..."
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-32"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 pt-6"
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "loading"}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {status === "loading" && <Spinner size="sm" />}
                {status === "loading" ? "Creating..." : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Cancel
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernCreateProduct;
