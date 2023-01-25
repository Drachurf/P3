// Récupération des photos depuis API
const works = await fetch("http://localhost:5678/api/works");
const articles = await works.json();


//générer la gallerie + affichage des photos dans la modal
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

//clone du des images pour la modale
    const galleryEditor = document.querySelector(".galleryeditor");
    const editorElement = document.createElement("editor")
    const editerTitre = document.createElement("h4");
    const cloneGallery = imageElement.cloneNode(true);

    galleryEditor.appendChild(editorElement)
    editorElement.appendChild(cloneGallery)
    editorElement.appendChild(editerTitre)   
  }
}
genererArticles(articles);



// filtre TOUS
const boutonTous = document.querySelector("#btntous");
boutonTous.addEventListener("click", function () {
  const articlesNofiltre = articles.filter(function (article) {
    return article.id;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererArticles(articlesNofiltre);
});

// Filtres Objet id: 1 = objet
const boutonObjet = document.querySelector("#btnobjet");

boutonObjet.addEventListener("click", function () {
  const filtreObjets = articles.filter(function (article) {
    return article.category.id === 1;
  });

  document.querySelector(".gallery").innerHTML = "";
  genererArticles(filtreObjets);
});

// Filtres Appartement id: 2
const boutonAppart = document.querySelector("#btnappart");

boutonAppart.addEventListener("click", function () {
  const filtreApparts = articles.filter(function (article) {
    return article.category.id === 2;
  });

  document.querySelector(".gallery").innerHTML = "";
  genererArticles(filtreApparts);
});

// Filtres Hôtel id: 3
const boutonHotel = document.querySelector("#btnhotel");

boutonHotel.addEventListener("click", function () {
  const filtreHotels = articles.filter(function (article) {
    return article.category.id === 3;
  });

  document.querySelector(".gallery").innerHTML = "";
  genererArticles(filtreHotels);
});

const boutonModal2 = document.querySelector("#btnphotomodal2");

// Modale
let modal = null
const openModal = async function (e) {
  e.preventDefault()
  modal = document.querySelector(e.target.getAttribute('href'))
  modal.style.display = null
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}
const closeModal = function(e){
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null
}
const stopPropagation = function (e){
    e.stopPropagation()
}
document.querySelectorAll('.js-modal').forEach(a=> {
  a.addEventListener('click', openModal)
})
window.addEventListener('keydown', function (e){
  if (e.key === "Escape" || e.key === "Esc"){
    closeModal(e)
  }
})




//Ajouter des Elements dans la modale 2
export function ajoutListenerAjoutPhoto() {
  const formulairePhoto = document.querySelector(".ajout-photo");
  formulairePhoto.addEventlistener("submit", function (e) {
    e.preventDefault();

// Ajouter des photos
    const ajoutPhoto = {
      photoId: parseInt(e.target.querySelector("[name=id]").value),
      imageUrl: parseInt(e.target.querySelector("[name=imageUrl]").value),
      title: parseInt(e.target.querySelector("[name=title]").value),
      categoryId: parseInt(e.target.querySelector("[name=categoryId]").value),
      };
      const chargeUtile = JSON.stringify(ajout);

      fetch("http://localhost:5678/api/works"), {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: chargeUtile
      }

  })
  console.log(ajoutPhoto);
}
