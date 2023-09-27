window.onload = function(){

const xhttpCol = new XMLHttpRequest();
const xhttpMonedaCol = new XMLHttpRequest();

xhttpCol.open('GET', './scripts/nintendoCol.json', true);
xhttpCol.send();

xhttpMonedaCol.open('GET', './scripts/monedaCol.json', true);
xhttpMonedaCol.send();

xhttpCol.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        let datos = JSON.parse(this.responseText);

        xhttpMonedaCol.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let datosCol = JSON.parse(this.responseText);
                let res = document.querySelector('#resCol');
                res.innerHTML = '';

                for (let itemMoneda of datosCol) {
                    var montoFormatCol = itemMoneda.monedaCol.replace(/[$]/g, '');
                    const monedaCol = Number.parseFloat(montoFormatCol, 10);
                    for (let itemDatos of datos) {
                        //console.log(item.titulo);
                        var porcentajeDescuentoCol = itemDatos.descuento.replace(/[-%]/g, '');
                        const porcentajeDescuentoParseCol = Number.parseFloat(porcentajeDescuentoCol, 10);

                        //let tituloGuionCol = itemDatos.titulo.replace(/[\u2014]+/g,"-").toLowerCase();
                        var tituloGuionCol = itemDatos.titulo.replace(/\s/g,'-').toLowerCase();

                        var montoOriginalCol = itemDatos.precioOferta;
                        var montoFormatCol = itemDatos.precioOferta.replace(/[$.]/g, '');
                        const precioOferta = Number.parseFloat(montoFormatCol, 10);
                        const tipoCambio = precioOferta * monedaCol;
                        const floatTipoCambio = Number.parseInt(tipoCambio, 10);
                        const descuentoCol = 'descuento-' + datos.indexOf(itemDatos);
                        res.innerHTML += `
                <div id="contenedor-games">
                <a href="https://www.nintendo.com/es-co/store/products/${tituloGuionCol}-switch">${itemDatos.titulo}</a>
                    <div id="precioOf"><img id="imgEua" src="./mediaFile/colombia.png" alt=""> $${precioOferta} COL</div>
                <div id="tipoCam"><img id="imgMx" src="./mediaFile/mexico.png" alt=""> $${floatTipoCambio} MXN</div>
                <div id="${descuentoCol}"><span id="valorDescuento"></span></div>
                </div>
                `;

                if (porcentajeDescuentoParseCol >= 40) {

                    var descuentoElement = document.getElementById(descuentoCol);
                    descuentoElement.classList.add('rojo');
                    descuentoElement.innerText = "-" + porcentajeDescuentoCol + "%";
                } else {
                    var descuentoElement = document.getElementById(descuentoCol);
                    descuentoElement.innerText = "-" + porcentajeDescuentoCol + "%";
                }

                        
                    }
                }
            }
        }
    }
}
}