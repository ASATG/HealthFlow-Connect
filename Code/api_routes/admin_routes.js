import express from "express";
import { add_doctor_record, update_doctor_record, delete_doctor_record } from "../api_controllers/admin_controllers.js";

const admin_router = express.Router();

admin_router.post('/add_doctor_record/', add_doctor_record);
admin_router.post('/update_doctor_record/', update_doctor_record);
admin_router.post('/delete_doctor_record/', delete_doctor_record);

export { admin_router };