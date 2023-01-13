// Récupération des cartes depuis le fichier JSON
const reponse = await fetch('gallery.json');
const articles = await reponse.json();

function genererArticles(articles){
for (let i = 0; i < articles.length; i++) {
// Elements récupérés
        const article = articles[i];
        const sectionGallery = document.querySelector(".gallery");

        const galleryElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h3");
        nomElement.innerText = article.nom;

        sectionGallery.appendChild(galleryElement);

        galleryElement.appendChild(imageElement);
        galleryElement.appendChild(nomElement);

}}

genererArticles(articles);

// Filtres

const boutonObjet = document.querySelector(".btnobjet");

boutonObjet.addEventListener("click", function () {

    const articlesfiltres = articles.filter(function (article){
        return article.categorie
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(articlesfiltres);

    console.log(articlesfiltres);
});

const boutonTous = document.querySelector(".btntous");

boutonTous.addEventListener("click", function () {

    const articlesNofiltre = articles.filter(function (article){
        return article.id
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(articlesNofiltre);

    console.log(articlesNofiltre);
});


