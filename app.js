import express from "express";
import notesRoutes from "./api/routes/notes.js";
import morgan from "morgan";
import corsMiddleware from "./api/middleware/cors.js";
import errorHandler from "./api/middleware/errorHandler.js";

const app = express();

app.use(corsMiddleware);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/notes", notesRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use(errorHandler);

export default app;
