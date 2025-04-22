import express from 'express';
const router = express.Router();
import {otpGenerate, otpVerify, registerStudent, loginStudent, getStudentProfile, updateStudentDetails, getStudentsDetails} from '../controllers/authController.js';
import { upload } from '../middlewares/multer.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.route('/send-otp').post(otpGenerate);
router.route('/verify-otp').post(otpVerify);
router.route('/register').post( upload.single("profilePic"), registerStudent);
router.route('/login').post( upload.none(), loginStudent);
router.route('/profile').get(authMiddleware, getStudentProfile);
router.route('/details').get( getStudentsDetails);
router.route('/update').put(authMiddleware, upload.single("profilePic"), updateStudentDetails);

export default router;