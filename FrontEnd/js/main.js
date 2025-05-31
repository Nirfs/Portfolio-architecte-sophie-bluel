import {apiWorks} from "./api.js";
import { creationTravaux } from "./gallery.js";

async function init(){
    const works = await apiWorks();
    
    creationTravaux(works);
}

init()
