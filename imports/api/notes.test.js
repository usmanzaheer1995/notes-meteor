import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { Notes } from './notes';

if (Meteor.isServer) {
    describe('notes', function () {
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'My body for note 1',
            updatedAt: 0,
            userId: 'testUserId1'
        };
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things to buy',
            body: 'Computer',
            updatedAt: 0,
            userId: 'testUserId2'
        };

        //mocha lifecycle hook that runs before each test 
        beforeEach(function () {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        it('should insert new note', function () {
            const userId = 'testid'

            //Meteor provides the following method to access methods inside testcases. 
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });  //apply() is a javascript function to bind to (this) keyword

            expect(Notes.findOne({ _id, userId })).toExist();
        });

        it('should not insert note if not authenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove note', function () {
            //square brackets [] after apply define the parameters the notes.remove method will take
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
            expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
        });

        it('should not remove note if not authenticated', function () {
            expect(() => {
                //by giving an empty object in apply, we don't set the context so (this) is not bound
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not remove note if invalid id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
            }).toThrow();
        });

        it('should update note', function () {
            const title = 'this is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [
                    noteOne._id,
                    { title }
                ]
            );
            const note = Notes.findOne(noteOne._id);
            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({ title, body: noteOne.body });
        });

        it('should throw error if extra updates', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [
                        noteOne._id,
                        { name: 'Usman' }
                    ]
                );
            }).toThrow();
        });

        it('should not update note if user was not creator', function () {
            const title = 'this is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testid'
            }, [
                    noteOne._id,
                    { title }
                ]
            );
            const note = Notes.findOne(noteOne._id);
            
            expect(note).toInclude(noteOne);
        });
        it('should not updat note if not authenticated', function () {
            expect(() => {
                //by giving an empty object in apply, we don't set the context so (this) is not bound
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not update note if invalid id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
            }).toThrow();
        });

        //publication test
        it("should return a user's notes", function() {
            const result = Meteor.server.publish_handlers['notes'].apply({userId: noteOne.userId});
            const notes = result.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it("should return no notes for user that has none", function() {
            const result = Meteor.server.publish_handlers['notes'].apply({userId: 'notFoundNote'});
            const notes = result.fetch();

            expect(notes.length).toBe(0);
        });
    });
}