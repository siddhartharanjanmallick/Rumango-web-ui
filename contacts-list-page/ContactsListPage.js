// AOS.init();
console.log("hello");
let selectedRowIndex, allContacts;
let filteredMsgContact;

fetch('http://192.168.0.14:8081/RumangoWebsite/contact-api/fetchAllMessagesInfo', {
 method: 'GET',         
}).then(function(response){ 
     return response.json()}).then(function(data)
{
  console.log(data);
  console.log(data.length);
  this.allContacts=data;
  this.table(this.allContacts);


  
}).catch(error => console.error('Error:', error));


function deleteContact() {
console.log(this.allContacts[selectedRowIndex].id);
fetch('http://192.168.0.14:8081/RumangoWebsite/contact-api/deleteMessageInfoById?id='
  +this.allContacts[selectedRowIndex].id, {
  method: 'DELETE',         
}).catch(error => console.error('Error:', error));
   alert('Contact Record Deleted.');		   
}


var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
console.log("inside span onclick");
  modal.style.display = "none";
}
window.onclick = function(event) {
console.log("inside window onclick");
    if (event.target == modal) {
    console.log("inside window onclick if");
     modal.style.display = "none";
    }
}
function table (data){
    document.getElementById('contactsTable').innerHTML = '';
    var table =document.getElementById('contactsTable');
    var row = table.insertRow(0);
    row.className = 'table_header2';
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
   
    cell1.innerHTML = "Name";
    cell2.innerHTML = "Email";
    cell3.innerHTML = "Phone No";
    cell4.innerHTML = "Message";
   
    for (let i = 0; i < data.length; i++) {
        const row = document.createElement('tr');
        ['name', 'email', 'phoneNumber', 'message'].forEach(cell => {
            const column = data[i][cell];
            const columnNode =document.createElement('td');
            columnNode.innerHTML = column;
            row.appendChild(columnNode);
           });
       const columnNode =document.createElement('td');
       columnNode.addEventListener('click', () => {
            selectedRowIndex = i;
            localStorage.setItem("dta_fromcontactPage" ,JSON.stringify(data[i]) );
            modal.style.display = "block";
           });
       columnNode.innerHTML = '<img src="../admin-dashboard/assets/image/5644114f1fa7429262c29f40392aa212.png" alt="" class="icon action-img">'
       row.appendChild(columnNode);
        document.getElementById('contactsTable').appendChild(row);
       }
}

function activateTable() {
    let cnName = document.getElementById('contactName').value;
    console.log(cnName);
    this.filteredMsgContact = this.allContacts.filter(nm=> nm.name == cnName);
    console.log(this.filteredMsgContact);
    document.getElementById('contactsTable').innerHTML = '';
    document.getElementById('contactsTable').innerHTML = '';
    if(this.filteredMsgContact.length == 0){
        this.table(this.allContacts);
    }else{
       this.table(this.filteredMsgContact);
    }
    

    
}