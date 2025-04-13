const fs = require('fs');
const path = require('path');

function consultaDatabase(filePath) {
    const absoluteFilePath = path.resolve(__dirname, filePath);
    if (fs.existsSync(absoluteFilePath)) {
        try {
            const rawData = fs.readFileSync(absoluteFilePath, 'utf8');
            return rawData ? JSON.parse(rawData) : [];
        } catch (error) {
            console.error(`Error al listar libros ${absoluteFilePath}:`.red, error);
            return [];
        }
    }
    return [];
}

// Función para mostrar el catálogo
function mostrarCatalogo() {
    console.log('\n--- Catálogo de Libros ---'.cyan.bold);
    console.log('=========================='.cyan);

    const filePath = path.join('data', 'database.json');
    const libros = consultaDatabase(filePath);

    if (libros.length === 0) {
        console.log('El catálogo está vacío.'.red);
    } else {
        // leemos registro por registro en la bdd
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
    console.log('==========================\n'.cyan);
}

// Exportar la función para usarla en main.js
module.exports = {mostrarCatalogo};