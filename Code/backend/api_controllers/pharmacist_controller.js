import { add_patient_history_record, get_person_info, view_unserved_redirection_records } from "./general_controller.js";
import { pharmacist_model } from "../db_scripts/Models/Pharmacist_Model.js";

export const pharmacist_view_redirection_records = async (req, res) => {
    const { u_id } = req.body;
    const result = await view_unserved_redirection_records(u_id, "Pharmacist");
    return res.send(result);
};

export const add_medicines_given = async (req, res) => {
    const body = req.body;
    body["who"] = "Pharmacist";
    const result = await add_patient_history_record(body);
    return res.send(result);
};

export const get_full_pharmacist_details = async (req, res) => {
    const { u_id } = req.body;
    const person_response = await get_person_info(u_id);
    if (person_response.success_status) {
        const person_record = person_response.record;
        const other_record = await pharmacist_model.findOne({ person_id: person_record._id });
        return res.send({ success_status: true, ans: [person_record, other_record] });
    }
    else {
        res.send(person_response);
    }
};