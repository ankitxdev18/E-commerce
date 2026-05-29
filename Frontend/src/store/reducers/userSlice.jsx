import { createSlice } from "@reduxjs/toolkit";
  
const initialState = {
  users: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { loaduser } = UserSlice.actions;

export default UserSlice.reducer;
