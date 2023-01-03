
    AOS.init();
    console.log("insideJs");
    let table2 = document.getElementById('indevidualData');
    table2.style.display ='none';

	let selectedRowIndex, allJobs;
  let  selectedRowJobIds = [];
 
    fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchAllJobsInfo', {
         method: 'GET',         
        }).then(function(response){ 
             return response.json()}).then(function(data)
        {
		  console.log(data);	
		  console.log(data.length);
		  allJobs=data;
          for (let i = 0; i < data.length; i++) { 
		     const row = document.createElement('tr');
             row.className='trow';

            //  const columnNode =document.createElement('td');
            //  columnNode.innerHTML = '<input type="checkbox" />';
            const columnNode =document.createElement('td');
            columnNode.innerHTML = '<input type="checkbox" id="clickedcheckbox" "/>';
            columnNode.addEventListener("click", ()=>{
                
                
                if(selectedRowJobIds.includes(data[i].jobId)){
                    selectedRowJobIds = selectedRowJobIds.filter(function(item) {
                        return item !== data[i].jobId
                    })
                }else{
                    selectedRowJobIds.push(data[i].jobId);
                }
                 console.log(selectedRowJobIds);
             });
             row.appendChild(columnNode);
       
		    //  row.addEventListener('click', () => {
			//      selectedRowIndex = i;
			//      modal.style.display = "block";
		    //     });
		     ['jobTitle','noOfPost','qualificationRequired','experienceRequired','lastDateToApply','companyName','country','state','jobId'].forEach(cell => {
			     const column = data[i][cell];
			     const columnNode =document.createElement('td');
			     columnNode.innerHTML = column;
			     row.appendChild(columnNode);
                 
		        });

                const img = document.createElement('td');
                img.innerHTML='<div>  <input type="image" src="../src/assets/dot.png" style="height:5px; width:20px;"></div>'
                
                img.addEventListener('click', () => {
			    selectedRowIndex = i;
                modal.style.display = "block";
		        });
                row.appendChild(img);

			 document.getElementById('jobTable').appendChild(row);
               /*document.getElementById("jobTitle").innerHTML += data[i].jobTitle +"</br>";
               document.getElementById("noOfPost").innerHTML += data[i].noOfPost+"</br>";
               document.getElementById("qualificationRequired").innerHTML += data[i].qualificationRequired+"</br>";
			   document.getElementById("experienceRequired").innerHTML += data[i].experienceRequired+"</br>";
			   document.getElementById("lastDateToApply").innerHTML += data[i].lastDateToApply+"</br>";
			   document.getElementById("companyName").innerHTML += data[i].companyName+"</br>";
			   document.getElementById("country").innerHTML += data[i].country+"</br>";
			   document.getElementById("state").innerHTML += data[i].state+"</br>";
			   document.getElementById("jobId").innerHTML += data[i].jobId+"</br>";*/
            }
            	
       
        }).catch(error => console.error('Error:', error)); 
       
		//getData();
       //async function getData(){
       //const response= await fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchAllJobsInfo’)
       //console.log(response);
       //const data= await response.json();
       //console.log(data);
       //length=data.drinks.length;
       //console.log(data);
       //var temp="";
       //for(i=0;i<length;i++)
       //{
       //   temp+="<tr>";
        //  temp+="<td>"+data.drinks[i].strDrink+"</td>";
        //  temp+="<td>"+data.drinks[i].strInstructions+"</td>";
       //}
       //document.getElementById("data").innerHTML=temp;
       //}
		
	function deleteJob() {
	 console.log(allJobs[selectedRowIndex].jobId);
	 fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/deleteJobsInfoById?jobId='
		  +allJobs[selectedRowIndex].jobId, {
          method: 'DELETE',         
        }).catch(error => console.error('Error:', error));
		   alert('Job Record Deleted.');		   
	}
		
		var modal = document.getElementById("myModal");
		//var btn = document.getElementById("jobTitle");
		var span = document.getElementsByClassName("close")[0];
		/* btn.onclick = function() {
              modal.style.display = "block";
        }*/
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
		
		function editJob() {
		 console.log(allJobs[selectedRowIndex]);

        localStorage["jobpage"] = "fromJobPage";
         
		 localStorage["jobId"] = allJobs[selectedRowIndex].jobId;
		 localStorage["jobTitle"] = allJobs[selectedRowIndex].jobTitle;
		 localStorage["noOfPost"] = allJobs[selectedRowIndex].noOfPost;
		 localStorage["descriptions"] = allJobs[selectedRowIndex].descriptions;
		 localStorage["qualificationRequired"] = allJobs[selectedRowIndex].qualificationRequired;
		 localStorage["experienceRequired"] = allJobs[selectedRowIndex].experienceRequired;
		 localStorage["specializationRequired"] = allJobs[selectedRowIndex].specializationRequired;
		 localStorage["lastDateToApply"] = allJobs[selectedRowIndex].lastDateToApply;
		 localStorage["salary"] = allJobs[selectedRowIndex].salary;
		 localStorage["jobType"] = allJobs[selectedRowIndex].jobType;
		 localStorage["companyName"] = allJobs[selectedRowIndex].companyName;
		 localStorage["logoUrl"] = allJobs[selectedRowIndex].logoUrl;
		 localStorage["website"] = allJobs[selectedRowIndex].website;
		 localStorage["email"] = allJobs[selectedRowIndex].email;
		 localStorage["address"] = allJobs[selectedRowIndex].address;
		 localStorage["state"] = allJobs[selectedRowIndex].state;
		 localStorage["country"] = allJobs[selectedRowIndex].country;
         localStorage["keySl"]  = allJobs[selectedRowIndex].keySkills;
         localStorage["worklocation"] = allJobs[selectedRowIndex].workLocation;
         localStorage["workmode"] = allJobs[selectedRowIndex].workMode;
         
		 location.replace("../new-job-list/NewJobDetails.html");
		}

        function activateTable2 (){
            let jobID = document.getElementById('jobfortable').value;
            if(jobID =='' ){
                document.getElementById('jobTable').style.display = 'block';
                table2.style.display = 'none';
            }
            else{
            
            table2.style.display = 'block';
            document.getElementById('jobTable').style.display = 'none';
            console.log(jobID);
            fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchJobsInfoById?jobId='+jobID, {
         method: 'GET',         
        }).then(function(response){ 
             return response.json()}).then(function(data){
                console.log(data);
                for (let i = 0; i < 1; i++) { 
		     const row = document.createElement('tr');
             row.className='trow';

        
            const columnNode =document.createElement('td');
              
             
       
		     ['jobTitle','noOfPost','qualificationRequired','experienceRequired','lastDateToApply','companyName','country','state','jobId'].forEach(cell => {
			     const column = data[cell];
			     const columnNode =document.createElement('td');
			     columnNode.innerHTML = column;
			     row.appendChild(columnNode);
                 
		        });

                const img = document.createElement('td');
                img.innerHTML='<div>  <input type="image" src="../src/assets/dot.png" style="height:5px; width:20px;"></div>'
                
                img.addEventListener('click', () => {
			    selectedRowIndex = i;
                modal.style.display = "block";
		        });
                row.appendChild(img);

			 document.getElementById('indevidualData').appendChild(row);
            }
             }).catch(error =>{
              console.error('Error:', error);
              
             }); 

            }


        }
		