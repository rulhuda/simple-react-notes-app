import React from "react";

function ToggleButton ({ id, onToggle, className, defaultValue }){
  return (
    <button className={className} onClick={() => onToggle(id)}>{defaultValue}</button>
  )
}

export default ToggleButton;
