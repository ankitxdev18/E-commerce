import axios from "../api/axiosconfig";
import { loaduser } from "./userSlice";

export const asyncgetusers = () => async (dispatch, getState) => {
  try {
    console.log(getState());

    const res = await axios.get("/users");
    dispatch(loaduser(res.data));
  } catch (error) {
    console.log(error);
  }
};
