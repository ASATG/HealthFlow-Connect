import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Personal_Info_Component } from "../../components/Personal_Info_Component.jsx";

export const Admin_Home_Page = () => {
    const [personInfo, setPersonInfo] = useState({});
    const [adminInfo, setAdminInfo] = useState({});
    const navigator = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post("http://localhost:3500/admin/get_admin_info/", {
                    u_id: sessionStorage.getItem("username")
                });

                if (result.data.success_status) {
                    setPersonInfo(result.data.ans[0]);
                    setAdminInfo(result.data.ans[1]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Fragment>
            <h1>This is Admin Home Page</h1>
            <button onClick={(e) => navigator("/logout/", { replace: true })}>Logout</button>
            <div>
                <Personal_Info_Component explicit_keys_to_exclude={[]} record={personInfo} />
                <Personal_Info_Component explicit_keys_to_exclude={["person_id","is_admin"]} record={adminInfo} />
            </div>

            <h2 onClick={(e) => navigator("/admin/create_staff_record/Doctor", { replace: false })}>Create Doctor Record</h2>

            <h2 onClick={(e) => navigator("/admin/create_staff_record/Pharmacist", { replace: false })}>Create Pharmacist Record</h2>

            <h2 onClick={(e) => navigator("/admin/create_staff_record/Lab_Technician", { replace: false })}>Create Lab_Technician Record</h2>

            <h2 onClick={(e) => navigator("/admin/create_staff_record/Counter", { replace: false })}>Create Counter Record</h2>

            <hr />

            <h2 onClick={(e) => navigator("/admin/delete_staff_record", { replace: false })}>Delete Staff Record</h2>

            <h2 onClick={(e) => navigator("/admin/update_staff_record", { replace: false })}>Update Staff Record</h2>
        </Fragment>
    );
};
