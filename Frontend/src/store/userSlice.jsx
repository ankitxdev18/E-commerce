import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
