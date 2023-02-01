// AOS.init();


console.log("Heelo");
var obj =
{
    "totalUsr":423,
    "totalJobs":777,
    "totalAppliedJobs":4232,
    "totalContactUser":7832,
    "reports":
            [
            {
            "month":"jan",
            "count":133
            },
            {
            "month":"feb",
            "count":235
            },
            {
            "month":"mar",
            "count":678
            },
            {
            "month":"apr",
            "count":452
            },
            {
            "month":"may",
            "count":498
            },
            {
            "month":"june",
            "count":370
            },
            {
                "month": "july",
                "count":544
            },
            {
                "month":"aug",
                "count": 698
            },
            {
                "month":"sep",
                "count": 800
            },
            {
                "month":"oct",
                "count": 750
            },
            {
                "month":"nov",
                "count": 1000
            },
            {
                "month":"dec",
                "count": 200
            }
            ]
        };


        console.log(obj);
        document.getElementById("totalJob").innerHTML = obj.totalJobs;
        document.getElementById("appliedJobs").innerHTML = obj.totalAppliedJobs;
        document.getElementById("totalUsr").innerHTML = obj.totalUsr;
        document.getElementById("contactUsr").innerHTML = obj.totalContactUser;

        var months =[] ;
        var dataforchart = [];
        for(var i =0 ; i<obj.reports.length ; i++){
            console.log(obj.reports[i]);
            months.push(obj.reports[i].month.toUpperCase());
            dataforchart.push(obj.reports[i].count);
        }
        console.log(months);
        console.log(dataforchart);
        var color =
      
         new Chart('chartForCandidate',{
            type: "line",
            data: {
                labels: months,
                datasets: [{ 
                data:dataforchart,
                borderColor: "#5BC4FF",
                // borderColor: ,
                pointRadius: 4,
                pointBackgroundColor: "red",
                // borderColor: function () {
                //     return linear-gradient(to right , red , yellow),  
                // }
                fill: false 
                
              }],
             
             
              
            },
            options: {
                legend: {display: false},
                scales: {
                    xAxes: [{
                        gridLines: {
                            // color: "rgba(0, 0, 0, 0)",
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            // color: "rgba(0, 0, 0, 0)",
                            display: false
                        }   
                    }]
                }
              }

         });




     
     var tabledataforDashboard;
     fetch('http://192.168.0.14:8081/RumangoWebsite/applicant-api/fetchApplicantsInfo', {
        method: 'GET',         
       }).then(function(response){ 
            return response.json()}).then(function(data){
                console.log(data);
                tabledataforDashboard = data.slice(0,4);
                console.log(tabledataforDashboard);
                tableCreateJob(tabledataforDashboard);


            });


        function tableCreateJob(data){
            document.getElementById("dashboard_table").innerHTML = '';
		var table =document.getElementById("dashboard_table");
        var row = table.insertRow(0);
        row.className = 'table_header1';
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
       
        
        cell1.innerHTML = "Sl.No";
        cell2.innerHTML = "First Name";
        cell3.innerHTML = "Job ID";
        cell4.innerHTML = "Email";
        cell5.innerHTML = "Phone No";
        cell6.innerHTML = "Applicant ID";
       
		for (let i = 0; i < data.length; i++) {
			const row = document.createElement('tr');
            row.classList.add('addrowproperty')
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

			  
			  
               document.getElementById("dashboard_table").appendChild(row);
		   
		   }
        }

        fetch('http://192.168.0.14:8081/RumangoWebsite/contact-api/fetchAllMessagesInfo', {
 method: 'GET',         
}).then(function(response){ 
     return response.json()}).then(function(data)
{
  console.log(data);
  console.log(data.length);
  this.allContacts=data;
  let parent = document.querySelector('.messages');
//   let node = document.createElement('div');

  if(data.length <= 3){
    let parent = document.querySelector('.messages');
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element);
        let node = document.createElement('div');

        node.className = "msg1";
        node.innerHTML = `
        <img src="../src/assets/085da62b7d1e368ee26e34289a721748.png" alt="">
        <p class="slc">${data[index].name.slice(0,1)}</p>
        <div class="text_body4 layout" id="name1">${data[index].name} </div>
        <p class="mesg">${data[index].message.slice(0,15)} ....</p>
        
                `
            parent.appendChild(node);     
    }
   
    let node1 = document.createElement('div');
    node1.innerHTML=`<div class="anch"><a href="../contacts-list-page/ContactsListPage.html" class="view"> View More</a> </div>`
    parent.appendChild(node1);

  }else if(data.length > 4){
    let fector = data.slice(0,4);
    for (let index = 0; index < fector.length; index++) {
        const element = fector[index];
        let msgshow;
        if (data[index].message.length > 25) {
            msgshow =data[index].message.slice(0,25);
            msgshow+= '...';
        }else{
            msgshow =data[index].message
        }
        let parent = document.querySelector('.messages');
        let node = document.createElement('div');
        node.className = "msg1";
        node.innerHTML = `
        <img src="../src/assets/085da62b7d1e368ee26e34289a721748.png" alt="">
        <p class="slc">${data[index].name.slice(0,1)}</p>
        <div class="text_body4 layout" id="name1">${data[index].name} 
        <p class="mesg">${msgshow} </p></div>
        
                `
                node.addEventListener("click", ()=>{
                    window.location.replace('../contacts-list-page/ContactsListPage.html')
                })
            parent.appendChild(node);   
        
    }
    let node1 = document.createElement('div');
    node1.innerHTML=`<div class="anch"><a href="../contacts-list-page/ContactsListPage.html" class="view"> View More</a> </div>`
    parent.appendChild(node1);
  }
//   node.innerHTML=`<div class="anch"><a href="../contacts-list-page/ContactsListPage.html" class="view"> View More</a> </div>`
//   parent.appendChild(node);
  
}).catch(error => console.error('Error:', error));
