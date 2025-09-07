import axios from "axios";

const API = process.env.REACT_APP_API_URL || "";

export const getAnalytics = async (token) => {
  const res = await axios.get(`${API}/analytics/analytics/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
