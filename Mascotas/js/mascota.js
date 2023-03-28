let urlRest = 'https://ge0eef664d9e3ed-db202110041501.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cantante/cantante';
var codigoToken='NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z'
var codigoApikey='ISSTIXZTV53RZURJKTZD3MXVMEW7X3'

$(document).ready(function () {
    listarMascotas();
});


function listarMascotas() {
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
                    '<td >'+ myItems[i].COD_MASCOTA+'</td >'+
                    '<td>'+ myItems[i].NOMBRE+'</td>'+
                    '<td>'+ myItems[i].TIPO_MASCOTA+'</td>'+
                    '<td>'+ myItems[i].DUENO+'</td>'+
                    '<td>'+ myItems[i].ADOPTADO+'</td>'+
                    '<td>'+
                        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#adoptarModal" onclick="detallesMascota('+ myItems[i].COD_MASCOTA+')">Adoptar</button>'+
                        '<button class="btn btn-danger" onclick="quitarAdopcion('+ myItems[i].COD_MASCOTA+')">Eliminar Adopción</button>'+
                        '<button class="btn btn-danger" onclick="eliminarMascota('+ myItems[i].COD_MASCOTA+')">Borrar</button>'+
                    '</td>'+
                '</tr > ';
            }
            $('#tbodyMascota').html(valor);
        }
    });
}


function registrarMascota() {
    let datosFormulario = {
        id: $('#codigo').val(),
        nombre: $('#nombreMascota').val(),
        tipoMascota: $('#tipoMascota').val(),
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
            listarMascotas(); 
            limpiarFormulario();
        }
    });
}


function eliminarMascota(idMascota) {
    let datosFormulario = {
        id: idMascota
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
            listarMascotas();
        }
    });
}


function asignarAdopcion(codigoMascota, dueno){
    let datosFormulario = {
        id: $('#codigo').val(),
        dueno: $('#dueno').val(),
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
            listarMascotas(); 
            limpiarFormulario();
        }
    });
}

function detallesMascota(idMascota) {
    $.ajax({
        url: urlRest+'/'+idMascota,
        type: 'GET',
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        datatype: 'JSON',
        success: function(response) {
            let myItem = response.items[0];
            let valor = '<strong>Codigo:</strong> '+ myItem.COD_MASCOTA+' <br>'+
                        '<strong>Nombre:</strong> '+ myItem.NOMBRE+' <br>'+
                        '<strong>Tipo:</strong> '+ myItem.TIPO+' <br>'+
                        '<strong>Dueño:</strong> '+ myItem.DUENO+' <br>'+
                        '<button class="btn btn-warning" onclick="asignarAdopcion('+ myItem.COD_MASCOTA + myItem.DUENO+')">Asignar</button>';
            
            $('#detallesMascota').html(valor);
        }
    });
}


function quitarAdopcion(idMascota){
    let datosFormulario = {
        id: idMascota
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
            listarMascotas();
        }
    });
}

function limpiarFormulario() {
    $('#formularioMascota')[0].reset();
}