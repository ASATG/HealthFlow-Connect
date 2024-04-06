import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Lab_Technician_Serve_Patient_Page = () => {
    const naviagator = useNavigate();
    const redirection_id = useParams()["redirection_id"];
    const [patient_uid, set_patient_uid] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Lab Technician") {
            return naviagator("/", { replace: true });
        }

        if (sessionStorage.getItem("otp_verified") === "true") {
            set_patient_uid(sessionStorage.getItem("patient_id"));
            sessionStorage.removeItem("patient_id");
            sessionStorage.setItem("otp_verified", "false");
        }
        else {
            alert("Please do OTP Verifiaction of Patient First");
            naviagator("/lab_technician/home_page", { replace: true });
        }
    }, []);

    const handle_form_submit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("patient_u_id", patient_uid);
        formData.append("who_u_id", sessionStorage.getItem("username"));
        formData.append("who", sessionStorage.getItem("user_designation"));

        const filesInput = document.querySelector('input[type="file"]');
        const files = filesInput.files;

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        let api_response = await axios.post("http://localhost:3500/lab_technician/add_patient_lab_findings", formData);
        if (api_response.data.success_status) {
            const new_history_record_id_string = api_response.data.new_history_record_id;

            api_response = await axios.post("http://localhost:3500/add_history_id_to_redirection_record_and_mark_complete", { redirection_record_id_string: redirection_id, history_record_id_string: new_history_record_id_string });

            if (api_response.data.success_status) {
                api_response = await axios.post("http://localhost:3500/counter/add_new_history_id_in_active_case_paper", { history_id_string: new_history_record_id_string, patient_u_id: patient_uid });

                if (api_response.data.success_status) {
                    window.alert("Patient History Record Added successfully");
                }
                else {
                    window.alert(api_response.data.error_message);
                }
            }
            else {
                window.alert(api_response.data.error_message);
            }
        }
        else {
            window.alert(api_response.data.error_message);
        }

        naviagator("/lab_technician/home_page", { replace: true });
    };

    return (
        <Fragment>
            <form onSubmit={handle_form_submit} encType="multipart/form-data">
                <label>Upload Files:</label>
                <input
                    type="file"
                    name="files"
                    multiple
                />
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    );
};