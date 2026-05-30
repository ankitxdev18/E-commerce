import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../store/slices/userSlice";

const ProductTemplate = ({ p }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userReducer);

    const AddtoCartHandler = () => {
        if (!user) {
            navigate("/signin");
            return;
        }

        const currentCart = Array.isArray(user.cart) ? [...user.cart] : [];
        const index = currentCart.findIndex((ci) => ci.product?.id === p.id);
        const updatedCart = [...currentCart];

        if (index === -1) {
            updatedCart.push({ product: p, quantity: 1 });
        } else {
            updatedCart[index] = {
                ...updatedCart[index],
                quantity: updatedCart[index].quantity + 1,
            };
        }

        dispatch(updateUser({ id: user.id, updates: { ...user, cart: updatedCart } }));
    };

    return (
        <div className="w-[31%] h-[65vh] shadow-lg p-2 mr-5 mb-5">
            <img
                className="h-[60%] block mx-auto object-contain"
                src={p.image || "https://via.placeholder.com/300x300?text=No+Image"}
                alt={p.title || "Product image"}
            />
            <h1 className="text-2xl">{p.title ? `${p.title.slice(0, 18)}...` : "Untitled"}</h1>
            <p className="mt-5">{p.description ? `${p.description.slice(0, 90)}...` : "No description"}</p>
            <div className="flex justify-between items-center p-3">
                <Link to={`/update-product/${p.id}`} className="text-blue-400">
                    More Info
                </Link>
                <button onClick={AddtoCartHandler} className="text-yellow-400">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductTemplate;
