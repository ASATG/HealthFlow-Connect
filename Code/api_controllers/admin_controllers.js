import { add_person_record, add_user_record, update_person_record, delete_person_record, delete_user_record } from "./general_controller.js";
import { doctor_model } from "../db_scripts/Models/Doctor_Model.js";

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