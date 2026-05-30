import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/slices/userSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const cartItems = Array.isArray(user?.cart) ? user.cart : [];

    const IncreaseQuantity = (index) => {
        if (!user || !cartItems[index]) return;

        const updatedCart = [...cartItems];
        updatedCart[index] = {
            ...updatedCart[index],
            quantity: updatedCart[index].quantity + 1,
        };

        dispatch(updateUser({ id: user.id, updates: { ...user, cart: updatedCart } }));
    };

    const DecreaseQuantity = (index) => {
        if (!user || !cartItems[index]) return;

        const updatedCart = [...cartItems];

        if (updatedCart[index].quantity === 1) {
            updatedCart.splice(index, 1);
        } else {
            updatedCart[index] = {
                ...updatedCart[index],
                quantity: updatedCart[index].quantity - 1,
            };
        }

        dispatch(updateUser({ id: user.id, updates: { ...user, cart: updatedCart } }));
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + Number(item.product?.price || 0) * item.quantity,
        0
    );

    if (!user) {
        return <div className="p-5">Please sign in to view your cart.</div>;
    }

    if (cartItems.length === 0) {
        return <div className="p-5">Your cart is empty.</div>;
    }

    return (
        <div className="p-5">
            <div className="mb-4 text-lg font-semibold">Order total: ${totalPrice.toFixed(2)}</div>
            {cartItems.map((ci, i) => {
                return (
                    <div
                        className="mb-3 bg-gray-200 rounded p-2 flex justify-between items-center"
                        key={ci.product?.id ?? i}
                    >
                        <img
                            className="h-[10vmax] object-contain"
                            src={ci.product?.image || "https://via.placeholder.com/150"}
                            alt={ci.product?.title || "Cart item"}
                        />
                        <div className="flex-1 px-4">
                            <h1>{ci.product?.title || "Product"}</h1>
                            <h2>${Number(ci.product?.price || 0).toFixed(2)}</h2>
                        </div>
                        <div>
                            <button
                                onClick={() => IncreaseQuantity(i)}
                                className="text-2xl"
                                type="button"
                            >
                                +
                            </button>
                            <span className="mx-3">{ci.quantity}</span>
                            <button
                                onClick={() => DecreaseQuantity(i)}
                                className="text-2xl"
                                type="button"
                            >
                                -
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cart;
