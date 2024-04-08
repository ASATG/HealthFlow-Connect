import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Personal_Info_Component } from "../../components/Personal_Info_Component.jsx";
import backgroundImage from "../../images/bgadmin.jpg";
import "../../styles/style.css";

export const Admin_Home_Page = () => {
  const [personInfo, setPersonInfo] = useState({});
  const [adminInfo, setAdminInfo] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3500/admin/get_admin_info/",
          {
            u_id: sessionStorage.getItem("username"),
          }
        );

        if (result.data.success_status) {
          setPersonInfo(result.data.ans[0]);
          console.log(result.data.ans[0]);
          setAdminInfo(result.data.ans[1]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sessionStorage.getItem("user_designation") !== "Admin") {
      navigator("/", { replace: true });
    }
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Admin Home Page</h1>
      <div>
        <div className="sidebar">
          <p>Admin Facilities</p>
          <ul>
          <hr />
            <li
              onClick={(e) =>
                navigator("/admin/create_staff_record/Doctor", {
                  replace: false,
                })
              }
            >
              Create Doctor Record
            </li>
            <hr />
            <li
              onClick={(e) =>
                navigator("/admin/create_staff_record/Pharmacist", {
                  replace: false,
                })
              }
            >
              Create Pharmacist Record
            </li>
            <hr />
            <li
              onClick={(e) =>
                navigator("/admin/create_staff_record/Lab_Technician", {
                  replace: false,
                })
              }
            >
              Create Lab Technician Record
            </li>
            <hr />
            <li
              onClick={(e) =>
                navigator("/admin/create_staff_record/Counter", {
                  replace: false,
                })
              }
            >
              Create Counter Record
            </li>
            <hr />
            <li
              onClick={(e) =>
                navigator("/admin/update_staff_record", { replace: false })
              }
            >
              Update Staff Record
            </li>
            <hr />
            <li
              onClick={(e) =>
                navigator("/admin/delete_staff_record", { replace: false })
              }
            >
              Delete Staff Record
            </li>
            <hr />
            <li
              onClick={(e) =>
                navigator("/admin/all_staff_records", { replace: false })
              }
            >
              Get all staff Records
            </li>
            <hr />
            <li onClick={(e) => navigator("/logout/", { replace: true })}>
              Logout
            </li>
            <hr />
          </ul>
        </div>

        <div className="main-container">
          <h2>Admin Information</h2>
          <div className="personal-info">
            <div>
              <p>UID</p>
              <p>{personInfo["u_id"]}</p>
            </div>
            <div>
              <p>First Name</p>
              <p>{personInfo["first_name"]}</p>
            </div>
            <div>
              <p>Middle Name</p>
              <p>{personInfo["middle_name"]}</p>
            </div>
            <div>
              <p>Last Name</p>
              <p>{personInfo["last_name"]}</p>
            </div>
            <div>
              <p>Gender</p>
              <p>{personInfo["gender"]}</p>
            </div>
            <div>
              <p>Date of Birth</p>
              <p>{personInfo["dob"]}</p>
            </div>
            <div>
              <p>Phone Number</p>
              <p>{personInfo["phone_number"]}</p>
            </div>
            <div>
              <p>Address</p>
              <p>{personInfo["address"]}</p>
            </div>
            <div>
              <p>Role</p>
              <p>{personInfo["role"]}</p>
            </div>
            <div>
              <p>OPD</p>
              <p>{adminInfo["opd"]}</p>
            </div>
            <div>
              <p>Degree</p>
              <p>{adminInfo["degree"]}</p>
            </div>
            <div>
              <p>Specialization</p>
              <p>{adminInfo["specialization"]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
