// RecordComponent.js
import React from 'react';
import './RecordComponent.css';

const RecordComponent = ({ record }) => {
  return (
    <div className="record">
      <p>Hostname: {record.hostname}</p>
      <p>Type: {record.type}</p>
      <p>TTL: {record.ttl}</p>
      <p>Data: {record.data}</p>
    </div>
  );
};

export default RecordComponent;
