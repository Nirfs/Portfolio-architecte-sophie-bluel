export function deleteItem(){
    
    const deleteIcons = document.querySelectorAll(".fa-trash-can");

    deleteIcons.forEach(deleteIcon =>{
        deleteIcon.addEventListener("click", async (event)=>{

            const token = localStorage.getItem("token");
            const figure = event.target.closest("figure")
            const workId = figure.dataset.id

            const rep = await fetch(`http://localhost:5678/api/works/${workId}`,{
                method: "DELETE",
                headers: {"Content-Type": "application/json", 
                    "Authorization":`Bearer ${token}`,
                },
            });

            if(rep.ok){
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