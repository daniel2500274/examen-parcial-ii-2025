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
            return []; // Devolver array vacío en caso de error
        }
    }
    return []; // Devolver array vacío si el archivo no existe
}

async function filtrarPorAutor() {
    console.log('\n--- Filtrar Libros por Autor ---'.magenta.bold);
    console.log('================================'.magenta);

    const filePath = path.join('data', 'database.json');
    const libros = consultaDatabase(filePath);

    // Verificar si hay libros en el catálogo
    if (!libros || libros.length === 0) {
        console.log('El catálogo está vacío. No hay libros para filtrar.'.yellow);
        console.log('================================\n'.magenta);
        return;
    }

    // Solicitar  el nombre del autor a buscar
    const {autorBuscado} = await prompt([
        {
            type: 'input',
            name: 'autorBuscado',
            message: 'Introduce el nombre (o parte del nombre) del autor a buscar:'.cyan,
            filter: (input) => input.trim(),
            validate: (input) => input.length > 0 ? true : 'El nombre del autor no puede estar vacío.'
        }
    ]);

    const librosFiltrados = libros.filter(libro =>
        libro.autor.toLowerCase().includes(autorBuscado.toLowerCase())
    );


    if (librosFiltrados.length === 0) {
        console.log(`\nNo se encontraron libros del autor "${autorBuscado}".`.red);
    } else {
        console.log(`\n--- Libros Encontrados por Autor "${autorBuscado}" (${librosFiltrados.length}) ---`.green.bold);
        librosFiltrados.forEach((libro, index) => {
            console.log(`${(index + 1).toString().padStart(3, ' ')}.`.grey + ` Título: `.yellow + `${libro.titulo}`);

            if (libro.precio !== undefined) {
                console.log(`      Precio: `.yellow + `GTQ${libro.precio.toFixed(2)}`);
            }
            if (libro.anioPublicacion !== undefined) {
                console.log(`      Año: `.yellow + `${libro.anioPublicacion}`);
            }
            console.log(`      ID/ISBN: `.grey + `${libro.id}`);
            console.log('   ----------------------'.grey);
        });
    }
    console.log('================================\n'.magenta);
}

module.exports = {filtrarPorAutor};