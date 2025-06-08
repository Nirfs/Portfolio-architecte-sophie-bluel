import { galleryAnimation } from "./animation.js";

// Génère et affiche les travaux dans la galerie
export function creationTravaux(works){

    const galleryContainer = document.querySelector(".gallery");
    galleryContainer.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;

        const caption = document.createElement("figcaption");
        caption.innerText = work.title;

        galleryContainer.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(caption);
        galleryAnimation(figure);
    });
}

// Crée les boutons de filtre à partir des catégories de l'API
export function creationBoutton(categories){
    const buttonContainer = document.querySelector(".button-container");

    //Tout
    const AllButton = document.createElement("button");
    AllButton.innerText = "Tout";
    AllButton.dataset.id = "all";
    buttonContainer.appendChild(AllButton);

    //categorie API
    categories.forEach(categorie => {
        const button = document.createElement("button");
        button.innerText = categorie.name;
        button.dataset.id = categorie.id;
        buttonContainer.appendChild(button);
    });
}

// Gère le filtrage des travaux selon le bouton cliqué
export function filtrerTravaux(works){
    const buttonsFiltres = document.querySelectorAll(".button-container button");

    buttonsFiltres.forEach(buttonFiltre =>{
        buttonFiltre.addEventListener("click", (event)=>{
            const targetId = event.target.dataset.id;

            // Gestion de la classe "active" 
            buttonsFiltres.forEach(button =>{ button.classList.remove("active") })
            event.target.classList.add("active")

            //voir opérateur ternair dans le cours
            const travauxAfficher = targetId ==="all"
                ? works
                : works.filter(work => work.category.id == targetId);
            
            creationTravaux(travauxAfficher);
        })
    })
}