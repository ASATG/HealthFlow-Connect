import React, { Fragment, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

export const Create_Staff_Records_Page = () => {
  const [uId, setUId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [opd, setOpd] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [labType, setLabType] = useState("");

  const { entity } = useParams();
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  const handle_form_submit = async (event) => {
    event.preventDefault();

    if (entity === "Counter") {
      const post_data = {
        u_id: uId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        phone_number: phoneNumber,
        address: address,
        role: "Counter",
      };
      const result = await axios.post(
        "http://localhost:3500/admin/add_counter_record/",
        post_data
      );
      if (result.data.success_status) {
        window.alert("Counter Record Added Successfully");
        setUId("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setGender("");
        setDob("");
        setPhoneNumber("");
        setAddress("");
      } else {
        window.alert(result.data.error_message);
      }
    } else if (entity === "Doctor") {
      const post_data = {
        u_id: uId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        phone_number: phoneNumber,
        address: address,
        role: "Doctor",
        opd: opd,
        degree: degree.split(","),
        specialization: specialization.split(","),
        is_admin: false,
      };
      const result = await axios.post(
        "http://localhost:3500/admin/add_doctor_record/",
        post_data
      );
      if (result.data.success_status) {
        window.alert("Doctor Record Added Successfully");
        setUId("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setGender("");
        setDob("");
        setPhoneNumber("");
        setAddress("");
        setOpd("");
        setDegree("");
        setSpecialization("");
      } else {
        window.alert(result.data.error_message);
      }
    } else if (entity === "Lab_Technician") {
      const post_data = {
        u_id: uId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        phone_number: phoneNumber,
        address: address,
        role: "Lab Technician",
        lab_type: labType,
        degree: degree.split(","),
        specialization: specialization.split(","),
      };
      const result = await axios.post(
        "http://localhost:3500/admin/add_lab_technician_record/",
        post_data
      );
      if (result.data.success_status) {
        window.alert("Lab Technician Record Added Successfully");
        setUId("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setGender("");
        setDob("");
        setPhoneNumber("");
        setAddress("");
        setLabType("");
        setDegree("");
        setSpecialization("");
      } else {
        window.alert(result.data.error_message);
      }
    } else if (entity === "Pharmacist") {
      const post_data = {
        u_id: uId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        phone_number: phoneNumber,
        address: address,
        role: "Pharmacist",
        degree: degree.split(","),
        specialization: specialization.split(","),
      };
      const result = await axios.post(
        "http://localhost:3500/admin/add_pharmacist_record/",
        post_data
      );
      if (result.data.success_status) {
        window.alert("Pharmacist Record Added Successfully");
        setUId("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setGender("");
        setDob("");
        setPhoneNumber("");
        setAddress("");
        setDegree("");
        setSpecialization("");
      } else {
        window.alert(result.data.error_message);
      }
    }
  };

  if (entity === "Counter") {
    const counter_jsx = (
      <Fragment>
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
          <div
            className="card w-50 "
            style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <h1 className="card-header text-center" style={{ padding: 20 }}>
              Adding Counter Record
            </h1>
            <div className="card-body">
              <form onSubmit={handle_form_submit}>
              <div className="mb-3" style={{padding:'10px 10px 5px 10px'}}>
                  <label className="form-label">Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Unique ID"
                    value={uId}
                    onInput={(e) => setUId(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    value={firstName}
                    onInput={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Middle Name"
                    value={middleName}
                    onInput={(e) => setMiddleName(e.target.value)}
                  />
                </div>
                <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onInput={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
                  <label className="form-label">Gender</label>
                  <select
                    className="form-control"
                    value={gender}
                    onInput={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onInput={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onInput={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" style={{padding:'5px 10px 10px 10px'}}>
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Address"
                    value={address}
                    onInput={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary " style={{marginLeft:"10px",padding:"10px 50px 10px 50px"}}>Submit</button>
                            <button onClick={handleBack} className="btn btn-secondary" style={{marginRight:"10px",padding:"10px 60px 10px 60px"}}>Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
    return counter_jsx;
  } else if (entity === "Doctor") {
    const doctor_jsx = (
      <Fragment>
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
          <div
            className="card w-50 "
            // style={{ padding: 10, borderRadius: "15px" }}
            style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <h1 className="card-header text-center" style={{ padding: 20 }}>
              Adding Doctor Record
            </h1>
            <div className="card-body">
            <form onSubmit={handle_form_submit}>
          <div className="mb-3" style={{padding:'10px 10px 5px 10px'}}>
            <label className="form-label">Unique ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Unique ID"
              value={uId}
              onInput={(e) => setUId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onInput={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Middle Name"
              value={middleName}
              onInput={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={gender}
              onInput={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onInput={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onInput={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">OPD</label>
            <select
              className="form-control"
              value={opd}
              onInput={(e) => setOpd(e.target.value)}
              required
            >
              <option value="">Select OPD</option>
              <option value="Medicine">Medicine</option>
              <option value="Surgery">Surgery</option>
              <option value="Orthopaedics">Orthopaedics</option>
              <option value="ENT">ENT</option>
              <option value="Opthamology">Opthamology</option>
              <option value="Gynaceology">Gynaceology</option>
              <option value="Paediatry">Paediatry</option>
              <option value="Skin">Skin</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="TB">TB</option>
              <option value="Dental">Dental</option>
            </select>
          </div>

          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Degree</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Degree"
              value={degree}
              onInput={(e) => setDegree(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{padding:'5px 10px 10px 10px'}}>
            <label className="form-label">Specialization</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Specialization"
              value={specialization}
              onInput={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
          <div className="footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary " style={{marginLeft:"10px",padding:"10px 50px 10px 50px"}}>Submit</button>
                            <button onClick={handleBack} className="btn btn-secondary" style={{marginRight:"10px",padding:"10px 60px 10px 60px"}}>Back</button>
                </div>
          {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
        </form>
        </div>
        </div>
            </div>
        
      </Fragment>
    );
    return doctor_jsx;
  } else if (entity === "Lab_Technician") {
    const lab_technician_jsx = (
      <Fragment>
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
          <div
            className="card w-50 "
            style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <h1 className="card-header text-center" style={{ padding: 20 }}>
              Adding Lab Technician Record
            </h1>
            <div className="card-body">
            <form onSubmit={handle_form_submit}>
          <div className="mb-3" style={{padding:'10px 10px 5px 10px'}}>
            <label className="form-label">Unique ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Unique ID"
              value={uId}
              onInput={(e) => setUId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onInput={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Middle Name"
              value={middleName}
              onInput={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={gender}
              onInput={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onInput={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onInput={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Lab Type</label>
            <select
              className="form-control"
              value={labType}
              onChange={(e) => setLabType(e.target.value)}
              required
            >
              <option value="">Select Lab Type</option>
              <option value="Radiology">Radiology</option>
              <option value="Pathology">Pathology</option>
            </select>
          </div>

          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Degree</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Degree"
              value={degree}
              onInput={(e) => setDegree(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{padding:'5px 10px 10px 10px'}}>
            <label className="form-label">Specialization</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Specialization"
              value={specialization}
              onInput={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
          <div className="footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary " style={{marginLeft:"10px",padding:"10px 50px 10px 50px"}}>Submit</button>
                            <button onClick={handleBack} className="btn btn-secondary" style={{marginRight:"10px",padding:"10px 60px 10px 60px"}}>Back</button>
                </div>
          {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
        </form>
            </div>
        </div>
        </div>
      </Fragment>
    );
    return lab_technician_jsx;
  } else if (entity === "Pharmacist") {
    const pharmacist_jsx = (
      <Fragment>
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
          <div
            className="card w-50 "
            style={{ padding: 10, borderRadius: "15px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <h1 className="card-header text-center" style={{ padding: 20 }}>
              Adding Pharmacist Record
            </h1>
            <div className="card-body">
            <form onSubmit={handle_form_submit}>
          <div className="mb-3" style={{padding:'10px 10px 5px 10px'}}>
            <label className="form-label">Unique ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Unique ID"
              value={uId}
              onInput={(e) => setUId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onInput={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Middle Name"
              value={middleName}
              onInput={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={gender}
              onInput={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onInput={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onInput={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{padding:'5px 10px 5px 10px'}}>
            <label className="form-label">Degree</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Degree"
              value={degree}
              onInput={(e) => setDegree(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{padding:'5px 10px 10px 10px'}}>
            <label className="form-label">Specialization</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Specialization"
              value={specialization}
              onInput={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
          <div className="footer d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary " style={{marginLeft:"10px",padding:"10px 50px 10px 50px"}}>Submit</button>
                            <button onClick={handleBack} className="btn btn-secondary" style={{marginRight:"10px",padding:"10px 60px 10px 60px"}}>Back</button>
                </div>
          {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
        </form>
            </div>
            </div>
            </div>
        
      </Fragment>
    );
    return pharmacist_jsx;
  }
};
