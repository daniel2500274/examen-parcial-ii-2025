const fs = require('fs');
const path = require('path');
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

function mostrarEstadisticas() {
    console.log('\n--- Estadísticas del Catálogo ---'.magenta.bold);
    console.log('================================='.magenta);

    const filePath = path.join('data', 'database.json');
    const libros = consultaDatabase(filePath);

    if (libros.length === 0) {
        console.log('El catálogo está vacío. No hay estadísticas para mostrar.'.yellow);
        console.log('=================================\n'.magenta);
        return;
    }

    // 1. Cantidad total de libros
    const cantidadTotal = libros.length;
    console.log(`Cantidad total de libros........: `.cyan + `${cantidadTotal}`.white.bold);

    // 2. Precio promedio
    const sumaPrecios = libros.reduce((acumulador, libro) => acumulador + (libro.precio || 0), 0);
    const precioPromedio = cantidadTotal > 0 ? (sumaPrecios / cantidadTotal) : 0;
    console.log(`Precio promedio de los libros...: `.cyan + `GTQ${precioPromedio.toFixed(2)}`.white.bold);

    // copias para ordenar sin modificar el original
    const copiaLibrosParaAnio = [...libros];
    const copiaLibrosParaPrecio = [...libros];

    // 3. Libro más antiguo
    copiaLibrosParaAnio.sort((a, b) => a.anioPublicacion - b.anioPublicacion);
    const libroMasAntiguo = copiaLibrosParaAnio[0];
    console.log(`Libro más antiguo...............: `.cyan + `${libroMasAntiguo.titulo} (${libroMasAntiguo.anioPublicacion})`.white.bold);

    // 4. Libro más caro
    copiaLibrosParaPrecio.sort((a, b) => b.precio - a.precio); // Orden descendente por precio
    const libroMasCaro = copiaLibrosParaPrecio[0];
    console.log(`Libro más caro..................: `.cyan + `${libroMasCaro.titulo} (GTQ${libroMasCaro.precio.toFixed(2)})`.white.bold);

    console.log('=================================\n'.magenta);
}

module.exports = {mostrarEstadisticas};