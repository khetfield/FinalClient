import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getOrderByUserId.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      api.endpoints.checkOut.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.push(payload);
        return state;
      }
    );
  },
});
export default ordersSlice.reducer;
