import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyTOken } from "../middleware/auth.js"

const router = express.Router();

// READ
router.get("/:id", verifyTOken, getUser);
router.get("/:id/friends", verifyTOken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyTOken, addRemoveFriend);

export default router;