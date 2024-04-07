import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const Update_Staff_Records_Page = () => {
    const [requested_uid, set_requested_uid] = useState("");
    const [requested_uid_role, set_requested_uid_role] = useState("");

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");

    const [opd, setOpd] = useState("");
    const [degree, setDegree] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [labType, setLabType] = useState("");

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Navigate back to previous page
    };

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Admin") {
            navigate("/", { replace: true });
        }
    }, []);

    const handle_submit_1 = async (event) => {
        event.preventDefault();
        if (requested_uid === sessionStorage.getItem("username")) {
            window.alert("You cannot update your own record");
            return;
        }
        const result = await axios.post("http://localhost:3500/admin/get_staff_record_by_uid/", { u_id: requested_uid });
        if (result.data.success_status) {
            const [temp_1, temp_2] = result.data.ans;
            if (temp_1.role === "Patient") {
                window.alert("You don't have rights to update this record");
                return;
            }
            set_requested_uid_role(temp_1.role);

            // Common for all
            setFirstName(temp_1.first_name);
            setMiddleName(temp_1.middle_name);
            setLastName(temp_1.last_name);
            setPhoneNumber(temp_1.phone_number);
            setDob(temp_1.dob);
            setAddress(temp_1.address);

            // Handling doctor,pharmacist and lab technician
            if (temp_1.role !== "Counter") {
                setDegree(temp_2.degree.join(","));
                setSpecialization(temp_2.specialization.join(","));

                if (temp_1.role === "Doctor") {
                    setOpd(temp_2.opd);
                }
                else if (temp_1.role === "Lab Technician") {
                    setLabType(temp_2.lab_type);
                }
            }
        }
        else {
            set_requested_uid_role("");
            window.alert(result.data.error_message);
        }
    }

    const handle_submit_2 = async (event) => {
        event.preventDefault();

        // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber });
        // if (api_call.data.success_status) {
        //     const backend_otp = api_call.data.otp;
        //     let otp_entered = prompt(`Please enter OTP sent to staff at number ${phoneNumber}`, '');
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
        //             opd: opd,
        //             degree: degree.split(","),
        //             specialization: specialization.split(","),
        //             lab_type: labType
        //         };

        //         const result = await axios.post("http://localhost:3500/admin/update_staff_record/", post_data);
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

        // Code for avoiding the otp verifation for testing only 🛑
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
                opd: opd,
                degree: degree.split(","),
                specialization: specialization.split(","),
                lab_type: labType
            };

            const result = await axios.post("http://localhost:3500/admin/update_staff_record/", post_data);
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

    return (
        <Fragment>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
                <div
                    className="card w-50 "
                    style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
                >
                    <h1 className="card-header text-center" style={{ padding: 20 }}>
                        Update Staff Records
                    </h1>
                    <div className="card-body">


                        <form onSubmit={handle_submit_1}>
                            <div className="mb-3" style={{ padding: '10px 10px 10px 10px' }}>
                                <label htmlFor="requested_uid" className="form-label">Enter Staff's UID:</label>
                                <input
                                    type="text"
                                    id="requested_uid"
                                    name="requested_uid"
                                    className="form-control"
                                    value={requested_uid}
                                    onChange={(e) => set_requested_uid(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="footer d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                <button onClick={handleBack} className="btn btn-secondary" style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}>Back</button>
                            </div>
                        </form>
                        {requested_uid_role && (
                            <h2 className="card-header text-center" style={{ padding: 20 }}>This is {requested_uid_role} record</h2>
                        )}

                        {requested_uid_role === "Counter" &&
                            (<form onSubmit={handle_submit_2}>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">First Name</label>
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
                                    <label className="form-label">Middle Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Middle Name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Last Name</label>
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
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Phone Number</label>
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
                                    <label className="form-label">Address</label>
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
                                </div>
                            </form>
                            )
                        }

                        {requested_uid_role === "Doctor" && (
                            <form onSubmit={handle_submit_2}>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">First Name</label>
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
                                    <label className="form-label">Middle Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Middle Name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Last Name</label>
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
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">OPD</label>
                                    <select className="form-control" value={opd} onChange={(e) => setOpd(e.target.value)} required>
                                        <option value="">Select OPD</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Orthopaedics">Orthopaedics</option>
                                        <option value="ENT">ENT</option>
                                        <option value="Opthamology">Opthamology</option>
                                        <option value="Gynaceology">Gynaceology</option>
                                        <option value="Paediatry">Paediatry</option>
                                        <option value="Skin">Skin</option>
                                        <option value="Psychiatry">Psychiatry</option>
                                        <option value="TB">TB</option>
                                        <option value="Dental">Dental</option>
                                    </select>
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Degree</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Degree"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 10px 10px' }}>
                                    <label className="form-label">Specialization</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Specialization"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="footer d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                </div>
                            </form>)}

                        {requested_uid_role === "Lab Technician" && (
                            <form onSubmit={handle_submit_2}>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">First Name</label>
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
                                    <label className="form-label">Middle Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Middle Name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Lab Type</label>
                                    <select
                                        className="form-control"
                                        value={labType}
                                        onChange={(e) => setLabType(e.target.value)}
                                        required>
                                        <option value="">Select Lab Type</option>
                                        <option value="Radiology">Radiology</option>
                                        <option value="Pathology">Pathology</option>
                                    </select>
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Degree</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Degree"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Specialization</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Specialization"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="footer d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                </div>
                            </form>)}

                        {requested_uid_role === "Pharmacist" && (
                            <form onSubmit={handle_submit_2}>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">First Name</label>
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
                                    <label className="form-label">Middle Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Middle Name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '10px 10px 5px 10px' }}>
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 5px 10px' }}>
                                    <label className="form-label">Degree</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Degree"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3" style={{ padding: '5px 10px 10px 10px' }}>
                                    <label className="form-label">Specialization</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Specialization"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="footer d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                </div>
                            </form>)}
                    </div>
                </div>
            </div>

        </Fragment>
    )
};