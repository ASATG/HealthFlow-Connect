import React, { Fragment, useState } from "react";
import axios from "axios";

export const Show_Patient_Redirection_Record = () => {
    const [records, setrecord] = useState([]);
    const [patientUId, setpatientUId] = useState("");
    const handle_submit_1 = async (event) => {
        event.preventDefault();
        console.log(patientUId);
        const result = await axios.post("http://localhost:3500/counter/see_patient_redirection_records", { patient_u_id: patientUId });
        if (result.data.success_status) {
            const arr = result.data.ans
            // console.log(typeof arr)
            setrecord(arr)
            console.log(records)
        } else {
            window.alert(result.data.error_message);
        }
    }

    return (
        <Fragment>
            <h1>See Patient Redirection Record</h1>
            <form onSubmit={handle_submit_1}>
                <div>
                    <label htmlFor="requested_uid">Enter Patient's UID:</label>
                    <input
                        type="text"
                        id="requested_uid"
                        name="requested_uid"
                        value={patientUId}
                        onChange={(e) => setpatientUId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Get Record</button>
            </form>
            {
                Object.keys(records).length != 0 &&
                (
                    <div>
                        <h3>Redirection History</h3>
                        <h4>{records[0].patient_name}</h4>
                        {records.map((record) => (
                            <div className="personal-info">
                                <h5>Record: </h5>
                                <div>
                                    <span>StaffUID: </span>
                                    <span>{record.staff_u_id}</span>
                                </div>
                                <div>
                                    <span>Staff name: </span>
                                    <span>{record.staff_name}</span>
                                </div>
                                <div>
                                    <span>Staff Designation: </span>
                                    <span>{record.staff_designation}</span>
                                </div>
                                <div>
                                    <span>Redirection Creation Date Time: </span>
                                    <span>{record.redirection_creation_date_time}</span>
                                </div>
                                <div>
                                    <span>Is Redirection Served: </span>
                                    <span>{record.is_redirection_served.toString()}</span>
                                </div>
                                {
                                    record.staff_designation === "Lab Technician" && record.lab_testings_to_be_done && (
                                        <span>
                                            <span>Lab testing to be done: </span>
                                            <ol>
                                                {record.lab_testings_to_be_done.map((test) => (
                                                    <li>{test}</li>
                                                ))}
                                            </ol>
                                        </span>
                                    )
                                }
                                {
                                    record.staff_designation === "Pharmacist" && record.medicines_to_be_given && (
                                        <span>
                                            <span>Medicines to be given: </span>
                                            <ol>
                                                {record.medicines_to_be_given.map((med) => (
                                                    <li>{med}</li>
                                                ))}
                                            </ol>
                                        </span>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                )
            }
        </Fragment>
    )
}