import axios from "axios";

const API = process.env.REACT_APP_API_URL || "";

export const getCourses = async (token) => {
  const res = await axios.get(`${API}/courses/api/v1/courses/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addCourse = async (token, data) => {
  const res = await axios.post(`${API}/courses/api/v1/courses/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
