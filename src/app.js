import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Root health check route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend API is running successfully!",
        endpoints: {
            users: "/api/users",
            posts: "/api/posts",
        },
    });
});

// Import routes
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

// Routes declaration
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;
