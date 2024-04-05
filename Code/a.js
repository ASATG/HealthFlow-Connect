document.getElementById('submitBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    await handle_submit(event);
  });
  
  async function handle_submit(event) {
    const response = await axios.post(
      "http://localhost:3500/doctor/download_lab_report_by_file_id",
      {
        lab_report_file_id_string: document.getElementById("field_1").value,
        filename: document.getElementById("field_2").value,
      },
      { responseType: "blob" }
    );
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(response.data);
    link.download = document.getElementById("field_2").value;
    link.click();
  }
  