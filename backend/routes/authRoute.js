import express from 'express';
const router = express.Router();
import {otpGenerate, otpVerify, registerStudent, loginStudent} from '../controllers/authController.js';

router.route('/send-otp').post(otpGenerate);
router.route('/verify-otp').post(otpVerify);
router.route('/register').post(registerStudent);
router.route('/login').post(loginStudent);

export default router;