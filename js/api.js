import { locale } from "./wallet.js";

export async function obtenerApi() {

    try {
        const respuesta = await fetch('https://dolarapi.com/v1/dolares');
        const quotes = await respuesta.json();
        printDollarQuotes(quotes);
    } catch (error) {
        console.log(error);
        const listQuotes = document.getElementById('listDollarQuotes');
        const itemQuotes = document.createElement('div');
        itemQuotes.classList.add('col-lg-12', 'description');
        const infoError = `<p class="list-text-description">Las cotizaciones no están disponibles en este momento, vuelva a intentarlo mas adelante, muchas gracias.</p>`;
        itemQuotes.innerHTML = infoError;
        listQuotes.appendChild(itemQuotes);
    };

};

function printDollarQuotes(quotes) {

    const listQuotes = document.getElementById('listDollarQuotes');
    
    quotes.forEach(({ nombre, compra, venta, fechaActualizacion }) => {

        // Formateamos fecha
        const day = new Date(fechaActualizacion);
        const dayFormat = day.toLocaleDateString(locale, {
            timeZone: 'UTC'
        });;

        // Formateamos los montos
        let formatCurrency = new Intl.NumberFormat('es-ar', { currency: 'ARS', minimumFractionDigits: 2 })
        const formatBuy = formatCurrency.format(compra);
        const formatSale = formatCurrency.format(venta);

        const itemQuotes = document.createElement('div');
        itemQuotes.classList.add('col-lg-4', 'description');
        const infoQuotes = `
                            <p class="list-text-date green">${dayFormat}</p>
                            <p class="list-text-description-quotes">${nombre}</p>
                            `;

        const itemAmountQuotes = document.createElement('div');
        itemAmountQuotes.classList.add('col-lg-8', 'flex-list');
        const infoAmountQuotes = `<p class="list-text-quotes">Compra: $ ${formatBuy} <br> Venta: $ ${formatSale}</p>`;

        const line = document.createElement('hr');
        line.classList.add('line-list-light');

        itemQuotes.innerHTML = infoQuotes;
        itemAmountQuotes.innerHTML = infoAmountQuotes;


        listQuotes.appendChild(line);
        listQuotes.appendChild(itemQuotes);
        listQuotes.appendChild(itemAmountQuotes);

    });

};