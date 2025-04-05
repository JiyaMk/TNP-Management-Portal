import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
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
        collegeMail: {
            type: String,
            required: true,
            unique: true
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


const Student = mongoose.model('Student', studentProfileSchema);

export default Student;
