import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductType } from "../../types";

export const getProducts = createAsyncThunk<
  ProductType[],
  { sort: "asc" | "desc" }
>("products/getProducts", async ({ sort }, { rejectWithValue }) => {
  try {
    const response = await axios.get<ProductType[]>(
      `https://fakestoreapi.com/products?sort=${sort}`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch products");
  }
});
