import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get
    getProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductsFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Delete
    deleteProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductsSuccess: (state, action) => {
      state.isFetching = false;
      // ** delete only way in (Redux-Toolkit) **
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductsFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update
    updateProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductsFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Add
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFauilure,
  deleteProductsStart,
  deleteProductsSuccess,
  deleteProductsFauilure,
  updateProductsStart,
  updateProductsSuccess,
  updateProductsFauilure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
