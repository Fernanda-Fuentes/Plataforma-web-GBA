import React, { useEffect } from "react";
import { BsEnvelope, BsLock } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { login } from "../config/firebase";  // Función para realizar el inicio de sesión
import "../estilos/Login.css";

const Login = () => {
    // Utilizar el hook "useNavigate" para acceder a la función de navegación
    const navigate = useNavigate();
    // Utilizar el hook "useUserContext" para acceder al contexto de usuario
    const { user } = useUserContext();

    // Efecto para redireccionar al dashboard si el usuario ya está autenticado
    useEffect(() => {
        // Verificar si el usuario está autenticado
        if (user) {
            // Si el usuario ya está autenticado, redirigir al dashboard
            navigate('/dashboard'); 
        }
    }, [user]);// Se ejecutará useEffect cada vez que el estado de "user" cambie

    // Función onSubmit para manejar el envío del formulario de inicio de sesión
    const onSubmit = async ({email, password}, { setSubmitting, setErrors, resetForm}) => {
        console.log({email, password}); // imprime en la consola los valores de email y password. 
        try {
            // Llamar a la función de inicio de sesión asincrónicamente
            const credentialUser = await login({ email, password });
            console.log(credentialUser);
            resetForm(); // Reiniciar el formulario después de un inicio de sesión exitoso
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if(error.code === "auth/user-not-found"){
                return setErrors({email: "Usuario no registrado"});
            }
            if (error.code === "auth/wrong-password") {
                return setErrors({password: "Password incorrecta"});
            }
        } finally {
            setSubmitting(false);
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no válido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Mínimo 6 carácteres").required("Password requerido"),
    });

    return (
        <div className="login-background">
            <div className="login-box">
                <div className="login-header">
                    <img src="src\assets\logo.jpeg" alt="Logo" />
                </div>
                <Formik
                    initialValues={{ email: "", password: ""}}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        errors,
                        touched,
                        handleBlur,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        placeholder="Ingrese email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
                                    />
                                    <span className="input-icon"><BsEnvelope /></span>
                                </div>
                                {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                        placeholder="Ingrese contraseña"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="password"
                                    />
                                    <span className="input-icon"><BsLock /></span>
                                </div>
                                {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Iniciar sesión</button>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/Register')}>Registrarse</button>
                            </div>
                        </form>
                    )}
                </Formik>
                <footer className="login-footer">
                    <p><a href="#" className="aviso-link">Aviso de privacidad</a></p>
                    <p>Derechos reservados Grupo Biomédico Azteca S.A. de C.V.</p>
                </footer>
            </div>
        </div>
    );
};

export default Login;



//Utiliza el paquete Formik para gestionar formularios y el paquete Yup para realizar validaciones. 