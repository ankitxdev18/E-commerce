import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.users = action.payload;
    },
    clearuser: (state) => { 
      state.users = [];
    },
  },
});
export const { loaduser } = UserSlice.actions;

export default UserSlice.reducer;
