import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Personal_Info_Component } from "../../components/Personal_Info_Component.jsx";

export const Lab_Technician_Home_Page = () => {
    const navigator = useNavigate();
    const [person_info, set_person_info] = useState({});
    const [other_info, set_other_info] = useState({});
    const [unserved_redirection_records, set_unserved_redirection_records] = useState([]);

    useEffect(() => {
        const fetch_data = async () => {
            let response = await axios.post("http://localhost:3500/lab_technician/get_full_lab_technician_details/", { u_id: sessionStorage.getItem("username") });
            if (response.data.success_status) {
                set_person_info(response.data.ans[0]);
                set_other_info(response.data.ans[1]);

                response = await axios.post("http://localhost:3500/lab_technician/lab_technician_view_redirection_records/", { u_id: sessionStorage.getItem("username") });
                if (response.data.success_status) {
                    set_unserved_redirection_records(response.data.result);
                }
            }
        };

        if (sessionStorage.getItem("is_authenticated") === "true" && sessionStorage.getItem("user_designation") === "Lab Technician") {
            fetch_data();
        }
        else {
            navigator("/", { replace: true });
        }
    }, []);

    const handle_redirection_serve_btn = async (event) => {
        event.preventDefault();
        const helper_id = event.target.id;
        const target_div_id = "div_" + helper_id;
        const target_div = document.getElementById(target_div_id);
        const patient_id = target_div.childNodes[5].textContent.split(":")[1];

        let api_call = await axios.post("http://localhost:3500/get_phone_number_from_uid", { u_id: patient_id });
        if (api_call.data.success_status) {
            const phone_number = api_call.data.phone_number;

            // api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phone_number });
            // if (api_call.data.success_status) {
            //     const backend_otp = api_call.data.otp;
            //     let otp_entered = prompt(`Please enter OTP sent to patient at number ${phone_number}`, '');
            //     if (otp_entered === backend_otp) {
            //         sessionStorage.setItem("otp_verified", "true")
            //         sessionStorage.setItem("patient_id", patient_id);
            //         window.alert("OTP Verification Successfull");
            //         navigator(`/lab_technician/serve_patient/${helper_id}`, { replace: false });
            //     }
            //     else {
            //         sessionStorage.setItem("otp_verified", "false");
            //         window.alert("OTP Verification Failed");
            //     }
            // }
            // else {
            //     window.alert(api_call.data.error_message);
            // }
            
            // Code for avoiding the otp verifation for testing only 🛑
            let otp_entered = prompt(`Please enter Hello`, '');
            if (otp_entered === "Hello") {
                sessionStorage.setItem("otp_verified", "true")
                sessionStorage.setItem("patient_id", patient_id);
                window.alert("OTP Verification Successfull");
                navigator(`/lab_technician/serve_patient/${helper_id}`, { replace: false });
            }
            else {
                sessionStorage.setItem("otp_verified", "false");
                window.alert("OTP Verification Failed");
            }
        }
        else {
            window.alert(api_call.data.error_message);
        }
    };

    return (
        // <Fragment>
        <div className="doctor-home-container">
            <div class="content">
        <h1>This is Lab Technician Home Page</h1>
        <button className="logout-button" onClick={(e) => navigator("/logout/", { replace: true })}>
          Logout
        </button>
        </div>
        <div>
        <div className="sidebar-doctor">
        <p className="p_doctor">Lab Work</p>
        <div className="records-container">
        {unserved_redirection_records.map((record) => (
            <div className="served-patients" id={"div_" + record.redirection_record_id_string}>
              <hr />
              <div class="form-group">
                <label>Redirection Creation Date Time:</label>
                <p>{record.redirection_creation_date_time}</p>
              </div>
              <div class="form-group">
                <label>Is Redirection Served:{" "}</label>
                <p>{record.is_redirection_served ? "Yes" : "No"}</p>
              </div>
              <div class="form-group">
                <label>Staff ID:</label>
                <p>{record.staff_u_id}</p>
              </div>
              <div class="form-group">
                <label>Staff Designation:</label>
                <p>{record.staff_designation}</p>
              </div>
              <div class="form-group">
                <label>Patient ID:</label>
                <p>{record.patient_u_id}</p>
              </div>
              <div class="form-group">
                <label>Patient Name:</label>
                <p>{record.patient_name}</p>
              </div>
              <div class="form-group">
              <label>Lab Testings To Be Done:</label>
                        {record.lab_testings_to_be_done.map((test, index) => (
                            <p key={index}>{test}</p>
                        ))}
              
              </div>
              <button
                class="btn1"
                onClick={handle_redirection_serve_btn}
                id={record.redirection_record_id_string}
              >
                Serve
              </button>
              <hr />
            </div>
          ))}
        </div>

        </div>
        <div className="main-container">
          <h2>Lab Technician Information</h2>
          <div className="personal-info">
            <div>
              <p>UID</p>
              <p>{person_info["u_id"]}</p>
            </div>
            <div>
              <p>First Name</p>
              <p>{person_info["first_name"]}</p>
            </div>
            <div>
              <p>Middle Name</p>
              <p>{person_info["middle_name"]}</p>
            </div>
            <div>
              <p>Last Name</p>
              <p>{person_info["last_name"]}</p>
            </div>
            <div>
              <p>Gender</p>
              <p>{person_info["gender"]}</p>
            </div>
            <div>
              <p>Date of Birth</p>
              <p>{person_info["dob"]}</p>
            </div>
            <div>
              <p>Phone Number</p>
              <p>{person_info["phone_number"]}</p>
            </div>
            <div>
              <p>Address</p>
              <p>{person_info["address"]}</p>
            </div>
            <div>
              <p>Role</p>
              <p>{person_info["role"]}</p>
            </div>
            <div>
              <p>Degree</p>
              <p>{other_info["degree"]}</p>
            </div>
            <div>
              <p>Specialization</p>
              <p>{other_info["specialization"]}</p>
            </div>
          </div>
        </div>
        </div>
        </div>


            // <h1>This is Lab Technician Home Page</h1>
            // <button onClick={(e) => navigator("/logout/", { replace: true })}>Logout</button>

            // { <div className="main-container">
          /*<h2>Admin Information</h2>
          <div className="personal-info">
            <div>
              <p>UID</p>
              <p>{personInfo["u_id"]}</p>
            </div>
            <div>
              <p>First Name</p>
              <p>{personInfo["first_name"]}</p>
            </div>
            <div>
              <p>Middle Name</p>
              <p>{personInfo["middle_name"]}</p>
            </div>
            <div>
              <p>Last Name</p>
              <p>{personInfo["last_name"]}</p>
            </div>
            <div>
              <p>Gender</p>
              <p>{personInfo["gender"]}</p>
            </div>
            <div>
              <p>Date of Birth</p>
              <p>{personInfo["dob"]}</p>
            </div>
            <div>
              <p>Phone Number</p>
              <p>{personInfo["phone_number"]}</p>
            </div>
            <div>
              <p>Address</p>
              <p>{personInfo["address"]}</p>
            </div>
            <div>
              <p>Role</p>
              <p>{personInfo["role"]}</p>
            </div>
            <div>
              <p>OPD</p>
              <p>{adminInfo["opd"]}</p>
            </div>
            <div>
              <p>Degree</p>
              <p>{adminInfo["degree"]}</p>
            </div>
            <div>
              <p>Specialization</p>
              <p>{adminInfo["specialization"]}</p>
            </div>
          </div>
        </div> */
            // <Personal_Info_Component explicit_keys_to_exclude={[]} record={person_info} />
            // <Personal_Info_Component explicit_keys_to_exclude={["person_id"]} record={other_info} />
            // <hr />
            // {unserved_redirection_records.map(record => (
            //     <div id={"div_" + record.redirection_record_id_string}>
            //         <p>Redirection Creation Date Time: {record.redirection_creation_date_time}</p>
            //         <p>Is Redirection Served: {record.is_redirection_served ? 'Yes' : 'No'}</p>
            //         <p>Staff ID: {record.staff_u_id}</p>
            //         <p>Staff Name: {record.staff_name}</p>
            //         <p>Staff Designation: {record.staff_designation}</p>
            //         <p>Patient ID: {record.patient_u_id}</p>
            //         <p>Patient Name: {record.patient_name}</p>
            //         <p>Lab Testings To Be Done:</p>
            //         <ul>
            //             {record.lab_testings_to_be_done.map((test, index) => (
            //                 <li key={index}>{test}</li>
            //             ))}
            //         </ul>
            //         <button onClick={handle_redirection_serve_btn} id={record.redirection_record_id_string}>Serve</button>
            //         <hr />
            //     </div>
            // ))
            // }
        // </Fragment >
    );
}