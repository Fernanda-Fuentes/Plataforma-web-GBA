// Importar los paquetes y funciones necesarios de React
import { useEffect, useState } from "react"; // Importar los hooks de efecto y estado
import { useContext } from "react"; // Importar el hook de contexto
import { createContext } from "react"; // Importar la función para crear un contexto

// Importar las funciones necesarias de Firebase
import { onAuthStateChanged } from "firebase/auth"; // Función de Firebase para cambios en la autenticación
import { auth } from "../config/firebase"; // Importar el objeto "auth" configurado previamente

// Crear un contexto de usuario
const UserContext = createContext();

// Definir el componente proveedor del contexto de usuario
export default function UserContextProvider({ children }) {
    // Estado para almacenar información del usuario
    const [user, setUser] = useState(false); // Inicialmente, el estado del usuario es "false"

    // Efecto para observar el cambio en la autenticación del usuario
    useEffect(() => {
        console.log("useEffect en acción");
        // Observable proporcionado por Firebase para detectar cambios en la autenticación
        const unsuscribe = onAuthStateChanged(auth, (user) => { //método que manda la solicitud a firebase si es que el usuario ya hizo register o login en la aplicación
            console.log(user); // Imprimir información del usuario (puede ser null o un objeto)
            setUser(user); //cuando sea null es porque ya entro al método onAuthStateChanged
        });
         // Devolver una función de limpieza que se ejecutará al desmontar el componente
        return unsuscribe
    }, [])

    // Cuando inicia la aplicación siempre el user estará false
    // Pero al terminar el useEffect, el user podrá ser null o un objeto
    if(user == false) return <p>Loading app...</p> //aparece para esperar la respuesta desde firebase

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}


// Hook personalizada para utilizar el contexto de usuario
export const useUserContext = () => useContext(UserContext);
