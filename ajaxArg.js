const xhttpArg = new XMLHttpRequest();
const xhttpMonedaArg = new XMLHttpRequest();

xhttpArg.open('GET', './scripts/nintendoArg.json', true);
xhttpArg.send();

xhttpMonedaArg.open('GET', './scripts/monedaArg.json', true);
xhttpMonedaArg.send();

xhttpArg.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        let datos = JSON.parse(this.responseText);
        /*METODO PARA QUITAR SIGNO $ Y PASAR DE STRING A INT
        for(let item of datos){
            var montoFormat = item.precioOferta.replace(/[$.]/g,'');
            const i = Number.parseInt(montoFormat, 10);
            console.log(i);
        }
        */
        xhttpMonedaArg.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let datos3 = JSON.parse(this.responseText);
                let res = document.querySelector('#resArg');

                res.innerHTML = '';
                for (let item of datos3) {
                    var montoFormat2 = item.monedaArg.replace(/[$]/g, '');
                    const moneda = Number.parseFloat(montoFormat2, 10);
                    for (let item of datos) {
                        //console.log(item.titulo);
                        var porcentajeDescuentoArg = item.descuento.replace(/[-%]/g, '');
                        const porcentajeDescuentoParseArg = Number.parseFloat(porcentajeDescuentoArg, 10);

                        var tituloGuionArg = item.titulo.replace(/\s/g,'-').toLowerCase();

                        const montoFormat = item.precioOferta.replace(/[$.]/g, '');
                        const precioOferta = Number.parseFloat(montoFormat, 10);
                        const tipoCambio = precioOferta * moneda;
                        const floatTipoCambio = Number.parseInt(tipoCambio, 10);
                        const descuentoIdArg = 'descuento-' + datos.indexOf(item);

                        res.innerHTML += `
            <div id="contenedor-games">
                <a href="https://www.nintendo.com/es-ar/store/products/${tituloGuionArg}-switch">${item.titulo}</a>
                <div id="precioOf"><img id="imgEua" src="./mediaFile/argentina.png" alt=""> $${precioOferta} ARG</div>
                <div id="tipoCam"><img id="imgMx" src="./mediaFile/mexico.png" alt=""> $${floatTipoCambio} MXN</div>
                <div id="${descuentoIdArg}"><span id="valorDescuento"></span></div>
            </div>
            `;
                        if (porcentajeDescuentoParseArg >= 40) {

                            var descuentoElementArg = document.getElementById(descuentoIdArg);
                            descuentoElementArg.classList.add('rojo');
                            descuentoElementArg.innerText = "-" + porcentajeDescuentoArg + "%";
                        } else {
                            var descuentoElementArg = document.getElementById(descuentoIdArg);
                            descuentoElementArg.innerText = "-" + porcentajeDescuentoArg + "%";
                        }
                    }
                }
            }
        }
    }
}
