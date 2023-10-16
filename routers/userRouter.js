import express from "express";
import {
  delUser,
  editUser,
  forgot,
  getUsers,
  login,
  register,
  reset,
  verification,verify
} from "../controllers/userController.js";

const router = express.Router();

router.get("/list", getUsers)
router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgot);
router.post("/reset", reset);
router.post("/verification", verification);
router.post("/verify", verify);
router.put("/edit", editUser);
router.delete("/delete", delUser);

export default router;
