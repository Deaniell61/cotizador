$(document).ready(function () {
  $('.modal').modal()
  $('#nuevoProd').click(function () {
    buscarProductos(this)
  })
  $('#imprimir').click(function () {
    imprimirCotizacion()
  })
  $('#descuento').keyup(function () {
    calculaDescuento(this)
  })
  $('#descuento').change(function () {
    calculaDescuento(this)
  })
  $('#limpiar').click(function () {
    limpiar()
  })
  comboPrecio('')
})
var total = 0
var tablaProds = $('#tablaProds').DataTable({
  'order': [[ 0, 'desc' ]],
  info: false,
  language: {
    search: 'Buscar',
    sLengthMenu: ' _MENU_ ',
    paginate: {
      previous: 'Anterior',
      next: 'Siguiente'
    }
  }
  
})
var httpRequest = null

function RemoveRow (index, costo) {
  total = parseFloat(total + '') - parseFloat(costo + '')
  var parent = document.getElementById(index).parentNode
  parent.removeChild(document.getElementById(index))
  if (total < 0) {
    total = 0
  }
  $('#totalCosto').html('<center>' + currency(total + '') + '</center>')
  calculaDescuento(document.getElementById('descuento'))
}

function buscarProductos (val) {
  var url = 'base/producto.xml'
  if (!httpRequest) {
    httpRequest = CreateHTTPRequestObject ()   // defined in ajax.js
  }
  if (httpRequest) {
    httpRequest.open ('GET', url, true)    // async
    httpRequest.onreadystatechange = OnProductoChange
    httpRequest.send ()
  }
}

function llenarProductos () {
  var xmlDoc = ParseHTTPResponse (httpRequest)   // defined in ajax.js
  var tempResult = ''
  if (xmlDoc != null) {
    tablaProds.clear().draw(false)
    var Product_List = xmlDoc.getElementsByTagName('Producto-List')
    for (var j = 0; j < Product_List.length; j++) {
      var Producto = Product_List[j].getElementsByTagName('Producto')
      for (var i = 0; i < Producto.length; i++) {
        var Codigo = Producto[i].getElementsByTagName('Codigo')[0].childNodes[0].nodeValue
        var Catalogo = Producto[i].getElementsByTagName('Catalogo')[0].childNodes[0]?Producto[i].getElementsByTagName('Catalogo')[0].childNodes[0].nodeValue:''
        var Descripcion = Producto[i].getElementsByTagName('Descripcion')[0].childNodes[0].nodeValue
        var Unidad = Producto[i].getElementsByTagName('Unimed')[0].childNodes[0].nodeValue
        var Costo = ((parseFloat(Producto[i].getElementsByTagName('Costo')[0].childNodes[0].nodeValue))*(1+parseFloat($('#Precio').val())))+''
        tablaProds.row.add([
          '<center>' + Codigo + '</center>',
          '<center>' + Catalogo + '</center>',
          Descripcion,
          '<center>' + Unidad + '</center>',
          '<center>' + currency('' + Costo) + '</center>',
          "<center><a style='width: 10%;' title='Seleccionar' class='waves-effect waves-light btn modal-close  green lighten-1 modal-trigger ' onClick=\"seleccionarProducto('" + Codigo + "')\"><i class='material-icons left'><img class='iconoeditcrud' src='img/ico/seleccion.png' /></i></a></center>"
        ]).draw(false)
      }
    }
  } else {
    console.log('no entro')
  }
}

function limpiar()
{
  $("#productosCotizar tbody").empty()
  $("#nombre").val('')
  $("#direccion").val('')
  $("#nit").val('')
  $("#telefono").val('')
  $("#descuento").val('0')
  $("#descuentoReal").html('Q0.00')
  $("#totalSub").html('Q0.00')
  $("#totalCosto").html('<center>Q0.00</center>')
}

function seleccionarProducto (val) {
  var url = 'base/producto.xml'
  if (!httpRequest) {
    httpRequest = CreateHTTPRequestObject ()   // defined in ajax.js
  }
  if (httpRequest) {
    httpRequest.open ('GET', url, true)
    httpRequest.send (null)
    httpRequest.onreadystatechange = function () { OnSelProductoChange(val) }
  }
}

function buscaProductoSel (val) {
  var xmlDoc = ParseHTTPResponse (httpRequest)   // defined in ajax.js
  var tempResult = ''
  if (xmlDoc != null) {
    var Product_List = xmlDoc.getElementsByTagName('Producto-List')
    for (var j = 0; j < Product_List.length; j++) {
      var Producto = Product_List[j].getElementsByTagName('Producto')
      for (var i = 0; i < Producto.length; i++) {
        var Codigo = Producto[i].getElementsByTagName('Codigo')[0].childNodes[0].nodeValue
        if (Codigo == val) {
          var Catalogo = Producto[i].getElementsByTagName('Catalogo')[0].childNodes[0]?Producto[i].getElementsByTagName('Catalogo')[0].childNodes[0].nodeValue:''
          var Descripcion = Producto[i].getElementsByTagName('Descripcion')[0].childNodes[0].nodeValue
          var Unidad = Producto[i].getElementsByTagName('Unimed')[0].childNodes[0].nodeValue
          var Costo = ((parseFloat(Producto[i].getElementsByTagName('Costo')[0].childNodes[0].nodeValue))*(1+parseFloat($('#Precio').val()))) + ''
          var table = document.getElementById("productosCotizar")
          var num = table.rows.length
          var row = table.insertRow(num)
          row.setAttribute("id", "row" + num)
          var cell1 = row.insertCell(0)
          var cell2 = row.insertCell(1)
          var cell3 = row.insertCell(2)
          var cell4 = row.insertCell(3)
          var cell5 = row.insertCell(4)
          var cell6 = row.insertCell(5)
          var cell7 = row.insertCell(6)
          var cell8 = row.insertCell(7)
          cell1.innerHTML = '<center>' + Codigo + '</center>'
          cell2.innerHTML = '<center>' + Catalogo + '</center>'
          cell3.innerHTML = '' + Descripcion + ''
          cell4.innerHTML = '<center>' + Unidad + '</center>'
          cell5.innerHTML = '<center><div class="input-field">'+
                              '<input id="cantidad' + num + '" type="number" class="validate" value="1" min="0" style="text-align:center">'+
                            '</div></center>'
          cell6.innerHTML = '<center><div id="costo' + num + '">' + currency(Costo) + '</div></center>'
          cell7.innerHTML = '<center><div id="total' + num + '" style="padding-left: 15px;padding-right: 15px;">' + currency(Costo) + '</div></center>'
          cell8.innerHTML = "<a style='width: 40%;' title='Eliminar' class='waves-effect waves-light btn red lighten-1 modal-trigger ' onClick=\"RemoveRow('row" + num + "','" + Costo + "');\"><i class='material-icons left'><img style='margin-left: -13px;' class='iconoeditcrud' src='img/ico/boton-borrar.png' /></i></a>"
          if($('#totalCosto').html() != ''){
              total = $('#totalCosto').html().replace('Q', '').replace(',', '').replace('<center>', '').replace('</center>', '')
              total = parseFloat(total)
            } else {
              total = 0
            } 
          total = parseFloat(Costo) + parseFloat(total)
          $('#totalCosto').html('')
          $('#totalCosto').html('<center>' + currency(total + '') + '</center>')
          $('#cantidad' + num).focus()
          $('#cantidad' + num).change(function(){
            if($('#totalCosto')){
              total = $('#totalCosto').html().replace('Q', '').replace(',', '').replace('<center>', '').replace('</center>', '')
              total = parseFloat(total)
            } else {
              total = 0
            }           
            total = total - parseFloat($('#total' + num).html().replace('Q', '').replace(',', '').replace('<center>', '').replace('</center>', ''))
            if (total < 0) {
              total = 0
            }
            total = parseFloat(total + "") + (parseFloat($('#costo' + num).html().replace("Q", "").replace(',', '') + '') * parseFloat($('#cantidad' + num).val() + ''))
            $('#total' + num).html(currency((parseFloat($('#costo' + num).html().replace("Q", "").replace(',', '') + '') * parseFloat($('#cantidad' + num).val() + '')) + ''))
            $('#totalCosto').html('<center>' + currency(total + '') + '</center>')
            calculaDescuento(document.getElementById('descuento'))
          })
          $('#cantidad' + num).keyup(function(){
            if($('#totalCosto')){
              total = $('#totalCosto').html().replace('Q', '').replace(',', '').replace('<center>', '').replace('</center>', '')
              total = parseFloat(total)
            } else {
              total = 0
            }           
            total = total - parseFloat($('#total' + num).html().replace('Q', '').replace(',', '').replace('<center>', '').replace('</center>', ''))
            if (total < 0) {
              total = 0
            }
            total = parseFloat(total + "") + (parseFloat($('#costo' + num).html().replace("Q", "").replace(',', '') + '') * parseFloat($('#cantidad' + num).val() + ''))
            $('#total' + num).html(currency((parseFloat($('#costo' + num).html().replace("Q", "").replace(',', '') + '') * parseFloat($('#cantidad' + num).val() + '')) + ''))
            $('#totalCosto').html('<center>' + currency(total + '') + '</center>')
            calculaDescuento(document.getElementById('descuento'))
          })
          calculaDescuento(document.getElementById('descuento'))
          $('.modal').modal('close')
        }
      }
    }
  } else {
    console.log('no entro')
  }
}

function comboPrecio (val) {
  var url = 'base/listaprecio.xml'
  if (!httpRequest) {
    httpRequest = CreateHTTPRequestObject ()   // defined in ajax.js
  }
  if (httpRequest) {
    httpRequest.open ('GET', url, true)
    httpRequest.onreadystatechange = function () { OnLlenarComboPrecio(val) }
    httpRequest.send (null)
  }
}

function llenarComboPrecio (val) {
  var xmlDoc = ParseHTTPResponse (httpRequest)   // defined in ajax.js
  var tempResult = '<i class="material-icons prefix iconSelect"><img class="icono" src="img/ico/form/precio.png" alt="Precio"></i>'+
                   '<select id="Precio">'
  if (xmlDoc != null) {
    var Listaprecio_List = xmlDoc.getElementsByTagName('List')
    for (var j = 0; j < Listaprecio_List.length; j++) {
      var ListaPrecio = Listaprecio_List[j].getElementsByTagName('ListaPrecio')
      for (var i = 0; i < ListaPrecio.length; i++) {
        var Lista = ListaPrecio[i].getElementsByTagName('Lista')[0].childNodes[0].nodeValue
        var Descripcion = ListaPrecio[i].getElementsByTagName('Descripcion')[0].childNodes[0].nodeValue
        var Porcentaje = ListaPrecio[i].getElementsByTagName('Porcentaje')[0].childNodes[0].nodeValue
        tempResult += '<option value="' + Porcentaje + '">' + Descripcion + '</option>'
      }
    }
  } else {
    console.log('no entro')
  }
  tempResult += '</select>'+
                '<label>Tipo de Precio</label>'
  $('#PrecioCont').html(tempResult)
  $('#PrecioCont').ready(function (){
    $('#Precio').material_select();
    $(".dropdown-button").dropdown();
  })
}

function llenarComboPrecio2 (val) {
  
  var tempResult = '<i class="material-icons prefix iconSelect"><img class="icono" src="img/ico/form/precio.png" alt="Precio"></i>'+
                   '<select id="Precio">'
  $.ajax({
    type: "POST",
    url: "base/listaprecio.json",
    dataType: "json",
    success: function (resp) {
      for (var i = 0; i < resp.length; i++) {
        tempResult += '<option value="' + resp[i].Porcentaje + '">' + resp[i].Descripcion + '</option>'
      }
      tempResult += '</select>'+
                    '<label>Tipo de Precio</label>'
      $('#PrecioCont').html(tempResult)
      $('#PrecioCont').ready(function (){
        $('#Precio').material_select();
        $(".dropdown-button").dropdown();
      })
    }
  });
  
}

function calculaDescuento(obj){
  val = obj.value
  val = parseFloat(val) / 100
  if($('#totalCosto')){
    total = $('#totalCosto').html().replace('Q', '').replace('<center>', '').replace('</center>', '').replace(',', '')
    total = parseFloat(total)
  } else {
    total = 0
  }
  $('#descuentoReal').html(currency ((total * val) + ''))
  total = total - (total * val)
  $('#totalSub').html(currency (total + ''))
}
