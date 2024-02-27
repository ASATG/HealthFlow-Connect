import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        enum:['Doctor','Pharmacist','Lab Technician','Counter','Admin'],
        required:true
    }
});

export const user_model=mongoose.model("user_model",user_schema);