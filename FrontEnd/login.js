// Connexion
document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault()

  const mail = document.querySelector("#mail");
  const password = document.querySelector("#password");

  let login = {
    mail: document.getElementById(mail),
    password: document.getElementById(password),
  };

  let response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "accepte": "application/json",
      "Content-Type": "application/json;",
    },
    body: JSON.stringify(login),
  })

  .then(function (response) {
    if (response.ok) {
      console.log("good");
    } else {
      alert("non");
    }
  });
  console.log(response);
  console.log(email);
  console.log(password);
  console.log(login);
});