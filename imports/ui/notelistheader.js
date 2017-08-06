import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';

import { Notes } from './../api/notes';

export const NoteListHeader = (props) => {
    let onSubmit = () => {
        props.meteorCall('notes.insert');
    }

    return (
        <button onClick={onSubmit}>Add Note</button>
    );
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader);