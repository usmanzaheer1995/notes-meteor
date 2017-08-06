import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteListItem } from './notelistitem';
import { notes } from './../fixtures/fixtures';

if (Meteor.isClient) {
    describe('NoteListItem', function () {
        let Session;

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });

        it('should render title and timestamp', function () {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);

            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect(wrapper.find('p').text()).toBe('06/8/17');
        });
        it('should render untitled note', function () {
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });

        it('should call set on click', function () {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);

            wrapper.find('div').simulate('click');

            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        });
    });
}