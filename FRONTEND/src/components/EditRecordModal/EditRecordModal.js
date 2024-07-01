import React, { useState, useEffect } from 'react';
import './EditRecordModal.css';

const EditRecordModal = ({ record, onClose, onEditRecord }) => {
  const [hostname, setHostname] = useState(record.hostname);
  const [type, setType] = useState(record.type);
  const [ttl, setTtl] = useState(record.ttl);
  const [data, setData] = useState(record.data);

  const handleSubmit = () => {
    const updatedRecord = {
      ...record,
      hostname,
      type,
      ttl,
      data,
    };
    onEditRecord(updatedRecord);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Record</h2>
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
          <button type="button" onClick={handleSubmit}>Edit Record</button>
        </form>
      </div>
    </div>
  );
};

export default EditRecordModal;
