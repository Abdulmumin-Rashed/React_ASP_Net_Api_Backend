import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRentals, returnRentedMovie } from "../../services/rentalsService";

const initialState = {
  rentals: [],
  pageSize: 4,
  currentPage: 1,
  sortColumn: { path: "title", order: "asc" },
  searchQuery: "",
  isLoading: true,
  isError: false,
  errorMsg: "",
};

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    searchRentals: (state, query) => {
      state.searchQuery = query.payload;
      state.currentPage = 1;
    },
    sortRentals: (state, column) => {
      state.sortColumn = column.payload;
    },
    changeSize: (state, size) => {
      state.pageSize = Number(size.payload);
      state.currentPage = 1;
    },
    changePage: (state, page) => {
      state.currentPage = page.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state, action) => {
        // state.isLoading = true;
        // state.isError = false;
        state.errorMsg = "";
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMsg = "";
        state.rentals = action.payload;
        console.log(action);
      })
      .addCase(fetchRentals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      })
      .addCase(claimMovie.pending, (state, action) => {
        // state.isLoading = true;
        // state.isError = false;
        state.errorMsg = "";
      })
      .addCase(claimMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMsg = "";
      })
      .addCase(claimMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });
  },
});
export const fetchRentals = createAsyncThunk(
  "rental/fetchRentals",
  async () => {
    try {
      const res = await getRentals();
      return res.data;
    } catch (ex) {
      throw new Error(ex);
    }
  }
);
export const claimMovie = createAsyncThunk("rental/claimMovie", async () => {
  try {
    const res = await returnRentedMovie();
    return res.data;
  } catch (ex) {
    throw new Error(ex);
  }
});
export const { changePage, changeSize, searchRentals, sortRentals } =
  rentalsSlice.actions;

export default rentalsSlice.reducer;
