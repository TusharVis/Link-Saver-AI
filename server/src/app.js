import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Link Saver AI Backend Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai", chatRoutes);

export default app;