AOS.init();

// const url=devUrl;
//    console.log("devUrl", url);
function createCareerNode (opening) {
    const node = document.createElement('div');
    
    node.innerHTML = `
      <div class="box" style="display: flex; border: 1px solid; flex-direction: column; margin-bottom:10%; padding: 10%">
        <h1 class="header">${opening.jobTitle}</h1>  
        <div class="text"> Exp: ${opening.experienceRequired}  year</div>
        <div class="text">Last Date: ${opening.lastDateToApply}</div>
        <p class="text">
          ${opening.descriptions}
        </p>
        
        <a  onClick="applyNow(${opening.jobId})" class="applyBtn"
                    style="text-decoration: none; color:white">Apply Now</a></div></px-posize
            >  
            <div class="careers-screen3a-section2__image9 layout">
             <img src="../src/assets/5d7a0fdf449de43ee31f3da102552d87.svg"
                        >
           </div>        
            </div>
      
    `
    return node;
  }

 
  // let obj;
  fetch('http://192.168.0.14:8081/RumangoWebsite/jobs-api/fetchAllJobsInfo', {
     method: 'GET',         
    }).then(function(response){ 
         return response.json()}).then(function(data)
    {
      
      console.log(data);	
      // console.log(data.length);
  let text = "";
  const careerContainer = document.getElementById('careers');
  // careerContainer.style = {
  //   display: 'flex',
  //   'flex-wrap': 'wrap',
  //   gap: '16px'
  // }
  for (let index = 0; index < data.length; index++) {
    console.log(data[index]['jobTitle']);
  //  text=data[0]['jobTitle'];
  //   document.getElementById("role").innerHTML=text;
    const careerNode = createCareerNode(data[index]);
    document.getElementById('careers').appendChild(careerNode);
  }
  
     
    }).catch(error => console.error('Error:', error));

    function applyNow(jobId){
      console.log("jobId", jobId);
      localStorage.setItem("jobId", jobId)
      window.location.href= '../careers-apply/careersApplyNow.html';
    }