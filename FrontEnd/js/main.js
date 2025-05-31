import {apiWorks, apiCategories} from "./api.js";
import { creationTravaux, creationBoutton } from "./gallery.js";

async function init(){
    const works = await apiWorks();
    const categories = await apiCategories();

    creationBoutton(categories)
    creationTravaux(works);
}

init()
