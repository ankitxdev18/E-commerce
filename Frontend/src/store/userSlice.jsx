import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { loaduser } = UserSlice.actions;

export default UserSlice.reducer;
