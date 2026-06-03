/* =========================
   SKILLSWAP DASHBOARD LOGIC
========================= */

/* -------------------------
   SESSION CHECK
-------------------------- */
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}

/* -------------------------
   USER INIT
-------------------------- */
let user = JSON.parse(localStorage.getItem("user")) || {
  name: "User",
  email: "Not set"
};

document.getElementById("userName").innerText = user.name;

// PROFILE FILL
document.getElementById("profileName").innerText = user.name;
document.getElementById("profileEmail").innerText = user.email;
document.getElementById("fullName").innerText = user.name;
document.getElementById("email").innerText = user.email;

/* -------------------------
   SIDEBAR NAVIGATION
-------------------------- */

const menuItems = document.querySelectorAll(".menu-item");
const sections = document.querySelectorAll(".content-section");

menuItems.forEach(item => {
  item.addEventListener("click", () => {

    // active class
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // show section
    const target = item.getAttribute("data-section");

    sections.forEach(sec => {
      sec.classList.remove("active-section");
    });

    document.getElementById(target).classList.add("active-section");

  });
});

/* -------------------------
   LOGOUT
-------------------------- */

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

/* -------------------------
   SKILLS SYSTEM
-------------------------- */

let skills = JSON.parse(localStorage.getItem("skills")) || [];

function renderSkills() {
  const list = document.getElementById("skillsList");
  list.innerHTML = "";

  skills.forEach((skill, index) => {
    const div = document.createElement("div");
    div.classList.add("skill-item");

    div.innerHTML = `
      ${skill}
      <span style="margin-left:10px; cursor:pointer;" onclick="deleteSkill(${index})">❌</span>
    `;

    list.appendChild(div);
  });

  document.getElementById("skillsCount").innerText = skills.length;
}

function addSkill() {
  const input = document.getElementById("skillInput");
  const value = input.value.trim();

  if (value === "") return;

  skills.push(value);
  localStorage.setItem("skills", JSON.stringify(skills));

  input.value = "";
  renderSkills();
}

function deleteSkill(index) {
  skills.splice(index, 1);
  localStorage.setItem("skills", JSON.stringify(skills));
  renderSkills();
}

/* -------------------------
   INIT
-------------------------- */
renderSkills();




const users = [
  { name: "Rahul Sharma", skills: ["React", "UI"] },
  { name: "Priya Verma", skills: ["Figma", "Design"] },
  { name: "Aman Gupta", skills: ["Node", "JS"] }
];

function renderDiscover(filter = "") {
  const container = document.querySelector(".discover-grid");
  container.innerHTML = "";

  users
    .filter(u => u.skills.join(" ").toLowerCase().includes(filter.toLowerCase()))
    .forEach(user => {
      container.innerHTML += `
        <div class="discover-card">
          <h3>${user.name}</h3>
          <p>${user.skills.join(", ")}</p>
          <button onclick="sendRequest('${user.name}')">Request Swap</button>
        </div>
      `;
    });
}

function sendRequest(name) {
  addNotification("Request sent to " + name);
}



document.querySelector(".search-box input")
.addEventListener("input", (e) => {
  renderDiscover(e.target.value);
});




let requests = [
  { from: "Priya Verma", skill: "JavaScript" }
];

function renderRequests() {
  const container = document.querySelector("#requestsSection");

  container.innerHTML = "";

  requests.forEach((r, index) => {
    container.innerHTML += `
      <div class="request-card">
        <h3>${r.from}</h3>
        <p>wants to learn ${r.skill}</p>

        <button onclick="acceptReq(${index})">Accept</button>
        <button onclick="rejectReq(${index})">Reject</button>
      </div>
    `;
  });
}

function acceptReq(i) {
  addNotification("Request Accepted");
  requests.splice(i,1);
  renderRequests();
}

function rejectReq(i) {
  addNotification("Request Rejected");
  requests.splice(i,1);
  renderRequests();
}


let notifications = [];

function addNotification(text) {
  notifications.push(text);

  const count = document.getElementById("notifCount");
  if (count) count.innerText = notifications.length;

  renderNotifications();
}

function renderNotifications() {
  const panel = document.getElementById("notifPanel");
  if (!panel) return;

  panel.innerHTML = "";

  notifications.forEach(n => {
    panel.innerHTML += `<p style="margin:5px 0;">• ${n}</p>`;
  });
}

function toggleNotif() {
  const panel = document.getElementById("notifPanel");

  if (!panel) return;

  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
}



renderDiscover();


document.querySelector(".search-box input")

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderDiscover(e.target.value);
  });
}
