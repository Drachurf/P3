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
    
   /* const sectionEditor = document.querySelector(".galleryEditor");
    const imageEditorElement = document.createElement("img");
    imageEditorElement.src = article.imageUrl;
    imageEditorElement.crossOrigin = "anonymous";

    EditorElement.appendChild(imageEditorElement);*/
    
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

// Modale

let modal = null

const openModal = async function (e) {
  e.preventDefault()
  modal = document.querySelector(e.target.getAttribute('href'))
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}


const closeModal = function(e){
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden','true')
  modal.removeAttribute('aria-modal')
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


//Ajouter des Elements dans la modale

export function ajoutListenerAjoutPhoto() {
  const formulairePhoto = document.querySelector(".ajout-photo");
  formulairePhoto.addEventlistener("submit", function (e) {
    e.preventDefault();

// Objet de la photo

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
