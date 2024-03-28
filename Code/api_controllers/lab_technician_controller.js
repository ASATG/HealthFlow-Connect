import { add_patient_history_record, view_redirection_records } from "./general_controller.js";
import { join } from "path"
import { gfs } from "../db_scripts/db_connect.js"
import fs from "fs";

export const add_patient_lab_findings = async (req, res) => {
    const record = req.body;
    record["who"] = "Lab Technician";
    record["lab_report_files_id"] = [];

    for (const file of req.files) {
        const local_file_path = join(process.cwd(), "temp_uploads", file.originalname);

        const file_data = fs.createReadStream(local_file_path);
        const upload_stream = gfs.openUploadStream(file.originalname);
        file_data.pipe(upload_stream);

        upload_stream.on('finish', async () => {
            fs.unlinkSync(local_file_path);
            record["lab_report_files_id"].push(upload_stream.id);

            if (record["lab_report_files_id"].length === req.files.length) {
                const ans = await add_patient_history_record(record);
                return res.send(ans);
            }
        });
    }
};

export const lab_technician_view_redirection_records = async (req, res) => {
    const { u_id } = req.body;
    const result = await view_redirection_records(u_id, "Lab Technician");
    return res.send(result);
};