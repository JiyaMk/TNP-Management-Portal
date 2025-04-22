import express from "express";
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();
import { exportFilteredStudents } from "../controllers/dbGenerationController.js";
import {upload} from "../middlewares/multer.js";

router.route("/export").post(authMiddleware, upload.none(), exportFilteredStudents);

export default router;
