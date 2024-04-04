import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Pharmacist_Home_Page = () => {
    const navigator = useNavigate();
    const [person_info, set_person_info] = useState({});
    const [other_info, set_other_info] = useState({});
    const [unserved_redirection_records, set_unserved_redirection_records] = useState([]);

    useEffect(() => {
        const fetch_data = async () => {
            let response = await axios.post("http://localhost:3500/pharmacist/get_full_pharmacist_details/", { u_id: sessionStorage.getItem("username") });
            if (response.data.success_status) {
                set_person_info(response.data.ans[0]);
                set_other_info(response.data.ans[1]);

                response = await axios.post("http://localhost:3500/pharmacist/pharmacist_view_redirection_records/", { u_id: sessionStorage.getItem("username") });
                if (response.data.success_status) {
                    set_unserved_redirection_records(response.data.result);
                }
            }
        };

        if (sessionStorage.getItem("is_authenticated") === "true" && sessionStorage.getItem("user_designation") === "Pharmacist") {
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
        const patient_id = target_div.childNodes[5].textContent.split(":")[1].slice(1);

        let api_call = await axios.post("http://localhost:3500/get_phone_number_from_uid", { u_id: patient_id });
        if (api_call.data.success_status) {
            const phone_number = api_call.data.phone_number;

        //     api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phone_number });
        //     if (api_call.data.success_status) {
        //         const backend_otp = api_call.data.otp;
        //         let otp_entered = prompt(`Please enter OTP sent to patient at number ${phone_number}`, '');
        //         if (otp_entered === backend_otp) {
        //             sessionStorage.setItem("otp_verified", "true")
        //             sessionStorage.setItem("patient_id", patient_id);
        //             window.alert("OTP Verification Successfull");
        //             navigator(`/pharmacist/serve_patient/${helper_id}`, { replace: false });
        //         }
        //         else {
        //             sessionStorage.setItem("otp_verified", "false");
        //             window.alert("OTP Verification Failed");
        //         }
        //     }
        //     else {
        //         window.alert(api_call.data.error_message);
        //     }

            // Code for avoiding the otp verifation for testing only 🛑
            let otp_entered = prompt(`Please enter Hello`, '');
            if (otp_entered === "Hello") {
                sessionStorage.setItem("otp_verified", "true")
                sessionStorage.setItem("patient_id", patient_id);
                window.alert("OTP Verification Successfull");
                navigator(`/pharmacist/serve_patient/${helper_id}`, { replace: false });
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
        <Fragment>
            <h1>This is Pharmacist Home Page</h1>
            <button onClick={(e) => navigator("/logout/", { replace: true })}>Logout</button>
            <h3>Your Info</h3>
            <div className="personal-info">
                <div>
                    <span>StaffUID: </span>
                    <span>{person_info.u_id}</span>
                </div>
                <div>
                    <span>First Name: </span>
                    <span>{person_info.first_name}</span>
                </div>
                <div>
                    <span>Middle Name: </span>
                    <span>{person_info.middle_name}</span>
                </div>
                <div>
                    <span>Last Name: </span>
                    <span>{person_info.last_name}</span>
                </div>
                <div>
                    <span>Gender: </span>
                    <span>{person_info.gender}</span>
                </div>
                <div>
                    <span>Date of Birth: </span>
                    <span>{person_info.dob}</span>
                </div>
                <div>
                    <span>Phone Number: </span>
                    <span>{person_info.phone_number}</span>
                </div>
                <div>
                    <span>Address: </span>
                    <span>{person_info.address}</span>
                </div>
                <div>
                    <span>Role: </span>
                    <span>{person_info.role}</span>
                </div>
                <div>
                    {other_info.degree && other_info.degree.length != 0 && (<span>
                        <span>Degree: </span>
                        <ol>
                            {
                                other_info.degree.map((deg) => (
                                    <li>{deg}</li>
                                )
                                )
                            }
                        </ol>
                    </span>)}
                </div>
                <div>
                    {other_info.specialization && other_info.specialization.length != 0 && (<span>
                        <span>Degree: </span>
                        <ol>
                            {
                                other_info.specialization.map((spe) => (
                                    <li>{spe}</li>
                                )
                                )
                            }
                        </ol>
                    </span>)}
                </div>
            </div>
            <hr />
            {unserved_redirection_records.map(record => (
                <div id={"div_" + record.redirection_record_id_string}>
                    <p>Redirection Creation Date Time: {record.redirection_creation_date_time}</p>
                    <p>Is Redirection Served: {record.is_redirection_served ? 'Yes' : 'No'}</p>
                    <p>Staff ID: {record.staff_u_id}</p>
                    <p>Staff Name: {record.staff_name}</p>
                    <p>Staff Designation: {record.staff_designation}</p>
                    <p>Patient ID: {record.patient_u_id}</p>
                    <p>Patient Name: {record.patient_name}</p>
                    <p>Medicines To Be Given:</p>
                    <ul>
                        {record.medicines_to_be_given.map((test, index) => (
                            <li key={index}>{test}</li>
                        ))}
                    </ul>
                    <button onClick={handle_redirection_serve_btn} id={record.redirection_record_id_string}>Serve</button>
                    <hr />
                </div>
            ))
            }
        </Fragment>
    );
};