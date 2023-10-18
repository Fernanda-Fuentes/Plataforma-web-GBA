import { useState, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup } from 'react-bootstrap';
import { agregarEntradas, actualizaEntradas } from "../config/firebase"; 
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";


function AddEntradas({show, handleClose, editaEntrada, banderaActualiza, setUpdateTabla}) {
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Estado para almacenar el valor de reCAPTCHA  
  
  // Estado para almacenar los datos de entradas
    const [datosEntrada, setDatosEntrada] = useState ({
        id: "",
        marca: "",
        modelo: "",
        nombre: "",
        caracteristica: "",
        inventario: "",
        caducidad: "",
        cantidad: "",
        lote: "",
        referencia: "",
        orden: "",
        personaR: "",
        personaE: "",
        notas: "",
    });

     // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    marca: Yup.string().required('La marca es requerida'),
    modelo: Yup.string().required('El modelo es requerido'),
    nombre: Yup.string().required('El nombre es requerido'),
    caracteristica: Yup.string().required('Las caracteristica son requeridas'),
    inventario: Yup.string().required('El número de inventario es requerido'),
    caducidad: Yup.date().required('La fecha de caducidad es requerida'),
    cantidad: Yup.number().required('Campo requerido').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
    lote: Yup.string().required('El número de lote es requerido'),
    referencia: Yup.string().required('La referencia es requerida'),
    orden: Yup.string().required('La orden de compra es requerida'),
    personaR: Yup.string().required('El nombre de la persona que recibe es requerido'),
    personaE: Yup.string().required('El nombre de la persona que entrega es requerido'),
    notas: Yup.string().required('Las notas son requeridas'),
  });


  // Efecto para actualizar los datos de entrada cuando cambia 'editaEntrada' o 'banderaActualiza'
  useEffect(() => {
    console.log("Edita entrada:", editaEntrada);
    if (banderaActualiza === true) { // Verifica si la bandera de actualización es verdadera
      setDatosEntrada({
        ...editaEntrada, // Copia los datos de la entrada que se está editando en el estado 'datosEntrada'
      });
    } else {
      setDatosEntrada({
        // Establece el estado 'datosEntrada' en un objeto vacío si la bandera de actualización es falsa (agregar nueva entrada)
        id: "",
        marca: "",
        modelo: "",
        nombre: "",
        caracteristica: "",
        inventario: "",
        caducidad: "",
        cantidad: "",
        lote: "",
        referencia: "",
        orden: "",
        personaR: "",
        personaE: "",
        notas: "",
      });
    }
  }, [editaEntrada, banderaActualiza]);

 

  // Función para guardar el registro de la entrada
  const guardarRegistro = async (values) => {
    if (recaptchaValue) { // Verifica si se proporcionó un valor de recaptcha
    try {
      if (banderaActualiza === false) { // Si la bandera de actualización es falsa, se agrega una nueva entrada
        await agregarEntradas(values); // Llama a la función para agregar datos al sistema
        setUpdateTabla(true); // Actualiza la tabla después de agregar la entrada
        setDatosEntrada({
          id: "",
          marca: "",
          modelo: "",
          nombre: "",
          caracteristica: "",
          inventario: "",
          caducidad: "",
          cantidad: "",
          lote: "",
          referencia: "",
          orden: "",
          personaR: "",
          personaE: "",
          notas: "",
        }); // Reinicia los datos de la entrada en el estado
      } else {
        // Si la bandera de actualización no es falsa, actualiza la entrada
        await actualizaEntradas(values);
        setUpdateTabla(true); // Actualiza la tabla después de la actualización
      }
      obtenEntradas(); // Obtén las entradas actualizadas
      handleClose(); // Cierra el diálogo/modal
    } catch (error) {
      console.log(error); // Maneja errores imprimiéndolos en la consola
    }
  } else {
    // Si no se proporcionó un valor de recaptcha, muestra una alerta
    alert('Por favor, completa la verificación reCAPTCHA antes de guardar.');
  }
};

  return (
    <>
    {/* Modal para agregar una entrada nueva */}
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{banderaActualiza ? 'Editar Entrada' : 'Agrega una nueva Entrada'}</Modal.Title>
      </Modal.Header>
      {/* Formulario para ingresar los datos de entrada */}
      <Formik
        initialValues={banderaActualiza ? editaEntrada : datosEntrada}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          guardarRegistro(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              {/* Campos para los datos de las entradas */}
              <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Marca: </InputGroup.Text>
            <Form.Control
              type="text"
              name="marca"
              aria-describedby="inputGroup-sizing-sm"
              value={values.marca}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.marca && errors.marca ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="marca" component="div" className="invalid-feedback" />
            <InputGroup.Text id="inputGroup-sizing-sm"> Modelo: </InputGroup.Text>
            <Form.Control
              type="text"
              name="modelo"
              aria-describedby="inputGroup-sizing-sm"
              value={values.modelo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.modelo && errors.modelo ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="modelo" component="div" className="invalid-feedback" />
            <InputGroup.Text id="inputGroup-sizing-sm"> Nombre: </InputGroup.Text>
            <Form.Control
              type="text"
              name="nombre"
              aria-describedby="inputGroup-sizing-sm"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.nombre && errors.nombre ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Característica: </InputGroup.Text>
            <Form.Control
              type="text"
              name="caracteristica"
              aria-describedby="inputGroup-sizing-sm"
              value={values.caracteristica}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.caracteristica && errors.caracteristica ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="caracteristica" component="div" className="invalid-feedback" />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Número de Inventario: </InputGroup.Text>
            <Form.Control
              type="text"
              name="inventario"
              aria-describedby="inputGroup-sizing-sm"
              value={values.inventario}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.inventario && errors.inventario ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="inventario" component="div" className="invalid-feedback" />
            <InputGroup.Text id="inputGroup-sizing-sm"> Caducidad: </InputGroup.Text>
            <Form.Control
              type="date"
              name="caducidad"
              aria-describedby="inputGroup-sizing-sm"
              value={values.caducidad}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.caducidad && errors.caducidad ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="caducidad" component="div" className="invalid-feedback" />
            <InputGroup.Text id="inputGroup-sizing-sm"> Cantidad: </InputGroup.Text>
            <Form.Control
              type="number"
              name="cantidad"
              aria-describedby="inputGroup-sizing-sm"
              value={values.cantidad}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.cantidad && errors.cantidad ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="cantidad" component="div" className="invalid-feedback" />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Lote: </InputGroup.Text>
            <Form.Control
              type="text"
              name="lote"
              aria-describedby="inputGroup-sizing-sm"
              value={values.lote}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.lote && errors.lote ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="lote" component="div" className="invalid-feedback" />
            <InputGroup.Text id="inputGroup-sizing-sm"> Número de referencia: </InputGroup.Text>
            <Form.Control
              type="text"
              name="referencia"
              aria-describedby="inputGroup-sizing-sm"
              value={values.referencia}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.referencia && errors.referencia ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="referencia" component="div" className="invalid-feedback" />
            <InputGroup.Text id="inputGroup-sizing-sm"> Orden de compra: </InputGroup.Text>
            <Form.Control
              type="text"
              name="orden"
              aria-describedby="inputGroup-sizing-sm"
              value={values.orden}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.orden && errors.orden ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="orden" component="div" className="invalid-feedback" />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Persona quien recibe: </InputGroup.Text>
            <Form.Control
              type="text"
              name="personaR"
              aria-describedby="inputGroup-sizing-sm"
              value={values.personaR}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.personaR && errors.personaR ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="personaR" component="div" className="invalid-feedback" />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Persona o empresa quien entrega: </InputGroup.Text>
            <Form.Control
              type="text"
              name="personaE"
              aria-describedby="inputGroup-sizing-sm"
              value={values.personaE}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.personaE && errors.personaE ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="personaE" component="div" className="invalid-feedback" />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Notas: </InputGroup.Text>
            <Form.Control
              type="text"
              name="notas"
              aria-describedby="inputGroup-sizing-sm"
              value={values.notas}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched.notas && errors.notas ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="notas" component="div" className="invalid-feedback" />
          </InputGroup>
          <ReCAPTCHA
                  sitekey="6LcHfpIoAAAAACgTcN1CGFw7L2oyVFb9GcfOE-ce" // tu clave de sitio reCAPTCHA
                  onChange={(value) => setRecaptchaValue(value)} //se encarga de actualizar el valor de recaptchaValue cuando se completa la verificación reCAPTCHA. 
                />
            </Modal.Body>
            
            <Modal.Footer>
              {/* Botón para cerrar el modal */}
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              {/* Botón para guardar el registro de entradas */}
              <Button type="submit" onClick={handleClose} variant="primary">
                Guardar
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Formik>
    </Modal>
  </>
);
}


export default AddEntradas;