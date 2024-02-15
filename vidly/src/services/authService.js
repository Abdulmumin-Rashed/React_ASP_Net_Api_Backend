/* eslint-disable import/no-anonymous-default-export */
import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const authEndPoint = config.apiUrl + "/Auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(authEndPoint, {
    email: username,
    password: password,
    name: "name",
  });
  localStorage.setItem(tokenKey, jwt);
}
export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
