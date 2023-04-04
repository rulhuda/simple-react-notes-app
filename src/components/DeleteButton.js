import React from "react";

function DeleteButton ({ id, onDelete }){
  return (
    <button className="btn-danger action action-right" onClick={() => onDelete(id)}>Delete</button>
  )
}

export default DeleteButton;
