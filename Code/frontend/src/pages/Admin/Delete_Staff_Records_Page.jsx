import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export const Delete_Staff_Records_Page = () => {
    const [requested_uid, set_requested_uid] = useState("");
    const [requested_uid_role, set_requested_uid_role] = useState("");

    useEffect(() => {
        document.getElementById("delete_btn").style.visibility = "hidden";
    }, []);

    const createListItems = (obj) => {
        return Object.keys(obj).map(key => {
            return `<li><strong>${key}:</strong> ${obj[key]}</li>`;
        }).join("");
    };

    const handle_submit = async (event) => {
        event.preventDefault();
        if (requested_uid === sessionStorage.getItem("username")) {
            window.alert("You cannot delete your own record");
            return;
        }
        const result = await axios.post("http://localhost:3500/admin/get_staff_record_by_uid/", { u_id: requested_uid });
        if (result.data.success_status) {
            const [temp_1, temp_2] = result.data.ans;
            if (temp_1.role === "Patient") {
                window.alert("You don't have rights to delete this record");
                return;
            }
            set_requested_uid_role(temp_1.role);

            const displayStaffRecordDiv = document.getElementById("display_staff_record");
            displayStaffRecordDiv.innerHTML = `
                <ul>
                    ${createListItems(temp_1)}
                </ul>
                <ul>
                    ${createListItems(temp_2)}
                </ul>
            `;

            document.getElementById("delete_btn").style.visibility = "visible";
        }
        else {
            set_requested_uid_role("");
            document.getElementById("display_staff_record").innerHTML = "";
            document.getElementById("delete_btn").style.visibility = "hidden";
            window.alert(result.data.error_message);
        }
    };

    const handle_delete = async (event) => {
        event.preventDefault();
        let delete_url = "http://localhost:3500/admin/";
        if (requested_uid_role === "Doctor") {
            delete_url += "delete_doctor_record";
        }
        else if (requested_uid_role === "Pharmacist") {
            delete_url += "delete_pharmacist_record";
        }
        else if (requested_uid_role === "Lab Technician") {
            delete_url += "delete_lab_technician_record";
        }
        else if (requested_uid_role === "Counter") {
            delete_url += "delete_counter_record"
        }
        
        const result = await axios.post(delete_url, { u_id: requested_uid });
        if (result.data.success_status) {
            window.alert("Record deleted successfully!");
        }
        else {
            window.alert("Error while deleting the record");
        }

        set_requested_uid_role("");
        set_requested_uid("");
        document.getElementById("display_staff_record").innerHTML = "";
        document.getElementById("delete_btn").style.visibility = "hidden";
    }

    const handle_input = (event) => {
        set_requested_uid(event.target.value);
    };

    return (
        <Fragment>
            <h1>Delete Staff Records</h1>
            <form onSubmit={handle_submit}>
                <div>
                    <label htmlFor="requested_uid">Enter Staff's UID:</label>
                    <input
                        type="text"
                        id="requested_uid"
                        name="requested_uid"
                        value={requested_uid}
                        onInput={handle_input}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div id="display_staff_record"></div>
            <button id="delete_btn" onClick={handle_delete}>Delete</button>
        </Fragment>
    );
};
