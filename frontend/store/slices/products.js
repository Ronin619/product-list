import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ROOT_URL = "http://localhost:8000/products";

export const fetchProducts = createAsyncThunk(
  "get/products",
  async (page = 1) => {
    const response = await axios.get(`${ROOT_URL}?page=${page}`);
    const productSet = [];

    response.data.products.forEach((product) => {
      const productCard = {
        id: product._id,
        category: product.category,
        price: product.price,
        image: product.image,
        name: product.name,
      };

      productSet.push(productCard);
    });
    console.log(productCard);
    return productSet;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalPages: 1,
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
