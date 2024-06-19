// Se importa la función para guardar los datos
import { getData, getDocumento, remove, save, update, NoRepeatRun } from './firestore.js'

// ID para guardar el ID del documento 
let id = 0

// Event listener para el botón Guardar
document.getElementById('btnGuardar').addEventListener('click', async (event) => {
    event.preventDefault()

    // Validamos que los campos no sean vacíos
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const peso = parseFloat(document.getElementById('pesofloat').value); // Obtener peso
        const estatura = parseFloat(document.getElementById('estaturafloat').value) / 100; // Convertir cm a m

        if (!isNaN(peso) && !isNaN(estatura) && estatura > 0) {

            const imc = (peso / (estatura * estatura)).toFixed(2); // Calcular IMC
            const estadoIMC = calcularEstadoIMC(imc); // Obtener estado del IMC

            const nutri = {
                run: document.getElementById('runfloat').value,
                nom: document.getElementById('namefloat').value,
                ape: document.getElementById('apefloat').value,
                edad: document.getElementById('edadfloat').value,
                peso: document.getElementById('pesofloat').value,
                est: document.getElementById('estaturafloat').value,
                email: document.getElementById('emailfloat').value,
                genero: document.getElementById('genero').value,
                imc: imc,
                estado: estadoIMC
            }
            const run = document.getElementById('runfloat').value.trim()


            if (id == 0) {
                console.log(run)
                const a = await NoRepeatRun(run)
                console.log(a)
                if (!await NoRepeatRun(run)) {
                    Swal.fire('Run ya esta registrado')
                    document.getElementById('runfloat').classList.add('is-invalid')
                }
                else {
                    save(nutri)
                    Swal.fire('Guardado', '', 'success')
                }
            } else {
                update(id, nutri)
                Swal.fire('Actualizado', '', 'success')
            }

            id = 0
            limpiar()
        } else {
            alert('Por favor, introduce valores válidos para el peso y la estatura.');
        }
    }
})

// Función para calcular el estado del IMC
function calcularEstadoIMC(imc) {
    if (imc < 18.5) {
        return 'Bajo peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        return 'Normal';
    } else if (imc >= 25 && imc <= 29.9) {
        return 'Sobrepeso';
    } else {
        return 'Obesidad';
    }
}

// Evento DOMContentLoaded para recargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Función que trae la colección
    getData((datos) => {
        let tabla = ''
        // Recorremos la colección y creamos el objeto nutri que trae cada documento
        datos.forEach((nutri) => {
            // nutri.data() trae los datos de cada documento
            const item = nutri.data()

            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.edad}</td>
                <td>${item.peso}</td>
                <td>${item.est}</td>
                <td>${item.genero}</td>
                <td>${item.email}</td>
                <td>${item.imc}</td> 
                <td>${item.estado}</td> 
                <td nowrap>
                    <button class="btn btn-warning" id="edit-${nutri.id}">Editar</button>
                    <button class="btn btn-danger" id="delete-${nutri.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        // Eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            // Verificamos cuál es el botón presionado
            btn.addEventListener('click', () => {
                const docId = btn.id.replace('delete-', '')
                // Sweetalert que permite confirmación
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    // Presionó el botón eliminar
                    if (result.isConfirmed) {
                        // Función eliminar
                        remove(docId);
                        setTimeout(() => {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "Su registro ha sido eliminado",
                                icon: "success"
                            });
                        }, 1200);
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const docId = btn.id.replace('edit-', '')
                const doc = await getDocumento(docId)
                const nutri = doc.data()

                document.getElementById('runfloat').value = nutri.run
                document.getElementById('namefloat').value = nutri.nom
                document.getElementById('apefloat').value = nutri.ape
                document.getElementById('emailfloat').value = nutri.email
                document.getElementById('edadfloat').value = nutri.edad
                document.getElementById('estaturafloat').value = nutri.est
                document.getElementById('pesofloat').value = nutri.peso
                document.getElementById('genero').value = nutri.genero

                const peso = parseFloat(nutri.peso);
                const estatura = parseFloat(nutri.est) / 100;
                if (!isNaN(peso) && !isNaN(estatura) && estatura > 0) {
                    const imc = (peso / (estatura * estatura)).toFixed(2);
                    //document.getElementById('imcfloat').value = imc; 
                } else {
                    //document.getElementById('imcfloat').value = '';
                }

                id = docId
                document.getElementById('runfloat').readOnly = true
                document.getElementById('btnGuardar').value = 'Actualizar'
            })
        })

    })
})
