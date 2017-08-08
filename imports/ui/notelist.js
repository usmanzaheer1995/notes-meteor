import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from './../api/notes';
import NoteListHeader from './notelistheader';
import NoteListItem from './notelistitem';
import NoteListEmptyItem from './notelistemptyitem';

export const NoteList = (props) => {

    renderNotes = () => {
        return props.notes.map((note) => {
            return <NoteListItem key={note._id} note={note} Session={{}} />
        });
    }

    return (
        <div className="item-list">
            <NoteListHeader />
            {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
            {renderNotes()}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');

    return {
        notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map((note) => {
            return {
                ...note,
                selected: note._id === selectedNoteId   //bool
            };
        })
    };
}, NoteList); 