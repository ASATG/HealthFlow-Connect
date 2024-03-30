import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Website_Landing_Page } from "./pages/Website_Landing_Page.jsx"
import { Logout_Component } from "./components/Logout_Component.jsx"
import { Admin_Home_Page } from "./pages/Admin/Admin_Home_Page.jsx";
import { Create_Staff_Records_Page } from "./pages/Admin/Create_Staff_Records_Page.jsx";
import { Delete_Staff_Records_Page } from "./pages/Admin/Delete_Staff_Records_Page.jsx";
import { Update_Staff_Records_Page } from "./pages/Admin/Update_Staff_Records_Page.jsx";
import { Counter_Home_Page } from "./pages/Counter/Counter_Home_Page.jsx";
import { Doctor_Home_Page } from "./pages/Doctor/Doctor_Home_Page.jsx";
import { Lab_Technician_Home_Page } from "./pages/Lab_Technician/Lab_Technician_Home_Page.jsx";
import { Pharmacist_Home_Page } from "./pages/Pharmacist/Pharmacist_Home_Page.jsx";

export const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Website_Landing_Page />} />
                    <Route path="/logout/" element={<Logout_Component />} />

                    <Route path="/admin/home_page" element={<Admin_Home_Page />} />
                    <Route path="/admin/create_staff_record/:entity" element={<Create_Staff_Records_Page />} />
                    <Route path="/admin/delete_staff_record" element={<Delete_Staff_Records_Page />} />
                    <Route path="/admin/update_staff_record" element={<Update_Staff_Records_Page />} />

                    <Route path="/counter/home_page" element={<Counter_Home_Page />} />
                    <Route path="/doctor/home_page" element={<Doctor_Home_Page />} />
                    <Route path="/lab_technician/home_page" element={<Lab_Technician_Home_Page />} />
                    <Route path="/pharmacist/home_page" element={<Pharmacist_Home_Page />} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
};