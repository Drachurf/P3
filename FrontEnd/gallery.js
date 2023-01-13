// Récupération des cartes depuis le fichier JSON
const reponse = await fetch('gallery.json');
const gallery = await reponse.json();

for (let i = 0; i < gallery.length; i++) {
// Elements récupérés
const article = gallery[i];

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h3");
nomElement.innerText = article.nom;

const sectionGallery = document.querySelector(".gallery");
sectionGallery.appendChild(imageElement);
sectionGallery.appendChild(nomElement);

};

// Filtres

const boutonObjet = document.querySelector(".btnobjet");

boutonObjet.addEventListener("click", function () {
    const galleryObjet = gallery.filter(function (gallery) {
        return gallery.categorie["Objet"] /*objet.....????*/
    });
   console.log(galleryObjet)
});
