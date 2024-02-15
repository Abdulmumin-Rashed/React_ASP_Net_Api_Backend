import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies, deleteMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
const initialState = {
  movies: [],
  genres: null,
  currentGenre: null,
  pageSize: 4,
  currentPage: 1,
  sortColumn: { path: "title", order: "asc" },
  searchQuery: "",
  isLoadingGenres: true,
  isLoadingMovies: true,
  isMoviesError: false,
  isGenresError: false,
  moviesErrorMsg: "",
  genresErrorMsg: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies: (state, query) => {
      state.searchQuery = query.payload;
      state.currentPage = 1;
      state.currentGenre = state.genres[0];
    },
    sortMovies: (state, column) => {
      state.sortColumn = column.payload;
    },
    changeSize: (state, size) => {
      state.pageSize = Number(size.payload);
      state.currentPage = 1;
    },
    changePage: (state, page) => {
      state.currentPage = page.payload;
    },
    selectGenre: (state, genre) => {
      state.currentGenre = genre.payload;
      state.currentPage = 1;
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.isLoadingMovies = true;
        state.isMoviesError = false;
        state.moviesErrorMsg = "";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoadingMovies = false;
        state.isMoviesError = false;
        state.moviesErrorMsg = "";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoadingMovies = false;
        state.isMoviesError = true;
        state.moviesErrorMsg = state.errorMsg = action.error.message;
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.isLoadingGenres = true;
        state.isGenresError = false;
        state.genresErrorMsg = "";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.isLoadingGenres = false;
        state.isGenresError = false;
        state.genresErrorMsg = "";
        console.log(action.payload);
        state.genres = action.payload;
        state.currentGenre = state.genres[0];
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.isLoadingGenres = false;
        state.isGenresError = true;
        state.genresErrorMsg = state.errorMsg = action.error.message;
      })
      .addCase(deleteMovieAsync.pending, (state, action) => {
        // state.isLoading = true;
        // state.isError = false;
        state.moviesErrorMsg = state.errorMsg = action.error.message;
      })
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.isLoadingMovies = false;
        state.isMoviesError = false;
        state.moviesErrorMsg = state.errorMsg = action.error.message;
        state.movies = state.movies.filter((m) => m.id !== action.meta.arg);
      })
      .addCase(deleteMovieAsync.rejected, (state, action) => {
        state.isLoadingMovies = false;
        state.isMoviesError = true;
        console.log(action);
        state.moviesErrorMsg = state.errorMsg = action.error.message;
      });
  },
});

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  try {
    const res = await getMovies();

    return res.data;
  } catch (ex) {
    throw new Error(ex);
  }
});
export const fetchGenres = createAsyncThunk(
  "movie/fetchGenres",
  async (genre) => {
    try {
      const res = await getGenres();
      if (genre?.action == null) {
        return res.data;
      } else {
        return [genre, ...res.data];
      }
    } catch (ex) {
      throw new Error(ex);
    }
  }
);
export const deleteMovieAsync = createAsyncThunk(
  "movie/deleteMovieAsync",
  async (id) => {
    try {
      const res = await deleteMovie(id);
      return res.data;
    } catch (ex) {
      throw new Error(ex);
    }
  }
);

export const {
  changePage,
  changeSize,
  searchMovies,
  selectGenre,
  sortMovies,
  customizeGenres,
} = movieSlice.actions;
export default movieSlice.reducer;
