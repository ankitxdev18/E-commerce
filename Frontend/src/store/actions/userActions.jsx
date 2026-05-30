import axios from "../../api/axiosconfig";
import { loaduser, clearuser } from "../reducers/userSlice";

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
    else console.log("User not logged in!");
  } catch (error) {
    console.log(error);
  }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    console.log("User Logged Out!");
    dispatch(clearuser());
  } catch (error) {
    console.log(error);
  }
};
export const asyncloginusers = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`,
    );
    localStorage.setItem("user", JSON.stringify(data[0]));
    dispatch(loaduser(data[0]));
  } catch (error) {
    console.log(error);
  }
};
export const asyncregisteruser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch(loaduser(res.data));
  } catch (error) {
    console.log(error);
  }
};
