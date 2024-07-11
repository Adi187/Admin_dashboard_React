// SearchBar.js
import React from 'react';
import "./Search.css";

const Search = ({ onSearch }) => {
    const handleSearch = (e) => {
      if ((e.type === 'keydown' && e.key === 'Enter') || (e.type === 'click' && e.target.className.includes('search-icon'))) {
        const input = document.querySelector('.search-container input');
        onSearch(input.value);
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
  ;

export default Search;
