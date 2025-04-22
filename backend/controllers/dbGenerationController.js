import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import Student from "../models/Student.js";
import ExportedFile from "../models/Excel.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportFilteredStudents = async (req, res) => {
  try {
    const { role, email } = req.student; 

    if (role !== "management_head") {
      return res.status(403).json({ message: "Access denied: Only Management Heads can export student data." });
    }

    const { fields, min10th, min12th, minCGPA } = req.body;

    const query = {
      marks10th: { $gte: min10th || 0 },
      marks12th: { $gte: min12th || 0 },
      CGPA: { $gte: minCGPA || 0 },
    };

    const students = await Student.find(query).select(fields.join(" "));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Filtered Students");

    worksheet.columns = fields.map((field) => ({
      header: field,
      key: field,
      width: 20,
    }));

    students.forEach((student) => {
      const rowData = {};
      fields.forEach((field) => {
        rowData[field] = student[field];
      });
      worksheet.addRow(rowData);
    });

    const tempFileName = `filtered_students_${Date.now()}.xlsx`;
    const tempFilePath = path.join(__dirname, `../public/temp/${tempFileName}`);
    fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });

    await workbook.xlsx.writeFile(tempFilePath);

    const uploadResult = await uploadOnCloudinary(tempFilePath, "excel_exports");
    
    if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath); 
      }

    const savedFile = await ExportedFile.create({
      filename: tempFileName,
      filepath: uploadResult.secure_url,
      uploadedBy: email,
      filters: { min10th, min12th, minCGPA, fields },
    });

    res.status(201).json({ message: "Excel file uploaded to Cloudinary", file: savedFile });
  } catch (error) {
    console.error("Excel Export Error:", error);
    res.status(500).json({ message: "Failed to export and upload Excel", error });
  }
};

export{exportFilteredStudents}