import express from "express";
import {
    getAllNotes,
    searchNotes,
    getNoteByID,
} from "../controllers/note.controller.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/search", searchNotes);
router.get("/:noteID", getNoteByID);

export default router;
