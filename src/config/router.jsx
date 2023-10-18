// Importar la función de enrutamiento del paquete "react-router-dom"
import { createBrowserRouter } from "react-router-dom";

// Importar los componentes de diseño y páginas necesarios
import RootLayout from "../layout/RootLayout"; // Diseño de nivel raíz
import PrivateLayout from "../layout/PrivateLayout"; // Diseño privado
import Login from "../pages/Login"; // Página de inicio de sesión
import Register from "../pages/Register"; // Página de registro
import Dashboard  from "../Dashboard"; // Página de panel de control
import AlmacenMov from "../pages/AlmacenMov";




// Crear un enrutador utilizando la función "createBrowserRouter"
export const router = createBrowserRouter([
    {
        path: "/", // Ruta base
        element: <RootLayout />, // Renderizar el diseño de nivel raíz en esta ruta
        children: [
            {
                index: true, // Ruta por defecto (índice) dentro del diseño de nivel raíz
                element: <Login />, // Renderizar la página de inicio de sesión en esta ruta
            },
            {
                path: "register", // Ruta adicional para el registro
                element: <Register />, // Renderizar la página de registro en esta ruta
            },
            {
                path: "dashboard", // Ruta para el panel de control
                element: <PrivateLayout />, // Renderizar el diseño privado en esta ruta
                children: [
                    {
                        index: true, // Ruta por defecto (índice) dentro del diseño privado
                        element: <Dashboard  />, // Renderizar la página de panel de control en esta ruta
                    },
                    {
                        path: "almacenmov",
                        element: <AlmacenMov />,
                    },
                ],
            },
        ],
    },
]);
