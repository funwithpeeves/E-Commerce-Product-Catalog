import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
