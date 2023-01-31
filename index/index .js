var preUrl = localStorage['previURL'];
console.log(preUrl);
    if (preUrl == "ShowTime") {
      const element = document.querySelector(".body3");
      console.log(element);
      element.scrollIntoView(true);
      localStorage['previURL'] = '';
    //   localStorage.setItem("previURL", preUrl);
    }
//    let  ontimeDelCount  = 100 ; 
//    let count = 1 ;
//   var ontimeDelivery =  document.getElementById('ontimeDelivery');

//   const int =  setInterval(() => {
//     ontimeDelivery.innerHTML = count;
//     count ++ ;
//     while (count == 102) {
//       clearInterval(int)
//     }
//    }, 50);

//  document.querySelector('#navClose').addEventListener('scroll', ()=>{

//  })
function route(){
  localStorage["navlink"] = "Careers";
 window.location.replace("../careers/careers.html");
}