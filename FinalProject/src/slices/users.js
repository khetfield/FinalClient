import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      api.endpoints.getSingleUserById.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addMatcher(
      api.endpoints.findUserWithToken.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
  },
});

export default usersSlice.reducer;
