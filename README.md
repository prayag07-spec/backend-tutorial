# Backend Tutorial (Node.js, Express.js & MongoDB)

A production-ready RESTful Backend Application built with **Node.js**, **Express.js**, and **MongoDB Atlas** following the **Model-Route-Controller (MRC)** architectural pattern.

This project implements all core concepts from the freeCodeCamp Backend Web Development Tutorial:
- User Authentication (Registration, Bcrypt Password Hashing, Login, and Logout)
- Complete **CRUD** (Create, Read, Update, Delete) operations for resources
- Clean folder structure with separation of concerns
- Interactive testing using Postman

---

## 📁 Project Architecture & Folder Structure

```text
backend-tutorial/
├── src/
│   ├── controllers/
│   │   ├── post.controller.js      # Business logic for Post CRUD operations
│   │   └── user.controller.js      # Auth & User management controllers
│   ├── models/
│   │   ├── post.model.js          # Mongoose schema for Posts
│   │   └── user.model.js          # Mongoose schema for Users (with bcrypt hashing)
│   ├── routes/
│   │   ├── post.routes.js          # Endpoints for Posts CRUD
│   │   └── user.routes.js          # Endpoints for User Auth & Management
│   ├── app.js                     # Express app setup, middlewares, and route mounting
│   ├── constants.js               # Application constants (e.g., DB_NAME)
│   ├── database.js                # MongoDB Atlas connection handler using Mongoose
│   └── index.js                   # Application entry point (loads .env, starts server)
├── .env.example                   # Sample environment configuration
├── .gitignore                     # Git ignore rules
├── package.json                   # Project metadata and dependencies (ES Modules enabled)
├── postman_collection.json        # Ready-to-import Postman Collection
└── README.md                      # Comprehensive documentation
```

---

## 🚀 Step-by-Step Implementation Guide

### a) Node Project Setup & Git Repository

1. **Initialize Project & ES Modules:**
   The project is configured with `"type": "module"` in `package.json` to leverage modern ECMAScript imports (`import / export`).

2. **Dependencies:**
   - `express`: Minimal and flexible Node.js web application framework
   - `mongoose`: Elegant MongoDB object modeling for Node.js
   - `dotenv`: Loads environment variables from `.env`
   - `cors`: Enables Cross-Origin Resource Sharing
   - `bcryptjs`: Secure password hashing
   - `nodemon` *(dev dependency)*: Auto-restarts the server during development

3. **Install Dependencies:**
   ```bash
   npm install
   ```

---

### b) Online MongoDB Atlas Account & Cluster Setup

1. **Create an Atlas Account:**
   Sign up or log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Deploy a Free Cluster:**
   Create a shared M0 free-tier cluster (e.g., `Cluster0`).
3. **Configure Database User:**
   - Under **Database Access**, add a database user with password authentication and `Read and write to any database` privileges.
4. **Configure Network Access:**
   - Under **Network Access**, add IP address `0.0.0.0/0` (Allow Access from Anywhere) to permit connections from your development machine.
5. **Set Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.zvcld91.mongodb.net
   DB_NAME=backend_tutorial
   CORS_ORIGIN=*
   ```

---

### c) Database Models (MongoDB & Mongoose)

#### 1. User Model (`src/models/user.model.js`)
- `username`: String (required, unique, lowercase, trimmed)
- `email`: String (required, unique, lowercase, trimmed)
- `fullName`: String (required, trimmed)
- `password`: String (required, min 6 characters, hashed using `bcrypt` pre-save hook)
- `timestamps`: Automatically tracks `createdAt` and `updatedAt`

#### 2. Post Model (`src/models/post.model.js`)
- `title`: String (required, trimmed)
- `content`: String (required)
- `category`: String (default: `"General"`)
- `author`: String (required)
- `published`: Boolean (default: `true`)
- `timestamps`: Automatically tracks `createdAt` and `updatedAt`

---

### d) Express APIs (Controllers & Routes)

#### 1. User & Authentication Endpoints (`/api/users`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register new user (hashes password) |
| `POST` | `/api/users/login` | Authenticate user (compares bcrypt hash) |
| `POST` | `/api/users/logout` | Log out user |
| `GET` | `/api/users` | Get all registered users |
| `GET` | `/api/users/:id` | Get single user by ID |
| `PUT` | `/api/users/:id` | Update user profile |
| `DELETE` | `/api/users/:id` | Delete user by ID |

#### 2. Post CRUD Endpoints (`/api/posts`)
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/api/posts` | Create a new post |
| **Read (All)** | `GET` | `/api/posts` | Retrieve all posts (supports `?category=` filter) |
| **Read (Single)** | `GET` | `/api/posts/:id` | Retrieve a single post by ID |
| **Update** | `PUT` | `/api/posts/:id` | Update post content, title, or status |
| **Delete** | `DELETE` | `/api/posts/:id` | Delete a post by ID |

---

### e) Testing with Postman Desktop App

1. Open **Postman**.
2. Click **Import** (top left).
3. Select the file `postman_collection.json` located in this repository.
4. Run requests in sequence:
   1. **Health Check**: `GET http://localhost:8000/`
   2. **Register User**: `POST http://localhost:8000/api/users/register`
   3. **Login User**: `POST http://localhost:8000/api/users/login`
   4. **Create Post**: `POST http://localhost:8000/api/posts`
   5. **Get All Posts**: `GET http://localhost:8000/api/posts`
   6. **Update Post**: `PUT http://localhost:8000/api/posts/<postId>`
   7. **Delete Post**: `DELETE http://localhost:8000/api/posts/<postId>`

---

## 🏃 Running the Application Locally

```bash
# Development mode (with auto-reload on changes)
npm run dev

# Production mode
npm start
```

When started, you will see:
```text
⚙️ Server is running at http://localhost:8000
MongoDB connected! DB HOST: cluster0-shard-00-00.zvcld91.mongodb.net
```

---

## 📤 Pushing to Your GitHub Repository

1. Initialize Git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete Backend Tutorial with Node, Express, MongoDB and CRUD APIs"
   ```
2. Create a new public repository on GitHub (e.g., `backend-tutorial-node-express-mongodb`).
3. Add the remote and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
