import { Post } from "../models/post.model.js";

// @desc    Create a new post (Create)
// @route   POST /api/posts
export const createPost = async (req, res) => {
    try {
        const { title, content, category, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                message: "Title, content, and author are required fields.",
            });
        }

        const post = await Post.create({
            title,
            content,
            category: category || "General",
            author,
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully!",
            data: post,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating post",
            error: error.message,
        });
    }
};

// @desc    Get all posts (Read - All)
// @route   GET /api/posts
export const getAllPosts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const posts = await Post.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving posts",
            error: error.message,
        });
    }
};

// @desc    Get single post by ID (Read - Single)
// @route   GET /api/posts/:id
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving post",
            error: error.message,
        });
    }
};

// @desc    Update post by ID (Update)
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
    try {
        const { title, content, category, published } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title,
                    content,
                    category,
                    published,
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post updated successfully!",
            data: updatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message,
        });
    }
};

// @desc    Delete post by ID (Delete)
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: error.message,
        });
    }
};
