// const { jsPDF } = window.jspdf;

// const { jsPDF } = window.jspdf;
let display=3;
let count=1;
let buttonCount;
let pageNum=1;
let buttonNumbers;
let paginationNumber=document.getElementById("pagination-numbers");
let searchUserName="";
let search_data="";
let tableRecord="";
let noDataBool=false;
let sortCol;
let sortAsc = false;
let deleteBool=false;
let selectedRowJobIds ;
var msg=[];




this.api_url="http://192.168.0.14:8081/RumangoWebsite/applicant-api/fetchApplicantsInfo";

async function getapi(url) 
{
    // Storing response
    this.response = await fetch(url);
    
    // Storing data in form of JSON
    this.data= await response.json();
    if(!deleteBool)
    {
        getPageNumber();
    }
    else
    {
         display=3;
         count=1;
         pageNum=1;
        paginationNumber=document.getElementById("pagination-numbers");
         search_input_txt();
        
    }
    
}

document.getElementById("prev_button").setAttribute("disabled",true);
document.getElementById("table_body").innerHTML=""; 

tableData="<tr><td colspan='6' align= 'center' style='color:blue;font-weight:bolder'>No Record Found</td></tr>";

document.querySelector(".pagination-wrapper").classList.remove("visible");
document.querySelector(".pagination-wrapper").classList.add("invisible");
document.getElementById("table_body").innerHTML=tableData; 

// Calling that async function
getapi(api_url);



function getPageNumber()
{
    document.getElementById("pagination-numbers").innerHTML="";
    if((!noDataBool) &&(search_data==""))
    {
        display=document.getElementById('select_page_size').value;
    }
    else if(search_data=="")
    {
        display=3; 
    }
    else 
    {
        display=document.getElementById('select_page_size').value;
    }
   
    document.querySelector(".pagination-wrapper").classList.remove("invisible");
    document.querySelector(".pagination-wrapper").classList.add("visible");
    count=1;
    getData();
}


function getData()
{
    if((data.length!==0)&&(search_data=="") && (searchUserName.length==0))
    {
        buttonCount=Math.ceil((data.length)/(display));
    }
    else if (searchUserName.length!==0)
    {
        buttonCount=Math.ceil((searchUserName.length)/(display));
    }
    if(buttonCount==1)
    {
        document.getElementById("next_button").setAttribute("disabled",true);
        document.getElementById("prev_button").setAttribute("disabled",true);
    }
    for(let i=1;i<=buttonCount;i++)
    {
        var button= document.createElement("button");
        button.innerHTML=i;
        paginationNumber.append(button);
    }
    buttonNumbers =paginationNumber.getElementsByTagName("button");
    if(buttonCount!==1)
    {
        buttonNumbers[count - 1].classList.add("active11");
        for(i=0;i<buttonNumbers.length;i++)
        {
            buttonNumbers[i].addEventListener('click',buttonClick);
        }
    }
    else
    {
        buttonNumbers[count - 1].classList.remove("active11");
    }
   showTableData(pageNum);
}

function showTableData(pageNum)
{
    let tableData="";
    let tableRecord="";

    if((data.length!==0) || (searchUserName.length!==0))
    { 
        document.getElementById("table_body").innerHTML=""; 
        if((data.length!=0)&&(searchUserName.length==0))
        {
            tableRecord=  data.filter((row, index) => {
            nextPage=display*pageNum;
            prevPage=display*(pageNum-1);         
            if(index >= prevPage && index < nextPage)
            {
               return true;
            } 
                
            })    
        }
        else if(searchUserName.length!=0)
        {
            tableRecord=  searchUserName.filter((row, index) => {
                nextPage=display*pageNum;
                prevPage=display*(pageNum-1);         
                if(index >= prevPage && index < nextPage)
                {
                    return true;
                } 
                    
                }) 
        }

       

        tableRecord.map((values)=>{

            let emai;
            if(values.email != null){
                if(values.email.length > 15){
                emai = values.email.slice(0,15);
                emai+="..."
                }else{
                emai = values.email
               }
            }
            else{
                emai = "null";
            }
        
             tableData+=` <tr class="addrowproperty">
             <td data-title='Selected'><input type="checkbox"  id="dataCheck"/></td>
             <td data-title='FirstName'>${values.firstName}</td> 
             <td data-title='Job ID'>${values.jobId}</td> 
             <td data-title='Email' class="email">${emai}</td> 
             <td data-title='Mobile'>${values.mobile}</td>
             <td data-title='Application ID'>${values.applicantId}</td>
             <td data-title='Operation' >`
             if(values.resumeLink!=null)
             {
                 tableData+=`<span class="fa fa-download"  style="font-size:20px"
                 onClick="javascript:return downloadResume(${values.applicantId})"></span>`
               
             }
                                   
             tableData+=`&nbsp &nbsp
             <span  class="fa fa-trash"  style="font-size:20px"
             onClick="javascript:return deleteApplicant(${values.applicantId})"></span>
             </td> 
             </tr>`
        
         });

    }
    else
    {
        document.getElementById("table_body").innerHTML=""; 
        tableData+=`<tr><td colspan="6" align="center" style="color:blue;font-weight:bolder">
        No Record Found</td></tr>`
    }
    
    document.getElementById("table_body").innerHTML=tableData;
}



document.getElementById('next_button').addEventListener('click', nextPage);
document.getElementById('prev_button').addEventListener('click', previousPage);
document.getElementById('select_page_size').addEventListener('change', getPageNumber);

function sendMail(){
    console.log("inside else");
console.log(selectedRowJobIds);

var resumElink = [];
var dataOfSelectedCandidate=[];

    var selectedRow=document.getElementById("job-table");
    var checkBoxes=document.getElementsByTagName("INPUT");
    
    for(var i=0;i<checkBoxes.length;i++)
    {
        if(checkBoxes[i].checked){
        var row=checkBoxes[i].parentNode.parentNode;
     
        msg.push(row.cells[5].innerHTML);
        

        // msg=append(resumeLink);
    }
    }
    msg.forEach(e=>{
        let dwnResume=data.filter(applicationID=>applicationID.applicantId == e);
        // console.log(JSON.stringify(dwnResume));

        dataOfSelectedCandidate.push(dwnResume[0])
        resumElink.push(dwnResume[0].resumeLink)
    })
    console.log(msg);
    console.log(dataOfSelectedCandidate);
    
    console.log(resumElink);
        if(dataOfSelectedCandidate.length != 0 ){
// filename='SelectedResumes.xlsx';

// var ws = XLSX.utils.json_to_sheet(dataOfSelectedCandidate);
// var wb = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(wb, ws, "People");
// XLSX.writeFile(wb,filename);

// var doc = new jsPDF();
// window.jsPDF = window.jspdf.jsPDF;
// window.autoTable = window.autoTable;
// var doc = window.jsPDF;

// const head = [['Name','Contact Number','Email','Skills','Total Experience', 'Relevent Experience','Current Ctc', 'Expected Ctc','Current Organization','Current Location','Interested To Relocate']];
// const body = [];
// dataOfSelectedCandidate.forEach(u=>{
//     var name = u.firstName + " " + u.lastName;
//   var row = [];
//   row.push(name);
//   row.push(u.mobile);
//   row.push(u.email);
//   row.push(u.skills);
//   row .push(u.totalExperience);
//   row .push(u.relevantExperience);
//   row .push(u.currentCtc);
//   row .push(u.expectedCtc);
//   row .push(u.currentOrganization);
//   row .push(u.currentLocation);
//   row .push(u.isReadyToRelocate);
//   body.push(row);
// });
// console.log(body);
// autoTable(doc, {
//   head: head,
//   body: body,
//   didDrawCell: (prepare) => { },
// });
// doc.save('Details_of_selected_candidate.pdf');


   
forgotPswd();}else{
    swal({
        text: "Please Select Candidate" ,
        icon: "error",
        buttons: "Ok",
        dangerMode: true
      })

}
}


function ExportToExcel(type, fn, dl)
{
   
//    var elt=document.getElementById('job-table');
//    console.log(elt);
// //    debuggers
// //    hideRow(  elt,0);
//    var wb=XLSX.utils.json_to_sheet(this.data,{sheet:"sheet1" });
//    return dl ?
//     XLSX.write(wb, {bookType: type, bookSST:true, type:'base64'}):
//     XLSX.writeFile(wb,fn || ('Exported_Details.'+(type || 'xlsx')));
    
filename='Exported_data_resume.xlsx';

 var ws = XLSX.utils.json_to_sheet(this.data);
 var wb = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, "People");
 XLSX.writeFile(wb,filename);

}



function buttonClick()
{   
    buttonNumbers[count - 1].classList.remove("active11");
    count=this.innerHTML;
   if(this.innerHTML==buttonCount)
    {
        document.getElementById("next_button").setAttribute("disabled",true);
        document.getElementById("prev_button").removeAttribute("disabled");
    }
    else if(this.innerHTML==1)
    {
        document.getElementById("prev_button").setAttribute("disabled",true);
        document.getElementById("next_button").removeAttribute("disabled");
    }
    else{
        document.getElementById("next_button").removeAttribute("disabled");
        document.getElementById("prev_button").removeAttribute("disabled");
    }
    showTableData(count);
    this.classList.add("active11");
}

function nextPage()
{
    document.getElementById('prev_button').removeAttribute("disabled");
    if(count!=buttonCount)
    {
        buttonNumbers[count-1].classList.remove("active11");
        buttonNumbers[count].classList.add("active11");
        count++;
    }
    if(count==buttonCount)
    {
        document.getElementById("next_button").setAttribute("disabled",true);
             
    }
    showTableData(count);
}
function previousPage()
{
    buttonNumbers[count-1].classList.remove("active11");
    buttonNumbers[count-2].classList.add("active11");
    document.getElementById("next_button").removeAttribute("disabled");
    
    if(count !== 1)
    {
        count--;
        
    } 
    if(count==1)
    {
        document.getElementById("prev_button").setAttribute("disabled",true);
    } 
   showTableData(count);   
}

function search_input_txt()
{
    if(!deleteBool)
    {
        search_data=document.getElementById("search_input").value;
    }    
    deleteBool=false;

     
     noDataBool=false;
     
     searchUserName=data.filter(userName=>{
        if(userName.jobId.toString().includes((search_data).toString())){
            return userName;
        }else if(userName.firstName.toLowerCase().includes((search_data).toLowerCase())){
            return userName;
        }});
    //  searchUserName=data.filter(userName=>userName.firstName.toLowerCase().includes((search_data).toLowerCase()));
    
     if(searchUserName.length==0 && search_data!=="")
    {
        tableData="";
        noDataBool=true;
        document.getElementById("table_body").innerHTML=""; 

        tableData="<tr><td colspan='6' align= 'center' style='color:blue;font-weight:bolder'>No Record Found</td></tr>";
        
        document.querySelector(".pagination-wrapper").classList.remove("visible");
        document.querySelector(".pagination-wrapper").classList.add("invisible");
        document.getElementById("table_body").innerHTML=tableData; 
   }
    else
    {

       getPageNumber();
    }
//          console.log(data);
// 		  input = document.getElementById("search_input");
// 		  filter = input.value.toUpperCase();
// 		  table = document.getElementById("job-table");
// 		//   tr = table.getElementsByTagName("tr");
                
//         // Loop through all table rows, and hide those who don't match the search query
//         for (i = 0; i < data.length; i++) {
//         td = data[i].firstName;
//         if (td) {
//             txtValue = td;
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             data[i].style.visibility= "visible";
//             } else {
//             data[i].style.visibility= "hidden";
//             }
//         }
//         }
}

document.querySelectorAll('#job-table thead tr th').forEach((column) => {
    
    column.addEventListener('click', sort, false);
}); 

function sort(e)
 {
    if(!noDataBool)
    {

        let thisSort = e.target.dataset.sort;
    
        if(sortCol === thisSort) sortAsc = !sortAsc;
        sortCol = thisSort;
        if(searchUserName.length==0)
        {
            data.sort((a, b) => {
                if(a[sortCol] < b[sortCol]) return sortAsc?1:-1;
                if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
                return 0;
            });
        }
        else
        {
            searchUserName.sort((a, b) => {
                if(a[sortCol] < b[sortCol]) return sortAsc?1:-1;
                if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
                return 0;
            });           
        }
        getPageNumber();    
    }
 }    

 function downloadResume(i)
 {
    let dwnResume=data.filter(applicationID=>applicationID.applicantId == i);
  
    window.open(dwnResume[0].resumeLink);
 }
 
 function downloadAllResumes() {
    fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/downloadAllResume', {
    method: 'GET',         
    }).then(function(response){ 
    return response.json()}).then(function(data)
    {
      console.log(data);
      allResumes=data;
      console.log(allResumes.length);
      for (let index = 0; index < allResumes.length; index++) {
        setTimeout(()=>{
            console.log(allResumes[index]);
            window.open(allResumes[index],'_blank');	
        },500)
        
      }
    //   for(i=0;i<allResumes.length;i++) {
    // 	setTimeout(()=>{
    // 		console.log(allResumes[1]);
    // 		window.open(allResumes[1]);	
    // 	},500)	
             
         //setTimeout(() => {
            // if(allResumes[i] == null){
            //     alert(''+this.allApplicants[i].firstName+' '+this.allApplicants[i].lastName+ 'Has not Uploaded application')
            //  }else{
            //     window.open(allResumes[i]);
            //  }
             //location.href = allResumes[i];
            //}, 1000);
        // }
    }).catch(error => console.error('Error:', error));
     
       swal({
        text: "All resumes will be downloaded." ,
        icon: "success",
        buttons: "Ok",
        dangerMode: true
      })
}	

 function deleteApplicant(i) {
    let deleteCnfMsg;
    let deleteRecord;
    if(data.length!=0)
    {
        deleteRecord=data.filter(applicationID=>applicationID.applicantId == i);
    }
  
  
    //  deleteCnfMsg=confirm("Are you sure you want to delete the applicant " +deleteRecord[0].firstName+"?");
     
     swal({
        text: "Are you sure you want to delete the applicant " +deleteRecord[0].firstName+"?",
        icon: "warning",
        buttons: [
            "No", "Yes"
        ],
        dangerMode: true
      }).then((res)=>{
    if (res==true) {
            fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/deleteApplicantsInfoById?applicantId='
             +i, {
             method: 'DELETE',         
         })
         .then((response)=>{
            if(response)
            {
                if((search_data!="") && (searchUserName.length>1))
                {
                    deleteBool=true;
                    getapi(api_url);     
                }
                else
                {
                    window.location.reload();
                }
                 
            }
           
         }).catch(error =>{ console.error('Error:', error)
 
       });
     } 
     else
     {
      
         swal({
            text: "Applicant not deleted!" ,
            icon: "error",
            buttons: "Ok",
            dangerMode: true
          })
     }
    })
 }   
 
 

 function forgotPswd(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('active');
    
    var popup = document.getElementById("popup");
    popup.classList.toggle('active');
    
    }

function sendmailtodepartment(){
    var email = document.getElementById('emailForExcel').value;
    // var formlink = document.getElementById('uploadedSheet');
    // console.log(formlink);
    let formData = new FormData();
    formData.append("email" , email)
    formData.append("applicantId" , msg)

    // formData.append("files", formlink.files[0]);
    console.log(formData);
    console.log(email);
    // console.log(formlink.files[0]);
//     fetch("http://192.168.0.14:8081/RumangoWebsite/applicant-api/sendShortlistedData", {
//           method: "POST",
//           body:formData,
//           headers: {
//         'Content-Type': 'multipart/form-data', 
        
//               }

// })
// .then((response)=>{
//     console.log(response);
// })
fetch(
    // "http://localhost:7172/applicant-api/sendShortlistedData",
    "http://192.168.0.14:8081/RumangoWebsite/applicant-api/sendShortlistedData",
    {
      method: "POST",
      body: formData,
    }
  )
    .then(function (response) {
      return response.json();
    }).then((data)=>{
        console.log(data);
        if(data.message == "ShortListedDetails File sent successfully"){
            swal({
                text: "File sent successfully" ,
                icon: "success",
                buttons: "Ok",
                dangerMode: true
              }).then(()=>{
                var blur = document.getElementById("blur");
                blur.classList.remove('active');
                
                var popup = document.getElementById("popup");
                popup.classList.remove('active');
                window.location.reload();
              })
              document.getElementById('emailForExcel').value = '';
            //   document.getElementById('uploadedSheet').value = '';
             
    
        }
    }).catch((error) => {
        console.error("Error:", error);
        alert(error);

     });
    

}



 
