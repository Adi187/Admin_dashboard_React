// SearchBar.js
import React from 'react';
import "./Search.css";

const Search = ({ onSearch }) => {
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.target.className === 'search-icon') {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search..." 
        onKeyDown={handleSearch} 
      />
      <button className="search-icon" onClick={handleSearch}>🔍</button>
    </div>
  );
};

export default Search;
