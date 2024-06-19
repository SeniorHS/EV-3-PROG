
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('p-' + item.name).innerHTML = ''
    })
    document.getElementById('runfloat').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}

const verificar = (id) => {
    //getElementById(id) obtiene el elemento html por su id
    const input = document.getElementById(id)
    const div = document.getElementById('p-' + id)
    //removemos el estilo invalid
    input.classList.remove('is-invalid')
    //verificamos si valor del input es vacío
    if (input.value.trim() == '') {
        //classList permite añadir o quitar clases a un elemento HTML (add para añadir y remove para quitar)
        input.classList.add('is-invalid') //is-invalid es clase de bootstrap que deja en rojo el input
        //innerHTML permite agregar elementos html desde js
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid') //is-valid es claase bootstrap que deja el input en verde
        div.innerHTML = ''
        if (id == 'runfloat') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        if (id == 'emailfloat') {
            if (!validarEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }

        if (id == 'edadfloat') {
            if (input.value < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La edad no puede ser un numero negativo</span>'
            }

            if (input.value > 115) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La edad no puede ser superior a 115 años</span>'
            }
        }
        if (id == 'pesofloat') {
            if (input.value < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El peso no puede ser un numero negativo</span>'
            }
        }
        if (id == 'estaturafloat') {
            if (input.value < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La no puede ser un numero negativo</span>'
            }
        }
    }
}


const soloNumeros = (p) => {
    if (p.keyCode >= 48 && p.keyCode <= 57)
        return true //true permitira ver la tecla en el input
    return false //false no deja ver la tecla
}

const validarEmail = (emailfloat) => {
    //expresión regular del formato email
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    //vertifica si el email enviado no tiene el formato correcto
    if (!formato.test(emailfloat))
        return false //si retorna falso no es válido
    return true
}

