import mongoose from "mongoose";

const person_schema=new mongoose.Schema({
    u_id:{
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
    first_name:{
        type:String,
        required:true,
    },
    middle_name:{
        type:String,
        default:' '
    },
    last_name:{
        type:String,
        required:true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob:{
        type:Date,
        required:true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return /^\d{10}$/.test(value);
            },
            message:"The phone number should be of 10 digits"
        }
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Patient','Doctor','Pharmacist','Lab Technician','Counter'],
        required:true
    }
});

person_schema.index({ firstName: 1, middleName: 1, lastName: 1 }, { unique: true });

export const person_model=mongoose.model("person_model",person_schema);