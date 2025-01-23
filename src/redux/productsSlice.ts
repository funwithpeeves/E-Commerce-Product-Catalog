import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "./actions";
import { ProductType } from "../../types";

interface ProductsState {
  products: ProductType[];
  filteredProducts: ProductType[];
  loading: boolean;
  error: string | null;
  sortBy: "priceAsc" | "priceDesc" | "ratingAsc" | "ratingDesc" | null;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  sortBy: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filter: (
      state,
      action: PayloadAction<{ title: string; category: string }>
    ) => {
      const { title, category } = action.payload;

      // Filtering products based on title and category
      state.filteredProducts = state.products.filter((product) => {
        const matchesTitle = title
          ? product.title.toLowerCase().includes(title.toLowerCase())
          : true;
        const matchesCategory = category
          ? product.category.toLowerCase() === category.toLowerCase()
          : true;
        return matchesTitle && matchesCategory;
      });

      // If there's a sorting rule (price or rating), apply it
      if (state.sortBy) {
        if (state.sortBy === "priceAsc" || state.sortBy === "priceDesc") {
          state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
            if (state.sortBy === "priceAsc") return a.price - b.price;
            if (state.sortBy === "priceDesc") return b.price - a.price;
            return 0;
          });
        } else if (state.sortBy === "ratingAsc" || state.sortBy === "ratingDesc") {
          state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
            if (state.sortBy === "ratingAsc") return a.rating.rate - b.rating.rate;
            if (state.sortBy === "ratingDesc") return b.rating.rate - a.rating.rate;
            return 0;
          });
        }
      }
    },

    sortByPrice: (state, action: PayloadAction<"priceAsc" | "priceDesc">) => {
      state.sortBy = action.payload;
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        if (action.payload === "priceAsc") return a.price - b.price;
        if (action.payload === "priceDesc") return b.price - a.price;
        return 0;
      });
    },

    sortByRating: (state, action: PayloadAction<"ratingAsc" | "ratingDesc">) => {
      state.sortBy = action.payload;
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        if (action.payload === "ratingAsc") return a.rating.rate - b.rating.rate;
        if (action.payload === "ratingDesc") return b.rating.rate - a.rating.rate;
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
        state.filteredProducts = payload;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { filter, sortByPrice, sortByRating } = productsSlice.actions;

export default productsSlice.reducer;
