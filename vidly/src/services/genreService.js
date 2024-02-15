import http from "./httpService";
import config from "../config.json";

const genresEndPoint = config.apiUrl + "/Genres";

export function getGenres(abort) {
  return http.get(genresEndPoint, abort);
}
export function getGenre(id) {
  return http.get(`${genresEndPoint}/${id}`);
}
