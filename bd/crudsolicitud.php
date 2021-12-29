<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$NIT  = (isset($_POST['NIT'])) ? $_POST['NIT'] : '';
$NombreEmpresa  = (isset($_POST['NombreEmpresa'])) ? $_POST['NombreEmpresa'] : '';
$Ciudad   = (isset($_POST['Ciudad'])) ? $_POST['Ciudad'] : '';
$Direccion = (isset($_POST['Direccion'])) ? $_POST['Direccion'] : '';
$Telefono  = (isset($_POST['Telefono'])) ? $_POST['Telefono'] : '';
$EmailEmpresa = (isset($_POST['EmailEmpresa'])) ? $_POST['EmailEmpresa'] : '';
$ActividadEmpresa  = (isset($_POST['ActividadEmpresa'])) ? $_POST['ActividadEmpresa'] : '';
$NombrePersonaContacto  = (isset($_POST['NombrePersonaContacto'])) ? $_POST['NombrePersonaContacto'] : '';
$Cargo  = (isset($_POST['Cargo'])) ? $_POST['Cargo'] : '';
$TelefonoPersonaContacto = (isset($_POST['TelefonoPersonaContacto'])) ? $_POST['TelefonoPersonaContacto'] : '';
$EmailPersonaContacto = (isset($_POST['EmailPersonaContacto'])) ? $_POST['EmailPersonaContacto'] : '';
$Carrera  = (isset($_POST['Carrera'])) ? $_POST['Carrera'] : '';
$TipoPracticante  = (isset($_POST['TipoPracticante'])) ? $_POST['TipoPracticante'] : '';
$FuncionRealizar  = (isset($_POST['FuncionRealizar'])) ? $_POST['FuncionRealizar'] : '';
$Remuneracion  = (isset($_POST['Remuneracion'])) ? $_POST['Remuneracion'] : '';
$ValorRemuneracion  = (isset($_POST['ValorRemuneracion'])) ? $_POST['ValorRemuneracion'] : '';
$Observaciones  = (isset($_POST['Observaciones'])) ? $_POST['Observaciones'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO solicitudpracticante (NIT,
                                             NombreEmpresa,
                                             Ciudad,
                                             Direccion,
                                             Telefono,
                                             EmailEmpresa,
                                             ActividadEmpresa,
                                             NombrePersonaContacto,
                                             Cargo,
                                             TelefonoPersonaContacto,
                                             EmailPersonaContacto,
                                             Carrera,
                                             TipoPracticante,
                                             FuncionRealizar,
                                             Remuneracion,
                                             ValorRemuneracion,
                                             Observaciones
                                             ) VALUES('$NIT',
                                                      '$NombreEmpresa',
                                                      '$Ciudad', 
                                                      '$Direccion',
                                                      '$Telefono',
                                                      '$EmailEmpresa', 
                                                      '$ActividadEmpresa',
                                                      '$NombrePersonaContacto',
                                                      '$Cargo', 
                                                      '$TelefonoPersonaContacto',
                                                      '$EmailPersonaContacto',
                                                      '$Carrera', 
                                                      '$TipoPracticante',
                                                      '$FuncionRealizar',
                                                      '$Remuneracion',
                                                      '$ValorRemuneracion',
                                                      '$Observaciones')";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM solicitudpracticante";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE estudiante SET  Apellidos ='$Apellidos ', 
                                            Nombres  ='$Nombres',
                                            lugarnacimineto  ='$lugarnacimineto',
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
        $consulta = "DELETE FROM Estudiante WHERE Identificacion='$Identificacion' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM Estudiante";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;