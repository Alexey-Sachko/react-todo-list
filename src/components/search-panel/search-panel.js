import React, {Component} from 'react';

class SearchPanel extends Component {

  state = {
    label: ''
  };

  onInputChange = (event) => {

    const label = event.target.value;
  
    this.setState({
      label: label
    });
    this.props.onSearchChange(label);
  };

  render() {

    const inputPlaceholder = "type here to search";

    return (
      <input 
        className="w-75 px-2 mr-1 search-panel-input"
        placeholder={ inputPlaceholder }
        onChange={this.onInputChange}
        value={this.state.label}/>
    )
  }

}

export default SearchPanel;