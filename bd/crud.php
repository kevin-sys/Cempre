<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$Identificacion  = (isset($_POST['Identificacion'])) ? $_POST['Identificacion'] : '';
$Apellidos  = (isset($_POST['Apellidos'])) ? $_POST['Apellidos'] : '';
$Nombres   = (isset($_POST['Nombres'])) ? $_POST['Nombres'] : '';
$lugarnacimiento = (isset($_POST['lugarnacimiento'])) ? $_POST['lugarnacimiento'] : '';
$fechanacimiento  = (isset($_POST['fechanacimiento'])) ? $_POST['fechanacimiento'] : '';
$genero = (isset($_POST['genero'])) ? $_POST['genero'] : '';
$direccion  = (isset($_POST['direccion'])) ? $_POST['direccion'] : '';
$ciudad  = (isset($_POST['ciudad'])) ? $_POST['ciudad'] : '';
$correo  = (isset($_POST['correo'])) ? $_POST['correo'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$celular = (isset($_POST['celular'])) ? $_POST['celular'] : '';
$nacionalidad  = (isset($_POST['nacionalidad'])) ? $_POST['nacionalidad'] : '';
$estadocivil  = (isset($_POST['estadocivil'])) ? $_POST['estadocivil'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO estudiante (Identificacion,
                                             Apellidos,
                                             Nombres,
                                             lugarnacimiento,
                                             fechanacimiento,
                                             genero,
                                             direccion,
                                             ciudad,
                                             correo,
                                             telefono,
                                             celular,
                                             nacionalidad,
                                             estadocivil
                                             ) VALUES('$Identificacion',
                                                      '$Apellidos', 
                                                      '$Nombres',
                                                      '$lugarnacimiento',
                                                      '$fechanacimiento', 
                                                      '$genero',
                                                      '$direccion',
                                                      '$ciudad', 
                                                      '$correo',
                                                      '$telefono',
                                                      '$celular', 
                                                      '$nacionalidad',
                                                      '$estadocivil')";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM estudiante";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE estudiante SET  Apellidos ='$Apellidos ', 
                                            Nombres  ='$Nombres',
                                            lugarnacimiento  ='$lugarnacimiento',
                                            fechanacimiento  ='$fechanacimiento',
                                            direccion  ='$direccion',
                                            correo  ='$correo',
                                            celular  ='$celular' WHERE Identificacion='$Identificacion' ";		

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM estudiante WHERE Identificacion='$Identificacion' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM estudiante WHERE Identificacion='$Identificacion' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM estudiante";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;