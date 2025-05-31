import { apiUpload } from "./api.js";
import { deleteItem } from "./deleteWork.js";

export function addWorksInit(categories){
    addCategories(categories);
    addPhoto();
    addPhotoToAPI();
}

function getFormElements() {
    return {
        uploadForm: document.querySelector(".upload-form"),
        fileInput: document.getElementById("image-upload"),
        titleInput: document.getElementById("titre"),
        categorieInput: document.querySelector("select"),
        buttonValider: document.querySelector(".valider"),
        uploadSelection: document.querySelector(".upload-section"),
        imagePreview: document.querySelector(".image-preview"),
        errorMessage: document.getElementById("error-message-upload")
    };
}

function addCategories(categories){
    const select = document.querySelector("select");

    categories.forEach(categorie => {
          const option = document.createElement("option");
          option.innerText = categorie.name;
          option.value = categorie.id;

          select.appendChild(option);
    });
}

function addPhoto(){
    const inputFile = document.getElementById("image-upload");
    const errorMessage = document.getElementById("error-message-upload");
    const maxSize = 4 * 1024* 1024;
    const acceptFormat = ["image/png", "image/jpeg"];

        inputFile.addEventListener("change", () =>{
        try{
            const file = inputFile.files[0];     
            const type = file.type;
            const size = file.size;

            if(size > maxSize){
                errorMessage.style.display = "flex";
                errorMessage.innerText = "Le fichier doit faire 4mo au maximum !"
                return;
            }

            if(!acceptFormat.includes(type)){
                errorMessage.style.display = "flex";
                errorMessage.innerText = "Le fichier doit être au format png ou jpeg !"
                return;
            }

            console.log("tout est ok !");
            errorMessage.innerText = "";

            const reader = new FileReader();

            reader.addEventListener("load", (event) =>{
                const uploadSelection = document.querySelector(".upload-section");
                const imagePreview = document.querySelector(".image-preview");

                uploadSelection.style.display = "none";
                imagePreview.style.display = "flex";

                imagePreview.innerHTML = `<img src="${event.target.result}" alt="aperçu image" 
                style="max-width: 100%; max-height: 200px; object-fit: contain;">`;
            });

            reader.readAsDataURL(file);
        } 
        catch{
            console.error("Erreur lors de l'ajout de la photo :");
            errorMessage.style.display = "flex";
            errorMessage.innerText = "Une erreur est survenue lors du traitement du fichier.";
            
        }
    })
}

function addPhotoToAPI(){
    const { uploadForm, fileInput, titleInput, categorieInput, buttonValider } = getFormElements();

    buttonValider.setAttribute("disabled", "true");

    uploadForm.addEventListener("submit", async (event)=>{
        event.preventDefault();

        const file = fileInput.files[0];
        const title = titleInput.value.length > 0;
        const categorie = categorieInput.value;

        if(file && title && categorie){

            const formData = new FormData();
            formData.append("image", file);
            formData.append("title", titleInput.value);
            formData.append("category", categorie);

            const result = await apiUpload(formData);

            if(result){
                console.log("Image uploadée :", result);
                galleriesMaj(result)
                resetAddPhoto()
                deleteItem()
            }
        }
    })

    buttonActivation()
}

export function resetAddPhoto(){
    const { uploadSelection, imagePreview, fileInput, titleInput, categorieInput } = getFormElements();

    uploadSelection.style.display = "flex";
    imagePreview.style.display = "none";

    if(uploadSelection){
        fileInput.value = "";
        titleInput.value = "";
        categorieInput.value = "";
    }
}

function buttonActivation(){
    const { uploadForm, fileInput, titleInput, categorieInput, buttonValider } = getFormElements();

    uploadForm.addEventListener("change", ()=>{
        const buttonValider = document.querySelector(".valider")
        
        buttonValider.setAttribute("disabled", "true");
            const categorie = categorieInput.value;
            const title = titleInput.value.length > 0;
            const file = fileInput.files[0];

            if(categorie && title && file){
                buttonValider.removeAttribute("disabled");
            } else{
                buttonValider.setAttribute("disabled", "true");
            }
    })
}

function galleriesMaj(works){
      //Galerie principale
    const gallery = document.querySelector(".gallery");

    const figure = document.createElement("figure");
    figure.dataset.id = works.id;

    const img = document.createElement("img");
    img.src = works.imageUrl;
    img.alt = works.title;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = works.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    //Galerie modale
    const modalGallery = document.querySelector(".modal-gallery-container");
    if (modalGallery) {
        const container = document.createElement("figure");
        container.dataset.id = works.id;

        const imgModal = document.createElement("img");
        imgModal.src = works.imageUrl;
        imgModal.alt = works.title;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "fa-2xs");
        deleteIcon.dataset.id = works.id;

        container.appendChild(imgModal);
        container.appendChild(deleteIcon);
        modalGallery.appendChild(container);
    }
}