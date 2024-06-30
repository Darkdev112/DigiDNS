import React, { useState } from 'react';
import './AddRecordModal.css';

const AddRecordModal = ({ onClose, onAddRecord }) => {
  const [hostname, setHostname] = useState('');
  const [type, setType] = useState('A');
  const [ttl, setTtl] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = () => {
    const newRecord = {
      hostname,
      type,
      ttl,
      data,
    };
    onAddRecord(newRecord);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Record</h2>
        <form>
          <label>
            Hostname:
            <input type="text" value={hostname} onChange={(e) => setHostname(e.target.value)} />
          </label>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="A">A</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="TXT">TXT</option>
            </select>
          </label>
          <label>
            TTL:
            <input type="number" value={ttl} onChange={(e) => setTtl(e.target.value)} />
          </label>
          <label>
            Data:
            <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
          </label>
          <button type="button" onClick={handleSubmit}>Add Record</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecordModal;
