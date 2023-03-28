var urlRest='https://telemedicina.jakemate.net:7141/api/webservice/metodo'
var codigoToken='NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z'
var codigoApikey='ISSTIXZTV53RZURJKTZD3MXVMEW7X3'
var nombreProducto=document.querySelector("#name"); 
var categoriaProducto=document.querySelector("#category");

/* $(document).ready(function(){
    listarDatos();
}) */

document.querySelector('#btnBuscar').addEventListener('click', listarDatos())

function listarDatos(){
    $.ajax({
        url: "urlRest",
        type: "POST",
        data: JSON.stringify({ nombreMetodo: "buscarProductosTienda", param1: nombreProducto, param2: categoriaProducto }),
        headers: {
            "Token":"codigoToken",
            "ApiKey":"codigoApikey"
            },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        
        success: function(response){
            console.log(response);
            
            var items = response.data;
            var datos='';

            for (let index = 0; index < items.length; index++) {
                datos+='<div class="card" style="width: 18rem;">'+
                '<img class="card-img-top" src="" alt="Card image cap">'+
                '<div class="card-body">'+
                  '<h5 class="card-title">'+items[index].NOMBRE +'</h5>'+
                  '<h5 class="card-title">'+items[index].PRECIO +'</h5>'+
                  '<p class="card-text">'+items[index].DESCRIPCION +'</p>'+
                  '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productoModal" onclick="detallesProducto('+ myItems[i].CODIGO+')">Detalles</button>'+
                '</div>'+
              '</div>`'

            }
            
            $('#listar').html(datos)

        },
        error: function (xhr, status, error) {
            console.error(error.data, "Error en la consulta");
          }
        }); 
}

function detallesProducto(idProducto) {
  $.ajax({
      url: urlRest+'/'+idProducto,
      type: 'GET',
      headers: {
          "Token":"codigoToken",
          "ApiKey":"codigoApikey"
          },
      datatype: 'JSON',
      success: function(response) {
          let myItem = response.items[0];
          let valor = '<strong>Imagen:</strong><br>'+
                      '<img src='+ myItem.IMAGEN+' alt=""> <br>'+
                      '<strong>Producto:</strong> '+ myItem.NOMBRE+' <br>'+
                      '<strong>Precio:</strong> '+ myItem.PRECIO+' <br>'+
                      '<strong>Categoria:</strong> '+ myItem.CATEGORIA_PROD_TIENDA+' <br>'+
          $('#detallesProducto').html(valor);
      }
  });
}


function ordenarPorMenorPrecio() {
  $.ajax({
    url: 'productos.json',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      
      data.sort(function(a, b) {
        return a.precio - b.precio;
      });
    
      for (let index = 0; index < items.length; index++) {
        data+='<div class="card" style="width: 18rem;">'+
        '<img class="card-img-top" src="" alt="Card image cap">'+
        '<div class="card-body">'+
          '<h5 class="card-title">'+items[index].NOMBRE +'</h5>'+
          '<h5 class="card-title">'+items[index].PRECIO +'</h5>'+
          '<p class="card-text">'+items[index].DESCRIPCION +'</p>'+
          '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productoModal" onclick="detallesProducto('+ myItems[i].CODIGO+')">Detalles</button>'+
        '</div>'+
      '</div>`'
      }
    },
    error: function (xhr, status, error) {
      console.error(error.data, "Error en la consulta");
    }
  }); 
}


function ordenarAlfabeticamente() {
  $.ajax({
    url: 'productos.json',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      data.sort(function(a, b) {
        if (a.nombre < b.nombre) {
          return -1;
        }
        if (a.nombre > b.nombre) {
          return 1;
        }
        return 0;
      });
     
      for (let index = 0; index < items.length; index++) {
        data+='<div class="card" style="width: 18rem;">'+
        '<img class="card-img-top" src="" alt="Card image cap">'+
        '<div class="card-body">'+
          '<h5 class="card-title">'+items[index].NOMBRE +'</h5>'+
          '<h5 class="card-title">'+items[index].PRECIO +'</h5>'+
          '<p class="card-text">'+items[index].DESCRIPCION +'</p>'+
          '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productoModal" onclick="detallesProducto('+ myItems[i].CODIGO+')">Detalles</button>'+
        '</div>'+
      '</div>`'
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ': ' + errorThrown);
    }
  });
}


