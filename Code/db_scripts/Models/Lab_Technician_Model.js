import mongoose from "mongoose";

const lab_technician_schema=new mongoose.Schema({
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
        default:''
    },
    lab_type:{
        type:String,
        enum:["Radiology","Pathology"],
        required:true
    }
});

export const lab_technician_model=mongoose.model("lab_technician_model",lab_technician_schema);