import { Meteor } from 'meteor/meteor';
//import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import {Session} from 'meteor/session';
import createBrowserHistory from 'history/createBrowserHistory'; 

import { onAuthChange, routes } from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration';

const history = createBrowserHistory();

Tracker.autorun(() => {
  //!! means flipping value twice which takes the falsy or truthy value and converts it into boolean
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
}) 
