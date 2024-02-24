import mongoose from "mongoose";

//schema that will contain schema of all patients 
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
    complaints:{                   //complaints of patients here
        type:[String],
        required:true,
    },
    general_examination:{          //gen. examination of patient here
        type:[String],
        required:true
    },
    systemic_examination:{         //particular examination here
        type:[String],
    },
    investigation:{                //investigation and redirection here
        type:[String],
    },
    treatment:{                    //medicine and pharmacist redirection here 
        type:[String],
    }
};

export const history_model=mongoose.model("history_model",history_schema);