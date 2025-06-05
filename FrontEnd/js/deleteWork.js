import { deleteWork } from "./api.js";

export function deleteItem(){
    
    const deleteIcons = document.querySelectorAll(".fa-trash-can");

    deleteIcons.forEach(deleteIcon =>{
        deleteIcon.addEventListener("click", async (event)=>{

            const figure = event.target.closest("figure");
            const workId = figure.dataset.id;

            const success = await deleteWork(workId);

            if(success){
                figure.remove();
                console.log("delete");

                const galleryFigure = document.querySelector(`.gallery figure[data-id="${workId}"]`);
                
                if (galleryFigure) {
                    galleryFigure.remove();
                }
            }
        })
    })
}