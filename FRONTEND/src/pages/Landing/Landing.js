// App.js
import React, { useState, useEffect } from 'react';
import RecordComponent from '../../components/RecordComponent/RecordComponent';
import AddRecordModal from '../../components/AddRecordModal/AddRecordModal';
import './Landing.css';

const Landing = () => {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleAddRecord = async (newRecord) => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });
      if (response.ok) {
        fetchRecords();
        setShowModal(false);
      } else {
        console.error('Error adding record:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
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
