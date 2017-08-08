import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import {Session} from 'meteor/session';

import { Notes } from './../api/notes';

export const NoteListHeader = (props) => {
    let onSubmit = () => {
        props.meteorCall('notes.insert', (err, res) => {
            if(res) {
                props.Session.set('selectedNoteId', res);
            }
        });
    }

    return (
        <div className="item-list__header">
            <button className="button" onClick={onSubmit}>Add Note</button>
        </div>
    );
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
}

export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
}, NoteListHeader);