import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../store/slices/userSlice";
import Loader from "../components/ui/Loader";

const Signin = () => {
    const { status, error } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit } = useForm();

    const SigninHandler = async (user) => {
        const result = await dispatch(signinUser(user));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
            return;
        }
        setErrorMessage(result.payload || "Invalid email or password.");
    };
    return (
        <form onSubmit={handleSubmit(SigninHandler)} className="w-full p-5">
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
                Signin User
            </button>
            <p className="mt-3">
                Don't have an account?{" "}
                <Link className="text-blue-400" to="/signup">
                    Signup
                </Link>
            </p>
        </form>
    );
};

export default Signin;
