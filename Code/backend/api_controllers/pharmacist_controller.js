import { add_patient_history_record, view_redirection_records } from "./general_controller.js";

export const pharmacist_view_redirection_records = async (req, res) => {
    const { u_id } = req.body;
    const result = await view_redirection_records(u_id, "Pharmacist");
    return res.send(result);
};

export const add_medicines_given = async (req, res) => {
    const body = req.body;
    body["who"] = "Pharmacist";
    const result = await add_patient_history_record(body);
    return res.send(result);
};