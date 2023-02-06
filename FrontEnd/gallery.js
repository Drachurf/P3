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
    editerLogo.setAttribute("class", "trash");
    editerLogo.id = article.id;

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

try {
  const token = JSON.parse(localStorage.getItem("bearer"));
  const connecte = token ? "flex" : "none";
  document.querySelectorAll(".connecte").forEach((element) => {
    element.style.display = connecte;
  });
} catch (error) {
  console.error(error);
}

// mode fenetre modale
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const boutonModal2 = document.querySelector("#btnphotomodal2");
const closeAll = document.querySelectorAll(".js-modal-close");

let modal = null;
const openModal = async function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    (modal.style.display = null),
      modal.addEventListener("click", closeModal),
      modal.querySelector(".js-modal-close").addEventListener("click", closeModal),
      modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  },
  closeModal = function (e) {
    if (null === modal) return;
    e.preventDefault(),
      modal.removeEventListener("click", closeModal),
      modal.querySelector(".js-modal-close").removeEventListener("click", closeModal),
      modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  },
  stopPropagation = function (e) {
    e.stopPropagation();
  };
document.querySelectorAll(".js-modal").forEach((e) => {
  e.addEventListener("click", openModal);
}),
  window.addEventListener("keydown", function (e) {
    ("Escape" !== e.key && "Esc" !== e.key) || closeModal(e)
  });

// ouvrir la modal2
boutonModal2.addEventListener("click", function () {
  document.querySelector("#modal2").style.display = null;
  document.querySelector("#modal1").style.display = "none";
});

// passer de a modal2 à modal1
const retour = document.querySelector("#retour");
retour.addEventListener("click", function () {
  document.querySelector("#modal1").style.display = null;
  document.querySelector("#modal2").style.display = "none";
});

// Click extérieur ferme les modales
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
// fermer toutes les modales
closeAll.forEach(function (close) {
  close.addEventListener("click", function () {
    document.querySelector("#modal2").style.display = "none";
    document.querySelector("#modal1").style.display = "none";
  });
});

window.addEventListener("click", function (event) {
  if (event.target === modal2) {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
});

//Aperçu de la photo avant de l'ajouter.
const blah = document.querySelector(".blah");
const apercu = document.querySelector(".apercu");
const montrer = document.querySelector(".montrer");
const newPhoto = document.querySelector(".newphoto");

imgInp.onchange = () => {
  const [file] = imgInp.files;
  if (file) {
    blah.src = URL.createObjectURL(file);
    montrer.style.display = "block";
    apercu.style.display = "none";
  }
};

// supprimer des éléments
const trash = document.querySelectorAll(".trash");
trash.forEach(function (trash) {
  trash.addEventListener("click", function (e) {
    let id = e.target.id;
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      body: null,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      alert("Document supprimé");
    });
  });
});

//Ajouter des Elements dans la modale 2
const formulairePhoto = document.getElementById("btnvalider");
const addImage = document.querySelector("#imgInp");
const addTitre = document.getElementById("title");
const addCategory = document.getElementById("category");

formulairePhoto.addEventListener("click", async function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", addImage.files[0], addImage.files[0].name);
  formData.append("title", addTitre.value);
  formData.append("category", addCategory.value);
  await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  }).then(async (response) => {
    if (response.ok) {
      alert("Document ajouté");
    } else {
      alert("raté !");
    }
  });
});
