const API = "https://fxwealth-backend.onrender.com/api";

document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  window.location.href = "dashboard.html";
});
