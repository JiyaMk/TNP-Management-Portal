import express from "express";
const router = express.Router();
import { companyRegister, getCompanyDetails } from "../controllers/companyController.js";
import {upload} from "../middlewares/multer.js";

router.route("/register").post(upload.none(), companyRegister);
router.route("/get-details").get(getCompanyDetails);

export default router;