const xhttp = new XMLHttpRequest();
const xhttp2 = new XMLHttpRequest();

xhttp.open('GET', './scripts/nintendoEua.json', true);
xhttp.send();

xhttp2.open('GET', './scripts/monedaEua.json', true);
xhttp2.send();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let datos = JSON.parse(this.responseText);

        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let datos2 = JSON.parse(this.responseText);

                for (let item2 of datos2) {
                    var montoFormat2 = item2.monedaEua.replace(/[$]/g, '');
                    const moneda = Number.parseFloat(montoFormat2, 10);

                    for (let item of datos) {

                        var porcentajeDescuento = item.descuento.replace(/[-%]/g, '');
                        const porcentajeDescuentoParse = Number.parseFloat(porcentajeDescuento, 10);

                        var tituloGuion = item.titulo.replace(/\s/g,'-').toLowerCase();

                        var montoFormat = item.precioOferta.replace(/[$]/g, '');
                        const precioOferta = Number.parseFloat(montoFormat, 10);
                        const tipoCambio = precioOferta * moneda;
                        const floatTipoCambio = Number.parseInt(tipoCambio, 10);
                        const descuentoId = 'descuento-' + datos.indexOf(item);
                        res.innerHTML += `
                                <div id="contenedor-games">
                                    <a href="https://www.nintendo.com/store/products/${tituloGuion}-switch">${item.titulo}</a>
                                    <div id="precioOf"><img id="imgEua" src="./mediaFile/united-states.png" alt=""> $${precioOferta} USD</div>
                                    <div id="tipoCam"><img id="imgMx" src="./mediaFile/mexico.png" alt=""> $${floatTipoCambio} MXN</div>
                                    <div id="${descuentoId}"><span id="valorDescuento"></span></div>
                                </div>
                            `;

                        if (porcentajeDescuentoParse >= 40) {

                            var descuentoElement = document.getElementById(descuentoId);
                            descuentoElement.classList.add('rojo');
                            descuentoElement.innerText = "-" + porcentajeDescuento + "%";
                        } else {
                            var descuentoElement = document.getElementById(descuentoId);
                            descuentoElement.innerText = "-" + porcentajeDescuento + "%";
                        }
                    }
                }
            }
        }
    }
}



