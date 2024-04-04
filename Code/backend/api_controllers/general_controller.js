import mongoose from "mongoose";
import { person_model } from "../db_scripts/Models/Person_Model.js";
import { redirection_model } from "../db_scripts/Models/Redirection_Model.js";
import { user_model } from "../db_scripts/Models/User_Model.js";
import { history_model } from "../db_scripts/Models/History_Model.js";
import bcrypt from "bcrypt";

export const get_person_info = async (u_id) => {
    try {
        const record = await person_model.findOne({ u_id: u_id });
        if (record) {
            return { success_status: true, record: record };
        }
        else {
            return { success_status: false, error_message: "Not found record" };
        }
    } catch (error) {
        return { success_status: false, error_message: "Error while fetching the person record" };
    }
};

export const get_phone_number_from_uid = async (req, res) => {
    const { u_id } = req.body;
    const temp = await get_person_info(u_id);
    if (temp.success_status) {
        return res.send({ success_status: true, phone_number: temp.record.phone_number });
    }
    else {
        return res.send(temp);
    }
};

export const add_person_record = async (person_body) => {
    const new_person = new person_model(person_body);
    try {
        const response = await new_person.save();
        return { success_status: true, created_person_record_id: response._id };
    } catch (error) {
        return { success_status: false, error_message: "Error happened while creating the Person!" };
    }
};

export const update_person_record = async (u_id, to_update_body) => {
    try {
        const updated_person = await person_model.findOneAndUpdate({ u_id: u_id }, to_update_body, { runValidators: true });
        return { success_status: true, person_id: updated_person._id };
    } catch (error) {
        return { success_status: false, error_message: "Something went wrong during updating the person" };
    }
};

export const delete_person_record = async (u_id) => {
    try {
        const person_obj = await person_model.findOneAndDelete({ u_id: u_id });
        return { success_status: true, person_id: person_obj._id };
    } catch (error) {
        console.log(error);
        return { success_status: false, error_message: "Error while deleting the person record!" };
    }
};

export const add_user_record = async (user_body) => {
    // While creating the user password will be his phone_number
    const { username, designation, phone_number } = user_body;
    const hashed_password = await bcrypt.hash(phone_number, 10);
    const new_user_obj = new user_model({
        username: username,
        password: hashed_password,
        designation: designation
    });
    try {
        await new_user_obj.save();
        return { success_status: true }
    } catch (error) {
        return { success_status: false, error_message: "Error happened while creating the User!" };
    }
};

export const delete_user_record = async (username) => {
    try {
        await user_model.findOneAndDelete({ username: username });
        return { success_status: true };
    } catch (error) {
        return { success_status: false, error_message: "Error while deleting the user!" };
    }
};

export const verify_user = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user_instance = await user_model.findOne({ username: username });
        const is_password_match = await bcrypt.compare(password, user_instance.password);
        if (!is_password_match) {
            return res.send({ success_status: false, error_message: 'Wrong Password!' });
        }
        else {
            return res.send({ success_status: true, user_designation: user_instance.designation });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while Authentication" });
    }
};

export const change_password = async (req, res) => {
    const { username, new_password } = req.body;
    try {
        const hashed_password = await bcrypt.hash(new_password, 10);
        await user_model.findOneAndUpdate({ username: username }, { password: hashed_password }, { runValidators: true });
        return res.send({ success_status: true });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Something went wrong while changing the password!" });
    }
};

export const parse_history_record = async (history_id) => {
    const record = await history_model.findById(history_id);
    let fun_call = await get_person_info(record.patient_u_id);
    const patient_basic_info = fun_call.record;

    fun_call = await get_person_info(record.who_u_id);
    const staff_basic_info = fun_call.record;

    const ans = {
        patient_u_id: record.patient_u_id,
        patient_name: patient_basic_info.first_name + " " + patient_basic_info.middle_name + " " + patient_basic_info.last_name,
        staff_u_id: record.who_u_id,
        staff_name: staff_basic_info.first_name + " " + staff_basic_info.middle_name + " " + staff_basic_info.last_name,
        staff_designation: record.who,
        date_time: record.date_time.toString()
    };

    if (record.who === "Doctor") {
        ans["complaints"] = record.complaints;
        ans["general_examination"] = record.general_examination;
        ans["lab_testing_to_be_done"] = record.lab_testing_to_be_done;
        ans["medicines_prescribed"] = record.medicines_prescribed;
        ans["extra_notes"] = record.extra_notes;
    }

    else if (record.who === "Lab Technician") {
        ans["lab_report_ids"] = record.lab_report_files_id.map((value) => {
            return value.toString();
        });
    }

    else if (record.who === "Pharmacist") {
        ans["medicines_given"] = record.medicines_given;
    }

    return ans;
};

export const parse_redirection_record = async (redirection_record) => {
    const temp = {
        redirection_record_id_string: redirection_record._id.toString(),
        redirection_creation_date_time: redirection_record.redirection_creation_date_time,
        is_redirection_served: redirection_record.is_redirection_served,
    };

    if (redirection_record.is_redirection_served) {
        temp["redirection_served_date_time"] = redirection_record.redirection_served_date_time;
        temp["respective_history_id"] = redirection_record.respective_history_id.toString();
        temp["detail_history_record"] = await parse_history_record(redirection_record.respective_history_id)
    }
    else {
        let helper = await get_person_info(redirection_record.patient_u_id);
        const patient_basic_info = helper.record;

        helper = await get_person_info(redirection_record.who_u_id);
        const staff_basic_info = helper.record;

        temp["patient_u_id"] = redirection_record.patient_u_id;
        temp["patient_name"] = patient_basic_info.first_name + " " + patient_basic_info.middle_name + " " + patient_basic_info.last_name

        temp["staff_u_id"] = redirection_record.who_u_id;
        temp["staff_name"] = staff_basic_info.first_name + " " + staff_basic_info.middle_name + " " + staff_basic_info.last_name;

        temp["staff_designation"] = redirection_record.who;
    }

    if (redirection_record.who === "Lab Technician") {
        temp["lab_testings_to_be_done"] = redirection_record.lab_testings_to_be_done;
    }
    else if (redirection_record.who === "Pharmacist") {
        temp["medicines_to_be_given"] = redirection_record.medicines_to_be_given;
    }

    return temp;
};

export const add_redirection_record_in_general_controller = async (redirection_body) => {
    const new_redirection = new redirection_model(redirection_body);
    new_redirection.is_redirection_served = false;
    new_redirection.redirection_creation_date_time = new Date().toString();

    try {
        await new_redirection.save();
        return { success_status: true };
    } catch (error) {
        return { success_status: false, error_message: "Error happened while creating the redirection record!" };
    }
};

export const view_unserved_redirection_records = async (who_u_id, who) => {
    try {
        const response = await redirection_model.find({ who_u_id: who_u_id, who: who, is_redirection_served: false });
        const result = [];
        for (const item of response) {
            const temp = await parse_redirection_record(item);
            result.push(temp);
        }

        result.sort((a, b) => new Date(a.redirection_creation_date_time) - new Date(b.redirection_creation_date_time));

        return { success_status: true, result: result };
    } catch (error) {
        return { success_status: false, error_message: "Couldn't find the redirection record" };
    }
};

export const add_history_id_to_redirection_record_and_mark_complete = async (req, res) => {
    const { redirection_record_id_string, history_record_id_string } = req.body;
    const rr_object_id = new mongoose.Types.ObjectId(redirection_record_id_string);
    const hr_object_id = new mongoose.Types.ObjectId(history_record_id_string);

    try {
        await redirection_model.findByIdAndUpdate(rr_object_id, { respective_history_id: hr_object_id, redirection_served_date_time: new Date().toString(), is_redirection_served: true }, { runValidators: true });
        return res.send({ success_status: true });
    } catch (error) {
        console.log(error);
        return res.send({ success_status: false, error_message: "Error while updating the redirection record" });
    }
};

export const add_patient_history_record = async (record) => {
    const history_record = new history_model(record);
    history_record.date_time = new Date().toString();
    try {
        const temp = await history_record.save();
        return { success_status: true, new_history_record_id: temp._id.toString() };
    } catch (error) {
        console.log(error);
        return { success_status: false, error_message: "Error happened while adding in patients history" };
    }
};
