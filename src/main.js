require("colors");
const {createPromptModule, Separator} = require('inquirer');
const inquirer = createPromptModule();

// --- IMPORTACIONES DE FUNCIONALIDADES ---
const {solicitarDatosLibro} = require('./agregarLibro');
const {mostrarCatalogo} = require('./mostarCatalogo');
const {buscarLibroPorTitulo} = require('./buscarLibro');
const {eliminarLibro} = require('./eliminarLibro');
const {mostrarEstadisticas} = require('./verEstadisticas');
const {ordenarLibros} = require('./ordenarLibros');
const {editarLibro} = require('./editarLibro');
const {filtrarPorAutor} = require('./filtrarPorAutor');

function logoInicio() {
    console.clear();
    const asciiArt = String.raw`
 ____  _ _     _ _       __  __                                   
| __ )(_) |__ | (_) ___ |  \/  | __ _ _ __   __ _  __ _  ___ _ __
|  _ \| | '_ \| | |/ _ \| |\/| |/ _\`| '_ \ / _\`|/ _\`|/ _ \'__|
| |_) | | |_) | | | (_) | |  | | (_| | | | | (_| | (_| |  __/ |
|____/|_|_.__/|_|_|\___/|_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|
                                                  |___/ `;
    console.log(asciiArt.cyan);
    console.log('             El Rincón del Saber - BiblioManager'.white.bold);
    console.log('=============================================================='.grey);

}

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Selecciona una opción:',
        choices: [
            {value: '1', name: `${'1.'.yellow} Agregar libro`},
            {value: '2', name: `${'2.'.yellow} Mostrar catálogo`},
            {value: '3', name: `${'3.'.yellow} Buscar libro por título`},
            {value: '4', name: `${'4.'.yellow} Eliminar libro`},
            {value: '5', name: `${'5.'.yellow} Ver estadísticas`},
            {value: '6', name: `${'6.'.yellow} Ordenar libros`},
            {value: '7', name: `${'7.'.yellow} Editar libro`},
            {value: '9', name: `${'9.'.cyan} Filtrar por Autor (Extra)`},
            {value: '8', name: `${'8.'.red} Salir`},
        ],
        pageSize: 11
    }
];

async function confirmarContinuar() {
    const pregunta = [{
        type: 'confirm',
        name: 'confirmacion',
        message: '¿Deseas volver al menú principal?'.grey,
        default: true
    }];
    const {confirmacion} = await inquirer(pregunta);
    return confirmacion;
}

async function mostrarMenu() {
    let continuarEnMenu = true;
    while (continuarEnMenu) {
        logoInicio();
        const {opcion: seleccion} = await inquirer(opciones);
        switch (seleccion) {
            case '1': // Agregar libro
                await solicitarDatosLibro();
                break;
            case '2': // Mostrar catálogo
                mostrarCatalogo();
                break;
            case '3': // Buscar libro por título
                await buscarLibroPorTitulo();
                break;
            case '4': // Eliminar libro
                await eliminarLibro();
                break;
            case '5': // Ver estadísticas
                mostrarEstadisticas();
                break;
            case '6': // Ordenar libros
                await ordenarLibros();
                break;
            case '7': // Editar libro
                await editarLibro();
                break;
            case '9': // Filtrar por Autor (Extra)
                await filtrarPorAutor();
                break;
            case '8':
                continuarEnMenu = false;
                break;
            default:
                logoInicio();
                console.log('Opción no reconocida.'.red.bold);
                break;
        }

        if (continuarEnMenu && seleccion !== '8') {
            await new Promise(resolve => setTimeout(resolve, 500));
            continuarEnMenu = await confirmarContinuar();
        }
    }
    logoInicio();
    console.log('\n¡Gracias por usar BiblioManager!'.cyan.bold);

}

mostrarMenu();