import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setLogin.bind(this);
    }

    setLogin = () => {
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(this.props)

        if (userName === 'sitav' && password === 'kayhan') {
            this.props.setLogin(userName);
            window.location.href = "/todo-add";
        } else {
            alert('Invalid username');
        }
    }

    render() {
        return (
            <div className="col-md-8 offset-md-2">
                <div className="badge-secondary card mb-5 p-3 text-dark text-left text-white-50">
                    <span>Username: sitav</span>
                    <span>Password: kayhan</span>
                </div>
                <div className="login card">
                    <div className="form-group mb-0 py-3">
                        <input className="border-0 px-5 w-100" type="text" name="username" id="username" placeholder="username or email" />
                    </div>
                    <div className="form-group mb-0 py-3">
                        <input className="border-0 px-5 w-100" type="text" name="password" id="password" placeholder="password" />
                    </div>
                </div>
                <div className="d-flex justify-content-center login-options mt-4">
                    <button type="button" className="btn btn-success rounded-pill font-weight-bold" onClick={this.setLogin}>LOGIN</button>
                </div>
            </div>
        )
    }
}

export default Login;