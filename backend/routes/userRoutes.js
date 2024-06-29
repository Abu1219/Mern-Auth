import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  userProfile,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/users", registerUser);
router.post("/users/auth", authUser);
router.post("/users/logout", logoutUser);
router.route("/users/profile").get(userProfile).put(updateUserProfile);

export default router;
