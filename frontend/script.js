async function fetchBalance() {
  if (!jwtToken) return alert("Please login first!");

  const res = await fetch(`${BASE_URL}/api/auth/user`, {
    headers: { "x-auth-token": jwtToken }
  });

  if (!res.ok) {
    document.getElementById("balance").innerText = "Server error";
    return;
  }

  const user = await res.json();
  document.getElementById("balance").innerText = user.balance || 0;
}
