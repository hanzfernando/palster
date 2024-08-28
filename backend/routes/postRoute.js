import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import { authToken } from '../middlewares/auth.js'; // Middleware to verify JWT

const router = express.Router();

// Create a new post
router.post('/', authToken, createPost);

// Get all posts
router.get('/', authToken, getPosts);

// Get a post by ID
router.get('/:id', authToken, getPostById);

// Update a post
router.put('/:id', authToken, updatePost);

// Delete a post
router.delete('/:id', authToken, deletePost);

export default router;
