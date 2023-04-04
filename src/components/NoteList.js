import React from "react";
import NoteItem from "./NoteItem";
import NoData from '../images/no-data.png';

function NoteList ({ headerText, notes, onDelete, onToggle }) {
  const noData = () => {
    return (
      <div style={{margin: 'auto'}}>
        <h2 style={{textAlign: 'center', color: '#bb0b66'}}>No Data</h2>
        <img style={{width: '100%'}} src={NoData} alt="no-data" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="container-header">
        <h2>{headerText}</h2>
      </div>      

      <div className="container-list">
        {
          notes.length > 0 ? notes.map((note) => (
            <NoteItem key={note.id} id={note.id} onDelete={onDelete} onToggle={onToggle} {...note} />
          )) : noData()
        } 
      </div>
    </div>
  )
}

export default NoteList;