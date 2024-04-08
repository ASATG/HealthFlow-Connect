import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Show_All_Patients_Page = () => {
    const navigator = useNavigate();
    const [all_records, set_all_records] = useState([]);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const response = await axios.get("http://localhost:3500/counter/get_all_patient_records");
                if (response.data.success_status) {
                    set_all_records(response.data.ans);
                } else {
                    window.alert(response.data.error_message);
                }
            } catch (error) {
                console.error("API Call Error:", error);
                window.alert("Error fetching data. Please try again later.");
            }
        };

        if (sessionStorage.getItem("user_designation") !== "Counter") {
            navigator("/", { replace: true });
        } else {
            fetch_data();
        }
    }, []);

    return (
        <Fragment>
            {
                all_records.map((record, index) => (
                    <Fragment key={index}>
                        <h4>{JSON.stringify(record)}</h4>
                        <hr />
                    </Fragment>
                ))
            }
        </Fragment>
    );
};
