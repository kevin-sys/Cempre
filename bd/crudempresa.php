<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$NIT  = (isset($_POST['NIT'])) ? $_POST['NIT'] : '';
$NombreEmpresa  = (isset($_POST['NombreEmpresa'])) ? $_POST['NombreEmpresa'] : '';
$Direccion  = (isset($_POST['Direccion'])) ? $_POST['Direccion'] : '';
$Pais  = (isset($_POST['Pais'])) ? $_POST['Pais'] : '';
$Departamento  = (isset($_POST['Departamento'])) ? $_POST['Departamento'] : '';
$Ciudad  = (isset($_POST['Ciudad'])) ? $_POST['Ciudad'] : '';
$RazonSocial  = (isset($_POST['RazonSocial'])) ? $_POST['RazonSocial'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO empresa    (NIT,
                                             NombreEmpresa,
                                             Direccion,
                                             Pais,
                                             Departamento,
                                             Ciudad,
                                             RazonSocial
                                             ) VALUES('$NIT',
                                                      '$NombreEmpresa', 
                                                      '$Direccion',
                                                      '$Pais',
                                                      '$Departamento', 
                                                      '$Ciudad',
                                                      '$RazonSocial')";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM empresa";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE empresa SET  NombreEmpresa ='$NombreEmpresa ', 
                                            Nombres  ='$Nombres',
                                            Direccion  ='$Direccion',
                                            Pais  ='$Pais',
                                            Departamento  ='$Departamento',
                                            Ciudad  ='$Ciudad',
                                            RazonSocial  ='$RazonSocial' WHERE NIT='$NIT' ";		

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM empresa WHERE NIT='$NIT' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM empresa WHERE NIT='$NIT' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM empresa";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;