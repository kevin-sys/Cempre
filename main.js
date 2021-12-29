$(document).ready(function() {
var Identificacion, opcion;

var fila; //captura la fila, para editar o eliminar
//submit para el Alta y Actualización
$('#formEstudiante').submit(function(e){   
    opcion = 1;                      
    e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
    Identificacion = $.trim($('#Identificacion').val());    
    Apellidos = $.trim($('#Apellidos').val());
    Nombres = $.trim($('#Nombres').val()); 
    lugarnacimiento = $.trim($('#lugarnacimiento').val());    
    fechanacimiento  = $.trim($('#fechanacimiento').val());
    genero = $.trim($('#genero').val());  
    direccion  = $.trim($('#direccion').val());    
    ciudad = $.trim($('#ciudad').val());
    correo = $.trim($('#correo').val());
    telefono = $.trim($('#telefono').val());    
    celular = $.trim($('#celular').val());
    nacionalidad  = $.trim($('#nacionalidad').val());
    estadocivil = $.trim($('#estadocivil').val());    

        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",  
          data:  {Identificacion:Identificacion,
                 Apellidos:Apellidos,
                 Nombres:Nombres,
                 lugarnacimiento:lugarnacimiento,
                 fechanacimiento:fechanacimiento,
                 genero:genero,
                 direccion:direccion,
                 ciudad:ciudad,
                 correo:correo,
                 telefono:telefono,
                 celular:celular,
                 nacionalidad:nacionalidad,
                 estadocivil:estadocivil,
                 opcion:opcion},   
          success: function(data) {
              
            swal({
                
                title: "Registro Estudiante",
                text: "Su información se guardó correctamente ",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            });
                $('#formEstudiante')[0].reset();   
           }   
        });
       
        $("#btnLimpiar").click(function(event) {
            $("#formEstudiante")[0].reset();
       });

});
        
 

//Editar        
$(document).on("click", ".btnEditar", function(){		        
    opcion = 2;//editar
   
    fila = $(this).closest("tr");	        
    Identificacion = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
    Apellidos   = fila.find('td:eq(1)').text();
    Nombres   = fila.find('td:eq(2)').text();
    lugarnacimiento = fila.find('td:eq(3)').text();
    fechanacimiento  = fila.find('td:eq(4)').text();
    direccion = fila.find('td:eq(5)').text();
    correo = fila.find('td:eq(6)').text();
    celular = fila.find('td:eq(7)').text();
    $("#Apellidos").val(Apellidos);
    $("#Nombres").val(Nombres);
    $("#lugarnacimiento").val(lugarnacimiento);
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
        {"data": "lugarnacimiento"},
        {"data": "fechanacimiento"},
        {"data": "direccion"},
        {"data": "correo"},
        {"data": "celular"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-warning btn-sm btnEditar'><i class='fa fa-pencil'></i></button></div></div>"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-danger btn-sm btnBorrar'><i class='fa fa-trash'></i></button></div></div>"},
                                                                            
        
    ]
});
});    

