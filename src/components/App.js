import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import '../App.scss';
import Login from './Login';
import TodoList from './TodoList';
import TodoAddList from './TodoAddList';
import TodoDetail from './TodoDetail';

const todoFixtures = [
    { id: 1, text: 'to do list-one', complete: true },
    { id: 2, text: 'to do list-two', complete: false }
];

localStorage.setItem('data', JSON.stringify(todoFixtures));

class App extends Component {

    constructor(props) {
        super(props);

        let myTodos = [];

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
        this.setLogin = this.setLogin.bind(this);
    }

    static getUserSessionLoginData() {
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData !== null && loginData.login === true) {
            return { userName: loginData.userName };
        } else {
            return false;
        }
    }

    static isLogged() {
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData !== null && loginData.login === true) {
            return true;
        }
        return false;
    }

    setLogin(userName) {
        let loginData = {
            login: true,
            userName: userName
        };
        this.setState({
            userSession: {
                userName: loginData.userName,
            }
        });
        loginData = JSON.stringify(loginData);
        localStorage.setItem('login', loginData);
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

    updateLocalStorage(todoFixtures) {
        var todoFixtures = JSON.stringify(todoFixtures);
        localStorage.setItem('data', todoFixtures);
        this.setState({ tasks: todoFixtures });
        return true;
    }

    render() {
        let content = (<Login setLogin={this.setLogin} />);
        if (App.isLogged() === true) {
            content = (
                <Router>
                    <div className="d-flex flex-column">
                        <Switch>
                            <Route path='/todo-add' render={props => <TodoAddList addTodo={this.addTodo} tasks={this.state.tas} updateLocalStorage={this.props.updateLocalStorage} />} />
                            <Route path='/todo-list' component={TodoList} data={this.todoListData} todoListData={this.state.tas} addTodo={this.addTodo} removeTask={this.removeTask}
                                doneTask={this.doneTask} updateLocalStorage={this.updateLocalStorage} />
                            <Route path="/todo-detail/:id" render={props => <TodoDetail tasks={this.state.tas} /> } component={TodoDetail} />
                        </Switch>
                    </div>
                </Router>
            );
        }

        return (
            <Router>
                <div className="container py-5">
                    <div className="content d-flex justify-content-center mt-5">
                        <div className="col-12 col-md-7 text-center">
                            <h1 className="font-weight-bold text-center text-success">todo</h1>
                            <div className="content">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    
    }
}
export default App;
