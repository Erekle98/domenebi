import { configureStore } from "@reduxjs/toolkit";
import onCartReducer from "./slices/onCartSlice";

const store = configureStore({
  reducer: {
    onCartItems: onCartReducer,
  },
});

export default store;
