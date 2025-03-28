import express from "express";
import { getAllNotes, getNoteByID } from "../controllers/note.controller.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:noteID", getNoteByID);

export default router;
