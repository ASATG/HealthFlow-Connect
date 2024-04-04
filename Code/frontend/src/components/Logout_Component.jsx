import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout_Component = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/", { replace: true });
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return null;
};
