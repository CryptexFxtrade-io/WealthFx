const API = "https://fxwealth-backend.onrender.com/api";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const forms = document.querySelectorAll(".form-section");

// Toggle forms
showRegister?.addEventListener("click", () => {
  forms[0].style.display = "none";
  forms[1].style.display = "block";
});

showLogin?.addEventListener("click", () => {
  forms[1].style.display = "none";
  forms[0].style.display = "block";
});

// Login
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    // Redirect to user or admin dashboard
    if(data.user.role === "admin") window.location.href = "admin.html";
    else window.location.href = "dashboard.html";
  } else {
    alert(data.msg || "Login failed");
  }
});

// Register
registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: regName.value,
      email: regEmail.value,
      password: regPassword.value
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registration successful! Please login.");
    forms[1].style.display = "none";
    forms[0].style.display = "block";
  } else {
    alert(data.msg || "Registration failed");
  }
});
