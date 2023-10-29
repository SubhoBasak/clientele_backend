import express from "express";
import {
  addClient,
  delClient,
  getClients,
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/list", getClients);
router.post("/add", addClient);
router.delete("/del", delClient);

export default router;
