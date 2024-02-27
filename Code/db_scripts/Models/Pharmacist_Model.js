import mongoose from "mongoose";

//schema for pharmacist
const pharmacist_schema=new mongoose.Schema({
    person_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'person_model',
        unique:true,
        required:true,
    },
    degree:{
        type:[String],
        required:true
    },
    specialization:{
        type:[String],
        default:'',
    }
});

export const pharmacist_model=mongoose.model("pharmacist_model",pharmacist_schema);