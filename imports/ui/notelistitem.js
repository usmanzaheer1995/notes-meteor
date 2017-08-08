import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
    const className = props.note.selected ? 'item item--selected' : 'item';

    return (
        <div className={className} onClick={() => {
            props.Session.set('selectedNoteId', props.note._id);
        }}>
            <h5 className="item__title">{props.note.title || 'Untitled note'}</h5>   {/*Check if note has a title, otherwise use other string*/}
            <p className="item__subtitle">{moment(props.note.updatedAt).format('DD/M/YY')}</p>
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