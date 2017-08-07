import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateHeader from './privateheader';
import NoteList from './notelist';
import Editor from './editor';

export class Dashboard extends Component {

    componentWillUpdate() {
        console.log('update')
        if (!Meteor.userId()) {
            this.props.history.push('/')
            //history.go('/')
        }
    }

    render() {
        return (
            <div>
                <PrivateHeader title="Dashboard" />
                <div className="page-content">
                    <NoteList />
                    <Editor />
                </div>

            </div>
        );
    }
}

export default createContainer((props) => {
    return {
        userId: Meteor.userId()
    }

}, withRouter(Dashboard));