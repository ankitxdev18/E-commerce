import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadcart: (state, action) => {
      state.carts = action.payload;
    },
  },
});
export const { loadcart } = cartSlice.actions;

export default cartSlice.reducer;
