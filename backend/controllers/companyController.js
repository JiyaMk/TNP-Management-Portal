import Company from '../models/Company.js';

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