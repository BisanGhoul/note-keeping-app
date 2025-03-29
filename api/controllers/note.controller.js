import Note from "../models/note.js";
import mongoose from "mongoose";
import { getPaginatedNotes } from "../services/notes.service.js";

// Get all notes
export const getAllNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (isNaN(limit) || isNaN(page)) {
            return res
                .status(400)
                .json({ message: "Invalid page or limit parameter" });
        }
        const { notes, totalCount, totalPages } = await getPaginatedNotes(
            page,
            limit
        );

        res.status(200).json({
            notes,
            metadata: {
                currentPage: parseInt(page),
                totalPages,
                totalCount,
                page,
                limit,
            },
            request: {
                type: "GET",
                url: `http://localhost:3000/notes?page=${page}&limit=${limit}`,
            },
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: error.message });
    }
};

// Search notes (with pagination)
export const searchNotes = async (req, res) => {
    try {
        const query = req.query.query || "";
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (isNaN(page) || isNaN(limit)) {
            return res
                .status(400)
                .json({ message: "Invalid page or limit parameter" });
        }

        const { notes, totalCount, totalPages } = await getPaginatedNotes(
            page,
            limit,
            query
        );

        res.status(200).json({
            notes,
            metadata: {
                currentPage: page,
                totalPages,
                totalCount,
                page,
                limit,
                query,
            },
            request: {
                type: "GET",
                url: `http://localhost:3000/notes/search?query=${query}&page=${page}&limit=${limit}`,
            },
        });
    } catch (error) {
        console.error("Error searching notes:", error);
        res.status(500).json({ error: error.message });
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

// Add a new note
export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content || !title.trim() || !content.trim()) {
            return res.status(400).json({
                message: "Title and content are required fields.",
            });
        }

        const newNote = new Note({
            title,
            content,
        });

        const savedNote = await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: savedNote,
            request: {
                type: "GET",
                url: `http://localhost:3000/notes/${savedNote._id}`,
            },
        });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
    try {
        const { noteID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(noteID)) {
            return res.status(400).json({ message: "Invalid Note ID format." });
        }

        const deletedNote = await Note.findByIdAndDelete(noteID);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found." });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote,
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update a note by ID
export const updateNote = async (req, res) => {
    try {
        const { noteID } = req.params;
        const { title, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(noteID)) {
            return res.status(400).json({ message: "Invalid Note ID format." });
        }

        if (!title || !content || !title.trim() || !content.trim()) {
            return res.status(400).json({
                message: "Title and content are required fields.",
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            noteID,
            { title, content, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found." });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote,
            request: {
                type: "GET",
                url: `http://localhost:3000/notes/${updatedNote._id}`,
            },
        });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: error.message });
    }
};

// Partially update a note (title, content, or both)
export const partiallyUpdateNote = async (req, res) => {
    try {
        const { noteID } = req.params;
        const { title, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(noteID)) {
            return res.status(400).json({ message: "Invalid Note ID format." });
        }

        if (!title?.trim() && !content?.trim()) {
            return res.status(400).json({
                message:
                    "At least one of title or content is required for update.",
            });
        }

        const updateFields = {};
        if (title?.trim()) updateFields.title = title.trim();
        if (content?.trim()) updateFields.content = content.trim();
        updateFields.updatedAt = new Date();

        const updatedNote = await Note.findByIdAndUpdate(
            noteID,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found." });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote,
            request: {
                type: "GET",
                url: `http://localhost:3000/notes/${updatedNote._id}`,
            },
        });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: error.message });
    }
};

/* for training purposes */
const getAllNotesUsingNormalFiltering = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (isNaN(limit) || isNaN(page)) {
            return res
                .status(400)
                .json({ message: "Invalid page or limit parameter" });
        }

        const skip = (page - 1) * limit;

        const notes = await Note.find()
            .skip(skip)
            .limit(limit)
            .select("title content createdAt _id")
            .sort({ createdAt: -1 });

        const totalCount = await Note.countDocuments();

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            notes,
            metadata: {
                currentPage: page,
                totalPages,
                totalCount,
                page,
                limit,
            },
            request: {
                type: "GET",
                url: `http://localhost:3000/notes?page=${page}&limit=${limit}`,
            },
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: error.message });
    }
};
