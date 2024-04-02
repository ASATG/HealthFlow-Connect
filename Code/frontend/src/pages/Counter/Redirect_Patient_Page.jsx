import React, { Fragment, useState } from "react";
import axios from "axios";
import { Personal_Info_Component } from "../../components/Personal_Info_Component.jsx";

export const Redirect_Patient_Page = () => {
    const [patientUId, setpatientUId] = useState("");
    const [whoUId, setwhoUId] = useState("");
    const [who, setwho] = useState("");
    const [labtestingstobedone, setlabtestingstobedone] = useState("");
    const [medicinestobegiven, setmedicinestobegiven] = useState("");
    const [gotpatientdata, setgotpatientdata] = useState("");
    const [gotstaffdata, setgotstaffdata] = useState("");

    const [personInfo, setPersonInfo] = useState([]);
    const [stafflist, setstafflist] = useState({});

    const handle_submit_1 = async (event) => {
        event.preventDefault();
        const result = await axios.post("http://localhost:3500/counter/get_patient_allhistory_by_uid/", { patient_u_id: patientUId });
        if (result.data.success_status) {
            const obj = result.data.ans
            setPersonInfo(obj)
            setgotpatientdata("True")
        } else {
            window.alert(result.data.error_message);
        }
    }

    const get_staff_data = async (event) => {
        event.preventDefault();
        const result = await axios.post("http://localhost:3500/counter/get_staff_list_by_role/", { role: who });
        if (result.data.success_status) {
            setstafflist(result.data.ans)
            setgotstaffdata("True")
        } else {
            window.alert(result.data.error_message);
        }
    }

    const handle_submit_2 = async (event) => {
        event.preventDefault();

        const post_data = {
            patient_u_id: patientUId,
            who_u_id: whoUId,
            who: who,
            lab_testings_to_be_done: labtestingstobedone.split(","),
            medicines_to_be_given: medicinestobegiven.split(","),
        };

        const result = await axios.post("http://localhost:3500/counter/add_redirection_record/", post_data);
        if (result.data.success_status) {
            window.alert("Redirection Record Added Successfully");
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
                        value={patientUId}
                        onChange={(e) => setpatientUId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Get Record</button>
            </form>

            {gotpatientdata === "True" &&
                (
                    <div>
                        {personInfo.map((personInfoentry) => (
                            <Personal_Info_Component explicit_keys_to_exclude={[]} record={personInfoentry} />
                        ))}
                        <form onSubmit={get_staff_data}>
                            <div className="form-group">
                                <label>Redirect To</label>
                                <select
                                    className="form-control"
                                    value={who}
                                    onInput={(e) => setwho(e.target.value)}
                                    required
                                >
                                    <option value="">Select Redirection Staff</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Lab Technician">Lab Technician</option>
                                    <option value="Pharmacist">Pharmacist</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Get Staff Data</button>
                        </form>
                    </div>
                )
            }

            {
                gotstaffdata === "True" &&
                (
                    <form>
                        <div className="form-group">
                            <label>{who}s</label>
                            <select className="form-control" value={whoUId} onInput={(e) => setwhoUId(e.target.value)} required>
                                <option value="">Select {who}s</option>
                                {stafflist.map((stafflistentry) => (
                                    <option key={stafflistentry[0]} value={stafflistentry[0]}>
                                        {stafflistentry[0]}({stafflistentry[1]} {stafflistentry[2]} {stafflistentry[3]})
                                    </option>
                                ))}

                            </select>
                        </div>
                    </form>
                )
            }

            {gotstaffdata === "True" &&
                who === "Pharmacist" &&
                (
                    <form onSubmit={handle_submit_2}>
                        <div className="form-group">
                            <label>Medication to be done: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter medication to be given"
                                value={medicinestobegiven}
                                onInput={(e) => setmedicinestobegiven(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )
            }

            {gotstaffdata === "True" &&
                who === "Lab Technician" &&
                (
                    <form onSubmit={handle_submit_2}>
                        <div className="form-group">
                            <label>Tests to be done: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter tests to be done"
                                value={labtestingstobedone}
                                onInput={(e) => setlabtestingstobedone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )
            }

        </Fragment>
    )
}