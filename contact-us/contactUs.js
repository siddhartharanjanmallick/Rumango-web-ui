// AOS.init();
console.log("hello");
  function routing(){
    localStorage["navlink"] = "Careers";
    window.location.replace("../careers/careers.html");
  }
  
  function submit(){
   console.log("inside submit()");
   var name = document.getElementById('name').value;       
   var email = document.getElementById('email').value;
   var mobile = document.getElementById('mobileNum').value;
   var message = document.getElementById('message').value;
    console.log(name);
    console.log(mobile); 
    var phoneno = /^\d{10}$/;
    var value1= true;
    var value2 = true;
    if(mobile.match(phoneno))
    {
      console.log("working true");
      this.value1 = true;  
    }
    else
    {
      this.value1 = false;
    }
    var emailvalid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailvalid.test(email)){
        this.value2 = true;
        console.log("condition1")
    }else{
        console.log("condition2")
        this.value2 = false;
    }
    console.log(message) 
    if(name == ''|| mobile == '' || message == '' || email == ''){
      alert("Please Fill All Mendarory Fields")
    }else if(this.value1 == false ) {
      alert("Not a valid Phone Number");
  
    } else if (this.value2 == false){
        alert("Please Enter Valid Email");
    }
     else {
    fetch('http://192.168.0.14:8081/RumangoWebsite/contact-api/saveMessageInfo', {
     method: 'POST',
     body: JSON.stringify({
         name:name,
           email:email,
           phoneNumber:mobile,
           message:message
      }),
      headers: {
       'Content-type': 'application/json; charset=UTF-8',
      }
    }).then(function(response) { 
          return response.json()
        }).then(function(data)
          {
            console.log(data)
            if(data){
              alert('The message is uploaded successfully.');	
              document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
  document.getElementById('mobileNum').value = '';
            }
                //if(data){
            //window.location.replace("AdminDashboard.html");    
            //setTimeout("pageRedirect()", 10000);
                //}
          }).catch(error => console.error('Error:', error));}
                 
  }