// Programa de ejemplo que sirve para explicar como se usa funciones asincronas
//Usando promesas

/*
    Primero creamos un arreglo con varios objetos, estos son menus de un restaurante
*/
const menus = [
    {
        nombre: "Cena Marinera",
        entrada: "coctel de camarones",
        sopa: "viche",
        plato_fuerte: "Corvina apanda en salsa de mariscos",
        bebida: "limonada"
    }, {
        nombre: "Cena Parrillera",
        entrada: "mix de embutidos",
        sopa: "consome",
        plato_fuerte: "Milanesa de res con chuletas de cerdo en sala bbq",
        bebida: "orchata"
    }, {
        nombre: "Cena Criolla",
        entrada: "papa con cascara y tostado",
        sopa: "caldo de gallina de campo",
        plato_fuerte: "carnes coloradas con ensalada de lechuga",
        bebida: "té frio de cedron"
    }
]

function getMenus() {
    /*
    Creamos una funcion que nos devuelva los menus con el argumento de 
    resolve en caso de existir, si el arreglo de menus esta vacio
    nos devuelve un mensaje notificandonos al respecto.
    Esta funcion ya trabaja con promesas y para la simulacion de 
    asyncronia se va a usar la funcion de setTimeout() con un delay de 2s
    1000ms == 1s
    */
    return new Promise((resolve, reject) => {
        if (menus.length === 0) {
            reject(new Error('No hay menus disponibles'));
        }
        setTimeout(() => {
            //si el arreglo de menus no esta vacio lo que va a devolvernos 
            //es la informacion pero mediante resolve
            resolve(menus);
        }, 2000)
    })
}

async function buscarMenus() {
    try {
        // Intentamos obtener los menús
        const menu = await getMenus();
        const cont = document.getElementById('container');
        const title = document.createElement('h2');
        const tam = menu.length;

        cont.innerHTML = "";
        title.textContent = "Menú del día";
        cont.appendChild(title);

        for (let i = 0; i < tam; i++) {
            const tarjet = document.createElement('p');
            tarjet.id = "tableMenu";
            const menuItem = menu[i];
            for (let propiedad in menuItem) {
                tarjet.innerHTML += `${menuItem[propiedad]}<br>`;
            }
            cont.appendChild(tarjet);
        }
    } catch (error) {
        const cont = document.getElementById('container');
        cont.innerHTML = `<p class="errorMsg">${error.message}</p>`;
    }
}

buscarMenus();
