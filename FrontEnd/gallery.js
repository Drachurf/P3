// Récupération des cartes depuis API
const works = await fetch("http://localhost:5678/api/works");
const articles = await works.json();
const categories = await fetch("http://localhost:5678/api/categories");
const filtres = await categories.json();

function genererArticles(articles) {
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    //Récupération de l'élément du DOM qui accueillera les fiches + créations balises
    const sectionGallery = document.querySelector(".gallery");
    const galleryElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.crossOrigin = "anonymous";
    imageElement.alt = article.title;

    const nomElement = document.createElement("h3");
    nomElement.innerText = article.title;

    sectionGallery.appendChild(galleryElement);
    galleryElement.appendChild(imageElement);
    galleryElement.appendChild(nomElement);
  }
}
genererArticles(articles);

// filtre TOUS
const boutonTous = document.querySelector("#btntous");
boutonTous.addEventListener("click", function () {
  const articlesNofiltre = articles.filter(function (article) {
    return article.id
  });
  document.querySelector(".gallery").innerHTML = "";
  console.log(articlesNofiltre);
  genererArticles(articlesNofiltre);
});

// Filtres Objet id: 1 = objet
const boutonObjet = document.querySelector("#btnobjet");

boutonObjet.addEventListener("click", function () {
  const filtreObjets = articles.filter(function (article) {
    return article.category.id === 1;
  });

  document.querySelector(".gallery").innerHTML = "";
  console.log(filtreObjets);
  genererArticles(filtreObjets);
});

// Filtres Appartement id: 2
const boutonAppart = document.querySelector("#btnappart");

boutonAppart.addEventListener("click", function () {
  const filtreApparts = articles.filter(function (article) {
    return article.category.id === 2;
  });

  document.querySelector(".gallery").innerHTML = "";
  console.log(filtreApparts);
  genererArticles(filtreApparts);
});

// Filtres Hôtel id: 3
const boutonHotel = document.querySelector("#btnhotel");

boutonHotel.addEventListener("click", function () {
  const filtreHotels = articles.filter(function (article) {
    return article.category.id === 3;
  });

  document.querySelector(".gallery").innerHTML = "";
  console.log(filtreHotels);
  genererArticles(filtreHotels);
});

const boutonSubmit = document.querySelector("#submit");
boutonSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  let login = {
    email: email,
    password: password,
  };

  let response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(login),
  });

  console.log(response);
});

/* function(json) { // Si ça c'est passé avec succès
    // ici on teste la réponse
    if(json.reponse === 'ok') {
      alert('Connexion OK');
      // On peut aussi rediriger vers l'index
      window.location.href = 'index.html';
    } else {
      alert('Erreur : '+ json.reponse);  }
    };*/
