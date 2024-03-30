import mongoose from "mongoose";

//schema for doctor
const doctor_schema = new mongoose.Schema({
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person_model',
        unique: true,
        required: true,
    },
    opd: {
        type: String,
        enum: ["Medicine", "Surgery", "Orthopaedics", "ENT", "Opthamology", "Gynaceology",
            "Paediatry", "Skin", "Psychiatry", "TB", "Dental"],
        required: true,
    },
    degree: {
        type: [String],
        required: true
    },
    specialization: {
        type: [String],
        default: []
    },
    is_admin: {
        type: Boolean,
        default: false,
        required: true
    }
});

export const doctor_model = mongoose.model("doctor_model", doctor_schema);