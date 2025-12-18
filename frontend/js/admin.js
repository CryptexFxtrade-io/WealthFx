const API = "https://fxwealth-backend.onrender.com/api";
const token = localStorage.getItem("token");

fetch(`${API}/admin/users`, {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(users => {
  users.forEach(u => {
    usersEl.innerHTML += `<li>${u.email} - $${u.balance}</li>`;
  });
});
