import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const See_All_Staff_Records_Page = () => {
    const navigator = useNavigate();
    const [required_designation, set_required_designation] = useState("");
    const [all_records, set_all_records] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Admin") {
            navigator("/", { replace: true });
        }
    }, []);

    const handle_submit = async (event) => {
        event.preventDefault();
        const api_response = await axios.post("http://localhost:3500/admin/get_reqd_designation_all_records/", { role: required_designation });
        set_all_records(api_response.data.ans);
    };

    return (
        <Fragment>
            <label htmlFor="staffDesignation">Select Staff Designation:</label>
            <select
                id="staffDesignation"
                value={required_designation}
                onChange={(e)=>set_required_designation(e.target.value)}
            >
                <option value="">Select...</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Counter">Counter</option>
            </select>

            <button onClick={handle_submit}>Submit</button>
            <hr />

            {
                all_records.map((record) => {
                    return (
                        <Fragment>
                            <h3>{JSON.stringify(record[0])}</h3>
                            <h3>{JSON.stringify(record[1])}</h3>
                            <hr />
                        </Fragment>
                    )
                })
            }
        </Fragment>
    );
};