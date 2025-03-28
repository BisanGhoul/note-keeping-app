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
