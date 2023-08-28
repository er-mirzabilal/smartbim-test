import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import themeConfigReducer from "./themeConfigSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    themeConfig: themeConfigReducer,
  },
});

export default store;
