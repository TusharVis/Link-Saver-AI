import axios from "axios";

const openrouter = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "Content-Type": "application/json",
    "HTTP-Referer": "https://tusharvis.github.io/Link-Saver-AI/",
    "X-Title": "Link Saver AI",
  },
});

openrouter.interceptors.request.use((config) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log(
    "OpenRouter API key available:",
    Boolean(apiKey)
  );

  config.headers.Authorization = `Bearer ${apiKey}`;

  return config;
});

export default openrouter;