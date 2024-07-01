import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ onClose, onDeleteConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this record?</p>
        <button onClick={onDeleteConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
