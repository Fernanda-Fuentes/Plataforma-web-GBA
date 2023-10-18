//los hooks son funciones que exportamos
// Importar el hook useNavigate desde el paquete "react-router-dom"
import { useNavigate } from "react-router-dom"
// Importar el hook useEffect desde React
import { useEffect } from "react"


// Definir un hook personalizado llamado useRedirectActiveUser
export const useRedirectActiveUser = (user, path) => { //recibe dos argumentos: user y path.
    // Utilizar el hook useNavigate para acceder a la función de navegación
    const navigate = useNavigate() //se usará para redirigir al usuario a una ruta específica.

    // Utilizar el hook useEffect para realizar redirecciones
    useEffect(() => {
        // Verificar si el usuario existe
        if(user) { 
            // Si el usuario existe, redirigir a la ruta especificada
            navigate(path);
        }
    }, [user]);  //especifica que este efecto se ejecutará cada vez que el valor de user cambie
}