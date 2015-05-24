import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('session', { path: '/sessions/:session_id' }, function() {});
  this.resource('file', function() {});
  this.resource('break', function() {});
});
