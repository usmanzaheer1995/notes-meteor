import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import {PropTypes} from 'prop-types';
import {Meteor} from 'meteor/meteor';

import { Notes } from './../api/notes';

export class Editor extends Component {
    handleTitleChange(e){
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        });
    }

    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        });
    }
    render() {
        //we get a note
        if(this.props.note) {
            return(
                <div>
                    <input type="text" value={this.props.note.title} placeholder="enter note title" onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.props.note.body} cols="30" rows="10" placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button>Delete note</button>
                </div>
            );
        } 
        //we get an id, but it's not a match or we get nothing
        else {
            return(
                <p>
                    {this.props.selectedNoteId ? 'No note found' : 'Pick or create a note to get started'}
                </p>
            );
        }
    }
}

Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string
}

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}, Editor);