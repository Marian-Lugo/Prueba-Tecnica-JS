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
          '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detalleModal" onclick="cargarFormulario(' +
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

  if (!nombre || !apellido || !nroDocumento) {
    alert('Por favor complete todos los campos');
    limpiarFormulario();
    return;
  }

  if (nombre.length > 50) {
    alert('El nombre supera la cantidad de caracteres');
    limpiarFormulario();
    return;
  }

  if (apellido.length > 50) {
    alert('El apellido supera la cantidad de caracteres');
    limpiarFormulario();
    return;
  }

  if (nroDocumento.length > 50) {
    alert('El numero de documento supera la cantidad de caracteres');
    limpiarFormulario();
    return;
  }

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
  let id=idPersona;
    $.ajax({
        url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
        data: { _nombreMetodo_: "listarPersonas" },
        method: "POST",
        headers: {
          Token: "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
          ApiKey: "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
        },
        success: function (resultado) {
            let myItems = resultado.resultado.Table;
            let nombre = "";
            let apellido="";
            let nroDocumento=0;
            let valor="";
            for (i = 0; i < myItems.length; i++) {
                if (myItems[i].COD_PERSONA === id) {
                    nombre=myItems[i].NOMBRE;
                    apellido=myItems[i].APELLIDO;
                    nroDocumento=myItems[i].NRO_DOCUMENTO;
                }
            }
            valor +=`<form id="formularioPersona">
            <div class="form-group">
              <label for="formGroupExampleInput2">Nombre</label>
              <input id="nombreEditado" type="text" class="form-control" id="formGroupExampleInput2" value="${nombre}" required>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Apellido</label>
              <input id="apellidoEditado" type="text" class="form-control" id="formGroupExampleInput2" value="${apellido}" required>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Nro. Documento</label>
              <input id="nroDocumentoEditado" type="text" class="form-control" id="formGroupExampleInput2" value="${nroDocumento}" required>
            </div>
            <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onclick="actualizarPersona(${id})"
              >
                Aceptar
              </button>
        </form>`;

        $("#detallesPersona").html(valor);

        },
      });
  
}



function actualizarPersona(id) {
  let nombre= $("#nombreEditado").val();
  let apellido= $("#apellidoEditado").val();
  let nroDocumento= $("#nroDocumentoEditado").val();

  if (!nombre || !apellido || !nroDocumento) {
    alert('Todos los campos son requeridos');
    limpiarFormulario();
    return;
  }

  if (nombre.length > 50) {
    alert('El nombre supera la cantidad de caracteres');
    limpiarFormulario();
    return;
  }

  if (apellido.length > 50) {
    alert('El apellido supera la cantidad de caracteres');
    limpiarFormulario();
    return;
  }

  if (nroDocumento.length > 50) {
    alert('El numero de documento supera la cantidad de caracteres');
    limpiarFormulario();
    return;
  }

  console.log("DATOS A EDITAR", nombre, apellido, nroDocumento);

  $.ajax({
    url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
    data: {  _nombreMetodo_: "editarPersona", COD_PERSONA: id, NOMBRE: nombre, APELLIDO: apellido, NRO_DOCUMENTO: nroDocumento},
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

function limpiarFormulario() {
  $("#formularioPersona")[0].reset();
}
