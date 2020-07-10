import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class TodoDetail extends Component {

    constructor(props) {
        super(props);
        let todoListData = JSON.parse(localStorage.getItem('data'));
        this.state = {
            todoListData: todoListData
        };
        this.getItemId = this.getItemId.bind(this);
    }

    getItemId = (id) => {
        let updatedList = this.state.todoListData;
        this.setState({
            updatedList: this.state.todoListData.filter(todo => todo.id === id)
        })
    }


    render() {
        return (
            <div className="detail d-flex flex-column">
                <form className="d-flex flex-column" onSubmit={this.addTodo}>
                    <div className="card p-3 mb-n2">
                        <input className="form-control border-0" maxLength={15} name="text" value={this.state.text} onChange={this.handleChange} placeholder="What needs to be done?" />
                    </div>

                    <Link to={'/todo-add'} className="text-center">
                        <button className="button back btn btn-success rounded-circle m-auto" onClick={this.addTodo}></button>
                    </Link>

                </form>
            </div>
        )
    }
}

export default TodoDetail;