import axios from "../../api/config";
import { loadproduct } from "../reducers/productSlice";

export const asyncloadproducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/products");
        dispatch(loadproduct(data));
        console.log("Product Loaded!");
        return data;
    } catch (error) {
        console.error("Failed to load products:", error);
        return [];
    }
};

export const asynccreateproduct = (product) => async (dispatch) => {
    try {
        const { data } = await axios.post("/products", product);
        await dispatch(asyncloadproducts());
        console.log("Product Created!");
        return data;
    } catch (error) {
        console.error("Create product failed:", error);
        return null;
    }
};

export const asyncupdateproduct = (id, product) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`/products/${id}`, product);
        await dispatch(asyncloadproducts());
        console.log("Product Updated!");
        return data;
    } catch (error) {
        console.error("Update product failed:", error);
        return null;
    }
};

export const asyncdeleteproduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`/products/${id}`);
        await dispatch(asyncloadproducts());
        console.log("Product Deleted!");
        return true;
    } catch (error) {
        console.error("Delete product failed:", error);
        return false;
    }
};
