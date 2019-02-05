import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

  maxId = 100;

  createTodoItems = (label) => {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  state = {
    todoData: [
      this.createTodoItems('Make Awesome App'),
      this.createTodoItems('Have a lunch'),
      this.createTodoItems('Drink coffee')
    ],
    term: '',
    filter: 'all'
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {

      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]

      return {
        todoData: newArray
      }

    });
  }

  addItem = (text) => {
    
    const newItem = this.createTodoItems(text);

    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray
      }
    })

  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  toggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  toggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }

    })
  };

  search = (items, term) => {

    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter = (items, filter) => {

    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }

  };

  searchLabel = (text) => {
    this.setState({
      term: text
    });
  };

  onFilterChange = (value) => {
    this.setState({
      filter: value
    });
  }

  render() {

    const { todoData, term, filter } = this.state;
    const searchItems = this.search(todoData, term);
    const visibleItems = this.filter(searchItems, filter);

    const doneCount = todoData.filter((el) => el.done).length;
          
    const todoCount = todoData.length - doneCount;

    return (
      <div className="main">
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <AppHeader toDo={todoCount} done={doneCount}/>
              <div className="d-flex align-items-stretch mb-2">
                <SearchPanel onSearchChange={this.searchLabel}/>
                <ItemStatusFilter 
                  filter={filter}
                  onFilterChange={this.onFilterChange}/>
              </div>
              <TodoList 
                todos={visibleItems} 
                onDeletedItem={this.deleteItem}
                onToggleImportant={this.toggleImportant}
                onToggleDone={this.toggleDone}/>

              <ItemAddForm 
                onAddItem={this.addItem}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}