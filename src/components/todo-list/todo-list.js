import React, { Component } from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

export default class TodoList extends Component {
  render() {

    const {todos, onDeletedItem, onToggleImportant, onToggleDone} = this.props;

    const elements = todos.map((item) => {

      const {id, ...itemProps} = item;

      return (
        <li key={id} className="list-group-item">
          <TodoListItem {...itemProps}
            onDeleted={() => onDeletedItem(id)}
            onToggleImp={() => onToggleImportant(id)}
            onToggleD={() => onToggleDone(id)}/>
        </li>
      )
    });
    

    return (
      <ul className="list-group todo-list">
        {elements}
      </ul>
    )
  }
}