# CRUD de Productos con PHP, MySQL y Fetch API

## Descripción

Este proyecto consiste en el desarrollo de un sistema CRUD (Crear, Leer, Actualizar y Buscar) de productos utilizando PHP, MySQL, JavaScript y Fetch API.

La aplicación permite registrar productos, consultar los productos almacenados, buscar por código o nombre y modificar la información existente.

También se implementó una estructura basada en clases para separar la conexión a la base de datos y la administración de los productos, facilitando la organización y mantenimiento del código.

## Estructura del proyecto

```text
crud_fetch/
│
├── Modelo/
│   ├── conexion.php
│   └── Productos.php
│
├── index.html
├── registrar.php
└── script.js
```

## Archivos del proyecto

| Archivo | Descripción |
|---|---|
| `index.html` | Contiene el formulario de productos, los campos de búsqueda y la tabla para mostrar los registros. |
| `script.js` | Controla las acciones del usuario, las validaciones del formulario y las peticiones mediante Fetch API. |
| `registrar.php` | Recibe las solicitudes del cliente y utiliza `switch` para controlar las operaciones del CRUD. |
| `Modelo/conexion.php` | Contiene la clase `DB`, encargada de conectarse a MySQL y ejecutar consultas preparadas. |
| `Modelo/Productos.php` | Contiene la clase `Producto`, que administra los datos, valida la información y realiza las operaciones de productos. |

<img width="278" height="205" alt="Captura de pantalla 2026-11-25 190329" src="https://github.com/user-attachments/assets/e3618c36-046e-4bfa-a6b7-ea009b150b5b" />

## Funcionalidades realizadas

- Registro de productos nuevos.
- Modificación de productos existentes.
- Búsqueda de productos por código o nombre.
- Visualización de los productos en una tabla.
- Validación de los datos en JavaScript y PHP.
- Uso de Fetch API para enviar y recibir información sin recargar la página.
- Uso de `switch` en PHP para controlar las acciones solicitadas.
- Uso de `switch` en JavaScript para controlar las acciones de Guardar y Modificar.
- Uso de PDO para la conexión con MySQL.
- Uso de consultas preparadas para ejecutar operaciones de forma segura.
- Respuestas del servidor en formato JSON.
- Uso de SweetAlert2 para mostrar mensajes de éxito y error.
- Organización del proyecto mediante clases y archivos separados.

## Base de datos

La aplicación utiliza una base de datos llamada `productosdb`, que contiene una tabla llamada `productos`.

La tabla almacena los siguientes campos:

| Campo | Descripción |
|---|---|
| `id` | Identificador del producto. |
| `codigo` | Código del producto. |
| `producto` | Nombre del producto. |
| `precio` | Precio del producto. |
| `cantidad` | Cantidad disponible en inventario. |

<img width="911" height="295" alt="Captura de pantalla 2026-11-25 181348" src="https://github.com/user-attachments/assets/682f1627-386d-469d-ba89-8b436bd39d1b" />

## Funcionamiento general

1. El usuario ingresa los datos del producto en el formulario.
2. JavaScript valida los campos y determina la acción que se realizará.
3. Fetch API envía los datos a `registrar.php`.
4. PHP recibe la solicitud y utiliza `switch` para identificar la operación.
5. La clase `Producto` valida los datos y solicita la operación correspondiente a la clase `DB`.
6. La clase `DB` ejecuta la consulta preparada en MySQL.
7. PHP devuelve una respuesta en formato JSON.
8. JavaScript recibe la respuesta y muestra un mensaje mediante SweetAlert2.
9. Si la operación fue exitosa, la tabla se actualiza con los datos de la base de datos.

## Clases utilizadas

### Clase `DB`

Se encuentra en `Modelo/conexion.php`.

Sus responsabilidades son:

- Establecer la conexión con la base de datos mediante PDO.
- Ejecutar consultas preparadas para insertar registros.
- Ejecutar consultas preparadas para actualizar registros.
- Realizar consultas y devolver los resultados.

Métodos principales:

- `getConexion()`
- `insertarSeguro()`
- `actualizarSeguro()`
- `consultar()`

<img width="946" height="835" alt="Captura de pantalla 2026-11-25 181914" src="https://github.com/user-attachments/assets/68e11dd3-017c-456e-ac92-f162cdd7d2ac" />

### Clase `Producto`

Se encuentra en `Modelo/Productos.php`.

Sus responsabilidades son:

- Almacenar los datos de un producto.
- Validar la información antes de realizar operaciones.
- Guardar productos nuevos.
- Modificar productos existentes.
- Buscar productos por código o nombre.

Métodos principales:

- `setDatos()`
- `validar()`
- `guardar()`
- `editar()`
- `buscar()`

<img width="1027" height="883" alt="Captura de pantalla 2026-11-25 182144" src="https://github.com/user-attachments/assets/fde37937-b5c2-44e0-8bd5-c5c707c5bae9" />

## Explicación de los archivos principales

### `index.html`

Este archivo contiene la interfaz principal de la aplicación CRUD de productos.

En él se encuentra el formulario para registrar y modificar productos, con los campos de código, nombre, precio y cantidad.

También contiene los botones para guardar, actualizar y limpiar el formulario, además del campo de búsqueda y la tabla donde se muestran los productos registrados.

Se utiliza Bootstrap para mejorar la presentación de la página y SweetAlert2 para mostrar mensajes de confirmación, éxito y error.

<img width="1023" height="897" alt="Captura de pantalla 2026-11-25 182550" src="https://github.com/user-attachments/assets/574f848a-c788-40df-a179-3678cd69edd7" />

### `registrar.php`

Este archivo funciona como intermediario entre JavaScript y las clases PHP del proyecto.

Recibe las solicitudes enviadas mediante Fetch API y utiliza una estructura `switch` para identificar la acción solicitada.

Las acciones implementadas son:

- `Guardar`: registra un producto nuevo.
- `Modificar`: actualiza la información de un producto existente.
- `Buscar`: consulta productos por código o nombre.
- `Eliminar`: elimina un producto seleccionado.

Según la acción recibida, el archivo llama al método correspondiente de la clase `Producto`.

Finalmente, devuelve una respuesta en formato JSON que contiene el resultado de la operación, un mensaje y los posibles errores.

<img width="1030" height="896" alt="Captura de pantalla 2026-11-25 182827" src="https://github.com/user-attachments/assets/f2f09595-6f38-4c39-a1b1-a3d85203d9d0" />

### `script.js`

Este archivo contiene la lógica de JavaScript que permite la interacción entre el usuario y el servidor sin necesidad de recargar la página.

Sus principales funciones son:

- Obtener los elementos del formulario y de la tabla.
- Enviar datos a PHP mediante Fetch API utilizando `FormData`.
- Controlar las acciones de Guardar y Modificar mediante una estructura `switch`.
- Validar los campos del formulario antes de enviar los datos.
- Mostrar mensajes mediante SweetAlert2.
- Listar y buscar productos.
- Cargar los datos de un producto seleccionado en el formulario para editarlo.
- Eliminar productos después de solicitar confirmación.
- Limpiar el formulario y actualizar la tabla después de realizar una operación exitosa.

De esta manera, JavaScript se encarga de la interacción con el usuario y de la comunicación con PHP, mientras que PHP y las clases del modelo realizan las operaciones correspondientes en la base de datos.

<img width="947" height="888" alt="Captura de pantalla 2026-11-25 183855" src="https://github.com/user-attachments/assets/9052214a-e518-4718-87f4-ad918dedc6e4" />

## Herramientas utilizadas

- PHP
- MySQL
- JavaScript
- Fetch API
- PDO
- HTML5
- Bootstrap
- SweetAlert2
- WAMP Server
- Visual Studio Code

<img width="1681" height="882" alt="image" src="https://github.com/user-attachments/assets/8751ef41-46c8-410f-b932-c7169a185bbb" />

## Requisitos

- Tener instalado WAMP Server.
- Tener Apache y MySQL en funcionamiento.
- Crear la base de datos `productosdb`.
- Crear la tabla `productos` con los campos correspondientes.
- Colocar el proyecto dentro de la carpeta `www` de WAMP.

## Ejecución del proyecto

1. Iniciar WAMP Server.
2. Verificar que Apache y MySQL estén funcionando.
3. Colocar la carpeta `crud_fetch` dentro de `C:\wamp64\www`.
4. Crear la base de datos y la tabla `productos`.
5. Abrir el navegador y acceder a:

```text
http://localhost/crud_fetch/
```

## Objetivo del laboratorio

Aplicar los conocimientos de PHP, JavaScript y bases de datos para desarrollar una aplicación CRUD funcional, utilizando Fetch API para la comunicación entre el cliente y el servidor, consultas preparadas para el acceso seguro a MySQL y programación orientada a objetos para organizar el código.

## Autor

Estudiantes: Samuel Orocú 8-1039-1344 
             Gabriel Mendoza 8-1038-1624

Grupo: 1S3112
