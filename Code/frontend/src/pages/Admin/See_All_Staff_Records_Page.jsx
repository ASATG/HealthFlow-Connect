import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const See_All_Staff_Records_Page = () => {
    const navigator = useNavigate();
    const [required_designation, set_required_designation] = useState("");
    const [all_records, set_all_records] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("user_designation") !== "Admin") {
            navigator("/", { replace: true });
        }
    }, []);

    const handle_submit = async (event) => {
        event.preventDefault();
        const api_response = await axios.post("http://localhost:3500/admin/get_reqd_designation_all_records/", { role: required_designation });
        set_all_records(api_response.data.ans);
    };

    const handlePrintPDF = () => {
        const doc = new jsPDF();
        autoTable(doc,{
            head: [["UID", "First Name", "Middle Name", "Last Name", "Gender", "Date of Birth", "Phone Number", "Address", "OPD", "Degree", "Specialization"]],
            body: all_records.map(record => [
                record[0]["u_id"],
                record[0]["first_name"],
                record[0]["middle_name"],
                record[0]["last_name"],
                record[0]["gender"],
                record[0]["dob"],
                record[0]["phone_number"],
                record[0]["address"],
                record[1]["opd"],
                record[1]["degree"],
                record[1]["specialization"]
            ])
        });
        doc.save("staff_records.pdf");
    };

    // Function to filter records based on search term
    const filteredRecords = all_records.filter(record => {
        const recordValues = Object.values(record[0]).concat(Object.values(record[1]));
        return recordValues.some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Fragment>
            <div className="home-container2">
            <div class="content">
          <h1 style={{ paddingLeft: "30vw" }}>STAFF INFORMATION</h1>
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
        <div className="patient-t" > 
            <div className="select-desig" style={{ padding: "5px 10px 5px 10px" }}>
                <div style={{display:"flex",flexDirection:"row"}}>
            <label htmlFor="staffDesignation">Select Staff Designation:</label>
            <select
                id="staffDesignation"
                value={required_designation}
                onChange={(e)=>set_required_designation(e.target.value)}
                className="form-control"
            >
                <option value="">Select...</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Counter">Counter</option>
            </select>
            </div>
            

            <button className="logout-button2"
                  style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                    marginLeft: "10vw"
                  }}
                  onClick={handle_submit}>Submit</button>
            </div>
            {/* </div> */}
            <hr />

            <div className="sub-patient">

            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{marginLeft:"23vw",width:"30vw"}}
            />

            <Button onClick={handlePrintPDF}>Print PDF</Button>
            </div>

            <Table striped bordered hover responsive className="table-border-black">
                <thead>
                    <tr className="first-row-black">
                        <th>UID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>OPD</th>
                        <th>Degree</th>
                        <th>Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record, index) => (
                        <tr key={index}>
                            <td>{record[0]["u_id"]}</td>
                            <td>{record[0]["first_name"]}</td>
                            <td>{record[0]["middle_name"]}</td>
                            <td>{record[0]["last_name"]}</td>
                            <td>{record[0]["gender"]}</td>
                            <td>{record[0]["dob"]}</td>
                            <td>{record[0]["phone_number"]}</td>
                            <td>{record[0]["address"]}</td>
                            <td>{record[1]["opd"]}</td>
                            <td>{record[1]["degree"]}</td>
                            <td>{record[1]["specialization"]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>

            {/* {
                all_records.map((record) => {
                    return (
                        <Fragment>
                            <h3>{JSON.stringify(record[0])}</h3>
                            <h3>{JSON.stringify(record[1])}</h3>
                            <hr />
                        </Fragment>
                    )
                })
            } */}
            </div>
        </Fragment>
    );
};