import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentPost,
  deleteComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*  READ */

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

/*  UPDATE   */

router.patch("/:id/like", verifyToken, likePost);
// Added comment patch
router.patch("/:id/comment", verifyToken, commentPost);
router.patch("/:id/:commentId/comment", verifyToken, deleteComment);

// ADDED DELETE COMMENT

export default router;
