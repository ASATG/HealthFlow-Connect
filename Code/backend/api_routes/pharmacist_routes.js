import express from "express"
import { pharmacist_view_redirection_records, add_medicines_given } from "../api_controllers/pharmacist_controller.js";

const pharmacist_router = express.Router();

pharmacist_router.post("/pharmacist_view_redirection_records/", pharmacist_view_redirection_records);
pharmacist_router.post("/add_medicines_given/", add_medicines_given);

export { pharmacist_router };