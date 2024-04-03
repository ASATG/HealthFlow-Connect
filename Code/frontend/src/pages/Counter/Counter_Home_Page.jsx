import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Personal_Info_Component } from "../../components/Personal_Info_Component.jsx";

export const Counter_Home_Page = () => {
    const [personInfo, setPersonInfo] = useState({});
    const navigator = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post("http://localhost:3500/admin/get_staff_record_by_uid/", {
                    u_id: sessionStorage.getItem("username")
                });

                if (result.data.success_status) {
                    setPersonInfo(result.data.ans[0]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (sessionStorage.getItem("user_designation") !== "Counter") {
            navigator("/", { replace: true });
          }
        fetchData();
    }, []);
    return (
        <Fragment>
            <h1>This is Counter Home Page</h1>
            <button onClick={(e) => navigator("/logout/", { replace: true })}>Logout</button>
            <div>
                <Personal_Info_Component explicit_keys_to_exclude={[]} record={personInfo} />
            </div>
            <h2 onClick={(e) => navigator("/counter/create_patient_record")}>Create Patient Record</h2>
            <h2 onClick={(e) => navigator("/counter/update_patient_record")}>Update Patient Record</h2>
            <h2 onClick={(e) => navigator("/counter/redirect_patient")}>Redirect Patient</h2>
            <h2 onClick={(e) => navigator("/counter/show_patient_redirection_record")}>Show Patient Redirection Records</h2>
            <h2 onClick={(e) => navigator("/counter/print_case_paper")}>Print Case Paper</h2>
        </Fragment>
    );
};