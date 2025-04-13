const fs = require('fs');
const path = require('path');
// Importa el módulo ESM de inquirer correctamente:
const inquirerModule = require('inquirer').default;
const {Separator} = inquirerModule;
const prompt = inquirerModule.createPromptModule();
const colors = require('colors');

// Función para leer la base de datos
function consultaDatabase(filePath) {
    const absoluteFilePath = path.resolve(__dirname, filePath);
    if (fs.existsSync(absoluteFilePath)) {
        try {
            const rawData = fs.readFileSync(absoluteFilePath, 'utf8');
            return rawData ? JSON.parse(rawData) : [];
        } catch (error) {
            console.error(`Error al leer ${absoluteFilePath}:`.red, error);
            return [];
        }
    }
    return [];
}

// Función para escribir en la base de datos
function escribirArchivoJSON(filePath, data) {
    const absoluteFilePath = path.resolve(__dirname, filePath);
    try {
        const dirPath = path.dirname(absoluteFilePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true});
        }
        fs.writeFileSync(absoluteFilePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error al escribir en ${absoluteFilePath}:`.red, error);
        return false;
    }
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

async function editarLibro() {
    console.log('\n--- Editar Libro ---'.cyan.bold);
    console.log('===================='.cyan);

    const filePath = path.join('data', 'database.json');
    let libros = consultaDatabase(filePath);

    if (libros.length === 0) {
        console.log('El catálogo está vacío. No hay libros para editar.'.yellow);
        console.log('====================\n'.cyan);
        return;
    }

    // Selección de libros
    const opcionesLibros = libros.map((libro, index) => ({
        name: `${(index + 1).toString().padStart(2, ' ')}. ${libro.titulo} - ${libro.autor}`.yellow,
        value: index // Usamos el índice para facilitar la edición
    }));

    // Agregamos un separador y la opción para cancelar
    opcionesLibros.push(new Separator());
    opcionesLibros.push({name: 'Cancelar'.grey, value: -1});

    const {indiceSeleccionado} = await prompt([
        {
            type: 'list',
            name: 'indiceSeleccionado',
            message: 'Selecciona el libro que deseas editar:'.cyan,
            choices: opcionesLibros,
            pageSize: 10
        }
    ]);

    if (indiceSeleccionado === -1) {
        console.log('\nOperación cancelada.'.grey);
        console.log('====================\n'.cyan);
        return;
    }

    const libroAEditar = libros[indiceSeleccionado];
    console.log("\nEditando:".white, `'${libroAEditar.titulo}'`.yellow);
    console.log("(Deja el campo vacío y presiona Enter para mantener el valor actual)".grey);

    // Solicitar nuevos datos (o mantener los actuales si se deja vacío)
    const {nuevoTitulo} = await prompt([
        {type: 'input', name: 'nuevoTitulo', message: `Nuevo título (${libroAEditar.titulo}):`.green}
    ]);
    const {nuevoAutor} = await prompt([
        {type: 'input', name: 'nuevoAutor', message: `Nuevo autor (${libroAEditar.autor}):`.green}
    ]);

    let nuevoPrecio;
    do {
        const respuestaPrecio = await prompt([
            {
                type: 'input',
                name: 'nuevoPrecio',
                message: `Nuevo precio (${libroAEditar.precio}):`.green,
                validate: validarPrecio
            }
        ]);
        nuevoPrecio = respuestaPrecio.nuevoPrecio;
        if (!validarPrecio(nuevoPrecio)) {
            console.log('Precio inválido. Debe ser un número positivo o dejar vacío.'.red);
        }
    } while (!validarPrecio(nuevoPrecio));

    let nuevoAnio;
    do {
        const respuestaAnio = await prompt([
            {
                type: 'input',
                name: 'nuevoAnio',
                message: `Nuevo año (${libroAEditar.anioPublicacion}):`.green,
                validate: validarAnio
            }
        ]);
        nuevoAnio = respuestaAnio.nuevoAnio;
        if (!validarAnio(nuevoAnio)) {
            console.log('Año inválido o dejar vacío.'.red);
        }
    } while (!validarAnio(nuevoAnio));

    // Actualizar el objeto libro en el array
    libros[indiceSeleccionado] = {
        ...libroAEditar,
        titulo: nuevoTitulo || libroAEditar.titulo,
        autor: nuevoAutor || libroAEditar.autor,
        precio: nuevoPrecio !== '' ? parseFloat(nuevoPrecio) : libroAEditar.precio,
        anioPublicacion: nuevoAnio !== '' ? parseInt(nuevoAnio, 10) : libroAEditar.anioPublicacion
    };

    // Guardar los cambios en el archivo
    const exito = escribirArchivoJSON(filePath, libros);

    if (exito) {
        console.log(`\nLibro "${libros[indiceSeleccionado].titulo}" actualizado exitosamente.`.green);
    } else {
        console.log('\nError: No se pudo guardar la lista actualizada de libros.'.red);
        libros[indiceSeleccionado] = libroAEditar;
    }

    console.log('====================\n'.cyan);
}

module.exports = {editarLibro};
