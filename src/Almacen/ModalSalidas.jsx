import { useState, useEffect  } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { agregarSalidas, actualizaSalidas } from "../config/firebase"
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddSalidas({ visible, visibleClose, editaSalida, bandeActualiza, setUpdatTabla }) {
   // Estado para almacenar los datos de salidas
   const [datosSalida, setDatosSalida] = useState({
    id: "",
    marca: "",
    modelo: "",
    nombre: "",
    caracteristica: "",
    inventario: "",
    cantidad: "",
    referencia: "",
    personaR: "",
    personaE: "",
    notas: "",
});


    const validationSchema = Yup.object().shape({ //shape Este método permite definir un esquema que debe cumplir el objeto que se va a validar (en este caso, los valores del formulario).
      marca: Yup.string().required('La marca es requerida'),
      modelo: Yup.string().required('El modelo es requerido'),
      nombre: Yup.string().required('El nombre es requerido'),
      caracteristica: Yup.string().required('Las caracteristica son requeridas'),
      inventario: Yup.string().required('El número de inventario es requerido'),
      cantidad: Yup.number().required('La cantidad es requerida').min(1, 'La cantidad debe ser mayor o igual a 1'),
      referencia: Yup.string().required('La referencia es requerida'),
      personaR: Yup.string().required('El nombre de la persona que recibe es requerido'),
      personaE: Yup.string().required('El nombre de la persona que entrega es requerido'),
      notas: Yup.string().required('Las notas son requeridas'),

    })
    // Efecto para actualizar los datos de salidas cuando cambia editaSalida o bandeActualiza
    useEffect(() => {
      if(bandeActualiza==true){  // Si la bandera de actualización es verdadera (edición)
        setDatosSalida({
          ...editaSalida, // Copia los datos de salida que se están editando en el estado 'datosSalida'
        })
      } else { // Si la bandera de actualización es falsa (nueva salida)
        setDatosSalida({
          id: "",
          marca: "",
          modelo: "",
          nombre: "",
          caracteristica: "",
          inventario: "",
          cantidad: "",
          referencia: "",
          personaR: "",
          personaE: "",
          notas: "",
        })
      }
    }, [editaSalida, bandeActualiza])

    // Función para guardar el registro de la salida
    const guardarSalidas = async (values) => {
      try {
        if (bandeActualiza == false) { // Si la bandera de actualización es falsa, se agrega una nueva salida
          await agregarSalidas(values); // Llama a la función para agregar datos de salida al sistema
          setUpdatTabla(true); // Actualiza la tabla después de agregar la salida
          setDatosSalida({
            id: "",
            marca: "",
            modelo: "",
            nombre: "",
            caracteristica: "",
            inventario: "",
            cantidad: "",
            referencia: "",
            personaR: "",
            personaE: "",
            notas: "",
          }); // Reinicia los datos de salida en el estado para preparar la salida de nuevos datos
        } else { // Si la bandera de actualización es verdadera, se actualiza la salida existente
          await actualizaSalidas(values); // Llama a la función para actualizar los datos de salida en el sistema
          setUpdatTabla(true); // Actualiza la tabla después de la actualización
        }
        obtenSalidas();  // Llama a una función que probablemente obtiene las salidas 
        visibleClose(); // Cierra el modal después de guardar
      } catch (error) {
        console.log(error); // Muestra errores en la consola en caso de fallo
      }
    };

  return (
    <>
      {/* Modal para agregar una salida nueva */}
      <Modal size="lg" show={visible} onHide={visibleClose}>
        <Modal.Header closeButton>
        <Modal.Title>
            {bandeActualiza ? 'Editar Salida' : 'Agrega una nueva Salida'}
          </Modal.Title>
        </Modal.Header>
        {/* Formulario para ingresar los datos de salida */}
        <Formik
          initialValues={bandeActualiza ? editaSalida : datosSalida}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // La validación pasa, puedes guardar los datos aquí
            guardarSalidas(values);
            setSubmitting(false);
          }}
        >
        {({ 
              values, //Este objeto contiene los valores actuales de los campos del formulario.
              handleSubmit, //Esta función debe ser llamada cuando el formulario se envía. Está preconfigurada por el componente Formik para manejar la validación y el proceso de envío de manera adecuada.
              handleChange, //Esta función se utiliza para manejar los cambios en los campos de salida. Se debe usar como el manejador del evento onChange en los elementos input.
              errors, //Este objeto contiene los errores de validación asociados a cada campo. 
              touched, // Se utiliza para mostrar mensajes de error solo después de que el usuario haya interactuado con el campo.
              handleBlur, //Se utiliza para manejar el evento onBlur en los campos de salida. Se debe usar como el manejador del evento onBlur en los elementos input.
          }) => (
         <form onSubmit={handleSubmit}> {/*Se define el formulario con el evento onSubmit que ejecutará la función handleSubmit cuando el usuario presione el botón de envío. */}
         <Modal.Body>
              {/* Campos para los datos de las salidas */}
              <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"> Marca: </InputGroup.Text>
            <Form.Control
              type="text"
              name="marca"
              aria-describedby="inputGroup-sizing-sm"
              value={values.marca}
              onChange={handleChange}  //Cuando el usuario ingresa o modifica texto en el campo, handleChange se ejecuta para actualizar el valor en el estado.
              onBlur={handleBlur} //Establece la función handleBlur como el manejador del evento onBlur. Cuando el usuario sale del campo después de haber interactuado con él, handleBlur se ejecuta.
              isInvalid={!!errors.marca}
              />
              <Form.Control.Feedback type="invalid">
                {errors.marca}
              </Form.Control.Feedback>
          
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

            </Modal.Body>
        <Modal.Footer>
          {/* Botón para cerrar el modal */}
          <Button variant="secondary" onClick={visibleClose}>
            Cerrar
          </Button>
          {/* Botón para guardar el registro de la salida */}
          <Button  type='submit' onClick={visibleClose} variant="primary">
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

export default AddSalidas;