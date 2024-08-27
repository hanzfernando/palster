import User from '../models/userModel.js';

// @desc   Get user details
// @route  GET /api/users/profile
// @access Private
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getUserDetails }