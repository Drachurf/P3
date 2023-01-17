// Récupération des cartes depuis API
const works = await fetch('http://localhost:5678/api/works');
const articles = await works.json();
const categories = await fetch ('http://localhost:5678/api/categories');
const filtres = await categories.json();


function genererArticles(articles){
    for (let i = 0; i < articles.length; i++) {

        const article = articles[i];
    //      Récupération de l'élément du DOM qui accueillera les fiches + créations balises
        const sectionGallery = document.querySelector(".gallery");
        const galleryElement = document.createElement("article");
        const imageElement = document.createElement("img");
           imageElement.src = article.imageUrl;
           imageElement.crossOrigin = 'anonymous';
           imageElement.alt = article.title;

        const nomElement = document.createElement("h3");
            nomElement.innerText = article.title;


        sectionGallery.appendChild(galleryElement);
        galleryElement.appendChild(imageElement);
        galleryElement.appendChild(nomElement);

}}
genererArticles(articles)


// Filtres Objet id: 1

const boutonObjet = document.querySelector(".btnobjet");

boutonObjet.addEventListener("click", function () {
    const filtreObjet = filtres.filter(function (article){
        return filtres.src = 10
    });
    document.querySelector(".gallery").innerHTML = "";
    console.log(filtreObjet);
    genererArticles();
});


/*boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});*/

// Filtres Tous
const boutonTous = document.querySelector(".btntous");
boutonTous.addEventListener("click", function () {

    const articlesNofiltre = articles.filter(function (article){
        return article.id = 1
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(articlesNofiltre);
});
