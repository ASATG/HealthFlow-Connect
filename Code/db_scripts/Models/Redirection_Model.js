import mongoose from "mongoose";

//schema for who will have permission to change data of patient history 
const redirection_schema = new mongoose.Schema({
    patient_u_id: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d{12}$/.test(value);
            },
            message: "The unique id number should be of 12 digits"
        }
    },
    who_u_id: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d{12}$/.test(value);
            },
            message: "The unique id number should be of 12 digits"
        }
    },
    who: {
        type: String,
        enum: ["Doctor", "Lab Technician", "Pharmacist"],
        required: true
    },

    // For lab technician
    lab_testings_to_be_done: {
        type: [String]
    },

    // For pharmacist
    medicines_to_be_given: {
        type: [String]
    }
})

export const redirection_model = mongoose.model("redirection_model", redirection_schema);