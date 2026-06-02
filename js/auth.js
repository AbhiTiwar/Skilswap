function signup() {
  const name = document.querySelector(".signup-name").value;
  const email = document.querySelector(".signup-email").value;
  const password = document.querySelector(".signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successful!");
  window.location.href = "login.html";
}

function login() {
  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user found. Please signup first.");
    return;
  }

  if (email === user.email && password === user.password) {
    alert("Login successful!");
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
