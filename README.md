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

Estudiantes: Samuel Orocú - Gabriel Mendoza 

Grupo: 1S3112
