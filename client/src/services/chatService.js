import api from "./api";

export const askAI = async (prompt) => {
  const res = await api.post("/ai/chat", {
    prompt,
  });

  return res.data;
};