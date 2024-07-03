// SearchComponent.js
import React, { useState } from 'react';
import './SearchComponent.css';

const SearchComponent = ({ onSearch }) => {
  const [hostname, setHostname] = useState('');

  const handleSearch = () => {
    onSearch(hostname);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search by hostname..." 
        value={hostname} 
        onChange={(e) => setHostname(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
