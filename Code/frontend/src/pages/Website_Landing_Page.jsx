import React, { Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import backgroundImage from '../images/bgadmin.jpg';
import '../styles/style.css';

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
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
            <div className="card w-40">
                <h1 className="card-header text-center">Welcome to Health Flow Connect</h1>
                <div className="card-body">
                    <form onSubmit={handle_form_submit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="text" className="form-control" id="username" name="username" value={username} required onInput={handle_username_input} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} required onInput={handle_password_input} />
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary w-50">Submit</button>
                            <button className="btn btn-link" onClick={(e) => navigator("/forgot_password/")}>Forgot Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        

    );
};