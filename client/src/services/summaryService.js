import api from "./api";

export const generateSummary = async (data) => {
  const res = await api.post("/ai/summary", data);

  return res.data;
};