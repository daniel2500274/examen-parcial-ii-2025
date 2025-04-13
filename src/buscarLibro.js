const fs = require('fs');
const path = require('path');
const {createPromptModule} = require('inquirer');
const prompt = createPromptModule();
const colors = require('colors');

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

async function buscarLibroPorTitulo() {
    console.log('\n--- Buscar Libro por Título ---'.yellow.bold);
    console.log('=============================='.yellow);

    const filePath = path.join('data', 'database.json');
    const libros = consultaDatabase(filePath);

    if (libros.length === 0) {
        console.log('El catálogo está vacío.'.yellow);
        console.log('==============================\n'.yellow);
        return;
    }

    const {tituloBuscado} = await prompt([
        {
            type: 'input',
            name: 'tituloBuscado',
            message: 'Introduce el título (o parte del título) del libro a buscar:'.green,
            filter: (input) => input.trim(),
            validate: (input) => input.length > 0 ? true : 'El título no puede estar vacío.'
        }
    ]);

    const librosEncontrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(tituloBuscado.toLowerCase())
    );

    if (librosEncontrados.length === 0) {
        console.log(`\nLibro con título "${tituloBuscado}" no encontrado.`.red);
    } else {
        console.log(`\n--- Libros Encontrados (${librosEncontrados.length}) ---`.cyan.bold);
        librosEncontrados.forEach((libro, index) => {
            console.log(`${(index + 1).toString().padStart(3, ' ')}.`.grey + ` Título: `.green + `${libro.titulo}`);
            console.log(`      Autor: `.green + `${libro.autor}`);
            if (libro.precio !== undefined) {
                console.log(`      Precio: `.green + `GTQ${libro.precio.toFixed(2)}`);
            }
            if (libro.anioPublicacion !== undefined) {
                console.log(`      Año: `.green + `${libro.anioPublicacion}`);
            }
            console.log(`      ID/ISBN: `.grey + `${libro.id}`);
            console.log('   ----------------------'.grey);
        });
    }
    console.log('==============================\n'.yellow);
}

module.exports = {buscarLibroPorTitulo};