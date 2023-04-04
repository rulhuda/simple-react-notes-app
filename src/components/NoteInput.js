import React from "react";
import swal from "sweetalert";
class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      body: '',
    }

    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeBodyHandler = this.onChangeBodyHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onResetHandler = this.onResetHandler.bind(this);
  }

  onSubmitHandler(event){
    event.preventDefault();
    this.props.addNotes(this.state);
  }

  onResetHandler(event) {
    event.preventDefault();
    const maxChar = document.getElementById('maxCharacter');
    maxChar.style.color = '#303030';
    document.getElementById('description').value = 'Description';
    this.setState(() => {
      return {
        title: '',
        body: '',
      }
    })
  }

  onChangeTitleHandler(event){
    const limit = 50;
    const maxChar = document.getElementById('maxCharacter');
    maxChar.style.color = '#303030';
    if (event.target.value.length > (limit - 16)) {
      maxChar.style.color = 'red';
    }
    if (event.target.value.length > limit) {
      swal({
        icon: 'warning',
        title: 'Warning',
        'text': 'Title can\'t greater than 50 characters!',
      })
      const title = document.getElementById('title');
      title.value.length.slice(0, limit);
      this.setState((prevState) => {
        return {
          ...prevState,
          title,
        }
      });
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      }
    });
  }

  onChangeBodyHandler(event){
    this.setState((prevState) => {
      return {
        ...prevState,
        body: event.target.value,
      }
    });
  }

  render(){
    return (
      <form onSubmit={this.onSubmitHandler} onReset={this.onResetHandler}>
        <div className="form_container">
          <div className="form_header">
            <h2>Add Notes</h2>
          </div>
          <div className="form_body">
            <label htmlFor="title" className="text-dark">Title</label>

            <input type="text" placeholder="Title" onChange={this.onChangeTitleHandler} className="form-control mb-sm" id="title" value={this.state.title} required />
            <p id="maxCharacter">{50 - this.state.title.length} Remaining characters</p><br />

            <label htmlFor="description" className="text-dark" placeholder="">Description</label>

            <textarea onChange={this.onChangeBodyHandler} className="form-control mb-sm" id="description" defaultValue="Description" required ></textarea>
          </div>
          <div className="form_footer">
            <button type="submit" className="btn btn-primary mr-sm">Save</button>
            <button type="reset" className="btn btn-danger">Reset</button>
          </div>
        </div>
      </form>
    )
  }
  
}

export default NoteInput;
