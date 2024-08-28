import Post from '../models/postModel.js';
import User from '../models/userModel.js'; 
import Comment from '../models/commentModel.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const author = req.user._id;

        const newPost = new Post({
            author,
            content,
            image
        });

        await newPost.save();
        const populatedPost = await Post.findById(newPost._id).populate('author')
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get posts by user and their friends
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch the user including their friends
        const user = await User.findById(userId).populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the list of friends' IDs and include the user's own ID
        const friendIds = user.friends.map(friend => friend._id);
        friendIds.push(userId);

        // Find posts by the user and their friends
        const posts = await Post.find({ author: { $in: friendIds } })
            .populate('author') // Adjust as needed
            .populate('comments');

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email') // Adjust as needed
            .populate('comments');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { content, image },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user ID is available from authentication middleware

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        post.likes.push(userId);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Unlike a post
// @route   POST /api/posts/:id/unlike
// @access  Private
export const unlikePost = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user ID is available from authentication middleware

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: 'You have not liked this post' });
        }

        post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
