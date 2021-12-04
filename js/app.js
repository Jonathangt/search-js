const resultado = document.querySelector('#resultado')

const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

const max = new Date().getFullYear()
const min = max - 10;

const datosBuscar = {
    marca:"",
    year:"",
    precio_min:"",
    precio_max:"",
    puertas:"",
    transmision:"",
    color:"",
}

//se ejecuta cuando se carga el html
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos)

    yearF()
})


//event listener para forms de busqueda
marca.addEventListener('change', e => {
    datosBuscar.marca = e.target.value
    firtrarAutos(autos)
})

year.addEventListener('change', e => {
    datosBuscar.year = e.target.value
    firtrarAutos(autos)
})

minimo.addEventListener('change', e => {
    datosBuscar.precio_min = e.target.value
    firtrarAutos(autos)
})

maximo.addEventListener('change', e => {
    datosBuscar.precio_max = e.target.value
    firtrarAutos(autos)
})

puertas.addEventListener('change', e => {
    datosBuscar.puertas = e.target.value
    firtrarAutos(autos)
})

transmision.addEventListener('change', e => {
    datosBuscar.transmision = e.target.value
    firtrarAutos(autos)
})

color.addEventListener('change', e => {
    datosBuscar.color = e.target.value
    firtrarAutos(autos)
})

//funcs
const mostrarAutos = (autos) => {
    //elimina el html previo
    limpiarHTML()

    autos.forEach(g => {
        const { marca, modelo, year, precio, puertas, color, transmision } = g;
        const autoHTML = document.createElement('p')

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - Puertas ${puertas} - Transmisión ${transmision} - Precio ${precio} - Color ${color}
        `

        //insertar en el html
        resultado.appendChild(autoHTML)
    });
}

const limpiarHTML = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

const yearF = () => {
    for (let g = max; g >= min; g--) {
        const op = document.createElement('option')
        op.value = g
        op.textContent = g
        year.appendChild(op)
    }
}

const firtrarAutos = () => {
    const res = autos
                .filter( filtrarMarca )
                .filter( filtrarYear )
                .filter( filtrarMin )
                .filter( filtrarMax )
                .filter( filtrarPuertas )
                .filter( filtrarColor )
                .filter( filtrarTransmision )
    console.table(res);

    

    if (res.length) {
        mostrarAutos(res)
    }else{
        limpiarHTML()
        const noResultado = document.createElement('div')
        noResultado.classList.add('alerta', 'error')
        noResultado.textContent = 'No se encontraron resultado, con los filtros seleccionados'
        resultado.appendChild(noResultado)
    }
}

const filtrarMarca = (auto) => {
    const { marca } = datosBuscar;
    if ( marca ) {
        return auto.marca === marca
    }
    return auto
}

const filtrarYear = (auto) => {
    const { year } = datosBuscar;
    if ( year ) {
        return auto.year === parseInt(year)
    }
    return auto
}

const filtrarMin = (auto) => {
    const { precio_min } = datosBuscar;
    if ( precio_min ) {
        return auto.precio >= precio_min
    }
    return auto
}

const filtrarMax = (auto) => {
    const { precio_max } = datosBuscar;
    if ( precio_max ) {
        return auto.precio <= precio_max
    }
    return auto
}

const filtrarPuertas = (auto) => {
    const { puertas } = datosBuscar;
    if ( puertas ) {
        return auto.puertas <= puertas
    }
    return auto
}

const filtrarColor = (auto) => {
    const { color } = datosBuscar;
    if ( color ) {
        return auto.color === color
    }
    return auto
}

const filtrarTransmision = (auto) => {
    const { transmision } = datosBuscar;
    if ( transmision ) {
        return auto.transmision === transmision
    }
    return auto
}

