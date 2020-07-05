import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TodoAddList from './TodoAddList';

export class TodoList extends Component {

    constructor() {
        super();
        let todoListData = JSON.parse(localStorage.getItem('data'));
        this.state = {
            todoListData: todoListData
        };
    }

    state = {
        todos: [],
        showAllTodo: 'all'
    };

    toggleComplete = (id) => {
        let updatedList = this.state.todoListData;

        this.setState({
            todoListData: this.state.todoListData.map(todo => {
                if (todo.id === id) {
                    // update
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo;
                }
            })
        })
        this.updateLocalStorage(updatedList);

    }

    updatedTodoToShow = (strng) => {
        this.setState({
            showAllTodo: strng
        })
    }

    handleDelete = (id) => {
        let updatedList = this.state.todoListData;

        updatedList.splice(id, 1)
        this.setState({
            updatedList: this.state.todoListData.filter(todo => todo.id !== id)
        })

        this.updateLocalStorage(updatedList);
    }

    updateLocalStorage(updatedList) {
        var updatedList = JSON.stringify(updatedList);
        localStorage.setItem('data', updatedList);
        return true;
    }

    render() {
        let updatedList = this.state.todoListData;

        if (this.state.showAllTodo === 'all') {
            updatedList = this.state.todoListData;
        } else if (this.state.showAllTodo === 'active') {
            updatedList = this.state.todoListData.filter(todo => !todo.complete);
        } else if (this.state.showAllTodo === 'complete') {
            updatedList = this.state.todoListData.filter(todo => todo.complete);
        }

        return (
            <div className="col-md-7 d-flex flex-column m-auto">
                {/* <h1 className="text-center">Todo List</h1> */}
                {/* <TodoAddList onSubmit={this.todoAddList}></TodoAddList> */}
                <div className="todo-list card d-flex flex-column">
                    {this.state.todoListData.map(todo => (
                        <div key={todo.id} className="d-flex flex-row col-12 py-2">
                            <div className={todo.complete ? 'todo-edit' : ''} key={todo.id} onClick={() => this.toggleComplete(todo.id)} > {todo.text} </div>

                            <div className="align-items-center col-7 col-md-4 d-flex flex-row justify-content-around px-0">
                                <Link to={'/todo-detail/' + todo.id}>
                                    <button className="edit btn btn-primary"> Edit</button>
                                </Link>

                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id={todo.id} checked={todo.complete} onClick={() => this.toggleComplete(todo.id)} />
                                    <label className="custom-control-label"></label>
                                </div>

                                <button className="delete btn btn-danger rounded-circle" onClick={() => this.handleDelete(todo.id)}>x</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card d-flex flex-row justify-content-between mt-5 p-3">
                    <div>todo {this.state.todoListData.filter(todo => !todo.complete).length} items left</div>

                    <div>
                        <button className="border-0 bg-white" onClick={() => this.updatedTodoToShow('all')}>All</button>
                        <button className="border-0 bg-white" onClick={() => this.updatedTodoToShow('active')}>Active</button>
                        <button className="border-0 bg-white" onClick={() => this.updatedTodoToShow('complete')}>Complete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoList;