import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';

export class Signup extends Component {
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

        if (password.length < 6) {
            return this.setState((prevState) => {
                return {
                    error: 'Password must be greater than 5 characters.'
                };
            });
        }

        this.props.createUser({ email, password }, (err) => {
            if (err) {
                this.setState((prevState) => {
                    return {
                        error: err.reason
                    }
                });
            }
            else {
                this.setState((prevState) => {
                    return {
                        error: ''
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Signup</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref='email' name='email' placeholder="Email" />
                        <input type="password" ref='password' name="password" placeholder="Password" />
                        <button className="button">Create account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        createUser: Accounts.createUser
    };
}, Signup);