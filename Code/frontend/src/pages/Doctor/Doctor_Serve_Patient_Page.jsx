import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Doctor_Serve_Patient_Page = () => {
  const navigator = useNavigate();
  const redirection_id = useParams()["redirection_id"];
  const [patient_uid, set_patient_uid] = useState("");
  const [complaints, set_complaints] = useState("");
  const [lab_testing_to_be_done, set_lab_testing_to_be_done] = useState("");
  const [extra_notes, set_extra_notes] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [general_examination, set_general_examination] = useState([]);
  //   const [newMedicine, setNewMedicine] = useState('');
  //   const [newDosage, setNewDosage] = useState('');
  const [records, setrecord] = useState([]);
  const [patientUId, setpatientUId] = useState("");
  const [personInfo, setPersonInfo] = useState([]);
  const [gotpatientdata, setgotpatientdata] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user_designation") !== "Doctor") {
      return navigator("/", { replace: true });
    }

    if (sessionStorage.getItem("otp_verified") === "true") {
      set_patient_uid(sessionStorage.getItem("patient_id"));
      setpatientUId(sessionStorage.getItem("patient_id"));
      sessionStorage.removeItem("patient_id");
      sessionStorage.setItem("otp_verified", "false");
    } else {
      alert("Please do OTP Verifiaction of Patient First");
      navigator("/doctor/home_page", { replace: true });
    }
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  const handle_redirection_serve_btn = async (event) => {
    event.preventDefault();
    // const helper_id = event.target.id;
    navigator(`/doctor/show_patient_hist/${patient_uid}`);
  };

  useEffect(() => {
    if (gotpatientdata === "True") {
      const targetDiv = document.getElementById('scroll');
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }, [gotpatientdata]);
  
  const handle_form_submit = async (event) => {
    event.preventDefault();
    const prescriptions1 = [];
    prescriptions.map((item) => {
      if (item.medicine !== "" && item.dosage !== "" && item !== undefined) {
        prescriptions1.push({ [item.medicine]: item.dosage });
      }
    });
    const general_examination1 = {};
    general_examination.map((item) => {
      if (
        item.examing_object !== "" &&
        item.value !== "" &&
        item !== undefined
      ) {
        // return { [item.examing_object]: item.value };
        general_examination1[item.examing_object] = item.value;
      }
    });
    const post_data = {
      patient_u_id: patient_uid,
      who_u_id: sessionStorage.getItem("username"),
      who: sessionStorage.getItem("user_designation"),
      complaints: complaints.split(","),
      lab_testing_to_be_done: lab_testing_to_be_done.split(","),
      extra_notes: extra_notes.split(","),
      medicines_prescribed: prescriptions1,
      general_examination: general_examination1,
    };

    // console.log(post_data);
    // const formData = new FormData();
    // formData.append("patient_u_id", patient_uid);
    // formData.append("who_u_id", sessionStorage.getItem("username"));
    // formData.append("who", sessionStorage.getItem("user_designation"));

    // const filesInput = document.querySelector('input[type="file"]');
    // const files = filesInput.files;

    // for (let i = 0; i < files.length; i++) {
    //     formData.append("files", files[i]);
    // }

    let api_response = await axios.post(
      "http://localhost:3500/doctor/doctor_add_patient_record_in_patient_history",
      post_data
    );
    if (api_response.data.success_status) {
      const new_history_record_id_string =
        api_response.data.new_history_record_id;

      api_response = await axios.post(
        "http://localhost:3500/add_history_id_to_redirection_record_and_mark_complete",
        {
          redirection_record_id_string: redirection_id,
          history_record_id_string: new_history_record_id_string,
        }
      );

      if (api_response.data.success_status) {
        api_response = await axios.post(
          "http://localhost:3500/counter/add_new_history_id_in_active_case_paper",
          {
            history_id_string: new_history_record_id_string,
            patient_u_id: patient_uid,
          }
        );

        if (api_response.data.success_status) {
          window.alert("Patient History Record Added successfully");
          set_complaints("");
          set_lab_testing_to_be_done("");
          set_extra_notes("");
          setPrescriptions([]);
          set_general_examination([]);
        } else {
          window.alert(api_response.data.error_message);
        }
      } else {
        window.alert(api_response.data.error_message);
      }
    } else {
      window.alert(api_response.data.error_message);
    }

    navigator("/doctor/home_page", { replace: true });
  };

  const handleInputChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { medicine: "", dosage: "" }]);
    console.log(prescriptions);
  };

  const handleRemovePrescription = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    // console.log(updatedPrescriptions)
    setPrescriptions(updatedPrescriptions);
    // console.log(prescriptions)
  };

  const handleInputChange1 = (index, field, value) => {
    const updatedPrescriptions = [...general_examination];
    updatedPrescriptions[index][field] = value;
    set_general_examination(updatedPrescriptions);
  };

  const handleAddExamination = () => {
    set_general_examination([
      ...general_examination,
      { examing_object: "", value: "" },
    ]);
    console.log(general_examination);
  };

  const handleRemoveExamination = (index) => {
    const updatedPrescriptions = [...general_examination];
    updatedPrescriptions.splice(index, 1);
    // console.log(updatedPrescriptions)
    set_general_examination(updatedPrescriptions);
    // console.log(prescriptions)
  };

  const handle_history = async (event) => {
    // const handle_submit_1 = async (event) => {
    event.preventDefault();
    const result = await axios.post(
      "http://localhost:3500/counter/get_patient_allhistory_by_uid/",
      { patient_u_id: patientUId }
    );
    if (result.data.success_status) {
      const obj = result.data.ans;
      setPersonInfo(obj);
      setgotpatientdata("True");
      console.log(personInfo);
    } else {
      window.alert(result.data.error_message);
    }
  };

  const handle_lab_files = async (event) => {
    event.preventDefault();

    let response = await axios.post(
      "http://localhost:3500/doctor/get_lab_report_name_from_file_id",
      {
        lab_report_file_id_string: event.target.id,
      }
    );

    if (response.data.success_status) {
      const filename = response.data.filename;
      response = await axios.post(
        "http://localhost:3500/doctor/download_lab_report_by_file_id",
        {
          lab_report_file_id_string: event.target.id,
        },
        { responseType: "blob" }
      );
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(response.data);
      link.download = filename;
      link.click();
    }
  };

  return (
    <Fragment>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page serve-container">
        <div
          className="card w-50 "
          style={{
            padding: 10,
            borderRadius: "15px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {/* <h1>Redirection</h1> */}
          <h1 className="card-header text-center" style={{ padding: 20 }}>
            Add patient's medical information
          </h1>
          <div className="card-body">
            <div className="mb-3" style={{ padding: "10px 10px 5px 10px" }}>
              <label className="form-label">Patient's Complaints</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Patient's Complaints"
                value={complaints}
                onInput={(e) => set_complaints(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ padding: "5px 10px 10px 10px" }}>
              <h2>General Examination Form</h2>
              {general_examination.map((general_exam, index) => (
                <div
                  key={index}
                  className="prescribe"
                  style={{ padding: "10px 10px 10px 10px" }}
                >
                  <input
                    type="text"
                    placeholder="examing object"
                    value={general_exam.examing_object}
                    onChange={(e) =>
                      handleInputChange1(
                        index,
                        "examing_object",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Values"
                    value={general_exam.value}
                    onChange={(e) =>
                      handleInputChange1(index, "value", e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleRemoveExamination(index)}
                    className="btn btn-danger "
                    style={{ marginLeft: "10px", padding: "5px 40px 5px 40px" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddExamination}
                className="btn btn-primary"
                style={{ padding: "10px" }}
              >
                Add General Examination
              </button>
            </div>
            <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
              <label className="form-label">Lab Testings to be done</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Lab Testings to be done"
                value={lab_testing_to_be_done}
                onInput={(e) => set_lab_testing_to_be_done(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
              <label className="form-label">Extra notes</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Extra notes"
                value={extra_notes}
                onInput={(e) => set_extra_notes(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ padding: "5px 10px 5px 10px" }}>
              <h2>Prescription Form</h2>
              {prescriptions.map((prescription, index) => (
                <div
                  key={index}
                  className="prescribe"
                  style={{ padding: "10px 10px 10px 10px" }}
                >
                  <input
                    type="text"
                    // className="form-control"
                    placeholder="Medicine"
                    value={prescription.medicine}
                    onChange={(e) =>
                      handleInputChange(index, "medicine", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    // className="form-control"
                    placeholder="Dosage"
                    value={prescription.dosage}
                    onChange={(e) =>
                      handleInputChange(index, "dosage", e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleRemovePrescription(index)}
                    className="btn btn-danger "
                    style={{ marginLeft: "10px", padding: "5px 40px 5px 40px" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddPrescription}
                className="btn btn-primary"
                style={{ padding: "10px 40px 10px 40px" }}
              >
                Add Prescription
              </button>
            </div>
            
            <div className="footer d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={handle_form_submit}
                style={{ marginLeft: "10px", padding: "10px 50px 10px 50px" }}
              >
                Submit
              </button>
              <button
                onClick={handleBack}
                className="btn btn-secondary"
                style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}
              >
                Back
              </button>
            </div>

            <div className="mb-3" style={{ padding: "10px 10px 5px 10px" }}>
              <button onClick={handle_history} className="btn btn-secondary" style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}>Show history</button>
            </div>
            <hr />
            {gotpatientdata === "True" && (
              <div className="served-patients_dsp" id="scroll">
                <p className="p_doctor_dsp">Patient History</p>
                <div className="records-container_dsp">
                  {personInfo
                    .slice()
                    .reverse()
                    .map((personInfoentry) => (
                      <div className="personal-info_dsp">
                        <h5 style={{marginBottom:"15px"}}><b>RECORD: </b></h5>
                        <div class="form-group">
                          <p>Date: </p>
                          <span style={{marginBottom:"10px"}}>{personInfoentry.date_time}</span>
                        </div>
                        <div class="form-group">
                          <p>StaffUID: </p>
                          <span style={{marginBottom:"10px"}}>{personInfoentry.who_u_id}</span>
                        </div>
                        <div class="form-group">
                          <p>Staff: </p>
                          <span style={{marginBottom:"10px"}}>{personInfoentry.who}</span>
                        </div>
                        
                        <div class="form-group">
                          {personInfoentry.complaints.length !== 0 && (
                            <span style={{marginBottom:"10px"}}>
                              <p>Complaints: </p>
                              <ol>
                                {personInfoentry.complaints.map((test) => (
                                  <li>{test}</li>
                                ))}
                              </ol>
                            </span>
                          )}
                        </div>
                        <div class="form-group">
                          <p>General Examination</p>
                          {personInfoentry.general_examination ? (
                            <ol>
                              {Object.entries(
                                personInfoentry.general_examination
                              ).map(([key, value]) => (
                                <li key={key}>
                                  <strong>{key}:</strong> {value}
                                </li>
                              ))}
                            </ol>
                          ) : (
                            <p>No general examination data available</p>
                          )}
                        </div >
                        <div class="form-group">
                          {personInfoentry.lab_testing_to_be_done.length !==
                            0 && (
                            <span>
                              <p>Lab_testing_to_be_done: </p>
                              <ol>
                                {personInfoentry.lab_testing_to_be_done.map(
                                  (test) => (
                                    <li>{test}</li>
                                  )
                                )}
                              </ol>
                            </span>
                          )}
                        </div>
                        <div class="form-group">
                          {/* <button onClick={handle_lab_files}>Show File</button> */}
                          <span>
                            <p>Lab Files Uploaded: </p>
                            <ol>
                              {personInfoentry.lab_report_files_id.map(
                                (test) => (
                                  <li
                                    onClick={handle_lab_files}
                                    id={test.toString()}
                                  >
                                    {test}
                                  </li>
                                )
                              )}
                            </ol>
                          </span>
                        </div>
                        <div class="form-group">
                          <p>Medicines Prescribed</p>
                          <ol>
                            {personInfoentry.medicines_prescribed.map(
                              (medicine, index) => (
                                <li key={index}>
                                  <ul>
                                    {Object.entries(medicine).map(
                                      ([key, value]) => (
                                        <li
                                          key={key}
                                          style={{ listStyleType: "none" }}
                                        >
                                          <strong>{key}:</strong> {value}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                        <div class="form-group">
                          {personInfoentry.extra_notes.length !== 0 && (
                            <span style={{marginBottom:"10px"}}>
                              <p>Extra Notes: </p>
                              <ol>
                                {personInfoentry.extra_notes.map((note) => (
                                  <li>{note}</li>
                                ))}
                              </ol>
                            </span>
                          )}
                        </div>
                        <div class="form-group">
                          {personInfoentry.medicines_given.length !== 0 && (
                            <span>
                              <span style={{marginBottom:"10px"}}>Medicines Given: </span>
                              <ol>
                                {personInfoentry.medicines_given.map((test) => (
                                  <li>{test}</li>
                                ))}
                              </ol>
                            </span>
                          )}
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>
                <button
                onClick={handleBack}
                className="btn btn-secondary"
                style={{ marginRight: "10px", padding: "10px 60px 10px 60px" }}
              >
                Back
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
