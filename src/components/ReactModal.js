import React from 'react';
import { Modal } from 'react-bootstrap';

const ReactModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal show={ isOpen } onHide={ onClose }>
      <Modal.Body>
        { children }
      </Modal.Body>
    </Modal>
  );
}
    
export default ReactModal;