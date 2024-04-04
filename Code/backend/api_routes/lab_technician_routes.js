import express from "express";
import { upload } from "../multer_file_upload.js";
import { get_full_lab_technician_details,add_patient_lab_findings, lab_technician_view_redirection_records } from "../api_controllers/lab_technician_controller.js";

const lab_technician_router = express.Router();

lab_technician_router.post("/get_full_lab_technician_details/",get_full_lab_technician_details);
lab_technician_router.post("/add_patient_lab_findings/", upload.array('files'), add_patient_lab_findings);
lab_technician_router.post("/lab_technician_view_redirection_records/", lab_technician_view_redirection_records);

export { lab_technician_router };