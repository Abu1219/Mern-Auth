import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice.jsx";
import { apiSlice } from "./Slices/ApiSlice.jsx";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
