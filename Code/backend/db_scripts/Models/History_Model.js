import mongoose from "mongoose";

//schema that will contain schema of all patients 
const history_schema = {
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
    date_time: {
        type: Date,
        default: Date.now(),
    },

    // For doctor
    complaints: {
        type: [String],
    },
    general_examination: {
        type: [{
            property: {
                type: String
            },
            value: {
                type: String
            }
        }]
    },
    lab_testing_to_be_done: {
        type: [String]
    },
    medicines_prescribed: {
        type: [{
            medicine_name: {
                type: String,
            },
            when_to_take: {
                type: String,
            },
            other_note: {
                type: String
            }
        }]
    },
    extra_notes: {
        type: [String]
    },

    // For lab technician
    lab_report_files_id: {
        type: [mongoose.Schema.Types.ObjectId]
    },

    // For pharmacist
    medicines_given: {
        type: [String]
    }

};

export const history_model = mongoose.model("history_model", history_schema);