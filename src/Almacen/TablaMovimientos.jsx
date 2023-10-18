import React, { useState, useEffect } from 'react';  // Importa las bibliotecas React, useState y useEffect de React.
import Table from 'react-bootstrap/Table';  // Importa el componente de tabla de Bootstrap.
import Button from 'react-bootstrap/Button';  // Importa el componente de botón de Bootstrap.
import Modal from 'react-bootstrap/Modal';  // Importa el componente de modal de Bootstrap.
import { obtenDatosEntradas, eliminaDatos, obtenDatosSalidas, eliminaSalidas } from "../config/firebase";  // Importa funciones de Firebase.
import "../estilos/tabla.css";  // Importa un archivo de hoja de estilo CSS.
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';  // Importa los iconos de flecha y búsqueda de react-icons.
import { Form, InputGroup } from 'react-bootstrap';  // Importa componentes Form e InputGroup de Bootstrap.

function TableMovES({
  handleShow,
  setEditaEntrada,
  setBanderaActualiza,
  updateTabla,
  setUpdateTabla,
  visibleShow,
  setEditaSalida,
  setBandeActualiza,
  updatTabla,
  setUpdatTabla,
  entradaToDelete,
  setNombreModeloEliminar,
  setShowDeleteModal,
  setEntradaToDelete,
  nombreModeloEliminar,
  showDeleteModal,
  salidaToDelete,
  setSalidaModeloEliminar,
  setShowDeleteSalida,
  setSalidaToDelete,
  showDeleteSalida,
  salidaModeloEliminar,
}) {
  const [ListaEntradas, setListaEntradas] = useState([]);  // Declaración de estado para ListaEntradas, inicializado como un array vacío.
  const [ListaSalidas, setListaSalidas] = useState([]);  // Declaración de estado para ListaSalidas, inicializado como un array vacío.
  const [registrosActivosEntradas, setRegistrosActivosEntradas] = useState([]);  // Declaración de estado para registrosActivosEntradas, inicializado como un array vacío.
  const [registrosActivosSalidas, setRegistrosActivosSalidas] = useState([]);  // Declaración de estado para registrosActivosSalidas, inicializado como un array vacío.
  const [currentPage, setCurrentPage] = useState(0);  // Declaración de estado para currentPage, inicializado como 0.
  const [search, setSearch] = useState('');  // Declaración de estado para search, inicializado como una cadena vacía.

  useEffect(() => {
    setUpdateTabla(false);  // Configura setUpdateTabla como falso.
    obtenEntradas();  // Llama a la función obtenEntradas cuando updateTabla cambie.
  }, [updateTabla]);

  useEffect(() => {
    setRegistrosActivosEntradas(ListaEntradas.filter(entrada => entrada.estado === 'activo'));  // Filtra y actualiza registrosActivosEntradas basado en ListaEntradas.
  }, [ListaEntradas]);

  useEffect(() => {
    setUpdatTabla(false);  // Configura setUpdatTabla como falso.
    obtenSalidas();  // Llama a la función obtenSalidas cuando updatTabla cambie.
  }, [updatTabla]);

  useEffect(() => {
    setRegistrosActivosSalidas(ListaSalidas.filter(salida => salida.estado === 'activo'));  // Filtra y actualiza registrosActivosSalidas basado en ListaSalidas.
  }, [ListaSalidas]);

  const obtenEntradas = async () => {
    var auxDatEntradas;
    try {
      auxDatEntradas = await obtenDatosEntradas();  // Obtiene datos de entradas desde Firebase.
    } catch (error) {
      console.log("Error al obtener datos:", error);  // Muestra un mensaje de error si ocurre una excepción.
    }
    setListaEntradas(auxDatEntradas);  // Actualiza el estado ListaEntradas con los datos obtenidos.
  };

  const obtenSalidas = async () => {
    var auxDatSalidas;
    try {
      auxDatSalidas = await obtenDatosSalidas();  // Obtiene datos de salidas desde Firebase.
    } catch (error) {
      console.log(error);  // Muestra un mensaje de error si ocurre una excepción.
    }
    setListaSalidas(auxDatSalidas);  // Actualiza el estado ListaSalidas con los datos obtenidos.
  };

  const seleccionaEntradaEdit = (entrada) => {
    setBanderaActualiza(true); // Establece la bandera de actualización en verdadero.
    setEditaEntrada(entrada); // Establece el estado de edición de entrada con los datos de la entrada seleccionada.
    handleShow(); // Muestra el modal de edición.
  };

  const seleccionaSalidasEdit = (salida) => {
    setBandeActualiza(true); // Establece la bandera de actualización en verdadero.
    setEditaSalida(salida); // Establece el estado de edición de salida con los datos de la salida seleccionada.
    visibleShow(); // Muestra el modal de edición.
  };

  const mostrarModalEliminar = (entrada) => {
    setEntradaToDelete(entrada); // Establece la entrada a eliminar.
    setNombreModeloEliminar(entrada.modelo); // Establece el nombre del modelo a eliminar.
    setShowDeleteModal(true); // Muestra el modal de confirmación de eliminación.
  };

  const ocultarModalEliminar = () => {
    setShowDeleteModal(false); // Oculta el modal de confirmación de eliminación.
    setEntradaToDelete(null); // Borra la entrada seleccionada para eliminar.
    setNombreModeloEliminar(null); // Borra el nombre del modelo a eliminar.
  };

  const confirmarBorrarEntrada = async () => {
    try {
      setUpdateTabla(false); // Configura la actualización de la tabla como falsa.
      await eliminaDatos({ ...entradaToDelete, estado: 'inactivo' }); // Llama a la función para eliminar la entrada con estado 'inactivo'.
      setUpdateTabla(true); // Configura la actualización de la tabla como verdadera.
      ocultarModalEliminar(); // Oculta el modal de confirmación de eliminación.
    } catch (error) {
      console.log("Error al eliminar entrada:", error); // Muestra un mensaje de error si ocurre un error durante la eliminación.
    }
  };

  const muestraModalEliminar = (salida) => {
    setSalidaToDelete(salida); // Establece la salida a eliminar.
    setSalidaModeloEliminar(salida.modelo); // Establece el nombre del modelo a eliminar.
    setShowDeleteSalida(true); // Muestra el modal de confirmación de eliminación de salida.
  };

  const ocultaModalEliminar = () => {
    setShowDeleteSalida(false); // Oculta el modal de confirmación de eliminación de salida.
    setSalidaToDelete(null); // Borra la salida seleccionada para eliminar.
    setSalidaModeloEliminar(null); // Borra el nombre del modelo a eliminar.
  };

  const confirmaBorrarSalida = async () => {
    try {
      setUpdatTabla(false); // Configura la actualización de la tabla de salidas como falsa.
      await eliminaSalidas({ ...salidaToDelete, estado: 'inactivo' }); // Llama a la función para eliminar la salida con estado 'inactivo'.
      setUpdatTabla(true); // Configura la actualización de la tabla de salidas como verdadera.
      ocultaModalEliminar(); // Oculta el modal de confirmación de eliminación de salida.
    } catch (error) {
      console.log("Error al eliminar salida:", error); // Muestra un mensaje de error si ocurre un error durante la eliminación de salida.
    }
  };

  const filteredEntradas = registrosActivosEntradas.filter(entrada => entrada.nombre.includes(search)); // Filtra las entradas activas basadas en el valor de búsqueda.
  const filteredSalidas = registrosActivosSalidas.filter(salida => salida.nombre.includes(search)); // Filtra las salidas activas basadas en el valor de búsqueda.

  const combinedData = [...filteredEntradas, ...filteredSalidas]; // Combina los datos filtrados de entradas y salidas.
  const paginatedData = combinedData.slice(currentPage, currentPage + 5); // Obtiene los datos paginados según la página actual.

  const nextPage = () => {
    setCurrentPage(currentPage + 5); // Avanza a la siguiente página de datos.
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5); // Retrocede a la página anterior de datos, si es posible.
    }
  };

  const onSearchChange = (event) => {
    setCurrentPage(0); // Reinicia la página a la primera cuando se realiza una nueva búsqueda.
    setSearch(event.target.value); // Actualiza el estado de búsqueda con el valor del campo de búsqueda.
  };

  return (
    <>
      <div className="table-container">
      <InputGroup className="mb-3 custom-input-group ml-0 mr-auto">
        <Form.Control
          type="text"
          className="mb- form-control"
          placeholder="Buscar registros"
          value={search}
          onChange={onSearchChange}
        />
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Nombre</th>
          <th>Caract.</th>
          <th>No.Inv.</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Lote</th>
          <th>No. referencia</th>
          <th>Orden compra</th>
          <th>Recibe</th>
          <th>Entrega</th>
          <th>Notas</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
      {paginatedData.length > 0 ? (
              paginatedData.map((movimiento, key) => (
                <tr key={key}>
                  <td>{movimiento.tipo}</td>
                  <td>{movimiento.marca}</td>
                  <td>{movimiento.modelo}</td>
                  <td>{movimiento.nombre}</td>
                  <td>{movimiento.caracteristica}</td>
                  <td>{movimiento.inventario}</td>
                  <td>{movimiento.cantidad}</td>
                  <td>{movimiento.fecha.toDate().toLocaleDateString()}</td>
                  <td>{movimiento.fecha.toDate().toLocaleTimeString()}</td>
                  <td>{movimiento.lote}</td>
                  <td>{movimiento.referencia}</td>
                  <td>{movimiento.orden}</td>
                  <td>{movimiento.personaR}</td>
                  <td>{movimiento.personaE}</td>
                  <td>{movimiento.notas}</td>
                  <td>
                    {movimiento.tipo === 'Entrada' ? (
                      <button onClick={() => seleccionaEntradaEdit(movimiento)} className="btn btn-outline-primary btn-sm">Editar</button>
                    ) : (
                      <button onClick={() => seleccionaSalidasEdit(movimiento)} className="btn btn-outline-primary btn-sm">Editar</button>
                    )}
                  </td>
                  <td>
                    {movimiento.tipo === 'Entrada' ? (
                      <button onClick={() => mostrarModalEliminar(movimiento)} className="btn btn-outline-danger btn-sm">Borrar</button>
                    ) : (
                      <button onClick={() => muestraModalEliminar(movimiento)} className="btn btn-outline-danger btn-sm">Borrar</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="15">Sin datos</td></tr>
            )}
          </tbody>
        </Table>
        
        <div className="pagination-buttons">
          <button className="btn btn-outline-primary" onClick={prevPage}>
            <FaArrowLeft />
          </button>
          <button className="btn btn-outline-primary" onClick={nextPage}>
            <FaArrowRight />
          </button>
        </div>
       <Modal show={showDeleteModal} onHide={ocultarModalEliminar}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el registro del modelo: {nombreModeloEliminar}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ocultarModalEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarBorrarEntrada}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal show={showDeleteSalida} onHide={ocultaModalEliminar}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el registro del modelo: {salidaModeloEliminar}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ocultaModalEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmaBorrarSalida}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}
export default TableMovES;