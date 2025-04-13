const fs = require('fs');
const path = require('path');
const {createPromptModule} = require('inquirer');
const prompt = createPromptModule();
const colors = require('colors');

// Función auxiliar para leer la base de datos
function consultaDatabase(filePath) {
    const absoluteFilePath = path.resolve(__dirname, filePath);
    if (fs.existsSync(absoluteFilePath)) {
        try {
            const rawData = fs.readFileSync(absoluteFilePath, 'utf8');
            return rawData ? JSON.parse(rawData) : [];
        } catch (error) {
            console.error(`Error al leer o parsear ${absoluteFilePath}:`.red, error);
            return [];
        }
    }
    return [];
}

// Función auxiliar para escribir en la base de datos
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

// Función principal para eliminar un libro
async function eliminarLibro() {
    console.log('\n--- Eliminar Libro ---'.red.bold);
    console.log('======================'.red);

    const filePath = path.join('data', 'database.json');
    let libros = consultaDatabase(filePath);

    if (libros.length === 0) {
        console.log('El catálogo está vacío. No hay libros para eliminar.'.yellow);
        console.log('======================\n'.red);
        return;
    }

    const opcionesLibros = libros.map((libro, index) => ({
        name: `${(index + 1).toString().padStart(2, ' ')}. ${libro.titulo} - ${libro.autor}`.yellow,
        value: index
    }));

    opcionesLibros.push({type: 'separator'});

    opcionesLibros.push({name: 'Cancelar'.grey, value: -1});

    const {indiceSeleccionado} = await prompt([
        {
            type: 'list',
            name: 'indiceSeleccionado',
            message: 'Selecciona el libro que deseas eliminar:'.red,
            choices: opcionesLibros,
            pageSize: 10
        }
    ]);

    if (indiceSeleccionado === -1) {
        console.log('\nOperación cancelada.'.grey);
        console.log('======================\n'.red);
        return;
    }

    const libroAEliminar = libros[indiceSeleccionado];
    const {confirmacion} = await prompt([
        {
            type: 'confirm',
            name: 'confirmacion',
            message: `¿Estás seguro de que deseas eliminar "${libroAEliminar.titulo}" de ${libroAEliminar.autor}?`.red.bold,
            default: false
        }
    ]);

    if (confirmacion) {
        const libroEliminado = libros.splice(indiceSeleccionado, 1)[0];
        const exito = escribirArchivoJSON(filePath, libros);
        if (exito) {
            console.log(`\nLibro "${libroEliminado.titulo}" eliminado exitosamente.`.green);
        } else {
            console.log('\nError: No se pudo guardar la lista actualizada de libros.'.red);
        }
    } else {
        console.log('\nEliminación cancelada.'.grey);
    }
    console.log('======================\n'.red);
}

module.exports = {eliminarLibro};