import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  userProfile,
} from "../controllers/userControllers.js";
import { protector } from "../middlerware/authMiddleware.js";
const router = express.Router();

router.post("/users", registerUser);
router.post("/users/auth", authUser);
router.post("/users/logout", logoutUser);
router
  .route("/users/profile")
  .get(protector, userProfile)
  .put(protector, updateUserProfile);

export default router;
