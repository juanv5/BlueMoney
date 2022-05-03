//1. Recibir por la línea de comando los siguientes argumentos:

//a. Nombre del archivo que se creará.
//b. Extensión del archivo.
//c. Indicador económico que se desea convertir.
//d. Cantidad de pesos que se quiere cambiar.

const fs = require("fs");
const https = require("https");

const argumentos = process.argv.slice(2);
const nombreArchivo = argumentos[0];
const extensionArchivo = argumentos[1];
const indicadorEconomico = argumentos[2];
const cantidadPesos = argumentos[3];

const dia = new Date().toUTCString(); // formato zona h

//2. Consultar la API con el módulo https y almacenar la respuesta en una variable.

const url = "https://mindicador.cl/api";

https.get(url, (resp) => {
        resp.on("data", (data) => {
            const datos = JSON.parse(data);
            const cambio = datos[indicadorEconomico].valor;
            const total = (cantidadPesos / cambio).toFixed(2);

            const mensaje = `A la fecha:${dia}
Fue realizada cotización con los siguientes datos:
Cantidad de pesos a convertir: ${cantidadPesos} pesos
Convertido a ${indicadorEconomico} da un total de: $ ${total}`;

            //3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos
            //recibidos por línea de comando y su contenido basado en el template de la
            //descripción.

            fs.writeFile(
                `${nombreArchivo}.${extensionArchivo}`,
                mensaje,
                "utf8",
                () => {
                    console.log(mensaje);
                }
            );
        });
    })
    //4. Enviar por consola el contenido del archivo luego de que haya sido creado.


.on("error", (err) => {
    console.log("Error: " + err.message);
});