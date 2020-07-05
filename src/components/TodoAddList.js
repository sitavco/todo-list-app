import React, { Component } from 'react';
import shortid from 'shortid';

export class TodoAddList extends Component {

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

        if (this.state.text.length < 3) {
            console.log('Your text is less than what is required!');
        }

        this.setState({
            text: '',
            number: ''
        })
    }

    render() {
        return (
            <div className="col-md-7 d-flex flex-column m-auto">
                <form className="d-flex flex-column" onSubmit={this.addTodo}>
                    <div className="card p-3">
                        <input className="form-control border-0" minLength={2} maxLength={10} name="text" value={this.state.text} onChange={this.handleChange} placeholder="What needs to be done?" />
                    </div>

                    <button className="btn btn-success rounded-circle m-auto" onClick={this.addTodo}>+</button>
                </form>
            </div>
        )
    }
}

export default TodoAddList;