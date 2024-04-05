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

  useEffect(() => {
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

  const handle_redirection_serve_btn = async (event) => {
    event.preventDefault();
    // const helper_id = event.target.id;
    navigator(`/doctor/show_patient_hist/${patient_uid}`)
  }

  const handle_form_submit = async (event) => {
    event.preventDefault();
    const prescriptions1=[]
    prescriptions.map((item) => {
      if (item.medicine !== "" && item.dosage !== "" && item !== undefined) {
        prescriptions1.push( { [item.medicine]: item.dosage });
      }
    });
    const general_examination1 = {}
    general_examination.map((item) => {
      if (
        item.examing_object !== "" &&
        item.value !== "" &&
        item !== undefined
      ) {
        // return { [item.examing_object]: item.value };
        general_examination1[item.examing_object]=item.value
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

  const handle_history = async(event) => {
    // const handle_submit_1 = async (event) => {
        event.preventDefault();
        const result = await axios.post("http://localhost:3500/counter/get_patient_allhistory_by_uid/", { patient_u_id: patientUId });
        if (result.data.success_status) {
            const obj = result.data.ans
            setPersonInfo(obj)
            setgotpatientdata("True")
            console.log(personInfo)
        } else {
            window.alert(result.data.error_message);
        }
  }

  const handle_lab_files = async(event) =>{
    event.preventDefault();
    
    let response=await axios.post("http://localhost:3500/doctor/get_lab_report_name_from_file_id",{
      lab_report_file_id_string:event.target.id
    });

    if(response.data.success_status){
      const filename=response.data.filename;
      response = await axios.post(
        "http://localhost:3500/doctor/download_lab_report_by_file_id",
        {
          lab_report_file_id_string:event.target.id
        },
        { responseType: "blob" }
      );
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(response.data);
      link.download = filename;
      link.click();
    }
  }

  return (
    <Fragment>
      <h1>Redirection</h1>
        <div className="form-group">
          <label>Patient's Complaints</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Patient's Complaints"
            value={complaints}
            onInput={(e) => set_complaints(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Lab Testings to be done</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Lab Testings to be done"
            value={lab_testing_to_be_done}
            onInput={(e) => set_lab_testing_to_be_done(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Extra notes</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Extra notes"
            value={extra_notes}
            onInput={(e) => set_extra_notes(e.target.value)}
            required
          />
        </div>
        <div>
          <h2>Prescription Form</h2>
          {prescriptions.map((prescription, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Medicine"
                value={prescription.medicine}
                onChange={(e) =>
                  handleInputChange(index, "medicine", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Dosage"
                value={prescription.dosage}
                onChange={(e) =>
                  handleInputChange(index, "dosage", e.target.value)
                }
              />
              <button onClick={() => handleRemovePrescription(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleAddPrescription}>Add Prescription</button>
        </div>
        <div>
          <h2>General Examination Form</h2>
          {general_examination.map((general_exam, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="examing object"
                value={general_exam.examing_object}
                onChange={(e) =>
                  handleInputChange1(index, "examing_object", e.target.value)
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
              <button onClick={() => handleRemoveExamination(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleAddExamination}>Add General Examination</button>
        </div>
        <button onClick={handle_form_submit} className="btn btn-primary">
          Submit
        </button>

        <div>
        <button onClick={handle_history}>Show history</button>
        </div>
        {gotpatientdata === "True" &&
                (
                    <div>
                        <h3>Patient History</h3>
                        {personInfo.slice().reverse().map((personInfoentry) => (

                            <div className="personal-info">
                                <h5>Record: </h5>
                                <div>
                                    <span>StaffUID: </span>
                                    <span>{personInfoentry.who_u_id}</span>
                                </div>
                                <div>
                                    <span>Staff: </span>
                                    <span>{personInfoentry.who}</span>
                                </div>
                                <div>
                                    <span>Date: </span>
                                    <span>{personInfoentry.date_time}</span>
                                </div>
                                <div>
                                    {personInfoentry.complaints.length != 0 && (<span>
                                        <span>complaints: </span>
                                        <ol>
                                            {
                                                personInfoentry.complaints.map((test) => (
                                                    <li>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>)}
                                </div>
                                <div>
                                <span><span>general_examination: </span>
                                        <span>{JSON.stringify(personInfoentry.general_examination)}</span></span>
                                </div>
                                <div>
                                    {personInfoentry.lab_testing_to_be_done.length != 0 && (<span>
                                        <span>Lab_testing_to_be_done: </span>
                                        <ol>
                                            {
                                                personInfoentry.lab_testing_to_be_done.map((test) => (
                                                    <li>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>)}
                                </div>
                                <div>
                                  {/* <button onClick={handle_lab_files}>Show File</button> */}
                                  <span>
                                  <span>Lab Files Uploaded: </span>
                                        <ol>
                                            {
                                                personInfoentry.lab_report_files_id.map((test) => (
                                                    <li onClick={handle_lab_files} id={test.toString()}>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>
                                </div>
                                <div>{Object.keys(personInfoentry.medicines_prescribed).length != 0 &&
                                    (<span><span>Medicines_prescribed: </span>
                                        <span>{JSON.stringify(personInfoentry.medicines_prescribed)}</span></span>)
                                }
                                </div>
                                <div>
                                    {personInfoentry.extra_notes.length != 0 && (<span>
                                        <span>Extra Notes: </span>
                                        <ol>
                                            {
                                                personInfoentry.extra_notes.map((note) => (
                                                    <li>{note}</li>
                                                )
                                                )
                                            }
                                        </ol>
                                    </span>)}
                                </div>
                                <div>
                                    {personInfoentry.medicines_given.length != 0 && (<span>
                                        <span>medicines_given: </span>
                                        <ol>
                                            {
                                                personInfoentry.medicines_given.map((test) => (
                                                    <li>{test}</li>
                                                )
                                                )
                                            }
                                        </ol></span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                )
                        }


    </Fragment>
  );
};
