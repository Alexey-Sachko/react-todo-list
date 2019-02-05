import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value.toUpperCase()
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <form 
        className="mt-2 d-flex item-add-form"
        onSubmit={this.onSubmit}>

        <input 
          type="text"
          className="form-control mr-1"
          onChange={this.onLabelChange}
          placeholder="What needs to be done"
          value={this.state.label}/>
        <button 
          className="btn btn-outline-primary w-25"
          type="submit">
            Add Item 
        </button>
      </form>
    )
  }
}
