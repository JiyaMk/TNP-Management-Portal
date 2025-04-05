import Student from "../models/Student.js";
import Otp from "../models/Otp.js";
import nodeMailer from "nodemailer";
import otpGenerator from "otp-generator";

// student otp generation & mail sending
const otpGenerate = async (req, res) => {
    const { email } = req.body;
    // console.log(email);


    const otp = otpGenerator.generate(6);
    await Otp.create({ email, otp });
    // console.log(otp);


    let transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });

    let message = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'TNP Email Verification',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 10px;">
                <h2 style="color: #333;">Email Verification</h2>
                <p>Hi there,</p>
                <p>Your OTP to verify your email is:</p>
                <h3 style="color: #1a73e8;">${otp}</h3>
                <p>This OTP will expire in 10 minutes. Please do not share it with anyone.</p>
                <br/>
                <p>Regards,<br/>TNP Verification Team</p>
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

    await Otp.deleteOne({ email, otp });
    return res.status(200).json({ message: "OTP verified successfully" });
};

// student register
const registerStudent = async (req,res) => {
    const {name, rollNumber, branch, year, phoneNumber, resumeLink, SGPA, collegeMail, personalMail, backlog} = req.body;
};

// student login
const loginStudent = async (req,res) => {

};

export { otpGenerate, otpVerify, registerStudent, loginStudent };