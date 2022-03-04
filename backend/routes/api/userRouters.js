import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../../controller/userController.js";
import { protect } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
