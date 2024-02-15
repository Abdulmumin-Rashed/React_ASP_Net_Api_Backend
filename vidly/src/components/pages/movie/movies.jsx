import React, { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  changeSize,
  deleteMovieAsync,
  fetchGenres,
  fetchMovies,
  searchMovies,
  selectGenre,
  sortMovies,
} from "../../../features/movies/movie-slice";
import MoviesTable from "./moviesTable";
import { Pagination, Select, Search, ListGroup } from "../../common";
import UserContext from "../../../contexts/userContext";
import Paginate from "../../../utils/paginate";

const Movies = () => {
  const {
    genres,
    movies,
    isLoadingGenres,
    isLoadingMovies,
    isMoviesError,
    isGenresError,
    moviesErrorMsg,
    genresErrorMsg,
    currentGenre,
    pageSize,
    currentPage,
    sortColumn,
    searchQuery,
  } = useSelector((store) => store.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenres({ id: 0, name: "All Genres" }));
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (movie) => {
    console.log(movie);
    dispatch(deleteMovieAsync(movie.id));
  };

  const handleSort = (column) => {
    dispatch(sortMovies(column));
  };
  const handleSearch = (query) => {
    dispatch(searchMovies(query));
  };
  const handleSizeChange = ({ target }) => {
    dispatch(changeSize(target.value));
  };
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  const handleGenresSelect = (genre) => {
    dispatch(selectGenre(genre));
  };
  // const handleLike = (movie) => {
  //   const likedMovies = [...movies];
  //   const index = likedMovies.indexOf(movie);
  //   likedMovies[index] = { ...likedMovies[index] };
  //   likedMovies[index].liked = !likedMovies[index].liked;
  //   setMovies(likedMovies);
  // };
  const getPagedData = () => {
    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currentGenre?.id > 0) {
      filtered = movies.filter((m) => m.genre.id === currentGenre.id);
    }

    const orderedMovies = _.orderBy(
      filtered,
      sortColumn.path,
      sortColumn.order
    );
    const data = Paginate(orderedMovies, currentPage, pageSize);
    return {
      data,
      totalCount: filtered.length,
    };
  };
  if (isLoadingGenres || isLoadingMovies) {
    return (
      <div className="col">
        <span className="display-6">loading data </span>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isMoviesError || isGenresError) {
    return (
      <div className="col">
        {isMoviesError ||
          (isGenresError && (
            <span className="display-6 text-danger">
              Error: {moviesErrorMsg || genresErrorMsg}{" "}
            </span>
          ))}
      </div>
    );
  }
  const { data: pagedMovies, totalCount } = getPagedData();
  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          onItemSelect={handleGenresSelect}
          selectedItem={currentGenre}
        />
      </div>
      {movies.length === 0 ? (
        <div className="col">
          <p>There are no movies !</p>
          <UserContext.Consumer>
            {(userContext) =>
              userContext && (
                <Link to="/movies/new" className="btn btn-primary mx-2 mb-2">
                  New Movie
                </Link>
              )
            }
          </UserContext.Consumer>
        </div>
      ) : (
        <div className="col">
          <UserContext.Consumer>
            {(userContext) =>
              userContext && (
                <Link to="/movies/new" className="btn btn-primary mx-2 mb-2">
                  New Movie
                </Link>
              )
            }
          </UserContext.Consumer>
          <div className="row m-2">
            <div className="col-6">
              <label htmlFor="search" className="form-label">
                Showing {totalCount} of {movies.length} Movies
              </label>
              <Search
                name={"search"}
                value={searchQuery}
                label="Search for movie"
                onChange={handleSearch}
              />
            </div>
            <div className="col-6">
              <Select
                name="pageSize"
                label="Rows"
                onChange={handleSizeChange}
                options={[
                  { id: 2, name: 2 },
                  { id: 3, name: 3 },
                  { id: 4, name: 4 },
                  { id: 5, name: 5 },
                  { id: 10, name: 10 },
                  { id: 20, name: 20 },
                ]}
              />
            </div>
          </div>
          <MoviesTable
            movies={pagedMovies}
            sortColumn={sortColumn}
            onSort={handleSort}
            onDelete={handleDelete}
            // onLike={handleLike}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default Movies;

// class Movies extends Component {
//   state = {
//     movies: [],
//     genres: [],
//     currentPage: 1,
//     currentGenre: null,
//     sortColumn: { path: "title", order: "asc" },
//     searchQuery: "",
//     errorMessage: "",
//     pageSize: 3,
//   };
//   async componentDidMount() {
//     try {
//       const result = await getGenres();
//       const genres = [{ id: "", name: "All Genres" }, ...result.data];
//       const { data: movies } = await getMovies();
//       this.setState({
//         movies,
//         genres,
//         currentGenre: genres[0],
//       });
//     } catch (ex) {}
//   }
//   handleDelete = async (movie) => {
//     const originalMovies = this.state.movies;
//     const movies = originalMovies.filter((m) => m.id !== movie.id);
//     this.setState({ movies });
//     try {
//       await deleteMovie(movie.id);
//       toast.success("Successfuly deleted.");
//     } catch (ex) {
//       if (ex.response && ex.response.status === 404) {
//         toast.error("This movie has already been deleted");
//       }
//       this.setState({ movies: originalMovies });
//     }
//   };
//   handleLike = (movie) => {
//     const movies = [...this.state.movies];
//     const index = movies.indexOf(movie);
//     movies[index] = { ...movies[index] };
//     movies[index].liked = !movies[index].liked;
//     this.setState({ movies });
//   };
//   handleSizeChange = ({ target }) => {
//     this.setState({ pageSize: Number(target.value), currentPage: 1 });
//   };
//   handleSort = (sortColumn) => {
//     this.setState({ sortColumn });
//   };
//   handleGenresSelect = (genre) => {
//     this.setState({ currentGenre: genre, currentPage: 1, searchQuery: "" });
//   };
//   handlePageChange = (page) => {
//     this.setState({ currentPage: page });
//   };
//   handleSearch = (query) => {
//     this.setState({ searchQuery: query, currentPage: 1, currentGenre: {} });
//   };
//   getPagedData = () => {
//     const {
//       pageSize,
//       currentPage,
//       movies: allMovies,
//       currentGenre,
//       sortColumn,
//       searchQuery,
//     } = this.state;
//     let filtered = allMovies;
//     if (searchQuery) {
//       filtered = allMovies.filter((movie) =>
//         movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
//       );
//     } else if (currentGenre && currentGenre.id) {
//       filtered = allMovies.filter((m) => m.genre.id === currentGenre.id);
//     }

//     const orderedMovies = _.orderBy(
//       filtered,
//       sortColumn.path,
//       sortColumn.order
//     );
//     //const searchResult = searchQuery?orderedMovies.filter(movie=>movie.searchQuery!==-1):orderedMovies
//     const data = Paginate(orderedMovies, currentPage, pageSize);
//     return {
//       data,
//       totalCount: filtered.length,
//     };
//   };

//   render() {
//     const { length: count } = this.state.movies;
//     const {
//       pageSize,
//       currentPage,
//       currentGenre,
//       sortColumn,
//       searchQuery,
//       genres,
//       errorMessage,
//     } = this.state;

//     const { data: movies, totalCount } = this.getPagedData();
//     return (
//       <React.Fragment>
//         <div className="row">
//           <div className="col-2">
//             <ListGroup
//               items={genres}
//               onItemSelect={this.handleGenresSelect}
//               selectedItem={currentGenre}
//             />
//           </div>
//           {count === 0 ? (
//             <div className="col">
//               <p>There are no movies !</p>
//             </div>
//           ) : (
//             <div className="col">
//               <UserContext.Consumer>
//                 {(userContext) =>
//                   userContext && (
//                     <Link
//                       to="/movies/new"
//                       className="btn btn-primary mx-2 mb-2"
//                     >
//                       New Movie
//                     </Link>
//                   )
//                 }
//               </UserContext.Consumer>

//               <div className="row m-2">
//                 <div className="col-6">
//                   <label htmlFor="search" className="form-label">
//                     Showing {movies.length} of {totalCount} Movies
//                   </label>
//                   <Search
//                     name={"search"}
//                     value={searchQuery}
//                     label="Search for movie"
//                     onChange={this.handleSearch}
//                   />
//                 </div>
//                 <div className="col-6">
//                   <Select
//                     name="pageSize"
//                     label="Rows"
//                     errorMessage={errorMessage}
//                     onChange={this.handleSizeChange}
//                     options={[
//                       { id: 2, name: 2 },
//                       { id: 3, name: 3 },
//                       { id: 4, name: 4 },
//                       { id: 5, name: 5 },
//                       { id: 10, name: 10 },
//                       { id: 20, name: 20 },
//                     ]}
//                   />
//                 </div>
//               </div>
//               <MoviesTable
//                 movies={movies}
//                 sortColumn={sortColumn}
//                 onSort={this.handleSort}
//                 onDelete={this.handleDelete}
//                 onLike={this.handleLike}
//               />
//               <Pagination
//                 itemsCount={totalCount}
//                 currentPage={currentPage}
//                 pageSize={pageSize}
//                 onPageChange={this.handlePageChange}
//               ></Pagination>
//             </div>
//           )}
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Movies;
