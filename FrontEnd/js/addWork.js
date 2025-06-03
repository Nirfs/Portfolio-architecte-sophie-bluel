import { apiUpload } from "./api.js";
import { deleteItem } from "./deleteWork.js";
import{ tremblement }from'./animation.js';

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

//Ajouter les catégorie au select
function addCategories(categories){
    const select = document.querySelector("select");

    categories.forEach(categorie => {
          const option = document.createElement("option");
          option.innerText = categorie.name;
          option.value = categorie.id;

          select.appendChild(option);
    });
}

// Aperçu de l’image sélectionnée
function addPhoto(){
    const inputFile = document.getElementById("image-upload");
    const errorMessage = document.getElementById("error-message-upload");
    const maxSize = 4 * 1024* 1024;
    const acceptFormat = ["image/png", "image/jpeg"];

        inputFile.addEventListener("change", () =>{

            const file = inputFile.files[0]; 
            if (!file) return;

            const type = file.type;
            const size = file.size;

            if(size > maxSize){
                tremblement(errorMessage);
                errorMessage.innerText = "Le fichier doit faire 4mo au maximum !"
                return;
            }

            if(!acceptFormat.includes(type)){
                tremblement(errorMessage);
                errorMessage.innerText = "Le fichier doit être au format png ou jpeg !"
                return;
            }

            errorMessage.innerText = "";
            //Permet de lire un fichier du type=file coté client dans le navigateur (avant de l'envoyer au serveur)
            const reader = new FileReader();

            reader.addEventListener("load", (event) =>{
                const uploadSelection = document.querySelector(".upload-section");
                const imagePreview = document.querySelector(".image-preview");

                uploadSelection.style.display = "none";
                imagePreview.style.display = "flex";

                //Result est un propriété de FileReader
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="aperçu image" 
                style="max-width: 100%; max-height: 156px; object-fit: contain;">`;
            });

            reader.readAsDataURL(file);
    });
}

// Envoi à l'API si le formulaire est valide
function addPhotoToAPI(){
    //destructuration d'objet, voir si utile dans d'autre script.
    const { uploadForm, fileInput, titleInput, categorieInput, buttonValider } = getFormElements();
    const modal = document.getElementById("modal2");

    buttonValider.setAttribute("disabled", "true");

    uploadForm.addEventListener("submit", async (event)=>{
        event.preventDefault();

        const file = fileInput.files[0];
        const title = titleInput.value.trim().length > 0;
        const categorie = categorieInput.value;

        if(file && title && categorie){

            const formData = new FormData();

            formData.append("image", file);
            formData.append("title", titleInput.value);
            formData.append("category", categorie);

            const resultat = await apiUpload(formData);

            if(resultat){
                console.log("Image uploadée :", resultat);
                galleriesMaj(resultat);
                resetAddPhoto();
                deleteItem();
                modal.style.display = "none";
            }
        }
    })

    buttonActivation()
}

export function resetAddPhoto(){
    const { uploadSelection, imagePreview, fileInput, titleInput, categorieInput, errorMessage } = getFormElements();
    uploadSelection.style.display = "flex";
    imagePreview.style.display = "none";

    if(uploadSelection){
        fileInput.value = "";
        titleInput.value = "";
        categorieInput.value = "";
        errorMessage.innerText= ""
    }
}

function buttonActivation(){
    const { uploadForm, fileInput, titleInput, categorieInput, buttonValider } = getFormElements();

    uploadForm.addEventListener("change", ()=>{
        
        buttonValider.setAttribute("disabled", "true");
        const categorie = categorieInput.value;
        const title = titleInput.value.trim().length > 0;
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
    figure.classList.add("visible"); 

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