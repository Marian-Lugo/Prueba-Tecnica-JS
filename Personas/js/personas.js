$(document).ready(function () {
  listarPersonas();
});

function listarPersonas() {
  $.ajax({
    url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
    data: { _nombreMetodo_: "listarPersonas" },
    method: "POST",
    headers: {
      Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (resultado) {
      console.log("Estos son mis datos", resultado);
      let myItems = resultado.resultado.Table;
      let valor = "";
      for (i = 0; i < myItems.length; i++) {
        valor +=
          "<tr>" +
          "<td >" +
          myItems[i].COD_PERSONA +
          "</td >" +
          "<td>" +
          myItems[i].NOMBRE +
          "</td>" +
          "<td>" +
          myItems[i].APELLIDO +
          "</td>" +
          "<td>" +
          myItems[i].NRO_DOCUMENTO +
          "</td>" +
          "<td>" +
          '<button class="btn btn-danger" onclick="eliminarPersona(' +
          myItems[i].COD_PERSONA +
          ')">Borrar</button>' +
          '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detalleModal" onclick="detallesPersona(' +
          myItems[i].COD_PERSONA +
          ')">Detalles</button>' +
          "</td>" +
          "</tr > ";
      }
      $("#tbodyPersona").html(valor);
    },
  });
}

function registrarPersona() {
  let nombre= $("#nombre").val();
  let apellido= $("#apellido").val();
  let nroDocumento= $("#nroDocumento").val();

  console.log("DATOS A AGREGAR", nombre, apellido, nroDocumento);

  $.ajax({
    url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
    data: {  _nombreMetodo_: "agregarPersona", NOMBRE: nombre, APELLIDO: apellido, NRO_DOCUMENTO: nroDocumento},
    method: "POST",
    headers: {
      Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (resultado) {
      console.log(resultado);
      listarPersonas(); 
      limpiarFormulario();
    },
  });
}

function eliminarPersona(idPersona) {
  let id = idPersona;
  console.log("ID a eliminar", id);

  $.ajax({
    url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
    data: { _nombreMetodo_: "eliminarPersona", COD_PERSONA: id },
    method: "POST",
    headers: {
      Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (resultado) {
      console.log("Eliminar", resultado);
      listarPersonas();
    },
  });
}

function cargarFormulario(idPersona) {
  $.ajax({
    url: urlRest + "/" + idPersona,
    type: "GET",
    headers: {
      Token: "codigoToken",
      ApiKey: "codigoApikey",
    },
    datatype: "JSON",
    success: function (response) {
      var myItem = response.items[0];
      $("#codigo").val(myItem.COD_PERSONA);
      $("#nombre").val(myItem.NOMBRE);
      $("#apellido").val(myItem.APELLIDO);
      $("#nroDocumento").val(myItem.NRO_DOCUMENTO);

      var valor =
        '<input id="btnActualizar" type="submit" onclick="actualizarPersona(' +
        myItem.id +
        ')" value="Actualizar" class="btn btn-warning">';
      $("#btnFormulario").html(valor);

      $("#codigo").prop("disabled", true);
    },
  });
}

function detallesPersona(idPersona) {
  $.ajax({
    url: urlRest + "/" + idPersona,
    type: "GET",
    headers: {
      Token: "codigoToken",
      ApiKey: "codigoApikey",
    },
    datatype: "JSON",
    success: function (response) {
      let myItem = response.items[0];
      let valor =
        "<strong>Codigo:</strong> " +
        myItem.COD_PERSONA +
        " <br>" +
        "<strong>Nombre:</strong> " +
        myItem.NOMBRE +
        " <br>" +
        "<strong>Apellido:</strong> " +
        myItem.APELLIDO +
        " <br>" +
        "<strong>Nro. Documento:</strong> " +
        myItem.NRO_DOCUMENTO +
        " <br>" +
        '<button class="btn btn-warning" onclick="cargarFormulario(' +
        myItem.COD_PERSONA +
        ')">Editar</button>';

      $("#detallesPersona").html(valor);
      $("#detallesPersona").show();
    },
  });
}

function actualizarPersona(idPersona) {
  let datosFormulario = {
    id: idPersona,
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    nroDocumento: $("#nroDocumento").val(),
  };

  let datosFormularioJson = JSON.stringify(datosFormulario);

  $.ajax({
    url: urlRest,
    type: "PUT",
    headers: {
      Token: "codigoToken",
      ApiKey: "codigoApikey",
    },
    data: datosFormularioJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      console.log(response);
      listarPersonas();
      limpiarFormulario();
    },
  });
  let valor =
    '<input id="btnCrear" type="submit" onclick="registrarPersona()" value="Crear" class="btn btn-primary"> ';
  $("#btnFormulario").html(valor);
  $("#codigo").prop("disabled", false);
  $("#detallesPersona").hide();
}

function limpiarFormulario() {
  $("#formularioPersona")[0].reset();
}
