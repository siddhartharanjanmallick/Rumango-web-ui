
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




this.api_url="http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchAllJobsInfo";

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
        buttonNumbers[count - 1].classList.add("active");
        for(i=0;i<buttonNumbers.length;i++)
        {
            buttonNumbers[i].addEventListener('click',buttonClick);
        }
    }
    else
    {
        buttonNumbers[count - 1].classList.remove("active");
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
             tableData+=` <tr class="addrowproperty">
           
             <td data-title='Job Title'>${values.jobTitle}</td>
             <td data-title='No of Posts'>${values.noOfPost}</td>
             <td data-title='Qualification Required'>${values.qualificationRequired}</td>  
             <td data-title='Experience Required'>${values.experienceRequired}</td> 
             <td data-title='Last Date to apply'>${values.lastDateToApply}</td>
             <td data-title='Company'>${values.companyName}</td>
             <td data-title='Country'>${values.country}</td>
             <td data-title='State'>${values.state}</td>
             <td data-title='Job ID'>${values.jobId}</td>
             <td data-title='Operations'>
             `
             if(values)
             {
                 tableData+=`<span class="fa fa-pencil-square" style="font-size:20px"
                 onClick="javascript:return edit(${values.jobId})"></span>` 
             }
             
             tableData+=`&nbsp &nbsp &nbsp &nbsp
             <span class="fa fa-trash" style="font-size:20px" 
             onClick="javascript:return deleteApplicant(${values.jobId})"> </span>
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



function buttonClick()
{   
    buttonNumbers[count - 1].classList.remove("active");
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
    this.classList.add("active");
}

function nextPage()
{
    document.getElementById('prev_button').removeAttribute("disabled");
    if(count!=buttonCount)
    {
        buttonNumbers[count-1].classList.remove("active");
        buttonNumbers[count].classList.add("active");
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
    buttonNumbers[count-1].classList.remove("active");
    buttonNumbers[count-2].classList.add("active");
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
     searchUserName=data.filter(userName=>userName.jobTitle.toLowerCase().includes((search_data).toLowerCase()));
    
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

 function edit(i)
 {
    console.log(i);
    let dwnResume=data.filter(applicationID=>applicationID.jobId == i);
    console.log(dwnResume);
    localStorage.setItem("jobpage","fromJobPage");
    localStorage["jobId"] = dwnResume[0].jobId;
    localStorage["jobTitle"] = dwnResume[0].jobTitle;
    localStorage["noOfPost"] = dwnResume[0].noOfPost;
    localStorage["descriptions"] = dwnResume[0].descriptions;
    localStorage["qualificationRequired"] = dwnResume[0].qualificationRequired;
    localStorage["experienceRequired"] = dwnResume[0].experienceRequired;
    localStorage["specializationRequired"] = dwnResume[0].specializationRequired;
    localStorage["lastDateToApply"] = dwnResume[0].lastDateToApply;
    localStorage["salary"] = dwnResume[0].salary;
    localStorage["jobType"] = dwnResume[0].jobType;
    localStorage["companyName"] = dwnResume[0].companyName;
    localStorage["logoUrl"] = dwnResume[0].logoUrl;
    localStorage["website"] = dwnResume[0].website;
    localStorage["email"] = dwnResume[0].email;
    localStorage["address"] = dwnResume[0].address;
    localStorage["state"] = dwnResume[0].state;
    localStorage["country"] = dwnResume[0].country;
    localStorage["workmode"] = dwnResume[0].workMode;
   localStorage["worklocation"] = dwnResume[0].workLocation;
   localStorage["keySl"] = dwnResume[0].keySkills;
   
    // localStorage[''] = JSON.stringify(dwnResume);
    location.replace("../new-job-list/NewJobDetails.html");
    console.log(dwnResume);
  
    
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
        deleteRecord=data.filter(applicationID=>applicationID.jobId== i);
    }
    console.log(deleteRecord);
    swal({
        text: "Are you sure you want to delete the job " +deleteRecord[0].jobTitle+"?" ,
        icon: "warning",
        buttons: [
            "No", "Yes"
        ],
        dangerMode: true
      }) .then(function (result){
        console.log(result);
     

    //  deleteCnfMsg=confirm("Are you sure you want to delete the applicant " +deleteRecord[0].jobTitle+"?");
    if (result==true) {
            fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/deleteJobsInfoById?jobId='
             +i, {
             method: 'DELETE',         
         })
         .then((response)=>{
            console.log(response);
           
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
            text: "job not deleted!" ,
            icon: "error",
            buttons: "Ok",
            dangerMode: true
          }) .then(function (result){
            console.log(result);
          })
     }
    })
 }   

 function createJob() {
    location.replace('../new-job-list/NewJobDetails.html')
    
 }
 
 



 
