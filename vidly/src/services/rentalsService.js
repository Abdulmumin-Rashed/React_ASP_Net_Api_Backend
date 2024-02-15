import config from "../config.json";
import http from "./httpService";

const RentalsEndPoint = config.apiUrl + "/Rent";
function rentalsUrl(id) {
  return `${RentalsEndPoint}/${id}`;
}
export function getRentals() {
  return http.get(RentalsEndPoint);
}
export function getRental(id) {
  return http.get(rentalsUrl(id));
}
export function returnRentedMovie(id) {
  return http.put(rentalsUrl(id));
}
export function saveRental(rent) {
  return http.post(RentalsEndPoint, rent);
}
