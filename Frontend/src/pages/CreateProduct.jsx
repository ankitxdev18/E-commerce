import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../store/slices/productSlice";
import Loader from "../components/ui/Loader";

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status } = useSelector((state) => state.userReducer);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (user && !user.isAdmin) {
            navigate("/");
        }
    }, [user, navigate]);

    const CreateProductHandler = async (product) => {
        const newProduct = {
            ...product,
            id: nanoid(),
            price: Number(product.price) || 0,
            description: product.description || "",
        };

        const result = await dispatch(createProduct(newProduct));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    };
    return (
        <form
            onSubmit={handleSubmit(CreateProductHandler)}
            className="w-full p-5"
        >
            <input
                {...register("image")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="url"
                placeholder="Product Image URL"
                required
            />

            <input
                {...register("title")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="Product Title"
                required
            />
            <input
                {...register("price")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
            />
            <input
                {...register("category")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="Product Category"
                required
            />
            <textarea
                {...register("description")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                placeholder="Product Description Here..."
                required
            ></textarea>
            <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400" type="submit">
                Create Product
            </button>
        </form>
    );
};

export default CreateProduct;
