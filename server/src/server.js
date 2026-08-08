import "dotenv/config";
import app from "./app.js";

console.log(
  "OpenRouter configured:",
  Boolean(process.env.OPENROUTER_API_KEY)
);

console.log(
  "JWT configured:",
  Boolean(process.env.JWT_SECRET)
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});