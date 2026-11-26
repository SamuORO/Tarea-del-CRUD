<?php

header("Content-Type: application/json; charset=utf-8");

require_once "Modelo/productos.php";

// Respuesta inicial
$response = [
    "success" => false,
    "message" => "No se pudo realizar la operacion.",
    "accion" => "",
    "errors" => []
];

try {

    // Recibir la acción enviada desde JavaScript
    $accion = $_POST["Accion"] ?? "";

    // Crear el objeto Producto
    $producto = new Producto();

    switch ($accion) {

        case "Guardar":

            // Recibir los datos del formulario
            $codigo = $_POST["Codigo"] ?? "";
            $nombre = $_POST["Producto"] ?? "";
            $precio = $_POST["Precio"] ?? "";
            $cantidad = $_POST["Cantidad"] ?? "";

            // Asignar los datos al objeto
            $producto->setDatos(
                $codigo,
                $nombre,
                $precio,
                $cantidad
            );

            // Ejecutar el método guardar()
            $response = $producto->guardar();

            $response["accion"] = "Guardar";

            break;


        case "Modificar":

            // Recibir los datos del formulario
            $id = $_POST["Id"] ?? "";
            $codigo = $_POST["Codigo"] ?? "";
            $nombre = $_POST["Producto"] ?? "";
            $precio = $_POST["Precio"] ?? "";
            $cantidad = $_POST["Cantidad"] ?? "";

            // Asignar los datos al objeto
            $producto->setDatos(
                $codigo,
                $nombre,
                $precio,
                $cantidad,
                $id
            );

            // Ejecutar el método editar()
            $response = $producto->editar();

            $response["accion"] = "Modificar";

            break;


        case "Buscar":

            // Recibir el término de búsqueda
            $termino = $_POST["Buscar"] ?? "";

            // Buscar los productos
            $resultados = $producto->buscar($termino);

            $response = [
                "success" => true,
                "message" => "Busqueda realizada correctamente.",
                "accion" => "Buscar",
                "data" => $resultados,
                "errors" => []
            ];

            break;


        default:

            $response = [
                "success" => false,
                "message" => "La accion solicitada no es valida.",
                "accion" => $accion,
                "errors" => []
            ];

            break;
    }

} catch (Throwable $e) {

    // Registrar el error real en el servidor
    error_log($e->getMessage());

    // Enviar un mensaje controlado al usuario
    $response = [
        "success" => false,
        "message" => "Ocurrio un error al procesar la solicitud.",
        "accion" => $_POST["Accion"] ?? "",
        "errors" => []
    ];
}

// Enviar únicamente la respuesta JSON
echo json_encode($response);

exit;
