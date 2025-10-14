import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true
        },
        id: {type: mongoose.Schema.Types.ObjectId},
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'], // admin is the reataurant owner, superadmin is the platform owner
            default: 'admin'
        },
        email: {
            type: String,
            required: true,
            unique: true,  
        },
        password: {
            type: String,
            required: true,
        },
        lastLogin:{
            type: Date,
            default: Date.now
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date
    },
     { timestamps: true })

export const User = mongoose.model('User', userSchema);