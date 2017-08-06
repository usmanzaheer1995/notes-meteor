import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Login } from './login';

if (Meteor.isClient) {
  describe('Login', function () {
    const mountWithRouter = node => mount(<Router>{node}</Router>);
    it('should show error messages', function () {
      const error = 'This is not working';
      const wrapper = mount(
        <MemoryRouter itialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={() => { }} />
        </MemoryRouter>
      );

      const login = wrapper.find(Login).node;
      // .state() belongs to wrapper (the root) so it will not work with the const "login".
      // It doesn't matter, you've just declared 'login' as the Login component node, so now with it you have access
      // to all of Login's objects!
      // The state inside "login" is an array and you can get the values as such:

      login.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      login.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should login with password with the form data', function () {
      const email = 'usman@test.com';
      const password = 'password123';
      const spy = expect.createSpy();

      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
      );
      const login = wrapper.find(Login).node;

      login.refs['email'].value = email;
      login.refs['password'].value = password;

      wrapper.find('form').simulate('submit');
      
      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set login with password callback errors', function() {
      const spy = expect.createSpy();

      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
      );
      const login = wrapper.find(Login).node;

      wrapper.find('form').simulate('submit');

      //error checking
      spy.calls[0].arguments[2]({});
      //console.log(login.state['error'])
      expect(login.state['error']).toNotBe('');

      //no error check
      spy.calls[0].arguments[2]();
      expect(login.state['error']).toBe('');
    });

  });
}
