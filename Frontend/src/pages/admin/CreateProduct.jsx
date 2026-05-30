import { asynccreateproduct } from "../../store/actions/productActions";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createProductHandler = (product) => {
    product.id = nanoid();
    console.log(product);
    dispatch(asynccreateproduct(product));
    navigate("/products");
  };

  return (
    <form
      onSubmit={handleSubmit(createProductHandler)}
      className="flex flex-col w-1/2 justify-start items-start "
    >
      <input
        {...register("image")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="url"
        placeholder="image URL"
      />
      <input
        {...register("title")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="text"
        placeholder="title"
      />

      <input
        {...register("price")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="number"
        placeholder="0.00"
      />
      <textarea
        {...register("description")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        placeholder="Enter description here..."
      ></textarea>

      <input
        {...register("category")}
        className=" mb-3 outline-0 border-b p-2 text-4xl"
        type="text"
        placeholder="category"
      />

      <button className="transition-transform active:scale-95 mt-5 px-4 py-2 rounded bg-blue-400">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
