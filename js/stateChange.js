function OnProductoChange () {
    if (httpRequest.readyState == 0 || httpRequest.readyState == 4) {
        if (IsRequestSuccessful (httpRequest)) {    // defined in ajax.js
           llenarProductos ()
        }
        else {
            return false
        }
    }
}

function OnSelProductoChange (val) {
    if (httpRequest.readyState == 0 || httpRequest.readyState == 4) {
        if (IsRequestSuccessful (httpRequest)) {    // defined in ajax.js
           buscaProductoSel (val)
        }
        else {
            return false
        }
    }
}

function OnLlenarComboPrecio (val) {
    if (httpRequest.readyState == 0 || httpRequest.readyState == 4) {
        if (IsRequestSuccessful (httpRequest)) {    // defined in ajax.js
           llenarComboPrecio (val)
        }
        else {
            return false
        }
    }
}