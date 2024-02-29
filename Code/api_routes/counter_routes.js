import express from "express";
import { add_doctor_record, update_doctor_record, delete_doctor_record } from "../api_controllers/admin_controllers.js";
import { add_patient_record, add_redirection_record, update_patient_record } from "../api_controllers/counter_controller.js";

const counter_router = express.Router();

counter_router.post('/add_patient_record/', add_patient_record);
counter_router.post('/update_patient_record/', update_patient_record);
counter_router.post('/add_redirection_record/', add_redirection_record);

export { counter_router };