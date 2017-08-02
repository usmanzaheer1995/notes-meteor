import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }
    onSubmit(e) {
        e.preventDefault(); //prevents full page refresh

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState((prevState) => {
                    return {
                        error: 'Unable to login. Check email and password.'
                    };
                });
            }
            else {
                this.setState((prevState) => {
                    return {
                        error: ''
                    };
                });
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="text" ref='email' name='email' placeholder="Email" />
                        <input type="password" ref='password' name="password" placeholder="Password" />
                        <button className="button">Login</button>
                    </form>

                    <Link to='/signup'>Need an account?</Link>
                </div>
            </div>

        );
    }
}