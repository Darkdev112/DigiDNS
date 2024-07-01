import React, { useState, useEffect } from 'react';
import RecordComponent from '../../components/RecordComponent/RecordComponent';
import AddRecordModal from '../../components/AddRecordModal/AddRecordModal';
import EditRecordModal from '../../components/EditRecordModal/EditRecordModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecords, addRecord, editRecord, deleteRecord } from '../../redux/slices/recordSlice';
import './Landing.css';


const Landing = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const dispatch = useDispatch();
  const records = useSelector((state) => state.record.records);
  const loading = useSelector((state) => state.record.loading);
  const error = useSelector((state) => state.record.error);

  useEffect(() => {
    dispatch(fetchRecords());
  }, []);

  const handleAddRecord = (newRecord) => {
    dispatch(addRecord(newRecord));
  };

  const handleEditRecord = (updatedRecord) => {
    dispatch(editRecord(updatedRecord));
    setShowEditModal(false);
  };

  const handleDeleteRecord = (id) => {
    dispatch(deleteRecord(id));
    setShowDeleteModal(false);
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedRecord(id);
    setShowDeleteModal(true);
  };
  

  return (
    <div>
      <div className="container">
        <h1>Your DNS Records</h1>
        <button onClick={() => setShowAddModal(true)}>Add Record</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {records.length > 0 ? (
          records.map((record, index) => (
            <RecordComponent
              key={index}
              record={record}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          ))
        ) : (
          <p>No records created yet</p>
        )}
      </div>
      {showAddModal && (
        <AddRecordModal
          onClose={() => setShowAddModal(false)}
          onAddRecord={handleAddRecord}
        />
      )}
      {showEditModal && selectedRecord && (
        <EditRecordModal
          record={selectedRecord}
          onClose={() => setShowEditModal(false)}
          onEditRecord={handleEditRecord}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onDeleteConfirm={() => handleDeleteRecord(selectedRecord)}
        />
      )}
    </div>
  );
};

export default Landing;
