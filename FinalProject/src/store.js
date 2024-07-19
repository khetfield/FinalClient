import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/api";
import auth from "./slices/auth";
import products from "./slices/products";
import users from "./slices/users";
import cartsReducer from "./slices/cart";
import orders from "./slices/orders";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: auth,
    products: products,
    users: users,
    carts: cartsReducer,
    orders: orders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;
