import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/movie-slice";
import customerSlice from "./features/customer/customer-slice";
import rentalsSlice from "./features/rentals/rentals-slice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    customer: customerSlice,
    rental: rentalsSlice,
  },
});
