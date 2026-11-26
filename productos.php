<?php

require_once __DIR__ . "/conexion.php";

class Producto
{
    private $db;
    private $id;
    private $codigo;
    private $producto;
    private $precio;
    private $cantidad;

    public function __construct()
    {
        // Crear el objeto de conexión DB
        $this->db = new DB();
    }

    // Asignar los datos del producto
    public function setDatos($codigo, $producto, $precio, $cantidad, $id = null)
    {
        $this->id = $id;
        $this->codigo = trim($codigo);
        $this->producto = trim($producto);
        $this->precio = $precio;
        $this->cantidad = $cantidad;
    }

    // Validar los datos antes de guardar o modificar
    private function validar()
    {
        $errores = [];

        if ($this->codigo === "") {
            $errores["codigo"] = "El código es obligatorio.";
        }

        if ($this->producto === "") {
            $errores["producto"] = "El nombre del producto es obligatorio.";
        }

        if (!is_numeric($this->precio) || $this->precio < 0) {
            $errores["precio"] = "El precio debe ser un número válido.";
        }

        if (
            filter_var($this->cantidad, FILTER_VALIDATE_INT) === false ||
            $this->cantidad < 0
        ) {
            $errores["cantidad"] = "La cantidad debe ser un número entero válido.";
        }

        return $errores;
    }

    // Guardar un producto nuevo
    public function guardar()
    {
        $errores = $this->validar();

        if (!empty($errores)) {
            return [
                "success" => false,
                "message" => "Revisa los datos del producto.",
                "errors" => $errores
            ];
        }

        $sql = "INSERT INTO productos
                (codigo, producto, precio, cantidad)
                VALUES (?, ?, ?, ?)";

        // Ejecutar la inserción mediante la clase DB
        $this->db->insertarSeguro($sql, [
            $this->codigo,
            $this->producto,
            $this->precio,
            $this->cantidad
        ]);

        return [
            "success" => true,
            "message" => "Producto guardado correctamente.",
            "errors" => []
        ];
    }

    // Editar un producto existente
    public function editar()
    {
        $errores = $this->validar();

        if (empty($this->id) || !is_numeric($this->id)) {
            $errores["id"] = "El ID del producto no es válido.";
        }

        if (!empty($errores)) {
            return [
                "success" => false,
                "message" => "Revisa los datos del producto.",
                "errors" => $errores
            ];
        }

        $sql = "UPDATE productos
                SET codigo = ?, producto = ?, precio = ?, cantidad = ?
                WHERE id = ?";

        // Ejecutar la actualización mediante la clase DB
        $this->db->actualizarSeguro($sql, [
            $this->codigo,
            $this->producto,
            $this->precio,
            $this->cantidad,
            $this->id
        ]);

        return [
            "success" => true,
            "message" => "Producto actualizado correctamente.",
            "errors" => []
        ];
    }

    // Buscar productos por código o nombre
    public function buscar($termino = "")
    {
        $sql = "SELECT * FROM productos
                WHERE codigo LIKE ? OR producto LIKE ?
                ORDER BY id DESC";

        $busqueda = "%" . trim($termino) . "%";

        // Ejecutar la consulta mediante la clase DB
        return $this->db->consultar($sql, [
            $busqueda,
            $busqueda
        ]);
    }

    // Eliminar un producto existente
    public function eliminar($id)
    {
        // Validar el ID recibido
        if (
            filter_var($id, FILTER_VALIDATE_INT) === false ||
            $id < 1
        ) {
            return [
                "success" => false,
                "message" => "El ID del producto no es válido.",
                "errors" => [
                    "id" => "Debes seleccionar un producto válido."
                ]
            ];
        }

        $sql = "DELETE FROM productos WHERE id = ?";

        // Ejecutar la eliminación mediante la clase DB
        $eliminados = $this->db->eliminarSeguro($sql, [$id]);

        if ($eliminados === 0) {
            return [
                "success" => false,
                "message" => "El producto no existe o ya fue eliminado.",
                "errors" => []
            ];
        }

        return [
            "success" => true,
            "message" => "Producto eliminado correctamente.",
            "errors" => []
        ];
    }
}

