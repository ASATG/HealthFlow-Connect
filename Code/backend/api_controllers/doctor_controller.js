import { view_redirection_records, add_patient_history_record } from "./general_controller.js";
import { history_model } from "../db_scripts/Models/History_Model.js";

export const doctor_view_redirection_records = async (req, res) => {
    const { u_id } = req.body;
    const result = await view_redirection_records(u_id, "Doctor");
    return res.send(result);
};

export const doctor_view_patient_history = async (req, res) => {
    const { patient_u_id } = req.body;
    try {
        const patient_history_records = await history_model.find({ patient_u_id: patient_u_id });
        return res.send({ success_status: true, result: patient_history_records });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Could not get the patient history records!" });
    }
};

export const doctor_add_patient_record_in_patient_history = async (req, res) => {
    const temp = req.body;
    temp["who"] = "Doctor";
    const result = await add_patient_history_record(temp);
    return res.send(result);
}