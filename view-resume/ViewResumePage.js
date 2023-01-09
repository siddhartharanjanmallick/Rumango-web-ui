AOS.init();
		console.log("Hello");
	let selectedRowIndex, allApplicants, allResumes;
	let namesForTable;
	function table(data) {
		document.getElementById('applicantTable').innerHTML = '';
		var table =document.getElementById('applicantTable');
        var row = table.insertRow(0);
        row.className = 'table_header1';
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        cell1.innerHTML = "Sl.No";
        cell2.innerHTML = "First Name";
        cell3.innerHTML = "Job ID";
        cell4.innerHTML = "Email";
        cell5.innerHTML = "Phone No";
        cell6.innerHTML = "Applicant ID";
        cell7.innerHTML = "Operations";
       
		for (let i = 0; i < data.length; i++) {
			const row = document.createElement('tr');
			row.addEventListener('click', () => {
				selectedRowIndex = i;
			   //modal.style.display = "block";
			   });
			   const sino = document.createElement('td');
			   sino.innerHTML ='<p>'+(i+1)+'</p>';
				
			   row.appendChild(sino);
			['firstName', 'jobId', 'email', 'mobile', 'applicantId' ].forEach(cell => {
				const column = data[i][cell];
				const columnNode =document.createElement('td');
				columnNode.innerHTML = column;
				row.appendChild(columnNode);
			   });
			   const node = document.createElement('td');
			   node.innerHTML = '<div><input type="image" src="../src/assets/download.png" style="width:42px; height:21px;" onClick="downloadResume('+i+')"/> &nbsp &nbsp &nbsp  <input type="image" src="../src/assets/88a08900bc341cc51c8e7323a114744a.png" onClick="deleteApplicant('+i+')"/> </div>';
			   row.appendChild(node);

			  
			  
			document.getElementById('applicantTable').appendChild(row);
		   
		   }
		
	}
	
	function downloadResume(i) {
		console.log(this.allApplicants[i]);
		console.log(this.allApplicants[i].resumeLink);
        if(this.allApplicants[i].resumeLink == null){
            alert(''+allApplicants[i].firstName+' '+allApplicants[i].lastName+ 'Has not Uploaded application')
        }
		 window.open(this.allApplicants[i].resumeLink);
		//location.href = allApplicants[selectedRowIndex].resumeLink;
		alert("Resume Downloaded");
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
		   alert('All resumes will be downloaded.');		   
	}	
	
	
	function deleteApplicant(i) {
	 console.log(this.allApplicants[1].applicantId);
	 fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/deleteApplicantsInfoById?applicantId='
		  +this.allApplicants[i].applicantId, {
          method: 'DELETE',         
        }).then(()=>{
			alert('Applicant Record Deleted.');	
			window.location.reload();
		}).catch(error =>{ console.error('Error:', error)
		alert(error)
	});
		   	   
	}
	
	
	fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/fetchApplicantsInfo', {
         method: 'GET',         
        }).then(function(response){ 
             return response.json()}).then(function(data)
        {
		  console.log(data);
		  console.log(data.length);
		this.allApplicants = data;
		table(this.allApplicants);
         
        }).catch(error =>{ console.error('Error:', error)
		alert(error)
	}); 
		
		function tabledata(){
			var name = document.getElementById('nameOfCandidate').value;
			this.namesForTable = this.allApplicants.filter(name1=> name1.firstName == name);
			 document.getElementById('applicantTable').innerHTML = '';
            document.getElementById('applicantTable').innerHTML = '';
			if(this.namesForTable.length == 0){
				this.table(this.allApplicants);
			}else{
				this.table(this.namesForTable);
			}

		}
		
		var modal = document.getElementById("myModal");
		//var btn = document.getElementById("firstName");
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