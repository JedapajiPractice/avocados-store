/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style:'currency',
        currency: 'USD'
    }).format(price)
    return newPrice
}

//Web Api
//Conectarse al servidor
window
    .fetch(`${baseUrl}/api/avo`)
    //Procesar respuesta y convertirlo al JSON
    .then((respuesta) => respuesta.json())
    //JSON--> Data --> Renderizar info al navegador
    .then((responseJson) => {
        //Crear array optima
        const allItems = [];
        responseJson.data.forEach((element) => {
            //Crear imagen
            const image = document.createElement('img');
            //URL de la imágen
            image.src = `${baseUrl}${element.image}`;
            image.className="h-16 w-16 md:h-24 md:w-24 bg-yellow-500 rounded-full mx-auto md:mx-0 md:mr-6"

            //Crear título
            const title = document.createElement("h2");
            title.textContent = element.name;
            title.className="text-lg"

            //Crear precio
            const price = document.createElement("div");
            price.textContent = formatPrice(element.price);

            //Contenedor Precio y Titulo
            const priceAndTitle=document.createElement("div");
            priceAndTitle.className = "text-center md:text-left hover:text-white";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price)

            //Crear contenedor
            const container = document.createElement("div");
            container.className ="md:flex bg-yellow-500 rounded-lg p-6 hover:bg-green-600 hover:text-white hover:shadow-md z-auto cursor-pointer"
            container.appendChild(image);
            container.appendChild(priceAndTitle);

            allItems.push(container);
        });
        appNode.append(...allItems);
    })
