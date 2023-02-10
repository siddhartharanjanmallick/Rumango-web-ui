// AOS.init();

       

console.log("inside script");
function verifyCredentials(){
var email = document.getElementById('userName').value;
var password = document.getElementById('password').value;  

// const url=devUrl;
//    console.log("devUrl", url);

console.log(userName);
console.log(password);
if(password==='' && email===''){
    swal({
      text: "Please enter email and Password" ,
      icon: "error",
      buttons: "Ok",
      dangerMode: true
    })
} else if(password!=='' && email===''){
   
    swal({
      text: "Please enter email" ,
      icon: "error",
      buttons: "Ok",
      dangerMode: true
    })
} else if(password==='' && email!==''){
    swal({
      text: "Please enter Password" ,
      icon: "error",
      buttons: "Ok",
      dangerMode: true
    })
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
}).catch(error => {
swal({
  text: "Invalid Credentials" ,
  icon: "error",
  buttons: "Ok",
  dangerMode: true
})
}); 
}
}

function forgotPswd(){
var blur = document.getElementById("blur");
blur.classList.toggle('active');

var popup = document.getElementById("popup");
popup.classList.toggle('active');

}

function resetPassword() {
  var email = document.getElementById("fuser").value;
  var passWord = document.getElementById("fpassword").value;
  var cPassword = document.getElementById("cnfPassword").value;
  console.log(email , passWord,cPassword);
if(email == '' || passWord == '' || cPassword == '' ){
  if (email == '') {
       
    swal({
      text: "Please Enter Email" ,
      icon: "error",
      buttons: "Ok",
      dangerMode: true
    })
  }
  else if(passWord == '' || cPassword == ''){
    swal({
      text: "Please Enter Password" ,
      icon: "error",
      buttons: "Ok",
      dangerMode: true
    })
  }
}else{
  if(passWord != cPassword){
    swal({
      text: "Password is not matching" ,
      icon: "error",
      buttons: "Ok",
      dangerMode: true
    })
  }else{
    console.log("Calling");
    fetch('http://192.168.0.14:8081/RumangoWebsite/login-api/forgotPassword', {
method: 'POST',
body: JSON.stringify({
email:email,
newPassword:cPassword
}),
headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
}).then(function(response){ 
  return response.json()}).then(function(data)
  {
      console.log(data.message)

      if( data.message == "Data not Found"){
        swal({
          text: "Please Enter valid Email" ,
          icon: "error",
          buttons: "Ok",
          dangerMode: true
        })
      }else{
       swal({
    text: data.message ,
    icon: "success",
    buttons: "Ok",
    dangerMode: true
  }).then(()=>{
    var blur = document.getElementById("blur");


var popup = document.getElementById("popup");
blur.classList.remove("active")
popup.classList.remove("active")
email = '' ;
 passWord = '' ;
 cPassword = '';




  })
      }
  }).catch(error => {
  // swal({
  //   text: "Invalid Credentials" ,
  //   icon: "error",
  //   buttons: "Ok",
  //   dangerMode: true
  // })
  }); 
  

  }
}

  
}
