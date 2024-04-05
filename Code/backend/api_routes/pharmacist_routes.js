import express from "express"
import { pharmacist_view_redirection_records, add_medicines_given, get_full_pharmacist_details } from "../api_controllers/pharmacist_controller.js";

const pharmacist_router = express.Router();

pharmacist_router.post("/pharmacist_view_redirection_records/", pharmacist_view_redirection_records);
pharmacist_router.post("/add_medicines_given/", add_medicines_given);
pharmacist_router.post("/get_full_pharmacist_details/", get_full_pharmacist_details)

export { pharmacist_router };