const BASE_URL = "https://wealthfx-net.onrender.com"; // Your Render backend
let jwtToken = localStorage.getItem("jwt") || "";

// Show/Hide Tabs
function showTab(tab) {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");

  document.getElementById("tab-login").classList.remove("bg-blue-600");
  document.getElementById("tab-register").classList.remove("bg-green-600");

  if (tab === "login") {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("tab-login").classList.add("bg-blue-600");
  } else if (tab === "register") {
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("tab-register").classList.add("bg-green-600");
  } else if (tab === "dashboard") {
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("tab-dashboard").classList.remove("hidden");
    fetchBalance();
  }
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
    showTab("dashboard");
  } else {
    document.getElementById("loginResult").innerText = data.message || JSON.stringify(data);
  }
}

// Logout
function logout() {
  localStorage.removeItem("jwt");
  jwtToken = "";
  showTab("login");
}

// Fetch Balance
async function fetchBalance() {
  if (!jwtToken) return alert("Please login first!");

  const res = await fetch(`${BASE_URL}/api/auth/user`, {
    headers: { "x-auth-token": jwtToken }
  });

  if (!res.ok) return;

  const user = await res.json();
  document.getElementById("balance").innerText = user.balance || 0;
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
  showTab("dashboard");
    }
