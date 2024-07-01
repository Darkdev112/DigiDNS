// RecordComponent.js
import React from 'react';
import './RecordComponent.css';

const RecordComponent = ({ record,onEdit, onDelete }) => {
  return (
    <div className="record">
      <p>Hostname: {record.hostname}</p>
      <p>Type: {record.type}</p>
      <p>TTL: {record.ttl}</p>
      <p>Data: {record.data}</p>
      <button onClick={() => onEdit(record)}>Edit</button>
      <button onClick={() => onDelete(record._id)}>Delete</button>
    </div>
  );
};

export default RecordComponent;
