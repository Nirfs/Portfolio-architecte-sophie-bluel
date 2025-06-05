
//Récupère les travaux depuis l'API
export async function apiWorks(){
    try{
        const rep = await fetch("http://localhost:5678/api/works");
        if(!rep.ok){
            throw new Error("Impossible de se recuperer les travaux de l'API");
        }
        return await rep.json();
    }catch{
        console.error("Erreur :", error.message);
    }
}

//Récupère les categories depuis l'API
export async function apiCategories(){
    try{
        const rep = await fetch("http://localhost:5678/api/categories");
        if(!rep.ok){
            throw new Error("Impossible de se recuperer les categories de l'API");
        }
        return await rep.json();
    }catch{
        console.error("Erreur :", error.message);
    }
}

 /**
    Envoie les identifiants pour se connecter
    @param {string} email 
    @param {string} password 
 */

export async function loginUser(email, password) {
	try {
		const rep = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (!rep.ok) {
			throw new Error(rep.status);
		}
		return await rep.json();
	} catch (error) {
		console.error(error.message);
        throw error;
        
	}
}

 /**
    supprime un travail de l'API
    @param {number} workId 
 */

export async function deleteWork(workId) {
    try {
        const token = localStorage.getItem("token");
        
        const rep = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!rep.ok) {
            throw new Error(`Erreur lors de la suppression : ${rep.status}`);
        }
        
        return true;
    } catch (error) {
        console.error("Erreur API :", error.message);
    }
}

 /**
    Envoie un nouveau travail à l'API
    @param {FormData} formData 
 */

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
            throw new Error(`Erreur : ${rep.status}`);
        }

        return await rep.json();
    } catch (error) {
        console.error("Erreur API :", error.message);
    }
}
