import { add_person_record, add_user_record, update_person_record, delete_person_record, delete_user_record } from "./general_controller.js";
import { doctor_model } from "../db_scripts/Models/Doctor_Model.js";
import { pharmacist_model } from "../db_scripts/Models/Pharmacist_Model.js";
import { lab_technician_model } from "../db_scripts/Models/Lab_Technician_Model.js";

export const add_doctor_record = async (req, res) => {
    const body = req.body;
    const only_doctor_attributes = ['opd', 'degree', 'specialization'];

    // First of all we need to create a corresponding person
    const person_body = { ...body };
    person_body.role = 'Doctor';
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
        specialization: body.specialization
    });
    try {
        await doctor_obj.save();

        // Now we need to also create entry in the user model
        const user_add_response = await add_user_record({ username: body.u_id, phone_number: body.phone_number, designation: 'Doctor' });
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

export const update_doctor_record = async (req, res) => {
    const body = req.body;
    const to_update_body = { ...body };
    delete to_update_body["u_id"];
    delete to_update_body["is_admin"];
    try {
        const person_update_response = await update_person_record(body.u_id, to_update_body);
        if (person_update_response.success_status) {
            await doctor_model.findOneAndUpdate({ person_id: person_update_response.person_id }, { is_admin: body.is_admin });
            return res.send({ success_status: true });
        }
        else {
            return res.send({ success_status: false, error_message: "Error in updating the person!" });
        }
    } catch (error) {
        console.log(error);
        return res.send({ success_status: false, error_message: "Error in updating the doctor!" });
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
    }else{
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

export const update_otherstaff_record = async (req, res) => {
    const body = req.body;
    const to_update_body = { ...body };
    delete to_update_body["u_id"];
    try {
        const person_update_response = await update_person_record(body.u_id, to_update_body);
        if (person_update_response.success_status) {
            return res.send({ success_status: true});
        }
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error in updating the staff member!" });
    }
};