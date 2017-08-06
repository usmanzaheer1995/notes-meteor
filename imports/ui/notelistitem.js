import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
    return (
        <div onClick={() => {
            props.Session.set('selectedNoteId', props.note._id);
        }}>
            <h5>{props.note.title || 'Untitled note'}</h5>   {/*Check if note has a title, otherwise use other string*/}
            {props.note.selected ? 'selected' : undefined}
            <p>{moment(props.note.updatedAt).format('DD/M/YY')}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {
    return { Session };
}, NoteListItem);