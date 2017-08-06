import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Session } from 'meteor/session';

import PrivateHeader from './privateheader';
import NoteList from './notelist';
import Editor from './editor';

//statless functional component
// export default Dashboard = (props) => {
//     console.log(props)
//     return (
//         <div>
//             <PrivateHeader title="Dashboard" />
//             <div className="page-content">
//                 <NoteList/>
//             </div>
//         </div>
//     );
// }

export default class Link extends Component {
    componentWillMount() {
        if (!Meteor.userId()) {
            <Redirect to='/' />
        }
        else {
            if (this.props.match) {
                Session.set('selectedNoteId', this.props.match.params.id);
            }
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