import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../App.scss';
import TodoList from './TodoList';
import TodoAddList from './TodoAddList';
import TodoDetail from './TodoDetail';

class App extends Component {

    constructor(props) {
        super(props);

        let myTodos = [
            { text: 'to do list-one', status: 'passive' },
            { text: 'to do list-two', status: 'active' }
        ];

        let localData = localStorage.getItem('data');
        if (localData !== null) {
            localData = JSON.parse(localData);
            myTodos = localData;
        }

        this.state = {
            tas: myTodos
        };

        this.addTodo = this.addTodo.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    addTodo(task) {
        let updatedList = this.state.tas;
        updatedList.push(task);
        this.setState({ tasks: updatedList });
        this.updateLocalStorage(updatedList);
    }

    handleDelete = (id) => {
        this.setState({
            todoListData: this.state.todoListData.filter(todo => todo.id !== id)
        })
        // this.updateLocalStorage(updatedList);
    }

    updateLocalStorage(updatedList) {
        var updatedList = JSON.stringify(updatedList);
        localStorage.setItem('data', updatedList);
        return true;
    }

    render() {
        return (
            <Router>
                <div>
                    <h2 className="text-center">To Do List</h2>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="d-flex flex-row justify-content-end mr-auto navbar-nav px-5 w-100">
                            <li className="mr-5"><Link to={'/todo-add'} className="nav-link"> To do add </Link></li>
                            <li><Link to={'/todo-list'} className="nav-link">To do list</Link></li>
                        </ul>
                    </nav>
                    <hr />
                    <div className="container">
                        <div className="content d-flex justify-content-center mt-5">
                            <div className="col-10 text-center">
                                <h1 className="font-weight-bold text-center text-success">todo</h1>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path='/todo-add' render={props => <TodoAddList addTodo={this.addTodo} />} />
                        <Route path='/todo-list' component={TodoList} data={this.updatedList} myList={this.state.tas} addTodo={this.addTodo} removeTask={this.removeTask}
                            doneTask={this.doneTask} />
                        <Route path="/todo-detail/:id" component={TodoDetail} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
