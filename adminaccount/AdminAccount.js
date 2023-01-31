
		function goTologin(){
            window.location.replace("../login/loginPage.html"); 
        }
		console.log("inside script");
        document.getElementById('continuebtn').disabled = true;
        var samePass=true;

        // const url=devUrl;
        //  console.log("devUrl", url);

        function showPass(){
            if(document.getElementById('password').type==="password")
            document.getElementById('password').type="text";
            else{
                document.getElementById('password').type="password";
            }
        }

        function showConfirmPass(){
            if(document.getElementById('cPassword').type==="password")
            document.getElementById('cPassword').type="text";
            else{
                document.getElementById('cPassword').type="password";
            }
        }

        function checkpass(){
            if(document.getElementById('cPassword').value===document.getElementById('password').value){
                samePass=true;
            }
            else{
                samePass=false;
            }
        }

        function submitCheck(){
            if(document.getElementById('userName').value!=='' && document.getElementById('email').value!=='' && document.getElementById('password').value!==''
          && document.getElementById('cPassword').value!=='' && samePass ){
          console.log("if");
          document.getElementById('continuebtn').disabled = false;}
          else{
            console.log("if");
          document.getElementById('continuebtn').disabled = true;
          console.log(document.getElementById('continuebtn').disabled);}
        }

        
console.log("reached here")
        function submit(){
            console.log("inside here")
		 var userName = document.getElementById('userName').value;
         var password = document.getElementById('password').value;
		 var email = document.getElementById('email').value;
		 console.log(userName,password);
         console.log(email);   
         fetch('http://192.168.0.14:8081/RumangoWebsite/user-api/upsertUser', {
          method: 'POST',
          body: JSON.stringify({
	      userName:userName,
          encryptedPassword:password,
		  email:email,
		  mobile:"9687656784"
        }),
        headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(function(response){ 
        return response.json()}).then(function(data)
        {
		 console.log(data);
         if(data.message){
            alert(data.message);
         }else{   
            document.getElementById('userName').value = '';
 document.getElementById('password').value = '';
 document.getElementById('email').value = '';
       alert("user created successfully")}
        }).catch(error => {console.error('Error:', error)
    alert(error)}); 
		}