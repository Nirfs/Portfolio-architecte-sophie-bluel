function banniere(){
    const banniere = document.createElement("div");
    banniere.classList.add("banniere-edition")
    banniere.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>`

    const body = document.querySelector("body").prepend(banniere);
}

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

export function loginOk(){
    const tokenLoad = localStorage.getItem("token");
    const log = document.querySelector(".log");

    if (tokenLoad){
        log.innerText = "Logout";
        log.href = "index.html";

        log.addEventListener("click", () =>{
            localStorage.removeItem("token");
        })

        banniere();
        changeButton();
    } else{
        log.innerText = "Login";
        log.href = "login.html";
    }

}