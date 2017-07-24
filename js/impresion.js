function ImprimirVar(div)
{
	    var printin=window.open('Impresion.html?div='+div);
        
	
}
function imprimirCotizacion(){
        $('#respuesta').html('<div id="impresion"></div>');
    var encab='<nav><img src="img/logo.jpg" alt="INCO" class="logoEncabezadoprint"></nav>';
    var cuerpo="";
    var nombre = $('#nombre').val()
    var nit = $('#nit').val()
    var direccion = $('#direccion').val()
    var telefono = $('#telefono').val()
    var porcentaje = $('#Precio').val()
    var descuento = $('#descuento').val()
    var descuentoT = $('#descuentoReal').html()
    var subtotal = $('#totalCosto').html()
    var metaTotal = $('#totalSub').html()
    var table = document.getElementById("productosCotizar")
    var num = table.rows.length
    cuerpo+=encab+'<div class="CuentasTitulo">'+
           '<center><h5 style="text-align: left;" class="CuentasTitulo">Cliente: '+(nombre)+'</h5></center>'+
           '<center><div style="text-align: left;">NIT: '+(nit)+'</div></center>'+
           '<center><div style="text-align: left;">Direccion: '+direccion+' </div></center>'+
           '<center><div style="text-align: left;">Telefono: '+telefono+' </div></center>'+
           '</div>';
           cuerpo+='<div class="deposito">'+
                    '<center><h5>Productos</h5>';
           cuerpo+='<table  class="bordered highlight responsive-table">';
           cuerpo+='<tr>'+
                    '<th><center>Codigo</center></th>'+
                    '<th><center>Catalogo</center></th>'+
                    '<th><center>Descripcion</center></th>'+
                    '<th><center>Unidad</center></th>'+
                    '<th><center>Cantidad</center></th>'+
                    '<th><center>Costo</center></th>'+
                    '<th><center>Total</center></th>'+
                    '</tr>';
                for(i=1;i<num-1;i++){
                     miTabla = document.getElementById("productosCotizar");
                    mitbody = miTabla.getElementsByTagName("tbody")[0];
                    miFila = mitbody.getElementsByTagName("tr")[i];
                    var Codigo = miFila.childNodes[0].innerHTML;
                    var Catalogo = miFila.childNodes[1].innerHTML;
                    var Descripcion = miFila.childNodes[2].innerHTML;
                    var Unidad = miFila.childNodes[3].innerHTML;
                    var Cantidad = document.getElementById('cantidad' + (i+1)).value;
                    var Costo = miFila.childNodes[5].innerHTML;
                    var Total = miFila.childNodes[6].innerHTML;
                    cuerpo+='<tr>'+
                                '<td>' + Codigo + '</td>'+
                                '<td>' + Catalogo + '</td>'+
                                '<td>' + Descripcion + '</td>'+
                                '<td>' + Unidad + '</td>'+
                                '<td><center>' + Cantidad + '</center></td>'+
                                '<td>' + Costo + '</td>'+
                                '<td style="padding-left: 15px;padding-right: 15px;">' + Total + '</td>'+
                            '</tr>';
                    
                }
           cuerpo+='</table></center></div>';
           cuerpo+='<div class="row">'+
           '<div class="col s3 offset-s7">Subtotal: </div><div class="col s2">'+(subtotal)+'</div>'+
           '<div class="col s3 offset-s7">Descuento %: </div><div class="col s2"><center>'+(descuento)+'%</center></div>'+
           '<div class="col s3 offset-s7">Descuento Q: </div><div class="col s2 red-text"><center>-'+currency(descuentoT)+'</center></div>'+
           '<div class="col s3 offset-s7 border_top">Total: </div><div class="col s2 border_top">'+(metaTotal)+'</div>'
           '</div>';
           /*
    cuerpo+=encab+'<div class="cotizacion">'+
    '<center><h5>Cliente</h5></center>'+
    '<center><div style="width: 50%;text-align: left;margin-left: 50px;">Ventas ................................... '+
    ''+currency(resp['caja']['ventas']+"")+'</div>'+
    '<div style="width: 50%;text-align: left;margin-left: 50px;">Abonos de Clientes ............... '+
    ''+currency(resp['caja']['abonos']+"")+'</div>'+
    '<div style="width: 50%;text-align: left;margin-left: 50px;">Saldo Anterior ....................... '+
    ''+currency(resp['caja']['saldoAnt']+"")+'</div></center>'+
    '</div>';
    
    cuerpo+='<div class="egresos">'+
    '<center><h5>Egresos</h5></center>'+
    '<center><div style="width: 50%;text-align: left;margin-left: 50px;">Gastos .................................. '+
    ''+currency(resp['caja']['gastos']+"")+'</div></center>'+
    '</div>';
    
    cuerpo+='<div class="totales">'+
    '<center><h5>Totales</h5></center>'+
    '<center><div style="width: 50%;text-align: left;margin-left: 50px;">Ingresos ............................... '+
    ''+currency(resp['caja']['ingresos']+"")+'(+)</div>'+
    '<div style="width: 50%;text-align: left;margin-left: 50px;">Egresos ............................... '+
    ''+currency(resp['caja']['egresos']+"")+'(-)</div>'+
    '<div style="width: 50%;text-align: left;margin-left: 50px;">Totales ................................. '+
    ''+currency(resp['caja']['totales']+"")+'(=)</div></center>'+
    '</div>';
if(resp['DetalleCaja'].length>0 && resp['DetalleCaja'][0]['fecha']){
    cuerpo+='<div class="deposito">'+
    '<center><h5>Depositos</h5>';
    cuerpo+='<table  class="depositos">';
    cuerpo+='<tr>'+
            '<th>Fecha</th>'+
            '<th>No. Cuenta</th>'+
            '<th>Banco</th>'+
            '<th>Monto</th>'+
            '</tr>';
    
        for(i=0;i<resp['DetalleCaja'].length;i++){
            cuerpo+='<tr class="FilaDeposito">'+
            '<td class="fechaFila">'+resp['DetalleCaja'][i]['fecha']+'</td>'+
            '<td class="noCuentaFila">'+resp['DetalleCaja'][i]['nocuenta']+'</td>'+
            '<td class="bancoFila">'+(resp['DetalleCaja'][i]['banco']+"")+'</td>'+
            '<td class="montoFila">'+currency(resp['DetalleCaja'][i]['monto']+"")+'</td>'+
            '</tr>';
        }
    cuerpo+='</table></center></div>';

    
    }
    cuerpo+='<div class="saldoPC">'+
    '<center><h5>Saldo Proximo Corte</h5></center>'+
    '<center><div style="width: 50%;text-align: left;margin-left: 50px;">Saldo Proximo Corte .................... '+
    ''+currency(resp['caja']['saldoPC']+"")+'</div>'+
    '</div>';*/

          $('#impresion').html(cuerpo);
          
          
          //document.getElementById('impresionDeFactura11').print();
          // setTimeout(function(){printDiv('impresionDeFactura11');},500);
          ImprimirVar('impresion');
        
    
        
       
   
}