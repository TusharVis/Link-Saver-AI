import api from "./api";

export const generateCategory = async (data) => {
  try {
    const res = await api.post("/ai/category", data);
    return res.data;
  } catch (error) {
    console.error("AI Category Error:", error);
    throw error;
  }
};