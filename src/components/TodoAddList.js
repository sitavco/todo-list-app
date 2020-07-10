import React, { Component } from 'react';
import shortid from 'shortid';
import TodoList from './TodoList';

export class TodoAddList extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        text: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addTodo = (event) => {
        event.preventDefault();

        this.props.addTodo({
            id: shortid.generate(),
            text: this.state.text,
            complete: false,
            status: 'active'
        })

        this.setState({
            text: '',
            number: ''
        })
    }

    render() {
        return (
            <div className="d-flex flex-column">
                <form className="d-flex flex-column" onSubmit={this.addTodo}>
                    <div className="card p-3 mb-n2">
                        <input className="form-control border-0" maxLength={15} name="text" value={this.state.text} onChange={this.handleChange} placeholder="What needs to be done?" />
                    </div>

                    <button className="button btn btn-success rounded-circle m-auto" onClick={this.addTodo}>+</button>
                </form>

                <TodoList tasks={this.props.tasks} />
            </div>
        )
    }
}

export default TodoAddList;