import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        category: {
            type: String,
            default: "General",
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author name or user reference is required"],
            trim: true,
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.model("Post", postSchema);
