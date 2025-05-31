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