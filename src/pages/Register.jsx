import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsPerson, BsEnvelope, BsLock, BsPhone, BsPersonBadge, BsCheckCircle } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../config/firebase"; // Importa la función de registro si es necesario
import { useUserContext } from "../context/UserContext"; // Importa el contexto de usuario si es necesario
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser"; // Importa el hook de redireccionamiento si es necesario


const Register = ({ onClose }) => {
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const userCredential = await register(values);
      console.log("Usuario registrado:", userCredential.user.uid);
      onClose();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Nombre requerido"),
        lastName: Yup.string().required("Apellido requerido"),
        phone: Yup.string().required("Teléfono requerido"),
        email: Yup.string().email("Email no válido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Mínimo 6 caracteres").required("Password requerido"),
        role: Yup.string().required("Rol requerido"),
        status: Yup.string().required("Estado requerido"),
    });

    return (
        <div>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        phone: "",
                        email: "",
                        password: "",
                        role: "",
                        status: "",
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
                        <form onSubmit={handleSubmit} id="registerForm">
                            <div className="d-flex">
                                <div className="form-group me-2">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsPerson />
                                        </span>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                            placeholder="Nombres"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="firstName"
                                        />
                                    </div>
                                    {errors.firstName && touched.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsPerson />
                                        </span>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                                            placeholder="Apellidos"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="lastName"
                                        />
                                    </div>
                                    {errors.lastName && touched.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <BsPhone />
                                    </span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                                        placeholder="Teléfono"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="phone"
                                    />
                                </div>
                                {errors.phone && touched.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>

                            <div className="d-flex">
                                <div className="form-group me-2">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsEnvelope />
                                        </span>
                                        <input
                                            type="email"
                                            id="email"
                                            className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="email"
                                        />
                                    </div>
                                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsLock />
                                        </span>
                                        <input
                                            type="password"
                                            id="password"
                                            className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                            placeholder="Contraseña"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="password"
                                        />
                                    </div>
                                    {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <BsPersonBadge />
                                    </span>
                                    <select
                                        id="role"
                                        className={`form-select ${touched.role && errors.role ? "is-invalid" : ""}`}
                                        value={values.role}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="role"
                                    >
                                        <option value="" disabled>Selecciona un rol</option>
                                        <option value="vendedor">Vendedor</option>
                                        <option value="almacenista">Almacenista</option>
                                        <option value="jventas">Jefe de ventas</option>
                                        <option value="jadquisiciones">Jefe de adquisiciones</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                {errors.role && touched.role && <div className="invalid-feedback">{errors.role}</div>}
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <BsCheckCircle />
                                    </span>
                                    <select
                                        id="status"
                                        className={`form-select ${touched.status && errors.status ? "is-invalid" : ""}`}
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="status"
                                    >
                                        <option value="" disabled>Selecciona un estado</option>
                                        <option value="active">Activo</option>
                                        <option value="inactive">Inactivo</option>
                                    </select>
                                </div>
                                {errors.status && touched.status && <div className="invalid-feedback">{errors.status}</div>}
                            </div>
                        </form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" form="registerForm">
                    Registrar
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default Register;