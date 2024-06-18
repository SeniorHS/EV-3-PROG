//se importa la función para guardar los datos
import { getData, getDocumento, remove, save, update } from './firestore.js'
//id para guardar el id del documento 
let id = 0
//addEventListener permite activar el elemento según un evento(click)
document.getElementById('btnGuardar').addEventListener('click', (event) => {
    
    event.preventDefault()
    //validamos que los campos no seas vacios
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const nutri = {
            run: document.getElementById('runfloat').value,
            nom: document.getElementById('namefloat').value,
            ape: document.getElementById('apefloat').value,
            edad: document.getElementById('edadfloat').value,
            peso: document.getElementById('pesofloat').value,
            est: document.getElementById('estaturafloat').value,
            email: document.getElementById('emailfloat').value,

        }
        if (id == 0) {
            //función que permite el guardado de datos
            save(nutri)
            Swal.fire('Guardado','','success')
        } else{
            //permite editar los datos si el id es diferente de 0
            update(id,nutri)
        }
        id = 0
        limpiar()
    }
})
//DOMCOntentLoaded es un evento que se ejecuta cuando se reacarga la página
window.addEventListener('DOMContentLoaded', () => {
    //getData función que trae la colección
    getData((datos) => {
        let tabla = ''
        //recorremos la colección y creamos el objeto nutri que trae cada documento
        datos.forEach((nutri) => {
            //nutri.data() trae los datos de cada documento
            const item = nutri.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.email}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${nutri.id}">Editar</button>
                    <button class="btn btn-danger" id="${nutri.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificamos cual es el botón presionado
            btn.addEventListener('click', () => {
                //sweetalert que permite confirmarción
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //presiono el botón eliminar
                    if (result.isConfirmed) {
                        //función eliminar
                        remove(btn.id)                         
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su regostro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //seleccionar 
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                //invocar función que permite buscar el documento por id
                const doc = await getDocumento(btn.id)
                //asignar los valores del documento
                const nutri = doc.data()

                document.getElementById('runfloat').value = nutri.run
                document.getElementById('namefloat').value = nutri.nom
                document.getElementById('apefloat').value = nutri.ape
                document.getElementById('emailfloat').value = nutri.email

                //asignamos el id del documento a la variable
                id = doc.id
                //run sólo lectura
                document.getElementById('runfloat').readOnly = true
                //btn cambie el valor a editar
                document.getElementById('btnGuardar').value = 'Editar'
            })
        })

    })
})