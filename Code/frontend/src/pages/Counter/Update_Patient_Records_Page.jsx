import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Update_Patient_Records_Page = () => {
    const [requested_uid, set_requested_uid] = useState("");
    const [requested_uid_role, set_requested_uid_role] = useState("");

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");

    const navigator = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Counter") {
            navigator("/", { replace: true });
        }
    }, []);

    const handle_submit_1 = async (event) => {
        event.preventDefault();
        if (requested_uid === sessionStorage.getItem("username")) {
            window.alert("You cannot update your own record");
            return;
        }
        const result = await axios.post("http://localhost:3500/counter/get_patient_record_by_uid/", { u_id: requested_uid });

        if (result.data.success_status) {
            const temp_1 = result.data.ans;
            set_requested_uid_role(temp_1.role);

            setFirstName(temp_1.first_name);
            setMiddleName(temp_1.middle_name);
            setLastName(temp_1.last_name);
            setPhoneNumber(temp_1.phone_number);
            setDob(temp_1.dob);
            setAddress(temp_1.address);
        }
        else {
            set_requested_uid_role("");
            window.alert(result.data.error_message);
        }
    }

    const handle_submit_2 = async (event) => {
        event.preventDefault();

        // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phoneNumber });
        // if (api_call.data.success_status) {
        //     const backend_otp = api_call.data.otp;
        //     let otp_entered = prompt(`Please enter OTP sent to patient at number ${phoneNumber}`, '');
        //     if (otp_entered === backend_otp) {
        //         window.alert("OTP Verification Successfull");
        //         const post_data = {
        //             u_id: requested_uid,
        //             first_name: firstName,
        //             middle_name: middleName,
        //             last_name: lastName,
        //             dob: dob,
        //             phone_number: phoneNumber,
        //             address: address,
        //             role: requested_uid_role,
        //         };

        //         const result = await axios.post("http://localhost:3500/counter/update_patient_record/", post_data);
        //         if (result.data.success_status) {
        //             window.alert(`${requested_uid_role} record Updated successfully`);
        //         }
        //         else {
        //             window.alert(result.data.error_message);
        //         }
        //     }
        //     else {
        //         window.alert("OTP Verification Failed");
        //     }
        // }
        // else {
        //     window.alert(api_call.data.error_message);
        // }

        let otp_entered = prompt(`Please enter Hello${phoneNumber}`, '');
        if (otp_entered === "Hello") {
            window.alert("OTP Verification Successfull");
            const post_data = {
                u_id: requested_uid,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                dob: dob,
                phone_number: phoneNumber,
                address: address,
                role: requested_uid_role,
            };

            const result = await axios.post("http://localhost:3500/counter/update_patient_record/", post_data);
            if (result.data.success_status) {
                window.alert(`${requested_uid_role} record Updated successfully`);
            }
            else {
                window.alert(result.data.error_message);
            }
        }
        else {
            window.alert("OTP Verification Failed");
        }

    }

    const handle_add_case_paper = async (event) => {
        event.preventDefault();

        // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phoneNumber });
        // if (api_call.data.success_status) {
        //     const backend_otp = api_call.data.otp;
        //     let otp_entered = prompt(`Please enter OTP sent to patient at number ${phoneNumber}`, '');
        //     if (otp_entered === backend_otp) {
        //         window.alert("OTP Verification Successfull");
        //         const result = await axios.post("http://localhost:3500/counter/create_new_case_paper", { patient_u_id: requested_uid });
        //         if (result.data.success_status) {
        //             window.alert("Patient Case Paper Added Successfully");
        //         }
        //         else {
        //             window.alert(result.data.error_message);
        //         }
        //     }
        //     else {
        //         window.alert("OTP Verification Failed");
        //     }
        // }
        // else {
        //     window.alert(api_call.data.error_message);
        // }

        let otp_entered = prompt(`Please enter Hello${phoneNumber}`, '');
        if (otp_entered === "Hello") {
            window.alert("OTP Verification Successfull");
            const result = await axios.post("http://localhost:3500/counter/create_new_case_paper", { patient_u_id: requested_uid });
            if (result.data.success_status) {
                window.alert("Patient Case Paper Added Successfully");
            }
            else {
                window.alert(result.data.error_message);
            }
        }
        else {
            window.alert("OTP Verification Failed");
        }


    }

    return (
        <Fragment>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
            <div
                    className="card w-50 "
                    style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
                >
                     <h1 className="card-header text-center" style={{ padding: 20 }}>
                     Update Patient Records
                    </h1>
                    <div className="card-body">
                    <form onSubmit={handle_submit_1}>
                <div className="mb-3" style={{ padding: '10px 10px 10px 10px' }}>
                    <label htmlFor="requested_uid" className="form-label">Enter Patient's UID:</label>
                    <input
                        type="text"
                        id="requested_uid"
                        name="requested_uid"
                        value={requested_uid}
                        className="form-control"
                        onChange={(e) => set_requested_uid(e.target.value)}
                        required
                    />
                </div>
                <div className="footer d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                <button onClick={(e) => navigator("/counter/home_page")} className="btn btn-secondary" style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}>Back</button>
                            </div>
                {/* <button type="submit">Submit</button> */}
            </form>
            {requested_uid_role && (
                <h2 style={{marginTop:"20px",marginBottom:"20px"}}>This is {requested_uid_role} record</h2>
            )}
            {requested_uid_role === "Patient" &&
                (
                    <div >
                        <div className="footer d-flex justify-content-between align-items-center">
                            <button onClick={handle_add_case_paper} className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Click to Add New Case Paper</button>
                                {/* <button onClick={(e) => navigator("/counter/home_page")} className="btn btn-secondary" style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                  }}>Back</button> */}
                            </div>
                        {/* <button onClick={handle_add_case_paper}>Click to Add New Case Paper</button> */}

                        <form onSubmit={handle_submit_2}>
                            <div className="mb-3" style={{ padding: '20px 10px 5px 10px' }}>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                <label>Middle Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Middle Name"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{ padding: '5px 10px 10px 10px' }}>
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                <button onClick={(e) => navigator("/counter/home_page")} className="btn btn-secondary" style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                  }}>Back</button>
                            </div>
                            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        </form>
                    </div>
                )
            }
                    </div>
                </div>
            </div>
            {/* <h1>Update Patient Records</h1> */}
            {/* <form onSubmit={handle_submit_1}>
                <div>
                    <label htmlFor="requested_uid">Enter Patient's UID:</label>
                    <input
                        type="text"
                        id="requested_uid"
                        name="requested_uid"
                        value={requested_uid}
                        onChange={(e) => set_requested_uid(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {requested_uid_role && (
                <h2>This is {requested_uid_role} record</h2>
            )}
            {requested_uid_role === "Patient" &&
                (
                    <div>
                        <button onClick={handle_add_case_paper}>Click to Add New Case Paper</button>

                        <form onSubmit={handle_submit_2}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Middle Name"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                )
            } */}
        </Fragment>
    )
};