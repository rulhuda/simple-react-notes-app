import React from "react";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSearchBox = this.onChangeSearchBox.bind(this);
  }

  onChangeSearchBox(event) {
    this.props.onSearchHandler(event.target.value.trim())
  }

  render() {
    return (
      <div className="card search-box">
        <div className="form_search">
          <input onChange={this.onChangeSearchBox} type="search" className="form-control search-form mr-sm" placeholder="Cari ..." />
        </div>
      </div>
    )
  }
}

export default SearchBox;
