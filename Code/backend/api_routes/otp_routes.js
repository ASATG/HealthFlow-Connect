import express from "express";
const otp_router = express.Router();
import UserController from '../api_controllers/otp_controllers.js'

otp_router.get('/sendOTP',UserController.sendOTP)
otp_router.get('/verifyOTP',UserController.verifyOTP)


export {otp_router}