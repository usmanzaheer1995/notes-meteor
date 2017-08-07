import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {withRouter} from 'react-router-dom';

import { Notes } from './../api/notes';

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({ title })
        this.props.call('notes.update', this.props.note._id, { title });
    }

    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({ body });
        this.props.call('notes.update', this.props.note._id, { body });
    }
    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if(currentNoteId && currentNoteId !== prevNoteId) {
           this.setState({
               title: this.props.note.title,
               body: this.props.note.body
           }) ;
        }
    }
    render() {
        //we get a note
        if (this.props.note) {
            return (
                <div>
                    <input type="text" value={this.state.title} placeholder="enter note title" onChange={this.handleTitleChange.bind(this)} />
                    <textarea value={this.state.body} cols="30" rows="10" placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button onClick={() => {
                        this.props.call('notes.remove', this.props.note._id);
                        this.props.history.push('/dashboard');
                    }}>Delete note</button>
                </div>
            );
        }
        //we get an id, but it's not a match or we get nothing
        else {
            return (
                <p>
                    {this.props.selectedNoteId ? 'No note found' : 'Pick or create a note to get started'}
                </p>
            );
        }
    }
}

Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired
}

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}, withRouter(Editor));