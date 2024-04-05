import mongoose from "mongoose";
import { parse_history_record, parse_redirection_record, add_person_record, update_person_record, add_redirection_record_in_general_controller } from "./general_controller.js";
import { case_paper_model } from "../db_scripts/Models/Case_Paper_Model.js";
import { person_model } from "../db_scripts/Models/Person_Model.js";
import { history_model } from "../db_scripts/Models/History_Model.js";
import { redirection_model } from "../db_scripts/Models/Redirection_Model.js";

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

export const see_patient_redirection_records = async (req, res) => {
    const { patient_u_id } = req.body;
    console.log("Here")
    console.log(patient_u_id)
    try {
        const all_records = await redirection_model.find({ patient_u_id: patient_u_id });
        const ans = [];
        for (const redirection_record of all_records) {
            const temp = await parse_redirection_record(redirection_record);
            ans.push(temp);
        }

        ans.sort((a, b) => new Date(a.redirection_creation_date_time) - new Date(b.redirection_creation_date_time));

        return res.send({ success_status: true, ans: ans });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while fetching the redirection records" });
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
    if (patient_history) {
        return res.send({ success_status: true, ans: patient_history });
    } else {
        return res.send({ success_status: false, error_message: "No history for this patient" });
    }
}

export const get_all_case_papers_of_patients = async (req, res) => {
    const { patient_u_id } = req.body;
    console.log(patient_u_id);
    try {
        const all_records = await case_paper_model.find({ patient_u_id: patient_u_id });
        if (all_records.length === 0) {
            return res.send({ success_status: false, error_message: "No case papers found for this patient" });
        }

        const ans = [];
        for (const record of all_records) {
            const curr_history = [];
            for (const id of record.history_id_array) {
                const temp = await parse_history_record(id);
                curr_history.push(temp);
            }
            curr_history.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
            ans.push({ is_active: record.is_active, start_date_time: record.start_date_time, end_date_time: record.end_date_time, all_history: curr_history });
        }

        ans.sort((a, b) => new Date(a.start_date_time) - new Date(b.start_date_time));

        return res.send({ success_status: true, ans: ans });
    } catch (error) {
        console.log(error);
        return res.send({ success_status: false, error_message: "Internal Server Error!" });
    }
};

export const get_active_case_paper_of_patient = async (req, res) => {
    const { patient_u_id } = req.body;
    try {
        const all_records = await case_paper_model.find({ patient_u_id: patient_u_id, is_active: true });
        if (all_records.length == 0){
            return res.send({ success_status: false, error_message: "No active case Paper for Patient!" });
        } 
        return res.send({ success_status: true, ans: all_records[0] });
    }catch (error) {
        return res.send({ success_status: false, error_message: "Cannot get the case aper!" });
    }
}

export const create_new_case_paper = async (req, res) => {
    const { patient_u_id } = req.body;
    let all_prev_case_papers;
    try {
        all_prev_case_papers = await case_paper_model.find({ patient_u_id: patient_u_id });
        for (const record of all_prev_case_papers) {
            if (record.is_active === true) {
                return res.send({ success_status: false, error_message: "Already their exist a case paper which is active." });
            }
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while retreving the case paper records" });
    }

    try {
        const start_date = new Date();
        const new_case_paper = new case_paper_model({
            patient_u_id: patient_u_id,
            history_id_array: [],
            start_date_time: start_date.toString(),
            is_active: true,
        });
        await new_case_paper.save();
        return res.send({ success_status: true });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while creating new case paper object" });
    }
};

export const mark_latest_active_case_paper_inactive = async (req, res) => {
    const { patient_u_id } = req.body;
    try {
        const active_case_paper = await case_paper_model.findOne({ patient_u_id: patient_u_id, is_active: true });
        if (active_case_paper === null) {
            return res.send({ success_status: false, error_message: "Their is no latest active case paper" });
        }

        const end_date_time = new Date();
        active_case_paper.end_date_time = end_date_time.toString();
        active_case_paper.is_active = false;

        await active_case_paper.save();

        return res.send({ success_status: true });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Some internal error happened while marking the case paper inactive" });
    }
};

export const add_new_history_id_in_active_case_paper = async (req, res) => {
    const { history_id_string, patient_u_id } = req.body;
    try {
        const active_case_paper = await case_paper_model.findOne({ patient_u_id: patient_u_id, is_active: true });
        if (active_case_paper === null) {
            return res.send({ success_status: false, error_message: "No active case paper found!" });
        }
        const history_id_mongoose_represenation = new mongoose.Types.ObjectId(history_id_string);

        for (const record of active_case_paper.history_id_array) {
            if (record.equals(history_id_mongoose_represenation)) {
                return res.send({ success_status: false, error_message: "This history record is already added to latest active case paper" });
            }
        }

        active_case_paper.history_id_array.push(history_id_mongoose_represenation);
        await active_case_paper.save();
        return res.send({ success_status: true });
    } catch (error) {
        console.log(error);
        return res.send({ success_status: false, error_message: "Error while adding the history id to the case paper" });
    }
};
