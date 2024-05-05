import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingJob = null;

export const handleAddEdit = () => {

    addEditDiv = document.getElementById("edit-job");
    company = document.getElementById("company");
    position = document.getElementById("position");
    status = document.getElementById("status");
    addingJob = document.getElementById("adding-job");
    const editCancel = document.getElementById("edit-cancel");

    //create job entries
    addEditDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
          if (e.target === addingJob) {
            enableInput(false);
      
            let method = "POST";
            let url = "/api/v1/jobs";

            //to make the update button work

            if (addingJob.textContent === "update") {
                method = "PATCH";
                url = `/api/v1/jobs/${addEditDiv.dataset.id}`;
              }
              //.......

            try {
              const response = await fetch(url, {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  company: company.value,
                  position: position.value,
                  status: status.value,
                }),
              });
      
              const data = await response.json();

              if (response.status === 200 || response.status === 201) {

                        if (response.status === 200) {

                        // a 200 is expected for a successful update
                        message.textContent = "The job entry was updated.";
                        } else {

                        // a 201 is expected for a successful create
                        message.textContent = "The job entry was created.";
                        }

                        company.value = "";
                        position.value = "";
                        status.value = "pending";
            
                        showJobs();
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {
              console.log(err);
              message.textContent = "A communication error occurred.";
            }
      
            enableInput(true);
          } else if (e.target === editCancel) {
            message.textContent = "";
            showJobs();
          }
        }
      });
    // end of create job entries
};


// export const showAddEdit = (job) => {
//   message.textContent = "";
//   setDiv(addEditDiv);
// };

//to show the edit div

/**
 * With this change, the add/edit div will be displayed with the appropriate values. 
 * If an add is being done, the function is called with a null parameter, and the form comes up blank with an add button.
 *  If an edit is being done, the function is called with the id of the entry to edit. The job is then retrieved from 
 * the database and the input fields are populated, and the button is changed to say update. 
 * We also store the id of the entry in the dataset.id of the addEdit div, so we keep track of which entry is to be updated.
 */

export const showAddEdit = async (jobId) => {
    if (!jobId) {
      company.value = "";
      position.value = "";
      status.value = "pending";
      addingJob.textContent = "add";
      message.textContent = "";
  
      setDiv(addEditDiv);
    } else {
      enableInput(false);
  
      try {
        const response = await fetch(`/api/v1/jobs/${jobId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.status === 200) {
          company.value = data.job.company;
          position.value = data.job.position;
          status.value = data.job.status;
          addingJob.textContent = "update";
          message.textContent = "";
          addEditDiv.dataset.id = jobId;
  
          setDiv(addEditDiv);
        } else {
          // might happen if the list has been updated since last display
          message.textContent = "The jobs entry was not found";
          showJobs();
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showJobs();
      }
  
      enableInput(true);
    }
  };


  export const showDelete = async (jobId) => {
    enableInput(false);
    try {
      const response = await fetch(`/api/v1/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        addingJob.textContent = "delete";
        message.textContent = data.msg;
        showJobs();
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The jobs entry was not found";
        showJobs();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showJobs();
    }
    enableInput(true);
  };