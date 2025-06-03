export function tremblement(error) {
    error.classList.add('tremblement');
    setTimeout(() => error.classList.remove('tremblement'), 400);
}

export function galleryAnimation(figure){
    setTimeout(() => { figure.classList.add("visible");}, 10);
};
