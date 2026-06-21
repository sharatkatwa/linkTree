import axios from "axios";
import { linkApiInstance } from "../../home/services/home.api";
import { AuthApiInstance } from "../../auth/services/auth.api";

const clickApiInstance = axios.create({
  baseURL: "/api/clicks",
});

export const addCount = async (linkId) => {
  const res = await clickApiInstance.post(`/${linkId}`);
  return res;
};

export const getMyClicks = async () => {
  const res = await clickApiInstance.get("/");
  return res;
};

export const clicksPerDay = async () => {
  const res = await clickApiInstance.get("/perDay");
  return res;
};

export const getMe = async () => {
  const res = await AuthApiInstance.get("/me");
  return res;
};

export const addLink = async (data) => {
  const res = await linkApiInstance.post("/", data);
  return res;
};

export const removeLink = async (linkId) => {
  const res = await linkApiInstance.delete(`/${linkId}`);
  return res;
};
