const readline = require('readline');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const colors = require('colors');

// Función para hacer preguntas al usuario
function preguntar(rl, pregunta) {
    return new Promise(resolve => rl.question(pregunta, respuesta => resolve(respuesta)));
}

// Función para leer el archivo JSON
function consultaDatabase(filePath) {
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return rawData ? JSON.parse(rawData) : [];
    }
    return [];
}

// Función para escribir en la base de datos
function escribirArchivoJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Función para validar el precio
function validarPrecio(precio) {
    const numero = parseFloat(precio);
    return !isNaN(numero) && numero > 0;
}

// Función para validar el año de publicación
function validarAnio(anio) {
    const numero = parseInt(anio, 10);
    const anioActual = new Date().getFullYear();
    return !isNaN(numero) && numero >= 0 && numero <= anioActual;
}

// Función para mostrar mensaje de éxito
function escrituraExitosa(titulo, autor, precio, anioPublicacion) {
    console.clear();
    console.log('                DATOS GUARDADOS EXITOSAMENTE!'.green.bold);
    console.log('          ========================================='.cyan);
    console.log(`Título.............: ${titulo}`.yellow);
    console.log(`Autor..............: ${autor}`.yellow);
    console.log(`Precio.............: ${precio}`.yellow);
    console.log(`Año de publicación : ${anioPublicacion}`.yellow);
    console.log('Datos guardados en /data/database.json'.magenta);
}

async function solicitarDatosLibro() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const titulo = await preguntar(rl, 'Introduce el título del libro: '.green);
        const autor = await preguntar(rl, 'Introduce el autor del libro: '.green);
        let precio = await preguntar(rl, 'Introduce el precio del libro: '.green);
        while (!validarPrecio(precio)) {
            console.log('Precio inválido. Debe ser un número positivo.'.red);
            precio = await preguntar(rl, 'Introduce el precio del libro: '.red);
        }
        let anioPublicacion = await preguntar(rl, 'Introduce el año de publicación del libro: '.green);
        while (!validarAnio(anioPublicacion)) {
            console.log('Año de publicación inválido. Debe ser un número válido.'.red);
            anioPublicacion = await preguntar(rl, 'Introduce el año de publicación del libro: '.red);
        }

        // Ruta de la base de datos
        const filePath = path.join(__dirname, 'data', 'database.json');

        // Crear el directorio si no existe
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true});
        }

        let libros = consultaDatabase(filePath);

        const nuevoLibro = {
            id: uuidv4(),
            titulo,
            autor,
            precio: parseFloat(precio),
            anioPublicacion: parseInt(anioPublicacion, 10)
        };
        libros.push(nuevoLibro);
        escribirArchivoJSON(filePath, libros);
        escrituraExitosa(titulo, autor, precio, anioPublicacion);
    } catch (error) {
        console.error('Error al solicitar datos:'.red, error);
    } finally {
        rl.close();
    }
}

module.exports = {solicitarDatosLibro};
