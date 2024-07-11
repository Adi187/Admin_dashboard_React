// TableRow.js
import React, { useState } from 'react';

const TableRow = ({ row, onSelect, selected, onSave,onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...row });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveClick = () => {
    onSave(row.id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(row.id);
  }

  return (
    
    <tr className={selected ? 'selected' : ''}>
      <td>
        <input 
          type="checkbox" 
          checked={selected} 
          onChange={() => onSelect(row.id)} 
        />
      </td>
      <td>
        {isEditing ? (
          <input 
            type="text" 
            name="name" 
            value={editData.name} 
            onChange={handleEditChange} 
          />
        ) : (
          row.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input 
            type="text" 
            name="email" 
            value={editData.email} 
            onChange={handleEditChange} 
          />
        ) : (
          row.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input 
            type="text" 
            name="role" 
            value={editData.role} 
            onChange={handleEditChange} 
          />
        ) : (
          row.role
        )}
      </td>
      <td>
        {isEditing ? (
          <button className="save" onClick={handleSaveClick}>Save</button>
        ) : (
          <>
            <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
