// AOS.init();
console.log("hello");
console.log(localStorage['jobpage']);
console.log(localStorage["jobId"]);
let Countryarr = [];

    const d = new Date ();
    
    const dateForValidation = "";
    formatDate(d);
    function formatDate(date) {
    var d = new Date(date),
     month = '' + (d.getMonth() + 1),
     day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
         month = '0' + month;
     if (day.length < 2) 
          day = '0' + day;

       this.dateForValidation = [year, month, day].join('-');
    }
    document.getElementById('lastDateToApply').setAttribute('min',this.dateForValidation);
console.log(this.dateForValidation)
const countriesDropDown = document.querySelector(".countryDrop");

console.log(countriesDropDown)
fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchAllCountry', {
method: 'GET',
}).then(function(rsp){
return rsp.json()}).then(function(data){
    console.log(data);
   
    // for(var i = 0 ; i< data.length; i++){
    // this.countryNameARR.push(data[i]);
    // }
    this.Countryarr = data;
    
    console.log(this.countryName);
    for (let item in data) {
    
    let option = document.createElement("option");
   option.setAttribute('value',data[item].countryName);

  let optionText = document.createTextNode(data[item].countryName);
   option.appendChild(optionText);

    countriesDropDown.appendChild(option);
}
    
 });
 function ApiforState(){
    console.log(this.Countryarr);
     document.querySelector(".statedrop").innerHTML = '';
    let countryName = document.querySelector(".countryDrop").value;
    let countryId = this.Countryarr[this.Countryarr.findIndex(arr=> arr.countryName == countryName )].id;
 console.log(countryId)
 fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchStateInfoByCountryId?countryId='+countryId, {
method: 'GET',

}).then(function(rsp){
return rsp.json()}).then(function(data){
    console.log(data);
   let statedropdown = document.querySelector(".statedrop");
    console.log(statedropdown);
    for (let item in data) {
    
    let option = document.createElement("option");
   option.setAttribute('value',data[item].stateName);

  let optionText = document.createTextNode(data[item].stateName);
   option.appendChild(optionText);
   statedropdown.appendChild(option);
}


});
 }
 




    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // const date1 = date.getDate();
    
    // console.log(year,date1,month)


console.log("inside script");
function submit(){
    var wklocation = document.getElementById('wklocation').value;
    
    var keySkills = document.getElementById('keySl').value;
    var wkmode = document.getElementById('wkmode').value;
 var jobTitle = document.getElementById('jobTitle').value;
 var noOfPost = document.getElementById('noOfPost').value;
 var descriptions = document.getElementById('descriptions').value;
 var qualificationRequired = document.getElementById('qualificationRequired').value;
 var experienceRequired = document.getElementById('experienceRequired').value;
 var specializationRequired = document.getElementById('specializationRequired').value;
 var lastDateToApply = document.getElementById('lastDateToApply').value;
 var salary = document.getElementById('salary').value;
 var jobType = document.getElementById('jobType').value;
 var companyName = document.getElementById('companyName').value;
 var logoUrl = document.getElementById('logoUrl').value;
 var website = document.getElementById('website').value;
 var email = document.getElementById('email').value;
 var address = document.getElementById('address').value;
 var country = document.getElementById('country').value;
 var state = document.getElementById('state').value;		
 var jobId = localStorage["jobId"];
 console.log(jobId);
 console.log(localStorage.getItem("jobpage"));
 
 this.value2 = true;
 var emailvalid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailvalid.test(email)){
        this.value2 = true;
    }else{
        
        this.value2 = false;
    } 
    console.log(this.value2)
    if(wklocation == ''|| keySkills == ''|| wkmode =='' || jobTitle ==''||noOfPost == ''||descriptions== ''|| qualificationRequired ==''||experienceRequired ==''||specializationRequired == ''||
    lastDateToApply == '' || jobType == '' || companyName == '' || email == '' || address == '' || country == '' || state ==''){
        alert("Please Fill All Mendatory Fields To Create A Job");
    }else if (this.value2 == false){
        alert("Please Enter Valid Email");
    }
    else{

    if( localStorage['jobpage'] == "fromJobPage") {
 console.log("inside if ");
 fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/saveOrUpdateJobsInfo', {
     method: 'POST',
     body: JSON.stringify({
     jobId:jobId,
     jobTitle:jobTitle,
     noOfPost:noOfPost,
     descriptions:descriptions,
     qualificationRequired:qualificationRequired,
     experienceRequired:experienceRequired,
     specializationRequired:specializationRequired,
     lastDateToApply:lastDateToApply,
     salary:salary,
     jobType:jobType,
     companyName:companyName,
     logoUrl:logoUrl,
     website:website,
     email:email,
     address:address,
     country:country,
     state:state,
     workMode:wkmode,
     keySkills: keySkills ,
     workLocation : wklocation
    }),
 headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
 }).then(function(response){ 
 return response.json()}).then(function(data)
 {
 console.log(data);
 
    console.log(data.message);
    if(data.message == undefined){
        alert("Data Uploaded Succefully");
    }
     
 
 document.getElementById('jobTitle').value ='';
document.getElementById('noOfPost').value ='';
document.getElementById('descriptions').value ='';
document.getElementById('qualificationRequired').value ='';
document.getElementById('experienceRequired').value ='';
document.getElementById('specializationRequired').value ='';
document.getElementById('lastDateToApply').value ='';
document.getElementById('salary').value ='';
document.getElementById('jobType').value ='';
document.getElementById('companyName').value ='';
document.getElementById('logoUrl').value ='';
document.getElementById('website').value ='';
document.getElementById('email').value = '';
document.getElementById('address').value = '';
document.getElementById('country').value = '';
document.getElementById('state').value = '';
document.getElementById('wklocation').value = '';
document.getElementById('keySl').value = '';
document.getElementById('wkmode').value = '';
localStorage["jobpage"] = '';
localStorage["jobId"]  = '';

 /*if(data){

  window.location.replace("AdminDashboard.html");    
  setTimeout("pageRedirect()", 10000);
  }*/
 }).catch(error => console.error('Error:', error));
    }else{
        console.log("inside elase ");
        fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/saveOrUpdateJobsInfo', {
     method: 'POST',
     body: JSON.stringify({
     
     jobTitle:jobTitle,
     noOfPost:noOfPost,
     descriptions:descriptions,
     qualificationRequired:qualificationRequired,
     experienceRequired:experienceRequired,
     specializationRequired:specializationRequired,
     lastDateToApply:lastDateToApply,
     salary:salary,
     jobType:jobType,
     companyName:companyName,
     logoUrl:logoUrl,
     website:website,
     email:email,
     address:address,
     country:country,
     state:state,
     workMode:wkmode,
     keySkills: keySkills ,
     workLocation : wklocation
    }),
 headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
 }).then(function(response){ 
 return response.json()}).then(function(data)
 {
 console.log(data);
 
    console.log(data.message);
    if(data.message == undefined){
        alert("Data Uploaded Succefully");
    }
     
 
 document.getElementById('jobTitle').value ='';
document.getElementById('noOfPost').value ='';
document.getElementById('descriptions').value ='';
document.getElementById('qualificationRequired').value ='';
document.getElementById('experienceRequired').value ='';
document.getElementById('specializationRequired').value ='';
document.getElementById('lastDateToApply').value ='';
document.getElementById('salary').value ='';
document.getElementById('jobType').value ='';
document.getElementById('companyName').value ='';
document.getElementById('logoUrl').value ='';
document.getElementById('website').value ='';
document.getElementById('email').value = '';
document.getElementById('address').value = '';
document.getElementById('country').value = '';
document.getElementById('state').value = '';
document.getElementById('wklocation').value = '';
document.getElementById('keySl').value = '';
document.getElementById('wkmode').value = '';

 /*if(data){

  window.location.replace("AdminDashboard.html");    
  setTimeout("pageRedirect()", 10000);
  }*/
 }).catch(error => console.error('Error:', error));
    }
}
           
}



window.addEventListener("pageshow", () => {
    jobTitleValue  = localStorage["jobTitle"]
noOfPostValue = localStorage["noOfPost"];
descriptionsValue = localStorage["descriptions"];
qualificationRequiredValue = localStorage["qualificationRequired"];
experienceRequiredValue = localStorage["experienceRequired"];
specializationRequiredValue = localStorage["specializationRequired"];
lastDateToApplyValue = localStorage["lastDateToApply"];
salaryValue = localStorage["salary"];
jobTypeValue = localStorage["jobType"];
companyNameValue = localStorage["companyName"];
logoUrlValue = localStorage["logoUrl"];
websiteValue = localStorage["website"];
emailValue = localStorage["email"];
addressValue = localStorage["address"];
stateValue = localStorage["state"];
countryValue = localStorage["country"];
console.log(countryValue);
workMode = localStorage["workmode"] ;
workLocation = localStorage["worklocation"];
keySkills = localStorage["keySl"] ;
if( localStorage.getItem("jobpage") == "fromJobPage") {
    console.log("inside Function");
 document.getElementById('jobTitle').value = jobTitleValue;
 document.getElementById('noOfPost').value = noOfPostValue;
 document.getElementById('descriptions').value = descriptionsValue;
 document.getElementById('qualificationRequired').value = qualificationRequiredValue;
 document.getElementById('experienceRequired').value = experienceRequiredValue;
 document.getElementById('specializationRequired').value = specializationRequiredValue;
 document.getElementById('lastDateToApply').value = lastDateToApplyValue;
 document.getElementById('salary').value = salaryValue;
 document.getElementById('jobType').value = jobTypeValue;
 if(companyNameValue){
 document.getElementById('companyName').value = companyNameValue;}
//  if(logoUrlValue){
//  document.getElementById('logoUrl').value = logoUrlValue;}
 if(websiteValue){
 document.getElementById('website').value = websiteValue;}
 if(emailValue){
 document.getElementById('email').value = emailValue;}
 if(addressValue){
 document.getElementById('address').value = addressValue;}
 if(countryValue){
    document.getElementById('country').value = countryValue;}
 if(stateValue){
 document.getElementById('state').value = stateValue;}
 
 if(workMode){
    document.getElementById('wkmode').value = workMode
 }
 if(workLocation){
    var wklocation = document.getElementById('wklocation').value = workLocation;
 }
 if(keySkills){
    document.getElementById('keySl').value = keySkills;
 }

 localStorage["jobTitle"] = '';
 localStorage["noOfPost"] = '';
 localStorage["descriptions"] = '';
 localStorage["qualificationRequired"] = '';
 localStorage["experienceRequired"] = '';
 localStorage["specializationRequired"] = '';
 localStorage["lastDateToApply"] = '';
 localStorage["salary"] = '';
 localStorage["jobType"] = '';
 localStorage["companyName"] = '';
 localStorage["logoUrl"] = '';
 localStorage["website"] = '';
 localStorage["email"] = '';
 localStorage["address"] = '';
 localStorage["state"] = '';
 localStorage["country"] = '';
 localStorage["workmode"] = '';
localStorage["worklocation"] = '';
localStorage["keySl"] = '';
// localStorage["jobpage"] = '';
// localStorage["jobId"]  = '';

}
else{
    document.getElementById('wklocation').value = '';
document.getElementById('keySl').value = '';
document.getElementById('wkmode').value = '';
document.getElementById('jobTitle').value = '';
document.getElementById('noOfPost').value = '';
document.getElementById('descriptions').value = '';
document.getElementById('qualificationRequired').value = '';
document.getElementById('experienceRequired').value = '';
document.getElementById('specializationRequired').value = '';
document.getElementById('lastDateToApply').value = '';
document.getElementById('salary').value = '';
document.getElementById('jobType').value = '';
document.getElementById('companyName').value = '';
document.getElementById('logoUrl').value = '';
document.getElementById('website').value = '';
document.getElementById('email').value = '';
document.getElementById('address').value = '';
document.getElementById('country').value = '';
document.getElementById('state').value = '';

}
})