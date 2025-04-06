import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const student = await Student.findById(decoded.id).select('-password');
        console.log(student);
        if(!student) {
            return res.status(401).json({ message: 'Student not found' });
        }
        req.student = student;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error});
    }
};

export default authMiddleware;