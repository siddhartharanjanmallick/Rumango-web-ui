let data = [];
        console.log(localStorage['dta_fromcontactPage']);
         data = JSON.parse(localStorage['dta_fromcontactPage']);
         console.log(data.name)
        if(data){
            console.log("inside",);
            const name = document.getElementById('name12');
            name.innerHTML =`${data[0].name}`;
            const msg = document.getElementById('MessageReply');
            msg.innerHTML = `${data[0].message}`

        }
        function SendMail(){
            console.log("inside submit")
            let message = document.querySelector('#MessageReply').value;
            let reply = document.querySelector('#Replymessage').value;
            console.log(message);
            console.log(reply);
            console.log(data.email)
            fetch('http://192.168.0.14:8081/RumangoWebsite/contact-api/sendUploadLink?message='+message+'&email='+data.email+'&reply='+reply+'',{
                method: 'POST',
                headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
            }).then(function(response){ 
        return response.json()}).then((data)=>{
            console.log(data);
            if (data.message == 'Upload Message sent successfully.'){
                alert("Message Sent Succefully")
                localStorage['dta_fromcontactPage'] = '';
                window.location.replace("../contacts-list-page/ContactsListPage.html"); 
            }
        })
        }