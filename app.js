import express from "express";
import notesRoutes from "./api/routes/notes.js";

const app = express();

app.use("/notes", notesRoutes);

export default app;
