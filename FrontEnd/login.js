document.querySelector("#connect").addEventListener("click", async function (e) {
  e.preventDefault()
    await fetch("http://localhost:5678/api/users/login", {
      method : "POST",
      Headers : {
        "accepte": "application/json",
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        email : document.getElementById('maileuh').value,
        password : document.getElementById('pass').value
    })
  }
    .then(function(response){
      if (response.ok){
        console.log("yyyaaaaaaaa");
  
      }else{
        alert("nnnnnoooooooo");
      }
    })
    .catch(function (error){
      console.log(error);
    })
    )
  })




