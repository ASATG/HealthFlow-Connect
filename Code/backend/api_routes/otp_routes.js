import express from "express";
import { send_otp } from "../api_controllers/otp_controllers.js";

const otp_router = express.Router();

otp_router.post("/sendOTP", send_otp);

export { otp_router };