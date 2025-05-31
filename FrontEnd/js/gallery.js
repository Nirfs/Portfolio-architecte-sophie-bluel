export function creationTravaux(works){
    const galleryContainer = document.querySelector(".gallery")
    galleryContainer.innerHTML = "";
    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const image = document.createElement("img");
        image.src = work.imageUrl;

        const caption = document.createElement("figcaption");
        caption.innerText = work.title

        galleryContainer.appendChild(figure);
        figure.appendChild(image)
        figure.appendChild(caption)
    });
}


export function creationBoutton(categories){
    const buttonContainer = document.querySelector(".button-container");

    const button = document.createElement("button");
    button.innerText = "Tout"
    button.dataset.id = "all"
    buttonContainer.appendChild(button);

    categories.forEach(categorie =>{
        const button = document.createElement("button");
        button.innerText = categorie.name
        button.dataset.id = categorie.id
        buttonContainer.appendChild(button);
    })
}
