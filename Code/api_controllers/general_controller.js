import { person_model } from "../db_scripts/Models/Person_Model.js";
import { user_model } from "../db_scripts/Models/User_Model.js";
import bcrypt from "bcrypt";

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
        console.log(error);
        return res.send({ success_status: false, error_message: "Something went wrong while changing the password!" });
    }
};