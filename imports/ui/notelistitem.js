import React from 'react';
import moment from 'moment';
import {PropTypes} from 'prop-types';

const NoteListItem = (props) => {
    return (
        <div>
            <h5>{props.note.title || 'Untitled note'}</h5>   {/*Check if note has a title, otherwise use other string*/}
            <p>{moment(props.note.updatedAt).format('DD/M/YY')}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired
};

export default NoteListItem;