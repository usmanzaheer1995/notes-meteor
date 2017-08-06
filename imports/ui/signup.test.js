import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Signup } from './signup';

if (Meteor.isClient) {
    describe('Signup', function () {
        it('should show error messages', function () {
            const error = 'This is not working';
            const wrapper = mount(
                <MemoryRouter itialEntries={['/']} initialIndex={0}>
                    <Signup createUser={() => { }} />
                </MemoryRouter>
            );

            const signup = wrapper.find(Signup).node;
            // .state() belongs to wrapper (the root) so it will not work with the const "signup".
            // It doesn't matter, you've just declared 'signup' as the signup component node, so now with it you have access
            // to all of signup's objects!
            // The state inside "signup" is an array and you can get the values as such:

            signup.setState({ error });
            expect(wrapper.find('p').text()).toBe(error);

            signup.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call createUser with the form data', function () {
            const email = 'usman@test.com';
            const password = 'password123';
            const spy = expect.createSpy();

            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );
            const signup = wrapper.find(Signup).node;

            signup.refs['email'].value = email;
            signup.refs['password'].value = password;

            wrapper.find('form').simulate('submit');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it('should set error if short password', function () {
            const email = 'usman@test.com';
            const password = '12345       ';
            const spy = expect.createSpy();

            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );
            const signup = wrapper.find(Signup).node;

            signup.refs['email'].value = email;
            signup.refs['password'].value = password;

            wrapper.find('form').simulate('submit');

            expect(spy).toNotHaveBeenCalled();
            expect(signup.state['error'].length).toBeGreaterThan(0);
        });

        it('should set signup with password callback errors', function () {
            const spy = expect.createSpy();
            const password = 'password123';
            const reason = 'You have failed this application';
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );
            const signup = wrapper.find(Signup).node;
            signup.refs['password'].value = password;

            wrapper.find('form').simulate('submit');

            //error checking
            spy.calls[0].arguments[1]({reason});
            //console.log(signup.state['error'])
            expect(signup.state['error']).toBe(reason);

            //no error check
            spy.calls[0].arguments[1]();
            expect(signup.state['error']).toNotBe(reason);
        });

    });
}
