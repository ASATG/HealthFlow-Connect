import React, { Fragment, useState } from "react";
import axios from "axios";


export const Show_Patient_History = () => {
    const [records, setrecord] = useState([]);
    const [patientUId, setpatientUId] = useState("");
    const [personInfo, setPersonInfo] = useState([]);
    const [gotpatientdata, setgotpatientdata] = useState("");
    const handle_submit_1 = async (event) => {
        event.preventDefault();
        const result = await axios.post("http://localhost:3500/counter/get_patient_allhistory_by_uid/", { patient_u_id: patientUId });
        if (result.data.success_status) {
            const obj = result.data.ans
            setPersonInfo(obj)
            setgotpatientdata("True")
            console.log(personInfo)
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

            {gotpatientdata === "True" &&
                (
                    <div>
                        <h3>Patient History</h3>
                        {personInfo.slice().reverse().map((personInfoentry) => (

                            <div className="personal-info">
                                <h5>Record: </h5>
                                <div>
                                    <span>StaffUID: </span>
                                    <span>{personInfoentry.who_u_id}</span>
                                </div>
                                <div>
                                    <span>Staff: </span>
                                    <span>{personInfoentry.who}</span>
                                </div>
                                <div>
                                    <span>Date: </span>
                                    <span>{personInfoentry.date_time}</span>
                                </div>
                                <div>
                                    {personInfoentry.complaints.length != 0 && (<span>
                                        <span>complaints: </span>
                                        <ol>
                                            {
                                                personInfoentry.complaints.map((test) => (
                                                    <li>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>)}
                                </div>
                                <div>
                                <span><span>general_examination: </span>
                                        <span>{JSON.stringify(personInfoentry.general_examination)}</span></span>
                                </div>
                                <div>
                                    {personInfoentry.lab_testing_to_be_done.length != 0 && (<span>
                                        <span>Lab_testing_to_be_done: </span>
                                        <ol>
                                            {
                                                personInfoentry.lab_testing_to_be_done.map((test) => (
                                                    <li>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>)}
                                </div>
                                <div>{Object.keys(personInfoentry.medicines_prescribed).length != 0 &&
                                    (<span><span>Medicines_prescribed: </span>
                                        <span>{JSON.stringify(personInfoentry.medicines_prescribed)}</span></span>)
                                }
                                </div>
                                <div>
                                    {personInfoentry.extra_notes.length != 0 && (<span>
                                        <span>Extra Notes: </span>
                                        <ol>
                                            {
                                                personInfoentry.extra_notes.map((note) => (
                                                    <li>{note}</li>
                                                )
                                                )
                                            }
                                        </ol>
                                    </span>)}
                                </div>
                                <div>
                                    {personInfoentry.medicines_given.length != 0 && (<span>
                                        <span>medicines_given: </span>
                                        <ol>
                                            {
                                                personInfoentry.medicines_given.map((test) => (
                                                    <li>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                )
                        }
        </Fragment>
    );


}