import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router as Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Signup from './../ui/signup';
import Dashboard from './../ui/dashboard';
import NotFound from './../ui/notfound';
import Login from './../ui/login';

const history = createBrowserHistory();

//which pages an unauthenticated user can go to i.e. public pages
const unauthenticatedPages = ['/', '/signup'];

//which pages an authenticated user can go to i.e. private pages
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isAuthenticated && isUnauthenticatedPage) {
        history.replace('/dashboard');
    }
    else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
}

export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/dashboard" render={() => {
                return !Meteor.userId() ? <Redirect to="/" /> : <Dashboard />  //if user is not loggedin i.e. userid doesnt exist, go back to login page.
            }} />
            <Route path="/signup" render={() => {
                return Meteor.userId() ? <Redirect to="/dashboard" /> : <Signup />
            }} />
            <Route exact path="/" render={() => {
                return Meteor.userId() ? <Redirect to="/dashboard" /> : <Login />
            }} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);