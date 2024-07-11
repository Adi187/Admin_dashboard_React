// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button 
        className="first-page" 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
      >
        First
      </button>
      <button 
        className="previous-page" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} //disable button if on first page
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)} 
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      <button 
    
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}  //disable button if on last page
      >
        Next
      </button>
      <button 
      
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
