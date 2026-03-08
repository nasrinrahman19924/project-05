function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u==="admin" && p==="admin123")
{
window.location="dashboard.html"
}
else
{
document.getElementById("error").innerText="Invalid Login"
}

};

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container = document.getElementById("issuesContainer")

const loader = document.getElementById("loader")

async function loadIssues(){

showLoader();

const res = await fetch(API)

const data = await res.json()

displayIssues(data.data)

hideLoader()

}

async function loadOpen(){

showLoader()

const res = await fetch(API)

const data = await res.json()

const filtered = data.data.filter(i => i.status === "open")

displayIssues(filtered)

hideLoader();

};

async function loadClosed(){

showLoader();

const res = await fetch(API)

const data = await res.json()

const filtered = data.data.filter(i => i.status === "closed")

displayIssues(filtered)

hideLoader()

}


function displayIssues(issues){

container.innerHTML=""

document.getElementById("issueCount").innerText = issues.length

issues.forEach(issue => {


const border = issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"

const card = document.createElement("div")

card.className=`bg-white p-4 shadow rounded ${border}`

card.innerHTML=`

<h2 class="font-bold">${issue.title}</h2>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>Created: ${issue.createdAt}</p>

`

card.onclick=()=>openModal(issue)

container.appendChild(card)

})

};

function openModal(issue){

document.getElementById("modal").classList.remove("hidden")

document.getElementById("modalTitle").innerText=issue.title
document.getElementById("modalDesc").innerText=issue.description
document.getElementById("modalStatus").innerText="Status: "+issue.status
document.getElementById("modalAuthor").innerText="Author: "+issue.author
document.getElementById("modalPriority").innerText="Priority: "+issue.priority
document.getElementById("modalLabel").innerText="Label: "+issue.label

}

function closeModal(){

document.getElementById("modal").classList.add("hidden")

}

function showLoader(){

loader.classList.remove("hidden")

}

function hideLoader(){

loader.classList.add("hidden")

}

async function searchIssue(){

const text = document.getElementById("searchInput").value

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

}

loadIssues();