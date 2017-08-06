import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './notelistitem';

if (Meteor.isClient) {
    describe('NoteListItem', function () {
        it('should render title and timestamp', function () {
            const title = 'Test title';
            const updatedAt = 1501994550099;
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('06/8/17');
        });
        it('should render untitled note', function () {
            const title = 'Test title';
            const updatedAt = 1501994550099;
            const wrapper = mount(<NoteListItem note={title} />);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });
    });
}