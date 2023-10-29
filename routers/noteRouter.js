import express from "express";

import {} from "../models/noteModel.js";
import { addNote, delNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

router.route("/").get(getNotes).post(addNote).delete(delNote);

export default router;
