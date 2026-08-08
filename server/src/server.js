import "dotenv/config";
import app from "./app.js";

console.log(
  "DATABASE configured:",
  Boolean(process.env.DATABASE_URL)
);

console.log(
  "DATABASE starts with mysql://:",
  process.env.DATABASE_URL?.startsWith("mysql://")
);

console.log(
  "DATABASE host:",
  process.env.DATABASE_URL
    ?.split("@")[1]
    ?.split("/")[0]
);

console.log(
  "JWT configured:",
  Boolean(process.env.JWT_SECRET)
);

console.log(
  "OpenRouter configured:",
  Boolean(process.env.OPENROUTER_API_KEY)
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});