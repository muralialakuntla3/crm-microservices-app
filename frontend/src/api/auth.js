import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  const res = await axios.post(`${API}/user/login`, { email, password });
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/user/register`, data);
  return res.data;
};
