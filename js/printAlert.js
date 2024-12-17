export function printAlert(mensaje, tipo) {

    const formAlert =  document.getElementById('print-alert');
    // Crear el div
    const divMessage = document.createElement('div');
    divMessage.classList.add('text-center', 'alert');

    if (tipo === 'error') {
        divMessage.classList.add('alert-danger')
    } else {
        divMessage.classList.add('alert-success')
    }

    // Mensaje de error
    divMessage.textContent = mensaje;

    // Insertar mensaje de error en el HTML
    formAlert.appendChild(divMessage);

    // Quitar mensaje
    setTimeout(() => {
        divMessage.remove();
    }, 3000);

};

export function printAlertSignUp(mensaje, element) {

    const alertBlock = document.getElementById(element);
    // Crear el div
    const paragraphMessage = document.createElement('p');
    paragraphMessage.classList.add('text-alert-signup', 'red');
    // Mensaje de error
    paragraphMessage.textContent = mensaje;

    // Insertar mensaje de error en el HTML
    alertBlock.appendChild(paragraphMessage);

    // Quitar mensaje
    setTimeout(() => {
        paragraphMessage.remove();
    }, 3000);
    
};