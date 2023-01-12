const reponse = await fetch("gallery.json");
const pieces = await reponse.json();

const article = pieces[0];

const sectionGallery = document.querySelector(".gallery");

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("figcaption");
nomElement.innerText = article.nom;

sectionGallery.appendChild(imageElement);
sectionGallery.appendChild(nomElement);
