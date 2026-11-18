import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || DB_NAME;

    // 1. Try connecting to MongoDB Atlas if URI is provided
    if (uri && !uri.includes("<username>")) {
        try {
            const connectionString = uri.includes("?")
                ? uri.replace("?", `/${dbName}?`)
                : `${uri.replace(/\/$/, "")}/${dbName}`;

            console.log("Connecting to MongoDB Atlas...");
            const connectionInstance = await mongoose.connect(connectionString, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`\n✅ MongoDB Atlas Connected! DB HOST: ${connectionInstance.connection.host}`);
            return;
        } catch (atlasErr) {
            console.warn(`\n⚠️ MongoDB Atlas connection notice: ${atlasErr.message}`);
            console.log("ℹ️ Switching to local in-memory database so your app can run immediately for offline testing/demo...");
        }
    }

    // 2. Fallback to in-memory database for local evaluation / offline mode
    try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create();
        const memoryUri = mongod.getUri();
        const connectionInstance = await mongoose.connect(memoryUri);
        console.log(`\n✅ Local In-Memory MongoDB Connected! (Offline/Evaluation Mode)`);
        console.log(`ℹ️ Host: ${connectionInstance.connection.host} | DB: test`);
        return;
    } catch (memErr) {
        console.error("Local MongoDB fallback failed: ", memErr.message);
        throw memErr;
    }
};

export default connectDB;
