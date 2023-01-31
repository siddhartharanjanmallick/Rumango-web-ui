const sidenavTemplet = document.createElement('template');

console.log("custome header");
sidenavTemplet.innerHTML = `
<link rel="stylesheet" href="../sidenav/sidenav.css">



<div class = "sideclass">
<div>
<img id="company-logo" src="../src/assets/Rumango-img.png"/>
</div>
<div class="sidenav">
<ul>
    <li><a href="../admin-dashboard/adminDashboard.html" onClick="sidenavColor('Dashboard')" id='sideUU'  class=" Dashboard dashboard-link">
            <span><img src="../src/assets/dashboard-img.png"/></span>
            <span>Dashboard</span>
        </a></li>
    <li><a href="../new-job-list/NewJobDetails.html" id='sideUU' onClick="sidenavColor('NewJob')"  class = "NewJob">
            <span><img src="../src/assets/new-job-img.png"/></span>
            <span>New Job</span>
        </a></li>
    <li><a href="../JobListPage/JobListPage.html" id='sideUU' onClick="sidenavColor('JobList')"  class = "JobList">
            
            <span><img src="../src/assets/job-list-img.png"/></span>
            <span>Job List</span>
        </a></li>
    <li>
        <a href="../view-resume/ViewResumePage.html" id='sideUU' onClick="sidenavColor('ViewResume')"  class = "ViewResume">
            <span><img src="../src/assets/f0bf2e7c6123ebe172530398396c947c.png"/></span>
            <span>View Resume</span>
        </a></li>
    <li><a href="../contacts-list-page/ContactsListPage.html" id='sideUU'  onClick="sidenavColor('ContactList')"  class = "ContactList">
            <span><img src="../src/assets/contact-list-img.png"/></span>
            <span> Contact List</span>
        </a></li>
</ul>
</div>
<div class="logout">
    <div class="logouthead">
    <h1>?</h1></div>
    <img class=" imgq" src="../src/assets/5de2224ccd85afb81825eb968620f18d.png"/>
    <a href="../login/loginPage.html"><input type="button" value="Logout" class="logoutbtn"/></a>
</div>
</div> `


class sideclass extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(sidenavTemplet.content);

    }
    
    
}

customElements.define('sidenav-component', sideclass);

function sidenavColor(evtt){
    let dct = evtt.toString();

    console.log(dct);
    localStorage["sidelink"] = dct;
    
    console.log (document.querySelector('sidenav-component'));
    const sideModule = document.querySelector('sidenav-component');
    const searchModuleRoot = sideModule && sideModule.shadowRoot;
    console.log(searchModuleRoot.querySelectorAll('#sideUU'));
    let sidelink = searchModuleRoot.querySelectorAll('#sideUU');
    
    sidelink.forEach(e=>{
    console.log(e.classList);
    e.classList.remove('back');
})
let side12 = searchModuleRoot.querySelector('.'+dct+'');
console.log(side12);

side12.classList.add('back');

console.log(searchModuleRoot.querySelector('.'+dct+''));
    
}