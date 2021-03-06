import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = (user) => {
    const email = user.emails[0].address;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({ email });

    return true;
};

if (Meteor.isServer) {
    //this method is a hook; this runs before any new user is registered
    Accounts.validateNewUser(validateNewUser);
}
