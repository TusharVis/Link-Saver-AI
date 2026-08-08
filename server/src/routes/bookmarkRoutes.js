import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createBookmark,
  getBookmarks,
  updateBookmark,
  deleteBookmark,
  toggleFavorite,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.post("/", authMiddleware, createBookmark);

router.get("/", authMiddleware, getBookmarks);

router.put("/:id", authMiddleware, updateBookmark);

router.patch("/:id/favorite", authMiddleware, toggleFavorite);

router.delete("/:id", authMiddleware, deleteBookmark);

export default router;