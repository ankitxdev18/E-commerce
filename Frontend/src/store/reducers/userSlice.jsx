import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    authChecked: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginuser: (state, action) => {
            state.user = action.payload;
            state.authChecked = true;
        },
        logoutuser: (state) => {
            state.user = null;
            state.authChecked = true;
        },
        setAuthChecked: (state) => {
            state.authChecked = true;
        },
    },
});
export default userSlice.reducer;
export const { loginuser, logoutuser, setAuthChecked } = userSlice.actions;
