import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logoutUser, updateUser } from "../store/slices/userSlice";
import Loader from "../components/ui/Loader";

const Settings = () => {
    const { user, status, error } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            username: user?.username,
            email: user?.email,
            password: user?.password,
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                email: user.email,
                password: user.password,
            });
        }
    }, [user, reset]);

    const UpdateHandler = (updateduser) => {
        if (!user) return;
        dispatch(updateUser({ id: user.id, updates: updateduser }));
    };

    const DeleteHandler = () => {
        if (!user) return;
        dispatch(deleteUser(user.id));
    };

    const LogoutHandler = () => {
        dispatch(logoutUser());
    };

    if (!user) {
        return <div className="p-5">Loading your profile...</div>;
    }

    return (
        <form onSubmit={handleSubmit(UpdateHandler)} className="w-full p-5">
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
            <button className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400" type="submit">
                Update User
            </button>
            <br />
            <br />
            <button
                type="button"
                onClick={LogoutHandler}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
            >
                Logout User
            </button>
            <br />
            <br />
            <button
                type="button"
                onClick={DeleteHandler}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
            >
                Delete User
            </button>
        </form>
    );
};

export default Settings;
