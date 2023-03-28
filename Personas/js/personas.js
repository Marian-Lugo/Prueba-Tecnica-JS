let urlRest = 'https://ge0eef664d9e3ed-db202110041501.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cantante/cantante';
var codigoToken='NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z'
var codigoApikey='ISSTIXZTV53RZURJKTZD3MXVMEW7X3'

$(document).ready(function () {
    listarPersonas();
});


function listarPersonas() {
    $.ajax({
        url: "urlRest",
        type: "GET",
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            let myItems = response.items;
            let valor = '';
            for (i = 0; i < myItems.length; i++) {
                valor += '<tr>'+
                    '<td >'+ myItems[i].COD_PERSONA+'</td >'+
                    '<td>'+ myItems[i].NOMBRE+'</td>'+
                    '<td>'+ myItems[i].APELLIDO+'</td>'+
                    '<td>'+ myItems[i].NRO_DOCUMENTO+'</td>'+
                    '<td>'+
                        '<button class="btn btn-danger" onclick="eliminarPersona('+ myItems[i].COD_PERSONA+')">Borrar</button>'+
                        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detalleModal" onclick="detallesPersona('+ myItems[i].COD_PERSONA+')">Detalles</button>'+
                    '</td>'+
                '</tr > ';
            }
            $('#tbodyPersona').html(valor);
        }
    });
}

function registrarPersona() {
    let datosFormulario = {
        id: $('#codigo').val(),
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        nroDocumento: $('#nroDocumento').val(),
    };

    let datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'POST',
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            /* listarPersonas(); */
            limpiarFormulario();
        }
    });
}

function eliminarPersona(idPersona) {
    let datosFormulario = {
        id: idPersona
    };

    let datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'DELETE',
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            listarPersonas();
        }
    });
}


function cargarFormulario(idPersona) {
    $.ajax({
        url: urlRest+'/'+idPersona,
        type: 'GET',
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        datatype: 'JSON',
        success: function(response) {
            var myItem = response.items[0];
            $('#codigo').val(myItem.COD_PERSONA);
            $('#nombre').val(myItem.NOMBRE);
            $('#apellido').val(myItem.APELLIDO);
            $('#nroDocumento').val(myItem.NRO_DOCUMENTO);


            var valor = '<input id="btnActualizar" type="submit" onclick="actualizarPersona('+myItem.id+')" value="Actualizar" class="btn btn-warning">';          
            $('#btnFormulario').html(valor);

            $('#codigo').prop('disabled', true);
 
        }
    });
}

function detallesPersona(idPersona) {
    $.ajax({
        url: urlRest+'/'+idPersona,
        type: 'GET',
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        datatype: 'JSON',
        success: function(response) {
            let myItem = response.items[0];
            let valor = '<strong>Codigo:</strong> '+ myItem.COD_PERSONA+' <br>'+
                        '<strong>Nombre:</strong> '+ myItem.NOMBRE+' <br>'+
                        '<strong>Apellido:</strong> '+ myItem.APELLIDO+' <br>'+
                        '<strong>Nro. Documento:</strong> '+ myItem.NRO_DOCUMENTO+' <br>'+
                        '<button class="btn btn-warning" onclick="cargarFormulario('+ myItem.COD_PERSONA+')">Editar</button>';
            
            $('#detallesPersona').html(valor);
            $('#detallesPersona').show();
        }
    });
}

function actualizarPersona(idPersona) {
    let datosFormulario = {
        id: idPersona,
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        nroDocumento: $('#nroDocumento').val(),
    };

    let datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'PUT',
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            listarPersonas();
            limpiarFormulario();
        }
    });
    let valor = '<input id="btnCrear" type="submit" onclick="registrarPersona()" value="Crear" class="btn btn-primary"> ';          
    $('#btnFormulario').html(valor);
    $('#codigo').prop('disabled', false);
    $('#detallesPersona').hide();
}

function limpiarFormulario() {
    $('#formularioPersona')[0].reset();
}