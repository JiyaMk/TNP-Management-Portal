import express from "express";
const router = express.Router();
import { companyRegister, getCompanyDetails, notifyStudents } from "../controllers/companyController.js";
import {upload} from "../middlewares/multer.js";

router.route("/register").post(upload.none(), companyRegister);
router.route("/get-details").get(getCompanyDetails);
router.route("/notify/:id").post(notifyStudents);


export default router;