import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproduct: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const { loadproduct } = productSlice.actions;

export default productSlice.reducer;
