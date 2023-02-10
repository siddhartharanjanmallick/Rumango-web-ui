var mobile = document.getElementById("mobile");
mobile.setAttribute("maxlength", "10");

const d = new Date();

const dateForValidation = "";
formatDate(d);
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  this.dateForValidation = [year, month, day].join("-");
}
console.log(this.dateForValidation);
var data = JSON.parse(localStorage.getItem("jobDetails"));
console.log(data);
var jobId = data[0].jobId;
console.log(jobId);
// const url=devUrl;
//  console.log("devUrl", url);
if (data) {
  //     console.log(data);
  document.getElementById("datePost").innerHTML = data[0].lastDateToApply;
  document.getElementById("location").innerHTML = data[0].workLocation;
  document.getElementById("salary").innerHTML = data[0].salary + "/Yearly";
  document.getElementById("position").innerHTML = data[0].jobTitle;
  document.getElementById("gender").innerHTML = "Both";
  document.getElementById("exprience").innerHTML =
    data[0].experienceRequired + " year";
  document.getElementById("qulification").innerHTML =
    data[0].qualificationRequired;
  document.getElementById("role").innerHTML = data[0].specializationRequired;
  // document.getElementById("responsibilities").innerHTML = data[0].specializationRequired;
  document.getElementById("jobLocation").innerHTML = data[0].workLocation;
  document.getElementById("lastDate").innerHTML = data[0].lastDateToApply;
  document.getElementById("annualSalary").innerHTML =
    data[0].salary + "/Yearly";
  document.getElementById("jobTitle").innerHTML = data[0].jobTitle;
  document.getElementById("jobDesc").innerHTML = data[0].descriptions;
  document.getElementById("exc").innerHTML = data[0].experienceRequired;
  document.getElementById("jobRole").innerHTML = data[0].jobTitle;
  document.getElementById("keyskills").innerHTML = data[0].keySkills;
}
// function submitCheck(){
//     console.log(document.getElementById('submitbtn').disabled);
//     if(document.getElementById('ctc').value!=='' && document.getElementById('firstName').value!=='' && document.getElementById('lastName').value!==''
//     && document.getElementById('mobile').value!=='' && document.getElementById('email').value!=='' && document.getElementById('sourceId').value!==''
//     && document.getElementById('joiningTime').value!=='' )
//     document.getElementById('submitbtn').disabled = false;
//     else
//     document.getElementById('submitbtn').disabled = true;
//     console.log(document.getElementById('submitbtn').disabled);
//   }

function submit() {
  console.log("inside submit()");

  var emailFlag = true;
  var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailReg.test(document.getElementById("email").value)) {
    emailFlag = true;
  } else {
    emailFlag = false;
  }

  if (
    document.getElementById("firstName").value === "" ||
    document.getElementById("lastName").value === "" ||
    document.getElementById("mobile").value === "" ||
    document.getElementById("email").value === "" ||
    document.getElementById("sourceId").value === "" ||
    document.getElementById("joiningTime").value === "" ||
    document.getElementById("skills").value === ""||
    document.getElementById("totalExperience").value  === "" ||
    document.getElementById("relevantExperience").value  === ""||
    document.getElementById("currentCtc").value  === ""||
    document.getElementById("expectedCtc").value   === ""||
    document.getElementById("currentLocation").value  === ""||
    document.getElementById("currentOrganization").value === ""
  ) {
    swal({
      text: "Please fill all the mandatory field!",
      icon: "error",
      buttons: "Ok",
      dangerMode: true,
    });
  } else if (!emailFlag) {
    swal({
      text: "Please fill valid email address!",
      icon: "error",
      buttons: "Ok",
      dangerMode: true,
    });
  } else if (document.getElementById("resumeLink").value === "") {
    swal({
      text: "Please upload resume!",
      icon: "error",
      buttons: "Ok",
      dangerMode: true,
    });
  } else {
    var firstName = document.getElementById("firstName").value;
    var middleName = document.getElementById("middleName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var sourceId = document.getElementById("sourceId").value;
    var socialNetworkLink = document.getElementById("socialNetworkLink").value;
    var skills = document.getElementById("skills").value ;
    var totalExperience = document.getElementById("totalExperience").value ;
    var relevantExperience = document.getElementById("relevantExperience").value;
    var currentCtc = document.getElementById("currentCtc").value ;
    var expectedCtc = document.getElementById("expectedCtc").value  ;
    var currentLocation = document.getElementById("currentLocation").value ;
    var currentOrganization = document.getElementById("currentOrganization").value ;
    // console.log(resumeURL);
    // var resumeLink = document.getElementById('resumeLink').value;
    var joiningTime = document.getElementById("joiningTime").value;
    //var isReadyToRelocate = document.getElementById('isReadyToRelocate').value;
    var isReadyToRelocate = true;
    // var ctc = document.getElementById('ctc').value;
    console.log(this.dateForValidation);
    var resumeLinkForAPi;
    var resumeLink = document.getElementById("resumeLink");
    let formData = new FormData();
    formData.append("file", resumeLink.files[0]);
    fetch(
      "http://192.168.0.14:8081/RumangoWebsite/applicant-api/uploadResume",
      {
        method: "POST",
        body: formData,
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (resumeData) {
        console.log(resumeData);
        swal({
          text: resumeData.message,
          icon: "success",
          buttons: "Ok",
          dangerMode: true,
        });
        resumeURL = resumeData;
        console.log(resumeURL);
        this.resumeLinkForAPi = resumeURL.data;
        console.log(resumeURL.data);
        fetch("http://192.168.0.14:8081/RumangoWebsite/applicant-api/saving", {
          method: "POST",
          body: JSON.stringify({
            //APPLICANT_ID:'2345',
            jobId: jobId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            skills:skills,
            totalExperience:totalExperience,
            relevantExperience:relevantExperience,
            currentCtc:currentCtc,
            expectedCtc:expectedCtc,
            currentOrganization:currentOrganization,
            currentLocation:currentLocation,
            mobile: mobile,
            appliedDate: this.dateForValidation,
            sourceId: sourceId,
            socialNetworkLink: socialNetworkLink,
            resumeLink: resumeURL.data,
            joiningTime: joiningTime,
            isReadyToRelocate: isReadyToRelocate,
            
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            //if(data){
            //window.location.replace("AdminDashboard.html");
            //setTimeout("pageRedirect()", 10000);
            //}

            swal({
              text: "The applicant details uploaded successfully",
              icon: "success",
              buttons: "Ok",
              dangerMode: true,
            });
            document.getElementById("firstName").value = "";
            document.getElementById("middleName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("sourceId").value = "";
            document.getElementById("socialNetworkLink").value = "";
            document.getElementById("resumeLink").value = "";
            document.getElementById("joiningTime").value = "";
            document.getElementById("isReadyToRelocate").value = "";
            //  document.getElementById('ctc').value='';
            document.getElementById("skills").value = '';
            document.getElementById("totalExperience").value = '';
            document.getElementById("relevantExperience").value = '';
            document.getElementById("currentCtc").value = '';
            document.getElementById("expectedCtc").value = '';
            document.getElementById("currentLocation").value = '';
            document.getElementById("currentOrganization").value = '';
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  }
}

// function check() {
//    var event = document.getElementById("mobile").value;
//   console.log("inside ");
//   const pattern = /[0-9]/;
//   let inputChar = String.fromCharCode(event.charCode);
//   if (!pattern.test(inputChar)) {
//     event.preventDefault();
//   }
// }
