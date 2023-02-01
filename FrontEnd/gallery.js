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

    //Mise en place de la modale
    const galleryEditor = document.querySelector(".galleryeditor");
    const editorElement = document.createElement("editor");
    const editImage = document.createElement("img");
    editImage.src = article.imageUrl;
    editImage.crossOrigin = "anonymous";
    const divlogo = document.createElement("divlogo");
    const editerLogo = document.createElement("img");
    //Logo Trash sur les images pour delete
    editerLogo.src = "assets/icons/trash.svg";
    editerLogo.style.width = "15px";
    editerLogo.style.height = "15px";
    editerLogo.style.zIndex = 1;
    editerLogo.style.position = "fixed";
    editerLogo.style.marginLeft = "-20px";
    editerLogo.style.marginTop = "4px";
    editerLogo.style.background = "white";
    editerLogo.setAttribute("id", "trash");
    const editerTitre = document.createElement("h4");
    editerTitre.innerHTML = "éditer";

    galleryEditor.appendChild(editorElement);
    editorElement.appendChild(editImage);
    editorElement.appendChild(divlogo);
    divlogo.appendChild(editerLogo);
    editorElement.appendChild(editerTitre);
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



//récupération du token 
const token = localStorage.getItem("token");
console.log(token);

// mode edition
const OpenConnecte = async function (e) {
  e.preventDefault();
  if (token === null){
    return
  }else{
  connecte = docuement.getElementsByClassName(e.target.getAttribute("connecte"))
  connecte.style.display = 'flex'
  } 
}



// Modale
let modal = null;
const openModal = async function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  modal.style.display = null;
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.querySelectorAll(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
};

const boutonModal2 = document.querySelector("#btnphotomodal2");
boutonModal2.addEventListener("click", function () {
  document.querySelector("#modal2").style.display = null;
  document.querySelector("#modal1").style.display = "none";
});

const retour = document.querySelector('#retour')
retour.addEventListener("click", function (){
  document.querySelector("#modal1").style.display = null
  document.querySelector("#modal2").style.display = "none";
})

const closeAll = document.querySelectorAll(".js-modal-close");
closeAll.forEach(function(close) {
    close.addEventListener("click", function() {
      document.querySelector("#modal2").style.display = "none";
      document.querySelector("#modal1").style.display = "none";
    });
});
const stopPropagation = function (e) {
  e.stopPropagation();
};
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

//Aperçu de la photo avant de l'ajouter.
const blah = document.querySelector(".blah");
const apercu = document.querySelector(".apercu");
const montrer = document.querySelector(".montrer");

imgInp.onchange = () => {
  const [file] = imgInp.files;
  if (file) {
    blah.src = URL.createObjectURL(file);
    montrer.style.display = "block";
    apercu.style.display = "none";
  }
};

// supprimer des éléments
const trash = document.querySelectorAll("#trash")
trash.forEach(function(trash) {
  trash.addEventListener("click", function() {
    //faut-il mettre un $avant l'id dans le fetch ?
    fetch("http://localhost:5678/api/works/${id}", {
      method: "DELETE",
      body: null,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
    })
      .then((response) => response.json())
      .then((json) => alert("Document supprimé"));
  })
});

//Ajouter des Elements dans la modale 2
const formulairePhoto = document.querySelector("#btnvalider");

formulairePhoto.addEventListener("submit", function (e) {
  e.preventDefault();

  const ajoutPhoto = new ajoutPhoto(formulairePhoto);
  ajoutPhoto.append("image", e.target.querySelector("[name=imageUrl]").files[0]);
  ajoutPhoto.append("title", e.target.querySelector("[name=title]").value);
  ajoutPhoto.append("category", e.target.querySelector("[name=category]").value);

  console.log(ajoutPhoto);

  fetch("http://localhost:5678/api/works"),
    {
      method: "POST",
      headers: {
        'accepte': "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: ajoutPhoto,
    };
});
