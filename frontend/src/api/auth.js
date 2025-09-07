import axios from "axios";

const API = process.env.REACT_APP_API_URL || "";

export const login = async (email, password) => {
  const res = await axios.post(`${API}/users/api/v1/auth/login`, { email, password });
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/users/api/v1/auth/register`, data);
  return res.data;
};
