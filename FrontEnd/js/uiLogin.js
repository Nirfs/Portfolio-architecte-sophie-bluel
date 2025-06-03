//Creation de la bannière
function banniere(){
    const banniereDiv = document.createElement("div");

    banniereDiv.classList.add("banniere-edition")
    banniereDiv.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>`;

    document.body.prepend(banniereDiv);
}

//Changement du boutton login en logout
function changeButton(){
    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.innerHTML = ""

    const projet = document.querySelector("#portfolio");
    const header = document.createElement("div");
    header.classList.add("header-modifier");

    const h2 = document.querySelector("#portfolio h2");
    projet.prepend(header);
    header.appendChild(h2);

    header.innerHTML += `<a><i class="fa-solid fa-pen-to-square"></i><p>modifier</p></a>`
}

//retrait du token et rechargement a la déco
function logout(){
    localStorage.removeItem("token");
    window.location.reload();
}

//Logic de connexion reussit
export function loginOk(){
    const tokenLoad = localStorage.getItem("token");
    const log = document.querySelector(".log");
    const header = document.querySelector("header");
    
    if (tokenLoad){
        header.classList.add("Headerlogin");
        log.innerText = "logout";
        log.href = "#";

        log.addEventListener("click", logout);

        banniere();
        changeButton();
    } else{
        header.classList.remove("Headerlogin");
        log.innerText = "login";
        log.href = "login.html";
    }
}