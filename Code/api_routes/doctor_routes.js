import express from "express";
import { doctor_view_redirection_records, doctor_view_patient_history, doctor_add_patient_record_in_patient_history } from "../api_controllers/doctor_controller.js";

const doctor_router = express.Router();

doctor_router.post("/doctor_view_redirection_records/", doctor_view_redirection_records);
doctor_router.post("/doctor_view_patient_history", doctor_view_patient_history);
doctor_router.post("/doctor_add_patient_record_in_patient_history", doctor_add_patient_record_in_patient_history)

export { doctor_router };