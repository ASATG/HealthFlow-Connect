import express from "express";
import { add_patient_record, add_redirection_record, get_patient_allhistory_by_uid, get_patient_record_by_uid, get_staff_list_by_role, update_patient_record, } from "../api_controllers/counter_controller.js";

const counter_router = express.Router();

counter_router.post('/add_patient_record/', add_patient_record);
counter_router.post('/update_patient_record/', update_patient_record);
counter_router.post('/add_redirection_record/', add_redirection_record);
counter_router.post('/get_patient_record_by_uid/', get_patient_record_by_uid);
counter_router.post('/get_staff_list_by_role/', get_staff_list_by_role);
counter_router.post('/get_patient_allhistory_by_uid/', get_patient_allhistory_by_uid);

export { counter_router };