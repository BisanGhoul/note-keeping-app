import express from "express";
import {
    getAllNotes,
    searchNotes,
    getNoteByID,
    addNote,
    deleteNote,
    updateNote,
    partiallyUpdateNote,
} from "../controllers/note.controller.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/search", searchNotes);
router.get("/:noteID", getNoteByID);
router.delete("/:noteID", deleteNote);
router.put("/:noteID", updateNote);
router.patch("/:noteID", partiallyUpdateNote);
router.post("/", addNote);

export default router;
