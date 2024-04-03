import express from "express";
import { add_patient_record, add_redirection_record, update_patient_record, get_patient_allhistory_by_uid, get_patient_record_by_uid, get_staff_list_by_role, get_all_case_papers_of_patients, create_new_case_paper, mark_latest_active_case_paper_inactive, add_new_history_id_in_active_case_paper, see_patient_redirection_records, get_active_case_paper_of_patient } from "../api_controllers/counter_controller.js";

const counter_router = express.Router();

counter_router.post('/add_patient_record/', add_patient_record);
counter_router.post('/update_patient_record/', update_patient_record);
counter_router.post('/add_redirection_record/', add_redirection_record);
counter_router.post('/see_patient_redirection_records', see_patient_redirection_records);
counter_router.post('/get_patient_record_by_uid/', get_patient_record_by_uid);
counter_router.post('/get_staff_list_by_role/', get_staff_list_by_role);
counter_router.post('/get_patient_allhistory_by_uid/', get_patient_allhistory_by_uid);
counter_router.post('/get_all_case_papers_of_patients', get_all_case_papers_of_patients);
counter_router.post('/get_active_case_paper_of_patient', get_active_case_paper_of_patient);
counter_router.post('/create_new_case_paper', create_new_case_paper);
counter_router.post('/mark_latest_active_case_paper_inactive', mark_latest_active_case_paper_inactive);
counter_router.post('/add_new_history_id_in_active_case_paper', add_new_history_id_in_active_case_paper);

export { counter_router };