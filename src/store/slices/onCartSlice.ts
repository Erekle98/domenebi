import { createSlice } from "@reduxjs/toolkit";

interface OnCartState {
  count: number;
}

const initialState: OnCartState = {
  count: 0, // default value
};

const onCartSlice = createSlice({
  name: "onCart",
  initialState,
  reducers: {
    addOnCart: (state) => {
      state.count += 1;
    },
  },
});

export const { addOnCart } = onCartSlice.actions;

export default onCartSlice.reducer;
