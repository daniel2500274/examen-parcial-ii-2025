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

// Función para mostrar libros ordenados
function displayLibrosOrdenados(libros, criterio, orden) {
    console.log(`\n--- Catálogo Ordenado por ${criterio} (${orden}) ---`.cyan.bold);
    console.log('=================================================='.cyan);
    if (libros.length === 0) {
        console.log('El catálogo está vacío.'.red);
    } else {
        libros.forEach((libro, index) => {
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
    console.log('==================================================\n'.cyan);
}


async function ordenarLibros() {
    console.log('\n--- Ordenar Catálogo ---'.blue.bold);
    console.log('========================'.blue);

    const filePath = path.join('data', 'database.json');
    const libros = consultaDatabase(filePath);

    if (libros.length < 2) {
        console.log('No hay suficientes libros para ordenar.'.yellow);
        console.log('========================\n'.blue);
        return;
    }

    const {criterio} = await prompt([
        {
            type: 'list',
            name: 'criterio',
            message: 'Selecciona el criterio de ordenamiento:'.blue,
            choices: [
                {name: 'Precio', value: 'precio'},
                {name: 'Año de publicación', value: 'anio'},
                {name: 'Cancelar', value: 'cancelar'}
            ]
        }
    ]);

    if (criterio === 'cancelar') {
        console.log('\nOperación cancelada.'.grey);
        console.log('========================\n'.blue);
        return;
    }

    const {orden} = await prompt([
        {
            type: 'list',
            name: 'orden',
            message: 'Selecciona el orden:'.blue,
            choices: [
                {name: 'Ascendente (menor a mayor)', value: 'asc'},
                {name: 'Descendente (mayor a menor)', value: 'desc'}
            ]
        }
    ]);

    // Crear una copia para no modificar el array original directamente
    const librosOrdenados = [...libros];

    // SORT
    if (criterio === 'precio') {
        librosOrdenados.sort((a, b) => orden === 'asc' ? a.precio - b.precio : b.precio - a.precio);
        displayLibrosOrdenados(librosOrdenados, 'Precio', orden === 'asc' ? 'Ascendente' : 'Descendente');
    } else if (criterio === 'anio') {
        librosOrdenados.sort((a, b) => orden === 'asc' ? a.anioPublicacion - b.anioPublicacion : b.anioPublicacion - a.anioPublicacion);
        displayLibrosOrdenados(librosOrdenados, 'Año', orden === 'asc' ? 'Ascendente' : 'Descendente');
    }

    console.log('========================\n'.blue);
}

module.exports = {ordenarLibros};