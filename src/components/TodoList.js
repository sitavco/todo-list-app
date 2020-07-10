import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TodoAddList from './TodoAddList';

export class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAllTodo: 'all'
        }
    }

    toggleComplete = (id) => {
        let updatedList = this.props.tasks.map(todo => {
            if (todo.id === id) {
                todo.complete = !todo.complete;
            }
            return todo;
        })

        this.setState({
            tasks: updatedList
        })
    }

    updatedTodoToShow = (strng) => {
        this.setState({
            showAllTodo: strng
        })
    }

    handleDelete = (id) => {
        let updatedList = this.props.tasks;

        updatedList.splice(id, 1)
        this.setState({
            updatedList: this.props.tasks.filter(todo => todo.id !== id)
        })
    }

    render() {
        let toDoClass = this.props.tasks.complete ? "todo-edit" : "undone";
        let updatedList = this.props.tasks;

        if (this.state.showAllTodo === 'all') {
            updatedList = this.props.tasks;
        } else if (this.state.showAllTodo === 'active') {
            updatedList = this.props.tasks.filter(todo => !todo.complete);
        } else if (this.state.showAllTodo === 'complete') {
            updatedList = this.props.tasks.filter(todo => todo.complete);
        }

        return (
            <div className="d-flex flex-column mt-n2">
                <div className="todo-list card d-flex flex-column">
                    {this.props.tasks.map(todo => (
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
                    <div>todo {this.props.tasks.filter(todo => !todo.complete).length} items left</div>

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