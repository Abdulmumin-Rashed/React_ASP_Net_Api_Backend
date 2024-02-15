import config from "../config.json";
import http from "./httpService";
const usersEndPoint = config.apiUrl + "/User";

export function register(newUser) {
  return http.post(usersEndPoint, {
    email: newUser.username,
    password: newUser.password,
    name: newUser.name,
  });
}
