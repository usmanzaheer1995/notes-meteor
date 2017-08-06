import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer) {
    Meteor.publish('notes', function () {
        return Notes.find({ userId: this.userId});
    });
}

//Methods
Meteor.methods({
    'notes.insert'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment().valueOf() //new Date().getTime()
        });
    },

    'notes.remove'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });
        Notes.remove({ _id, userId: this.userId });
    },

    'notes.update'(_id, updates) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            title: {
                type: String,
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
        }).validate({
            _id,
            ...updates  /*spread operator is used to avoid any malicious content in the object; 
                          if anything other than title and body is passed in, simple schema will throw error*/
        });

        Notes.update({_id, userId: this.userId}, {
            $set: {
                updatedAt: moment().valueOf(),
                ...updates,
            }
        });
    }
});
