# 📚 Examen Parcial II - Programación I | Sistema de Librería en Consola

## Contexto

Has sido contratado por una pequeña librería local llamada **"El Rincón del Saber"**.  
El dueño de la librería quiere modernizar la forma en la que administra su catálogo de libros y necesita una *
*aplicación de consola** para gestionar su inventario.

Tu misión es desarrollar un sistema simple pero funcional que le permita **agregar, editar, buscar, eliminar y analizar
** los libros que tiene a la venta.  
Este proyecto pondrá a prueba todo lo que has aprendido durante el curso hasta ahora.

---

## 🎯 Requisitos del sistema

### Menú principal

El sistema debe mostrar el siguiente menú (puedes usar `switch` o `if-else`):

```
1. Agregar libro
2. Mostrar catálogo
3. Buscar libro por título
4. Eliminar libro
5. Ver estadísticas
6. Ordenar libros
7. Editar libro
8. Salir
```

---

## ✅ Funcionalidades obligatorias

### 1. Agregar libro

Solicitar al usuario los siguientes datos:

- Título
- Autor
- Precio
- Año de publicación

Guardar el libro como un objeto dentro de un arreglo llamado `catalogo`.

### 2. Mostrar catálogo

Mostrar todos los libros registrados en el sistema en un formato ordenado.

### 3. Buscar libro por título

Permitir al usuario ingresar el título de un libro y mostrar sus datos si existe.  
Si no se encuentra, mostrar `"Libro no encontrado"`.

### 4. Eliminar libro

Solicitar un título y eliminar el libro correspondiente del catálogo.  
Confirmar si fue eliminado correctamente.

### 5. Ver estadísticas

Mostrar:

- Cantidad total de libros
- Precio promedio
- Libro más antiguo
- Libro más caro

### 6. Ordenar libros

Permitir ordenar el catálogo por:

- Precio (ascendente o descendente)
- Año de publicación

El usuario debe poder elegir el criterio de ordenamiento.

### 7. Editar libro

Permitir editar un libro existente: buscar por título y modificar sus datos.

### 8. Salir

Finalizar el programa.

---

## 🔧 Requisitos técnicos

- Usar **funciones** para cada acción.
- Utilizar **arreglos de objetos**.
- Aplicar al menos **4 métodos de arreglo** como `.push()`, `.filter()`, `.find()`, `.sort()`, `.reduce()`, etc.
- Utilizar **bucles (`while`, `do...while` o `for`)** para mantener el menú activo.
- Validar datos básicos (por ejemplo, que el precio sea un número positivo).
- El sistema debe ejecutarse desde la terminal y mostrar información clara.

---

## ✨ Puntos extra

- Usar colores en la consola (`chalk`, `colors`, etc.).
- Crear una función para guardar el catálogo en un archivo (`fs.writeFileSync`).
- Agregar una opción para **filtrar libros por autor**.

---

## 🧪 Entrega

1. Crea un repositorio llamado `examen-final-libreria` en tu GitHub.
2. Sube el proyecto con tu solución (excluyendo la carpeta `node-modules`).
3. Agrega un archivo `README.md` con una breve explicación.
4. Envía el enlace de tu repositorio el espacio para la entrega

---

### ¡Mucho éxito! Que tu código sea tan organizado como tu librería 🧠📖
