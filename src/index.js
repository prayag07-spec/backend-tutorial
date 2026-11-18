import dotenv from "dotenv";
import connectDB from "./database.js";
import app from "./app.js";

// Configure dotenv
dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8000;

// Connect to MongoDB and start server
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Express App error: ", error);
        });

        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed! ", err);
    });
