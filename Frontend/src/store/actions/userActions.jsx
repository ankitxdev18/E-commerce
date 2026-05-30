import { loginuser, logoutuser, setAuthChecked } from "../reducers/userSlice";
import axios from "../../api/config";

export const asynccurrentuser = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch(loginuser(user));
            console.log("Session Restored!");
            return user;
        }
        dispatch(setAuthChecked());
        return null;
    } catch (error) {
        console.error("Failed to restore session:", error);
        dispatch(setAuthChecked());
        return null;
    }
};

export const asyncsigninuser = (user) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `/users?email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(
                user.password
            )}`
        );

        if (data[0]) {
            localStorage.setItem("user", JSON.stringify(data[0]));
            dispatch(loginuser(data[0]));
            console.log("User logged in!");
            return true;
        }
        return false;
    } catch (error) {
        console.error("Signin failed:", error);
        return false;
    }
};

export const asyncsignupuser = (user) => async () => {
    try {
        const { data: existingUsers } = await axios.get(
            `/users?email=${encodeURIComponent(user.email)}`
        );

        if (existingUsers.length > 0) {
            return false;
        }

        await axios.post("/users", user);
        console.log("User Registered!");
        return true;
    } catch (error) {
        console.error("Signup failed:", error);
        return false;
    }
};

export const asyncupdateuser = (id, user) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`/users/${id}`, user);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(loginuser(data));
        console.log("User Updated!");
        return data;
    } catch (error) {
        console.error("Update failed:", error);
        return null;
    }
};

export const asynclogoutuser = () => async (dispatch) => {
    try {
        localStorage.removeItem("user");
        dispatch(logoutuser());
        console.log("User logged out!");
        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
};

export const asyncdeleteuser = (id) => async (dispatch) => {
    try {
        await axios.delete(`/users/${id}`);
        localStorage.removeItem("user");
        dispatch(logoutuser());
        console.log("User Deleted!");
        return true;
    } catch (error) {
        console.error("Delete failed:", error);
        return false;
    }
};
