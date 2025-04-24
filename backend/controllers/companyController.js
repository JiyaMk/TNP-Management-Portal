import Company from '../models/Company.js';
import Student from '../models/Student.js';
import nodeMailer from "nodemailer";

export const notifyStudents = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) return res.status(404).json({ message: "Company not found" });

        const students = await Student.find({});
        const studentEmails = students.map((student) => student.email);

        const transporter = nodeMailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        const message = {
            from: process.env.MAIL_USER,
            to: studentEmails,
            subject: `Important: Last Date to Apply for ${company.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Placement Update</h2>
                    <p>The last date to apply for <strong>${company.name}</strong> is <strong>${new Date(company.lastDate).toDateString()}</strong>.</p>
                    <p>Please update your profile if needed.</p>
                    <br />
                    <p>Regards,<br />TNP Cell</p>
                </div>
            `,
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Failed to send emails" });
            }
            return res.status(200).json({ message: "Notification sent successfully", info });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const companyRegister = async (req, res) => {
    try {
        const { name, role, stipend, location, lastDate } = req.body;
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(400).json({ message: "Company already registered" });
        }
        const company = await Company.create({ name, role, stipend, location, lastDate });
        res.status(201).json({ message: "Company registered successfully", company });
    } catch (error) {
        res.status(500).json({ message: "Error in registering company", error });
    }
};

const getCompanyDetails = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.status(200).json({ companies });
      } catch (error) {
        res.status(500).json({ message: "Error fetching company details", error });
      }
};

export {companyRegister,getCompanyDetails}