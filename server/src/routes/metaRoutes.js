import express from "express";
import { fetchMetadata } from "../controllers/metaController.js";

const router = express.Router();

router.post("/", fetchMetadata);

export default router;