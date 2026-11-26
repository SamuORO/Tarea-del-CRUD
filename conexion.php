<?php

class DB
{
    private $host = "localhost";
    private $dbname = "productosdb";
    private $usuario = "root";
    private $password = "";

    private $conexion;

    public function __construct()
    {
        try {
            $this->conexion = new PDO(
                "mysql:host=$this->host;dbname=$this->dbname;charset=utf8mb4",
                $this->usuario,
                $this->password
            );

            $this->conexion->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );

        } catch (PDOException $e) {
            throw new Exception("Error al conectar con la base de datos.");
        }
    }

    // Obtener la conexión PDO
    public function getConexion()
    {
        return $this->conexion;
    }

    // Ejecutar una consulta INSERT de forma segura
    public function insertarSeguro($sql, $datos)
    {
        $consulta = $this->conexion->prepare($sql);
        return $consulta->execute($datos);
    }

    // Ejecutar una consulta UPDATE de forma segura
    public function actualizarSeguro($sql, $datos)
    {
        $consulta = $this->conexion->prepare($sql);
        return $consulta->execute($datos);
    }

    // Ejecutar una consulta SELECT y devolver los resultados
    public function consultar($sql, $datos = [])
    {
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute($datos);

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    // Eliminar un registro de forma segura
    public function eliminarSeguro($sql, $datos)
    {
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute($datos);

        return $consulta->rowCount();
    }
}
