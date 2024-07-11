// Table.js
import React, { useState } from 'react';
import TableRow from './TableRow';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import './Table.css';
import { useEffect } from 'react';
import axios from 'axios';

const Table = () => {
    
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const[selectAllCheckbox,setSelectAllCheckbox]=useState(false);
   
  
  useEffect(() => {
    axios
      .get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => {
        setTableData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  if (!Array.isArray(tableData)) {
    return <div>Error: Data is not an array</div>;
  }
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };
 
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  
 

  const handleSingleRowDelete=(id)=>{
    setTableData((prev) => prev.filter((row) => row.id !== id));
  }

  const handleDeleteSelected = () => {
    setTableData((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    if(selectAllCheckbox){
      setSelectAllCheckbox(false);
    }
  };

  const handleSave = (id, newData) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...newData } : row))
    );
  };
  
  const filteredData = tableData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const indexOfLastRow = currentPage * rowsPerPage;   //calculate number of rows to display
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
 
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  
   //if page changes,the checkbox should be set to false, and all selected elements are deselected.
  useEffect(() => {
      setSelectedRows([])
      setSelectAllCheckbox(false) 
  },[currentPage])


  const handleSelectCurrentRows=(checked)=>{    
     if(checked){
    setSelectedRows(currentRows.map((row) => row.id));
     }
     else{
      setSelectedRows([]);
     }
     setSelectAllCheckbox(checked);
}
  
  return (
    <div>
      <Search onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllCheckbox} onChange={(e)=>handleSelectCurrentRows(e.target.checked) }/>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
   <tbody>
          {currentRows.map((row) => (
            <TableRow 
              key={row.id} 
              row={row} 
              onSelect={handleSelectRow} 
              selected={selectedRows.includes(row.id)}
              onSave={handleSave} // Pass the handleSave function
              onDelete={handleSingleRowDelete}
            />
          ))}
        </tbody>
      </table>
      <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
     </div>
     <div className="delete-selected">
      <button onClick={handleDeleteSelected}>Delete Selected</button>
      </div>
    </div>
  );
};

export default Table

