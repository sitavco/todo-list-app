import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class TodoDetail extends Component {

    constructor() {
        super();
        let todoListData = JSON.parse(localStorage.getItem('data'));
        this.state = {
            todoListData: todoListData
        };
        this.getItemId = this.getItemId.bind(this);
    }

    getItemId = () => {
        let updatedList = this.state.todoListData;
        this.setState({
            updatedList: this.state.todoListData.filter(todo => {
                // todo.id === id;
            })
        })
    }


    render() {
        return (
            <div className="detail col-md-7 d-flex flex-column m-auto">
                <form className="d-flex flex-column" onSubmit={this.addTodo}>
                    <div className="card p-3">
                        <input className="form-control border-0" minLength={2} maxLength={10} name="text" value={this.state.text} onChange={this.handleChange} placeholder="What needs to be done?" />
                    </div>

                    <Link to={'/todo-list'} className="text-center">
                        <button className="back btn btn-success rounded-circle m-auto" onClick={this.addTodo}></button>
                    </Link>

                </form>
            </div>
        )
    }
}

export default TodoDetail;