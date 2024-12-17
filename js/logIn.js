// BILLETERA VIRTUAL
import { printAlert } from "./printAlert.js";
import { showPass } from "./showPass.js";

// DOM
const formLogIn = document.getElementById('form-login');
const btnLogIn = document.getElementById("btn-login");

// Eventos
formLogIn.addEventListener("submit", logIn);

const disableButton = () => {

    btnLogIn.disabled = true;
    setTimeout(() => {
      btnLogIn.disabled = false;
    }, 3000);

  };

let tried = 0;

const userSignUpListPack = JSON.parse(localStorage.getItem('userList')) || [];

const okUser = userFindEmail => {

    showInfo(userFindEmail);
    setTimeout(() => {
        location.href = 'wallet.html';
    }, 2000);

};

// Solicitamos Logeo
function logIn(e) {

    e.preventDefault();

    disableButton();

    // DOM
    const logInEmail = document.getElementById("email-login").value;
    const logInPass = document.getElementById("password-login").value;

    const userFindEmail = userSignUpListPack.find(user => user.signUpEmail === logInEmail);

    // Validamos
    if (logInEmail === '' || logInPass === '') {
        printAlert('Todos los campos son obligatorios', 'error');
        return
    };

    if (userFindEmail) {
        const userFindPass = userFindEmail.signUpPass;
        if (userFindPass === logInPass) {
            // Ya estamos dentro de la billetera
            localStorage.setItem('currentUser', JSON.stringify(userFindEmail));
            okUser(userFindEmail)
        } else {
            tried++
            printAlert(`Datos incorrectos. Vuelva a intentarlo. Intento ${tried} de 3.`, 'error');
        }
    } else {
        tried++
        printAlert(`Usuario no registrado. Intento ${tried} de 3.`, 'error');
    };

    if (tried === 3) {
        printAlert('Sus datos fueron bloqueados. Contáctese con el soporte', 'error');
        // le damos tiempo a mostrar los alerts y luego recargamos
        setTimeout(() => {
            location.reload()
        }, 3000);
    };
    
};

function showInfo({ signUpName, signUpLastName }) {

    const container = document.getElementById('printInfo');
    const printInfo = document.createElement('div');

    const title = document.getElementById('title');
    const subTitle = document.getElementById('sub-title');

    title.classList.add('green');
    title.textContent = "Bienvenido!";
    subTitle.classList.add('hide');

    // Crear el div
    const divMessage = `<p>${signUpName} ${signUpLastName}</p>`;

    printInfo.classList.add('text-center');
    printInfo.innerHTML = divMessage;
    container.appendChild(printInfo);

    // Quitar mensaje
    setTimeout(() => {
        printInfo.remove();
        title.classList.remove('green');
        title.textContent = "Bienvenido";
        subTitle.classList.remove('hide');
    }, 3000);

    formLogIn.reset();

};

showPass();