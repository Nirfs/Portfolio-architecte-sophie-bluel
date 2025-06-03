import {apiWorks, apiCategories} from "./api.js";
import {creationTravaux, creationBoutton,filtrerTravaux} from "./gallery.js";
import {loginOk} from "./uiLogin.js";
import {modalLogic, addGalery} from "./modal.js";
import {deleteItem} from "./deleteWork.js";
import {addWorksInit} from "./addWork.js"

async function init(){
    const works = await apiWorks();
    const categories = await apiCategories();

    creationBoutton(categories)
    creationTravaux(works);
    filtrerTravaux(works);

    loginOk();

    addGalery(works);
    deleteItem();
    modalLogic();

    addWorksInit(categories);

console.log(works);



}

init()
