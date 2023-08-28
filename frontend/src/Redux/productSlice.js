import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getProducts } from "../api/productApi";
import { useDispatch } from "react-redux";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (arg, thunkAPI) => {
    getProducts().then((res) => {
      thunkAPI.dispatch(setProducts(res.data));
    });
  }
);

export const saveProduct = createAsyncThunk(
  "products/createProduct",
  async (arg, thunkAPI) => {
    createProduct(arg).then((res) => {
      thunkAPI.dispatch(fetchProducts());
    });
  }
);
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (arg, thunkAPI) => {
    deleteProduct(arg).then((res) => {
      thunkAPI.dispatch(fetchProducts());
    });
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
