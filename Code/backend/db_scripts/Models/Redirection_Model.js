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

    // When was the redirection record created
    redirection_creation_date_time: {
        type: String,
        required: true
    },

    // This will be false intially when the counter creates it and will set to true when the respective staff will serve the patient.
    is_redirection_served: {
        type: Boolean,
        required: true
    },

    // When was the redirection record served
    redirection_served_date_time: {
        type: String,
    },

    // Respective history id for this redirection record after its served.
    respective_history_id: {
        type: mongoose.Schema.Types.ObjectId
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