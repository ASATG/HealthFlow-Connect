import { get_person_info, add_person_record, add_user_record, update_person_record, delete_person_record, delete_user_record } from "./general_controller.js";
import { doctor_model } from "../db_scripts/Models/Doctor_Model.js";
import { pharmacist_model } from "../db_scripts/Models/Pharmacist_Model.js";
import { lab_technician_model } from "../db_scripts/Models/Lab_Technician_Model.js";
import { person_model } from "../db_scripts/Models/Person_Model.js";

export const get_reqd_designation_all_records = async (req, res) => {
    const { role } = req.body;
    const ans = [];
    
    if (role === "Doctor") {
        const all_doctor_records = await doctor_model.find({});
        for (const doctor_record of all_doctor_records) {
            const person_record = await person_model.findById(doctor_record.person_id);
            ans.push([person_record, doctor_record]);
        }
    }
    else if (role === "Pharmacist") {
        const all_pharmacist_records = await pharmacist_model.find({});
        for (const pharmacist_record of all_pharmacist_records) {
            const person_record = await person_model.findById(pharmacist_record.person_id);
            ans.push([person_record, pharmacist_record]);
        }
    }
    else if (role === "Lab Technician") {
        const all_lab_technician_records = await lab_technician_model.find({});
        for (const lab_technician_record of all_lab_technician_records) {
            const person_record = await person_model.findById(lab_technician_record.person_id);
            ans.push([person_record, lab_technician_record]);
        }
    }
    else if (role === "Counter") {
        const all_counter_records = await person_model.find({ role: "Counter" });
        for (const counter_record of all_counter_records) {
            ans.push([counter_record, {}]);
        }
    }

    return res.send({ success_status: true, ans: ans });
};

export const get_admin_info = async (req, res) => {
    const { u_id } = req.body;
    const temp = await get_person_info(u_id);
    if (temp.success_status) {
        const person_record = temp.record;
        const admin_record = await doctor_model.findOne({ person_id: person_record._id });
        return res.send({ success_status: true, ans: [person_record, admin_record] });
    }
    else {
        return res.send(temp);
    }
};

export const get_staff_record_by_uid = async (req, res) => {
    const { u_id } = req.body;
    const person_result = await person_model.findOne({ u_id: u_id });
    if (person_result) {
        let staff_result = {};
        if (person_result.role === "Doctor") {
            staff_result = await doctor_model.findOne({ person_id: person_result._id });
        }
        else if (person_result.role === "Lab Technician") {
            staff_result = await lab_technician_model.findOne({ person_id: person_result._id });
        }
        else if (person_result.role === "Pharmacist") {
            staff_result = await pharmacist_model.findOne({ person_id: person_result._id });
        }
        return res.send({ success_status: true, ans: [person_result, staff_result] });
    }
    else {
        return res.send({ success_status: false, error_message: "The given record does not exists" });
    }
};

export const add_doctor_record = async (req, res) => {
    const body = req.body;
    const only_doctor_attributes = ['opd', 'degree', 'specialization', 'is_admin'];

    // First of all we need to create a corresponding person
    const person_body = { ...body };
    person_body.role = body.is_admin ? "Admin" : "Doctor";
    only_doctor_attributes.forEach(attr => delete person_body[attr]);
    const person_add_response = await add_person_record(person_body);
    if (!person_add_response.success_status) {
        return res.send({ success_status: false, error_message: person_add_response.error_message });
    }

    // Now we will be creating a doctor entry
    const doctor_obj = new doctor_model({
        person_id: person_add_response.created_person_record_id,
        opd: body.opd,
        degree: body.degree,
        specialization: body.specialization,
        is_admin: body.is_admin
    });
    try {
        await doctor_obj.save();

        // Now we need to also create entry in the user model
        const user_add_response = await add_user_record({ username: body.u_id, phone_number: body.phone_number, designation: body.is_admin ? "Admin" : "Doctor" });
        if (!user_add_response.success_status) {
            return res.send({ success_status: false, error_message: 'Something went wrong while saving the user object!' });
        }
        else {
            return res.send({ success_status: true });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: 'Something went wrong while saving the doctor object!' });
    }
};

export const delete_doctor_record = async (req, res) => {
    const { u_id } = req.body;
    try {
        const delete_person_response = await delete_person_record(u_id);
        if (delete_person_response.success_status) {
            await doctor_model.findOneAndDelete({ person_id: delete_person_response.person_id });

            const delete_user_response = await delete_user_record(u_id);
            if (delete_user_response.success_status) {
                return res.send({ success_status: true });
            }
            else {
                return res.send({ success_status: false, error_message: "Error while deleting the user" });
            }
        }
        else {
            return res.send({ success_status: false, error_message: "Error while deleting the person!" });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while deleting the doctor!" });
    }
};

export const add_counter_record = async (req, res) => {
    const body = req.body;

    // First of all we need to create a corresponding person
    const person_body = { ...body };
    person_body.role = 'Counter';
    const person_add_response = await add_person_record(person_body);
    if (!person_add_response.success_status) {
        return res.send({ success_status: false, error_message: person_add_response.error_message });
    } else {
        // Now we need to also create entry in the user model
        const user_add_response = await add_user_record({ username: body.u_id, phone_number: body.phone_number, designation: 'Counter' });
        if (!user_add_response.success_status) {
            return res.send({ success_status: false, error_message: 'Something went wrong while saving the user object!' });
        }
        else {
            return res.send({ success_status: true });
        }
    }

};

export const delete_counter_record = async (req, res) => {
    const { u_id } = req.body;
    try {
        await delete_person_record(u_id);
        const delete_user_response = await delete_user_record(u_id);
        if (delete_user_response.success_status) {
            return res.send({ success_status: true });
        }
        else {
            return res.send({ success_status: false, error_message: "Error while deleting the user" });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while deleting the counter!" });
    }
};

export const add_pharmacist_record = async (req, res) => {
    const body = req.body;
    const only_pharmacist_attributes = ['degree', 'specialization'];

    // First of all we need to create a corresponding person
    const person_body = { ...body };
    person_body.role = 'Pharmacist';
    only_pharmacist_attributes.forEach(attr => delete person_body[attr]);
    const person_add_response = await add_person_record(person_body);
    if (!person_add_response.success_status) {
        return res.send({ success_status: false, error_message: person_add_response.error_message });
    }

    // Now we will be creating a pharmacist entry
    const pharmacist_obj = new pharmacist_model({
        person_id: person_add_response.created_person_record_id,
        degree: body.degree,
        specialization: body.specialization
    });
    try {
        await pharmacist_obj.save();

        // Now we need to also create entry in the user model
        const user_add_response = await add_user_record({ username: body.u_id, phone_number: body.phone_number, designation: 'Pharmacist' });
        if (!user_add_response.success_status) {
            return res.send({ success_status: false, error_message: 'Something went wrong while saving the user object!' });
        }
        else {
            return res.send({ success_status: true });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: 'Something went wrong while saving the pharmacist object!' });
    }
};

export const delete_pharmacist_record = async (req, res) => {
    const { u_id } = req.body;
    try {
        const delete_person_response = await delete_person_record(u_id);
        if (delete_person_response.success_status) {
            await pharmacist_model.findOneAndDelete({ person_id: delete_person_response.person_id });

            const delete_user_response = await delete_user_record(u_id);
            if (delete_user_response.success_status) {
                return res.send({ success_status: true });
            }
            else {
                return res.send({ success_status: false, error_message: "Error while deleting the user" });
            }
        }
        else {
            return res.send({ success_status: false, error_message: "Error while deleting the person!" });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while deleting the pharmacist!" });
    }
};

export const add_lab_technician_record = async (req, res) => {
    const body = req.body;
    const only_lab_technician_attributes = ['degree', 'specialization', 'lab_type'];

    // First of all we need to create a corresponding person
    const person_body = { ...body };
    person_body.role = 'Lab Technician';
    only_lab_technician_attributes.forEach(attr => delete person_body[attr]);
    const person_add_response = await add_person_record(person_body);
    if (!person_add_response.success_status) {
        return res.send({ success_status: false, error_message: person_add_response.error_message });
    }

    // Now we will be creating a lab technician entry
    const lab_technician_obj = new lab_technician_model({
        person_id: person_add_response.created_person_record_id,
        degree: body.degree,
        specialization: body.specialization,
        lab_type: body.lab_type
    });
    try {
        await lab_technician_obj.save();

        // Now we need to also create entry in the user model
        const user_add_response = await add_user_record({ username: body.u_id, phone_number: body.phone_number, designation: 'Lab Technician' });
        if (!user_add_response.success_status) {
            return res.send({ success_status: false, error_message: 'Something went wrong while saving the user object!' });
        }
        else {
            return res.send({ success_status: true });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: 'Something went wrong while saving the lab technician object!' });
    }
};

export const delete_lab_technician_record = async (req, res) => {
    const { u_id } = req.body;
    try {
        const delete_person_response = await delete_person_record(u_id);
        if (delete_person_response.success_status) {
            await lab_technician_model.findOneAndDelete({ person_id: delete_person_response.person_id });

            const delete_user_response = await delete_user_record(u_id);
            if (delete_user_response.success_status) {
                return res.send({ success_status: true });
            }
            else {
                return res.send({ success_status: false, error_message: "Error while deleting the user" });
            }
        }
        else {
            return res.send({ success_status: false, error_message: "Error while deleting the person!" });
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while deleting the lab technician!" });
    }
};

export const update_staff_record = async (req, res) => {
    const { role, u_id } = req.body;
    const body = req.body;
    const person_body = {
        first_name: body.first_name,
        middle_name: body.middle_name,
        last_name: body.last_name,
        dob: body.dob,
        phone_number: body.phone_number,
        address: body.address
    };
    const person_update_result = await update_person_record(u_id, person_body);
    if (person_update_result.success_status) {
        if (role === "Doctor") {
            const doctor_body = {
                opd: body.opd,
                degree: body.degree,
                specialization: body.specialization,
            };
            try {
                await doctor_model.findOneAndUpdate({ person_id: person_update_result.person_id }, doctor_body, { runValidators: true });
                return res.send({ success_status: true });
            } catch (error) {
                return res.send({ success_status: false, error_message: "Error while updating the doctor" });
            }
        }

        else if (role === "Lab Technician") {
            const lab_technician_body = {
                lab_type: body.lab_type,
                degree: body.degree,
                specialization: body.specialization,
            };
            try {
                await lab_technician_model.findOneAndUpdate({ person_id: person_update_result.person_id }, lab_technician_body, { runValidators: true });
                return res.send({ success_status: true });
            } catch (error) {
                return res.send({ success_status: false, error_message: "Error while updating the lab technician" });
            }
        }

        else if (role === "Pharmacist") {
            const pharmacist_body = {
                degree: body.degree,
                specialization: body.specialization,
            };
            try {
                await pharmacist_model.findOneAndUpdate({ person_id: person_update_result.person_id }, pharmacist_body, { runValidators: true });
                return res.send({ success_status: true });
            } catch (error) {
                return res.send({ success_status: false, error_message: "Error while updating the pharmacist" });
            }
        }

        else if (role === "Counter") {
            return res.send({ success_status: true });
        }
    }
    else {
        return res.send(person_update_result);
    }
};