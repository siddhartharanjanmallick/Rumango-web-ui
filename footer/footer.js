const footerTemplate = document.createElement('template');
console.log("dfsdfsda");
footerTemplate.innerHTML = `

<link href="../footer/footer.css" rel="stylesheet">


<div class="navbar">
<div class="contact-us-head">
<div class="contact-us-body">

            <div class="ready">
                <h3>Ready To Do This</h3>
                <h1>Let's get to </h1>
                <h1 style="color:white">[Work]</h1>
                <a href="#">Contact Us</a>
            </div>

             <div class="contact-img">   
                <img src="../src/assets/8856da0d3d8086d9f05123942941d39c.png""  class="img">
            </div>
</div>

    


</div>
<div class="links-head">

        <div class="links">
        <h2><b>Quick [Link]</b></h2>
        <ul>
            
        <li><a href="../index/index.html"     onClick="foter('Home')"  class="Home" >Home</a></li>
        <li><a href="../about/aboutUs.html"  onClick="foter('About')"  class="About">About</a></li>
        <li><a href="../ourservices/ourServices.html"   onClick="foter('Ourservice')"  class="OurService">Our Service</a></li>
        <li><a href="../ourproducts/ourProducts.html"   onClick="foter('Ourproducts')"  class="OurProducts">Our Products</a></li>
        <li><a href="../careers/careers.html"   onClick="foter('Careers')"   class="Careers">Careers</a></li>
        <li><a href="../contact-us/contactUs.html"   onClick="foter('Contactus')"  class="ContactUs">Contact Us</a></li>
        </ul>
        </div>


        <div class="links2">
        <h2><b>Say [Hello]</b></h2>
        <ul>
            
        <li>info@rumango.com</li>
        <li>(+91)80 4090 5061</li>
        </ul>
        </div>



        </div>


</div>
      

`

class footer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(footerTemplate.content);

    }

}

customElements.define('footer-component', footer);


 function foter(evt){
    let dct = evt.toString();

    console.log(dct);
    localStorage["navlink"] = dct;
 }
// style="color: #ff6700;"

{/* <li><a href="/index.html" >Home</a></li>
<li><a href="/about/aboutUs.html" style="color: #ff6700;">[About]</a></li>
<li><a href="/ourservices/ourServices.html">Our Service</a></li>
<li><a href="/ourproducts/ourProducts.html">Our Products</a></li>
<li><a href="/careers/careers.html">Careers</a></li>
<li><a href="/contact-us/contactUs.html">Contact Us</a></li> */}