import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        post: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post', 
            required: true 
        },
        author: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        content: { 
            type: String, 
            required: true, 
            maxlength: 300 
        },
        likes: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],    
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

