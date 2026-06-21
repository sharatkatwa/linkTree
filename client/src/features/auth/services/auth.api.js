import axios from "axios";

export const AuthApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const registerApi = async (data) => {
  const res = await AuthApiInstance.post("/register", data);
  return res;
};
export const loginApi = async (data) => {
  const res = await AuthApiInstance.post("/login", data);
  return res;
};

export const logoutApi = async () => {
  const res = await AuthApiInstance.post("/logout");
  return res;
};
