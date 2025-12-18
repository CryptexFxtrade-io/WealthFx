const API = "https://fxwealth-backend.onrender.com/api";

async function loadProfile() {
  const res = await fetch(`${API}/user/me`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const user = await res.json();
  document.getElementById("profile").innerHTML =
    `<p>Name: ${user.name}</p><p>Email: ${user.email}</p><p>Balance: $${user.balance}</p>`;
}

async function loadPlans() {
  const res = await fetch(`${API}/user/plans`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const plans = await res.json();
  const planSelect = document.getElementById("planSelect");
  planSelect.innerHTML = plans.map(p =>
    `<option value="${p._id}">${p.name} | Min: ${p.min} | Max: ${p.max} | ROI: ${p.roiPercent}% | Duration: ${p.durationDays}d</option>`
  ).join("");
}

async function loadInvestments() {
  const res = await fetch(`${API}/user/investments`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const investments = await res.json();
  const div = document.getElementById("investments");
  div.innerHTML = investments.map(i =>
    `<p>Plan: ${i.planId.name} | Amount: $${i.amount} | Status: ${i.status} | Profit: $${i.profit} | Ends: ${new Date(i.endDate).toLocaleDateString()}</p>`
  ).join("");
}

async function submitDeposit() {
  const amount = document.getElementById("depositAmount").value;
  const currency = document.getElementById("depositCurrency").value;
  const txHash = document.getElementById("depositTx").value;

  const res = await fetch(`${API}/user/deposit`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}` 
    },
    body: JSON.stringify({ amount, currency, txHash })
  });

  const data = await res.json();
  alert(data.msg);
}

async function submitWithdrawal() {
  const amount = document.getElementById("withdrawAmount").value;
  const walletAddress = document.getElementById("withdrawWallet").value;

  const res = await fetch(`${API}/user/withdraw`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}` 
    },
    body: JSON.stringify({ amount, walletAddress })
  });

  const data = await res.json();
  alert(data.msg);
}

async function invest() {
  const planId = document.getElementById("planSelect").value;
  const amount = document.getElementById("investAmount").value;

  const res = await fetch(`${API}/user/invest`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}` 
    },
    body: JSON.stringify({ planId, amount })
  });

  const data = await res.json();
  alert(data.msg);
  loadProfile();
  loadInvestments();
}

// Initial load
loadProfile();
loadPlans();
loadInvestments();
