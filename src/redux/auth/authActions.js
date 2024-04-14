import axios from "axios";
import { LOGIN, LOGOUT } from "./authTypes";

export const login = (users) => {
  return {
    type: LOGIN,
    payload: users,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
