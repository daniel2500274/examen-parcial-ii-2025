# 📚 BiblioManager - El Rincón del Saber 🧠

## Erick Daniel Ramirez Divas

¡Una aplicación de consola moderna para gestionar el inventario de tu librería favorita! ✨ Desarrollada con Node.js.

---

## 📖 Acerca del Proyecto

Este proyecto es una simulación de un sistema de gestión de inventario para la librería ficticia **"El Rincón del Saber"
**. Nació como parte del Examen Parcial II de Programación I, con el objetivo de aplicar los conocimientos adquiridos en
JavaScript y Node.js para crear una herramienta útil y funcional.

Permite administrar un catálogo de libros directamente desde la terminal 🖥️, ofreciendo las operaciones esenciales para
mantener el inventario organizado.

---

## ✨ Funcionalidades Implementadas

¡Gestiona tu librería como un profesional con estas opciones!

* ➕ **Agregar Libro:** Incorpora nuevos tesoros literarios al catálogo (Título, Autor, Precio, Año).
* 👀 **Mostrar Catálogo:** Visualiza todos los libros registrados, ¡bien ordenaditos!
* 🔎 **Buscar Libro por Título:** ¿Buscas algo específico? Encuéntralo en segundos por su nombre.
* 👤 **Filtrar por Autor (Extra):** Descubre todas las obras de tu autor preferido en el catálogo.
* 🗑️ **Eliminar Libro:** Retira libros del inventario (¡te pedirá confirmación antes! 😉).
* 📊 **Ver Estadísticas:** Obtén datos clave:
    * 🔢 Cantidad total de libros.
    * 💰 Precio promedio.
    * 👴 Libro más antiguo.
    * 💎 Libro más caro.
* ⇅ **Ordenar Libros:** Organiza el catálogo por `Precio` o `Año de publicación` (ascendente o descendente). ¡Tú eliges!
* ✏️ **Editar Libro:** ¿Un error en los datos? Modifica la información de un libro existente fácilmente.
* 🚪 **Salir:** Cierra la aplicación con un mensaje amigable. ¡Hasta pronto! 👋

---

## 🚀 Tecnologías Utilizadas

Las herramientas mágicas detrás de BiblioManager:

* **Lenguaje:** JavaScript (ejecutado con Node.js)
* **Manejo de Paquetes:** npm
* **Interfaz de Consola Interactiva:** `inquirer` (¡para esos menús y preguntas tan chulos!)
* **Estilo en Consola:** `colors` (¡porque la vida necesita color!) 🎨
* **IDs Únicos:** `uuid` (para que cada libro tenga su identidad secreta 🕵️)
* **Persistencia de Datos:** Módulo `fs` de Node.js para leer/escribir en un archivo JSON (`data/database.json`).

---

## ⚙️ Instalación y Configuración

¡Manos a la obra! Para ejecutar este proyecto en tu máquina:

1. **Clona el repositorio:** (Reemplaza `<URL_DEL_REPOSITORIO>` con la URL real)
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd examen-final-libreria
   ```
2. **Instala las dependencias:** Necesitarás Node.js y npm instalados previamente.
   ```bash
   npm install
   ```
   *Este comando descarga todas las librerías necesarias (`inquirer`, `colors`, `uuid`) que están listadas
   en `package.json`.*

---

## ▶️ Cómo Ejecutar la Aplicación

¡Es hora de abrir la librería! 🏪

Una vez que tengas las dependencias instaladas, ejecuta el siguiente comando desde la carpeta raíz del proyecto:

```bash
npm run start 
o
node src/main.js
