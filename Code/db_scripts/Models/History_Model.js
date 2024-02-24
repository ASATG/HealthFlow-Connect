import mongoose from "mongoose";

const history_schema={
    patient_u_id:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return /^\d{12}$/.test(value);
            },
            message:"The unique id number should be of 12 digits"
        }
    },
    who_u_id:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return /^\d{12}$/.test(value);
            },
            message:"The unique id number should be of 12 digits"
        }
    },
    who:{
        type:String,
        enum:["Doctor","Lab Technician","Pharmacist"],
        required:true
    },
    date_time:{
        type:Date,
        required:true
    },
};

export const history_model=mongoose.model("history_model",history_schema);