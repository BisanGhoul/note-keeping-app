import express from "express";
import {
    getAllNotes,
    searchNotes,
    getNoteByID,
    addNote,
    deleteNote,
    updateNote,
} from "../controllers/note.controller.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/search", searchNotes);
router.get("/:noteID", getNoteByID);
router.delete("/:noteID", deleteNote);
router.put("/:noteID", updateNote);
router.post("/", addNote);

export default router;
