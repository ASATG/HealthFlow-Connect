import React, { Fragment, useState } from "react";
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

    return (
        <Fragment>
            <h1>Update Patient Records</h1>
            <form onSubmit={handle_submit_1}>
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
                (<form onSubmit={handle_submit_2}>
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
                )
            }
        </Fragment>
    )
};