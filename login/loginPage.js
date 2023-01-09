AOS.init();

       

console.log("inside script");
function verifyCredentials(){
var email = document.getElementById('userName').value;
var password = document.getElementById('password').value;  

const url=devUrl;
   console.log("devUrl", url);

console.log(userName);
console.log(password);
if(password==='' && userName===''){
    alert("Please enter email and Password")
} else if(password!=='' && userName===''){
    alert("Please enter email")
} else if(password==='' && userName!==''){
    alert("Please enter Password")
}else{
fetch('http://192.168.0.14:8081/RumangoWebsite/login-api/authentication', {
method: 'POST',
body: JSON.stringify({
email:email,
password:password
}),
headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
}).then(function(response){ 
return response.json()}).then(function(data)
{
    console.log(data)
 if(data){
  window.location.replace("../admin-dashboard/AdminDashboard.html");    
//   setTimeout("pageRedirect()", 10000);
  }
//userName=document.getElementById("title")
//passWord=document.getElementById("bd")
//userName.innerHTML = data.userName
//password.innerHTML = data.password  
}).catch(error => alert("Invalid Credentials")); 
}
}
