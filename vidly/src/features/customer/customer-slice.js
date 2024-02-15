import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCustomer, getCustomers } from "../../services/customerService";

const initialState = {
  customers: [],
  pageSize: 4,
  currentPage: 1,
  sortColumn: { path: "title", order: "asc" },
  searchQuery: "",
  isLoading: true,
  isError: false,
  errorMsg: "",
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    searchCustomer: (state, query) => {
      state.searchQuery = query.payload;
      state.currentPage = 1;
    },
    sortCustomer: (state, column) => {
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
      .addCase(fetchCustomers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMsg = "";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMsg = "";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.error.message;
        console.log(action);
      })
      .addCase(deleteCustomerAsync.pending, (state, action) => {
        // state.isLoading = true;
        // state.isError = false;
        state.errorMsg = "";
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMsg = "";
        state.customers = state.customers.filter(
          (m) => m.id !== action.meta.arg
        );
      })
      .addCase(deleteCustomerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = state.errorMsg = action.error.message;
      });
  },
});
export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async () => {
    try {
      const res = await getCustomers();
      return res.data;
    } catch (ex) {
      console.log(ex);

      throw new Error(ex);
    }
  }
);
export const deleteCustomerAsync = createAsyncThunk(
  "customer/deleteCustomerAsync",
  async (id) => {
    try {
      const res = await deleteCustomer(id);
      return res.data;
    } catch (ex) {
      throw new Error(ex);
    }
  }
);
export const { changePage, changeSize, searchCustomer, sortCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
