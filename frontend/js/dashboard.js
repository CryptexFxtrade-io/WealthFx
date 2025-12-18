const API = "https://fxwealth-backend.onrender.com/api";
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
};

async function loadUser() {
  const res = await fetch(`${API}/user/me`, { headers });
  const user = await res.json();
  balance.textContent = user.balance;
}

async function loadPlans() {
  const res = await fetch(`${API}/user/plans`, { headers });
  const plans = await res.json();
  plans.forEach(p => {
    plansEl.innerHTML += `<option value="${p._id}">${p.name}</option>`;
  });
}

async function invest() {
  await fetch(`${API}/user/invest`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      planId: plans.value,
      amount: amount.value
    })
  });
  alert("Investment submitted");
  loadUser();
}

loadUser();
loadPlans();
