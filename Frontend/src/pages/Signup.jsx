import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/slices/userSlice";
import Loader from "../components/ui/Loader";

const Signup = () => {
    const { status, error } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit } = useForm();

    const SignupHandler = async (user) => {
        const newUser = {
            ...user,
            id: nanoid(),
            isAdmin: false,
            cart: [],
        };

        const result = await dispatch(signupUser(newUser));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/signin");
            return;
        }

        setErrorMessage(result.payload || "Account already exists or registration failed.");
    };
    return (
        <form onSubmit={handleSubmit(SignupHandler)} className="w-full p-5">
            <input
                {...register("username")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="text"
                placeholder="john-doe"
                required
            />

            <input
                {...register("email")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="email"
                placeholder="john@doe.doe"
                required
            />
            <input
                {...register("password")}
                className="w-full text-3xl mb-5 p-2 border-b outline-0"
                type="password"
                placeholder="********"
                required
            />
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400" type="submit">
                Signup User
            </button>
            <p className="mt-3">
                Already have an account?{" "}
                <Link className="text-blue-400" to="/signin">
                    Signin
                </Link>
            </p>
        </form>
    );
};

export default Signup;
