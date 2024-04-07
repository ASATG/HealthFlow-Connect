import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";

export const Delete_Staff_Records_Page = () => {
    const [requested_uid, set_requested_uid] = useState("");
    const [requested_uid_role, set_requested_uid_role] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Navigate back to previous page
    };

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Admin") {
            navigate("/", { replace: true });
        }
        else {
            document.getElementById("delete_btn").style.visibility = "hidden";
        }
    }, []);

    const createListItems = (obj) => {
        return Object.keys(obj).map(key => {
            return `<div style="display: flex; align-items: center; justify-content: space-between; flex-direction: row; width: 100%;">
                        <p>${key}</p>
                        <p>${obj[key]}</p>
                    </div>`;
        }).join("");
    };


    const handle_submit = async (event) => {
        event.preventDefault();
        if (requested_uid === sessionStorage.getItem("username")) {
            window.alert("You cannot delete your own record");
            return;
        }
        const result = await axios.post("http://localhost:3500/admin/get_staff_record_by_uid/", { u_id: requested_uid });
        if (result.data.success_status) {
            const [temp_1, temp_2] = result.data.ans;
            if (temp_1.role === "Patient") {
                window.alert("You don't have rights to delete this record");
                return;
            }
            set_requested_uid_role(temp_1.role);
            setPhoneNumber(temp_1.phone_number);
            const displayStaffRecordDiv = document.getElementById("display_staff_record");
            displayStaffRecordDiv.innerHTML = `
                <div className="main-container">
                <h2>Deletion Information</h2>
                <div className="personal-info1">
                    ${createListItems(temp_1)}
                    ${createListItems(temp_2)}
                </div>
                </div>
            `;

            document.getElementById("delete_btn").style.visibility = "visible";
        }
        else {
            set_requested_uid_role("");
            document.getElementById("display_staff_record").innerHTML = "";
            document.getElementById("delete_btn").style.visibility = "hidden";
            window.alert(result.data.error_message);
        }
    };

    const handle_delete = async (event) => {
        event.preventDefault();

        // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phoneNumber });
        // if (api_call.data.success_status) {
        //     const backend_otp = api_call.data.otp;
        //     let otp_entered = prompt(`Please enter OTP sent to staff at number ${phoneNumber}`, '');
        //     if (otp_entered === backend_otp) {
        //         window.alert("OTP Verification Successfull");
        //         let delete_url = "http://localhost:3500/admin/";
        //         if (requested_uid_role === "Doctor") {
        //             delete_url += "delete_doctor_record";
        //         }
        //         else if (requested_uid_role === "Pharmacist") {
        //             delete_url += "delete_pharmacist_record";
        //         }
        //         else if (requested_uid_role === "Lab Technician") {
        //             delete_url += "delete_lab_technician_record";
        //         }
        //         else if (requested_uid_role === "Counter") {
        //             delete_url += "delete_counter_record"
        //         }

        //         const result = await axios.post(delete_url, { u_id: requested_uid });
        //         if (result.data.success_status) {
        //             window.alert("Record deleted successfully!");
        //         }
        //         else {
        //             window.alert("Error while deleting the record");
        //         }

        //         set_requested_uid_role("");
        //         set_requested_uid("");
        //         document.getElementById("display_staff_record").innerHTML = "";
        //         document.getElementById("delete_btn").style.visibility = "hidden";
        //     }
        //     else {
        //         window.alert("OTP Verification Failed");
        //     }
        // }
        // else {
        //     window.alert(api_call.data.error_message);
        // }

        // Code for avoiding the otp verifation for testing only 🛑
        let otp_entered = prompt(`Please enter Hello${phoneNumber}`, '');
        if (otp_entered === "Hello") {
            window.alert("OTP Verification Successfull");
            let delete_url = "http://localhost:3500/admin/";
            if (requested_uid_role === "Doctor") {
                delete_url += "delete_doctor_record";
            }
            else if (requested_uid_role === "Pharmacist") {
                delete_url += "delete_pharmacist_record";
            }
            else if (requested_uid_role === "Lab Technician") {
                delete_url += "delete_lab_technician_record";
            }
            else if (requested_uid_role === "Counter") {
                delete_url += "delete_counter_record"
            }

            const result = await axios.post(delete_url, { u_id: requested_uid });
            if (result.data.success_status) {
                window.alert("Record deleted successfully!");
            }
            else {
                window.alert("Error while deleting the record");
            }

            set_requested_uid_role("");
            set_requested_uid("");
            document.getElementById("display_staff_record").innerHTML = "";
            document.getElementById("delete_btn").style.visibility = "hidden";
        }
        else {
            window.alert("OTP Verification Failed");
        }
    }

    const handle_input = (event) => {
        set_requested_uid(event.target.value);
    };

    return (
        <Fragment>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
                <div
                    className="card w-50 "
                    style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
                >
                    <h1 className="card-header text-center" style={{ padding: 20 }}>
                        Delete Staff Records
                    </h1>
                    <div className="card-body">
                        <form onSubmit={handle_submit}>
                            <div className="mb-3" style={{ padding: '10px 10px 10px 10px' }}>
                                <label htmlFor="requested_uid" className="form-label">Enter Staff's UID:</label>
                                <input
                                    type="text"
                                    id="requested_uid"
                                    name="requested_uid"
                                    value={requested_uid}
                                    onInput={handle_input}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="footer d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                <button onClick={handleBack} className="btn btn-secondary" style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}>Back</button>
                            </div>
                        </form>
                        <div id="display_staff_record"></div>
                        <button id="delete_btn" onClick={handle_delete} className="btn btn-danger" style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Delete</button>
                    </div>
                </div>
            </div>
            {/* <div id="display_staff_record"></div>
            <button id="delete_btn" onClick={handle_delete}>Delete</button> */}
        </Fragment>
    );
};
