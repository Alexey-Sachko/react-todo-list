import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

  render() {

    const { label, done, important, onDeleted, onToggleImp, onToggleD } = this.props;

    let classNames = 'todo-list-item d-flex';

    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }


    return (
      <span className={classNames}>
        <span 
          className="todo-list-item-label"
          onClick={onToggleD}>
            {label}
        </span>
        <button 
          type="button" 
          className="btn btn-outline-success btn-sm mr-1 ml-auto"
          onClick={onToggleImp}>
            <i className="fa fa-exclamation"></i>
        </button>
        <button 
          type="button" 
          className="btn btn-outline-danger btn-sm"
          onClick={onDeleted}>
            <i className="fa fa-trash-o"></i>
        </button>
      </span>
    )
  }
}