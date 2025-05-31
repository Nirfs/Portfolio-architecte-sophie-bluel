export async function apiWorks(){
    try{
        const rep = await fetch("http://localhost:5678/api/works");
        if(!rep){
            throw new Error("Impossible de se connecter a l'api");
        }
    return rep.json();
    }catch{
        console.log("Impossible de se connecter - hors connexion");
    }

}

export async function apiCategories(){
    try{
        const rep = await fetch("http://localhost:5678/api/categories");
        if(!rep){
            throw new Error("Impossible de se connecter a l'api");
        }
    return rep.json();
    }catch{
        console.log("Impossible de se connecter hors connexion");
    }
}

export async function apiUpload(formData) {
    try {
        const token = localStorage.getItem("token");

        const rep = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!rep.ok) {
            throw new Error(`Erreur HTTP : ${rep.status}`);
        }

        return await rep.json();
    } catch (error) {
        console.error("Impossible de se connecter :");
        return null;
    }
}

