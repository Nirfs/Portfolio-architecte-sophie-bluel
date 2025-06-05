import{tremblement}from'./animation.js';
import { loginUser } from './api.js';

const submit = document.querySelector(".formLogin");
const emailBalise = document.getElementById("email");
const passwordBalise = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
if(submit){
    submit.addEventListener("submit", async (event)=>{
        event.preventDefault();

        //trim supprime les espaces dans le input
        const email = emailBalise.value.trim();
        const password = passwordBalise.value.trim();

        //verifie si les champs ne sont pas vides
        if (!email || !password) {
            errorMessage.style.display = "flex";
            errorMessage.innerText = "Veuillez remplir tous les champs.";
            tremblement(errorMessage);
            return;
        }
        
        try{
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            window.location.href ="index.html";
        } catch (error){
            if (error.message === "401"){
                MessageErreur(errorMessage, "Mot de passe incorrect")
            }
            else if (error.message === "404"){
                MessageErreur(errorMessage, "Nom d'utilisateur incorrect")
            } 
            else {
                MessageErreur(errorMessage, error.message)
            }
        }
    })
}

function MessageErreur(errorMessage, message){
    console.log(message);
    errorMessage.style.display = "flex";
    errorMessage.textContent = message;
    tremblement(errorMessage);
}

export function logout(){
    localStorage.removeItem("token");
    window.location.reload();
}