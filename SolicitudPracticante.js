$(document).ready(function() {
var NIT, opcion;

var fila; //captura la fila, para editar o eliminar
//submit para el Alta y Actualización
$('#formsolicitud').submit(function(e){   
    opcion = 1;                      
    e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
    NIT = $.trim($('#NIT').val());    
    NombreEmpresa = $.trim($('#NombreEmpresa').val());
    Ciudad = $.trim($('#Ciudad').val()); 
    Direccion = $.trim($('#Direccion').val());    
    Telefono  = $.trim($('#Telefono').val());
    EmailEmpresa = $.trim($('#EmailEmpresa').val());  
    ActividadEmpresa  = $.trim($('#ActividadEmpresa').val());    
    NombrePersonaContacto = $.trim($('#NombrePersonaContacto').val());
    Cargo = $.trim($('#Cargo').val());
    TelefonoPersonaContacto = $.trim($('#TelefonoPersonaContacto').val());    
    EmailPersonaContacto = $.trim($('#EmailPersonaContacto').val());
    Carrera  = $.trim($('#Carrera').val());
    TipoPracticante = $.trim($('#TipoPracticante').val());
    FuncionRealizar = $.trim($('#FuncionRealizar').val());    
    Remuneracion = $.trim($('#Remuneracion').val());    
    ValorRemuneracion = $.trim($('#ValorRemuneracion').val());
    Observaciones = $.trim($('#Observaciones').val());    



        $.ajax({
          url: "bd/crudsolicitud.php",
          type: "POST",
          datatype:"json",  
          data:  {NIT:NIT,
                 NombreEmpresa:NombreEmpresa,
                 Ciudad:Ciudad,
                 Direccion:Direccion,
                 Telefono:Telefono,
                 EmailEmpresa:EmailEmpresa,
                 ActividadEmpresa:ActividadEmpresa,
                 NombrePersonaContacto:NombrePersonaContacto,
                 Cargo:Cargo,
                 TelefonoPersonaContacto:TelefonoPersonaContacto,
                 EmailPersonaContacto:EmailPersonaContacto,

                 Carrera:Carrera,
                 TipoPracticante:TipoPracticante,
                 FuncionRealizar:FuncionRealizar,
                 Remuneracion:Remuneracion,
                 ValorRemuneracion:ValorRemuneracion,
                 Observaciones:Observaciones,


                 opcion:opcion},   
          success: function(data) {
              
            swal({
                
                title: "Registro Solicitud",
                text: "La Solicitud se guardo exitosamente ",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            });
                $('#formsolicitud')[0].reset();   
           }   
        });
       
        $("#btnLimpiar").click(function(event) {
            $("#formsolicitud")[0].reset();
       });

});
        
 

//Editar        
$(document).on("click", ".btnEditar", function(){		        
    opcion = 2;//editar
   
    fila = $(this).closest("tr");	        
    Identificacion = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
    Apellidos   = fila.find('td:eq(1)').text();
    Nombres   = fila.find('td:eq(2)').text();
    lugarnacimineto = fila.find('td:eq(3)').text();
    fechanacimiento  = fila.find('td:eq(4)').text();
    direccion = fila.find('td:eq(5)').text();
    correo = fila.find('td:eq(6)').text();
    celular = fila.find('td:eq(7)').text();
    $("#Apellidos").val(Apellidos);
    $("#Nombres").val(Nombres);
    $("#lugarnacimineto").val(lugarnacimineto);
    $("#fechanacimiento").val(fechanacimiento);
    $("#direccion ").val(direccion);
    $("#correo").val(correo);
    $("#celular").val(celular);
    $(".modal-header").css("background-color", "#009688");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Datos del Estudiante");		
    $('#modalCRUD').modal('show');	
    	   
});



//Borrar
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);           
    Identificacion = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
    opcion = 3; //eliminar        
    var respuesta = confirm("¿Está seguro de borrar el registro "+Identificacion+"?");                 
    if (respuesta) {            
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {opcion:opcion, Identificacion:Identificacion},    
          success: function() {
              tablaUsuarios.row(fila.parents('tr')).remove().draw();                  
           }
        });	
    }
 });
 opcion = 4;
 tablaUsuarios = $('#tablaUsuarios').DataTable({  
    language: {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }, 
    "ajax":{            
        "url": "bd/crud.php", 
        "method": 'POST', //usamos el metodo POST
        "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
        "dataSrc":""
    },
    "columns":[
        {"data": "Identificacion"},
        {"data": "Apellidos"},
        {"data": "Nombres"},
        {"data": "lugarnacimineto"},
        {"data": "fechanacimiento"},
        {"data": "direccion"},
        {"data": "correo"},
        {"data": "celular"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-warning btn-sm btnEditar'><i class='fa fa-pencil'></i></button></div></div>"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-danger btn-sm btnBorrar'><i class='fa fa-trash'></i></button></div></div>"},
                                                                            
        
    ]
});
});    

