import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
    {
        name: {
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
        appliedFor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company'
            }
        ]
    },
    { timestamps: true } 
);

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile;
