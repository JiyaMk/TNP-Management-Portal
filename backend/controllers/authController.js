import Student from "../models/Student.js";
import Otp from "../models/Otp.js";
import nodeMailer from "nodemailer";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

// student otp generation & mail sending
const otpGenerate = async (req, res) => {
    const { email } = req.body;
    // console.log(email);

    //only igdtuw studnts can register
    if(!email.endsWith("@igdtuw.ac.in")) return res.status(400).json({ message: "Only IGDTUW students can register" });
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, digits: true });
    await Otp.create({ email, otp });
    // console.log(otp);
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });

    const message = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'TNP Email Verification',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 10px;">
                <h2>Email Verification</h2>
                <p>Your OTP is:</p>
                <h3>${otp}</h3>
                <p>This OTP will expire in 10 minutes. Please do not share it with anyone.</p>
            </div>
        `,
    };
    
    
    transporter.sendMail(message, (error, info) => {
        if(error) return res.status(500).json({ message: "Error in sending mail" });
        // console.log("Mail sent info:", info);
        return res.status(200).json({ message: "OTP sent successfully" });
    });

};

// student otp verification
const otpVerify = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email, otp);

    const otpData = await Otp.findOne({ email, otp });
    if(!otpData) return res.status(400).json({ message: "Invalid OTP" });
    const token = jwt.sign({verifiedEmail: email}, process.env.JWT_SECRET, { expiresIn: '60m' });
    await Otp.deleteOne({ email, otp });
    return res.status(200).json({ message: "OTP verified successfully", token });
};

// student register
const registerStudent = async (req,res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.verifiedEmail;
        const {name, rollNumber, password, branch, year, semester, phoneNumber, resumeLink, marks10th, marks12th, SGPA, personalMail, backlog, certifications} = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) return res.status(400).json({ message: "Student already registered" });

        const credits = [22, 22, 23, 22, 22, 22, 21, 22];
        let totalPoints = 0;
        let totalCredits = 0;

        const parsedSGPA = Array.isArray(SGPA)
        ? SGPA.map((val) => parseFloat(val))
        : [];

        for (let i = 0; i < parsedSGPA.length; i++) {
        if (!isNaN(parsedSGPA[i]) && credits[i]) {
            totalPoints += parsedSGPA[i] * credits[i];
            totalCredits += credits[i];
        }
        }

        const CGPA =
        totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : null;

        let profilePicUrl = null;
        if(req.file){
            const response = await uploadOnCloudinary(req.file.path);
            console.log(response);
            profilePicUrl = response?.secure_url;
        }
        const student = await Student.create({
            name, email, rollNumber, password, branch, year, semester, phoneNumber, resumeLink, marks10th, marks12th, SGPA, personalMail, backlog,         certifications, profilePic: profilePicUrl, CGPA
        });

        return res.status(201).json({ message: "Student registered successfully", student });
    } catch (error) {
        return res.status(500).json({ message: "Error in registering student", error });
    }

};

// student login
const loginStudent = async (req,res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        const student = await Student.findOne({ email });
        if(!student) return res.status(400).json({ message: "Student not found" });

        const isMatch = await bcrypt.compare(password, student.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '10d' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Error in logging in", error });
    }
};

const getStudentDetails = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select("-password");
        if (!student) return res.status(404).json({ message: "Student not found" });   
        return res.status(200).json({ student }); 
    } catch (error) {
        return res.status(500).json({ message: "Error in getting student details", error });
    }
};

const updateStudentDetails = async (req, res) => {
    try {
        const studentId = req.student.id;
        const updates = req.body;
        const allowed = ['personalMail', 'phoneNumber', 'resumeLink', 'SGPA', 'certifications', 'profilePic', 'semester', 'backlog'];

        const invalid = Object.keys(updates).filter(key => !allowed.includes(key));
        if(invalid.length > 0) return res.status(400).json({ message: "Not allowed to update these fields", invalid }); 
        
        if(req.file){
            const response = await uploadOnCloudinary(req.file.path);
            updates.profilePic = response?.secure_url;
        }

        const updatedStudent = await Student.findByIdAndUpdate(studentId, updates, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        return res.status(200).json({ message: "Student details updated successfully", updatedStudent });

    } catch (error) {
        return res.status(500).json({ message: "Error in updating student details", error });
    }
};

export { otpGenerate, otpVerify, registerStudent, loginStudent, getStudentDetails, updateStudentDetails };
