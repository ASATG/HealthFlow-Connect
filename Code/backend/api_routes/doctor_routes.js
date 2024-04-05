import express from "express";
import { doctor_view_redirection_records, doctor_view_patient_history, doctor_add_patient_record_in_patient_history,get_lab_report_name_from_file_id, get_full_doctor_details,download_lab_report_by_file_id } from "../api_controllers/doctor_controller.js";

const doctor_router = express.Router();

doctor_router.post("/get_full_doctor_details/",get_full_doctor_details);
doctor_router.post("/doctor_view_redirection_records/", doctor_view_redirection_records);
doctor_router.post("/doctor_view_patient_history", doctor_view_patient_history);
doctor_router.post("/doctor_add_patient_record_in_patient_history", doctor_add_patient_record_in_patient_history);
doctor_router.post("/get_lab_report_name_from_file_id",get_lab_report_name_from_file_id );
doctor_router.post("/download_lab_report_by_file_id",download_lab_report_by_file_id );

export { doctor_router };