import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createProduct, getProducts} from "../api/productApi";


export const fetchProducts = createAsyncThunk("products/fetchProducts", async (arg, thunkAPI) => {
    getProducts().then(res => {
      thunkAPI.dispatch(setProducts(res.data))
    })
});

export const saveProduct = createAsyncThunk("products/createProduct", async (arg, thunkAPI) => {
    createProduct(arg).then(res => {
        fetchProducts();
    })
});
const productSlice = createSlice({
  name: "products",
  initialState: {
      data: [],
      loading: true
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
