<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$Usuario  = (isset($_POST['Usuario'])) ? $_POST['Usuario'] : '';
$Contraseña  = (isset($_POST['Contraseña'])) ? $_POST['Contraseña'] : '';
$Identificacion  = (isset($_POST['Identificacion'])) ? $_POST['Identificacion'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO usuario    (Usuario,
                                             Contraseña,
                                             Identificacion
                                             ) VALUES('$Usuario',
                                                      '$Contraseña', 
                                                      '$Identificacion')";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM usuario";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE usuario SET  Usuario ='$Usuario ', 
                                            Contraseña  ='$Contraseña' WHERE Identificacion='$Identificacion' ";		

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM usuario WHERE Identificacion='$Identificacion' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM usuario WHERE Identificacion='$Identificacion' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM usuario";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;