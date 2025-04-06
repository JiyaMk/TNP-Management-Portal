import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const studentProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["student", "pr_head", "management_head"],
            default: "student"
        },
        rollNumber: {
            type: String,
            required: true,
            unique: true
        },
        branch: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        semester:{
            type: Number,
            required: true  
        },
        marks10th:{
            type: Number,
            required: true 
        },
        marks12th:{
            type: Number,
            required: true 
        },
        CGPA: {
            type: Number,
            default: 0 
        },
        resumeLink: {
            type: String,
            required: true
        },
        SGPA: {
            type: [Number],
            default: [] 
        },
        personalMail: {
            type: String,
            required: true,
            unique: true
        },
        backlog: {
            type: String,
            required: true
        },
        certifications:{
            type: [String],
            default: [] 
        },
        profilePic:{
            type: String,
            default: "" 
        },
        appliedFor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company'
            }
        ]
    },
    { timestamps: true } 
);

studentProfileSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

studentProfileSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


const Student = mongoose.model('Student', studentProfileSchema);

export default Student;
