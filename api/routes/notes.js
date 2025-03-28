import express from "express";
import { getAllNotes } from "../controllers/note.controller.js";
const router = express.Router();

router.get("/", getAllNotes);

export default router;
