import cors from "cors";

const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
