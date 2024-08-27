import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

// Encrypt password before saving user
userSchema.pre('save', async function (next) {
    try {
        if(this.isModified('password')) {
            const salt = await bcrypt.genSalt(12)
            this.password = await bcrypt.hash(this.password, salt)
        }
    } catch (error) {
        next(error)
        
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User

