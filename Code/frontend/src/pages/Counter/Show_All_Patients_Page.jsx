import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const Show_All_Patients_Page = () => {
  const navigator = useNavigate();
  const [all_records, set_all_records] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/counter/get_all_patient_records"
        );
        if (response.data.success_status) {
          set_all_records(response.data.ans);
        } else {
          window.alert(response.data.error_message);
        }
      } catch (error) {
        console.error("API Call Error:", error);
        window.alert("Error fetching data. Please try again later.");
      }
    };

    if (sessionStorage.getItem("user_designation") !== "Counter") {
      navigator("/", { replace: true });
    } else {
      fetch_data();
    }
  }, []);

  const filteredRecords = all_records.filter((record) =>
    Object.values(record).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to print the table as PDF
  const handlePrint = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "UID",
          "First Name",
          "Middle Name",
          "Last Name",
          "Gender",
          "Date of Birth",
          "Phone Number",
          "Address",
        ],
      ],
      body: filteredRecords.map((record) => [
        record["u_id"],
        record["first_name"],
        record["middle_name"],
        record["last_name"],
        record["gender"],
        record["dob"],
        record["phone_number"],
        record["address"],
      ]),
    });
    doc.save("patient_information.pdf");
  };

  return (
    <Fragment>
      <div className="home-container2">
        <div class="content">
          <h1 style={{ paddingLeft: "30vw" }}>All Patient Information</h1>
          {/* <button
            className="logout-button"
            onClick={(e) => navigator("/logout/", { replace: true })}
          >
            Logout
          </button> */}
          <button
                  onClick={(e) => navigator("/counter/home_page")}
                  className="logout-button1"
                  style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                  }}
                >
                  Back
                </button>
        </div>
        {/* <h1>All Patient Information</h1> */}
        <div className="patient-t" > 
          <div className="sub-patient"><input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{marginLeft:"23vw",width:"30vw"}}
          />
          <Button onClick={handlePrint} style={{ overflowX: "auto" }} variant="primary">
            Print as PDF
          </Button></div>
          {/* <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{marginLeft:"30vw",width:"30vw"}}
          />
          <Button onClick={handlePrint} style={{ overflowX: "auto" }} variant="primary">
            Print as PDF
          </Button> */}
          <Table striped bordered hover responsive className="table-border-black">
            <thead >
              <tr className="first-row-black">
                <th>UID</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record["u_id"]}</td>
                  <td>{record["first_name"]}</td>
                  <td>{record["middle_name"]}</td>
                  <td>{record["last_name"]}</td>
                  <td>{record["gender"]}</td>
                  <td>{record["dob"]}</td>
                  <td>{record["phone_number"]}</td>
                  <td>{record["address"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};
