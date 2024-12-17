const eye = document.getElementById("eye");
const input = document.querySelector(".selected-input");
eye.addEventListener("click", showPass);

export function showPass () {

    if (input.type === "password") {
        input.type = "text";
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash')
    } else {
        input.type = "password";
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye')
    };

};