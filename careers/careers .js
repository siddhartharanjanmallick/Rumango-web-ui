// AOS.init();

// const url=devUrl;
//    console.log("devUrl", url);
let all_jobs;
function createCareerNode (opening) {
    const node = document.createElement('div');
    let msg;
    console.log(opening.descriptions.length);
    if(opening.descriptions.length > 35){
       msg = opening.descriptions.slice(0,35) ;
      msg += "....";
    }else{
       msg = opening.descriptions;
      
    }
    // const msg = opening.descriptions.slice(0,35);
    
    node.innerHTML = `
      <div class="box">
        <h1 class="header">${opening.jobTitle}</h1>  
        <div class="text"> Exp: ${opening.experienceRequired}  year</div>
        <div class="text">Last Date: ${opening.lastDateToApply}</div>
        
        <p class="text" style = "
        margin-bottom: 0;">
          ${msg}
        </p>
        
        <a  onClick="applyNow(${opening.jobId})" class="applyBtn"
                    style="text-decoration: none;">Apply Now</a></div> 
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
      all_jobs = data;
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
      console.log(all_jobs);
      let item = all_jobs.filter(e=> e.jobId == jobId);
      console.log(item);
    
      localStorage.setItem("jobDetails", JSON.stringify(item))
      

      window.location.href= '../careers-apply/careersApplyNow.html';
    }