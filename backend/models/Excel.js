import mongoose from "mongoose";

const exportedFileSchema = new mongoose.Schema({
  filename: String,
  filepath: String, 
  uploadedBy: String,
  filters: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExportedFile =  mongoose.model("ExportedFile", exportedFileSchema);

export default ExportedFile;
