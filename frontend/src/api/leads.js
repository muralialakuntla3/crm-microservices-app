import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getLeads = async (token) => {
  const res = await axios.get(`${API}/leads/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addLead = async (token, data) => {
  const res = await axios.post(`${API}/leads/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
