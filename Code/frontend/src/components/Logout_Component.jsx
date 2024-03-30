import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout_Component = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/", { replace: true });
    };

    React.useEffect(() => {
        handleLogout();
    }, []);

    return null;
};
