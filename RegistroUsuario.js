$(document).ready(function() {
var Usuario, opcion;

var fila; 
$('#formUsuario').submit(function(e){   
    opcion = 1;                      
    e.preventDefault(); 
    Usuario = $.trim($('#Usuario').val());
    Contraseña = $.trim($('#Contraseña').val());    
    Identificacion = $.trim($('#Identificacion').val());    
    
        $.ajax({
          url: "bd/crudusuario.php",
          type: "POST",
          datatype:"json",  
          data:  {Usuario:Usuario,
                 Contraseña:Contraseña,
                 Identificacion:Identificacion,
                 opcion:opcion},   
          success: function(data) {
              
            swal({
                
                title: "Registro Usuario",
                text: "El Usuario se guardó correctamente ",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            });
                $('#formUsuario')[0].reset();   
           }   
        });
       
        $("#btnLimpiar").click(function(event) {
            $("#formUsuario")[0].reset();
       });

});
        
 

//Editar        
$(document).on("click", ".btnEditar", function(){		        
    opcion = 2;//editar
   
    fila = $(this).closest("tr");	        
    Usuario = fila.find('td:eq(0)').text(); 		            
    Contraseña   = fila.find('td:eq(1)').text();
    Identificacion   = fila.find('td:eq(2)').text();
    $("#Usuario").val(Usuario);
    $("#Contraseña").val(Contraseña);
    $("#Identificacion").val(Identificacion);
    $(".modal-header").css("background-color", "#009688");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Datos del Usuario");		
    $('#modalCRUD').modal('show');	
    	   
});



//Borrar
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);           
    Usuario = $(this).closest('tr').find('td:eq(0)').text() ;		
    opcion = 3;         
    var respuesta = confirm("¿Está seguro de borrar el registro "+Usuario+"?");                 
    if (respuesta) {            
        $.ajax({
          url: "bd/crudusuario.php",
          type: "POST",
          datatype:"json",    
          data:  {opcion:opcion, Usuario:Usuario},    
          success: function() {
              tablausuario.row(fila.parents('tr')).remove().draw();                  
           }
        });	
    }
 });
 opcion = 4;
 tablausuario = $('#tablausuario').DataTable({  
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
        "url": "bd/crudusuario.php", 
        "method": 'POST',
        "data":{opcion:opcion}, 
        "dataSrc":""
    },
    "columns":[
        {"data": "Usuario"},
        {"data": "Contraseña"},
        {"data": "Identificacion"},
        {"data": "Pais"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-warning btn-sm btnEditar'><i class='fa fa-pencil'></i></button></div></div>"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-danger btn-sm btnBorrar'><i class='fa fa-trash'></i></button></div></div>"},
                                                                            
        
    ]
});
});    

