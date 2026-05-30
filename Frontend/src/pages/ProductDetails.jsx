import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteProduct,
    fetchProductById,
    updateProduct,
} from "../store/slices/productSlice";
import { updateUser } from "../store/slices/userSlice";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector((state) => state.userReducer);
    const { items, selectedProduct, selectedStatus, selectedError } = useSelector(
        (state) => state.productReducer
    );
    const productFromStore = items.find((p) => String(p.id) === id);
    const [localProduct, setLocalProduct] = useState(productFromStore || selectedProduct || null);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            image: localProduct?.image || "",
            title: localProduct?.title || "",
            price: localProduct?.price || "",
            category: localProduct?.category || "",
            description: localProduct?.description || "",
        },
    });

    useEffect(() => {
        if (productFromStore) {
            setLocalProduct(productFromStore);
            reset(productFromStore);
            return;
        }

        if (!selectedProduct || String(selectedProduct.id) !== id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id, productFromStore, reset, selectedProduct]);

    useEffect(() => {
        if (selectedProduct && String(selectedProduct.id) === id) {
            setLocalProduct(selectedProduct);
            reset(selectedProduct);
        }
    }, [selectedProduct, id, reset]);

    const UpdateProductHandler = async (updatedProduct) => {
        if (!localProduct) return;
        const payload = {
            id: localProduct.id,
            product: {
                ...localProduct,
                ...updatedProduct,
                price: Number(updatedProduct.price) || 0,
            },
        };
        const result = await dispatch(updateProduct(payload));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    };

    const DeleteHandler = async () => {
        if (!localProduct) return;
        await dispatch(deleteProduct(localProduct.id));
        navigate("/");
    };

    const AddToCartHandler = async () => {
        if (!user) {
            navigate("/signin");
            return;
        }

        const currentCart = Array.isArray(user.cart) ? [...user.cart] : [];
        const index = currentCart.findIndex((ci) => ci.product?.id === localProduct.id);
        const cartItem = { product: localProduct, quantity: 1 };
        const updatedCart = [...currentCart];

        if (index === -1) {
            updatedCart.push(cartItem);
        } else {
            updatedCart[index] = {
                ...updatedCart[index],
                quantity: updatedCart[index].quantity + 1,
            };
        }

        await dispatch(updateUser({ id: user.id, updates: { ...user, cart: updatedCart } }));
    };

    if (selectedStatus === "loading" && !localProduct) {
        return <Loader message="Loading product details..." />;
    }

    if (selectedStatus === "failed") {
        return <ErrorState message={selectedError || "Failed to load product details."} />;
    }

    if (!localProduct) {
        return <ErrorState message="Product unavailable." />;
    }

    return (
        <div className="w-full">
            <div className="w-full shadow-lg mr-5 mb-5 p-5">
                <img
                    className="h-[40vh] block mx-auto object-contain"
                    src={localProduct.image || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={localProduct.title || "Product image"}
                />
                <h1 className="text-4xl">{localProduct.title}</h1>
                <p className="mt-5">{localProduct.description}</p>
                <p className="my-5 text-red-400 text-5xl">${Number(localProduct.price).toFixed(2)}</p>
                <div className="flex justify-between items-center p-3">
                    <button
                        type="button"
                        onClick={AddToCartHandler}
                        className="text-yellow-400"
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            {user?.isAdmin && (
                <form onSubmit={handleSubmit(UpdateProductHandler)} className="w-full p-5">
                    <input
                        {...register("image")}
                        className="w-full text-3xl mb-5 p-2 border-b outline-0"
                        type="url"
                        placeholder="Product Image URL"
                    />

                    <input
                        {...register("title")}
                        className="w-full text-3xl mb-5 p-2 border-b outline-0"
                        type="text"
                        placeholder="Product Title"
                    />
                    <input
                        {...register("price")}
                        className="w-full text-3xl mb-5 p-2 border-b outline-0"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                    />
                    <input
                        {...register("category")}
                        className="w-full text-3xl mb-5 p-2 border-b outline-0"
                        type="text"
                        placeholder="Product Category"
                    />
                    <textarea
                        {...register("description")}
                        className="w-full text-3xl mb-5 p-2 border-b outline-0"
                        placeholder="Product Description Here..."
                    ></textarea>
                    <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-blue-400">
                        Update Product
                    </button>
                    <br />
                    <br />
                    <button
                        onClick={DeleteHandler}
                        type="button"
                        className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
                    >
                        Delete Product
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductDetails;
