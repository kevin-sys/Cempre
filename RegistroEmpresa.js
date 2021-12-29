$(document).ready(function() {
var NIT, opcion;

var fila; //captura la fila, para editar o eliminar
//submit para el Alta y Actualización
$('#formEmpresa').submit(function(e){   
    opcion = 1;                      
    e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
    NIT = $.trim($('#NIT').val());
    NombreEmpresa = $.trim($('#NombreEmpresa').val());    
    Direccion = $.trim($('#Direccion').val());    
    Pais = $.trim($('#Pais').val());    
    Departamento = $.trim($('#Departamento').val());    
    Ciudad = $.trim($('#Ciudad').val());    
    RazonSocial = $.trim($('#RazonSocial').val());    

  
        $.ajax({
          url: "bd/crudempresa.php",
          type: "POST",
          datatype:"json",  
          data:  {NIT:NIT,
                 NombreEmpresa:NombreEmpresa,
                 Direccion:Direccion,
                 Pais:Pais,
                 Departamento:Departamento,
                 Ciudad:Ciudad,
                 RazonSocial:RazonSocial,
                 opcion:opcion},   
          success: function(data) {
              
            swal({
                
                title: "Registro Empresa",
                text: "la empresa se guardó correctamente ",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            });
                $('#formEmpresa')[0].reset();   
           }   
        });
       
        $("#btnLimpiar").click(function(event) {
            $("#formEmpresa")[0].reset();
       });

});
        
 

//Editar        
$(document).on("click", ".btnEditar", function(){		        
    opcion = 2;//editar
   
    fila = $(this).closest("tr");	        
    NIT = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
    NombreEmpresa   = fila.find('td:eq(1)').text();
    Direccion   = fila.find('td:eq(2)').text();
    Pais = fila.find('td:eq(3)').text();
    Departamento  = fila.find('td:eq(4)').text();
    Ciudad = fila.find('td:eq(6)').text();
    RazonSocial = fila.find('td:eq(7)').text();
    $("#NIT").val(NIT);
    $("#NombreEmpresa").val(NombreEmpresa);
    $("#Direccion").val(Direccion);
    $("#Pais").val(Pais);
    $("#Departamento ").val(Departamento);
    $("#Ciudad").val(Ciudad);
    $("#RazonSocial").val(RazonSocial);
    $(".modal-header").css("background-color", "#009688");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Datos de la empresa");		
    $('#modalCRUD').modal('show');	
    	   
});



//Borrar
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);           
    NIT = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
    opcion = 3; //eliminar        
    var respuesta = confirm("¿Está seguro de borrar el registro "+NIT+"?");                 
    if (respuesta) {            
        $.ajax({
          url: "bd/crudempresa.php",
          type: "POST",
          datatype:"json",    
          data:  {opcion:opcion, NIT:NIT},    
          success: function() {
              tablaempresa.row(fila.parents('tr')).remove().draw();                  
           }
        });	
    }
 });
 opcion = 4;
 tablaempresa = $('#tablaempresa').DataTable({  
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
        "url": "bd/crudempresa.php", 
        "method": 'POST', //usamos el metodo POST
        "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
        "dataSrc":""
    },
    "columns":[
        {"data": "NIT"},
        {"data": "NombreEmpresa"},
        {"data": "Direccion"},
        {"data": "Pais"},
        {"data": "Departamento"},
        {"data": "Ciudad"},
        {"data": "RazonSocial"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-warning btn-sm btnEditar'><i class='fa fa-pencil'></i></button></div></div>"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-danger btn-sm btnBorrar'><i class='fa fa-trash'></i></button></div></div>"},
                                                                            
        
    ]
});
});    

