import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js"

export const Print_Case_Paper = () => {
  const [uId, setUId] = useState("");
  const [casePaper, setcasePaper] = useState({});
  const [history, sethistory] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user_designation") !== "Counter") {
      navigator("/", { replace: true });
    }
  }, []);
  const handle_print1 = () => {
    const divToConvert = document.getElementById("printing_case_paper");

    const options = {
      margin: 1,
      filename: "casepaper.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Convert the div contents to PDF
    html2pdf().from(divToConvert).set(options).save();
  };

  const handle_form_submit = async (event) => {
    event.preventDefault();
    const result = await axios.post(
      "http://localhost:3500/counter/get_active_case_paper_of_patient",
      { patient_u_id: uId }
    );
    if (result.data.success_status) {
      setcasePaper(result.data.ans);
      const is_active_case_paper_api_call = await axios.post("http://localhost:3500/counter/get_all_case_papers_of_patients", { patient_u_id: uId })
      if (is_active_case_paper_api_call.data.success_status) {
        const arr = is_active_case_paper_api_call.data.ans;
        for (const i of arr) {
          if (i.is_active === true) {
            console.log(i);
            sethistory(i.all_history)
          }
        }
      }
      else {
        window.alert("No active case paper found so please add first active case paper and then add redirection record");
      }
    } else {
      window.alert(result.data.error_message);
    }
  };

  const handle_print = async (event) => {
    event.preventDefault();
    let api_call1 = await axios.post(
      "http://localhost:3500/get_phone_number_from_uid",
      { u_id: uId }
    );
    if (api_call1.data.success_status) {
      const phoneNumber = api_call1.data.phone_number;
      // let api_call = await axios.post("http://localhost:3500/otp/sendOTP", { phoneNumber: phoneNumber });
      // if (api_call.data.success_status) {
      //     const backend_otp = api_call.data.otp;
      //     let otp_entered = prompt(`Please enter OTP sent to patient at number ${phoneNumber}`, '');
      //     if (otp_entered === backend_otp) {
      //         window.alert("OTP Verification Successfull");
      //         const result = await axios.post("http://localhost:3500/counter/mark_latest_active_case_paper_inactive", { patient_u_id: uId });
      //         if (result.data.success_status === false) {
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
        const result = await axios.post(
          "http://localhost:3500/counter/mark_latest_active_case_paper_inactive",
          { patient_u_id: uId }
        );
        if (result.data.success_status === false) {
          window.alert(result.data.error_message);
        }else{
          window.alert("Please Print the Case Paper")
        }
      } else {
        window.alert("OTP Verification Failed");
      }
    } else {
      window.alert(api_call1.data.error_message);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center landing-page">
        <div
          className="card w-50 "
          style={{
            padding: 10,
            borderRadius: "15px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h1 className="card-header text-center" style={{ padding: 20 }}>
            Print Case Paper
          </h1>
          <div className="card-body">
            <form onSubmit={handle_form_submit}>
              <div className="mb-3" style={{ padding: "10px 10px 10px 10px" }}>
                <label htmlFor="requested_uid">Enter Patient's UID:</label>
                <input
                  type="text"
                  id="requested_uid"
                  name="requested_uid"
                  className="form-control"
                  value={uId}
                  onChange={(e) => setUId(e.target.value)}
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
            {Object.keys(casePaper).length !== 0 && (
              <div  style={{ padding: "10px 10px 10px 10px" }}>
                <div id="printing_case_paper">
                <h2>Patient Case Paper</h2>
                <div className="personal-info">
                  <div
                    className="mb-3"
                    style={{ padding: "10px 10px 5px 10px" }}
                  >
                    <span>Start Date: </span>
                    <span>{casePaper.start_date_time}</span>
                  </div>
                  {casePaper.history_id_array.length > 0 && history.length > 0 && (
                    <div
                      className="mb-3"
                      style={{ padding: "10px 10px 5px 10px" }}
                    >
                      <h3>{history[0].patient_name}</h3>
                      {history.map((each,index) => (
                        <div>
                          <hr />
                          <div class="form-group">
                            <span><strong>Sr no. :  </strong></span>
                            <span><strong>{index+1} </strong></span>
                            {/* <span style={{ marginBottom: "10px" }}><strong>{each.date_time}</strong></span> */}
                          </div>
                          <div class="form-group">
                            <span><strong>Date & Time:</strong> </span>
                            <span style={{ marginBottom: "10px" }}><strong>{each.date_time}</strong></span>
                          </div>
                          <div class="form-group">
                            <span>Staff UID: </span>
                            <span style={{ marginBottom: "10px" }}>{each.staff_u_id}</span>
                          </div>
                          <div class="form-group">
                            <span>Staff Name: </span>
                            <span style={{ marginBottom: "10px" }}>{each.staff_name}</span>
                          </div>
                          <div class="form-group">
                            <span>Staff Designation: </span>
                            <span style={{ marginBottom: "10px" }}>{each.staff_designation}</span>
                          </div>
                          {each.complaints && each.complaints.length > 0 && (
                            <div class="form-group">
                              <span>Complaint: </span>
                              <ol>
                                {
                                  each.complaints.map((com) => (
                                    <li>{com}</li>
                                  ))
                                }
                              </ol>
                            </div>
                          )}
                          <div class="form-group">
                          <p>General Examination:</p>
                          {each.general_examination ? (
                            <ol>
                              {Object.entries(
                                each.general_examination
                              ).map(([key, value]) => (
                                <li key={key}>
                                  <strong>{key}:</strong> {value}
                                </li>
                              ))}
                            </ol>
                          ) : ""}
                        </div >
                          {/* {each.general_examination && (<div class="form-group">
                            <span>General Examination: </span>
                            <span style={{ marginBottom: "10px" }}>{JSON.stringify(each.general_examination)}</span>
                          </div>)}
                          {each.lab_testing_to_be_done && each.lab_testing_to_be_done.length > 0 && (
                            <div class="form-group">
                              <span>Lab Testing To Be Done: </span>
                              <ol>
                                {
                                  each.lab_testing_to_be_done.map((com) => (
                                    <li>{com}</li>
                                  ))
                                }
                              </ol>
                            </div>
                          )} */}
                          <div class="form-group">
                          <p>Medicines Prescribed:</p>
                          <ol>
                            {each.medicines_prescribed && each.medicines_prescribed.length > 0 && each.medicines_prescribed.map(
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
                          {each.extra_notes && each.extra_notes.length !== 0 && (
                            <span style={{marginBottom:"10px"}}>
                              <p>Extra Notes: </p>
                              <ol>
                                {each.extra_notes.map((note) => (
                                  <li>{note}</li>
                                ))}
                              </ol>
                            </span>
                          )}
                        </div>
                          {/* {each.medicines_given && each.medicines_given.length > 0 && (
                            <div class="form-group">
                              <span>Medicines Given: </span>
                              <ol>
                                {
                                  each.medicines_given.map((com) => (
                                    <li>{JSON.stringify(com)}</li>
                                  ))
                                }
                              </ol>
                            </div>
                          )} */}
                          <div class="form-group">
                          {each.medicines_given && each.medicines_given.length > 0 && (
                            <span>
                              <span style={{marginBottom:"10px"}}>Medicines Given: </span>
                              <ol>
                                {each.medicines_given.map((test) => (
                                  <li>{test}</li>
                                ))}
                              </ol>
                            </span>
                          )}
                        </div>
                          {each.lab_report_ids && each.lab_report_ids.length > 0 && (
                            <div class="form-group">
                              <span>Lab Report Ids: </span>
                              <ol>
                                {
                                  each.lab_report_ids.map((com) => (
                                    <li>{JSON.stringify(com)}</li>
                                  ))
                                }
                              </ol>
                            </div>
                          )}
                          <p />
                        </div>
                      ))}
                      <hr />
                    </div>
                    
                  )}
                  {/* <hr /> */}
                </div>
                </div>
                <div className="footer d-flex justify-content-between align-items-center">
                <button
                  onClick={(e) => navigator("/counter/home_page")}
                  className="btn btn-secondary"
                  style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                  }}
                >
                  Back
                </button>
                  <button
                    onClick={handle_print}
                    className="btn btn-primary "
                    style={{
                      marginLeft: "10px",
                      padding: "10px 50px 10px 50px",
                    }}
                  >
                    Close Case Paper
                  </button>
                  <button
                  onClick={handle_print1}
                  className="btn btn-secondary"
                  style={{
                    marginRight: "10px",
                    padding: "10px 60px 10px 60px",
                  }}
                >
                  Print
                </button>
                </div>
                
                {/* <button onClick={handle_print1}>Test Print</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <h1>Print Case Paper</h1> */}
      {/* <form onSubmit={handle_form_submit}>
                <div>
                    <label htmlFor="requested_uid">Enter Patient's UID:</label>
                    <input
                        type="text"
                        id="requested_uid"
                        name="requested_uid"
                        value={uId}
                        onChange={(e) => setUId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form> */}
      {/* {
                Object.keys(casePaper).length !== 0 &&
                (
                    <div>
                        <h3>Patient History</h3>
                        <div className="personal-info">
                            <div>
                                <span>Start Date: </span>
                                <span>{casePaper.start_date_time}</span>
                            </div>
                            {casePaper.history_id_array.length > 0 && (<div>
                                <span>
                                    <span>History Ids: </span>
                                    <ol>
                                        {
                                            casePaper.history_id_array.map((id) => (
                                                <li>{id}</li>
                                            )
                                            )
                                        }
                                    </ol></span>
                            </div>)}
                        </div>
                        <button onClick={handle_print}>Print</button>
                    </div>
                )
            } */}
    </Fragment>
  );
};