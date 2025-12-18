const BASE_URL = "https://wealthfx-net.onrender.com"; // Your live backend
let jwtToken = localStorage.getItem("jwt") || "";

// Show/Hide Forms
function showRegister() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}

// Show Dashboard
function showDashboard() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
}

// Register
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("regResult").innerText = data.message || JSON.stringify(data);
}

// Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok && data.token) {
    jwtToken = data.token;
    localStorage.setItem("jwt", jwtToken);
    showDashboard();
  } else {
    document.getElementById("loginResult").innerText = data.message || JSON.stringify(data);
  }
}

// Logout
function logout() {
  localStorage.removeItem("jwt");
  jwtToken = "";
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}

// Fetch Investments
async function getInvestments() {
  if (!jwtToken) return alert("Please login first!");

  const res = await fetch(`${BASE_URL}/api/investments`, {
    headers: { "x-auth-token": jwtToken }
  });

  const data = await res.json();
  document.getElementById("investments").innerText = JSON.stringify(data, null, 2);
}

// Auto-login if JWT exists
if (jwtToken) {
  showDashboard();
}
