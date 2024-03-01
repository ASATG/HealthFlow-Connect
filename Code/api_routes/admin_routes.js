import express from "express";
import { add_doctor_record, update_doctor_record, delete_doctor_record, add_counter_record, delete_counter_record, add_pharmacist_record, delete_pharmacist_record, add_lab_technician_record, delete_lab_technician_record, update_otherstaff_record } from "../api_controllers/admin_controllers.js";

const admin_router = express.Router();

admin_router.post('/add_doctor_record/', add_doctor_record);
admin_router.post('/update_doctor_record/', update_doctor_record);
admin_router.post('/delete_doctor_record/', delete_doctor_record);
admin_router.post('/add_counter_record/', add_counter_record);
admin_router.post('/delete_counter_record/', delete_counter_record);
admin_router.post('/add_pharmacist_record/', add_pharmacist_record);
admin_router.post('/delete_pharmacist_record/', delete_pharmacist_record);
admin_router.post('/add_lab_technician_record/', add_lab_technician_record);;
admin_router.post('/delete_lab_technician_record/', delete_lab_technician_record);
admin_router.post('/update_otherstaff_record/', update_otherstaff_record);

export { admin_router };