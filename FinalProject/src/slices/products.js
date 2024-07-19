import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      api.endpoints.getSingleProduct.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      api.endpoints.addProducts.matchFulfilled,
      (state, { payload }) => {
        state.push(payload);
        return state;
      }
    );
    builder.addMatcher(
      api.endpoints.editProducts.matchFulfilled,
      (state, { payload }) => {
        return state.map((i) =>
          i.id === payload.id ? { ...i, ...payload } : i
        );
      }
    );
    builder.addMatcher(
      api.endpoints.deleteProduct.matchFulfilled,
      (state, { payload }) => {
        return state.filter((i) => i.id !== payload.id);
      }
    );
  },
});

export default productsSlice.reducer;
