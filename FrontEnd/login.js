// Connexion
document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault()

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  let login = {
    email: document.getElementById(email),
    password: document.getElementById(password),
  };

  let response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "accepte": "application/json",
      "Content-Type": "application/json;",
    },
    body: JSON.stringify(login),
  });
console.log(response);
console.log(email);
console.log(password);
console.log(login);
});
