// Importar componentes y hooks necesarios de "react-router-dom" y el contexto de usuario
import { Navigate, Outlet } from "react-router-dom"; // Componentes para navegación y renderizado de rutas anidadas
import { useUserContext } from "../context/UserContext"; // Importar el contexto de usuario

// Definir un componente funcional llamado "Private"
const Private = () => {
    // Utilizar el hook "useUserContext" para acceder al contexto de usuario
    const { user } = useUserContext();

    // Verificar si hay un usuario autenticado (no nulo)
    return user ? <Outlet /> : <Navigate to="/" />;
    // Si hay un usuario autenticado, renderizar las rutas secundarias (hijas) usando "Outlet"
    // Si no hay un usuario autenticado, redirigir a la ruta "/"
};

// Exportar el componente "Private"
export default Private;
