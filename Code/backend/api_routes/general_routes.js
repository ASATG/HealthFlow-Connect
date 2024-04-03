import express from "express";
import { get_phone_number_from_uid, verify_user, change_password, add_history_id_to_redirection_record_and_mark_complete } from "../api_controllers/general_controller.js";

const general_router = express.Router();

general_router.post("/get_phone_number_from_uid", get_phone_number_from_uid);
general_router.post('/verify_user/', verify_user);
general_router.post('/change_password/', change_password);
general_router.post('/add_history_id_to_redirection_record_and_mark_complete', add_history_id_to_redirection_record_and_mark_complete);

export { general_router };