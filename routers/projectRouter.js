import express from "express";
import {
  addProject,
  delProject,
  getProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.route("/").get(getProjects).post(addProject).delete(delProject);

export default router;
