// BILLETERA VIRTUAL
import {printAlert, printAlertSignUp} from "./printAlert.js";
import {showPass} from "./showPass.js";

const userSignUpListPack = JSON.parse(localStorage.getItem('userList')) || [];
let userSignUpList = userSignUpListPack;

// DOM
const formSignUp = document.getElementById("form-signup");
const btnSignUp = document.getElementById("btn-signup");

const validarName = (name) => {
    const regex = /^[A-Z][a-z]+$/;
    return regex.test(name);
}
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
const validarPass = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Creamos el constructor para registrar usuarios
class UserCreate {
    constructor(signUpName, signUpLastName, signUpUserDoB, signUpEmail, signUpPass) {
        this.id = Date.now();
        this.signUpName = signUpName,
        this.signUpLastName = signUpLastName,
        this.signUpUserDoB = signUpUserDoB,
        this.signUpEmail = signUpEmail,
        this.signUpPass = signUpPass
    };
};

// Evento
formSignUp.addEventListener("submit", signUp);

const disableButton = () => {
    btnSignUp.disabled = true;
    setTimeout(() => {
      btnSignUp.disabled = false;
    }, 3000);
  };

// Pedimos datos para crear usuario 
function signUp(e) {

    e.preventDefault();

    disableButton();

    const signUpName = document.getElementById("name-signup").value;
    const signUpLastName = document.getElementById("lastname-signup").value;
    const signUpUserDoB = document.getElementById("age-signup").value;
    const signUpEmail = document.getElementById("email-signup").value;
    const signUpPass = document.getElementById("password-signup").value;

    // Validar que el usuario sea mayor de 18 años
    const today = new Date();
    const birthDate = new Date(signUpUserDoB);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        printAlertSignUp('Debes ser mayor de 18 años para registrarte', 'alert-age');
        return;
    }

    for (let i = 0; i < userSignUpList.length; i++) {
        const findEmail = userSignUpList[i].signUpEmail;
        const findPass = userSignUpList[i].signUpPass;
        if (findEmail === signUpEmail) {
            printAlertSignUp('El correo electrónico ya está registrado, ingrese otro', 'alert-email')
            return            
        }        
        if (findPass === signUpPass) {
            printAlertSignUp('La contraseña ya está registrada, ingrese otra', 'alert-pass')
            return            
        }        
    };    

    // Validamos
	if (signUpName === '' || signUpLastName === '' || signUpUserDoB === '' || signUpEmail === '' || signUpPass === '') {
		printAlert('Todos los campos son obligatorios', 'error');
        return;
	};

    if (!validarName(signUpName)) {
        printAlertSignUp('El nombre no es válido, vuelva a ingresarlo', 'alert-name')
        return
    };

    if (!validarName(signUpLastName)) {
        printAlertSignUp('El apellido no es válido, vuelva a ingresarlo', 'alert-lastname')
        return
    };

    if (!validarEmail(signUpEmail)) {
        printAlertSignUp('El correo electrónico no es válido, vuelva a ingresarlo', 'alert-email')
        return
    };

    if (!validarPass(signUpPass)) {
        printAlertSignUp('La contraseña no es válida. Debe tener mas de 8 caracteres, mayúsculas y minúsculas, números y caractereres especial. No se permiten guiones ni apóstrofes.', 'alert-pass')
        return
    };
    
    const userSignUp = new UserCreate(signUpName, signUpLastName, signUpUserDoB, signUpEmail, signUpPass);
    // Agregamos al array el usuario registrado
    userSignUpList.push(userSignUp);

    localStorage.setItem('userList', JSON.stringify(userSignUpList));    

    printAlert('Cuenta creada exitósamente', 'success');

    setTimeout(() => {
        location.href = 'index.html';
    }, 3000); 

};

showPass();