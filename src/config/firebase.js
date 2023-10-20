// Importar los paquetes y servicios necesarios de Firebase
import { initializeApp } from "firebase/app"; //paquete de firebase para inicializar la aplicación
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Servicio de autenticación
import { doc, updateDoc, getFirestore, collection, getDocs, query, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Configuración de la aplicación Firebase
const firebaseConfig = { //archivo que dice que va trabajar con este proyecto en especifico
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar la aplicación Firebase con la configuración
const app = initializeApp(firebaseConfig); 

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Obtener el servicio de autenticación de Firebase
export const auth = getAuth(app); //exportamos el auth que esta utilizando todos los servicios de autenticación 
//el auth nos vas servir para poder registrar usuarios, poder loguearlos, para poder hacerle un seguimiento,
export const storage = getStorage(app);

// Función asincrónica para agregar datos de una entrada a la base de datos
export async function agregarEntradas(datos) {
    //console.log(datos); // Imprime los datos de la entrada en la consola
    var fecha = new Date(); // Obtiene la fecha y hora actual
    var resp = ""; // Variable para almacenar la respuesta de la operación

    try {
        // Intenta agregar los datos de entradas a la base de datos
        resp = await addDoc(collection(db, "Entradas"), { //se utiliza como el identificador único del documento en esa colección. 
            marca: datos.marca,
            modelo: datos.modelo,
            nombre: datos.nombre,
            caracteristica: datos.caracteristica,
            inventario: datos.inventario,
            caducidad: datos.caducidad,
            cantidad: datos.cantidad,
            lote: datos.lote,
            referencia: datos.referencia,
            orden: datos.orden,
            personaR: datos.personaR,
            personaE: datos.personaE,
            notas: datos.notas,
            estado: "activo",
            fecha: fecha, // Agrega la fecha y hora al registro
            tipo: "Entrada", // Establece el campo "tipo" en "Entrada"
        });

        const entradaRef = doc(db, "Entradas", resp.id)
        await updateDoc(entradaRef, {
            id: resp.id,
        });
    } catch (error) {
        console.log(error) // Muestra errores en la consola en caso de fallo
    }
    console.log(resp.id); // Imprime la respuesta de la operación en la consola
}

// Función asincrónica para obtener datos de todas las entradas de la base de datos
export async function obtenDatosEntradas() {
    const datosRetorno = []; // Arreglo para almacenar los datos de las entradas

    // Consulta Firestore para obtener todos los documentos de la colección "Entradas"
    const q = query(collection(db, "Entradas"));
    const coleccionDatos = await getDocs(q); // Ejecuta la consulta y espera la respuesta
    //console.log(coleccionDatos);

    // Recorre cada documento en la colección y extrae sus datos
    coleccionDatos.forEach((doc) => {
        //console.log(doc.data)
        datosRetorno.push(doc.data()); // Agrega los datos del documento al arreglo datosRetorno
    });

    return datosRetorno; // Devuelve el arreglo con los datos de las entradas
}

export async function actualizaEntradas(data) {
    //console.log(data)
    try {
        const entradaRef = doc(db, "Entradas", data.id)
        await updateDoc(entradaRef, {
            ...data,
        });
    } catch (error) {
        console.log(error)
    }
}

export async function eliminaDatos(data) {
    //console.log("Eliminando datos:", data); // Agrega este console.log
    try {
        const entradaRef = doc(db, "Entradas", data.id);
        // Cambia el estado a "inactivo" antes de eliminar el documento
        await updateDoc(entradaRef, {
            estado: "inactivo",
        });
    } catch (error) {
        console.log(error);
    }
}



// Función asincrónica para agregar datos de una salida a la base de datos
export async function agregarSalidas(datos) {
    //console.log(datos); // Imprime los datos de las entradas en la consola
    var fecha = new Date(); // Obtiene la fecha y hora actual
    var resp = ""; // Variable para almacenar la respuesta de la operación

    try {
        // Intenta agregar los datos de las entradas a la base de datos
        resp = await addDoc(collection(db, "Salidas"), { //se utiliza como el identificador único del documento en esa colección. 
            marca: datos.marca,
            modelo: datos.modelo,
            nombre: datos.nombre,
            caracteristica: datos.caracteristica,
            inventario: datos.inventario,
            cantidad: datos.cantidad,
            referencia: datos.referencia,
            personaR: datos.personaR,
            personaE: datos.personaE,
            notas: datos.notas,
            estado: "activo",
            fecha: fecha, // Agrega la fecha y hora al registro
            tipo: "Salida", // Establece el campo "tipo" en "Entrada"
        });
        const salidaRef = doc(db, "Salidas", resp.id)
        await updateDoc(salidaRef, {
            id: resp.id,
        });
    } catch (error) {
        console.log(error) // Muestra errores en la consola en caso de fallo
    }
    console.log(resp.id); // Imprime la respuesta de la operación en la consola
}

// Función asincrónica para obtener datos de todas las entradas de la base de datos
export async function obtenDatosSalidas() {
    const datosRetorno = []; // Arreglo para almacenar los datos de las entradas

    // Consulta Firestore para obtener todos los documentos de la colección "Entradas"
    const q = query(collection(db, "Salidas"));
    const coleccionDato = await getDocs(q); // Ejecuta la consulta y espera la respuesta
    //console.log(coleccionDatos);

    // Recorre cada documento en la colección y extrae sus datos
    coleccionDato.forEach((doc) => {
        //console.log(doc.data)
        datosRetorno.push(doc.data()); // Agrega los datos del documento al arreglo datosRetorno
    });

    return datosRetorno; // Devuelve el arreglo con los datos de las entradas
}


export async function actualizaSalidas(data) {
    //console.log(data)
    try {
        const salidaRef = doc(db, "Salidas", data.id)
        await updateDoc(salidaRef, {
            ...data,
        });
    } catch (error) {
        console.log(error)
    }
}


export async function eliminaSalidas(data) {
    //console.log("Eliminando datos:", data); // Agrega este console.log
    try {
        const salidaRef = doc(db, "Salidas", data.id)
        await updateDoc(salidaRef, {
            estado: "inactivo",
        });
    } catch (error) {
        console.log(error)
    }
}


// Función para realizar el inicio de sesión
export const login = ({email, password}) => {//la función va recibir a un usuario, del lado del frontend se pedira el email y contraseña 
     // Utilizar el servicio de autenticación para realizar el inicio de sesión
    return signInWithEmailAndPassword(auth, email, password) //devolvera una promesa con una respuesta positiva y negativa
}

// Función para registrar un nuevo usuario
export const register = ({ email, password}) => { 
    // Utilizar el servicio de autenticación para crear un nuevo usuario
    return createUserWithEmailAndPassword(auth, email, password)
 }

 // Función para realizar el cierre de sesión (logout) del usuario
 export const logout = () => {
    // Utilizar el servicio de autenticación para cerrar la sesión
    return signOut(auth); //devolvera una promesa
 }