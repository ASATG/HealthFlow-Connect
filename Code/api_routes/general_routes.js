import express from "express";
import { verify_user, change_password } from "../api_controllers/general_controller.js";

const general_router = express.Router();

general_router.post('/verify_user/', verify_user);
general_router.post('/change_password/', change_password);

export { general_router };