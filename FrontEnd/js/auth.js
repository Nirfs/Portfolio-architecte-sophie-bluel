import{tremblement}from'./animation.js';
import { loginUser } from './api.js';

const submit = document.querySelector(".formLogin");
const emailBalise = document.getElementById("email");
const passwordBalise = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

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
    }
    catch (error){
        errorMessage.style.display = "flex";
        errorMessage.innerText = error.message;
        tremblement(errorMessage);
    }
})