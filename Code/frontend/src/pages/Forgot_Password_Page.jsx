import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Forgot_Password_Page = () => {
    const navigator = useNavigate();
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("otp_verified") === "false") {
            window.alert("Please do OTP verification first");
            return navigator("/otp_verify/forgot_password", { replace: true });
        } else {
            sessionStorage.setItem("otp_verified", "false");
        }
    }, []);

    const handle_submit = async (event) => {
        event.preventDefault();
        const change_password = await axios.post("http://localhost:3500/change_password/", { username: sessionStorage.getItem("change_password_uid"), new_password: newPassword });
        if (change_password.data.success_status) {
            window.alert("Password Changed Successfully");
        }
        else {
            window.alert("Couldn't change password!");
        }
        sessionStorage.clear();
        return navigator("/", { replace: true });
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
            <div className="card w-45" style={{padding:10, borderRadius:"15px"}}>
                <h1 className="card-header text-center">Forgot Password Page</h1>
                <div className="card-body">
                    <form onSubmit={handle_submit}>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password:</label>
                            <input type="password" className="form-control" id="newPassword" name="newPassword" value={newPassword} onInput={(event) => setNewPassword(event.target.value)} required />
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary w-50">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
