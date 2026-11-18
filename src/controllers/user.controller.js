import { User } from "../models/user.model.js";

// @desc    Register a new user
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { username, email, fullName, password } = req.body;

        if (!username || !email || !fullName || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (username, email, fullName, password) are required.",
            });
        }

        // Check if user already exists
        const existedUser = await User.findOne({
            $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
        });

        if (existedUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email or username already exists.",
            });
        }

        // Create user
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            fullName,
            password,
        });

        // Fetch created user without password
        const createdUser = await User.findById(user._id).select("-password");

        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: createdUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message,
        });
    }
};

// @desc    Login user
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if ((!email && !username) || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or username, and password are required.",
            });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [
                { email: email ? email.toLowerCase() : "" },
                { username: username ? username.toLowerCase() : "" },
            ],
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist.",
            });
        }

        // Verify password
        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const loggedInUser = await User.findById(user._id).select("-password");

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            data: loggedInUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message,
        });
    }
};

// @desc    Logout user
// @route   POST /api/users/logout
export const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User logged out successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging out",
            error: error.message,
        });
    }
};

// @desc    Get all users (Read - All)
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// @desc    Get single user by ID (Read - Single)
// @route   GET /api/users/:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};

// @desc    Update user details (Update)
// @route   PUT /api/users/:id
export const updateUser = async (req, res) => {
    try {
        const { fullName, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    fullName,
                    email: email ? email.toLowerCase() : undefined,
                },
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
};

// @desc    Delete user (Delete)
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};
