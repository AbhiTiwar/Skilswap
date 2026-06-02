function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
  }

  document.getElementById("userEmail").innerText = user.email;
});