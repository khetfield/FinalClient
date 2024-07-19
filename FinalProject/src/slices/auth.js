import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

function storeToken(state, { payload }) {
  state.credentials = { token: payload.token, users: { ...payload.users } };
  window.sessionStorage.setItem(
    "CREDENTIALS",
    JSON.stringify({
      token: payload.token,
      users: { ...payload.users },
    })
  );
}
const initialCredentials = JSON.parse(
  window.sessionStorage.getItem("CREDENTIALS")
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    credentials:
      initialCredentials && initialCredentials.token
        ? initialCredentials
        : {
            token: "",
            users: {
              id: null,
              username: null,
              is_admin: null,
            },
          },
  },
  reducers: {},
  extraReducers: (build) => {
    build.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    build.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    build.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
      state.credentials = {
        token: "",
        users: {
          id: null,
          username: null,
          is_admin: null,
        },
      };
      window.sessionStorage.removeItem("CREDENTIALS");
    });
  },
});
export default authSlice.reducer;
