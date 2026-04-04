import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ROOT_URL = "http://localhost:8000/products";

export const fetchProducts = createAsyncThunk("get/products", async () => {
  const response = await axios.get(ROOT_URL);
  const productSet = [];

  response.data.forEach((product) => {
    const productCard = {
      id: product._id,
      category: product.category,
      price: product.price,
      image: product.image,
      name: product.name,
    };

    productSet.push(productCard);
  });
  console.log(productSet);
  return productSet;
});

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
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
        state.top10Anime = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
