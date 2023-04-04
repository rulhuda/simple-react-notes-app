/* eslint-disable array-callback-return */
import React from "react";
import swal from "sweetalert";
import getInitialData from "../utils/data";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import SearchBox from "./SearchBox";
import NoData from '../images/no-data.png';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      filteredData: getInitialData(),
    }

    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchNotes = this.onSearchNotes.bind(this);
    this.onToggleStatus = this.onToggleStatus.bind(this);
  }

  onAddNotesHandler({ title, body }){
    swal({
      title: 'Sure want to add note?',
      text: `You will adding note`,
      icon: 'info',
      buttons: [
        'Cancel',
        'Confirm',
      ],
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal({
          icon: 'success',
          title: 'Success',
          text: 'Success adding note!',
        }).then(() => {
          this.setState((prevState) => {
            return {
              notes: [
                ...prevState.notes,
                {
                  id: +new Date(),
                  title,
                  body,
                  createdAt: new Date().toISOString(),
                  archived: false,
                }
              ],
              filteredData: [
                ...prevState.notes,
                {
                  id: +new Date(),
                  title,
                  body,
                  createdAt: new Date().toISOString(),
                  archived: false,
                }
              ],
            }
          })
        })
      } else {
        swal({
          icon: 'success',
          title: 'Canceled',
          text: `Success canceled adding note!`,
        });
      }
    });

    
  }

  onDeleteHandler(id) {
    swal({
      title: 'Sure want to delete?',
      text: `You will delete selected note`,
      icon: 'warning',
      buttons: [
        'Cancel',
        'Confirm',
      ],
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal({
          icon: 'success',
          title: 'Success',
          text: 'Success delete selected note!',
        }).then(() => {
          const notes = this.state.notes.filter((note) => note.id !== id);
          this.setState(() => {
            return {
              notes,
              filteredData: notes,
            }
          });
        });
      } else {
        swal({
          icon: 'success',
          title: 'Canceled',
          text: `Success canceled remove note`,
        });
      }
    });
  }

  onSearchNotes(keyword) {
    if (keyword === '') {
      this.setState((prevState) => {
        return {
          ...prevState.notes,
          filteredData: [],
        }
      });
    }
    const data = this.state.notes.filter((note) => {
      if (note.title.toLowerCase().includes(keyword.toLowerCase())) {
        return note
      }

      if (note.body.toLowerCase().includes(keyword.toLowerCase())) {
        return note
      }
    })

    this.setState((prevState) => {
      return {
        ...prevState.notes,
        filteredData: [...data],
      }
    })
  }

  onToggleStatus(idUpdated) {
    const status = [];
    const checkStatus = () => this.state.notes.map((note) => {
      const { id, archived } = note;
      if (id !== idUpdated) return note;
    
      if (archived) return status.push(true);
      return status.push(false);
    });

    checkStatus();
    
    swal({
      title: 'Are you sure?',
      text: `${status[0] === true ? `You will remove selected note from Archived` : `You will move selected note to Archive`}`,
      icon: 'warning',
      buttons: [
        'Cancel',
        'Confirm',
      ],
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal({
          icon: 'success',
          title: 'Success',
          text: `${status[0] === true ? `Success remove selected note from Archive!` : `Success move selected note to Archive!`}`,
        }).then(() => {
          const notes = this.state.notes.map((note) => {
            const { id, archived } = note;
            if (id !== idUpdated) return note;
      
            if (archived) return {...note, archived: false }
            
            return {...note, archived: true }
          });
      
          this.setState(() => {
            return {
              notes,
              filteredData: notes,
            }
          });
        })
      } else {
        swal({
          icon: 'success',
          title: 'Canceled',
          text: `Canceled Success!`,
        });
      }
    });
  }

  render() {    
    const unarchiveNote = (notes) => {
      const data = notes.filter((note) => note.archived === false).sort((a,b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (b.createdAt > a.createdAt) return 1;
        return 0;
      });

      return data;
    };

    const archivedNote = (notes) => {
      const data = notes.filter((note) => note.archived === true).sort((a,b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (b.createdAt > a.createdAt) return 1;
        return 0;
      });

      return data;
    };

    const noData = () => {
      return (
        <div style={{margin: 'auto'}}>
          <h2 style={{textAlign: 'center', color: '#bb0b66'}}>No Data</h2>
          <img style={{width: '100%'}} src={NoData} alt="no-data" />
        </div>
      );
    }
    
    return (
      <div>
        <header>
          <h1>Contacts App</h1>
          <SearchBox onSearchHandler={this.onSearchNotes} />
        </header>

        <div className="main">
          <div className="card mt-sm mb-md">
            <div className="form_container">
            <NoteInput addNotes={this.onAddNotesHandler} />
            </div>
          </div>
          <div className="d-grid">
            <NoteList headerText='Your Notes' notes={this.state.filteredData.length > 0 ? unarchiveNote(this.state.filteredData) : noData()} onDelete={this.onDeleteHandler} onToggle={this.onToggleStatus} />
            
            <NoteList headerText='Your Archived' notes={this.state.filteredData.length > 0 ? archivedNote(this.state.filteredData) : noData()} onDelete={this.onDeleteHandler} onToggle={this.onToggleStatus} />
          </div>
        </div>

        <footer>
          <p className="heading">&copy; {new Date().getFullYear()} - <a className="text-white" href="https://github.com/rulhuda" target="_blank" rel="noreferrer">Nurul Huda</a></p>
          <hr className="hr-heading" />
        </footer>
      </div>
    )
  }
  
}

export default NotesApp;