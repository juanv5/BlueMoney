//5. Ejecutar la aplicación desde un archivo externo con el módulo child_process
//enviando los argumentos correspondientes y devolviendo por consola el contenido
//del archivo luego de que haya sido creado.


const { exec } = require('child_process')

const argumentos = process.argv.slice(2)
const nombreArchivo = argumentos[0]
const extension = argumentos[1]
const indicador = argumentos[2]
const cantidad = argumentos[3]




exec(`node BlueMoney.js ${nombreArchivo} ${extension} ${indicador} ${cantidad}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`)
        return
    }
    console.log(`stdout: ${stdout}`) // estandar dde salida
    console.error(`stderr: ${stderr}`) // estandar de error
})