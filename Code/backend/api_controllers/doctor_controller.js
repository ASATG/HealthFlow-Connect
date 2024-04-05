import { get_person_info,view_unserved_redirection_records, add_patient_history_record } from "./general_controller.js";
import { history_model } from "../db_scripts/Models/History_Model.js";
import { doctor_model } from "../db_scripts/Models/Doctor_Model.js";
import { gfs } from "../db_scripts/db_connect.js";
import { join } from "path";
import path from "path";
import mongoose from "mongoose";

export const get_full_doctor_details = async (req, res) => {
    const { u_id } = req.body;
    const person_response = await get_person_info(u_id);
    if (person_response.success_status) {
        const person_record = person_response.record;
        const other_record = await doctor_model.findOne({ person_id: person_record._id });
        return res.send({ success_status: true, ans: [person_record, other_record] });
    }
    else {
        res.send(person_response);
    }
};

export const doctor_view_redirection_records = async (req, res) => {
    const { u_id } = req.body;
    const result = await view_unserved_redirection_records(u_id, "Doctor");
    return res.send(result);
};

export const doctor_view_patient_history = async (req, res) => {
    const { patient_u_id } = req.body;
    try {
        const patient_history_records = await history_model.find({ patient_u_id: patient_u_id });
        return res.send({ success_status: true, result: patient_history_records });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Could not get the patient history records!" });
    }
};

export const doctor_add_patient_record_in_patient_history = async (req, res) => {
    const temp = req.body;
    temp["who"] = "Doctor";
    const result = await add_patient_history_record(temp);
    return res.send(result);
};

export const get_lab_report_name_from_file_id=async(req,res)=>{
    try {
        const {lab_report_file_id_string}=req.body;
        const object_id=new mongoose.Types.ObjectId(lab_report_file_id_string);
        const temp=await gfs.find(object_id).toArray();
        const filename=temp[0].filename;
        return res.send({success_status:true,filename:filename});
    } catch (error) {
        return res.send({success_status:false,error_message:"Error while printing the error"});
    }
};

export const download_lab_report_by_file_id=async(req,res)=>{
    try {
        const {lab_report_file_id_string}=req.body;
    const object_id=new mongoose.Types.ObjectId(lab_report_file_id_string);
    const temp=await gfs.find(object_id).toArray();
    console.log(temp[0]);
    const filename=temp[0].filename;
        const download_stream=gfs.openDownloadStream(object_id);
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'application/octet-stream');
        download_stream.pipe(res);
    } 
    catch (error) {
        console.log(error);
        return res.send({success_status:false,error_message:"Error while downloading the file"});
    }
};