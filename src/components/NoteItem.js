import React from "react";
import DeleteButton from "./DeleteButton";
import ToggleButton from "./ToggleButton";

function NoteItem ({ id, title, body, createdAt, archived, onDelete, onToggle }) {
  const dateConverter = (date) => {
    const newDate = new Date(`${date}`);
    const day = newDate.getDate();
    let month = newDate.getMonth();
    let dayString = newDate.getDay();
    switch (month) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'Desember';
        break;
      default:
        break;
    }

    switch (dayString) {
      case 0:
        dayString = 'Sunday';
        break;
      case 1:
        dayString = 'Monday';
        break;
      case 2:
        dayString = 'Tuesday';
        break;
      case 3:
        dayString = 'Wednesday';
        break;
      case 4:
        dayString = 'Thursday';
        break;
      case 5:
        dayString = 'Friday';
        break;
      case 6:
        dayString = 'Saturday';
        break;
      default:
        break;
    }

    const year = newDate.getFullYear();
    const result = `${dayString}, ${day} ${month} ${year}`;

    return result;
     
  }
  return(
    <div className="card-item mt-sm mb-md">
      <div className="card-body">
        <div className="card-body_title">
          <h2>{title}</h2>
          <hr className="hr-title" />
        </div>

        <div className="card-body_desc mt-sm">
          <p>{body}</p>
        </div>

        <p className="text-danger mt-sm">{dateConverter(createdAt)}</p>

      </div>

      <div className="card-footer">
        {archived ? 
        <ToggleButton id={id} className="btn-warning action action-left" defaultValue="Unarchive" onToggle={onToggle} /> : 
        <ToggleButton id={id} className="btn-primary action action-left" defaultValue="Archive" onToggle={onToggle} />}
        
        <DeleteButton id={id} onDelete={onDelete}/>
      </div>
    </div>
  )
}

export default NoteItem;
