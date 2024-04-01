import React, { Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const Website_Landing_Page = () => {
    const navigator = useNavigate();
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem("is_authenticated") === "true") {
            const temp = sessionStorage.getItem("user_designation");
            let page_to_naviagate = "";
            if (temp === "Doctor") {
                page_to_naviagate = "/doctor/home_page";
            }
            else if (temp === "Pharmacist") {
                page_to_naviagate = "/pharmacist/home_page";
            }
            else if (temp === "Lab Technician") {
                page_to_naviagate = "/lab_technician/home_page";
            }
            else if (temp === "Counter") {
                page_to_naviagate = "/counter/home_page";
            }
            else if (temp === "Admin") {
                page_to_naviagate = "/admin/home_page";
            }

            return navigator(page_to_naviagate, { replace: true });
        }
        else {
            sessionStorage.clear();
            sessionStorage.setItem("username", "");
            sessionStorage.setItem("is_authenticated", "false");
            sessionStorage.setItem("user_designation", "");
            sessionStorage.setItem("otp_verified", "false");
        }
    }, [])

    const handle_username_input = (event) => {
        set_username(event.target.value);
    }

    const handle_password_input = (event) => {
        set_password(event.target.value);
    }

    const handle_form_submit = async (event) => {
        event.preventDefault();

        const response = await axios.post("http://localhost:3500/verify_user/", { username: username, password: password });
        if (response.data.success_status) {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("is_authenticated", "true");
            sessionStorage.setItem("user_designation", response.data.user_designation);

            const temp = response.data.user_designation;
            let page_to_naviagate = "";
            if (temp === "Doctor") {
                page_to_naviagate = "/doctor/home_page";
            }
            else if (temp === "Pharmacist") {
                page_to_naviagate = "/pharmacist/home_page";
            }
            else if (temp === "Lab Technician") {
                page_to_naviagate = "/lab_technician/home_page";
            }
            else if (temp === "Counter") {
                page_to_naviagate = "/counter/home_page";
            }
            else if (temp === "Admin") {
                page_to_naviagate = "/admin/home_page";
            }

            return navigator(page_to_naviagate, { replace: true });
        }
        else {
            window.alert(response.data.error_message);
        }
    }

    return (
        <Fragment>
            <h1>Welcome to Health Flow Connect</h1>
            <form onSubmit={handle_form_submit}>
                <label htmlFor="username">Username:</label><br />
                <input type="text" id="username" name="username" value={username} required onInput={handle_username_input} /><br /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" value={password} required onInput={handle_password_input} /><br /><br />

                <input type="submit" value="Submit" />
            </form>
            <h2 onClick={(e) => navigator("/forgot_password/")}>Forgot Password</h2>
        </Fragment>
    );
};