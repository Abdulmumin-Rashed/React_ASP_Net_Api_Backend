import config from "../config.json";
import http from "./httpService";

const moviesEndPoint = config.apiUrl + "/Movies";
function movieUrl(id) {
  return `${moviesEndPoint}/${id}`;
}
export function getMovies() {
  return http.get(moviesEndPoint);
}
export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
export function getMovie(id) {
  return http.get(movieUrl(id));
}
export async function saveMovie(movie) {
  if (movie.id) {
    return http.put(movieUrl(movie.id), movie);
  }

  return http.post(moviesEndPoint, movie);
}
