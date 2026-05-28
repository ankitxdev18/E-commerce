import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const LoginHandle = (user) => {
    user.id = nanoid();
    console.log(user);
  };

  return (
    <form
      onSubmit={handleSubmit(LoginHandle)}
      className="flex flex-col w-1/2 justify-start items-start "
    >
      <input
        {...register("username")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="text"
        placeholder="ankit-kumar"
      />
      <input
        {...register("email")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="email"
        placeholder="ankit@gmail.com"
      />
      <input
        {...register("password")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="password"
        placeholder="******"
      />

      <button className="mt-5 px-4 py-2 bg-blue-400 rounded">Login User</button>
      <p>
        Don't have an account?{" "}
        <Link className="text-blue-400" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
