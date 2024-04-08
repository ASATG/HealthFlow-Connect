import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Show_Patient_Redirection_Record = () => {
    const [records, setrecord] = useState([]);
    const [patientUId, setpatientUId] = useState("");

    const navigator = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Counter") {
            navigator("/", { replace: true });
        }
    }, []);

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
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
            <div
          className="card w-50 "
          // style={{ padding: 10, borderRadius: "15px" }}
          style={{
            padding: 10,
            borderRadius: "15px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
            <h1 className="card-header text-center" style={{ padding: 20 }}>See Patient Redirection Record</h1>
            <div className="card-body">
            <form onSubmit={handle_submit_1}>
                <div>
                    <label htmlFor="requested_uid">Enter Patient's UID:</label>
                    <input
                        type="text"
                        id="requested_uid"
                        name="requested_uid"
                        value={patientUId}
                        className="form-control"
                        onChange={(e) => setpatientUId(e.target.value)}
                        required
                    />
                </div>
                <div className="footer d-flex justify-content-between align-items-center" style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>
                                <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button>
                                <button onClick={(e) => navigator("/counter/home_page")} className="btn btn-secondary" style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}>Back</button>
                            </div>
            </form>
            {
                records.length !== 0 &&
                (
                    <div className="served-patients_dsp" >
                        <p className="p_doctor_dsp">Redirection History</p>
                        <h4>{records[0].detail_history_record.patient_name}</h4>
                        {records.map((record) => (
                            <div className="personal-info_dsp">
                                <h5 style={{marginBottom:"15px"}}><b>RECORD: </b></h5>
                                {record.is_redirection_served === true && (<div>
                                    <div class="form-group">
                                        <p>Redirection Creation Date Time: </p>
                                        <span style={{marginBottom:"10px"}}>{record.redirection_creation_date_time}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>StaffUID: </p>
                                        <span style={{marginBottom:"10px"}}>{record.detail_history_record.staff_u_id}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>Staff name: </p>
                                        <span style={{marginBottom:"10px"}}>{record.detail_history_record.staff_name}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>Staff Designation: </p>
                                        <span style={{marginBottom:"10px"}}>{record.detail_history_record.staff_designation}</span>
                                    </div>
                                    
                                    <div class="form-group">
                                        <p>Is Redirection Served: </p>
                                        <span style={{marginBottom:"10px"}}>{record.is_redirection_served.toString()}</span>
                                    </div>
                                    {
                                        record.detail_history_record.staff_designation === "Lab Technician" && record.lab_testings_to_be_done && (
                                            <span>
                                                <p>Lab testing to be done: </p>
                                                <ol>
                                                    {record.lab_testings_to_be_done.map((test) => (
                                                        <li>{test}</li>
                                                    ))}
                                                </ol>
                                            </span>
                                        )
                                    }
                                    {
                                        record.detail_history_record.staff_designation === "Pharmacist" && record.medicines_to_be_given && (
                                            <span>
                                                <p>Medicines to be given: </p>
                                                <ol>
                                                    {record.medicines_to_be_given.map((med) => (
                                                        <li>{med}</li>
                                                    ))}
                                                </ol>
                                            </span>
                                        )
                                    }
                                </div>)}
                                {record.is_redirection_served === false && (<div>
                                    <div class="form-group">
                                        <p>StaffUID: </p>
                                        <span style={{marginBottom:"10px"}}>{record.staff_u_id}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>Staff name: </p>
                                        <span style={{marginBottom:"10px"}}>{record.staff_name}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>Staff Designation: </p>
                                        <span style={{marginBottom:"10px"}}>{record.staff_designation}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>Redirection Creation Date Time: </p>
                                        <span style={{marginBottom:"10px"}}>{record.redirection_creation_date_time}</span>
                                    </div>
                                    <div class="form-group">
                                        <p>Is Redirection Served: </p>
                                        <span style={{marginBottom:"10px"}}>{record.is_redirection_served.toString()}</span>
                                    </div>
                                    {
                                        record.staff_designation === "Lab Technician" && record.lab_testings_to_be_done && (
                                            <span>
                                                <p>Lab testing to be done: </p>
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
                                                <p>Medicines to be given: </p>
                                                <ol>
                                                    {record.medicines_to_be_given.map((med) => (
                                                        <li>{med}</li>
                                                    ))}
                                                </ol>
                                            </span>
                                        )
                                    }
                                </div>

                                )}
                            </div>
                        ))}
                        <div className="footer d-flex justify-content-between align-items-center" style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>
                                {/* <button type="submit" className="btn btn-primary " style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}>Submit</button> */}
                                <button onClick={(e) => navigator("/counter/home_page")} className="btn btn-secondary" style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}>Back</button>
                            </div>
                    </div>
                )
            }

            </div>

            </div>
            </div>
            
            {/* <form onSubmit={handle_submit_1}>
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
                records.length !== 0 &&
                (
                    <div>
                        <h3>Redirection History</h3>
                        <h4>{records[0].detail_history_record.patient_name}</h4>
                        {records.map((record) => (
                            <div className="personal-info">
                                <h5>Record: </h5>
                                {record.is_redirection_served === true && (<div>
                                    <div>
                                        <span>StaffUID: </span>
                                        <span>{record.detail_history_record.staff_u_id}</span>
                                    </div>
                                    <div>
                                        <span>Staff name: </span>
                                        <span>{record.detail_history_record.staff_name}</span>
                                    </div>
                                    <div>
                                        <span>Staff Designation: </span>
                                        <span>{record.detail_history_record.staff_designation}</span>
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
                                        record.detail_history_record.staff_designation === "Lab Technician" && record.lab_testings_to_be_done && (
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
                                        record.detail_history_record.staff_designation === "Pharmacist" && record.medicines_to_be_given && (
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
                                </div>)}
                                {record.is_redirection_served === false && (<div>
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

                                )}
                            </div>
                        ))}
                    </div>
                )
            } */}
        </Fragment>
    )
}