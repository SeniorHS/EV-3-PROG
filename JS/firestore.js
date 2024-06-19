// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc, where, query, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmmMt1lLpigl6IqCA1piN01L0_DbO7gJ8",
    authDomain: "nutre-f.firebaseapp.com",
    projectId: "nutre-f",
    storageBucket: "nutre-f.appspot.com",
    messagingSenderId: "638708490676",
    appId: "1:638708490676:web:dc9880e20cd3852f9d52e1",
    measurementId: "G-HXBCJQ8C83"
}


const app = initializeApp(firebaseConfig)
//Función de firestore que permite retornar la base de datos para su utilización
const db = getFirestore(app)

//función para guardar los datos en firestore
export const save = (Pacientes) => {
    //addDoc es la función de firestore que permite añadir un nuevo documento
    //collection es la función de firestore que permite traer la colección de la db
    addDoc(collection(db, 'Paciente'), Pacientes)
}

//función que permite obtener la colección 
export const getData = (data) => {
    //onSnapshot permite retornar la colleción y asignarla a la variable data 
    onSnapshot(collection(db, 'Paciente'), data)
}

//función remove, permite eliminar un registro según su id
export const remove = (id) => {
    //deleteDoc es una función de firestore que permite quitar un documento de la colección
    //doc es una función de firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'Paciente', id))
}

//función getDocument nos permite obtener un documento según su id 
//getDoc permite traer un documento según si id y acceder a sus valores
export const getDocumento = (id) => getDoc(doc(db, 'Paciente', id))

//función update permite editar un documento
export const update = (id, per) => {
    //updateDoc es una funcioón de firestore que permite modificar un documento
    updateDoc(doc(db, 'Paciente', id), per)
}

export const NoRepeatRun = async (run) => {
    const p = query(collection(db, 'Paciente'), where('runfloat', '==', run));
    const querySnapshot = await getDocs(p);
    return !querySnapshot.empty;
}