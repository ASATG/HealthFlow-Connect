import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Create_Patient_Records_Page = () => {
  const [uId, setUId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [patientAddeded, setpatientAddeded] = useState("");

  const navigator = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user_designation") !== "Counter") {
      navigator("/", { replace: true });
    }
  }, []);

  const handle_form_submit = async (event) => {
    event.preventDefault();

    // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phoneNumber });
    // if (api_call.data.success_status) {
    //     const backend_otp = api_call.data.otp;
    //     let otp_entered = prompt(`Please enter OTP sent to patient at number ${phoneNumber}`, '');
    //     if (otp_entered === backend_otp) {
    //         window.alert("OTP Verification Successfull");
    //         const post_data = {
    //             u_id: uId,
    //             first_name: firstName,
    //             middle_name: middleName,
    //             last_name: lastName,
    //             gender: gender,
    //             dob: dob,
    //             phone_number: phoneNumber,
    //             address: address,
    //             role: "Patient"
    //         };
    //         const result = await axios.post("http://localhost:3500/counter/add_patient_record/", post_data);
    //         if (result.data.success_status) {
    //             window.alert("Patient Record Added Successfully");
    //             setpatientAddeded("True");
    //         }
    //         else {
    //             window.alert(result.data.error_message);
    //         }
    //     }
    //     else {
    //         window.alert("OTP Verification Failed");
    //     }
    // }
    // else {
    //     window.alert(api_call.data.error_message);
    // }

    // Code for avoiding the otp verifation for testing only 🛑
    let otp_entered = prompt(`Please enter Hello${phoneNumber}`, "");
    if (otp_entered === "Hello") {
      window.alert("OTP Verification Successfull");
      const post_data = {
        u_id: uId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        phone_number: phoneNumber,
        address: address,
        role: "Patient",
      };
      const result = await axios.post(
        "http://localhost:3500/counter/add_patient_record/",
        post_data
      );
      if (result.data.success_status) {
        window.alert("Patient Record Added Successfully");
        setpatientAddeded("True");
      } else {
        window.alert(result.data.error_message);
      }
    } else {
      window.alert("OTP Verification Failed");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  const handle_add_case_paper = async (event) => {
    event.preventDefault();

    // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phoneNumber });
    // if (api_call.data.success_status) {
    //     const backend_otp = api_call.data.otp;
    //     let otp_entered = prompt(`Please enter OTP sent to patient at number ${phoneNumber}`, '');
    //     if (otp_entered === backend_otp) {
    //         window.alert("OTP Verification Successfull");
    //         console.log(uId)
    //         const result = await axios.post("http://localhost:3500/counter/create_new_case_paper", { patient_u_id: uId });
    //         if (result.data.success_status) {
    //             window.alert("Patient Case Paper Added Successfully");
    //         }
    //         else {
    //             window.alert(result.data.error_message);
    //         }
    //     }
    //     else {
    //         window.alert("OTP Verification Failed");
    //     }
    // }
    // else {
    //     window.alert(api_call.data.error_message);
    // }

    let otp_entered = prompt(`Please enter Hello${phoneNumber}`, "");
    if (otp_entered === "Hello") {
      window.alert("OTP Verification Successfull");
      console.log(uId);
      const result = await axios.post(
        "http://localhost:3500/counter/create_new_case_paper",
        { patient_u_id: uId }
      );
      if (result.data.success_status) {
        window.alert("Patient Case Paper Added Successfully");
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
    } else {
      window.alert("OTP Verification Failed");
    }
  };

  const patient_jsx = (
    <Fragment>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
        <div
          className="card w-50 "
          // style={{ padding: 10, borderRadius: "15px" }}
          style={{
            padding: 10,
            borderRadius: "15px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h1 className="card-header text-center" style={{ padding: 20 }}>
            Adding Patient Record
          </h1>
          <div className="card-body">
            <form onSubmit={handle_form_submit}>
              <div className="mb-3" style={{ padding: "10px 10px 5px 10px" }}>
                <label>Unique ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Unique ID"
                  value={uId}
                  onInput={(e) => setUId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  value={firstName}
                  onInput={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
                <label>Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Middle Name"
                  value={middleName}
                  onInput={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onInput={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
                <label>Gender</label>
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
              <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onInput={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3" style={{ padding: "5px 10px 10px 10px" }}>
                <label>Address</label>
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
                <button
                  type="submit"
                  className="btn btn-primary "
                  style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}
                >
                  Submit
                </button>
                <button
                //   onClick={handleBack}
                  onClick={(e) => navigator("/counter/home_page")}
                  className="btn btn-secondary"
                  style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                  }}
                >
                  Back
                </button>
              </div>
            </form>
            {patientAddeded === "True" && uId && (
              <button
                onClick={handle_add_case_paper}
                className="btn btn-primary "
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  padding: "10px 50px 10px 50px",
                }}
              >
                Click to Add New Case Paper
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <form onSubmit={handle_form_submit}>
            <div className="form-group">
                <label>Unique ID</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Unique ID"
                    value={uId}
                    onInput={(e) => setUId(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    value={firstName}
                    onInput={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Middle Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Middle Name"
                    value={middleName}
                    onInput={(e) => setMiddleName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onInput={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Gender</label>
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
            <div className="form-group">
                <label>Date of Birth</label>
                <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onInput={(e) => setDob(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onInput={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Address"
                    value={address}
                    onInput={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {
            patientAddeded === "True" && uId && (
                <button onClick={handle_add_case_paper}>Click to Add New Case Paper</button>
            )
        } */}
    </Fragment>
  );
  return patient_jsx;
};
