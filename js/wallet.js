// BILLETERA VIRTUAL
import { printAlert } from "./printAlert.js";
import { obtenerApi } from "./api.js";

const listPesosPack = JSON.parse(localStorage.getItem('$')) || [];
let listPesos = listPesosPack;
const listDollarPack = JSON.parse(localStorage.getItem('u$s')) || [];
let listDollar = listDollarPack;
let totalCreditPesos = 0;
let totalCreditDollar = 0;
let totalDebitPesos = 0;
let totalDebitDollar = 0;
const moneyPesos = "$";
const moneyDollar = "u$s";

// Definimos lenguaje del navegador para formatear la fecha según ubicación del usuario
export const locale = navigator.language;

// DOM
const formOperation = document.getElementById('form-operation');
const btnAddItem = document.getElementById('btn-add-item');
const btnExit = document.getElementById('exit');
const btnPesos = document.getElementById('btn-wallet-pesos');
const btnDollar = document.getElementById('btn-wallet-dolar');
const listShowPesos = document.getElementById('listPesos');
const listShowDollar = document.getElementById('listDollar');

// Eventos
formOperation.addEventListener('submit', registerOperation);
btnExit.addEventListener('click', exitWallet);
btnPesos.addEventListener('click', printShowLSPesos);
btnDollar.addEventListener('click', printShowLSDollar);

// Creamos el constructor para registrar ingresos
class DataInput {
    constructor(operation, date, description, amount, userEmail) {
        this.id = Date.now();
        this.operation = operation;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.userEmail = userEmail
    }
};

// Obtenemos cotizaciones dollar
obtenerApi();

const disableButton = () => {

    btnAddItem.disabled = true;
    setTimeout(() => {
      btnAddItem.disabled = false;
    }, 3000);

  };

// Mostramos el nombre del usuario logeado
const currentUserData = JSON.parse(localStorage.getItem('currentUser')) || [];

const showNameUser = ({ signUpName, signUpLastName }) => {
    const nameUser = document.getElementById('showNameUser');
    nameUser.innerHTML = `${signUpName} ${signUpLastName}`
};

showNameUser(currentUserData);

// Llamar a la función cuando se cargue la página
window.onload = showLSPesos(currentUserData.signUpEmail);

// Registramos la operación
function registerOperation(e) {

    e.preventDefault();

    disableButton();

    const operation = document.getElementById('operation-select').value;
    const date = document.getElementById('operation-date').value;
    const description = document.getElementById('operation-description').value;
    const amount = document.getElementById('operation-amount').value;
    const userEmail = currentUserData.signUpEmail;

    // Validamos
    if (operation === 'default' || date === '' || description === '' || amount === '') {
        printAlert('Todos los campos son obligatorios', 'error');
        return;
    };

    if (amount <= 0 || isNaN(amount)) {
        printAlert('Cantidad no válida', 'error');
        return;
    };

    walletPrint(operation, date, description, amount, userEmail);

};

// Agregamos créditos y débitos en pesos
function walletPrint(operation, date, description, amount, userEmail) {

    if (operation === "credit-$" || operation === "debit-$") {

        listPesos.push(new DataInput(operation, date, description, amount, userEmail));
        localStorage.setItem('$', JSON.stringify(listPesos));
        showLSPesos(userEmail);
        printAlert('Datos cargados correctamente', 'success');
        printShowLSPesos();

    } else {

        listDollar.push(new DataInput(operation, date, description, amount, userEmail));
        localStorage.setItem('u$s', JSON.stringify(listDollar));
        showLSDollar(userEmail);
        printAlert('Datos cargados correctamente', 'success');
        printShowLSDollar();

    };

};

// Mostramos los datos del localStorage
function showLSPesos() {

    const listPesosPack = JSON.parse(localStorage.getItem('$')) || [];

    const list = document.getElementById('listPesos');
    list.innerHTML = "";

    const credits = listPesosPack.filter(({ operation, userEmail }) => operation === 'credit-$' && userEmail === currentUserData.signUpEmail);
    credits.forEach(({ date, description, amount, operation }) => printInputs(listShowPesos, date, description, moneyPesos, amount, operation));
    totalCreditPesos = credits.reduce((acumulador, item) => acumulador + parseInt(item.amount), 0);

    const debits = listPesosPack.filter(({ operation, userEmail }) => operation === 'debit-$' && userEmail === currentUserData.signUpEmail);
    debits.forEach(({ date, description, amount, operation }) => printInputs(listShowPesos, date, description, moneyPesos, amount, operation));
    totalDebitPesos = debits.reduce((acumulador, item) => acumulador + parseInt(item.amount), 0);

    // Formateamos los montos
    let formatCurrency = new Intl.NumberFormat('es-ar', { currency: 'ARS', minimumFractionDigits: 2 })
    const totalCreditFormat = formatCurrency.format(totalCreditPesos);
    const totalDebitFormat = formatCurrency.format(totalDebitPesos);

    printTotalCredit(moneyPesos, totalCreditFormat);
    printTotalDebit(moneyPesos, totalDebitFormat);
    printBalance(moneyPesos, totalCreditPesos, totalDebitPesos);

    btnPesos.classList.add('btn', 'btn-secondary');
    btnPesos.classList.remove('btn', 'btn-light');
    btnDollar.classList.add('btn', 'btn-light');
    btnDollar.classList.remove('btn', 'btn-secondary');

};

// Mostramos los datos del localStorage
function showLSDollar() {

    const listDollarPack = JSON.parse(localStorage.getItem('u$s')) || [];

    const list = document.getElementById('listDollar');
    list.innerHTML = "";

    const credits = listDollarPack.filter(({ operation, userEmail }) => operation === 'credit-u$s' && userEmail === currentUserData.signUpEmail);
    credits.forEach(({ date, description, amount, operation }) => printInputs(listShowDollar, date, description, moneyDollar, amount, operation));
    totalCreditDollar = credits.reduce((acumulador, item) => acumulador + parseInt(item.amount), 0);

    const debits = listDollarPack.filter(({ operation, userEmail }) => operation === 'debit-u$s' && userEmail === currentUserData.signUpEmail);
    debits.forEach(({ date, description, amount, operation }) => printInputs(listShowDollar, date, description, moneyDollar, amount, operation));
    totalDebitDollar = debits.reduce((acumulador, item) => acumulador + parseInt(item.amount), 0);

    // Formateamos los montos
    let formatCurrency = new Intl.NumberFormat('es-ar', { currency: 'ARS', minimumFractionDigits: 2 })
    const totalCreditFormat = formatCurrency.format(totalCreditDollar);
    const totalDebitFormat = formatCurrency.format(totalDebitDollar);

    printTotalCredit(moneyDollar, totalCreditFormat);
    printTotalDebit(moneyDollar, totalDebitFormat);
    printBalance(moneyDollar, totalCreditDollar, totalDebitDollar)

    btnDollar.classList.add('btn', 'btn-secondary');
    btnDollar.classList.remove('btn', 'btn-light');
    btnPesos.classList.add('btn', 'btn-light');
    btnPesos.classList.remove('btn', 'btn-secondary');

};

function printInputs(list, date, description, currency, amount, operation) {

    // Formateamos fecha
    const day = new Date(date);
    const dayFormat = day.toLocaleDateString(locale, {
        timeZone: 'UTC'
    });;

    // Formateamos los montos
    let formatCurrency = new Intl.NumberFormat('es-ar', { currency: 'ARS', minimumFractionDigits: 2 })
    const formatAmount = formatCurrency.format(amount);

    const itemDescription = document.createElement('div');
    itemDescription.classList.add('col-lg-6', 'description');
    const infoDescription = `
    <p class="list-text-date">${dayFormat}</p>
    <p class="list-text-description">${description}</p>
    `;

    const itemamount = document.createElement('div');
    let infoamount;

    if (operation === 'credit-$' || operation === 'credit-u$s') {

        itemamount.classList.add('col-lg-3', 'offset-lg-3', 'flex-list');
        infoamount = `<p class="list-text green">${currency} ${formatAmount}</p>`;

    } else {

        itemamount.classList.add('col-lg-3', 'flex-list');
        infoamount = `<p class="list-text red">${currency} ${formatAmount}</p>`;

    };

    const line = document.createElement('hr');
    line.classList.add('line-list-light');

    itemDescription.innerHTML = infoDescription;
    itemamount.innerHTML = infoamount;

    list.appendChild(itemDescription);
    list.appendChild(itemamount);
    list.appendChild(line);

};

function printTotalCredit(currency, total) {

    const totalCredit = document.getElementById('list-credit');
    const totalCreditValue = `<p class="list-text green" id="list-credit"> ${currency} ${total}</p>`;
    totalCredit.innerHTML = totalCreditValue;

};

function printTotalDebit(currency, total) {

    const totalDebit = document.getElementById('list-debit');
    const totalDebitValue = `<p class="list-text red" id="list-debit"> ${currency} ${total}</p>`;
    totalDebit.innerHTML = totalDebitValue;

};

function printBalance(currency, totalCredit, totalDebit) {

    const showBalance = document.getElementById('balance');
    const balance = totalCredit - totalDebit;

    // Formateamos los montos
    let formatCurrency = new Intl.NumberFormat('es-ar', { currency: 'ARS', minimumFractionDigits: 2 })
    const balanceFormat = formatCurrency.format(balance);
    showBalance.innerText = ` ${currency} ${balanceFormat}`;

};

function exitWallet() {

    Swal.fire({
        text: "Está seguro que desea salir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42a905",
        cancelButtonColor: "#ff0000",
        confirmButtonText: "Ok",
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = 'index.html';
        }
    });

};

function printShowLSPesos() {

    const list = document.getElementById('listDollar');
    list.innerHTML = "";
    showLSPesos();
    formOperation.reset();

};

function printShowLSDollar() {

    const list = document.getElementById('listPesos');
    list.innerHTML = "";
    showLSDollar();
    formOperation.reset();
    
};