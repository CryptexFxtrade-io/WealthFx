const API = "https://fxwealth-backend.onrender.com/api";

async function loadUsers() {
  const res = await fetch(`${API}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const users = await res.json();
  const div = document.getElementById("users");
  div.innerHTML = users.map(u =>
    `<p>${u.name} | ${u.email} | Balance: $${u.balance}</p>`
  ).join("");
}

async function loadDeposits() {
  const res = await fetch(`${API}/admin/deposits`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const deposits = await res.json();
  const div = document.getElementById("deposits");
  div.innerHTML = deposits.map(d =>
    `<p>${d.userId} | $${d.amount} | ${d.currency} | Status: ${d.status} 
    <button onclick="approveDeposit('${d._id}')">Approve</button></p>`
  ).join("");
}

async function approveDeposit(id) {
  const res = await fetch(`${API}/admin/approve-deposit`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}` 
    },
    body: JSON.stringify({ depositId: id })
  });
  const data = await res.json();
  alert(data.msg);
  loadUsers();
  loadDeposits();
}

async function loadWithdrawals() {
  const res = await fetch(`${API}/admin/withdrawals`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const withdrawals = await res.json();
  const div = document.getElementById("withdrawals");
  div.innerHTML = withdrawals.map(w =>
    `<p>${w.userId} | $${w.amount} | Wallet: ${w.walletAddress} | Status: ${w.status}
    <button onclick="approveWithdrawal('${w._id}')">Approve</button></p>`
  ).join("");
}

async function approveWithdrawal(id) {
  const res = await fetch(`${API}/admin/approve-withdrawal`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}` 
    },
    body: JSON.stringify({ withdrawalId: id })
  });
  const data = await res.json();
  alert(data.msg);
  loadUsers();
  loadWithdrawals();
}

async function createPlan() {
  const name = document.getElementById("planName").value;
  const min = document.getElementById("planMin").value;
  const max = document.getElementById("planMax").value;
  const roiPercent = document.getElementById("planROI").value;
  const durationDays = document.getElementById("planDuration").value;

  const res = await fetch(`${API}/admin/create-plan`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}` 
    },
    body: JSON.stringify({ name, min, max, roiPercent, durationDays })
  });
  const data = await res.json();
  alert(data.msg);
}

loadUsers();
loadDeposits();
loadWithdrawals();
