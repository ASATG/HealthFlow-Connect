import mongoose from "mongoose";

//schema for person that is superset for doctor,patient,pharmacist,lab technician,counter
const person_schema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^\d{12}$/.test(value);               //validation for checking if value is 12 digits only
            },
            message: "The unique id number should be of 12 digits"
        }
    },
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        default: ' '
    },
    last_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d{10}$/.test(value);
            },
            message: "The phone number should be of 10 digits"
        }
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Patient', 'Doctor', 'Pharmacist', 'Lab Technician', 'Counter'],
        required: true
    }
});

person_schema.index({ first_name: 1, middle_name: 1, last_name: 1 }, { unique: true });  //combining first,middle and last name and checking if it is unique or not

export const person_model = mongoose.model("person_model", person_schema);