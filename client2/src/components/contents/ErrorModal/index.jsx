
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, error, handleClose }) => {
  return (
    <Modal 
    show={show} 
    onHide={handleClose} 
    backdrop="static"  // Configura el fondo estático
    keyboard={false} 
    centered>
      <Modal.Header closeButton>
        <Modal.Title>{error.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error.description}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose} >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
