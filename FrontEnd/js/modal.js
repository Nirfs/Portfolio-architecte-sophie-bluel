import{resetAddPhoto}from "./addWork.js"

export function modalLogic(){
    openmodal();
    closemodal();
    SwitchModal()
}

function openmodal(){
    const modal = document.getElementById("modal1");
    const openButton = document.querySelector(".header-modifier a");

    if (!openButton || !modal) return;

    openButton.addEventListener("click", ()=>{
        modal.style.display = "flex";
    })
    

}

function closemodal(){
    const modals = document.querySelectorAll(".modal");
    const closeIcons = document.querySelectorAll(".fa-xmark");

    closeIcons.forEach(closeIcon =>{
        closeIcon.addEventListener("click", ()=>{
            modals.forEach(modal =>{
                modal.style.display = "none";
                resetAddPhoto();
            })
        })
    })

        modals.forEach(modal =>{
            modal.addEventListener("click", (event)=>{
                if (event.target === modal){
                    modal.style.display = "none";
                    resetAddPhoto();
                }
        })
    })
}

function SwitchModal(){
    const addButton = document.querySelector(".add");
    const modal1 = document.getElementById("modal1");
    const modal2 = document.getElementById("modal2");
    const backArrow = document.querySelector(".fa-arrow-left");

    addButton.addEventListener("click", () =>{
        modal1.style.display = "none";
        modal2.style.display = "flex";
    })
    
    backArrow.addEventListener("click", () =>{
        modal1.style.display = "flex";
        modal2.style.display = "none";
    })
}

export function addGalery(works){
    const galleryContainer = document.querySelector(".modal-gallery-container")
    galleryContainer.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const image = document.createElement("img");
        image.src = work.imageUrl;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "fa-2xs");
        deleteIcon.dataset.id = work.id;

        galleryContainer.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(deleteIcon);
    });
    
}

