const bottone = document.getElementById("bottone");
const testo = document.getElementById("testo");

bottone.addEventListener("click", function () {
  localStorage.setItem("login", "true");
  window.location.reload();
});

if (localStorage.getItem("login") === "true") {
  bottone.textContent = "Logout";
  testo.textContent = "Benvenuto";
  bottone.addEventListener("click", function () {
    localStorage.setItem("login", "false");
    window.location.reload();
  });
}
if (localStorage.getItem("login") === "false") {
  bottone.textContent = "Login";
  testo.textContent = "";
}
