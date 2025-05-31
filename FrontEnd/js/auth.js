const submit = document.querySelector(".formLogin");
const emailBalise = document.getElementById("email");
const passwordBalise = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

submit.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const email = emailBalise.value;
    const password = passwordBalise.value

    try{
        const rep = await fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });
        
        const data = await rep.json();

        if(rep.ok){
            localStorage.setItem("token", data.token);
            window.location.href ="index.html";
        } else{
            errorMessage.style.display = "flex";
            errorMessage.innerText = data.message;
        }
    }catch{
        console.log("Impossible de se connecter hors connexion à l'API");
    }
})
