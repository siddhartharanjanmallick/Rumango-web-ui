const headerTemplate = document.createElement('template');

console.log("custome header");
headerTemplate.innerHTML = `

<link href="../Header/header.css" rel="stylesheet">


<div class="nevbar">
<div class="company_img">
    <img src="../src/assets/614b98b6d6c2c120cd1c8365b4c83e09.png"  class="companyimg">
</div>

<nav>
    <ul>
       
        <li><a href="../index/index.html" onClick="Highlight('Home')" id='link' class='Home link' >Home</a></li>
        <li><a href="../about/aboutUs.html" onClick="Highlight('About')" id='link' class='About link' >About</a></li>
        <li><a href="../ourservices/ourServices.html" onClick="Highlight('Ourservice')" id='link' class='Ourservice link' >Our Service</a></li>
        <li><a href="../ourproducts/ourProducts.html" onClick="Highlight('Ourproducts')" id='link' class='Ourproducts link' >Our Products</a></li>
        <li><a href="../careers/careers.html" onClick="Highlight('Careers')"  id='link' class='Careers link' >Careers</a></li>
        <li><a href="../contact-us/contactUs.html" onClick="Highlight('Contactus')" id='link' class='Contactus link' >Contact Us</a></li>
    </ul>
</nav>
<img src="../src/assets/a5143069a86e59d8b1f942b3d15a0a5e.png" onclick="openNav()" class="manu">

</div>
<div id="mySidenav" class="sidenav">
<h2 class = "gation">Rumango</h2>
<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
<div class = "links_for">
<a href="https://www.facebook.com/rumangotech">Facebook</a>
<a href="https://www.twitter.com/Rumango1" >Twitter</a>
<a href="https://www.linkedin.com/in/rumango-566a62212/" >LinkedIn</a>
<a href="#">Terms & Conditions</a>
<a href="../privacypolicy/privacyPolicy.html" >Privacy policy</a>
<a href="../company-location/companyLocations.html" >Company Locations</a>
<a href="../faqs/FAQs.html" >Support Portal</a>
<a href="../login/loginPage.html">Admin Login</a>

<h3 class = "partner">Partnership</h3>

<img src="../src/assets/oracle.png" alt="Oracle Gold Partner" class="animate-intro fadeInUp animated oracleImg"  >

</div>
</div>

`

class nevbar extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(headerTemplate.content);
        const headerModule = document.querySelector('header-component');
console.log(headerModule);
const searchModuleRoot = headerModule && headerModule.shadowRoot;
console.log(searchModuleRoot.querySelectorAll('#link'));
let link = searchModuleRoot.querySelectorAll('#link');

link.forEach(e=>{
    console.log(e.classList);
   for (let index = 0; index < e.classList.length; index++) {
            if(e.classList[0] == localStorage["navlink"]){
                e.classList.add('color');
                localStorage["navlink"]= '';
            }

            // localStorage["navlink"]= '';
   }

   
})
    }
    
    
}
 

customElements.define('header-component', nevbar);


 function Highlight(evt){
console.log(evt);
let dct = evt.toString();

console.log(dct);
localStorage["navlink"] = dct;

console.log (document.querySelector('header-component'));
const headerModule = document.querySelector('header-component');
const searchModuleRoot = headerModule && headerModule.shadowRoot;
console.log(searchModuleRoot.querySelectorAll('#link'));
let link = searchModuleRoot.querySelectorAll('#link');

link.forEach(e=>{
    console.log(e.classList);
    e.classList.remove('color');
})
let header1 = searchModuleRoot.querySelector('.'+dct+'');
console.log(header1);

header1.classList.add('color');

console.log(searchModuleRoot.querySelector('.'+dct+''));
}



 function openNav() {
    const headerModule = document.querySelector('header-component');
    const searchModuleRoot = headerModule && headerModule.shadowRoot;
    console.log(searchModuleRoot.getElementById("mySidenav"));
    searchModuleRoot.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    const headerModule = document.querySelector('header-component');
    const searchModuleRoot = headerModule && headerModule.shadowRoot;
    searchModuleRoot.getElementById("mySidenav").style.width = "0";
  }


