import mongoose from "mongoose";

//schema for who will have permission to change data of patient history 
const redirection_schema = new mongoose.Schema({
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
    // date_time:{
    //     type:Date,
    //     required:true
    // },
})

export const redirection_model=mongoose.model("redirection_model",redirection_schema);