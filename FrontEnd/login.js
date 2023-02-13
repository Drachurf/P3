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
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
    
        sessionStorage.setItem("bearer", JSON.stringify(data.token));
        sessionStorage.setItem("token", data.token)
        location.replace("index.html");
  
    })
    .catch((err) => {
      console.log(err);
      alert("Erreur dans l’identifiant ou le mot de passe");;
    });
});