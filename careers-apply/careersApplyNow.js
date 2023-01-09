function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  var jobId= localStorage.getItem("jobId");
  console.log(jobId);
  const url=devUrl;
   console.log("devUrl", url);
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
  
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }