function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    }

   function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
   }
   console.log("inside script");

   var jobId= localStorage.getItem("jobId");
console.log(jobId);
document.getElementById('submitbtn').disabled=true;

fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchJobsInfoById?jobId='+jobId, {
     method: 'GET',         
    }).then(function(response){ 
         return response.json()}).then(function(data)
    {
      console.log(data);
      document.getElementById("datePost").innerHTML = data.lastDateToApply;
      document.getElementById("location").innerHTML = data.workLocation;
      document.getElementById("salary").innerHTML = data.salary + "/Yearly";
      document.getElementById("position").innerHTML = data.jobTitle;
      document.getElementById("gender").innerHTML = "Both";
      document.getElementById("exprience").innerHTML = data.experienceRequired + "year";
      document.getElementById("qulification").innerHTML = data.qualificationRequired;
      document.getElementById("role").innerHTML = data.specializationRequired;
      document.getElementById("jobLocation").innerHTML=data.workLocation;
      document.getElementById("lastDate").innerHTML=data.lastDateToApply;
      document.getElementById("annualSalary").innerHTML=data.salary+ "/Yearly";
      document.getElementById("jobTitle").innerHTML=data.jobTitle;
      document.getElementById("jobDesc").innerHTML=data.descriptions;
      document.getElementById("exc").innerHTML=data.experienceRequired;
      document.getElementById("jobRole").innerHTML=data.jobTitle;
      document.getElementById("skills").innerHTML=data.keySkills;

    });

    function submitCheck(){
      console.log(document.getElementById('submitbtn').disabled);
      if(document.getElementById('ctc').value!=='' && document.getElementById('firstName').value!=='' && document.getElementById('lastName').value!==''
      && document.getElementById('mobile').value!=='' && document.getElementById('email').value!=='' && document.getElementById('sourceId').value!==''
      && document.getElementById('joiningTime').value!=='' )
      document.getElementById('submitbtn').disabled = false;
      else
      document.getElementById('submitbtn').disabled = true;
      console.log(document.getElementById('submitbtn').disabled);
    }
   
    function submit(){
      console.log("inside submit()");

      if(document.getElementById('ctc').value==='' || document.getElementById('firstName').value==='' || document.getElementById('lastName').value===''
      || document.getElementById('mobile').value==='' || document.getElementById('email').value==='' || document.getElementById('sourceId').value===''
      || document.getElementById('joiningTime').value==='' ){
      alert('Please fill all te manditory field');
      }else{
    var firstName = document.getElementById('firstName').value;
    var middleName = document.getElementById('middleName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;
    var sourceId = document.getElementById('sourceId').value;
    var socialNetworkLink = document.getElementById('socialNetworkLink').value;
// console.log(resumeURL);
    var resumeLink = document.getElementById('resumeLink').value;
    var joiningTime = document.getElementById('joiningTime').value;
    //var isReadyToRelocate = document.getElementById('isReadyToRelocate').value;
    var isReadyToRelocate = true;
    var ctc = document.getElementById('ctc').value;		
    console.log(firstName);
    console.log(ctc);   
    fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/saving', {
    method: 'POST',
    body: JSON.stringify({
    //APPLICANT_ID:'2345',
    jobId:jobId,
    firstName:firstName,
    middleName:middleName,
    lastName:lastName,
    email:email,
    mobile:mobile,
    sourceId:sourceId,
    socialNetworkLink:socialNetworkLink,
    resumeLink:resumeLink,
    joiningTime:joiningTime,
    isReadyToRelocate:isReadyToRelocate,
    ctc:ctc
    }),
    headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(function(response){ 
    return response.json()}).then(function(data)
    {console.log(data)
     //if(data){
      //window.location.replace("AdminDashboard.html");    
      //setTimeout("pageRedirect()", 10000);
      //}
    }).catch(error => console.error('Error:', error));
       alert('The applicant details uploaded successfully.');		
   }
  }
    var resumeURL;
    async function uploadResume() {
    console.log("inside uploadResume()");
    alert('Please upload resume only in pdf/doc/docx/jpg/jpeg formats');
     //var resumeLink = document.getElementById('resumeLink').value;
     let formData = new FormData();           
     formData.append("file", resumeLink.files[0]);
     await fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/uploadResume', {
     method: "POST", 
     body: formData
    }).then(function(response){ 
    return response.json()}).then(function(resumeData)
    {
     console.log(resumeData);
     resumeURL=resumeData;
     console.log(resumeURL);
     console.log(resumeURL.data);
    }).catch(error => console.error('Error:', error));    
    alert('The file has been uploaded successfully.');
       }
    
    
    /*		function uploadResume(){
     var resumeLink = document.getElementById('resumeLink').value;
     console.log(resumeLink);   
     fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/uploadResume', {
      method: 'POST',
      body: JSON.stringify({
      resumeLink:resumeLink
    }),
    
    }).then(function(response){ 
    return response.json()}).then(function(data)
    {
     console.log(data);
    }).catch(error => console.error('Error:', error)); 
    }    */
