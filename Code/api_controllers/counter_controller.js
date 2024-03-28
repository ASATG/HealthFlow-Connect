import { add_person_record, add_user_record, update_person_record, add_redirection_record_in_general_controller } from "./general_controller.js";

export const add_patient_record = async (req, res) => {
    const body = req.body;

    const person_body = { ...body };
    person_body.role = 'Patient';
    const person_add_response = await add_person_record(person_body);
    if (!person_add_response.success_status) {
        return res.send({ success_status: false, error_message: person_add_response.error_message });
    }
    else{
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
    else{
        return res.send({ success_status: true });
    }
};