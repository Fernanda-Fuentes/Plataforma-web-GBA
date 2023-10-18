// Importar el componente "Outlet" del paquete "react-router-dom"
import { Outlet } from "react-router-dom"; // Componente para renderizar rutas anidadas
// Importar el componente "UserContextProvider" desde el archivo de contexto "UserContext"
import UserContextProvider from "../context/UserContext"; // Proveedor del contexto de usuario

// Definir un componente funcional llamado "Root"
const Root = () => {
    // Devolver el componente "UserContextProvider" que envuelve a "Outlet"
    return (
        <UserContextProvider>
            <Outlet /> {/* Renderizar rutas secundarias (hijas) definidas en esta ruta */}
        </UserContextProvider>
    );
};

// Exportar el componente "Root"
export default Root;
