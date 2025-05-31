import {apiWorks, apiCategories} from "./api.js";
import { creationTravaux, creationBoutton, filtrerTravaux} from "./gallery.js";
import { loginOk } from "./uiLogin.js";
import {modalLogic, addGalery} from "./modal.js";

async function init(){
    const works = await apiWorks();
    const categories = await apiCategories();

    creationBoutton(categories)
    creationTravaux(works);
    filtrerTravaux(works);

    loginOk();
    modalLogic();
    addGalery(works);
}

init()
