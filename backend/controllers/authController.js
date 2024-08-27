import User from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json("User already exists...");

        // Validate user input
        if (!name || !email || !password)
            return res.status(400).json("All fields are required...");

        // Create a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create a new user
        user = new User({ name, email, password, verificationToken });
        
        // Save the user with the hashed password
        await user.save();

        // Send verification email
        await sendEmail(user);

        // Generate token
        const token = generateToken(user._id, user.role);

        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        // If the user is not found
        if (!user) return res.status(400).json("Invalid email or password...");

        // Check if the password is correct
        const validPassword = await user.matchPassword(password);
        if (!validPassword)
            return res.status(400).json("Invalid email or password...");

        // Generate a JWT token
        const token = generateToken(user._id, user.role);

        // Respond with user details and token
        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// @desc    Verify email address
// @route   GET /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const { token: verificationToken } = req.query; // Extract token from query params

        if (!verificationToken) {
            return res.status(400).json({ message: 'VerificationToken not Found...' });
        }

        const user = await User.findOne({ verificationToken });

        if (user) {
            user.isVerified = true;
            user.verificationToken = null; // Clear the token after verification

            await user.save();

            const token = generateToken(user._id, user.role);

            res.status(200).json({ 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                token,
                isVerified: user?.isVerified
            });
        } else {
            res.status(404).json({ message: 'Email verification failed, Invalid Token...'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};




export { signup, login, verifyEmail };