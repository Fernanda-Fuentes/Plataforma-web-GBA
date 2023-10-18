// Importa los componentes necesarios
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddEntradas from "../Almacen/ModalEntradas";
import AddSalidas from '../Almacen/ModalSalidas';
import TableMovES from "../Almacen/TablaMovimientos";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


 // Define el componente 
 const AlmacenMov = () => {
    // Estado para controlar la visibilidad del modal de eliminación de entradas
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Estado para almacenar la entrada que se desea eliminar
  const [entradaToDelete, setEntradaToDelete] = useState(null);
  // Estado para almacenar el nombre del modelo que se desea eliminar (para mostrar en el modal)
  const [nombreModeloEliminar, setNombreModeloEliminar] = useState(null);
    //Funciones para controlar ModalAddStudent
  const [banderaActualiza, setBanderaActualiza] = useState(false);
  const [updateTabla, setUpdateTabla] = useState(false);
  const [editaEntrada, setEditaEntrada] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setBanderaUpdate = () => {
    setBanderaActualiza(false);
    handleShow();
  }


  //Funciones para controlar ModalSalidas
  const [showDeleteSalida, setShowDeleteSalida] = useState(false);
  const [salidaToDelete, setSalidaToDelete] = useState(null);
  const [salidaModeloEliminar, setSalidaModeloEliminar] = useState(null);
  const [bandeActualiza, setBandeActualiza] = useState(false);
  const [updatTabla, setUpdatTabla] = useState(false);
  const [editaSalida, setEditaSalida] = useState(null);

  const [visible, setVisible] = useState(false);
  const visibleClose = () => setVisible(false);
  const visibleShow = () => setVisible(true);

  const setBandeUpdate = () => {
    setBandeActualiza(false);
    visibleShow();
  }


  return (
    <>
    <div>
    <div className="grid lg:grid-cols-4 xl:grid-cols-6">
    <Sidebar />
    {/*asignar propiedades al header */}
    <main className="lg:col-span-3 xl:col-span-5 bg-white-100 p-8 h-[100vh] ">
      <Header />
      <hr />
      <center className="m-5"> 
            <div className="d-flex justify-content-end">
              <Button variant="btn btn-outline-success" className="mr-2" onClick={setBanderaUpdate}>
                Entrada
              </Button>
              <AddEntradas
                setUpdateTabla={setUpdateTabla}
                banderaActualiza={banderaActualiza}
                editaEntrada={editaEntrada}
                show={show}
                handleClose={handleClose}
              />
              <div style={{ marginRight: '10px' }}></div> {/* Espacio entre botones */}
              <Button variant="btn btn-outline-secondary" className="ml-2" onClick={setBandeUpdate}>
                Salida
              </Button>
              <AddSalidas 
                setUpdatTabla={setUpdatTabla}
                bandeActualiza={bandeActualiza}
                editaSalida={editaSalida} 
                visible={visible} 
                visibleClose={visibleClose}
              />
            </div>
          </center>
            <center className="m-2">
            <TableMovES
              nombreModeloEliminar={nombreModeloEliminar}
              showDeleteModal={showDeleteModal}
              setEntradaToDelete={setEntradaToDelete}
              setShowDeleteModal={setShowDeleteModal}
              setNombreModeloEliminar={setNombreModeloEliminar}
              entradaToDelete={entradaToDelete}
              setUpdateTabla={setUpdateTabla}
              updateTabla={updateTabla}
              setBanderaActualiza={setBanderaActualiza}
              setEditaEntrada={setEditaEntrada}
              handleShow={handleShow}


              salidaModeloEliminar={salidaModeloEliminar}
              showDeleteSalida={showDeleteSalida}
              setSalidaToDelete={setSalidaToDelete}
              setShowDeleteSalida={setShowDeleteSalida}
              setSalidaModeloEliminar={setSalidaModeloEliminar}
              salidaToDelete={salidaToDelete}
              setUpdatTabla={setUpdatTabla}
              updatTabla={updatTabla}
              setBandeActualiza={setBandeActualiza}
              setEditaSalida={setEditaSalida}
              visibleShow={visibleShow}
            />
          </center>
      </main>
    </div>
    </div>
    </>
  );
}

export default AlmacenMov;