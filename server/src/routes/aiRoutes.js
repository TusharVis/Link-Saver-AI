import express from "express";

import {
  generateCategory,
  generateSummary,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/category", generateCategory);
router.post("/summary", generateSummary);

export default router;