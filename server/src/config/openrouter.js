import axios from "axios";

const openrouter = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "Link Saver AI",
  },
});
console.log(
  "OpenRouter Key:",
  process.env.OPENROUTER_API_KEY?.slice(0, 15)
);
export default openrouter;