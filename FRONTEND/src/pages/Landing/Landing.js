import React, { useState, useEffect } from 'react';
import RecordComponent from '../../components/RecordComponent/RecordComponent';
import AddRecordModal from '../../components/AddRecordModal/AddRecordModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecords, addRecord } from '../../redux/slices/recordSlice';
import './Landing.css';


const Landing = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const records = useSelector((state) => state.record.records);
  const loading = useSelector((state) => state.record.loading);
  const error = useSelector((state) => state.record.error);

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const handleAddRecord = (newRecord) => {
    dispatch(addRecord(newRecord));
  };
  

  return (
    <div>
      <div className="container">
        <h1>Your DNS Records</h1>
        <button onClick={() => setShowModal(true)}>Add Record</button>
        {records.length > 0 ? (
          records.map((record, index) => (
            <RecordComponent key={index} record={record} />
          ))
        ) : (
          <p>No records created yet</p>
        )}
      </div>
      {showModal && (
        <AddRecordModal
          onClose={() => setShowModal(false)}
          onAddRecord={handleAddRecord}
        />
      )}
    </div>
  );
};

export default Landing;
