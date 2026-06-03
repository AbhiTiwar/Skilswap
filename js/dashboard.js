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
let user = localStorage.getItem("user") || "User";

document.getElementById("userName").innerText = user;
document.getElementById("profileName").innerText = user;

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
