import { add_person_record, update_person_record, add_redirection_record_in_general_controller } from "./general_controller.js";
import { person_model } from "../db_scripts/Models/Person_Model.js";
import { history_model } from "../db_scripts/Models/History_Model.js";

export const add_patient_record = async (req, res) => {
    const body = req.body;

    const person_body = { ...body };
    person_body.role = 'Patient';
    const person_add_response = await add_person_record(person_body);
    if (!person_add_response.success_status) {
        return res.send({ success_status: false, error_message: person_add_response.error_message });
    }
    else {
        return res.send({ success_status: true });
    }
};

export const update_patient_record = async (req, res) => {
    const body = req.body;
    const to_update_body = { ...body };
    delete to_update_body["u_id"];

    const person_update_response = await update_person_record(body.u_id, to_update_body);
    if (person_update_response.success_status) {
        return res.send({ success_status: true });
    }
    else {
        return res.send({ success_status: false, error_message: "Error in updating the person!" });
    }

};

export const add_redirection_record = async (req, res) => {
    const body = req.body;

    const redirection_body = { ...body };
    const redirection_add_response = await add_redirection_record_in_general_controller(redirection_body);
    if (!redirection_add_response.success_status) {
        return res.send({ success_status: false, error_message: redirection_add_response.error_message });
    }
    else {
        return res.send({ success_status: true });
    }
};


export const get_patient_record_by_uid = async (req, res) => {
    const { u_id } = req.body;
    const person_result = await person_model.findOne({ u_id: u_id });
    if (person_result) {
        return res.send({ success_status: true, ans: person_result });
    } else {
        return res.send({ success_status: false, error_message: "The given record does not exists" });
    }
}

export const get_staff_list_by_role = async (req, res) => {
    const { role } = req.body;
    const staff_result = await person_model.find({ role: role })
    if (staff_result) {
        const info = []
        for (const staff of staff_result) {
            info.push([staff.u_id, staff.first_name, staff.middle_name, staff.last_name]);
        }
        return res.send({ success_status: true, ans: info });
    } else {
        return res.send({ success_status: false, error_message: "No Record exist with such role" });
    }
}

export const get_patient_allhistory_by_uid = async (req, res) => {
    const { patient_u_id } = req.body;
    const patient_history = await history_model.find({ patient_u_id: patient_u_id })
    if (patient_history){
        return res.send({ success_status: true, ans: patient_history });
    }else {
        return res.send({ success_status: false, error_message: "No history for this patient" });
    }
}