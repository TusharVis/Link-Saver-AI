import api from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/auth/profile", data);
  return res.data;
};