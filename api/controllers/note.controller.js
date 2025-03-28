import Note from "../models/note.js";
import mongoose from "mongoose";

// Get all notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().select("title content createdAt _id");

        res.status(200).json({
            count: notes.length,
            notes: notes.map((note) => ({
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
                _id: note._id,
                request: {
                    type: "GET",
                    url: `http://localhost:3000/notes/${note._id}`,
                },
            })),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single note by ID
export const getNoteByID = async (req, res, next) => {
    try {
        const { noteID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(noteID)) {
            return res.status(400).json({
                error: "Invalid Note Id format",
            });
        }

        const note = await Note.findById(noteID).select(
            "title content createdAt _id"
        );

        if (!note) {
            return res.status(404).json({ message: "No record with this ID." });
        }

        res.status(200).json({
            note,
            request: {
                type: "GET",
                url: `http://localhost:3000/notes`,
            },
        });
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ error: error.message });
    }
};
