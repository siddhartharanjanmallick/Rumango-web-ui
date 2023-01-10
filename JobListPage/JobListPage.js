
  
    console.log("insideJs");
   

    let jobsarr;
    

	let selectedRowIndex, allJobs;
  let  selectedRowJobIds = [];
 
    fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchAllJobsInfo', {
         method: 'GET',         
        }).then(function(response){ 
             return response.json()}).then(function(data)
        {
		  console.log(data);	
		  console.log(data.length);
		  this.allJobs=data;
        //   document.getElementById('jobTable').innerHTML = '';
          tablecreate(this.allJobs)

        
        }).catch(error => console.error('Error:', error)); 
       
	

       function tablecreate(data){
        // if(data.length <= 1){}else{}
        //   document.querySelectorAll('tr').forEach(function(e){e.remove()});
        document.getElementById('jobTable').innerHTML = '';
        var table =document.getElementById('jobTable');
        var row = table.insertRow(0);
        row.className = 'table_header';
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10);
        cell1.innerHTML = "Select";
        cell2.innerHTML = "Job Title";
        cell3.innerHTML = "No of Posts";
        cell4.innerHTML = "Qualification Required";
        cell5.innerHTML = "Experience Required";
        cell6.innerHTML = "Last Date to Apply";
        cell7.innerHTML = "Company";
        cell8.innerHTML = "Country";
        cell9.innerHTML = "State";
        cell10.innerHTML = "Job ID";
        cell11.innerHTML = "Actions";
        
        console.log("for !srtrtime ");
        console.log(data)
       
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
                
               this.selectedRowIndex = i;
               console.log( this.selectedRowIndex);
               modal.style.display = "block";
               });
               row.appendChild(img);

            document.getElementById('jobTable').appendChild(row);
           }
       }
	function deleteJob() {
	 console.log(this.allJobs[this.selectedRowIndex].jobId);
     console.log( );
	 fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/deleteJobsInfoById?jobId='
		  +this.allJobs[this.selectedRowIndex].jobId, {
          method: 'DELETE',         
        }).catch(error => console.error('Error:', error));
		   alert('Job Record Deleted.');	
           window.location.reload();	   
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
           
            console.log(this.allJobs[this.selectedRowIndex]);

        localStorage["jobpage"] = "fromJobPage";
         
		 localStorage["jobId"] = this.allJobs[this.selectedRowIndex].jobId;
		 localStorage["jobTitle"] = this.allJobs[this.selectedRowIndex].jobTitle;
		 localStorage["noOfPost"] = this.allJobs[this.selectedRowIndex].noOfPost;
		 localStorage["descriptions"] = this.allJobs[this.selectedRowIndex].descriptions;
		 localStorage["qualificationRequired"] = this.allJobs[this.selectedRowIndex].qualificationRequired;
		 localStorage["experienceRequired"] = this.allJobs[this.selectedRowIndex].experienceRequired;
		 localStorage["specializationRequired"] = this.allJobs[this.selectedRowIndex].specializationRequired;
		 localStorage["lastDateToApply"] = this.allJobs[this.selectedRowIndex].lastDateToApply;
		 localStorage["salary"] = this.allJobs[this.selectedRowIndex].salary;
		 localStorage["jobType"] = this.allJobs[this.selectedRowIndex].jobType;
		 localStorage["companyName"] = this.allJobs[this.selectedRowIndex].companyName;
		 localStorage["logoUrl"] = this.allJobs[this.selectedRowIndex].logoUrl;
		 localStorage["website"] = this.allJobs[this.selectedRowIndex].website;
		 localStorage["email"] = this.allJobs[this.selectedRowIndex].email;
		 localStorage["address"] = this.allJobs[this.selectedRowIndex].address;
		 localStorage["state"] = this.allJobs[this.selectedRowIndex].state;
		 localStorage["country"] = this.allJobs[this.selectedRowIndex].country;
         localStorage["keySl"]  = this.allJobs[this.selectedRowIndex].keySkills;
         localStorage["worklocation"] = this.allJobs[this.selectedRowIndex].workLocation;
         localStorage["workmode"] = this.allJobs[this.selectedRowIndex].workMode;
         
		 location.replace("../new-job-list/NewJobDetails.html");
		}

        function activateTable2 (){
            // document.getElementById('indevidualData').innerHTML='';
            console.log("inside search");
            let jobtitle = document.getElementById('jobfortable').value;
            this.jobsarr = this.allJobs.filter(job => job.jobTitle == jobtitle );
            console.log(this.jobsarr);
            document.getElementById('jobTable').innerHTML = '';
            document.getElementById('jobTable').innerHTML = '';
        //    previoustable.getElementsByClassName('trow').innerHTML = '';
            if(this.jobsarr.length == 0){
                console.log("dfsdnjkfsdfjsdhfjasdhfkj")
                console.log(this.allJobs);
                
                this.tablecreate(this.allJobs);
            }else{
           this.tablecreate(this.jobsarr );}
       
            

        //     if(jobID =='' ){
        //         document.getElementById('jobTable').style.display = 'block';
        //         table2.style.display = 'none';
        //     }
        //     else{
            
        //     table2.style.display = 'block';
        //     document.getElementById('jobTable').style.display = 'none';
        //     console.log(jobID);
        //     fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchJobsInfoById?jobId='+jobID, {
        //  method: 'GET',         
        // }).then(function(response){ 
        //      return response.json()}).then(function(data){
        //         console.log(data);
        //         for (let i = 0; i < 1; i++) { 
		//      const row = document.createElement('tr');
        //      row.className='trow';

        
        //     const columnNode =document.createElement('td');
              
             
       
		//      ['jobTitle','noOfPost','qualificationRequired','experienceRequired','lastDateToApply','companyName','country','state','jobId'].forEach(cell => {
		// 	     const column = data[cell];
		// 	     const columnNode =document.createElement('td');
		// 	     columnNode.innerHTML = column;
		// 	     row.appendChild(columnNode);
                 
		//         });

        //         const img = document.createElement('td');
        //         img.innerHTML='<div>  <input type="image" src="../src/assets/dot.png" style="height:5px; width:20px;"></div>'
                
        //         img.addEventListener('click', () => {
		// 	    selectedRowIndex = i;
        //         modal.style.display = "block";
		//         });
        //         row.appendChild(img);

		// 	 document.getElementById('indevidualData').appendChild(row);
        //     }
        //      }).catch(error =>{
        //       console.error('Error:', error);
              
        //      }); 

        //     }


        }
		