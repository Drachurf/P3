const form = {
  email: document.querySelector("#maileuh"),
  password: document.querySelector("#pass"),
  submit: document.querySelector("#btnconnection"),
};
let button = form.submit.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Erreur dans l’identifiant ou le mot de passe");
      } else {
        location.replace(
          "index.html"
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});