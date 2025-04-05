import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    stipend:{
        type: Number,
    },
    location:{
        type: String,
    },
    lastDate:{
        type: Date,
        required: true,
    },
})

export const Company = mongoose.model('Company', companySchema);