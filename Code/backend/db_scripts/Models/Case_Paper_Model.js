import mongoose from "mongoose";

//schema that will contain schema of all patients 
const case_paper_schema = {
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
    history_id_array: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default:[]
    },
    start_date_time: {
        type: String,
        required: true
    },
    end_date_time: {
        type: String
    },
    is_active: {
        type: Boolean,
        required: true
    }
};

export const case_paper_model = mongoose.model("case_paper_model", case_paper_schema);